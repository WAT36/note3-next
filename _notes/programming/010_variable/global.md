---
title: "グローバル変数・グローバルスコープ"
date: "2019-11-01T09:37:30+09:00"
excerpt: "グローバル変数・グローバルスコープについて"
tag: ["Javascript", "Java", "Python", "Go"]
programming: ["Javascript", "Java", "Python", "Go"]
updatedAt: "2019-11-01T10:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

グローバル変数とグローバルスコープ（大域変数・大域スコープ）について説明する。

グローバル変数は、プログラム全体からアクセスできる変数。各言語でグローバル変数の扱い方やスコープの概念が異なる。

<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
var globalVar = "global";
window.globalVar; // ブラウザ
globalThis.globalVar; // 環境非依存
```

JavaScript では、グローバルスコープで宣言された変数や関数がグローバル変数・グローバル関数になる。これらは**グローバルオブジェクト**によって管理される。

**グローバルオブジェクトとは**:

JavaScript エンジンがスクリプトを読み込んだ時に自動で生成される特殊なオブジェクト。グローバルスコープの変数や関数を管理する。

- **ブラウザ**: `window` オブジェクト
- **Node.js**: `global` オブジェクト
- **環境非依存（ES2020+）**: `globalThis` オブジェクト

**グローバル変数の宣言**:

### **1. var によるグローバル変数**

```javascript
var globalVar = "Hello";

console.log(globalVar); // "Hello"
console.log(window.globalVar); // "Hello"（ブラウザ）
console.log(globalThis.globalVar); // "Hello"
```

`var` でグローバルスコープに宣言した変数は、グローバルオブジェクトのプロパティになる。

### **2. let/const によるグローバル変数**

```javascript
let globalLet = "World";
const globalConst = "!";

console.log(globalLet); // "World"
console.log(window.globalLet); // undefined（プロパティにならない）
console.log(globalThis.globalLet); // undefined
```

`let`/`const` でグローバルスコープに宣言した変数は、グローバルオブジェクトのプロパティには**ならない**（ES6+）。

### **3. 暗黙のグローバル変数（非推奨）**

```javascript
function myFunction() {
  implicitGlobal = "Bad practice"; // var/let/const なし
}

myFunction();
console.log(implicitGlobal); // "Bad practice"
console.log(window.implicitGlobal); // "Bad practice"
```

宣言なしで変数に代入すると、暗黙のグローバル変数になる（Strict モードではエラー）。

**グローバル関数の宣言**:

```javascript
function globalFunction() {
  return "I'm global";
}

console.log(globalFunction()); // "I'm global"
console.log(window.globalFunction()); // "I'm global"（ブラウザ）
```

グローバルスコープで宣言された関数は、グローバルオブジェクトのメソッドになる。

**スコープチェーン**:

変数を参照する時、JavaScript は以下の順序で変数を探す:

1. 現在のスコープ（ローカルスコープ）
2. 外側のスコープ
3. さらに外側のスコープ
4. グローバルスコープ

```javascript
var global = "global";

function outer() {
  var outerVar = "outer";

  function inner() {
    var innerVar = "inner";

    console.log(innerVar); // "inner"（現在のスコープ）
    console.log(outerVar); // "outer"（外側のスコープ）
    console.log(global); // "global"（グローバルスコープ）
  }

  inner();
}

outer();
```

**グローバルオブジェクトへのアクセス**:

### **ブラウザ（window）**

```javascript
console.log(window); // Window オブジェクト
console.log(window.document); // HTML ドキュメント
console.log(window.location); // URL 情報
console.log(window.navigator); // ブラウザ情報
```

### **Node.js（global）**

```javascript
console.log(global); // Global オブジェクト
console.log(global.process); // プロセス情報
console.log(global.Buffer); // Buffer クラス
```

### **環境非依存（globalThis、ES2020+）**

```javascript
console.log(globalThis); // グローバルオブジェクト（環境に応じて window または global）

