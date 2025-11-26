---
title: "外部ファイルのインポート"
date: "2019-10-31T02:37:30+09:00"
excerpt: "外部ファイルのインポートについて"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-31T02:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

プログラムの中で、別のファイルやモジュールにある変数や関数を利用したい場合がある。その時は外部ファイルをインポートする。各言語でインポートの方法が異なる。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
import package.ClassName;
```

Java では`import`文を使って他のパッケージのクラスを利用できる。

**基本的なインポート**:

特定のクラスをインポートする（推奨）。

```java
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("item1");
        list.add("item2");
        System.out.println(list);
    }
}
```

**ワイルドカードインポート**:

パッケージ内のすべてのクラスをインポートする。

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        Map<String, Integer> map = new HashMap<>();

        list.add("item");
        map.put("key", 100);

        System.out.println(list);
        System.out.println(map);
    }
}
```

**注意**: ワイルドカード（`*`）はどのクラスを使用しているか不明確になるため、通常は特定のクラスを明示的にインポートする方が推奨される。

**複数のインポート**:

```java
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
import java.io.File;
import java.io.IOException;
```

**static インポート**:

クラスの静的メンバー（static メソッドや定数）を直接使用できる。

```java
import static java.lang.Math.*;

public class Main {
    public static void main(String[] args) {
        // Math.PI ではなく PI で直接使用できる
        double circumference = 2 * PI * 5;
        System.out.println(circumference);

        // Math.sqrt ではなく sqrt で直接使用できる
        double result = sqrt(16);
        System.out.println(result);
    }
}
```

**同一パッケージ内のクラス**:

同じパッケージに属するクラスは`import`文なしで利用できる。

```java
// package com.example;

// 同じ com.example パッケージ内の他のクラスは import 不要
public class Main {
    public static void main(String[] args) {
        Helper helper = new Helper();  // import 不要
        helper.doSomething();
    }
}
```

**java.lang パッケージ**:

`java.lang`パッケージ（String, System, Integer など）は自動的にインポートされるため、`import`文は不要。

```java
public class Main {
    public static void main(String[] args) {
        // String, System は java.lang なので import 不要
        String text = "Hello";
        System.out.println(text);
        Integer num = Integer.valueOf(10);
    }
}
```

**名前の衝突を避ける**:

異なるパッケージに同名のクラスがある場合、完全修飾名を使用する。

```java
import java.util.Date;

public class Main {
    public static void main(String[] args) {
        // java.util.Date を使用
        Date utilDate = new Date();

        // java.sql.Date を使用（完全修飾名）
        java.sql.Date sqlDate = new java.sql.Date(System.currentTimeMillis());

        System.out.println(utilDate);
        System.out.println(sqlDate);
    }
}
```

**実用例**:

```java
import java.util.List;
import java.util.ArrayList;
import java.util.stream.Collectors;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class FileProcessor {
    public static List<String> readLines(String filename) throws IOException {
        return Files.readAllLines(Path.of(filename));
    }

    public static void main(String[] args) {
        try {
            List<String> lines = readLines("data.txt");

            // Stream API を使用してフィルタリング
            List<String> filtered = lines.stream()
                .filter(line -> !line.isEmpty())
                .collect(Collectors.toList());

            System.out.println(filtered);
        } catch (IOException e) {
            System.err.println("エラー: " + e.getMessage());
        }
    }
}
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
import module_name
from module_name import function_name
```

Python では`import`文を使って他のモジュール（Python ファイルやパッケージ）を利用できる。

**基本的なインポート**:

モジュール全体をインポートする。

```python
import math

result = math.sqrt(16)
print(result)  # 4.0

pi = math.pi
print(pi)  # 3.141592653589793
```

**特定の関数や変数をインポート**:

モジュールから特定の要素のみをインポートする。

```python
from math import sqrt, pi

result = sqrt(16)  # math. が不要
print(result)  # 4.0
print(pi)  # 3.141592653589793
```

**エイリアス（別名）を使う**:

長いモジュール名を短縮名で使用できる。

```python
import numpy as np
import pandas as pd

array = np.array([1, 2, 3, 4, 5])
print(array)

df = pd.DataFrame({'col1': [1, 2], 'col2': [3, 4]})
print(df)
```

**すべてをインポート**:

モジュールのすべての公開メンバーをインポートする（非推奨）。

```python
from math import *

# すべての関数・変数を直接使用できる
result = sqrt(16)
print(pi)
```

**注意**: `from module import *`は名前空間を汚染するため、通常は避けるべき。

**自作モジュールのインポート**:

同じディレクトリにある自作モジュールをインポートする。

```python
# mymath.py
def add(a, b):
    return a + b

def multiply(a, b):
    return a * b

PI = 3.14159
```

