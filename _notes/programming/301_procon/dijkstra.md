---
title: "ダイクストラ法"
date: "2019-11-09T13:01:30+09:00"
excerpt: "ダイクストラ法について"
tag: ["Python"]
updatedAt: "2019-11-09T13:01:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
---

グラフ探索の手法の一つ、ダイクストラ法についてを述べる。

ダイクストラ法は重み付きのグラフにおいて、ある頂点から他の全ての頂点までの最小コストを計算する一つの手法である。

既に最小コストが確定している頂点から一つ一つ最小コストを決定していくので、動的計画法に少し似ているところがある。

## アルゴリズム

入出力は以下の通り。

- 入力
- グラフ G = (V,E)
- W(a,b):頂点 a から頂点 b(a,b∈V)を結ぶ辺の重み(コスト)。辺が存在しないときは W(a,b)=∞
- 頂点 s (s∈V)
- 出力
- 頂点 s から頂点 v までの最小コスト d(v) (v∈V)
- 頂点 s から頂点 v までの最小コスト経路において、頂点 v の一つ前の頂点 p(v) (v∈V)

擬似的なアルゴリズムは以下の通り。

1. X=V とする
2. 最小コスト d(v)(v∈V)を用意し、全ての v において d(v)=∞ と初期化、p(v) (v∈V) を用意し、全ての v において p(v)=v と初期化する
3. d(s)=0 とする
4. X=X-{s} とする
5. X の全ての点 v (v∈X) に対して以下の式の通りにコストを計算する。

   d(v) = min(d(v),d(s)+W(s,v))

6. 5.の式において、第２項の方が小さいならば、p(v)=s とする。
7. X={} (|X|=0) ならば、d(v),p(v)を出力して終了する
8. d(s) = min{d(v)|v∈X} となる s を求め、4.に戻る

計算量は n=|V|とした時、5.~8.の処理が 1+2+・・・+n 回行われるため、O(|V|<sup>2</sup>)となる。

例として以下のグラフで、頂点 A から他の全ての点までの最短経路を求めてみる。

![](/assets/note/programming/301_procon/dijkstra/dijkstra1.png)

まずは始点となる A のコストを 0、その他の頂点のコストを ∞ とする。また、A をコスト確定済みとして X に加える。

(図中、頂点内の左にその頂点のコスト、右にその頂点までの最小コスト経路における直前の頂点を記載する。またコスト確定した頂点(X から除いた頂点)を黄色く、コストが確定していない頂点を白く表示する。)

![](/assets/note/programming/301_procon/dijkstra/dijkstra2.png)

次に、A から各頂点のコスト及び直前の頂点を計算する。この時、A に隣接する頂点はコストが下図のように定まる。

![](/assets/note/programming/301_procon/dijkstra/dijkstra3.png)

次に、コストが確定していない頂点(上図で白の頂点)からコストが最も小さい頂点を選び、その頂点をコスト確定とする。

この場合は頂点 B が該当する。

![](/assets/note/programming/301_procon/dijkstra/dijkstra4.png)

ここから頂点 B に隣接しコスト確定していない頂点に対してコストを計算する、という一連の動作を全ての頂点のコストが確定するまで行っていくと、最終的には以下の図のようになり、始点 A から全ての頂点までの最小コスト及び経路が求められる。

![](/assets/note/programming/301_procon/dijkstra/dijkstra5.png)

コードによる実装例は以下の通り。(Python)

```python
INF=float("inf")

#始点,頂点の数,辺(頂点ごとの隣接行列)
def dijkstra(start,v,e):
    pre=[i for i in range(v)]
    x=set([i for i in range(v)])
    dist=[INF for _ in range(v)]

    dist[start]=0

    s=start
    while(len(x)>0):
        x.remove(s)

        min_x=-1
        min_dx=float("inf")
        for xi in x:
            if(dist[xi]>dist[s]+e[s][xi]):
                dist[xi]=dist[s]+e[s][xi]
                pre[xi]=s

            if(min_dx>dist[xi]):
                min_dx=dist[xi]
                min_x=xi

        s=min_x

    return dist,pre

#例題のデータ
edge=[[INF,2  ,5  ,6  ,INF],
      [2  ,INF,1  ,INF,9  ],
      [5  ,1  ,INF,INF,10 ],
      [6  ,INF,INF,INF,4  ],
      [INF,9  ,10 ,4  ,INF]]
print(dijkstra(0, 5, edge))
```

実行結果

```
([0, 2, 3, 6, 10], [0, 0, 1, 0, 3])
```
