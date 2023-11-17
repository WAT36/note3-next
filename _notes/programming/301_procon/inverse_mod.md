---
title: "合同式(mod)・逆元"
date: "2019-11-09T18:01:30+09:00"
excerpt: "合同式(mod)・逆元について"
tag: ["Python"]
updatedAt: "2019-11-09T18:01:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
---

最近知ったのだが、今は高校数学の課程に合同式が入っているそうだ。

自分はゆとり世代ゆえ正式には学んでない（予備校で少し出てきたことはあったが曖昧）ので、改めて学び直してみた。

同時に、競プロに関係する事項も。

## 合同式(mod)

合同式とは以下の定義。

<hr>

a,b を整数、m を自然数とした時、

「a を m で割った余り」と「b を m で割った余り」が等しいことを以下の式で表す。

$$
\tag{1}
a  \equiv b \pmod{m}
$$

この式を**合同式**という。

<hr>

プログラムで表現するなら

```
a%m == b%m
```

である。

## 合同式の定理

合同式には定理がいくつかある。

### 合同式の和

整数 a,b,c,d、自然数 m において　 a≡b (mod m) ,c≡d (mod m) の時、以下の式が成立する。

$$
\tag{2}
a+c  \equiv b+d \pmod{m}
$$

### 合同式の差

同様に、整数 a,b,c,d、自然数 m において　 a≡b (mod m) ,c≡d (mod m) の時、以下の式が成立する。

$$
\tag{3}
a-c  \equiv b-d \pmod{m}
$$

### 合同式の積

同様に、整数 a,b,c,d、自然数 m において　 a≡b (mod m) ,c≡d (mod m) の時、以下の式が成立する。

$$
\tag{4}
ac  \equiv bd \pmod{m}
$$

以上の式より、

$$
\tag{5}
a+c  \equiv b+c \pmod{m} \\
a-c  \equiv b-c \pmod{m} \\
ac  \equiv bc \pmod{m}
$$

も成立し、これらの式から、合同式は移項・乗法も可能である。

### 合同式のべき乗

整数 a,b、自然数 m において　 a≡b (mod m) の時、以下の式が成立する。

$$
\tag{6}
a^n  \equiv b^n \pmod{m}
$$

#### (証明)

整数 a,b,c,d を、自然数 m と整数 p,q,r,s,t,u を用い、以下のように定義する。

$$
a = pm + t \\
b = qm + t \\
c = rm + u \\
d = sm + u
$$

この時、

$$
a  \equiv b \pmod{m} \\
c  \equiv d \pmod{m}
$$

であり、また

$$
\begin{aligned}
a+c  &= (p+r)m + (t+u) \\
b+d  &= (q+s)m + (t+u) \\
a-c  &= (p-r)m + (t-u) \\
b-d  &= (q-s)m + (t-u) \\
ac   &= (prm + pu+tr)m + tu \\
bd   &= (qsm + qu+st)m + tu \\
a^n  &= (p^{n} m^{n-1} + {}_n \mathrm{C} _1 p^{n-1} m^{n-2} t + \cdots + {}_n \mathrm{C} _{n-1} p t^{n-1})m + t^n \\
b^n  &= (q^{n} m^{n-1} + {}_n \mathrm{C} _1 p^{n-1} m^{n-2} t + \cdots + {}_n \mathrm{C} _{n-1} p t^{n-1})m + t^n
\end{aligned}
$$

である。これらより、

$$
\begin{aligned}
a+c  & \equiv b+d & \pmod{m} \\
a-c  & \equiv b-d & \pmod{m} \\
ac   & \equiv bd  & \pmod{m} \\
a^n  & \equiv b^n & \pmod{m}
\end{aligned}
$$

が成立する。

### 合同式の除法

整数 a,b,c、 自然数 m において　 ab≡ac (mod m) の時でかつ**a と m が互いに素**の時、以下の式が成立する。

$$
\tag{7}
\begin{aligned}
ab  & \equiv ac & \pmod{m} \\
\Leftrightarrow　b  & \equiv c & \pmod{m}
\end{aligned}
$$

#### (証明)

ab≡ac (mod m)　、かつ a と m が互いに素の時において

$$
\tag{8}
\begin{aligned}
ab  & \equiv ac & \pmod{m} \\
\Leftrightarrow　ab-ac   & \equiv 0 & \pmod{m} \\
\Leftrightarrow　a(b-c)  & \equiv 0 & \pmod{m}
\end{aligned}
$$

