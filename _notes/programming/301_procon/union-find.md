---
title: "Union-Find木"
date: "2019-11-09T04:01:30+09:00"
excerpt: "Union-Find木について"
tag: ["Python"]
updatedAt: "2019-11-09T04:01:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
---

Union-Find 木について。

Union-Find 木は要素のグループ分けを管理するデータ構造である。
1 つ以上の要素を含むグループが何個かあった時、次の事が行える。

- 2 つのグループをマージする
- 2 つの要素が同じグループに含まれているか判定する

注意としては、グループを分割することはできないという事。  
例としては、以下のような図になる。

![](/assets/note/programming/301_procon/union-find/union-find1.png)

Union-find 木は特に根や次数等は決まっておらず、グループ内の要素がすべて含まれていればどのような木構造でも良い。

## 初期化

まずは要素を用意し、それぞれの要素のノードを作る。初期の状態ではこのノードがそれぞれグループを表す。この段階ではまだ要素が 1 つだけだが、これでも一応木を表す。以下の図にその例を示す。

![](/assets/note/programming/301_procon/union-find/union-find2.png)

## 2 グループのマージ

2 つのグループ(木)をマージするには、片方のグループ(木)の根の下にもう片方のグループ(木)の根を結び付ける。以下例。

![](/assets/note/programming/301_procon/union-find/union-find3.png)

## 2 要素が同一グループにいることの判定

ある 2 つの要素が同じグループにいることを判定するには、それぞれの要素がいるグループ(木)の根の要素が同じであるかで判定できる。以下がその例である。

![](/assets/note/programming/301_procon/union-find/union-find4.png)
