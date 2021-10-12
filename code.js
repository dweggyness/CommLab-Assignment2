
imagesToBePreloaded = [
  'images/Panel6_FlyingAxolotl.png',
  'images/Panel6_AxolotlFinal.png',
]

document.addEventListener("DOMContentLoaded", function() {
  initEventListeners();

  const panelSnapOptions = {
    container: document.body,
    panelSelector: '.comicContainer > section',
    directionThreshold: 100,
    delay: 100,
    duration: 600,
    easing: function(t) { return t },
  }
  const panelSnap = new PanelSnap(panelSnapOptions);

  var reachedFirstRow = false;
  var reachedFinalPanel = false;
  
  panelSnap.on("activatePanel", ( panel ) => {
    if ($(panel).hasClass('row1')) {
      if (!reachedFirstRow) { // only run this script once
        console.log('hello');
        reachedFirstRow = true;
        disableScroll();
      }
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

  preload(imagesToBePreloaded);
});

function initEventListeners() {
  setupPanel1();
}

// set up each panel to be viewed in sequence, they're all separate because
// you'll only be allowed to unblur the 2nd panel
// after hovering and completing the animation for the first one ( if any )

function setupPanel1() {
  const panel = $(".row1 > .panel1")[0];

  $(panel).hover(() => {
    // on hover, unblur the image and add the text after 0.75s
    $(panel).addClass('unblur')
    setTimeout(() => {
      $('<img id="panel1Text" src="images/Panel1_TextA.png"/>').appendTo($(panel));
    }, 750)
  
    setupPanel2();
  })
}

function setupPanel2() {
  const panel = $(".row1 > .panel2")[0];

  $(panel).hover(() => {
    $(panel).addClass('unblur')
    setTimeout(() => {
      $('<img id="panel2TextB" src="images/Panel2_TextB.png"/>').appendTo($(panel));
      setTimeout(() => {
        $('<img id="panel2TextC" src="images/Panel2_TextC.png"/>').appendTo($(panel));
      }, 1500)
    }, 750)

    enableScroll();
    setupPanel3();
  })
}

function setupPanel3() {
  $(".row2 .panel1").hover(() => {
    $(".row2 .panel1").addClass('unblur')
  })
}

function addPanelHoverEventListeners() {
  $(".row2 .panel2").hover(() => {
    $(".row2 .panel2").addClass('unblur')
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

function enableScroll() {
  $("body").css("overflow", "visible");
}

// preload image function stolen from internet
// preloads the image, so when you insert it into the DOM with javascript it doesnt need a load time
function preload(arrayOfImages) {
  $(arrayOfImages).each(function(){
      $('<img/>')[0].src = this;
  });
}
