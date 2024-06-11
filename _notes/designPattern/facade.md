---
title: "Facadeパターン"
excerpt: ""
coverImage: ""
date: "2024-06-12T00:51:56.000Z"
updatedAt: "2024-06-12T00:51:56.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

Facade（ファサード）パターンは、ソフトウェアデザインパターンの一つで、複雑なシステムやサブシステムの間に単純なインターフェースを提供するためのパターンです。このパターンでは、複雑なシステムを単純なインターフェースでラップし、クライアントが簡単にシステムの機能を利用できるようにします。これにより、システム内部の複雑さを隠蔽し、クライアントがより使いやすいインターフェースを提供します。

### **主な要素**

1. **Facade（ファサード）**: システムの中心となる単純なインターフェースを提供します。このインターフェースは、システム内の複雑なサブシステムや機能をラップし、外部に公開します。
2. **Subsystems（サブシステム）**: ファサードがラップする複雑なサブシステムや機能の集合です。これらのサブシステムは、ファサードを介してクライアントに公開されることで、外部からアクセスされます。

### **Facade パターンの実装例**

以下は、Java 言語を使用した Facade パターンの実装例です。例として、オーディオシステムの制御を行う Facade クラスを考えてみましょう。

```java
javaCopy code
// Subsystem1: Amplifier
class Amplifier {
    void on() {
        System.out.println("Amplifier is on");
    }

    void off() {
        System.out.println("Amplifier is off");
    }
}

// Subsystem2: Speaker
class Speaker {
    void on() {
        System.out.println("Speaker is on");
    }

    void off() {
        System.out.println("Speaker is off");
    }
}

// Subsystem3: AudioPlayer
class AudioPlayer {
    void play() {
        System.out.println("Audio is playing");
    }

    void stop() {
        System.out.println("Audio is stopped");
    }
}

// Facade クラス
class AudioFacade {
    private Amplifier amplifier;
    private Speaker speaker;
    private AudioPlayer audioPlayer;

    public AudioFacade() {
        this.amplifier = new Amplifier();
        this.speaker = new Speaker();
        this.audioPlayer = new AudioPlayer();
    }

    void startPlaying() {
        amplifier.on();
        speaker.on();
        audioPlayer.play();
    }

    void stopPlaying() {
        amplifier.off();
        speaker.off();
        audioPlayer.stop();
    }
}

// クライアント
public class Client {
    public static void main(String[] args) {
        // Facade を使用してオーディオシステムを制御
        AudioFacade audioFacade = new AudioFacade();
        audioFacade.startPlaying();
        // 何か処理
        audioFacade.stopPlaying();
    }
}

```

この例では、Amplifier、Speaker、AudioPlayer の 3 つのサブシステムを持つオーディオシステムがあります。AudioFacade クラスは、これらのサブシステムをラップし、クライアントに単純なインターフェースを提供します。クライアントは、Facade を介してオーディオシステムを制御します。

### **利用例**

Facade パターンは、以下のような場面で利用されます：

1. **複雑なシステムを単純なインターフェースで提供したい場合**: 複数のサブシステムを持つ複雑なシステムを単純なインターフェースでラップし、クライアントが使いやすいように提供します。
2. **システムの内部の詳細を隠蔽したい場合**: システムの内部の詳細を隠蔽し、クライアントがシステムの機能を利用する際にシンプルなインターフェースを使用できるようにします。
3. **サブシステム間の依存関係を低減したい場合**: サブシステム間の依存関係を低減し、柔軟性を向上させるために、Facade パターンを使用します。

Facade パターンは、特に複雑なシステムをシンプルなインターフェースで提供したい場合や、システムの内部の詳細を隠蔽したい場合に有用です。それにより、クライアントとサブシステム間の結合度が低くなり、柔軟性と拡張性が向上します。
