import express, {Express, Request, Response } from 'express';
const app: Express = express();
const port = process.env.PORT || 3000; // should I install dotenv and set this in .env?

app.use(express.json());

const users = [
  {id: 1, name: 'user1'},
  {id: 2, name: 'user2'},
  {id: 3, name: 'user3'}
];

app.get('/api/users', (req: Request, res: Response) => {
  res.send(users);
})

app.get('/api/users/:id', (req, res) => {
  const user = users.find(user => user.id === parseInt(req.params.id));
  if (!user) {
    res.status(404).send(`No user found with id ${req.params.id}`)
  }
  res.send(user);
})

app.post('/api/users', (req, res) => {
  if (!req.body.name) {
    res.status(400).send('Name is required')
    return;
  }
  
  const user = {
    id: users.length + 1,
    name: req.body.name
  }
  users.push(user);
  res.send(user);
})

// app.put()

// app.delete()

app.listen(port, () => console.log(`Server started at http://localhost:${port}`))