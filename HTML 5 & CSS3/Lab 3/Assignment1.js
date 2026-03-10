let username = document.getElementById("username");
let email = document.querySelector(".email");
let pass = document.querySelector(".pass");
let age = document.querySelector(".age");
let savebtn = document.querySelector(".savebtn");
let form = document.getElementById("form");
form.addEventListener("submit", function (e) {
  if (!username.checkValidity()) {
    e.preventDefault();
    username.reportValidity();
  } else if (!email.checkValidity()) {
    e.preventDefault();
    email.reportValidity();
  } else if (!pass.checkValidity()) {
    e.preventDefault();
    pass.reportValidity();
  } else if (!age.checkValidity()) {
    e.preventDefault();
    age.reportValidity();
  } else {
    e.preventDefault();
    alert("Form has beeen submitted Successfully");
  }
});

username.addEventListener("invalid", function () {
  let usr = username.validity;
  if (usr.valueMissing) {
    username.setCustomValidity("you need to fill the username");
  } else {
    username.setCustomValidity("");
  }
});

email.addEventListener("invalid", function () {
  let usremail = email.validity;
  if (usremail.valueMissing) {
    email.setCustomValidity("you need to fill the email");
  } else {
    email.setCustomValidity("");
  }
});

pass.addEventListener("invalid", function () {
  let usrpass = pass.validity;

  if (usrpass.patternMismatch) {
    pass.setCustomValidity(
      "Please Match the requested Format, must contain 6 characters, 1 capital letter and 1 number",
    );
  } else {
    pass.setCustomValidity("");
  }
});

age.addEventListener("invalid", function () {
  let usrage = age.validity;

  if (usrage.rangeOverflow) {
    age.setCustomValidity("Value must be less than or equal 60");
  } else if (usrage.rangeUnderflow) {
    age.setCustomValidity("Value must be more than  or equal 20");
  } else {
    age.setCustomValidity("");
  }
});
