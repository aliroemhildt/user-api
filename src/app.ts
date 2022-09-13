import express, {Application, Request, Response } from 'express';
import User from './interfaces/user.interface';
import CalendarEvent from './interfaces/calendar-event.interface';
import crypto from 'crypto';

const app: Application = express();
const port: number | string = process.env.PORT || 3000; //how can I type this as a number? 

app.use(express.json());

const users: User[] = [
  {
    id: '1',
    firstName: 'Ali',
    lastName: 'Roemhildt',
    username: 'alir',
    password: 'password',
    // dateCreated: new Date
  },
  {
    id: '2',
    firstName: 'Harry',
    lastName: 'Styles',
    username: 'hs',
    password: 'harryshouse',
    // dateCreated: new Date
  }
]
const events: CalendarEvent[] = [

]; 

// GET all users
app.get('/api/users', (_req: Request, res: Response<User[]>) => { 
  return res.status(200).send(users);
});

// GET single user
app.get('/api/users/:id', (req: Request, res: Response): Response<User> => { 
  const user: User | undefined = users.find(user => user.id === req.params.id); 
  
  if (!user) {
    return res.status(404).send(`No user found with id ${req.params.id}`);
  }

  return res.status(200).send(user);
})

// POST new user
app.post('/api/users', (req: Request<User>, res: Response<User | string>) => {
  if (!req.body.firstName || !req.body.lastName || !req.body.username || !req.body.password) {
    return res.status(400).send('Missing a field');
  }

  const user: User = {
    id: crypto.randomUUID(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: req.body.password,
    // dateCreated: new Date()
  }

  users.push(user);
  return res.status(201).send(user);
})

// UPDATE existing user
// could try using joi to validate req body fields for put and post 
app.put('/api/users/:id', (req: Request<User>, res: Response<User | string>) => {
  const user: User | undefined = users.find(user => user.id === req.params.id);
  
  if (!user) {
    return res.status(404).send(`No user found with ID ${req.params.id}`);
  }

  enum UserFields {
    firstName = "firstName",
    lastName = "lastName",
    username = "username",
    password = "password"
  }

  const userKeys = Object.keys(UserFields);

  const reqKeys = Object.keys(req.body);

  const acceptedFields = reqKeys.some(field => userKeys.includes(field));

  if (!acceptedFields) {
    return res.status(400).send('Request must include at least one of the following fields: firstName, lastName, username, or password');
  }

  // can't get this fn to work, using if statements instead
  // reqKeys.forEach(field => {
  //   if (userKeys.includes(field)) {
  //     user[field] = req.body[field];
  //   }
  // });
  
  if (req.body.firstName) {
    user.firstName = req.body.firstName;
  }
  if (req.body.lastName) {
    user.lastName = req.body.lastName;
  }
  if (req.body.username) {
    user.username = req.body.username;
  }
  if (req.body.password) {
    user.password = req.body.password;
  }

  return res.status(200).send(user);
})

// DELETE user
app.delete('/api/users/:id', (req: Request, res: Response<User | string>) => {
  const user: User | undefined = users.find(user => user.id === req.params.id);
 
  if (!user) {
    return res.status(404).send(`No user found with id ${req.params.id}`);
  }

  const index: number = users.indexOf(user);
  users.splice(index, 1);
  return res.status(200).send(user);
});

// GET all calendar events
app.get('/api/events', (_req: Request, res: Response<CalendarEvent[]>) => {
  return res.status(200).send(events);
});

// GET single calendar event
app.get('/api/events/:id', (req: Request, res: Response<CalendarEvent | string>) => {
  const event: CalendarEvent | undefined = events.find(event => event.eventId === req.params.id);
  
  if (!event) {
    return res.status(404).send(`No event found with ID ${req.params.id}`);
  } else {
    return res.status(200).send(event);
  }
})

// GET all calendar events for a single user
app.get('/api/events/user/:id', (req: Request, res: Response<CalendarEvent[]>) => {
  const userEvents: CalendarEvent[] = events.filter(event => {
    if (event.userId === req.params.id) {
      return event;
    }
  });

  return res.status(200).send(userEvents);
});

// POST new calendar event
app.post('/api/events', (req: Request, res: Response<CalendarEvent | string>) => {
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
app.delete('/api/events/:id', (req: Request, res: Response<CalendarEvent | string>) => {
  const event: CalendarEvent | undefined = events.find(event => event.eventId === req.params.id); 

  if (!event) {
    return res.status(404).send(`No calendar event found with id ${req.params.id}`);
  } else {
    const index: number = events.indexOf(event);
    events.splice(index, 1);
    return res.status(200).send(event);
  }
})

// UPDATE event
app.put(`api/events/:id`, (req: Request, res: Response<CalendarEvent | string>) => {
  const event: CalendarEvent | undefined = events.find(event => event.eventId === req.params.id); 

  if (!event) {
    return res.status(404).send(`No event found with ID ${req.params.id}`);
  }

  enum EventFields {
    start = "start",
    end = "end",
    name = "name",
    description = "description"
  }

  const eventKeys = Object.keys(EventFields);
  const reqKeys = Object.keys(req.body);

  const acceptedFields = reqKeys.some(field => eventKeys.includes(field));

  if (!acceptedFields) {
    return res.status(400).send('Request must include at least one of the following fields: start, end, name, description');
  }

  if (req.body.start) {
    event.start = req.body.firstName;
  }

  if (req.body.end) {
    event.end = req.body.lastName;
  }

  if (req.body.name) {
    event.name = req.body.username;
  }

  if (req.body.description) {
    event.description = req.body.password;
  }

  return res.status(200).send(event);
});

app.listen(port, () => console.log(`Server started at http://localhost:${port}`));