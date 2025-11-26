---
title: "コンストラクタ"
date: "2019-10-29T02:37:30+09:00"
excerpt: "コンストラクタについて"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-29T02:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

コンストラクタとは、クラスのインスタンスを作成した時に自動的に実行される特別なメソッドで、主にフィールドの初期化のために使われる。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
public ClassName(args) { }
```

Java では、クラス名と同じ名前のメソッドを定義するとコンストラクタになる。

**基本的なコンストラクタ**:

```java
class Person {
    String name;
    int age;

    // コンストラクタ
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}

// 使用例
Person person = new Person("Alice", 25);
System.out.println(person.name);  // Alice
System.out.println(person.age);   // 25
```

**デフォルトコンストラクタ**:

コンストラクタを定義しない場合、引数なしのデフォルトコンストラクタが自動生成される。

```java
class Person {
    String name;
    int age;
}

// 引数なしで作成可能（デフォルトコンストラクタが使われる）
Person person = new Person();
person.name = "Alice";
person.age = 25;
```

**コンストラクタのオーバーロード**:

引数の数や型を変えて、複数のコンストラクタを定義できる。

```java
class Person {
    String name;
    int age;
    String email;

    // コンストラクタ1: 名前と年齢のみ
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // コンストラクタ2: すべてのフィールドを指定
    public Person(String name, int age, String email) {
        this.name = name;
        this.age = age;
        this.email = email;
    }
}

// 使用例
Person p1 = new Person("Alice", 25);
Person p2 = new Person("Bob", 30, "bob@example.com");
```

**this() による別コンストラクタの呼び出し**:

```java
class Person {
    String name;
    int age;
    String email;

    // コンストラクタ1
    public Person(String name, int age) {
        this(name, age, null);  // コンストラクタ2を呼び出し
    }

    // コンストラクタ2
    public Person(String name, int age, String email) {
        this.name = name;
        this.age = age;
        this.email = email;
    }
}

Person person = new Person("Alice", 25);
System.out.println(person.email);  // null
```

**super() による親クラスのコンストラクタ呼び出し**:

```java
class Animal {
    String name;

    public Animal(String name) {
        this.name = name;
    }
}

class Dog extends Animal {
    String breed;

    public Dog(String name, String breed) {
        super(name);  // 親クラスのコンストラクタを呼び出し
        this.breed = breed;
    }
}

Dog dog = new Dog("ポチ", "柴犬");
System.out.println(dog.name);   // ポチ
System.out.println(dog.breed);  // 柴犬
```

**アクセス修飾子**:

```java
class Person {
    String name;
    int age;

    // public コンストラクタ（どこからでもアクセス可能）
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // private コンストラクタ（クラス内からのみアクセス可能）
    private Person() {
        this.name = "Unknown";
        this.age = 0;
    }

    // Factory メソッド
    public static Person createDefault() {
        return new Person();  // private コンストラクタを呼び出し
    }
}

Person p1 = new Person("Alice", 25);  // OK
// Person p2 = new Person();  // コンパイルエラー（private）
Person p3 = Person.createDefault();   // OK（Factory メソッド経由）
```

**実用例（バリデーション付きコンストラクタ）**:

```java
class Person {
    String name;
    int age;

    public Person(String name, int age) {
        if (name == null || name.isEmpty()) {
            throw new IllegalArgumentException("名前が空です");
        }
        if (age < 0) {
            throw new IllegalArgumentException("年齢が負の数です");
        }
        this.name = name;
        this.age = age;
    }
}

Person person = new Person("Alice", 25);
// Person invalid = new Person("", -1);  // 例外が発生
```

**実用例（ビルダーパターン）**:

```java
class Person {
    String name;
    int age;
    String email;

    private Person(Builder builder) {
        this.name = builder.name;
        this.age = builder.age;
        this.email = builder.email;
    }

