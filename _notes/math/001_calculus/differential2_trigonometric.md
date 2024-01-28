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

は描こう

図が必要なので

JSXGraph でゴリゴリ書くしかないか・・？
