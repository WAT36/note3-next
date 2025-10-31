---
title: "分割代入(アンパック)"
excerpt: "配列(リスト)の分割代入(アンパック)について"
coverImage: ""
date: "2024-06-12T01:01:16.000Z"
updatedAt: "2024-06-12T01:01:16.000Z"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
mode: programming
---

配列（リスト）やオブジェクトから複数の値を取り出して、個々の変数に代入する手法について説明する。これを**分割代入**または**アンパック**という。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
// パターンマッチング（Java 16+）
if (obj instanceof Point(int x, int y)) { }
```

Java には**一般的な分割代入は存在しない**が、**パターンマッチング**（Java 16+）で類似の機能を実現できる。

**レコードのパターンマッチング（Java 16+）**:

```java
record Point(int x, int y) {}

Point p = new Point(10, 20);

// instanceof パターンマッチング
if (p instanceof Point(int x, int y)) {
    System.out.println("x: " + x); // 10
    System.out.println("y: " + y); // 20
}

// switch式でのパターンマッチング（Java 21+）
String result = switch (p) {
    case Point(int x, int y) -> "Point at (" + x + ", " + y + ")";
};
System.out.println(result); // Point at (10, 20)

// ネストしたレコード
record Person(String name, Point location) {}
Person person = new Person("Alice", new Point(10, 20));

if (person instanceof Person(String name, Point(int x, int y))) {
    System.out.println(name + " is at (" + x + ", " + y + ")");
    // Alice is at (10, 20)
}
```

**従来の方法（手動で取り出す）**:

```java
// 配列から値を取り出す
int[] array = {10, 20, 30};
int a = array[0];
int b = array[1];
int c = array[2];

// リストから値を取り出す
List<Integer> list = Arrays.asList(10, 20, 30);
int x = list.get(0);
int y = list.get(1);
int z = list.get(2);

// レコードからフィールドを取り出す
Point point = new Point(10, 20);
int px = point.x();
int py = point.y();
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
a, b, c = [10, 20, 30]
```

Python では**アンパック（Unpacking）**と呼ばれる強力な分割代入機能がある。

リスト、タプル、その他のイテラブルから値を取り出して複数の変数に一度に代入できる。

**基本的なアンパック**:

```python
# リストのアンパック
a, b, c = [10, 20, 30]
print(a, b, c)  # 10 20 30

# タプルのアンパック（括弧は省略可能）
x, y = (100, 200)
print(x, y)  # 100 200

# 括弧なしでも可能
x, y = 100, 200
print(x, y)  # 100 200

# 変数の入れ替え
a, b = 1, 2
a, b = b, a
print(a, b)  # 2 1

# 要素数が一致しないとエラー
try:
    a, b = [1, 2, 3]
except ValueError as e:
    print(e)  # too many values to unpack
```

**拡張アンパック（\*を使用）**:

```python
# 最初と最後を取得、残りは無視
first, *middle, last = [1, 2, 3, 4, 5]
print(first)   # 1
print(middle)  # [2, 3, 4]
print(last)    # 5

# 最初だけ取得
head, *tail = [1, 2, 3, 4, 5]
print(head)  # 1
print(tail)  # [2, 3, 4, 5]

# 最後だけ取得
*init, last = [1, 2, 3, 4, 5]
print(init)  # [1, 2, 3, 4]
print(last)  # 5

# アンダースコアで不要な値を無視
first, _, third = [1, 2, 3]
print(first, third)  # 1 3

# 複数の値を無視
a, *_, z = [1, 2, 3, 4, 5]
print(a, z)  # 1 5
```

**ネストしたアンパック**:

```python
# ネストしたリスト
matrix = [[1, 2], [3, 4]]
(a, b), (c, d) = matrix
print(a, b, c, d)  # 1 2 3 4

# より複雑な構造
data = [1, [2, 3], 4]
x, [y, z], w = data
print(x, y, z, w)  # 1 2 3 4
```

**関数の戻り値のアンパック**:

```python
def get_user():
    return "Alice", 30, "alice@example.com"

name, age, email = get_user()
print(name, age, email)  # Alice 30 alice@example.com

# 一部だけ取得
name, *_ = get_user()
print(name)  # Alice
```

**辞書のアンパック**:

```python
# キーと値を取得
person = {"name": "Alice", "age": 30}

# items()でキーと値のペアをアンパック
for key, value in person.items():
    print(f"{key}: {value}")
