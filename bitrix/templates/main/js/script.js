  $(document).ready(function(){
    
    $('.client-block-list').slick({
  infinite: true,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1150,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});
    
  
    $(document).on('click', '.play-button', function() {
        var my_video = document.getElementById("my_video");
		var my_video = my_video.getElementsByTagName("iframe")[0].contentWindow;
        my_video.postMessage('{"event": "command", "func": "playVideo", "args": ""}', "*");
        $('.video-back').hide();
        $('.play-button').hide();
        $('#my_video').show();
        });
 $(document).on('click', '.project-step-item', function() {       
      $('.project-step-item').removeClass('active');
      $(this).addClass('active');
     });   
   $('input[name=page_url]').val(window.location.href);
$('input[name=phone]').mask("+7 (999) 999-9999");
  
$(".form-catalog form").validate({
       rules:{
            
            name:{
                required: true,
            },
            phone:{
                required: true,
            },
            email:{
                required: true,
            }
       },
        messages:{
            
            name:{
                required: "",
            },
            phone:{
                required: "",
            },
            email:{
                required: "",
            }
       }, 
  submitHandler: function(form) {
    $(form).ajaxSubmit();
    $('.form-catalog form').find('input[type=text],input[type=email]').val('');
    $('.form-catalog form').find('input[type=submit]').val("Отправлено");
    $('.form-catalog form').find('.result').show();
    return false;
  }
    });     
 $(".form-bottom form").validate({
       rules:{
            
            name:{
                required: true,
            },
            phone:{
                required: true,
            },
            email:{
                required: true,
            }
       },
        messages:{
            
            name:{
                required: "",
            },
            phone:{
                required: "",
            },
            email:{
                required: "",
            }
       }, 
  submitHandler: function(form) {
    $(form).ajaxSubmit();
    $('.form-bottom form').find('input[type=text],input[type=email]').val('');
    $('.form-bottom form').find('input[type=submit]').val("Отправлено");
    $('.form-bottom form').find('.result').show();
    return false;
  }
    });     
 
     
});
    
    
    
    
