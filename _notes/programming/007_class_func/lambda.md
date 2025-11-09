---
title: "ラムダ式（無名関数）"
date: "2019-10-29T08:37:30+09:00"
excerpt: "ラムダ式（無名関数）について"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-29T08:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

ラムダ式（無名関数）は、名前を持たない関数を簡潔に記述する方法。関数を値として扱い、変数に代入したり、引数として渡したりできる。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
(args) -> expression
```

Java では関数型インターフェースに対してラムダ式を使える（Java 8+）。

**基本的なラムダ式**:

```java
// 基本形
(引数) -> { 処理 }

// 引数が1つの場合は () を省略可能
引数 -> { 処理 }

// 処理が1文の場合は {} と return を省略可能
(引数) -> 式
```

**Function インターフェース**:

`Function<T, R>`は引数を受け取って結果を返す。

```java
import java.util.function.Function;

public class Main {
    public static void main(String[] args) {
        // 完全な形
        Function<String, String> func1 = (String str) -> {
            return "Hello, " + str;
        };
        System.out.println(func1.apply("World"));  // Hello, World

        // 省略形
        Function<String, String> func2 = str -> "Hello, " + str;
        System.out.println(func2.apply("Java"));  // Hello, Java

        // 型推論
        Function<Integer, Integer> square = x -> x * x;
        System.out.println(square.apply(5));  // 25
    }
}
```

**主な関数型インターフェース**:

| インターフェース      | メソッド            | 説明                                 |
| --------------------- | ------------------- | ------------------------------------ |
| `Function<T, R>`      | `R apply(T t)`      | 引数を受け取り結果を返す             |
| `Consumer<T>`         | `void accept(T t)`  | 引数を受け取り処理する（返り値なし） |
| `Supplier<T>`         | `T get()`           | 引数なしで値を返す                   |
| `Predicate<T>`        | `boolean test(T t)` | 引数を受け取り真偽値を返す           |
| `BiFunction<T, U, R>` | `R apply(T t, U u)` | 2 つの引数を受け取り結果を返す       |

**Consumer（処理のみ）**:

```java
import java.util.function.Consumer;

Consumer<String> printer = str -> System.out.println(str);
printer.accept("Hello");  // Hello

Consumer<Integer> doubler = x -> System.out.println(x * 2);
doubler.accept(5);  // 10
```

**Supplier（値の生成）**:

```java
import java.util.function.Supplier;

Supplier<Double> random = () -> Math.random();
System.out.println(random.get());  // 乱数

Supplier<String> greeting = () -> "Hello, World!";
System.out.println(greeting.get());  // Hello, World!
```

**Predicate（条件判定）**:

```java
import java.util.function.Predicate;

Predicate<Integer> isEven = x -> x % 2 == 0;
System.out.println(isEven.test(4));  // true
System.out.println(isEven.test(5));  // false

Predicate<String> isLong = str -> str.length() > 5;
System.out.println(isLong.test("Hello"));      // false
System.out.println(isLong.test("Hello World")); // true
```

**メソッド参照**:

既存のメソッドをラムダ式として参照できる。

```java
import java.util.Arrays;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

        // ラムダ式
        names.forEach(name -> System.out.println(name));

        // メソッド参照（同じ動作）
        names.forEach(System.out::println);
    }
}
```

メソッド参照の種類:

```java
// 静的メソッド参照
Function<String, Integer> parser1 = str -> Integer.parseInt(str);
Function<String, Integer> parser2 = Integer::parseInt;

// インスタンスメソッド参照
String str = "hello";
Supplier<String> upper1 = () -> str.toUpperCase();
Supplier<String> upper2 = str::toUpperCase;

