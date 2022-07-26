import express, {Express, Request, Response } from 'express';
const app: Express = express();
const port = process.env.PORT || 3000; // should I install dotenv and set this in .env? 

app.get('/api/users', (req: Request, res: Response) => {
  res.send(['user1', 'user2', 'user3']);
})

app.get('/api/users/:id', (req, res) => {
  res.send(req.params.id);
})

// app.post()

// app.put()

// app.delete()

app.listen(port, () => console.log(`Server started at http://localhost:${port}`))