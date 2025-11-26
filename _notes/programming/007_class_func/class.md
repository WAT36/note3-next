---
title: "クラス"
date: "2019-10-29T00:37:30+09:00"
excerpt: "クラスの定義について"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-29T00:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

クラスを定義する方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
class ClassName { }
```

Java ではクラスを定義するには`class`キーワードを使う。

**基本的なクラス定義**:

```java
// シンプルなクラス
class Person {
    String name;
    int age;
}

// インスタンス作成
Person person = new Person();
person.name = "Alice";
person.age = 25;
```

**コンストラクタ付きクラス**:

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

// インスタンス作成
Person person = new Person("Alice", 25);
System.out.println(person.name);  // Alice
```

**メソッド付きクラス**:

```java
class Person {
    String name;
    int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // メソッド
    public void introduce() {
        System.out.println("私は" + name + "、" + age + "歳です");
    }

    public boolean isAdult() {
        return age >= 20;
    }
}

// 使用例
Person person = new Person("Alice", 25);
person.introduce();  // 私はAlice、25歳です
System.out.println(person.isAdult());  // true
```

**アクセス修飾子**:

```java
public class Person {
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

    // getter
    public int getAge() {
        return age;
    }

    // setter
    public void setAge(int age) {
        if (age >= 0) {
            this.age = age;
        }
    }
}
```

**継承（extends）**:

```java
// 親クラス
class Animal {
    String name;

    public Animal(String name) {
        this.name = name;
    }

    public void speak() {
        System.out.println(name + " が鳴きます");
    }
}

// 子クラス
class Dog extends Animal {
    public Dog(String name) {
        super(name);  // 親クラスのコンストラクタを呼び出し
    }

    @Override
    public void speak() {
        System.out.println(name + " がワンワン鳴きます");
    }
}

// 使用例
Dog dog = new Dog("ポチ");
dog.speak();  // ポチ がワンワン鳴きます
```

**インターフェース（implements）**:

```java
// インターフェース
interface Drawable {
    void draw();
}

// インターフェースを実装
class Circle implements Drawable {
    int radius;

    public Circle(int radius) {
        this.radius = radius;
    }

    @Override
    public void draw() {
        System.out.println("半径 " + radius + " の円を描きます");
    }
}

// 使用例
Circle circle = new Circle(5);
circle.draw();  // 半径 5 の円を描きます
```

**静的メンバー（static）**:

```java
class MathUtil {
    // 静的フィールド
    public static final double PI = 3.14159;

    // 静的メソッド
    public static int add(int a, int b) {
        return a + b;
    }
}

// インスタンス化せずに使用
System.out.println(MathUtil.PI);        // 3.14159
System.out.println(MathUtil.add(5, 3)); // 8
```

**内部クラス**:

```java
class Outer {
    private String message = "外部クラス";

    class Inner {
        public void display() {
            System.out.println(message);  // 外部クラスのフィールドにアクセス可能
        }
    }
}

// 使用例
Outer outer = new Outer();
Outer.Inner inner = outer.new Inner();
inner.display();  // 外部クラス
```

**レコード（Java 14+）**:

不変のデータクラスを簡潔に定義できる。

```java
// レコード
record Person(String name, int age) {}

// 使用例
Person person = new Person("Alice", 25);
System.out.println(person.name());  // Alice
System.out.println(person.age());   // 25
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
class ClassName:
```

Python ではクラスを定義するには`class`キーワードを使う。

**基本的なクラス定義**:

```python
# シンプルなクラス
class Person:
    pass

# インスタンス作成
person = Person()
person.name = "Alice"
person.age = 25
```

**コンストラクタ付きクラス（**init**）**:

```python
class Person:
    # コンストラクタ
    def __init__(self, name, age):
        self.name = name
        self.age = age

# インスタンス作成
person = Person("Alice", 25)
print(person.name)  # Alice
```

**メソッド付きクラス**:

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    # メソッド
    def introduce(self):
        print(f"私は{self.name}、{self.age}歳です")

    def is_adult(self):
        return self.age >= 20

# 使用例
person = Person("Alice", 25)
person.introduce()  # 私はAlice、25歳です
print(person.is_adult())  # True
```

**アクセス制御**:

Python では真の private はないが、命名規則で示す。

```python
class Person:
    def __init__(self, name, age):
        self.name = name          # public（通常の属性）
        self._email = ""          # protected（慣例）
        self.__password = ""      # private（名前マングリング）

    # getter
    def get_password(self):
        return self.__password

    # setter
    def set_password(self, password):
        if len(password) >= 8:
            self.__password = password

person = Person("Alice", 25)
print(person.name)      # Alice（アクセス可能）
print(person._email)    # （アクセス可能だが推奨されない）
# print(person.__password)  # AttributeError
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

