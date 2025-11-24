---
title: "型定義・型エイリアス"
excerpt: "型を定義する方法・型エイリアスについて"
coverImage: ""
date: '2025-11-24T22:13:44.000Z'
updatedAt: '2025-11-24T22:13:44.000Z'
tag: ["Go", "Java", "Python", "Javascript"]
programming: ["Go", "Java", "Python", "Javascript"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
mode: programming
---

型を定義する方法・型エイリアス（Type Alias）について説明する。

**型定義とは**:

既存の型に新しい名前を付ける、または新しい型を作成すること。コードの可読性を向上させ、型の意味を明確にし、リファクタリングを容易にする。

**型定義の主な用途**:

1. **可読性の向上**: `int` の代わりに `Age` や `UserId` など意味のある名前を付ける
2. **型安全性の強化**: 異なる意味の値を誤って混在させることを防ぐ
3. **リファクタリングの容易化**: 型定義を変更するだけで全体に反映
4. **複雑な型の簡略化**: ジェネリクスや関数型など複雑な型を簡潔に表現
5. **ドメイン駆動設計**: ビジネスロジックの概念を型として表現

**型定義の種類**:

| 種類                  | 説明                   | 例                                     |
| --------------------- | ---------------------- | -------------------------------------- |
| **型エイリアス**      | 既存の型に別名を付ける | `type UserId = number`                 |
| **新しい型の定義**    | 全く新しい型を作成     | `type Status = "active" \| "inactive"` |
| **構造体/クラス型**   | データ構造を定義       | `class User { ... }`                   |
| **ユニオン型/列挙型** | 複数の値から選択       | `enum Color { Red, Green, Blue }`      |

各言語で型定義の方法と特徴が異なる。

<div class="note_content_by_programming_language" id="note_content_Go">

```go
type TypeName ExistingType
```

Go では `type` キーワードを使って新しい型を定義できる。Go の型定義は新しい型を作成し、元の型とは異なる型として扱われる。

**1. 基本的な型定義**:

**プリミティブ型のエイリアス**:

```go
// 新しい型を定義（元の型とは異なる型）
type UserId int
type Age int
type Email string

func main() {
    var id UserId = 123
    var age Age = 30
    var email Email = "user@example.com"

    // 型が異なるので直接代入できない
    // var num int = id  // エラー: cannot use id (type UserId) as type int

    // 型変換が必要
    var num int = int(id)  // OK
}
```

**2. 構造体の型定義**:

```go
// 構造体型を定義
type User struct {
    ID    UserId
    Name  string
    Age   Age
    Email Email
}

// 使用例
func main() {
    user := User{
        ID:    123,
        Name:  "Alice",
        Age:   30,
        Email: "alice@example.com",
    }
}
```

**3. 型エイリアス（Go 1.9+）**:

`type` と `=` を使うと型エイリアス（既存の型と同じ型）を作成できる。

```go
// 型エイリアス（元の型と同じ型）
type MyInt = int

func main() {
    var a MyInt = 10
    var b int = 20

    // 同じ型なので代入可能
    a = b  // OK
    b = a  // OK
}
```

**型定義と型エイリアスの違い**:

```go
// 型定義（新しい型）
type UserId int

// 型エイリアス（既存の型の別名）
type MyInt = int

func processUserId(id UserId) {
    fmt.Println("UserId:", id)
}

func processInt(num int) {
    fmt.Println("Int:", num)
}

func main() {
    var id UserId = 123
    var num int = 456

    processUserId(id)           // OK
    // processUserId(num)       // エラー: cannot use num (type int) as type UserId
    processUserId(UserId(num))  // OK（型変換）

    var myInt MyInt = 789
    processInt(myInt)           // OK（型エイリアスは同じ型）
}
```

**4. スライス・マップ・チャネル型の定義**:

```go
// スライス型
type UserList []User
type IntSlice []int

// マップ型
type UserMap map[UserId]User
type Config map[string]string

// チャネル型
type UserChannel chan User
type IntChannel chan int

// 使用例
func main() {
    users := UserList{
        {ID: 1, Name: "Alice"},
        {ID: 2, Name: "Bob"},
    }

    userMap := UserMap{
        1: {ID: 1, Name: "Alice"},
        2: {ID: 2, Name: "Bob"},
    }

    ch := make(UserChannel, 10)
}
```

**5. 関数型の定義**:

```go
// 関数型を定義
type Handler func(w http.ResponseWriter, r *http.Request)
type Calculator func(a, b int) int
type Validator func(input string) error

// 使用例
func add(a, b int) int {
    return a + b
}

func main() {
    var calc Calculator = add
    result := calc(10, 20)  // 30
}
```

**6. インターフェース型の定義**:

```go
// インターフェース型を定義
type Reader interface {
    Read(p []byte) (n int, err error)
}

type Writer interface {
    Write(p []byte) (n int, err error)
}

// 複数のインターフェースを組み合わせ
type ReadWriter interface {
    Reader
    Writer
}

// インターフェースを実装する構造体
type MyReader struct{}

func (r MyReader) Read(p []byte) (n int, err error) {
    // 実装
    return 0, nil
}
```

**7. メソッドを持つ型定義**:

```go
type UserId int

// 型にメソッドを定義
func (id UserId) String() string {
    return fmt.Sprintf("User#%d", id)
}

func (id UserId) IsValid() bool {
    return id > 0
}

// 使用例
func main() {
    var id UserId = 123
    fmt.Println(id.String())  // User#123
    fmt.Println(id.IsValid()) // true
}
```

**8. 埋め込み（Embedding）を使った型定義**:

```go
// 基底となる型
type Person struct {
    Name string
    Age  int
}

// Person を埋め込んだ型
type Employee struct {
    Person  // 埋め込み
    Company string
    Salary  int
}

// 使用例
func main() {
    emp := Employee{
        Person:  Person{Name: "Alice", Age: 30},
        Company: "ABC Corp",
        Salary:  50000,
    }

    // 埋め込んだフィールドに直接アクセス可能
    fmt.Println(emp.Name)  // Alice
}
```

**9. ジェネリクス型の定義（Go 1.18+）**:

```go
// ジェネリクス型を定義
type Stack[T any] struct {
    items []T
}

func (s *Stack[T]) Push(item T) {
    s.items = append(s.items, item)
}

func (s *Stack[T]) Pop() T {
    if len(s.items) == 0 {
        var zero T
        return zero
    }
    item := s.items[len(s.items)-1]
    s.items = s.items[:len(s.items)-1]
    return item
}

// 使用例
func main() {
    intStack := Stack[int]{}
    intStack.Push(1)
    intStack.Push(2)
    fmt.Println(intStack.Pop())  // 2

    strStack := Stack[string]{}
    strStack.Push("hello")
    strStack.Push("world")
    fmt.Println(strStack.Pop())  // world
}
```

**10. 型制約を持つ型定義**:

```go
// 型制約を定義
type Number interface {
    int | int64 | float64
}

// 型制約を使った型定義
type Calculator[T Number] struct {
    value T
}

func (c *Calculator[T]) Add(n T) T {
    c.value += n
    return c.value
}

// 使用例
func main() {
    calc := Calculator[int]{value: 10}
    calc.Add(20)  // 30
}
```

**実用例**:

```go
package main

import "fmt"

// ドメイン固有の型定義
type UserId int
type UserName string
type Email string

// 列挙型のような型定義
type UserStatus int

const (
    StatusInactive UserStatus = iota
    StatusActive
    StatusSuspended
)

// 構造体型
type User struct {
    ID     UserId
    Name   UserName
    Email  Email
    Status UserStatus
}

// メソッド定義
func (u User) IsActive() bool {
    return u.Status == StatusActive
}

func (s UserStatus) String() string {
    switch s {
    case StatusInactive:
        return "inactive"
    case StatusActive:
        return "active"
    case StatusSuspended:
        return "suspended"
    default:
        return "unknown"
    }
}

func main() {
    user := User{
        ID:     123,
        Name:   "Alice",
        Email:  "alice@example.com",
        Status: StatusActive,
    }

    fmt.Printf("User %d (%s) is %s\n", user.ID, user.Name, user.Status)
    fmt.Println("Active:", user.IsActive())
}
```

**まとめ**:

- `type TypeName ExistingType` で新しい型を定義
- `type TypeName = ExistingType` で型エイリアスを定義
- 型定義は新しい型を作成し、型変換が必要
- 型エイリアスは既存の型と同じ型として扱われる
- 構造体、インターフェース、関数型、ジェネリクス型を定義できる
- 型にメソッドを定義して振る舞いを追加できる
- ドメイン駆動設計で意味のある型名を付けることで可読性が向上

</div>
<div class="note_content_by_programming_language" id="note_content_Java">

```java
class TypeName { }
```

Java では主にクラス、インターフェース、列挙型（enum）を使って型を定義する。Java には型エイリアスの機能はないが、クラスやインターフェースで型を定義できる。

**1. クラスによる型定義**:

```java
// クラスで型を定義
public class UserId {
    private final int value;

    public UserId(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }

    @Override
    public String toString() {
        return "User#" + value;
    }
}

// 使用例
public class Main {
    public static void main(String[] args) {
        UserId id = new UserId(123);
        System.out.println(id);  // User#123
    }
}
```

**2. レコード型（Java 14+、推奨）**:

レコードは不変データを保持する簡潔な型定義。

```java
// レコード型で型を定義（簡潔）
public record UserId(int value) {
    // カスタムメソッドを追加可能
    public boolean isValid() {
        return value > 0;
    }

    @Override
    public String toString() {
        return "User#" + value;
    }
}

public record User(UserId id, String name, int age) {}

// 使用例
public class Main {
    public static void main(String[] args) {
        UserId id = new UserId(123);
        User user = new User(id, "Alice", 30);

        System.out.println(user.id());    // User#123
        System.out.println(user.name());  // Alice
    }
}
```

**3. 列挙型（Enum）**:

```java
// 列挙型で型を定義
public enum UserStatus {
    INACTIVE,
    ACTIVE,
    SUSPENDED;

    public boolean isActive() {
        return this == ACTIVE;
    }
}

// 値を持つ列挙型
public enum Color {
    RED(255, 0, 0),
    GREEN(0, 255, 0),
    BLUE(0, 0, 255);

    private final int r, g, b;

    Color(int r, int g, int b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    public int getR() { return r; }
    public int getG() { return g; }
    public int getB() { return b; }
}

// 使用例
public class Main {
    public static void main(String[] args) {
        UserStatus status = UserStatus.ACTIVE;
        System.out.println(status.isActive());  // true

        Color color = Color.RED;
        System.out.println(color.getR());  // 255
    }
}
```

**4. インターフェースによる型定義**:

```java
// インターフェースで型を定義
public interface Identifiable {
    int getId();
    String getName();
}

// 実装クラス
public class User implements Identifiable {
    private final int id;
    private final String name;

    public User(int id, String name) {
        this.id = id;
        this.name = name;
    }

    @Override
    public int getId() {
        return id;
    }

    @Override
    public String getName() {
        return name;
    }
}

// 使用例
public class Main {
    public static void main(String[] args) {
        Identifiable user = new User(123, "Alice");
        System.out.println(user.getId());    // 123
        System.out.println(user.getName());  // Alice
    }
}
```

**5. ジェネリクス型の定義**:

```java
// ジェネリクス型を定義
public class Box<T> {
    private T value;

    public Box(T value) {
        this.value = value;
    }

    public T getValue() {
        return value;
    }

    public void setValue(T value) {
        this.value = value;
    }
}

// 複数の型パラメータ
public class Pair<K, V> {
    private K key;
    private V value;

    public Pair(K key, V value) {
        this.key = key;
        this.value = value;
    }

    public K getKey() { return key; }
    public V getValue() { return value; }
}

// 使用例
public class Main {
    public static void main(String[] args) {
        Box<String> stringBox = new Box<>("Hello");
        Box<Integer> intBox = new Box<>(123);

        Pair<String, Integer> pair = new Pair<>("Age", 30);
        System.out.println(pair.getKey() + ": " + pair.getValue());
    }
}
```

**6. ネストされた型定義**:

```java
// ネストされたクラス
public class User {
    private int id;
    private String name;
    private Address address;

    // ネストされた型
    public static class Address {
        private String city;
        private String country;

        public Address(String city, String country) {
            this.city = city;
            this.country = country;
        }

        public String getCity() { return city; }
        public String getCountry() { return country; }
    }

    public User(int id, String name, Address address) {
        this.id = id;
        this.name = name;
        this.address = address;
    }
}

// 使用例
public class Main {
    public static void main(String[] args) {
        User.Address address = new User.Address("Tokyo", "Japan");
        User user = new User(123, "Alice", address);
    }
}
```

**7. 関数型インターフェース（Java 8+）**:

```java
// 関数型インターフェース（@FunctionalInterface）
@FunctionalInterface
public interface Calculator {
    int calculate(int a, int b);
}

@FunctionalInterface
public interface Validator {
    boolean validate(String input);
}

// 使用例
public class Main {
    public static void main(String[] args) {
        // ラムダ式で実装
        Calculator add = (a, b) -> a + b;
        Calculator multiply = (a, b) -> a * b;

        System.out.println(add.calculate(10, 20));       // 30
        System.out.println(multiply.calculate(10, 20));  // 200

        Validator emailValidator = email -> email.contains("@");
        System.out.println(emailValidator.validate("test@example.com"));  // true
    }
}
```

**8. シールドクラス（Java 15+、プレビュー、Java 17 で正式）**:

継承を制限する型定義。

```java
// シールドクラス（継承可能なクラスを制限）
public sealed class Shape permits Circle, Rectangle, Triangle {
    public abstract double area();
}

public final class Circle extends Shape {
    private final double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    @Override
    public double area() {
        return Math.PI * radius * radius;
    }
}

public final class Rectangle extends Shape {
    private final double width, height;

    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    @Override
    public double area() {
        return width * height;
    }
}

public final class Triangle extends Shape {
    private final double base, height;

    public Triangle(double base, double height) {
        this.base = base;
        this.height = height;
    }

    @Override
    public double area() {
        return 0.5 * base * height;
    }
}

// 使用例（パターンマッチング）
public class Main {
    public static void main(String[] args) {
        Shape shape = new Circle(5.0);

        // switch 式でパターンマッチング（Java 17+）
        String description = switch (shape) {
            case Circle c -> "Circle with radius " + c.radius;
            case Rectangle r -> "Rectangle " + r.width + "x" + r.height;
            case Triangle t -> "Triangle with base " + t.base;
        };

        System.out.println(description);
    }
}
```

**9. 値の制約を持つ型定義**:

```java
// 値の制約を持つクラス
public class Age {
    private final int value;

    public Age(int value) {
        if (value < 0 || value > 150) {
            throw new IllegalArgumentException("Invalid age: " + value);
        }
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}

// レコードで値の制約
public record Email(String value) {
    public Email {
        if (!value.contains("@")) {
            throw new IllegalArgumentException("Invalid email: " + value);
        }
    }
}

// 使用例
public class Main {
    public static void main(String[] args) {
        Age age = new Age(30);  // OK
        // Age invalid = new Age(200);  // IllegalArgumentException

        Email email = new Email("test@example.com");  // OK
        // Email invalid = new Email("invalid");  // IllegalArgumentException
    }
}
```

**実用例**:

```java
// ドメイン固有の型定義
public record UserId(int value) {
    public UserId {
        if (value <= 0) {
            throw new IllegalArgumentException("UserId must be positive");
        }
    }
}

public enum UserStatus {
    INACTIVE, ACTIVE, SUSPENDED
}

public record User(
    UserId id,
    String name,
    String email,
    UserStatus status
) {
    public boolean isActive() {
        return status == UserStatus.ACTIVE;
    }
}

// ビルダーパターン（複雑なオブジェクト構築）
public class UserBuilder {
    private UserId id;
    private String name;
    private String email;
    private UserStatus status = UserStatus.INACTIVE;

    public UserBuilder id(int id) {
        this.id = new UserId(id);
        return this;
    }

    public UserBuilder name(String name) {
        this.name = name;
        return this;
    }

    public UserBuilder email(String email) {
        this.email = email;
        return this;
    }

    public UserBuilder status(UserStatus status) {
        this.status = status;
        return this;
    }

    public User build() {
        return new User(id, name, email, status);
    }
}

// 使用例
public class Main {
    public static void main(String[] args) {
        User user = new UserBuilder()
            .id(123)
            .name("Alice")
            .email("alice@example.com")
            .status(UserStatus.ACTIVE)
            .build();

        System.out.println(user.isActive());  // true
    }
}
```

**まとめ**:

- クラス、レコード（Java 14+）、列挙型で型を定義
- レコードは不変データの型定義に最適（簡潔）
- 列挙型で定数セットを型安全に定義
- インターフェースで振る舞いを定義
- ジェネリクスで型パラメータを持つ型を定義
- シールドクラス（Java 17+）で継承を制限
- Java には型エイリアスの機能はない

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
TypeName = ExistingType
```

Python では型ヒント（Type Hints、Python 3.5+）を使って型を定義・注釈できる。Python は動的型付け言語なので、型定義は実行時のチェックではなく、静的解析ツール（mypy など）によるチェックに使われる。

**1. 型エイリアス（基本）**:

```python
# 型エイリアス
UserId = int
Age = int
Email = str

def get_user(user_id: UserId) -> str:
    return f"User#{user_id}"

# 使用例
user_id: UserId = 123
age: Age = 30
email: Email = "user@example.com"

print(get_user(user_id))  # User#123
```

**2. NewType による型定義（型安全性の向上）**:

`NewType` を使うと、静的型チェッカーが異なる型として扱う。

```python
from typing import NewType

# NewType で新しい型を定義
UserId = NewType('UserId', int)
Age = NewType('Age', int)

def get_user(user_id: UserId) -> str:
    return f"User#{user_id}"

# 使用例
user_id = UserId(123)  # OK
age = Age(30)          # OK

print(get_user(user_id))  # OK
# print(get_user(age))    # 型エラー（mypy でチェック可能）

# 実行時は通常の int として扱われる
print(type(user_id))  # <class 'int'>
```

**3. TypedDict による辞書型の定義（Python 3.8+）**:

```python
from typing import TypedDict

# TypedDict で辞書の型を定義
class User(TypedDict):
    id: int
    name: str
    email: str
    age: int

# 使用例
user: User = {
    'id': 123,
    'name': 'Alice',
    'email': 'alice@example.com',
    'age': 30
}

def print_user(user: User) -> None:
    print(f"{user['name']} ({user['age']})")

print_user(user)  # Alice (30)
```

**オプショナルフィールドを持つ TypedDict**:

```python
from typing import TypedDict, NotRequired

class User(TypedDict):
    id: int
    name: str
    email: NotRequired[str]  # オプショナル（Python 3.11+）

# Python 3.8-3.10 の場合
class UserOptional(TypedDict, total=False):
    email: str

class User(UserOptional):
    id: int
    name: str
```

**4. データクラス（dataclass、Python 3.7+、推奨）**:

```python
from dataclasses import dataclass

# データクラスで型を定義
@dataclass
class User:
    id: int
    name: str
    email: str
    age: int

    def is_adult(self) -> bool:
        return self.age >= 18

# 使用例
user = User(id=123, name='Alice', email='alice@example.com', age=30)
print(user.name)        # Alice
print(user.is_adult())  # True

# __str__, __repr__, __eq__ などが自動生成される
print(user)  # User(id=123, name='Alice', email='alice@example.com', age=30)
```

**デフォルト値とフィールド**:

```python
from dataclasses import dataclass, field
from typing import List

@dataclass
class User:
    id: int
    name: str
    email: str = "unknown@example.com"  # デフォルト値
    tags: List[str] = field(default_factory=list)  # ミュータブルなデフォルト値

    def __post_init__(self):
        # 初期化後の処理
        self.name = self.name.upper()
```

**5. 列挙型（Enum）**:

```python
from enum import Enum, auto

# 列挙型を定義
class UserStatus(Enum):
    INACTIVE = 0
    ACTIVE = 1
    SUSPENDED = 2

# auto() で自動採番
class Color(Enum):
    RED = auto()
    GREEN = auto()
    BLUE = auto()

# 使用例
status = UserStatus.ACTIVE
print(status)         # UserStatus.ACTIVE
print(status.name)    # ACTIVE
print(status.value)   # 1

if status == UserStatus.ACTIVE:
    print("User is active")
```

**文字列列挙型**:

```python
from enum import Enum

class UserStatus(str, Enum):
    INACTIVE = "inactive"
    ACTIVE = "active"
    SUSPENDED = "suspended"

# JSON などで文字列として扱える
status = UserStatus.ACTIVE
print(status.value)  # "active"
```

**6. ジェネリック型の定義**:

```python
from typing import TypeVar, Generic, List

# 型変数を定義
T = TypeVar('T')

# ジェネリック型を定義
class Stack(Generic[T]):
    def __init__(self) -> None:
        self.items: List[T] = []

    def push(self, item: T) -> None:
        self.items.append(item)

    def pop(self) -> T:
        return self.items.pop()

    def is_empty(self) -> bool:
        return len(self.items) == 0

# 使用例
int_stack: Stack[int] = Stack()
int_stack.push(1)
int_stack.push(2)
print(int_stack.pop())  # 2

str_stack: Stack[str] = Stack()
str_stack.push("hello")
str_stack.push("world")
print(str_stack.pop())  # world
```

**7. リテラル型（Python 3.8+）**:

```python
from typing import Literal

# リテラル型で特定の値のみ許可
UserRole = Literal["admin", "user", "guest"]

def set_role(role: UserRole) -> None:
    print(f"Role set to: {role}")

# 使用例
set_role("admin")  # OK
# set_role("superuser")  # 型エラー（mypy でチェック可能）
```

**8. ユニオン型**:

```python
from typing import Union

# ユニオン型（複数の型のいずれか）
UserId = Union[int, str]

def get_user(user_id: UserId) -> str:
    return f"User#{user_id}"

# 使用例
print(get_user(123))     # OK
print(get_user("abc"))   # OK

# Python 3.10+ では | 演算子が使える
UserId = int | str
Result = str | None
```

**9. Protocol による構造的サブタイピング（Python 3.8+）**:

```python
from typing import Protocol

# Protocol で型を定義（構造的サブタイピング）
class Drawable(Protocol):
    def draw(self) -> str:
        ...

class Circle:
    def draw(self) -> str:
        return "Drawing circle"

class Rectangle:
    def draw(self) -> str:
        return "Drawing rectangle"

def render(shape: Drawable) -> None:
    print(shape.draw())

# 使用例（明示的な継承なしでも型チェック通過）
circle = Circle()
rectangle = Rectangle()

render(circle)     # OK
render(rectangle)  # OK
```

**10. カスタム型ガード（Python 3.10+）**:

```python
from typing import TypeGuard

def is_str_list(val: list) -> TypeGuard[list[str]]:
    return all(isinstance(x, str) for x in val)

def process(val: list) -> None:
    if is_str_list(val):
        # ここで val は list[str] として扱われる
        print(", ".join(val))
    else:
        print("Not a string list")
```

**実用例**:

```python
from dataclasses import dataclass
from enum import Enum
from typing import Optional

# 列挙型
class UserStatus(str, Enum):
    INACTIVE = "inactive"
    ACTIVE = "active"
    SUSPENDED = "suspended"

# 型エイリアス
UserId = int
Email = str

# データクラス
@dataclass
class User:
    id: UserId
    name: str
    email: Email
    status: UserStatus
    age: int
    bio: Optional[str] = None

    def is_active(self) -> bool:
        return self.status == UserStatus.ACTIVE

    def __str__(self) -> str:
        return f"{self.name} ({self.email})"

# 使用例
def main() -> None:
    user = User(
        id=123,
        name="Alice",
        email="alice@example.com",
        status=UserStatus.ACTIVE,
        age=30,
        bio="Software engineer"
    )

    print(user)  # Alice (alice@example.com)
    print(f"Active: {user.is_active()}")  # Active: True
    print(f"Status: {user.status.value}")  # Status: active

if __name__ == "__main__":
    main()
```

**まとめ**:

- 型エイリアス: `TypeName = ExistingType`
- `NewType` で型安全性を向上（静的チェック）
- `TypedDict` で辞書の型を定義
- `dataclass` でデータ構造を定義（推奨）
- `Enum` で列挙型を定義
- `Generic` でジェネリック型を定義
- `Literal` で特定の値のみ許可
- `Protocol` で構造的サブタイピング
- 型ヒントは静的解析用（実行時チェックではない）

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```typescript
type TypeName = ExistingType;
```

JavaScript には型定義の機能がないが、**TypeScript** を使うことで強力な型定義が可能になる。TypeScript は JavaScript のスーパーセットで、静的型チェックを提供する。

**注意**: 以下は TypeScript の機能。純粋な JavaScript には型定義の概念がない。

**1. 型エイリアス（Type Alias）**:

```typescript
// 型エイリアス
type UserId = number;
type Age = number;
type Email = string;

function getUser(userId: UserId): string {
  return `User#${userId}`;
}

// 使用例
const userId: UserId = 123;
const age: Age = 30;
const email: Email = "user@example.com";

console.log(getUser(userId)); // User#123
```

**2. オブジェクト型の定義**:

```typescript
// オブジェクト型
type User = {
  id: number;
  name: string;
  email: string;
  age: number;
};

// 使用例
const user: User = {
  id: 123,
  name: "Alice",
  email: "alice@example.com",
  age: 30,
};
```

**オプショナルプロパティと読み取り専用プロパティ**:

```typescript
type User = {
  id: number;
  name: string;
  email?: string; // オプショナル
  readonly createdAt: Date; // 読み取り専用
};

const user: User = {
  id: 123,
  name: "Alice",
  createdAt: new Date(),
};

// user.createdAt = new Date();  // エラー: 読み取り専用
```

**3. インターフェース（Interface）**:

```typescript
// インターフェース
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// インターフェースは拡張可能
interface Employee extends User {
  company: string;
  salary: number;
}

// 使用例
const employee: Employee = {
  id: 123,
  name: "Alice",
  email: "alice@example.com",
  age: 30,
  company: "ABC Corp",
  salary: 50000,
};
```

**インターフェースと型エイリアスの違い**:

```typescript
// インターフェースは宣言マージ可能
interface User {
  id: number;
  name: string;
}

interface User {
  email: string; // マージされる
}

// 型エイリアスはマージできない（エラー）
// type User = { id: number };
// type User = { email: string };  // エラー

// 型エイリアスはユニオン型などより柔軟
type Status = "active" | "inactive" | "suspended";
type Result = string | number;
```

**4. リテラル型とユニオン型**:

```typescript
// リテラル型
type Status = "active" | "inactive" | "suspended";
type Role = "admin" | "user" | "guest";

function setStatus(status: Status): void {
  console.log(`Status: ${status}`);
}

// 使用例
setStatus("active"); // OK
// setStatus("unknown");  // エラー

// ユニオン型
type UserId = number | string;
type Result = string | null;

function getUser(id: UserId): string {
  return `User#${id}`;
}

console.log(getUser(123)); // OK
console.log(getUser("abc")); // OK
```

**5. 列挙型（Enum）**:

```typescript
// 数値列挙型
enum UserStatus {
  Inactive, // 0
  Active, // 1
  Suspended, // 2
}

// 文字列列挙型（推奨）
enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE",
}

