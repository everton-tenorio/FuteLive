# Use uma imagem base do Node.js mais atualizada
FROM node:latest

# Crie um diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json (se existirem) para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o código do aplicativo para o diretório de trabalho
COPY . .

# Defina a porta que o aplicativo irá expor
EXPOSE 3000

# Inicie o aplicativo usando o Node.js
CMD [ "node", "app.js" ]
