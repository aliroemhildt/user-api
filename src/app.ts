import express, {Express, Request, Response } from 'express';
const app: Express = express();
const port = 3000;

app.get('/api/users', (req: Request, res: Response) => {
  res.send(['user1', 'user2', 'user3']);
})

// app.post()

// app.put()

// app.delete()

app.listen(port, () => console.log(`Server started at http://localhost:${port}`))