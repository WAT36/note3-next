---
title: "ファイル書き込み"
date: "2019-10-31T01:37:30+09:00"
excerpt: "ファイル書き込みについて"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-31T01:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

ファイルに書き込む方法について説明する。各言語で異なる API が提供されている。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
Files.writeString(Path.of("file.txt"), "content")
```

Java では複数の方法でファイルに書き込める。現代では`Files`クラスが推奨される。

**Files.writeString（Java 11+、推奨）**:

文字列をファイルに書き込む。

```java
import java.nio.file.Files;
import java.nio.file.Path;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        try {
            Files.writeString(Path.of("test.txt"), "Hello, World!");
            System.out.println("ファイルに書き込みました");
        } catch (IOException e) {
            System.err.println("ファイル書き込みエラー: " + e.getMessage());
        }
    }
}
```

**Files.write（Java 7+）**:

バイト配列またはリストをファイルに書き込む。

```java
import java.nio.file.Files;
import java.nio.file.Path;
import java.io.IOException;
import java.util.List;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        try {
            // 文字列のリストを書き込む
            List<String> lines = Arrays.asList("line1", "line2", "line3");
            Files.write(Path.of("test.txt"), lines);

            // バイト配列を書き込む
            byte[] data = "Hello".getBytes();
            Files.write(Path.of("test.txt"), data);
        } catch (IOException e) {
            System.err.println("エラー: " + e.getMessage());
        }
    }
}
```

**ファイルへの追記**:

```java
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        try {
            // 既存のファイルに追記
            Files.writeString(
                Path.of("test.txt"),
                "追記する内容\n",
                StandardOpenOption.APPEND
            );
        } catch (IOException e) {
            System.err.println("エラー: " + e.getMessage());
        }
    }
}
```

**BufferedWriter（従来の方法）**:

大量のデータを効率的に書き込む。

```java
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter("test.txt"))) {
            writer.write("line1");
            writer.newLine();
            writer.write("line2");
            writer.newLine();
        } catch (IOException e) {
            System.err.println("エラー: " + e.getMessage());
        }
        // try-with-resources で自動的にクローズ
    }
}
```

**追記モードで BufferedWriter**:

```java
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        // 第2引数に true を指定すると追記モード
        try (BufferedWriter writer = new BufferedWriter(new FileWriter("test.txt", true))) {
            writer.write("追記する内容");
            writer.newLine();
        } catch (IOException e) {
            System.err.println("エラー: " + e.getMessage());
        }
    }
}
```

**エンコーディング指定**:

```java
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.charset.StandardCharsets;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        try {
            Files.writeString(
                Path.of("test.txt"),
                "UTF-8で書き込む",
                StandardCharsets.UTF_8
            );
        } catch (IOException e) {
            System.err.println("エラー: " + e.getMessage());
        }
    }
}
```

**バイナリファイルの書き込み**:

```java
import java.nio.file.Files;
import java.nio.file.Path;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        try {
            byte[] data = {0x48, 0x65, 0x6C, 0x6C, 0x6F}; // "Hello"
            Files.write(Path.of("test.bin"), data);
            System.out.println("バイナリファイルに書き込みました");
        } catch (IOException e) {
            System.err.println("エラー: " + e.getMessage());
        }
    }
}
```

**実用例（ログファイルへの追記）**:

```java
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Logger {
    private static final Path LOG_FILE = Path.of("app.log");

    public static void log(String message) {
        try {
            String timestamp = LocalDateTime.now()
                .format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
            String logLine = String.format("[%s] %s%n", timestamp, message);

            Files.writeString(
                LOG_FILE,
                logLine,
                StandardOpenOption.CREATE,
                StandardOpenOption.APPEND
            );
        } catch (IOException e) {
            System.err.println("ログ書き込みエラー: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        log("アプリケーション開始");
        log("処理を実行中");
        log("アプリケーション終了");
    }
}
```

**実用例（CSV ファイルの書き込み）**:

```java
import java.nio.file.Files;
import java.nio.file.Path;
import java.io.IOException;
import java.util.List;
import java.util.Arrays;
import java.util.stream.Collectors;

public class Main {
    public static void writeCSV(String filename, List<List<String>> data) throws IOException {
        List<String> lines = data.stream()
            .map(row -> String.join(",", row))
            .collect(Collectors.toList());

        Files.write(Path.of(filename), lines);
    }

    public static void main(String[] args) {
        try {
            List<List<String>> data = Arrays.asList(
                Arrays.asList("名前", "年齢", "都市"),
                Arrays.asList("田中", "30", "東京"),
                Arrays.asList("佐藤", "25", "大阪")
            );

            writeCSV("data.csv", data);
            System.out.println("CSVファイルに書き込みました");
        } catch (IOException e) {
            System.err.println("エラー: " + e.getMessage());
        }
    }
}
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
with open("file.txt", "w") as f:
    f.write("content")
```

Python では`open()`関数でファイルを開き、`write()`メソッドで書き込む。`with`文で自動的にクローズする。

**基本的なファイル書き込み（上書き）**:

```python
# ファイルに上書きで書き込む（'w'モード）
with open("test.txt", "w") as file:
    file.write("Hello, World!")
# with ブロックを抜けると自動的にクローズ
```

**ファイルへの追記**:

```python
# ファイルの末尾に追記（'a'モード）
with open("test.txt", "a") as file:
    file.write("追記する内容\n")
```

**複数行の書き込み**:

```python
# writelines(): リストの各要素を書き込む
lines = ["line1\n", "line2\n", "line3\n"]
with open("test.txt", "w") as file:
    file.writelines(lines)

# forループで書き込む
with open("test.txt", "w") as file:
    for i in range(5):
        file.write(f"Line {i}\n")
```

**エンコーディング指定**:

```python
# UTF-8 で書き込む
with open("test.txt", "w", encoding="utf-8") as file:
    file.write("日本語テキスト")

# Shift-JIS で書き込む
with open("test.txt", "w", encoding="shift_jis") as file:
    file.write("シフトJIS形式")
```

**バイナリファイルの書き込み**:

```python
# バイナリモードで書き込む（'wb'モード）
with open("test.bin", "wb") as file:
    data = bytes([0x48, 0x65, 0x6C, 0x6C, 0x6F])  # "Hello"
    file.write(data)
```

**Path オブジェクト（pathlib）**:

Python 3.4+ では`pathlib`の使用が推奨される。

```python
from pathlib import Path

# テキストをファイルに書き込む
Path("test.txt").write_text("Hello, World!")

# バイトをファイルに書き込む
Path("test.bin").write_bytes(b"Hello")

# エンコーディング指定
Path("test.txt").write_text("日本語テキスト", encoding="utf-8")
```

**ファイルモードの種類**:

| モード | 説明                                               |
| ------ | -------------------------------------------------- |
| `'w'`  | 書き込み（上書き）。ファイルが存在しない場合は作成 |
| `'a'`  | 追記。ファイルの末尾に追加                         |
| `'x'`  | 排他的作成。ファイルが存在する場合はエラー         |
| `'wb'` | バイナリ書き込み（上書き）                         |
| `'ab'` | バイナリ追記                                       |
| `'w+'` | 読み書き両用（上書き）                             |

**実用例（ログファイルへの追記）**:

```python
from datetime import datetime

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    log_line = f"[{timestamp}] {message}\n"

    with open("app.log", "a") as file:
        file.write(log_line)

# 使用例
log("アプリケーション開始")
log("処理を実行中")
log("アプリケーション終了")
```

**実用例（CSV ファイルの書き込み）**:

```python
import csv

data = [
    ["名前", "年齢", "都市"],
    ["田中", "30", "東京"],
    ["佐藤", "25", "大阪"]
]

with open("data.csv", "w", encoding="utf-8", newline="") as file:
    writer = csv.writer(file)
    writer.writerows(data)
```

**実用例（JSON ファイルの書き込み）**:

```python
import json

data = {
    "name": "田中",
    "age": 30,
    "city": "東京"
}

with open("data.json", "w", encoding="utf-8") as file:
    json.dump(data, file, ensure_ascii=False, indent=2)
```

**実用例（大きなファイルを効率的に書き込む）**:

```python
def write_large_file(filename, data_generator):
    with open(filename, "w") as file:
        for chunk in data_generator:
            file.write(chunk)

# 使用例
def generate_data():
    for i in range(1000000):
        yield f"Line {i}\n"

write_large_file("large_file.txt", generate_data())
```

**従来の方法（try-finally）**:

with 文が使えない場合。

```python
file = None
try:
    file = open("test.txt", "w")
    file.write("Hello, World!")
except IOError as e:
    print(f"エラー: {e}")
finally:
    if file:
        file.close()
```

**排他的作成（'x'モード）**:

```python
try:
    with open("new_file.txt", "x") as file:
        file.write("新しいファイル")
except FileExistsError:
    print("ファイルは既に存在します")
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
// Node.js
fs.writeFileSync("file.txt", "content");
```

JavaScript では環境によって方法が異なる。Node.js では`fs`モジュール、ブラウザでは`Blob`や`File System Access API`を使う。

**Node.js: fs.writeFileSync（同期）**:

```javascript
const fs = require("fs");

try {
  fs.writeFileSync("test.txt", "Hello, World!");
  console.log("ファイルに書き込みました");
} catch (error) {
  console.error("ファイル書き込みエラー:", error.message);
}
```

**Node.js: fs.writeFile（非同期・コールバック）**:

```javascript
const fs = require("fs");

fs.writeFile("test.txt", "Hello, World!", "utf8", (error) => {
  if (error) {
    console.error("エラー:", error.message);
    return;
  }
  console.log("ファイルに書き込みました");
});
```

**Node.js: fs.promises（非同期・Promise）**:

```javascript
const fs = require("fs").promises;

async function writeFile() {
  try {
    await fs.writeFile("test.txt", "Hello, World!", "utf8");
    console.log("ファイルに書き込みました");
  } catch (error) {
    console.error("エラー:", error.message);
  }
}

writeFile();
```

**Node.js: ファイルへの追記**:

```javascript
const fs = require("fs").promises;

async function appendFile() {
  try {
    await fs.appendFile("test.txt", "追記する内容\n", "utf8");
    console.log("ファイルに追記しました");
  } catch (error) {
    console.error("エラー:", error.message);
  }
}

appendFile();
```

**Node.js: 複数行の書き込み**:

```javascript
const fs = require("fs").promises;

async function writeLines() {
  const lines = ["line1", "line2", "line3"];
  const content = lines.join("\n");

  try {
    await fs.writeFile("test.txt", content, "utf8");
    console.log("複数行を書き込みました");
  } catch (error) {
    console.error("エラー:", error.message);
  }
}

writeLines();
```

**Node.js: バイナリファイルの書き込み**:

```javascript
const fs = require("fs");

// Buffer から書き込む
const buffer = Buffer.from([0x48, 0x65, 0x6c, 0x6c, 0x6f]); // "Hello"
fs.writeFileSync("test.bin", buffer);

// 非同期
const fs2 = require("fs").promises;
async function writeBinary() {
  const buffer = Buffer.from("Hello");
  await fs2.writeFile("test.bin", buffer);
}
```

**Node.js: ストリームで書き込む**:

大きなファイルを効率的に書き込む。

```javascript
const fs = require("fs");

const stream = fs.createWriteStream("test.txt");

stream.write("line1\n");
stream.write("line2\n");
stream.write("line3\n");

stream.end(() => {
  console.log("書き込み完了");
});

stream.on("error", (error) => {
  console.error("エラー:", error.message);
});
```

**ブラウザ: File System Access API（モダンブラウザ）**:

```javascript
// ファイル保存ダイアログを表示
async function saveFile(content) {
  try {
    const handle = await window.showSaveFilePicker({
      suggestedName: "test.txt",
      types: [
        {
          description: "Text Files",
          accept: { "text/plain": [".txt"] },
        },
      ],
    });

    const writable = await handle.createWritable();
    await writable.write(content);
    await writable.close();

    console.log("ファイルに書き込みました");
  } catch (error) {
    console.error("エラー:", error.message);
  }
}

saveFile("Hello, World!");
```

**ブラウザ: Blob とダウンロードリンク**:

```javascript
// テキストをファイルとしてダウンロード
function downloadText(content, filename) {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}

downloadText("Hello, World!", "test.txt");

// JSONをファイルとしてダウンロード
function downloadJSON(data, filename) {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}

const data = { name: "田中", age: 30 };
downloadJSON(data, "data.json");
```

**実用例（ログファイルへの追記・Node.js）**:

```javascript
const fs = require("fs").promises;

async function log(message) {
  const timestamp = new Date().toISOString();
  const logLine = `[${timestamp}] ${message}\n`;

  try {
    await fs.appendFile("app.log", logLine, "utf8");
  } catch (error) {
    console.error("ログ書き込みエラー:", error.message);
  }
}

// 使用例
async function main() {
  await log("アプリケーション開始");
  await log("処理を実行中");
  await log("アプリケーション終了");
}

main();
```

**実用例（CSV ファイルの書き込み・Node.js）**:

```javascript
const fs = require("fs").promises;

async function writeCSV(filename, data) {
  const csvContent = data.map((row) => row.join(",")).join("\n");

  try {
    await fs.writeFile(filename, csvContent, "utf8");
    console.log("CSVファイルに書き込みました");
  } catch (error) {
    console.error("エラー:", error.message);
  }
}

// 使用例
const data = [
  ["名前", "年齢", "都市"],
  ["田中", "30", "東京"],
  ["佐藤", "25", "大阪"],
];

writeCSV("data.csv", data);
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
os.WriteFile("file.txt", []byte("content"), 0644)
```

Go では`os`パッケージや`io`パッケージでファイルに書き込む。

**os.WriteFile（Go 1.16+、推奨）**:

ファイル全体を一度に書き込む。

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    data := []byte("Hello, World!")
    err := os.WriteFile("test.txt", data, 0644)
    if err != nil {
        fmt.Println("ファイル書き込みエラー:", err)
        return
    }

    fmt.Println("ファイルに書き込みました")
}
```

**os.Create と Write**:

ファイルを開いて手動で書き込む。

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    file, err := os.Create("test.txt")
    if err != nil {
        fmt.Println("ファイル作成エラー:", err)
        return
    }
    defer file.Close()

    _, err = file.WriteString("Hello, World!")
    if err != nil {
        fmt.Println("書き込みエラー:", err)
        return
    }

    fmt.Println("ファイルに書き込みました")
}
```

**ファイルへの追記**:

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    // os.O_APPEND フラグで追記モード
    file, err := os.OpenFile("test.txt", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
    if err != nil {
        fmt.Println("ファイルオープンエラー:", err)
        return
    }
    defer file.Close()

    _, err = file.WriteString("追記する内容\n")
    if err != nil {
        fmt.Println("書き込みエラー:", err)
        return
    }

    fmt.Println("ファイルに追記しました")
}
```

**bufio.Writer で効率的に書き込む**:

```go
package main

import (
    "bufio"
    "fmt"
    "os"
)

func main() {
    file, err := os.Create("test.txt")
    if err != nil {
        fmt.Println("エラー:", err)
        return
    }
    defer file.Close()

    writer := bufio.NewWriter(file)

    writer.WriteString("line1\n")
    writer.WriteString("line2\n")
    writer.WriteString("line3\n")

    // バッファをフラッシュ（重要）
    err = writer.Flush()
    if err != nil {
        fmt.Println("フラッシュエラー:", err)
        return
    }

    fmt.Println("ファイルに書き込みました")
}
```

**複数行の書き込み**:

```go
package main

import (
    "fmt"
    "os"
    "strings"
)

func main() {
    lines := []string{"line1", "line2", "line3"}
    content := strings.Join(lines, "\n")

    err := os.WriteFile("test.txt", []byte(content), 0644)
    if err != nil {
        fmt.Println("エラー:", err)
        return
    }

    fmt.Println("複数行を書き込みました")
}
```

**バイナリファイルの書き込み**:

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    data := []byte{0x48, 0x65, 0x6C, 0x6C, 0x6F} // "Hello"

    err := os.WriteFile("test.bin", data, 0644)
    if err != nil {
        fmt.Println("エラー:", err)
        return
    }

    fmt.Println("バイナリファイルに書き込みました")
}
```

**ファイルパーミッション**:

```go
// よく使われるパーミッション
// 0644: rw-r--r-- (所有者: 読み書き, グループ: 読み, その他: 読み)
// 0755: rwxr-xr-x (所有者: 全て, グループ: 読み実行, その他: 読み実行)
// 0600: rw------- (所有者のみ読み書き)

