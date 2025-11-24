---
title: "クロージャ"
excerpt: ""
date: "2024-08-04T22:30:23.000Z"
updatedAt: '2025-11-24T22:13:44.000Z'
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
mode: programming
---

クロージャとは、関数とその関数が定義されたスコープ（環境）を一緒に保持する仕組み。これにより、外側の関数の変数を内側の関数が参照し続けることができ、状態を保持した関数を作れる。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
Function<Void, Integer> makeClosure()
```

Java では実質的に final な変数をラムダ式や無名クラスでキャプチャすることで、クロージャを実現できる（Java 8+）。

**基本的なクロージャ**:

```java
import java.util.function.Supplier;

public class Main {
    public static Supplier<Integer> makeCounter() {
        // 実質的に final な変数（変更されないため）
        final int[] count = {0};  // 配列を使って回避

        return () -> {
            count[0]++;
            return count[0];
        };
    }

    public static void main(String[] args) {
        Supplier<Integer> counter = makeCounter();

        System.out.println(counter.get());  // 1
        System.out.println(counter.get());  // 2
        System.out.println(counter.get());  // 3
    }
}
```

**AtomicInteger を使った実装**:

より自然な方法として、`AtomicInteger`を使う。

```java
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.Supplier;

public class Main {
    public static Supplier<Integer> makeCounter() {
        AtomicInteger count = new AtomicInteger(0);

        return () -> count.incrementAndGet();
    }

    public static void main(String[] args) {
        Supplier<Integer> counter = makeCounter();

        System.out.println(counter.get());  // 1
        System.out.println(counter.get());  // 2
        System.out.println(counter.get());  // 3
    }
}
```

**複数の変数をキャプチャ**:

```java
import java.util.function.Supplier;

public class Main {
    public static Supplier<String> makeGreeter(String name, String greeting) {
        // name と greeting をキャプチャ
        return () -> greeting + ", " + name + "!";
    }

    public static void main(String[] args) {
        Supplier<String> greet1 = makeGreeter("Alice", "Hello");
        Supplier<String> greet2 = makeGreeter("Bob", "Hi");

        System.out.println(greet1.get());  // Hello, Alice!
        System.out.println(greet2.get());  // Hi, Bob!
    }
}
```

**実用例（カウンター生成）**:

```java
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.IntSupplier;

public class Main {
    public static IntSupplier makeCounter(int start, int step) {
        AtomicInteger current = new AtomicInteger(start - step);

        return () -> current.addAndGet(step);
    }

    public static void main(String[] args) {
        IntSupplier countByOne = makeCounter(0, 1);
        IntSupplier countByTen = makeCounter(0, 10);

        System.out.println(countByOne.getAsInt());  // 1
        System.out.println(countByOne.getAsInt());  // 2

        System.out.println(countByTen.getAsInt());  // 10
        System.out.println(countByTen.getAsInt());  // 20
    }
}
```

**実用例（プライベート変数）**:

```java
import java.util.HashMap;
import java.util.Map;
import java.util.function.Consumer;
import java.util.function.Supplier;

public class Main {
    static class Person {
        private Map<String, Object> data = new HashMap<>();

        public Consumer<String> setName() {
            return name -> data.put("name", name);
        }

        public Supplier<String> getName() {
            return () -> (String) data.get("name");
        }
    }

    public static void main(String[] args) {
        Person person = new Person();

        person.setName().accept("Alice");
        System.out.println(person.getName().get());  // Alice
    }
}
```

**制約**:

- キャプチャされる変数は実質的に final である必要がある
- プリミティブ型の変数を変更するには、配列やラッパークラスを使う必要がある

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
def make_closure():
    # 外側の変数をキャプチャ
    return lambda: variable
```

Python では関数内で定義された関数が外側のスコープの変数を参照できる（クロージャ）。

**基本的なクロージャ**:

```python
def make_counter():
    count = 0

    def counter():
        nonlocal count  # 外側の変数を変更するために必要
        count += 1
        return count

    return counter

c = make_counter()

print(c())  # 1
print(c())  # 2
print(c())  # 3
```

