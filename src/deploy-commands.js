require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

const commands = [];
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

// Leer todas las subcarpetas y archivos de comandos
for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        } else {
            console.log(`[ADVERTENCIA] Al comando en ${filePath} le falta una propiedad "data" o "execute".`);
        }
    }
}

// Instanciar el módulo REST
const rest = new REST().setToken(process.env.DISCORD_TOKEN);

// Desplegar los comandos
(async () => {
    try {
        console.log(`Iniciando actualización de ${commands.length} comandos de aplicación (/) ...`);

        // La ruta Routes.applicationGuildCommands registra comandos solo en tu servidor de pruebas.
        const data = await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands },
        );

        console.log(`Comandos de barra recargados exitosamente: ${data.length}`);
    } catch (error) {
        console.error('Error al registrar comandos:', error);
    }
})();