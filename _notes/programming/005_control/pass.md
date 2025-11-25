---
title: "pass文"
date: "2019-10-27T21:36:30+09:00"
excerpt: "pass文について"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-27T21:36:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

何も処理をしない文、pass 文についてを示す。

構文としては何か記述が必要だが、特に処理をする必要がないという時に使う。言語によりあるものとないものがある。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
// (なし)
```

Java には**pass 文は存在しない**。

Java では、空のブロックやコメントで代替する。

**空のブロック**:

```java
// 空のループ
for (int i = 0; i < 10; i++) {
    // 何もしない
}

// 空のif文
if (condition) {
    // 何もしない
}

// 空のメソッド
public void doNothing() {
    // 何もしない
}
```

**空のブロック（コメントなし）**:

```java
// ブロック内を完全に空にすることもできる
for (int i = 0; i < 10; i++) {
}

if (condition) {
}

public void doNothing() {
}
```

**実用例（例外の無視）**:

```java
try {
    // 例外が発生する可能性のある処理
    Integer.parseInt("not a number");
} catch (NumberFormatException e) {
    // 例外を無視（推奨されない）
}
```

**実用例（抽象メソッドの実装）**:

```java
// インターフェースの実装で、一部のメソッドを空にする
class MyClass implements SomeInterface {
    @Override
    public void requiredMethod() {
        // 必要な処理
    }

    @Override
    public void optionalMethod() {
        // 何もしない（デフォルト実装）
    }
}
```

**セミコロンのみ**:

Java では、セミコロンのみで空の文を作ることもできる。

```java
// 空の文（セミコロンのみ）
if (condition)
    ; // 何もしない

// ループで何もしない
while (someCondition())
    ;
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
pass
```

Python では**pass 文**が存在する。

Python では、`for`、`while`、`if`、関数、クラスなどの構文で、ブロック内に最低 1 行の文が必要。何もしない場合でも`pass`を書く必要がある。

**基本的な使い方**:

```python
# 空のループ
for i in range(10):
    pass  # 何もしない

# 空のif文
if condition:
    pass  # 何もしない

# 空の関数
def do_nothing():
    pass

# 空のクラス
class EmptyClass:
    pass
```

**while での使用**:

```python
# 無限ループ（何もしない）
while True:
    pass  # Ctrl+C で停止できる

# 条件待ち
while not ready:
    pass  # 条件が真になるまで待つ
```

**関数での使用**:

```python
# まだ実装していない関数
def future_feature():
    pass  # TODO: 後で実装

# 引数付きの関数
def process_data(data):
    pass  # 実装予定
```

**クラスでの使用**:

```python
# 空のクラス
class Animal:
    pass

# メソッドが空のクラス
class Dog:
    def __init__(self, name):
        self.name = name

    def bark(self):
        pass  # 後で実装

# 継承で一部のメソッドを空にする
class MyClass(BaseClass):
    def required_method(self):
        # 必要な処理
        print("実装済み")

    def optional_method(self):
        pass  # 何もしない
```

**if-elif-else での使用**:

```python
value = 5

if value < 0:
    pass  # 負の数の処理は不要
elif value == 0:
    print("ゼロ")
else:
    print("正の数")
# 出力: 正の数
```

**try-except での使用**:

```python
# 例外を無視
try:
    result = int("not a number")
except ValueError:
    pass  # 例外を無視（推奨されない）

# 特定の例外のみ無視
try:
    # 処理
    risky_operation()
except SpecificError:
    pass  # この例外のみ無視
except Exception as e:
    print(f"エラー: {e}")
```

**match 文での使用（Python 3.10+）**:

```python
value = 5
match value:
    case 1:
        print("1")
    case 2:
        print("2")
    case _:
        pass  # その他の場合は何もしない
```

**pass vs ... (Ellipsis)**:

Python では、`...`（Ellipsis）も`pass`と同様に使える。

```python
# passを使った場合
def function1():
    pass

# Ellipsisを使った場合
def function2():
    ...

# どちらも同じ動作だが、慣習的にpassが一般的
# Ellipsisは型ヒントやスタブファイルで使われることが多い
```

**実用例（プレースホルダー）**:

```python
# 開発中の関数
def calculate_complex_value(data):
    """
    複雑な計算を行う関数（開発中）
    """
    pass  # TODO: 実装する

# テスト用のモック
class MockDatabase:
    def connect(self):
        pass  # 実際には接続しない

    def query(self, sql):
        pass  # 実際にはクエリを実行しない

    def close(self):
        pass  # 実際には切断しない
```

**pass の必要性**:

```python
# これはエラー
# def empty_function():
#     # コメントのみではエラー

# 正しい書き方
def empty_function():
    pass  # 最低1つの文が必要
```

**ループでの実用例**:

```python
# ファイルを読み飛ばす
with open("file.txt") as f:
    for line in f:
        if line.startswith("#"):
            pass  # コメント行はスキップ
        else:
            process(line)

