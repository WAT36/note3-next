---
title: "フィールド(クラス変数・インスタンス変数)"
date: "2019-10-29T01:37:30+09:00"
excerpt: "クラス変数・インスタンス変数について"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-29T01:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

フィールド変数とはクラス内に定義する変数のこと。  
その中でも主に、クラス内で定義して全てのインスタンス間で値を共有する変数を**クラス変数**、  
インスタンス毎に独立して値を保持する変数を**インスタンス変数**という。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
// インスタンス変数
Type fieldName;
// クラス変数
static Type fieldName;
```

Java ではクラス内にフィールド変数を定義できる。`static`をつけるとクラス変数、つけないとインスタンス変数になる。

**基本的なフィールド定義**:

```java
class Person {
    // インスタンス変数
    String name;
    int age;

    // クラス変数（static）
    static int count = 0;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
        count++;  // インスタンス作成のたびにカウント
    }
}

// 使用例
Person p1 = new Person("Alice", 25);
Person p2 = new Person("Bob", 30);

// インスタンス変数はインスタンスごとに独立
System.out.println(p1.name);  // Alice
System.out.println(p2.name);  // Bob

// クラス変数はすべてのインスタンスで共有
System.out.println(Person.count);  // 2
System.out.println(p1.count);      // 2（インスタンスからもアクセス可能だが非推奨）
```

**クラス変数とインスタンス変数の違い**:

```java
class Counter {
    // クラス変数（全インスタンスで共有）
    static int totalCount = 0;

    // インスタンス変数（インスタンスごとに独立）
    int instanceCount = 0;

    public void increment() {
        totalCount++;      // すべてのインスタンスで共有
        instanceCount++;   // このインスタンスのみ
    }
}

Counter c1 = new Counter();
Counter c2 = new Counter();

c1.increment();
c1.increment();
c2.increment();

System.out.println("c1 instance: " + c1.instanceCount);  // 2
System.out.println("c2 instance: " + c2.instanceCount);  // 1
System.out.println("total: " + Counter.totalCount);      // 3
```

**アクセス修飾子**:

```java
class Person {
    // public: どこからでもアクセス可能
    public String name;

    // private: クラス内からのみアクセス可能
    private int age;

    // protected: 同じパッケージまたはサブクラスからアクセス可能
    protected String email;

    // デフォルト（修飾子なし）: 同じパッケージからアクセス可能
    String address;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // getter（private フィールドへのアクセス）
    public int getAge() {
        return age;
    }

    // setter（private フィールドへの設定）
    public void setAge(int age) {
        if (age >= 0) {
            this.age = age;
        }
    }
}
```

**final フィールド（定数）**:

```java
class Circle {
    // 定数（変更不可）
    public static final double PI = 3.14159;

    // インスタンスごとの定数
    private final int radius;

    public Circle(int radius) {
        this.radius = radius;  // コンストラクタで1回だけ設定可能
    }

    public double getArea() {
        return PI * radius * radius;
    }
}

Circle circle = new Circle(5);
System.out.println(circle.getArea());  // 78.53975
// circle.radius = 10;  // コンパイルエラー（final なので変更不可）
```

**デフォルト値**:

フィールドは初期化しなくても、デフォルト値が設定される。

```java
class DefaultValues {
    int number;         // 0
    String text;        // null
    boolean flag;       // false
    double decimal;     // 0.0

    public void display() {
        System.out.println(number);   // 0
        System.out.println(text);     // null
        System.out.println(flag);     // false
        System.out.println(decimal);  // 0.0
    }
}
```

**実用例（カウンタークラス）**:

```java
class Counter {
    // クラス変数（すべてのインスタンスの合計）
    private static int totalCount = 0;

    // インスタンス変数（このインスタンスのカウント）
    private int instanceCount = 0;

    public void increment() {
        totalCount++;
        instanceCount++;
    }

    public int getInstanceCount() {
        return instanceCount;
    }

    public static int getTotalCount() {
        return totalCount;
    }
}

Counter c1 = new Counter();
Counter c2 = new Counter();

c1.increment();
c1.increment();
c2.increment();

