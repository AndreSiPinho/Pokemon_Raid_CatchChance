# Publicacao

## Estrutura

- `client`: frontend Vite/React
- `server`: API Express

## Desenvolvimento local

### Backend

```powershell
cd server
npm install
npm run dev
```

### Frontend

```powershell
cd client
npm install
npm run dev
```

Em desenvolvimento, o Vite faz proxy para a API em `http://localhost:3000`.

## Build para producao

```powershell
cd client
npm run build
```

Depois:

```powershell
cd ../server
npm install
$env:NODE_ENV="production"
npm start
```

O servidor Express serve automaticamente o `client/dist` em producao.

## Variaveis de ambiente

### Frontend

`client/.env`

```env
VITE_API_URL=
```

- deixa vazio se frontend e backend forem servidos no mesmo dominio
- usa um URL completo se a API ficar noutro host, por exemplo `https://api.exemplo.com`

### Backend

`server/.env`

```env
PORT=3000
CLIENT_ORIGIN=*
NODE_ENV=development
```

- em producao, define `CLIENT_ORIGIN` para o dominio do frontend se precisares de CORS restrito
- se o backend servir o frontend buildado no mesmo dominio, podes manter `VITE_API_URL=` vazio
