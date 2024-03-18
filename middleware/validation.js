const { body } = require('express-validator');

const registerValidation = [
  body('username').isLength({ min: 3 }).withMessage('O nome de usuário deve ter pelo menos 3 caracteres'),
  body('password').isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres')
];

const loginValidation = [
  body('username').notEmpty().withMessage('O nome de usuário é obrigatório'),
  body('password').notEmpty().withMessage('A senha é obrigatória')
];

const postBlogValidation = [
  body('title').notEmpty().withMessage('O título do blog é obrigatório'),
  body('content').notEmpty().withMessage('O conteúdo do blog é obrigatório')
];

module.exports = {
  registerValidation,
  loginValidation,
  postBlogValidation
};
