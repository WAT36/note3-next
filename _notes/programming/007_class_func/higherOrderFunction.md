---
title: "高階関数"
excerpt: "関数の引数に関数を定義する"
coverImage: ""
date: "2024-08-03T02:43:21.000Z"
updatedAt: "2024-08-03T02:43:21.000Z"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
mode: programming
---

高階関数とは、関数を引数として受け取るか、関数を返り値として返す関数のこと。関数を値として扱うことで、より柔軟で再利用可能なコードを書ける。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
Function<T, R> higherOrderFunc(Function<T, R> func)
```

Java では関数型インターフェースを使って高階関数を実装する（Java 8+）。

**関数を引数として受け取る**:

```java
import java.util.function.Function;

public class Main {
    // 高階関数: 関数を引数として受け取る
    public static Integer applyTwice(Function<Integer, Integer> func, Integer value) {
        return func.apply(func.apply(value));
    }

    public static void main(String[] args) {
        // 2倍にする関数
        Function<Integer, Integer> doubleIt = x -> x * 2;

        // 2倍を2回適用 = 4倍
        Integer result = applyTwice(doubleIt, 5);
        System.out.println(result);  // 20
    }
}
```

**関数を返す**:

```java
import java.util.function.Function;

public class Main {
    // 高階関数: 関数を返す
    public static Function<Integer, Integer> makeMultiplier(int factor) {
        return x -> x * factor;
    }

    public static void main(String[] args) {
        Function<Integer, Integer> triple = makeMultiplier(3);
        Function<Integer, Integer> quadruple = makeMultiplier(4);

        System.out.println(triple.apply(5));     // 15
        System.out.println(quadruple.apply(5));  // 20
    }
}
```

**Stream API での高階関数**:

```java
import java.util.Arrays;
import java.util.List;
import java.util.function.Predicate;
import java.util.function.Function;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // filter: Predicate を受け取る高階関数
        Predicate<Integer> isEven = x -> x % 2 == 0;

        // map: Function を受け取る高階関数
        Function<Integer, Integer> square = x -> x * x;

        numbers.stream()
            .filter(isEven)
            .map(square)
            .forEach(System.out::println);
        // 4, 16, 36, 64, 100
    }
}
```

**実用例（デコレータパターン）**:

```java
import java.util.function.Function;

public class Main {
    // ロギング機能を追加するデコレータ
    public static <T, R> Function<T, R> withLogging(Function<T, R> func, String name) {
        return input -> {
            System.out.println(name + " 開始: " + input);
            R result = func.apply(input);
            System.out.println(name + " 終了: " + result);
            return result;
        };
    }

    public static void main(String[] args) {
        Function<Integer, Integer> square = x -> x * x;

        // ロギング機能を追加
        Function<Integer, Integer> squareWithLogging = withLogging(square, "square");

        Integer result = squareWithLogging.apply(5);
        // square 開始: 5
        // square 終了: 25
    }
}
```

**実用例（関数の合成）**:

```java
import java.util.function.Function;

public class Main {
    public static void main(String[] args) {
        Function<Integer, Integer> addOne = x -> x + 1;
        Function<Integer, Integer> multiplyByTwo = x -> x * 2;

        // andThen: f(g(x))
        Function<Integer, Integer> addThenMultiply = addOne.andThen(multiplyByTwo);
        System.out.println(addThenMultiply.apply(5));  // (5 + 1) * 2 = 12

        // compose: g(f(x))
        Function<Integer, Integer> multiplyThenAdd = addOne.compose(multiplyByTwo);
        System.out.println(multiplyThenAdd.apply(5));  // (5 * 2) + 1 = 11
    }
}
```

**実用例（カスタムソート）**:

```java
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.function.Function;

public class Main {
    // キーを指定してソート
    public static <T, U extends Comparable<U>> void sortBy(List<T> list, Function<T, U> keyExtractor) {
        list.sort(Comparator.comparing(keyExtractor));
    }

