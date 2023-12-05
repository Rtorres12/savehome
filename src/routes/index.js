const express= require('express');
const router = express.Router();
const bd_control = require('../controller/bd-controller');

router.get('/categoria/:cat',bd_control.prodcat);
router.get('/subcategoria/:cat',bd_control.prodsubcat);

router.get('/',bd_control.principal);

router.get('/admin',(req, res)=>{

    res.render('login.html');
});

router.get('/login',(req, res)=>{

    res.render('userlogin.html');
});
router.post('/nuevoUsuario',bd_control.addUser);

router.post('/userlogin',bd_control.validateUser);

router.get('/userRegister',bd_control.userRegister);


router.post('/loginvalidate',bd_control.login);
router.get('/adminpage/:username/:password',bd_control.log);

router.get('/producto',bd_control.prodList);
router.post('/productoFil',bd_control.prodListFil);

router.get('/subcat/:id',bd_control.subcat);
router.get('/cambiarclave/:id/:nuevaclave',bd_control.nuevaclave);

router.post('/nuevoProd',bd_control.add);
router.get('/deleteProd/:id/:user/:password',bd_control.delete);
router.post('/editProd/:id',bd_control.edit);


module.exports = router;
