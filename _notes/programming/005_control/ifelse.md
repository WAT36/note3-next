---
title: "if-else文"
date: "2019-10-27T15:36:30+09:00"
excerpt: "if-elseについて"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-27T15:36:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

指定した条件に応じて処理を分岐させる時に使うのが if-else 文である。  
これはほぼ全てのプログラミング言語に実装されている。言語ごとの記法を示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
if (条件式) { } else if (条件式) { } else { }
```

Java では`if`、`else if`、`else`を使って条件分岐を行う。

**基本構文**:

```java
if (条件式1) {
    // 条件式1がtrueの場合の処理
} else if (条件式2) {
    // 条件式1がfalse、条件式2がtrueの場合の処理
} else {
    // すべての条件がfalseの場合の処理
}
```

条件式には`boolean`型の値または`boolean`を返す式を指定する。`else if`は複数設けることができる。

**基本的な例**:

```java
int x = 10;

if (x > 0) {
    System.out.println("正の数");
} else if (x < 0) {
    System.out.println("負の数");
} else {
      System.out.println("ゼロ");
}
// 出力: 正の数
```

**比較演算子**:

```java
int a = 10, b = 20;

if (a == b) {
    System.out.println("等しい");
} else if (a < b) {
    System.out.println("a は b より小さい"); // これが実行される
} else {
    System.out.println("a は b より大きい");
}
```

**論理演算子**:

```java
int score = 85;
boolean passed = true;

// AND (&&)
if (score >= 60 && passed) {
    System.out.println("合格"); // これが実行される
}

// OR (||)
if (score >= 90 || passed) {
    System.out.println("優秀または合格"); // これが実行される
}

// NOT (!)
if (!passed) {
    System.out.println("不合格");
} else {
    System.out.println("合格"); // これが実行される
}
```

**文字列の比較**:

```java
String str = "hello";

// equals()を使用（==は参照比較なので注意）
if (str.equals("hello")) {
    System.out.println("一致"); // これが実行される
}

// equalsIgnoreCase()で大文字小文字を無視
if (str.equalsIgnoreCase("HELLO")) {
    System.out.println("一致（大文字小文字無視）"); // これが実行される
}

// null チェック
String nullStr = null;
if (nullStr == null) {
    System.out.println("null です"); // これが実行される
}
```

**ネストした if 文**:

```java
int age = 25;
boolean hasLicense = true;

if (age >= 18) {
    if (hasLicense) {
        System.out.println("運転できます"); // これが実行される
    } else {
        System.out.println("免許を取得してください");
    }
} else {
    System.out.println("18歳未満です");
}
```

**三項演算子**:

シンプルな条件分岐は三項演算子で簡潔に書ける。

```java
int x = 10;
String result = (x > 0) ? "正の数" : "ゼロまたは負の数";
System.out.println(result); // 出力: 正の数

// ネスト可能（ただし読みにくくなる）
int y = 0;
String type = (y > 0) ? "正" : (y < 0) ? "負" : "ゼロ";
System.out.println(type); // 出力: ゼロ
```

**switch 式の代替（Java 12+）**:

Java 12 以降では`switch`式も条件分岐に使える。

```java
int day = 3;
String dayName = switch (day) {
    case 1 -> "月曜日";
    case 2 -> "火曜日";
    case 3 -> "水曜日";
    default -> "その他";
};
System.out.println(dayName); // 出力: 水曜日
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
if 条件式: ...
elif 条件式: ...
else: ...
```

Python では`if`、`elif`、`else`を使って条件分岐を行う。

**基本構文**:

```python
if 条件式1:
    # 条件式1がTrueの場合の処理
elif 条件式2:
    # 条件式1がFalse、条件式2がTrueの場合の処理
else:
    # すべての条件がFalseの場合の処理
```

条件式の後には**コロン（`:`）**が必要。インデントで処理のブロックを表す。`elif`は複数設けることができる。

**基本的な例**:

```python
x = 10

if x > 0:
    print("正の数")
elif x < 0:
    print("負の数")
else:
    print("ゼロ")
# 出力: 正の数
```

**比較演算子**:

```python
a, b = 10, 20

if a == b:
    print("等しい")
elif a < b:
    print("a は b より小さい")  # これが実行される
else:
    print("a は b より大きい")
```

**論理演算子**:

```python
score = 85
passed = True

# AND (and)
if score >= 60 and passed:
    print("合格")  # これが実行される

