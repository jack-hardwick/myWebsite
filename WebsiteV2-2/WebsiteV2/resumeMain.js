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
        center: [-104.7905009,38.9619919],
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
    
    var resumeInfoList = [["Job Title", "Date of Employment", "Description", "graphic to highlight?"]];
    
    var footer = document.getElementById("footer");  
        
    
    //Boolean variable for whether a Map Note has been passed or not. 
    var mn1Passed = false, mn2Passed = false, mn3Passed = false, mn4Passed = false, mn5Passed = false, mn6Passed = false;
    
    //Depreciated from version where bounding boxes were required to track Map Note positions.
    var mn1Box, mn2Box, mn3Box, mn4Box, mn5Box, mn6Box;
    
    function hideDirectoryStuff(){
        $("#directory").css("display", "none");
        $("#backBtn").css("display", "block");    
    }
    
    $("#backBtn").click(function(){
        $("#directory").css("display", "block");
        $("#directoryTitle").html("Resume Directory");
        //GIS EXP HIDE
        $("#GISexptext").css("display", "none");
        $("#GISInternLongtextField").css("display","none");
        $("#GISInternUCCStextField").css("display", "none");
        $("#GISTAtextField").css("display", "none");
        //GEN EXP HIDE
        $("#GenExpText").css("display", "none");
        $("#BSAtext").css("display", "none");
        $("#FRCCITtext").css("display", "none");
        $("#UCCSITtext").css("display", "none");
        //ACCOMP HIDE
        $("#AccompText").css("display", "none");
        $("#eagleText").css("display", "none");
        $("#gisClubPresText").css("display", "none");
        $("#LASAmbText").css("display", "none");
        
        //OTHER HIDE
        $("#subTitle").html("");
        $("#backBtn").css("display", "none");
        $("#pageIncrease").css("display", "none");
    });
    
    
    
    //GIS EXPERIENCE------------------------------------------------
    $("#gisExpButton").click(function(){
       hideDirectoryStuff();
       $("#directoryTitle").html("GIS Experience");
       $("#GISexptext").css("display", "block");
    });
    
    $("#gisInternLong").click(function(){
        $("#GISInternLongtextField").css("display", "block");
        $("#GISexptext").css("display", "none");
        $("#directoryTitle").html("GIS Student Intern – City of Longmont Planning and Development Department");
        $("#subTitle").html("February 2018 – May 2018");
        //$("#pageIncrease").css("display", "block");
        
    });
    
    $("#gisInternUCCS").click(function(){
        $("#GISInternUCCStextField").css("display", "block");
        $("#GISexptext").css("display", "none");
        $("#directoryTitle").html("GIS Intern – UCCS Office of Information Technology");
        $("#subTitle").html("November 2018 – Present");
        $("#pageIncrease").css("display", "block");
        
    });
    
    $("#gisTA").click(function(){
        $("#GISTAtextField").css("display", "block");
        $("#GISexptext").css("display", "none");
        $("#directoryTitle").html("GIS Teaching Assistant – UCCS Geography & Environmental Studies");
        $("#subTitle").html("October 2018 – Present");
        $("#pageIncrease").css("display", "block");        
    });
    
    //GENERAL WORK EXPERIENCE-----------------------------------------------------
    
    $("#GenExpButton").click(function(){
        hideDirectoryStuff();
        $("#directoryTitle").html("General Work Experience");
        $("#GenExpText").css("display", "block");
    });
    
    $("#BSAbutton").click(function(){
        $("#BSAtext").css("display", "block");
        $("#GenExpText").css("display", "none");
        $("#directoryTitle").html("San Isabel Scout Ranch & Ben Delatour Scout Ranch");
        $("#subTitle").html("June 1st - July 28th, 2012-2015");
        //$("#pageIncrease").css("display", "block");
        
    });
    
    $("#FRCCITbutton").click(function(){
        $("#FRCCITtext").css("display", "block");
        $("#GenExpText").css("display", "none");
        $("#directoryTitle").html("Senior Student Technician - FRCC Information Technology Support");
        $("#subTitle").html("June 2017 - May 2018");
        //$("#pageIncrease").css("display", "block");
        
    });
    
    $("#UCCSITbutton").click(function(){
        $("#UCCSITtext").css("display", "block");
        $("#GenExpText").css("display", "none");
        $("#directoryTitle").html("Student Technician – UCCS Office of Information Technology");
        $("#subTitle").html("July 2018 - November 2018");
        //$("#pageIncrease").css("display", "block");        
    });
    
    //ACCOMPLISHMENTS---------------------------------------------------------------
    $("#accompButton").click(function(){
        hideDirectoryStuff();
        $("#AccompText").css("display", "block"); 
    });
    
    $("#eagleButton").click(function(){
        $("#eagleText").css("display", "block");
        $("#AccompText").css("display", "none");
        $("#directoryTitle").html("San Isabel Scout Ranch & Ben Delatour Scout Ranch");
        $("#subTitle").html("June 1st - July 28th, 2012-2015");
        //$("#pageIncrease").css("display", "block");
        
    });
    
    $("#gisClubPresButton").click(function(){
        $("#gisClubPresText").css("display", "block");
        $("#AccompText").css("display", "none");
        $("#directoryTitle").html("Senior Student Technician - FRCC Information Technology Support");
        $("#subTitle").html("June 2017 - May 2018");
        //$("#pageIncrease").css("display", "block");
        
    });
    
    $("#LASAmbbutton").click(function(){
        $("#LASAmbText").css("display", "block");
        $("#AccompText").css("display", "none");
        $("#directoryTitle").html("Student Technician – UCCS Office of Information Technology");
        $("#subTitle").html("July 2018 - November 2018");
        //$("#pageIncrease").css("display", "block");        
    });
    
    
    //EDUCATION-----------------------------------------------------------------------
    $("#edTrButton").click(function(){
       alert("GIS Experience Button Clicked!");
       $("#directory").css("display", "none"); 
    });
    
    
    //TECHNICAL SKILLS-----------------------------------------------------------------
    $("#techSkillsButton").click(function(){
       alert("GIS Experience Button Clicked!"); 
    });
    
    //ACADEMIC CREDITS-----------------------------------------------------------------
    $("#acadCredButton").click(function(){
       alert("GIS Experience Button Clicked!"); 
    });
    
    
    //PUBLIC PRESENTATIONS----------------------------------------------------------------
    $("#publicPresButton").click(function(){
       alert("GIS Experience Button Clicked!"); 
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