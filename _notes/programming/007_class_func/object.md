---
title: "Object・基底クラス・汎用型"
excerpt: "全ての型・オブジェクトの大元"
coverImage: ""
date: "2024-07-16T23:59:06.000Z"
updatedAt: "2025-06-30T20:44:30.000Z"
tag: ["Javascript", "Java", "Python", "Go"]
programming: ["Javascript", "Java", "Python", "Go"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
mode: programming
---

すべての型・オブジェクトの基底となる型について説明する。

各言語には、すべての型やオブジェクトの大元となる型があり、共通の機能を提供する。

**主な用途**:

- すべてのオブジェクトが持つ共通メソッドの提供
- 任意の型の値を扱う汎用的な処理
- 型の抽象化とポリモーフィズム

<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
const obj = {};
```

JavaScript では **Object** がすべてのオブジェクトの基底となる。すべてのオブジェクトは `Object.prototype` を継承している。

**Object オブジェクトとは**:

JavaScript におけるすべてのオブジェクトの大元。オブジェクトの共通的な性質・機能を提供する。

**オブジェクトの生成**:

```javascript
// オブジェクトリテラル（推奨）
const obj1 = {};
const obj2 = { name: "John", age: 30 };

// new Object()（非推奨）
const obj3 = new Object();

// Object.create()
const obj4 = Object.create(null); // プロトタイプなし
const obj5 = Object.create(Object.prototype); // 通常のオブジェクト
```

**プロトタイプチェーン**:

すべてのオブジェクトは `Object.prototype` を継承している。

```javascript
const obj = {};
console.log(obj.toString()); // "[object Object]"（Object.prototype.toString を継承）

const arr = [];
console.log(arr.toString()); // ""（Array.prototype.toString をオーバーライド）

const date = new Date();
console.log(date.toString()); // "Sat Jan 01 2000..."（Date.prototype.toString をオーバーライド）
```

**インスタンスメソッド（Object.prototype）**:

すべてのオブジェクトで使えるメソッド。

| メソッド                         | 説明                                 |
| -------------------------------- | ------------------------------------ |
| `obj.toString()`                 | オブジェクトの文字列表現を取得       |
| `obj.valueOf()`                  | オブジェクトのプリミティブ値を取得   |
| `obj.hasOwnProperty(prop)`       | プロパティを持つか確認               |
| `obj.isPrototypeOf(obj2)`        | プロトタイプチェーンに含まれるか確認 |
| `obj.propertyIsEnumerable(prop)` | プロパティが列挙可能か確認           |

**静的メソッド（Object）**:

Object コンストラクタの静的メソッド。

| メソッド                                       | 説明                                         |
| ---------------------------------------------- | -------------------------------------------- |
| `Object.keys(obj)`                             | オブジェクトのキーの配列を取得               |
| `Object.values(obj)`                           | オブジェクトの値の配列を取得                 |
| `Object.entries(obj)`                          | オブジェクトのキーと値のペアの配列を取得     |
| `Object.assign(target, ...sources)`            | オブジェクトをマージ（コピー）               |
| `Object.create(proto)`                         | プロトタイプを指定して新しいオブジェクト生成 |
| `Object.freeze(obj)`                           | オブジェクトを凍結（変更不可）               |
| `Object.seal(obj)`                             | オブジェクトを封印（追加削除不可）           |
| `Object.defineProperty(obj, prop, descriptor)` | プロパティを定義                             |
| `Object.getPrototypeOf(obj)`                   | プロトタイプを取得                           |
| `Object.setPrototypeOf(obj, proto)`            | プロトタイプを設定                           |

**実用例**:

### **インスタンスメソッド**

```javascript
const obj = { name: "John", age: 30 };

// toString
console.log(obj.toString()); // "[object Object]"

// valueOf
console.log(obj.valueOf()); // { name: "John", age: 30 }

// hasOwnProperty
console.log(obj.hasOwnProperty("name")); // true
console.log(obj.hasOwnProperty("toString")); // false（継承されたメソッド）

// Date での例
const date = new Date("2000/01/01");
console.log(date.toString()); // "Sat Jan 01 2000 00:00:00 GMT+0900 (日本標準時)"
console.log(date.valueOf()); // 946652400000（Unix タイムスタンプ）
```

### **Object.keys()、Object.values()、Object.entries()**

```javascript
const user = { name: "Alice", age: 25, city: "Tokyo" };

// キーの配列
const keys = Object.keys(user);
console.log(keys); // ["name", "age", "city"]

// 値の配列
const values = Object.values(user);
console.log(values); // ["Alice", 25, "Tokyo"]

// キーと値のペアの配列
const entries = Object.entries(user);
console.log(entries); // [["name", "Alice"], ["age", 25], ["city", "Tokyo"]]

// ループでの使用
for (const [key, value] of Object.entries(user)) {
  console.log(`${key}: ${value}`);
}
// name: Alice
// age: 25
// city: Tokyo
```

### **Object.assign()（オブジェクトのマージ）**

```javascript
const target = { a: 1, b: 2 };
const source1 = { b: 3, c: 4 };
const source2 = { c: 5, d: 6 };

Object.assign(target, source1, source2);
console.log(target); // { a: 1, b: 3, c: 5, d: 6 }

// シャローコピー
const original = { a: 1, nested: { b: 2 } };
const copy = Object.assign({}, original);
copy.nested.b = 3;
console.log(original.nested.b); // 3（ネストしたオブジェクトは共有される）

// スプレッド構文（推奨、ES2018+）
const copy2 = { ...original };
```

### **Object.create()（プロトタイプ継承）**

```javascript
// プロトタイプを指定してオブジェクトを作成
const animal = {
  eat() {
    console.log("食べる");
  },
};

const dog = Object.create(animal);
dog.bark = function () {
  console.log("ワンワン");
};

dog.eat(); // "食べる"（animal から継承）
dog.bark(); // "ワンワン"

// プロトタイプなしのオブジェクト（辞書として使う場合）
const dict = Object.create(null);
dict["toString"] = "custom value";
console.log(dict.toString); // "custom value"（メソッドと衝突しない）
```

### **Object.freeze()（オブジェクトの凍結）**

```javascript
const obj = { name: "John", age: 30 };

Object.freeze(obj);

obj.name = "Alice"; // 変更できない（Strict モードではエラー）
obj.city = "Tokyo"; // 追加できない
delete obj.age; // 削除できない

console.log(obj); // { name: "John", age: 30 }

// 凍結されているか確認
console.log(Object.isFrozen(obj)); // true
```

### **Object.seal()（オブジェクトの封印）**

```javascript
const obj = { name: "John", age: 30 };

Object.seal(obj);

obj.name = "Alice"; // 変更はできる
obj.city = "Tokyo"; // 追加はできない
delete obj.age; // 削除はできない

console.log(obj); // { name: "Alice", age: 30 }

// 封印されているか確認
console.log(Object.isSealed(obj)); // true
```

### **Object.defineProperty()（プロパティの詳細定義）**

```javascript
const obj = {};

Object.defineProperty(obj, "name", {
  value: "John",
  writable: false, // 書き込み不可
  enumerable: true, // 列挙可能
  configurable: false, // 再定義・削除不可
});

obj.name = "Alice"; // 変更できない
console.log(obj.name); // "John"

// ゲッター・セッター
Object.defineProperty(obj, "age", {
  get() {
    return this._age || 0;
  },
  set(value) {
    if (value < 0) throw new Error("年齢は0以上");
    this._age = value;
  },
  enumerable: true,
  configurable: true,
});

obj.age = 30;
console.log(obj.age); // 30
```

### **プロトタイプの操作**

```javascript
const obj = { name: "John" };

// プロトタイプを取得
const proto = Object.getPrototypeOf(obj);
console.log(proto === Object.prototype); // true

// プロトタイプを設定
const animal = {
  eat() {
    console.log("食べる");
  },
};
Object.setPrototypeOf(obj, animal);
obj.eat(); // "食べる"

// __proto__（非推奨）
console.log(obj.__proto__ === animal); // true
```

**オブジェクトのチェック**:

```javascript
const obj = { name: "John" };

// オブジェクトかどうか
console.log(typeof obj === "object"); // true
console.log(obj instanceof Object); // true

// 空オブジェクトかどうか
console.log(Object.keys(obj).length === 0); // false

// 同じオブジェクトかどうか
const obj2 = obj;
console.log(obj === obj2); // true（参照が同じ）

const obj3 = { name: "John" };
console.log(obj === obj3); // false（別のオブジェクト）
```

**まとめ**:

- すべてのオブジェクトは `Object.prototype` を継承
- オブジェクトリテラル `{}` が推奨
- `Object.keys()`、`Object.values()`、`Object.entries()` でオブジェクトの操作
- `Object.assign()` でオブジェクトのマージ
- `Object.freeze()` でイミュータブルなオブジェクト

</div>
<div class="note_content_by_programming_language" id="note_content_Java">

```java
Object obj = new Object();
```

Java では **Object** クラスがすべてのクラスの基底クラス。すべてのクラスは暗黙的に `Object` を継承する。

**Object クラスとは**:

Java におけるすべてのクラスの大元。クラスの共通的な機能を提供する。

```java
// すべてのクラスは暗黙的に Object を継承
public class MyClass {
    // extends Object が省略されている
}

// 明示的に書くこともできる
public class MyClass extends Object {
}
```

**Object クラスの主なメソッド**:

| メソッド                            | 説明                                       |
| ----------------------------------- | ------------------------------------------ |
| `toString()`                        | オブジェクトの文字列表現を返す             |
| `equals(Object obj)`                | オブジェクトの等価性を判定                 |
| `hashCode()`                        | オブジェクトのハッシュコードを返す         |
| `getClass()`                        | オブジェクトのクラス情報を取得             |
| `clone()`                           | オブジェクトのコピーを作成                 |
| `finalize()`                        | ガベージコレクション前に呼ばれる（非推奨） |
| `wait()`、`notify()`、`notifyAll()` | スレッド同期用                             |

**実用例**:

### **toString()（文字列表現）**

```java
public class User {
    private String name;
    private int age;

    public User(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // toString() をオーバーライド
    @Override
    public String toString() {
        return "User{name='" + name + "', age=" + age + "}";
    }
}

// 使用例
User user = new User("Alice", 25);
System.out.println(user);  // User{name='Alice', age=25}
System.out.println(user.toString());  // User{name='Alice', age=25}

// デフォルトの toString()（オーバーライドしない場合）
Object obj = new Object();
System.out.println(obj);  // java.lang.Object@15db9742（クラス名@ハッシュコード）
```

### **equals()（等価性の判定）**

```java
public class User {
    private String name;
    private int age;

    public User(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // equals() をオーバーライド
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;

        User user = (User) obj;
        return age == user.age && name.equals(user.name);
    }

    // equals() をオーバーライドする場合は hashCode() も一緒にオーバーライドする
    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }
}

// 使用例
User user1 = new User("Alice", 25);
User user2 = new User("Alice", 25);
User user3 = user1;

System.out.println(user1 == user2);       // false（参照が異なる）
System.out.println(user1.equals(user2));  // true（内容が同じ）
System.out.println(user1 == user3);       // true（参照が同じ）

// デフォルトの equals()（オーバーライドしない場合）
Object obj1 = new Object();
Object obj2 = new Object();
System.out.println(obj1.equals(obj2));  // false（== と同じ）
```

### **hashCode()（ハッシュコード）**

```java
public class User {
    private String name;
    private int age;

    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }
}

