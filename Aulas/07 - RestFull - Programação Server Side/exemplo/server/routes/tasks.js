const express = require('express');
const Task = require('../models/Task.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status('201').json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Não encontrado" });
        }
        res.status('201').json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed
    });
    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (req.body.title) {
            task.title = req.body.title;
        }
        if (req.body.description) {
            task.description = req.body.description;
        }
        if (req.body.completed !== undefined) {
            task.completed = req.body.completed;
        }
        const updatedTask = await task.save();
        res.status('201').json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Não encontrado" });
        }
        await task.deleteOne();
        res.status('201').json({ message: "Tarefa deletada" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