    static class Builder {
        String name;
        int age;
        String email;

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
Person person = new Person.Builder()
    .setName("Alice")
    .setAge(25)
    .setEmail("alice@example.com")
    .build();
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
def __init__(self, args):
```

Python では`__init__()`メソッドがコンストラクタの役目を果たす。第 1 引数は必ず`self`にする。

**基本的なコンストラクタ**:

```python
class Person:
    # コンストラクタ
    def __init__(self, name, age):
        self.name = name
        self.age = age

# 使用例
person = Person("Alice", 25)
print(person.name)  # Alice
print(person.age)   # 25
```

**引数なしのコンストラクタ**:

```python
class Person:
    def __init__(self):
        self.name = "Unknown"
        self.age = 0

person = Person()
print(person.name)  # Unknown
print(person.age)   # 0
```

**デフォルト引数**:

```python
class Person:
    def __init__(self, name="Unknown", age=0):
        self.name = name
        self.age = age

# 使用例
p1 = Person("Alice", 25)
p2 = Person("Bob")          # age はデフォルト値 0
p3 = Person()                # すべてデフォルト値

print(p1.name, p1.age)  # Alice 25
print(p2.name, p2.age)  # Bob 0
print(p3.name, p3.age)  # Unknown 0
```

**キーワード引数**:

```python
class Person:
    def __init__(self, name, age, email=None):
        self.name = name
        self.age = age
        self.email = email

# 使用例
person = Person(name="Alice", age=25, email="alice@example.com")
print(person.name)   # Alice
print(person.email)  # alice@example.com
```

**親クラスのコンストラクタ呼び出し**:

```python
class Animal:
    def __init__(self, name):
        self.name = name

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)  # 親クラスのコンストラクタを呼び出し
        self.breed = breed

dog = Dog("ポチ", "柴犬")
print(dog.name)   # ポチ
print(dog.breed)  # 柴犬
```

**クラス変数の初期化**:

```python
class Person:
    # クラス変数
    count = 0

