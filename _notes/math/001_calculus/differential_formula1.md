---
title: "微分の諸公式(1)"
excerpt: "微分に関する主な基本公式"
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

# 3. {f(x)±g(x)}’ = f’(x) ± g’(x)

関数 y=f(x)±g(x) の導関数は以下の通り。

> $y=f(x) \pm g(x) ならば、y’ = f’(x) \pm g’(x)$

[証明]

y=f(x)±g(x)ならば

$$
\begin{aligned}
y’ &= \lim_{\Delta x \to 0} \frac{{f(x+ \Delta x) \pm g(x+ \Delta x)}-{f(x) \pm g(x)}}{\Delta x} \\
   &= \lim_{\Delta x \to 0} \frac{{f(x+ \Delta x) - f(x)} \pm {g(x+ \Delta x) - g(x)}}{\Delta x} \\
   &= \lim_{\Delta x \to 0} \frac{f(x+ \Delta x) - f(x)}{\Delta x} \pm \lim_{\Delta x \to 0} \frac{g(x+ \Delta x) - g(x)}{\Delta x} \\
   &= f’(x) \pm g’(x)
\end{aligned}
$$

# 4. { f(ax+b) }’ = af’(ax+b) (a,b は定数)

関数 y=f(ax+b) (a,b は定数) の導関数は以下の通り。

> $y=f(ax+b) (a,bは定数) ならば、y’ = af’(ax+b)$

[証明]

y=f(ax+b)ならば

$$
\begin{aligned}
y’ &=  \lim_{\Delta x \to 0} \frac{f(a(x+ \Delta x)+b) - f(ax+b)}{\Delta x} \\
&=  \lim_{\Delta x \to 0} \frac{f(ax+b+ a \Delta x)- f(ax+b)}{\Delta x} \\
&となり、ここで、t=ax+bとおく。 \\
&この時、 \\

\Delta t &= (a(x+ \Delta x)+b) - (ax+b) \\
&= a \Delta x \\

&となる。また、この式より \\

\Delta x &= \frac{\Delta t}{a} \\

&である。 \\

&ここから、 \\

y’ &= \lim_{\Delta x \to 0} \frac{f(ax+b+ a \Delta x)- f(ax+b)}{\Delta x} \\
&=  \lim_{\Delta t \to 0} \frac{f(t+ \Delta t) - f(t)}{\frac{\Delta t}{a}} \\
&= a \lim_{\Delta t \to 0} \frac{f(t+ \Delta t) - f(t)}{\Delta t} \\
&= a f’(t)  \\
&= a f’(ax+b) \\

&となる。
\end{aligned}
$$

# 5. {f(x)g(x)}’ = f’(x)g(x) + f(x)g’(x)

いわゆる「積の微分」と呼ばれる公式で、微分可能な 2 つの関数 f(x),g(x)がある時、

> $y=f(x)g(x) ならば、y’ = f’(x)g(x) + f(x)g’(x)$

となる。

[証明]

$$
\begin{aligned}
y’ &= \lim_{\Delta x \to 0} \frac{f(x+ \Delta x)g(x+ \Delta x) - f(x)g(x)}{\Delta x} \\
&= \lim_{\Delta x \to 0} \frac{f(x+ \Delta x)g(x+ \Delta x) -f(x)g(x+ \Delta x) +f(x)g(x+ \Delta x)  - f(x)g(x)}{\Delta x} \\
&= \lim_{\Delta x \to 0} ( \frac{f(x+ \Delta x)g(x+ \Delta x) -f(x)g(x+ \Delta x)}{\Delta x} + \frac{f(x)g(x+ \Delta x) -f(x)g(x)}{\Delta x})  \\
&= \lim_{\Delta x \to 0} (( \frac{f(x+ \Delta x) -f(x)}{\Delta x} ) g(x+ \Delta x) + (\frac{g(x+ \Delta x) -g(x)}{\Delta x})f(x))  \\
&= \lim_{\Delta x \to 0} ( \frac{f(x+ \Delta x) -f(x)}{\Delta x} ) g(x+ \Delta x) + \lim_{\Delta x \to 0}(\frac{g(x+ \Delta x) -g(x)}{\Delta x})f(x)  \\

