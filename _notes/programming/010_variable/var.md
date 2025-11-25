---
title: "変数を宣言する"
date: "2019-11-01T00:37:30+09:00"
excerpt: "変数を宣言する方法について"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-11-01T00:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

変数を宣言する方法について説明する。各言語で異なる宣言方法がある。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
Type variableName = value;
```

Java は静的型付け言語のため、変数の宣言時に型を指定する必要がある。

**基本的な変数宣言**:

```java
int a = 3;
String name = "John";
double pi = 3.14;
boolean flag = true;
```

**宣言と代入を分離**:

```java
int b;
b = 2;

String message;
message = "Hello";
```

**複数の変数を同時に宣言**:

```java
int x = 10, y = 20, z = 30;

String firstName = "John", lastName = "Doe";
```

**型推論（Java 10+）**:

`var`キーワードを使うと、型を自動的に推論してくれる（ローカル変数のみ）。

```java
var number = 100;          // int
var text = "Hello";        // String
var decimal = 3.14;        // double
var list = new ArrayList<String>();  // ArrayList<String>
```

**注意**: `var`はローカル変数でのみ使用可能。フィールド、メソッドパラメータ、戻り値には使用できない。

**定数（final）**:

`final`キーワードで再代入できない定数を宣言する。

```java
final int MAX_SIZE = 100;
final String APP_NAME = "MyApp";

// MAX_SIZE = 200;  // エラー: 再代入不可
```

**静的定数**:

クラスレベルで共有される定数。

```java
public class Constants {
    public static final int MAX_VALUE = 1000;
    public static final String VERSION = "1.0.0";
}

// 使用例
int max = Constants.MAX_VALUE;
```

**主なデータ型**:

| 型        | 説明                      | 例                       |
| --------- | ------------------------- | ------------------------ |
| `int`     | 整数（32 ビット）         | `int age = 25;`          |
| `long`    | 長整数（64 ビット）       | `long count = 1000000L;` |
| `double`  | 浮動小数点数（64 ビット） | `double pi = 3.14;`      |
| `float`   | 浮動小数点数（32 ビット） | `float rate = 0.5f;`     |
| `boolean` | 真偽値                    | `boolean flag = true;`   |
| `char`    | 文字                      | `char grade = 'A';`      |
| `String`  | 文字列                    | `String name = "John";`  |

**初期値**:

ローカル変数は初期化が必須。フィールドは自動的に初期化される。

```java
public class Example {
    int field;  // 自動的に 0 で初期化

    public void method() {
        int local;  // 初期化されない
        // System.out.println(local);  // エラー: 初期化されていない

        int initialized = 0;  // OK
        System.out.println(initialized);
    }
}
```

**スコープ**:

変数のスコープは宣言された場所によって異なる。

```java
public class Example {
    int instanceVariable;  // インスタンス変数
    static int classVariable;  // クラス変数

    public void method() {
        int localVariable = 10;  // ローカル変数

        if (true) {
            int blockVariable = 20;  // ブロック変数
            System.out.println(localVariable);  // OK
        }

        // System.out.println(blockVariable);  // エラー: スコープ外
    }
}
```

**実用例**:

```java
public class User {
    // インスタンス変数
    private int id;
    private String name;
    private int age;

    // 定数
    public static final int MIN_AGE = 0;
    public static final int MAX_AGE = 150;

    public User(int id, String name, int age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }

    public void updateAge(int newAge) {
        // ローカル変数
        int oldAge = this.age;

        if (newAge >= MIN_AGE && newAge <= MAX_AGE) {
            this.age = newAge;
            System.out.println("年齢を " + oldAge + " から " + newAge + " に更新しました");
        }
    }
}
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
variable_name = value
```

Python は動的型付け言語のため、変数の型を宣言する必要はない。値を代入するだけで変数が作成される。

**基本的な変数宣言**:

```python
a = 1
name = "John"
pi = 3.14
flag = True
```

**動的型付け**:

一つの変数にどのような型の値も代入できる。

```python
x = 10        # int
print(x)      # 10

x = "Hello"   # str に変更
print(x)      # "Hello"

x = 3.14      # float に変更
print(x)      # 3.14
```

**複数の変数を同時に宣言**:

```python
# 複数の値を同時に代入
x, y, z = 10, 20, 30

# 同じ値を複数の変数に代入
a = b = c = 0

# アンパック
first, second = [1, 2]
```

**型ヒント（Type Hints, Python 3.5+）**:

型を明示的に指定できる（実行時には影響しないが、開発ツールや linter で活用される）。

```python
age: int = 25
name: str = "John"
pi: float = 3.14
is_active: bool = True