// 推奨: 環境に依存しないコード
globalThis.myGlobal = "value";
```

**組み込みのグローバルオブジェクト（標準ビルトインオブジェクト）**:

JavaScript には、インスタンス化不要で利用できるグローバルオブジェクトがある。

| オブジェクト名 | 説明                 | 例                             |
| -------------- | -------------------- | ------------------------------ |
| `Array`        | 配列オブジェクト     | `Array.isArray([])`            |
| `Object`       | オブジェクト         | `Object.keys({ a: 1 })`        |
| `String`       | 文字列オブジェクト   | `String.fromCharCode(65)`      |
| `Number`       | 数値オブジェクト     | `Number.parseInt("10")`        |
| `Boolean`      | 真偽値オブジェクト   | `Boolean(1)`                   |
| `Date`         | 日付オブジェクト     | `new Date()`                   |
| `Math`         | Math オブジェクト    | `Math.floor(3.14)`             |
| `JSON`         | JSON オブジェクト    | `JSON.parse('{"a":1}')`        |
| `Error`        | エラーオブジェクト   | `new Error("message")`         |
| `RegExp`       | 正規表現オブジェクト | `new RegExp("pattern")`        |
| `Promise`      | Promise オブジェクト | `new Promise((resolve) => {})` |
| `Map`          | Map オブジェクト     | `new Map()`                    |
| `Set`          | Set オブジェクト     | `new Set()`                    |

**組み込みのグローバル関数**:

グローバルオブジェクトに含まれる関数（オブジェクトのインスタンス化不要）。

| 関数名                 | 説明                                 | 例                                  |
| ---------------------- | ------------------------------------ | ----------------------------------- |
| `parseInt()`           | 文字列を整数に変換                   | `parseInt("10")`                    |
| `parseFloat()`         | 文字列を浮動小数点数に変換           | `parseFloat("3.14")`                |
| `isNaN()`              | NaN かどうか判定                     | `isNaN(NaN)`                        |
| `isFinite()`           | 有限数かどうか判定                   | `isFinite(100)`                     |
| `encodeURI()`          | URI をエンコード                     | `encodeURI("http://example.com")`   |
| `encodeURIComponent()` | URI の要素をエンコード               | `encodeURIComponent("hello world")` |
| `decodeURI()`          | URI をデコード                       | `decodeURI("%20")`                  |
| `decodeURIComponent()` | URI の要素をデコード                 | `decodeURIComponent("%20")`         |
| `eval()`               | 文字列を JavaScript コードとして評価 | `eval("1 + 1")`（非推奨）           |

**グローバル変数の問題点**:

1. **名前の衝突**: 異なる部分で同じ名前の変数を使うと衝突する
2. **予期しない変更**: どこからでもアクセスできるため、意図しない変更が起こりうる
3. **テストが困難**: グローバル状態に依存するコードはテストが難しい
4. **メモリリーク**: グローバル変数はプログラム終了まで解放されない

**グローバル変数を避ける方法**:

### **1. モジュールパターン**

```javascript
const MyModule = (function () {
  // プライベート変数
  let privateVar = "private";

  // パブリック API
  return {
    getPrivateVar: function () {
      return privateVar;
    },
  };
})();

console.log(MyModule.getPrivateVar()); // "private"
console.log(MyModule.privateVar); // undefined
```

### **2. ES6 モジュール**

```javascript
// module.js
let moduleVar = "module scope";

export function getModuleVar() {
  return moduleVar;
}

// main.js
import { getModuleVar } from "./module.js";
console.log(getModuleVar()); // "module scope"
```

### **3. ブロックスコープ（let/const）**

```javascript
{
  let blockScoped = "block";
  console.log(blockScoped); // "block"
}
console.log(blockScoped); // ReferenceError
```

### **4. 関数スコープ**

```javascript
function myFunction() {
  let localVar = "local";
  console.log(localVar); // "local"
}
console.log(localVar); // ReferenceError
```

**実用例**:

### **グローバル設定オブジェクト**

```javascript
// 1つのグローバルオブジェクトに集約
const APP_CONFIG = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  debug: true,
};

