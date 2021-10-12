
imagesToBePreloaded = [
  'images/Panel6_FlyingAxolotl.png',
  'images/Panel6_AxolotlFinal.png',
]

document.addEventListener("DOMContentLoaded", function() {
  preload(imagesToBePreloaded);

  const panelSnapOptions = {
    container: document.body,
    panelSelector: '.comicContainer > section',
    directionThreshold: 100,
    delay: 100,
    duration: 600,
    easing: function(t) { return t },
  }
  const panelSnap = new PanelSnap(panelSnapOptions);

  var reachedFinalPanel = false;
  
  panelSnap.on("activatePanel", ( panel ) => {
    if ($(panel).hasClass('row1')) {
      addPanelHoverEventListeners();
    }
    // check if user has scrolled to final panel, if so, disable scrolling and start tracking user clikcs
    if ($(panel).hasClass('row4')) {
      if (!reachedFinalPanel) { // only run this script once
        reachedFinalPanel = true;
        disableScroll();
        panel6Script();
      }
    }
  })

  // start by snapping to title
  $("body").css("overflow", "visible");
  panelSnap.snapToPanel($(".title")[0]);
});

function addPanelHoverEventListeners() {
  $(".row1 .panel1").hover(() => {
    $(".row1 .panel1").addClass('unblur')
  })
  $(".row1 .panel2").hover(() => {
    $(".row1 .panel2").addClass('unblur')
  })
}

function panel6Script() {
  var userClicked = false;
  const finalPanel = $(".row4 > .comicPanel")[0];
  $(finalPanel).bind('click', function() {
    if (!userClicked) { // once user clicked, dont trigger for any further clicks
      userClicked = true; 
      // add splash image
      $('<img id="panel6SplashImage" src="images/Panel6_Splash.png"/>').appendTo($(finalPanel));
      // add axolotl animation flying after 1.25s, 1s for splash to finish expanding
      setTimeout(() => {
        $('<img id="panel6Axolotl" src="images/Panel6_FlyingAxolotl.png"/>').appendTo($(finalPanel));
        // time taken for axolotl to hit screen, 4s, then change image to splat image
        setTimeout(() => {
          $('#panel6Axolotl').attr('src', "images/Panel6_AxolotlFinal.png");
          // sneaky use of setTimeout to make sure that this is run after changing the image
          setTimeout(() => {
            $('#panel6Axolotl').css('height', '800px')
            $('#panel6Axolotl').addClass('slideAnimation')
          }, 10);
        }, 3400);
      }, 1250)
    }
  });
}

function disableScroll() {
  $("body").css("overflow", "hidden");
}

// preload image function stolen from internet
// preloads the image, so when you insert it into the DOM with javascript it doesnt need a load time
function preload(arrayOfImages) {
  $(arrayOfImages).each(function(){
      $('<img/>')[0].src = this;
  });
}
