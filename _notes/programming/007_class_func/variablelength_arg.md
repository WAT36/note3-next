---
title: "可変長引数の関数"
date: "2019-10-29T06:37:30+09:00"
excerpt: "可変長引数の関数について"
tag: ["Java", "Python", "Javascript"]
programming: ["Java", "Python", "Javascript"]
updatedAt: "2019-10-29T06:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

関数やメソッドを定義するとき、引数の数は事前に定義する必要があり、指定された数以外の数を入力することは普通はできない。

しかし、可変長引数を使うことで、関数やメソッドを任意の個数の引数で利用することができる。

その方法を以下に示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
[アクセス修飾子] [static] [返り値の型] メソッド名(...引数) {
    //処理文
}
```

Java ではメソッドに可変長引数を設定できる仕様がある。

その仕様は以下の通り。

- 引数のデータ型の後に「...」と記述する
- 引数の中で、可変長引数は一番最後に書く
- 可変長引数は１種類しか利用できない
- 可変長引数の値は配列としてメソッドに渡される。

使用例は以下の通り。

```java
class Main{
    public static String calendar(String... s){
        String d = s[0]+"/"+s[1]+"/"+s[2];
        return d;
    }

    public static void main(String args[]){
        Main m = new Main();
        System.out.println(m.calendar("2020","7","19"));
    }
}
```

実行結果

```
$ javac Main.java
$ java Main
2020/7/19
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
def 関数名(*可変長引数):
    # 処理
```

Python では関数を定義するときに引数の頭に\*を付けたリストのアンパック型にすると、その部分に入力された値はその引数(タプル)の要素として扱われることになる。アンパック型なので、引数はいくらでも入れられることになり、結果これで可変長引数が実現できることになる。

実装例

```python
def variable_args(*args,sep="/"):
    print(args)
    print(sep.join(args))
```

実行結果

```
>>> variable_args('2020','7','18')
('2020', '7', '18')
2020/7/18
>>>
>>> variable_args('2020','7')
('2020', '7')
2020/7
>>>
>>> variable_args('2020')
('2020',)
2020
>>>
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
function 関数名() {
  console.log("引数：" + arguments);
  console.log("引数の数：" + arguments.length);
}
```

javascript においては、関数の引数は**arguments**オブジェクトに入るという仕様がある。arguments オブジェクトは、関数内でのみ利用できる特別なオブジェクトである。

実は javascript では関数の引数をチェックしないという仕様があり、関数の定義時の引数と違う引数を入力してもエラーは発生しない。

しかし、入力した引数はこの arguments オブジェクトに入るので、引数を利用したい場合はこれを利用する。

</div>
