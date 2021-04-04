const controller = {};

controller.prodListFil = (req,res)=>{
    const val='%'+req.body.val+'%';
    
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM userprod ORDER BY CASE WHEN nom_producto LIKE ? THEN 1 ELSE 2 END',[val], (err, productos) => {
         if (err) {
          res.json(err);
         }

        conn.query('SELECT * FROM categoria', (err, categoria) => {
            if (err) {
             res.json(err);
            }
            console.log(productos);

            console.log(categoria);
            res.render('producto.html', {
                data1:categoria,
                data:productos,
                datascroll:"on"
    
             });
         
           
           });
         
         
        });
      });
} 

controller.prodList = (req,res)=>{

      req.getConnection((err, conn) => {
        conn.query('SELECT * FROM prod order by id_prod', (err, productos) => {
         if (err) {
          res.json(err);
         }
         conn.query('SELECT * FROM categoria', (err, categoria) => {
            if (err) {
             res.json(err);
            }
            conn.query('SELECT * FROM subcategoria', (err, subcategoria) => {
                if (err) {
                 res.json(err);
                }

                res.render('producto.html', {
                    data2:subcategoria,
                    data1:categoria,
                    data:productos,
                    datascroll:"off"

    
             });
        });
            
         
           
           });
         
         
        });
      });
}
controller.subcat = (req, res) => {
   console.log(req.params.id);
    req.getConnection((err, conn) => {
        conn.query('SELECT subcategoria.id,categoria.id_cat, categoria.categoria , subcategoria.subcategoria from categoria join subcategoria on subcategoria.id_cat= categoria.id_cat where categoria.id_cat=?',[req.params.id], (err, subcategorias) => {
         if (err) {
          res.json(err);
         }

            res.json( {
                
                data:subcategorias

    
             });
         
        });
      });

};