となり、この式において、a(b-c)と 0 は m で割った余りが同じであり、0 を m で割った余りは 0 なので、a(b-c)を m で割った余りも 0、つまり a(b-c)は m で割り切れる(=m の倍数)ということになる。

a と m は互いに素なので、b-c が m の倍数という事になる。

これより、(b-c)≡0 (mod m)が成立するので、

$$
\tag{9}
\begin{aligned}
(b-c)  & \equiv 0 & \pmod{m} \\
\Leftrightarrow　b   & \equiv c & \pmod{m}
\end{aligned}
$$

となり、a と m が互いに素で ab≡ac (mod m)の時、b≡c (mod m)が成立する。

ちなみに、a と m が互いに素ではない時、(b-c)が m の倍数でない場合があるため、これは成立しない。

<hr>

以上が、合同式についての定義及び定理の紹介である。

これらを踏まえ、次に逆元についてを述べる。

## 逆元

mod を使った方程式を解いてみることを考える。例えば a,b を整数、m を自然数とした、以下のような式があったとする。

$$
\tag{10}
ax  \equiv b \pmod{m}
$$

この式で x を求めるにはどのようにすれば良いのだろうか。

この時、

$$
\tag{11}
ay \equiv 1 \pmod{m}
$$

となるような整数 y が存在した場合、合同式の積の定理から、

$$
\tag{12}
\begin{aligned}
x & \equiv x & \pmod{m} \\
\Leftrightarrow 1 \cdot x & \equiv ay \cdot x & \pmod{m} \\
\Leftrightarrow x & \equiv y \cdot ax & \pmod{m}
\end{aligned}
$$

$$
\tag{13}
\begin{aligned}
ax & \equiv b & \pmod{m} \\
\Leftrightarrow y \cdot ax & \equiv y \cdot b & \pmod{m}
\end{aligned}
$$

が成り立つ。これより、

$$
\tag{14}
\begin{aligned}
x & \equiv y \cdot ax & \pmod{m} \\
  & \equiv y \cdot b & \pmod{m}
\end{aligned}
$$

と求めることができる。

このように、a,m に対して

$$
\tag{15}
ay \equiv 1 \pmod{m}
$$

となるような整数 y のことを、a の**逆元**といい、大体は a<sup>-1</sup>と書く。

$$
\tag{16}
a \cdot a^{-1} \equiv 1 \pmod{m}
$$

また、式(10)において、a,m が互いに素でない場合以下のように書き換えることもできる。

$$
\tag{17}
\frac{ax}{gcd(a,m)}  \equiv \frac{b}{gcd(a,m)} \pmod{ \frac{m}{gcd(a,m)} }
$$

ここで、gcd(a,m)は a と m の最大公約数である。

式(14),(16),(17)より、式(10)の解は

$$
\tag{18}
x  =  \left(\frac{a}{gcd(a,m)}\right)^{-1} \cdot \frac{b}{gcd(a,m)} +  k \cdot \frac{m}{gcd(a,m)} \pmod{ m }
$$

となる。ただし k は 0 ≦ k ≦ gcd(a,m)を満たす整数である。

## フェルマーの小定理

p が素数の時、任意の整数 x に対して

$$
\tag{19}
x^p  \equiv x \pmod{p}
$$

が成り立つ。

特に x が p で割り切れない場合(互いに素)の時は、合同式の除法より

$$
\tag{20}
x^{p-1}  \equiv 1 \pmod{p}
$$

が成り立つ。

式(20)より

$$
\tag{21}
x \cdot x^{p-2}  \equiv 1 \pmod{p}
$$

となるので、p が素数の時、整数 x の逆元は x<sup>p-2</sup>であることもわかる。

<!--
## オイラーの定理

フェルマーの小定理はpが素数の時のみ使える定理であった。pが素数でない(合成数)時はどのようにすれば良いのだろうか。

実はpが素数でない時は、**オイラーの定理**という定理が適用できる。

合成数pを

$$
\tag{22}
p = p_{1}^{e_{1}} p_{2}^{e_{2}} \cdots p_{n}^{e_{n}}
$$

と表した時、オイラー関数φ(p)を以下のように定義する。

$$
\tag{23}
\phi(p) = p \prod_{i=1}^n \frac{p_{i}-1}{p_{i}}
$$

式(23)は、実はp以下のpと互いに素な自然数の個数と等しくなる。

またこの時、pと互いに素な整数xについて、以下の式も成り立つ。

$$
\tag{24}
x^{\phi(p)}  \equiv 1 \pmod{p}
$$

-->
