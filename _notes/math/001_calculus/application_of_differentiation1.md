---
title: "微分の応用"
excerpt: "接線、法線、媒介変数表示、陰関数"
coverImage: ""
date: '2024-02-22T20:34:23.000Z'
updatedAt: '2026-10-26T00:31:58.000Z'
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

<iframe src="https://wat36.github.io/jsxgraph/src/001_calculus/011_tangent-line.html" width="400" height="400" scrolling="no" style="display:block; margin:0 auto; border:0; max-width:100%;" loading="lazy" title="接線の方程式のグラフ"></iframe>

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

<iframe src="https://wat36.github.io/jsxgraph/src/001_calculus/012_normal-line.html" width="400" height="400" scrolling="no" style="display:block; margin:0 auto; border:0; max-width:100%;" loading="lazy" title="法線の方程式のグラフ"></iframe>

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

<iframe src="https://wat36.github.io/jsxgraph/src/001_calculus/013_cycloid.html" width="400" height="400" scrolling="no" style="display:block; margin:0 auto; border:0; max-width:100%;" loading="lazy" title="サイクロイドのグラフ"></iframe>

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

例として、以下の楕円を表す陰関数

$$
\frac{x^2}{a^2} + \frac{y^2}{b^2} - 1 = 0
$$

の $\frac{dy}{dx}$ を求めてみよう。

上式の両辺を x で微分すれば

$$
\frac{2x}{a^2} + \frac{2y}{b^2} \frac{dy}{dx} = 0 \\
\frac{dy}{dx} = - \frac{b^2 x}{a^2 y}
$$

となる。

これを利用して、楕円の接線の式もわかる。楕円上の点($x_{1},y_{1}$)における接線の方程式は、以下のようになる。

$$
y-y_{1} = - \frac{b^2 x_{1}}{a^2 y_{1}}(x-x_{1}) \\
\therefore \frac{x_{1} x}{a^2} + \frac{y_{1} y}{b^2} = \frac{x_{1}^2}{a^2} + \frac{y_{1}^2}{b^2}
$$

しかし、点($x_{1},y_{1}$)は楕円上にあるので、式

$$
\frac{x_{1}^2}{a^2} + \frac{y_{1}^2}{b^2} = 1
$$

が成立する。なので接線の式は

$$
\frac{x_{1} x}{a^2} + \frac{y_{1} y}{b^2} = 1
$$

となる。

これらの式をもとにして、以下に、a=3,b=2 とした時の楕円および楕円上の接線を示した図を記載する。

<iframe src="https://wat36.github.io/jsxgraph/src/001_calculus/014_ellipse-tangent.html" width="400" height="400" scrolling="no" style="display:block; margin:0 auto; border:0; max-width:100%;" loading="lazy" title="楕円とその接線のグラフ"></iframe>
