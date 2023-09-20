---
title: "例外の明示的な発生"
date: "2019-10-30T02:37:30+09:00"
excerpt: "例外を明示的に発生する方法について"
tag: ["Java", "Python"]
programming: ["Java", "Python"]
updatedAt: "2019-10-30T02:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

例外(エラー)は実行時にコードの不備によりに起こるのみではなく、（コード中で）自分で意図的に発生させることもできる。ここではその方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

Java では**throw**文を使うことで指定した例外を発生することができる。

使用例

```
throw new Exception();

Exception e = new Exception();
throw e;
```

実行例を以下に示す。

```java
class Main{
  public static void main(String args[]){
    try{
      throw new Exception();
    }catch(Exception e){
      System.out.println(e.getMessage());
    }
  }
}
```

実行結果

```
> java Main
null
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

Python では**raise**文を使うことで指定した例外を発生する事ができる。

```python
>>> raise NameError("例外発生!")
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: 例外発生!
>>>
>>> try:
...     raise NameError("例外発生!")
... except NameError:
...     print("NameError発生!")
...
NameError発生!
>>>
```

</div>
