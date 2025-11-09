---
title: "関数(メソッド)の定義"
date: "2019-10-29T04:37:30+09:00"
excerpt: "関数(メソッド)の定義について"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-29T04:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

関数・メソッドを定義する方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
public ReturnType methodName(args) { }
```

Java ではクラス内で定義する関数を**メソッド**と呼ぶ。

**基本的なメソッド定義**:

```java
class Calculator {
    // インスタンスメソッド
    public int add(int a, int b) {
        return a + b;
    }

    // 返り値がないメソッド
    public void printSum(int a, int b) {
        System.out.println("合計: " + (a + b));
    }
}

// 使用例
Calculator calc = new Calculator();
int result = calc.add(5, 3);
System.out.println(result);  // 8
calc.printSum(5, 3);  // 合計: 8
```

**静的メソッド（static）**:

インスタンス化せずに呼び出せるメソッド。

```java
class MathUtil {
    // 静的メソッド
    public static int multiply(int a, int b) {
        return a * b;
    }

    public static double divide(double a, double b) {
        if (b == 0) {
            throw new IllegalArgumentException("0 で割ることはできません");
        }
        return a / b;
    }
}

// インスタンス化せずに呼び出し
int result = MathUtil.multiply(4, 5);
System.out.println(result);  // 20

double division = MathUtil.divide(10.0, 2.0);
System.out.println(division);  // 5.0
```

**アクセス修飾子**:

```java
class Example {
    // public: どこからでもアクセス可能
    public void publicMethod() {
        System.out.println("public メソッド");
    }

    // private: クラス内からのみアクセス可能
    private void privateMethod() {
        System.out.println("private メソッド");
    }

    // protected: 同じパッケージまたはサブクラスからアクセス可能
    protected void protectedMethod() {
        System.out.println("protected メソッド");
    }

    // デフォルト（修飾子なし）: 同じパッケージからアクセス可能
    void defaultMethod() {
        System.out.println("default メソッド");
    }
}
```

**メソッドのオーバーロード**:

引数の型や数を変えて、同名のメソッドを複数定義できる。

```java
class Calculator {
    public int add(int a, int b) {
        return a + b;
    }

    public double add(double a, double b) {
        return a + b;
    }

    public int add(int a, int b, int c) {
        return a + b + c;
    }
}

Calculator calc = new Calculator();
System.out.println(calc.add(1, 2));        // 3
System.out.println(calc.add(1.5, 2.5));    // 4.0
System.out.println(calc.add(1, 2, 3));     // 6
```

**可変長引数**:

```java
class MathUtil {
    public static int sum(int... numbers) {
        int total = 0;
        for (int num : numbers) {
            total += num;
        }
        return total;
    }
}

System.out.println(MathUtil.sum(1, 2, 3));        // 6
System.out.println(MathUtil.sum(1, 2, 3, 4, 5));  // 15
```

**ジェネリックメソッド**:

```java
class ArrayUtil {
    public static <T> void printArray(T[] array) {
        for (T element : array) {
            System.out.print(element + " ");
        }
        System.out.println();
    }
}

Integer[] intArray = {1, 2, 3};
String[] strArray = {"A", "B", "C"};

ArrayUtil.printArray(intArray);  // 1 2 3
ArrayUtil.printArray(strArray);  // A B C
```

**実用例（クラス内のメソッド）**:

```java
class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // getter
    public String getName() {
        return name;
    }

    // setter
    public void setAge(int age) {
        if (age >= 0) {
            this.age = age;
        }
    }

    // インスタンスメソッド
    public void introduce() {
        System.out.println("私は " + name + "、" + age + " 歳です");
    }

    public boolean isAdult() {
        return age >= 20;
    }
}

Person person = new Person("Alice", 25);
person.introduce();  // 私は Alice、25 歳です
System.out.println(person.isAdult());  // true
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
def function_name(args):
```

Python では`def`キーワードを使って関数を定義する。

**基本的な関数定義**:

```python
# 返り値がある関数
def add(a, b):
    return a + b

# 返り値がない関数
def print_sum(a, b):
    print(f"合計: {a + b}")