# name: Alice
# age: 30

# ** で辞書を展開（関数呼び出しなど）
def greet(name, age):
    print(f"Hello {name}, you are {age} years old")

user = {"name": "Bob", "age": 25}
greet(**user)  # Hello Bob, you are 25 years old

# 辞書のマージ
dict1 = {"a": 1, "b": 2}
dict2 = {"c": 3, "d": 4}
merged = {**dict1, **dict2}
print(merged)  # {'a': 1, 'b': 2, 'c': 3, 'd': 4}
```

**enumerate()でのアンパック**:

```python
items = ["apple", "banana", "cherry"]
for index, value in enumerate(items):
    print(f"{index}: {value}")
# 0: apple
# 1: banana
# 2: cherry
```

**zip()でのアンパック**:

```python
names = ["Alice", "Bob", "Charlie"]
ages = [30, 25, 35]

for name, age in zip(names, ages):
    print(f"{name} is {age} years old")
# Alice is 30 years old
# Bob is 25 years old
# Charlie is 35 years old
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
let [a, b, c] = [10, 20, 30];
```

JavaScript では**分割代入（Destructuring Assignment）**を使って、配列やオブジェクトから値を取り出して変数に代入できる。

**配列の分割代入**:

```javascript
// 基本的な分割代入
let [a, b, c] = [10, 20, 30];
console.log(a, b, c); // 10 20 30

// 既存の変数に代入
let x, y;
[x, y] = [100, 200];
console.log(x, y); // 100 200

// 変数の入れ替え
let num1 = 1,
  num2 = 2;
[num1, num2] = [num2, num1];
console.log(num1, num2); // 2 1

// デフォルト値を設定
let [p = 5, q = 10] = [1];
console.log(p, q); // 1 10

// 一部をスキップ
let [first, , third] = [1, 2, 3];
console.log(first, third); // 1 3
```

**レスト構文（...）**:

```javascript
// 残りの要素をまとめて取得
let [head, ...tail] = [1, 2, 3, 4, 5];
console.log(head); // 1
console.log(tail); // [2, 3, 4, 5]

// 最初と最後を取得
let [start, ...middle] = [1, 2, 3, 4, 5];
console.log(start); // 1
console.log(middle); // [2, 3, 4, 5]
```

**ネストした配列の分割代入**:

```javascript
// ネストした配列
let [[a, b], [c, d]] = [
  [1, 2],
  [3, 4],
];
console.log(a, b, c, d); // 1 2 3 4

// より複雑な構造
let [x, [y, z], w] = [1, [2, 3], 4];
console.log(x, y, z, w); // 1 2 3 4
```

**関数の戻り値の分割代入**:

```javascript
function getCoordinates() {
  return [100, 200];
}

let [x, y] = getCoordinates();
console.log(x, y); // 100 200

// 一部だけ取得
let [coordX] = getCoordinates();
console.log(coordX); // 100
```

**オブジェクトの分割代入**:

```javascript
// 基本的な分割代入
let person = { name: "Alice", age: 30, email: "alice@example.com" };
let { name, age, email } = person;
console.log(name, age, email); // Alice 30 alice@example.com

// プロパティ名と異なる変数名を使用
let { name: userName, age: userAge } = person;
console.log(userName, userAge); // Alice 30

// デフォルト値
let { name: n, country = "USA" } = person;
console.log(n, country); // Alice USA

// レスト構文で残りのプロパティを取得
let { name: personName, ...rest } = person;
console.log(personName); // Alice
console.log(rest); // { age: 30, email: 'alice@example.com' }
```

**ネストしたオブジェクトの分割代入**:

```javascript
let book = {
  title: "本のタイトル",
  author: "山田一郎",
  publisher: "A社",
  price: 2300,
  details: {
    keyword: "キーワード",
    excerpt: "概略",
  },
};

// ネストしたプロパティを取得
let {
  title,
  author,
  details: { keyword, excerpt },
} = book;
console.log(title, author, keyword, excerpt);
// 本のタイトル 山田一郎 キーワード 概略

// 別名を付けることも可能
let {
  title: bookTitle,
  details: { keyword: kw },
} = book;
console.log(bookTitle, kw); // 本のタイトル キーワード
```

**関数の引数での分割代入**:

```javascript
// 配列の分割代入
function printCoordinates([x, y]) {
  console.log(`x: ${x}, y: ${y}`);
}
printCoordinates([10, 20]); // x: 10, y: 20

