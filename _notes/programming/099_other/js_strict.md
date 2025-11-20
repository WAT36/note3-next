---
title: "Strictモード・厳格モード"
date: "2019-11-01T09:37:30+09:00"
excerpt: "Strictモード・厳格モードについて"
tag: ["Javascript", "Python"]
programming: ["Javascript", "Python"]
updatedAt: "2019-11-01T09:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

Strict モード（厳格モード）について説明する。

Strict モードは、コードをより厳格にチェックし、エラーを早期に発見したり、最適化を促進したりするための機能。言語によってサポート状況が異なる。

<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
"use strict";
```

JavaScript の Strict モード（厳格モード）は、曖昧で安全でない機能を禁止し、より厳格なエラーチェックを行う。

**Strict モードとは**:

JavaScript は後方互換性を保つため、古い仕様の曖昧さや問題のある挙動を許容している。Strict モードを有効にすることで:

1. **エラーの早期発見**: 潜在的なバグを実行時エラーにする
2. **パフォーマンス向上**: エンジンが最適化しやすくなる
3. **安全性の向上**: 危険な操作を禁止する
4. **将来の仕様への準備**: 将来予約されるキーワードを保護

**Strict モードの有効化**:

```javascript
// グローバルスコープに適用（ファイル全体）
"use strict";

var x = 10;
console.log(x);
```

```javascript
// 関数スコープに適用（その関数のみ）
function strictFunction() {
  "use strict";
  var x = 10;
  console.log(x);
}

function normalFunction() {
  // Strict モードではない
  y = 20; // OK（非推奨）
}
```

**ES6 モジュールでは自動的に Strict モード**:

```javascript
// ES6 モジュール（.js ファイルで type="module" またはモジュールシステム使用時）
// "use strict"; は不要（自動的に strict モード）

export function myFunction() {
  // すでに strict モード
}
```

**Strict モードで禁止される事項**:

### **1. 暗黙のグローバル変数の作成**

```javascript
// 通常モード: OK（グローバル変数が作成される）
x = 10;
console.log(x); // 10

// Strict モード: エラー
("use strict");
x = 10; // ReferenceError: x is not defined
```

### **2. 予約語を変数名として使用**

```javascript
// 通常モード: OK（一部の予約語）
var package = 1;
var private = 2;
console.log(package); // 1

// Strict モード: エラー
("use strict");
var package = 1; // SyntaxError: Unexpected strict mode reserved word
var private = 2; // SyntaxError: Unexpected strict mode reserved word
```

### **3. 重複するパラメータ名**

```javascript
// 通常モード: OK（後のパラメータが優先）
function sum(a, a, c) {
  return a + a + c;
}
console.log(sum(1, 2, 3)); // 7 (2 + 2 + 3)

// Strict モード: エラー
("use strict");
function sum(a, a, c) {
  // SyntaxError: Duplicate parameter name not allowed
  return a + a + c;
}
```

### **4. オクタル数値リテラル**

```javascript
// 通常モード: OK（0始まりは8進数）
var num = 010;
console.log(num); // 8

// Strict モード: エラー
("use strict");
var num = 010; // SyntaxError: Octal literals are not allowed in strict mode
// 正しくは 0o10 または 8 を使う
var num = 0o10; // OK: 8
```

### **5. with 文**

```javascript
// 通常モード: OK
var obj = { x: 10 };
with (obj) {
  console.log(x); // 10
}

// Strict モード: エラー
("use strict");
with (obj) {
  // SyntaxError: Strict mode code may not include a with statement
  console.log(x);
}
```

### **6. 読み取り専用プロパティへの代入**

```javascript
"use strict";

var obj = {};
Object.defineProperty(obj, "x", {
  value: 10,
  writable: false,
});

obj.x = 20; // TypeError: Cannot assign to read only property 'x'
```

### **7. delete で削除できないプロパティの削除**

```javascript
"use strict";

var x = 10;
delete x; // SyntaxError: Delete of an unqualified identifier in strict mode

var obj = {};
Object.defineProperty(obj, "y", {
  value: 20,
  configurable: false,
});
delete obj.y; // TypeError: Cannot delete property 'y'
```

### **8. eval と arguments の特殊な扱い**

```javascript
// 通常モード: OK
eval = 10;
arguments = 20;

