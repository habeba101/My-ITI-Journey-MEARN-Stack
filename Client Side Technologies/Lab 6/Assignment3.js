var username = location.search.split("?")[1].split("&")[0].split("=")[1];
var password = location.search.split("?")[1].split("&")[1].split("=")[1];
var obj;
if (username == "Habeba" && password == "123") {
  obj = open("Assignment3newpage.html", "child", "width=300px ,height=200px");
  obj.document.write('<h1 align="center" style="color: red;">HI Habeba</h1>');
} else {
  obj = open("Assignment3newpage.html", "child", "width=300px ,height=200px");
  obj.document.write('<h1 align="center">404 ERROR</h1>');
}
