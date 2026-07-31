# 🎵 Discord Music Bot

Un bot de música para Discord de alto rendimiento construido con Node.js, discord.js y DisTube. Utiliza Slash Commands para una experiencia de usuario moderna y está optimizado para evadir los bloqueos anti-bots de YouTube mediante inyección de cookies y parches personalizados.

## ✨ Características

- 🚀 Slash Commands nativos: interfaz moderna e integrada en Discord.
- 🎶 Reproducción estable: transmisión de audio de alta calidad sin interrupciones.
- 🛡️ Bypass de bloqueos de YouTube: integración de cookies.txt para autenticación y evasión de bloqueos en centros de datos.
- 🔧 Parches automatizados: uso de patch-package para corregir dependencias internas de yt-dlp en tiempo de despliegue.
- 🐳 Listo para la nube: configurado con un Dockerfile a medida que incluye ffmpeg y herramientas de compilación para C++.

## 🛠️ Tecnologías Utilizadas

- Lenguaje: JavaScript (Node.js)
- Librería de Discord: discord.js v14
- Motor de Audio: DisTube
- Extractor: @distube/yt-dlp
- Despliegue: Docker / Railway

## 📋 Comandos Disponibles

| Comando | Descripción |
| :--- | :--- |
| `/play [canción/url]` | Busca y reproduce una canción o la añade a la cola de espera. |
| `/queue` | Muestra las próximas 10 canciones en la lista de reproducción actual. |
| `/skip` | Salta la canción que se está reproduciendo actualmente. |
| `/stop` | Detiene la reproducción, limpia la cola y desconecta al bot. |

## 🚀 Requisitos Previos (Instalación Local)

Si deseas correr este proyecto en tu entorno local, necesitas tener instalado:

- Node.js (v16.9.0 o superior, recomendado v22+)
- FFmpeg instalado y agregado al PATH de tu sistema.
- Python 3 y herramientas de compilación de C++ (Build Essentials / Visual Studio Build Tools) para el motor Opus.

## ⚙️ Configuración e Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
```

2. Instalar dependencias:

```bash
npm install
```

Nota: al finalizar la instalación, patch-package se ejecutará automáticamente para aplicar las correcciones a yt-dlp.

3. Variables de entorno:

Crea un archivo llamado `.env` en la raíz del proyecto y añade tus credenciales:

```env
DISCORD_TOKEN=tu_token_del_bot_aqui
CLIENT_ID=id_de_la_aplicacion
GUILD_ID=id_de_tu_servidor_de_pruebas
```

4. Inyectar Cookies de YouTube:

Para evitar bloqueos por IP, exporta las cookies de una cuenta de YouTube secundaria usando una extensión como Get cookies.txt LOCALLY. Guarda el archivo en la raíz del proyecto con el nombre exacto de cookies.txt.

5. Registrar los comandos en Discord:

Ejecuta el script de despliegue para enviar los comandos a la API de Discord:

```bash
node src/deploy-commands.js
```

6. Iniciar el bot:

```bash
npm start
```

## ☁️ Despliegue en Railway (o Docker)

Este proyecto incluye un Dockerfile optimizado basado en bookworm-slim que instala automáticamente ffmpeg y las herramientas esenciales de compilación.

Para desplegar:

1. Sube tu código a GitHub, asegurándote de que cookies.txt y la carpeta patches/ se suban al repositorio.
2. Conecta tu repositorio a Railway.
3. En la configuración de Railway, añade las variables de entorno: DISCORD_TOKEN, CLIENT_ID y GUILD_ID.
4. Railway detectará el Dockerfile, compilará las dependencias de audio nativas y levantará el bot automáticamente.

## 📝 Notas de Desarrollo

- Error de --no-call-home: este error nativo de yt-dlp está solucionado mediante un parche automatizado con patch-package que modifica la dependencia post-instalación.
- Formato de Audio: el motor de extracción está forzado a buscar "bestaudio/best" para prevenir errores de formato no disponible en servidores de producción.
