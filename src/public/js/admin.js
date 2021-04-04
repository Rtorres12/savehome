document.getElementById('nuevoProd').addEventListener("click",function(){
    $('#productoform').validate({
        rules: {
            prodImg:{required:true},
            nom_producto: { required: true,maxlength:49},
            caracteristicas:{required:true, maxlength: 499},
            precio:{required:true, digits:true, maxlength:7},
            stock:{required:true, digits:true, maxlength:7}
           },
        messages: {
            prodImg:{
                required:"Seleccione una imagen",
            },
            nom_producto: {
                required: "Ingrese el nombre del producto ",
                maxlength:"Limite de caracteres excedido!"
            },
            caracteristicas:{
                required:"Inserte una descripcion",
                maxlength:"Limite de caracteres excedido!"
            },
            precio:{
                required:"Inserte un precio",
                digits:"Caracter no admitido!",
                maxlength:"Limite de digitos excedido"
            },
            stock:{
                required:"Inserte el stock disponible",
                digits:"Caracter no admitido!",
                maxlength:"Limite de digitos excedido"

            }
        },
      errorElement : 'h6',

        submitHandler: function (form) {
        document.forms["productoform"].submit();
        },
    })

});

$(function(){
    $('#categoria').change(function(){
        $.ajax({
            url:'/subcat/'+$('#categoria').val(),
            success : function(subcategorias){
                
                tpl='<option val="0">Seleccione</option>'
                
                for (var i = 0; i < subcategorias.data.length; i++) {
                    tpl+='<option value="'+subcategorias.data[i].id+'">'+subcategorias.data[i].subcategoria+'</option>';
                    console.log(subcategorias.data[i].id)
                }
                $('#subcat').html(tpl);
            }
            

        })

    });

    
   

})


