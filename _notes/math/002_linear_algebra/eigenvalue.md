---
title: "固有値と固有ベクトル"
excerpt: ""
coverImage: ""
date: "2026-04-25T11:40:48.000Z"
updatedAt: "2026-04-25T11:40:48.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

線形代数において「行列が空間をどのように変形するか」を理解する鍵となるのが、固有値と固有ベクトルです。本節ではその定義から始め、固有多項式による計算法、対角化、そして対称行列に対するスペクトル定理まで扱います。

# 固有値と固有ベクトル

行列 $A$ による変換 $\boldsymbol{v} \mapsto A\boldsymbol{v}$ を考えます。一般にベクトルは変換によって方向も大きさも変わりますが、特別なベクトル $\boldsymbol{v}$ については変換後も方向が変わらず、大きさだけがスカラー倍になる場合があります。

定義（固有値・固有ベクトル）： $n$ 次正方行列 $A \in \mathbb{R}^{n \times n}$ に対し、 $\boldsymbol{0}$ でないベクトル $\boldsymbol{v} \in \mathbb{R}^n$ とスカラー $\lambda \in \mathbb{R}$（または $\mathbb{C}$）が

$$
A\boldsymbol{v} = \lambda\boldsymbol{v}Av=λv
$$

を満たすとき、$\lambda$ を $A$ の **固有値** （eigenvalue）、$\boldsymbol{v}$ を $\lambda$ に対応する固有ベクトル（eigenvector）という。

固有ベクトルに $\boldsymbol{0}$ を含めない理由は、$A\boldsymbol{0} = \lambda\boldsymbol{0}$ がすべての $\lambda$ に対して自明に成り立ってしまうためです。

![](/assets/note/math/002_linear_algebra/eigenvalue/eigenvalue_definition.svg)

固有値 $\lambda$ の値によって、固有ベクトルの変換の様子は大きく異なります。

![](/assets/note/math/002_linear_algebra/eigenvalue/eigenvalue_cases.svg)
