// blogController.js
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const Blog = require('../models/Blog');
const logger = require('../utils/logger');

const postBlog = async (req, res) => {
  try {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({ msg: 'Token não fornecido' });

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) return res.status(401).json({ msg: 'Token inválido' });

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, content } = req.body;

      try {
        const newBlog = new Blog({
          title,
          content,
          author: decoded.username
        });

        await newBlog.save();

        res.status(201).json({ msg: 'Blog postado com sucesso' });
        logger.info(`Novo blog postado por: ${decoded.username}`);
      } catch (error) {
        logger.error(`Erro no servidor: ${error}`);
        res.status(500).send('Erro no servidor');
      }
    });
  } catch (error) {
    logger.error(`Erro no servidor: ${error}`);
    res.status(500).send('Erro no servidor');
  }
};

module.exports = {
  postBlog
};