**nonlocal キーワード**:

外側のスコープの変数を変更するには`nonlocal`が必要。

```python
def make_multiplier(factor):
    # factor をキャプチャ（変更しないので nonlocal 不要）
    def multiply(x):
        return x * factor
    return multiply

double = make_multiplier(2)
triple = make_multiplier(3)

print(double(5))  # 10
print(triple(5))  # 15
```

**複数の変数をキャプチャ**:

```python
def make_greeter(name, greeting):
    # name と greeting をキャプチャ
    def greet():
        return f"{greeting}, {name}!"
    return greet

greet1 = make_greeter("Alice", "Hello")
greet2 = make_greeter("Bob", "Hi")

print(greet1())  # Hello, Alice!
print(greet2())  # Hi, Bob!
```

**ラムダ式でのクロージャ**:

```python
def make_adder(n):
    return lambda x: x + n

add_five = make_adder(5)
add_ten = make_adder(10)

print(add_five(3))   # 8
print(add_ten(3))    # 13
```

**実用例（カウンター生成）**:

```python
def make_counter(start=0, step=1):
    count = start - step

    def counter():
        nonlocal count
        count += step
        return count

    return counter

count_by_one = make_counter(0, 1)
count_by_ten = make_counter(0, 10)

print(count_by_one())  # 1
print(count_by_one())  # 2

print(count_by_ten())  # 10
print(count_by_ten())  # 20
```

**実用例（プライベート変数）**:

クロージャでカプセル化を実現できる。

```python
def create_person(name, age):
    # プライベート変数
    data = {"name": name, "age": age}

    def get_name():
        return data["name"]

    def set_name(new_name):
        data["name"] = new_name

    def get_age():
        return data["age"]

    def birthday():
        data["age"] += 1

    return {
        "get_name": get_name,
        "set_name": set_name,
        "get_age": get_age,
        "birthday": birthday
    }

person = create_person("Alice", 25)
print(person["get_name"]())  # Alice
print(person["get_age"]())   # 25

person["birthday"]()
print(person["get_age"]())   # 26
```

**実用例（デコレータ）**:

デコレータはクロージャの応用。

```python
def repeat(n):
    """関数を n 回実行するデコレータ"""
    def decorator(func):
        def wrapper(*args, **kwargs):
            results = []
            for _ in range(n):
                results.append(func(*args, **kwargs))
            return results
        return wrapper
    return decorator

@repeat(3)
def greet(name):
    return f"Hello, {name}!"

results = greet("Alice")
print(results)  # ['Hello, Alice!', 'Hello, Alice!', 'Hello, Alice!']
```

**実用例（遅延評価）**:

```python
def make_lazy_value(compute_func):
    """値を遅延評価するクロージャ"""
    cache = {}

    def get_value():
        if "value" not in cache:
            cache["value"] = compute_func()
        return cache["value"]

    return get_value

import time

expensive_computation = make_lazy_value(lambda: time.sleep(1) or "computed!")
print("関数作成完了")

# 初回は計算される（1秒かかる）
print(expensive_computation())  # computed!

# 2回目以降はキャッシュから返される
print(expensive_computation())  # computed!（即座に返る）
```

**クロージャの確認**:

```python
def outer():
    x = 10
    def inner():
        return x
    return inner

f = outer()
print(f())  # 10

# クロージャの情報を確認
print(f.__closure__)  # (<cell at 0x...: int object at 0x...>,)
print(f.__closure__[0].cell_contents)  # 10
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
function makeClosure() {
  return () => variable;
}
```

JavaScript では関数内で定義された関数が外側のスコープの変数を参照できる（クロージャ）。

**基本的なクロージャ**:

```javascript
function makeCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const counter = makeCounter();

console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
```

**アロー関数でのクロージャ**:

```javascript
const makeCounter = () => {
  let count = 0;
  return () => ++count;
};

const c = makeCounter();
console.log(c()); // 1
console.log(c()); // 2
```

**複数の変数をキャプチャ**:

