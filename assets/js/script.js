var hiddenGems = [
    "Grand Ole BBQ",
    "La Fachada",
    "Trining's Bakery",
    "Swami's Beach"
    // "Liberty Public Market"
    // ------ Coming up with OVER_QUERY_LIMIT when running getDetails for more than four places
    // "Morley Field Disc Golf Course",
    // "OB Noodle House Bar 1502",
    // "Campfire"
];


var reviews;
var placeReviewsEl = document.getElementById("place-reviews");
var placeDetailsEl = document.querySelector("#place-details");
var placeNameEl = document.querySelector("#place-name");

function initMap() {
    const map = new google.maps.Map(
        document.getElementById("map"),
        {
            center: { lat: 32.7157, lng: -117.1611 }, // coords for San Diego
            zoom: 12,
        }
    );

    const infowindow = new google.maps.InfoWindow();
    const service = new google.maps.places.PlacesService(map);

    for (var i = 0; i < hiddenGems.length; i++) {

        /*************** Request information for findPlaceFromQuery ******************/
        var fPFQRequest = {
            query: hiddenGems[i], // search term query
            fields: ['name', 'geometry', 'place_id'],   // fields that we want API request to return
        }

       

        service.findPlaceFromQuery(fPFQRequest, function(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {

                console.log(results[0]); 

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
                        const marker = new google.maps.Marker( {
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

                            cleanElement(placeReviewsEl);
                            cleanElement(placeDetailsEl);
                            displayDetails(place.name, place.formatted_address);
                            displayReviews(place.reviews);
                        });

                        // reviews = place.reviews;    // store reviews outside of initMap() if needed
                    }
                    else {
                        console.log("Error in getDetails:", status);
                    }
                });
            }
        });
    }
    
}

function cleanElement(element) {
    while(element.children.length) {
        element.removeChild(element.children[0]);
    }
}

/**************Display Details Code***************** */
function displayDetails(name, address) {
    
    placeNameEl.textContent = name;
    placeDetailsEl.textContent = address;
}


/**************Display Reviews Code***************** */
function displayReviews(reviews) {
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
