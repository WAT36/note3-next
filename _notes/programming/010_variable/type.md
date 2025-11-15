---
title: "変数の型を調べる"
date: "2019-11-01T01:37:30+09:00"
excerpt: "変数の型を調べる方法について"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-11-01T01:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

変数の型を調べる方法について説明する。各言語で異なる方法がある。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
variable instanceof ClassName
variable.getClass()
```

Java では`instanceof`演算子と`getClass()`メソッドを使って型を調べることができる。

**instanceof 演算子**:

変数が特定のクラスのインスタンスかどうかを調べる。

```java
String text = "Hello";
Integer number = 100;

System.out.println(text instanceof String);   // true
System.out.println(text instanceof Object);   // true（StringはObjectを継承）
System.out.println(number instanceof Integer); // true
System.out.println(number instanceof Number);  // true（IntegerはNumberを継承）
```

**instanceof の制約**:

- 参照型のクラスにのみ使用可能（プリミティブ型には使えない）
- 継承または実装の関係がないとコンパイルエラー

```java
String text = "Hello";
// System.out.println(text instanceof Integer);  // エラー: 継承関係がない
```

**null チェック**:

`instanceof`は`null`に対して`false`を返す（`NullPointerException`を投げない）。

```java
String text = null;
System.out.println(text instanceof String);  // false
```

**継承関係での使用**:

主に継承および実装の関係にあるデータ間で利用する。

```java
class Animal { }
class Dog extends Animal { }
class Cat extends Animal { }

Animal animal = new Dog();

System.out.println(animal instanceof Animal);  // true
System.out.println(animal instanceof Dog);     // true
System.out.println(animal instanceof Cat);     // false
```

**インターフェースでの使用**:

```java
interface Flyable { }
class Bird implements Flyable { }

Bird bird = new Bird();
System.out.println(bird instanceof Flyable);  // true
```

**instanceof パターンマッチング（Java 14+）**:

型チェックとキャストを同時に行える。

```java
Object obj = "Hello";

if (obj instanceof String s) {
    // s は自動的に String 型にキャストされる
    System.out.println(s.toUpperCase());  // "HELLO"
}
```

**getClass() メソッド**:

正確なクラス型を取得する（継承は考慮しない）。

```java
String text = "Hello";
Integer number = 100;

System.out.println(text.getClass());        // class java.lang.String
System.out.println(text.getClass().getName());  // java.lang.String
System.out.println(number.getClass());      // class java.lang.Integer
```

**instanceof vs getClass()**:

```java
class Animal { }
class Dog extends Animal { }

Animal animal = new Dog();

System.out.println(animal instanceof Animal);  // true（継承を考慮）
System.out.println(animal.getClass() == Animal.class);  // false
System.out.println(animal.getClass() == Dog.class);     // true（正確なクラス）
```

**プリミティブ型のラッパークラス**:

プリミティブ型は`instanceof`を使えないが、ラッパークラスには使える。

```java
// int primitive = 10;
// System.out.println(primitive instanceof Integer);  // エラー

Integer wrapped = 10;
System.out.println(wrapped instanceof Integer);  // true
```

**実用例（型によって処理を分岐）**:

```java
public void processValue(Object value) {
    if (value instanceof String s) {
        System.out.println("String: " + s.toUpperCase());
    } else if (value instanceof Integer i) {
        System.out.println("Integer: " + (i * 2));
    } else if (value instanceof Double d) {
        System.out.println("Double: " + String.format("%.2f", d));
    } else {
        System.out.println("Unknown type: " + value.getClass().getName());
    }
}

// 使用例
processValue("hello");  // String: HELLO
processValue(42);       // Integer: 84
processValue(3.14);     // Double: 3.14
```

**型の比較**:

```java
String text1 = "Hello";
String text2 = "World";

System.out.println(text1.getClass() == text2.getClass());  // true（同じString型）
System.out.println(text1.getClass().equals(text2.getClass()));  // true
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
type(variable)
isinstance(variable, Type)
```

Python では`type()`関数と`isinstance()`関数を使って型を調べることができる。

**type() 関数**:

変数の正確な型を取得する。

```python
a = 1
print(type(a))  # <class 'int'>

b = "text"
print(type(b))  # <class 'str'>

