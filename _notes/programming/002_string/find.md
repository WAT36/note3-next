---
title: "文字列2が文字列1の何文字目から始まるかを確認する"
date: "2019-10-15T20:19:30.000Z"
excerpt: "文字列中にある文字列が含まれているときにその位置を確認する"
tag: ["Java", "Python", "Javascript"]
programming: ["Java", "Python", "Javascript"]
updatedAt: "2019-10-15T20:19:30.000Z"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

先程の文字列中に指定文字列が含まれるか　の派生で、具体的にその位置を確認したい場合どうするか？

ここではその方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
"文字列１".indexOf("文字列２" [,開始位置])
```

`public int indexOf(String str)`

Java では String のメソッドである **indexOf()** を利用する。

このメソッドは、文字列内で指定された部分文字列が最初に出現する位置のインデックスを返す。

文字列の途中の位置から検索したい場合は下記のメソッドを利用する。

`public int indexOf(String str, int fromIndex)`

このメソッドは文字列の fromIndex 番目以降の文字列で部分文字列が最初に出現する位置のインデックスを返す。

ちなみに部分文字列が存在しない場合は-1 を返す。

```java
class Main{
    public static void main(String args[]){
        String s = "apple,banana,cherry,durian";
        System.out.println(s.indexOf("banana"));

        System.out.println(s.indexOf("banana",10));
    }
}
```

```
$ javac Main.java
$ java Main
6
-1
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
"文字列１".find("文字列２" [,開始位置])

# 文字列の末尾から検索
"文字列１".rfind("文字列２")
```

python では文字列 str の関数**find**関数を使う。

`str.find(sub[, start[, end]])`

sub には検索したい部分文字列を入力する。

実行結果には、str の中で sub が最初に現れる位置のインデックスが返される。

存在しない場合には-1 が返る。

str の指定した範囲内だけで検索したい場合には、引数 start,end に値を指定して実行する。

```python
>>> s = "apple,banana,cherry"
>>>
>>> s.find("banana")
6
>>>
>>> s.find("banana",10)
-1
>>>
```

また、文字列を右から検索する関数**rfind**もある。

```python
>>> s.rfind("banana")
6
>>>
>>> s.find("a")
0
>>> s.rfind("a")
11
>>>
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
"文字列１".indexOf("文字列２" [,開始位置])

// 文字列の末尾から検索
"文字列１".lastIndexOf("文字列２")
```

javascript では文字列 String の関数 **indexOf()** または **lastIndexOf()** 関数を使う。

`String.indexOf(serachvalue[, fromIndex])`

`String.lastIndexOf(serachvalue[, fromIndex])`

indexOf 関数は文字列前方から検索を行い、lastIndexOf 関数は文字列後方から検索を行う。

searchvalue には文字列中で検索したい文字列を入力する。

実行結果には、String の中で searchvalue が最初に現れる位置のインデックスが返される。

存在しない場合には-1 が返る。

String の指定した位置からの範囲内だけで検索したい場合には、引数 fromIndex に値を指定して実行する。

```javascript
let s = "apple,banana,cherry";
console.log(s.indexOf("banana"));
console.log(s.indexOf("banana", 10));
```

実行結果

```
6
-1
```

</div>
