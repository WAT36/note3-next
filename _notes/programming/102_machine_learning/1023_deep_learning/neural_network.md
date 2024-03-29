---
title: "ニューラルネットワーク"
date: "2019-11-06T00:01:30+09:00"
excerpt: "ニューラルネットワークについて"
tag: ["Python"]
updatedAt: "2019-11-06T00:01:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
---

ニューラルネットワークとは、人間の神経細胞を模した数理モデルである**ニューロンモデル**を利用した機械学習のアルゴリズムである。

ニューロンモデルを幾層にも組み合わせて計算を行なっていく方法で、より多くのニューロンモデルを使用した物は**ディープラーニング**とも呼ばれる。

## 神経細胞

人間の脳にある神経細胞は核と軸索と呼ばれる部位からなり、軸索の先をシナプスと呼ばれるインターフェースで別の神経細胞に繋げる形で幾つにも繋がっている。

神経細胞は、他の細胞から電気的なパルスを受け取り、また対応するシナプスの状態によりその電気パルスをどれほど受け取るか(シナプス伝達強度)が違ってくるため、神経細胞内の電位(膜電位)が大きく変化したりする。

そして、膜電位がある一定の値(閾値)を超えると、その神経細胞は次の神経細胞へ、電気的なパルスを発信する。それが連続された構造になっている。(下図)

![](/assets/note/programming/102_machine_learning/1023_deep_learning/neural_network/Figure_41.png)

## ニューロンモデル

ニューロンモデルは、この神経細胞の動きを模した数理モデルで、下図のように表される。

![](/assets/note/programming/102_machine_learning/1023_deep_learning/neural_network/Figure_42.png)

入力値は、正も負も値を取る実数(図中の $x_{0}〜x_{n-1}$ )とし、それぞれにシナプス伝達強度とした**重み**(図中の $w_{0}〜w_{n-1}$ )をかける。そしてその和を取ったものを**入力総和**(図中の a)として計算する。

$$
\tag{1}  a = w_{0} x_{0} + w_{1} x_{1} + \cdots + w_{n-1} x_{n-1}
$$

なお、図にもあるように、n-1 番目の重みは切片としてそのまま用いるので、 $x_{n-1} = 1$ とする。

$$
\tag{2}  a = w_{0} x_{0} + w_{1} x_{1} + \cdots + w_{n-1}
$$

式(1)は以下のように書き換えられる。

$$
\tag{3}  a = \sum_{i=0}^{n-1} w_{i} x_{i}
$$

そして、この入力総和 a を、シグモイド関数を使って出力値 y に置き換え、出力する。

$$
\tag{4}  y = \frac{1}{1 + \exp(-a) }
$$

この一連の流れは、教師あり学習で出てきたロジスティック回帰に似ており、重みや入力総和によって決定境界が引かれ、それを境に出力が 0 か 1 に別れる、とみることもできる。

例えば、N(入力値の個数)=2、重みを $w_{0}=-2,w_{1}=1,w_{2}=2$ とした場合の出力値 y のグラフは以下のようになる。

（コード類は[こちら](https://github.com/WAT36/python/blob/master/machine_learning/deeplearning/neural_network.ipynb)の Jupyter Notebook にまとめたのでご参考に）

この図より、直線 $-2x_{0} + x_{1} + 2=0 ( w_{0} x_{0} + w_{1} x_{1} + w_{2} x_{2} = 0)$ を境に出力値は 0 か 1 に大きく分かれる事となる。

![](/assets/note/programming/102_machine_learning/1023_deep_learning/neural_network/Figure_43.png)

## ニューラルネットワークモデル

先述のニューロンモデルをいくつも組み合わせた、ニューロンモデルの集合体のモデルのことを**ニューラルネットワークモデル**という。

ニューラルネットワークモデルにはいくつか種類があるが、ここでは一方向にのみ流れる**フィードフォワードニューラルネット**を考える。

ここでは、入力層と出力層の間に中間層が 1 つの**2 層フィードフォワードニューラルネットワークモデル**とする。下に図を示す。

![](/assets/note/programming/102_machine_learning/1023_deep_learning/neural_network/Figure_44.png)

重み行列が 2 つあるので（中間層を第１層、出力層を第２層と呼ぶことからもある）、これから２層フィードフォワードニューラルネットワークモデルと呼ぶ。（入力層も合わせて３層と呼ぶこともある）

中間層には、前述のニューロンモデルと同じように、ダミー入力として常に１の値をとるパラメータを加える。

重み行列**z**において、 $a_{i}$ から $b_{j}$ への重みを $z_{ji}$ とおくと、以下の式が成り立つ。

$$
\tag{5}  b_{j} = \sum_{i=0}^{n-1} z_{ji} a_{i}
$$

中間層では、この式(5)により算出した結果を、シグモイド関数に通すことで出力値を得る。出力値を c、シグモイド関数を h()とおくと、以下の式が成り立つ。

$$
\tag{6}  c_{j} =  h( b_{j} )
$$

ここで、シグモイド関数は入力総和から何らかの出力を決定づける関数ということで、**活性化関数**とも呼ばれている。

次に出力層において、中間層の出力と重み行列から式(5)の計算を行なった最終的な出力値 $b_{i}$ に対して、最後にソフトマックス関数を適用することにより２層フィードフォワードニューラルネットワークモデルの出力値 $y_{i}$ を得る。

$$
\tag{7}  y_{i} = \frac{ \exp(a_{i}) }{ \sum_{j=0}^{K-1} \exp(a_{j}) }
$$

ここまでの一連の処理をコードにまとめてみよう。

と言いたいが、ここに記載するとかなり長くなるので、[こちら](https://github.com/WAT36/python/blob/master/machine_learning/deeplearning/FNN.ipynb)の Jupyter Notebook にコードを記載する。

では、この２層フィードフォワードニューラルネットワークモデルを利用した学習法を考えてみよう。

その方法の一つを、次章で紹介する。
