const express = require('express');
const app = express();

// Middleware para parsing JSON
app.use(express.json());

// Importação das rotas de tarefas
const taskRoutes = require('./routes/routes.js');

// Uso das rotas de tarefas
app.use('/api', taskRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

/*
const express = require('express');
const app = express();
const port = 3000;

// Middleware para interpretar JSON
app.use(express.json());

// Rotas
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Exemplo de rota para obter dados
app.get('/api/data', (req, res) => {
  res.json({ message: 'Aqui estão seus dados!' });
});

// Exemplo de rota para criar dados
app.post('/api/data', (req, res) => {
  const newData = req.body;
  res.status(201).json({ message: 'Dados criados!', data: newData });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
*/