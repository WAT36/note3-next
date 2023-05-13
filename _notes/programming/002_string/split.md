---
title: "文字列を分割する"
date: "2019-10-14T20:19:29.000Z"
excerpt: '文字列をある文字(位置)で分割する方法。'
tag: ["Java","Python","Javascript"]
programming: ["Java","Python","Javascript"]
updatedAt: '2019-10-14T20:19:29.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: '/assets/blog/authors/WAT.jpg'
mode: programming
---

文字列に対して、ある文字を境に複数に分割したいという場面もあるだろう。
ここではその方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
import java.util.Arrays;
class Main{
    public static void main(String args[]){
        String s = "apple-banana-cherry-durian--";
        String[] t = s.split("-",-1);
        System.out.println(Arrays.toString(t)); //[apple, banana, cherry, durian, , ]
  
        t = s.split("-",0);
        System.out.println(Arrays.toString(t)); //[apple, banana, cherry, durian]
  
        t = s.split("-",2);
        System.out.println(Arrays.toString(t)); //[apple, banana-cherry-durian--]
    }
}
```

Javaで文字列の分割を行うにはStringのメソッドである**split**を利用する。  

`public String[] split(String regex, int limit)`  

第1引数には分割する際の境目となる文字列を**正規表現**で入力し、  

第2引数には分割を行う回数を入力する。負の数を入力すると無制限に分割を行う。０を入力した場合、分割後の末尾が空白になる場合はそれを格納しない。  

splitメソッドの返り値はString型の配列になるので、結果を格納したい場合はString型の配列を用意する。

実行結果

```
$ javac Main.java 
$ java Main
[apple, banana, cherry, durian, , ]
[apple, banana, cherry, durian]
[apple, banana-cherry-durian--]
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
>>> s = "apple-banana-cherry-durian--"
>>> print(s.split("-",-1))
['apple', 'banana', 'cherry', 'durian', '', '']
>>> print(s.split("-",0))
['apple-banana-cherry-durian--']
>>> print(s.split("-",2))
['apple', 'banana', 'cherry-durian--']
>>>
```

pythonで文字列を分割するには文字列(str)の**split**関数を使う。   

`str.split(sep=None, maxsplit=-1)`   

第1引数sep には区切り文字を入れる。入力しない場合は、デフォルトで空白文字が使われる。またこの時、連続している空白文字は一つの区切り文字として扱われる。  

第2引数maxsplitには分割する回数を入力する。-1の場合、無制限に分割する。入力しない場合はデフォルトで-1が入る。  

戻り値はリストになる。

また、改行文字で分割したいときは **splitlines()** 関数を利用する。

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
var s = "apple-banana-cherry-durian--"
let sp = s.split('-');

console.log(sp)
```

Javascriptで文字列を分割するにも同様に**split**関数を使う。   

`文字列.split(区切り文字[,最大分割回数])`   

実行結果

```
["apple", "banana", "cherry", "durian", "", ""]
```

</div>

