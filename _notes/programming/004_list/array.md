---
title: "配列・リスト"
date: "2019-10-18T19:35:30+09:00"
excerpt: "配列及びリストを定義する方法。"
tag: ["Java", "Python", "Javascript"]
programming: ["Java", "Python", "Javascript"]
updatedAt: "2019-10-18T19:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

ここでは、配列とリストを宣言する方法について述べる。

配列もリストも、値の集合を示すデータ構造であるが、用途や特性に微妙な違いがある。

配列は、一般的に固定長だが、リストは可変長である。その分、配列はメモリ上に連続してデータを格納するため、メモリ効率が高い利点がある。

プログラミング言語により、配列、リストがあったりなかったりするので、片方のみがある言語についてはそちらのみを、両方ある言語については両方を書き記す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
// 配列
データ型[] 配列名 = new データ型[要素数];

// リスト
import java.util.ArrayList;
import java.util.List;

List<データ型> リスト名 = new ArrayList<データ型>();
```

Java では配列は最初から備わっている。リストに関しては、ライブラリ java.util.List を利用する必要がある。

上記の形式で配列・リストを宣言する。

配列の場合は、配列内に指定したデータ型の値を、指定した要素数の数まで入れることができる。

配列への値の代入及び取得は、以下のようにインデックスを指定して行う。

```java
配列名[インデックス] = 値;
変数 = 配列名[インデックス];
```

Java のリストは配列とは全く別のデータ型として定義されてあり、その定義は**java.util.List**クラスにある。  
配列との違いは、配列は宣言時に長さも指定し、基本指定した長さの分しかデータを格納できないのに対し、  
リストは長さを指定せずに宣言でき、かつ好きなだけデータを格納、取り出すことができ、長さは入っているデータにより変わるという、いわば可変長の配列といってもよい。

Java でのリストは**List**クラスをインポートして利用する。  
しかし、List クラスはインターフェースであるため、そのまま使用することはできない。  
使用するには、リストの具体的な定義が書いてあるクラスを List のインスタンスに代入して使う。  
このクラスは複数あるが、ここでは一般的な**ArrayList**クラスを利用する。  
なお、ArrayList も使用するにはインポートする必要がある。  
実行例を以下に示す。

```java
import java.util.ArrayList;
import java.util.List;
class Main{
  public static void main(String args[]){
    List<Integer> l = new ArrayList<Integer>();
  }
}
```

また、java でのリストは基本的に、宣言したデータ型の値しか入れることはできない。
今後、java ではリストは ArrayList であることを前提に記していく。

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
# リストのみ
変数名 = []
変数名 = [1,2] # 初期値を入れた状態でも宣言可能
```

配列・リストに関して、Python には基本「リスト」という概念しかなく、配列は定義されていない。  
他言語でいう配列といったデータ構造は、python の場合この「リスト」にひっくるめられていると考えていい（はず・・・）  
python の場合もリストは長さを指定せずに宣言でき、好きなだけデータを格納、取り出すことも可能、そして長さは入っているデータにより変わる。

Python でリストを宣言するときは変数に角括弧囲いを代入してやればそれがリストとなる。  
また最初にデータを入れた状態でも宣言可能である。

```python
>>> a = []
>>> a
[]
>>>
>>> b = [1,2]
>>> b
[1, 2]
>>>
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
var 変数名 = [(値、カンマ区切りで複数入力可)]
```

Javascript では**Array オブジェクト**と呼ばれるデータ構造が配列・リストとして扱われるものである。

名前からして配列のように見えるが、実は要素を後から追加・削除したりできる可変長なオブジェクトであり、リストのような構造でもある。

上記の形式で Array オブジェクトを宣言する。Java のような要素数の指定は不要である。

Array オブジェクトへの値の代入及び取得は、Java と同じようにインデックスを指定して行う。

```
Arrayオブジェクト名[インデックス] = 値;
変数 = Arrayオブジェクト名[インデックス];
```

</div>

## 配列に値を追加する

言語により概念が異なるが、配列に値を追加する方法についてを述べる。

なお、Java では配列の長さが固定されているので、値を追加するという概念は基本ない。（配列の指定したインデックスに値を入れることは可能）

Javascript では配列の長さは固定されてはおらず、リストのように配列の後ろに値を追加することができる。（じゃあそれはリストではないか？とも考えてはいるが）

<div class="note_content_by_programming_language" id="note_content_Javascript">

Javascript では以下の形式で配列に要素を追加できる。

```
配列.push(要素)
```

</div>
