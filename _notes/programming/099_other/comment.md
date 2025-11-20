---
title: "コメントアウト"
date: "2019-11-01T04:37:30+09:00"
excerpt: "コメントアウトについて"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-11-01T04:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

プログラミングでコメント（注釈）を付け加えたい時、または特定の箇所を実行対象外としたい時にコメントアウトを使う。各言語で異なる記法がある。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
// comment
/* comment */
```

Java では`//`（1 行コメント）と`/* */`（複数行コメント）、`/** */`（ドキュメントコメント）の 3 種類がある。

**1 行コメント（//）**:

`//`から行末までがコメントになる。

```java
// これは1行コメント
int x = 10;  // 変数xを宣言

// 以下の行はコメントアウトされて実行されない
// int y = 20;
```

**複数行コメント（/\* \*/）**:

`/*`から`*/`までがコメントになる。

```java
/*
 これは複数行コメント
 複数行に渡って
 コメントを書ける
 */
int x = 10;

/*
int y = 20;
int z = 30;
*/  // この部分は実行されない
```

**ドキュメントコメント（/** \*/、Javadoc）\*\*:

クラス、メソッド、フィールドのドキュメントを記述する。

```java
/**
 * ユーザーを表すクラス。
 *
 * @author Your Name
 * @version 1.0
 */
public class User {
    /**
     * 2つの数値を加算する。
     *
     * @param a 第1の数値
     * @param b 第2の数値
     * @return a と b の合計
     */
    public int add(int a, b) {
        return a + b;
    }
}
```

**ネストできない**:

複数行コメントはネストできない。

```java
/*
  外側のコメント
  /* 内側のコメント */  // エラー: ここで外側のコメントが終了する
  この部分はコメント外になる
*/
```

**実用例**:

```java
public class Calculator {
    // 定数の定義
    private static final double PI = 3.14159;

    /**
     * 円の面積を計算する。
     *
     * @param radius 半径
     * @return 円の面積
     */
    public double calculateCircleArea(double radius) {
        // 面積 = π × r²
        return PI * radius * radius;
    }

    /*
     デバッグ用のメソッド（一時的にコメントアウト）
    public void debug() {
        System.out.println("Debug info");
    }
    */
}
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
# comment
```

Python では`#`を使って 1 行コメントを書く。複数行の場合は各行に`#`を付けるか、三重引用符を使う。

**1 行コメント（#）**:

`#`から行末までがコメントになる。

```python
# これは1行コメント
x = 10  # 変数xを宣言

# 以下の行はコメントアウトされて実行されない
# y = 20
```

**複数行コメント（三重引用符）**:

三重引用符（`'''`または`"""`）で囲むと複数行のコメントになる。

```python
'''
これは複数行コメント
複数行に渡って
コメントを書ける
'''
x = 10

"""
これもまた複数行コメント
ダブルクォート3つでも可能
"""
y = 20
```

**注意**: 三重引用符は厳密にはコメントではなく文字列リテラル。代入されなければ無視されるため、コメントとして機能する。

**docstring（ドキュメント文字列）**:

関数やクラスの直下に書く三重引用符は、ドキュメント文字列として扱われる。

```python
def add(a, b):
    """
    2つの数値を加算する。

    Args:
        a: 第1の数値
        b: 第2の数値

    Returns:
        a と b の合計
    """
    return a + b

class User:
    """ユーザーを表すクラス。"""

    def __init__(self, name):
        """
        ユーザーを初期化する。

        Args:
            name: ユーザー名
        """
        self.name = name
```

**コードブロックのコメントアウト**:

```python
# 複数行をコメントアウト（各行に#）
# x = 10
# y = 20
# z = 30

# または三重引用符
"""
x = 10
y = 20
z = 30
"""
```

**実用例**:

```python
class Calculator:
    """計算機クラス。"""

    # 定数の定義
    PI = 3.14159

    def calculate_circle_area(self, radius):
        """
        円の面積を計算する。

        Args:
            radius (float): 半径

        Returns:
            float: 円の面積
        """
        # 面積 = π × r²
        return self.PI * radius * radius

    '''
    デバッグ用のメソッド（一時的にコメントアウト）
    def debug(self):
        print("Debug info")
    '''
```

**インラインコメントの推奨事項**:

```python
# 良い例: 簡潔で明確
x = x + 1  # xをインクリメント

# 悪い例: 自明なコメント
x = x + 1  # xに1を足す
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
// comment
/* comment */
```

JavaScript では`//`（1 行コメント）と`/* */`（複数行コメント）、`/** */`（JSDoc コメント）の 3 種類がある。

**1 行コメント（//）**:

`//`から行末までがコメントになる。

```javascript
// これは1行コメント
let x = 10; // 変数xを宣言

// 以下の行はコメントアウトされて実行されない
// let y = 20;
```

**複数行コメント（/\* \*/）**:

`/*`から`*/`までがコメントになる。

```javascript
/*
 これは複数行コメント
 複数行に渡って
 コメントを書ける
 */
let x = 10;

/*
let y = 20;
let z = 30;
*/ // この部分は実行されない
```

**JSDoc コメント（/** \*/）\*\*:

関数やクラスのドキュメントを記述する。

