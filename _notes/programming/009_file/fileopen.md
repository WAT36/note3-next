---
title: "ファイル読み込み"
date: "2019-10-31T00:37:30+09:00"
excerpt: "ファイル読み込みについて"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-31T00:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

ファイルを読み込む方法について説明する。各言語で異なる API が提供されている。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
Files.readString(Path.of("file.txt"))
```

Java では複数の方法でファイルを読み込める。現代では`Files`クラスが推奨される。

**Files.readString（Java 11+、推奨）**:

ファイル全体を文字列として読み込む。

```java
import java.nio.file.Files;
import java.nio.file.Path;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        try {
            String content = Files.readString(Path.of("test.txt"));
            System.out.println(content);
        } catch (IOException e) {
            System.err.println("ファイル読み込みエラー: " + e.getMessage());
        }
    }
}
```

**Files.readAllLines（Java 8+）**:

ファイルを行ごとにリストとして読み込む。

```java
import java.nio.file.Files;
import java.nio.file.Path;
import java.io.IOException;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        try {
            List<String> lines = Files.readAllLines(Path.of("test.txt"));
            for (String line : lines) {
                System.out.println(line);
            }
        } catch (IOException e) {
            System.err.println("エラー: " + e.getMessage());
        }
    }
}
```

**BufferedReader（従来の方法）**:

大きなファイルを効率的に読み込む。

```java
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        try (BufferedReader reader = new BufferedReader(new FileReader("test.txt"))) {
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            System.err.println("エラー: " + e.getMessage());
        }
        // try-with-resources で自動的にクローズ
    }
}
```

**Files.lines（Java 8+、Stream API）**:

行を Stream として処理する。

```java
import java.nio.file.Files;
import java.nio.file.Path;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        try {
            Files.lines(Path.of("test.txt"))
                .forEach(System.out::println);
        } catch (IOException e) {
            System.err.println("エラー: " + e.getMessage());
        }
    }
}
```

**バイナリファイルの読み込み**:

```java
import java.nio.file.Files;
import java.nio.file.Path;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        try {
            byte[] bytes = Files.readAllBytes(Path.of("image.png"));
            System.out.println("読み込んだバイト数: " + bytes.length);
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
            String content = Files.readString(Path.of("test.txt"), StandardCharsets.UTF_8);
            System.out.println(content);
        } catch (IOException e) {
            System.err.println("エラー: " + e.getMessage());
    }
  }
}
```

**実用例（設定ファイルの読み込み）**:

```java
import java.nio.file.Files;
import java.nio.file.Path;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static Map<String, String> loadConfig(String filename) throws IOException {
        Map<String, String> config = new HashMap<>();

        List<String> lines = Files.readAllLines(Path.of(filename));
        for (String line : lines) {
            if (line.trim().isEmpty() || line.startsWith("#")) {
                continue;  // 空行とコメントをスキップ
            }

            String[] parts = line.split("=", 2);
            if (parts.length == 2) {
                config.put(parts[0].trim(), parts[1].trim());
            }
        }

        return config;
    }

    public static void main(String[] args) {
        try {
            Map<String, String> config = loadConfig("config.txt");
            System.out.println(config);
        } catch (IOException e) {
            System.err.println("設定ファイル読み込みエラー: " + e.getMessage());
        }
    }
}
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
with open("file.txt") as f:
    content = f.read()
```

Python では`open()`関数でファイルを開き、`with`文で自動的にクローズする。

**基本的なファイル読み込み**:

```python
# ファイル全体を読み込む
with open("test.txt", "r") as file:
    content = file.read()
    print(content)
# with ブロックを抜けると自動的にクローズ
```

**行ごとに読み込む**:

```python
# readlines(): すべての行をリストとして読み込む
with open("test.txt", "r") as file:
    lines = file.readlines()
    for line in lines:
        print(line.strip())  # 改行を削除

# readline(): 1行ずつ読み込む
with open("test.txt", "r") as file:
    line = file.readline()
    while line:
        print(line.strip())
        line = file.readline()

# イテレータとして使う（推奨）
with open("test.txt", "r") as file:
    for line in file:
        print(line.strip())
```

**エンコーディング指定**:

```python
# UTF-8 で読み込む
with open("test.txt", "r", encoding="utf-8") as file:
    content = file.read()
    print(content)

# Shift-JIS で読み込む
with open("test.txt", "r", encoding="shift_jis") as file:
    content = file.read()
    print(content)
```

**バイナリファイルの読み込み**:

```python
# バイナリモードで読み込む
with open("image.png", "rb") as file:
    data = file.read()
    print(f"読み込んだバイト数: {len(data)}")
```

**Path オブジェクト（pathlib）**:

Python 3.4+ では`pathlib`の使用が推奨される。

```python
from pathlib import Path

# ファイル全体を文字列として読み込む
content = Path("test.txt").read_text()
print(content)

# バイトとして読み込む
data = Path("image.png").read_bytes()
print(f"バイト数: {len(data)}")

