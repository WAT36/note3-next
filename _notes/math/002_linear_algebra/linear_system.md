---
title: "連立１次方程式と行列"
excerpt: ""
coverImage: ""
date: "2025-12-14T16:19:11.000Z"
updatedAt: "2025-12-14T16:19:11.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

連立 1 次方程式、例えば以下のような式

$$

\begin{equation}
\left\{ \,
\begin{aligned}
& x & - & 2y & + & 3z & = & 1 \\
& 3x & + & y & - & 5z & = & -4 \\
& -2x & + & 6y &- & 9z & = & -2
\end{aligned}
\right.
\end{equation}


$$

は、以下のような行列を使った式に置き換えられる。

$$

\begin{bmatrix}
   1 & -2 & 3 \\
   3 & 1 & -5 \\

   -2 & 6 & -9
\end{bmatrix}

\begin{bmatrix}
   x \\
   y \\

   z
\end{bmatrix}

=

\begin{bmatrix}
   1 \\
   -4 \\

   2
\end{bmatrix}


$$

この式の行列を変形することで、方程式を解く事ができる。ここでは、その方法についてを記載する。
