"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000; // should I install dotenv and set this in .env?
app.use(express_1.default.json());
const users = [];
app.get('/api/users', (req, res) => {
    res.send(users);
});
app.get('/api/users/:id', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).send(`No user found with id ${req.params.id}`);
    }
    res.send(user);
});
app.post('/api/users', (req, res) => {
    if (!req.body.name) {
        return res.status(400).send('Name is required');
    }
    const user = {
        id: users.length + 1,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
        dateCreated: req.body.dateCreated
    };
    users.push(user);
    res.send(user);
});
app.put('/api/users/:id', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).send(`No user found with id ${req.params.id}`);
    }
    if (!req.body.name) {
        return res.status(400).send('username is required');
    }
    // might be able to remove this if statement once there is an interface
    if (user) {
        user.username = req.body.username;
        res.send(user);
    }
});
app.delete('/api/users/:id', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).send(`No user found with id ${req.params.id}`);
    }
    if (user) {
        const index = users.indexOf(user);
        users.splice(index, 1);
        res.send(user);
    }
});
app.listen(port, () => console.log(`Server started at http://localhost:${port}`));
