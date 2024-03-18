// apiRoutes.js

const express = require('express');
const router = express.Router();
const { registerValidation, loginValidation, postBlogValidation } = require('../middleware/validation');
const userController = require('../controllers/userController');
const blogController = require('../controllers/blogController');
const {verifyToken} = require("../controllers/JWTController") 

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

router.get('/health', (req, res) => {
  res.status(200).send('API está saudável');
});


router.post('/postBlog', postBlogValidation, blogController.postBlog);

// Rotas para registro e login com validação
router.post('/register', registerValidation, userController.register);
router.post('/login', loginValidation, userController.login);
router.get('/verifyToken', verifyToken);


module.exports = router;
