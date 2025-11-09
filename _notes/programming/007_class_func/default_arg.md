---
title: "引数のデフォルト値"
date: "2019-10-29T05:37:30+09:00"
excerpt: "引数のデフォルト値について"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-29T05:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

引数にデフォルト値を設定すると、関数呼び出し時に引数を省略した場合に自動的にデフォルト値が使われる。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
// Java はデフォルト引数をサポートしない
// オーバーロードで代用
```

Java はデフォルト引数をサポートしていないが、メソッドのオーバーロードで同等の機能を実現できる。

**オーバーロードによる代用**:

```java
class Greeter {
    // デフォルト値を使うメソッド
    public String greet() {
        return greet("Hello!");  // デフォルト値 "Hello!" で呼び出し
    }

    // 実際の処理を行うメソッド
    public String greet(String message) {
        return message;
    }
}

Greeter greeter = new Greeter();
System.out.println(greeter.greet());          // Hello!
System.out.println(greeter.greet("World!"));  // World!
```

**複数の引数のデフォルト値**:

```java
class Person {
    private String name;
    private int age;
    private String email;

    // すべてデフォルト値
    public Person() {
        this("Unknown", 0, null);
    }

    // name のみ指定
    public Person(String name) {
        this(name, 0, null);
    }

    // name と age を指定
    public Person(String name, int age) {
        this(name, age, null);
    }

    // すべて指定
    public Person(String name, int age, String email) {
        this.name = name;
        this.age = age;
        this.email = email;
    }
}

Person p1 = new Person();
Person p2 = new Person("Alice");
Person p3 = new Person("Bob", 30);
Person p4 = new Person("Charlie", 25, "charlie@example.com");
```

**ビルダーパターンによる代用**:

より柔軟なデフォルト値の設定には、ビルダーパターンを使う。

```java
class Person {
    private String name;
    private int age;
    private String email;

    private Person(Builder builder) {
        this.name = builder.name;
        this.age = builder.age;
        this.email = builder.email;
    }

    static class Builder {
        private String name = "Unknown";  // デフォルト値
        private int age = 0;              // デフォルト値
        private String email = null;      // デフォルト値

        public Builder setName(String name) {
            this.name = name;
            return this;
        }

        public Builder setAge(int age) {
            this.age = age;
            return this;
        }

        public Builder setEmail(String email) {
            this.email = email;
            return this;
        }

        public Person build() {
            return new Person(this);
        }
    }
}

// 使用例
Person p1 = new Person.Builder().build();  // すべてデフォルト値
Person p2 = new Person.Builder()
    .setName("Alice")
    .setAge(25)
    .build();
Person p3 = new Person.Builder()
    .setName("Bob")
    .setAge(30)
    .setEmail("bob@example.com")
    .build();
```

**Optional パラメータパターン**:

```java
class Rectangle {
    private int width;
    private int height;
    private String color;

    // 必須パラメータのみ
    public Rectangle(int width, int height) {
        this(width, height, "black");  // デフォルトの色
    }

    // すべてのパラメータ
    public Rectangle(int width, int height, String color) {
        this.width = width;
        this.height = height;
        this.color = color;
    }
}

Rectangle r1 = new Rectangle(10, 5);           // 色はデフォルトで black
Rectangle r2 = new Rectangle(10, 5, "red");    // 色を指定
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
def function_name(arg=default_value):
```

Python では引数に`=`でデフォルト値を設定できる。

**基本的なデフォルト引数**:

```python
def greet(message="Hello!"):
    return message

# 引数を指定
print(greet("World!"))  # World!

# 引数を省略（デフォルト値が使われる）
print(greet())  # Hello!
```

**複数のデフォルト引数**:

```python
def create_person(name="Unknown", age=0, email=None):
    return {"name": name, "age": age, "email": email}

# すべてデフォルト値
p1 = create_person()
print(p1)  # {'name': 'Unknown', 'age': 0, 'email': None}

# 一部だけ指定
p2 = create_person("Alice")
print(p2)  # {'name': 'Alice', 'age': 0, 'email': None}

# すべて指定
p3 = create_person("Bob", 30, "bob@example.com")
print(p3)  # {'name': 'Bob', 'age': 30, 'email': 'bob@example.com'}
```

**キーワード引数との組み合わせ**:

```python
def create_person(name="Unknown", age=0, email=None):
    return {"name": name, "age": age, "email": email}

# キーワード引数で指定（順序を気にしなくて良い）
p1 = create_person(age=25, name="Alice")
print(p1)  # {'name': 'Alice', 'age': 25, 'email': None}

# 一部だけキーワード引数で指定
p2 = create_person("Charlie", email="charlie@example.com")
print(p2)  # {'name': 'Charlie', 'age': 0, 'email': 'charlie@example.com'}
```

**デフォルト引数の注意点（ミュータブルなデフォルト値）**:

リストや辞書をデフォルト値にすると、関数呼び出し間で共有されてしまう。

```python
# 悪い例
def add_item_bad(item, items=[]):
    items.append(item)
    return items