// 使用例
User user1 = new User("Alice", 25);
User user2 = new User("Alice", 25);

System.out.println(user1.hashCode());  // 同じ値
System.out.println(user2.hashCode());  // 同じ値

// HashMap などで使用される
Map<User, String> map = new HashMap<>();
map.put(user1, "データ1");
System.out.println(map.get(user2));  // "データ1"（equals() と hashCode() が正しく実装されている場合）
```

### **getClass()（クラス情報の取得）**

```java
User user = new User("Alice", 25);

// クラス情報を取得
Class<?> clazz = user.getClass();
System.out.println(clazz.getName());  // "User"
System.out.println(clazz.getSimpleName());  // "User"

// 型チェック
if (user.getClass() == User.class) {
    System.out.println("User クラスのインスタンス");
}

// instanceof（推奨）
if (user instanceof User) {
    System.out.println("User クラスのインスタンス");
}
```

### **Object 型で任意のオブジェクトを扱う**

```java
public class Main {
    // 任意の型を受け取るメソッド
    public static void printObject(Object obj) {
        System.out.println("クラス: " + obj.getClass().getName());
        System.out.println("文字列: " + obj.toString());
        System.out.println("ハッシュコード: " + obj.hashCode());
    }

    public static void main(String[] args) {
        printObject("Hello");       // String
        printObject(123);           // Integer
        printObject(new User("Alice", 25));  // User
        printObject(new int[]{1, 2, 3});     // int[]
    }
}
```

### **オブジェクトの配列**

```java
// Object 型の配列で異なる型を格納
Object[] objects = new Object[4];
objects[0] = "Hello";
objects[1] = 123;
objects[2] = new User("Alice", 25);
objects[3] = new int[]{1, 2, 3};

