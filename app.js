// app.js
// Proyecto Node.js que envía un mensaje "hola" a un número usando whatsapp-web.js

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('Escanea el código QR con WhatsApp para iniciar sesión.');
});

client.on('ready', () => {
    console.log('Cliente listo, enviando mensaje...');
    const numero = '595972408006';
    const chatId = `${numero}@c.us`;
    client.sendMessage(chatId, 'hola').then(() => {
        console.log('Mensaje enviado a', numero);
        client.destroy();
    }).catch(console.error);
});

client.initialize();
