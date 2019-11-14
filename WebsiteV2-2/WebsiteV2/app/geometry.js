require([
    "esri/layers/GraphicsLayer",
    "esri/Graphic"    
], function(GraphicsLayer, Graphic){
 
    /******************************************
    * Creation of the Longmont & Colorado Springs Polygon Graphic
    *******************************************/
    
    var longmontPoint = {
        type: "point", // autocasts as new Point()
        longitude: -49.97,
        latitude: 41.73
        };
    
    var csPoint = {
        type: "point", // autocasts as new Point()
        longitude: -49.97,
        latitude: 41.73
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
    
    
    

// Create a graphic and add the geometry and symbol to it
    
    define({
        
        longmontPointGraphic : return(new Graphic({
        geometry: longmontPoint,
        symbol: markerSymbol
        })),
        
        csPointGraphic : return(new Graphic({
        geometry: csPoint,
        symbol: markerSymbol
        })),
        
        coloradoGraphic : return(new Graphic({
        geometry: coloradoPoly,
        symbol: coloradoFillSymbol
        })),
        
        gLayer : return(new GraphicsLayer({
        visible: true
        }))
        
    });
    
    
});