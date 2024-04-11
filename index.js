const axios = require('axios');
const keep_alive = require('./keep_alive.js')
const reminderMessage = '# !ksmk ksmk ksmk ksmk ksmk ksmk ksmk ksmk ksmk ksmk ksmk ksmk ksmk ksmk ksmk ksmk ksmk ksmk ksmk ksmk ksmk ksmk ksmk ksmk ksmk ksmk ksmk ksmk ksmk ksmk ksmk ksmk ksmk ksmk ksmk ksmk ksmk ksmk ksmk ksmk ksmk ksmk ksmk ksmk @everyone (اعدائي)';
 const intervalMilliseconds = 10000;

const tokens = [
    process.env.token
];
const channelIds = [
    '1227959257119592489',
    '1227959377240002570',
    '1227959457187631236',
    '1227959519334895616',
    '1227959756321325086',
    '1227960176024354836',
    '1227960230101385300',
    '1227960320727977995',
    '1227960419747102740',
    '1227960481462091826'
];

async function sendMessages() {
    const promises = [];
    for (const token of tokens) {
        for (const channelId of channelIds) {
            promises.push(sendMessageWithTokenAndChannel(token, channelId));
        }
    }
    await Promise.all(promises);
}

async function sendMessageWithTokenAndChannel(token, channelId) {
    const headers = { authorization: token };
    const data = { content: reminderMessage };

    try {
        await axios.post(`https://discord.com/api/v8/channels/${channelId}/messages`, data, { headers });
    } catch (error) {
        console.error(`Error sending message to channel ${channelId} with token ${token}: ${error}`);
    }
}

function startSendingMessages() {
    setInterval(() => {
        sendMessages();
    }, intervalMilliseconds);
}

startSendingMessages();
