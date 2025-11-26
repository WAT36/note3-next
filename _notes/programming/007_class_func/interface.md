---
title: "インターフェース・抽象クラス"
excerpt: "インターフェース・抽象クラスについて"
tag: ["Go", "Java", "Python", "Javascript"]
programming: ["Go", "Java", "Python", "Javascript"]
date: '2025-11-25T00:12:01.000Z'
updatedAt: '2025-11-25T00:12:01.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

インターフェース・抽象クラスについて説明する。

**インターフェースとは**:

複数の型に共通するメソッドの集合を抽象的に定義するもの。実装の詳細を隠蔽し、共通の振る舞いを定義することで、ポリモーフィズム（多態性）を実現する。

**インターフェースの利点**:

1. **抽象化**: 実装の詳細を隠蔽し、共通のインターフェースで扱える
2. **柔軟性**: 異なる型を同じインターフェースで扱える
3. **テスタビリティ**: モックやスタブを作りやすい
4. **疎結合**: 具体的な型に依存しない設計

各言語でインターフェースの扱い方が異なる。

<div class="note_content_by_programming_language" id="note_content_Go">

```go
type InterfaceName interface {
    MethodName() ReturnType
}
```

Go では **interface** で、複数の型に共通するメソッドの集合を定義する。暗黙的な実装（明示的に `implements` と書かない）が特徴。

**インターフェースの定義**:

```go
type Animal interface {
    Speak() string
    Move() string
}
```

**インターフェースの実装**:

Go では、明示的に「このインターフェースを実装します」と宣言しない。必要なメソッドを持っていれば、自動的にインターフェースを満たす（**構造的部分型**）。

```go
package main

import "fmt"

type Animal interface {
    Speak() string
}

type Dog struct {
    Name string
}

// Dog が Animal インターフェースを実装
func (d Dog) Speak() string {
    return "Woof!"
}

type Cat struct {
    Name string
}

// Cat も Animal インターフェースを実装
func (c Cat) Speak() string {
    return "Meow!"
}

// Animal インターフェースを受け取る関数
func MakeItSpeak(a Animal) {
    fmt.Println(a.Speak())
}

func main() {
    dog := Dog{Name: "Pochi"}
    cat := Cat{Name: "Tama"}

    MakeItSpeak(dog)  // "Woof!"
    MakeItSpeak(cat)  // "Meow!"

    // インターフェース型の変数に代入
    var animal Animal
    animal = dog
    fmt.Println(animal.Speak())  // "Woof!"

    animal = cat
    fmt.Println(animal.Speak())  // "Meow!"
}
```

**重要**: Go では明示的に「implements」とは書かない。メソッドがあれば自動的にインターフェースを満たす。

**空のインターフェース（any）**:

メソッドを持たないインターフェースは、すべての型を受け入れる。

```go
// Go 1.18+（推奨）
var x any
x = 42
x = "hello"
x = []int{1, 2, 3}

// Go 1.17 以前
var y interface{}
y = 42
y = "hello"
```

**標準ライブラリのインターフェース**:

### **error インターフェース**

```go
type error interface {
    Error() string
}

// カスタムエラーの実装
type MyError struct {
    Message string
    Code    int
}

func (e *MyError) Error() string {
    return fmt.Sprintf("[%d] %s", e.Code, e.Message)
}

func doSomething() error {
    return &MyError{Message: "エラーが発生しました", Code: 1234}
}

func main() {
    err := doSomething()
    if err != nil {
        fmt.Println(err.Error())  // "[1234] エラーが発生しました"
    }
}
```

### **fmt.Stringer インターフェース**

```go
type Stringer interface {
    String() string
}

type User struct {
    Name string
    Age  int
}

func (u User) String() string {
    return fmt.Sprintf("%s (%d歳)", u.Name, u.Age)
}

func main() {
    user := User{Name: "Alice", Age: 25}
    fmt.Println(user)  // "Alice (25歳)"（String() が自動的に呼ばれる）
}
```

### **io.Reader と io.Writer**

