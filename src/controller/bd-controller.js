const controller = {};

controller.validateUser = (req,res)=>{

    const data= req.body;
    console.log("aasdsd");

     console.log(req.body);
    req.getConnection((err, conn) => {

        conn.query('CALL ValidateUserLogin (?,?)',[data.username,data.password], (err, login) => {
         if (err) {
          res.json(err);
         }
         console.log(login)
            if(login.length == 0){
                res.json("error");
            }
            res.render('userlogin.html', {
                data1:login
             });
         
        });
      });

}
controller.addUser = (req,res)=>{
    
    const data =req.body;
    console.log(data);
    req.getConnection((err, conn) => {
    const params = [
        data.NombreCompleto,
        data.NumeroDocumento,
        data.Telefono,
        data.Email,
        data.User,
        data.Password,
        null
    ];

        conn.query('CALL RegistrarUsuario (?,?,?,?,?,?,@retVal)', params, (err, usuario) => {
            if (err) {
                console.log(err);
                cont
                return;
            }
       

            conn.query('SELECT @retVal AS retVal', (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }
         
         console.log(result[0].retVal);

         if (result[0].retVal != 0){
            conn.query('SELECT * from person where idperson = ?',result[0].retVal, (err, persona) => {
                if (err) {
                    console.log(err);
                    return;
                }
         res.render('userlogin.html', {
            data:persona
        });
         });
         }else{
            
            res.render('userlogin.html', {
                data:result[0].retVal
            });

         }
        });
        });
    });
   
}
       

 
controller.userLogin = (req,res)=>{
    
    req.getConnection((err, conn) => {
       

        conn.query('SELECT * FROM categoria', (err, categoria) => {
            if (err) {
             res.json(err);
            }

            console.log(categoria);
             conn.query('SELECT * FROM subcategoria', (err, subcategoria) => {
                if (err) {
                 res.json(err);
                }
                console.log(subcategoria);

                res.render('userLogin.html', {
                    data2:subcategoria,
                    data1:categoria,
           
        });
    
           
           });
         
         
        });
      });
}
controller.userRegister = (req,res)=>{
    
    req.getConnection((err, conn) => {
       

        conn.query('SELECT * FROM categoria', (err, categoria) => {
            if (err) {
             res.json(err);
            }

            console.log(categoria);
             conn.query('SELECT * FROM subcategoria', (err, subcategoria) => {
                if (err) {
                 res.json(err);
                }
                console.log(subcategoria);

                res.render('userRegister.html', {
                    data2:subcategoria,
                    data1:categoria,
           
        });
    
           
           });
         
         
        });
      });
} 
controller.principal = (req,res)=>{
    
    req.getConnection((err, conn) => {
       

        conn.query('SELECT * FROM categoria', (err, categoria) => {
            if (err) {
             res.json(err);
            }

            console.log(categoria);
             conn.query('SELECT * FROM subcategoria', (err, subcategoria) => {
                if (err) {
                 res.json(err);
                }
                console.log(subcategoria);

                res.render('principal.html', {
                    data2:subcategoria,
                    data1:categoria,
           
        });
    
           
           });
         
         
        });
      });
} 

controller.prodListFil = (req,res)=>{
    const val='%'+req.body.val+'%';
    
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM prod  where disponible="on" ORDER BY CASE WHEN nom_producto LIKE ? THEN 1 ELSE 2 END',[val], (err, productos) => {
         if (err) {
          res.json(err);
         }

        conn.query('SELECT * FROM categoria', (err, categoria) => {
            if (err) {
             res.json(err);
            }
            console.log(productos);

            console.log(categoria);
             conn.query('SELECT * FROM subcategoria', (err, subcategoria) => {
                if (err) {
                 res.json(err);
                }

                res.render('producto.html', {
                    data2:subcategoria,
                    data1:categoria,
                    data:productos,
                    datascroll:"on"

    
             });
        });
         
           
           });
         
         
        });
      });
} 

controller.prodcat = (req,res)=>{
    
    req.getConnection((err, conn) => {
      conn.query('SELECT * FROM prod where disponible="on" order by id_prod', (err, productos) => {
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
                  datascroll:"on",
                  datacat:req.params.cat,
  
           });
      });
          
       
         
         });
       
       
      });
    });
}
controller.prodsubcat = (req,res)=>{
    
    req.getConnection((err, conn) => {
      conn.query('SELECT * FROM prod where disponible="on" order by id_prod', (err, productos) => {
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
                  datascroll:"on",
                  datasubcat:req.params.cat,
  
           });
      });
          
       
         
         });
       
       
      });
    });
}
controller.prodList = (req,res)=>{

      req.getConnection((err, conn) => {
        conn.query('SELECT * FROM prod where disponible="on" order by id_prod', (err, productos) => {
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
controller.log = (req,res) =>{
    const data= req.params;
    
     console.log(req.params);
    console.log(JSON.stringify(data)+' AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    req.getConnection((err, conn) => {

        conn.query('SELECT `id_login`, `user`, `password` FROM `login` WHERE user=? and password=?',[data.username,data.password], (err, login) => {
         if (err) {
          res.json(err);
         }
         console.log(login)
            if(login.length == 0){
                res.json("error");
            }else{
             
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
                            data:productos,
                            data2:login
                            
                
                     
                         });
                  
                        
                     
                       
                       });
                     
                     
                    });
                  });
            
          
            }
         
        });
      });

}
controller.login = (req,res) =>{
    const data= req.body;
    
    const pass = Buffer.from(data.password).toString('base64');
    console.log(req.body);
    console.log(JSON.stringify(data)+' AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    req.getConnection((err, conn) => {

        conn.query('SELECT `id_login`, `user`, `password` FROM `login` WHERE user=? and password=?',[data.username,pass], (err, login) => {
         if (err) {
          res.json(err);
         }
         console.log(login)
            if(login.length == 0){
                res.json("error");
            }else{
             
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
                            data:productos,
                            data2:login
                            
                
                     
                         });
                  
                        
                     
                       
                       });
                     
                     
                    });
                  });
            
          
            }
         
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


