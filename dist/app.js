"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000; // should I install dotenv and set this in .env?
// const crypto = require('crypto');
const crypto_1 = __importDefault(require("crypto"));
app.use(express_1.default.json());
const users = [];
// get all users
app.get('/api/users', (req, res) => {
    res.send(users);
});
// get single user
app.get('/api/users/:id', (req, res) => {
    const user = users.find(user => user.id === req.params.id);
    if (!user) {
        return res.status(404).send(`No user found with id ${req.params.id}`);
    }
    res.send(user);
});
// post new user
app.post('/api/users', (req, res) => {
    if (!req.body.firstName || !req.body.lastName || !req.body.username || !req.body.password) {
        return res.status(400).send('Missing a field');
    }
    const date = new Date();
    const user = {
        id: crypto_1.default.randomUUID(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
        dateCreated: date
    };
    users.push(user);
    res.send(user);
});
// update existing user
// WIP - should be able to update firstName, lastName, username, password
app.put('/api/users/:id', (req, res) => {
    const user = users.find(user => user.id === req.params.id);
    if (!user) {
        return res.status(404).send(`No user found with id ${req.params.id}`);
    }
    // update firstName
    if (req.body.firstName) {
        user.firstName = req.body.firstName;
    }
    // update lastName
    if (req.body.lastName) {
        user.lastName = req.body.firstName;
    }
    // update username
    if (req.body.username) {
        user.username = req.body.username;
    }
    if (req.body.password) {
        user.password = req.body.password;
    }
    // check that this is actually updating the user 
    res.send(user);
});
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
});
app.listen(port, () => console.log(`Server started at http://localhost:${port}`));