```python
# main.py
import mymath

result = mymath.add(10, 20)
print(result)  # 30

product = mymath.multiply(5, 6)
print(product)  # 30

print(mymath.PI)  # 3.14159
```

**特定の要素のみをインポート**:

```python
# main.py
from mymath import add, PI

result = add(10, 20)
print(result)  # 30
print(PI)  # 3.14159

# mymath.multiply はインポートしていないので使えない
```

**パッケージのインポート**:

ディレクトリ構造でモジュールを整理できる。

```
mypackage/
    __init__.py
    module1.py
    module2.py
```

```python
# module1.py
def func1():
    return "Function 1"
```

```python
# main.py
from mypackage import module1

result = module1.func1()
print(result)  # "Function 1"

# または
from mypackage.module1 import func1
result = func1()
print(result)  # "Function 1"
```

**複数の要素をインポート**:

```python
from math import sqrt, pow, pi, e

result1 = sqrt(16)
result2 = pow(2, 3)
print(result1, result2, pi, e)
```

**相対インポート**:

パッケージ内で相対パスを使ってインポートする。

```
mypackage/
    __init__.py
    module1.py
    subpackage/
        __init__.py
        module2.py
```

```python
# module2.py
from .. import module1  # 親ディレクトリの module1
from . import another_module  # 同じディレクトリの another_module
```

**実用例（複数のモジュールを使う）**:

```python
import os
import sys
from pathlib import Path
from datetime import datetime
import json

def load_config(filename):
    """設定ファイルを読み込む"""
    config_path = Path(filename)

    if not config_path.exists():
        print(f"ファイルが見つかりません: {filename}")
        sys.exit(1)

    with open(config_path, 'r', encoding='utf-8') as file:
        config = json.load(file)

    return config

def log(message):
    """ログを出力する"""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{timestamp}] {message}")

# 使用例
if __name__ == "__main__":
    log("アプリケーション開始")

    config = load_config("config.json")
    log(f"設定を読み込みました: {config}")

    # カレントディレクトリのファイル一覧
    files = os.listdir(".")
    log(f"ファイル数: {len(files)}")
```

**標準ライブラリの主なモジュール**:

| モジュール    | 用途                                        |
| ------------- | ------------------------------------------- |
| `os`          | OS 関連の機能（ファイル操作、パス操作など） |
| `sys`         | システム関連の機能（引数、終了など）        |
| `math`        | 数学関数                                    |
| `random`      | 乱数生成                                    |
| `datetime`    | 日付・時刻処理                              |
| `json`        | JSON 処理                                   |
| `re`          | 正規表現                                    |
| `pathlib`     | パス操作（推奨）                            |
| `collections` | 便利なデータ構造                            |

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
import { functionName } from "./module.js";
```

JavaScript では ES6 modules（`import`/`export`）と CommonJS（`require`/`module.exports`）の 2 つの方式がある。

**ES6 Modules（モダン、推奨）**:

**基本的なインポート**:

```javascript
// math.js
export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}

export const PI = 3.14159;
```

```javascript
// main.js
import { add, multiply, PI } from "./math.js";

console.log(add(10, 20)); // 30
console.log(multiply(5, 6)); // 30
console.log(PI); // 3.14159
```

**デフォルトエクスポート**:

```javascript
// calculator.js
export default class Calculator {
  add(a, b) {
    return a + b;
  }

  multiply(a, b) {
    return a * b;
  }
}
```

```javascript
// main.js
import Calculator from "./calculator.js";

const calc = new Calculator();
console.log(calc.add(10, 20)); // 30
console.log(calc.multiply(5, 6)); // 30
```

**エイリアス（別名）を使う**:

```javascript
// main.js
import { add as addition, multiply as times } from "./math.js";

console.log(addition(10, 20)); // 30
console.log(times(5, 6)); // 30
```

**すべてをインポート**:

```javascript
// main.js
import * as math from "./math.js";

console.log(math.add(10, 20)); // 30
console.log(math.multiply(5, 6)); // 30
console.log(math.PI); // 3.14159
```

**デフォルトと名前付きを併用**:

```javascript
// utils.js
export default function mainFunction() {
  return "Main";
}

export function helperFunction() {
  return "Helper";
}
```

```javascript
// main.js
import mainFunction, { helperFunction } from "./utils.js";

console.log(mainFunction()); // "Main"
console.log(helperFunction()); // "Helper"
```

**動的インポート**:

実行時にモジュールを読み込む。

```javascript
async function loadModule() {
  const module = await import("./math.js");
  console.log(module.add(10, 20)); // 30
}

loadModule();