# 使用例
result = add(5, 3)
print(result)  # 8
print_sum(5, 3)  # 合計: 8
```

**デフォルト引数**:

```python
def greet(name, message="こんにちは"):
    print(f"{message}、{name}さん")

greet("Alice")                    # こんにちは、Aliceさん
greet("Bob", "おはよう")           # おはよう、Bobさん
```

**キーワード引数**:

```python
def create_person(name, age, email=None):
    return {"name": name, "age": age, "email": email}

# 位置引数
person1 = create_person("Alice", 25)

# キーワード引数
person2 = create_person(name="Bob", age=30, email="bob@example.com")

# 混在
person3 = create_person("Charlie", age=35)
```

**可変長引数**:

```python
# *args: 位置引数を任意個受け取る
def sum_all(*numbers):
    return sum(numbers)

print(sum_all(1, 2, 3))        # 6
print(sum_all(1, 2, 3, 4, 5))  # 15

# **kwargs: キーワード引数を任意個受け取る
def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="Alice", age=25, city="Tokyo")
# 出力:
# name: Alice
# age: 25
# city: Tokyo
```

**型ヒント（Type Hints）**:

```python
def add(a: int, b: int) -> int:
    return a + b

def greet(name: str) -> None:
    print(f"こんにちは、{name}さん")

result: int = add(5, 3)
print(result)  # 8
```

**クラス内のメソッド**:

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    # インスタンスメソッド
    def introduce(self):
        print(f"私は {self.name}、{self.age} 歳です")

    def is_adult(self):
        return self.age >= 20

    # クラスメソッド
    @classmethod
    def from_dict(cls, data):
        return cls(data["name"], data["age"])

    # 静的メソッド
    @staticmethod
    def validate_age(age):
        return age >= 0

person = Person("Alice", 25)
person.introduce()  # 私は Alice、25 歳です
print(person.is_adult())  # True

# クラスメソッドの呼び出し
data = {"name": "Bob", "age": 30}
person2 = Person.from_dict(data)

# 静的メソッドの呼び出し
print(Person.validate_age(25))  # True
```

**ラムダ式（無名関数）**:

```python
# 通常の関数
def square(x):
    return x ** 2

# ラムダ式
square_lambda = lambda x: x ** 2

print(square(5))        # 25
print(square_lambda(5)) # 25

# リストの sort などで使用
numbers = [3, 1, 4, 1, 5]
numbers.sort(key=lambda x: -x)  # 降順
print(numbers)  # [5, 4, 3, 1, 1]
```

**デコレータ**:

```python
def debug(func):
    def wrapper(*args, **kwargs):
        print(f"{func.__name__} を呼び出します")
        result = func(*args, **kwargs)
        print(f"{func.__name__} が終了しました")
        return result
    return wrapper

@debug
def add(a, b):
    return a + b

result = add(5, 3)
# 出力:
# add を呼び出します
# add が終了しました
print(result)  # 8
```

**実用例（複数の返り値）**:

```python
def divide(a, b):
    quotient = a // b
    remainder = a % b
    return quotient, remainder

q, r = divide(19, 5)
print(f"商: {q}, 余り: {r}")  # 商: 3, 余り: 4
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
function functionName(args) {}
```

JavaScript では`function`キーワードまたはアロー関数を使って関数を定義する。

**基本的な関数定義（function）**:

```javascript
// 返り値がある関数
function add(a, b) {
  return a + b;
}

// 返り値がない関数
function printSum(a, b) {
  console.log(`合計: ${a + b}`);
}

// 使用例
const result = add(5, 3);
console.log(result); // 8
printSum(5, 3); // 合計: 8
```

**アロー関数（ES6+）**:

```javascript
// 基本形
const add = (a, b) => {
  return a + b;
};

// 単一式の場合は return と {} を省略可能
const multiply = (a, b) => a * b;

// 引数が 1 つの場合は () を省略可能
const square = (x) => x ** 2;

console.log(add(5, 3)); // 8
console.log(multiply(4, 5)); // 20
console.log(square(5)); // 25
```

**デフォルト引数**:

