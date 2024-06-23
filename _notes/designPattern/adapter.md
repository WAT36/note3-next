---
title: "Adapterパターン"
excerpt: ""
coverImage: ""
date: "2024-03-02T11:28:00.000Z"
updatedAt: "2024-03-02T11:28:00.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

Adapter（アダプター）パターンは、既存のクラスと新しいクラスとの間でインターフェースの不一致を解消するためのデザインパターンである。
このパターンを使用することで、互換性のないインターフェースを持つクラス同士が協調できるようになる。

# 主な要素

1. **Target（ターゲット）**: クライアントが利用するインターフェースを定義する。Adapter パターンでは、このインターフェースが新しいクラスのものである。
2. **Adaptee（アダプティ）**: 既存のクラスで、クライアントが直接利用できないインターフェースを持っています。このクラスを利用するために、Adapter パターンが必要になる。
3. **Adapter（アダプター）**: Adaptee のインターフェースを Target のインターフェースに変換する。これにより、新しいクラスが既存のクラスを利用できるようになる。

# 実例: 電源アダプター

具体例として、電源アダプターを考えよう。ノート PC（Adaptee）は、コンセント（Target）に直接差し込むことはできないため、電源アダプター（Adapter）が必要になる。

```java
// ターゲット（コンセント）
interface Outlet {
    void connect();
}

// アダプティ（ノートPC）
class Laptop{
    void plugIntoSocket() {
        System.out.println("Connected to the socket");
    }
}

// アダプター（電源アダプター）
class ChargerAdapter implements Outlet {
    private Laptop laptop;

    public ChargerAdapter(Laptop laptop) {
        this.laptop = laptop;
    }

    @Override
    public void connect() {
        laptop.plugIntoSocket();
    }
}

// 利用例
public class Main {
    public static void main(String[] args) {
        Laptop laptop = new Laptop();
        Outlet outlet = new ChargerAdapter(laptop);

        outlet.connect(); // コンセントに接続するが、内部的には既存の充電器を利用
    }
}

```

この例では、`Outlet` が新しいインターフェース（Target）を表し、`Laptop` が既存のクラス（Adaptee）を表している。
そして、`ChargerAdapter` がアダプターとなり、`Laptop` の挙動を `Outlet` のインターフェースに変換している。

# まとめ

Adapter パターンは、既存のクラスと新しいクラスとの間で円滑な連携を実現するために使用される。
これにより、既存のコードを再利用でき、互換性のないクラス同士を統合する際に柔軟性を提供する。
しばしば、外部のライブラリやコンポーネントとの連携において有用なデザインパターンとされている。
