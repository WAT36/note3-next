---
title: "微分の諸公式(1)"
excerpt: "微分に関する主な基本公式"
coverImage: ""
date: "2024-01-13T09:39:14.000Z"
updatedAt: "2024-01-13T09:39:14.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

ここでは、各関数の導関数を導出する公式について書く。

# 1. y=k (k は定数)

関数 y=k（k は定数）の導関数は以下の通り。

> $y=k ならば、y’ = 0 （k は定数）$

[証明]

y=k ならば

$$
\begin{aligned}
y’ &= \lim_{\Delta x \to 0} \frac{k-k}{\Delta x} \\
&= \lim_{\Delta x \to 0}  0  \\
&= 0
\end{aligned}
$$

よって

$$
y’ = 0
$$

# 2. y=kf(x) (k は定数)

関数 y=kf(x)（k は定数）の導関数は以下の通り。

> $y=kf(x) ならば、y’ = kf’(x) （kは定数）$

[証明]

y=kf(x)ならば

$$
\begin{aligned}
y’ &=  \lim_{\Delta x \to 0} \frac{kf(x+ \Delta x)-kf(x)}{\Delta x} \\
   &= k \lim_{\Delta x \to 0} \frac{f(x+ \Delta x)-f(x)}{\Delta x} \\
   &= kf’(x)
\end{aligned}
$$

よって

$$
y’ = kf’(x)
$$
