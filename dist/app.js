"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000; // should I install dotenv and set this in .env? 
app.get('/api/users', (req, res) => {
    res.send(['user1', 'user2', 'user3']);
});
app.get('/api/users/:id', (req, res) => {
    res.send(req.params.id);
});
// app.post()
// app.put()
// app.delete()
app.listen(port, () => console.log(`Server started at http://localhost:${port}`));
