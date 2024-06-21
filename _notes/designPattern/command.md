---
title: "Commandパターン"
excerpt: ""
coverImage: ""
date: "2024-06-21T23:04:18.000Z"
updatedAt: "2024-06-21T23:04:18.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

Command（コマンド）パターンは、ソフトウェアデザインパターンの一つで、操作をオブジェクトとしてカプセル化し、操作の実行、取り消し、再実行などを可能にします。このパターンでは、クライアントが要求を行う際に、その要求を表すコマンドオブジェクトが作成され、これらのコマンドオブジェクトが操作を実行するために使用されます。また、これらのコマンドオブジェクトは履歴を管理し、取り消しや再実行などの操作をサポートします。

### **主な要素**

1. **Command（コマンド）**: 操作を実行するためのインターフェースや抽象クラスです。Command には、実行メソッドや取り消しメソッドなど、操作を表すメソッドが含まれます。
2. **ConcreteCommand（具体的なコマンド）**: Command を実装した具体的なクラスで、特定の操作を実行するためのコードが含まれます。
3. **Invoker（起動者）**: コマンドオブジェクトを受け取り、実行したり、取り消したり、再実行したりする役割を持つクラスです。Invoker は、具体的なコマンドオブジェクトのインスタンス化と操作の実行を担当します。
4. **Receiver（受信者）**: 実際に操作を実行するオブジェクトで、ConcreteCommand が呼び出すメソッドが含まれます。Receiver は、操作を実行するための実際のロジックを持っています。

### **Command パターンの実装例**

以下は、Java 言語を使用した Command パターンの実装例です。例として、テキストエディタでテキストを挿入するコマンドを考えてみましょう。

```java
javaCopy code
// Command インターフェース
interface Command {
    void execute();
    void undo();
}

// ConcreteCommand クラス
class InsertTextCommand implements Command {
    private final Receiver receiver;
    private final String text;

    public InsertTextCommand(Receiver receiver, String text) {
        this.receiver = receiver;
        this.text = text;
    }

    @Override
    public void execute() {
        receiver.insertText(text);
    }

    @Override
    public void undo() {
        receiver.deleteText(text);
    }
}

// Receiver クラス
class Receiver {
    public void insertText(String text) {
        System.out.println("Inserting text: " + text);
    }

    public void deleteText(String text) {
        System.out.println("Deleting text: " + text);
    }
}

// Invoker クラス
class Invoker {
    private final Command command;

    public Invoker(Command command) {
        this.command = command;
    }

    public void executeCommand() {
        command.execute();
    }

    public void undoCommand() {
        command.undo();
    }
}

// クライアント
public class Client {
    public static void main(String[] args) {
        Receiver receiver = new Receiver();
        Command insertCommand = new InsertTextCommand(receiver, "Hello, world!");
        Invoker invoker = new Invoker(insertCommand);

        // コマンドの実行
        invoker.executeCommand();
        // コマンドの取り消し
        invoker.undoCommand();
    }
}

```

### **利用例**

Command パターンは、以下のような場面で利用されます：

1. **操作の実行履歴を管理したい場合**: 操作の実行履歴を管理し、取り消しや再実行などの操作をサポートする必要がある場合、Command パターンを使用します。
2. **操作を複数のレシーバで共有したい場合**: 同じ操作を複数のオブジェクトで共有し、それぞれのレシーバが異なるロジックで操作を処理する必要がある場合、Command パターンが役立ちます。
3. **操作の実行時点を遅延させたい場合**: 操作の実行を遅延させたり、キューに入れたりして非同期で実行したい場合、Command パターンを使用します。

Command パターンは、特に操作の実行履歴の管理や操作の実行時点を遅延させたい場合に有用です。それにより、操作の柔軟性と拡張性が向上し、コードの保守性が向上します。
