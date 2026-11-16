const router = require('express').Router();
const auth = require('../middlewares/auth');
const recursos = require('../models/recursos');
const crudController = require('../controllers/crudController');

// Gera GET/POST /recurso e PUT/DELETE /recurso/:id para cada tabela
for (const [nome, cfg] of Object.entries(recursos)) {
  const c = crudController(cfg);
  router.get(`/${nome}`, auth, c.listar);
  router.post(`/${nome}`, auth, c.criar);
  router.put(`/${nome}/:id`, auth, c.atualizar);
  router.delete(`/${nome}/:id`, auth, c.excluir);
}

module.exports = router;
