require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const appRouter = require('./router.ts')

const app = express();
const port: number | string = process.env.PORT || 3000

// MIDDLE WARE
app.use(morgan('dev'));
app.use(express.json());

// ROUTER
app.use(appRouter)

app.listen(process.env.PORT);
console.log(`LISTENING AT PORT: ${process.env.PORT}`);
