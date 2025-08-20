const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('Escanea el código QR con WhatsApp para iniciar sesión.');
});

client.on('authenticated', () => {
    console.log('Autenticación exitosa');
});

client.on('ready', async () => {
    console.log('Cliente listo, enviando mensaje...');
    
    try {
        const numero = '595972408006';
        const chatId = `${numero}@c.us`;
        
        // Verificar si el número existe antes de enviar
        const isValid = await client.isRegisteredUser(chatId);
        
        if (isValid) {
            await client.sendMessage(chatId, 'hola');
            console.log('Mensaje enviado a', numero);
        } else {
            console.log('El número no está registrado en WhatsApp:', numero);
        }
        
        // Pequeño delay antes de cerrar
        setTimeout(() => {
            client.destroy();
            console.log('Cliente cerrado');
        }, 2000);
        
    } catch (error) {
        console.error('Error al enviar mensaje:', error);
    }
});

client.on('auth_failure', msg => {
    console.error('Error de autenticación:', msg);
});

client.on('disconnected', (reason) => {
    console.log('Cliente desconectado:', reason);
});

client.initialize();