for (Object obj : objects) {
    System.out.println(obj.getClass().getName() + ": " + obj);
}
```

**ジェネリクスとの比較**:

```java
// Object を使った場合（型安全でない）
List list1 = new ArrayList();
list1.add("Hello");
list1.add(123);
String str = (String) list1.get(0);  // キャストが必要

// ジェネリクスを使った場合（型安全、推奨）
List<String> list2 = new ArrayList<>();
list2.add("Hello");
// list2.add(123);  // コンパイルエラー
String str2 = list2.get(0);  // キャスト不要
```

**まとめ**:

- すべてのクラスは `Object` を継承
- `toString()`、`equals()`、`hashCode()` をオーバーライドすることが多い
- `Object` 型で任意のオブジェクトを扱える
- 現代的なコードではジェネリクスを推奨

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
class MyClass:
    pass  # object を暗黙的に継承
```

Python では **object** クラスがすべてのクラスの基底クラス（Python 3）。すべてのクラスは暗黙的に `object` を継承する。

**object クラスとは**:

Python におけるすべてのクラスの大元。クラスの共通的な機能を提供する。

```python
# Python 3 ではすべてのクラスは暗黙的に object を継承
class MyClass:
    pass

# 明示的に書くこともできる
class MyClass(object):
    pass

# 継承関係の確認
print(issubclass(MyClass, object))  # True
print(isinstance(MyClass(), object))  # True
```