System.out.println("c1: " + c1.getInstanceCount());     // 2
System.out.println("c2: " + c2.getInstanceCount());     // 1
System.out.println("合計: " + Counter.getTotalCount()); // 3
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
# クラス変数
class_var = value
# インスタンス変数
self.instance_var = value
```

Python ではクラス内にフィールド変数を定義できる。クラス内に直接定義するとクラス変数、`__init__`内で`self`に定義するとインスタンス変数になる。

**基本的なフィールド定義**:

```python
class Person:
    # クラス変数
    count = 0

    def __init__(self, name, age):
        # インスタンス変数
        self.name = name
        self.age = age
        Person.count += 1  # インスタンス作成のたびにカウント

# 使用例
p1 = Person("Alice", 25)
p2 = Person("Bob", 30)

# インスタンス変数はインスタンスごとに独立
print(p1.name)  # Alice
print(p2.name)  # Bob

# クラス変数はすべてのインスタンスで共有
print(Person.count)  # 2
print(p1.count)      # 2（インスタンスからもアクセス可能）
```

**クラス変数とインスタンス変数の違い**:

```python
class Counter:
    # クラス変数（全インスタンスで共有）
    total_count = 0

    def __init__(self):
        # インスタンス変数（インスタンスごとに独立）
        self.instance_count = 0

    def increment(self):
        Counter.total_count += 1  # すべてのインスタンスで共有
        self.instance_count += 1  # このインスタンスのみ

c1 = Counter()
c2 = Counter()

c1.increment()
c1.increment()
c2.increment()

print(f"c1 instance: {c1.instance_count}")    # 2
print(f"c2 instance: {c2.instance_count}")    # 1
print(f"合計: {Counter.total_count}")          # 3
```

**クラス変数の注意点（変更時）**:

インスタンスからクラス変数に代入すると、インスタンス変数が作成されてしまう。

```python
class MyClass:
    class_var = "クラス変数"

obj1 = MyClass()
obj2 = MyClass()

# クラス変数を参照
print(obj1.class_var)  # クラス変数
print(obj2.class_var)  # クラス変数

# インスタンスから代入すると、インスタンス変数が作成される
obj1.class_var = "インスタンス変数"

print(obj1.class_var)        # インスタンス変数
print(obj2.class_var)        # クラス変数（変更されていない）
print(MyClass.class_var)     # クラス変数（変更されていない）

# クラス変数を変更するには、クラス名を使う
MyClass.class_var = "変更されたクラス変数"
print(obj2.class_var)        # 変更されたクラス変数
```

**アクセス制御（命名規則）**:

```python
class Person:
    def __init__(self, name, age):
        self.name = name           # public（通常の属性）
        self._email = ""           # protected（慣例、外部からアクセス可能だが推奨されない）
        self.__password = ""       # private（名前マングリング）

    def get_password(self):
        return self.__password

    def set_password(self, password):
        if len(password) >= 8:
            self.__password = password

person = Person("Alice", 25)
print(person.name)       # Alice（アクセス可能）
print(person._email)     # （アクセス可能だが推奨されない）
# print(person.__password)  # AttributeError
print(person.get_password())  # （getter経由でアクセス）
```

**プロパティ（@property）**:

```python
class Person:
    def __init__(self, name, age):
        self._name = name
        self._age = age

    @property
    def age(self):
        """getter"""
        return self._age

    @age.setter
    def age(self, value):
        """setter"""
        if value >= 0:
            self._age = value

person = Person("Alice", 25)
print(person.age)   # 25（getter が呼ばれる）
person.age = 30     # setter が呼ばれる
print(person.age)   # 30
```

**クラスメソッドとクラス変数**:

```python
class Person:
    count = 0  # クラス変数

    def __init__(self, name):
        self.name = name
        Person.count += 1

    @classmethod
    def get_count(cls):
        return cls.count

    @classmethod
    def reset_count(cls):
        cls.count = 0

p1 = Person("Alice")
p2 = Person("Bob")
print(Person.get_count())  # 2

Person.reset_count()
print(Person.get_count())  # 0
```

**実用例（設定クラス）**:

```python
class Config:
    # クラス変数（アプリケーション全体で共有）
    app_name = "MyApp"
    version = "1.0.0"
    debug = False

    def __init__(self, user_name):
        # インスタンス変数（ユーザーごとに独立）
        self.user_name = user_name
        self.session_id = None