c = [1, 2, 3]
print(type(c))  # <class 'list'>

d = {1: 'a', 2: 'b'}
print(type(d))  # <class 'dict'>
```

**type() の型名を文字列で取得**:

```python
a = 42
print(type(a).__name__)  # int

b = 3.14
print(type(b).__name__)  # float

c = True
print(type(c).__name__)  # bool
```

**isinstance() 関数（推奨）**:

変数が特定の型のインスタンスかどうかを調べる。継承も考慮する。

```python
text = "Hello"
number = 100

print(isinstance(text, str))    # True
print(isinstance(number, int))  # True
print(isinstance(number, float))  # False
```

**複数の型をチェック**:

タプルで複数の型を指定できる。

```python
value = 42

print(isinstance(value, (int, float)))  # True（int または float）
print(isinstance(value, (str, list)))   # False
```

**継承関係での使用**:

`isinstance()`は継承を考慮するが、`type()`は正確な型のみ。

```python
class Animal:
    pass

class Dog(Animal):
    pass

dog = Dog()

print(isinstance(dog, Dog))     # True
print(isinstance(dog, Animal))  # True（継承を考慮）
print(type(dog) == Dog)         # True
print(type(dog) == Animal)      # False（正確な型のみ）
```

**主なデータ型**:

```python
# 数値型
print(type(42))          # <class 'int'>
print(type(3.14))        # <class 'float'>
print(type(1 + 2j))      # <class 'complex'>

# 文字列
print(type("text"))      # <class 'str'>

# ブール値
print(type(True))        # <class 'bool'>

# None
print(type(None))        # <class 'NoneType'>

# コレクション
print(type([1, 2, 3]))   # <class 'list'>
print(type((1, 2, 3)))   # <class 'tuple'>
print(type({1, 2, 3}))   # <class 'set'>
print(type({"key": "value"}))  # <class 'dict'>
```

**type() vs isinstance()**:

```python
# type() は正確な型のみチェック
print(type(True) == bool)  # True
print(type(True) == int)   # False（bool は int のサブクラスだが正確な型は異なる）

# isinstance() は継承も考慮
print(isinstance(True, bool))  # True
print(isinstance(True, int))   # True（bool は int のサブクラス）
```

**型チェックの使い分け**:

- **isinstance()**: 通常はこちらを使用（継承を考慮）
- **type()**: 正確な型を知りたい場合

```python
def process_value(value):
    if isinstance(value, str):
        return value.upper()
    elif isinstance(value, int):
        return value * 2
    elif isinstance(value, list):
        return len(value)
    else:
        return None

print(process_value("hello"))     # HELLO
print(process_value(21))          # 42
print(process_value([1, 2, 3]))   # 3
```

**型の比較**:

```python
a = 10
b = 20

print(type(a) == type(b))  # True（同じ int 型）
print(isinstance(a, type(b)))  # True
```

**カスタムクラスの型チェック**:

```python
class User:
    def __init__(self, name):
        self.name = name

user = User("John")

print(type(user))  # <class '__main__.User'>
print(type(user).__name__)  # User
print(isinstance(user, User))  # True
```

**実用例（型によって処理を分岐）**:

```python
def format_value(value):
    if isinstance(value, str):
        return f"String: {value.upper()}"
    elif isinstance(value, int):
        return f"Integer: {value * 2}"
    elif isinstance(value, float):
        return f"Float: {value:.2f}"
    elif isinstance(value, (list, tuple)):
        return f"Collection: {len(value)} items"
    elif isinstance(value, dict):
        return f"Dict: {len(value)} keys"
    else:
        return f"Unknown: {type(value).__name__}"

# 使用例
print(format_value("hello"))        # String: HELLO
print(format_value(42))             # Integer: 84
print(format_value(3.14159))        # Float: 3.14
print(format_value([1, 2, 3]))      # Collection: 3 items
print(format_value({"a": 1}))       # Dict: 1 keys
```

**callable() 関数**:

オブジェクトが呼び出し可能かどうかを調べる。

```python
def my_function():
    pass

