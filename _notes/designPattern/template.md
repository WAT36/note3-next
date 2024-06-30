---
title: "Template Methodパターン"
excerpt: ""
coverImage: ""
date: "2024-03-08T21:52:06.000Z"
updatedAt: "2024-03-08T21:52:06.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

Template Method（テンプレートメソッド）パターンは、ソフトウェア開発における設計パターンの一つで、アルゴリズムの骨格を定義し、具体的なステップをサブクラスに委譲する方法を提供する。
これにより、同じアルゴリズムを持つクラスを効果的に再利用できる。

# 主な要素

1. **AbstractClass（抽象クラス）**: アルゴリズムの骨格を定義する抽象クラスで、一部のステップは具体的な実装をサブクラスに委譲する。これが Template Method を含む。
2. **ConcreteClass（具体クラス）**: AbstractClass を継承し、Template Method において抽象メソッドを具体的に実装する。これにより、具体的なアルゴリズムが形成される。

# 実例: ドキュメントの作成

例として、ドキュメントを作成するプロセスを考えよう。これには以下のステップが含まれる：ドキュメントの作成、タイトルの設定、本文の追加、署名の追加など。

```java
javaCopy code
// 抽象クラス
abstract class DocumentTemplate {
    // テンプレートメソッド
    public final void createDocument() {
        setTitle();
        addContent();
        if (shouldAddSignature()) {
            addSignature();
        }
    }

    // 具体的なステップ（抽象メソッド）
    protected abstract void setTitle();
    protected abstract void addContent();
    protected abstract void addSignature();

    // フックメソッド（オプションでオーバーライド可能）
    protected boolean shouldAddSignature() {
        return true;
    }
}

// 具体クラス
class BusinessDocument extends DocumentTemplate {
    @Override
    protected void setTitle() {
        System.out.println("Business Document - Set Title");
    }

    @Override
    protected void addContent() {
        System.out.println("Business Document - Add Content");
    }

    @Override
    protected void addSignature() {
        System.out.println("Business Document - Add Signature");
    }
}

class CasualDocument extends DocumentTemplate {
    @Override
    protected void setTitle() {
        System.out.println("Casual Document - Set Title");
    }

    @Override
    protected void addContent() {
        System.out.println("Casual Document - Add Content");
    }

    // フックメソッドをオーバーライド
    @Override
    protected boolean shouldAddSignature() {
        return false;
    }
}

// 利用例
public class Main {
    public static void main(String[] args) {
        DocumentTemplate businessDocument = new BusinessDocument();
        businessDocument.createDocument();

        System.out.println();

        DocumentTemplate casualDocument = new CasualDocument();
        casualDocument.createDocument();
    }
}

```

この例では、**`DocumentTemplate`** が抽象クラスで、**`createDocument`** メソッドが Template Method である。
このメソッド内で具体的なステップ（**`setTitle`**、**`addContent`**、**`addSignature`**）が呼ばれる。
**`BusinessDocument`** と **`CasualDocument`** は具体的なステップを提供し、必要に応じてフックメソッドをオーバーライドしている。

# まとめ

Template Method パターンは、アルゴリズムの骨格を定義し、サブクラスに具体的なステップを委譲することで、再利用性と拡張性を向上させる効果的な手段である。
また、フックメソッドを利用することで、サブクラスでオプションな処理を含めることができ、柔軟性を持たせることができる。
