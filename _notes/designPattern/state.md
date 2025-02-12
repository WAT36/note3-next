---
title: "Stateパターン"
excerpt: ""
coverImage: ""
date: "2024-06-18T22:14:01.000Z"
updatedAt: "2024-06-18T22:14:01.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

State（状態）パターンは、ソフトウェアデザインパターンの一つで、オブジェクトの状態に基づいて振る舞いを変える必要がある場合に使用される。
このパターンでは、オブジェクトの状態ごとに異なるクラスを定義し、各状態が持つ振る舞いをそのクラス内に実装する。そして、オブジェクトは現在の状態を保持し、その状態に応じて適切な振る舞いを呼び出す。

# **主な要素**

1. **Context（コンテキスト）**: 状態を定義し、状態ごとの振る舞いを保持するクラス。Context は状態を保持し、現在の状態に応じて適切な振る舞いを呼び出す。
2. **State（状態）**: Context が持つ状態のインターフェースや抽象クラス。State には、状態ごとの振る舞いを定義するメソッドが含まれる。
3. **ConcreteState（具体的な状態）**: State を実装した具体的なクラス。各 ConcreteState クラスは、特定の状態に対応する振る舞いを実装する。

# **State パターンの実装例**

以下は、Java 言語を使用した State パターンの実装例である。例として、ユーザーがオンラインかオフラインかを表す状態を管理する場合を考えてみよう。

```java
javaCopy code
// State インターフェース
interface UserState {
    void login();
    void logout();
}

// ConcreteState1 クラス
class OnlineState implements UserState {
    @Override
    public void login() {
        System.out.println("Already logged in.");
    }

    @Override
    public void logout() {
        System.out.println("Logging out.");
    }
}

// ConcreteState2 クラス
class OfflineState implements UserState {
    @Override
    public void login() {
        System.out.println("Logging in.");
    }

    @Override
    public void logout() {
        System.out.println("Already logged out.");
    }
}

// Context クラス
class User {
    private UserState state;

    public User() {
        // ユーザーは初期状態でオフラインとする
        state = new OfflineState();
    }

    public void setState(UserState state) {
        this.state = state;
    }

    public void login() {
        state.login();
        setState(new OnlineState());
    }

    public void logout() {
        state.logout();
        setState(new OfflineState());
    }
}

// クライアント
public class Client {
    public static void main(String[] args) {
        User user = new User();

        // オフライン状態からログイン
        user.login();
        // オンライン状態からログアウト
        user.logout();
    }
}

```

# **利用例**

State パターンは、以下のような場面で利用される：

1. **オブジェクトの状態ごとに異なる振る舞いを持つ場合**: オブジェクトの状態ごとに異なる振る舞いが必要な場合、State パターンが役立つ。
2. **オブジェクトの振る舞いを状態ごとにカプセル化したい場合**: オブジェクトの状態ごとの振る舞いをそれぞれの状態クラスにカプセル化し、コードの複雑さを低減したい場合、State パターンを使用する。
3. **オブジェクトの状態遷移を明確に定義したい場合**: オブジェクトの状態遷移を明確に定義し、状態間の切り替えを容易にしたい場合、State パターンが有用である。

State パターンは、特にオブジェクトの状態ごとに異なる振る舞いが必要な場合や、オブジェクトの状態遷移を明確に定義したい場合に有用である。それにより、コードの保守性が向上し、柔軟性と拡張性が向上する。
