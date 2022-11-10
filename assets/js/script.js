var grandOle, grandOleName, grandOleId, grandOleLat, grandOleLng;

var hiddenGems = [
    "Grand Ole",
    "La Fachada",
    "Trining's Bakery",
    "Liberty Public Market",
    "Morley Field Disc Golf Course",
    "OB Noodle House Bar 1502",
    // "Campfire"
];

var placeIds = [];

function initMap() {
    const map = new google.maps.Map(
        document.getElementById("map"),
        {
            center: { lat: 32.7157, lng: -117.1611 }, // coords for San Diego
            zoom: 11,
        }
    );

    for (var i = 0; i < hiddenGems.length; i++) {
        var fPFQRequest = {
            query: hiddenGems[i], // search term query
            fields: ['name', 'geometry', 'place_id'],   // fields that we want API request to return
        }
    
        const service = new google.maps.places.PlacesService(map);
        var coordStr;   // stores the coordinate information for the request
        var latResult, lngResult;

        service.findPlaceFromQuery(fPFQRequest, function(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                grandOle = results[0];  // Places API sends response in results array
                placeIds.push(results[0].place_id); // place_id gets the business id used for getDetails()
    
                coordStr = results[0].geometry.location.toString(); // stores the coordinates for the result as a string: '(lat, lng)'
                coordStr = coordStr.slice(1, coordStr.length-1);
                [latResult, lngResult] = coordStr.split(',');
                lngResult = lngResult.trimStart();
    
                latResult = parseFloat(latResult);
                lngResult = parseFloat(lngResult);

                const grandOleMarker = { lat: latResult, lng: lngResult };
                const marker = new google.maps.Marker({
                    position: grandOleMarker,
                    map: map,
                })
            }
        });
    }
}

window.initMap = initMap;