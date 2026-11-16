-- Conecta Vôlei - PostgreSQL / Supabase
CREATE TABLE IF NOT EXISTS usuarios (
  id        SERIAL PRIMARY KEY,
  nome      VARCHAR(120) NOT NULL,
  email     VARCHAR(160) NOT NULL UNIQUE,
  telefone  VARCHAR(20),
  senha     VARCHAR(100) NOT NULL,           -- hash bcrypt
  criado_em TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS times (
  id         SERIAL PRIMARY KEY,
  usuario_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  nome       VARCHAR(100) NOT NULL,
  categoria  VARCHAR(60),
  tecnico    VARCHAR(100),
  criado_em  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS jogadores (
  id         SERIAL PRIMARY KEY,
  usuario_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  time_id    INT REFERENCES times(id) ON DELETE SET NULL,
  nome       VARCHAR(120) NOT NULL,
  posicao    VARCHAR(40),
  camisa     INT CHECK (camisa BETWEEN 0 AND 99),
  criado_em  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS campeonatos (
  id          SERIAL PRIMARY KEY,
  usuario_id  INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  nome        VARCHAR(120) NOT NULL,
  inicio      DATE,
  fim         DATE,
  visibilidade VARCHAR(10) NOT NULL DEFAULT 'publico' CHECK (visibilidade IN ('publico','privado')),
  criado_em   TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (fim IS NULL OR inicio IS NULL OR fim >= inicio)
);

CREATE TABLE IF NOT EXISTS partidas (
  id            SERIAL PRIMARY KEY,
  usuario_id    INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  campeonato_id INT REFERENCES campeonatos(id) ON DELETE SET NULL,
  time_a_id     INT NOT NULL REFERENCES times(id) ON DELETE CASCADE,
  time_b_id     INT NOT NULL REFERENCES times(id) ON DELETE CASCADE,
  data_jogo     DATE NOT NULL,
  hora          TIME,
  local         VARCHAR(150),
  placar_a      INT,
  placar_b      INT,
  criado_em     TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (time_a_id <> time_b_id)
);

CREATE TABLE IF NOT EXISTS checklist (
  id         SERIAL PRIMARY KEY,
  usuario_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  item       VARCHAR(200) NOT NULL,
  concluido  BOOLEAN NOT NULL DEFAULT FALSE,
  criado_em  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_times_usuario      ON times(usuario_id);
CREATE INDEX IF NOT EXISTS idx_jogadores_usuario  ON jogadores(usuario_id);
CREATE INDEX IF NOT EXISTS idx_jogadores_time     ON jogadores(time_id);
CREATE INDEX IF NOT EXISTS idx_partidas_usuario   ON partidas(usuario_id);
CREATE INDEX IF NOT EXISTS idx_partidas_data      ON partidas(data_jogo);
CREATE INDEX IF NOT EXISTS idx_checklist_usuario  ON checklist(usuario_id);
