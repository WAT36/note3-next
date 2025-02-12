---
title: "Builderパターン"
excerpt: ""
coverImage: ""
date: "2024-03-17T16:45:38.000Z"
updatedAt: "2024-03-17T16:45:38.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

Builder（ビルダー）パターンは、ソフトウェアデザインパターンの一つで、複雑なオブジェクトの生成プロセスを隠蔽し、ユーザーに対して柔軟性を提供するためのパターンである。
このパターンを使用することで、異なる構成オプションを持つオブジェクトを効果的に構築できる。

# **主な要素**

1. **Product（製品）**: 最終的に構築されるオブジェクトの表現を提供するクラスやインターフェースである。
2. **Builder（ビルダー）**: 製品を構築するための共通のインターフェースを提供する抽象クラスやインターフェース。また、ビルドプロセスの各ステップに対応するメソッドも提供する。
3. **ConcreteBuilder（具体的なビルダー）**: Builder インターフェースを実装し、具体的なビルドプロセスを定義する。
4. **Director（ディレクター）**: ConcreteBuilder を利用して、製品を構築する際の手順を定義する。

# **Builder パターンの実装例**

以下は、Java 言語を使用した Builder パターンの簡単な実装例である。

```java
javaCopy code
// 製品
class Product {
    private String part1;
    private String part2;

    public void setPart1(String part1) {
        this.part1 = part1;
    }

    public void setPart2(String part2) {
        this.part2 = part2;
    }

    @Override
    public String toString() {
        return "Part1: " + part1 + ", Part2: " + part2;
    }
}

// ビルダー
interface Builder {
    void buildPart1(String part1);
    void buildPart2(String part2);
    Product getResult();
}

// 具体的なビルダー
class ConcreteBuilder implements Builder {
    private Product product = new Product();

    @Override
    public void buildPart1(String part1) {
        product.setPart1(part1);
    }

    @Override
    public void buildPart2(String part2) {
        product.setPart2(part2);
    }

    @Override
    public Product getResult() {
        return product;
    }
}

// ディレクター
class Director {
    private Builder builder;

    public Director(Builder builder) {
        this.builder = builder;
    }

    public void construct() {
        builder.buildPart1("Part1 value");
        builder.buildPart2("Part2 value");
    }
}

// 利用例
public class Client {
    public static void main(String[] args) {
        Builder builder = new ConcreteBuilder();
        Director director = new Director(builder);

        director.construct();
        Product product = builder.getResult();

        System.out.println(product);
    }
}

```

この例では、**`Product`** が最終的な製品を表し、**`Builder`** がそのインターフェースを定義している。
**`ConcreteBuilder`** が **`Builder`** インターフェースを実装し、具体的なビルドプロセスを提供する。**`Director`** はビルダーを利用して製品を構築する手順を定義する。

# **利用例**

Builder パターンは、以下のような場面で利用される。

1. **複雑なオブジェクトの構築**: オブジェクトが複雑で、多くの構成オプションがある場合、Builder パターンはその構築プロセスを簡潔に保つ。
2. **異なる構成オプション**: 同じオブジェクトが異なる構成オプションを持つ場合、Builder パターンは異なるビルダーを利用して柔軟に構築できる。
3. **インスタンスの再利用**: 同じビルダーを利用して異なる製品を生成する場合、ビルダーの再利用が容易である。

Builder パターンは、特にオブジェクトの構築過程が複雑であり、かつ構築されるオブジェクトが異なる構成オプションを持つ場合に役立つ。
