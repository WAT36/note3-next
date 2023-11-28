---
title: "極限とは"
excerpt: "関数の極限について"
coverImage: ""
date: "2023-11-21T23:08:09.000Z"
updatedAt: "2023-11-21T23:08:09.000Z"
tag: [""]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

微分の前に、関数の極限について書き記しておく。

関数の極限とは、関数 f(x)において変数 x が特定の値に限りなく近づくとき、f(x)がどの値に近づいていくか、を示した数学的な概念である。

具体的には、例えば関数 f(x)において x を定数 a に限りなく近づけた時に f(x)が定数 b に限りなく近づくとき、以下の式で表現される。

$$
\lim_{x \to a} f(x) = b
$$

なお、関数の極限は常に存在するとは限らない。例えば、 $ f(x)= \frac{1}{x^2} $ は以下の様な図になり、極限

$$
\lim_{x \to 0} \frac{1}{x^2}
$$

は存在しない。

<!-- Graph -->
<div id="jxgbox" class="jxgbox" style="width:480px; height:480px; margin: 0px auto;"></div>
<script>
let board = JXG.JSXGraph.initBoard('jxgbox', {
  boundingbox: [ -10, 10, 10, -10],  
  axis: true, 
  showNavigation: false,  
  showCopyright: false    
});
function hyperbola(t) {
  return 1/(t**2);
}
let graph = board.create('functiongraph', [hyperbola, -10, 10]);
</script>

このような、x→a のときに関数 f(x)が正で限りなく大きくなる場合、f(x)は**正の無限大に発散する**といい、

$$
\lim_{x \to a} f(x) = \infin
$$

で表される。

逆に、x→a のときに関数 f(x)が負で限りなく大きくなる場合、f(x)は**負の無限大に発散する**といい、

$$
\lim_{x \to a} f(x) = - \infin
$$

で表される。

(例： $\lim_{x \to 0} \frac{1}{x^2}=\infin$、$\lim_{x \to 0} -\frac{1}{x^2}=-\infin$)

またこの例 $ f(x)= \frac{1}{x^2} $ では、x→∞（x→-∞ においても同様）としたとき f(x)→0 となる。

このような、

x→∞ のとき f(x)→b ならば、関数 f(x)は b に収束する

といい、

$$
\lim_{x \to \infin} f(x) = b
$$

で表す。

また、x→-∞ の時も同様である。

(例： $\lim_{x \to \infin} \frac{1}{x^2}=0$、$\lim_{x \to -\infin} \frac{1}{x^2}=0$)
