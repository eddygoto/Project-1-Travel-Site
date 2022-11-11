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


var reviews;
var placeReviewsEl;
window.onload = function () {
    placeReviewsEl = document.getElementById("place-reviews")
    displayReviews();
}
function initMap() {
    const map = new google.maps.Map(
        document.getElementById("map"),
        {
            center: { lat: 32.7157, lng: -117.1611 }, // coords for San Diego
            zoom: 12,
        }
    );

    /*************** Request information for findPlaceFromQuery ******************/
    var fPFQRequest = {
        query: hiddenGems[0], // search term query
        fields: ['name', 'geometry', 'place_id'],   // fields that we want API request to return
    }

    const infowindow = new google.maps.InfoWindow();
    const service = new google.maps.places.PlacesService(map);

    service.findPlaceFromQuery(fPFQRequest, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {

            /*************** Request information for call to getDetails() ******************/
            getDetailsRequest = {
                placeId: results[0].place_id,   // getDetails searches by place_id
                fields: ["name", "formatted_address", "place_id", "geometry", "reviews"],   // fields to return
            };

            service.getDetails(getDetailsRequest, (place, status) => {
                if (
                    status === google.maps.places.PlacesServiceStatus.OK &&
                    place &&
                    place.geometry &&
                    place.geometry.location
                ) {
                    /*************** Placing a Marker ******************/
                    const marker = new google.maps.Marker({
                        map,
                        position: place.geometry.location,
                    });

                    /*************** Event Listener Code ******************/
                    google.maps.event.addListener(marker, "click", () => {
                        const content = document.createElement("div");

                        const nameElement = document.createElement("h2");
                        nameElement.textContent = place.name;
                        content.appendChild(nameElement);

                        const placeAddressElement = document.createElement("p");
                        placeAddressElement.textContent = place.formatted_address;
                        content.appendChild(placeAddressElement);

                        infowindow.setContent(content);
                        infowindow.open(map, marker);
                    });

                    reviews = place.reviews; // store reviews outside of initMap() if needed
                    console.log(reviews)
                }
            });
        }
    });
}
/**************Display Reviews Code***************** */
function displayReviews() {
    for (var i = 0; i < 3; i++) {
        const reviewContainer = document.createElement("div");
        placeReviewsEl.appendChild(reviewContainer);
        reviewContainer.className = "review";
        reviewContainer.textContent += reviews[i].text + " --";
        reviewContainer.textContent += reviews[i].author_name + " ";
        reviewContainer.textContent += reviews[i].relative_time_description + " ";
        reviewContainer.textContent += reviews[i].rating + " Stars";
    }
}





window.initMap = initMap;