function fetchData() {
  console.log(`Fetching from ${APP_CONFIG.apiUrl}`);
}
```

### **シングルトンパターン**

```javascript
const Logger = (function () {
  let instance;

  function createInstance() {
    return {
      log: function (message) {
        console.log(`[LOG] ${message}`);
      },
    };
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

const logger = Logger.getInstance();
logger.log("Hello"); // [LOG] Hello
```

**まとめ**:

- グローバル変数は必要最小限にする
- `let`/`const` を使う（`var` は避ける）
- ES6 モジュールを使う
- グローバルオブジェクトには `globalThis` でアクセスする（環境非依存）

</div>
<div class="note_content_by_programming_language" id="note_content_Java">

```java
public class MyClass {
    public static int globalVar = 10;
}
// MyClass.globalVar でアクセス
```

Java には JavaScript のようなグローバル変数の概念は**ない**。すべての変数はクラスに属する必要がある。

**理由**:

Java はオブジェクト指向言語であり、すべてのコードはクラス内に記述される。グローバル変数に相当する機能は、**静的フィールド（static フィールド）**で実現する。

**静的フィールド（static フィールド）**:

クラスに属し、すべてのインスタンスで共有される変数。

```java
public class AppConfig {
    // 静的フィールド（クラス変数）
    public static String APP_NAME = "My App";
    public static int VERSION = 1;

    // 静的メソッド（クラスメソッド）
    public static void printInfo() {
        System.out.println(APP_NAME + " v" + VERSION);
    }
}

// 使用例
public class Main {
    public static void main(String[] args) {
        // クラス名.フィールド名 でアクセス
        System.out.println(AppConfig.APP_NAME);  // "My App"
        System.out.println(AppConfig.VERSION);   // 1

        AppConfig.printInfo();  // "My App v1"
    }
}
```

**アクセス修飾子による制御**:

| 修飾子      | 説明                                           |
| ----------- | ---------------------------------------------- |
| `public`    | どこからでもアクセス可能                       |
| `protected` | 同じパッケージまたはサブクラスからアクセス可能 |
| （なし）    | 同じパッケージからのみアクセス可能             |
| `private`   | 同じクラス内からのみアクセス可能               |

**定数（final static）**:

変更不可能な静的フィールド（慣例で大文字とアンダースコア）。

```java
public class Constants {
    public static final String API_URL = "https://api.example.com";
    public static final int MAX_RETRY = 3;
    public static final double PI = 3.14159;
}

// 使用例
public class Main {
    public static void main(String[] args) {
        System.out.println(Constants.API_URL);  // "https://api.example.com"
        System.out.println(Constants.MAX_RETRY);  // 3

        // Constants.API_URL = "new url";  // コンパイルエラー: final は変更不可
    }
}
```

**静的ブロック（static initializer）**:

静的フィールドの初期化に使用。

```java
public class Database {
    public static Connection connection;

    // 静的ブロック（クラスロード時に実行）
    static {
        System.out.println("Initializing database connection...");
        connection = createConnection();
    }

    private static Connection createConnection() {
        // データベース接続の作成
        return new Connection();
    }
}
```

**シングルトンパターン**:

グローバルに 1 つのインスタンスのみを持つ。

```java
public class Logger {
    // 唯一のインスタンス
    private static Logger instance;

    // コンストラクタを private にして外部からのインスタンス化を防ぐ
    private Logger() {
    }

    // インスタンスを取得
    public static Logger getInstance() {
        if (instance == null) {
            instance = new Logger();
        }
        return instance;
    }

    public void log(String message) {
        System.out.println("[LOG] " + message);
    }
}

// 使用例
public class Main {
    public static void main(String[] args) {
        Logger logger = Logger.getInstance();
        logger.log("Hello");  // [LOG] Hello

        Logger logger2 = Logger.getInstance();
        System.out.println(logger == logger2);  // true（同じインスタンス）
    }
}
```

**実用例**:

### **設定クラス**

```java
public class AppConfig {
    public static final String APP_NAME = "My Application";
    public static final String VERSION = "1.0.0";
    public static final boolean DEBUG = true;

    private static String apiUrl = "https://api.example.com";

    public static String getApiUrl() {
        return apiUrl;
    }

    public static void setApiUrl(String url) {
        apiUrl = url;
    }
}
```

### **ユーティリティクラス**

```java
public class StringUtils {
    // インスタンス化を防ぐ
    private StringUtils() {
    }

    public static boolean isEmpty(String str) {
        return str == null || str.isEmpty();
    }

    public static String capitalize(String str) {
        if (isEmpty(str)) {
            return str;
        }
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    }
}

// 使用例
public class Main {
    public static void main(String[] args) {
        System.out.println(StringUtils.isEmpty(""));      // true
        System.out.println(StringUtils.capitalize("hello"));  // "Hello"
    }
}
```

**まとめ**:

- Java にはグローバル変数はない
- 静的フィールド（`static`）でクラスレベルの変数を定義
- 定数は `public static final` で定義
- シングルトンパターンでグローバルなインスタンスを管理
- ユーティリティクラスで静的メソッドを提供

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
global_var = "global"
global global_var  # 関数内で変更する場合
```

Python では、モジュールレベルで宣言された変数がグローバル変数になる。関数内からグローバル変数を変更するには `global` キーワードを使う。

**グローバル変数の宣言**:

```python
# グローバル変数
global_var = "I'm global"

def my_function():
    # グローバル変数を参照（読み取り）
    print(global_var)  # "I'm global"

my_function()
print(global_var)  # "I'm global"
```

**global キーワード**:

関数内でグローバル変数を**変更**する場合、`global` キーワードが必要。

```python
counter = 0

def increment():
    global counter  # global 宣言
    counter += 1

increment()
print(counter)  # 1

increment()
print(counter)  # 2
```

`global` を使わないと、ローカル変数として扱われる。

```python
counter = 0

def increment():
    counter += 1  # UnboundLocalError: local variable 'counter' referenced before assignment

increment()
```

**読み取りのみの場合は global 不要**:

```python
message = "Hello"

def print_message():
    # 読み取りのみなら global 不要
    print(message)  # "Hello"

print_message()
```

**nonlocal キーワード（ネストした関数）**:

ネストした関数で外側の関数の変数を変更する場合、`nonlocal` キーワードを使う。

```python
def outer():
    count = 0

    def inner():
        nonlocal count  # 外側の関数の変数
        count += 1
        print(count)

    inner()  # 1
    inner()  # 2
    print(count)  # 2

outer()
```

**スコープの優先順位（LEGB ルール）**:

Python は以下の順序で変数を探す:

1. **L**ocal: ローカルスコープ（関数内）
2. **E**nclosing: 外側の関数のスコープ
3. **G**lobal: グローバルスコープ（モジュールレベル）
4. **B**uilt-in: 組み込みスコープ

```python
x = "global"

def outer():
    x = "enclosing"

    def inner():
        x = "local"
        print(x)  # "local"（L）

    inner()
    print(x)  # "enclosing"（E）

outer()
print(x)  # "global"（G）
```

**組み込み関数・定数**:

Python には組み込みの関数や定数がある（`builtins` モジュール）。

| 関数名    | 説明         | 例                  |
| --------- | ------------ | ------------------- |
| `print()` | 出力         | `print("Hello")`    |
| `len()`   | 長さを取得   | `len([1, 2, 3])`    |
| `type()`  | 型を取得     | `type(10)`          |
| `int()`   | 整数に変換   | `int("10")`         |
| `str()`   | 文字列に変換 | `str(10)`           |
| `range()` | 範囲を生成   | `range(10)`         |
| `sum()`   | 合計を計算   | `sum([1, 2, 3])`    |
| `max()`   | 最大値を取得 | `max([1, 2, 3])`    |
| `min()`   | 最小値を取得 | `min([1, 2, 3])`    |
| `abs()`   | 絶対値を取得 | `abs(-10)`          |
| `round()` | 四捨五入     | `round(3.14159, 2)` |

| 定数名  | 説明 | 値      |
| ------- | ---- | ------- |
| `True`  | 真   | `True`  |
| `False` | 偽   | `False` |
| `None`  | None | `None`  |

**グローバル変数の問題点と避ける方法**:

### **1. クラスで管理**

```python
class Config:
    API_URL = "https://api.example.com"
    TIMEOUT = 5000
    DEBUG = True

# 使用例
print(Config.API_URL)  # "https://api.example.com"
```

### **2. 関数の引数として渡す**

```python
# 悪い例
counter = 0

def increment():
    global counter
    counter += 1

# 良い例
def increment(counter):
    return counter + 1

counter = 0
counter = increment(counter)
```

### **3. 定数は大文字で定義**

```python
# 定数（慣例）
API_URL = "https://api.example.com"
MAX_RETRY = 3
PI = 3.14159
```

**実用例**:

### **設定モジュール**

```python
# config.py
APP_NAME = "My Application"
VERSION = "1.0.0"
DEBUG = True
API_URL = "https://api.example.com"

# main.py
import config

print(config.APP_NAME)  # "My Application"
print(config.API_URL)   # "https://api.example.com"
```

### **シングルトンパターン**

```python
class Logger:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def log(self, message):
        print(f"[LOG] {message}")

# 使用例
logger1 = Logger()
logger2 = Logger()

print(logger1 is logger2)  # True（同じインスタンス）
logger1.log("Hello")  # [LOG] Hello
```

### **グローバル状態の管理**

```python
# 悪い例（グローバル変数）
user_logged_in = False
current_user = None

def login(username):
    global user_logged_in, current_user
    user_logged_in = True
    current_user = username

# 良い例（クラスで管理）
class UserSession:
    def __init__(self):
        self.logged_in = False
        self.current_user = None

    def login(self, username):
        self.logged_in = True
        self.current_user = username

session = UserSession()
session.login("john")
```

**まとめ**:

- モジュールレベルの変数がグローバル変数
- 関数内で変更するには `global` キーワードが必要
- ネストした関数では `nonlocal` キーワードを使う
- LEGB ルールで変数を探す
- グローバル変数は最小限にし、クラスや関数の引数で管理する

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
package mypackage
var GlobalVar = "global"  // 大文字で公開
```

Go では、パッケージレベルで宣言された変数がグローバル変数に相当する。大文字で始まる変数は他のパッケージから参照可能（公開）、小文字で始まる変数はパッケージ内のみ（非公開）。

**パッケージレベル変数**:

```go
package main

import "fmt"

// パッケージレベル変数（グローバル変数）
var globalVar = "I'm global"

func main() {
    fmt.Println(globalVar)  // "I'm global"

    myFunction()
}

func myFunction() {
    fmt.Println(globalVar)  // "I'm global"（同じパッケージ内からアクセス可能）
}
```

**公開（Exported）と非公開（Unexported）**:

変数名の最初の文字で公開/非公開が決まる。

```go
package mypackage

// 公開（他のパッケージからアクセス可能）
var PublicVar = "public"
const PublicConst = 100

// 非公開（このパッケージ内のみアクセス可能）
var privateVar = "private"
const privateConst = 200
```

```go
package main

import (
    "fmt"
    "myapp/mypackage"
)

func main() {
    fmt.Println(mypackage.PublicVar)    // OK
    fmt.Println(mypackage.PublicConst)  // OK

    // fmt.Println(mypackage.privateVar)  // エラー: cannot refer to unexported name
}
```

**定数（const）**:

変更不可能な値。

```go
package main

const (
    AppName    = "My Application"
    Version    = "1.0.0"
    MaxRetry   = 3
    TimeoutSec = 30
)

func main() {
    fmt.Println(AppName)  // "My Application"
    fmt.Println(Version)  // "1.0.0"
}
```

**型付き定数と型なし定数**:

```go
package main

const (
    // 型なし定数（柔軟に使える）
    UntypedInt = 100

    // 型付き定数
    TypedInt int = 100
)

func main() {
    var i int = UntypedInt      // OK
    var f float64 = UntypedInt  // OK（型なし定数は柔軟）

    var i2 int = TypedInt       // OK
    // var f2 float64 = TypedInt  // エラー: cannot use TypedInt (type int) as type float64
}
```

**初期化関数（init）**:

パッケージのロード時に自動的に実行される。

```go
package main

import "fmt"

var globalVar string

func init() {
    fmt.Println("Initializing...")
    globalVar = "initialized in init"
}

func main() {
    fmt.Println(globalVar)  // "initialized in init"
}
```

複数の `init` 関数を定義できる（定義順に実行される）。

```go
package main

import "fmt"

func init() {
    fmt.Println("First init")
}

func init() {
    fmt.Println("Second init")
}

func main() {
    fmt.Println("Main")
}

// 出力:
// First init
// Second init
// Main
```

**スコープ**:

Go のスコープは以下のとおり:

1. **パッケージスコープ**: パッケージレベルの変数・関数
2. **ファイルスコープ**: `import` の別名など
3. **関数スコープ**: 関数内の変数
4. **ブロックスコープ**: `{}` 内の変数

```go
package main

import "fmt"

// パッケージスコープ
var packageVar = "package"

func main() {
    // 関数スコープ
    funcVar := "function"

    {
        // ブロックスコープ
        blockVar := "block"
        fmt.Println(blockVar)  // "block"
    }

    // fmt.Println(blockVar)  // エラー: undefined: blockVar

    fmt.Println(funcVar)     // "function"
    fmt.Println(packageVar)  // "package"
}
```

**グローバル変数の問題点と避ける方法**:

### **1. 構造体で管理**

```go
package main

import "fmt"

type Config struct {
    APIUrl  string
    Timeout int
    Debug   bool
}

var config = Config{
    APIUrl:  "https://api.example.com",
    Timeout: 5000,
    Debug:   true,
}

func main() {
    fmt.Println(config.APIUrl)  // "https://api.example.com"
}
```

### **2. 関数の引数として渡す**

```go
package main

import "fmt"

func increment(counter int) int {
    return counter + 1
}

func main() {
    counter := 0
    counter = increment(counter)
    fmt.Println(counter)  // 1
}
```

### **3. シングルトンパターン**

```go
package main

import (
    "fmt"
    "sync"
)

type Logger struct {
}

var (
    instance *Logger
    once     sync.Once
)

func GetLogger() *Logger {
    once.Do(func() {
        instance = &Logger{}
        fmt.Println("Creating logger instance")
    })
    return instance
}

func (l *Logger) Log(message string) {
    fmt.Printf("[LOG] %s\n", message)
}

func main() {
    logger1 := GetLogger()  // "Creating logger instance"
    logger2 := GetLogger()  // 出力なし（同じインスタンス）

    fmt.Println(logger1 == logger2)  // true

    logger1.Log("Hello")  // [LOG] Hello
}
```

**実用例**:

### **設定パッケージ**

```go
// config/config.go
package config

const (
    AppName = "My Application"
    Version = "1.0.0"
)

var (
    APIUrl  = "https://api.example.com"
    Timeout = 5000
    Debug   = true
)

func SetAPIUrl(url string) {
    APIUrl = url
}
```

```go
// main.go
package main

import (
    "fmt"
    "myapp/config"
)

func main() {
    fmt.Println(config.AppName)  // "My Application"
    fmt.Println(config.APIUrl)   // "https://api.example.com"

    config.SetAPIUrl("https://new-api.example.com")
    fmt.Println(config.APIUrl)   // "https://new-api.example.com"
}
```

### **定数のグループ化（iota）**

```go
package main

import "fmt"

const (
    Sunday = iota  // 0
    Monday         // 1
    Tuesday        // 2
    Wednesday      // 3
    Thursday       // 4
    Friday         // 5
    Saturday       // 6
)

func main() {
    fmt.Println(Sunday)    // 0
    fmt.Println(Monday)    // 1
    fmt.Println(Saturday)  // 6
}
```

**まとめ**:

- パッケージレベルの変数がグローバル変数に相当
- 大文字で始まる変数は公開、小文字で始まる変数は非公開
- 定数は `const` で定義
- `init` 関数でパッケージのロード時に初期化
- シングルトンパターンには `sync.Once` を使う
- グローバル変数は最小限にし、構造体や関数の引数で管理する

</div>
