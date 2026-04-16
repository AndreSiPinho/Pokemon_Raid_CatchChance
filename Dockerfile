# Build stage
FROM node:20 AS build

WORKDIR /app

COPY client/package*.json ./client/
COPY server/package*.json ./server/

# CLIENT
WORKDIR /app/client
RUN npm install

# SERVER
WORKDIR /app/server
RUN npm install --omit=dev

# copiar resto do código
WORKDIR /app
COPY . .

# build frontend
WORKDIR /app/client
RUN npm run build

# Production stage
FROM node:20

WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app/client/dist ./client/dist
COPY --from=build /app/server ./server

WORKDIR /app/server

CMD ["node", "src/index.js"]