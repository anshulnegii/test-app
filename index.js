const express = require('express');
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const client = new Client({
    puppeteer: {
        args: ['--no-sandbox'],
    }
});
const app = express();

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();

client.on('message', message => {
	if(message.body === '/ping') {
		message.reply('pong');
	}
});