// コンストラクタ参照
Supplier<List<String>> list1 = () -> new ArrayList<>();
Supplier<List<String>> list2 = ArrayList::new;
```

**Stream API との組み合わせ**:

```java
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // 偶数のみフィルタして2乗
        List<Integer> result = numbers.stream()
            .filter(x -> x % 2 == 0)
            .map(x -> x * x)
            .collect(Collectors.toList());
        System.out.println(result);  // [4, 16, 36, 64, 100]

        // 合計を計算
        int sum = numbers.stream()
            .filter(x -> x > 5)
            .mapToInt(x -> x)
            .sum();
        System.out.println(sum);  // 40
    }
}
```

**実用例（カスタム比較）**:

```java
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "David");

        // 長さでソート
        names.sort((a, b) -> a.length() - b.length());
        System.out.println(names);  // [Bob, Alice, David, Charlie]

        // Comparator.comparing を使用
        names.sort(Comparator.comparing(String::length));
        System.out.println(names);  // [Bob, Alice, David, Charlie]
    }
}
```

**実用例（イベントハンドラ）**:

```java
import javax.swing.*;

public class Main {
    public static void main(String[] args) {
        JButton button = new JButton("Click me");

        // ラムダ式でイベントハンドラを定義
        button.addActionListener(e -> {
            System.out.println("Button clicked!");
        });
    }
}
```

**変数のキャプチャ**:

ラムダ式は外部の変数をキャプチャできるが、実質的に final である必要がある。

```java
public class Main {
    public static void main(String[] args) {
        int multiplier = 10;  // 実質的に final

        Function<Integer, Integer> multiply = x -> x * multiplier;
        System.out.println(multiply.apply(5));  // 50

        // multiplier = 20;  // エラー: キャプチャされた変数は変更できない
    }
}
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
lambda args: expression
```

Python では`lambda`キーワードで無名関数を定義できる。ただし、1 つの式しか書けない制約がある。

**基本的なラムダ式**:

```python
# 基本形
lambda 引数: 式

# 引数なし
lambda: 式

# 複数の引数
lambda x, y: 式

# デフォルト引数
lambda x, y=10: 式
```

**変数に代入**:

```python
# 1つの引数
add_one = lambda x: x + 1
print(add_one(5))  # 6

# 複数の引数
multiply = lambda x, y: x * y
print(multiply(3, 4))  # 12

# デフォルト引数
power = lambda x, y=2: x ** y
print(power(3))     # 9
print(power(3, 3))  # 27
```

**map() との組み合わせ**:

リストの各要素に関数を適用する。

```python
numbers = [1, 2, 3, 4, 5]

# ラムダ式で各要素を2乗
squared = list(map(lambda x: x ** 2, numbers))
print(squared)  # [1, 4, 9, 16, 25]

# 通常の関数と同じように使える
doubled = list(map(lambda x: x * 2, numbers))
print(doubled)  # [2, 4, 6, 8, 10]
```

**filter() との組み合わせ**:

条件に合う要素のみを抽出する。

```python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# 偶数のみ
even = list(filter(lambda x: x % 2 == 0, numbers))
print(even)  # [2, 4, 6, 8, 10]

# 5より大きい数
greater_than_5 = list(filter(lambda x: x > 5, numbers))
print(greater_than_5)  # [6, 7, 8, 9, 10]
```

**sorted() との組み合わせ**:

カスタムソートキーを指定する。

```python
# タプルのリストを2番目の要素でソート
pairs = [(1, 5), (2, 3), (3, 1), (4, 4)]
sorted_pairs = sorted(pairs, key=lambda x: x[1])
print(sorted_pairs)  # [(3, 1), (2, 3), (4, 4), (1, 5)]

# 文字列のリストを長さでソート
words = ["apple", "pie", "banana", "cherry"]
sorted_words = sorted(words, key=lambda x: len(x))
print(sorted_words)  # ['pie', 'apple', 'banana', 'cherry']

