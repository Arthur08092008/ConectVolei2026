const pool = require('../config/database');
const vazio = (x) => (x === '' || x === undefined ? null : x);

module.exports = (cfg) => {
  const valores = (d) => cfg.campos.map((c) => vazio(d[c]) ?? cfg.padroes?.[c] ?? null);
  return {
    async listar(uid) {
      return (await pool.query(cfg.listar, [uid])).rows;
    },
    async criar(uid, d) {
      const marcas = cfg.campos.map((_, i) => `$${i + 2}`).join(',');
      const { rows } = await pool.query(
        `INSERT INTO ${cfg.tabela} (usuario_id, ${cfg.campos.join(',')}) VALUES ($1, ${marcas}) RETURNING *`,
        [uid, ...valores(d)]
      );
      return rows[0];
    },
    async atualizar(uid, id, d) {
      const sets = cfg.campos.map((c, i) => `${c} = $${i + 3}`).join(', ');
      const { rows } = await pool.query(
        `UPDATE ${cfg.tabela} SET ${sets} WHERE id = $1 AND usuario_id = $2 RETURNING *`,
        [id, uid, ...valores(d)]
      );
      return rows[0];
    },
    async excluir(uid, id) {
      const r = await pool.query(`DELETE FROM ${cfg.tabela} WHERE id = $1 AND usuario_id = $2`, [id, uid]);
      return r.rowCount > 0;
    },
  };
};