```javascript
function makeGreeter(name, greeting) {
  return function () {
    return `${greeting}, ${name}!`;
  };
}

const greet1 = makeGreeter("Alice", "Hello");
const greet2 = makeGreeter("Bob", "Hi");

console.log(greet1()); // Hello, Alice!
console.log(greet2()); // Hi, Bob!
```

**実用例（カウンター生成）**:

```javascript
function makeCounter(start = 0, step = 1) {
  let count = start - step;

  return function () {
    count += step;
    return count;
  };
}

const countByOne = makeCounter(0, 1);
const countByTen = makeCounter(0, 10);

console.log(countByOne()); // 1
console.log(countByOne()); // 2

console.log(countByTen()); // 10
console.log(countByTen()); // 20
```

**実用例（プライベート変数）**:

クロージャでカプセル化を実現できる。

```javascript
function createPerson(name, age) {
  // プライベート変数
  let _name = name;
  let _age = age;

  return {
    getName: () => _name,
    setName: (newName) => {
      _name = newName;
    },
    getAge: () => _age,
    birthday: () => {
      _age++;
    },
  };
}

const person = createPerson("Alice", 25);
console.log(person.getName()); // Alice
console.log(person.getAge()); // 25

person.birthday();
console.log(person.getAge()); // 26

// プライベート変数に直接アクセスできない
console.log(person._name); // undefined
```

**実用例（部分適用）**:

```javascript
function multiply(a, b) {
  return a * b;
}

function partial(fn, ...fixedArgs) {
  return function (...remainingArgs) {
    return fn(...fixedArgs, ...remainingArgs);
  };
}

const double = partial(multiply, 2);
const triple = partial(multiply, 3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

**実用例（イベントハンドラ）**:

```javascript
function setupCounter(elementId) {
  let count = 0;
  const button = document.getElementById(elementId);

  button.addEventListener("click", function () {
    count++;
    button.textContent = `Clicked ${count} times`;
  });
}

// setupCounter("myButton");
```

**実用例（モジュールパターン）**:

```javascript
const calculator = (function () {
  // プライベート変数
  let result = 0;

  // パブリックメソッド
  return {
    add: (n) => {
      result += n;
      return calculator;
    },
    subtract: (n) => {
      result -= n;
      return calculator;
    },
    multiply: (n) => {
      result *= n;
      return calculator;
    },
    divide: (n) => {
      result /= n;
      return calculator;
    },
    getResult: () => result,
    reset: () => {
      result = 0;
      return calculator;
    },
  };
})();

calculator.add(10).multiply(2).subtract(5);
console.log(calculator.getResult()); // 15

calculator.reset().add(5).multiply(3);
console.log(calculator.getResult()); // 15
```

**クロージャのメモリリーク**:

クロージャは外側の変数を保持し続けるため、不要になったクロージャは明示的に破棄する。

```javascript
function createHeavyObject() {
  const heavyData = new Array(1000000).fill("data");

  return function () {
    return heavyData.length;
  };
}

let func = createHeavyObject();
console.log(func()); // 1000000

// 不要になったら参照を解除
func = null; // heavyData もガベージコレクションの対象になる
```

**よくある間違い（ループとクロージャ）**:

```javascript
// 悪い例（var を使用）
function badExample() {
  const funcs = [];
  for (var i = 0; i < 3; i++) {
    funcs.push(function () {
      return i;
    });
  }
  return funcs;
}

const bad = badExample();
console.log(bad[0]()); // 3（期待: 0）
console.log(bad[1]()); // 3（期待: 1）
console.log(bad[2]()); // 3（期待: 2）

// 良い例（let を使用）
function goodExample() {
  const funcs = [];
  for (let i = 0; i < 3; i++) {
    funcs.push(function () {
      return i;
    });
  }
  return funcs;
}

const good = goodExample();
console.log(good[0]()); // 0
console.log(good[1]()); // 1
console.log(good[2]()); // 2
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
func makeClosure() func() ReturnType { }
```

Go では無名関数が外側のスコープの変数を参照できる（クロージャ）。

**基本的なクロージャ**:

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

**複数の変数をキャプチャ**:

```go
package main

import "fmt"

