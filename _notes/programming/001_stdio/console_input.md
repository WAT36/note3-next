---
title: "コンソール入力"
date: "2019-10-12T17:03:35.000Z"
excerpt: ""
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2025-11-25T00:12:02.000Z"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

プログラムを起動した後に、コンピュータからコマンドを入力して受け付ける方法がある。この入力を**コンソール入力**という。

```bash
$ ./a.exe  (実行ファイル(またはプログラム))
10    (ファイル実行後に、値を入力することができる。)
```

ここでは、コンソール入力を読み取る方法を記載する。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
import java.util.Scanner;
Scanner sc = new Scanner(System.in);
String s = sc.nextLine();
```

クラスはここでは Main.java とする
java でコンソールからの入力を扱うには **Scanner** クラスをインポートし、インスタンスを生成する。
その後、入力データを何のデータ型で受け取るかにより利用する Scanner クラスのメソッドが別れる。下に一部記載する。

| メソッド   | 意味                                                                                                                                          |
| :--------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| next()     | 入力した値を文字列型で読み込む。スペース区切りした場合は最初の箇所が読み取られる（その後に再度 next()を実行するとその次の箇所が読み取られる） |
| nextInt()  | 入力した値を数値(int)型で読み込む。スペース区切りした場合も next()と同じ                                                                      |
| nextLine() | 入力した値を１行分読み込む。                                                                                                                  |
| ...        |                                                                                                                                               |

実行例

```bash
$ javac Main.java
$ java Main
10
// s = "10"
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
s = input() # コンソールからの入力をsに格納する
```

Python でコンソールからの入力を扱うには組み込み関数の **input()** を使う。

基本入力１行を読み込み、文字列に変換して渡される。

数値にしたい場合は int()で囲うなどし、スペースを区切りたい時などは split()等を使う。

実行例

```bash
$ python main.py
10
# s = "10"
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.question("", (answer) => {});
```

JavaScript(Node.js)でコンソールからの入力を扱うには、**readline** モジュールを使用する。

readline.createInterface() でインターフェースを作成し、rl.question() で入力を受け取る。
コールバック関数の answer パラメータに入力値が文字列として渡される。

実行例（上のファイルを main.js とする）

```bash
$ node main.js
10
// answer = "10"
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
package main
import (
    "fmt"
    "bufio"
    "os"
)

func main() {
    reader := bufio.NewReader(os.Stdin)
    input, _ := reader.ReadString('\n')
}
```

Go 言語でコンソールからの入力を扱うには、**bufio** パッケージの NewReader を使用する。

bufio.NewReader(os.Stdin) でリーダーを作成し、ReadString('\n') で改行文字まで読み込む。
入力値は文字列として返される。

実行例（上のファイルを main.go とする）

```bash
$ go run main.go
10
// input = "10\n"
```

</div>
