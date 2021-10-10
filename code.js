
document.addEventListener("DOMContentLoaded", function() {
  const panelSnapOptions = {
    container: document.body,
    panelSelector: '.comicContainer > section',
    directionThreshold: 100,
    delay: 100,
    duration: 600,
    easing: function(t) { return t },
  }
  const panelSnap = new PanelSnap(panelSnapOptions);

  // check if user has scrolled to final panel, if so, disable scrolling and start tracking user clikcs
  panelSnap.on("activatePanel", ( panel ) => {
    if ($(panel).hasClass('row4')) {
      disableScroll();
      finalPanelScript();
    }
  })

  // start by snapping to title
  panelSnap.snapToPanel($(".title")[0]);
});

function finalPanelScript() {
  var clicks = 0;
  const finalPanel = $(".row4 > .comicPanel")[0];
  finalPanel.addEventListener("click", function() {
    clicks++;
    $(finalPanel).css("opacity", 1 - (clicks * 0.15));
  });
}

function disableScroll() {
  $("body").css("overflow", "hidden");
}