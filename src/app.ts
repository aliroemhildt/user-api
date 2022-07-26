import express, {Express, Request, Response } from 'express';
const app: Express = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('users');
})

app.post()

app.put()

app.delete()

app.listen(port, () => console.log(`Server started at http://localhost:${port}`))