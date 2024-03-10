---
title: "微分の応用 - 関数の増減"
excerpt: "関数の増減を調べる方法とそれに関する定理"
coverImage: ""
date: "2024-02-29T14:00:12.000Z"
updatedAt: "2024-02-29T14:00:12.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

ここでは関数の増減を調べるのに有用な微分の応用について述べる。

# 最大値・最小値の定理

以下の定理を**最大値の定理**及び**最小値の定理**と呼ぶ。

> 関数 f(x)が閉区間[a,b]で連続であれば、関数 f(x)が最大値 M を取る点 x=c と最小値 m を取る点 c’が区間[a,b]内に存在する。

例として以下に関数 y=(x-2)x(x+2)を対象とした図を記載する。区間をどう指定しても、最大値 M を取る点 x=c と最小値 m を取る点 c’が存在する。

<div id="maxmin" class="jxgbox" style="width: 400px; height: 400px"></div>

[証明]

・・・は後述の章で。

# ロルの定理

以下の定理を**ロルの定理**と呼ぶ。

> 関数 f(x)が閉区間[a,b]で連続であり、開区間(a,b)で微分可能であるとする。
> さらに、f(a)=f(b)であれば、
> f’(c)=0
> となる数 c が少なくとも１つ存在する。

[証明]

関数 f(x)が閉区間[a,b]で連続であるので、最大値・最小値の定理から、

f(x)が区間[a,b]でとる最大値を M、最小値を m とすれば、

f(c)=M, f(c’)=m

となる数 c と c’が区間[a,b]内に存在する。

この時、

(i) a<c<b の場合

f(x)は開区間(a,b)で微分可能なので

$$
f'(c) = \lim_{x \rightarrow c} \frac{f(x)-f(c)}{x-c}
$$

また、f(c)=M は[a,b]における最大値なので、a≦x≦b において

$$
f(x) \leqq f(c) = M \\
\Rightarrow f(x) - f(c) \leqq 0
$$

ゆえに x>c ならば

$$
f'(c) = \lim_{x \rightarrow c+0} \frac{f(x)-f(c)}{x-c} \leqq 0
$$

同様に、x<c の時は

$$
f'(c) = \lim_{x \rightarrow c-0} \frac{f(x)-f(c)}{x-c} \geqq 0
$$

この２式により、f’(c) = 0 である。

同様にして、a<c’<b の時も証明できる。

(ii)c,c’が[a,b]の端点の場合

この場合は、仮定より f(a)=f(b)であり、また M=f(c)=f(c’)=m である。

最大値と最小値が同じなため、関数 f(x)は区間[a,b]で一定である。

ゆえに a<c<b である任意の c について、f’(c)=0 である。

# 平均値の定理

以下の定理を平均値の定理と呼ぶ。

> 関数 f(x)が閉区間[a,b]で連続であり、開区間(a,b)で微分可能であれば、
> {f(b)-f(a)}/{b-a} = f’(c), a<c<b
> となる数 c が少なくとも１つ存在する。

[証明]

後述する？

あと図も載せたいか

