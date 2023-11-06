---
title: "クラスタリング"
date: "2019-11-05T00:01:30+09:00"
excerpt: "クラスタリングについて"
tag: ["Python"]
updatedAt: "2019-11-05T00:01:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
---

教師あり学習の分類では、入力データに対し分類後のクラス(カテゴリ)が与えられていたが、ここでは入力データからデータをクラスに分類していくことを考える。この手法を**クラスタリング**という。

教師あり学習で利用した２次元入力のデータを見てみよう。図示したものを以下に記載する。なお、今回は教師なし学習のため、目標値は利用しない。

![](/assets/note/programming/102_machine_learning/1022_unsupervised_learning/clustering/Figure_39.png)

このデータから、データの似ている者同士を同じクラスとして分類していくことがクラスタリングである。

クラスタリングの手法としてはいくつか存在する。まずは K-means 法についてを次章で説明する。
