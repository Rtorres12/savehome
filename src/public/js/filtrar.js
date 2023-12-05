$(document).ready(function(){
	console.log($('#cat').val());
	
	if(typeof $('#cat').val() !== 'undefined'){
		var cat = $('#cat').val();
		$('.category_item').removeClass('ct_item-active');
		$(this).addClass('ct_item-active');
        
        $('.product-item').css('transform', 'scale(0)');

		function hideProduct(){
			$('.product-item').hide();
		} setTimeout(hideProduct,400);

        function showProduct(){
			$('.product-item[category="'+cat+'"]').show();
			$('.product-item[category="'+cat+'"]').css('transform', 'scale(1)');

		} setTimeout(showProduct,400);
		function quitarCss(){$('.product-item[category="'+cat+'"]').css('transform','');
	}
		setTimeout(quitarCss,500)

	}else if(typeof $('#subcat').val() !== 'undefined'){

		console.log($('#subcat').val());

		var subcat = $('#subcat').val();
		$('.category_item').removeClass('ct_item-active');
		$(this).addClass('ct_item-active');
        
        $('.product-item').css('transform', 'scale(0)');

		function hideProduct(){
			$('.product-item').hide();
		} setTimeout(hideProduct,400);

        function showProduct(){
			$('.product-item[subcategory="'+subcat+'"]').show();
			$('.product-item[subcategory="'+subcat+'"]').css('transform', 'scale(1)');
		} setTimeout(showProduct,400);
		function quitarCss(){$('.product-item[subcategory="'+catProduct+'"]').css('transform','');
	}
		setTimeout(quitarCss,500)

};


    $('.category_item').click(function(){

        var catProduct = $(this).attr('subcategory');
		console.log(catProduct);

        $('.category_item').removeClass('ct_item-active');
		$(this).addClass('ct_item-active');
        
        $('.product-item').css('transform', 'scale(0)');

		function hideProduct(){
			$('.product-item').hide();
		} setTimeout(hideProduct,400);

        function showProduct(){
			$('.product-item[subcategory="'+catProduct+'"]').show();
			$('.product-item[subcategory="'+catProduct+'"]').css('transform', 'scale(1)');
		} setTimeout(showProduct,400);
		function quitarCss(){$('.product-item[subcategory="'+catProduct+'"]').css('transform','');
	}
		setTimeout(quitarCss,500)

    });
    
	$('.category_item[subcategory="Todo"]').click(function(){
		function showAll(){
			$('.product-item').show();
			$('.product-item').css('transform', 'scale(1)');
		} setTimeout(showAll,400);
		function deleteCss(){
			$('.product-item').css('transform','');
		}
		setTimeout(deleteCss,500)

	});
    
});
