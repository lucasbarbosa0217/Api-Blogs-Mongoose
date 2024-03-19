const express = require('express');
const router = express.Router();
const { registerValidation, loginValidation, postBlogValidation } = require('../middleware/validation');
const userController = require('../controllers/userController');
const blogController = require('../controllers/blogController');
const { verifyToken } = require("../controllers/JWTController");
const csrf = require('csrf');

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

router.get('/health', (req, res) => {
  res.status(200).send('API está saudável');
});


const tokens = new csrf();

router.post('/postBlog', (req, res, next) => {
    const secret = process.env.JWT_SECRET; 
    const token = req.cookies['XSRF-TOKEN']; 
    if (tokens.verify(secret, token)) {
        next(); 
    } else {
        return res.status(403).send('Token CSRF inválido');
    }
}, postBlogValidation, blogController.postBlog);


router.post('/register', registerValidation, userController.register);
router.post('/login', loginValidation, userController.login);

router.get('/verifyToken', verifyToken);

module.exports = router;
