---
title: "Mementoパターン"
excerpt: ""
coverImage: ""
date: "2024-06-17T22:18:42.000Z"
updatedAt: "2024-06-17T22:18:42.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

Memento（メメント）パターンは、ソフトウェアデザインパターンの一つで、オブジェクトの内部状態を保存し、後でその状態を復元するための手段を提供する。
このパターンは、オブジェクトの状態のスナップショットを取得し、そのスナップショットを保持するメメント（記念品）オブジェクトを介して状態の保存と復元を行う。

# **主な要素**

1. **Originator（生成者）**: 内部状態を持つオブジェクト。Memento を使用して自身の状態を保存および復元するためのメソッドを提供する。
2. **Memento（メメント）**: Originator の内部状態のスナップショットを保持する。Memento は不変オブジェクトであり、Originator 以外からのアクセスを制限する。
3. **Caretaker（世話人）**: Memento の管理者。Caretaker は Memento を作成、保存、復元しますが、Memento の内部状態にはアクセスしない。

# **Memento パターンの実装例**

以下は、Java 言語を使用した Memento パターンの実装例である。例として、テキストエディタの状態を保存および復元する機能を考えてみよう。

```java
javaCopy code
// Memento クラス
class EditorMemento {
    private final String content;

    public EditorMemento(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }
}

// Originator クラス
class TextEditor {
    private String content;

    public void setContent(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }

    public EditorMemento save() {
        return new EditorMemento(content);
    }

    public void restore(EditorMemento memento) {
        content = memento.getContent();
    }
}

// Caretaker クラス
class History {
    private final List<EditorMemento> mementos = new ArrayList<>();

    public void addMemento(EditorMemento memento) {
        mementos.add(memento);
    }

    public EditorMemento getMemento(int index) {
        return mementos.get(index);
    }
}

// クライアント
public class Client {
    public static void main(String[] args) {
        TextEditor editor = new TextEditor();
        History history = new History();

        // テキスト編集
        editor.setContent("First draft");
        // 状態を保存
        history.addMemento(editor.save());

        // テキスト編集
        editor.setContent("Second draft");
        // 状態を保存
        history.addMemento(editor.save());

        // テキストの復元
        editor.restore(history.getMemento(0));
        System.out.println(editor.getContent()); // First draft
    }
}

```

# **利用例**

Memento パターンは、以下のような場面で利用される：

1. **オブジェクトの状態の履歴を管理したい場合**: オブジェクトの状態の履歴を管理し、特定の時点で過去の状態に戻したり、状態の変化を追跡したい場合に、Memento パターンが役立つ。
2. **オブジェクトの状態のスナップショットを取得したい場合**: オブジェクトの状態のスナップショットを取得し、後でその状態を復元したい場合、Memento パターンを使用する。
3. **オブジェクトの内部状態をカプセル化したい場合**: オブジェクトの内部状態をカプセル化し、外部から直接アクセスされるのを防ぎたい場合、Memento パターンが有用である。

Memento パターンは、特にオブジェクトの状態の管理やスナップショットの取得が必要な場合に有用である。それにより、オブジェクトの内部状態が安全に管理され、柔軟性と拡張性が向上する。