# OR (or)
if score >= 90 or passed:
    print("優秀または合格")  # これが実行される

# NOT (not)
if not passed:
    print("不合格")
else:
    print("合格")  # これが実行される
```

**文字列の比較**:

```python
text = "hello"

# 文字列の比較
if text == "hello":
    print("一致")  # これが実行される

# in 演算子
if "ll" in text:
    print("含まれている")  # これが実行される

# None チェック
value = None
if value is None:
    print("None です")  # これが実行される
```

**Truthy と Falsy**:

Python では以下の値は`False`として扱われる（Falsy 値）。

```python
# Falsy値: False, None, 0, 0.0, "", [], {}, set()

# 空の文字列
if "":
    print("True")
else:
    print("False")  # これが実行される

# 空のリスト
if []:
    print("True")
else:
    print("False")  # これが実行される

# 0
if 0:
    print("True")
else:
    print("False")  # これが実行される

# None
if None:
    print("True")
else:
    print("False")  # これが実行される

# Truthy値（上記以外）
if "hello":
    print("True")  # これが実行される

if [1, 2, 3]:
    print("True")  # これが実行される
```

**ネストした if 文**:

```python
age = 25
has_license = True

if age >= 18:
    if has_license:
        print("運転できます")  # これが実行される
    else:
        print("免許を取得してください")
else:
    print("18歳未満です")
```

**条件式（三項演算子）**:

Python では`条件式 if 条件 else 条件式`の形式で三項演算子を使える。

```python
x = 10
result = "正の数" if x > 0 else "ゼロまたは負の数"
print(result)  # 出力: 正の数

# ネスト可能
y = 0
type_str = "正" if y > 0 else ("負" if y < 0 else "ゼロ")
print(type_str)  # 出力: ゼロ
```

**複数条件のチェック（チェーン比較）**:

Python では比較演算子を連鎖できる。

```python
x = 5

# 通常の書き方
if x > 0 and x < 10:
    print("0 < x < 10")  # これが実行される

# チェーン比較（Pythonらしい書き方）
if 0 < x < 10:
    print("0 < x < 10")  # これが実行される

# 複数の値と比較
value = "apple"
if value in ["apple", "banana", "orange"]:
    print("果物です")  # これが実行される
```

**match ステートメント（Python 3.10+）**:

Python 3.10 以降では構造化パターンマッチングが使える。

```python
status = 200

match status:
    case 200:
        print("OK")  # これが実行される
    case 404:
        print("Not Found")
    case 500:
        print("Server Error")
    case _:
        print("その他")
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
if (条件式) {
} else if (条件式) {
} else {
}
```

JavaScript では`if`、`else if`、`else`を使って条件分岐を行う。

**基本構文**:

```javascript
if (条件式1) {
  // 条件式1がtrueの場合の処理
} else if (条件式2) {
  // 条件式1がfalse、条件式2がtrueの場合の処理
} else {
  // すべての条件がfalseの場合の処理
}
```

条件式には`boolean`型の値または`boolean`を返す式を指定する。`else if`は複数設けることができる。

**基本的な例**:

```javascript
let x = 10;

if (x > 0) {
  console.log("正の数");
} else if (x < 0) {
  console.log("負の数");
} else {
  console.log("ゼロ");
}
// 出力: 正の数
```

**比較演算子**:

```javascript
let a = 10,
  b = 20;

if (a === b) {
  console.log("等しい");
} else if (a < b) {
  console.log("a は b より小さい"); // これが実行される
} else {
  console.log("a は b より大きい");
}

// == vs ===
let num = 10;
let str = "10";

if (num == str) {
  console.log("== で等しい"); // これが実行される（型変換あり）
}

if (num === str) {
  console.log("=== で等しい");
} else {
  console.log("=== で等しくない"); // これが実行される（型も比較）
}
```

**論理演算子**:

```javascript
let score = 85;
let passed = true;

// AND (&&)
if (score >= 60 && passed) {
  console.log("合格"); // これが実行される
}

// OR (||)
if (score >= 90 || passed) {
  console.log("優秀または合格"); // これが実行される
}

// NOT (!)
if (!passed) {
  console.log("不合格");
} else {
  console.log("合格"); // これが実行される
}
```

**Truthy と Falsy**:

JavaScript では以下の値は`false`として扱われる（Falsy 値）。

```javascript
// Falsy値: false, 0, -0, 0n, "", null, undefined, NaN