```go
type Reader interface {
    Read(p []byte) (n int, err error)
}

type Writer interface {
    Write(p []byte) (n int, err error)
}

// ファイル、ネットワークなど様々な型が実装している
```

**インターフェースの埋め込み**:

インターフェース内に別のインターフェースを埋め込める。

```go
type Reader interface {
    Read(p []byte) (n int, err error)
}

type Writer interface {
    Write(p []byte) (n int, err error)
}

// Reader と Writer を埋め込む
type ReadWriter interface {
    Reader
    Writer
}

// 上記は以下と同じ
type ReadWriter interface {
    Read(p []byte) (n int, err error)
    Write(p []byte) (n int, err error)
}
```

**型アサーション（Type Assertion）**:

インターフェース型から具体的な型に変換する。

```go
var a Animal = Dog{Name: "Pochi"}

// 型アサーション（値, ok パターン）
dog, ok := a.(Dog)
if ok {
    fmt.Println("Dog:", dog.Name)  // "Dog: Pochi"
}

// 型アサーション（ok なし、失敗時にパニック）
dog2 := a.(Dog)
fmt.Println(dog2.Name)  // "Pochi"

// 失敗例
cat := Cat{Name: "Tama"}
var a2 Animal = cat
// dog3 := a2.(Dog)  // panic: interface conversion
```

**型スイッチ（Type Switch）**:

インターフェース型の実際の型に応じて処理を分ける。

```go
func describe(a Animal) {
    switch v := a.(type) {
    case Dog:
        fmt.Printf("犬: %s\n", v.Name)
    case Cat:
        fmt.Printf("猫: %s\n", v.Name)
    default:
        fmt.Printf("未知の動物: %T\n", v)
    }
}

func main() {
    describe(Dog{Name: "Pochi"})  // "犬: Pochi"
    describe(Cat{Name: "Tama"})   // "猫: Tama"
}
```

**複数のインターフェースを実装**:

1 つの型が複数のインターフェースを実装できる。

```go
type Speaker interface {
    Speak() string
}

type Mover interface {
    Move() string
}

type Dog struct {
    Name string
}

// Speaker を実装
func (d Dog) Speak() string {
    return "Woof!"
}

// Mover を実装
func (d Dog) Move() string {
    return "Walking"
}

func main() {
    dog := Dog{Name: "Pochi"}

    var speaker Speaker = dog
    fmt.Println(speaker.Speak())  // "Woof!"

    var mover Mover = dog
    fmt.Println(mover.Move())  // "Walking"
}
```

**インターフェースのチェック**:

コンパイル時にインターフェースを実装しているか確認する。

```go
type Animal interface {
    Speak() string
}

type Dog struct{}

func (d Dog) Speak() string {
    return "Woof!"
}

// コンパイル時にチェック（変数は使わない）
var _ Animal = Dog{}  // Dog が Animal を実装していることを確認
```

**実用例**:

### **データベースインターフェース**

```go
type Repository interface {
    Save(data string) error
    FindByID(id int) (string, error)
    Delete(id int) error
}

// MySQL の実装
type MySQLRepository struct{}

func (r *MySQLRepository) Save(data string) error {
    fmt.Println("MySQL に保存:", data)
    return nil
}

func (r *MySQLRepository) FindByID(id int) (string, error) {
    return fmt.Sprintf("MySQL データ %d", id), nil
}

func (r *MySQLRepository) Delete(id int) error {
    fmt.Println("MySQL から削除:", id)
    return nil
}

// PostgreSQL の実装
type PostgreSQLRepository struct{}

func (r *PostgreSQLRepository) Save(data string) error {
    fmt.Println("PostgreSQL に保存:", data)
    return nil
}

func (r *PostgreSQLRepository) FindByID(id int) (string, error) {
    return fmt.Sprintf("PostgreSQL データ %d", id), nil
}

func (r *PostgreSQLRepository) Delete(id int) error {
    fmt.Println("PostgreSQL から削除:", id)
    return nil
}

// Repository インターフェースを使う
func useRepository(repo Repository) {
    repo.Save("データ")
    data, _ := repo.FindByID(1)
    fmt.Println(data)
    repo.Delete(1)
}

func main() {
    mysql := &MySQLRepository{}
    useRepository(mysql)

    postgres := &PostgreSQLRepository{}
    useRepository(postgres)
}
```

