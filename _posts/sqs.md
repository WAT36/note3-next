---
title: "Amazon SQSを利用してみた"
excerpt: "AWS SQSの概要紹介と利用法"
coverImage: "/assets/posts/sqs/SQS.png"
date: "2025-05-25T13:33:43.000Z"
updatedAt: "2025-05-25T13:33:43.000Z"
tag: ["AWS"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

AWS 資格をいくつか取得してきたものの、実際使ったことないサービスは結構ある状態だったため、今回は学習の一環として、メッセージキューサービスの Amazon SQS（Simple Queue Service）を実際に使ってみることにした。

# SQS とは

SQS（Simple Queue Service）[^1]は、AWS が提供するフルマネージドなメッセージキューサービスである。

メッセージキューとは、アプリケーション間でメッセージを非同期に送受信するための仕組みである。例えるなら「郵便ポスト」のようなもので、送信者はメッセージを投函し、受信者は都合の良いタイミングでメッセージを取り出すことができる。

![](/assets/posts/sqs/queue.png)

また、以下のような特徴がある。

- **フルマネージド**: サーバーの管理が不要
- **高可用性**: AWS のインフラにより 99.9%の可用性を提供
- **スケーラブル**: トラフィックに応じて自動でスケール
- **セキュア**: 暗号化やアクセス制御が可能
- **低コスト**: 使った分だけの従量課金

実際の使用例としては、以下のようなものがある。

- Web アプリケーションでの重い処理を別のワーカーに委託
- マイクロサービス間の通信
- バッチ処理のジョブキュー
- システム間の疎結合な連携

# SQS の機能

SQS の各機能についてを示す。

## SQS の種類

まず、SQS は主に以下の 2 種類がある。

### **Standard Queue（標準キュー）**

- 最大スループット
- At-Least-Once 配信（最低 1 回は配信される）
- ベストエフォート順序（順序は保証されない）

### **FIFO Queue（FIFO キュー）**

- 先入先出順序が保証される
- Exactly-Once 配信（重複配信なし）
- スループットは制限される（最大 300 メッセージ/秒）

## SQS の設定項目

SQS に設定できる機能として、主に以下のようなものがある。

- **可視性タイムアウト**: メッセージが取得された後、他のコンシューマーから見えなくなる時間
- **遅延キュー**: メッセージを送信してもすぐには受信されず、指定した時間が経過してから受信可能になるようにする機能
- **重複排除 ID**: 同じメッセージが何度も送られたとしても、1 回だけ処理されるようにするための仕組み(FIFO キューのみ可)
- **デッドレターキュー**: 処理に失敗したメッセージを別のキューに移動させる機能

# SQS を作ってみる

AWS マネジメントコンソールから画面を操作して作る方法もあるが、

以前 Terraform を利用していたため、今回はそれで作成する。

（Terraform についてのは以前の記事を参照）

以下に、SQS を作成する terraform スクリプトを記載する。

("sample_queue"の部分は各自の環境に応じて適宜変更のこと)

```plaintext
# 標準キューの作成
resource "aws_sqs_queue" "sample_queue" {
  # キューの名前
  name = "sample-queue"

  # メッセージ保持期間（秒）
  message_retention_seconds = 1209600  # 14日

  # 可視性タイムアウト（秒）
  visibility_timeout_seconds = 30

  # 配信遅延（秒）
  delay_seconds = 0

  # 最大メッセージサイズ（バイト）
  max_message_size = 262144  # 256KB

  # ロングポーリング待機時間（秒）
  receive_wait_time_seconds = 20
}
```

この状態で apply すると、SQS が作られる。

# SQS を利用する

実際に SQS を利用してメッセージを送受信する。

AWS CLI でも可能であるが、ここでは typescript で実施する。

まずは typescript のプロジェクトと必要なモジュールをインストールする。
以下の通りに、プロジェクトを作成してください。

```tsx
mkdir sqs-demo-ts && cd sqs-demo-ts
npm init -y
npm install typescript ts-node @types/node --save-dev
npx tsc --init
npm install @aws-sdk/client-sqs
```

## SQS にメッセージを送る

SQS にメッセージを送るコードを作成する。例を以下に記載する。

```tsx
//send.ts
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

const REGION = "ap-northeast-1"; // 利用しているリージョンに置き換え
const QUEUE_URL =
  "https://sqs.ap-northeast-1.amazonaws.com/123456789012/test-queue"; // 自分のSQSのURLに置き換え

const client = new SQSClient({ region: REGION });

async function sendMessage(): Promise<void> {
  const command = new SendMessageCommand({
    QueueUrl: QUEUE_URL,
    MessageBody: "Hello from TypeScript!",
  });

  try {
    const response = await client.send(command);
    console.log("Message sent successfully:", response.MessageId);
  } catch (error) {
    console.error("Error sending message:", error);
  }
}

sendMessage();
```

## SQS からメッセージを受け取る

次に、SQS からメッセージを受け取るコードも作成する。例は以下に記載。

```tsx
// receive.ts
import {
  SQSClient,
  ReceiveMessageCommand,
  DeleteMessageCommand,
  Message,
} from "@aws-sdk/client-sqs";

const REGION = "ap-northeast-1"; // 利用しているリージョンに置き換え
const QUEUE_URL =
  "https://sqs.ap-northeast-1.amazonaws.com/123456789012/test-queue"; // 自分のSQSのURLに置き換え

const client = new SQSClient({ region: REGION });

async function receiveMessages(): Promise<void> {
  const command = new ReceiveMessageCommand({
    QueueUrl: QUEUE_URL,
    MaxNumberOfMessages: 1,
    WaitTimeSeconds: 10,
  });

  try {
    const response = await client.send(command);
    const messages = response.Messages;

    if (!messages || messages.length === 0) {
      console.log("No messages received.");
      return;
    }

    for (const message of messages) {
      console.log("Received message:", message.Body);

      // 削除処理
      if (message.ReceiptHandle) {
        await client.send(
          new DeleteMessageCommand({
            QueueUrl: QUEUE_URL,
            ReceiptHandle: message.ReceiptHandle,
          })
        );
        console.log("Message deleted.");
      }
    }
  } catch (error) {
    console.error("Error receiving messages:", error);
  }
}

receiveMessages();
```

## 実行例

それらのファイルを実行してみましょう。正しく実行できれば SQS キューにメッセージを送信、受信できるはずです。

```bash
$npx ts-node send.ts    # メッセージをSQSに送る
Message sent successfully: c676c616-6a69-606b-6364-60606e606e6f
$npx ts-node receive.ts # メッセージをSQSから受け取る
Received message: Hello from TypeScript!
Message deleted.
$
```

細かい諸機能の利用までは行かなかったが、SQS を実際に手を動かして確認することで、より深い理解につながったため、他の AWS サービスの実践も続けて試してみたいと思っている。

---

[^1]: [Amazon SQS(公式ページ)](https://aws.amazon.com/jp/sqs/)
