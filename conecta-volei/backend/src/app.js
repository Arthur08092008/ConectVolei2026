const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({ origin: process.env.FRONT_URL || 'http://localhost:5173' }));
app.use(express.json());

app.get('/', (req, res) => res.json({ mensagem: 'API Conecta Vôlei no ar' }));
app.use('/auth', require('./routes/authRoutes'));
app.use('/', require('./routes/recursosRoutes'));
app.use((req, res) => res.status(404).json({ mensagem: 'Rota não encontrada.' }));

module.exports = app;