### **ロガーインターフェース**

```go
type Logger interface {
    Info(message string)
    Error(message string)
}

type ConsoleLogger struct{}

func (l *ConsoleLogger) Info(message string) {
    fmt.Println("[INFO]", message)
}

func (l *ConsoleLogger) Error(message string) {
    fmt.Println("[ERROR]", message)
}

type FileLogger struct {
    filename string
}

func (l *FileLogger) Info(message string) {
    // ファイルに書き込む処理
    fmt.Printf("[INFO to %s] %s\n", l.filename, message)
}

func (l *FileLogger) Error(message string) {
    // ファイルに書き込む処理
    fmt.Printf("[ERROR to %s] %s\n", l.filename, message)
}

func logMessage(logger Logger, msg string) {
    logger.Info(msg)
}

func main() {
    console := &ConsoleLogger{}
    logMessage(console, "コンソールログ")

    file := &FileLogger{filename: "app.log"}
    logMessage(file, "ファイルログ")
}
```

**まとめ**:

- `interface` でメソッドの集合を定義
- 暗黙的な実装（メソッドがあれば自動的に満たす）
- 空のインターフェース（`any`）はすべての型を受け入れる
- 型アサーションで具体的な型に変換
- 型スイッチで複数の型を処理
- インターフェースの埋め込みで拡張

</div>
<div class="note_content_by_programming_language" id="note_content_Java">

```java
interface InterfaceName {
    ReturnType methodName();
}
```

Java では **interface** キーワードで、メソッドの集合を定義する。クラスは `implements` キーワードで明示的にインターフェースを実装する。

**インターフェースの定義**:

```java
public interface Animal {
    String speak();
    String move();
}
```

**インターフェースの実装**:

```java
public class Dog implements Animal {
    private String name;

    public Dog(String name) {
        this.name = name;
    }

    @Override
    public String speak() {
        return "Woof!";
    }

    @Override
    public String move() {
        return "Walking";
    }
}

public class Cat implements Animal {
    private String name;

    public Cat(String name) {
        this.name = name;
    }

    @Override
    public String speak() {
        return "Meow!";
    }

    @Override
    public String move() {
        return "Jumping";
    }
}

// 使用例
public class Main {
    public static void makeItSpeak(Animal animal) {
        System.out.println(animal.speak());
    }

    public static void main(String[] args) {
        Animal dog = new Dog("Pochi");
        Animal cat = new Cat("Tama");

        makeItSpeak(dog);  // "Woof!"
        makeItSpeak(cat);  // "Meow!"
    }
}
```

**デフォルトメソッド（Java 8+）**:

インターフェースにデフォルト実装を持たせることができる。

```java
public interface Animal {
    String speak();

    // デフォルトメソッド
    default void greet() {
        System.out.println("こんにちは: " + speak());
    }
}

public class Dog implements Animal {
    @Override
    public String speak() {
        return "Woof!";
    }
    // greet() は実装しなくても良い（デフォルト実装を使う）
}

// 使用例
Dog dog = new Dog();
dog.greet();  // "こんにちは: Woof!"
```

**静的メソッド（Java 8+）**:

インターフェースに静的メソッドを定義できる。

```java
public interface MathUtils {
    static int add(int a, int b) {
        return a + b;
    }
}

// 使用例
int sum = MathUtils.add(10, 20);  // 30
```

**複数のインターフェースを実装**:

```java
public interface Speaker {
    String speak();
}

public interface Mover {
    String move();
}

public class Dog implements Speaker, Mover {
    @Override
    public String speak() {
        return "Woof!";
    }

    @Override
    public String move() {
        return "Walking";
    }
}
```

**インターフェースの継承**:

インターフェースは他のインターフェースを継承できる。

```java
public interface Animal {
    String speak();
}

public interface Pet extends Animal {
    String getName();
}

public class Dog implements Pet {
    private String name;

    @Override
    public String speak() {
        return "Woof!";
    }

    @Override
    public String getName() {
        return name;
    }
}
```

