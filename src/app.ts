import express, {Application, Request, Response } from 'express';
import User from './interfaces/user.interface';
import CalendarEvent from './interfaces/calendar-event.interface';
import crypto from 'crypto';

const app: Application = express();
const port = process.env.PORT || 3000; //how can I type this as a number? 

app.use(express.json());

const users: User[] = []
const events: CalendarEvent[] = []; 

// GET all users
// should I remove req if I'm not using it?
//is this how I should type the return value?
app.get('/api/users', (req: Request, res: Response): Response => { 
  return res.status(200).send(users);
})

// GET single user
app.get('/api/users/:id', (req: Request, res: Response): Response => { 
  const user = users.find(user => user.id === req.params.id); //how do I type this
  
  if (!user) {
    return res.status(404).send(`No user found with id ${req.params.id}`);
  }

  return res.status(200).send(user);
})

// POST new user
app.post('/api/users', (req: Request, res: Response): Response => {
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
  return res.status(201).send(user);
})

// UPDATE existing user
// need to test this on postman
  // can clean up this fn by: 
  // validate
  // get keys of req.body
  // forEach over them to validate
  // could make an array of fields  
app.put('/api/users/:id', (req: Request, res: Response): Response => {
  const user = users.find(user => user.id === req.params.id); //how do I type this? 

  if (!user) {
    return res.status(404).send(`No user found with ID ${req.params.id}`);
  }

  if (user && req.body.firstName) {
    user.firstName = req.body.firstName;
  }

  if (user && req.body.lastName) {
    user.firstName = req.body.lastName;
  }

  if (user && req.body.username) {
    user.username = req.body.username;
  }

  if (user && req.body.password) {
    user.password = req.body.password;
  }

  const includesField = Object.keys(req.body).includes('firstName' || 'lastName' || 'username' || 'password');

  if (user && !includesField) {
    return res.status(400).send('Request must include at least one field: firstName, lastName, username, or password');
  }

  return res.status(200).send(user);
})

// DELETE user
app.delete('/api/users/:id', (req: Request, res: Response): Response => {
  const user = users.find(user => user.id === req.params.id); //how do I type this
 
  if (!user) {
    return res.status(404).send(`No user found with id ${req.params.id}`);
  } else {
    const index: number = users.indexOf(user);
    users.splice(index, 1);
    return res.status(200).send(user);
  } 
});

// GET all calendar events
app.get('/api/events', (req: Request, res: Response): Response => {
  return res.status(200).send(events);
});

// GET single calendar event
app.get('/api/events/:id', (req: Request, res: Response): Response => {
  const event = events.find(event => event.eventId === req.params.id); //how do I type this
  
  if (!event) {
    return res.status(404).send(`No event found with ID ${req.params.id}`);
  } else {
    return res.status(200).send(event);
  }
})

// GET all calendar events for a single user
app.get('/api/events/user/:id', (req: Request, res: Response) => {
  const userEvents: CalendarEvent[] = events.filter(event => {
    if (event.userId === req.params.id) {
      return event;
    }
  });

  return res.status(200).send(userEvents);
});

// POST new calendar event
app.post('/api/events', (req: Request, res: Response) => {
  // do I need to type the arguments in my if statement? 
  if (!req.body.userId || !req.body.start || !req.body.end || !req.body.name || !req.body.description) {
    return res.status(400).send('Missing a required field');
  }

  const newEvent: CalendarEvent = {
    eventId: crypto.randomUUID(),
    userId: req.body.userId,
    start: req.body.start,
    end: req.body.end,
    name: req.body.name,
    description: req.body.description
  }

  events.push(newEvent);
  return res.status(201).send(newEvent);
})

// DELETE calendar event
app.delete('/api/events/:id', (req: Request, res: Response) => {
  const event = events.find(event => event.eventId === req.params.id); //how do I type this

  if (!event) {
    return res.status(404).send(`No calendar event found with id ${req.params.id}`);
  } else {
    const index: number = events.indexOf(event);
    events.splice(index, 1);
    return res.status(200).send(event);
  }
})

// UPDATE event
// need to test this on postman
app.put(`api/events/:id`, (req: Request, res: Response) => {
  let event = events.find(event => event.eventId === req.params.id); //how do I type this

  if (!event) {
    return res.status(404).send(`No event found with ID ${req.params.id}`);
  }

  if (event && req.body.start) {
    event.start = req.body.firstName;
  }

  if (event && req.body.end) {
    event.end = req.body.lastName;
  }

  if (event && req.body.name) {
    event.name = req.body.username;
  }

  if (event && req.body.description) {
    event.description = req.body.password;
  }

  const includesField: boolean = Object.keys(req.body).includes('start' || 'end' || 'name' || 'description');

  if (event && !includesField) {
    return res.status(400).send('Missing a required field');
  }

  return res.status(200).send(event);
});

app.listen(port, () => console.log(`Server started at http://localhost:${port}`));