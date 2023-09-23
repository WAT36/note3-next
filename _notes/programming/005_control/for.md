---
title: "for文"
date: "2019-10-27T16:36:30+09:00"
excerpt: "for文について"
tag: ["Java", "Python", "Javascript"]
programming: ["Java", "Python", "Javascript"]
updatedAt: "2019-10-27T16:36:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

繰り返し処理を行う制御構文の一つ、for 文について各言語での利用法を示す。

<div class="note_content_by_programming_language" id="note_content_Java">

Java での記法は以下の通り。

```
for(初期化式;条件式;変化式){
    //処理
}
```

上記におけるフローは以下の通り。

1. 初期化式を実行する。
2. 条件式を実行し true なら 3,false なら 6 へ行く。
3. for 文の中身の処理が実行される。
4. 変化式が実行される。
5. 2.に戻る
6. 終了する

for 文の中の初期化式、条件式、変化式はコロン(;)で区切る必要がある。区切られてない場合などはコンパイルエラーが発生する。
また、初期化式、変化式は無くても良い。

実行例を以下に示す。

```java
class Main{
  public static void main(String args[]){

    for(int i=0;i<5;i++){
      System.out.println(i);
    }

    int j=0;
    for(;j<5;){
      System.out.println(j);
      j++;
    }
  }
}
```

実行結果

```
> java Main
0
1
2
3
4
0
1
2
3
4
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

Python にも for 文はあるが、Java の時とは違い初期値や条件は設定しない。  
Python では、リストなどのシーケンス型の値を用いてループ処理を実装する。記法は以下の通り。

`for 変数 in シーケンス値`

上記のように書くことで、シーケンス値に入っている値が 1 回のループで頭から順番に 1 個ずつ取り出され、それを元に for 文の処理が実行される。Java の拡張 for 文と似たようなものである。

```python
>>> #0..5のシーケンス型データ作成
>>> range(5)
range(0, 5)
>>>
>>> for i in range(5):
...     print(i)
...
0
1
2
3
4
>>>
>>> #リストで0..5のデータ作成
>>> l = list(range(5))
>>> l
[0, 1, 2, 3, 4]
>>>
>>> for i in l:
...     print(i)
...
0
1
2
3
4
>>>
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

Javascript での for 文も、Java と記法・フロー共に同じである。

記法

```
for(初期化式;条件式;変化式){
    //処理
}
```

</div>
