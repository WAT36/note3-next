---
title: "Mediatorパターン"
excerpt: ""
coverImage: ""
date: "2024-06-15T23:30:04.000Z"
updatedAt: "2024-06-15T23:30:04.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

Mediator（仲介者）パターンは、ソフトウェアデザインパターンの一つで、複数のオブジェクト間の相互作用を制御し、その間の結合度を低くするためのパターンです。このパターンでは、オブジェクト間の直接の通信を避け、すべての通信を中央の仲介者オブジェクトを介して行います。仲介者オブジェクトは、オブジェクト間の通信を管理し、各オブジェクトが他のオブジェクトの存在を意識する必要がないようにします。

### **主な要素**

1. **Mediator（仲介者）**: オブジェクト間の相互作用を制御するインターフェースや抽象クラスです。Mediator インターフェースには、オブジェクト間の通信を制御するメソッドが含まれます。
2. **ConcreteMediator（具体的な仲介者）**: Mediator を実装した具体的なクラスで、オブジェクト間の相互作用を実際に制御します。
3. **Colleague（同僚）**: 仲介者を通じて相互作用するオブジェクトを表します。Colleague インターフェースには、仲介者との通信を行うためのメソッドが含まれます。
4. **ConcreteColleague（具体的な同僚）**: Colleague を実装した具体的なクラスで、他の同僚との相互作用を実際に行います。

### **Mediator パターンの実装例**

以下は、Java 言語を使用した Mediator パターンの実装例です。例として、チャットアプリケーションのメッセージングシステムを考えてみましょう。

```java
javaCopy code
// Mediator インターフェース
interface ChatMediator {
    void sendMessage(String message, Colleague colleague);
}

// ConcreteMediator クラス
class ChatMediatorImpl implements ChatMediator {
    @Override
    public void sendMessage(String message, Colleague colleague) {
        colleague.receiveMessage(message);
    }
}

// Colleague インターフェース
interface Colleague {
    void sendMessage(String message);
    void receiveMessage(String message);
}

// ConcreteColleague クラス
class User implements Colleague {
    private String name;
    private ChatMediator mediator;

    public User(String name, ChatMediator mediator) {
        this.name = name;
        this.mediator = mediator;
    }

    @Override
    public void sendMessage(String message) {
        System.out.println(name + " sends message: " + message);
        mediator.sendMessage(message, this);
    }

    @Override
    public void receiveMessage(String message) {
        System.out.println(name + " receives message: " + message);
    }
}

// クライアント
public class Client {
    public static void main(String[] args) {
        ChatMediator mediator = new ChatMediatorImpl();

        Colleague user1 = new User("User1", mediator);
        Colleague user2 = new User("User2", mediator);
        Colleague user3 = new User("User3", mediator);

        // ユーザー間でメッセージを送信
        user1.sendMessage("Hello, everyone!");
        user2.sendMessage("Hi there!");
        user3.sendMessage("Hey, guys!");
    }
}

```

この例では、**`ChatMediator`** インターフェースが仲介者を表し、**`ChatMediatorImpl`** クラスが具体的な仲介者を提供します。**`Colleague`** インターフェースが同僚を表し、**`User`** クラスが具体的な同僚を提供します。クライアントは、仲介者を介して同僚間でメッセージを送信します。

### **利用例**

Mediator パターンは、以下のような場面で利用されます：

1. **複数のオブジェクト間の結合度を低くしたい場合**: 複数のオブジェクト間の結合度を低くし、オブジェクト間の直接の通信を避けたい場合、Mediator パターンが役立ちます。
2. **オブジェクト間の相互作用を中央で管理したい場合**: オブジェクト間の相互作用を中央で管理し、各オブジェクトが他のオブジェクトの存在を意識する必要がないようにしたい場合、Mediator パターンを使用します。
3. **複数のオブジェクト間の相互作用を一元管理したい場合**: 複数のオブジェクト間の相互作用を一元的に管理し、システム全体の制御を簡素化したい場合、Mediator パターンが有用です。

Mediator パターンは、特に複数のオブジェクト間の相互作用を管理したい場合や、オブジェクト間の結合度を低く保ちたい場合に有用です。それにより、柔軟性と拡張性を向上させることができます。
