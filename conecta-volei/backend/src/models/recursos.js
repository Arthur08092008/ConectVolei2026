// Configuração das tabelas CRUD: times, jogadores, partidas, campeonatos, checklist
module.exports = {
  times: {
    tabela: 'times',
    campos: ['nome', 'categoria', 'tecnico'],
    obrigatorios: ['nome'],
    listar: 'SELECT * FROM times WHERE usuario_id = $1 ORDER BY nome',
  },
  jogadores: {
    tabela: 'jogadores',
    campos: ['nome', 'posicao', 'camisa', 'time_id'],
    obrigatorios: ['nome'],
    listar: `SELECT j.*, t.nome AS time_nome FROM jogadores j
             LEFT JOIN times t ON t.id = j.time_id
             WHERE j.usuario_id = $1 ORDER BY j.nome`,
  },
  partidas: {
    tabela: 'partidas',
    campos: ['time_a_id', 'time_b_id', 'data_jogo', 'hora', 'local', 'campeonato_id', 'placar_a', 'placar_b'],
    obrigatorios: ['time_a_id', 'time_b_id', 'data_jogo'],
    listar: `SELECT p.*, ta.nome AS time_a_nome, tb.nome AS time_b_nome, c.nome AS campeonato_nome
             FROM partidas p
             JOIN times ta ON ta.id = p.time_a_id
             JOIN times tb ON tb.id = p.time_b_id
             LEFT JOIN campeonatos c ON c.id = p.campeonato_id
             WHERE p.usuario_id = $1 ORDER BY p.data_jogo, p.hora`,
  },
  campeonatos: {
    tabela: 'campeonatos',
    campos: ['nome', 'inicio', 'fim', 'visibilidade'],
    obrigatorios: ['nome'],
    padroes: { visibilidade: 'publico' },
    listar: `SELECT *, (usuario_id = $1) AS meu FROM campeonatos
             WHERE visibilidade = 'publico' OR usuario_id = $1
             ORDER BY inicio DESC NULLS LAST, nome`,
  },
  checklist: {
    tabela: 'checklist',
    campos: ['item', 'concluido'],
    obrigatorios: ['item'],
    padroes: { concluido: false },
    listar: 'SELECT * FROM checklist WHERE usuario_id = $1 ORDER BY concluido, id',
  },
};