    def __init__(self, name):
        self.name = name
        Person.count += 1  # インスタンス作成のたびにカウント

p1 = Person("Alice")
p2 = Person("Bob")
print(Person.count)  # 2
```

**実用例（バリデーション付きコンストラクタ）**:

```python
class Person:
    def __init__(self, name, age):
        if not name:
            raise ValueError("名前が空です")
        if age < 0:
            raise ValueError("年齢が負の数です")
        self.name = name
        self.age = age

person = Person("Alice", 25)
# invalid = Person("", -1)  # ValueError が発生
```

**実用例（データクラス）**:

```python
from dataclasses import dataclass

@dataclass
class Person:
    name: str
    age: int
    email: str = None  # デフォルト値

# __init__ が自動生成される
person = Person("Alice", 25, "alice@example.com")
print(person.name)  # Alice
```

**実用例（複雑な初期化）**:

```python
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height
        self.area = width * height      # 計算された値
        self.perimeter = 2 * (width + height)

rect = Rectangle(5, 3)
print(rect.area)       # 15
print(rect.perimeter)  # 16
```

\***\*new** メソッド\*\*:

`__init__`の前に呼ばれる、インスタンス作成のメソッド。

```python
class Singleton:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def __init__(self):
        self.value = 0

# 使用例
s1 = Singleton()
s2 = Singleton()
print(s1 is s2)  # True（同じインスタンス）
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
constructor(args) { }
```

JavaScript では`constructor`メソッドがコンストラクタになる（ES6+）。

**基本的なコンストラクタ**:

```javascript
class Person {
  // コンストラクタ
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

// 使用例
const person = new Person("Alice", 25);
console.log(person.name); // Alice
console.log(person.age); // 25
```

**引数なしのコンストラクタ**:

```javascript
class Person {
  constructor() {
    this.name = "Unknown";
    this.age = 0;
  }
}

const person = new Person();
console.log(person.name); // Unknown
console.log(person.age); // 0
```

**デフォルト引数**:

```javascript
class Person {
  constructor(name = "Unknown", age = 0) {
    this.name = name;
    this.age = age;
  }
}

// 使用例
const p1 = new Person("Alice", 25);
const p2 = new Person("Bob"); // age はデフォルト値 0
const p3 = new Person(); // すべてデフォルト値

console.log(`${p1.name} ${p1.age}`); // Alice 25
console.log(`${p2.name} ${p2.age}`); // Bob 0
console.log(`${p3.name} ${p3.age}`); // Unknown 0
```

**親クラスのコンストラクタ呼び出し**:

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // 親クラスのコンストラクタを呼び出し
    this.breed = breed;
  }
}

const dog = new Dog("ポチ", "柴犬");
console.log(dog.name); // ポチ
console.log(dog.breed); // 柴犬
```

**静的プロパティの初期化**:

```javascript
class Person {
  static count = 0; // 静的プロパティ

  constructor(name) {
    this.name = name;
    Person.count++; // インスタンス作成のたびにカウント
  }
}

const p1 = new Person("Alice");
const p2 = new Person("Bob");
console.log(Person.count); // 2
```

**プライベートフィールドの初期化（ES2022+）**:

```javascript
class Person {
  #id; // プライベートフィールド

  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.#id = Math.random(); // プライベートフィールドの初期化
  }

  getId() {
    return this.#id;
  }
}

const person = new Person("Alice", 25);
console.log(person.name); // Alice
console.log(person.getId()); // ランダムな値
```

**実用例（バリデーション付きコンストラクタ）**:

```javascript
class Person {
  constructor(name, age) {
    if (!name) {
      throw new Error("名前が空です");
    }
    if (age < 0) {
      throw new Error("年齢が負の数です");
    }
    this.name = name;
    this.age = age;
  }
}

const person = new Person("Alice", 25);
// const invalid = new Person("", -1);  // Error が発生
```

**実用例（複雑な初期化）**:

```javascript
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.area = width * height; // 計算された値
    this.perimeter = 2 * (width + height);
  }
}

const rect = new Rectangle(5, 3);
console.log(rect.area); // 15
console.log(rect.perimeter); // 16
```

**プロトタイプベースとの比較**:

ES6 以前はプロトタイプベースでコンストラクタを定義していた。

```javascript
// プロトタイプベース（ES5 以前）
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const person1 = new Person("Alice", 25);
console.log(person1.name); // Alice

// クラス構文（ES6+、推奨）
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

const person2 = new Person("Bob", 30);
console.log(person2.name); // Bob
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
func NewStructName(args) *StructName { }
```

Go には専用のコンストラクタはないが、慣例として`New`で始まる関数を作成してコンストラクタのように使う。

**基本的なコンストラクタ関数**:

```go
import "fmt"

type Person struct {
    Name string
    Age  int
}

// コンストラクタ関数
func NewPerson(name string, age int) *Person {
    return &Person{
        Name: name,
        Age:  age,
    }
}

// 使用例
person := NewPerson("Alice", 25)
fmt.Println(person.Name)  // Alice
fmt.Println(person.Age)   // 25
```

**引数なしのコンストラクタ**:

```go
type Person struct {
    Name string
    Age  int
}

func NewPerson() *Person {
    return &Person{
        Name: "Unknown",
        Age:  0,
    }
}

// 使用例
person := NewPerson()
fmt.Println(person.Name)  // Unknown
fmt.Println(person.Age)   // 0
```

**構造体リテラルで直接作成**:

コンストラクタ関数を使わず、直接構造体リテラルで作成することもできる。

```go
// 方法1: フィールド名を指定
person1 := Person{
    Name: "Alice",
    Age:  25,
}

// 方法2: フィールドの順序で指定
person2 := Person{"Bob", 30}

// 方法3: ゼロ値で初期化
person3 := Person{}

fmt.Println(person1.Name)  // Alice
fmt.Println(person3.Name)  // ""（ゼロ値）
```

**プライベートフィールドの初期化**:

```go
type Person struct {
    name string  // エクスポートされない（private）
    age  int
}

// コンストラクタ関数（必須）
func NewPerson(name string, age int) *Person {
    return &Person{
        name: name,
        age:  age,
    }
}

// getter
func (p *Person) GetName() string {
    return p.name
}

// 使用例
person := NewPerson("Alice", 25)
fmt.Println(person.GetName())  // Alice
// fmt.Println(person.name)    // コンパイルエラー（同一パッケージ外の場合）
```

**バリデーション付きコンストラクタ**:

```go
import (
    "errors"
    "fmt"
)

type Person struct {
    Name string
    Age  int
}

func NewPerson(name string, age int) (*Person, error) {
    if name == "" {
        return nil, errors.New("名前が空です")
    }
    if age < 0 {
        return nil, errors.New("年齢が負の数です")
    }
    return &Person{
        Name: name,
        Age:  age,
    }, nil
}

// 使用例
person, err := NewPerson("Alice", 25)
if err != nil {
    fmt.Println("エラー:", err)
} else {
    fmt.Println(person.Name)  // Alice
}

// invalid, err := NewPerson("", -1)  // エラーが返る
```

**デフォルト値を持つコンストラクタ**:

Go には関数のデフォルト引数はないが、構造体リテラルで代用できる。

```go
type Person struct {
    Name  string
    Age   int
    Email string
}

func NewPerson(name string, age int) *Person {
    return &Person{
        Name:  name,
        Age:   age,
        Email: "",  // デフォルト値
    }
}

func NewPersonWithEmail(name string, age int, email string) *Person {
    return &Person{
        Name:  name,
        Age:   age,
        Email: email,
    }
}

// または Functional Options パターン
type PersonOption func(*Person)

func WithEmail(email string) PersonOption {
    return func(p *Person) {
        p.Email = email
    }
}

func NewPersonWithOptions(name string, age int, opts ...PersonOption) *Person {
    p := &Person{
        Name: name,
        Age:  age,
    }
    for _, opt := range opts {
        opt(p)
    }
    return p
}

// 使用例
p1 := NewPersonWithOptions("Alice", 25)
p2 := NewPersonWithOptions("Bob", 30, WithEmail("bob@example.com"))
```

**複雑な初期化**:

```go
type Rectangle struct {
    Width     int
    Height    int
    Area      int
    Perimeter int
}

func NewRectangle(width, height int) *Rectangle {
    return &Rectangle{
        Width:     width,
        Height:    height,
        Area:      width * height,          // 計算された値
        Perimeter: 2 * (width + height),
    }
}

rect := NewRectangle(5, 3)
fmt.Println(rect.Area)       // 15
fmt.Println(rect.Perimeter)  // 16
```

**埋め込みの初期化**:

```go
type Animal struct {
    Name string
}

func NewAnimal(name string) Animal {
    return Animal{Name: name}
}

type Dog struct {
    Animal
    Breed string
}

func NewDog(name, breed string) *Dog {
    return &Dog{
        Animal: NewAnimal(name),  // 埋め込んだ構造体を初期化
        Breed:  breed,
    }
}

dog := NewDog("ポチ", "柴犬")
fmt.Println(dog.Name)   // ポチ
fmt.Println(dog.Breed)  // 柴犬
```

**実用例（シングルトンパターン）**:

```go
import "sync"

type Singleton struct {
    value int
}

var (
    instance *Singleton
    once     sync.Once
)

func GetInstance() *Singleton {
    once.Do(func() {
        instance = &Singleton{value: 0}
    })
    return instance
}

// 使用例
s1 := GetInstance()
s2 := GetInstance()
fmt.Println(s1 == s2)  // true（同じインスタンス）
```

**実用例（Factory パターン）**:

```go
type Shape interface {
    Area() float64
}

type Circle struct {
    Radius float64
}

func (c Circle) Area() float64 {
    return 3.14159 * c.Radius * c.Radius
}

type Rectangle struct {
    Width, Height float64
}

func (r Rectangle) Area() float64 {
    return r.Width * r.Height
}

// Factory 関数
func NewShape(shapeType string, params ...float64) Shape {
    switch shapeType {
    case "circle":
        return Circle{Radius: params[0]}
    case "rectangle":
        return Rectangle{Width: params[0], Height: params[1]}
    default:
        return nil
    }
}

// 使用例
circle := NewShape("circle", 5.0)
rectangle := NewShape("rectangle", 4.0, 3.0)
fmt.Println(circle.Area())     // 78.53975
fmt.Println(rectangle.Area())  // 12
```

</div>
