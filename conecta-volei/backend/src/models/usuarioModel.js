const pool = require('../config/database');

module.exports = {
  async buscarPorEmail(email) {
    const { rows } = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    return rows[0];
  },
  async buscarPorId(id) {
    const { rows } = await pool.query('SELECT id, nome, email, telefone, criado_em FROM usuarios WHERE id = $1', [id]);
    return rows[0];
  },
  async criar({ nome, email, telefone, senha }) {
    const { rows } = await pool.query(
      'INSERT INTO usuarios (nome, email, telefone, senha) VALUES ($1,$2,$3,$4) RETURNING id',
      [nome, email, telefone || null, senha]
    );
    return rows[0];
  },
};