**抽象クラス（abstract class）**:

Java には抽象クラスもある（インターフェースとは異なる）。

```java
public abstract class Animal {
    private String name;

    public Animal(String name) {
        this.name = name;
    }

    // 抽象メソッド（サブクラスで実装が必要）
    public abstract String speak();

    // 具体的なメソッド（サブクラスで継承される）
    public void greet() {
        System.out.println("こんにちは、" + name + "です");
    }
}

public class Dog extends Animal {
    public Dog(String name) {
        super(name);
    }

    @Override
    public String speak() {
        return "Woof!";
    }
}
```

**インターフェース vs 抽象クラス**:

| 項目           | インターフェース                  | 抽象クラス                       |
| -------------- | --------------------------------- | -------------------------------- |
| 実装           | メソッドのシグネチャのみ          | フィールドや具体的なメソッドも可 |
| 多重継承       | 複数実装可能                      | 単一継承のみ                     |
| コンストラクタ | なし                              | あり                             |
| フィールド     | 定数のみ（`public static final`） | すべて可能                       |

**実用例（リポジトリパターン）**:

```java
public interface UserRepository {
    User findById(int id);
    List<User> findAll();
    void save(User user);
    void delete(int id);
}

public class UserRepositoryImpl implements UserRepository {
    @Override
    public User findById(int id) {
        // データベースから取得
        return new User(id, "User" + id);
    }

    @Override
    public List<User> findAll() {
        // すべてのユーザーを取得
        return new ArrayList<>();
    }

    @Override
    public void save(User user) {
        // データベースに保存
        System.out.println("保存: " + user);
    }

    @Override
    public void delete(int id) {
        // データベースから削除
        System.out.println("削除: " + id);
    }
}

// 使用例
public class Main {
    public static void main(String[] args) {
        UserRepository repo = new UserRepositoryImpl();

        User user = repo.findById(1);
        System.out.println(user);

        repo.save(new User(2, "Alice"));
    }
}
```

**まとめ**:

- `interface` でメソッドの集合を定義
- `implements` で明示的に実装
- デフォルトメソッド（Java 8+）でデフォルト実装
- 複数のインターフェースを実装可能
- 抽象クラスも使える（フィールドやコンストラクタが必要な場合）

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
from abc import ABC, abstractmethod
class InterfaceName(ABC):
    @abstractmethod
    def method_name(self): pass
```

Python では **abc.ABC**（抽象基底クラス）や **Protocol**（Python 3.8+）でインターフェースを実現する。

**1. abc.ABC（抽象基底クラス）**:

明示的にインターフェースを定義する。

**基本的な使い方**:

```python
from abc import ABC, abstractmethod

class Animal(ABC):
    @abstractmethod
    def speak(self) -> str:
        pass

    @abstractmethod
    def move(self) -> str:
        pass

class Dog(Animal):
    def __init__(self, name):
        self.name = name

    def speak(self) -> str:
        return "Woof!"

    def move(self) -> str:
        return "Walking"

class Cat(Animal):
    def __init__(self, name):
        self.name = name

    def speak(self) -> str:
        return "Meow!"

    def move(self) -> str:
        return "Jumping"

# 使用例
def make_it_speak(animal: Animal):
    print(animal.speak())

dog = Dog("Pochi")
cat = Cat("Tama")

make_it_speak(dog)  # "Woof!"
make_it_speak(cat)  # "Meow!"

# 抽象クラスは直接インスタンス化できない
# animal = Animal()  # TypeError: Can't instantiate abstract class Animal
```

**具体的なメソッドも定義可能**:

```python
from abc import ABC, abstractmethod

class Animal(ABC):
    def __init__(self, name):
        self.name = name

    @abstractmethod
    def speak(self) -> str:
        pass

    # 具体的なメソッド（サブクラスで継承される）
    def greet(self):
        print(f"こんにちは、{self.name}です: {self.speak()}")

class Dog(Animal):
    def speak(self) -> str:
        return "Woof!"

