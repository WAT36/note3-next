---
title: "微分の諸公式(3) - 指数・対数関数"
excerpt: "指数関数と対数関数の微分について"
coverImage: ""
date: '2024-02-18T20:57:40.000Z'
updatedAt: '2026-10-26T00:29:16.000Z'
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

ここでは、指数・対数関数の微分とそれに関する定理等についてを述べる。

# 自然対数

まずは自然対数という概念について述べる。

次の極限についてを考える。

$$
\lim_{h \to 0} (1 + h)^{\frac{1}{h}}
$$

この式は実は収束し、値 2.718281828…になる事が知られている。

参考までに、以下に上式のグラフを図示する。(h>0)

<iframe src="https://wat36.github.io/jsxgraph/src/001_calculus/010_napier-e-limit.html" width="400" height="400" scrolling="no" style="display:block; margin:0 auto; border:0; max-width:100%;" loading="lazy" title="y = (1 + h)^(1/h) のグラフ"></iframe>

この極限値を文字 e で表し、**自然対数の底**あるいは**ネピア数**と呼ぶ。

すなわち、

$$
\lim_{h \to 0} (1 + h)^{\frac{1}{h}} = e
$$

とする。

このとき、数 e を底とする対数関数$y=\log_{e}x$を**自然対数**といい、簡略化して

$$
y = \log_{} x
$$

と表す。

# 対数関数の微分

対数関数$y=\log x$の微分を考えよう。

$$
\begin{aligned}
y' &= \lim_{\Delta x \rightarrow 0} \frac{\log(x+\Delta x) - \log x}{\Delta x} \\
&= \lim_{\Delta x \rightarrow 0} \frac{1}{\Delta x} \log(1 + \frac{\Delta x}{x})  \\
\end{aligned}
$$

ここで $h=\frac{\Delta x}{x}$とおくと、$\Delta x \rightarrow 0$のとき$h \rightarrow 0$なので上式は

$$
\begin{aligned}
&= \lim_{\Delta x \rightarrow 0} \frac{1}{x} \frac{x}{\Delta x} \log(1 + \frac{\Delta x}{x}) \\
&= \lim_{h \rightarrow 0} \frac{1}{x} \frac{1}{h} \log(1 + h) \\
&= \frac{1}{x} \lim_{h \rightarrow 0} \log(1 + h)^{\frac{1}{h}} \\
&= \frac{1}{x} \log e \\
&= \frac{1}{x}
\end{aligned}
$$

よって

$$
(\log x)' = \frac{1}{x}
$$

である。

また、これを利用して底が実数 a の対数関数$y=\log_{a}x$の微分は、底の変換公式を利用して

$$
\begin{aligned}
y' &= (\log_{a}x)' \\
&= (\frac{\log x}{\log a})' \\
&= \frac{1}{\log a} \cdot (\log x)' \\
&= \frac{1}{x \log a}
\end{aligned}
$$

となる。よって

$$
(\log_{a}x)' = \frac{1}{x \log a}
$$

# 指数関数の微分

指数関数$y=e^x$の微分を考えよう。

まず、指数関数$y=e^x$は、$x=\log y$である。

このとき、

$$
\frac{dx}{dy} = \frac{1}{y}
$$

なので、$y=e^x$の微分は

$$
\begin{aligned}
y' &= \frac{dy}{dx} \\
&= \frac{1}{\frac{dx}{dy}}
&= y \\
&= e^x
\end{aligned}
$$

である。よって、

$$
(e^x)' = e^x
$$

次に、、$y=a^x$ (a は実数) の微分を考えよう。

$$
y= a^x \\
$$

において、両辺の自然対数を取ると

$$
\begin{aligned}
\log y &= \log a^x \\
&= x \log a \\
\end{aligned}
$$

ここで両辺を x で微分すると、合成関数の微分を利用し

$$
\begin{aligned}
\frac{y'}{y} &= \log a \\
y' &= y \log a \\
y' &= a^x \log a
\end{aligned}
$$

である。よって

$$
(a^x)' = a^x \log a
$$

# 対数微分法

先程の指数関数の微分で利用した、自然対数を取って微分する手法を**対数微分法**という。

具体的には、関数$y=f(x)$が微分可能であったとき、y の自然対数$log_{y}$をとることを考える。

この時、$log_{y}$を x で微分すると、合成関数の微分より

$$
(\log y)' = \frac{y'}{y}
$$

がわかる。この式より

$$
\begin{aligned}
y' &= y(\log y)' \\
&= f(x) (\log f(x))'
\end{aligned}
$$

となる。この公式を利用する計算法を対数微分法と呼ぶ。

## $y=x^{\alpha}$ の微分

この対数微分法を利用して、 $y=x^{\alpha}$ の微分を求めてみよう。

まず、両辺の対数を取ると

$$
\log y = \alpha \log x
$$

そして、両辺を x で微分すると

$$
\begin{aligned}
\frac{1}{y} \cdot y' &= \alpha \cdot \frac{1}{x} \\
\Leftrightarrow y' &= \alpha \frac{y}{x} \\
\Leftrightarrow y' &= \alpha \frac{x^{\alpha}}{x} \\
\Leftrightarrow y' &= \alpha x^{\alpha - 1} \\
\end{aligned}
$$

よって、 $y=x^{\alpha}$ の微分は $y’=x^{\alpha -1}$ になる。
