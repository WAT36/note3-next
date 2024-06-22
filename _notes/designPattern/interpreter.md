---
title: "Interpreterパターン"
excerpt: ""
coverImage: ""
date: "2024-06-22T21:34:37.000Z"
updatedAt: "2024-06-22T21:34:37.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

Interpreter（インタープリター）パターンは、ソフトウェアデザインパターンの一つで、特定の言語を解釈するためのパターンです。このパターンでは、言語の文法を定義し、それを解析して実行するための仕組みを提供します。一般的に、解釈される言語は DSL（Domain Specific Language、特定ドメイン向け言語）と呼ばれ、特定の問題領域に特化した言語です。

Interpreter パターンは、特に文法が比較的単純であり、頻繁に変更されることがない場合に有用です。また、解釈される言語の文法が再帰的である場合にも適しています。

### **主な要素**

1. **AbstractExpression（抽象式）**: 解釈される言語の文法を表すための抽象クラスまたはインターフェースです。このクラスには、解釈を実行するための interpret メソッドが含まれます。
2. **TerminalExpression（終端式）**: 抽象式の具象クラスの一つで、終端規則を表します。終端式は、文法の最小単位であり、これ以上分解できません。
3. **NonterminalExpression（非終端式）**: 抽象式の具象クラスの一つで、非終端規則を表します。非終端式は、より複雑な文法規則を表し、終端式や他の非終端式を含むことができます。
4. **Context（コンテキスト）**: 解釈される言語の状態を保持するクラスで、解釈中に情報を共有するために使用されます。
5. **Client（クライアント）**: 具体的な文を解釈し、Interpreter パターンを使用して言語の文法を解析する役割を持つクラスです。

### **Interpreter パターンの実装例**

以下は、Java 言語を使用した Interpreter パターンの簡単な実装例です。例として、簡単な算術式の解釈を行う場合を考えてみます。

```java
javaCopy code
// AbstractExpression
interface Expression {
    int interpret(Context context);
}

// TerminalExpression
class NumberExpression implements Expression {
    private final int number;

    public NumberExpression(int number) {
        this.number = number;
    }

    @Override
    public int interpret(Context context) {
        return number;
    }
}

// NonterminalExpression
class AdditionExpression implements Expression {
    private final Expression left;
    private final Expression right;

    public AdditionExpression(Expression left, Expression right) {
        this.left = left;
        this.right = right;
    }

    @Override
    public int interpret(Context context) {
        return left.interpret(context) + right.interpret(context);
    }
}

// Context
class Context {
    // この例では単純化のために使われていませんが、状態を共有するためのクラスです
}

// Client
public class Client {
    public static void main(String[] args) {
        // 文法: 2 + 3
        Expression expression = new AdditionExpression(new NumberExpression(2), new NumberExpression(3));
        Context context = new Context();
        int result = expression.interpret(context);
        System.out.println("Result: " + result); // Output: 5
    }
}

```

### **利用例**

Interpreter パターンは、以下のような場面で利用されます：

1. **独自の DSL を定義して使用する場合**: 特定の問題領域に特化した言語（DSL）を定義し、それを解釈する必要がある場合、Interpreter パターンが役立ちます。
2. **SQL クエリや正規表現などの言語を解釈する場合**: SQL クエリや正規表現などの特定の言語を解釈し、それに基づいて処理を行う必要がある場合、Interpreter パターンを使用します。
3. **複雑な文法を持つ言語を解釈する場合**: 複雑な文法を持つ言語を解釈し、それに基づいて処理を行う必要がある場合、Interpreter パターンが有用です。

Interpreter パターンは、特に独自の DSL を定義して使用する場合や、複雑な文法を持つ言語を解釈する場合に有用です。それにより、文法の柔軟性と拡張性が向上し、新しい言語の追加や既存の言語の変更が容易になります。
