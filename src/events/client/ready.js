module.exports = {
    name: 'ready',
    once: true, // Indica que este evento solo debe ejecutarse la primera vez
    execute(client) {
        console.log(`¡Bot en línea! Conectado exitosamente como ${client.user.tag}`);
    },
};