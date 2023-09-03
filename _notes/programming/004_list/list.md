---
title: "リストの宣言"
date: "2019-10-21T19:35:30+09:00"
excerpt: "リストを宣言する方法。"
tag: ["Java", "Python"]
programming: ["Java", "Python"]
updatedAt: "2019-10-21T19:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

リストを使用する方法を示す。

<div class="note_content_by_programming_language" id="note_content_Java">

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

なお、ArrayList を宣言するときの記法は以下の通り。  
`List<データ型> 変数名 = new ArrayList<データ型>();`

また、java でのリストは基本的に、宣言したデータ型の値しか入れることはできない。
今後、java ではリストは ArrayList であることを前提に記していく。

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

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
