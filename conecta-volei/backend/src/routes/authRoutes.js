const router = require('express').Router();
const auth = require('../middlewares/auth');
const c = require('../controllers/authController');

router.post('/cadastro', c.cadastrar);
router.post('/login', c.login);
router.get('/perfil', auth, c.perfil);

module.exports = router;
