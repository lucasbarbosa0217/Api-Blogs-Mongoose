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

app.use(cors({
    origin:['http://localhost:3000', `https://react-base-sage.vercel.app`, `https://react-base-qjep.onrender.com`], // Define a origem permitida (seu aplicativo React)
    credentials: true, // Permite o envio de cookies e autenticação
}));

app.use(express.static(path.join(__dirname, 'build')));

app.use(cookieParser());
app.use(helmet());
app.use(bodyParser.json());

connectDB();

app.use('/api', apiRoutes);

// Esta rota deve ser definida após as rotas da API
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});
