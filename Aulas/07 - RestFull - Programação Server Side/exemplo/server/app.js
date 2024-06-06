require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: Number,
  created: { type: Date, default: Date.now }
});

const NewUser = mongoose.model('NewUser', userSchema);

// Criar um novo usuário
const newUser = new NewUser({
  name: 'John Doe',
  email: 'john@example.com',
  age: 30
});

newUser.save()
  .then(doc => console.log('Novo usuário criado:', doc))
  .catch(err => console.error('Erro ao criar NewUser usuário:', err));


/*
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/tasks');

const app = express();

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.error('Erro ao conectar ao MongoDB', err));

app.use(express.json()); // Middleware para parsing JSON

app.use('/tasks', taskRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
*/