**object クラスの主なメソッド**:

| メソッド                 | 説明                                   |
| ------------------------ | -------------------------------------- |
| `__str__()`              | オブジェクトの文字列表現（人間向け）   |
| `__repr__()`             | オブジェクトの文字列表現（開発者向け） |
| `__eq__(other)`          | 等価性の判定（`==`）                   |
| `__hash__()`             | オブジェクトのハッシュ値               |
| `__init__()`             | コンストラクタ                         |
| `__new__(cls)`           | インスタンス生成                       |
| `__del__()`              | デストラクタ                           |
| `__getattribute__(name)` | 属性へのアクセス                       |
| `__setattr__(name, val)` | 属性への代入                           |
| `__delattr__(name)`      | 属性の削除                             |

**実用例**:

### \***\*str**()と**repr**()（文字列表現）\*\*

```python
class User:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    # __str__() をオーバーライド（print() などで使われる）
    def __str__(self):
        return f"User(name='{self.name}', age={self.age})"

    # __repr__() をオーバーライド（repr() や対話モードで使われる）
    def __repr__(self):
        return f"User('{self.name}', {self.age})"

# 使用例
user = User("Alice", 25)
print(user)       # User(name='Alice', age=25)（__str__）
print(str(user))  # User(name='Alice', age=25)（__str__）
print(repr(user)) # User('Alice', 25)（__repr__）

# デフォルトの __str__() と __repr__()（オーバーライドしない場合）
class Empty:
    pass

obj = Empty()
print(str(obj))   # <__main__.Empty object at 0x...>
print(repr(obj))  # <__main__.Empty object at 0x...>
```

### \***\*eq**()（等価性の判定）\*\*

```python
class User:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    # __eq__() をオーバーライド
    def __eq__(self, other):
        if not isinstance(other, User):
            return False
        return self.name == other.name and self.age == other.age

    # __hash__() もオーバーライド（辞書のキーやセットで使う場合）
    def __hash__(self):
        return hash((self.name, self.age))

# 使用例
user1 = User("Alice", 25)
user2 = User("Alice", 25)
user3 = user1

print(user1 is user2)   # False（異なるオブジェクト）
print(user1 == user2)   # True（内容が同じ）
print(user1 is user3)   # True（同じオブジェクト）

# デフォルトの __eq__()（オーバーライドしない場合）
class Empty:
    pass

obj1 = Empty()
obj2 = Empty()
print(obj1 == obj2)  # False（is と同じ）
```

### \***\*hash**()（ハッシュ値）\*\*

