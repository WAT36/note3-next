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

なお、関数の極限は常に存在するとは限らない。例えば、 $ f(x)= \frac{1}{x} $ は以下の様な図になり、極限

$$
\lim_{x \to 0} \frac{1}{x}
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
  return 1/t;
}
let graph = board.create('functiongraph', [hyperbola, -10, 10]);
</script>