// 使用例
const status: UserStatus = UserStatus.Active;
console.log(status); // 1
console.log(UserStatus[status]); // "Active"

const color: Color = Color.Red;
console.log(color); // "RED"
```

**6. ジェネリック型の定義**:

```typescript
// ジェネリック型
type Box<T> = {
  value: T;
};

type Pair<K, V> = {
  key: K;
  value: V;
};

// 使用例
const stringBox: Box<string> = { value: "Hello" };
const numberBox: Box<number> = { value: 123 };

const pair: Pair<string, number> = { key: "age", value: 30 };
```

**ジェネリッククラス**:

```typescript
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

// 使用例
const intStack = new Stack<number>();
intStack.push(1);
intStack.push(2);
console.log(intStack.pop()); // 2

const strStack = new Stack<string>();
strStack.push("hello");
strStack.push("world");
console.log(strStack.pop()); // world
```

**7. タプル型**:

```typescript
// タプル型
type Point = [number, number];
type RGB = [number, number, number];
type UserTuple = [number, string, string]; // [id, name, email]

// 使用例
const point: Point = [10, 20];
const color: RGB = [255, 0, 0];
const user: UserTuple = [123, "Alice", "alice@example.com"];

console.log(user[0]); // 123
console.log(user[1]); // Alice
```

**ラベル付きタプル（TypeScript 4.0+）**:

```typescript
type User = [id: number, name: string, email: string];