    public static void main(String[] args) {
        List<String> words = Arrays.asList("apple", "pie", "banana", "cherry");

        // 長さでソート
        sortBy(words, String::length);
        System.out.println(words);  // [pie, apple, banana, cherry]
    }
}
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
def higher_order_func(func):
```

Python では関数は第一級オブジェクトなので、高階関数を簡単に実装できる。

**関数を引数として受け取る**:

```python
def apply_twice(func, value):
    """関数を2回適用する"""
    return func(func(value))

# 2倍にする関数
def double(x):
    return x * 2

result = apply_twice(double, 5)
print(result)  # 20
```

**関数を返す**:

```python
def make_multiplier(factor):
    """指定した倍数にする関数を返す"""
    def multiplier(x):
        return x * factor
    return multiplier

triple = make_multiplier(3)
quadruple = make_multiplier(4)

print(triple(5))     # 15
print(quadruple(5))  # 20
```

**組み込み高階関数**:

Python には`map()`, `filter()`, `reduce()`などの組み込み高階関数がある。

```python
numbers = [1, 2, 3, 4, 5]

# map: 各要素に関数を適用
squared = list(map(lambda x: x ** 2, numbers))
print(squared)  # [1, 4, 9, 16, 25]

# filter: 条件に合う要素のみ抽出
even = list(filter(lambda x: x % 2 == 0, numbers))
print(even)  # [2, 4]

# reduce: 累積計算
from functools import reduce
sum_all = reduce(lambda acc, x: acc + x, numbers, 0)
print(sum_all)  # 15
```

**デコレータ（高階関数の応用）**:

```python
def with_logging(func):
    """ロギング機能を追加するデコレータ"""
    def wrapper(*args, **kwargs):
        print(f"{func.__name__} 開始: {args}")
        result = func(*args, **kwargs)
        print(f"{func.__name__} 終了: {result}")
        return result
    return wrapper

@with_logging
def square(x):
    return x * x

result = square(5)
# square 開始: (5,)
# square 終了: 25
```

**関数の合成**:

```python
def compose(f, g):
    """2つの関数を合成する"""
    return lambda x: f(g(x))

def add_one(x):
    return x + 1

def multiply_by_two(x):
    return x * 2

# 関数を合成
add_then_multiply = compose(multiply_by_two, add_one)
print(add_then_multiply(5))  # (5 + 1) * 2 = 12
```

**実用例（リトライ機能）**:

```python
import time

def retry(max_attempts=3, delay=1):
    """リトライ機能を追加するデコレータ"""
    def decorator(func):
        def wrapper(*args, **kwargs):
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts - 1:
                        raise
                    print(f"試行 {attempt + 1} 失敗: {e}")
                    time.sleep(delay)
        return wrapper
    return decorator

@retry(max_attempts=3, delay=0.5)
def unstable_function():
    import random
    if random.random() < 0.7:
        raise Exception("ランダムエラー")
    return "成功"

# result = unstable_function()
```

**実用例（キャッシュ）**:

```python
def memoize(func):
    """結果をキャッシュするデコレータ"""
    cache = {}
    def wrapper(*args):
        if args not in cache:
            cache[args] = func(*args)
        return cache[args]
    return wrapper

@memoize
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(10))  # 55（高速に計算）
```

**実用例（カスタムソート）**:

```python
def sort_by(iterable, key_func):
    """キー関数を指定してソート"""
    return sorted(iterable, key=key_func)

words = ["apple", "pie", "banana", "cherry"]

# 長さでソート
sorted_words = sort_by(words, len)
print(sorted_words)  # ['pie', 'apple', 'banana', 'cherry']

# カスタムキー
people = [("Alice", 25), ("Bob", 30), ("Charlie", 20)]
sorted_people = sort_by(people, lambda x: x[1])  # 年齢でソート
print(sorted_people)  # [('Charlie', 20), ('Alice', 25), ('Bob', 30)]
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
function higherOrderFunc(func) {}
```

JavaScript では関数は第一級オブジェクトなので、高階関数を簡単に実装できる。

**関数を引数として受け取る（コールバック）**:

```javascript
function applyTwice(func, value) {
  return func(func(value));
}

