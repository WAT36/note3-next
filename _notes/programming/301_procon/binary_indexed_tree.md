---
title: "Binary Indexed Tree"
date: "2019-11-09T06:01:30+09:00"
excerpt: "Binary Indexed Treeについて"
tag: ["Python"]
updatedAt: "2019-11-09T06:01:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
---

Binary Indexed Tree(BIT)は、セグメント木を応用したデータ構造で、リスト(数列)a<sub>n</sub>が与えられた時、次のことが行える。

- i が与えられた時、a<sub>1</sub>...a<sub>i</sub>の和を計算する。
- i,x が与えられた時、a<sub>i</sub>+=x とする。

BIT をどのように表すかだが、セグメント木と同様に、リストの各要素を木の葉の要素にならべる。

例として、以下のリストを BIT で表すと、以下のような図で表される。

```python
a=[5,2,3,7,4,1,9,10]
```

![](/assets/note/programming/301_procon/binary_indexed_tree/bit1.png)

BIT では、節点の値にその節点が示す区間の値の和を設定する。

ここから、例えば i=5 を入力した時、a<sub>1</sub>〜a<sub>5</sub>までの和を求めるが、この求め方もセグメント木の時と同様に、a<sub>1</sub>〜a<sub>5</sub>の区間を示す節点を取り出してきて、その値の和を求めれば良い。この例の時、以下のような図で表され、和は 17+4=21 が返る。

![](/assets/note/programming/301_procon/binary_indexed_tree/bit2.png)

ここで、BIT においては、区間内の和を示しているので、実は各節点の 2 つ目の子になっている節点は必要ないことがわかる。(i が与えられた時は 2 つ目の子の要素は計算に使わない。i,x が与えられた時で a<sub>i</sub>が親節点の 2 つ目の子になっていた場合、a<sub>i</sub>を示す節点の値を書き換えなくても、その親節点から上の接点の要素を書き換えれば、その他の計算には影響を与えないため。)

そのため、BIT は以下のようにも置き換えられる。

![](/assets/note/programming/301_procon/binary_indexed_tree/bit3.png)

この図で、灰色の節点は必要のない節点を表す。

ここで、BIT を表すリスト(及び配列)と BIT の節点を以下の図のように対応づける。

![](/assets/note/programming/301_procon/binary_indexed_tree/bit4.png)

ここで、リストのインデックスを２進数で表したとき、２進数の 1 桁目が 1 のところは一番深いところの要素(要素 1 つ分の区間の節点)を表し、その 1 つ上の要素はリストのインデックス(２進数)の 1 桁目が 1 で 2 桁目が 1 である・・・というように表せる。BIT では、この性質を用いて計算をすることが多い。

ではまず、このデータ構造を用いて、「i が与えられた時、a<sub>1</sub>...a<sub>i</sub>の和を計算する」方法を以下に示す。

a<sub>i</sub>までの和を求めるには、i の２進数表記の数を利用して、以下のように行う。

1. a[i]の値を加える。
2. i の２進数表記において、一番下の"1"を減算する。(i -= i & -i)
3. i==0 なら 1.で加えた値を出力して終了する。そうでない場合は 1.へ戻る

例えば i=7 の時は以下の通り。

![](/assets/note/programming/301_procon/binary_indexed_tree/bit5.png)

次に、「i,x が与えられた時、a<sub>i</sub>+=x とする。」方法だが、これは先ほどと逆で、i に一番下の"1"を加算していく。以下にその手順を示す。

1. a[i]に x を加える。
2. i==len(a)なら、1.で加えた値を出力して終了する。
3. i の２進数表記において、一番下の"1"のビットに 1 を加算する。(i += i & -i)

例えば i=5 の時は以下の通り。

![](/assets/note/programming/301_procon/binary_indexed_tree/bit6.png)

では、これら一連のデータ構造と動作をコードで実装してみよう。例を以下に示す。

```python
class BinaryIndexedTree:
    def __init__(self,a):
        #BITを表すリストaを入力
        #ただしaの長さは2**nとする
        #数合わせのためにa[1]~a[len(a)]をBITとする
        self.bit=[0]
        self.bit.extend(a)

    def sum(self,i):
        ans=0
        while i>0:
            ans+=self.bit[i]
            i -= i & -i
        return ans

    def add(self,i,x):
        while i<len(self.bit):
            self.bit[i]+=x
            i += i & -i
```

例で用いた BIT をこのコードに入力すると、以下のようになる。

```python
a=[5,7,3,17,4,5,9,41]
bit_a=BinaryIndexedTree(a)

#i=7までのaの和
print("a[7]までの和:{}".format(bit_a.sum(7)))

print("加える前のBIT:{}".format(bit_a.bit[1:]))

#a[5]に1を足す
bit_a.add(5,1)

print("加えた後のBIT:{}".format(bit_a.bit[1:]))
```

実行結果

```plaintext
a[7]までの和:31
加える前のBIT:[5, 7, 3, 17, 4, 5, 9, 41]
加えた後のBIT:[5, 7, 3, 17, 5, 6, 9, 42]
```
