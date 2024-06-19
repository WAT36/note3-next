---
title: "FlyWeightパターン"
excerpt: ""
coverImage: ""
date: "2024-06-19T22:31:10.000Z"
updatedAt: "2024-06-19T22:31:10.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

Flyweight（フライウェイト）パターンは、ソフトウェアデザインパターンの一つで、大量の細かいオブジェクトを効率的に共有するためのパターンです。このパターンでは、同じ内容のオブジェクトを再利用し、メモリ使用量や処理時間を削減します。これは、同じ内容のオブジェクトが複数回作成されることがある場合に特に有用です。

Flyweight パターンでは、オブジェクトを 2 つの種類に分けます：

1. **共有可能な部分（Intrinsic State）**: オブジェクトが共有する部分で、そのオブジェクトの状態を表します。この部分は不変であり、オブジェクトが作成された後に変更されることはありません。
2. **非共有可能な部分（Extrinsic State）**: オブジェクトが個々に持つ固有の部分で、オブジェクトごとに異なる状態を表します。この部分はオブジェクトの動的な状態を表し、オブジェクトが作成されるたびに変更される可能性があります。

### **主な要素**

1. **Flyweight Factory（フライウェイト工場）**: Flyweight オブジェクトの生成と管理を行うファクトリクラスです。共有可能な部分を共有するためのメカニズムを提供します。
2. **Flyweight（フライウェイト）**: 共有可能な部分を表すインターフェースや抽象クラスです。このインターフェースは、共有可能な部分を共有するための操作を提供します。
3. **ConcreteFlyweight（具体的なフライウェイト）**: Flyweight インターフェースを実装した具体的なクラスで、共有可能な部分を表します。このクラスは不変オブジェクトであり、複数のコンテキストで共有されます。
4. **Client（クライアント）**: Flyweight オブジェクトを使用するクラスです。Client は Flyweight Factory を介して Flyweight オブジェクトを取得し、非共有可能な部分を設定します。

### **Flyweight パターンの実装例**

以下は、Java 言語を使用した Flyweight パターンの実装例です。例として、テキストの装飾を行うテキストエディタを考えてみましょう。ここでは、フォントの共有可能な部分とテキストの非共有可能な部分を分離します。

```java
javaCopy code
import java.util.HashMap;
import java.util.Map;

// Flyweight インターフェース
interface Font {
    void render(String text);
}

// ConcreteFlyweight クラス
class ConcreteFont implements Font {
    private final String fontName;

    public ConcreteFont(String fontName) {
        this.fontName = fontName;
    }

    @Override
    public void render(String text) {
        System.out.println("Rendering '" + text + "' with font: " + fontName);
    }
}

// Flyweight Factory クラス
class FontFactory {
    private static final Map<String, Font> fonts = new HashMap<>();

    public static Font getFont(String fontName) {
        Font font = fonts.get(fontName);
        if (font == null) {
            font = new ConcreteFont(fontName);
            fonts.put(fontName, font);
        }
        return font;
    }
}

// クライアント
public class Client {
    public static void main(String[] args) {
        Font font1 = FontFactory.getFont("Arial");
        Font font2 = FontFactory.getFont("Arial");

        // 同じフォントは再利用される
        System.out.println(font1 == font2); // true

        font1.render("Hello, world!");
        font2.render("Flyweight pattern");
    }
}

```

### **利用例**

Flyweight パターンは、以下のような場面で利用されます：

1. **多数の細かいオブジェクトを効率的に共有したい場合**: 多数のオブジェクトを効率的に共有し、メモリ使用量や処理時間を削減したい場合、Flyweight パターンが役立ちます。
2. **オブジェクトのインスタンス化や破棄が頻繁に行われる場合**: オブジェクトのインスタンス化や破棄が頻繁に行われる場合、Flyweight パターンを使用してオブジェクトの再利用を促進することで、パフォーマンスを向上させることができます。
3. **オブジェクトの状態を共有可能な部分と非共有可能な部分に分離したい場合**: オブジェクトの状態を共有可能な部分と非共有可能な部分に分離し、共有可能な部分を共有することで、メモリ使用量を削減したり、処理時間を短縮したりする場合、Flyweight パターンが有用です。

Flyweight パターンは、特に大量の細かいオブジェクトを効率的に管理したい場合や、オブジェクトのインスタンス化や破棄のコストを削減したい場合に有用です。それにより、システム全体のパフォーマンスが向上し、リソースの効率的な利用が可能となります。
