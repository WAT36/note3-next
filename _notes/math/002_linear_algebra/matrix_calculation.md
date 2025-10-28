---
title: "行列の演算"
excerpt: ""
coverImage: ""
date: "2025-10-25T23:51:31.000Z"
updatedAt: "2025-10-25T23:51:31.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

行列を単に数字の集まりとして捉えるのではなく、そこに和 $A+B$、差 $A-B$、積 $AB$、スカラー倍 $kA$ などといった演算を考える。

これによって、行列は数（文字式）とほぼ同じように扱うことができる。

# 行列の和

行列の和と差は同じ型の行列の間でのみ定義される。型の異なる行列の和と差は考えない。

$A=[a_{ij}]$と$B=[b_{ij}]$が同じ$m×n$行列のとき、$(i,j)$成分が

$$
a_{ij} + b_{ij}.  (i = 1,2, \cdots , m; j = 1,2, \cdots , n)
$$

である m×n 行列を A と B の和といい、A+B と書く。

$$
A+B = [a_{ij}] + [b_{ij}] = [a_{ij} + b_{ij}]
$$

## 行列の差

$A=[a_{ij}]$と$B=[b_{ij}]$が同じ$m×n$行列のとき、$(i,j)$成分が

$$
a_{ij} - b_{ij}.  (i = 1,2, \cdots , m; j = 1,2, \cdots , n)
$$

である m×n 行列を A と B の差といい、A-B と書く。

$$
A-B = [a_{ij}] - [b_{ij}] = [a_{ij} - b_{ij}]
$$