const user: User = [123, "Alice", "alice@example.com"];
```

**8. 条件型（Conditional Types）**:

```typescript
// 条件型
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false

// 実用例: 配列の要素型を取得
type ElementType<T> = T extends (infer E)[] ? E : never;

type StringArray = ElementType<string[]>; // string
type NumberArray = ElementType<number[]>; // number
```

**9. マップ型（Mapped Types）**:

```typescript
// マップ型（既存の型を変換）
type ReadonlyUser = {
  readonly [K in keyof User]: User[K];
};

type PartialUser = {
  [K in keyof User]?: User[K];
};

// ユーティリティ型（組み込み）
type User = {
  id: number;
  name: string;
  email: string;
};

type ReadonlyUser2 = Readonly<User>; // すべて readonly
type PartialUser2 = Partial<User>; // すべて optional
type RequiredUser = Required<User>; // すべて required
type PickedUser = Pick<User, "id" | "name">; // 特定のプロパティのみ
type OmittedUser = Omit<User, "email">; // 特定のプロパティを除外
```

**10. 型ガード（Type Guards）**:

```typescript
// ユーザー定義型ガード
function isString(value: any): value is string {
  return typeof value === "string";
}

function process(value: string | number): void {
  if (isString(value)) {
    // ここで value は string 型
    console.log(value.toUpperCase());
  } else {
    // ここで value は number 型
    console.log(value.toFixed(2));
  }
}
```

**実用例**:

```typescript
// 列挙型
enum UserStatus {
  Inactive = "INACTIVE",
  Active = "ACTIVE",
  Suspended = "SUSPENDED",
}