// 0
if (0) {
  console.log("True");
} else {
  console.log("False"); // これが実行される
}

// 空文字列
if ("") {
  console.log("True");
} else {
  console.log("False"); // これが実行される
}

// null
if (null) {
  console.log("True");
} else {
  console.log("False"); // これが実行される
}

// undefined
if (undefined) {
  console.log("True");
} else {
  console.log("False"); // これが実行される
}

// NaN
if (NaN) {
  console.log("True");
} else {
  console.log("False"); // これが実行される
}

// Truthy値（上記以外）
if ("hello") {
  console.log("True"); // これが実行される
}

if (1) {
  console.log("True"); // これが実行される
}

if ([]) {
  console.log("True"); // これが実行される（空の配列もTruthy）
}

if ({}) {
  console.log("True"); // これが実行される（空のオブジェクトもTruthy）
}
```

**文字列の比較**:

```javascript
let text = "hello";

// 文字列の比較
if (text === "hello") {
  console.log("一致"); // これが実行される
}

// includes()
if (text.includes("ll")) {
  console.log("含まれている"); // これが実行される
}

// null / undefined チェック
let value = null;
if (value === null) {
  console.log("null です"); // これが実行される
}

let undef;
if (undef === undefined) {
  console.log("undefined です"); // これが実行される
}
```

**ネストした if 文**:

```javascript
let age = 25;
let hasLicense = true;

if (age >= 18) {
  if (hasLicense) {
    console.log("運転できます"); // これが実行される
  } else {
    console.log("免許を取得してください");
  }
} else {
  console.log("18歳未満です");
}
```

**三項演算子**:

```javascript
let x = 10;
let result = x > 0 ? "正の数" : "ゼロまたは負の数";
console.log(result); // 出力: 正の数

// ネスト可能
let y = 0;
let type = y > 0 ? "正" : y < 0 ? "負" : "ゼロ";
console.log(type); // 出力: ゼロ
```

**Nullish Coalescing 演算子（??）**:

`null`または`undefined`の場合のみデフォルト値を使う。

```javascript
let value1 = null;
let value2 = 0;
let value3 = "";

// || は Falsy値すべてに反応
console.log(value1 || "デフォルト"); // デフォルト
console.log(value2 || "デフォルト"); // デフォルト（0もFalsy）
console.log(value3 || "デフォルト"); // デフォルト（""もFalsy）

// ?? は null/undefined のみに反応
console.log(value1 ?? "デフォルト"); // デフォルト
console.log(value2 ?? "デフォルト"); // 0（0は有効な値として扱われる）
console.log(value3 ?? "デフォルト"); // ""（空文字列は有効な値として扱われる）
```

**Optional Chaining（?.）**:

プロパティが存在しない可能性がある場合に安全にアクセスできる。

```javascript
let user = {
  name: "Alice",
  address: {
    city: "Tokyo",
  },
};

// 通常の書き方（エラーチェック）
if (user && user.address && user.address.city) {
  console.log(user.address.city); // Tokyo
}

// Optional Chaining
console.log(user?.address?.city); // Tokyo
console.log(user?.profile?.age); // undefined（エラーにならない）
```

**switch 文の代替**:

```javascript
let day = 3;

switch (day) {
  case 1:
    console.log("月曜日");
    break;
  case 2:
    console.log("火曜日");
    break;
  case 3:
    console.log("水曜日"); // これが実行される
    break;
  default:
    console.log("その他");
}
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
if 条件式 { } else if 条件式 { } else { }
```

Go では`if`、`else if`、`else`を使って条件分岐を行う。

**基本構文**:

```go
if 条件式1 {
    // 条件式1がtrueの場合の処理
} else if 条件式2 {
    // 条件式1がfalse、条件式2がtrueの場合の処理
} else {
    // すべての条件がfalseの場合の処理
}
```

条件式には`bool`型の値または`bool`を返す式を指定する。**括弧は不要**。`else if`は複数設けることができる。

**基本的な例**:

```go
import "fmt"

x := 10

if x > 0 {
    fmt.Println("正の数")
} else if x < 0 {
    fmt.Println("負の数")
} else {
    fmt.Println("ゼロ")
}
// 出力: 正の数
```

**比較演算子**:

```go
a, b := 10, 20

