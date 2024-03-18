require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/apiRoutes');
const bodyParser = require('body-parser'); // Adicionando o body-parser

const app = express();

app.use(cors({
    origin:['http://localhost:3000', `https://react-base-sage.vercel.app`, `https://react-base-qjep.onrender.com`], // Define a origem permitida (seu aplicativo React)
    credentials: true, // Permite o envio de cookies e autenticação
  }));



app.use(cookieParser());

app.use(helmet());

app.use(bodyParser.json());



connectDB();

app.use('/api', apiRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
