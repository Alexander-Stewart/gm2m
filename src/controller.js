AFRAME.registerComponent('controller', {
  schema: {},

  init: function () { 
    this.update.bind(this);
    // this is where i will handle gathering all of the tour components.
    // once gathered, I will start the tour using the along path event.
    // this.alongPath = this.el.getAttribute("alongpath")

    // Are we viewing on a platform where we can't really click, or a
    // desktop where we can?
    this.canClick = !AFRAME.utils.device.isMobile();

    this.tours = [];
    this.numTours = 0;
    this.currentTour = 0;

    // getting all the tour objects.
    this.tours = Array.from(this.el.children).map(child => child.getAttribute("tour"))
    this.numTours = this.tours.length;

    console.log(this.tours);
    console.log(this.numTours);

    // Now i will create a method to handle changing to the next tour...
    var advanceTour = function() {
      console.log("Advancing tour...");

      // Get the alongpath attribute from the camera entity.
      var el = document.getElementById("rig");
      var alongpath = el.getAttribute("alongpath");

      // the next tour, modding will go back to the beginning if needed.
      this.currentTour = (this.currentTour + 1) % this.numTours;
      console.log("new tour number: ", this.currentTour)

      // getting new tour information...
      var tour_name = this.tours[this.currentTour].tour_name;
      var dur = this.tours[this.currentTour].dur;

      // Change the curve, and restart the animation to follow the new
      // curve. The setAttribute function restarts the animation in
      // some way that simply modifying alongpath.curve does not.
      el.setAttribute("alongpath",
                      "curve: #" + tour_name +
                      "; dur: " + dur + ";");
    };
    let advanceTourBinded = advanceTour.bind(this);

    // setting a handler to handle clicks...
    var clickHandler = function(event) {
      console.log("click handler has been activated.")

      // First, stop listening for this event.  We'll start listening
      // again after the next segment is completed.
      document.getElementById('mainScene')
        .removeEventListener('click', clickHandler.bind(this));

      // Advance to the next part of the tour.
      advanceTourBinded();

      // Listen for the end of the next segment of the tour.
      document.getElementById("rig")
        .addEventListener('movingended', moveEndHandler.bind(this));
    };

    // setting a handler to update info when a tour ends
    var moveEndHandler = function(event) {
      console.log("moveEndHandler has been activated.");

      // Find the name of the path we just finished.
      var tour = this.tours[this.currentTour];
      console.log("currentTour: ", this.currentTour)

      var mainScene = document.getElementById('mainScene');

      // UPDATING TEXT WOULD HAPPEN HERE.

      // HANDLING SOUND WOULD HAPPEN BEFORE CHECKING CLICK.
      //console.log('this: ', this)

      // There is no sound to play.  If we can click, listen for one.
      if (this.canClick) { // this.canClick
        if (tour.playWhile) advanceTourBinded();
          mainScene.addEventListener('click', clickHandler.bind(this));
      } else {
        //console.log("we here...")
        // If we can't click, pause (if a pause is specified), then click.
        var pause = tour.pauseDuration ? 
                    tour.pauseDuration : 1000;
        setTimeout(clickHandler.bind(this), pause);
      };
    }

    // setting up and starting going through all of the tours!
    document.getElementById("rig").setAttribute("alongpath",
                      "curve: #" + this.tours[0].tour_name +
                      "; dur: " + this.tours[0].dur + ";");
    document.getElementById("rig").addEventListener('movingended', moveEndHandler.bind(this));


  },

  update: function () {

  },

  remove: function () {
    // Do something the component or its entity is detached.
  },

  tick: function (time, timeDelta) {
    // Do something on every scene tick or frame.
  }
});