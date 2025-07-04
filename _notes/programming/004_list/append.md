---
title: "リストに要素を加える"
date: "2019-10-23T19:35:30+09:00"
excerpt: "リストに要素を加える方法。"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-23T19:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

リストに要素を加える方法についてを示す。

(配列に関しては固定長のため、要素を加えるというのは基本ないため、ここでは述べない。)

<div class="note_content_by_programming_language" id="note_content_Java">

```java
// 末尾に追加
リスト.add(追加する値)
// 指定した位置に追加
リスト.add(追加する位置,追加する値)
```

Java では List クラスに **add()** というメソッドがあり、引数の要素をリストの最後に追加する。  
`boolean add(E e)`  
型の問題などで要素を追加できない時はエラーとなる。  
また、オーバーロードとしてリストの指定した位置に要素を追加する add メソッドもある。  
`void add(int index, E element)`  
実行例を以下に示す。

```java
import java.util.ArrayList;
import java.util.List;
class Main{
  public static void main(String args[]){
    List<Integer> l = new ArrayList<Integer>();
    l.add(1);
    l.add(3);
    l.add(1,100);

    for(int i=0;i<l.size();i++){
        System.out.println(l.get(i));
    }
  }
}
```

実行結果

```
> java Main
1
100
3
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
# 末尾に追加
リスト.append(追加する値)
# 指定した位置に追加
リスト.insert(追加する位置,追加する値)
```

Python ではリストの関数として

- リストの末尾に要素を追加したい場合は**append()**
- リストの末尾以外の指定した位置に要素を追加したい場合は**insert()**

の関数があるので、適宜使い分ける。  
(リストの末尾に要素 x を追加したい時)  
`list.append(x)`  
(リストの指定した位置 i に要素 x を追加したい時)  
`list.insert(i, x)`

```python
>>> a=[]
>>> a.append(1)
>>> a.append(3)
>>>
>>> a
[1, 3]
>>>
>>> a.insert(1,100)
>>> a
[1, 100, 3]
>>>
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
// 指定した位置に追加
Array.splice(指定位置, 0, 追加する要素何個でも);
// 先頭に追加
Array.unshift(要素);
// 末尾に追加
Array.push(要素);
```

Javascript では Array オブジェクトの**unshift**,**push**メソッドで、Array オブジェクトの先頭、末尾に要素を追加できる。

また、Array オブジェクトに**splice**メソッドも存在し、これは Array オブジェクトの指定した位置から指定した要素数を削除し、そこを指定した要素で置き換えるというメソッドである。

ここで、削除する要素数を 0 とすれば、Array オブジェクトの指定した位置に指定した要素を挿入することができる。

使用例を以下に示す。

```javascript
let arr = [1, 2, 3, 4, 5];
arr.push(6);
console.log(arr); // [1, 2, 3, 4, 5, 6]
arr.unshift(0);
console.log(arr); // [0, 1, 2, 3, 4, 5, 6]
arr.splice(2, 0, "new", "added");
console.log(arr); // [0, 1, 'new', 'added', 2, 3, 4, 5, 6]
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```go
append(スライス,要素[何個でも可])
```

Go ではスライスに対し、関数**append**を使ってスライスの末尾に要素を追加することができる。

追加する要素は何個でも指定できる。

なお、append 関数を使う場合は、必ず:=か=による変数の代入が必要であるので注意。

```go
s := []int{1,2,3}
s = append(s,4,5,6)
fmt.Println(s) //[1,2,3,4,5,6]
```

</div>
