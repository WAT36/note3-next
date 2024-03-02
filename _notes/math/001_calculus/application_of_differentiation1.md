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

例を以下に示す。

<div id="hosen" class="jxgbox" style="width: 400px; height: 400px"></div>

# 媒介変数表示

関数 y=f(x)において、変数 x,y が同一の変数 t の関数で表されているとする。

たとえば、

$$
x = t + 2 \\
y = t^2 + 1
$$

であるとする。

このとき、第 1 式より t=x-2 なので、これを第２式に代入すると

$$
y=(x-2)^2+1
$$

となり、y は x の関数となる。

一般に、x=f(t)、y=g(t)であるとき、このような y=F(x)で表せることが多い。

このとき、x=f(t)、y=g(t)を関数 y=F(x)の**媒介変数表示**といい、変数 t を媒介変数またはパラメーターという。

## 媒介変数表示の微分

媒介変数表示での微分 y’を求めよう。x=f(t)、y=g(t)とし、x=f(t)の逆関数を t=h(x)とすると、先程の求め方より

$$
y = g(h(x))
$$

となる。ここで、合成関数の微分を利用して、

$$
\frac{dy}{dx} = \frac{dy}{dt} \frac{dt}{dx} \\
= \frac{\frac{dy}{dt}}{\frac{dx}{dt}}
$$

となる。

媒介変数表示の例として、以下のような式を考える。

$$
x=t- \sin t, y=1- \cos t
$$

この式で表される曲線をサイクロイドという。

サイクロイドとは、一直線上を一つの円がすべることなくころがるとき、この円の周上に固定された一点が描く曲線のことであり、以下の図のような曲線である。

<div id="cycloid" class="jxgbox" style="width: 400px; height: 400px"></div>

この式の $\frac{dy}{dx}$ は

$$
\frac{dx}{dt} = 1- \cos t, \frac{dy}{dt} = \sin t
$$

より

$$
\frac{dy}{dx} = \frac{\sin t}{1- \cos t}
$$

となる。

# 陰関数の微分

今までは y=f(x)のような 1 変数で表す関数を利用していたが、これを２変数で表した

$$
F(x,y)=0
$$

この形式を関数の**陰関数表示**といい、この形で表された関数を**陰関数**という。

(何か例を載せる？)

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

  /*以下は法線*/
  const board2 = JXG.JSXGraph.initBoard("hosen", {
    axis: true, // 軸・グリッド線を表示するかの設定（デフォルトfalse）
    boundingbox: [-5, 5, 5, -5], // 領域の座標[左、上、右、下]
    keepaspectratio: true, // 表示するdivボックスの縦横比に合わせる？（デフォルトfalse)
    showNavigation: false,
    showCopyright: false,
  });
  // 法線
  function hosenCalc(a, x) {
    return (-1 / dfx(a)) * (x - a) + fx(a);
  }
  // 関数をプロット
  let graph2 = board2.create("functiongraph", [fx, -10, 10], {
    highlight: false, //ホバー時に色を変えて表示させるか
    strokeColor: "#0000ff", // 線の色
  });
  // スライダーをプロット
  var slider2 = board2.create("slider", [
    [-3, 4.8],
    [3, 4.8],
    [-3, 0.1, 3],
  ]);
  // 点をプロット
  // スライダーの値に応じて変化
  var ph1 = board2.create(
    "point",
    [
      function () {
        return slider2.Value();
      },

      function () {
        return fx(slider2.Value());
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
  //(接線用の)延長線上の点
  var ph2 = board2.create(
    "point",
    [
      function () {
        return slider2.Value() + 1;
      },

      function () {
        return sessenCalc(slider2.Value(), slider2.Value() + 1);
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
  //(法線用の)延長線上の点
  var ph3 = board2.create(
    "point",
    [
      function () {
        return slider2.Value() + 1;
      },

      function () {
        return hosenCalc(slider2.Value(), slider2.Value() + 1);
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
  // 接線をプロット
  var sessen2 = board2.create("line", [ph1, ph2], {
    strokeColor: "#808080", // 線の色
    strokeWidth: 1, // 線の太さ
    straightFirst: true, // 始点を突き抜けて直線にするか
    straightLast: true, // 終点を突き抜けて直線にするか
    dash: 0, // 点線？0:単線,1:点線,2:小さい点線,3:普通の点線?,4:長い点線
    highlight: false, //ホバー時に色を変えて表示させるか
  });
  // 法線をプロット
  var hosen = board2.create("line", [ph1, ph3], {
    strokeColor: "#ff0000", // 線の色
    strokeWidth: 3, // 線の太さ
    straightFirst: true, // 始点を突き抜けて直線にするか
    straightLast: true, // 終点を突き抜けて直線にするか
    dash: 0, // 点線？0:単線,1:点線,2:小さい点線,3:普通の点線?,4:長い点線
    highlight: false, //ホバー時に色を変えて表示させるか
  });
  //凡例
  var legend = board2.create("legend", [-5, 4.5], {
    labels: [
      "曲線 y=(x-2)x(x+2)",
      "接線 y-f(a) = f'(a)(x-a)",
      "法線 y-f(a) = {-1/f'(a)}(x-a)",
    ],
    colors: ["#0000ff", "#808080", "#ff0000"],
    strokeWidth: 5,
  });

  // JSXGraph初期設定
  const boardC = JXG.JSXGraph.initBoard("cycloid", {
    axis: true, // 軸・グリッド線を表示するかの設定（デフォルトfalse）
    boundingbox: [-1, 5, 8, -1], // 領域の座標[左、上、右、下]
    keepaspectratio: true, // 表示するdivボックスの縦横比に合わせる？（デフォルトfalse)
    showNavigation: false,
    showCopyright: false,
  });
  // サイクロイドのx座標
  function cycloidX(t) {
    return t - Math.sin(t);
  }
  // サイクロイドのy座標
  function cycloidY(t) {
    return 1 - Math.cos(t);
  }
  // スライダーをプロット
  var sliderT = boardC.create(
    "slider",
    [
      [4, 4.8],
      [7, 4.8],
      [-3, 0.1, 10],
    ],
    { name: "t", snapWidth: 0.1 }
  );
  // 点をプロット
  // スライダーの値に応じて変化
  var pC = boardC.create(
    "point",
    [
      function () {
        return cycloidX(sliderT.Value());
      },

      function () {
        return cycloidY(sliderT.Value());
      },
    ],
    {
      name: `a`, // 点の名前
      size: 5, // 点の大きさ
      face: "o", // 点の形、他にも種類あり、x+^v><'<>'など
      highlight: false, //ホバー時に色を変えて表示させるか
      trace: true, // 移動したときに跡を残すか？
      strokeColor: "#ff0000", // 線の色
    }
  );
  //曲線をプロット
  // the cycloid curve.
  var curve = boardC.create(
    "curve",
    [
      function (t) {
        return t - Math.sin(t);
      },
      function (t) {
        return 1 - Math.cos(t);
      },
      -1 * Math.PI,
      4 * Math.PI,
    ],
    {
      strokeColor: "#808080", // 線の色
      strokeWidth: 1, // 線の太さ
    }
  );
  // 円をプロット
  var ci1 = boardC.create(
    "circle",
    [
      function () {
        return [sliderT.Value(), 1];
      },
      1,
    ],
    {
      strokeColor: "#808080", // 線の色
      strokeWidth: 1, // 線の太さ
      dash: 1,
    }
  );
</script>
