---
title: "ジェネリクス"
date: "2019-11-01T08:37:30+09:00"
excerpt: "ジェネリクスについて"
tag: ["Java"]
programming: ["Java"]
updatedAt: "2019-11-01T08:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

ジェネリクスについて。

ジェネリクスとは、特定の型に制限されない、抽象的かつ汎用的なコードを記述するための機能である。

変数の型を明記することが必要な言語では、変数を宣言するときにその変数の型名も書く必要があり、またその変数にはその型の値しかいれることができない。

しかし、ジェネリクスを利用すると、引数の型は抽象的なものになり、様々な型の引数を渡すことが可能になる。

言語による仕様を示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
型名<クラス名>
```

Java では**ダイヤモンド演算子**を使ってジェネリクスを宣言する。

クラスを定義する時、及びジェネリクスを利用する変数を定義する時、型名の後ろに<クラス名>というように宣言する。

これにより、そのクラス、インスタンスを利用する時の引数にはその型の引数のみ利用できるようになる。

インスタンス宣言時に利用できる型を定義できるので、結果としてそのクラスとしてはどの型のデータも利用することが可能になる。

実際の利用例としては、Collections クラスを元としている List クラスや Map クラスがある。

```java
List<T> l = new ArrayList<T>();
Map<K,V> m = new HashMap<K,V>();
```

実際に利用する時はこの T,K,V を Integer や String などの具体的な型にする。

また、自分でクラスを定義するときもジェネリクスが利用できる。

実装例を以下に示す。

```java
class Gen<T> {
    //T型のフィールド変数t
    T t;

    //T型の値を引数とする
    public Gen(T t){
        this.t = t;
    }
}
```

</div>
