import express, {Express, Request, Response } from 'express';
const app: Express = express();
const port = process.env.PORT || 3000; // should I install dotenv and set this in .env?
import User from './interfaces/user.interface';

app.use(express.json());

const users: User[] = [];

// get all users
app.get('/api/users', (req: Request, res: Response) => {
  res.send(users);
})

// get single user
app.get('/api/users/:id', (req, res) => {
  const user = users.find(user => user.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).send(`No user found with id ${req.params.id}`);
  }

  res.send(user);
})

// post new user
app.post('/api/users', (req, res) => {
  if (!req.body.firstName || !req.body.lastName || !req.body.username || !req.body.password) {
    return res.status(400).send('Missing a field');
  }

  const date = new Date();

  const user = {
    id: users.length + 1,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: req.body.password,
    dateCreated: date
  }

  users.push(user);
  res.send(user);
})

// update existing user
// WIP - should be able to update firstName, lastName, username, password
app.put('/api/users/:id', (req, res) => {
  const user = users.find(user => user.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).send(`No user found with id ${req.params.id}`);
  }

  //update username
  if (!req.body.name) {
    return res.status(400).send('username is required');
  }

  if (user) {
    user.username = req.body.username;
    res.send(user);
  }
})

// delete user
app.delete('/api/users/:id', (req, res) => {
  const user = users.find(user => user.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).send(`No user found with id ${req.params.id}`);
  }

  if (user) {
    const index = users.indexOf(user);
  users.splice(index, 1);
  res.send(user);
  } 
})

app.listen(port, () => console.log(`Server started at http://localhost:${port}`));