# 逆順ソート
reverse_sorted = sorted(words, key=lambda x: len(x), reverse=True)
print(reverse_sorted)  # ['banana', 'cherry', 'apple', 'pie']
```

**リスト内包表記との比較**:

多くの場合、リスト内包表記の方が読みやすい。

```python
numbers = [1, 2, 3, 4, 5]

# ラムダ式 + map
result1 = list(map(lambda x: x ** 2, numbers))

# リスト内包表記（推奨）
result2 = [x ** 2 for x in numbers]

print(result1 == result2)  # True

# ラムダ式 + filter
result3 = list(filter(lambda x: x % 2 == 0, numbers))

# リスト内包表記（推奨）
result4 = [x for x in numbers if x % 2 == 0]

print(result3 == result4)  # True
```

**ラムダ式の制約**:

複数行の処理や文（代入、`if`文など）は書けない。

```python
# OK: 式のみ
func1 = lambda x: x * 2 if x > 0 else 0

# NG: 複数行や文は書けない
# func2 = lambda x:
#     y = x * 2
#     return y
```

複雑な処理には通常の関数を使う。

```python
# ラムダ式（簡潔だが読みにくい）
calc = lambda x, y: x * y if x > 0 else x + y

# 通常の関数（推奨）
def calculate(x, y):
    if x > 0:
        return x * y
    else:
        return x + y
```

**実用例（辞書のソート）**:

```python
students = [
    {"name": "Alice", "score": 85},
    {"name": "Bob", "score": 92},
    {"name": "Charlie", "score": 78}
]

# スコアでソート
sorted_students = sorted(students, key=lambda x: x["score"], reverse=True)
for student in sorted_students:
    print(f"{student['name']}: {student['score']}")
# Bob: 92
# Alice: 85
# Charlie: 78
```

**実用例（条件に応じた処理）**:

```python
# 数値のリストを正負で分類
numbers = [1, -2, 3, -4, 5, -6]

positive = list(filter(lambda x: x > 0, numbers))
negative = list(filter(lambda x: x < 0, numbers))

print(positive)  # [1, 3, 5]
print(negative)  # [-2, -4, -6]
```

**実用例（関数を返す）**:

```python
def make_multiplier(n):
    return lambda x: x * n

double = make_multiplier(2)
triple = make_multiplier(3)

print(double(5))  # 10
print(triple(5))  # 15
```

**ラムダ式を使うべきとき**:

- 短い 1 行の処理
- `map()`, `filter()`, `sorted()`などの引数
- 一度しか使わない関数

**通常の関数を使うべきとき**:

- 複数行の処理
- 複雑なロジック
- 何度も使う関数
- ドキュメントが必要な関数

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
(args) => expression;
```

JavaScript では無名関数（匿名関数）とアロー関数（ES6+）の 2 つの方法がある。現代では主にアロー関数を使う。

**無名関数（従来の方法）**:

```javascript
// 基本形
const func = function (args) {
  // 処理
};

// 引数なし
const noArgs = function () {
  return "Hello";
};

// 複数の引数
const add = function (a, b) {
  return a + b;
};

console.log(add(3, 5)); // 8
```

**アロー関数（ES6+）**:

より簡潔な構文。

```javascript
// 基本形
const func = (args) => {
  // 処理
};

// 引数が1つの場合は () を省略可能
const double = (x) => x * 2;

// 引数なし
const noArgs = () => "Hello";

// 複数の引数
const add = (a, b) => a + b;

// 処理が複数行
const complex = (x, y) => {
  const sum = x + y;
  return sum * 2;
};

console.log(double(5)); // 10
console.log(add(3, 5)); // 8
console.log(complex(2, 3)); // 10
```

**省略記法**:

```javascript
// 1文の場合は {} と return を省略可能
const square = (x) => x * x;

// オブジェクトを返す場合は () で囲む
const makePerson = (name, age) => ({ name, age });

console.log(square(4)); // 16
console.log(makePerson("Alice", 25)); // { name: 'Alice', age: 25 }
```

