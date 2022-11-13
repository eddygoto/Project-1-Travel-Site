var nameInput = document.getElementById("myName");
var gemInput = document.getElementById("myGemName");
var addressInput = document.getElementById("myAddress");
var urlInput = document.getElementById("myURL");
// var commentInput = document.getElementById("myComments");
var submitBtnInput = document.getElementsByClassName("submitBtn")[0];

submitBtnInput.onclick = function (event) {

  event.preventDefault();

  localStorage.setItem("name", nameInput.value);
  localStorage.setItem("gem", gemInput.value);
  localStorage.setItem("address", addressInput.value);
  localStorage.setItem("url", urlInput.value);
  // localStorage.setItem("comments", commentInput.value);

  nameInput.value = '';
  gemInput.value = '';
  addressInput.value = '';
  urlInput.value = ''

  loadLastSubmitted();
};

const gemEl = document.getElementById("saved-gem-name");
const addressEl = document.getElementById("saved-address");
const urlEl = document.getElementById("saved-url");
// const commentEl = document.getElementById("saved-comment");
const authorEl = document.getElementById("saved-author");


function loadLastSubmitted() {
  gemEl.textContent = localStorage.getItem("gem");
  addressEl.textContent = localStorage.getItem("address");
  urlEl.textContent = localStorage.getItem("url");
  // commentEl.textContent = localStorage.getItem("comments")
  authorEl.textContent = localStorage.getItem("name");
}

function eraseData() {
  localStorage.clear();
  gemEl.textContent = '';
  addressEl.textContent = '';
  urlEl.textContent = '';
  authorEl.textContent = '';
}

loadLastSubmitted();