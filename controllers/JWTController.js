// authController.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res) => {
  try {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({ user: null, isValid: false });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ user: null, isValid: false });

      res.status(200).json({ user: decoded, isValid: true });
    });
  } catch (error) {
    console.error(`Erro no servidor: ${error}`);
    res.status(500).send('Erro no servidor');
  }
};

module.exports = {
  verifyToken
};
