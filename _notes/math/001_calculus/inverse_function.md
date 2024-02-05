---
title: "逆関数と逆三角関数"
excerpt: "逆関数と逆三角関数について"
coverImage: ""
date: "2024-02-05T20:10:09.000Z"
updatedAt: "2024-02-05T20:10:09.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

# 逆関数

まず初めに「逆関数」について、

単調関数 $y=f(x)$があるとき、変数 x について解く事でできる関数$x=g(y)$を、関数$y=f(x)$の逆関数と呼び、

$$
y=f^{-1}(x)
$$

と表す。

<!-- （何か例を出して図を載せる？？y=log2x とy=2^xみたいな）-->

逆関数は、単調関数 $y=f(x)$において、変数 x と y を入れ替えた関数 x=f(y)を y について解く事でも求められる。

# 逆関数の微分

逆関数$y=f^{-1}(x)$の微分は以下のとおりである。

$$
(f^{-1}(x))' = \frac{1}{f(x)'}
$$

つまり

$$
\frac{dy}{dx} = \frac{1}{\frac{dx}{dy}}
$$

[証明]

まず、

$$
y = f^{-1}(x) \Leftrightarrow x = f(y)
$$

である。ここで、x = f(y)の両辺を x で微分すると

$$
\begin{aligned}
1 &= f(y)' \cdot \frac{dy}{dx} \\
\Leftrightarrow \frac{dy}{dx} &= \frac{1}{f(y)'}
\end{aligned}
$$

になる。よって

$$
\begin{aligned}
(f^{-1}(x))' &= \frac{dy}{dx} \\
&= \frac{1}{f(y)'} \\
&= \frac{1}{\frac{dx}{dy}}
\end{aligned}
$$

である。
