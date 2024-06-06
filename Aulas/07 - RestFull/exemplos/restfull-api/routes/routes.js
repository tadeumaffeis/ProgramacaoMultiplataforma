const express = require('express');
const router = express.Router();

// Definição das rotas
router.get('/', (req, res) => {
  res.json({ message: 'Lista de tarefas' });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.json({ message: `Tarefa ${id}` });
    }
);

router.post('/', (req, res) => {
  const newTask = req.body;
  res.status(201).json({ message: 'Tarefa criada', task: newTask });
});

router.delete('/', (req, res) => {
    res.json({ message: `Tarefa deletada` });     
});

module.exports = router;