**配列メソッドとの組み合わせ**:

```javascript
const numbers = [1, 2, 3, 4, 5];

// map: 各要素を変換
const squared = numbers.map((x) => x * x);
console.log(squared); // [1, 4, 9, 16, 25]

// filter: 条件に合う要素を抽出
const even = numbers.filter((x) => x % 2 === 0);
console.log(even); // [2, 4]

// reduce: 累積計算
const sum = numbers.reduce((acc, x) => acc + x, 0);
console.log(sum); // 15

// チェーン
const result = numbers
  .filter((x) => x % 2 === 0)
  .map((x) => x * x)
  .reduce((acc, x) => acc + x, 0);
console.log(result); // 20 (2² + 4² = 4 + 16)
```

**sort() との組み合わせ**:

```javascript
// 数値のソート
const nums = [3, 1, 4, 1, 5, 9, 2, 6];
nums.sort((a, b) => a - b); // 昇順
console.log(nums); // [1, 1, 2, 3, 4, 5, 6, 9]

// オブジェクトのソート
const students = [
  { name: "Alice", score: 85 },
  { name: "Bob", score: 92 },
  { name: "Charlie", score: 78 },
];

students.sort((a, b) => b.score - a.score); // スコア降順
console.log(students);
// [{ name: 'Bob', score: 92 }, { name: 'Alice', score: 85 }, { name: 'Charlie', score: 78 }]
```

**this の違い**:

無名関数とアロー関数で`this`の扱いが異なる。

```javascript
const obj = {
  name: "Alice",

  // 無名関数: this は obj を参照
  greet1: function () {
    console.log(`Hello, ${this.name}`);
  },

  // アロー関数: this は外側のスコープを参照
  greet2: () => {
    console.log(`Hello, ${this.name}`); // this は obj ではない
  },
};

obj.greet1(); // Hello, Alice
obj.greet2(); // Hello, undefined
```

アロー関数は`this`をレキシカルにバインドするため、コールバック内で便利。

```javascript
class Counter {
  constructor() {
    this.count = 0;
  }

  // 無名関数の場合: this が変わる
  startBad() {
    setInterval(function () {
      this.count++; // エラー: this は Counter ではない
      console.log(this.count);
    }, 1000);
  }

  // アロー関数の場合: this が保持される
  startGood() {
    setInterval(() => {
      this.count++; // OK: this は Counter
      console.log(this.count);
    }, 1000);
  }
}
```

**即時実行関数式（IIFE）**:

```javascript
// 無名関数
(function () {
  console.log("Immediately invoked!");
})();

// アロー関数
(() => {
  console.log("Immediately invoked with arrow!");
})();

// 引数あり
((name) => {
  console.log(`Hello, ${name}!`);
})("Alice");
```

**高階関数**:

関数を返す関数。

```javascript
const makeMultiplier = (factor) => {
  return (x) => x * factor;
};

const double = makeMultiplier(2);
const triple = makeMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15

// 簡潔に
const makePower = (exp) => (base) => base ** exp;
const square = makePower(2);
console.log(square(4)); // 16
```

**実用例（イベントハンドラ）**:

```javascript
// DOM 操作
document.getElementById("btn").addEventListener("click", () => {
  console.log("Button clicked!");
});

// 引数を渡す
document.querySelectorAll(".item").forEach((item, index) => {
  item.addEventListener("click", () => {
    console.log(`Item ${index} clicked`);
  });
});
```

**実用例（Promise と async/await）**:

```javascript
// Promise
fetch("https://api.example.com/data")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

// async/await
const fetchData = async () => {
  try {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
```

**実用例（配列の変換）**:

