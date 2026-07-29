const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Detiene la música y limpia la cola de reproducción'),
    async execute(interaction, client) {
        // Obtener la cola de reproducción actual del servidor
        const queue = client.distube.getQueue(interaction);

        if (!queue) {
            return interaction.reply({ content: '❌ No hay música reproduciéndose en este momento.', ephemeral: true });
        }

        // Detener la música
        queue.stop();
        await interaction.reply('🛑 Música detenida y cola limpiada. ¡Hasta luego!');
    },
};