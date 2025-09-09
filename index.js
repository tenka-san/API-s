const {
  default: makeWASocket,
  prepareWAMessageMedia, 
  removeAuthState,
  useMultiFileAuthState, 
  DisconnectReason, 
  fetchLatestBaileysVersion, 
  makeInMemoryStore, 
  generateWAMessageFromContent, 
  generateWAMessageContent, 
  generateWAMessage,
  jidDecode, 
  proto, 
  delay,
  relayWAMessage, 
  getContentType, 
  generateMessageTag,
  getAggregateVotesInPollMessage, 
  downloadContentFromMessage, 
  fetchLatestWaWebVersion, 
  InteractiveMessage, 
  makeCacheableSignalKeyStore, 
  Browsers, 
  generateForwardMessageContent, 
  MessageRetryMap 
} = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const axios = require('axios');
const readline = require('readline');
const fs = require('fs');
const pino = require('pino');
const express = require('express');
const bodyParser = require('body-parser');  
const cors = require("cors");  
const path = require("path");
const app = express();
const PORT = process.env.PORT || process.env.SERVER_PORT || 2000;

app.use(cors());
app.use(express.json());

const question = (y) => {
    const rl = readline.createInterface({
        input: process.stdin,   
        output: process.stdout   
    })
    return new Promise((resolve) => {  
        rl.question(y, resolve)   
    });  
}
async function koneksi() {
  const { state, saveCreds } = await useMultiFileAuthState('./session');
  const Yuukey = makeWASocket({
    auth: state,
    browser: ['Ubuntu', 'Chrome', '20.0.00'],
    logger: pino({
      level: 'silent'
    }),
    printQRInTerminal: false
  });

  if(!Yuukey.authState.creds.registered) {
    const nomor = await question("Masukan Nomor Anda Sebelum Mengaktifkan API's");
    const Kode = await Yuukey.requestPairingCode(nomor, "YUKIPEDO");
    console.log('Kode Pairing Anda Adalah' + Kode);
  }
}