# 使用例
dog = Dog("Pochi")
dog.greet()  # "こんにちは、Pochiです: Woof!"
```

**2. Protocol（構造的部分型、Python 3.8+）**:

Go のような暗黙的な実装（明示的に継承しない）。

```python
from typing import Protocol

class Speaker(Protocol):
    def speak(self) -> str:
        ...

class Dog:
    def __init__(self, name):
        self.name = name

    def speak(self) -> str:
        return "Woof!"

class Cat:
    def __init__(self, name):
        self.name = name

    def speak(self) -> str:
        return "Meow!"

# Speaker を明示的に継承していないが、speak() メソッドがあれば OK
def make_it_speak(animal: Speaker):
    print(animal.speak())

dog = Dog("Pochi")
cat = Cat("Tama")

make_it_speak(dog)  # "Woof!"
make_it_speak(cat)  # "Meow!"
```

**Protocol の特徴**:

- 明示的に継承する必要がない（構造的部分型）
- 型チェッカー（mypy など）のためのもので、実行時には影響しない

**複数の抽象メソッド**:

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self) -> float:
        pass

    @abstractmethod
    def perimeter(self) -> float:
        pass

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self) -> float:
        return self.width * self.height

    def perimeter(self) -> float:
        return 2 * (self.width + self.height)

# 使用例
rect = Rectangle(10, 5)
print(f"面積: {rect.area()}")        # 50
print(f"周囲: {rect.perimeter()}")  # 30
```

**実用例（リポジトリパターン）**:

```python
from abc import ABC, abstractmethod
from typing import List, Optional

class User:
    def __init__(self, id: int, name: str):
        self.id = id
        self.name = name

class UserRepository(ABC):
    @abstractmethod
    def find_by_id(self, id: int) -> Optional[User]:
        pass

    @abstractmethod
    def find_all(self) -> List[User]:
        pass

    @abstractmethod
    def save(self, user: User) -> None:
        pass

    @abstractmethod
    def delete(self, id: int) -> None:
        pass

class UserRepositoryImpl(UserRepository):
    def __init__(self):
        self.users = {}

    def find_by_id(self, id: int) -> Optional[User]:
        return self.users.get(id)

    def find_all(self) -> List[User]:
        return list(self.users.values())

    def save(self, user: User) -> None:
        self.users[user.id] = user
        print(f"保存: {user.name}")

    def delete(self, id: int) -> None:
        if id in self.users:
            del self.users[id]
            print(f"削除: {id}")

# 使用例
repo: UserRepository = UserRepositoryImpl()
repo.save(User(1, "Alice"))
user = repo.find_by_id(1)
print(user.name if user else "見つかりません")
```

**まとめ**:

- `abc.ABC` で抽象基底クラスを定義
- `@abstractmethod` で抽象メソッドを定義
- `Protocol` で構造的部分型（Go 風の暗黙的な実装）
- 型ヒントと型チェッカー（mypy）で型安全性を高める

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
// TypeScript
interface InterfaceName {
  methodName(): ReturnType;
}
```

JavaScript 自体は**インターフェースをサポートしていない**が、TypeScript（JavaScript のスーパーセット）でインターフェースを使用できる。

**注**: 純粋な JavaScript にはインターフェースの概念はない。以下は TypeScript での説明。

**1. TypeScript のインターフェース**:

**基本的な使い方**:

```typescript
interface Animal {
  name: string;
  speak(): string;
  move(): string;
}

class Dog implements Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  speak(): string {
    return "Woof!";
  }

  move(): string {
    return "Walking";
  }
}

class Cat implements Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  speak(): string {
    return "Meow!";
  }

  move(): string {
    return "Jumping";
  }
}

// 使用例
function makeItSpeak(animal: Animal): void {
  console.log(animal.speak());
}

const dog = new Dog("Pochi");
const cat = new Cat("Tama");

makeItSpeak(dog); // "Woof!"
makeItSpeak(cat); // "Meow!"
```

**オプショナルプロパティ**:

```typescript
interface User {
  name: string;
  age: number;
  email?: string; // オプショナル（あってもなくても良い）
}

