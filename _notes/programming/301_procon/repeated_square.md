---
title: "繰り返し二乗法"
date: "2019-11-09T19:01:30+09:00"
excerpt: "繰り返し二乗法について"
tag: ["Python"]
updatedAt: "2019-11-09T19:01:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
---

例えば、2<sup>10<sup>100</sup></sup>を計算しようとした時、単純にループで１回ずつ掛け算していくと計算にかなりの時間を要してしまう。

ループで一つずつ計算した場合、x<sup>n</sup>を求めるための計算量は O(n)となる。

この計算量を少しでも減らす方法は無いのだろうか。

その方法の一つとしてあるのが、**繰り返し二乗法**である。

これは、まず x を２乗して x<sup>2</sup>を、次に x<sup>2</sup>を２乗して x<sup>4</sup>を、さらに x<sup>4</sup>を２乗して x<sup>8</sup>を・・を繰り返していくことで、x<sup>2<sup>i</sup></sup>を求める。

次に、n を 2 進数で表し、i 桁目が 1 になっているものに対して、x<sup>2<sup>i</sup></sup>を掛け合わせていく。それの最終的な結果が、x<sup>n</sup>となる。

これにより、計算量は O(log<sub>2</sub>n)まで削減できる。

しかし、注意して欲しいのが、いくらこの方法で計算量は削減できると言っても、かなり大きな数を計算しようとした時は、大きな数同士の掛け算を何回かすることにより計算時間がかかってしまうことに変わりはないということである。

競技プログラミングでは大きな数を計算するときに「1000000007 で割った余りを求めよ」と指定されていることが多い。このようにすることで 1000000007 以下の数字のみ計算に使用することになるので、計算量は通常よりも削減可能になる。そのため、繰り返し二乗法の計算には、途中で剰余を求める計算も組み入れることが多い。

[コード](https://github.com/WAT36/python/blob/master/procon/repeated_square.py)例を以下に示す。

```python
#x^nを繰り返し二乗法で求める関数
#結果が大きくなるような数を入力すると大きすぎる数を計算しようとしてエラーになりやすい

#実際に使うときは、MOD=10000007 などの剰余計算を組み込んで使うこと！
MOD=(10**9)+7

def repeated_square(x,n):
    #nを2進数で表して順序反転
    bit_n=bin(n)[2:][::-1]

    ans=1
    ni=x

    if(bit_n[0]=="1"):
        ans*=ni

    for i in range(1,len(bit_n)):
        ni=((ni%MOD)*(ni%MOD))%MOD

        #i桁目が1なら、x^(2^i)を加える
        if(bit_n[i]=="1"):
            ans=((ans%MOD)*(ni%MOD))%MOD

    return ans
```
