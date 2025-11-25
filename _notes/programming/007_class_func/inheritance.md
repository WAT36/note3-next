---
title: "継承"
date: "2019-10-29T03:37:30+09:00"
excerpt: "継承について"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-29T03:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

**継承**とは、既存のクラスの構造（フィールドやメソッド）を受け継ぎ、そこに新しい機能を追加したり変更したりして新しいクラスを定義すること。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
class SubClass extends SuperClass
```

Java では`extends`キーワードを使ってクラスを継承する。

**基本的な継承**:

```java
// 親クラス（スーパークラス）
class Animal {
    String name;

    public Animal(String name) {
        this.name = name;
    }

    public void speak() {
        System.out.println(name + " が鳴きます");
    }
}

// 子クラス（サブクラス）
class Dog extends Animal {
    String breed;

    public Dog(String name, String breed) {
        super(name);  // 親クラスのコンストラクタを呼び出し
        this.breed = breed;
    }

    public void fetch() {
        System.out.println(name + " がボールを取ってきます");
    }
}

// 使用例
Dog dog = new Dog("ポチ", "柴犬");
dog.speak();  // ポチ が鳴きます（親クラスのメソッド）
dog.fetch();  // ポチ がボールを取ってきます（子クラスのメソッド）
```

**メソッドのオーバーライド**:

子クラスで親クラスのメソッドを再定義できる。

```java
class Animal {
    String name;

    public Animal(String name) {
        this.name = name;
    }

    public void speak() {
        System.out.println(name + " が鳴きます");
    }
}

class Dog extends Animal {
    public Dog(String name) {
        super(name);
    }

    // メソッドのオーバーライド
    @Override
    public void speak() {
        System.out.println(name + " がワンワン鳴きます");
    }
}

Dog dog = new Dog("ポチ");
dog.speak();  // ポチ がワンワン鳴きます（オーバーライドされたメソッド）
```

**super でスーパークラスのメソッドを呼び出し**:

```java
class Animal {
    String name;

    public Animal(String name) {
        this.name = name;
    }

    public void introduce() {
        System.out.println("名前は " + name + " です");
    }
}

class Dog extends Animal {
    String breed;

    public Dog(String name, String breed) {
        super(name);
        this.breed = breed;
    }

    @Override
    public void introduce() {
        super.introduce();  // 親クラスのメソッドを呼び出し
        System.out.println("犬種は " + breed + " です");
    }
}

Dog dog = new Dog("ポチ", "柴犬");
dog.introduce();
// 出力:
// 名前は ポチ です
// 犬種は 柴犬 です
```

**アクセス制御と継承**:

```java
class Animal {
    public String name;       // public: サブクラスからアクセス可能
    protected int age;        // protected: サブクラスからアクセス可能
    private String id;        // private: サブクラスからアクセス不可

    public Animal(String name, int age) {
        this.name = name;
        this.age = age;
        this.id = "ID-" + name;
    }

    protected String getId() {
        return id;
    }
}

class Dog extends Animal {
    public Dog(String name, int age) {
        super(name, age);
    }

    public void display() {
        System.out.println(name);    // OK（public）
        System.out.println(age);     // OK（protected）
        // System.out.println(id);   // コンパイルエラー（private）
        System.out.println(getId()); // OK（protected メソッド経由）
  }
}
```

**final クラスとメソッド**:

```java
// final クラス（継承不可）
final class FinalClass {
    // このクラスは継承できない
}

// class SubClass extends FinalClass { }  // コンパイルエラー

class Animal {
    // final メソッド（オーバーライド不可）
    public final void breathe() {
        System.out.println("呼吸します");
    }
}

class Dog extends Animal {
    // @Override
    // public void breathe() { }  // コンパイルエラー（final メソッド）
}
```

**抽象クラス**:

```java
// 抽象クラス
abstract class Animal {
    String name;

    public Animal(String name) {
        this.name = name;
    }

    // 抽象メソッド（サブクラスで実装が必須）
    public abstract void speak();

    // 通常のメソッド
    public void sleep() {
        System.out.println(name + " が眠ります");
    }
}

class Dog extends Animal {
    public Dog(String name) {
        super(name);
    }

    // 抽象メソッドを実装
    @Override
    public void speak() {
        System.out.println(name + " がワンワン鳴きます");
    }
}

Dog dog = new Dog("ポチ");
dog.speak();  // ポチ がワンワン鳴きます
dog.sleep();  // ポチ が眠ります
```

**実用例（図形の階層）**:

```java
class Shape {
    protected String color;

    public Shape(String color) {
        this.color = color;
    }

    public void display() {
        System.out.println(color + " の図形");
    }
}

