---
title: "微分の応用"
excerpt: "接線、法線、媒介変数表示、陰関数"
coverImage: ""
date: "2024-02-22T20:34:23.000Z"
updatedAt: "2024-02-22T20:34:23.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

ここでは、微分の応用例について述べる。

# 接線の方程式

最初の微分の定義でも述べたとおり、関数 y=f(x)において x=a における接線の傾きは f’(a)である。

これより、直線の方程式の公式から、関数 y=f(x)の x=a における接線の方程式は

$$
y - f(a) = f'(a)(x-a)
$$

である。例を以下に示す。

<div id="sessen" class="jxgbox" style="width: 400px; height: 400px"></div>

# 法線の方程式

関数 y=f(x)の x=a における**法線**とは、x=a における接線に垂直に交わる直線のことを言う。

この法線の傾きを m とすると、

$$
mf'(a) = -1 \\
\Leftrightarrow m = - \frac{1}{f'(a)}
$$

となる。

よって、関数 y=f(x)の x=a における法線の方程式は以下のとおりである。

$$
y-f(a) = - \frac{1}{f'(a)}(x-a)
$$

（これも接線と同じように何か図を載せたい）

<script>
  // JSXGraph初期設定
  const board = JXG.JSXGraph.initBoard("sessen", {
    axis: true, // 軸・グリッド線を表示するかの設定（デフォルトfalse）
    boundingbox: [-5, 5, 5, -5], // 領域の座標[左、上、右、下]
    keepaspectratio: true, // 表示するdivボックスの縦横比に合わせる？（デフォルトfalse)
    showNavigation: false,
    showCopyright: false,
  });
  // 関数 (x-2)x(x+2)
  function fx(t) {
    return t ** 3 - 4 * t;
  }
  // 導関数
  function dfx(t) {
    return 3 * t ** 2 - 4;
  }
  // 接線
  function sessenCalc(a, x) {
    return dfx(a) * (x - a) + fx(a);
  }
  // 関数をプロット
  let graph = board.create("functiongraph", [fx, -10, 10], {
    highlight: false, //ホバー時に色を変えて表示させるか
    strokeColor: "#0000ff", // 線の色
  });
  // スライダーをプロット
  var slider1 = board.create("slider", [
    [-3, 4.8],
    [3, 4.8],
    [-3, 0.1, 3],
  ]);
  // 点をプロット
  // スライダーの値に応じて変化
  var p = board.create(
    "point",
    [
      function () {
        return slider1.Value();
      },

      function () {
        return fx(slider1.Value());
      },
    ],
    {
      name: `a`, // 点の名前
      size: 5, // 点の大きさ
      face: "o", // 点の形、他にも種類あり、x+^v><'<>'など
      highlight: false, //ホバー時に色を変えて表示させるか
      trace: false, // 移動したときに跡を残すか？
      strokeColor: "#ff0000", // 線の色
    }
  );
  var p2 = board.create(
    "point",
    [
      function () {
        return slider1.Value() + 1;
      },

      function () {
        return sessenCalc(slider1.Value(), slider1.Value() + 1);
      },
    ],
    {
      name: ``, // 点の名前
      size: 0, // 点の大きさ
      face: "o", // 点の形、他にも種類あり、x+^v><'<>'など
      highlight: false, //ホバー時に色を変えて表示させるか
      trace: false, // 移動したときに跡を残すか？
      strokeColor: "#ffffff", // 色
    }
  );
  var sessen = board.create("line", [p, p2], {
    strokeColor: "#ff0000", // 線の色
    strokeWidth: 3, // 線の太さ
    straightFirst: true, // 始点を突き抜けて直線にするか
    straightLast: true, // 終点を突き抜けて直線にするか
    dash: 0, // 点線？0:単線,1:点線,2:小さい点線,3:普通の点線?,4:長い点線
    highlight: false, //ホバー時に色を変えて表示させるか
  });
  //凡例
  var legend = board.create("legend", [-5, 4.5], {
    labels: ["曲線 y=(x-2)x(x+2)", "接線 y-f(a) = f'(a)(x-a)"],
    colors: ["#0000ff", "#ff0000"],
    strokeWidth: 5,
  });
</script>
