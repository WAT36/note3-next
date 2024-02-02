---
title: "微分の諸公式(2) - 三角関数"
excerpt: "三角関数に関する微分の公式"
coverImage: ""
date: "2024-01-26T00:14:59.000Z"
updatedAt: "2024-01-26T00:14:59.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

ここでは、三角関数の微分と、それに利用するほか公式・定理についてを述べる。

# 1. 追い出しの原理

一般に、以下の定理が成り立ち、「追い出しの原理」と呼ばれる。

関数 f(x),g(x)が-∞≤a≤∞ で成り立つ関数とし、さらに

$$
f(x) \le g(x), \lim_{x \to a} f(x) = \infty
$$

が成り立つとする。この時、

$$
\lim_{x \to a} g(x) = \infty
$$

である。

[証明]

後述の章で記載予定・・

# 2.はさみうちの原理

また一般に、以下の定理が成り立ち、「はさみうちの原理」と呼ばれる。

関数 f(x),g(x),h(x)が-∞≤a≤∞ で成り立つ関数とし、さらに

$$
f(x) \le g(x) \le h(x), \lim_{x \to a} f(x) = b, \lim_{x \to a} h(x) = b (bは実数)
$$

が成り立つとする。この時、

$$
\lim_{x \to a} g(x) = b
$$

である。

[証明]

後述の章で記載予定・・

# 3. sinc 関数（sinx / x）の極限

正弦関数をその変数で割った関数($\frac{\sin x}{x}$)を、**sinc 関数**という。

この関数について、以下の式が成り立つ。

$$
\lim_{x \to 0} \frac{\sin x}{x} = 1
$$

[証明]

<div id="sinc" class="jxgbox" style="width:480px; height:480px; margin: 0px auto;"></div>

は描こう

図が必要なので

JSXGraph でゴリゴリ書くしかないか・・？

<script>
        const RADIUS = 1;
      const ANGLE = Math.PI / 3;
      // JSXGraph初期設定
      const board = JXG.JSXGraph.initBoard("sinc", {
        axis: false, // 軸・グリッド線を表示するかの設定（デフォルトfalse）
        boundingbox: [-0.6, 2, 1.6, -0.2], // 領域の座標[左、上、右、下]
        showNavigation: false, // ナビゲーションボタンを表示するかの設定（デフォルトfalse）
        showCopyright: false, // コピーライト文字列を表示するかの設定（デフォルトfalse）
      });
      // 点をプロット
      // https://jsxgraph.uni-bayreuth.de/wiki/index.php?title=Point
      var o = board.create("point", [0, 0], {
        name: "O", // 点の名前
        size: 1, // 点の大きさ
        fixed: true,
        highlight: false,
      });
      var a = board.create("point", [RADIUS, 0], {
        name: `A(1,0)`, // 点の名前
        size: 1, // 点の大きさ
        fixed: true,
        highlight: false,
      });
      var b = board.create(
        "point",
        [RADIUS * Math.cos(ANGLE), RADIUS * Math.sin(ANGLE)],
        {
          name: "B(cosx,sinx)", // 点の名前
          size: 1, // 点の大きさ
          fixed: true,
          highlight: false,
        }
      );
      var t = board.create("point", [RADIUS, RADIUS * Math.tan(ANGLE)], {
        name: "T(1,tanx)", // 点の名前
        size: 1, // 点の大きさ
        fixed: true,
        highlight: false,
      });
      var under_b = board.create("point", [b.X(), o.Y()], {
        name: " ", // 点の名前
        size: 0, // 点の大きさ
        fixed: true,
      });
      // 直線をプロット。説明以下参照
      // https://jsxgraph.uni-bayreuth.de/wiki/index.php?title=Line
      var lioa = board.create("line", [o, a], {
        strokeColor: "#000000", // 線の色
        strokeWidth: 1, // 線の太さ
        straightFirst: false, // 始点を突き抜けて直線にするか
        straightLast: false, // 終点を突き抜けて直線にするか
        highlight: false,
      });
      var liot = board.create("line", [o, t], {
        strokeColor: "#000000", // 線の色
        strokeWidth: 1, // 線の太さ
        straightFirst: false, // 始点を突き抜けて直線にするか
        straightLast: false, // 終点を突き抜けて直線にするか
        highlight: false,
      });
      var liab = board.create("line", [a, b], {
        strokeColor: "#000000", // 線の色
        strokeWidth: 1, // 線の太さ
        straightFirst: false, // 始点を突き抜けて直線にするか
        straightLast: false, // 終点を突き抜けて直線にするか
        highlight: false,
      });
      var liat = board.create("line", [a, t], {
        strokeColor: "#000000", // 線の色
        strokeWidth: 1, // 線の太さ
        straightFirst: false, // 始点を突き抜けて直線にするか
        straightLast: false, // 終点を突き抜けて直線にするか
        highlight: false,
      });
      var lib = board.create("line", [b, under_b], {
        strokeColor: "#000000", // 線の色
        strokeWidth: 1, // 線の太さ
        straightFirst: false, // 始点を突き抜けて直線にするか
        straightLast: false, // 終点を突き抜けて直線にするか
        highlight: false,
        dash: 2,
      });
      // 角度をプロット
      var an = board.create("angle", [a, o, b], {
        radius: 1 / 6,
        name: "x",
      });
      var anab = board.create("angle", [a, under_b, b], {
        radius: 1 / 12,
        name: " ",
      });
      var ana = board.create("angle", [t, a, under_b], {
        radius: 1 / 12,
        name: " ",
      });
      // 弧をプロット
      var curve = board.create(
        "curve",
        [
          function (t) {
            return RADIUS * Math.cos(t);
          },
          function (t) {
            return RADIUS * Math.sin(t);
          },
          0,
          ANGLE,
        ],
        {
          strokeColor: "#000000", // 線の色
          highlight: false,
        }
      );
</script>
