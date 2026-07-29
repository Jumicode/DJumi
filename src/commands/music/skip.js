const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Salta la canción actual'),
    async execute(interaction, client) {
        const queue = client.distube.getQueue(interaction);

        if (!queue) {
            return interaction.reply({ content: '❌ No hay música reproduciéndose en este momento.', ephemeral: true });
        }

        try {
            // Si solo queda una canción y el autoplay está apagado, simplemente detenemos la música
            if (queue.songs.length === 1 && !queue.autoplay) {
                queue.stop();
                await interaction.reply('⏭️ Canción saltada. No hay más pistas en la cola, deteniendo la música.');
            } else {
                // Saltar a la siguiente canción
                await queue.skip();
                await interaction.reply('⏭️ Canción saltada.');
            }
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Hubo un error al intentar saltar la canción.', ephemeral: true });
        }
    },
};