func makeGreeter(name, greeting string) func() string {
    return func() string {
        return greeting + ", " + name + "!"
    }
}

func main() {
    greet1 := makeGreeter("Alice", "Hello")
    greet2 := makeGreeter("Bob", "Hi")

    fmt.Println(greet1())  // Hello, Alice!
    fmt.Println(greet2())  // Hi, Bob!
}
```

**実用例（カウンター生成）**:

```go
package main

import "fmt"

func makeCounter(start, step int) func() int {
    count := start - step

    return func() int {
        count += step
        return count
    }
}

func main() {
    countByOne := makeCounter(0, 1)
    countByTen := makeCounter(0, 10)

    fmt.Println(countByOne())  // 1
    fmt.Println(countByOne())  // 2

    fmt.Println(countByTen())  // 10
    fmt.Println(countByTen())  // 20
}
```

**実用例（プライベート変数）**:

```go
package main

import "fmt"

type Person struct {
    getName func() string
    setName func(string)
    getAge  func() int
    birthday func()
}

func NewPerson(name string, age int) *Person {
    // プライベート変数
    _name := name
    _age := age

    return &Person{
        getName: func() string {
            return _name
        },
        setName: func(newName string) {
            _name = newName
        },
        getAge: func() int {
            return _age
        },
        birthday: func() {
            _age++
        },
    }
}

func main() {
    person := NewPerson("Alice", 25)
    fmt.Println(person.getName())  // Alice
    fmt.Println(person.getAge())   // 25

    person.birthday()
    fmt.Println(person.getAge())   // 26
}
```

**実用例（ジェネレータ）**:

```go
package main

import "fmt"

func fibonacci() func() int {
    a, b := 0, 1

    return func() int {
        result := a
        a, b = b, a+b
        return result
    }
}

func main() {
    fib := fibonacci()

    for i := 0; i < 10; i++ {
        fmt.Print(fib(), " ")
    }
    // 0 1 1 2 3 5 8 13 21 34
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

**実用例（リトライロジック）**:

```go
package main

import (
    "errors"
    "fmt"
    "time"
)

func makeRetry(maxAttempts int, delay time.Duration) func(func() error) error {
    return func(fn func() error) error {
        for i := 0; i < maxAttempts; i++ {
            err := fn()
            if err == nil {
                return nil
            }

            if i < maxAttempts-1 {
                time.Sleep(delay)
            }
        }
        return errors.New("max retry attempts reached")
    }
}

func main() {
    retry := makeRetry(3, time.Second)

    count := 0
    err := retry(func() error {
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

**クロージャの注意点（ループ）**:

```go
package main

import (
    "fmt"
    "time"
)

func main() {
    // 悪い例
    funcs := []func(){}
    for i := 0; i < 3; i++ {
        funcs = append(funcs, func() {
            fmt.Println(i)  // i をキャプチャ
        })
    }

    for _, f := range funcs {
        f()  // 3, 3, 3 と出力される（期待: 0, 1, 2）
    }

    // 良い例1: ループ変数をコピー
    funcs2 := []func(){}
    for i := 0; i < 3; i++ {
        i := i  // シャドウイング
        funcs2 = append(funcs2, func() {
            fmt.Println(i)
        })
    }

    for _, f := range funcs2 {
        f()  // 0, 1, 2 と出力される
    }

    // 良い例2: 引数として渡す
    funcs3 := []func(){}
    for i := 0; i < 3; i++ {
        funcs3 = append(funcs3, func(n int) func() {
            return func() {
                fmt.Println(n)
            }
        }(i))
    }

    for _, f := range funcs3 {
        f()  // 0, 1, 2 と出力される
    }
}
```

**クロージャの変数は共有される**:

```go
package main

import "fmt"

func makeCounters() (func() int, func() int) {
    count := 0

    inc := func() int {
        count++
        return count
    }

    dec := func() int {
        count--
        return count
    }

    return inc, dec
}

func main() {
    inc, dec := makeCounters()

    fmt.Println(inc())  // 1
    fmt.Println(inc())  // 2
    fmt.Println(dec())  // 1
    fmt.Println(dec())  // 0
}
```

</div>
