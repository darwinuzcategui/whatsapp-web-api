// routes/whatsapp.js
const express = require('express');
const router = express.Router();
const { Client  } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Inicializar el cliente de WhatsApp
const client = new Client({
    puppeteer: {
        headless: true, // false sale el navegador
        args: ['--no-sandbox', '--disable-setuid-sandbox'] // Necesario en algunos entornos Linux
 
    },
});

 let receivedMessages = []; // Arreglo para almacenar los mensajes recibidos

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    console.log('Escaneando código QR...');
});

client.on('ready', () => {
    console.log('Client esta Listo Para enviar!');
    console.log('Para salir de api de envio pulsar Crt+ c');
    console.log('Para salir o Cerrar la ventana');
    console.log(' -----------------------------------------');
});


client.on('message_create', message => {


    // Guardar los mensajes entrantes
    receivedMessages.push({
        id: message.id._serialized,
        from: message.from,
        body: message.body,
        timestamp: message.timestamp,
    });

    // Ejemplo de respuesta a un comando específico
    //if (message.body === 'Saldo') {
    //    message.reply('su saldo es  Bs. XXXXX,XX');
   //}
   
    if (!message.body.toLowerCase().startsWith('apuestasx:') && !message.body.toLowerCase().startsWith('Esta es una cuenta de whatsapp no monitoreada') ) {
        const autoReply = 'Esta es una cuenta de whatsapp no monitoreada, *comuniquese directamente con atención al cliente.*';
    
        if (message.body !== autoReply) {
            message.reply(autoReply);
        }
    } 
});


client.initialize();

// Endpoint para enviar un mensaje
router.post('/send', async (req, res) => {
    const { toPhoneNumber, message } = req.body;

    if (!toPhoneNumber || !message) {
        return res.status(400).json({ error: 'Número de destino y mensaje son requeridos' });
    }

    try {
        const chatId = `${toPhoneNumber}@c.us`;
        const response = await client.sendMessage(chatId, message);
        res.json({ message: 'Mensaje enviado', response });
    } catch (error) {
        console.error('Error al enviar mensaje:', error);
        res.status(500).json({ error: 'Error al enviar mensaje' });
    }
});

// Endpoint para obtener los mensajes recibidos
router.get('/messages', (req, res) => {
    res.json({ messages: receivedMessages });
});

// Endpoint para obtener información sobre la API
router.get('/', (req, res) => {
    const apiInfo = {
        api: "WhatsApp Web API",
        version: "1.0",
        description: "API para enviar y recibir mensajes de WhatsApp mediante whatsapp-web.js",
        baseUrl: "http://localhost:3000/api/whatsapp",
        status: client.info ? "Conectado" : "Desconectado",
        endpoints: [
            {
                method: "POST",
                path: "/send",
                description: "Envía un mensaje a un número de WhatsApp",
                requestExample: {
                    body: {
                        toPhoneNumber: "584241234567",
                        message: "Hola, esto es un mensaje de prueba"
                    }
                },
                responseExample: {
                    message: "Mensaje enviado",
                    response: {
                        id: "true_584241234567@c.us_3EB0F403D95F806E2D"
                    }
                }
            },
            {
                method: "GET",
                path: "/messages",
                description: "Obtiene el historial de mensajes recibidos",
                responseExample: {
                    messages: [
                        {
                            id: "3EB0F403D95F806E2D",
                            from: "584241234567@c.us",
                            body: "Hola, cómo estás?",
                            timestamp: 1625097600
                        }
                    ]
                }
            },
            {
                method: "GET",
                path: "/",
                description: "Documentación de la API (este endpoint)"
            }
        ],
        notes: [
            "Requiere autenticación mediante código QR (escaneo inicial)",
            "El número debe incluir código de país sin signos (ej: 584241234567)",
            "Los mensajes se almacenan en memoria (se pierden al reiniciar el servidor)"
        ],
        repository: "https://github.com/darwinuzcategui/whatsapp-web-api"
    };
    
    res.json({
        success: true,
        data: apiInfo,
        timestamp: new Date().toISOString()
    });
});

module.exports = router;