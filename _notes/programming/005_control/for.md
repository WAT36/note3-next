---
title: "for文"
date: "2019-10-27T16:36:30+09:00"
excerpt: "for文について"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-27T16:36:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

繰り返し処理を行う制御構文の一つ、for 文について各言語での利用法を示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
for(初期化式;条件式;変化式){
    //処理
}
```

Java での記法は上記の通りで、フローは以下の通り。

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

```python
for 変数 in シーケンス値
```

Python にも for 文はあるが、Java の時とは違い初期値や条件は設定しない。  
Python では、リストなどのシーケンス型の値を用いてループ処理を実装する。記法は上記の通り。

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

```javascript
for (初期化式; 条件式; 変化式) {
  //処理
}
// 連想配列、配列等は以下形式も可能
// for ( 仮変数 in 連想配列 ){...}
// for ( 仮変数 of 配列(列挙可能なオブジェクト) ){...}
```

Javascript での for 文も、Java と記法・フロー共に同じである。

応用として、連想配列は`for(... in ... ){}`、配列などの列挙可能なオブジェクトに関しては`for(... of ...){}`の形式も可能である。

以下に例を示す。

```javascript
// for ... in ...
var points = {
  sato: 100,
  yamada: 90,
  suzuki: 80,
};

for (var key in points) {
  console.log(`${key}:${points[key]}点`);
}

// for ... of ...
var fruits = ["apple", "orange", "banana"];

for (var value of fruits) {
  console.log(value);
}
```

実行結果

```
sato:100点
yamada:90点
suzuki:80点
apple
orange
banana
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
for 初期化式;条件式;変化式 {
  // 処理文
}

// 範囲節
for 配列のインデックス, 配列の要素 := range 配列 {
  // 処理文(配列の要素を頭から順にループ)
}
```

Go での for 文の利用方法は上記の通り。

なお初期化式等は省略することもでき、全部省略した場合は無限ループとなる。

```go
for i := 0; i < 10; i++ {
  // 変数iの値が0から9までの間で繰り返し
}
```

# 範囲節(range)

範囲節(range)を使ってループする方法もある。

上記にあるような、range を使って、配列内の要素を順にループすることができる。

例を以下に記載する。

```go
fruits := [3]string{"Apple","Banana","Cherry"}

for i,s := range fruits {
  fmt.Printf("fruits[%d]=%s\n",i,s)
}
```

実行結果

```
fruits[0]=Apple
fruits[1]=Banana
fruits[2]=Cherry
```

なお、配列ではなく文字列を使うこともできる。

しかしその場合、文字列をループしたときに出る値は１文字分の rune 型になるので注意。

```go
for i,r := range "ABC" {
  fmt.Printf("[%d] -> %d\n",i,r)
}
```

実行結果

```
[0] -> 65
[1] -> 66
[2] -> 67
```

また、チャネルにも利用することができる。

利用すると、チャネルからひたすら受信し続ける事を行う。

```go
ch := make(chan int,3)
ch <- 1
ch <- 2
ch <- 3

for i := range ch {
  fmt.Println(i)
}
```

実行結果

```
1
2
3
fatal error: all goroutinnes are asleep - deadlock!
```

</div>
