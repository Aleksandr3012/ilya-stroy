$(document).on('click','.item-inner .bottom a',function () {

        $('html, body').animate({scrollTop:0}, '1');
        return false;
    });

$(document).ready(function(){

	// кнопка вверх
	$.fn.scrollToTop = function() {
	  $(this).hide().removeAttr("href");
	  if ($(window).scrollTop() >= "450") {
	  	$(this).fadeIn("slow");
	  }
	  var scrollDiv = $(this);
	  $(window).scroll(function() {
	   if ($(window).scrollTop() <= "450") {
	   	$(scrollDiv).fadeOut("slow");
	   }
	   else {
	   	$(scrollDiv).fadeIn("slow");
	   }
	   // закрепление меню при прокрутке
	   var scrollTop = $(window).scrollTop(),
		header = $('.header'),
		navBar = $('.header .dark-bg');

		if(scrollTop >= header.innerHeight() - navBar.innerHeight()){
			navBar.addClass('menufixed');
		} else {
			navBar.removeClass('menufixed');
		}

	  });
	  $(this).click(function() {
	   $("html, body").animate({scrollTop: 0}, "slow")
	  })
	 }
	 $(function() {
		 $("#Go_Top").scrollToTop();
	 });

 $('.faq-menu .menu-elements li').each(function(){
        if (this.getElementsByTagName("a")[0].href == location.href) this.className = "active";
    });
 $('.faq-menu .js-item').each(function(){
        if (this.getElementsByTagName("a")[0].href == location.href) this.className = "active";
    });
	function isSafari() {
		return !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/) || navigator.userAgent.match(/Macintosh/);
	}
	if(isSafari())
		$('body').addClass('mac');

	$('.masked-phone').mask('+7 (999) 999-99-99');
	$('body').on('click', '.scroll-to', function(){
		var elementClick = $(this).data("scroll-direction");
		//destination = Math.max(0, $(elementClick).offset().top - $('.header').innerHeight());
		destination = Math.max(0, $(elementClick).offset().top);
		$('html,body').animate({scrollTop: destination}, 700);
		return false;
	});
	$('.menu-toggle').click(function() {
		if ($('body').hasClass('open-xs-menu')) {
			$('body').removeClass('open-xs-menu');
			$('.header .xs-menu').stop(true).fadeOut(400);
		} else {
			$('body').addClass('open-xs-menu');
			$('.header .xs-menu').stop(true).fadeIn(400);
		}
	});
	//Заменяю бекграунд на высокое качество
	if (window.innerWidth > 768 && $('[data-hq-src]').length > 0) {
		$('[data-hq-src]').each(function(){
			$(this).attr('style', "background-image: url(" + $(this).data('hq-src') + ")");
		});
	}
	$(window).resize(function() {
		if (window.innerWidth > 768 && $('[data-hq-src]').length > 0) {
			$('[data-hq-src]').each(function(){
				$(this).attr('style', "background-image: url(" + $(this).data('hq-src') + ")");
			});
		}
	})
	$(window).resize(function() {
		if (window.innerWidth > 992) {
			$('body').removeClass('open-xs-menu');
			$('.header .xs-menu').stop(true).fadeOut(400);
			$('body').css({'padding-top' : 0});
			$('.header').removeClass('fixed-header');
			$('.header').removeAttr('style');
		}
	});
	$(document).scroll(function(){
		if (window.innerWidth < 992) {
			var windowH = $(window).height(),
				scrollH = $(document).scrollTop();
			if (scrollH >= windowH*0.2) {
				if(!$('.header').hasClass('fixed-header')){
					$('body').css({'padding-top' : $('.header').height()});
					$('.header').addClass('fixed-header');
					$('.fixed-header').stop(true).slideDown(300);
				}
			} else {
				$('body').css({'padding-top' : 0});
				$('.header').removeClass('fixed-header');
				$('.header').removeAttr('style');
			}
		}
	});
	$('[data-fancybox]').fancybox({
		loop: true,
		arrows: true,
		buttons: [
			"zoom",
			"slideShow",
			"fullScreen",
			"thumbs",
			"close"
		],
		thumbs: {
			autoStart: false,
			hideOnClose: false
		}
	});

	//scripts for shop

/*var iOS = navigator.userAgent.match(/iPhone|iPad|iPod/i);
var event = 'click';
if(iOS != null) event = 'touchstart';
console.info(iOS);
console.info(event);*/

	//$(document).on(event, '.to-cart', function(){ //добавлнеие товара в корзину
	$('body').on('click', '.to-cart', function(){ //добавлнеие товара в корзину
		var infoContainer = $(this).parents('.item-cart-data').find('.item-quantity');
		moveItem($(infoContainer).data('cyberitem'), $(infoContainer).data('cyberblock'), true, $(infoContainer).find('.quantity').val(), $(this).parents('.item-cart-data').find('.item-quantity').attr('data-cyberdensity'));
	});


	$('body').on('input change', '.quantity', function() { //Только цифры в инпутах
		var tempValue = $(this).attr('data-counter'); //Значение дублируется, чтобы сопоставить его с результатом изменения инпута
		if (this.value.match(/[^0-9]/g)) {
			this.value = this.value.replace(/[^0-9]/g, '');
		}
		if(this.value == 0){
			this.value = 1;
		}
		if(tempValue != this.value){ //Вызываем ajax-функцию только если значение изменилось (защита от двойного срабатывания)
			$(this).attr('data-counter', this.value);
			if($(this).parents('div').is('.cyberbasket_container')){
				changeItem($(this).parents('.item-quantity').data('cyberitem'), $(this).parents('.item-quantity').data('cyberblock'), this.value, $(this).parents('.item-quantity').attr('data-cyberdensity'));
			}
		}
	});
	//$('.quantity-control').click(function(){ //Изменение количества (клики по плюсу и минусу)
	$('body').on('click', '.quantity-control', function(){ //Изменение количества (клики по плюсу и минусу)
		var tempValue = $(this).siblings('input').attr('data-counter'); //Значение дублируется, чтобы сопоставить его с результатом изменения инпута
		var quantity = 1;
		if($(this).hasClass('minus')) {
			if($(this).siblings('input').val() > 1) { //Не изменяем количество если после нажатия на минус в поле должен появиться ноль
				var quantity = Number($(this).siblings('input').val()) - 1;
			}

		} else {
			var quantity = Number($(this).siblings('input').val()) + 1;
		}
		if(tempValue != quantity){ //Вызываем ajax-функцию только если значение изменилось (защита от срабатывания при нулевом значении)
			$(this).siblings('input').val(quantity);
			$(this).siblings('input').attr('data-counter', quantity);
			if($(this).parents('div').is('.cyberbasket_container')){
				changeItem($(this).parents('.item-quantity').data('cyberitem'), $(this).parents('.item-quantity').data('cyberblock'), quantity, $(this).parents('.item-quantity').data('cyberdensity'));
			}
		}

	});
	$('.cyberbasket_itemlist').on('click', '.item_delete', function(){ //Клик по кнопке удаления
		var deleteItem = $(this).parents('tr').find('.item-quantity');
		moveItem($(deleteItem).data('cyberitem'), $(deleteItem).data('cyberblock'), false, null, $(deleteItem).data('cyberdensity'));
	});




	function moveItem(item, iblock, add, quantity, density) { //Функция отправки AJAX-запроса на добавление, удаление или изменение количества
		if(!density){
			density = 'STANDART';
		}
		var data = "id=" + item + "&iblock=" + iblock + "&event=" + add + "&quantity=" + quantity + "&density=" + density;
		//console.log(data);
		$.ajax({
			type: "POST",
			url: "/bitrix/components/cyber/fly.basket/ajax.php",
			data: data,
			success: function(answer){ //Обработчик ответа

				if(!add){ //Удаление
					deleteItem(item, iblock, density);
				} else {

					if(answer != ''){ //Если ответ не пустой - вставляем новый элемент в таблицу
						if($('.cyberbasket_container tr').length == 0){ //Если это первый элемент - удаляем сообщение что корзина пуста и класс
							$('.cyberbasket_container').removeClass('empty_basket');
							$('.errore_msg').remove();
						}
						if(!$('.cyberbasket_container').hasClass('open') && $(document).width() >= 901){
							$('.cyberbasket_container').addClass('open');
						}
						$('.cyberbasket_itemlist').append(answer);
						changeCounter(); //Меняем цифру в кружочке
						calculateSum(); //пересчитываю сумму товаров в корзине

					}else{ //Если пустой - вызываем функцию изменения количества
						changeQuantity(item, iblock, quantity, density);
						//calculateSum(); //пересчитываю сумму товаров в корзине
						if(!$('.cyberbasket_container').hasClass('open') && $(document).width() >= 901){
							$('.cyberbasket_container').addClass('open');
						}
					}
				}
			}
		});
	}
	function changeItem(item, iblock, quantity, density) { //Функция отправки AJAX-запроса на добавление, удаление или изменение количества для малой корзины
		var data = "id=" + item + "&iblock=" + iblock + "&incart_change=true&quantity=" + quantity + "&density=" + density;
		if(!density){
			density = 'STANDART';
		}
		//console.log(data);
		$.ajax({
			type: "POST",
			url: "/bitrix/components/cyber/fly.basket/ajax.php",
			data: data,
			success: function(answer){ //Обработчик ответа
				var quantityInput = $('.cyberbasket_container #cyber_'+iblock+'_'+item+'_'+density).find('input'),
					itemBlock = $('.cyberbasket_container #cyber_'+iblock+'_'+item+'_'+density);

				$(quantityInput).val(Number(quantity)); //меняем значение количества
				$(quantityInput).data('counter', + Number(quantity));

				if($(itemBlock).data('price') != 0){ //пересчитываем сумму для элемента
					var sum = Number($(itemBlock).data('price')) * Number($('.cyberbasket_container #cyber_'+iblock+'_'+item+'_'+density).find('input').val());
					$(itemBlock).find('.item_sum').text(sum+' руб.');
				}
				calculateSum();
				calculateSize();
			}
		});
	}

	function calculateSum() { //Считаем сумму цен
		//console.log('calculateSum');
		var itemList = $('.cyberbasket_container tr:not(.not_item)');
		var total = 0;
		$(itemList).each(function(indx){
			total = total + $(this).attr('data-price') * $(this).find('input').val();
		});
		$('.cyberbasket_price').text(total + ' руб.');
	}

	function calculateSize() { //Считаем размеры в корзине

		var itemList = $('.cyberbasket_container tr:not(.not_item)');
		var total = 0;
		$(itemList).each(function(indx){
			size = $(this).attr('data-size') * $(this).find('input').val();
			$(this).find('.item-size').text(size);
			total = total + size;
		});
		$('.cyberbasket_container .size-summ').html(total + ' м<sup>3</sup>');
	}

	function changeCounter(){ //меняем цифру в кружочке
		//console.log('changeCounter');
		$('.cyberbasket_icon .counter').text($('.cyberbasket_itemlist').find('tr').length);
	}

	function changeQuantity(item, iblock, quantity, density){ //Функция смены количества и пересчёта
		//console.log('changeQuantity');
		var quantityInput = $('.cyberbasket_container #cyber_'+iblock+'_'+item+'_'+density).find('input'),
			itemBlock = $('.cyberbasket_container #cyber_'+iblock+'_'+item+'_'+density);
		console.log(itemBlock);
		$(quantityInput).val(Number($(quantityInput).val()) + Number(quantity)); //меняем значение количества
		$(quantityInput).data('counter', Number($(quantityInput).data('counter')) + Number(quantity));

		if($(itemBlock).data('price') != 0){ //пересчитываем сумму для элемента
			var sum = Number($(itemBlock).data('price')) * Number($('.cyberbasket_container #cyber_'+iblock+'_'+item+'_'+density).find('input').val());
			$(itemBlock).find('.item_sum').text(sum+' руб.');
		}
		calculateSum(); //И пересчитаем сумму
	}
	function deleteItem(item, iblock, density){ //Удаляем элемент с анимацией, пересчитываем сумму
		$('.cyberbasket_container #cyber_'+iblock+'_'+item+'_'+density).hide('300', function(){
			$(this).remove();
			if($('.cyberbasket_container tr:not(.not_item)').length == 0){ //Если больше не осталось элементов - выводим сообщение и даём контейнеру класс empty
				if($('.cyberbasket_container div').is('.cyberbasket_bottom')){
					$('.cyberbasket_bottom').before('<p class="errore_msg">Ваша корзина пуста</p>');
					$('.cyberbasket_container').addClass('empty_basket');
				}else{
					$('.cyberbasket_container .cyberbasket_itemlist').remove();
					$('.cyberbasket_container').html('<p class="errore_msg">Ваша корзина пуста</p>');
				}

			} else {
				calculateSum();
				changeCounter();
				calculateSize();
			}
		});
	}

	App.init();
});