# 使用例
person = Person("Alice", 25)
print(person.age)   # 25（getter が呼ばれる）
person.age = 30     # setter が呼ばれる
print(person.age)   # 30
```

**継承**:

```python
# 親クラス
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        print(f"{self.name} が鳴きます")

# 子クラス
class Dog(Animal):
    def __init__(self, name):
        super().__init__(name)  # 親クラスのコンストラクタを呼び出し

    def speak(self):
        """メソッドのオーバーライド"""
        print(f"{self.name} がワンワン鳴きます")

# 使用例
dog = Dog("ポチ")
dog.speak()  # ポチ がワンワン鳴きます
```

**多重継承**:

Python は多重継承をサポートする。

```python
class Flyable:
    def fly(self):
        print("飛びます")

class Swimmable:
    def swim(self):
        print("泳ぎます")

class Duck(Flyable, Swimmable):
    def __init__(self, name):
        self.name = name

# 使用例
duck = Duck("ドナルド")
duck.fly()   # 飛びます
duck.swim()  # 泳ぎます
```

**クラスメソッド（@classmethod）**:

```python
class Person:
    count = 0  # クラス変数

    def __init__(self, name):
        self.name = name
        Person.count += 1

    @classmethod
    def get_count(cls):
        return cls.count

# 使用例
person1 = Person("Alice")
person2 = Person("Bob")
print(Person.get_count())  # 2
```

**静的メソッド（@staticmethod）**:

```python
class MathUtil:
    @staticmethod
    def add(a, b):
        return a + b

    @staticmethod
    def multiply(a, b):
        return a * b

# インスタンス化せずに使用
print(MathUtil.add(5, 3))       # 8
print(MathUtil.multiply(4, 5))  # 20
```

**データクラス（@dataclass、Python 3.7+）**:

```python
from dataclasses import dataclass

@dataclass
class Person:
    name: str
    age: int

# 使用例
person = Person("Alice", 25)
print(person.name)  # Alice
print(person)       # Person(name='Alice', age=25)
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
class ClassName {}
```

JavaScript ではクラスを定義するには`class`キーワードを使う（ES6+）。

**基本的なクラス定義**:

```javascript
// シンプルなクラス
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

// インスタンス作成
const person = new Person("Alice", 25);
console.log(person.name); // Alice
```

**メソッド付きクラス**:

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  // メソッド
  introduce() {
    console.log(`私は${this.name}、${this.age}歳です`);
  }

  isAdult() {
    return this.age >= 20;
  }
}

// 使用例
const person = new Person("Alice", 25);
person.introduce(); // 私はAlice、25歳です
console.log(person.isAdult()); // true
```

**プライベートフィールド（#、ES2022+）**:

```javascript
class Person {
  #password; // プライベートフィールド

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

// 使用例
const person = new Person("Alice", 25);
console.log(person.age); // 25（getter が呼ばれる）
person.age = 30; // setter が呼ばれる
console.log(person.age); // 30
```

**継承（extends）**:

```javascript
// 親クラス
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} が鳴きます`);
  }
}

// 子クラス
class Dog extends Animal {
  constructor(name) {
    super(name); // 親クラスのコンストラクタを呼び出し
  }

  speak() {
    // メソッドのオーバーライド
    console.log(`${this.name} がワンワン鳴きます`);
  }
}

// 使用例
const dog = new Dog("ポチ");
dog.speak(); // ポチ がワンワン鳴きます
```

**静的メソッド（static）**:

```javascript
class MathUtil {
  // 静的メソッド
  static add(a, b) {
    return a + b;
  }

  static multiply(a, b) {
    return a * b;
  }
}

// インスタンス化せずに使用
console.log(MathUtil.add(5, 3)); // 8
console.log(MathUtil.multiply(4, 5)); // 20
```

**静的フィールド（static、ES2022+）**:

```javascript
class MathUtil {
  static PI = 3.14159; // 静的フィールド

  static calculateCircleArea(radius) {
    return this.PI * radius * radius;
  }
}

// 使用例
console.log(MathUtil.PI); // 3.14159
console.log(MathUtil.calculateCircleArea(5)); // 78.53975
```

**プロトタイプベースとの比較**:

ES6 以前はプロトタイプベースでクラスを定義していた。

```javascript
// プロトタイプベース（ES5以前）
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.introduce = function () {
  console.log("私は" + this.name + "、" + this.age + "歳です");
};

// クラス構文（ES6+、推奨）
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  introduce() {
    console.log(`私は${this.name}、${this.age}歳です`);
  }
}
```

**実用例（カウンタークラス）**:

```javascript
class Counter {
  constructor(initialValue = 0) {
    this.value = initialValue;
  }

  increment() {
    this.value++;
    return this.value;
  }

  decrement() {
    this.value--;
    return this.value;
  }

  reset() {
    this.value = 0;
  }
}

