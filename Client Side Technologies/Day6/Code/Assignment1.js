var text = "Welcome to Js";
var i = 0;
if (window.location.reload || window.location.reload) {
  var obj = open("Assignment1.html", "child", "width=200px ,height=200px");

  var timerId = setInterval(function () {
    obj.document.write(text[i]);
    i++;
    if (i == text.length + 1) {
      clearInterval(timerId);
      obj.close();
    }
  }, 1000);
}