config1 = Config("Alice")
config2 = Config("Bob")

# クラス変数はすべてのインスタンスで共有
print(Config.app_name)   # MyApp
print(config1.app_name)  # MyApp
print(config2.app_name)  # MyApp

# インスタンス変数は独立
print(config1.user_name)  # Alice
print(config2.user_name)  # Bob
```

**実用例（カウンタークラス）**:

```python
class Counter:
    # クラス変数（すべてのインスタンスの合計）
    total_count = 0

    def __init__(self):
        # インスタンス変数（このインスタンスのカウント）
        self.instance_count = 0

    def increment(self):
        Counter.total_count += 1
        self.instance_count += 1

    @classmethod
    def get_total_count(cls):
        return cls.total_count

c1 = Counter()
c2 = Counter()

c1.increment()
c1.increment()
c2.increment()

print(f"c1: {c1.instance_count}")              # 2
print(f"c2: {c2.instance_count}")              # 1
print(f"合計: {Counter.get_total_count()}")    # 3
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
// インスタンスプロパティ
this.propertyName = value;
// 静的プロパティ
static propertyName = value;
```

JavaScript ではクラス内にフィールド（プロパティ）を定義できる。`constructor`内で`this`に定義するとインスタンスプロパティ、`static`をつけると静的プロパティになる。

**基本的なフィールド定義**:

```javascript
class Person {
  // クラスフィールド（ES2022+）
  static count = 0;

  constructor(name, age) {
    // インスタンスプロパティ
    this.name = name;
    this.age = age;
    Person.count++; // インスタンス作成のたびにカウント
  }
}

// 使用例
const p1 = new Person("Alice", 25);
const p2 = new Person("Bob", 30);

// インスタンスプロパティはインスタンスごとに独立
console.log(p1.name); // Alice
console.log(p2.name); // Bob

// 静的プロパティはすべてのインスタンスで共有
console.log(Person.count); // 2
console.log(p1.count); // undefined（インスタンスからは直接アクセス不可）
```

**インスタンスプロパティと静的プロパティの違い**:

```javascript
class Counter {
  // 静的プロパティ（全インスタンスで共有）
  static totalCount = 0;

  constructor() {
    // インスタンスプロパティ（インスタンスごとに独立）
    this.instanceCount = 0;
  }

  increment() {
    Counter.totalCount++; // クラスからアクセス
    this.instanceCount++; // インスタンスからアクセス
  }
}

const c1 = new Counter();
const c2 = new Counter();

c1.increment();
c1.increment();
c2.increment();

console.log(`c1 instance: ${c1.instanceCount}`); // 2
console.log(`c2 instance: ${c2.instanceCount}`); // 1
console.log(`合計: ${Counter.totalCount}`); // 3
```

**プライベートフィールド（#、ES2022+）**:

```javascript
class Person {
  // プライベートフィールド
  #password;

  constructor(name, age) {
    this.name = name; // public
    this.age = age; // public
    this.#password = ""; // private
  }

  // getter
  getPassword() {
    return this.#password;
  }

  // setter
  setPassword(password) {
    if (password.length >= 8) {
      this.#password = password;
    }
  }
}

const person = new Person("Alice", 25);
console.log(person.name); // Alice（アクセス可能）
// console.log(person.#password);  // SyntaxError
person.setPassword("secret123");
console.log(person.getPassword()); // secret123
```

**getter/setter**:

```javascript
class Person {
  constructor(name, age) {
    this._name = name;
    this._age = age;
  }

  // getter
  get age() {
    return this._age;
  }

  // setter
  set age(value) {
    if (value >= 0) {
      this._age = value;
    }
  }
}

const person = new Person("Alice", 25);
console.log(person.age); // 25（getter が呼ばれる）
person.age = 30; // setter が呼ばれる
console.log(person.age); // 30
```

**クラスフィールド（ES2022+）**:

コンストラクタ外でフィールドを定義できる。

```javascript
class Person {
  // クラスフィールド（インスタンスプロパティ）
  name = "";
  age = 0;

