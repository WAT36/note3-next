function save() {
  //入力データを取得
  var inputtext = document.getElementById("text").value;
  //セッションストレージに保存
  sessionStorage.setItem("text", inputtext);
}

//セッションストレージから取得
var text = sessionStorage.getItem("text");
//入力欄にデータを表示
document.getElementById("text").value = text;