class Circle extends Shape {
    private double radius;

    public Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }

    public double getArea() {
        return Math.PI * radius * radius;
    }

    @Override
    public void display() {
        System.out.println(color + " の半径 " + radius + " の円");
    }
}

Circle circle = new Circle("赤", 5.0);
circle.display();  // 赤 の半径 5.0 の円
System.out.println("面積: " + circle.getArea());  // 面積: 78.53...
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
class SubClass(SuperClass):
```

Python ではクラス名の後の括弧内に親クラスを指定して継承する。

**基本的な継承**:

```python
# 親クラス
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        print(f"{self.name} が鳴きます")

# 子クラス
class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)  # 親クラスのコンストラクタを呼び出し
        self.breed = breed

    def fetch(self):
        print(f"{self.name} がボールを取ってきます")

# 使用例
dog = Dog("ポチ", "柴犬")
dog.speak()  # ポチ が鳴きます（親クラスのメソッド）
dog.fetch()  # ポチ がボールを取ってきます（子クラスのメソッド）
```

**メソッドのオーバーライド**:

子クラスで親クラスのメソッドを再定義できる。

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        print(f"{self.name} が鳴きます")

class Dog(Animal):
    def __init__(self, name):
        super().__init__(name)

    # メソッドのオーバーライド
    def speak(self):
        print(f"{self.name} がワンワン鳴きます")

dog = Dog("ポチ")
dog.speak()  # ポチ がワンワン鳴きます（オーバーライドされたメソッド）
```

**super() で親クラスのメソッドを呼び出し**:

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def introduce(self):
        print(f"名前は {self.name} です")

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)
        self.breed = breed

    def introduce(self):
        super().introduce()  # 親クラスのメソッドを呼び出し
        print(f"犬種は {self.breed} です")

dog = Dog("ポチ", "柴犬")
dog.introduce()
# 出力:
# 名前は ポチ です
# 犬種は 柴犬 です
```

**多重継承**:

Python は複数のクラスから継承できる。

```python
class Flyable:
    def fly(self):
        print("飛びます")

class Swimmable:
    def swim(self):
        print("泳ぎます")

# 多重継承
class Duck(Flyable, Swimmable):
    def __init__(self, name):
        self.name = name

duck = Duck("ドナルド")
duck.fly()   # 飛びます
duck.swim()  # 泳ぎます
```

**MRO（メソッド解決順序）**:

多重継承時、メソッドの探索順序は MRO（Method Resolution Order）で決まる。

```python
class A:
    def method(self):
        print("A のメソッド")

class B(A):
    def method(self):
        print("B のメソッド")

class C(A):
    def method(self):
        print("C のメソッド")

class D(B, C):
    pass

d = D()
d.method()  # B のメソッド（B → C → A の順で探索）

# MRO を確認
print(D.__mro__)
# (<class 'D'>, <class 'B'>, <class 'C'>, <class 'A'>, <class 'object'>)
```

**抽象クラス（ABC）**:

```python
from abc import ABC, abstractmethod

# 抽象クラス
class Animal(ABC):
    def __init__(self, name):
        self.name = name

    # 抽象メソッド（サブクラスで実装が必須）
    @abstractmethod
    def speak(self):
        pass

    # 通常のメソッド
    def sleep(self):
        print(f"{self.name} が眠ります")

class Dog(Animal):
    def __init__(self, name):
        super().__init__(name)

    # 抽象メソッドを実装
    def speak(self):
        print(f"{self.name} がワンワン鳴きます")

dog = Dog("ポチ")
dog.speak()  # ポチ がワンワン鳴きます
dog.sleep()  # ポチ が眠ります
```

**実用例（図形の階層）**:

```python
class Shape:
    def __init__(self, color):
        self.color = color

    def display(self):
        print(f"{self.color} の図形")

class Circle(Shape):
    def __init__(self, color, radius):
        super().__init__(color)
        self.radius = radius

    def get_area(self):
        return 3.14159 * self.radius ** 2

    def display(self):
        print(f"{self.color} の半径 {self.radius} の円")

circle = Circle("赤", 5.0)
circle.display()  # 赤 の半径 5.0 の円
print(f"面積: {circle.get_area()}")  # 面積: 78.53...
```

**isinstance() と issubclass()**:

```python
class Animal:
    pass

class Dog(Animal):
    pass

dog = Dog()

# インスタンスチェック
print(isinstance(dog, Dog))     # True
print(isinstance(dog, Animal))  # True（親クラスも True）

