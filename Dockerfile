FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000

# Adiciona o comando de migration antes de rodar a app
CMD npx knex migrate:latest && node index.js