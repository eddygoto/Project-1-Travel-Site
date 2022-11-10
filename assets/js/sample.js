// // Initialize and add the map
// function initMap() {
//     // The location of Uluru
//     // 32.62947,  -117.08890
//     const phils = { lat: 32.62947, lng: -117.08890 };
//     // The map, centered at Uluru
//     const map = new google.maps.Map(document.getElementById("map"), {
//       zoom: 15,
//       center: phils,
//     });
//     // The marker, positioned at Uluru
//     const marker = new google.maps.Marker({
//       position: phils,
//       map: map,
//     });
//   }
  
// window.initMap = initMap;
var request;
function initMap() {
  const map = new google.maps.Map(
    document.getElementById("map"),
    {
      center: { lat: 32.7157, lng: -117.1611 }, // coordinates for san diego
      zoom: 11,
    }
  );

  request = {
    placeId: "ChIJN1t_tDeuEmsRUsoyG83frY4",
    fields: ["name", "formatted_address", "place_id", "geometry", "reviews"],
  };

  console.log(request);


  const infowindow = new google.maps.InfoWindow();
  const service = new google.maps.places.PlacesService(map);


  var details = service.getDetails(request, (place, status) => {
    if (
      status === google.maps.places.PlacesServiceStatus.OK &&
      place &&
      place.geometry &&
      place.geometry.location
    ) {
      const marker = new google.maps.Marker({
        map,
        position: place.geometry.location,
      });

      google.maps.event.addListener(marker, "click", () => {
        // document.location.replace('./page2.html');
        const content = document.createElement("div");

        const nameElement = document.createElement("h2");

        // const button = document.createElement("btn");
        // button.setAttribute("id", "my-button");
        // button.textContent = "click this";

        nameElement.textContent = place.name;
        content.appendChild(nameElement);

        const placeIdElement = document.createElement("p");

        placeIdElement.textContent = place.place_id;
        content.appendChild(placeIdElement);

        const placeAddressElement = document.createElement("p");

        placeAddressElement.textContent = place.formatted_address;
        content.appendChild(placeAddressElement);

        const placeReviewsEl = document.createElement("p");
        placeReviewsEl.textContent = place.reviews[0].text;
        placeReviewsEl.setAttribute("class", "review-p");
        content.appendChild(placeReviewsEl);
        console.log(place.reviews[0]);

        const authorEl = document.createElement("p");
        authorEl.textContent = "-- " + place.reviews[0].author_name;
        authorEl.setAttribute("class", "review-p");
        content.appendChild(authorEl);

        infowindow.setContent(content);
        infowindow.open(map, marker);
      });

      // const buttonEl = document.querySelector('#my-button');
      // google.maps.event.addListener(buttonEl,"click", () => {
      //   document.location.replace('page2.html');
      // });
    }
  });

  // console.log(JSON.parse(details));
}

// declare global {
//   interface Window {
//     initMap: () => void;
//   }
// }
window.initMap = initMap;
// export {};

// var myButtonEl = document.querySelector('#my-button');

// var buttonClickHandler = function(event) {
//   document.location.replace(`page2.html`);
// }

// myButtonEl.addEventListener('click', buttonClickHandler);


var getDetailsRequest = {
  placeId: "ChIJw_9yT25T2YARL25MQwI5JhE",
  fields: ["name", "formatted_address", "place_id", "geometry", "reviews"],
}

service.getDetails(getDetailsRequest, (place, status) => {
  console.log("get details ", i);
})


// for (var i = 0; i < hiddenGems.length; i++) {
    //     console.log("loop 1", i);
    //     var fPFQRequest = {
    //         query: hiddenGems[i], // search term query
    //         fields: ['name', 'geometry', 'place_id'],   // fields that we want API request to return
    //     }
    
    //     const service = new google.maps.places.PlacesService(map);
    //     // var coordStr;   // stores the coordinate information for the request
    //     // var latResult, lngResult;

    //     service.findPlaceFromQuery(fPFQRequest, function(results, status) {
    //         if (status === google.maps.places.PlacesServiceStatus.OK) {
    //             grandOle = results[0];  // Places API sends response in results array
    //             placeIds.push(results[0].place_id); // place_id gets the business id used for getDetails()
    
    //             coordStr = results[0].geometry.location.toString(); // stores the coordinates for the result as a string: '(lat, lng)'
    //             coordStr = coordStr.slice(1, coordStr.length-1);
    //             [latResult, lngResult] = coordStr.split(',');
    //             lngResult = lngResult.trimStart();
    
    //             latResult = parseFloat(latResult);
    //             lngResult = parseFloat(lngResult);

    //             // const grandOleMarker = { lat: latResult, lng: lngResult };
    //             // const marker = new google.maps.Marker({
    //             //     position: grandOleMarker,
    //             //     map: map,
    //             // })
    //         }
    //     });
    // }

    // for (var j = 0; j < hiddenGems.length; j++) {
    //     console.log(placeIds[j]);
    // }