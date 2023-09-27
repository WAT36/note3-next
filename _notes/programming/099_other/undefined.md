---
title: "undefined(javascript)"
date: "2019-11-01T06:37:30+09:00"
excerpt: "Nullについて"
tag: ["Javascript"]
programming: ["Javascript"]
updatedAt: "2019-11-01T06:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

Javascript の undefined について記載する。

undefined とは Javascript のグローバルオブジェクトのプロパティの一つである。

変数を設定し、初期値を設定しなかった時、Javascript はデフォルトで undefined を設定する。

値を return しない関数も、undefined を返す。また、定義されていないプロパティを参照しようとした時も undefined を返す。

undefined は null と混同しやすいが、undefined は「定義されていない」、null は「空である」という状態になる。
