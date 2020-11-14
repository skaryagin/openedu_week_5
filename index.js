import express from 'express';
import https from 'https';
import http from 'http';
import fs from 'fs';
import crypto from 'crypto';
import bodyParser from 'body-parser';

import appSrc from './app.js';
const app = appSrc(express, bodyParser, fs, crypto, http);

var key = fs.readFileSync('./certs/selfsigned.key');
var cert = fs.readFileSync('./certs/selfsigned.crt');
var options = {
  key: key,
  cert: cert
};

var server = https.createServer(options, app);

server.listen(process.env.PORT || 8443);
