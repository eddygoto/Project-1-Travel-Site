var hiddenGemsFull = [
  "Grand Ole BBQ Y Asado",
  "La Fachada",
  "Trining's Bakery",
  "Swami's Beach",
  "Liberty Public Market",   
  "Morley Field Disc Golf Course",
  "OB Noodle House Bar 1502",
  "Campfire",
  "Hayes Burger",
  "Din Tai Fung",
];


var hiddenGems;

var reviews;
var placeReviewsEl = document.getElementById("place-reviews");
var placeDetailsEl = document.querySelector("#place-details");
var placeNameEl = document.querySelector("#place-name");
var hideWelcomeEl = document.querySelector(".welcome");

function randomizeGem(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  //Only picks 4 gems to display
  array=array.slice(5)
  return array;
}

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 32.7157, lng: -117.1611 }, // coords for San Diego
    zoom: 14,
  });

  const infowindow = new google.maps.InfoWindow();
  const service = new google.maps.places.PlacesService(map);

  for (var i = 0; i < hiddenGems.length; i++) {
    /*************** Request information for findPlaceFromQuery ******************/
    var fPFQRequest = {
      query: hiddenGems[i], // search term query
      fields: ["name", "geometry", "place_id"], // fields that we want API request to return
    };

    service.findPlaceFromQuery(fPFQRequest, function (results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log(results[0]);

        /*************** Request information for call to getDetails() ******************/
        getDetailsRequest = {
          placeId: results[0].place_id, // getDetails searches by place_id
          fields: [
            "name",
            "formatted_address",
            "place_id",
            "geometry",
            "reviews",
            "photos",
          ], // fields to return
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
              hideWelcomeEl.style.display = "none";
              const content = document.createElement("div");

              const nameElement = document.createElement("h2");
              nameElement.textContent = place.name;
              content.appendChild(nameElement);

              const placeAddressElement = document.createElement("p");
              placeAddressElement.textContent = place.formatted_address;
              content.appendChild(placeAddressElement);

              const placeImageElement = document.createElement("img");
              placeImageElement.setAttribute(
                "src",
                place.photos[0].getUrl({ maxWidth: 200, maxHeight: 200 })
              );
              content.append(placeImageElement);

              infowindow.setContent(content);
              infowindow.open(map, marker);

              cleanElement(placeReviewsEl);
              cleanElement(placeDetailsEl);
              displayDetails(place.name, place.formatted_address);
              displayReviews(place.reviews);
            });

            // reviews = place.reviews;    // store reviews outside of initMap() if needed
          } else {
            console.log("Error in getDetails:", status);
          }
        });
      }
    });
  }
}

function cleanElement(element) {
  while (element.children.length) {
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

    const authorEl = document.createElement("h5");
    authorEl.className = "authorName";
    authorEl.textContent += reviews[i].author_name;
    reviewContainer.appendChild(authorEl);

    const reviewInfoEl = document.createElement("h6");
    reviewInfoEl.className = "reviewInfo";
    // Populates amounts of stars based on rating
    let stars = "";
    for (var n = 0; n < reviews[i].rating; n++) {
      stars += "🌟";
    }
    reviewInfoEl.textContent +=
      reviews[i].relative_time_description +
      ", " +
      reviews[i].rating +
      " " +
      stars;
    reviewContainer.appendChild(reviewInfoEl);

    const reviewTextEl = document.createElement("p");
    reviewTextEl.className = "reviewText";
    reviewTextEl.textContent += reviews[i].text;
    reviewContainer.appendChild(reviewTextEl);
  }
}

hiddenGems=randomizeGem(hiddenGemsFull);
window.initMap = initMap;
