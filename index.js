import express from 'express';
import http from 'http';
import fs from 'fs';
import crypto from 'crypto';
import bodyParser from 'body-parser';

import appSrc from './app.js';
const app = appSrc(express, bodyParser, fs.createReadStream, crypto, http);

var server = http.createServer(app);

server.listen(9443);