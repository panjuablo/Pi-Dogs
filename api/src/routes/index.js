const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routeName = require('./routeName');
const routeTemps = require('./routeTemps');
const routePost = require('./routePost')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', routeName);
router.use('/temperaments', routeTemps);
router.use('/dog', routePost);



module.exports = router;