```javascript
function greet(name, message = "こんにちは") {
  console.log(`${message}、${name}さん`);
}

greet("Alice"); // こんにちは、Aliceさん
greet("Bob", "おはよう"); // おはよう、Bobさん
```

**可変長引数（Rest Parameters）**:

```javascript
function sumAll(...numbers) {
  return numbers.reduce((sum, num) => sum + num, 0);
}

console.log(sumAll(1, 2, 3)); // 6
console.log(sumAll(1, 2, 3, 4, 5)); // 15
```

**分割代入引数**:

```javascript
function createPerson({ name, age, email = null }) {
  return { name, age, email };
}

const person = createPerson({ name: "Alice", age: 25 });
console.log(person); // { name: 'Alice', age: 25, email: null }
```

**クラス内のメソッド**:

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  // インスタンスメソッド
  introduce() {
    console.log(`私は ${this.name}、${this.age} 歳です`);
  }

  isAdult() {
    return this.age >= 20;
  }

  // 静的メソッド
  static validateAge(age) {
    return age >= 0;
  }
}

const person = new Person("Alice", 25);
person.introduce(); // 私は Alice、25 歳です
console.log(person.isAdult()); // true

// 静的メソッドの呼び出し
console.log(Person.validateAge(25)); // true
```

**関数式とアロー関数の違い（this の扱い）**:

```javascript
const obj = {
  value: 42,

  // 通常のメソッド
  getValue: function () {
    return this.value;
  },

  // アロー関数（this は外側のスコープを参照）
  getValueArrow: () => {
    return this.value; // undefined（外側の this）
  },
};

console.log(obj.getValue()); // 42
console.log(obj.getValueArrow()); // undefined
```

**高階関数**:

```javascript
// 関数を返す関数
function multiplier(factor) {
  return (x) => x * factor;
}

const double = multiplier(2);
const triple = multiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

**コールバック関数**:

```javascript
function processArray(arr, callback) {
  const result = [];
  for (const item of arr) {
    result.push(callback(item));
  }
  return result;
}

const numbers = [1, 2, 3, 4, 5];
const squared = processArray(numbers, (x) => x ** 2);
console.log(squared); // [1, 4, 9, 16, 25]
```

**即時実行関数（IIFE）**:

```javascript
// 即時実行関数
(function () {
  const message = "Hello";
  console.log(message); // Hello
})();

// アロー関数版
(() => {
  const message = "World";
  console.log(message); // World
})();
```

**call/apply/bind**:

```javascript
function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

const person = { name: "Alice" };

// call: 引数を個別に指定
greet.call(person, "こんにちは", "!"); // こんにちは, Alice!

// apply: 引数を配列で指定
greet.apply(person, ["おはよう", "."]); // おはよう, Alice.

// bind: this を固定した新しい関数を作成
const boundGreet = greet.bind(person);
boundGreet("こんばんは", "!"); // こんばんは, Alice!
```

**実用例（複数の返り値）**:

```javascript
function divide(a, b) {
  const quotient = Math.floor(a / b);
  const remainder = a % b;
  return { quotient, remainder };
}

const { quotient, remainder } = divide(19, 5);
console.log(`商: ${quotient}, 余り: ${remainder}`); // 商: 3, 余り: 4
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
func functionName(args Type) ReturnType { }
```

Go では`func`キーワードを使って関数を定義する。

**基本的な関数定義**:

```go
import "fmt"

// 返り値がある関数
func add(a int, b int) int {
    return a + b
}

// 返り値がない関数
func printSum(a int, b int) {
    fmt.Printf("合計: %d\n", a+b)
}

// 使用例
result := add(5, 3)
fmt.Println(result)  // 8
printSum(5, 3)  // 合計: 8
```

**引数の型の省略**:

同じ型が連続する場合、前の型を省略できる。

```go
// 型を省略しない
func add1(a int, b int) int {
    return a + b
}

// 型を省略（推奨）
func add2(a, b int) int {
    return a + b
}

fmt.Println(add1(5, 3))  // 8
fmt.Println(add2(5, 3))  // 8
```

**複数の返り値**:

Go の特徴的な機能で、複数の値を返すことができる。

