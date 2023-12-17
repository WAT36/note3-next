---
title: "連続関数、微分可能性"
excerpt: "区間、関数の連続、微分可能について"
coverImage: ""
date: "2023-12-14T22:01:13.000Z"
updatedAt: "2023-12-14T22:01:13.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

# 区間

まずは関数の「区間」について述べる。

関数の定義域、値域を表現する際に、以下の様な不等式を使って表すと思う。

$$
a<x<b,a \leqq x \leqq b,a \leqq x < b,a<x \leqq b
$$

が、今後はこれらをそれぞれ以下の様な記号で表すことにする。

$$
(a,b),[a,b],[a,b),(a,b]
$$

これらの事を、**区間**と呼ぶ。

特に、(a,b)を**開区間**、[a,b]を**閉区間**と呼ぶ。

また、以下の不等式が示す範囲

$$
a<x,a \leqq x,x<b,x \leqq b
$$

も、以下の様な記号で表せ、これらも区間である。

$$
(a, \infin),[a, \infin),(- \infin,b),(- \infin,b]
$$

# 連続関数

関数 f(x)が**連続**であるとは、大まかにいうと関数が切れ目のない直線または曲線であるという事なのだが、以下の定義に基づく。

関数 f(x)が区間 I で定義されているとする。区間 I 内の点 x=a で次の２つの条件が成り立つとき、関数 f(x)は x=a で**連続**であるという。

- $\lim_{x \to a} f(x)$ が存在する
- $\lim_{x \to a} f(x) = f(a)$

また、関数 f(x)が区間 I で定義されている時、区間 I の全ての x で f(x)が連続ならば、f(x)は区間 I で連続であると言い、f(x)を**連続関数**という。

例えば、 $y=x$ や $y=x^2$ 、 $y=2^x$ などは全ての区間で連続である。

$y=\frac{x^2 - x}{|x|}$ （以下図）は x=0 において連続ではない。（x=0 を含まない区間では連続）

<div id="jxgbox" class="jxgbox" style="width:480px; height:480px; margin: 0px auto;"></div>

<script>
let board = JXG.JSXGraph.initBoard('jxgbox', {
  boundingbox: [ -10, 10, 10, -10],  
  axis: true, 
  showNavigation: false,  
  showCopyright: false    
});
function notcontinuous(t) {
  return t===0 ? 10000 : (t**2 - t)/Math.abs(t);
}
board.create('functiongraph', [notcontinuous, -10, 10],{name:'y=f(x)'});
</script>