# エンコーディング指定
content = Path("test.txt").read_text(encoding="utf-8")
print(content)
```

**サイズ指定で読み込む**:

```python
with open("test.txt", "r") as file:
    # 最初の10文字を読み込む
    chunk = file.read(10)
    print(chunk)

    # 続きを読み込む
    rest = file.read()
    print(rest)
```

**大きなファイルを効率的に読み込む**:

```python
# チャンクごとに読み込む
def read_large_file(filename, chunk_size=1024):
    with open(filename, "r") as file:
        while True:
            chunk = file.read(chunk_size)
            if not chunk:
                break
            yield chunk

for chunk in read_large_file("large_file.txt"):
    process(chunk)
```

**実用例（設定ファイルの読み込み）**:

```python
def load_config(filename):
    config = {}

    with open(filename, "r") as file:
        for line in file:
            line = line.strip()

            # 空行とコメントをスキップ
            if not line or line.startswith("#"):
                continue

            # key=value の形式をパース
            if "=" in line:
                key, value = line.split("=", 1)
                config[key.strip()] = value.strip()

    return config

# 使用例
try:
    config = load_config("config.txt")
    print(config)
except FileNotFoundError:
    print("設定ファイルが見つかりません")
except IOError as e:
    print(f"ファイル読み込みエラー: {e}")
```

**実用例（CSV ファイルの読み込み）**:

```python
import csv

with open("data.csv", "r", encoding="utf-8") as file:
    reader = csv.reader(file)

    # ヘッダーをスキップ
    header = next(reader)
    print("ヘッダー:", header)

    # データを読み込む
    for row in reader:
        print(row)
```

**従来の方法（try-finally）**:

with 文が使えない場合。

```python
file = None
try:
    file = open("test.txt", "r")
    content = file.read()
    print(content)
except IOError as e:
    print(f"エラー: {e}")
finally:
    if file:
        file.close()
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
// Node.js
fs.readFileSync("file.txt", "utf8");
```

JavaScript では環境によって方法が異なる。Node.js では`fs`モジュール、ブラウザでは`fetch`や`FileReader`を使う。

**Node.js: fs.readFileSync（同期）**:

```javascript
const fs = require("fs");

try {
  const content = fs.readFileSync("test.txt", "utf8");
  console.log(content);
} catch (error) {
  console.error("ファイル読み込みエラー:", error.message);
}
```

**Node.js: fs.readFile（非同期・コールバック）**:

```javascript
const fs = require("fs");

fs.readFile("test.txt", "utf8", (error, data) => {
  if (error) {
    console.error("エラー:", error.message);
    return;
  }
  console.log(data);
});
```

**Node.js: fs.promises（非同期・Promise）**:

```javascript
const fs = require("fs").promises;

async function readFile() {
  try {
    const content = await fs.readFile("test.txt", "utf8");
    console.log(content);
  } catch (error) {
    console.error("エラー:", error.message);
  }
}

readFile();
```

**Node.js: 行ごとに読み込む**:

```javascript
const fs = require("fs");
const readline = require("readline");

async function readLines(filename) {
  const fileStream = fs.createReadStream(filename);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    console.log(line);
  }
}

readLines("test.txt");
```

**Node.js: バイナリファイルの読み込み**:

```javascript
const fs = require("fs");

// 同期
const buffer = fs.readFileSync("image.png");
console.log("バイト数:", buffer.length);

// 非同期
fs.readFile("image.png", (error, buffer) => {
  if (error) {
    console.error("エラー:", error.message);
    return;
  }
  console.log("バイト数:", buffer.length);
});
```

**ブラウザ: fetch API**:

```javascript
// テキストファイルを読み込む
async function loadFile(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text();
    console.log(text);
  } catch (error) {
    console.error("エラー:", error.message);
  }
}

loadFile("test.txt");

// JSONファイルを読み込む
async function loadJSON(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
```

**ブラウザ: FileReader（ユーザー選択ファイル）**:

```javascript
// HTML: <input type="file" id="fileInput">

document.getElementById("fileInput").addEventListener("change", (event) => {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result;
      console.log(content);
    };

    reader.onerror = (e) => {
      console.error("読み込みエラー:", e);
    };

    // テキストとして読み込む
    reader.readAsText(file);

    // またはバイナリとして読み込む
    // reader.readAsArrayBuffer(file);
  }
});
```

**実用例（設定ファイルの読み込み・Node.js）**:

```javascript
const fs = require("fs").promises;

async function loadConfig(filename) {
  const config = {};

  try {
    const content = await fs.readFile(filename, "utf8");
    const lines = content.split("\n");

    for (const line of lines) {
      const trimmed = line.trim();

      // 空行とコメントをスキップ
      if (!trimmed || trimmed.startsWith("#")) {
        continue;
      }

      // key=value の形式をパース
      const index = trimmed.indexOf("=");
      if (index !== -1) {
        const key = trimmed.substring(0, index).trim();
        const value = trimmed.substring(index + 1).trim();
        config[key] = value;
      }
    }

    return config;
  } catch (error) {
    console.error("設定ファイル読み込みエラー:", error.message);
    return null;
  }
}

