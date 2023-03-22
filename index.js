const express = require('express');
const qrcode = require('qr-image');
const { Client } = require('whatsapp-web.js');
const client = new Client({
    puppeteer: {
        args: ['--no-sandbox'],
    }
});
const app = express();

app.get('/', (req, res) => {
    client.on('qr', qr => {
        const qrCode = qrcode.imageSync(qr, { type: 'png' });
        const qrCodeURI = `data:image/png;base64,${qrCode.toString('base64')}`;
        res.send(`<img src="${qrCodeURI}">`);
    });

});
app.listen(
    process.env.PORT || 3000,
)

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();

client.on('message', message => {
	if(message.body === '/ping') {
		message.reply('pong');
	}
});