```javascript
const users = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 35 },
];

// 名前のみ抽出
const names = users.map((user) => user.name);
console.log(names); // ['Alice', 'Bob', 'Charlie']

// 30歳以上をフィルタ
const adults = users.filter((user) => user.age >= 30);
console.log(adults);
// [{ id: 2, name: 'Bob', age: 30 }, { id: 3, name: 'Charlie', age: 35 }]

// ID をキーとする辞書に変換
const userDict = users.reduce((dict, user) => {
  dict[user.id] = user;
  return dict;
}, {});
console.log(userDict);
// { '1': { id: 1, ... }, '2': { id: 2, ... }, '3': { id: 3, ... } }
```

**無名関数 vs アロー関数**:

| 特徴           | 無名関数     | アロー関数             |
| -------------- | ------------ | ---------------------- |
| 構文           | 長い         | 短い                   |
| `this`         | 動的バインド | レキシカルバインド     |
| `arguments`    | あり         | なし                   |
| コンストラクタ | 使える       | 使えない               |
| 推奨用途       | メソッド定義 | コールバック、短い関数 |

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
func(args Type) ReturnType { }
```

Go でも無名関数があり、`func`キーワードで定義する。変数に代入したり、即時実行したりできる。

**基本的な無名関数**:

```go
package main

import "fmt"

func main() {
    // 無名関数を変数に代入
    add := func(a, b int) int {
        return a + b
    }

    fmt.Println(add(3, 5))  // 8

    // 即時実行
    result := func(x int) int {
        return x * 2
    }(10)

    fmt.Println(result)  // 20
}
```

**クロージャ**:

無名関数は外側の変数をキャプチャできる（クロージャ）。

```go
package main

import "fmt"

func main() {
    // 外側の変数をキャプチャ
    multiplier := 10
    multiply := func(x int) int {
        return x * multiplier
    }

    fmt.Println(multiply(5))  // 50
}
```

**関数を返す関数**:

```go
package main

import "fmt"

func makeMultiplier(factor int) func(int) int {
    return func(x int) int {
        return x * factor
    }
}

func main() {
    double := makeMultiplier(2)
    triple := makeMultiplier(3)

    fmt.Println(double(5))  // 10
    fmt.Println(triple(5))  // 15
}
```

**カウンタの実装**:

クロージャで状態を保持する。

```go
package main

import "fmt"

func makeCounter() func() int {
    count := 0
    return func() int {
        count++
        return count
    }
}

func main() {
    counter := makeCounter()

    fmt.Println(counter())  // 1
    fmt.Println(counter())  // 2
    fmt.Println(counter())  // 3
}
```

**スライス操作との組み合わせ**:

```go
package main

import "fmt"

// filter: 条件に合う要素のみ抽出
func filter(slice []int, predicate func(int) bool) []int {
    result := []int{}
    for _, v := range slice {
        if predicate(v) {
            result = append(result, v)
        }
    }
    return result
}

// map: 各要素を変換
func mapSlice(slice []int, mapper func(int) int) []int {
    result := []int{}
    for _, v := range slice {
        result = append(result, mapper(v))
    }
    return result
}

func main() {
    numbers := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}

    // 偶数のみフィルタ
    even := filter(numbers, func(x int) bool {
        return x%2 == 0
    })
    fmt.Println(even)  // [2 4 6 8 10]

    // 各要素を2乗
    squared := mapSlice(numbers, func(x int) int {
        return x * x
    })
    fmt.Println(squared)  // [1 4 9 16 25 36 49 64 81 100]
}
```

**ソート との組み合わせ**:

```go
package main

import (
    "fmt"
    "sort"
)

type Person struct {
    Name string
    Age  int
}

func main() {
    people := []Person{
        {"Alice", 25},
        {"Bob", 30},
        {"Charlie", 20},
    }

    // 年齢でソート
    sort.Slice(people, func(i, j int) bool {
        return people[i].Age < people[j].Age
    })

    fmt.Println(people)
    // [{Charlie 20} {Alice 25} {Bob 30}]
}
```

**ゴルーチンとの組み合わせ**:

```go
package main