```python
class User:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def __eq__(self, other):
        if not isinstance(other, User):
            return False
        return self.name == other.name and self.age == other.age

    def __hash__(self):
        return hash((self.name, self.age))

# 使用例
user1 = User("Alice", 25)
user2 = User("Alice", 25)

print(hash(user1))  # 同じ値
print(hash(user2))  # 同じ値

# 辞書のキーやセットで使用
users = {user1: "データ1"}
print(users[user2])  # "データ1"（__eq__() と __hash__() が正しく実装されている場合）

user_set = {user1, user2}
print(len(user_set))  # 1（同じとみなされる）
```

### **type()と isinstance()（型の確認）**

```python
user = User("Alice", 25)

# 型を取得
print(type(user))  # <class '__main__.User'>
print(type(user).__name__)  # "User"

# 型チェック
if type(user) == User:
    print("User クラスのインスタンス")

# isinstance()（推奨、継承も考慮）
if isinstance(user, User):
    print("User クラスのインスタンス")

if isinstance(user, object):
    print("object クラスのインスタンス")  # すべてのオブジェクトで True
```

### **任意の型を扱う関数**

```python
def print_info(obj):
    """任意の型のオブジェクトを受け取る"""
    print(f"型: {type(obj).__name__}")
    print(f"文字列: {str(obj)}")
    print(f"repr: {repr(obj)}")
    print(f"属性: {dir(obj)[:5]}...")  # 最初の5個の属性

# 使用例
print_info("Hello")
print_info(123)
print_info(User("Alice", 25))
print_info([1, 2, 3])
```

### **オブジェクトの属性操作**

```python
class User:
    def __init__(self, name, age):
        self.name = name
        self.age = age

user = User("Alice", 25)

# 属性の取得
print(getattr(user, "name"))  # "Alice"
print(getattr(user, "city", "Unknown"))  # "Unknown"（デフォルト値）

# 属性の設定
setattr(user, "city", "Tokyo")
print(user.city)  # "Tokyo"

# 属性の存在確認
print(hasattr(user, "name"))  # True
print(hasattr(user, "country"))  # False

# 属性の削除
delattr(user, "city")
print(hasattr(user, "city"))  # False

# すべての属性を取得
print(dir(user))  # ['__class__', '__delattr__', ..., 'age', 'name']
print(vars(user))  # {'name': 'Alice', 'age': 25}
```

**型アノテーションでの使用**:

```python
from typing import Any

# 任意の型を受け取る（object よりも明示的）
def process(value: Any) -> None:
    print(value)

# object 型
def process2(value: object) -> None:
    print(value)
```

**まとめ**:

- Python 3 ではすべてのクラスは暗黙的に `object` を継承
- `__str__()`、`__repr__()`、`__eq__()`、`__hash__()` をオーバーライドすることが多い
- `isinstance()` で型チェック
- 型アノテーションでは `Any` が推奨

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
var x any
```

Go では **any**（`interface{}`のエイリアス、Go 1.18+）が、あらゆる型の値を受け取ることができる特別な型。

**any 型とは**:

Go 1.18+ で導入された `interface{}` のエイリアス。すべての型は暗黙的に `any` を満たす（空のインターフェース）。

```go
// Go 1.18+（推奨）
var x any
x = 42
x = "hello"

// Go 1.17 以前（または明示的に書く場合）
var y interface{}
y = 42
y = "hello"

// any は interface{} と同じ
var z any = 42
var w interface{} = 42
// z と w は同じ型
```

**基本的な使い方**:

```go
package main

import "fmt"

func main() {
    var x any

    // 任意の型を代入できる
    x = 42
    fmt.Println(x)  // 42

    x = "hello"
    fmt.Println(x)  // hello

x = []int{1, 2, 3}
    fmt.Println(x)  // [1 2 3]

    x = true
    fmt.Println(x)  // true
}
```

**任意の型を受け取る関数**:

```go
// 任意の型を受け取る
func printAny(value any) {
    fmt.Println("値:", value)
    fmt.Printf("型: %T\n", value)
}

func main() {
    printAny("Go")     // 値: Go, 型: string
    printAny(123)      // 値: 123, 型: int
    printAny(true)     // 値: true, 型: bool
    printAny(3.14)     // 値: 3.14, 型: float64
}
```

**any 型の制限**:

`any` 型では演算や型固有のメソッドは使えない。

```go
var x, y any
x = 1
y = 2