print(callable(my_function))  # True
print(callable(lambda x: x))  # True
print(callable("text"))       # False
print(callable(42))           # False
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
typeof variable;
variable instanceof ClassName;
```

JavaScript では`typeof`演算子と`instanceof`演算子を使って型を調べることができる。

**typeof 演算子**:

変数のプリミティブ型を調べる。

```javascript
console.log(typeof 42); // "number"
console.log(typeof "text"); // "string"
console.log(typeof true); // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof Symbol()); // "symbol"
console.log(typeof 100n); // "bigint"

// オブジェクト型
console.log(typeof {}); // "object"
console.log(typeof [1, 2, 3]); // "object"
console.log(typeof function () {}); // "function"
```

**typeof の注意点（null）**:

`null`は`"object"`を返す（JavaScript の歴史的なバグ）。

```javascript
console.log(typeof null); // "object"（期待: "null"）

// null チェックは === を使う
const value = null;
if (value === null) {
  console.log("This is null");
}
```

**主なデータ型**:

```javascript
// プリミティブ型
typeof 42; // "number"
typeof 3.14; // "number"
typeof "text"; // "string"
typeof true; // "boolean"
typeof undefined; // "undefined"
typeof Symbol(); // "symbol"
typeof 100n; // "bigint"

// オブジェクト型
typeof {}; // "object"
typeof []; // "object"（配列も object）
typeof null; // "object"（バグ）
typeof function () {}; // "function"
```

**instanceof 演算子**:

オブジェクトが特定のクラスのインスタンスかどうかを調べる。

```javascript
const arr = [1, 2, 3];
const date = new Date();
const regex = /test/;

console.log(arr instanceof Array); // true
console.log(date instanceof Date); // true
console.log(regex instanceof RegExp); // true
console.log(arr instanceof Object); // true（すべてのオブジェクトはObject）
```

**カスタムクラスでの使用**:

```javascript
class User {
  constructor(name) {
    this.name = name;
  }
}

const user = new User("John");

console.log(user instanceof User); // true
console.log(user instanceof Object); // true
```

**継承関係での使用**:

```javascript
class Animal {}
class Dog extends Animal {}

const dog = new Dog();

console.log(dog instanceof Dog); // true
console.log(dog instanceof Animal); // true（継承を考慮）
console.log(dog instanceof Object); // true
```

**Array.isArray()**:

配列かどうかを正確に判定する（推奨）。

```javascript
console.log(Array.isArray([1, 2, 3])); // true
console.log(Array.isArray("text")); // false
console.log(Array.isArray({})); // false
console.log(Array.isArray(null)); // false
```

**Object.prototype.toString.call()**:

正確な型を文字列で取得する。

```javascript
const toString = Object.prototype.toString;

console.log(toString.call(42)); // "[object Number]"
console.log(toString.call("text")); // "[object String]"
console.log(toString.call(true)); // "[object Boolean]"
console.log(toString.call(null)); // "[object Null]"
console.log(toString.call(undefined)); // "[object Undefined]"
console.log(toString.call([])); // "[object Array]"
console.log(toString.call({})); // "[object Object]"
console.log(toString.call(new Date())); // "[object Date]"
```

**型チェックのヘルパー関数**:

```javascript
function getType(value) {
  return Object.prototype.toString.call(value).slice(8, -1);
}

console.log(getType(42)); // "Number"
console.log(getType("text")); // "String"
console.log(getType([])); // "Array"
console.log(getType({})); // "Object"
console.log(getType(null)); // "Null"
console.log(getType(undefined)); // "Undefined"
```

**実用例（型によって処理を分岐）**:

```javascript
function processValue(value) {
  if (typeof value === "string") {
    return `String: ${value.toUpperCase()}`;
  } else if (typeof value === "number") {
    return `Number: ${value * 2}`;
  } else if (typeof value === "boolean") {
    return `Boolean: ${!value}`;
  } else if (Array.isArray(value)) {
    return `Array: ${value.length} items`;
  } else if (value instanceof Date) {
    return `Date: ${value.toISOString()}`;
  } else if (typeof value === "object" && value !== null) {
    return `Object: ${Object.keys(value).length} keys`;
  } else if (value === null) {
    return "Null";
  } else {
    return `Unknown: ${typeof value}`;
  }
}

