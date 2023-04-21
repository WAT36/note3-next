window.onload = function () {
  var h = document.getElementById("height");
  h.innerText = window.innerHeight + "px";

  var l = document.getElementById("length");
  l.innerText = window.innerWidth + "px";

  var t = document.getElementById("time");
  var interval = window.setInterval(function () {
    var nowDate = new Date();
    t.innerHTML = nowDate.toLocaleTimeString();
  }, 1000);
};

window.onresize = function () {
  var h = document.getElementById("height");
  h.innerText = window.innerHeight + "px";

  var l = document.getElementById("length");
  l.innerText = window.innerWidth + "px";
};
