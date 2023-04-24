const express = require('express');
require('dotenv').config();
require('./db/mongoose');
const cors = require('cors');
const authRouter = require('./routers/auth');
const itemRouter = require('./routers/item');

const app = express();

app.use(cors({ origin: '*', credential: true }));
app.use(express.json());

app.use('/auth', authRouter);
app.use('/items', itemRouter);
app.get('/', (_req,res) => res.send('Good Morning!'));

const port = process.env.PORT;
app.listen(port, () => console.log('app is listening on',port));