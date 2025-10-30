---
title: "タプル（不変なシーケンス）"
date: "2019-10-27T15:36:30+09:00"
excerpt: "タプルと不変なシーケンス型について"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-27T15:36:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

タプルとは、複数の値をまとめて扱える**不変（イミュータブル）**なデータ構造である。各言語における実装方法と特徴について述べる。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
record Point(int x, int y) {}
Point p = new Point(10, 20);
```

Java には**ビルトインのタプル型は存在しない**が、**レコード（Record）**（Java 14+）や独自のクラスで不変なデータ構造を実現できる。

**レコード（Java 14+）の使用**:

レコードは不変なデータクラスを簡潔に定義できる機能。

```java
// レコードの定義
record Point(int x, int y) {}

// レコードの使用
Point p = new Point(10, 20);
System.out.println(p.x()); // 10
System.out.println(p.y()); // 20
System.out.println(p); // Point[x=10, y=20]

// 不変なので変更不可
// p.x = 30; // コンパイルエラー

// 複数の型を持つレコード
record Person(String name, int age, String email) {}

Person person = new Person("Alice", 30, "alice@example.com");
System.out.println(person.name()); // Alice
System.out.println(person.age()); // 30

// レコードは equals() と hashCode() が自動実装される
Point p1 = new Point(10, 20);
Point p2 = new Point(10, 20);
System.out.println(p1.equals(p2)); // true

// パターンマッチング（Java 16+）
if (p instanceof Point(int x, int y)) {
    System.out.println("x: " + x + ", y: " + y);
}
```

**従来の方法（Java 13 以前）**:

```java
// Apache Commons Langの Pair を使用
import org.apache.commons.lang3.tuple.Pair;

Pair<String, Integer> pair = Pair.of("Alice", 30);
System.out.println(pair.getLeft()); // Alice
System.out.println(pair.getRight()); // 30

// または独自の不変クラスを定義
public final class Point {
    private final int x;
    private final int y;

    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public int getX() { return x; }
    public int getY() { return y; }
}
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
t = (1, 2, 3)
```

Python では**タプル（tuple）**を使って不変なシーケンスを表現する。

丸括弧 `()` で作成し、リストと似ているが**変更不可能（イミュータブル）**という点が異なる。

**基本的な操作**:

```python
# タプルの作成
t = (1, 2, 3)
print(t) # (1, 2, 3)

# 括弧なしでも作成可能
t2 = 1, 2, 3
print(t2) # (1, 2, 3)

# 要素が1つのタプル（カンマが必要）
single = (1,)
print(single) # (1,)
print(type(single)) # <class 'tuple'>

# カンマがないと普通の値
not_tuple = (1)
print(type(not_tuple)) # <class 'int'>

# 空のタプル
empty = ()
print(empty) # ()

# インデックスでアクセス
print(t[0]) # 1
print(t[1]) # 2
print(t[-1]) # 3 (末尾)

# スライス
print(t[1:]) # (2, 3)

# 要素数
print(len(t)) # 3

# 要素の存在確認
print(2 in t) # True

# 変更不可（エラーになる）
try:
    t[0] = 10
except TypeError as e:
    print(e) # 'tuple' object does not support item assignment
```

**タプルのアンパック**:

```python
# 複数の値を一度に代入
point = (10, 20)
x, y = point
print(x) # 10
print(y) # 20

# 関数から複数の値を返す
def get_coordinates():
    return 100, 200

x, y = get_coordinates()
print(x, y) # 100 200

# アンダースコアで不要な値を無視
name, _, age = ("Alice", "Smith", 30)
print(name, age) # Alice 30

# 拡張アンパック（*を使用）
first, *middle, last = (1, 2, 3, 4, 5)
print(first) # 1
print(middle) # [2, 3, 4]
print(last) # 5
```

**ネストしたタプル**:

```python
# 2次元タプル
matrix = ((1, 2, 3), (4, 5, 6))
print(matrix[0]) # (1, 2, 3)
print(matrix[0][1]) # 2

# 複雑なデータ構造
people = (
    ("Alice", 30, "alice@example.com"),
    ("Bob", 25, "bob@example.com"),
)
for name, age, email in people:
    print(f"{name} ({age}): {email}")
```

**タプルの用途**:

```python
# 辞書のキーとして使用可能（リストは不可）
locations = {
    (0, 0): "origin",
    (1, 2): "point A",
    (3, 4): "point B",
}
print(locations[(1, 2)]) # point A

# 関数の戻り値で複数の値を返す
def divide_with_remainder(a, b):
    return a // b, a % b

quotient, remainder = divide_with_remainder(17, 5)
print(quotient, remainder) # 3 2

# イミュータブルなので安全に共有できる
original = (1, 2, 3)
shared = original
# sharedを変更しようとしてもoriginalは影響を受けない（変更できない）
```

**名前付きタプル（namedtuple）**:

```python
from collections import namedtuple

# 名前付きタプルの定義
Point = namedtuple('Point', ['x', 'y'])

# インスタンスの作成
p = Point(10, 20)
print(p.x) # 10
print(p.y) # 20
print(p[0]) # 10 (インデックスアクセスも可能)

# 不変
try:
    p.x = 30
except AttributeError as e:
    print("変更不可")
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
let t = [1, 2, 3]; // 配列で代用
```

JavaScript には**ビルトインのタプル型は存在しない**。通常は**配列**や**オブジェクト**で代用する。

ただし、**TypeScript**ではタプル型が利用できる。

**配列で代用する方法**:

```javascript
// 配列をタプルのように使用
let point = [10, 20];
let x = point[0];
let y = point[1];
console.log(x, y); // 10 20

// 分割代入
let [a, b] = point;
console.log(a, b); // 10 20

