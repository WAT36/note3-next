---
title: "英字小文字に変換"
date: "2019-10-11T21:40:21.000Z"
excerpt: '英字文字列を全て英字小文字にする方法。'
tag: ["Java","Python","Javascript"]
programming: ["Java","Python","Javascript"]
updatedAt: '2019-10-11T21:40:21.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: '/assets/blog/authors/WAT.jpg'
mode: programming
---


英字の文字列を全て小文字にする方法について。

同じように例えば`"AAA"`という値を`"aaa"`という値に変換したい場合はどうするか。その方法をここで述べる。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
class Main{
    public static void main(String args[]){
      String s = "AAA";

      // 文字列を小文字にする
      s = s.toLowerCase();
    }
}
```

クラスはここではMain.javaとする

JavaではStringクラスに **toLowerCase()** というメソッドがあり、これにより文字列を全て英小文字に変換して表示してくれる。

ただし、これも文字列自体が変換されるわけではないので、反映させたい場合は出力を元の変数に代入してやる必要がある。

変数を出力
```
aaa
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
s = "AAA"
s = s.lower()
```

Pythonは文字列型のstrオブジェクトにメソッド **lower()** があり、これにより文字列を全て小文字にできる。

ただし、これも文字列自体が変換されるわけではないので、反映させたい場合は出力を元の変数に代入してやる必要がある。

変数を出力
```
aaa
```


</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
var s = "AAA"
s = s.toLowerCase();
```

Javascriptではメソッド **toLowerCase()** により文字列を全て小文字にできる。

ただし、これも文字列自体が変換されるわけではないので、反映させたい場合は出力を元の変数に代入してやる必要がある。

変数を出力

```
aaa
```


</div>