// 使用例
console.log(processValue("hello")); // String: HELLO
console.log(processValue(21)); // Number: 42
console.log(processValue(true)); // Boolean: false
console.log(processValue([1, 2, 3])); // Array: 3 items
console.log(processValue(new Date())); // Date: 2024-...
console.log(processValue({ a: 1, b: 2 })); // Object: 2 keys
console.log(processValue(null)); // Null
```

**typeof vs instanceof**:

| 用途           | typeof            | instanceof |
| -------------- | ----------------- | ---------- |
| プリミティブ型 | ○                 | ×          |
| オブジェクト型 | △（"object"のみ） | ○          |
| null チェック  | △（"object"）     | ×          |
| 配列チェック   | △（"object"）     | ○          |
| 継承チェック   | ×                 | ○          |

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
fmt.Printf("%T", variable)
reflect.TypeOf(variable)
```

Go では`fmt.Printf`の`%T`フォーマットや`reflect`パッケージを使って型を調べることができる。

**%T フォーマット（シンプル、推奨）**:

変数の型を文字列として表示する。

```go
package main

import "fmt"

func main() {
    a := 42
    b := "text"
    c := 3.14
    d := true

    fmt.Printf("a の型: %T\n", a)  // a の型: int
    fmt.Printf("b の型: %T\n", b)  // b の型: string
    fmt.Printf("c の型: %T\n", c)  // c の型: float64
    fmt.Printf("d の型: %T\n", d)  // d の型: bool
}
```

**reflect.TypeOf()**:

型情報を取得する。

```go
package main

import (
    "fmt"
    "reflect"
)

func main() {
    a := 42
    b := "text"
    c := []int{1, 2, 3}

    fmt.Println(reflect.TypeOf(a))  // int
    fmt.Println(reflect.TypeOf(b))  // string
    fmt.Println(reflect.TypeOf(c))  // []int
}
```

**型の名前を取得**:

```go
package main

import (
    "fmt"
    "reflect"
)

func main() {
    a := 42

    t := reflect.TypeOf(a)
    fmt.Println(t.Name())    // int
    fmt.Println(t.String())  // int
    fmt.Println(t.Kind())    // int
}
```

**主なデータ型**:

```go
package main

import "fmt"

func main() {
    // 数値型
    fmt.Printf("%T\n", 42)          // int
    fmt.Printf("%T\n", int32(42))   // int32
    fmt.Printf("%T\n", 3.14)        // float64
    fmt.Printf("%T\n", float32(3.14)) // float32

    // 文字列とブール値
    fmt.Printf("%T\n", "text")      // string
    fmt.Printf("%T\n", true)        // bool

    // コレクション
    fmt.Printf("%T\n", []int{1, 2})         // []int
    fmt.Printf("%T\n", map[string]int{})    // map[string]int

    // ポインタ
    var p *int
    fmt.Printf("%T\n", p)           // *int
}
```

**型アサーション（Type Assertion）**:

インターフェース型から具体的な型を取得する。

```go
package main

import "fmt"

func main() {
    var i interface{} = "Hello"

    // 型アサーション（成功）
    s, ok := i.(string)
    if ok {
        fmt.Println("String:", s)  // String: Hello
    }

    // 型アサーション（失敗）
    n, ok := i.(int)
    if !ok {
        fmt.Println("Not an int")  // Not an int
    }

    // ok を使わない場合（失敗するとパニック）
    // n := i.(int)  // パニック: interface conversion
}
```

**型スイッチ（Type Switch）**:

複数の型をチェックして処理を分岐する。

```go
package main

import "fmt"

func processValue(value interface{}) {
    switch v := value.(type) {
    case string:
        fmt.Printf("String: %s\n", v)
    case int:
        fmt.Printf("Int: %d\n", v * 2)
    case float64:
        fmt.Printf("Float64: %.2f\n", v)
    case bool:
        fmt.Printf("Bool: %t\n", !v)
    case []int:
        fmt.Printf("[]int: %d items\n", len(v))
    case nil:
        fmt.Println("Nil")
    default:
        fmt.Printf("Unknown: %T\n", v)
    }
}

func main() {
    processValue("hello")       // String: hello
    processValue(21)            // Int: 42
    processValue(3.14)          // Float64: 3.14
    processValue(true)          // Bool: false
    processValue([]int{1, 2, 3}) // []int: 3 items
    processValue(nil)           // Nil
}
```