```go
func divide(a, b int) (int, int) {
    quotient := a / b   // 商
    remainder := a % b  // 余り
    return quotient, remainder
}

q, r := divide(19, 5)
fmt.Printf("商: %d, 余り: %d\n", q, r)  // 商: 3, 余り: 4

// 一部の返り値を破棄
q2, _ := divide(19, 5)  // 余りは不要
fmt.Println(q2)  // 3
```

**エラーハンドリング**:

Go では、エラーを返り値として返すのが慣例。

```go
import "errors"

func safeDivide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("0 で割ることはできません")
    }
    return a / b, nil
}

// 使用例
result, err := safeDivide(10.0, 2.0)
if err != nil {
    fmt.Println("エラー:", err)
} else {
    fmt.Println(result)  // 5
}
```

**名前付き返り値**:

返り値に名前をつけると、宣言と初期化が同時に行われ、`return`だけで返せる。

```go
func divide(a, b int) (quotient int, remainder int) {
    quotient = a / b
    remainder = a % b
    return  // quotient と remainder を返す
}

q, r := divide(19, 5)
fmt.Printf("商: %d, 余り: %d\n", q, r)  // 商: 3, 余り: 4
```

**可変長引数**:

```go
func sumAll(numbers ...int) int {
    total := 0
    for _, num := range numbers {
        total += num
    }
    return total
}

fmt.Println(sumAll(1, 2, 3))        // 6
fmt.Println(sumAll(1, 2, 3, 4, 5))  // 15
```

**メソッド（レシーバー付き関数）**:

Go では、構造体にメソッドを紐付けるにはレシーバーを使う。

```go
type Person struct {
    Name string
    Age  int
}

// 値レシーバー
func (p Person) Introduce() {
    fmt.Printf("私は %s、%d 歳です\n", p.Name, p.Age)
}

func (p Person) IsAdult() bool {
    return p.Age >= 20
}

// ポインタレシーバー（値を変更できる）
func (p *Person) SetAge(age int) {
    if age >= 0 {
        p.Age = age
    }
}

// 使用例
person := Person{Name: "Alice", Age: 25}
person.Introduce()  // 私は Alice、25 歳です
fmt.Println(person.IsAdult())  // true

person.SetAge(30)
fmt.Println(person.Age)  // 30
```

**関数を返す関数（クロージャ）**:

```go
func multiplier(factor int) func(int) int {
    return func(x int) int {
        return x * factor
    }
}

double := multiplier(2)
triple := multiplier(3)

fmt.Println(double(5))  // 10
fmt.Println(triple(5))  // 15
```

**無名関数**:

```go
// 無名関数を変数に代入
add := func(a, b int) int {
    return a + b
}

fmt.Println(add(5, 3))  // 8

// 即時実行
result := func(a, b int) int {
    return a * b
}(4, 5)

fmt.Println(result)  // 20
```

**defer（遅延実行）**:

関数の終了時に実行される。

```go
func readFile(filename string) {
    file, err := os.Open(filename)
    if err != nil {
        return
    }
    defer file.Close()  // 関数終了時に実行される

    // ファイル処理
}
```

**ジェネリック関数（Go 1.18+）**:

```go
import "golang.org/x/exp/constraints"

func max[T constraints.Ordered](a, b T) T {
    if a > b {
        return a
    }
    return b
}

fmt.Println(max(5, 3))      // 5
fmt.Println(max(3.5, 2.1))  // 3.5
fmt.Println(max("apple", "banana"))  // banana
```

**実用例（構造体のメソッド）**:

```go
type Calculator struct {
    result int
}

func NewCalculator() *Calculator {
    return &Calculator{result: 0}
}

func (c *Calculator) Add(value int) *Calculator {
    c.result += value
    return c  // メソッドチェーン用
}

func (c *Calculator) Multiply(value int) *Calculator {
    c.result *= value
    return c
}

func (c *Calculator) GetResult() int {
    return c.result
}

// メソッドチェーン
calc := NewCalculator()
result := calc.Add(5).Add(3).Multiply(2).GetResult()
fmt.Println(result)  // 16
```

</div>
