var titleHiddenGemEl = document.querySelector('#hidden-gem-title');
var imgHiddenGemEl = document.querySelector('#hidden-gem-img');
var descHiddenGemEl = document.querySelector('#hidden-gem-desc');

var titleTTDNEl = document.querySelector('#ttdn-title');
var imgTTDNEl = document.querySelector('#ttdn-img');
var yelpTTDNEl = document.querySelector('#ttdn-yelp');

var titlePTSEl = document.querySelector('#pts-title');
var imgPTSEL = document.querySelector('#pts-img');
var yelpPTSEl = document.querySelector('#pts-yelp');


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