var App = {
	section: null,
	content: null,
	sidebar: null,

	init: function () {
		if (document.querySelector('#faq')) {
			this.section = document.querySelector('#faq');
			this.sidebar = this.section.querySelector('#sidebar');
			this.content = this.section.querySelector('#content');

			this.alignMenuAndContent();
			this.delegationToHiddenContent();
		}
	},

	alignMenuAndContent: function() {
		if (window.innerWidth > 750) {
			if (this.content.offsetHeight < this.sidebar.offsetHeight) {
				return this.sidebar.style.height = this.content.offsetHeight + 'px';
			}

			return this.sidebar.style.height = this.content.offsetHeight + 'px';
		}
	},

	delegationToHiddenContent: function() {
		let app = this;

		this.section.onclick = function (e) {
			let t = e.target;

			while (t != this && !t.classList.contains('js-li-title')) {
				if (t.classList.contains('js-toggle-content')) {
					return;
				}

				if (t.classList.contains('js-item')) {
					app.switchIconClass(t);

					t.querySelector('.js-toggle-content').classList.toggle('d-none');

					return;
				}

				t = t.parentNode;
			}
		}
	},

	switchIconClass: function(t) {
		let i = t.querySelector('.js-arrow-icon');

		if (i.classList.contains('arrow-right')) {
			i.classList.replace('arrow-right', 'arrow-down');
		} else {
			i.classList.replace('arrow-down', 'arrow-right');
		}
	}
};