controller.add = (req, res ,next) => {
    const data =req.body;
console.log(data.id_prod);
    const prodimg = req.files[0].filename;
    if(typeof req.files[1] == 'undefined'){ 
        req.getConnection((err, conn,) => {
            conn.query('INSERT INTO productos set descuento=?, id_prod=id_prod, nom_producto=?,caracteristicas=?,stock=?,precio=?,disponible=?,recomendado=?, prodImg=?,prodImg2="null",prodImg3="null"',[data.descuento,data.nom_producto,data.caracteristicas,data.stock,data.precio,data.disponible,data.recomendado,prodimg],(err,productos)=>{
                if (err) {
                    console.log(err);
                   }
                   conn.query('INSERT INTO  cat_prod VALUES (id,?,?,?)',[data.categoria,data.subcategoria,data.id_prod],(err,productos)=>{
                    if (err) {
                        console.log(err);
                       }
                       res.redirect('/adminpage/'+req.body.usuario+'/'+req.body.user_clave);
               
                });
            
            });
        });
    }else if(typeof req.files[2] == 'undefined'){ 
        const prodimg2 = req.files[1].filename;
        req.getConnection((err, conn,) => {
            conn.query('INSERT INTO productos set descuento=?, id_prod=id_prod, nom_producto=?,caracteristicas=?,stock=?,precio=?,disponible=?,recomendado=?, prodImg=?,prodImg2=?,prodImg3="null"',[data.descuento, data.nom_producto,data.caracteristicas,data.stock,data.precio,data.disponible,data.recomendado,prodimg,prodimg2],(err,productos)=>{
                if (err) {
                    console.log(err);
                   }
                   conn.query('INSERT INTO  cat_prod VALUES (id,?,?,?)',[data.categoria,data.subcategoria,data.id_prod],(err,productos)=>{
                    if (err) {
                        console.log(err);
                       }
                       res.redirect('/adminpage/'+req.body.usuario+'/'+req.body.user_clave);
               
                });
            
            });
        });
    }else{
        
        req.getConnection((err, conn,) => {
            const prodimg2 = req.files[1].filename;
        const prodimg3 = req.files[2].filename;

            conn.query('INSERT INTO productos set descuento=?, id_prod=id_prod, nom_producto=?,caracteristicas=?,stock=?,precio=?,disponible=?,recomendado=?, prodImg=?,prodImg2=?,prodImg3=?',[data.descuento,data.nom_producto,data.caracteristicas,data.stock,data.precio,data.disponible,data.recomendado,prodimg,prodimg2,prodimg3],(err,productos)=>{
                if (err) {
                    console.log(err);
                   }
                   conn.query('INSERT INTO  cat_prod VALUES (id,?,?,?)',[data.categoria,data.subcategoria,data.id_prod],(err,productos)=>{
                    if (err) {
                        console.log(err);
                       }
                       res.redirect('/adminpage/'+req.body.usuario+'/'+req.body.user_clave);
               
                });
            
            });
        });
    }
    

    

   

};
controller.edit = (req, res) => {
    const {id} = req.params;
    const data =req.body;
    const fs = require('fs').promises;
    const files=[req.body.previmg,req.body.previmg2,req.body.previmg3];
    console.log(req.body);

    try {

        if(req.files){
            console.log(req.body.previmg);
            console.log(req.body.previmg2);
            console.log(req.body.previmg3);

            

            const prodimg = req.files[0].filename;

            if(typeof req.files[1] == 'undefined'){ 
                    
                
                console.log('1')
                Promise.all(files.map(function(file){
                    if (file !=='null'){ 
                        console.log(file);
                        fs.unlink('src/public/prodImg/'+file)} }))
                .then(() => {
                    console.log('All files removed')
                })
                .catch(err => {
                    console.error('Something wrong happened removing files', err)
                })



                req.getConnection((err, conn,) => {
                    conn.query('UPDATE `productos` SET descuento =?,`nom_producto`=?,`recomendado`=?,`caracteristicas`=?,`stock`=?,`precio`=?,`disponible`=?,`prodImg`=?,`prodImg2`="null",`prodimg3`="null" WHERE id_prod=?',[data.descuento,data.nom_producto,data.recomendado, data.caracteristicas,data.stock,data.precio,data.disponible, prodimg ,id],(err,productos)=>{
                        if (err) {
                            console.log(err);
                           }
                           conn.query('UPDATE `cat_prod` SET `id_cat`=?,`id_subcat`=? WHERE id_prod=?',[data.categoria,data.subcategoria,id],(err,productos)=>{
                            if (err) {
                                console.log(err);
                               }
                               res.redirect('/adminpage/'+req.body.usuario+'/'+req.body.user_clave);
                            });
                     });
                });
            }else if(typeof req.files[2] == 'undefined'){ 
                
                console.log('2')
                       
                Promise.all(files.map(function(file){
                    if (file !=='null'){ 
                        console.log(file);
                        fs.unlink('src/public/prodImg/'+file)} }))
                .then(() => {
                    console.log('All files removed')
                })
                .catch(err => {
                    console.error('Something wrong happened removing files', err)
                }) 
                
                const prodimg2 = req.files[1].filename;
                req.getConnection((err, conn,) => {
                    conn.query('UPDATE `productos` SET `descuento` =?,`nom_producto`=?,`recomendado`=?,`caracteristicas`=?,`stock`=?,`precio`=?,`disponible`=?,`prodImg`=?,`prodImg2`=?,`prodimg3`="null" WHERE id_prod=?',[data.descuento,data.nom_producto,data.recomendado, data.caracteristicas,data.stock,data.precio,data.disponible, prodimg,prodimg2 ,id],(err,productos)=>{
                        if (err) {
                            console.log(err);
                           }
                           conn.query('UPDATE `cat_prod` SET `id_cat`=?,`id_subcat`=? WHERE id_prod=?',[data.categoria,data.subcategoria,id],(err,productos)=>{
                            if (err) {
                                console.log(err);
                               }
                               res.redirect('/adminpage/'+req.body.usuario+'/'+req.body.user_clave);
                            });
                     });
                });
            }else{
                req.getConnection((err, conn,) => {
                    Promise.all(files.map(function(file){
                        if (file !=='null'){ 
                            console.log(file);
                            fs.unlink('src/public/prodImg/'+file)} }))
                    .then(() => {
                        console.log('All files removed')
                    })
                    .catch(err => {
                        console.error('Something wrong happened removing files', err)
                    })
                    const prodimg2 = req.files[1].filename;
                    const prodimg3 = req.files[2].filename;


                    conn.query('UPDATE `productos`  SET  descuento =?,`nom_producto`=?,`recomendado`=?,`caracteristicas`=?,`stock`=?,`precio`=?,`disponible`=?,`prodImg`=?,`prodImg2`=?,`prodimg3`=? WHERE id_prod=?',[data.descuento,data.nom_producto,data.recomendado, data.caracteristicas,data.stock,data.precio,data.disponible, prodimg,prodimg2,prodimg3 ,id],(err,productos)=>{
                        if (err) {
                            console.log(err);
                           }
                           conn.query('UPDATE `cat_prod` SET `id_cat`=?,`id_subcat`=? WHERE id_prod=?',[data.categoria,data.subcategoria,id],(err,productos)=>{
                            if (err) {
                                console.log(err);
                               }
                               res.redirect('/adminpage/'+req.body.usuario+'/'+req.body.user_clave);
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
                conn.query('UPDATE `productos` SET descuento=?, `nom_producto`=?,`recomendado`=?,`caracteristicas`=?,`stock`=?,`precio`=?,`disponible`=?,`prodImg`=?,`prodImg2`=?,`prodimg3`=? WHERE id_prod=?',[data.descuento,data.nom_producto,data.recomendado, data.caracteristicas,data.stock,data.precio,data.disponible, prodimg,prodimg2,prodimg3 ,id],(err,productos)=>{
                    if (err) {
                        console.log(err);
                       }
                       conn.query('UPDATE `cat_prod` SET `id_cat`=?,`id_subcat`=? WHERE id_prod=?',[data.categoria,data.subcategoria,id],(err,productos)=>{
                        if (err) {
                            console.log(err);
                           }
                       res.redirect('/adminpage/'+req.body.usuario+'/'+req.body.user_clave);
                    });
                 });
            });
        
        });
    
    }
  
       

  

};
controller.delete = (req, res) => {
    const data =req.params.id;

    console.log(req.body)
    req.getConnection((err, conn) => {
        conn.query('UPDATE `productos` SET `disponible`= "off", recomendado="off" WHERE id_prod=?',[data],(err,productos)=>{
            if (err) {
                console.log(err);
               }
               res.redirect('/adminpage/'+req.params.user+'/'+req.params.password);
        });
    
    });

};
controller.nuevaclave = (req, res) => {
    const data =req.params;
    console.log(data);
    req.getConnection((err, conn) => {
        conn.query('UPDATE `login` SET `password`=? WHERE id_login=?',[data.nuevaclave,data.id],(err,productos)=>{
            if (err) {
                console.log(err);
               }
               res.redirect('/adminpage/'+req.body.usuario+'/'+req.body.user_clave);
            });
    
    });

};
module.exports = controller;