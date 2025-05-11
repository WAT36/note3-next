---
title: "例外の明示的な発生"
date: "2019-10-30T02:37:30+09:00"
excerpt: "例外を明示的に発生する方法について"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-30T02:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

例外(エラー)は実行時にコードの不備によりに起こるのみではなく、（コード中で）自分で意図的に発生させることもできる。ここではその方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
throw new Exception();
// または
Exception e = new Exception();
throw e;
```

Java では**throw**文を使うことで指定した例外を発生することができる。

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

```python
raise Exception()
```

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
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
throw new Error();
```

Javascript でも**throw**文を使うことで指定した例外を発生することができる。

上記の例では Error オブジェクトだが、それ以外の例外オブジェクトを指定することも可能である。

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```go
panic("エラーメッセージ")
```

Go では**panic**という定義済み関数があり、利用すると即座にランタイムパニック（ランタイムエラー）が発生し、実行中の関数は中断される。さらに、呼び出し元の関数も巻き込んで、プログラム全体が終了する。

panic はコードにおいて、これ以上処理を継続しようがない状態を表すために使用されます。決して、アプリケーション上の一般的なエラー処理などで使用するものではありません。

panic を利用するとコードの処理は終了しますが、defer 文で宣言された内容はその後に実行されます。

</div>
