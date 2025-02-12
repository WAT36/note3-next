---
title: "文字列を１文字ずつのリストにする"
date: "2019-10-26T23:35:30+09:00"
excerpt: "文字列を１文字ずつのリストにする方法。"
tag: ["Java", "Python", "Javascript"]
programming: ["Java", "Python", "Javascript"]
updatedAt: "2019-10-26T23:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

文字列を 1 文字ずつのリストに変換する方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
import java.util.Arrays;

Arrays.asList("文字列".split("")) // 文字列を１字ずつのリストにしたリストが返される
```

Java では以下２つの手順を踏んで行う。

- 文字列を分割する String. **split()** を利用して文字列を１文字ずつの配列に分割する
- **Arrays.asList()** メソッドを利用して配列をリストに変換する

String.split()は引数に指定した文字列を境に元の文字列を切り分けるメソッドである。引数に空文字""を入力したときは、文字列を１文字ずつに分割する。  
Arrays.asList()は引数に指定した配列を対応するリストに変換するというものである。

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
class Main{

  //List println
  public static void listprint(String name,List<String> l){
    System.out.print(name + ": ");
    for(int i=0;i<l.size();i++){
      System.out.print(l.get(i) + ",");
    }
    System.out.println();
  }

  public static void main(String args[]){

    String s = "apple banana";
    System.out.println(s);

    List<String> l = Arrays.asList(s.split(""));
    listprint("l", l);
  }
}
```

実行結果

```
> java Main
apple banana
l: a,p,p,l,e, ,b,a,n,a,n,a,
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
list("文字列")
```

Python では文字列をそのまま **list()** の引数に指定してやると、文字列を１文字ずつのリストに変換してくれる。

使用例を以下に示す。

```python
>>> s="apple banana"
>>> s
'apple banana'
>>>
>>> list(s)
['a', 'p', 'p', 'l', 'e', ' ', 'b', 'a', 'n', 'a', 'n', 'a']
>>>
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
"文字列".split('')
// または
[..."文字列"]
```

方法は主に 2 つで、まずは文字列の split メソッド。これは文字列を指定した文字を境に分割し Array オブジェクトにすると言うもので、ここで空文字を指定すると 1 文字ずつに分割された Array オブジェクトとなる。

また、スプレッド構文(...)を使うことで、文字列を 1 文字ずつの要素に展開することができ、これを Array オブジェクトにすることで 1 文字ずつの Array オブジェクトにすることができる。

実行例を以下に示す。

```javascript
let str = "abcdefg";
console.log(str.split(""));
console.log([...str]);
```

実行結果

```
['a', 'b', 'c', 'd', 'e', 'f', 'g']
['a', 'b', 'c', 'd', 'e', 'f', 'g']
```

</div>
