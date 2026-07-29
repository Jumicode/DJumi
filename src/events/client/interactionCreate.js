module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        // Ignorar si la interacción no es un comando de barra
        if (!interaction.isChatInputCommand()) return;

        // Buscar el comando en la memoria del bot
        const command = client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No se encontró el comando ${interaction.commandName}.`);
            return;
        }

        try {
            await command.execute(interaction, client);
        } catch (error) {
            console.error(`Error ejecutando ${interaction.commandName}`);
            console.error(error);
            
            // Manejo de errores por si la API de Discord tarda en responder
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'Hubo un error al ejecutar este comando.', ephemeral: true });
            } else {
                await interaction.reply({ content: 'Hubo un error al ejecutar este comando.', ephemeral: true });
            }
        }
    },
};