// 型エイリアス
type UserId = number;
type Email = string;

// インターフェース
interface User {
  id: UserId;
  name: string;
  email: Email;
  status: UserStatus;
  age: number;
  bio?: string;
}

// クラス
class UserService {
  private users: Map<UserId, User> = new Map();

  addUser(user: User): void {
    this.users.set(user.id, user);
  }

  getUser(id: UserId): User | undefined {
    return this.users.get(id);
  }

  isActive(user: User): boolean {
    return user.status === UserStatus.Active;
  }
}

// 使用例
const user: User = {
  id: 123,
  name: "Alice",
  email: "alice@example.com",
  status: UserStatus.Active,
  age: 30,
  bio: "Software engineer",
};

const service = new UserService();
service.addUser(user);

const retrieved = service.getUser(123);
if (retrieved) {
  console.log(`${retrieved.name} is active: ${service.isActive(retrieved)}`);
}
```

**まとめ（TypeScript）**:

- `type TypeName = ...` で型エイリアスを定義
- `interface` でオブジェクト型を定義（拡張可能）
- リテラル型とユニオン型で特定の値セットを定義
- `enum` で列挙型を定義
- ジェネリック型で型パラメータを持つ型を定義
- タプル型で固定長配列を定義
- マップ型で既存の型を変換
- TypeScript は JavaScript にコンパイルされる
- 純粋な JavaScript には型定義の機能がない

</div>