// Strict モード: エラー
("use strict");
eval = 10; // SyntaxError: Unexpected eval or arguments in strict mode
arguments = 20; // SyntaxError: Unexpected eval or arguments in strict mode

var eval; // SyntaxError
var arguments; // SyntaxError
```

### **9. this の値**

```javascript
// 通常モード: this はグローバルオブジェクト（window, global）
function showThis() {
  console.log(this);
}
showThis(); // window（ブラウザ）または global（Node.js）

// Strict モード: this は undefined
("use strict");
function showThis() {
  console.log(this);
}
showThis(); // undefined
```

**Strict モードで禁止される事項の一覧**:

| 項目                             | 通常モード             | Strict モード |
| -------------------------------- | ---------------------- | ------------- |
| 暗黙のグローバル変数             | OK                     | エラー        |
| 予約語を変数名に                 | OK（一部）             | エラー        |
| 重複パラメータ名                 | OK                     | エラー        |
| オクタル数値リテラル（0 始まり） | OK                     | エラー        |
| with 文                          | OK                     | エラー        |
| 読み取り専用プロパティへの代入   | 無視                   | エラー        |
| 削除できないプロパティの削除     | 無視                   | エラー        |
| eval/arguments を変数名に        | OK                     | エラー        |
| 関数内の this                    | グローバルオブジェクト | undefined     |
| arguments.callee                 | OK                     | エラー        |
| arguments.caller                 | OK                     | エラー        |

**実用例**:

### **グローバル汚染を防ぐ**

```javascript
"use strict";

function calculate() {
  // result を宣言し忘れた場合、すぐにエラーになる
  result = 10 + 20; // ReferenceError: result is not defined
  return result;
}
```

### **安全な関数定義**

```javascript
"use strict";

// 重複パラメータがエラーになる
function createUser(name, email, name) {
  // SyntaxError
  return { name, email };
}
```

### **モジュールでの使用**

```javascript
// ES6 モジュール（自動的に strict モード）
export function add(a, b) {
  // 暗黙のグローバル変数はエラー
  result = a + b; // ReferenceError
  return result;
}
```

**実践的な推奨事項**:

1. **新しいコードでは常に Strict モードを使用**:

   ```javascript
   "use strict";
   ```

2. **ES6 モジュールを使用**（自動的に strict モード）:

   ```javascript
   // module.js
   export function myFunction() {
     // 自動的に strict モード
   }
   ```

3. **既存コードへの適用は慎重に**:

   - 既存コードに `"use strict";` を追加すると、隠れたバグが表面化する可能性がある
   - テストを十分に行ってから適用する

4. **関数単位で適用**:
   ```javascript
   function safeFunction() {
     "use strict";
     // この関数のみ strict モード
   }
   ```

**TypeScript との関係**:

TypeScript では `"use strict";` は自動的に出力される（`tsconfig.json` の `alwaysStrict` オプション）。

```json
{
  "compilerOptions": {
    "alwaysStrict": true // デフォルトで true
  }
}
```

**ブラウザサポート**:

すべてのモダンブラウザで Strict モードがサポートされている（IE10+）。

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
from __future__ import division
```

Python では `from __future__ import` を使って、将来のバージョンの機能を現在のバージョンで有効化できる。これは厳格な動作を強制するものではないが、言語の挙動を変更する点で類似している。

**`__future__` モジュールとは**:

`__future__` は、将来のバージョンで標準になる機能を先行して有効化するためのモジュール。ファイルの先頭で import することで、そのファイル全体に適用される。

**主な `__future__` インポート**:

### **1. division（除算の挙動変更）**

Python 2 と Python 3 で除算の挙動が異なる。

```python
# Python 2 のデフォルト動作（整数除算）
print(5 / 2)  # 2（整数除算）

# future を使って Python 3 の動作にする
from __future__ import division

print(5 / 2)   # 2.5（浮動小数点除算）
print(5 // 2)  # 2（整数除算）
```

**Python 3 ではデフォルトで浮動小数点除算**なので、`from __future__ import division` は不要。

### **2. print_function（print を関数にする）**

Python 2 では `print` は文だが、Python 3 では関数。

```python
# Python 2 のデフォルト動作
print "Hello"  # OK

# future を使って Python 3 の動作にする
from __future__ import print_function

print("Hello")  # OK
print "Hello"   # SyntaxError
```

**Python 3 ではデフォルトで関数**なので、`from __future__ import print_function` は不要。

