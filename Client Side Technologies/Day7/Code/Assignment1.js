var clipButton = document.getElementsByClassName("copy");
var content = document.getElementsByTagName("pre");
var textareaText = document.getElementsByName("css-code")[0];
var styleValue = document.createElement("style");
document.head.appendChild(styleValue);
for (let i = 0; i < clipButton.length; i++) {
  clipButton[i].addEventListener("click", function () {
    navigator.clipboard.writeText(content[i].innerText.trim());
    clipButton[i].value = "copied";
    clipButton[i].setAttribute("style", "background-color:grey;");
    setTimeout(function () {
      clipButton[i].setAttribute("style", "background-color:blue;");
      clipButton[i].value = "copy";
    }, 500);
  });
}
textareaText.addEventListener("input", function () {
  styleValue.innerHTML = textareaText.value;
});
