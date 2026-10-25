---
title: "逆関数と逆三角関数"
excerpt: "逆関数と逆三角関数について"
coverImage: ""
date: '2024-02-05T20:10:09.000Z'
updatedAt: '2026-10-26T00:24:04.000Z'
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

例えば$y=2^x$の逆関数は$y=\log_{2}x$である。

（例：$y=2^x$と$y=\log_{2}x$の図。点線が$y=x$でこれを境に対になっている）

<iframe src="https://wat36.github.io/jsxgraph/src/001_calculus/006_inverse-2x-log2x.html" width="480" height="480" scrolling="no" style="display:block; margin:0 auto; border:0; max-width:100%;" loading="lazy" title="y = 2^x と y = log2(x) のグラフ"></iframe>

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

# 逆三角関数

続いて、三角関数の逆関数、「逆三角関数」についてを述べる。

## 1. 逆正弦関数

三角関数は増加・減少を繰り返す周期関数であるが、ここでは定義域を[-π/2,π/2]で制限して考えてみよう。

すると、$y=\sin x$は単調増加関数としてみることができる。

このとき、正弦関数$y=\sin x$ の逆関数を定めることができ、それを**逆正弦関数**または**アークサイン**と言い、以下で表す。

$$
y = \sin^{-1}x
$$

またこのとき、以下が成り立つ。

$$
y=\sin^{-1}x  \Leftrightarrow x = \sin y
$$

以下に、正弦関数(黒線)と逆正弦関数(赤線)のグラフを示す。

<iframe src="https://wat36.github.io/jsxgraph/src/001_calculus/007_arcsin.html" width="480" height="480" scrolling="no" style="display:block; margin:0 auto; border:0; max-width:100%;" loading="lazy" title="y = sin(x) と y = arcsin(x) のグラフ"></iframe>

またこの図より、定義域は[-1,1]、値域は[-π/2,π/2]となる。

## 2. 逆余弦関数

こんどは、定義域を[0,π]で制限してみると、y=cosx は単調減少関数としてみることができる。

このとき、余弦関数 y=cosx の逆関数を**逆余弦関数**または**アークコサイン**と言い、以下で表す。

$$
y = \cos^{-1}x
$$

またこのとき、以下が成り立つ。

$$
y=\cos^{-1}x  \Leftrightarrow x = \cos y
$$

以下に、余弦関数(黒線)と逆余弦関数(赤線)のグラフを示す。

<iframe src="https://wat36.github.io/jsxgraph/src/001_calculus/008_arccos.html" width="480" height="480" scrolling="no" style="display:block; margin:0 auto; border:0; max-width:100%;" loading="lazy" title="y = cos(x) と y = arccos(x) のグラフ"></iframe>

またこの図より、定義域は[-1,1]、値域は[0,π]となる。

## 3. 逆正接関数

正接関数 y=tanx は定義域(-π/2,π/2)で単調増加関数である。

このとき、正接関数の逆関数を**逆正接関数**または**アークタンジェント**と言い、以下で表す。

$$
y = \tan^{-1}x
$$

またこのとき、以下が成り立つ。

$$
y=\tan^{-1}x  \Leftrightarrow x = \tan y
$$

以下に、正接関数(黒線)と逆正接関数(赤線)のグラフを示す。

<iframe src="https://wat36.github.io/jsxgraph/src/001_calculus/009_arctan.html" width="480" height="480" scrolling="no" style="display:block; margin:0 auto; border:0; max-width:100%;" loading="lazy" title="y = tan(x) と y = arctan(x) のグラフ"></iframe>

またこの図より、定義域は(-∞,∞)、値域は(-π/2,π/2)となる。

# 逆三角関数の微分

これらの逆三角関数の微分を考える。

## 1. 逆正弦関数の微分

関数 $y=\sin^{-1}x$ の微分は以下のとおり。

$$
(\sin^{-1}x)' = \frac{1}{\sqrt{1-x^2}}
$$

[証明]

まず

$$
\begin{aligned}
y &= \sin^{-1} x \Leftrightarrow x = \sin y \\
\end{aligned}
$$

であり、$y=\sin^{-1}x$の値域は$[-\frac{\pi}{2},\frac{\pi}{2}]$であり、このとき$\cos y > 0$であるから、

$$
\begin{aligned}
\frac{dx}{dy} &= \cos y \\
&= \sqrt{1-\sin^{2}y}\\
&= \sqrt{1-x^2} \\
\end{aligned}
$$

である。

よって、逆関数の微分の公式から

$$
\begin{aligned}
\frac{dy}{dx} &= \frac{1}{\frac{dx}{dy}} \\
&= \frac{1}{\sqrt{1-x^2}}
\end{aligned}
$$

## 2. 逆余弦関数の微分

関数 $y=\cos^{-1}x$ の微分は以下のとおり。

$$
(\cos^{-1}x)' = - \frac{1}{\sqrt{1-x^2}}
$$

[証明]

同様にして

$$
\begin{aligned}
y&=\cos^{-1} x \Leftrightarrow x = \cos y \\
\end{aligned}
$$

であり、$y=\cos^{-1}x$の値域は$[0,\pi]$であり、このとき$\sin y > 0$であるから、

$$
\begin{aligned}
\frac{dx}{dy} &= -\sin y \\
&= - \sqrt{1-\cos^{2}y}\\
&= - \sqrt{1-x^2} \\
\end{aligned}
$$

である。

よって、逆関数の微分の公式から

$$
\begin{aligned}
\frac{dy}{dx} &= \frac{1}{\frac{dx}{dy}} \\
&= - \frac{1}{\sqrt{1-x^2}}
\end{aligned}
$$

## 3. 逆正接関数の微分

関数$y=\tan^{-1}x$の微分は以下のとおり。

$$
(\tan^{-1}x)' = \frac{1}{1+x^2}
$$

[証明]

同様にして

$$
y=\tan^{-1} x \Leftrightarrow x = \tan y \\
$$

であるから、

$$
\begin{aligned}
\frac{dx}{dy} &= \frac{1}{\cos^2 y} \\
&= 1+\tan^{2}y\\
&= 1+x^2 \\
\end{aligned}
$$

である。

よって、逆関数の微分の公式から

$$
\begin{aligned}
\frac{dy}{dx} &= \frac{1}{\frac{dx}{dy}} \\
&= \frac{1}{1+x^2}
\end{aligned}
$$
