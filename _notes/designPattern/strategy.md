---
title: "Strategyパターン"
excerpt: ""
coverImage: ""
date: "2024-03-21T21:55:45.000Z"
updatedAt: "2024-03-21T21:55:45.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

Strategy（ストラテジー）パターンは、ソフトウェアデザインパターンの一つで、アルゴリズムをカプセル化し、それらを交換可能にすることで、動作を変更する手段を提供する。
これにより、同じコンテキスト内で異なるアルゴリズムを使用でき、柔軟性を向上させる。

# **主な要素**

1. **Strategy（ストラテジー）**: アルゴリズムを実装するためのインターフェースや抽象クラス。
2. **ConcreteStrategy（具体的なストラテジー）**: Strategy を実装する具体的なクラス。異なるアルゴリズムを提供する。
3. **Context（コンテキスト）**: Strategy インターフェースを利用してアルゴリズムを実行するクラス。具体的なストラテジーを保持し、必要に応じて切り替える。

# **Strategy パターンの実装例**

以下は、Java 言語を使用した Strategy パターンの実装例である。例として、異なるソートアルゴリズムを実行するソートプログラムを考えよう。

```java
javaCopy code
// Strategy インターフェース
interface SortStrategy {
    void sort(int[] array);
}

// 具体的なストラテジー1: バブルソート
class BubbleSortStrategy implements SortStrategy {
    @Override
    public void sort(int[] array) {
        System.out.println("Sorting array using Bubble Sort");
        // バブルソートの実装
    }
}

// 具体的なストラテジー2: クイックソート
class QuickSortStrategy implements SortStrategy {
    @Override
    public void sort(int[] array) {
        System.out.println("Sorting array using Quick Sort");
        // クイックソートの実装
    }
}

// コンテキスト
class Sorter {
    private SortStrategy strategy;

    public Sorter(SortStrategy strategy) {
        this.strategy = strategy;
    }

    public void setStrategy(SortStrategy strategy) {
        this.strategy = strategy;
    }

    public void executeSort(int[] array) {
        strategy.sort(array);
    }
}

// クライアント
public class Client {
    public static void main(String[] args) {
        int[] array = {5, 3, 8, 1, 2, 4, 6};

        // バブルソートを使用して配列をソート
        Sorter sorter = new Sorter(new BubbleSortStrategy());
        sorter.executeSort(array);

        // クイックソートに切り替えて再度配列をソート
        sorter.setStrategy(new QuickSortStrategy());
        sorter.executeSort(array);
    }
}

```

この例では、**`SortStrategy`** インターフェースがストラテジーを表し、**`BubbleSortStrategy`** と **`QuickSortStrategy`** が具体的なストラテジーを提供する。
**`Sorter`** クラスがコンテキストを表し、異なるストラテジーを保持し、必要に応じて切り替えて実行する。

# **利用例**

Strategy パターンは、以下のような場面で利用される：

1. **同じコンテキストで異なるアルゴリズムを使用する場合**: コンテキスト内でアルゴリズムを切り替える必要がある場合、Strategy パターンはこれを柔軟に実現する。
2. **アルゴリズムの実装が頻繁に変更される場合**: 実装が変更される可能性がある場合、具体的なストラテジーを切り替えるだけで済むため、Strategy パターンは変更の影響を最小限に抑える。
3. **アルゴリズムを分離してテストする場合**: Strategy パターンは、アルゴリズムの切り替えが容易なため、個々のストラテジーを単独でテストするのに適している。

Strategy パターンは、特にアルゴリズムの切り替えが必要な場面や拡張性を考慮する必要がある場合に有用である。それにより、コードの柔軟性と保守性を向上させることができる。