# リストや辞書の型ヒント
numbers: list[int] = [1, 2, 3, 4, 5]
scores: dict[str, int] = {"Alice": 90, "Bob": 85}
```

**定数（慣例）**:

Python には厳密な定数はないが、大文字で書くのが慣例。

```python
MAX_SIZE = 100
APP_NAME = "MyApp"
PI = 3.14159

# 慣例的に変更しないが、実際には変更可能
MAX_SIZE = 200  # 可能だが推奨されない
```

**グローバル変数とローカル変数**:

```python
# グローバル変数
global_var = "Global"

def my_function():
    # ローカル変数
    local_var = "Local"
    print(local_var)   # OK
    print(global_var)  # OK

my_function()
# print(local_var)  # エラー: スコープ外
```

**global キーワード**:

関数内でグローバル変数を変更する場合に使用。

```python
counter = 0

def increment():
    global counter
    counter += 1
    print(counter)

increment()  # 1
increment()  # 2
```

**nonlocal キーワード**:

ネストした関数で外側の変数を変更する場合に使用。

```python
def outer():
    x = 10

    def inner():
        nonlocal x
        x = 20
        print(f"inner: {x}")  # 20

    inner()
    print(f"outer: {x}")  # 20

outer()
```

**主なデータ型**:

```python
# 数値型
integer = 42                    # int
floating = 3.14                 # float
complex_num = 1 + 2j            # complex

# 文字列
text = "Hello"                  # str
multiline = """Multiple
lines"""

# ブール値
flag = True                     # bool

# None
nothing = None                  # NoneType

# コレクション
numbers = [1, 2, 3]             # list
coords = (10, 20)               # tuple
unique = {1, 2, 3}              # set
mapping = {"key": "value"}      # dict
```

**アンパックとスワップ**:

```python
# アンパック
point = (10, 20)
x, y = point
print(x, y)  # 10 20

# スワップ（値の交換）
a, b = 1, 2
a, b = b, a  # Pythonならではの簡潔な書き方
print(a, b)  # 2 1
```

**アンダースコア変数**:

不要な値を無視する慣例。

```python
# 一部の値を無視
x, _, z = (1, 2, 3)
print(x, z)  # 1 3

# 複数の値を無視
first, *_, last = [1, 2, 3, 4, 5]
print(first, last)  # 1 5
```

**実用例**:

```python
class User:
    # クラス変数（定数）
    MIN_AGE = 0
    MAX_AGE = 150

    def __init__(self, id: int, name: str, age: int):
        # インスタンス変数
        self.id = id
        self.name = name
        self.age = age

    def update_age(self, new_age: int):
        # ローカル変数
        old_age = self.age

        if self.MIN_AGE <= new_age <= self.MAX_AGE:
            self.age = new_age
            print(f"年齢を {old_age} から {new_age} に更新しました")
        else:
            print(f"年齢は {self.MIN_AGE} から {self.MAX_AGE} の範囲で指定してください")

# 使用例
user = User(1, "John", 25)
user.update_age(26)
```

**変数名の規則**:

```python
# スネークケースが推奨
user_name = "John"
total_count = 100

# クラス名はパスカルケース
class UserAccount:
    pass

# 定数は大文字のスネークケース
MAX_RETRY_COUNT = 3
DEFAULT_TIMEOUT = 30
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
let variableName = value;
const constantName = value;
```

JavaScript では`let`、`const`、`var`で変数を宣言する。現代では`let`と`const`が推奨される。

**let（推奨）**:

再代入可能な変数を宣言する。

```javascript
let age = 25;
let name = "John";
let isActive = true;

age = 26; // OK: 再代入可能
```

**const（推奨）**:

再代入不可能な定数を宣言する。

```javascript
const MAX_SIZE = 100;
const PI = 3.14159;
const APP_NAME = "MyApp";

// MAX_SIZE = 200;  // エラー: 再代入不可
```

**注意**: `const`はオブジェクトや配列の再代入を防ぐが、内容の変更は可能。

```javascript
const numbers = [1, 2, 3];
numbers.push(4); // OK: 内容の変更は可能
numbers = [5, 6]; // エラー: 再代入不可

const person = { name: "John" };
person.age = 25; // OK: プロパティの変更は可能
person = {}; // エラー: 再代入不可
```

**var（非推奨）**:

従来の変数宣言方法。スコープの問題があるため、現代では使用を避ける。

```javascript
var x = 10;
var x = 20; // OK: 再宣言可能（混乱の元）
```

**宣言と代入を分離**:

```javascript
let message;
message = "Hello";

let count;
count = 100;
```

**複数の変数を同時に宣言**:

```javascript
let x = 10,
  y = 20,
  z = 30;

const firstName = "John",
  lastName = "Doe";
```

**let vs const の使い分け**:

- 値が変更される場合: `let`
- 値が変更されない場合: `const`（デフォルトで`const`を使い、必要に応じて`let`に変更）

```javascript
let count = 0; // 変更される
count++;

