let songsArray = ["/assets/mp3/ubi_caritas.mp3", "/assets/mp3/sailing_across_emerald_bay.mp3", "/assets/mp3/still_you_call_me.mp3"];

function getRandomSong() {
  let randomIndex = Math.floor(Math.random() * songsArray.length);
  return songsArray[randomIndex];
}

$(document).ready(function(){
  var x = $('audio').length;
  var z = 0;

  $('.wrapper > img').attr("src", function() {
    return $('.thumbnail')[z].src;
  });

  $( ".wrapper" ).wrap($('<div class="slice-content"/>')).parent().clone().appendTo( ".this" ).find( '.wrapper' ).css('margin-top','-111px');
  
  $('.slice-content').click(function(){
    $('.slice-content:nth-child(4)').toggleClass('flip');
  });

  $('.play').click(function () {
    $(this).toggleClass('pause');
    if($(this).hasClass('pause')){
      $('audio')[z].pause();
    } else {
      $('audio')[z].play();
    }
  });

  $('.next').click(function() {
    // Pause the current audio
    $('audio')[z].pause();
    $('audio')[z].currentTime = 0;
  
    // Update the source for the audio element
    let $source = $(".song_source");
    let randomSrc = getRandomSong();
    $source.attr("src", randomSrc);
  
    // Increment the index
    z++;
    if (z >= x) {
      z = 0;
    }
  
    // Update the image
    $('.wrapper > img').attr("src", function() {
      return $('.thumbnail')[z].src;
    });
  
    // Load the new audio element
    let newAudio = $('audio')[z];
    newAudio.load();
  
    // Play the new audio once it's ready
    newAudio.addEventListener('canplaythrough', function() {
      newAudio.play();
    });
  
    // Fallback: Play after a timeout if canplaythrough doesn't fire
    setTimeout(function() {
      if (newAudio.paused) {
        newAudio.play();
      }
    }, 5000); // Adjust the timeout as needed
  });
  
  

  $('.previous').click(function(){
    // Pause the current audio
    $('audio')[z].pause();
    $('audio')[z].currentTime = 0;
  
    // Decrement the index
    z--;
    if (z < 0) {
      z = x - 1;
    }
  
    // Update the image
    $('.wrapper > img').attr("src", function() {
      return $('.thumbnail')[z].src;
    });
  
    // Load the previous audio element
    let prevAudio = $('audio')[z];
    prevAudio.load();
  
    // Play the previous audio once it's ready
    prevAudio.addEventListener('canplaythrough', function() {
      prevAudio.play();
    });
  
    // Fallback: Play after a timeout if canplaythrough doesn't fire
    setTimeout(function() {
      if (prevAudio.paused) {
        prevAudio.play();
      }
    }, 5000); // Adjust the timeout as needed
  });
  

  $('audio').bind("ended",function(){
    z++;
    if(z >= x) { z = 0; }
    $('.wrapper > img').attr("src", function() { return $('.thumbnail')[z].src; });
    $('audio')[z].play();
  });

  // Add error event listener for audio elements
  $('audio').on('error', function(event) {
    console.error('Error occurred while loading or playing audio:', event);
  });
        // Like & Share screens fade
        $('.likescreen, .sharescreen, .blackscreen, .sharetext').hide();
        $('.like').click(function(){
          $('.slice-content:nth-child(4)').toggleClass('flip');
          $('.blackscreen').fadeIn(1000);
          $('.likescreen').fadeIn(500);
          $('.likecounter').addClass('dropdown');
        });
        $('.likescreen').click(function(){
          $('.likescreen, .blackscreen').fadeOut(300);
          $('.likecounter').removeClass('dropdown');
        });
        $('.share').click(function(){
          $('.slice-content:nth-child(4)').toggleClass('flip');
          $('.blackscreen').fadeIn(1000);
          $('.sharescreen').fadeIn(500);
          $('.socialicons').addClass('dropdown');
          setTimeout(function(){
            $('.sharetext').fadeIn(300);
            $('.facebook').css('right','130px').css('opacity','1');
            $('.dribbble').css('left','130px').css('opacity','1');
            setTimeout(function(){
              $('.lineone, .linetwo').css('width','19px');
            },300);
          },1000);
        });
        $('.sharescreen').click(function(){
          $('.slice-content:nth-child(4)').toggleClass('flip');
          $('.sharescreen, .blackscreen, .sharetext').fadeOut();
          $('.socialicons').removeClass('dropdown');
          $('.lineone, .linetwo').css('width','0px');
          $('.facebook').css('right','0').css('opacity','0');
          $('.dribbble').css('left','0').css('opacity','0');
        });
      
        $("ul > li, .share, .like").find('span').hide().end()
        .hover(function(){
          $(this).find('span').stop(true, true).fadeIn(200)
        }, function(){
          $(this).find('span').stop(true, true).fadeOut(200)
        });
});