  // 静的フィールド
  static species = "Homo sapiens";

  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

const person = new Person("Alice", 25);
console.log(person.name); // Alice
console.log(Person.species); // Homo sapiens
```

**実用例（設定クラス）**:

```javascript
class Config {
  // 静的プロパティ（アプリケーション全体で共有）
  static appName = "MyApp";
  static version = "1.0.0";
  static debug = false;

  constructor(userName) {
    // インスタンスプロパティ（ユーザーごとに独立）
    this.userName = userName;
    this.sessionId = null;
  }
}

const config1 = new Config("Alice");
const config2 = new Config("Bob");

// 静的プロパティはクラスからアクセス
console.log(Config.appName); // MyApp

// インスタンスから静的プロパティにアクセスできない
console.log(config1.appName); // undefined

// インスタンスプロパティは独立
console.log(config1.userName); // Alice
console.log(config2.userName); // Bob
```

**実用例（カウンタークラス）**:

```javascript
class Counter {
  // 静的プロパティ（すべてのインスタンスの合計）
  static totalCount = 0;

  constructor() {
    // インスタンスプロパティ（このインスタンスのカウント）
    this.instanceCount = 0;
  }

  increment() {
    Counter.totalCount++;
    this.instanceCount++;
  }

  static getTotalCount() {
    return Counter.totalCount;
  }
}

const c1 = new Counter();
const c2 = new Counter();

c1.increment();
c1.increment();
c2.increment();

console.log(`c1: ${c1.instanceCount}`); // 2
console.log(`c2: ${c2.instanceCount}`); // 1
console.log(`合計: ${Counter.getTotalCount()}`); // 3
```

**プロトタイプベースとの比較**:

ES6 以前はプロトタイプベースでプロパティを定義していた。

```javascript
// プロトタイプベース（ES5 以前）
function Person(name) {
  this.name = name; // インスタンスプロパティ
}

Person.country = "Japan"; // 静的プロパティ

const person = new Person("Alice");
console.log(person.name); // Alice
console.log(Person.country); // Japan
console.log(person.country); // undefined

// クラス構文（ES6+、推奨）
class Person {
  static country = "Japan";