// または条件付きで読み込む
if (condition) {
  import("./module.js").then((module) => {
    module.doSomething();
  });
}
```

**CommonJS（Node.js の従来の方式）**:

**基本的なインポート**:

```javascript
// math.js
function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

const PI = 3.14159;

module.exports = { add, multiply, PI };
```

```javascript
// main.js
const math = require("./math.js");

console.log(math.add(10, 20)); // 30
console.log(math.multiply(5, 6)); // 30
console.log(math.PI); // 3.14159
```

**分割代入でインポート**:

```javascript
// main.js
const { add, multiply, PI } = require("./math.js");

console.log(add(10, 20)); // 30
console.log(multiply(5, 6)); // 30
console.log(PI); // 3.14159
```

**単一の関数をエクスポート**:

```javascript
// calculator.js
class Calculator {
  add(a, b) {
    return a + b;
  }
}

module.exports = Calculator;
```

```javascript
// main.js
const Calculator = require("./calculator.js");

const calc = new Calculator();
console.log(calc.add(10, 20)); // 30
```

**標準ライブラリのインポート（Node.js）**:

```javascript
// CommonJS
const fs = require("fs");
const path = require("path");
const http = require("http");

// ES6 Modules（Node.js 12+）
import fs from "fs";
import path from "path";
import http from "http";
```

**npm パッケージのインポート**:

```javascript
// CommonJS
const express = require("express");
const axios = require("axios");
const lodash = require("lodash");

// ES6 Modules
import express from "express";
import axios from "axios";
import _ from "lodash";
```

**実用例（ES6 Modules）**:

```javascript
// logger.js
export function log(message) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
}

export function error(message) {
  const timestamp = new Date().toISOString();
  console.error(`[${timestamp}] ERROR: ${message}`);
}
```

```javascript
// config.js
export default {
  host: "localhost",
  port: 3000,
  database: {
    host: "localhost",
    name: "mydb",
  },
};
```

```javascript
// main.js
import config from "./config.js";
import { log, error } from "./logger.js";

log("アプリケーション開始");
log(`サーバー起動: ${config.host}:${config.port}`);

try {
  // 処理...
  log("処理完了");
} catch (err) {
  error(`エラーが発生しました: ${err.message}`);
}
```

**ブラウザで ES6 Modules を使う**:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>ES6 Modules Example</title>
  </head>
  <body>
    <script type="module">
      import { add } from "./math.js";

      const result = add(10, 20);
      console.log(result);
    </script>
  </body>
</html>
```

**Node.js で ES6 Modules を使う**:

`package.json`に追加:

```json
{
  "type": "module"
}
```

または、ファイル拡張子を `.mjs` にする。

**ES6 Modules vs CommonJS**:

| 特徴               | ES6 Modules            | CommonJS                   |
| ------------------ | ---------------------- | -------------------------- |
| 構文               | `import`/`export`      | `require`/`module.exports` |
| 読み込みタイミング | 静的（コンパイル時）   | 動的（実行時）             |
| 非同期             | サポート（`import()`） | 同期のみ                   |
| ブラウザサポート   | モダンブラウザで対応   | バンドラーが必要           |
| Node.js            | 12+ で対応             | 標準                       |
| 推奨度             | 推奨（モダン）         | レガシー                   |

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
import "package_name"
```

Go では`import`文を使って他のパッケージの機能（関数・型・変数）を利用できる。

**基本的なインポート**:

単一のパッケージをインポートする。

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

**複数のパッケージをインポート**:

複数のパッケージをインポートする場合は、括弧でグループ化する（推奨）。

```go
package main

import (
    "fmt"
    "math"
    "strings"
)

func main() {
    fmt.Println(math.Pi)
    fmt.Println(strings.ToUpper("hello"))
}
```

**エイリアス（別名）を使う**:

長いパッケージ名を短縮名で使用できる。

```go
package main

import (
    f "fmt"
    m "math"
)

func main() {
    f.Println(m.Pi)  // fmt.Println(math.Pi) の代わり
    f.Println(m.Sqrt(16))
}
```

**ドット(.)インポート**:

パッケージ名を省略して直接使用できる（非推奨）。

```go
package main

import (
    "fmt"
    . "math"
)

func main() {
    // math.Pi ではなく Pi で直接使用できる
    fmt.Println(Pi)
    fmt.Println(Sqrt(16))
}
```

**注意**: ドット(.)インポートは名前空間を汚染するため、通常は避けるべき。

**アンダースコア(\_)インポート**:

パッケージの初期化のみを実行する（副作用のため）。

```go
package main

import (
    "fmt"
    _ "image/png"  // PNG デコーダを登録するだけ
)

