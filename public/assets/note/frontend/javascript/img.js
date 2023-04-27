var v = document.getElementById("video");
var s = document.getElementById("state");

v.onplay = function () {
  s.innerText = "再生中";
};

v.onplaying = function () {
  s.innerText = "再生中";
};

v.ontimeupdate = function () {
  s.innerText = "再生中";
};

v.onpause = function () {
  s.innerText = "中断";
};

v.onwaiting = function () {
  s.innerHTML = "ロード中";
};

v.onended = function () {
  s.innerHTML = "再生終了";
};

v.onerror = function () {
  s.innerHTML = "エラー発生";
};

v.onabort = function () {
  s.innerHTML = "停止";
};