### **3. absolute_import（絶対インポート）**

Python 2 では相対インポートがデフォルトだが、Python 3 では絶対インポートがデフォルト。

```python
# Python 2 のデフォルト動作（相対インポート優先）
import module  # 同じディレクトリの module.py を優先

# future を使って Python 3 の動作にする
from __future__ import absolute_import

import module  # sys.path から探す（絶対インポート）
from . import module  # 相対インポート（明示的）
```

**Python 3 ではデフォルトで絶対インポート**なので、`from __future__ import absolute_import` は不要。

### **4. unicode_literals（文字列リテラルを Unicode にする）**

Python 2 では文字列リテラルはバイト文字列だが、Python 3 では Unicode 文字列。

```python
# Python 2 のデフォルト動作
s = "Hello"  # バイト文字列（str）
u = u"Hello"  # Unicode 文字列（unicode）

# future を使って Python 3 の動作にする
from __future__ import unicode_literals

s = "Hello"  # Unicode 文字列（unicode）
b = b"Hello"  # バイト文字列（bytes）
```

**Python 3 ではデフォルトで Unicode**なので、`from __future__ import unicode_literals` は不要（ただし、Python 2/3 互換コードでは有用）。

### **5. annotations（型ヒントの遅延評価、Python 3.7+）**

型ヒントを文字列として評価する（循環参照の解決に有用）。

```python
# 通常の動作
class Node:
    def __init__(self, value: int, next: Node):  # エラー: Node がまだ定義されていない
        self.value = value
        self.next = next

# future を使って遅延評価にする
from __future__ import annotations

class Node:
    def __init__(self, value: int, next: Node):  # OK: 型ヒントは文字列として扱われる
        self.value = value
        self.next = next
```

**Python 3.10+ では将来デフォルトになる予定**（延期されている）。

**複数の future インポート**:

```python
from __future__ import division, print_function, absolute_import
```

**注意事項**:

1. **ファイルの先頭に記述**:

   ```python
   # 正しい
   from __future__ import division

   import os
   ```

   ```python
   # 間違い
   import os
   from __future__ import division  # SyntaxError: from __future__ imports must occur at the beginning of the file
   ```

2. **Python 3 では多くが不要**:

   - Python 3 を使っている場合、`division`、`print_function`、`absolute_import` は不要（すでにデフォルト）
   - `annotations` は Python 3.7+ で有用

3. **docstring の後でも OK**:
   ```python
   """
   モジュールの説明
   """
   from __future__ import division  # OK
   ```

**利用可能な future インポートの一覧**:

```python
import __future__

print(__future__.all_feature_names)
# ['nested_scopes', 'generators', 'division', 'absolute_import',
#  'with_statement', 'print_function', 'unicode_literals',
#  'barry_as_FLUFL', 'generator_stop', 'annotations']
```

**実用例**:

### **Python 2/3 互換コードの作成**

```python
from __future__ import division, print_function, absolute_import, unicode_literals

# Python 2 でも Python 3 のように動作する
result = 5 / 2  # 2.5
print("Result:", result)
text = "Hello"  # Unicode 文字列
```

### **型ヒントでの循環参照解決（Python 3.7+）**

```python
from __future__ import annotations

class TreeNode:
    def __init__(self, value: int, left: TreeNode = None, right: TreeNode = None):
        self.value = value
        self.left = left
        self.right = right

    def add_left(self, node: TreeNode) -> None:
        self.left = node
```

**JavaScript の Strict モードとの違い**:

| 項目       | JavaScript Strict モード | Python `__future__` |
| ---------- | ------------------------ | ------------------- |
| 目的       | エラーチェックを厳格化   | 将来の機能を有効化  |
| スコープ   | ファイル全体または関数   | ファイル全体のみ    |
| エラー検出 | はい                     | いいえ（挙動変更）  |
| 互換性     | 後方互換性を保つ         | 前方互換性を保つ    |

**Python には JavaScript のような厳格モードはない**:

Python は言語設計上、すでに厳格な動作をするため、JavaScript の Strict モードのような機能は存在しない。例えば:

- 未定義変数へのアクセスは常にエラー
- 予約語を変数名にすることは常にエラー
- 型チェックは実行時に行われる（型ヒントは静的解析ツール用）

</div>
<div class="note_content_by_programming_language" id="note_content_Java">

