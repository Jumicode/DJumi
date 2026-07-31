FROM node:22-bookworm-slim

# Instalar ffmpeg, python y build-essential
RUN apt-get update && apt-get install -y ffmpeg python3 python-is-python3 build-essential

WORKDIR /app

# 1. Copiar los archivos de configuración de npm
COPY package*.json ./
# 2. COPIAR LA CARPETA DE PARCHES ANTES DE INSTALAR
COPY patches/ ./patches/

# 3. Ahora npm install encontrará el parche y lo aplicará correctamente
RUN npm install

# 4. Copiar el resto de tu código (src, index.js, etc.)
COPY . .

# Iniciar el bot
CMD ["node", "src/index.js"]