err := os.WriteFile("test.txt", []byte("content"), 0644)
```

**実用例（ログファイルへの追記）**:

```go
package main

import (
    "fmt"
    "os"
    "time"
)

func log(message string) error {
    timestamp := time.Now().Format("2006-01-02 15:04:05")
    logLine := fmt.Sprintf("[%s] %s\n", timestamp, message)

    file, err := os.OpenFile("app.log", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
    if err != nil {
        return fmt.Errorf("ファイルオープンエラー: %w", err)
    }
    defer file.Close()

    _, err = file.WriteString(logLine)
    if err != nil {
        return fmt.Errorf("書き込みエラー: %w", err)
    }

    return nil
}

func main() {
    log("アプリケーション開始")
    log("処理を実行中")
    log("アプリケーション終了")
}
```

**実用例（CSV ファイルの書き込み）**:

```go
package main

import (
    "encoding/csv"
    "fmt"
    "os"
)

func writeCSV(filename string, data [][]string) error {
    file, err := os.Create(filename)
    if err != nil {
        return fmt.Errorf("ファイル作成エラー: %w", err)
    }
    defer file.Close()

    writer := csv.NewWriter(file)
    defer writer.Flush()

    for _, row := range data {
        err := writer.Write(row)
        if err != nil {
            return fmt.Errorf("書き込みエラー: %w", err)
        }
    }

    return nil
}

func main() {
    data := [][]string{
        {"名前", "年齢", "都市"},
        {"田中", "30", "東京"},
        {"佐藤", "25", "大阪"},
    }

    err := writeCSV("data.csv", data)
    if err != nil {
        fmt.Println("CSVファイル書き込みエラー:", err)
        return
    }

    fmt.Println("CSVファイルに書き込みました")
}
```

**実用例（JSON ファイルの書き込み）**:

```go
package main

import (
    "encoding/json"
    "fmt"
    "os"
)

type Person struct {
    Name string `json:"name"`
    Age  int    `json:"age"`
    City string `json:"city"`
}

func main() {
    person := Person{
        Name: "田中",
        Age:  30,
        City: "東京",
    }

    // インデント付きでJSON化
    data, err := json.MarshalIndent(person, "", "  ")
    if err != nil {
        fmt.Println("JSONマーシャルエラー:", err)
        return
    }

    err = os.WriteFile("data.json", data, 0644)
    if err != nil {
        fmt.Println("ファイル書き込みエラー:", err)
        return
    }

    fmt.Println("JSONファイルに書き込みました")
}
```

**実用例（大きなファイルを効率的に書き込む）**:

```go
package main

import (
    "bufio"
    "fmt"
    "os"
)

func writeLargeFile(filename string) error {
    file, err := os.Create(filename)
    if err != nil {
        return err
    }
    defer file.Close()

    writer := bufio.NewWriter(file)
    defer writer.Flush()

    for i := 0; i < 1000000; i++ {
        _, err := fmt.Fprintf(writer, "Line %d\n", i)
        if err != nil {
            return err
        }
    }

    return nil
}

func main() {
    err := writeLargeFile("large_file.txt")
    if err != nil {
        fmt.Println("エラー:", err)
        return
    }

    fmt.Println("大きなファイルに書き込みました")
}
```

</div>
