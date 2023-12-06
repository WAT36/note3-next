---
title: "微分とは"
excerpt: "関数の微分について"
coverImage: ""
date: "2023-12-05T21:49:36.000Z"
updatedAt: "2023-12-05T21:49:36.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

微分とは何か？

という事についてまず書いていきたい。

結論から言うと、微分とは、関数において、ある値（瞬間）における変化の割合（＝接線の傾き）を求めることである。

どの様にして求めるのだろうか。

例として関数 $f(x)=x^2$ において、x=a（a は実数）での接線の傾きを求めてみよう。

まず、ある実数 b（b≠a）をおいたとき、f(x)の a から b までの変化の割合は以下の式で表される。

$$
\frac{f(b)-f(a)}{b-a}
$$

ここで、この式を x が a から b まで変化する時の f(x)の**平均変化率**と呼ぶ。

<div id="jxgbox" class="jxgbox" style="width:480px; height:480px; margin: 0px auto;"></div>

<script>
let board = JXG.JSXGraph.initBoard('jxgbox', {
  boundingbox: [ -2, 10, 10, -2],  
  axis: true, 
  showNavigation: false,  
  showCopyright: false    
});
function parabola(t) {
  return (t**2)/10;
}
board.create('functiongraph', [parabola, -2, 10]);
let p1 = board.create('point', [3,parabola(3)]);
let p2 = board.create('point', [7,parabola(7)]);
board.create('line', [p1,p2],{strokeColor: 'red'});

</script>