```javascript
/**
 * 2つの数値を加算する。
 *
 * @param {number} a - 第1の数値
 * @param {number} b - 第2の数値
 * @returns {number} a と b の合計
 *
 * @example
 * add(5, 10); // 15
 */
function add(a, b) {
  return a + b;
}

/**
 * ユーザーを表すクラス。
 */
class User {
  /**
   * ユーザーを作成する。
   *
   * @param {string} name - ユーザー名
   * @param {number} age - 年齢
   */
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
```

**ネストできない**:

複数行コメントはネストできない。

```javascript
/*
  外側のコメント
  /* 内側のコメント */  // エラー: ここで外側のコメントが終了する
  この部分はコメント外になる
*/
```

**実用例**:

```javascript
class Calculator {
  // 定数の定義
  static PI = 3.14159;

  /**
   * 円の面積を計算する。
   *
   * @param {number} radius - 半径
   * @returns {number} 円の面積
   */
  calculateCircleArea(radius) {
    // 面積 = π × r²
    return Calculator.PI * radius * radius;
  }

  /*
   デバッグ用のメソッド（一時的にコメントアウト）
  debug() {
    console.log("Debug info");
  }
  */
}
```

**HTML 内でのコメント**:

HTML ファイル内の JavaScript では、`<!-- -->`との混同に注意。

```html
<script>
  // JavaScript のコメント
  let x = 10;

  /* 複数行コメント */
  let y = 20;
</script>

<!-- HTML のコメント（JavaScript ではない） -->
```

**インラインコメントの推奨事項**:

```javascript
// 良い例: 簡潔で明確
x = x + 1; // xをインクリメント

// 悪い例: 自明なコメント
x = x + 1; // xに1を足す
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
// comment
/* comment */
```

Go では`//`（1 行コメント）と`/* */`（複数行コメント）の 2 種類がある。記法は Java と同じ。

**1 行コメント（//）**:

`//`から行末までがコメントになる。

```go
// これは1行コメント
x := 10  // 変数xを宣言

// 以下の行はコメントアウトされて実行されない
// y := 20
```

**複数行コメント（/\* \*/）**:

`/*`から`*/`までがコメントになる。

```go
/*
 これは複数行コメント
 複数行に渡って
 コメントを書ける
 */
x := 10

/*
y := 20
z := 30
*/  // この部分は実行されない
```

**ドキュメントコメント**:

パッケージ、関数、型の直前にコメントを書くと、`go doc`でドキュメントとして表示される。

```go
// Package mathutil provides basic mathematical utilities.
package mathutil

// Add returns the sum of two integers.
func Add(a, b int) int {
    return a + b
}

// User represents a user in the system.
type User struct {
    // ID is the unique identifier for the user.
    ID int

    // Name is the user's full name.
    Name string
}
```

**エクスポートされた項目のコメント**:

大文字で始まる（エクスポートされた）関数、型、変数には必ずコメントを書くのが推奨される。

```go
// MaxRetryCount is the maximum number of retry attempts.
const MaxRetryCount = 3

// CalculateTotal calculates the total price including tax.
func CalculateTotal(price float64, taxRate float64) float64 {
    return price * (1 + taxRate)
}
```

**ネストできない**:

複数行コメントはネストできない。

```go
/*
  外側のコメント
  /* 内側のコメント */  // エラー: ここで外側のコメントが終了する
  この部分はコメント外になる
*/
```

**実用例**:

```go
package main

import "fmt"

// Calculator provides basic calculation methods.
type Calculator struct {
    // PI is the mathematical constant π.
    PI float64
}

// NewCalculator creates a new Calculator instance.
func NewCalculator() *Calculator {
    return &Calculator{
        PI: 3.14159,
    }
}

// CalculateCircleArea calculates the area of a circle.
//
// The formula is: area = π × r²
//
// Parameters:
//   - radius: The radius of the circle
//
// Returns the area of the circle.
func (c *Calculator) CalculateCircleArea(radius float64) float64 {
    // 面積 = π × r²
    return c.PI * radius * radius
}

/*
デバッグ用のメソッド（一時的にコメントアウト）
func (c *Calculator) Debug() {
    fmt.Println("Debug info")
}
*/

func main() {
    calc := NewCalculator()
    area := calc.CalculateCircleArea(5.0)
    fmt.Printf("Area: %.2f\n", area)
}
```

**コメントの推奨事項**:

```go
// 良い例: 簡潔で明確
x = x + 1  // xをインクリメント

// 悪い例: 自明なコメント
x = x + 1  // xに1を足す

// 良い例: エクスポートされた関数にはコメント
// ProcessData processes the input data and returns the result.
func ProcessData(data []byte) ([]byte, error) {
    // ...
}

// 悪い例: エクスポートされた関数にコメントがない
func ProcessData(data []byte) ([]byte, error) {
    // ...
}
```

**コメントの規則**:

1. エクスポートされた（大文字で始まる）すべての項目にコメントを書く
2. コメントは完全な文章で記述する
3. コメントは名前で始める（例: "Add returns..."）
4. パッケージコメントはパッケージ宣言の直前に書く

**Go 特有のコメント規則**:

```go
// 良い: コメントは名前で始まる
// Add returns the sum of a and b.
func Add(a, b int) int {
    return a + b
}

// 悪い: コメントが名前で始まらない
// This function adds two numbers.
func Add(a, b int) int {
    return a + b
}
```

</div>
