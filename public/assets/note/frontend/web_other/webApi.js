window.onload = function () {
  var canvas = document.getElementById("sample");
  var ctx = canvas.getContext("2d");

  ctx.beginPath();
  ctx.rect(0, 0, 100, 100);
  ctx.strokeStyle = "#F00";
  ctx.fillStyle = "#FF0";
  ctx.stroke();
  ctx.fill();

  var title = document.getElementById("title");
  var title_nonstorage = document.getElementById("title_nonstorage");
  var boxes = document.getElementsByClassName("box");

  // localStorageを変数に格納
  var storage = localStorage;
  // localStorageから'textcolor'の値を取得
  var tc = storage.getItem("textcolor");
  // localStorageに'textcolor'の値があれば、文字色を書き換え
  if (tc) {
    title.style.color = tc;
  }

  for (var i = 0, l = boxes.length; i < l; i++) {
    boxes[i].addEventListener("click", function () {
      title.style.color = this.id;
      storage.setItem("textcolor", this.id);
      title_nonstorage.style.color = this.id;
    });
  }
};
