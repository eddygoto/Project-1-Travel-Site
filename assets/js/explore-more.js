var titleHiddenGemEl = document.querySelector('#hidden-gem-title');
var imgHiddenGemEl = document.querySelector('#hidden-gem-img');
var descHiddenGemEl = document.querySelector('#hidden-gem-desc');

var titleTTDNEl = document.querySelector('#ttdn-title');
var imgTTDNEl = document.querySelector('#ttdn-img');
var yelpTTDNEl = document.querySelector('#ttdn-yelp');

var titlePTSEl = document.querySelector('#pts-title');
var imgPTSEL = document.querySelector('#pts-img');
var yelpPTSEl = document.querySelector('#pts-yelp');

/* Yelp API Info
    docs: https://www.yelp.com/developers/v3/manage_app
    search for businesses: GET https://api.yelp.com/v3/businesses/search
    search review for specific business: GET https://api.yelp.com/v3/businesses/{id}/reviews

    1. Use location from previous page to search area around hidden gem
    2. Parse results to make sure the pulled location fits
    3. Pull photo, name, description
    4. Use review api to pull reviews
*/

var renderHiddenGem = function() {
    titleHiddenGemEl.textContent = "THE HIDDEN GEM";
    imgHiddenGemEl.setAttribute('src', './assets/images/explore/placeholder-400.png');
    descHiddenGemEl.textContent = 
        "Lorem ipsum dolor sit amet, qui no equidem periculis, " +
        "cibo pertinax in duo, facilisi philosophia his in. An " +
        "nec iusto euripidis, ne usu essent oblique albucius.";

    titleTTDNEl.textContent = "THE OTHER THING TO DO";
    imgTTDNEl.setAttribute('src', './assets/images/explore/placeholder-200.png');
    yelpTTDNEl.textContent = "THIS IS A YELP REVIEW";

    titlePTSEl.textContent = "THE PLACE TO STAY";
    imgPTSEL.setAttribute('src', './assets/images/explore/placeholder-200.png');
    yelpPTSEl.textContent = "THIS IS A YELP REVIEW";
}

renderHiddenGem();