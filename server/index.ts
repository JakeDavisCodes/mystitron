require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

// MIDDLE WARE
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendStatus(200)
});

app.listen(process.env.PORT);
console.log(`LISTENING AT PORT: ${process.env.PORT}`);