const user1: User = { name: "Alice", age: 25 }; // OK
const user2: User = { name: "Bob", age: 30, email: "bob@example.com" }; // OK
```

**読み取り専用プロパティ**:

```typescript
interface Config {
  readonly apiUrl: string;
  readonly timeout: number;
}

const config: Config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
};

// config.apiUrl = "new url";  // エラー: Cannot assign to 'apiUrl' because it is a read-only property
```

**関数型の定義**:

```typescript
interface MathFunction {
  (a: number, b: number): number;
}

const add: MathFunction = (a, b) => a + b;
const multiply: MathFunction = (a, b) => a * b;

console.log(add(10, 20)); // 30
console.log(multiply(10, 20)); // 200
```

**インデックスシグネチャ**:

```typescript
interface StringDictionary {
  [key: string]: string;
}

const dict: StringDictionary = {
  name: "Alice",
  city: "Tokyo",
};

console.log(dict["name"]); // "Alice"
```

**複数のインターフェースを実装**:

```typescript
interface Speaker {
  speak(): string;
}

interface Mover {
  move(): string;
}

class Dog implements Speaker, Mover {
  speak(): string {
    return "Woof!";
  }

  move(): string {
    return "Walking";
  }
}
```

**インターフェースの継承**:

```typescript
interface Animal {
  speak(): string;
}

interface Pet extends Animal {
  name: string;
  play(): string;
}

class Dog implements Pet {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  speak(): string {
    return "Woof!";
  }

  play(): string {
    return "Playing fetch";
  }
}
```

**型エイリアス vs インターフェース**:

TypeScript には `type` による型エイリアスもある。

```typescript
// インターフェース
interface User1 {
  name: string;
  age: number;
}

// 型エイリアス
type User2 = {
  name: string;
  age: number;
};

// どちらも使える
const user1: User1 = { name: "Alice", age: 25 };
const user2: User2 = { name: "Bob", age: 30 };
```

**インターフェースと型エイリアスの違い**:

| 項目           | インターフェース     | 型エイリアス |
| -------------- | -------------------- | ------------ |
| 拡張           | `extends` で継承可能 | `&` で交差型 |
| 宣言のマージ   | 可能                 | 不可能       |
| プリミティブ型 | 不可                 | 可能         |
| ユニオン型     | 不可                 | 可能         |

**実用例（リポジトリパターン）**:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

interface UserRepository {
  findById(id: number): User | undefined;
  findAll(): User[];
  save(user: User): void;
  delete(id: number): void;
}

class UserRepositoryImpl implements UserRepository {
  private users: Map<number, User> = new Map();

  findById(id: number): User | undefined {
    return this.users.get(id);
  }

  findAll(): User[] {
    return Array.from(this.users.values());
  }

  save(user: User): void {
    this.users.set(user.id, user);
    console.log("保存:", user.name);
  }

  delete(id: number): void {
    this.users.delete(id);
    console.log("削除:", id);
  }
}

// 使用例
const repo: UserRepository = new UserRepositoryImpl();
repo.save({ id: 1, name: "Alice", email: "alice@example.com" });

const user = repo.findById(1);
console.log(user?.name); // "Alice"
```

**純粋な JavaScript での代替**:

純粋な JavaScript にはインターフェースはないが、ダックタイピングで似た動作を実現できる。

```javascript
// インターフェースの定義はない（TypeScript のみ）

class Dog {
  speak() {
    return "Woof!";
  }
}

class Cat {
  speak() {
    return "Meow!";
  }
}

// speak() メソッドがあれば何でも受け入れる（ダックタイピング）
function makeItSpeak(animal) {
  console.log(animal.speak());
}

const dog = new Dog();
const cat = new Cat();

makeItSpeak(dog); // "Woof!"
makeItSpeak(cat); // "Meow!"
```

**まとめ**:

- TypeScript で `interface` をサポート
- `implements` で明示的に実装
- オプショナルプロパティ、読み取り専用プロパティ
- 関数型、インデックスシグネチャ
- 純粋な JavaScript にはインターフェースはない（ダックタイピング）

</div>