const MAX = 100; // 変更されない
```

**var, let, const の違い**:

| 特徴           | var               | let              | const            |
| -------------- | ----------------- | ---------------- | ---------------- |
| 再代入         | 可能              | 可能             | 不可             |
| 再宣言         | 可能              | 不可             | 不可             |
| スコープ       | 関数スコープ      | ブロックスコープ | ブロックスコープ |
| ホイスティング | あり（undefined） | あり（TDZ）      | あり（TDZ）      |

**ブロックスコープ（let/const）**:

```javascript
{
  let blockScoped = "inside";
  const alsoBlockScoped = "inside";
  console.log(blockScoped); // OK
}
// console.log(blockScoped);  // エラー: スコープ外
```

**関数スコープ（var）**:

```javascript
function example() {
  var functionScoped = "inside";
  console.log(functionScoped); // OK
}
example();
// console.log(functionScoped);  // エラー: スコープ外
```

**var の問題点**:

```javascript
// ブロックスコープが効かない
if (true) {
  var x = 10;
}
console.log(x); // 10（ブロック外でもアクセス可能）

// let/const の場合
if (true) {
  let y = 20;
}
// console.log(y);  // エラー: スコープ外
```

**ホイスティング**:

```javascript
// var のホイスティング
console.log(a); // undefined（エラーにならない）
var a = 10;

// let/const のホイスティング（TDZ: Temporal Dead Zone）
// console.log(b);  // エラー: 初期化前にアクセス不可
let b = 20;
```

**主なデータ型**:

```javascript
// プリミティブ型
let num = 42; // number
let text = "Hello"; // string
let flag = true; // boolean
let nothing = null; // null
let notDefined = undefined; // undefined
let symbol = Symbol("id"); // symbol
let bigInt = 9007199254740991n; // bigint

// オブジェクト型
let obj = { key: "value" }; // object
let arr = [1, 2, 3]; // array（実際はobject）
let func = function () {}; // function（実際はobject）
```

**typeof 演算子**:

```javascript
let x = 10;
console.log(typeof x); // "number"

x = "Hello";
console.log(typeof x); // "string"

x = true;
console.log(typeof x); // "boolean"
```

**分割代入**:

```javascript
// 配列の分割代入
const [a, b, c] = [1, 2, 3];
console.log(a, b, c); // 1 2 3

// オブジェクトの分割代入
const person = { name: "John", age: 25 };
const { name, age } = person;
console.log(name, age); // "John" 25
```

**グローバル変数とローカル変数**:

```javascript
// グローバル変数
let globalVar = "Global";

function myFunction() {
  // ローカル変数
  let localVar = "Local";
  console.log(localVar); // OK
  console.log(globalVar); // OK
}

myFunction();
// console.log(localVar);  // エラー: スコープ外
```

**実用例**:

```javascript
class User {
  // クラスフィールド（定数）
  static MIN_AGE = 0;
  static MAX_AGE = 150;

  constructor(id, name, age) {
    // インスタンス変数
    this.id = id;
    this.name = name;
    this.age = age;
  }

  updateAge(newAge) {
    // ローカル変数
    const oldAge = this.age;

    if (newAge >= User.MIN_AGE && newAge <= User.MAX_AGE) {
      this.age = newAge;
      console.log(`年齢を ${oldAge} から ${newAge} に更新しました`);
    } else {
      console.log(
        `年齢は ${User.MIN_AGE} から ${User.MAX_AGE} の範囲で指定してください`
      );
    }
  }
}

// 使用例
const user = new User(1, "John", 25);
user.updateAge(26);
```

**変数名の規則**:

```javascript
// キャメルケースが推奨
let userName = "John";
let totalCount = 100;

// クラス名はパスカルケース
class UserAccount {}

// 定数は大文字のスネークケース
const MAX_RETRY_COUNT = 3;
const DEFAULT_TIMEOUT = 30;
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
var variableName Type = value
variableName := value
```

Go は静的型付け言語だが、型推論により型を省略できる。明示的な宣言と短縮宣言の 2 種類がある。

**明示的な変数宣言（var）**:

型を明示的に指定する方法。

```go
var age int = 25
var name string = "John"
var pi float64 = 3.14
var flag bool = true
```

**型推論（var）**:

初期値から型を推論する。

```go
var age = 25        // int
var name = "John"   // string
var pi = 3.14       // float64
var flag = true     // bool
```

**宣言と代入を分離**:

```go
var count int
count = 100

