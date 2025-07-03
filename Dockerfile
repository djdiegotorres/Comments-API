FROM node:18

WORKDIR /app

# Copie só os package.json e instale dentro do container
COPY package*.json ./
RUN npm install

# Agora copie o restante da aplicação
COPY . .

EXPOSE 3000

CMD ["node", "index.js"]