func main() {
    fmt.Println("PNG デコーダが登録されました")
}
```

**標準ライブラリのインポート**:

```go
package main

import (
    "fmt"      // 標準入出力
    "os"       // OS関連の機能
    "io"       // I/O インターフェース
    "strings"  // 文字列操作
    "time"     // 日付・時刻処理
    "math"     // 数学関数
)

func main() {
    fmt.Println("Hello")
    fmt.Println(time.Now())
}
```

**自作パッケージのインポート**:

モジュールのパスを使ってインポートする。

```
myproject/
    go.mod           // module myproject
    main.go
    mathutil/
        math.go
```

```go
// mathutil/math.go
package mathutil

func Add(a, b int) int {
    return a + b
}

func Multiply(a, b int) int {
    return a * b
}

const PI = 3.14159
```

```go
// main.go
package main

import (
    "fmt"
    "myproject/mathutil"
)

func main() {
    result := mathutil.Add(10, 20)
    fmt.Println(result)  // 30

    product := mathutil.Multiply(5, 6)
    fmt.Println(product)  // 30

    fmt.Println(mathutil.PI)  // 3.14159
}
```

**サブパッケージのインポート**:

```
myproject/
    go.mod
    main.go
    utils/
        string/
            string.go
        number/
            number.go
```

```go
// main.go
package main

import (
    "fmt"
    "myproject/utils/string"
    "myproject/utils/number"
)

func main() {
    result := string.Reverse("hello")
    fmt.Println(result)

    sum := number.Sum([]int{1, 2, 3, 4, 5})
    fmt.Println(sum)
}
```

**外部パッケージのインポート**:

```go
package main

import (
    "fmt"
    "github.com/gin-gonic/gin"
    "github.com/lib/pq"
)

func main() {
    r := gin.Default()
    r.GET("/", func(c *gin.Context) {
        c.JSON(200, gin.H{"message": "Hello"})
    })
    r.Run()
}
```

**実用例**:

```go
package main

import (
    "encoding/json"
    "fmt"
    "os"
    "time"
)

type Config struct {
    Host string `json:"host"`
    Port int    `json:"port"`
}

func loadConfig(filename string) (*Config, error) {
    data, err := os.ReadFile(filename)
    if err != nil {
        return nil, fmt.Errorf("ファイル読み込みエラー: %w", err)
    }

    var config Config
    err = json.Unmarshal(data, &config)
    if err != nil {
        return nil, fmt.Errorf("JSONパースエラー: %w", err)
    }

    return &config, nil
}

func log(message string) {
    timestamp := time.Now().Format("2006-01-02 15:04:05")
    fmt.Printf("[%s] %s\n", timestamp, message)
}

func main() {
    log("アプリケーション開始")

    config, err := loadConfig("config.json")
    if err != nil {
        fmt.Fprintf(os.Stderr, "エラー: %v\n", err)
        os.Exit(1)
    }

    log(fmt.Sprintf("設定を読み込みました: %s:%d", config.Host, config.Port))
}
```

**重要な注意点**:

1. **相対パスは使用できない**:

   ```go
   // エラー: 相対パスは使用できない
   import "./mathutil"  // NG
   import "../utils"    // NG
   ```

2. **未使用のインポートはエラー**:

   ```go
   package main

   import (
       "fmt"
       "math"  // 使用していないとコンパイルエラー
   )

   func main() {
       fmt.Println("Hello")
   }
   ```

3. **同一パッケージを複数回インポートはエラー**:

   ```go
   package main

   import (
       "fmt"
       "fmt"  // エラー: 重複
   )
   ```

4. **循環インポートはエラー**:
   ```
   package A imports package B
   package B imports package A  // エラー: 循環
   ```

**標準ライブラリの主なパッケージ**:

| パッケージ      | 用途                              |
| --------------- | --------------------------------- |
| `fmt`           | 標準入出力（フォーマット）        |
| `os`            | OS 関連の機能（ファイル操作など） |
| `io`            | I/O インターフェース              |
| `strings`       | 文字列操作                        |
| `time`          | 日付・時刻処理                    |
| `math`          | 数学関数                          |
| `encoding/json` | JSON 処理                         |
| `net/http`      | HTTP クライアント・サーバー       |
| `database/sql`  | データベース操作                  |
| `errors`        | エラー処理                        |

**go.mod とモジュール管理**:

Go 1.11+ では`go.mod`でモジュールを管理する。

```
// go.mod
module myproject

go 1.21

require (
    github.com/gin-gonic/gin v1.9.0
    github.com/lib/pq v1.10.9
)
```

パッケージのインストール:

```bash
go get github.com/gin-gonic/gin
go mod tidy  # 未使用の依存関係を削除
```

</div>