// 2倍にする関数
const double = (x) => x * 2;

const result = applyTwice(double, 5);
console.log(result); // 20
```

**関数を返す**:

```javascript
function makeMultiplier(factor) {
  return (x) => x * factor;
}

const triple = makeMultiplier(3);
const quadruple = makeMultiplier(4);

console.log(triple(5)); // 15
console.log(quadruple(5)); // 20
```

**配列メソッド（組み込み高階関数）**:

JavaScript の配列メソッドは高階関数の典型的な例。

```javascript
const numbers = [1, 2, 3, 4, 5];

// map: 各要素に関数を適用
const squared = numbers.map((x) => x ** 2);
console.log(squared); // [1, 4, 9, 16, 25]

// filter: 条件に合う要素のみ抽出
const even = numbers.filter((x) => x % 2 === 0);
console.log(even); // [2, 4]

// reduce: 累積計算
const sum = numbers.reduce((acc, x) => acc + x, 0);
console.log(sum); // 15

// チェーン
const result = numbers
  .filter((x) => x % 2 === 0)
  .map((x) => x ** 2)
  .reduce((acc, x) => acc + x, 0);
console.log(result); // 20
```

**実用例（イベントハンドラ）**:

```javascript
// addEventListener は高階関数
document.getElementById("btn").addEventListener("click", () => {
  console.log("Button clicked!");
});

// カスタムイベントハンドラ
function on(event, handler) {
  document.addEventListener(event, handler);
}

on("click", () => console.log("Clicked!"));
```

**実用例（関数の合成）**:

```javascript
function compose(f, g) {
  return (x) => f(g(x));
}

const addOne = (x) => x + 1;
const multiplyByTwo = (x) => x * 2;

const addThenMultiply = compose(multiplyByTwo, addOne);
console.log(addThenMultiply(5)); // (5 + 1) * 2 = 12
```

**実用例（デバウンス）**:

```javascript
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// 検索入力のデバウンス
const search = debounce((query) => {
  console.log("検索:", query);
}, 500);

// search("a");  // 500ms 以内に次の入力があるとキャンセル
// search("ab");
// search("abc");  // これだけ実行される
```

**実用例（スロットリング）**:

```javascript
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// スクロールイベントのスロットリング
const handleScroll = throttle(() => {
  console.log("スクロール位置:", window.scrollY);
}, 1000);

// window.addEventListener("scroll", handleScroll);
```

**実用例（パイプライン）**:

```javascript
function pipe(...funcs) {
  return (value) => funcs.reduce((acc, func) => func(acc), value);
}

const addOne = (x) => x + 1;
const double = (x) => x * 2;
const square = (x) => x * x;

const pipeline = pipe(addOne, double, square);
console.log(pipeline(5)); // ((5 + 1) * 2) ^ 2 = 144
```

**実用例（カリー化）**:

```javascript
function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
func higherOrderFunc(func FuncType) ReturnType { }
```

Go でも関数は第一級オブジェクトなので、高階関数を実装できる。

**関数を引数として受け取る**:

```go
package main

import "fmt"

func applyTwice(f func(int) int, value int) int {
    return f(f(value))
}

func main() {
    double := func(x int) int {
        return x * 2
    }

    result := applyTwice(double, 5)
    fmt.Println(result)  // 20
}
```

**関数を返す**:

```go
package main

import "fmt"

func makeMultiplier(factor int) func(int) int {
    return func(x int) int {
        return x * factor
    }
}

func main() {
    triple := makeMultiplier(3)
    quadruple := makeMultiplier(4)

    fmt.Println(triple(5))     // 15
    fmt.Println(quadruple(5))  // 20
}
```

**スライス操作（高階関数の実装）**:

```go
package main

