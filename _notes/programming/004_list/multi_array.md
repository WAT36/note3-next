---
title: "多次元配列"
date: "2019-10-19T19:35:30+09:00"
excerpt: "多次元配列を定義する方法。"
tag: ["Java", "Javascript"]
programming: ["Java", "Javascript"]
updatedAt: "2019-10-19T19:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

多次元配列とは、配列の中に同じ長さの配列を複数含ませたデータ構造のことである。

<div class="note_content_by_programming_language" id="note_content_Java">

Java において、例として二次元配列を設定するには以下の形式で宣言する。

```java
データ型[][] 配列名 = new データ型[要素数][要素数];
```

配列の次元数を増やしたい場合は、かっこ[]の数をその数になるように増やして設定する。

配列への値の代入及び取得は、同様にインデックスを指定して行う。ただし、次元の数に注意する。

ここでは、使用例を以下に記載する。

```java
class Main{
    public static void main(String args[]){
        int[][] table = new int[3][4];

        for(int i=0;i<table.length;i++){
            for(int j=0;j<table[i].length;j++){
                table[i][j] = i+j;
                System.out.print(table[i][j]+" ");
            }
            System.out.println();
        }
    }
}
```

実行結果

```
$ java Main
0 1 2 3
1 2 3 4
2 3 4 5
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

Javascript では以下の形式で宣言する。なお、Javascript では Java とは違い、配列内に入る配列の長さは全て等しくなくても良い。また、宣言時に初期値も入力できる。

```javascript
var 配列名 = [[]];
```

配列への値の代入及び取得は、Java と同じようにインデックスを指定して行えば良い。ただし、こちらも次元には注意する。

</div>
