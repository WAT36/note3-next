//canvas要素取得
var canvas = document.getElementById("sample");
//2d用　コンテキストオブジェクト取得
var context = canvas.getContext("2d");

//円を描画
context.beginPath();
context.fillStyle = "red";
context.arc(30, 30, 20, 0, Math.PI * 2, false);
context.stroke();

//////////////////

//canvas要素取得
var canvas2 = document.getElementById("sample2");
//2d用　コンテキストオブジェクト取得
var context2 = canvas2.getContext("2d");

//円を描画
context2.beginPath();
context2.strokeStyle = "red";
context2.fillStyle = "yellow";
context2.arc(30, 30, 20, 0, Math.PI * 2, false);
context2.stroke();
context2.fill();

//四角形を描画
context2.beginPath();
context2.strokeStyle = "blue";
context2.fillStyle = "green";
context2.rect(10, 120, 40, 40);
context2.stroke();

//線
context2.beginPath();
context2.lineWidth = 1;
context2.moveTo(200, 120);
context2.lineTo(250, 120);
context2.stroke();
context2.beginPath();
context2.lineWidth = 5;
context2.moveTo(200, 140);
context2.lineTo(250, 140);
context2.stroke();
context2.lineWidth = 10;
context2.moveTo(200, 160);
context2.lineTo(250, 160);
context2.stroke();

//円弧
context2.beginPath();
context2.lineWidth = 1;
context2.arc(200, 20, 30, Math.PI / 4, (Math.PI * 3) / 4, false);
context2.stroke();

//テキスト
context2.beginPath();
context2.strokeStyle = "black";
context2.fillStyle = "black";
context2.strokeText("Text", 300, 40);
context2.fillText("Text", 300, 60);

//テキスト(フォント、文字サイズ)
context2.beginPath();
context2.font = "bold 20px sans-serif";
context2.fillText("Text", 300, 100);
context2.font = "italic 20px sans-serif";
context2.fillText("Text", 300, 120);

//テキスト(シャドー)
context2.beginPath();
context2.font = "bold 20px sans-serif";
context2.shadowColor = "red";
context2.shadowBlur = 3;
context2.shadowOffsetX = 3;
context2.shadowOffsetY = 3;
context2.fillText("Text", 300, 140);
