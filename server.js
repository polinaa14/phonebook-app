const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const contactsRouter = require('./routes/contacts');

const app = express();

app.use(express.json());

// API телефонной книги
app.use('/api/contacts', contactsRouter);

// Раздача собранного Angular-приложения
app.use(express.static(
    path.join(__dirname, 'client', 'dist', 'client', 'browser')
));

// Подключение к MongoDB
const mongoUri = process.env.MONGODB_URI ||
    'mongodb://127.0.0.1:27017/phonebook';

mongoose.connect(mongoUri)
    .then(() => {
        console.log('MongoDB connected');

        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });