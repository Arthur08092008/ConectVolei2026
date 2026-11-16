# Conecta Vôlei

## 1. Banco (Supabase / PostgreSQL)
Abra o SQL Editor do Supabase, cole o conteúdo de `backend/schema.sql` e execute.

## 2. Backend
```
cd backend
npm install
copy .env.example .env     (preencha DATABASE_URL e JWT_SECRET)
npm run dev                (http://localhost:3000)
```

## 3. Frontend
```
cd frontend
npm install
copy .env.example .env
npm run dev                (http://localhost:5173)
```

## Rotas da API (todas, exceto /auth/cadastro e /auth/login, exigem Authorization: Bearer <token>)
| Método | Rota | Descrição |
|---|---|---|
| POST | /auth/cadastro | cria conta e devolve token |
| POST | /auth/login | devolve token |
| GET | /auth/perfil | dados do usuário logado |
| GET/POST | /times, /jogadores, /partidas, /campeonatos, /checklist | listar / criar |
| PUT/DELETE | /{recurso}/:id | editar / excluir |