<script>
// JSXGraph初期設定
const boardMaxMin = JXG.JSXGraph.initBoard("maxmin", {
  axis: true, // 軸・グリッド線を表示するかの設定（デフォルトfalse）
  boundingbox: [-4, 4, 4, -4], // 領域の座標[左、上、右、下]
  keepaspectratio: true, // 表示するdivボックスの縦横比に合わせる？（デフォルトfalse)
  showNavigation: false, // ナビゲーションボタンを表示するかの設定（デフォルトfalse）
  showCopyright: false, // コピーライト文字列を表示するかの設定（デフォルトfalse）
});
// 関数 (x-2)x(x+2)
function fx(t) {
  return t ** 3 - 4 * t;
}
// 指定区間内で関数の最大値をとるxを返す
function getMaxX(start, end) {
  var maxX;
  var y = -1000000;
  for (let x = start; x <= end; x += 0.01) {
    if (y <= fx(x)) {
      y = fx(x);
      maxX = x;
    }
  }
  return maxX;
}
// 指定区間内で関数の最小値をとるxを返す
function getMinX(start, end) {
  var minX;
  var y = 1000000;
  for (let x = start; x <= end; x += 0.01) {
    if (y >= fx(x)) {
      y = fx(x);
      minX = x;
    }
  }
  return minX;
}
// 関数をプロット
let graph = boardMaxMin.create("functiongraph", [fx, -10, 10], {
  highlight: false, //ホバー時に色を変えて表示させるか
  strokeColor: "#0000ff", // 線の色
});
// スライダーをプロット
var slider1 = boardMaxMin.create("slider", [
  [-3, 3.8],
  [0, 3.8],
  [-3, 0.1, 0],
]);
var slider2 = boardMaxMin.create("slider", [
  [0, 3.8],
  [3, 3.8],
  [0, 0.1, 3],
]);
// 直線をプロット
var pa1 = boardMaxMin.create(
  "point",
  [
    function () {
      return slider1.Value();
    },
    3.2,
  ],
  {
    name: `a`, // 点の名前
    size: 0, // 点の大きさ
    face: "o", // 点の形、他にも種類あり、x+^v><'<>'など
    highlight: false, //ホバー時に色を変えて表示させるか
    trace: false, // 移動したときに跡を残すか？
    strokeColor: "#ffffff", // 色
  }
);
var pb1 = boardMaxMin.create(
  "point",
  [
    function () {
      return slider2.Value();
    },
    3.2,
  ],
  {
    name: `b`, // 点の名前
    size: 0, // 点の大きさ
    face: "o", // 点の形、他にも種類あり、x+^v><'<>'など
    highlight: false, //ホバー時に色を変えて表示させるか
    trace: false, // 移動したときに跡を残すか？
    strokeColor: "#ffffff", // 色
  }
);
var lia = boardMaxMin.create("line", [
  pa1,
  [
    function () {
      return pa1.X();
    },
    1,
  ],
]);
var lib = boardMaxMin.create("line", [
  pb1,
  [
    function () {
      return pb1.X();
    },
    1,
  ],
]);
// 指定区間内の最大値の点
var pMax1 = boardMaxMin.create(
  "point",
  [
    function () {
      return getMaxX(slider1.Value(), slider2.Value());
    },
    0,
  ],
  {
    name: `c`, // 点の名前
    size: 2, // 点の大きさ
    face: "o", // 点の形、他にも種類あり、x+^v><'<>'など
    highlight: false, //ホバー時に色を変えて表示させるか
    trace: false, // 移動したときに跡を残すか？
    strokeColor: "#ff0000", // 色
  }
);
var pMax2 = boardMaxMin.create(
  "point",
  [
    function () {
      return pMax1.X();
    },
    function () {
      return fx(pMax1.X());
    },
  ],
  {
    name: `M`, // 点の名前
    size: 2, // 点の大きさ
    face: "o", // 点の形、他にも種類あり、x+^v><'<>'など
    highlight: false, //ホバー時に色を変えて表示させるか
    trace: false, // 移動したときに跡を残すか？
    strokeColor: "#ff0000", // 色
  }
);
var pMin1 = boardMaxMin.create(
  "point",
  [
    function () {
      return getMinX(slider1.Value(), slider2.Value());
    },
    0,
  ],
  {
    name: `c'`, // 点の名前
    size: 2, // 点の大きさ
    face: "o", // 点の形、他にも種類あり、x+^v><'<>'など
    highlight: false, //ホバー時に色を変えて表示させるか
    trace: false, // 移動したときに跡を残すか？
    strokeColor: "#ff0000", // 色
  }
);
var pMin2 = boardMaxMin.create(
  "point",
  [
    function () {
      return pMin1.X();
    },
    function () {
      return fx(pMin1.X());
    },
  ],
  {
    name: `m`, // 点の名前
    size: 2, // 点の大きさ
    face: "o", // 点の形、他にも種類あり、x+^v><'<>'など
    highlight: false, //ホバー時に色を変えて表示させるか
    trace: false, // 移動したときに跡を残すか？
    strokeColor: "#ff0000", // 色
  }
);
var liMax = boardMaxMin.create("line", [pMax1, pMax2], {
  strokeColor: "#ff0000", // 線の色
  strokeWidth: 4, // 線の太さ
  straightFirst: false, // 始点を突き抜けて直線にするか
  straightLast: false, // 終点を突き抜けて直線にするか
  dash: 2, // 点線？0:単線,1:点線,2:小さい点線,3:普通の点線?,4:長い点線
  highlight: false, //ホバー時に色を変えて表示させるか
});
var liMin = boardMaxMin.create("line", [pMin1, pMin2], {
  strokeColor: "#ff0000", // 線の色
  strokeWidth: 4, // 線の太さ
  straightFirst: false, // 始点を突き抜けて直線にするか
  straightLast: false, // 終点を突き抜けて直線にするか
  dash: 2, // 点線？0:単線,1:点線,2:小さい点線,3:普通の点線?,4:長い点線
  highlight: false, //ホバー時に色を変えて表示させるか
});
var poly = boardMaxMin.create(
  "polygon",
  [
    [
      function () {
        return slider1.Value();
      },
      10,
    ],
    [
      function () {
        return slider1.Value();
      },
      -10,
    ],
    [
      function () {
        return slider2.Value();
      },
      -10,
    ],
    [
      function () {
        return slider2.Value();
      },
      10,
    ],
  ],
  { fillOpacity: 0.05 }
);
</script>
