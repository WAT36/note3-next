---
title: "微分とは"
excerpt: "関数の微分について"
coverImage: ""
date: '2025-09-30T21:42:32.000Z'
updatedAt: '2025-10-02T00:31:45.000Z'
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

例として関数 $f(x)=\frac{x^2}{10}$ において、x=a（a は実数）での接線の傾きを求めてみよう。

まず、ある実数 b（b≠a）をおいたとき、f(x)の a から b までの変化の割合は以下の式で表される。

$$
\frac{f(b)-f(a)}{b-a}
$$

ここで、この式を x が a から b まで変化する時の f(x)の**平均変化率**と呼ぶ。

このとき、b を a に限りなく近づけることで、f(x)の x=a の時での平均変化率を求めることができる。それは以下の式で表される。

$$
\lim_{b \to a} \frac{f(b)-f(a)}{b-a}
$$

この操作を示した図を以下に示す。

<div id="jxgbox" class="jxgbox" style="width:480px; height:480px; margin: 0px auto;"></div>

この時、b=a+h（h は実数）とおくと、上式は以下の様に置き換えられる。

$$
\lim_{h \to 0} \frac{f(a+h)-f(a)}{h}
$$

この式が、関数 f(x)の x=a での接線の傾きを表しており、

この値の事を関数 f(x)の x=a における **微分係数** （または　変化率）と呼び、f’(a)で表す。

また、関数 f(x)の微分係数を示した関数の事を関数 f(x)の**導関数**と呼び、f’(x)と表す。

導関数は、以下の式で表される。

$$
f'(x) = \lim_{h \to 0} \frac{f(a+h)-f(a)}{h}
$$

一般的に関数を「微分する」という事は、この導関数および微分係数を求めることを指す。

関数 y=f(x)の導関数は、主に以下の記号で表される。

$$
y',f',f'(x),\frac{dy}{dx},\frac{df}{dx},\frac{d}{dx}f(x)
$$

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
board.create('functiongraph', [parabola, -2, 10],{name:'y=f(x)'});
let p1 = board.create('point', [3,parabola(3)],{name:'(a,f(a))'});
let p2 = board.create('point', [7,parabola(7)],{name:'(b,f(b))'});
let l = board.create('line', [p1,p2],{strokeColor: 'red',});

// Start infinite animation
var i = 0;
setInterval(() => {
    p2.moveTo([7.0-(0.1*i), parabola(7.0-(0.1*i))], 100);
    i>39 ? i=0 : i++;
}, 100);
</script>