import "fmt"

// Map: 各要素に関数を適用
func Map(slice []int, mapper func(int) int) []int {
    result := make([]int, len(slice))
    for i, v := range slice {
        result[i] = mapper(v)
    }
    return result
}

// Filter: 条件に合う要素のみ抽出
func Filter(slice []int, predicate func(int) bool) []int {
    result := []int{}
    for _, v := range slice {
        if predicate(v) {
            result = append(result, v)
        }
    }
    return result
}

// Reduce: 累積計算
func Reduce(slice []int, reducer func(int, int) int, initial int) int {
    result := initial
    for _, v := range slice {
        result = reducer(result, v)
    }
    return result
}

func main() {
    numbers := []int{1, 2, 3, 4, 5}

    // Map: 各要素を2乗
    squared := Map(numbers, func(x int) int {
        return x * x
    })
    fmt.Println(squared)  // [1 4 9 16 25]

    // Filter: 偶数のみ
    even := Filter(numbers, func(x int) bool {
        return x%2 == 0
    })
    fmt.Println(even)  // [2 4]

    // Reduce: 合計
    sum := Reduce(numbers, func(acc, x int) int {
        return acc + x
    }, 0)
    fmt.Println(sum)  // 15
}
```

**ジェネリクスを使った高階関数（Go 1.18+）**:

```go
package main

import "fmt"

// Map: 汎用的な変換
func Map[T any, U any](slice []T, mapper func(T) U) []U {
    result := make([]U, len(slice))
    for i, v := range slice {
        result[i] = mapper(v)
    }
    return result
}

// Filter: 汎用的なフィルタ
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

**実用例（関数の合成）**:

```go
package main

import "fmt"

func compose(f func(int) int, g func(int) int) func(int) int {
    return func(x int) int {
        return f(g(x))
    }
}

func main() {
    addOne := func(x int) int { return x + 1 }
    multiplyByTwo := func(x int) int { return x * 2 }

    addThenMultiply := compose(multiplyByTwo, addOne)
    fmt.Println(addThenMultiply(5))  // (5 + 1) * 2 = 12
}
```

**実用例（ミドルウェアパターン）**:

```go
package main

import (
    "fmt"
    "log"
)

type HandlerFunc func(string) string

// ロギングミドルウェア
func withLogging(handler HandlerFunc) HandlerFunc {
    return func(input string) string {
        log.Println("開始:", input)
        result := handler(input)
        log.Println("終了:", result)
        return result
    }
}

// タイマーミドルウェア
func withTiming(handler HandlerFunc) HandlerFunc {
    return func(input string) string {
        start := time.Now()
        result := handler(input)
        fmt.Printf("処理時間: %v\n", time.Since(start))
        return result
    }
}

func processString(s string) string {
    return strings.ToUpper(s)
}

func main() {
    // ミドルウェアを適用
    handler := withLogging(withTiming(HandlerFunc(processString)))
    result := handler("hello")
    fmt.Println(result)  // HELLO
}
```

**実用例（Functional Options パターン）**:

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

// 高階関数: Option を複数受け取る
func NewServer(opts ...Option) *Server {
    server := &Server{
        Host: "localhost",
        Port: 8080,
    }

    for _, opt := range opts {
        opt(server)
    }

    return server
}

func main() {
    server := NewServer(WithHost("example.com"), WithPort(9000))
    fmt.Printf("%+v\n", server)  // {Host:example.com Port:9000}
}
```

**実用例（リトライ機能）**:

```go
package main

import (
    "errors"
    "fmt"
    "time"
)

// 高階関数: 関数を受け取ってリトライを追加
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
        fmt.Printf("試行 %d\n", count)
        if count < 3 {
            return errors.New("temporary error")
        }
        return nil
    })

    if err != nil {
        fmt.Println("失敗:", err)
    } else {
        fmt.Println("成功!")
    }
}
```

</div>
