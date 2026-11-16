const crudModel = require('../models/crudModel');

module.exports = (cfg) => {
  const model = crudModel(cfg);
  const erro = (res, e) => {
    console.error(e);
    if (e.code === '23503') return res.status(400).json({ mensagem: 'Registro relacionado não encontrado.' });
    if (e.code === '23514') return res.status(400).json({ mensagem: 'Dados inválidos (verifique datas, times e números).' });
    res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  };
  const faltando = (d) => cfg.obrigatorios.find((c) => d[c] === undefined || d[c] === null || String(d[c]).trim() === '');

  return {
    listar: async (req, res) => {
      try { res.json(await model.listar(req.usuario.id)); } catch (e) { erro(res, e); }
    },
    criar: async (req, res) => {
      try {
        if (faltando(req.body)) return res.status(400).json({ mensagem: 'Preencha os campos obrigatórios.' });
        res.status(201).json(await model.criar(req.usuario.id, req.body));
      } catch (e) { erro(res, e); }
    },
    atualizar: async (req, res) => {
      try {
        if (faltando(req.body)) return res.status(400).json({ mensagem: 'Preencha os campos obrigatórios.' });
        const r = await model.atualizar(req.usuario.id, req.params.id, req.body);
        if (!r) return res.status(404).json({ mensagem: 'Registro não encontrado.' });
        res.json(r);
      } catch (e) { erro(res, e); }
    },
    excluir: async (req, res) => {
      try {
        const ok = await model.excluir(req.usuario.id, req.params.id);
        if (!ok) return res.status(404).json({ mensagem: 'Registro não encontrado.' });
        res.json({ mensagem: 'Excluído com sucesso.' });
      } catch (e) { erro(res, e); }
    },
  };
};