// エラー: 演算できない
// z := x + y

// エラー: メソッドを呼べない
// length := x.Length()
```

**型アサーション（Type Assertion）**:

`any` 型から具体的な型に変換する。

```go
var x any = "hello"

// 型アサーション（値, ok パターン）
str, ok := x.(string)
if ok {
    fmt.Println("文字列:", str)  // "文字列: hello"
} else {
    fmt.Println("string 型ではない")
}

// 型アサーション（ok なし、失敗時にパニック）
str2 := x.(string)
fmt.Println(str2)  // "hello"

// 失敗例
var y any = 123
// str3 := y.(string)  // panic: interface conversion
```

**型スイッチ（Type Switch）**:

複数の型を処理する。

```go
func describe(value any) {
    switch v := value.(type) {
    case string:
        fmt.Printf("文字列: %s (長さ %d)\n", v, len(v))
    case int:
        fmt.Printf("整数: %d\n", v)
    case bool:
        fmt.Printf("真偽値: %t\n", v)
    case []int:
        fmt.Printf("整数スライス: %v\n", v)
    case nil:
        fmt.Println("nil")
    default:
        fmt.Printf("未知の型: %T\n", v)
    }
}

func main() {
    describe("Go")           // 文字列: Go (長さ 2)
    describe(123)            // 整数: 123
    describe(true)           // 真偽値: true
    describe([]int{1, 2, 3}) // 整数スライス: [1 2 3]
    describe(3.14)           // 未知の型: float64
}
```

**実用例**:

### **JSON のデコード**

```go
import (
    "encoding/json"
    "fmt"
)

func main() {
    jsonStr := `{"name": "Alice", "age": 25, "active": true}`

    var data map[string]any
    json.Unmarshal([]byte(jsonStr), &data)

    fmt.Println(data["name"])    // Alice
    fmt.Println(data["age"])     // 25
    fmt.Println(data["active"])  // true

    // 型アサーションで具体的な型に変換
    if name, ok := data["name"].(string); ok {
        fmt.Println("名前:", name)
    }

    // 型スイッチで処理
    for key, value := range data {
        fmt.Printf("%s: ", key)
        switch v := value.(type) {
        case string:
            fmt.Printf("文字列 %s\n", v)
        case float64:  // JSON の数値は float64
            fmt.Printf("数値 %.0f\n", v)
        case bool:
            fmt.Printf("真偽値 %t\n", v)
        }
    }
}
```

### **任意の型のスライス**

```go
func printSlice(items []any) {
    for i, item := range items {
        fmt.Printf("[%d]: %v (型: %T)\n", i, item, item)
    }
}

func main() {
    items := []any{"Go", 123, true, 3.14, []int{1, 2}}
    printSlice(items)
    // [0]: Go (型: string)
    // [1]: 123 (型: int)
    // [2]: true (型: bool)
    // [3]: 3.14 (型: float64)
    // [4]: [1 2] (型: []int)
}
```

### **構造体での使用**

```go
type Response struct {
    Status string
    Data   any  // 任意の型
}

func main() {
    // 文字列データ
    resp1 := Response{
        Status: "success",
        Data:   "Hello",
    }

    // マップデータ
    resp2 := Response{
        Status: "success",
        Data:   map[string]int{"count": 10},
    }

    // 構造体データ
    type User struct {
        Name string
        Age  int
    }
    resp3 := Response{
        Status: "success",
        Data:   User{Name: "Alice", Age: 25},
    }

    // Data を型アサーションで取り出す
    if user, ok := resp3.Data.(User); ok {
        fmt.Printf("ユーザー: %s, %d歳\n", user.Name, user.Age)
    }
}
```

**ジェネリクスとの比較（Go 1.18+）**:

```go
// any を使った場合（型安全でない）
func printAny(value any) {
    fmt.Println(value)
}

// ジェネリクスを使った場合（型安全、推奨）
func print[T any](value T) {
    fmt.Println(value)
}

func main() {
    printAny("Go")
    printAny(123)

    print("Go")   // T = string
    print(123)    // T = int
}
```

**まとめ**:

- `any` は `interface{}` のエイリアス（Go 1.18+）
- すべての型を受け取れる
- 型アサーションで具体的な型に変換
- 型スイッチで複数の型を処理
- ジェネリクスが使える場合はジェネリクスを推奨

</div>