// 使用例
loadConfig("config.txt").then((config) => {
  console.log(config);
});
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
os.ReadFile("file.txt")
```

Go では`os`パッケージや`io`パッケージでファイルを読み込む。

**os.ReadFile（Go 1.16+、推奨）**:

ファイル全体をバイトスライスとして読み込む。

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    data, err := os.ReadFile("test.txt")
    if err != nil {
        fmt.Println("ファイル読み込みエラー:", err)
        return
    }

    fmt.Println(string(data))
}
```

**os.Open と Read**:

ファイルを開いて手動で読み込む。

```go
package main

import (
    "fmt"
    "io"
    "os"
)

func main() {
    file, err := os.Open("test.txt")
    if err != nil {
        fmt.Println("ファイルオープンエラー:", err)
        return
    }
    defer file.Close()

    // ファイル全体を読み込む
    data, err := io.ReadAll(file)
    if err != nil {
        fmt.Println("ファイル読み込みエラー:", err)
        return
    }

    fmt.Println(string(data))
}
```

**bufio.Scanner で行ごとに読み込む**:

```go
package main

import (
    "bufio"
    "fmt"
    "os"
)

func main() {
    file, err := os.Open("test.txt")
    if err != nil {
        fmt.Println("エラー:", err)
        return
    }
    defer file.Close()

    scanner := bufio.NewScanner(file)
    for scanner.Scan() {
        line := scanner.Text()
        fmt.Println(line)
    }

    if err := scanner.Err(); err != nil {
        fmt.Println("スキャンエラー:", err)
    }
}
```

**bufio.Reader で読み込む**:

```go
package main

import (
    "bufio"
    "fmt"
    "io"
    "os"
)

func main() {
    file, err := os.Open("test.txt")
    if err != nil {
        fmt.Println("エラー:", err)
        return
    }
    defer file.Close()

    reader := bufio.NewReader(file)

    for {
        line, err := reader.ReadString('\n')
        if err != nil {
            if err == io.EOF {
                if line != "" {
                    fmt.Print(line)
                }
                break
            }
            fmt.Println("読み込みエラー:", err)
            return
        }
        fmt.Print(line)
    }
}
```

**チャンクごとに読み込む**:

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    file, err := os.Open("test.txt")
    if err != nil {
        fmt.Println("エラー:", err)
        return
    }
    defer file.Close()

    buffer := make([]byte, 1024)
    for {
        n, err := file.Read(buffer)
        if err != nil {
            if err == io.EOF {
                break
            }
            fmt.Println("読み込みエラー:", err)
            return
        }

        fmt.Print(string(buffer[:n]))
    }
}
```

**実用例（設定ファイルの読み込み）**:

```go
package main

import (
    "bufio"
    "fmt"
    "os"
    "strings"
)

func loadConfig(filename string) (map[string]string, error) {
    config := make(map[string]string)

    file, err := os.Open(filename)
    if err != nil {
        return nil, fmt.Errorf("ファイルオープンエラー: %w", err)
    }
    defer file.Close()

    scanner := bufio.NewScanner(file)
    for scanner.Scan() {
        line := strings.TrimSpace(scanner.Text())

        // 空行とコメントをスキップ
        if line == "" || strings.HasPrefix(line, "#") {
            continue
        }

        // key=value の形式をパース
        parts := strings.SplitN(line, "=", 2)
        if len(parts) == 2 {
            key := strings.TrimSpace(parts[0])
            value := strings.TrimSpace(parts[1])
            config[key] = value
        }
    }

    if err := scanner.Err(); err != nil {
        return nil, fmt.Errorf("スキャンエラー: %w", err)
    }

    return config, nil
}

func main() {
    config, err := loadConfig("config.txt")
    if err != nil {
        fmt.Println("設定ファイル読み込みエラー:", err)
        return
    }

    fmt.Println(config)
}
```

**実用例（JSON ファイルの読み込み）**:

```go
package main

import (
    "encoding/json"
    "fmt"
    "os"
)

type Config struct {
    Host string `json:"host"`
    Port int    `json:"port"`
}

func main() {
    data, err := os.ReadFile("config.json")
    if err != nil {
        fmt.Println("ファイル読み込みエラー:", err)
        return
    }

    var config Config
    err = json.Unmarshal(data, &config)
    if err != nil {
        fmt.Println("JSONパースエラー:", err)
        return
    }

    fmt.Printf("%+v\n", config)
}
```

**ファイルの存在確認**:

```go
package main

import (
    "fmt"
    "os"
)

func fileExists(filename string) bool {
    _, err := os.Stat(filename)
    return err == nil
}

func main() {
    if fileExists("test.txt") {
        data, _ := os.ReadFile("test.txt")
        fmt.Println(string(data))
    } else {
        fmt.Println("ファイルが存在しません")
    }
}
```

</div>
