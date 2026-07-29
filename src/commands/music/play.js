const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Reproduce una canción o playlist')
        .addStringOption(option => 
            option.setName('query')
                .setDescription('El nombre de la canción o URL')
                .setRequired(true)
        ),
    async execute(interaction, client) {
        const query = interaction.options.getString('query');
        const voiceChannel = interaction.member.voice.channel;

        if (!voiceChannel) {
            return interaction.reply({ content: '¡Debes estar en un canal de voz!', ephemeral: true });
        }

        // Le decimos a Discord que estamos procesando la solicitud
        await interaction.deferReply(); 

        try {
            await client.distube.play(voiceChannel, query, {
                textChannel: interaction.channel,
                member: interaction.member,
            });
            await interaction.editReply(`Buscando y añadiendo: **${query}**...`);
        } catch (error) {
            console.error(error);
            await interaction.editReply('Hubo un error al intentar reproducir la pista.');
        }
    },
};