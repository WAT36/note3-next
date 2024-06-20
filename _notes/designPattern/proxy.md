---
title: "Proxyパターン"
excerpt: ""
coverImage: ""
date: "2024-06-20T22:22:47.000Z"
updatedAt: "2024-06-20T22:22:47.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

Proxy（プロキシ）パターンは、ソフトウェアデザインパターンの一つで、他のオブジェクトへの間接的なアクセスを提供します。このパターンでは、クライアントと実際のサービスオブジェクトの間に、サービスオブジェクトをラップするプロキシオブジェクトが挿入されます。プロキシは、サービスオブジェクトと同じインターフェースを実装し、クライアントが直接サービスオブジェクトにアクセスするかのように振る舞いますが、その間に追加の機能を提供することができます。

### **主な要素**

1. **Subject（主題）**: クライアントとプロキシオブジェクトが共通で利用するインターフェースです。Subject は、プロキシと実際のサービスオブジェクトの両方が実装するインターフェースを定義します。
2. **Proxy（プロキシ）**: Subject のインターフェースを実装し、クライアントからの要求を処理する中間オブジェクトです。プロキシは、実際のサービスオブジェクトへのアクセスを制御し、必要に応じて追加の機能を提供します。
3. **RealSubject（実際の主題）**: 実際のサービスを提供するオブジェクトです。プロキシは、この実際のサービスオブジェクトへのアクセスを制御します。

### **Proxy パターンの実装例**

以下は、Java 言語を使用した Proxy パターンの実装例です。例として、ファイルの読み込みを制御するプロキシを考えてみましょう。

```java
javaCopy code
// Subject インターフェース
interface FileReader {
    String read(String fileName);
}

// RealSubject クラス
class RealFileReader implements FileReader {
    @Override
    public String read(String fileName) {
        // 実際のファイルの読み込み処理
        return "Content of " + fileName;
    }
}

// Proxy クラス
class ProxyFileReader implements FileReader {
    private final RealFileReader realFileReader = new RealFileReader();

    @Override
    public String read(String fileName) {
        // ファイル読み込みの前に何らかの処理を行うことができる
        System.out.println("Proxy: Before reading file...");

        // 実際のファイル読み込み処理を呼び出す
        String content = realFileReader.read(fileName);

        // ファイル読み込みの後に何らかの処理を行うことができる
        System.out.println("Proxy: After reading file...");

        return content;
    }
}

// クライアント
public class Client {
    public static void main(String[] args) {
        FileReader fileReader = new ProxyFileReader();

        // プロキシを通じてファイルを読み込む
        String content = fileReader.read("example.txt");
        System.out.println("File content: " + content);
    }
}

```

### **利用例**

Proxy パターンは、以下のような場面で利用されます：

1. **リモートオブジェクトにアクセスする際の制御が必要な場合**: クライアントがリモートサーバー上のオブジェクトにアクセスする場合、Proxy パターンを使用してアクセスを制御し、リモート呼び出しを最適化することができます。
2. **オブジェクトの生成や初期化に時間がかかる場合**: オブジェクトの生成や初期化に時間がかかる場合、Proxy パターンを使用して、遅延初期化やキャッシュを実装することで、パフォーマンスを向上させることができます。
3. **セキュリティやアクセス制御が必要な場合**: セキュリティやアクセス制御が必要な場合、Proxy パターンを使用して、アクセスを制御し、不正なアクセスや権限のない操作を防止することができます。

Proxy パターンは、特にリモートオブジェクトにアクセスする際の制御が必要な場合や、オブジェクトの生成や初期化に時間がかかる場合に有用です。それにより、クライアントとサービスオブジェクトの間に追加の機能を提供し、柔軟性と拡張性を向上させます。