// オブジェクトの分割代入
function greet({ name, age }) {
  console.log(`Hello ${name}, you are ${age} years old`);
}
greet({ name: "Bob", age: 25 }); // Hello Bob, you are 25 years old

// デフォルト値付き
function createUser({ name, age = 18, country = "USA" }) {
  console.log(`${name}, ${age}, ${country}`);
}
createUser({ name: "Charlie" }); // Charlie, 18, USA
```

**配列とオブジェクトの組み合わせ**:

```javascript
let users = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
];

for (let { name, age } of users) {
  console.log(`${name} is ${age} years old`);
}
// Alice is 30 years old
// Bob is 25 years old
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
x, y := 10, 20
```

Go には**一般的な分割代入は存在しない**が、**複数の変数への同時代入**や**複数の戻り値**の受け取りが可能。

**複数の変数への同時代入**:

```go
import "fmt"

// 複数の変数を同時に宣言・初期化
x, y := 10, 20
fmt.Println(x, y) // 10 20

// 既存の変数に代入
var a, b int
a, b = 100, 200
fmt.Println(a, b) // 100 200

// 変数の入れ替え
num1, num2 := 1, 2
num1, num2 = num2, num1
fmt.Println(num1, num2) // 2 1

// 異なる型も可能
name, age := "Alice", 30
fmt.Println(name, age) // Alice 30
```

**関数の複数の戻り値**:

これは Go の最も一般的な「分割代入」的な使い方。

```go
// 複数の値を返す関数
func getCoordinates() (int, int) {
    return 100, 200
}

x, y := getCoordinates()
fmt.Println(x, y) // 100 200

// 名前付き戻り値
func divide(a, b int) (quotient, remainder int) {
    quotient = a / b
    remainder = a % b
    return
}

q, r := divide(17, 5)
fmt.Println(q, r) // 3 2

// 一部の戻り値を無視（アンダースコア）
value, _ := getCoordinates()
fmt.Println(value) // 100
```

**エラーハンドリングでの使用**:

Go では関数が値とエラーを返すパターンが一般的。

```go
import (
    "fmt"
    "strconv"
)

// 文字列を整数に変換（エラー付き）
num, err := strconv.Atoi("123")
if err != nil {
    fmt.Println("Error:", err)
} else {
    fmt.Println("Number:", num) // Number: 123
}

// mapからの値取得（存在確認付き）
m := map[string]int{"a": 1, "b": 2}
value, exists := m["a"]
if exists {
    fmt.Println("Value:", value) // Value: 1
}

// 存在しないキー
value2, exists2 := m["c"]
fmt.Println(value2, exists2) // 0 false

// type assertion（型アサーション）
var i interface{} = "hello"
s, ok := i.(string)
if ok {
    fmt.Println("String:", s) // String: hello
}
```

**range でのループ**:

```go
// スライスのインデックスと値を取得
numbers := []int{10, 20, 30}
for index, value := range numbers {
    fmt.Printf("Index: %d, Value: %d\n", index, value)
}
// Index: 0, Value: 10
// Index: 1, Value: 20
// Index: 2, Value: 30

// インデックスだけ必要な場合
for index := range numbers {
    fmt.Println("Index:", index)
}

// 値だけ必要な場合（インデックスを無視）
for _, value := range numbers {
    fmt.Println("Value:", value)
}

// mapのキーと値を取得
m := map[string]int{"a": 1, "b": 2, "c": 3}
for key, value := range m {
    fmt.Printf("%s: %d\n", key, value)
}
```

**構造体フィールドの取り出し**:

```go
type Point struct {
    X int
    Y int
}

// 構造体から値を取り出す（手動）
p := Point{10, 20}
x := p.X
y := p.Y
fmt.Println(x, y) // 10 20

// 構造体のフィールドを関数で返す
func getPoint() Point {
    return Point{100, 200}
}

point := getPoint()
fmt.Println(point.X, point.Y) // 100 200
```

**チャネルでの受信**:

```go
// チャネルから値を受信
ch := make(chan int)
go func() {
    ch <- 42
}()

value := <-ch
fmt.Println(value) // 42

// 値と受信成否を取得
ch2 := make(chan int)
close(ch2)
value2, ok := <-ch2
fmt.Println(value2, ok) // 0 false (チャネルが閉じている)
```

</div>
