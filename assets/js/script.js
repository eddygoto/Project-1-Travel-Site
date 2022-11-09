var grandOle, grandOleName, grandOleId, grandOleLat, grandOleLng;

function initMap() {
    const map = new google.maps.Map(
        document.getElementById("map"),
        {
            center: { lat: 32.7157, lng: -117.1611 }, // coords for San Diego
            zoom: 11,
        }
    );

    var request = {
        query: 'Grand Ole', // search term query
        fields: ['name', 'geometry', 'place_id'],   // fields that we want API request to return
    }

    var service = new google.maps.places.PlacesService(map);
    var coordStr;   // stores the coordinate information for the request

    service.findPlaceFromQuery(request, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            grandOle = results[0];  // Places API sends response in results array
            grandOleId = results[0].place_id; // place_id gets the business id used for getDetails()

            coordStr = results[0].geometry.location.toString(); // stores the coordinates for the result as a string: '(lat, lng)'
            coordStr = coordStr.slice(1, coordStr.length-1);
            [grandOleLat, grandOleLng] = coordStr.split(',');
            grandOleLng = grandOleLng.trimStart();

            grandOleLat = parseFloat(grandOleLat);
            grandOleLng = parseFloat(grandOleLng);

            const grandOleMarker = { lat: grandOleLat, lng: grandOleLng };
            const marker = new google.maps.Marker({
                position: grandOleMarker,
                map: map,
            })
        }
    });
}

window.initMap = initMap;