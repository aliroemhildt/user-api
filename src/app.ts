import express, {Express, Request, Response } from 'express';
import User from './interfaces/user.interface';
import CalendarEvent from './interfaces/calendar-event.interface';
import crypto from 'crypto';
import { read } from 'fs';
import { request } from 'http';
const app: Express = express();
const port = process.env.PORT || 3000; //how can I type this as a number? 

console.log(process.env.PORT)
app.use(express.json());

const users: User[] = []
const calendarEvents: CalendarEvent[] = [];

// how to type the return values of each fn? 

// GET all users
// should I remove req if I'm not using it?
app.get('/api/users', (req: Request, res: Response) => {
  res.status(200).send(users);
})

// GET single user
app.get('/api/users/:id', (req: Request, res: Response) => {
  const user = users.find(user => user.id === req.params.id);
  
  if (!user) {
    res.status(404).send(`No user found with id ${req.params.id}`);
  }

  res.status(200).send(user);
})

// POST new user
app.post('/api/users', (req: Request, res: Response) => {
  if (!req.body.firstName || !req.body.lastName || !req.body.username || !req.body.password) {
    res.status(400).send('Missing a field');
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
  res.status(201).send(user);
})

// UPDATE existing user
app.put('/api/users/:id', (req: Request, res: Response) => {
  // how do I type this? 
  let user = users.find(user => user.id === req.params.id);

  if (!user) {
    res.status(404).send(`No user found with ID ${req.params.id}`);
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
    res.status(400).send('Missing a required field');
  }

  res.status(200).send(user);
})

// DELETE user
app.delete('/api/users/:id', (req: Request, res: Response) => {
  const user = users.find(user => user.id === req.params.id);
  if (!user) {
    res.status(404).send(`No user found with id ${req.params['id']}`);
  } else {
    const index = users.indexOf(user);
    users.splice(index, 1);
    res.status(200).send(user);
  } 
})

// GET all calendar events for a single user
app.get('/api/events/:id', (req: Request, res: Response) => {
  const events = calendarEvents.map(event => {
    if (event.userId === req.params.id) return event
  });

  res.status(200).send(events);
})

// POST new calendar event
app.post('/api/events', (req: Request, res: Response) => {
  if (!req.body.userId || !req.body.start || !req.body.end || !req.body.name || !req.body.description) {
    res.status(400).send('Missing a required field');
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
  res.status(201).send(calendarEvents);
})

// DELETE calendar event
app.delete('/api/events/:id', (req: Request, res: Response) => {
  const event = calendarEvents.find(event => event.eventId === req.params.id);
})

// UPDATE event

app.listen(port, () => console.log(`Server started at http://localhost:${port}`));