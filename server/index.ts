require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const appRouter = require('./router')

const app = express();

// MIDDLE WARE
app.use(morgan('dev'));
app.use(express.json());

// ROUTER
app.use(appRouter)

app.listen(process.env.PORT);
console.log(`LISTENING AT PORT: ${process.env.PORT}`);
