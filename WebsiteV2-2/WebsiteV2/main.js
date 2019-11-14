require([
      "esri/Map",
      "esri/views/MapView",
      "esri/layers/GraphicsLayer",
      "esri/Graphic"
    ], function(Map, MapView, GraphicsLayer, Graphic) {
    
    var _currentScrollTop = null;

    var map = new Map({
        basemap: "streets-night-vector"
    });

    var view = new MapView({
        container: "viewDiv",
        map: map,
        center: [41.2658405,56.3484399],
        zoom: 3
    });
    
    //move the zoom out of the way of our floating boxes.
    view.ui.move(["zoom"], "bottom-right");
    
    //takin all the credit for myself.. mwahahahahaha
    view.ui.remove(["attribution"]);
    
    //We only want to zoom the elements of the page, not the map. The following two lines assigns the esri-view-surface object to a variable
    //and halts the propogation of any zoom events performed by the mouse wheel. Will require further investigation if this works on mobile. Probably not.....
    var viewSurfaceElem = document.getElementsByClassName("esri-view-surface")[0];
    viewSurfaceElem.addEventListener("wheel", function(event) { event.stopImmediatePropagation(); });   
    
    /******************************************
    * Creation of the Longmont & Colorado Springs Polygon Graphic
    *******************************************/
    var longmontPoint = {
        type: "point", // autocasts as new Point()
        longitude: -105.117575, 
        latitude: 40.174608
        };
    
    var csPoint = {
        type: "point", // autocasts as new Point()
        longitude: -104.798479,
        latitude: 38.840401
        };

        // Create a symbol for drawing the point
    var markerSymbol = {
        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
        color: [204, 204, 204, 0],
        outline: {
            // autocasts as new SimpleLineSymbol()
            color: [255, 255, 255],
            width: 1
          }
        };

        // Create a graphic and add the geometry and symbol to it
    var longmontPointGraphic = new Graphic({
        geometry: longmontPoint,
        symbol: markerSymbol
        });
    var csPointGraphic = new Graphic({
        geometry: csPoint,
        symbol: markerSymbol
        });
    
    
    /******************************************
    * Creation of the Colorado Polygon Graphic
    *******************************************/
    var coloradoPoly = {
         type: "polygon",
         rings: [
            [-102.0519264, 41.0023088],
            [-102.042091, 36.993016],
            [-109.045224, 36.999085],
            [-109.050075, 41.000660]
          ]
    };
    
    var coloradoFillSymbol = {
        type: "simple-fill", // autocasts as new SimpleFillSymbol()
        color: [204, 204, 204, 0],
        outline: {
            style: "dash",
            color: [255, 255, 255],
            width: 1
        }
    };
    
    var coloradoGraphic = new Graphic({
        geometry: coloradoPoly,
        symbol: coloradoFillSymbol
    });
    
    var gLayer = new GraphicsLayer({
        visible: true
    });
    
    map.add(gLayer);
    
    
    
    //Basic "go to the location I tell you to" function based on the array given.
    function goToLocation([y,x,z,d]){
        
        //Better call this function a fire because Ima throw a log in it
        console.log('Moving to Location at ' + y.toString() + ',' + x.toString() + ' zoom level ' + z.toString() +  ' in ' + d.toString() + ' miliseconds.');
        
        // set the duration of how long it should take the map to pan over to our new location
        var opts ={
            duration: d
        };
        
        //call the goTo() and provide our parameters.
        view.goTo({
            center: [y,x],
            zoom: z
        }, opts); 
    }
    
    var placeList = [[41.2658405,56.3484399, 3, 5000],[-104.7905009,38.9619919, 4, 5000],[-105.117575, 40.174608, 6, 5000], [-104.798479, 38.840401, 6, 5000], [-104.798392, 38.891812, 8, 4000], 
                     [-104.798392, 38.891812, 15, 4000]];
    
    var footer = document.getElementById("footer");  
        
    //Declare our Map Note elements as variables.
    var mn1 = document.getElementById("mn1");
    var mn2 = document.getElementById("mn2");
    var mn3 = document.getElementById("mn3");
    var mn4 = document.getElementById("mn4");
    var mn5 = document.getElementById("mn5");
    var mn6 = document.getElementById("mn6");
    
    //Boolean variable for whether a Map Note has been passed or not. 
    var mn1Passed = false, mn2Passed = false, mn3Passed = false, mn4Passed = false, mn5Passed = false, mn6Passed = false;
    
    //Depreciated from version where bounding boxes were required to track Map Note positions.
    var mn1Box, mn2Box, mn3Box, mn4Box, mn5Box, mn6Box;
    
    
    
    
    $(window).scroll(function(){
        mn1Box = mn1.getBoundingClientRect();
        
        var YOFF = window.pageYOffset;
        
        if(YOFF>2700 && YOFF<4300 && mn1Passed==false){
            mn1Passed=true;
            //alert("MN1 is Gone Jim");
            goToLocation(placeList[1]);
            gLayer.add(coloradoGraphic);
        }else if(YOFF<2700 && mn1Passed==true){
            mn1Passed=false;
            //alert("MN1 is Back Jim!");
            goToLocation(placeList[0]);
            gLayer.remove(coloradoGraphic);
        }
        
        if(YOFF>4300 && YOFF<5700 && mn2Passed==false){
            mn2Passed=true;
            //alert("MN2 is Gone Jim");
            goToLocation(placeList[2]);
            gLayer.add(longmontPointGraphic);
        }else if(YOFF<4300 && YOFF>2700 && mn2Passed==true){
            mn2Passed=false;
            //alert("MN2 is Back Jim!");
            goToLocation(placeList[1]);
            gLayer.remove(longmontPointGraphic);
        }
        
        if(YOFF>5170 && YOFF<6270 && mn3Passed==false){
            mn3Passed=true;
            //alert("MN2 is Gone Jim");
            goToLocation(placeList[3]);
            gLayer.remove(longmontPointGraphic);
            gLayer.add(csPointGraphic);
        }else if(YOFF<5170 && YOFF>4300 && mn3Passed==true){
            mn3Passed=false;
            //alert("MN2 is Back Jim!");
            goToLocation(placeList[2]);
            gLayer.add(longmontPointGraphic);
            gLayer.remove(csPointGraphic);
        }
        
        if(YOFF>6300 && YOFF<7500 && mn4Passed==false){
            mn4Passed=true;
            //alert("MN2 is Gone Jim");
            goToLocation(placeList[4]);
            gLayer.remove(csPointGraphic);
            //gLayer.add(uccsPolyGraphic);
        }else if(YOFF<6300 && YOFF>5170 && mn4Passed==true){
            mn4Passed=false;
            //alert("MN2 is Back Jim!");
            goToLocation(placeList[3]);
            gLayer.add(csPointGraphic);
            //gLayer.remove(uccsPolyGraphic);
        }
        
        if(YOFF>7500 && YOFF<8400 && mn5Passed==false){
            mn5Passed=true;
            //alert("MN2 is Gone Jim");
            goToLocation(placeList[5]);
            //gLayer.remove(csPointGraphic);
            //gLayer.add(uccsPolyGraphic);
        }else if(YOFF<7500 && YOFF>6300 && mn5Passed==true){
            mn5Passed=false;
            //alert("MN2 is Back Jim!");
            goToLocation(placeList[4]);
            //gLayer.add(csPointGraphic);
            //gLayer.remove(uccsPolyGraphic);
        }
        
        
        footer.innerHTML = "TOP: " + mn1Box.top.toString() + " BOTTOM: " + mn1Box.bottom.toString() + "WINDOW OFFSET Y: " + window.pageYOffset.toString();
    });
    
    /* -----------------------------------------------TESTING DOMAIN----------------------------------------------------
    
    function updateUI(p){
        p = p || {};
        
        var scrollTop = app.display.scrollTop;
        
        app.display.scrollTop = scrollTop;
        
        if (_currentScrollTop == scrollTop && ! p.forceUpdate) {
        return;
        }
        
        var scrollDifference = scrollTop - _currentScrollTop;
        
        _currentScrollTop = scrollTop;
        
        var sectionsDisplayInfos = getActiveAndVisibleSections(scrollTop, scrollTop + app.display.windowHeight), currentSectionDisplaysInfos = sectionsDisplayInfos.activeSection;
        
        if (! currentSectionDisplaysInfos){
            return;
        }
        
        
    }
    
    
    
    function computeDisplayInfos(){
      var sections = [];

      $('.section').each(function(index) {
        var node = $(this);

        sections.push({
          top: node.hasClass('hidden') ? Number.MAX_VALUE : node.position().top,
          node: node,
          type: app.data.sections[index].type
        });
      });

      var $window = $(window),
          windowWidth = $window.width(),
          windowHeight = $window.height(),
          headerHeight = $(".header").getHeight();

      app.display = {
        browserWidth: windowWidth,
        windowWidth: windowWidth,
        windowHeight: windowHeight,
        headerHeight: headerHeight,
        sectionHeight: windowHeight - headerHeight,
        storyHeight: $('body').height(),
        scrollTop: app.display ? app.display.scrollTop : 0,
        sections: sections,
      };        
    }

    $(window).scroll(function() {
        // To not pass scroll event to UI components when the modal is open
        // This does not prevent the event, it just make sure the component
        // don't render with invalid scroll values (especially the header)
        if ($('body').hasClass('modal-open')) {
            return;
          }

          displayScrollTop = doc.scrollTop();
        });
    -----------------------------------------------TESTING DOMAIN----------------------------------------------------*/
    
});

/*
Resources:

Sticky Elements with No Body Height: https://stackoverflow.com/questions/49848196/position-sticky-not-working-when-height-is-defined

*/