var message string
message = "Hello"
```

**短縮宣言（:=、推奨）**:

関数内でのみ使用可能。型推論により型を自動的に決定する。

```go
age := 25          // int
name := "John"     // string
pi := 3.14         // float64
flag := true       // bool
```

**注意**: `:=`は関数内でのみ使用可能。パッケージレベルでは`var`を使用する必要がある。

**複数の変数を同時に宣言**:

```go
// var を使う
var x, y, z int = 10, 20, 30
var a, b = 100, "text"

// := を使う
x, y, z := 10, 20, 30
firstName, lastName := "John", "Doe"
```

**ゼロ値**:

初期値を指定しない場合、型に応じたゼロ値が自動的に設定される。

```go
var i int        // 0
var f float64    // 0.0
var s string     // "" (空文字列)
var b bool       // false
var p *int       // nil
```

**定数（const）**:

変更できない値を宣言する。

```go
const MaxSize = 100
const PI = 3.14159
const AppName = "MyApp"

// MaxSize = 200  // エラー: 再代入不可
```

**複数の定数を同時に宣言**:

```go
const (
    StatusOK    = 200
    StatusError = 500
)

const (
    MinAge = 0
    MaxAge = 150
)
```

**可視性（Public/Private）**:

変数名の最初の文字で可視性が決まる。

- **大文字で始まる**: パッケージ外部からアクセス可能（Public）
- **小文字で始まる**: パッケージ内でのみアクセス可能（Private）

```go
package mypackage

// Public: 他のパッケージからアクセス可能
var PublicVar = "public"
const PublicConst = 100

// Private: このパッケージ内でのみアクセス可能
var privateVar = "private"
const privateConst = 200
```

**主なデータ型**:

```go
// 整数型
var i8 int8 = 127           // 8ビット整数
var i16 int16 = 32767       // 16ビット整数
var i32 int32 = 2147483647  // 32ビット整数
var i64 int64 = 9223372036854775807  // 64ビット整数
var i int = 100             // プラットフォーム依存（32または64ビット）

// 浮動小数点数
var f32 float32 = 3.14      // 32ビット浮動小数点数
var f64 float64 = 3.14159   // 64ビット浮動小数点数

// 文字列とブール値
var s string = "Hello"
var b bool = true

// ポインタ
var p *int = &i
```

**var との違い（:=）**:

```go
// var: パッケージレベルでも使用可能
var globalVar = 100

func main() {
    // := 関数内でのみ使用可能
    localVar := 200

    // var も関数内で使用可能
    var anotherVar = 300
}
```

**再宣言の制約**:

`:=`は少なくとも 1 つの新しい変数が必要。

```go
x := 10
// x := 20  // エラー: 再宣言不可

// 少なくとも1つの新しい変数があれば OK
x, y := 20, 30  // OK: y が新しい変数
```

**グローバル変数とローカル変数**:

```go
package main

import "fmt"

// グローバル変数
var globalVar = "Global"

func main() {
    // ローカル変数
    localVar := "Local"

    fmt.Println(globalVar)  // OK
    fmt.Println(localVar)   // OK
}

func other() {
    fmt.Println(globalVar)  // OK
    // fmt.Println(localVar)  // エラー: スコープ外
}
```

**スコープ**:

```go
func example() {
    x := 10  // 関数スコープ

    if true {
        y := 20  // ブロックスコープ
        fmt.Println(x)  // OK
        fmt.Println(y)  // OK
    }

    fmt.Println(x)  // OK
    // fmt.Println(y)  // エラー: スコープ外
}
```

**実用例**:

```go
package main

import "fmt"

// パッケージレベルの定数
const (
    MinAge = 0
    MaxAge = 150
)

type User struct {
    ID   int
    Name string
    Age  int
}

func NewUser(id int, name string, age int) *User {
    return &User{
        ID:   id,
        Name: name,
        Age:  age,
    }
}

func (u *User) UpdateAge(newAge int) {
    // ローカル変数
    oldAge := u.Age

    if newAge >= MinAge && newAge <= MaxAge {
        u.Age = newAge
        fmt.Printf("年齢を %d から %d に更新しました\n", oldAge, newAge)
    } else {
        fmt.Printf("年齢は %d から %d の範囲で指定してください\n", MinAge, MaxAge)
    }
}

func main() {
    // 短縮宣言
    user := NewUser(1, "John", 25)
    user.UpdateAge(26)
}
```

**変数名の規則**:

```go
// キャメルケースまたはパスカルケース
userName := "John"      // private
UserName := "John"      // public
totalCount := 100       // private
TotalCount := 100       // public

// 定数は大文字のスネークケースまたはパスカルケース
const MaxRetryCount = 3
const DEFAULT_TIMEOUT = 30
```

**型変換**:

Go では暗黙的な型変換がないため、明示的に変換する必要がある。

```go
var i int = 42
var f float64 = float64(i)  // 明示的な型変換
var u uint = uint(f)

// i = f  // エラー: 暗黙的な型変換は不可
```

</div>
