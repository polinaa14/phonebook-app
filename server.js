const express = require('express');
const mongoose = require('mongoose');
const contactsRouter = require('./routes/contacts');

const app = express();

// Обработка JSON-запросов
app.use(express.json());

// Подключение маршрутов контактов
app.use('/api/contacts', contactsRouter);

// Главная страница
app.get('/', (req, res) => {
    res.send('Phonebook API is running!');
});

// Подключение к MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/phonebook')
    .then(() => {
        console.log('MongoDB connected');

        // Запуск сервера после подключения к базе
        const PORT = 3000;

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });