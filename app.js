require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

const connectDB = require('./config/db');
const apiRoutes = require('./routes/apiRoutes');
const bodyParser = require('body-parser'); // Adicionando o body-parser

const app = express();

const csrf = require('csrf');
const tokens = new csrf();

app.use(cookieParser());

app.use((req, res, next) => {
    const secret = process.env.JWT_SECRET;
    const token = tokens.create(secret);
    res.cookie('XSRF-TOKEN', token);
    next();
});

app.use(cors({
    origin:['*'],
    credentials: true, 
}));

app.use(express.static(path.join(__dirname, 'build')));
app.use(helmet());
app.use(bodyParser.json());

connectDB();

app.use('/api', apiRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});