// 複数の値を返す
function getCoordinates() {
  return [100, 200];
}

let [coordX, coordY] = getCoordinates();
console.log(coordX, coordY); // 100 200

// アンダースコアで不要な値を無視
let [first, , third] = [1, 2, 3];
console.log(first, third); // 1 3

// レスト構文
let [head, ...tail] = [1, 2, 3, 4, 5];
console.log(head); // 1
console.log(tail); // [2, 3, 4, 5]

// ネストした配列
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
];
console.log(matrix[0]); // [1, 2, 3]
console.log(matrix[0][1]); // 2

// 複雑なデータ構造
let people = [
  ["Alice", 30, "alice@example.com"],
  ["Bob", 25, "bob@example.com"],
];
for (let [name, age, email] of people) {
  console.log(`${name} (${age}): ${email}`);
}
```

**Object.freeze()で不変にする**:

```javascript
// 配列を不変にする（浅い凍結）
let immutableArray = Object.freeze([1, 2, 3]);

// 変更しようとしてもエラー（strictモードでは例外）
try {
  immutableArray[0] = 10; // 効果なし
  immutableArray.push(4); // TypeError
} catch (e) {
  console.log("変更不可");
}

console.log(immutableArray); // [1, 2, 3]
```

**TypeScript のタプル型**:

```typescript
// TypeScriptではタプル型を定義できる
let tuple: [number, string, boolean];
tuple = [1, "hello", true]; // OK
// tuple = [1, "hello"]; // エラー: 要素数が違う
// tuple = ["hello", 1, true]; // エラー: 型が違う

// 読み取り専用タプル
let readonlyTuple: readonly [number, string] = [10, "test"];
// readonlyTuple[0] = 20; // エラー: 読み取り専用

// 可変長タプル（TypeScript 4.0+）
type StringNumberBooleans = [string, number, ...boolean[]];
let t1: StringNumberBooleans = ["hello", 1];
let t2: StringNumberBooleans = ["hello", 1, true, false];

// 名前付きタプル（TypeScript 4.0+）
type Point = [x: number, y: number];
let point: Point = [10, 20];
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
type Point struct {
    X, Y int
}
p := Point{10, 20}
```

Go には**ビルトインのタプル型は存在しない**。

一般的に**構造体（struct）**または**複数の戻り値**で不変なデータをまとめる。

**構造体を使う方法**:

```go
import "fmt"

// 構造体の定義
type Point struct {
    X int
    Y int
}

// 構造体の作成
p := Point{10, 20}
fmt.Println(p.X) // 10
fmt.Println(p.Y) // 20
fmt.Println(p) // {10 20}

// フィールド名を指定して作成
p2 := Point{X: 100, Y: 200}

// 複数の型を持つ構造体
type Person struct {
    Name  string
    Age   int
    Email string
}

person := Person{"Alice", 30, "alice@example.com"}
fmt.Println(person.Name) // Alice
fmt.Println(person.Age) // 30

// 構造体の比較（すべてのフィールドがcomparableな場合）
p1 := Point{10, 20}
p3 := Point{10, 20}
fmt.Println(p1 == p3) // true
```

**複数の戻り値（タプルのような使い方）**:

```go
// 関数から複数の値を返す
func getCoordinates() (int, int) {
    return 100, 200
}

x, y := getCoordinates()
fmt.Println(x, y) // 100 200

// 名前付き戻り値
func divide(a, b int) (quotient, remainder int) {
    quotient = a / b
    remainder = a % b
    return // 暗黙的にquotientとremainderを返す
}

q, r := divide(17, 5)
fmt.Println(q, r) // 3 2

// 不要な値をアンダースコアで無視
value, _ := getCoordinates()
fmt.Println(value) // 100

// エラーハンドリングでよく使われるパターン
func readFile(filename string) ([]byte, error) {
    // ファイル読み込み処理
    return nil, nil
}

data, err := readFile("test.txt")
if err != nil {
    fmt.Println("Error:", err)
} else {
    fmt.Println("Data:", data)
}
```

**匿名構造体（一時的なタプル的使用）**:

```go
// 匿名構造体
point := struct {
    X int
    Y int
}{10, 20}

fmt.Println(point.X, point.Y) // 10 20

// スライスで複数のデータをまとめる
people := []struct {
    Name  string
    Age   int
    Email string
}{
    {"Alice", 30, "alice@example.com"},
    {"Bob", 25, "bob@example.com"},
}

for _, p := range people {
    fmt.Printf("%s (%d): %s\n", p.Name, p.Age, p.Email)
}
```

**ジェネリックなペア型（Go 1.18+）**:

```go
// 汎用的なペア型
type Pair[T, U any] struct {
    First  T
    Second U
}

// 使用例
p := Pair[string, int]{"Alice", 30}
fmt.Println(p.First) // Alice
fmt.Println(p.Second) // 30

// 3つ組
type Triple[T, U, V any] struct {
    First  T
    Second U
    Third  V
}

t := Triple[string, int, bool]{"test", 42, true}
fmt.Println(t.First, t.Second, t.Third) // test 42 true
```

**不変性の実現**:

Go の構造体はデフォルトで不変ではないが、以下の方法で不変性を実現できる。

```go
// フィールドを非公開にして、コンストラクタで作成
type point struct {
    x int
    y int
}

func NewPoint(x, y int) point {
    return point{x, y}
}

// ゲッターのみ提供（セッターは提供しない）
func (p point) X() int { return p.x }
func (p point) Y() int { return p.y }

p := NewPoint(10, 20)
fmt.Println(p.X(), p.Y()) // 10 20
// p.x = 30 // コンパイルエラー: 非公開フィールド
```

</div>
