module.exports = {
    name: 'playSong',
    execute(queue, song) {
        queue.textChannel.send(`🎶 Reproduciendo ahora: **${song.name}** - \`${song.formattedDuration}\`\nSolicitada por: ${song.user}`);
    },
};