const counter = new Counter(10);
console.log(counter.increment()); // 11
console.log(counter.increment()); // 12
console.log(counter.decrement()); // 11
counter.reset();
console.log(counter.value); // 0
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
type StructName struct { }
```

Go にはクラスはないが、構造体（struct）とメソッドを使って同等の機能を実現できる。

**基本的な構造体定義**:

```go
import "fmt"

// 構造体定義
type Person struct {
    Name string
    Age  int
}

// インスタンス作成
person := Person{
    Name: "Alice",
    Age:  25,
}

fmt.Println(person.Name)  // Alice
```

**メソッド付き構造体**:

```go
import "fmt"

type Person struct {
    Name string
    Age  int
}

// メソッド
func (p Person) Introduce() {
    fmt.Printf("私は%s、%d歳です\n", p.Name, p.Age)
}

func (p Person) IsAdult() bool {
    return p.Age >= 20
}

// 使用例
person := Person{Name: "Alice", Age: 25}
person.Introduce()  // 私はAlice、25歳です
fmt.Println(person.IsAdult())  // true
```

**ポインタレシーバー**:

値を変更する場合はポインタレシーバーを使う。

```go
type Counter struct {
    Value int
}

// 値レシーバー（変更されない）
func (c Counter) GetValue() int {
    return c.Value
}

// ポインタレシーバー（変更される）
func (c *Counter) Increment() {
    c.Value++
}

func (c *Counter) Decrement() {
    c.Value--
}

// 使用例
counter := Counter{Value: 10}
counter.Increment()
fmt.Println(counter.Value)  // 11
```

**コンストラクタ関数**:

Go には専用のコンストラクタはないが、慣例として`New`で始まる関数を作成する。

```go
type Person struct {
    name string  // 小文字で開始（エクスポートされない）
    age  int
}

// コンストラクタ関数
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

// setter
func (p *Person) SetAge(age int) {
    if age >= 0 {
        p.age = age
    }
}

// 使用例
person := NewPerson("Alice", 25)
fmt.Println(person.GetName())  // Alice
```

**埋め込み（Embedding）による継承的な機能**:

Go には継承はないが、埋め込みで同等の機能を実現できる。

```go
// 親構造体
type Animal struct {
    Name string
}

func (a Animal) Speak() {
    fmt.Printf("%s が鳴きます\n", a.Name)
}

// 子構造体（Animal を埋め込む）
type Dog struct {
    Animal  // 埋め込み
}

func (d Dog) Speak() {
    fmt.Printf("%s がワンワン鳴きます\n", d.Name)
}

// 使用例
dog := Dog{Animal: Animal{Name: "ポチ"}}
dog.Speak()  // ポチ がワンワン鳴きます
```

**インターフェース**:

Go ではインターフェースを使って多態性を実現する。

```go
// インターフェース
type Speaker interface {
    Speak()
}

type Dog struct {
    Name string
}

func (d Dog) Speak() {
    fmt.Printf("%s がワンワン鳴きます\n", d.Name)
}

type Cat struct {
    Name string
}

func (c Cat) Speak() {
    fmt.Printf("%s がニャーニャー鳴きます\n", c.Name)
}

// インターフェース型で受け取る関数
func MakeSpeak(s Speaker) {
    s.Speak()
}

// 使用例
dog := Dog{Name: "ポチ"}
cat := Cat{Name: "タマ"}

MakeSpeak(dog)  // ポチ がワンワン鳴きます
MakeSpeak(cat)  // タマ がニャーニャー鳴きます
```

**エクスポート（public/private）**:

Go では、大文字で始まる識別子はエクスポート（public）、小文字で始まる識別子はエクスポートされない（private）。

```go
type Person struct {
    Name    string  // エクスポートされる（public）
    age     int     // エクスポートされない（private）
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
```

**ジェネリック構造体（Go 1.18+）**:

```go
// ジェネリック構造体
type Box[T any] struct {
    Value T
}

func (b *Box[T]) Set(value T) {
    b.Value = value
}

func (b *Box[T]) Get() T {
    return b.Value
}

// 使用例
intBox := Box[int]{Value: 42}
fmt.Println(intBox.Get())  // 42

stringBox := Box[string]{Value: "Hello"}
fmt.Println(stringBox.Get())  // Hello
```

**実用例（カウンタークラス的な構造体）**:

```go
type Counter struct {
    value int
}

func NewCounter(initialValue int) *Counter {
    return &Counter{value: initialValue}
}

func (c *Counter) Increment() int {
    c.value++
    return c.value
}

func (c *Counter) Decrement() int {
    c.value--
    return c.value
}

func (c *Counter) Reset() {
    c.value = 0
}

func (c *Counter) GetValue() int {
    return c.value
}

// 使用例
counter := NewCounter(10)
fmt.Println(counter.Increment())  // 11
fmt.Println(counter.Increment())  // 12
fmt.Println(counter.Decrement())  // 11
counter.Reset()
fmt.Println(counter.GetValue())   // 0
```

</div>
