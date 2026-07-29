const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Muestra la lista de reproducción actual'),
    async execute(interaction, client) {
        const queue = client.distube.getQueue(interaction);

        if (!queue) {
            return interaction.reply({ content: '❌ No hay música reproduciéndose en este momento.', ephemeral: true });
        }

        // Mapear las primeras 10 canciones de la cola
        const tracks = queue.songs.slice(0, 10).map((song, index) => {
            if (index === 0) {
                return `**Reproduciendo ahora:** ${song.name} - \`${song.formattedDuration}\``;
            } else {
                return `**${index}.** ${song.name} - \`${song.formattedDuration}\``;
            }
        }).join('\n');

        // Si hay más de 10 canciones, agregar un indicador extra
        const extraSongs = queue.songs.length > 10 
            ? `\n...y ${queue.songs.length - 10} canciones más.` 
            : '';

        await interaction.reply(`📜 **Cola de Reproducción:**\n\n${tracks}${extraSongs}`);
    },
};