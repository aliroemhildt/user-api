import express, {Express, Request, Response } from 'express';
import User from './interfaces/user.interface';
import CalendarEvent from './interfaces/calendar-event.interface';
import EventDate from './interfaces/calendar-event.interface';
const app: Express = express();
const port = process.env.PORT || 3000; //how can I type this as a number? 
import crypto from 'crypto';
import { read } from 'fs';

console.log(process.env.PORT)
app.use(express.json());

const users: User[] = []
const calendarEvents: CalendarEvent[] = [];

// how to type the return values of each fn? 

// GET all users
// should I remove req if I'm not using it?
app.get('/api/users', (req: Request, res: Response) => {
  return res.send(users);
})

// GET single user
app.get('/api/users/:id', (req: Request, res: Response) => {
  const user = users.find(user => user.id === req.params.id);
  if (!user) {
    return res.status(404).send(`No user found with id ${req.params.id}`);
  }

  return res.send(user);
})

// POST new user
app.post('/api/users', (req: Request, res: Response) => {
  if (!req.body.firstName || !req.body.lastName || !req.body.username || !req.body.password) {
    return res.status(400).send('Missing a field');
  }

  const user: User = {
    id: crypto.randomUUID(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: req.body.password,
    dateCreated: new Date()
  }

  users.push(user);
  return res.send(user);
})

// UPDATE existing user
app.put('/api/users/:id', (req: Request, res: Response) => {
  // how do I type this? 
  let user = users.find(user => user.id === req.params.id);

  if (!user) {
    return res.status(404).send(`No user found with ID ${req.params.id}`);
  } 

  // can clean up this fn by: 
  // validate
  // get keys of req.body
  // forEach over them to validate
  // could make an array of fields

  if (user && req.body.firstName && req.body.lastName && req.body.username && req.body.password) {
    // how do I type these?
    user.firstName = req.body.firstName
    user.lastName = req.body.lastName
    user.username = req.body.username
    user.password = req.body.password
  } else {
    return res.status(400).send('Missing a required field');
  }

  return res.send(user);
})

// DELETE user
app.delete('/api/users/:id', (req: Request, res: Response) => {
  const user = users.find(user => user.id === req.params.id);
  if (!user) {
    return res.status(404).send(`No user found with id ${req.params['id']}`);
  } else {
    const index = users.indexOf(user);
    users.splice(index, 1);
    return res.send(user);
  } 
})

// GET all calendar events for a single user
app.get('/api/events/:id', (req: Request, res: Response) => {
  const events = calendarEvents.map(event => {
    if (event.userId === req.params.id) return event
  });

  return res.send(events);
})

// POST new calendar event
app.post('/api/events', (req: Request, res: Response) => {
  if (!req.body.userId || !req.body.start || !req.body.end || !req.body.name || !req.body.description) {
    return res.status(400).send('Missing a required field');
  }

  const newEvent: CalendarEvent = {
    eventId: crypto.randomUUID(),
    userId: req.body.userId,
    start: req.body.start,
    end: req.body.end, //need to fix this
    name: req.body.name, //need to fix this
    description: req.body.description
  }

  calendarEvents.push(newEvent);
  return res.send(calendarEvents);
})

// DELETE calendar event

// UPDATE event

app.listen(port, () => console.log(`Server started at http://localhost:${port}`));