**reflect パッケージでの詳細な型情報**:

```go
package main

import (
    "fmt"
    "reflect"
)

func main() {
    type User struct {
        Name string
        Age  int
    }

    user := User{Name: "John", Age: 25}

    t := reflect.TypeOf(user)
    fmt.Println("Name:", t.Name())      // Name: User
    fmt.Println("Kind:", t.Kind())      // Kind: struct
    fmt.Println("String:", t.String())  // String: main.User

    // フィールド情報を取得
    for i := 0; i < t.NumField(); i++ {
        field := t.Field(i)
        fmt.Printf("Field %d: %s (%s)\n", i, field.Name, field.Type)
    }
}
```

**Kind の種類**:

```go
package main

import (
    "fmt"
    "reflect"
)

func main() {
    values := []interface{}{
        42,
        "text",
        true,
        []int{1, 2, 3},
        map[string]int{},
        struct{}{},
    }

    for _, v := range values {
        t := reflect.TypeOf(v)
        fmt.Printf("Type: %v, Kind: %v\n", t, t.Kind())
    }
}
```

実行結果:

```
Type: int, Kind: int
Type: string, Kind: string
Type: bool, Kind: bool
Type: []int, Kind: slice
Type: map[string]int, Kind: map
Type: struct {}, Kind: struct
```

**実用例（型によって処理を分岐）**:

```go
package main

import (
    "fmt"
    "reflect"
)

func formatValue(value interface{}) string {
    switch v := value.(type) {
    case string:
        return fmt.Sprintf("String: %s", v)
    case int:
        return fmt.Sprintf("Int: %d", v * 2)
    case float64:
        return fmt.Sprintf("Float64: %.2f", v)
    case []int:
        return fmt.Sprintf("[]int: %d items", len(v))
    case map[string]interface{}:
        return fmt.Sprintf("Map: %d keys", len(v))
    default:
        return fmt.Sprintf("Unknown: %s", reflect.TypeOf(v))
    }
}

func main() {
    fmt.Println(formatValue("hello"))                      // String: hello
    fmt.Println(formatValue(42))                           // Int: 84
    fmt.Println(formatValue(3.14))                         // Float64: 3.14
    fmt.Println(formatValue([]int{1, 2, 3}))              // []int: 3 items
    fmt.Println(formatValue(map[string]interface{}{"a": 1})) // Map: 1 keys
}
```

**インターフェースの実装チェック**:

コンパイル時にインターフェースの実装を確認する。

```go
package main

import "fmt"

type Writer interface {
    Write([]byte) (int, error)
}

type MyWriter struct{}

func (m MyWriter) Write(p []byte) (int, error) {
    return len(p), nil
}

func main() {
    var w Writer = MyWriter{}  // OK: MyWriter は Writer を実装
    fmt.Printf("Type: %T\n", w)  // Type: main.MyWriter
}
```

**型の比較**:

```go
package main

import (
    "fmt"
    "reflect"
)

func main() {
    a := 10
    b := 20
    c := "text"

    fmt.Println(reflect.TypeOf(a) == reflect.TypeOf(b))  // true（同じ int 型）
    fmt.Println(reflect.TypeOf(a) == reflect.TypeOf(c))  // false
}
```

**カスタム型の型チェック**:

```go
package main

import (
    "fmt"
    "reflect"
)

type UserID int
type ProductID int

func main() {
    var uid UserID = 100
    var pid ProductID = 200

    fmt.Printf("uid の型: %T\n", uid)  // uid の型: main.UserID
    fmt.Printf("pid の型: %T\n", pid)  // pid の型: main.ProductID

    // 型は異なる
    fmt.Println(reflect.TypeOf(uid) == reflect.TypeOf(pid))  // false
}
```

**typeof vs Type Switch**:

| 方法               | 用途                       |
| ------------------ | -------------------------- |
| `%T` フォーマット  | デバッグ・ログ出力         |
| `reflect.TypeOf()` | 型情報の詳細な取得         |
| Type Switch        | 型による処理の分岐（推奨） |
| Type Assertion     | 特定の型への変換           |

</div>
