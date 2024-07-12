const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const RegisterModel = require('./models/Register');

const app = express();
app.use(cors({
    origin: ["https://birthdaywishdynamic-frontend.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(express.json());

mongoose.connect('mongodb+srv://sethumadhavan:indrajit@cluster0.dbntwx8.mongodb.net/mern-app?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.get("/", (req, res) => {
    res.json("Hello");
});

app.post('/register', (req, res) => {
    const { name, relationship } = req.body;
    RegisterModel.findOne({ name: name, relationship: relationship })
        .then(user => {
            if (user) {
                res.json("Already have a wish for this person");
            } else {
                RegisterModel.create({ name: name, relationship: relationship })
                    .then(result => res.json(result))
                    .catch(err => res.json(err));
            }
        }).catch(err => res.json(err));
});

app.post('/wish', (req, res) => {
    const { name, relationship } = req.body;
    const wishes = {
        brother: `Happy Birthday, ${name}! You’re the best brother ever!`,
        sister: `Happy Birthday, ${name}! You’re the best sister ever!`,
        mother: `Happy Birthday, ${name}! You’re the best mother ever!`,
        father: `Happy Birthday, ${name}! You’re the best father ever!`,
        friend: `Happy Birthday, ${name}! You’re the best friend ever!`
    };
    const generatedWish = wishes[relationship.toLowerCase()] || `Happy Birthday, ${name}!`;

    RegisterModel.create({ name: name, relationship: relationship })
        .then(result => res.json({ ...result._doc, wish: generatedWish }))
        .catch(err => res.json(err));
});

app.listen(3001, () => {
    console.log("Server is Running on port 3001");
});