list1 = add_item_bad("apple")
list2 = add_item_bad("banana")
print(list1)  # ['apple', 'banana']（意図しない動作）
print(list2)  # ['apple', 'banana']（同じリスト）

# 良い例
def add_item_good(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items

list3 = add_item_good("apple")
list4 = add_item_good("banana")
print(list3)  # ['apple']（正しい動作）
print(list4)  # ['banana']（独立したリスト）
```

**位置引数とデフォルト引数の組み合わせ**:

デフォルト引数は、デフォルト値を持たない引数の後に配置する必要がある。

```python
# 正しい
def func1(a, b, c=10, d=20):
    return a + b + c + d

print(func1(1, 2))           # 33（c=10, d=20）
print(func1(1, 2, 3))        # 26（d=20）
print(func1(1, 2, 3, 4))     # 10

# 間違い
# def func2(a, b=10, c):  # SyntaxError
#     pass
```

**実用例（設定関数）**:

```python
def connect_database(host="localhost", port=5432, user="admin", password=""):
    print(f"接続先: {host}:{port}")
    print(f"ユーザー: {user}")

# デフォルト値を使用
connect_database()
# 出力:
# 接続先: localhost:5432
# ユーザー: admin

# 一部だけ指定
connect_database(host="192.168.1.1", port=3306)
# 出力:
# 接続先: 192.168.1.1:3306
# ユーザー: admin
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
function functionName(arg = defaultValue) {}
```

JavaScript では引数に`=`でデフォルト値を設定できる（ES6+）。

**基本的なデフォルト引数**:

```javascript
function greet(message = "Hello!") {
  return message;
}

// 引数を指定
console.log(greet("World!")); // World!

// 引数を省略（デフォルト値が使われる）
console.log(greet()); // Hello!
```

**複数のデフォルト引数**:

```javascript
function createPerson(name = "Unknown", age = 0, email = null) {
  return { name, age, email };
}

// すべてデフォルト値
const p1 = createPerson();
console.log(p1); // { name: 'Unknown', age: 0, email: null }

// 一部だけ指定
const p2 = createPerson("Alice");
console.log(p2); // { name: 'Alice', age: 0, email: null }

// すべて指定
const p3 = createPerson("Bob", 30, "bob@example.com");
console.log(p3); // { name: 'Bob', age: 30, email: 'bob@example.com' }
```

**undefined とデフォルト値**:

`undefined`を渡すとデフォルト値が使われるが、`null`を渡すとそのまま`null`が使われる。

```javascript
function greet(message = "Hello!") {
  return message;
}

console.log(greet(undefined)); // Hello!（デフォルト値）
console.log(greet(null)); // null（デフォルト値は使われない）
```

**分割代入とデフォルト値（名前付き引数）**:

オブジェクトの分割代入を使って、名前付き引数のようなことができる。

```javascript
function createPerson({ name = "Unknown", age = 0, email = null } = {}) {
  return { name, age, email };
}

// プロパティ名で指定（順序を気にしなくて良い）
const p1 = createPerson({ age: 25, name: "Alice" });
console.log(p1); // { name: 'Alice', age: 25, email: null }

// 一部だけ指定
const p2 = createPerson({ name: "Charlie", email: "charlie@example.com" });
console.log(p2); // { name: 'Charlie', age: 0, email: 'charlie@example.com' }

// すべて省略
const p3 = createPerson();
console.log(p3); // { name: 'Unknown', age: 0, email: null }
```

**アロー関数でのデフォルト引数**:

```javascript
const add = (a, b = 0) => a + b;

console.log(add(5, 3)); // 8
console.log(add(5)); // 5（b のデフォルト値 0）
```

**Rest Parameters との組み合わせ**:

```javascript
function sum(initial = 0, ...numbers) {
  return numbers.reduce((total, num) => total + num, initial);
}

console.log(sum()); // 0
console.log(sum(10)); // 10
console.log(sum(10, 1, 2, 3)); // 16
```

**実用例（設定関数）**:

```javascript
function connectDatabase(options = {}) {
  const {
    host = "localhost",
    port = 5432,
    user = "admin",
    password = "",
  } = options;

  console.log(`接続先: ${host}:${port}`);
  console.log(`ユーザー: ${user}`);
}

// デフォルト値を使用
connectDatabase();
// 出力:
// 接続先: localhost:5432
// ユーザー: admin

// 一部だけ指定
connectDatabase({ host: "192.168.1.1", port: 3306 });
// 出力:
// 接続先: 192.168.1.1:3306
// ユーザー: admin
```

**実用例（図形の描画）**:

```javascript
function drawRectangle(width, height, color = "black", lineWidth = 1) {
  console.log(`幅: ${width}, 高さ: ${height}`);
  console.log(`色: ${color}, 線の太さ: ${lineWidth}`);
}

drawRectangle(10, 5); // 色と線の太さはデフォルト
drawRectangle(10, 5, "red"); // 線の太さはデフォルト
drawRectangle(10, 5, "blue", 2); // すべて指定
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
// Go はデフォルト引数をサポートしない
// Functional Options パターンで代用
```

Go はデフォルト引数をサポートしていないが、複数の関数や Functional Options パターンで同等の機能を実現できる。

**複数の関数による代用**:

```go
import "fmt"

// デフォルト値を使う関数
func Greet() string {
    return GreetWithMessage("Hello!")
}

// 実際の処理を行う関数
func GreetWithMessage(message string) string {
    return message
}

// 使用例
fmt.Println(Greet())                    // Hello!
fmt.Println(GreetWithMessage("World!")) // World!
```

**構造体とコンストラクタ関数による代用**:

```go
type Person struct {
    Name  string
    Age   int
    Email string
}

// デフォルト値を使うコンストラクタ
func NewPerson() *Person {
    return &Person{
        Name:  "Unknown",
        Age:   0,
        Email: "",
    }
}

// すべての値を指定するコンストラクタ
func NewPersonFull(name string, age int, email string) *Person {
    return &Person{
        Name:  name,
        Age:   age,
        Email: email,
    }
}

// 使用例
p1 := NewPerson()  // すべてデフォルト値
p2 := NewPersonFull("Alice", 25, "alice@example.com")
```

**Functional Options パターン**:

より柔軟なデフォルト値の設定には、Functional Options パターンを使う。

```go
type Person struct {
    Name  string
    Age   int
    Email string
}

// オプション関数の型
type PersonOption func(*Person)

// オプション関数
func WithName(name string) PersonOption {
    return func(p *Person) {
        p.Name = name
    }
}

func WithAge(age int) PersonOption {
    return func(p *Person) {
        p.Age = age
    }
}

func WithEmail(email string) PersonOption {
    return func(p *Person) {
        p.Email = email
    }
}

// コンストラクタ（デフォルト値を設定）
func NewPerson(opts ...PersonOption) *Person {
    // デフォルト値
    p := &Person{
        Name:  "Unknown",
        Age:   0,
        Email: "",
    }

    // オプションを適用
    for _, opt := range opts {
        opt(p)
    }

    return p
}

// 使用例
p1 := NewPerson()  // すべてデフォルト値
fmt.Printf("%+v\n", p1)  // {Name:Unknown Age:0 Email:}

p2 := NewPerson(WithName("Alice"), WithAge(25))
fmt.Printf("%+v\n", p2)  // {Name:Alice Age:25 Email:}

p3 := NewPerson(
    WithName("Bob"),
    WithAge(30),
    WithEmail("bob@example.com"),
)
fmt.Printf("%+v\n", p3)  // {Name:Bob Age:30 Email:bob@example.com}
```

**構造体リテラルのゼロ値を利用**:

```go
type Config struct {
    Host     string
    Port     int
    User     string
    Password string
}

func NewConfig(host string, port int) *Config {
    // 指定されない部分はゼロ値
    return &Config{
        Host: host,
        Port: port,
        User: "admin",     // デフォルト値
        Password: "",      // デフォルト値（ゼロ値）
    }
}

config := NewConfig("localhost", 5432)
fmt.Printf("%+v\n", config)
// {Host:localhost Port:5432 User:admin Password:}
```

**可変長引数によるデフォルト値**:

```go
func CreateRectangle(width, height int, options ...string) {
    color := "black"      // デフォルト値
    lineWidth := 1        // デフォルト値

    if len(options) > 0 {
        color = options[0]
    }
    if len(options) > 1 {
        lineWidth, _ = strconv.Atoi(options[1])
    }

    fmt.Printf("幅: %d, 高さ: %d\n", width, height)
    fmt.Printf("色: %s, 線の太さ: %d\n", color, lineWidth)
}

// 使用例
CreateRectangle(10, 5)              // 色と線の太さはデフォルト
CreateRectangle(10, 5, "red")       // 線の太さはデフォルト
CreateRectangle(10, 5, "blue", "2") // すべて指定
```

**実用例（データベース接続）**:

```go
type DBConfig struct {
    Host     string
    Port     int
    User     string
    Password string
}

type DBOption func(*DBConfig)

func WithHost(host string) DBOption {
    return func(c *DBConfig) {
        c.Host = host
    }
}

func WithPort(port int) DBOption {
    return func(c *DBConfig) {
        c.Port = port
    }
}

func ConnectDatabase(opts ...DBOption) *DBConfig {
    // デフォルト値
    config := &DBConfig{
        Host:     "localhost",
        Port:     5432,
        User:     "admin",
        Password: "",
    }

    // オプションを適用
    for _, opt := range opts {
        opt(config)
    }

    fmt.Printf("接続先: %s:%d\n", config.Host, config.Port)
    fmt.Printf("ユーザー: %s\n", config.User)

    return config
}

// 使用例
ConnectDatabase()
// 出力:
// 接続先: localhost:5432
// ユーザー: admin

ConnectDatabase(WithHost("192.168.1.1"), WithPort(3306))
// 出力:
// 接続先: 192.168.1.1:3306
// ユーザー: admin
```

</div>
