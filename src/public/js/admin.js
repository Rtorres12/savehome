/* $(document).ready(()=>{
$('th').each(function(columna){
    $(this).hover(function(){
        $(this).addClass('resaltar');
    },function(){
        $(this).removeClass('resaltar');
    })
$(this).click(function(){
    let registros = $('table').find('tbody > tr').get();
    registros.sort(function(a,b){
        let val1=$(a).children('td').eq(columna).text().toUpperCase();
        let val2=$(b).children('td').eq(columna).text().toUpperCase();
        return val1 < val2 ? -1 : val1 > val2 ? 1 : 0;

    });
    $.each(registros, function(indice,elemento){
        $('tbody').append(elemento);
    })
    
})
})

}); */

$(document).ready(function(){
    $('.RichText').summernote({
        toolbar: [
        ['style', ['style']],
        ['font', ['bold', 'underline', 'clear']],
        ['fontname', ['fontname']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['table', ['table']],
      ],}
        
    );

});

document.getElementById('nuevoProd').addEventListener("click",function(){
    $.validator.addMethod("valueNotEquals", function(value, element, arg){
        return arg !== value;
    }, "Value must not equal arg.");
    $('#productoform').validate({
        rules: {
            prodImg:{required:true},
            nom_producto: { required: true,maxlength:49},
            caracteristicas:{required:true, maxlength: 499},
            precio:{required:true, digits:true, maxlength:7},
            stock:{required:true, digits:true, maxlength:7},
            categoria:{required: true, valueNotEquals:"0"},
            subcategoria:{required: true, valueNotEquals:"0"},
            descuento:{range:[1,99]}
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

            },
            categoria:{
                required:"Seleccione categoria",
                valueNotEquals:"Seleccione categoria"
            },
            subcategoria:{
                required:"Seleccione subcategoria",
                valueNotEquals:"Seleccione subcategoria"
            },
            descuento:{
                range:"Numero no valido para descuento"
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

document.getElementById('guardarClave').addEventListener("click",function(){
    $.validator.addMethod("valueEquals", function(value, element, arg){

        return value == atob($('#user_clave').val());
    }, "No coinciden");
    $('#claveform').validate({
        rules: {
            claveAntigua:{required:true,maxlength:30,valueEquals:true},
            claveNueva: { required: true,maxlength:30},
            claveNueva2:{required:true, maxlength: 30, equalTo: '#claveNueva'}
           },
        messages:{
            claveAntigua:{
                required:'Llene los campos',
                maxlength:'Limite de caracteres',
                equalTo:'No coinciden :('

            },
            claveNueva:{
                required:'Llene los campos',
                maxlength:'Limite de caracteres',
            },
            claveNueva2:{
                required:'Llene los campos',
                maxlength:'Limite de caracteres',
                equalTo:'Deben coincidir!',
            },


        },
        errorElement : 'h6',

        submitHandler: function (form) {
    var claveNueva= btoa($('#claveNueva').val());
    var id = $('#id_user').val();
    
            $.ajax({
                url:'/cambiarclave/'+id+'/'+claveNueva,
                success : function(data){
                    $('#claveform')[0].reset();
                    $('#cambiarClave').modal('hide')

                    Swal.fire({
                        icon: 'success',
                        title: 'Contraseña cambiada',
                        showConfirmButton: true,
                        timer: 1500
                      })
                }
                
    
            })
        }



    })


           

});


