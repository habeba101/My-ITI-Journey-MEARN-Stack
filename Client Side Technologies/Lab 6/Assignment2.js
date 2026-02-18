var counter = 0;
setInterval(function () {
  document.title = counter;
  var tag = document.createElement("table");
  tag.style.border = "2px solid red";
  var countertext = document.createTextNode(counter);
  tag.appendChild(countertext);
  document.body.appendChild(tag);
  counter++;
}, 1000);