# サブクラスチェック
print(issubclass(Dog, Animal))  # True
print(issubclass(Animal, Dog))  # False
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
class SubClass extends SuperClass
```

JavaScript では`extends`キーワードを使ってクラスを継承する（ES6+）。

**基本的な継承**:

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
  constructor(name, breed) {
    super(name); // 親クラスのコンストラクタを呼び出し
    this.breed = breed;
  }

  fetch() {
    console.log(`${this.name} がボールを取ってきます`);
  }
}

// 使用例
const dog = new Dog("ポチ", "柴犬");
dog.speak(); // ポチ が鳴きます（親クラスのメソッド）
dog.fetch(); // ポチ がボールを取ってきます（子クラスのメソッド）
```

**メソッドのオーバーライド**:

子クラスで親クラスのメソッドを再定義できる。

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} が鳴きます`);
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name);
  }

  // メソッドのオーバーライド
  speak() {
    console.log(`${this.name} がワンワン鳴きます`);
  }
}

const dog = new Dog("ポチ");
dog.speak(); // ポチ がワンワン鳴きます（オーバーライドされたメソッド）
```

**super で親クラスのメソッドを呼び出し**:

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  introduce() {
    console.log(`名前は ${this.name} です`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }

  introduce() {
    super.introduce(); // 親クラスのメソッドを呼び出し
    console.log(`犬種は ${this.breed} です`);
  }
}

const dog = new Dog("ポチ", "柴犬");
dog.introduce();
// 出力:
// 名前は ポチ です
// 犬種は 柴犬 です
```

**getter/setter の継承**:

```javascript
class Person {
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }
}

class Student extends Person {
  constructor(name, grade) {
    super(name);
    this._grade = grade;
  }

  get grade() {
    return this._grade;
  }
}

const student = new Student("Alice", 3);
console.log(student.name); // Alice（親クラスの getter）
console.log(student.grade); // 3（子クラスの getter）
```

**静的メソッドの継承**:

```javascript
class Animal {
  static getKingdom() {
    return "動物界";
  }
}

class Dog extends Animal {
  static getSpecies() {
    return "イヌ科";
  }
}

// 静的メソッドも継承される
console.log(Dog.getKingdom()); // 動物界
console.log(Dog.getSpecies()); // イヌ科
```

**実用例（図形の階層）**:

```javascript
class Shape {
  constructor(color) {
    this.color = color;
  }

  display() {
    console.log(`${this.color} の図形`);
  }
}

class Circle extends Shape {
  constructor(color, radius) {
    super(color);
    this.radius = radius;
  }

  getArea() {
    return Math.PI * this.radius ** 2;
  }

  display() {
    console.log(`${this.color} の半径 ${this.radius} の円`);
  }
}

const circle = new Circle("赤", 5.0);
circle.display(); // 赤 の半径 5 の円
console.log(`面積: ${circle.getArea()}`); // 面積: 78.53...
```

**instanceof 演算子**:

```javascript
class Animal {}
class Dog extends Animal {}

const dog = new Dog();

// インスタンスチェック
console.log(dog instanceof Dog); // true
console.log(dog instanceof Animal); // true（親クラスも true）
console.log(dog instanceof Object); // true（すべてのオブジェクトは Object を継承）
```

**プロトタイプベースとの比較**:

ES6 以前はプロトタイプチェーンで継承を実現していた。

```javascript
// プロトタイプベース（ES5 以前）
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function () {
  console.log(this.name + " が鳴きます");
};

function Dog(name, breed) {
  Animal.call(this, name); // 親コンストラクタを呼び出し
  this.breed = breed;
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

const dog1 = new Dog("ポチ", "柴犬");
dog1.speak(); // ポチ が鳴きます

// クラス構文（ES6+、推奨）
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} が鳴きます`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
}

const dog2 = new Dog("ポチ", "柴犬");
dog2.speak(); // ポチ が鳴きます
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
// 埋め込みによる継承的な機能
type SubStruct struct {
    SuperStruct
}
```

Go には継承はないが、構造体の埋め込み（Embedding）で同等の機能を実現できる。

**基本的な埋め込み**:

```go
import "fmt"

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
    Breed   string
}

func (d Dog) Fetch() {
    fmt.Printf("%s がボールを取ってきます\n", d.Name)
}

// 使用例
dog := Dog{
    Animal: Animal{Name: "ポチ"},
    Breed:  "柴犬",
}
dog.Speak()  // ポチ が鳴きます（埋め込んだ構造体のメソッド）
dog.Fetch()  // ポチ がボールを取ってきます（Dog のメソッド）
```

**メソッドのオーバーライド**:

埋め込んだ構造体と同じ名前のメソッドを定義すると、オーバーライドできる。

