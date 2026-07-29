module.exports = {
    name: 'addSong',
    execute(queue, song) {
        queue.textChannel.send(` Añadida a la cola: **${song.name}** - \`${song.formattedDuration}\``);
    },
};