  constructor(name) {
    this.name = name;
  }
}

const person = new Person("Alice");
console.log(person.name); // Alice
console.log(Person.country); // Japan
console.log(person.country); // undefined
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
type StructName struct {
    FieldName Type
}
```

Go にはクラスはないが、構造体のフィールドを使って同等の機能を実現できる。

**基本的なフィールド定義**:

```go
import "fmt"

// 構造体定義
type Person struct {
    Name string  // フィールド
    Age  int     // フィールド
}

// 使用例
p1 := Person{Name: "Alice", Age: 25}
p2 := Person{Name: "Bob", Age: 30}

// フィールドはインスタンスごとに独立
fmt.Println(p1.Name)  // Alice
fmt.Println(p2.Name)  // Bob
```

**パッケージレベル変数（クラス変数相当）**:

Go には静的フィールドはないが、パッケージレベルの変数で同等の機能を実現できる。

```go
package main

import "fmt"

// パッケージレベル変数（すべてのインスタンスで共有）
var count int = 0

type Person struct {
    Name string
    Age  int
}

func NewPerson(name string, age int) *Person {
    count++  // インスタンス作成のたびにカウント
    return &Person{
        Name: name,
        Age:  age,
    }
}

func GetCount() int {
    return count
}

// 使用例
p1 := NewPerson("Alice", 25)
p2 := NewPerson("Bob", 30)

fmt.Println(p1.Name)     // Alice
fmt.Println(p2.Name)     // Bob
fmt.Println(GetCount())  // 2
```

**エクスポート（public/private）**:

大文字で始まるフィールドはエクスポート（public）、小文字で始まるフィールドはエクスポートされない（private）。

```go
type Person struct {
    Name    string  // エクスポートされる（public）
    age     int     // エクスポートされない（private、パッケージ内のみ）
    Email   string  // エクスポートされる（public）
}

func NewPerson(name string, age int) *Person {
    return &Person{
        Name: name,
        age:  age,
    }
}

// getter
func (p *Person) GetAge() int {
    return p.age
}

// setter
func (p *Person) SetAge(age int) {
    if age >= 0 {
        p.age = age
    }
}

// 使用例
person := NewPerson("Alice", 25)
fmt.Println(person.Name)      // Alice（アクセス可能）
// fmt.Println(person.age)    // コンパイルエラー（同一パッケージ外の場合）
fmt.Println(person.GetAge())  // 25（getter 経由でアクセス）
```

**ポインタとフィールド**:

```go
type Person struct {
    Name string
    Age  int
}

// 値レシーバー
func (p Person) GetName() string {
    return p.Name
}

// ポインタレシーバー（フィールドを変更できる）
func (p *Person) SetAge(age int) {
    p.Age = age
}

person := Person{Name: "Alice", Age: 25}
fmt.Println(person.GetName())  // Alice

person.SetAge(30)
fmt.Println(person.Age)  // 30
```

**埋め込みフィールド**:

```go
type Address struct {
    City    string
    Country string
}

type Person struct {
    Name    string
    Age     int
    Address Address  // 通常のフィールド
}

// 使用例
person := Person{
    Name: "Alice",
    Age:  25,
    Address: Address{
        City:    "Tokyo",
        Country: "Japan",
    },
}

fmt.Println(person.Address.City)  // Tokyo
```

**匿名フィールド（埋め込み）**:

```go
type Address struct {
    City    string
    Country string
}

type Person struct {
    Name    string
    Age     int
    Address  // 匿名フィールド（埋め込み）
}

// 使用例
person := Person{
    Name: "Alice",
    Age:  25,
    Address: Address{
        City:    "Tokyo",
        Country: "Japan",
    },
}

// 埋め込んだ構造体のフィールドに直接アクセス可能
fmt.Println(person.City)     // Tokyo
fmt.Println(person.Country)  // Japan
```

**タグ付きフィールド**:

JSON のシリアライズなどで使用される。

```go
import (
    "encoding/json"
    "fmt"
)

type Person struct {
    Name string `json:"name"`           // JSON のキー名を指定
    Age  int    `json:"age"`
    Email string `json:"email,omitempty"` // 空の場合は省略
}

person := Person{Name: "Alice", Age: 25}

// JSON にシリアライズ
jsonData, _ := json.Marshal(person)
fmt.Println(string(jsonData))  // {"name":"Alice","age":25}
```

**ゼロ値**:

フィールドは初期化しなくても、ゼロ値が設定される。

```go
type DefaultValues struct {
    Number  int     // 0
    Text    string  // ""
    Flag    bool    // false
    Decimal float64 // 0.0
}

dv := DefaultValues{}
fmt.Println(dv.Number)   // 0
fmt.Println(dv.Text)     // ""（空文字列）
fmt.Println(dv.Flag)     // false
fmt.Println(dv.Decimal)  // 0
```

**実用例（カウンター）**:

```go
package main

import "fmt"

// パッケージレベル変数（すべてのインスタンスの合計）
var totalCount int = 0

type Counter struct {
    // インスタンスフィールド（このインスタンスのカウント）
    instanceCount int
}

func NewCounter() *Counter {
    return &Counter{instanceCount: 0}
}

func (c *Counter) Increment() {
    totalCount++
    c.instanceCount++
}

func GetTotalCount() int {
    return totalCount
}

// 使用例
c1 := NewCounter()
c2 := NewCounter()

c1.Increment()
c1.Increment()
c2.Increment()

fmt.Printf("c1: %d\n", c1.instanceCount)  // 2
fmt.Printf("c2: %d\n", c2.instanceCount)  // 1
fmt.Printf("合計: %d\n", GetTotalCount())  // 3
```

**実用例（設定）**:

```go
package config

// パッケージレベル変数（アプリケーション全体で共有）
var (
    AppName = "MyApp"
    Version = "1.0.0"
    Debug   = false
)

type UserConfig struct {
    // インスタンスフィールド（ユーザーごとに独立）
    UserName  string
    SessionID string
}

func NewUserConfig(userName string) *UserConfig {
    return &UserConfig{
        UserName:  userName,
        SessionID: "",
    }
}

// 使用例
config1 := NewUserConfig("Alice")
config2 := NewUserConfig("Bob")

fmt.Println(AppName)           // MyApp
fmt.Println(config1.UserName)  // Alice
fmt.Println(config2.UserName)  // Bob
```

</div>
