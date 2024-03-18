const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../utils/logger');


const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body)
    const { username, password } = req.body;

    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: 'Usuário já existe' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      username,
      password: hashedPassword
    });

    await user.save();

    res.status(200).json({ msg: 'Usuário registrado com sucesso' });
    logger.info(`Novo usuário registrado: ${username}`);
  } catch (error) {
    logger.error(`Erro no servidor: ${error}`);
    res.status(500).send('Erro no servidor');
  }
};



const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    let user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: 'Credenciais inválidas' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
    logger.info(`Usuário fez login: ${username}`);
  } catch (error) {
    logger.error(`Erro no servidor: ${error}`);
    res.status(500).send('Erro no servidor');
  }
};


module.exports = {
  register,
  login
};