import (
    "fmt"
    "time"
)

func main() {
    // 無名関数をゴルーチンで実行
    go func() {
        fmt.Println("Goroutine 1")
    }()

    // 引数を渡す
    go func(msg string) {
        fmt.Println(msg)
    }("Goroutine 2")

    time.Sleep(time.Second)
}
```

**defer との組み合わせ**:

```go
package main

import "fmt"

func main() {
    // defer で無名関数を実行
    defer func() {
        fmt.Println("Cleanup")
    }()

    fmt.Println("Main")

    // 出力:
    // Main
    // Cleanup
}
```

**エラーハンドリング**:

```go
package main

import (
    "fmt"
    "log"
)

func main() {
    // パニックをリカバリ
    defer func() {
        if r := recover(); r != nil {
            log.Println("Recovered from panic:", r)
        }
    }()

    fmt.Println("Start")
    panic("Something went wrong")
    fmt.Println("End")  // 実行されない
}
```

**ジェネリクスを使った高階関数（Go 1.18+）**:

```go
package main

import "fmt"

// Map: スライスの各要素を変換
func Map[T any, U any](slice []T, mapper func(T) U) []U {
    result := make([]U, len(slice))
    for i, v := range slice {
        result[i] = mapper(v)
    }
    return result
}

// Filter: 条件に合う要素のみ抽出
func Filter[T any](slice []T, predicate func(T) bool) []T {
    result := []T{}
    for _, v := range slice {
        if predicate(v) {
            result = append(result, v)
        }
    }
    return result
}

func main() {
    numbers := []int{1, 2, 3, 4, 5}

    // int を string に変換
    strings := Map(numbers, func(x int) string {
        return fmt.Sprintf("num%d", x)
    })
    fmt.Println(strings)  // [num1 num2 num3 num4 num5]

    // 3より大きい数のみ
    filtered := Filter(numbers, func(x int) bool {
        return x > 3
    })
    fmt.Println(filtered)  // [4 5]
}
```

**実用例（設定の適用）**:

```go
package main

import "fmt"

type Server struct {
    Host string
    Port int
}

type Option func(*Server)

func WithHost(host string) Option {
    return func(s *Server) {
        s.Host = host
    }
}

func WithPort(port int) Option {
    return func(s *Server) {
        s.Port = port
    }
}

func NewServer(opts ...Option) *Server {
    server := &Server{
        Host: "localhost",  // デフォルト値
        Port: 8080,         // デフォルト値
    }

    for _, opt := range opts {
        opt(server)
    }

    return server
}

func main() {
    server1 := NewServer()
    fmt.Printf("%+v\n", server1)  // {Host:localhost Port:8080}

    server2 := NewServer(WithHost("example.com"), WithPort(9000))
    fmt.Printf("%+v\n", server2)  // {Host:example.com Port:9000}
}
```

**実用例（リトライロジック）**:

```go
package main

import (
    "errors"
    "fmt"
    "time"
)

func retry(attempts int, delay time.Duration, fn func() error) error {
    for i := 0; i < attempts; i++ {
        err := fn()
        if err == nil {
            return nil
        }

        if i < attempts-1 {
            time.Sleep(delay)
        }
    }
    return errors.New("max retry attempts reached")
}

func main() {
    count := 0
    err := retry(3, time.Second, func() error {
        count++
        fmt.Printf("Attempt %d\n", count)
        if count < 3 {
            return errors.New("temporary error")
        }
        return nil
    })

    if err != nil {
        fmt.Println("Failed:", err)
    } else {
        fmt.Println("Success!")
    }
}
```

**無名関数の特徴**:

- クロージャとして外側の変数をキャプチャできる
- 関数を値として扱える
- 高階関数の実装に便利
- ゴルーチン、defer、sort などで頻繁に使用される
- ジェネリクス（Go 1.18+）と組み合わせると汎用的な関数を作れる

</div>