controller.list = (req, res) => {

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM prod order by id_prod', (err, productos) => {
         if (err) {
          res.json(err);
         }
         conn.query('SELECT * FROM categoria', (err, categoria) => {
            if (err) {
             res.json(err);
            }
                console.log(productos);
            console.log(categoria);
            res.render('admin.html', {
                data1:categoria,
                data:productos

    
             });
      
            
         
           
           });
         
         
        });
      });

};
controller.add = (req, res ,next) => {
    const data =req.body;
console.log(data.id_prod);
    const prodimg = req.files[0].filename;
    if(typeof req.files[1] == 'undefined'){ 
        req.getConnection((err, conn,) => {
            conn.query('INSERT INTO productos set id_prod=id_prod, nom_producto=?,caracteristicas=?,stock=?,precio=?,disponible=?,recomendado=?, prodImg=?,prodImg2="null",prodImg3="null"',[data.nom_producto,data.caracteristicas,data.stock,data.precio,data.disponible,data.recomendado,prodimg],(err,productos)=>{
                if (err) {
                    console.log(err);
                   }
                   conn.query('INSERT INTO  cat_prod VALUES (id,?,?,?)',[data.categoria,data.subcategoria,data.id_prod],(err,productos)=>{
                    if (err) {
                        console.log(err);
                       }
                   res.redirect('/admin');
               
                });
            
            });
        });
    }else if(typeof req.files[2] == 'undefined'){ 
        const prodimg2 = req.files[1].filename;
        req.getConnection((err, conn,) => {
            conn.query('INSERT INTO productos set id_prod=id_prod, nom_producto=?,caracteristicas=?,stock=?,precio=?,disponible=?,recomendado=?, prodImg=?,prodImg2=?,prodImg3="null"',[data.nom_producto,data.caracteristicas,data.stock,data.precio,data.disponible,data.recomendado,prodimg,prodimg2],(err,productos)=>{
                if (err) {
                    console.log(err);
                   }
                   conn.query('INSERT INTO  cat_prod VALUES (id,?,?,?)',[data.categoria,data.subcategoria,data.id_prod],(err,productos)=>{
                    if (err) {
                        console.log(err);
                       }
                   res.redirect('/admin');
               
                });
            
            });
        });
    }else{
        
        req.getConnection((err, conn,) => {
            const prodimg2 = req.files[1].filename;
        const prodimg3 = req.files[2].filename;

            conn.query('INSERT INTO productos set id_prod=id_prod, nom_producto=?,caracteristicas=?,stock=?,precio=?,disponible=?,recomendado=?, prodImg=?,prodImg2=?,prodImg3=?',[data.nom_producto,data.caracteristicas,data.stock,data.precio,data.disponible,data.recomendado,prodimg,prodimg2,prodimg3],(err,productos)=>{
                if (err) {
                    console.log(err);
                   }
                   conn.query('INSERT INTO  cat_prod VALUES (id,?,?,?)',[data.categoria,data.subcategoria,data.id_prod],(err,productos)=>{
                    if (err) {
                        console.log(err);
                       }
                   res.redirect('/admin');
               
                });
            
            });
        });
    }
    

    

   

};
controller.edit = (req, res) => {
    const {id} = req.params;
    const data =req.body;
    try {

        if(req.files){
            console.log(data.recomendado+'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');


            const prodimg = req.files[0].filename;
            if(typeof req.files[1] == 'undefined'){ 
                console.log('1')
                req.getConnection((err, conn,) => {
                    conn.query('UPDATE `productos` SET `nom_producto`=?,`recomendado`=?,`caracteristicas`=?,`stock`=?,`precio`=?,`disponible`=?,`prodImg`=?,`prodImg2`="null",`prodimg3`="null" WHERE id_prod=?',[data.nom_producto,data.recomendado, data.caracteristicas,data.stock,data.precio,data.disponible, prodimg ,id],(err,productos)=>{
                        if (err) {
                            console.log(err);
                           }
                           conn.query('UPDATE `cat_prod` SET `id_cat`=?,`id_subcat`=? WHERE id_prod=?',[data.categoria,data.subcategoria,id],(err,productos)=>{
                            if (err) {
                                console.log(err);
                               }
                           res.redirect('/admin');
                        });
                     });
                });
            }else if(typeof req.files[2] == 'undefined'){ 
                console.log('2')

                const prodimg2 = req.files[1].filename;
                req.getConnection((err, conn,) => {
                    conn.query('UPDATE `productos` SET `nom_producto`=?,`recomendado`=?,`caracteristicas`=?,`stock`=?,`precio`=?,`disponible`=?,`prodImg`=?,`prodImg2`=?,`prodimg3`="null" WHERE id_prod=?',[data.nom_producto,data.recomendado, data.caracteristicas,data.stock,data.precio,data.disponible, prodimg,prodimg2 ,id],(err,productos)=>{
                        if (err) {
                            console.log(err);
                           }
                           conn.query('UPDATE `cat_prod` SET `id_cat`=?,`id_subcat`=? WHERE id_prod=?',[data.categoria,data.subcategoria,id],(err,productos)=>{
                            if (err) {
                                console.log(err);
                               }
                           res.redirect('/admin');
                        });
                     });
                });
            }else{
                req.getConnection((err, conn,) => {
                    const prodimg2 = req.files[1].filename;
                    const prodimg3 = req.files[2].filename;


                    conn.query('UPDATE `productos` SET `nom_producto`=?,`recomendado`=?,`caracteristicas`=?,`stock`=?,`precio`=?,`disponible`=?,`prodImg`=?,`prodImg2`=?,`prodimg3`=? WHERE id_prod=?',[data.nom_producto,data.recomendado, data.caracteristicas,data.stock,data.precio,data.disponible, prodimg,prodimg2,prodimg3 ,id],(err,productos)=>{
                        if (err) {
                            console.log(err);
                           }
                           conn.query('UPDATE `cat_prod` SET `id_cat`=?,`id_subcat`=? WHERE id_prod=?',[data.categoria,data.subcategoria,id],(err,productos)=>{
                            if (err) {
                                console.log(err);
                               }
                           res.redirect('/admin');
                        });
                     });
                });
            }


        }
    } catch (error) {
        const prodimg =req.body.previmg;
        const prodimg2 = req.body.previmg2;
        const prodimg3 =req.body.previmg3;  

        req.getConnection((err, conn) => {
            req.getConnection((err, conn,) => {
                conn.query('UPDATE `productos` SET `nom_producto`=?,`recomendado`=?,`caracteristicas`=?,`stock`=?,`precio`=?,`disponible`=?,`prodImg`=?,`prodImg2`=?,`prodimg3`=? WHERE id_prod=?',[data.nom_producto,data.recomendado, data.caracteristicas,data.stock,data.precio,data.disponible, prodimg,prodimg2,prodimg3 ,id],(err,productos)=>{
                    if (err) {
                        console.log(err);
                       }
                       conn.query('UPDATE `cat_prod` SET `id_cat`=?,`id_subcat`=? WHERE id_prod=?',[data.categoria,data.subcategoria,id],(err,productos)=>{
                        if (err) {
                            console.log(err);
                           }
                       res.redirect('/admin');
                    });
                 });
            });
        
        });
    
    }
  
       
    console.log(req.previmg+"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

  

};
controller.delete = (req, res) => {
    const data =req.params.id;
    console.log(req.body)
    req.getConnection((err, conn) => {
        conn.query('UPDATE `productos` SET `disponible`= "off" WHERE id_prod=?',[data],(err,productos)=>{
            if (err) {
                console.log(err);
               }
               res.redirect('/admin');
        });
    
    });

};
module.exports = controller;