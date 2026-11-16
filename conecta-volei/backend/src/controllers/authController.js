const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarioModel');

const reEmail = /^\S+@\S+\.\S+$/;
const reSenha = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[A-Z])(?=.*[^\w\s]).{8,}$/;
const gerarToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.cadastrar = async (req, res) => {
  try {
    const { nome, email, telefone, senha } = req.body;
    if (!nome?.trim()) return res.status(400).json({ mensagem: 'Informe seu nome.' });
    if (!reEmail.test(email || '')) return res.status(400).json({ mensagem: 'E-mail inválido.' });
    if (!reSenha.test(senha || ''))
      return res.status(400).json({ mensagem: 'A senha precisa ter 8+ caracteres, maiúscula, número e símbolo.' });
    const emailNorm = email.trim().toLowerCase();
    if (await Usuario.buscarPorEmail(emailNorm)) return res.status(409).json({ mensagem: 'Este e-mail já está cadastrado.' });
    const hash = await bcrypt.hash(senha, 10);
    const novo = await Usuario.criar({ nome: nome.trim(), email: emailNorm, telefone, senha: hash });
    res.status(201).json({ token: gerarToken(novo.id) });
  } catch (e) {
    console.error(e);
    res.status(500).json({ mensagem: 'Não foi possível realizar o cadastro.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const u = await Usuario.buscarPorEmail((email || '').trim().toLowerCase());
    if (!u || !(await bcrypt.compare(senha || '', u.senha)))
      return res.status(401).json({ mensagem: 'E-mail ou senha incorretos.' });
    res.json({ token: gerarToken(u.id) });
  } catch (e) {
    console.error(e);
    res.status(500).json({ mensagem: 'Erro interno ao entrar.' });
  }
};

exports.perfil = async (req, res) => {
  try {
    const u = await Usuario.buscarPorId(req.usuario.id);
    if (!u) return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
    res.json(u);
  } catch (e) {
    console.error(e);
    res.status(500).json({ mensagem: 'Erro interno.' });
  }
};
