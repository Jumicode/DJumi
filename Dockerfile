FROM node:22-bookworm-slim

# Instalar ffmpeg y dependencias necesarias para yt-dlp
RUN apt-get update && apt-get install -y ffmpeg python3 python-is-python3

WORKDIR /app

# Instalar dependencias de Node
COPY package*.json ./
RUN npm install

# Copiar el resto del código
COPY . .

# Iniciar el bot
CMD ["node", "src/index.js"]