&ここで、関数g(x)は微分可能なので、\lim_{\Delta x \to 0} g(x+ \Delta x) = g(x) である。よって上式は \\

&= \lim_{\Delta x \to 0} ( \frac{f(x+ \Delta x) -f(x)}{\Delta x} ) g(x+ \Delta x) + \lim_{\Delta x \to 0}(\frac{g(x+ \Delta x) -g(x)}{\Delta x})f(x)  \\
&= f’(x)g(x) + f(x)g’(x) \\
\end{aligned}
$$

となる。

# 6. {f(x)/g(x)}’ = {f’(x)g(x) - f(x)g’(x)} / {g(x)}^2

こちらはいわゆる「商の微分」と呼ばれる公式で、微分可能な 2 つの関数 f(x),g(x)がある時、

> $y=\frac{f(x)}{g(x)}$ ならば、$y’ = \frac{f’(x)g(x) - f(x)g’(x)}{g(x)^2}$

となる。

[証明]

$$
\begin{aligned}
y' &= \lim_{\Delta x \to 0} \frac{ \frac{f(x+\Delta x)}{g(x+\Delta x)} - \frac{f(x)}{g(x)} }{\Delta x} \\
&= \lim_{\Delta x \to 0} \frac{ f(x+\Delta x)g(x) - f(x)g(x+\Delta x) }{g(x) g(x+\Delta x) \Delta x } \\
&= \lim_{\Delta x \to 0} \frac{ f(x+\Delta x)g(x) -f(x)g(x) + f(x)g(x) - f(x)g(x+\Delta x) }{g(x) g(x+\Delta x) \Delta x } \\
&= \lim_{\Delta x \to 0} (\frac{f(x+\Delta x)-f(x)}{\Delta x}g(x) - f(x) \frac{g(x+\Delta x)-g(x)}{\Delta x}) \frac{1}{g(x)g(x+\Delta x)} \\
&= \frac{f'(x)g(x) - f(x)g'(x)}{g(x)^2} \\
\end{aligned}
$$

またこの公式より、f(x)=1 のとき、つまり

> $y=\frac{1}{g(x)}$ ならば、 $y’ = - \frac{g’(x)}{g(x)^2}$

となる。

# 7. 合成関数の微分

ここで合成関数とは何か示しておく。

変数 t の関数$y=f(t)$と変数 x の関数$t=g(x)$があったとき、$y=f(t)$に$t=g(x)$を代入してできる関数

$$
y=f(g(x))
$$

を２つの関数$y=f(t)$と$t=g(x)$の**合成関数**という。

ここで、関数$y=f(t)$と$t=g(x)$が微分可能であれば、合成関数$y=f(g(x))$も微分可能であって、

$$
\frac{dy}{dx} = \frac{dy}{dt} \frac{dt}{dx}
$$

となる。

[証明]

x の増分 Δx に対する$t=g(x)$の増分を Δt とし、t の増分 Δt に対する$y=f(t)$の増分を Δt とする。

また、$y=f(t)$は微分可能であるから、

$$
\frac{dt}{dx} = \lim_{\Delta x \to 0} \frac{\Delta t}{\Delta x},\frac{dy}{dt} = \lim_{\Delta t \to 0} \frac{\Delta y}{\Delta t}
$$

となる。また、

$$
\frac{\Delta y}{\Delta x} = \frac{\Delta y}{\Delta t} \frac{\Delta t}{\Delta x}
$$

となる。また、関数$t=g(x)$は微分可能なので、連続である。より、Δx→0 のとき、Δt→0 である。したがって、

$$
\frac{dy}{dx} = \lim_{\Delta x \to 0} \frac{\Delta y}{\Delta x} \\
= \lim_{\Delta x \to 0} \frac{\Delta y}{\Delta t} \lim_{\Delta x \to 0} \frac{\Delta t}{\Delta x} \\
= \lim_{\Delta t \to 0} \frac{\Delta y}{\Delta t} \lim_{\Delta x \to 0} \frac{\Delta t}{\Delta x} \\
= \frac{dy}{dt} \frac{dt}{dx}
$$

となる。
