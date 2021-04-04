const express= require('express');
const router = express.Router();
const bd_control = require('../controller/bd-controller');

router.get('/',(req, res)=>{
    res.render('principal.html');

});
router.get('/producto',bd_control.prodList);
router.post('/productoFil',bd_control.prodListFil);

router.get('/admin',bd_control.list);
router.get('/subcat/:id',bd_control.subcat);

router.post('/nuevoProd',bd_control.add);
router.get('/deleteProd/:id',bd_control.delete);
router.post('/editProd/:id',bd_control.edit);

module.exports = router;
