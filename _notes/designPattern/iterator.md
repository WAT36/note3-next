---
title: "Iteratorパターン"
excerpt: ""
coverImage: ""
date: "2024-02-28T23:37:22.000Z"
updatedAt: "2024-02-28T23:37:22.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

Iterator（イテレータ）とは繰り返し処理のことである。

プログラミングをしていて、配列やリストのようなデータ構造から、順番に要素を取得する処理を書いたことはあると思う。

単純に書くと以下の様な例である。

```java
int[] array = [1,2,3,4,5]
for(int i=0;i<array.length;i++){
	System.out.println(array[i]);
}
```

ここでは for 文で、変数 i を使って配列 array の要素を１個１個順に指定し取り出している。

ここでの変数 i の動きを抽象化し、一般化したデザインパターンを**Iterator パターン**と呼んでいる。

Iterator パターンは上記のような配列に限らず、集合的な要素に対して順番に指し示していき、全体をスキャンさせる処理を行わせたいときに適用するものである。

このパターンにより、要素の取得方法をカプセル化し、集合的な要素の内部構造に依存せずに要素にアクセスする手段を提供する。これにより、異なる集合的な要素を同じ方法で扱うことが可能になり、コードの再利用性が向上する。

# 構成要素

Iterator パターンは主に以下の要素で構成される。

1. **Iterator（イテレーター）**: 要素に順次アクセスするためのインターフェース。別の具体的な Iterator クラスで、集合的な要素に対する具体的なアクセス方法を実装する。
2. **Aggregate（集合）**: イテレーターの対象となる、要素の集まりを表すインターフェースを提供する。Aggregate インターフェースは、Iterator インターフェースを生成するためのメソッドを定義する。
3. **ConcreteIterator（具体的なイテレーター）**: Iterator インターフェースを実装し、集合的な要素内の具体的な要素にアクセスする。
4. **ConcreteAggregate（具体的な集合）**: Aggregate インターフェースを実装し、具体的な要素の集まりを管理する。ConcreteAggregate クラスは、Iterator インターフェースを生成するためのメソッドを実装する。

# 実装例

実際の例として、本のコレクションを扱う場合を考えよう。

以下に、 Iterator パターンを利用した具体的な実装を記載する。

```java
// Iterator インターフェース
interface Iterator {
    boolean hasNext();
    Object next();
}

// ConcreteIterator クラス
class BookIterator implements Iterator {
    private String[] books;
    private int position;

    public BookIterator(String[] books) {
        this.books = books;
        this.position = 0;
    }

    @Override
    public boolean hasNext() {
        return position < books.length;
    }

    @Override
    public Object next() {
        if (hasNext()) {
            return books[position++];
        }
        return null;
    }
}

// Aggregate インターフェース
interface Aggregate {
    Iterator createIterator();
}

// ConcreteAggregate クラス
class BookCollection implements Aggregate {
    private String[] books;

    public BookCollection(String[] books) {
        this.books = books;
    }

    @Override
    public Iterator createIterator() {
        return new BookIterator(books);
    }
}
```

これらを実際に利用した例を以下に記載する。

```java
// 利用例
public class Main {
    public static void main(String[] args) {
        String[] bookTitles = {"Design Patterns", "Clean Code", "Refactoring"};
        BookCollection bookCollection = new BookCollection(bookTitles);
        Iterator iterator = bookCollection.createIterator();

        while (iterator.hasNext()) {
            Object book = iterator.next();
            System.out.println("Book: " + book);
        }
    }
}
```
