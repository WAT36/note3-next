---
title: "Chain of Responsibilityパターン"
excerpt: ""
coverImage: ""
date: "2024-06-12T00:49:51.000Z"
updatedAt: "2024-06-12T00:49:51.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

Chain of Responsibility（責任連鎖）パターンは、ソフトウェアデザインパターンの一つで、複数のオブジェクトが責任を持ち、その中から適切なオブジェクトが処理を行うようにします。このパターンでは、要求を処理できるオブジェクトが複数あり、その中で適切なオブジェクトが要求を処理するまで、チェーン上のオブジェクトが順番に要求を受け取ります。

### 主な要素

1. **Handler（ハンドラ）**: 要求を処理するためのインターフェースや抽象クラスです。このインターフェースや抽象クラスには、次のハンドラをセットするメソッドが含まれます。
2. **ConcreteHandler（具体的なハンドラ）**: Handler を実装した具体的なクラスで、要求を処理する責任があります。また、処理できない場合は次のハンドラに要求を転送します。
3. **Client（クライアント）**: 要求を発行するクラスで、要求を処理するための最初のハンドラを持っています。

### Chain of Responsibility パターンの実装例

以下は、Java 言語を使用した Chain of Responsibility パターンの実装例です。例として、責任連鎖の中で数値を処理するロジックを考えてみましょう。

```java
// Handler インターフェース
interface Handler {
    void handleRequest(int number);
    void setNextHandler(Handler handler);
}

// ConcreteHandler クラス
class PositiveNumberHandler implements Handler {
    private Handler nextHandler;

    @Override
    public void handleRequest(int number) {
        if (number > 0) {
            System.out.println("PositiveNumberHandler: " + number);
        } else if (nextHandler != null) {
            nextHandler.handleRequest(number);
        }
    }

    @Override
    public void setNextHandler(Handler handler) {
        nextHandler = handler;
    }
}

class NegativeNumberHandler implements Handler {
    private Handler nextHandler;

    @Override
    public void handleRequest(int number) {
        if (number < 0) {
            System.out.println("NegativeNumberHandler: " + number);
        } else if (nextHandler != null) {
            nextHandler.handleRequest(number);
        }
    }

    @Override
    public void setNextHandler(Handler handler) {
        nextHandler = handler;
    }
}

// クライアント
public class Client {
    public static void main(String[] args) {
        Handler positiveHandler = new PositiveNumberHandler();
        Handler negativeHandler = new NegativeNumberHandler();

        positiveHandler.setNextHandler(negativeHandler);

        // 要求を処理する
        positiveHandler.handleRequest(10);   // PositiveNumberHandler: 10
        positiveHandler.handleRequest(-5);   // NegativeNumberHandler: -5
        positiveHandler.handleRequest(0);    // 処理されない
    }
}

```

この例では、`Handler` インターフェースが責任連鎖の基本を表し、`PositiveNumberHandler` クラスと `NegativeNumberHandler` クラスが具体的なハンドラを提供します。クライアントは、最初のハンドラを設定し、要求を処理するためにそのハンドラに送信します。各ハンドラは、要求を処理できるかどうかを判断し、処理できない場合は次のハンドラに要求を転送します。

### 利用例

Chain of Responsibility パターンは、以下のような場面で利用されます：

1. **要求を複数のオブジェクトで処理したい場合**: 複数のオブジェクトが要求を受け取り、その中で適切なオブジェクトが要求を処理する必要がある場合、Chain of Responsibility パターンが役立ちます。
2. **要求の処理の順序を柔軟に変更したい場合**: 要求の処理順序を変更する必要がある場合、Chain of Responsibility パターンを使用すると、オブジェクトの組み合わせを変更せずに処理順序を変更できます。
3. **オブジェクト間の結合度を低く保ちたい場合**: オブジェクト間の結合度を低く保ちたい場合、Chain of Responsibility パターンはオブジェクトの組み合わせを簡単に変更できるため、有用です。

Chain of Responsibility パターンは、特に要求の処理を柔軟に変更したい場合や、要求の処理順序を変更したい場合に有用です。それにより、柔軟性と拡張性を向上させることができます。