# カウンターのみ
count = 0
for item in items:
    if item.is_valid():
        count += 1
    else:
        pass  # 無効なアイテムは何もしない
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
// (なし)
```

JavaScript には**pass 文は存在しない**。

JavaScript では、空のブロックやコメントで代替する。

**空のブロック**:

```javascript
// 空のループ
for (let i = 0; i < 10; i++) {
  // 何もしない
}

// 空のif文
if (condition) {
  // 何もしない
}

// 空の関数
function doNothing() {
  // 何もしない
}
```

**空のブロック（コメントなし）**:

```javascript
// ブロック内を完全に空にすることもできる
for (let i = 0; i < 10; i++) {}

if (condition) {
}

function doNothing() {}

const doNothing2 = () => {};
```

**実用例（例外の無視）**:

```javascript
try {
  // 例外が発生する可能性のある処理
  JSON.parse("invalid json");
} catch (e) {
  // 例外を無視（推奨されない）
}
```

**実用例（空のコールバック）**:

```javascript
// イベントリスナーで何もしない
button.addEventListener("click", () => {
  // 何もしない
});

// Promiseで何もしない
promise
  .then((result) => {
    // 何もしない
  })
  .catch((error) => {
    // エラーを無視
  });
```

**実用例（オブジェクトメソッド）**:

```javascript
const obj = {
  method1() {
    // 実装済み
    console.log("method1");
  },
  method2() {
    // 何もしない（将来実装予定）
  },
};
```

**実用例（クラス）**:

```javascript
class MyClass {
  constructor() {
    // 何もしない
  }

  requiredMethod() {
    // 必要な処理
    console.log("実装済み");
  }

  optionalMethod() {
    // 何もしない（デフォルト実装）
  }
}
```

**空の文（セミコロンのみ）**:

JavaScript では、セミコロンのみで空の文を作ることもできる。

```javascript
// 空の文（セミコロンのみ）
if (condition);

// ループで何もしない
while (someCondition());
```

**undefined を返す**:

関数で何もしない場合、`undefined`が返される。

```javascript
function doNothing() {}

console.log(doNothing()); // undefined
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
// (なし)
```

Go には**pass 文は存在しない**。

Go では、空のブロックやコメントで代替する。

**空のブロック**:

```go
import "fmt"

// 空のループ
for i := 0; i < 10; i++ {
    // 何もしない
}

// 空のif文
if condition {
    // 何もしない
}

// 空の関数
func doNothing() {
    // 何もしない
}
```

**空のブロック（コメントなし）**:

```go
// ブロック内を完全に空にすることもできる
for i := 0; i < 10; i++ {
}

if condition {
}

func doNothing() {
}
```

**実用例（エラーの無視）**:

```go
// エラーを無視（推奨されない）
result, _ := someFunction()

// エラーをチェックせずに無視
if err := someFunction(); err != nil {
    // エラーを無視
}
```

**実用例（空の関数）**:

```go
// まだ実装していない関数
func futureFeature() {
    // TODO: 後で実装
}

// 空のメソッド
type MyStruct struct{}

func (m *MyStruct) RequiredMethod() {
    // 必要な処理
    fmt.Println("実装済み")
}

func (m *MyStruct) OptionalMethod() {
    // 何もしない（デフォルト実装）
}
```

**実用例（空のインターフェース実装）**:

```go
type Writer interface {
    Write([]byte) (int, error)
}

type NullWriter struct{}

func (w NullWriter) Write(data []byte) (int, error) {
    // 何もしない（データを捨てる）
    return len(data), nil
}
```

**実用例（チャネル待ち）**:

```go
// チャネルから値を受信するが何もしない
for range ch {
    // 値を受信するだけで何もしない
}

// タイムアウト待ち
select {
case <-time.After(1 * time.Second):
    // タイムアウト後に何もしない
}
```

**実用例（空の構造体）**:

```go
// 空の構造体（メモリを使わない）
type Empty struct{}

// シグナル用のチャネル
done := make(chan struct{})

// シグナルを送る
done <- struct{}{}
```

**ループで何もしない**:

```go
// 条件待ち
for !ready {
    // 条件が真になるまで待つ（CPU を消費するため非推奨）
}

// より良い方法: time.Sleep を使う
for !ready {
    time.Sleep(100 * time.Millisecond)
}
```

**空白識別子（\_）**:

Go では、使わない値を`_`で捨てることができる。

```go
// 戻り値を無視
_ = someFunction()

// エラーを無視（推奨されない）
result, _ := someFunction()

// ループで値を無視
for _, value := range items {
    fmt.Println(value)
}

// 複数の戻り値の一部を無視
data, _, err := threeReturnFunction()
if err != nil {
    return err
}
```

**コンパイラチェックの回避**:

```go
// 変数を使っていないというエラーを回避
var unusedVar int
_ = unusedVar  // 使っていることにする
```

</div>
