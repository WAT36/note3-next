---
title: "指定文字列が含まれているかを確認する"
date: "2019-10-15T19:27:48.000Z"
excerpt: "文字列中にある文字列が含まれているかを確認する方法。"
tag: ["Java", "Python", "Javascript"]
programming: ["Java", "Python", "Javascript"]
updatedAt: "2019-10-15T19:27:48.000Z"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

文字列中に特定の文字列を含んでいるかを確認したい場合どうするか？
ここではその方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
class Main{
    public static void main(String args[]){
        String s = "apple,banana,cherry,durian";
        System.out.println(s.contains("banana"));

        System.out.println(s.contains("grape"));
    }
}
```

Java で文字列中にある文字列が含まれているかを確認するには String のメソッドである **contains()** を利用する。

`public boolean contains(String s)`

呼び出し元の文字列中に引数に指定した文字列が含まれていれば true、そうでない場合は false を返す。

実行結果

```
$ javac Main.java
$ java Main
true
false
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

python で文字列中にある文字列が含まれているかを確認するには **in** 演算子を使う。

文字列 A 中に文字列 B が含まれているか確認したい場合は以下のようにする。

`文字列B in 文字列A`

含まれていると True、そうでない場合は False を返す。

```python
>>> s = "apple,banana,cherry"
>>>
>>> "banana" in s
True
>>>
>>> "grape" in s
False
>>>
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```
(元の文字列).includes(検索する文字列 [,位置])

// 指定文字列で始まるか終わるかを判別したい場合は以下も可
(元の文字列).startsWith(検索する文字列 [,位置])
(元の文字列).endsWith(検索する文字列 [,位置])
```

Javascript では **String.includes()** メソッドで判別が行える。利用方法は上記の通り。

また、文字列が指定した文字列で始まるか、終わるかを判別したい場合は、 **String.startsWith()** と **String.endsWith()** も利用できる。

この方法で、ある文字列に指定した文字列が含まれているかを判別でき、含まれていると true、そうでない場合は false を返す。

実行結果

```javascript
var s = "apple,banana,cherry";

console.log(s.includes("banana"));
console.log(s.includes("durian"));
```

```
true
false
```

</div>
