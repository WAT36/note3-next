---
title: "ベクトルの内積"
excerpt: ""
coverImage: ""
date: "2026-04-08T18:45:44.000Z"
updatedAt: "2026-04-08T18:45:44.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

線形代数の出発点が「ベクトル空間」であるように、その上に「距離」と「角度」の概念を持ち込むのが内積です。

# 内積

2 つのベクトルから 1 つのスカラーを作り出す演算を **内積** といいます。高校で学んだ $\boldsymbol{a} \cdot \boldsymbol{b} = |\boldsymbol{a}||\boldsymbol{b}|\cos\theta$ の拡張として、代数的・公理的に定義します。

定義（内積）： 実ベクトル空間 $V$ 上の内積とは、写像 $\langle \cdot, \cdot \rangle : V \times V \to \mathbb{R}$ であって、任意の $\boldsymbol{u}, \boldsymbol{v}, \boldsymbol{w} \in V$ および $c \in \mathbb{R}$ に対して次の 4 条件を満たすものをいう。

$$
(1) 対称性：\text{(1) 対称性：} \langle \boldsymbol{u}, \boldsymbol{v} \rangle = \langle \boldsymbol{v}, \boldsymbol{u} \rangle(1) 
(2) 線形性（スカラー倍）： \text{(2) 線形性（スカラー倍）：} \langle c\boldsymbol{u}, \boldsymbol{v} \rangle = c\langle \boldsymbol{u}, \boldsymbol{v} \rangle(2) 
(3) 線形性（加法）：\text{(3) 線形性（加法）：} \langle \boldsymbol{u} + \boldsymbol{v}, \boldsymbol{w} \rangle = \langle \boldsymbol{u}, \boldsymbol{w} \rangle + \langle \boldsymbol{v}, \boldsymbol{w} \rangle(3) 
(4) 正定値性：\text{(4) 正定値性：} \langle \boldsymbol{v}, \boldsymbol{v} \rangle \geq 0,\quad \text{等号成立} \iff \boldsymbol{v} = \boldsymbol{0}(4) 
$$

対称性と線形性を合わせて、内積は **双線形写像** であるといいます。すなわち第 2 引数についても $\langle \boldsymbol{u}, c\boldsymbol{v} + \boldsymbol{w} \rangle = c\langle \boldsymbol{u}, \boldsymbol{v} \rangle + \langle \boldsymbol{u}, \boldsymbol{w} \rangle$ が自動的に成立します。

代表的な内積の例を 2 つ挙げます。

![](/assets/note/math/002_linear_algebra/inner_product/inner_product_examples.svg)
