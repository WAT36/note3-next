---
title: "微分とは"
excerpt: "関数の微分について"
coverImage: ""
date: '2023-12-05T21:49:36.000Z'
updatedAt: '2026-10-25T23:59:55.000Z'
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

<iframe src="https://wat36.github.io/jsxgraph/src/001_calculus/004_differential-secant-to-tangent.html" width="480" height="480" scrolling="no" style="display:block; margin:0 auto; border:0; max-width:100%;" loading="lazy" title="平均変化率から接線の傾きへのグラフ"></iframe>

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
