import express, {Express, Request, Response } from 'express';
import User from './interfaces/user.interface';
const app: Express = express();
const port = process.env.PORT || 3000;
import crypto from 'crypto';

app.use(express.json());

const users: User[] = []
// const events: 

// GET all users
app.get('/api/users', (req: Request, res: Response) => {
  res.send(users);
})

// GET single user
app.get('/api/users/:id', (req: Request, res: Response) => {
  const user = users.find(user => user.id === req.params.id);
  if (!user) {
    return res.status(404).send(`No user found with id ${req.params.id}`);
  }

  res.send(user);
})

// POST new user
app.post('/api/users', (req: Request, res: Response) => {
  if (!req.body.firstName || !req.body.lastName || !req.body.username || !req.body.password) {
    return res.status(400).send('Missing a field');
  }

  const date = new Date();

  const user: User = {
    id: crypto.randomUUID(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: req.body.password,
    dateCreated: date
  }

  users.push(user);
  res.send(user);
})

// UPDATE existing user
// should I put this all in one operation or have separate PUTs for each field that can be updated? 
app.put('/api/users/:id', (req, res) => {
  // look up user
  let user = users.find(user => user.id === req.params.id);

  // if it doesn't exist, return 404
  if (!user) {
    res.status(404).send(`No user found with ID ${req.params.id}`);
  } 

  // validate
  // get keys of req.body
  // forEach over them to validate
  // could make an array of fields 
  if (user && req.body.firstName && req.body.lastName && req.body.username && req.body.password) {
    // update user
    user.firstName = req.body.firstName
    user.lastName = req.body.lastName
    user.username = req.body.username
    user.password = req.body.password
  } else {
      // if invalid, return 400
    res.status(400).send('Missing a required field');
  }

  // return updated user
  res.send(user);
})

// DELETE user
app.delete('/api/users/:id', (req, res) => {
  const user = users.find(user => user.id === req.params.id);
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