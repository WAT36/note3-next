---
title: "さまざまな行列"
excerpt: ""
coverImage: ""
date: "2025-11-02T22:53:41.000Z"
updatedAt: "2025-11-02T22:53:41.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

# 零行列

成分が全て０である行列を零行列といい、$O$（アルファベットの大文字オー）で表す。

$$
O =

\begin{bmatrix}
0 &   \cdots & 0 \\
\vdots &  \quad & \vdots \\
0 &   \cdots & 0
\end{bmatrix} \quad
$$

- 零行列の型を記載したいときは、m×n 型の零行列といい、$O_{m×n}$と書く。

- 成分が全て０である行ベクトルおよび列ベクトルは零ベクトルといい、$o$（アルファベット小文字のオーの太字）で表す。

$$

o =

\begin{bmatrix}
0 & 0 &   \cdots & 0
\end{bmatrix} \quad

または

\begin{bmatrix}
0  \\
\vdots \\
0
\end{bmatrix} \quad


$$

# 単位行列

正方行列で、対角成分が全て１で、他の成分が全て０である行列を**単位行列**といい、I で表す。

$$

I =

\begin{bmatrix}
1 & 0 & \cdots & 0 \\
0 & 1 & \ddots & \vdots \\
\vdots & \ddots & \ddots & \vdots \\

0 &   \cdots & 0 & 1
\end{bmatrix} \quad

 (右辺は

\begin{bmatrix}
1 & \quad & O \\
\quad & \ddots & \quad \\
O & \quad & 1
\end{bmatrix} \quad

とも略記される)


$$

- 型を強調したいときは、n 次単位行列といい、$I_n$と書く。
- 零行列と同様、単に I と表されている時、次数が違えば異なる単位行列である。
