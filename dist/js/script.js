$(document).ready(function () {

// nice select
//$('.select-beauty').niceSelect();
// nice select === end

//closeModal() - закрыть окна
//initModal('data-name-attr') - Открыть нужное окно

//modals
var modalState = {
	"isModalShow": false, //state show modal
	"scrollPos": 0
};
$('.modal-content').click(function (event) {
	event.stopPropagation();
});

var openModal = function () {
	if (!$('.modal-layer').hasClass('modal-layer-show')) {
		$('.modal-layer').addClass('modal-layer-show');
		modalState.scrollPos = $(window).scrollTop();
		$('body').css({
			overflow: 'hidden',
			position: 'fixed',
			overflowY: 'hidden',
			top: -modalState.scrollPos,
			width: '100%'
		});
	}
	modalState.isModalShow = true;
};
var closeModal = function () {
	$('.modal-layer').removeClass('modal-layer-show');
	$('body').css({
		overflow: '',
		position: '',
		top: modalState.scrollPos
	});
	$(window).scrollTop(modalState.scrollPos);
	$('.modal').removeClass('modal__show');
	modalState.isModalShow = false;
};

var initModal = function (el) {
	openModal();
	$('.modal').each(function () {
		if ($(this).data('modal') === el) {
			$(this).addClass('modal__show')
		} else {
			$(this).removeClass('modal__show')
		}
	});
	var modalHeightCont = $(window).height();
	$('.modal-filter').height(modalHeightCont);

};

$('.modal-get').click(function () {
	var currentModal = $(this).data("modal");
	initModal(currentModal);
});

$('.modal-layer , .modal-close').click(function () {
	closeModal();
});
//modals===end

//mobile menu
//Фиксируем скрол
$('.head-toggle--open').click(function(){
	$('body').css({
		overflow: '',
		position: '',
		top: ''
	})
});

$('.head-toggle').click(function(event){
	event.stopPropagation();
	$(this).toggleClass('head-toggle--open');
	$('.slide-menu').toggleClass('slide-menu--open');
	//$('body').toggleClass('body-fix')
});

$('.slide-menu').on("click", function (event) {
	event.stopPropagation();
});

$(document).on("click", function () {
		$('.head-wrap').removeClass('head--up');
		$('.head-toggle').removeClass('head-toggle--open');
		$('.slide-menu').removeClass('slide-menu--open');
		console.log(modalState.isModalShow);
		if(modalState.isModalShow == false){
			$('body').removeClass('body-fix')
	}
});
//mobile menu===end

// fix top-menu
var shrinkHeader = 250;
var heightHeader=$('.head').height();
$(window).scroll(function() {
	var scroll = $(this).scrollTop();
	if ( scroll >= shrinkHeader ) {
			$('body').css('paddingTop',heightHeader);
			$('.head').addClass('shrink');
		}
		else {
				$('body').css('paddingTop',0);
				$('.head').removeClass('shrink');
		}
});

$(window).resize(function(){
	heightHeader=$('.head').height();
});
// fix top-menu === end


//validate
jQuery.validator.addMethod("getPhone", function(value, element) {
  // allow any non-whitespace characters as the host part
  return this.optional( element ) || /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){5,18}(\s*)?$/.test( value );
	}, 'Введите правильный номер телефона');
$('.validate-form').each(function () {
	var curentForm = $(this);
	$(this).validate({
		highlight: function (element) { //даем родителю класс если есть ошибка
			$(element).parent().addClass("input-row--error");
		},
		unhighlight: function (element) {
			$(element).parent().removeClass("input-row--error");
		},
		rules: { //правила для полей
			name: {
				required: true,
			},
			phone: {
				required: true,
			},
			comment: {
				required: true,
				minlength: 5,
			},
			agree: {
				required: true
			}
		},
		messages: {
			name: {
				required: 'Обязательное поле',
			},
			phone: {
				required: 'Обязательное поле',
			},
			comment: {
				required: 'Обязательное поле',
				minlength: 'Сообщение должно быть длиннее',
			},
			agree: {
				required: false,
			}
		},
		submitHandler: function (form) {
			$.ajax({ //отправка ajax
				type: "POST",
				url: "sender.php",
				//url: "/",
				data: $(form).serialize(),
				timeout: 3000,
			});
			initModal("truemessage");
			setTimeout(function () {
				closeModal();
				$(':input', '.validate-form') //очитска формы от данных
					.not(':button, :submit, :reset, :hidden')
					.val('')
					.removeAttr('checked')
					.removeAttr('selected')
			}, 2500)

		}
	});
});

});