```go
type Animal struct {
    Name string
}

func (a Animal) Speak() {
    fmt.Printf("%s が鳴きます\n", a.Name)
}

type Dog struct {
    Animal
}

// メソッドのオーバーライド
func (d Dog) Speak() {
    fmt.Printf("%s がワンワン鳴きます\n", d.Name)
}

dog := Dog{Animal: Animal{Name: "ポチ"}}
dog.Speak()  // ポチ がワンワン鳴きます（オーバーライドされたメソッド）
```

**埋め込んだメソッドの呼び出し**:

```go
type Animal struct {
    Name string
}

func (a Animal) Introduce() {
    fmt.Printf("名前は %s です\n", a.Name)
}

type Dog struct {
    Animal
    Breed string
}

func (d Dog) Introduce() {
    d.Animal.Introduce()  // 埋め込んだ構造体のメソッドを呼び出し
    fmt.Printf("犬種は %s です\n", d.Breed)
}

dog := Dog{
    Animal: Animal{Name: "ポチ"},
    Breed:  "柴犬",
}
dog.Introduce()
// 出力:
// 名前は ポチ です
// 犬種は 柴犬 です
```

**複数の構造体の埋め込み（多重継承的な機能）**:

```go
type Flyable struct{}

func (f Flyable) Fly() {
    fmt.Println("飛びます")
}

type Swimmable struct{}

func (s Swimmable) Swim() {
    fmt.Println("泳ぎます")
}

// 複数の構造体を埋め込む
type Duck struct {
    Flyable
    Swimmable
    Name string
}

duck := Duck{Name: "ドナルド"}
duck.Fly()   // 飛びます
duck.Swim()  // 泳ぎます
```

**インターフェースを使った多態性**:

Go では、インターフェースを使って多態性を実現することが多い。

```go
// インターフェース
type Speaker interface {
    Speak()
}

type Animal struct {
    Name string
}

func (a Animal) Speak() {
    fmt.Printf("%s が鳴きます\n", a.Name)
}

type Dog struct {
    Animal
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
dog := Dog{Animal: Animal{Name: "ポチ"}}
cat := Cat{Name: "タマ"}

MakeSpeak(dog)  // ポチ がワンワン鳴きます
MakeSpeak(cat)  // タマ がニャーニャー鳴きます
```

**フィールドの昇格（Field Promotion）**:

埋め込んだ構造体のフィールドに直接アクセスできる。

```go
type Animal struct {
    Name string
    Age  int
}

type Dog struct {
    Animal
    Breed string
}

dog := Dog{
    Animal: Animal{
        Name: "ポチ",
        Age:  3,
    },
    Breed: "柴犬",
}

// フィールドの昇格により、直接アクセス可能
fmt.Println(dog.Name)   // ポチ
fmt.Println(dog.Age)    // 3
fmt.Println(dog.Breed)  // 柴犬

// 明示的にアクセスすることもできる
fmt.Println(dog.Animal.Name)  // ポチ
```

**実用例（図形の階層）**:

```go
type Shape struct {
    Color string
}

func (s Shape) Display() {
    fmt.Printf("%s の図形\n", s.Color)
}

type Circle struct {
    Shape
    Radius float64
}

func (c Circle) GetArea() float64 {
    return 3.14159 * c.Radius * c.Radius
}

func (c Circle) Display() {
    fmt.Printf("%s の半径 %.1f の円\n", c.Color, c.Radius)
}

circle := Circle{
    Shape:  Shape{Color: "赤"},
    Radius: 5.0,
}
circle.Display()  // 赤 の半径 5.0 の円
fmt.Printf("面積: %.2f\n", circle.GetArea())  // 面積: 78.54
```

**型アサーション**:

```go
type Animal struct {
    Name string
}

type Dog struct {
    Animal
    Breed string
}

// インターフェース型で受け取る
var animal interface{} = Dog{
    Animal: Animal{Name: "ポチ"},
    Breed:  "柴犬",
}

// 型アサーション
if dog, ok := animal.(Dog); ok {
    fmt.Println(dog.Name)   // ポチ
    fmt.Println(dog.Breed)  // 柴犬
}
```

**継承と埋め込みの違い**:

Go の埋め込みは継承とは異なる。埋め込んだ構造体は独立したフィールドとして存在する。

```go
type Animal struct {
    Name string
}

type Dog struct {
    Animal
    Name string  // Animal.Name と別のフィールド
}

dog := Dog{
    Animal: Animal{Name: "動物の名前"},
    Name:   "犬の名前",
}

fmt.Println(dog.Name)        // 犬の名前（Dog.Name が優先）
fmt.Println(dog.Animal.Name) // 動物の名前（明示的にアクセス）
```

</div>
