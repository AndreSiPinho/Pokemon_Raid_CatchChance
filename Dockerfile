# Build stage
FROM node:20 AS build

WORKDIR /app

COPY client/package*.json ./client/
COPY server/package*.json ./server/

WORKDIR /app/client
RUN npm ci

WORKDIR /app/server
RUN npm ci --omit=dev

WORKDIR /app
COPY . .

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