if a == b {
    fmt.Println("等しい")
} else if a < b {
    fmt.Println("a は b より小さい") // これが実行される
} else {
    fmt.Println("a は b より大きい")
}
```

**論理演算子**:

```go
score := 85
passed := true

// AND (&&)
if score >= 60 && passed {
    fmt.Println("合格") // これが実行される
}

// OR (||)
if score >= 90 || passed {
    fmt.Println("優秀または合格") // これが実行される
}

// NOT (!)
if !passed {
    fmt.Println("不合格")
} else {
    fmt.Println("合格") // これが実行される
}
```

**簡易文付き if**:

Go では`if`文の条件式の前に簡易文を書くことができる。変数のスコープを`if`ブロック内に限定できる。

```go
// 基本形: if 簡易文; 条件式 { }

// 変数を定義して即座に使用
if x := 10; x > 0 {
    fmt.Println("x は正の数") // これが実行される
    fmt.Println(x) // 10
}
// fmt.Println(x) // エラー: x はここではスコープ外

// 関数の戻り値をチェック
if err := someFunction(); err != nil {
    fmt.Println("エラー:", err)
    return
}

// 複数の変数を定義
if x, y := 1, 2; x < y {
    fmt.Printf("x(%d) is less than y(%d)\n", x, y) // これが実行される
}
```

**文字列の比較**:

```go
text := "hello"

// 文字列の比較
if text == "hello" {
    fmt.Println("一致") // これが実行される
}

// strings.Contains()
import "strings"

if strings.Contains(text, "ll") {
    fmt.Println("含まれている") // これが実行される
}

// nil チェック（ポインタやインターフェース）
var ptr *int
if ptr == nil {
    fmt.Println("nil です") // これが実行される
}
```

**ゼロ値のチェック**:

Go には Truthy/Falsy の概念はなく、条件式は必ず`bool`型である必要がある。

```go
// これはエラー（Goでは数値や文字列を直接条件式にできない）
// if 0 { } // コンパイルエラー
// if "" { } // コンパイルエラー

// 明示的に比較する必要がある
x := 0
if x == 0 {
    fmt.Println("ゼロです") // これが実行される
}

str := ""
if str == "" {
    fmt.Println("空文字列です") // これが実行される
}

// または len() を使う
if len(str) == 0 {
    fmt.Println("空文字列です") // これが実行される
}
```

**ネストした if 文**:

```go
age := 25
hasLicense := true

if age >= 18 {
    if hasLicense {
        fmt.Println("運転できます") // これが実行される
    } else {
        fmt.Println("免許を取得してください")
    }
} else {
    fmt.Println("18歳未満です")
}
```

**エラーハンドリング**:

Go では`if`文でエラーチェックを行うのが一般的。

```go
import (
    "fmt"
    "strconv"
)

// 関数の戻り値をチェック
num, err := strconv.Atoi("123")
if err != nil {
    fmt.Println("エラー:", err)
    return
}
fmt.Println("変換成功:", num) // 変換成功: 123

// 簡易文付きifで簡潔に
if num, err := strconv.Atoi("abc"); err != nil {
    fmt.Println("エラー:", err) // これが実行される
} else {
    fmt.Println("変換成功:", num)
}
```

**型アサーション**:

```go
var i interface{} = "hello"

// 型アサーション with ok idiom
if str, ok := i.(string); ok {
    fmt.Println("文字列:", str) // これが実行される
} else {
    fmt.Println("文字列ではない")
}
```

**map の存在チェック**:

```go
m := map[string]int{"a": 1, "b": 2}

// キーの存在チェック
if value, exists := m["a"]; exists {
    fmt.Println("値:", value) // 値: 1
} else {
    fmt.Println("キーが存在しません")
}

// 存在しないキー
if _, exists := m["c"]; !exists {
    fmt.Println("キーが存在しません") // これが実行される
}
```

**switch 文の代替**:

Go では`switch`文も柔軟に使える。

```go
day := 3

switch day {
case 1:
    fmt.Println("月曜日")
case 2:
    fmt.Println("火曜日")
case 3:
    fmt.Println("水曜日") // これが実行される
default:
    fmt.Println("その他")
}

// 条件式のswitch（if-elseの代替）
score := 85

switch {
case score >= 90:
    fmt.Println("A")
case score >= 80:
    fmt.Println("B") // これが実行される
case score >= 70:
    fmt.Println("C")
default:
    fmt.Println("D")
}
```

</div>