Java には JavaScript の Strict モードのような機能は**存在しない**。

**理由**:

Java は静的型付け言語であり、コンパイル時に厳格な型チェックや構文チェックが行われる。そのため、実行時に「厳格モード」を切り替える必要がない。

**Java でのエラーチェック**:

1. **コンパイル時エラー**: 構文エラー、型エラー、未定義変数などはコンパイル時に検出される
2. **警告の制御**: `@SuppressWarnings` アノテーションで警告を抑制できるが、これは厳格モードとは異なる

**コンパイラ警告の制御**:

```java
// 未チェック警告を抑制
@SuppressWarnings("unchecked")
public void addToList(List list) {
    list.add("item");
}

// すべての警告を抑制（非推奨）
@SuppressWarnings("all")
public void myMethod() {
    // ...
}
```

**Javac コンパイラオプション**:

コマンドラインでコンパイラの警告レベルを制御できる。

```bash
# すべての警告を表示
javac -Xlint:all MyClass.java

# 非推奨 API の使用警告
javac -Xlint:deprecation MyClass.java

# 未チェック操作の警告
javac -Xlint:unchecked MyClass.java

# 警告をエラーとして扱う
javac -Werror MyClass.java
```

**まとめ**:

Java は言語仕様として厳格であり、JavaScript の Strict モードに相当する機能は不要。コンパイラオプションで警告レベルを調整することは可能。

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

Go には JavaScript の Strict モードのような機能は**存在しない**。

**理由**:

Go は言語設計上、すでに厳格な動作をする。以下のような特徴がある:

1. **未使用変数・未使用インポートはコンパイルエラー**
2. **型チェックが厳格**
3. **暗黙の型変換はほぼない**
4. **構文が単純で曖昧さが少ない**

**Go の厳格な仕様**:

### **未使用変数はエラー**

```go
package main

func main() {
    x := 10  // エラー: x declared and not used
}
```

### **未使用インポートはエラー**

```go
package main

import "fmt"  // エラー: imported and not used: "fmt"

func main() {
}
```

### **型チェックが厳格**

```go
package main

func main() {
    var x int = 10
    var y float64 = 3.14

    // エラー: cannot use y (type float64) as type int
    z := x + y

    // 明示的な型変換が必要
    z := x + int(y)  // OK
}
```

### **予約語を変数名にできない**

```go
package main

func main() {
    var package int = 10  // エラー: syntax error: unexpected package
}
```

**`go vet` によるコード検査**:

Go には `go vet` というツールがあり、潜在的な問題を検出できる。

```bash
# コードの静的解析
go vet mypackage

# すべてのパッケージを検査
go vet ./...
```

`go vet` が検出する問題の例:

- `Printf` の書式指定子が引数と一致しない
- 到達不可能なコード
- 無意味な比較（`x == x`）
- シャドウイング（変数の隠蔽）

**`golint` によるスタイルチェック**:

```bash
# コードスタイルの検査
golint mypackage

# すべてのパッケージを検査
golint ./...
```

**`gofmt` による自動フォーマット**:

Go には公式のコードフォーマッターがある。

```bash
# ファイルをフォーマット（上書き）
gofmt -w myfile.go

# ディレクトリ全体をフォーマット
gofmt -w .
```

**実用例**:

### **未使用変数の検出**

```go
package main

import "fmt"

func main() {
    x := 10
    y := 20  // エラー: y declared and not used

    fmt.Println(x)
}

// 解決策1: 使用する
func main() {
    x := 10
    y := 20

    fmt.Println(x, y)  // OK
}

// 解決策2: アンダースコアで無視
func main() {
    x := 10
    _ = 20  // OK（意図的に無視）

    fmt.Println(x)
}
```

### **エラーハンドリングの検査**

```go
package main

import "os"

func main() {
    file, err := os.Open("file.txt")
    // go vet 警告: result 1 (error) is never used

    _ = file  // エラーを無視（非推奨）
}

// 正しい書き方
func main() {
    file, err := os.Open("file.txt")
    if err != nil {
        // エラー処理
        return
    }
    defer file.Close()

    // ファイルを使用
}
```

**まとめ**:

Go は言語仕様として厳格であり、JavaScript の Strict モードに相当する機能は不要。`go vet`、`golint`、`gofmt` などのツールを使って、コードの品質を保つ。

</div>
