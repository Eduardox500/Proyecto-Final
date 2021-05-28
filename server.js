require('dotenv').config;
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const rutas = require('./routes/Rutas');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(rutas);
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname + '/public')));

mongoose.connect('mongodb+srv://Eduardo:12345@cluster0.2luup.mongodb.net/Proyecto?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', (err) => console.log(err));
db.on('open', () => console.log('Database Connected!'));

app.listen(port, () => console.log(`Server started`));