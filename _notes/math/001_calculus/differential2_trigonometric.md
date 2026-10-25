---
title: "微分の諸公式(2) - 三角関数"
excerpt: "三角関数に関する微分の公式"
coverImage: ""
date: "2024-01-26T00:14:59.000Z"
updatedAt: '2026-10-26T00:15:36.000Z'
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

<iframe src="https://wat36.github.io/jsxgraph/src/001_calculus/005_sinc-limit-proof.html" width="480" height="480" scrolling="no" style="display:block; margin:0 auto; border:0; max-width:100%;" loading="lazy" title="sinc 関数の極限の証明図"></iframe>

上図で扇形 OAB の中心角を x とし、 0 < x < π/2 とする。
半径 OA の端点 A における垂線と半径 OB との延長との交点を T とする。
この時、△OAB、扇形 OAB、△OAT の面積はそれぞれ

$$
\triangle OAB = \frac{1}{2} \sin x \\
扇形OAB = \frac{1}{2} x \\
\triangle OAT = \frac{1}{2} \tan x \\
$$

である。さらに、△OAB < 扇形 OAB < △OAT 　であるから、

$$
\sin x  < x < \tan x
$$

である。ここで、$\sin x > 0$なので、各辺を$\sin x$で割って

$$
1 < \frac{x}{\sin x} < \frac{1}{\cos x} \\
\Leftrightarrow	 1 > \frac{\sin x}{x} > \cos x \\
$$

ここで、$\lim_{x \rightarrow 0} \cos x  = 1$なので、はさみうちの原理により

$$
\lim_{x \rightarrow 0} \frac{\sin x}{x}  = 1
$$

# 4. (sinx)’ = cosx

ここから三角関数の導関数についてを求めていく。

まずは、sinx について。sinx の導関数は以下のとおりである。

$$
(\sin x)' = \cos x
$$

[証明]

$$
\begin{aligned}
(\sin x)' &= \lim_{\Delta x \to 0} \frac{\sin (x + \Delta x) - \sin x}{\Delta x} \\
&= \lim_{\Delta x \to 0} \frac{\sin x \cos \Delta x + \cos x \sin \Delta x - \sin x}{\Delta x } \\
&= \lim_{\Delta x \to 0} \frac{\cos x \sin \Delta x + \sin x (\cos \Delta x - 1)}{\Delta x } \\
&= \cos x \lim_{\Delta x \to 0} \frac{\sin \Delta x}{\Delta x} + \sin x \lim_{\Delta x \to 0} \frac{(\cos \Delta x - 1)}{\Delta x } \\
&= \cos x  + \sin x \lim_{\Delta x \to 0} \frac{(\cos^2 \Delta x - 1)}{\Delta x (\cos \Delta x + 1)} \\
&= \cos x  - \sin x \lim_{\Delta x \to 0} \frac{\sin^2 \Delta x}{\Delta x (\cos \Delta x + 1)} \\
&= \cos x  - \sin x \lim_{\Delta x \to 0} \frac{\sin \Delta x}{\Delta x} \frac{\sin \Delta x}{(\cos \Delta x + 1)} \\
&= \cos x  - \sin x \cdot 1 \cdot 0 \\
&= \cos x \\
\end{aligned}
$$

# 5. (cosx)’ = -sinx

次に cosx の導関数について。これは以下のとおりである。

$$
(\cos x)' = - \sin x
$$

[証明]

先程の sinx の導関数と、合成関数の微分を利用して

$$
\begin{aligned}
(\cos x)' &= (\sin(\frac{\pi}{2} - x))' \\
&= -1 \cdot \cos(\frac{\pi}{2} - x)\\
&= - \sin x
\end{aligned}
$$

# 6. (tanx)’ = 1/(cosx)^2

tanx の導関数については以下の通り。

$$
(\tan x)' =  \frac{1}{\cos^2 x}
$$

[証明]

商の微分を利用して

$$
\begin{aligned}
(\tan x)' &= (\frac{\sin x}{\cos x})' \\
&= \frac{(\sin x)' \cos x - \sin x (\cos x)'}{\cos^2 x} \\
&= \frac{\cos^2 x + \sin^2 x}{\cos^2 x} \\
&= \frac{1}{\cos^2 x} \\
\end{aligned}
$$
