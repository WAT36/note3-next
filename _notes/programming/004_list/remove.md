---
title: "リストの指定した要素を削除する"
date: "2019-10-27T01:35:30+09:00"
excerpt: "リストの指定した要素を削除する方法。"
tag: ["Java", "Python", "Javascript"]
programming: ["Java", "Python", "Javascript"]
updatedAt: "2019-10-27T01:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

リストの指定した要素を削除する方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
リスト.remove(削除する値)
```

Java では List クラスにリストの指定した要素を削除するメソッド **remove()** がある。  
`boolean remove(Object o)`  
このメソッドはリストから指定した要素を削除する。複数ある場合は最初のもののみを削除する。

## int のリストで使いたい時は？

int のリストでこのメソッドを使いたい時、先述の「リストの指定したインデックスの要素を削除する」で述べた

`E remove(int index)`

と混同するだろう。しかし List のメソッド remove は int の値を入力した場合、このインデックスから要素を削除する方のメソッドが使われる。  
指定した int の要素を削除したい時はどうするか？

方法は、int のラッパークラス**Integer**を利用する。そのメソッド valueOf を使って int の値を Integer に置き換えて remove メソッドを使うと、前者の指定した要素を削除する remove が使われる。

使用例を以下に示す。

```java
import java.util.ArrayList;
import java.util.List;
class Main{
  public static void main(String args[]){
    List<Integer> l = new ArrayList<Integer>();
    l.add(1);
    l.add(3);
    l.add(-2);
    l.add(100);

    for(int i=0;i<l.size();i++){
        System.out.print(l.get(i) + " ");
    }

    System.out.println();
    l.remove(1);                    //この場合だとl[1]を削除する

    for(int i=0;i<l.size();i++){
      System.out.print(l.get(i) + " ");
    }

    System.out.println();
    l.remove(Integer.valueOf(1));   //この場合だとlで最初に出る「1」を削除する

    for(int i=0;i<l.size();i++){
      System.out.print(l.get(i) + " ");
    }
  }
}
```

実行結果

```
> java Main
1 3 -2 100
1 -2 100
-2 100
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
リスト.remove(削除する値)
```

Python にはリストに指定した要素を削除する関数 **remove()** があるので、これを利用する。  
引数にはリストから削除したい要素を入力する。  
指定した要素がリスト内に複数ある場合は、最初のもののみを削除する。  
リストに存在しない値を入力するとエラーになる。

```python
>>> a=[1,9,8,7,6,5,3,2]
>>>
>>> a
[1, 9, 8, 7, 6, 5, 3, 2]
>>>
>>> a.remove(9)
>>>
>>> a
[1, 8, 7, 6, 5, 3, 2]
>>>
>>> b=[1,1,1]
>>> b
[1, 1, 1]
>>>
>>> b.remove(1)
>>> b
[1, 1]
>>>
>>> b.remove(2)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ValueError: list.remove(x): x not in list
>>>
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
Array.filter((value, index, array) => value !== 指定要素);
```

ここも専用のメソッドは見当たらないため、**filter**メソッドを利用する。

利用するには filter メソッドの引数に関数を入力する。この関数は、引数に value,index,array をおく。value は要素、index はインデックス, array は元の Array オブジェクトを指す。(利用しない場合、index,array は書かなくても良い。)それに応じて、式で value 等に対して条件に合致するなら true を、しない場合は false を返すような処理を作成する。実行後、true が返された要素のみで作られた Array オブジェクトが返される。

これを利用し、要素 value が指定した値に合うときに false を返すような式を書けば良い。

実行例を以下に見せる。これは、Array オブジェクト中にある 10 以外の要素のみを取り出すものである。

実行例を以下に示す。

```javascript
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let result = arr.filter((value) => {
  return value !== 10;
});

console.log(result);
// [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

</div>
