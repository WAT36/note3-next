---
title: "Decoratorパターン"
excerpt: ""
coverImage: ""
date: "2024-03-30T17:05:52.000Z"
updatedAt: "2024-03-30T17:05:52.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

Decorator（デコレータ）パターンは、ソフトウェアデザインパターンの一つで、オブジェクトに動的に新しい機能や振る舞いを追加するためのパターンである。
このパターンでは、オブジェクトを包み込んで装飾し、オブジェクト自体の変更なしに、新しい機能を追加する。これにより、クラス階層を平坦化し、柔軟性と再利用性を向上させる。

# **主な要素**

1. **Component（コンポーネント）**: 装飾されるオブジェクトの共通のインターフェースや抽象クラス。これはデコレータと同じインターフェースを持つ。
2. **ConcreteComponent（具体的なコンポーネント）**: Component インターフェースを実装した具体的なクラス。装飾の対象となるオブジェクトを表す。
3. **Decorator（デコレータ）**: Component を実装し、追加の機能を提供する。Decorator クラスはその中に Component のインスタンスを持ち、そのインスタンスを装飾する。
4. **ConcreteDecorator（具体的なデコレータ）**: Decorator を拡張した具体的なクラスで、追加の機能を提供する。ConcreteDecorator クラスは追加の振る舞いを持ち、Component を装飾する。

### **Decorator パターンの実装例**

以下は、Java 言語を使用した Decorator パターンの実装例である。例として、テキストに装飾を加えるテキストエディタを考えよう。

```java
javaCopy code
// Component インターフェース
interface TextComponent {
    String draw();
}

// ConcreteComponent クラス
class SimpleText implements TextComponent {
    private String text;

    public SimpleText(String text) {
        this.text = text;
    }

    @Override
    public String draw() {
        return text;
    }
}

// Decorator クラス
abstract class TextDecorator implements TextComponent {
    protected TextComponent textComponent;

    public TextDecorator(TextComponent textComponent) {
        this.textComponent = textComponent;
    }

    @Override
    public String draw() {
        return textComponent.draw();
    }
}

// 具体的なデコレータクラス
class BoldDecorator extends TextDecorator {
    public BoldDecorator(TextComponent textComponent) {
        super(textComponent);
    }

    @Override
    public String draw() {
        return "<b>" + super.draw() + "</b>";
    }
}

class ItalicDecorator extends TextDecorator {
    public ItalicDecorator(TextComponent textComponent) {
        super(textComponent);
    }

    @Override
    public String draw() {
        return "<i>" + super.draw() + "</i>";
    }
}

// クライアント
public class Client {
    public static void main(String[] args) {
        TextComponent text = new SimpleText("Hello, world!");

        // テキストを装飾
        TextComponent boldText = new BoldDecorator(text);
        TextComponent italicText = new ItalicDecorator(text);

        // 装飾されたテキストを描画
        System.out.println(boldText.draw());   // <b>Hello, world!</b>
        System.out.println(italicText.draw()); // <i>Hello, world!</i>
    }
}

```

この例では、**`TextComponent`** インターフェースがコンポーネントを表し、**`SimpleText`** クラスが具体的なコンポーネントを提供する。
**`TextDecorator`** クラスがデコレータを表し、具体的なデコレータとして **`BoldDecorator`** と **`ItalicDecorator`** クラスがある。
クライアントは、テキストを装飾するためにデコレータを使用し、新しい機能を追加する。

# **利用例**

Decorator パターンは、以下のような場面で利用される：

1. **オブジェクトの機能を動的に追加したい場合**: オブジェクトの機能を静的にではなく、動的に追加したい場合、Decorator パターンは適している。
2. **クラス階層の爆発を防ぎたい場合**: クラス階層が多重に入れ子になっている場合、Decorator パターンはクラスの数を減らし、簡潔な設計を提供する。
3. **オブジェクトの組み合わせで複数の機能を提供したい場合**: 複数の機能を組み合わせて提供したい場合、Decorator パターンは適している。
