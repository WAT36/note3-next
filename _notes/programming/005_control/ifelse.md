---
title: "if-else文"
date: "2019-10-27T15:36:30+09:00"
excerpt: "if-elseについて"
tag: ["Java", "Python", "Javascript"]
programming: ["Java", "Python", "Javascript"]
updatedAt: "2019-10-27T15:36:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

指定した条件に応じて処理を分岐させる時に使うのが if-else 文である。  
これはほぼ全てのプログラミング言語に実装されている。言語ごとの記法を示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
if(条件1){
    //条件1がtrueならこの処理実行
}else if(条件2){
    //条件1がfalse、条件2がtrueならこの処理実行
}else{
    //条件1,2ともfalseならこの処理実行
}
```

Java での記法は上記の通り。

if,else if 後の()内には boolean 値または boolean を返すような式にする。  
else if は限りなく設けることができる。

実行例

```java
class Main{
  public static void main(String args[]){
    String s = args[0];

    if(s.equals("0")){
      System.out.println("ゼロ");
    }else if(s.equals("1")){
      System.out.println("ひとつ");
    }else{
      System.out.println("それ以外");
    }

  }
}
```

実行結果

```
$ java Main 0
ゼロ
$ java Main 1
ひとつ
$ java Main 2
それ以外
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
if 条件1:
    #条件1がTrueならこの処理実行
elif 条件2:
    #条件1がFalse、条件2がTrueならこの処理実行
else:
    #条件1,2ともfalseならこの処理実行
```

Python での記法は以下の通り。

条件には bool 値またはそれを返す式にする。  
また、if,elif,else の後にはコロン":"をつける。  
elif は限りなく設定できる。

実行例

```python
>>> x = 0
>>>
>>> if x < 0:
...     print("マイナス")
... elif x == 0:
...     print("ゼロ")
... else:
...     print("プラス")
...
ゼロ
>>>
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
if (条件式1) {
  //条件式1がtrueならこの処理実行
} else if (条件式2) {
  //条件式2がtrueならこの処理実行
} else {
  //条件式1,2がfalseならこの処理実行
}
```

Javascript での記法は以下のとおり。

なお、Javascript では、条件式のところに**数値または文字列**及びその値が入った変数を設定することもできる。

数値を設定した場合は、値が 0 の場合 false とみなし、それ以外の値は全て true とみなされる。

文字列の場合は、空文字('')の場合 false とみなされ、それ以外の値の場合は全て true とみなされる。

</div>
