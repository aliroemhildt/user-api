import express, {Express, Request, Response } from 'express';
import User from './interfaces/user.interface';
const app: Express = express();
const port = process.env.PORT || 3000; // should I install dotenv and set this in .env?
// const crypto = require('crypto');
import crypto from 'crypto';

app.use(express.json());

const users: User[] = [];

// get all users
app.get('/api/users', (req: Request, res: Response) => {
  res.send(users);
})

// get single user
app.get('/api/users/:id', (req, res) => {
  const user = users.find(user => user.id === req.params.id);
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

// update existing user
// not sure how to do a put...
app.put('/api/users/:id', (req, res) => {

})

// delete user
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