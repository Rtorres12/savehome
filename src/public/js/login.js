
 $('#btnlogin').click(function(){


    $.ajax({
        url:'/loginvalidate/'+$('#username').val()+'/'+btoa($('#password').val()),
        success : function(data){

            
        }
    })
$('#password').val()
$('#username').val()

}); 
