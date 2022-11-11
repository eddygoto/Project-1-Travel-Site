var firstNameInput = document.getElementById("myFName");
var lastNameInput = document.getElementById("myLName");
var emailInput = document.getElementById("myEmail");
var phoneInput = document.getElementById("myPhone");
var commentInput = document.getElementById("myComments");
var submitBtnInput = document.getElementsByClassName("submitBtn");

submitBtnInput.onclick = function (event) {
  event.preventDefault();

  localStorage.setItem("first-name", firstNameInput.value);
  localStorage.setItem("last-name", lastNameInput.value);
  localStorage.setItem("email", emailInput.value);
  localStorage.setItem("phone", phoneInput.value);
  localStorage.setItem("comments", commentInput.value);
};
