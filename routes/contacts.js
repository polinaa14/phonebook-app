const express = require('express');
const router = express.Router();

const Contact = require('../models/contact');

// Получение всех контактов
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Добавление нового контакта
router.post('/', async (req, res) => {
    try {
        const contact = new Contact(req.body);
        const savedContact = await contact.save();
        res.status(201).json(savedContact);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Изменение контакта
router.put('/:id', async (req, res) => {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedContact) {
            return res.status(404).json({ message: 'Контакт не найден' });
        }

        res.json(updatedContact);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Удаление контакта
router.delete('/:id', async (req, res) => {
    try {
        const deletedContact = await Contact.findByIdAndDelete(req.params.id);

        if (!deletedContact) {
            return res.status(404).json({ message: 'Контакт не найден' });
        }

        res.json({ message: 'Контакт удалён' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;