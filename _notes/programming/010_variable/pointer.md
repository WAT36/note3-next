---
title: "ポインタ・参照"
excerpt: "ポインタ・参照について"
tag: ["Go", "Java", "Python", "Javascript"]
programming: ["Go", "Java", "Python", "Javascript"]
date: '2025-11-24T22:13:44.000Z'
updatedAt: '2025-11-24T22:13:44.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

ポインタ・参照について説明する。

**ポインタとは**:

メモリ上のアドレス（場所）を保持する変数。ポインタを使うことで、値のコピーではなく、メモリ上の実体を直接参照・操作できる。

**ポインタの利点**:

1. **メモリ効率**: 大きなデータをコピーせずに参照で渡せる
2. **値の共有**: 複数の場所から同じデータを参照・変更できる
3. **関数での値の変更**: 関数内で引数の値を変更できる

各言語でポインタや参照の扱い方が大きく異なる。

<div class="note_content_by_programming_language" id="note_content_Go">

```go
var ptr *int = &value
*ptr = 10
```

Go では明示的な **ポインタ** を使って、メモリ上のアドレスを操作する。

**ポインタの基本**:

**ポインタ型の宣言**:

```go
// ポインタ型の宣言（初期値は nil）
var p *int
fmt.Println(p)  // nil

// 値を作成してポインタを取得
i := 42
p = &i  // & でアドレスを取得
fmt.Println(p)   // 0xc000010090（アドレス）
fmt.Println(*p)  // 42（デリファレンス）
```

**ポインタの演算子**:

| 演算子 | 説明                                   | 例            |
| ------ | -------------------------------------- | ------------- |
| `&`    | アドレス演算子（変数のアドレスを取得） | `p := &i`     |
| `*`    | デリファレンス（ポインタから値を取得） | `value := *p` |
| `*T`   | ポインタ型（型 T のポインタ）          | `var p *int`  |

**基本的な使い方**:

```go
package main

import "fmt"

func main() {
    // 値を作成
    x := 10

    // ポインタを取得
    p := &x

    // ポインタの情報
    fmt.Printf("値: %d\n", x)       // 値: 10
    fmt.Printf("アドレス: %p\n", p)  // アドレス: 0xc000010090
    fmt.Printf("ポインタが指す値: %d\n", *p)  // ポインタが指す値: 10

    // ポインタ経由で値を変更
    *p = 20
    fmt.Printf("変更後の値: %d\n", x)  // 変更後の値: 20
}
```

**ポインタの用途**:

### **1. 関数で値を変更する（参照渡し）**

```go
// 値渡し（コピー）
func doubleValue(x int) {
    x = x * 2  // コピーが変更されるだけ
}

// ポインタ渡し（参照渡し）
func doublePointer(x *int) {
    *x = *x * 2  // 元の値が変更される
}

func main() {
    a := 10
    doubleValue(a)
    fmt.Println(a)  // 10（変更されない）

    b := 10
    doublePointer(&b)
    fmt.Println(b)  // 20（変更される）
}
```

### **2. 大きな構造体を効率的に渡す**

```go
type LargeStruct struct {
    Data [1000000]int
}

// 値渡し（コピーされるため遅い）
func processByValue(s LargeStruct) {
    // s はコピー
}

// ポインタ渡し（コピーされないため速い）
func processByPointer(s *LargeStruct) {
    // s は元の構造体を参照
}

func main() {
    large := LargeStruct{}

    processByValue(large)    // 遅い（コピー）
    processByPointer(&large) // 速い（ポインタ）
}
```

**nil ポインタ**:

ポインタの初期値は `nil`。nil ポインタのデリファレンスはパニックを引き起こす。

```go
var p *int
fmt.Println(p)  // nil

// nil チェック
if p != nil {
    fmt.Println(*p)
} else {
    fmt.Println("ポインタは nil")
}

// nil ポインタのデリファレンス（panic）
// fmt.Println(*p)  // panic: runtime error: invalid memory address
```

**new 関数**:

指定した型のゼロ値を持つポインタを生成する。

```go
// new を使う
p := new(int)
fmt.Println(p)   // 0xc000010090（アドレス）
fmt.Println(*p)  // 0（int のゼロ値）

*p = 42
fmt.Println(*p)  // 42

// 構造体での使用
type Point struct {
    X, Y int
}

// new を使う
p1 := new(Point)
p1.X = 1
p1.Y = 2

// & と複合リテラルを使う（推奨、初期値を設定できる）
p2 := &Point{X: 1, Y: 2}

// どちらも同じ型（*Point）
fmt.Printf("%T\n", p1)  // *main.Point
fmt.Printf("%T\n", p2)  // *main.Point
```

**配列のポインタ**:

```go
// 配列のポインタ
arr := [3]int{1, 2, 3}
p := &arr

// デリファレンスしてインデックスアクセス
fmt.Println((*p)[0])  // 1
fmt.Println((*p)[1])  // 2

// 値を変更
(*p)[0] = 10
fmt.Println(arr[0])  // 10
```

**構造体のポインタ**:

Go では構造体のポインタから直接フィールドにアクセスできる（自動的にデリファレンス）。

```go
type User struct {
    Name string
    Age  int
}

user := User{Name: "Alice", Age: 25}
p := &user

// (*p).Name と書かなくても p.Name でアクセス可能
fmt.Println(p.Name)  // "Alice"
p.Age = 26
fmt.Println(user.Age)  // 26
```

**ポインタと参照型**:

Go では、スライス、マップ、チャネルは参照型（内部的にポインタを含む）なので、明示的にポインタにする必要はない。

```go
// スライスは参照型
func modifySlice(s []int) {
    s[0] = 100  // 元のスライスが変更される
}

func main() {
    slice := []int{1, 2, 3}
    modifySlice(slice)
    fmt.Println(slice)  // [100 2 3]（変更される）
}

// マップも参照型
func modifyMap(m map[string]int) {
    m["key"] = 100  // 元のマップが変更される
}

func main() {
    m := map[string]int{"key": 1}
    modifyMap(m)
    fmt.Println(m)  // map[key:100]（変更される）
}
```

**メソッド（レシーバー）**:

Go のメソッドは、特定の型に関連づけられた関数。レシーバーを値型にするかポインタ型にするかで挙動が異なる。

**値レシーバー（コピー）**:

```go
type Point struct {
    X, Y int
}

// 値レシーバー（コピー）
func (p Point) Display() {
    fmt.Printf("(%d, %d)\n", p.X, p.Y)
}

// 値レシーバーで変更しても元の値は変わらない
func (p Point) MoveWrong() {
    p.X++  // コピーが変更されるだけ
    p.Y++
}

func main() {
    point := Point{X: 5, Y: 12}
    point.Display()  // (5, 12)

    point.MoveWrong()
    point.Display()  // (5, 12)（変更されない）
}
```

**ポインタレシーバー（参照）**:

```go
// ポインタレシーバー（参照）
func (p *Point) Move(dx, dy int) {
    p.X += dx  // 元の値が変更される
    p.Y += dy
}

func main() {
    point := Point{X: 5, Y: 12}
    point.Display()  // (5, 12)

    // 値でもポインタレシーバーのメソッドを呼べる（自動的に &point になる）
    point.Move(1, 1)
    point.Display()  // (6, 13)

    // ポインタからでも呼べる
    p := &point
    p.Move(1, 1)
    point.Display()  // (7, 14)
}
```

**レシーバーの選択基準**:

| レシーバー         | 使用するケース                                     |
| ------------------ | -------------------------------------------------- |
| 値レシーバー       | 小さい構造体、変更しない、コピーしても問題ない場合 |
| ポインタレシーバー | 大きい構造体、値を変更する、nil を許容する場合     |

**実用例**:

### **構造体のメソッド**

```go
type Rectangle struct {
    Width, Height int
}

// 値レシーバー（読み取り専用）
func (r Rectangle) Area() int {
    return r.Width * r.Height
}

// ポインタレシーバー（変更可能）
func (r *Rectangle) Scale(factor int) {
    r.Width *= factor
    r.Height *= factor
}

func main() {
    rect := Rectangle{Width: 10, Height: 5}
    fmt.Println("面積:", rect.Area())  // 50

    rect.Scale(2)
    fmt.Println("面積:", rect.Area())  // 200
}
```

### **関数の引数としてのポインタ**

```go
type User struct {
    Name string
    Age  int
}

// ポインタを受け取る
func updateAge(user *User, newAge int) {
    if user == nil {
        return
    }
    user.Age = newAge
}

func main() {
    user := User{Name: "Alice", Age: 25}
    fmt.Println(user.Age)  // 25

    updateAge(&user, 30)
    fmt.Println(user.Age)  // 30
}
```

### **ポインタのポインタ**

```go
func main() {
    x := 42
    p := &x     // x のポインタ
    pp := &p    // p のポインタ（ポインタのポインタ）

    fmt.Println(x)    // 42
    fmt.Println(*p)   // 42
    fmt.Println(**pp) // 42

    **pp = 100
    fmt.Println(x)    // 100
}
```

**ポインタ算術の禁止**:

Go ではポインタ算術（ポインタに加算・減算）はできない（C/C++ とは異なる）。

```go
p := &[3]int{1, 2, 3}
// p++  // エラー: invalid operation
// p + 1  // エラー: invalid operation
```

**まとめ**:

- `&` でアドレスを取得、`*` でデリファレンス
- ポインタ型は `*T`（型 T のポインタ）
- nil ポインタのデリファレンスはパニック
- `new` 関数でゼロ値のポインタを生成
- スライス、マップ、チャネルは参照型（明示的なポインタ不要）
- メソッドのレシーバーは値型またはポインタ型
- ポインタ算術は禁止

</div>
<div class="note_content_by_programming_language" id="note_content_Java">

Java には明示的な**ポインタの概念はない**。すべての非プリミティブ型（クラス、配列、インターフェース）は**参照型**として扱われる。

**参照型とは**:

Java では、オブジェクトはヒープ領域に作成され、変数にはオブジェクトへの参照（メモリアドレス）が格納される。

```java
// プリミティブ型（値型）
int a = 10;
int b = a;  // 値がコピーされる
b = 20;
System.out.println(a);  // 10（a は変更されない）

// 参照型
class User {
    String name;
}

User user1 = new User();
user1.name = "Alice";

User user2 = user1;  // 参照がコピーされる（同じオブジェクトを参照）
user2.name = "Bob";

System.out.println(user1.name);  // "Bob"（user1 も変更される）
```

**プリミティブ型と参照型**:

| 型の種類       | 例                              | 挙動               |
| -------------- | ------------------------------- | ------------------ |
| プリミティブ型 | `int`, `double`, `boolean` など | 値がコピーされる   |
| 参照型         | クラス、配列、インターフェース  | 参照がコピーされる |

**参照の動作**:

```java
public class Main {
    public static void main(String[] args) {
        // 配列（参照型）
        int[] arr1 = {1, 2, 3};
        int[] arr2 = arr1;  // 参照がコピーされる

        arr2[0] = 10;
        System.out.println(arr1[0]);  // 10（arr1 も変更される）

        // 同じオブジェクトを参照しているか確認
        System.out.println(arr1 == arr2);  // true

        // 新しい配列を作成
        int[] arr3 = {1, 2, 3};
        System.out.println(arr1 == arr3);  // false（別のオブジェクト）
    }
}
```

**関数での参照渡し**:

```java
class User {
    String name;
    int age;
}

public class Main {
    // 参照を受け取る
    public static void updateAge(User user, int newAge) {
        if (user == null) {
            return;
        }
        user.age = newAge;  // 元のオブジェクトが変更される
    }

    // 参照を変更しても元の変数には影響しない
    public static void replaceUser(User user) {
        user = new User();  // 新しいオブジェクトを作成
        user.name = "Bob";  // この変更は外部に影響しない
    }

    public static void main(String[] args) {
        User user = new User();
        user.name = "Alice";
        user.age = 25;

        updateAge(user, 30);
        System.out.println(user.age);  // 30（変更される）

        replaceUser(user);
        System.out.println(user.name);  // "Alice"（変更されない）
    }
}
```

**null 参照**:

```java
User user = null;

// null チェック
if (user != null) {
    System.out.println(user.name);
} else {
    System.out.println("user は null");
}

// null 参照のアクセス（NullPointerException）
// System.out.println(user.name);  // NullPointerException
```

**配列の参照**:

```java
// 配列は参照型
int[] original = {1, 2, 3};
int[] copy = original;  // 参照がコピーされる

copy[0] = 10;
System.out.println(original[0]);  // 10（original も変更される）

// 配列のコピー（値をコピー）
int[] realCopy = original.clone();
realCopy[0] = 20;
System.out.println(original[0]);  // 10（original は変更されない）
```

**オブジェクトのコピー**:

```java
class User implements Cloneable {
    String name;
    int age;

    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}

// 浅いコピー（シャローコピー）
User user1 = new User();
user1.name = "Alice";

User user2 = (User) user1.clone();
user2.name = "Bob";

System.out.println(user1.name);  // "Alice"（変更されない）
```

**まとめ**:

- Java にはポインタの概念はない
- すべての非プリミティブ型は参照型
- 参照がコピーされる（同じオブジェクトを参照）
- null 参照に注意（NullPointerException）
- オブジェクトのコピーには `clone()` を使う

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

Python には明示的な**ポインタの概念はない**。すべての変数は**参照**として扱われる。

**参照とは**:

Python では、すべての変数はオブジェクトへの参照。代入は参照のコピー。

```python
# イミュータブル（変更不可）な型（int, str, tuple など）
a = 10
b = a  # 参照がコピーされるが、int は変更不可なので問題ない
b = 20
print(a)  # 10（a は変更されない）

# ミュータブル（変更可能）な型（list, dict, set など）
list1 = [1, 2, 3]
list2 = list1  # 参照がコピーされる（同じリストを参照）
list2[0] = 10
print(list1)  # [10, 2, 3]（list1 も変更される）
```

**イミュータブルとミュータブル**:

| 型の種類       | 例                                    | 挙動                                   |
| -------------- | ------------------------------------- | -------------------------------------- |
| イミュータブル | `int`, `float`, `str`, `tuple`        | 変更不可（再代入で新しいオブジェクト） |
| ミュータブル   | `list`, `dict`, `set`, カスタムクラス | 変更可能（同じオブジェクトを参照）     |

**参照の動作**:

```python
# リスト（ミュータブル）
list1 = [1, 2, 3]
list2 = list1  # 参照がコピーされる

list2.append(4)
print(list1)  # [1, 2, 3, 4]（list1 も変更される）

# 同じオブジェクトを参照しているか確認
print(list1 is list2)  # True

# 新しいリストを作成
list3 = [1, 2, 3]
print(list1 is list3)  # False（別のオブジェクト）
print(list1 == list3)  # False（内容も異なる）
```

**関数での参照渡し**:

```python
# イミュータブルな型
def double_value(x):
    x = x * 2  # 新しいオブジェクトが作成される（元の変数には影響しない）

a = 10
double_value(a)
print(a)  # 10（変更されない）

# ミュータブルな型
def modify_list(lst):
    lst.append(4)  # 元のリストが変更される

my_list = [1, 2, 3]
modify_list(my_list)
print(my_list)  # [1, 2, 3, 4]（変更される）

# 参照を変更しても元の変数には影響しない
def replace_list(lst):
    lst = [10, 20, 30]  # 新しいリストを作成（元の変数には影響しない）

my_list2 = [1, 2, 3]
replace_list(my_list2)
print(my_list2)  # [1, 2, 3]（変更されない）
```

**None 参照**:

```python
user = None

# None チェック
if user is not None:
    print(user.name)
else:
    print("user は None")

# None 参照のアクセス（AttributeError）
# print(user.name)  # AttributeError: 'NoneType' object has no attribute 'name'
```

**オブジェクトのコピー**:

```python
import copy

# 浅いコピー（シャローコピー）
list1 = [1, 2, 3]
list2 = list1.copy()  # または list(list1) や list1[:]
list2[0] = 10
print(list1)  # [1, 2, 3]（変更されない）

# 深いコピー（ディープコピー、ネストしたオブジェクトもコピー）
list1 = [[1, 2], [3, 4]]
list2 = copy.deepcopy(list1)
list2[0][0] = 10
print(list1)  # [[1, 2], [3, 4]]（変更されない）

# クラスのコピー
class User:
    def __init__(self, name, age):
        self.name = name
        self.age = age

user1 = User("Alice", 25)
user2 = copy.copy(user1)  # 浅いコピー
user2.name = "Bob"
print(user1.name)  # "Alice"（変更されない）
```

**id() 関数（オブジェクトの識別子）**:

```python
a = [1, 2, 3]
b = a

# オブジェクトの ID（メモリアドレス）を取得
print(id(a))  # 140234567890123
print(id(b))  # 140234567890123（同じ）

c = [1, 2, 3]
print(id(c))  # 140234567890456（異なる）

# is 演算子で同じオブジェクトか確認
print(a is b)  # True
print(a is c)  # False
```

**実用例（関数で複数の値を返す代替）**:

Python ではポインタがないため、関数で複数の値を返すにはタプルを使う。

```python
def divide_and_remainder(a, b):
    quotient = a // b
    remainder = a % b
    return quotient, remainder  # タプルで返す

q, r = divide_and_remainder(10, 3)
print(f"商: {q}, 余り: {r}")  # 商: 3, 余り: 1
```

**まとめ**:

- Python にはポインタの概念はない
- すべての変数は参照
- イミュータブルな型は変更不可、ミュータブルな型は変更可能
- `is` で同じオブジェクトか確認
- `copy.copy()` で浅いコピー、`copy.deepcopy()` で深いコピー

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

JavaScript には明示的な**ポインタの概念はない**。すべてのオブジェクトは**参照**として扱われる。

**参照とは**:

JavaScript では、プリミティブ型は値渡し、オブジェクト型は参照渡し。

```javascript
// プリミティブ型（値型）
let a = 10;
let b = a; // 値がコピーされる
b = 20;
console.log(a); // 10（a は変更されない）

// オブジェクト型（参照型）
let obj1 = { name: "Alice" };
let obj2 = obj1; // 参照がコピーされる（同じオブジェクトを参照）
obj2.name = "Bob";
console.log(obj1.name); // "Bob"（obj1 も変更される）
```

**プリミティブ型とオブジェクト型**:

| 型の種類       | 例                                                                     | 挙動               |
| -------------- | ---------------------------------------------------------------------- | ------------------ |
| プリミティブ型 | `number`, `string`, `boolean`, `null`, `undefined`, `symbol`, `bigint` | 値がコピーされる   |
| オブジェクト型 | オブジェクト、配列、関数、Date など                                    | 参照がコピーされる |

**参照の動作**:

```javascript
// 配列（参照型）
const arr1 = [1, 2, 3];
const arr2 = arr1; // 参照がコピーされる

arr2.push(4);
console.log(arr1); // [1, 2, 3, 4]（arr1 も変更される）

// 同じオブジェクトを参照しているか確認
console.log(arr1 === arr2); // true

// 新しい配列を作成
const arr3 = [1, 2, 3];
console.log(arr1 === arr3); // false（別のオブジェクト）

// オブジェクト（参照型）
const obj1 = { x: 1, y: 2 };
const obj2 = obj1;

obj2.x = 10;
console.log(obj1.x); // 10（obj1 も変更される）
```

**関数での参照渡し**:

```javascript
// プリミティブ型（値渡し）
function doubleValue(x) {
  x = x * 2; // ローカル変数が変更されるだけ
}

let a = 10;
doubleValue(a);
console.log(a); // 10（変更されない）

// オブジェクト型（参照渡し）
function updateAge(user, newAge) {
  if (user === null) {
    return;
  }
  user.age = newAge; // 元のオブジェクトが変更される
}

let user = { name: "Alice", age: 25 };
updateAge(user, 30);
console.log(user.age); // 30（変更される）

// 参照を変更しても元の変数には影響しない
function replaceUser(user) {
  user = { name: "Bob", age: 20 }; // 新しいオブジェクトを作成（元の変数には影響しない）
}

let user2 = { name: "Alice", age: 25 };
replaceUser(user2);
console.log(user2.name); // "Alice"（変更されない）
```

**null/undefined 参照**:

```javascript
let obj = null;

// null チェック
if (obj !== null) {
  console.log(obj.name);
} else {
  console.log("obj は null");
}

// null/undefined 参照のアクセス（TypeError）
// console.log(obj.name);  // TypeError: Cannot read property 'name' of null

// Optional Chaining（ES2020+）
console.log(obj?.name); // undefined（エラーにならない）
```

**オブジェクトのコピー**:

```javascript
// 浅いコピー（シャローコピー）
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1 }; // スプレッド構文
const obj3 = Object.assign({}, obj1);

obj2.a = 10;
console.log(obj1.a); // 1（変更されない）

// 配列の浅いコピー
const arr1 = [1, 2, 3];
const arr2 = [...arr1]; // スプレッド構文
const arr3 = arr1.slice();

arr2[0] = 10;
console.log(arr1[0]); // 1（変更されない）

// 深いコピー（ディープコピー、ネストしたオブジェクトもコピー）
const nested1 = { a: { b: 1 } };
const nested2 = JSON.parse(JSON.stringify(nested1));

nested2.a.b = 10;
console.log(nested1.a.b); // 1（変更されない）

// structuredClone（最新、推奨）
const nested3 = structuredClone(nested1);
```

**const の挙動**:

```javascript
// const は再代入を防ぐが、オブジェクトの変更は防がない
const obj = { name: "Alice" };
obj.name = "Bob"; // OK（オブジェクトの変更）
console.log(obj.name); // "Bob"

// obj = { name: "Charlie" };  // エラー: Assignment to constant variable

// Object.freeze() でオブジェクトを変更不可にする
const frozen = Object.freeze({ name: "Alice" });
frozen.name = "Bob"; // 変更できない（Strict モードではエラー）
console.log(frozen.name); // "Alice"
```

**実用例（オブジェクトの変更を防ぐ）**:

```javascript
function processUser(user) {
  // 元のオブジェクトを変更しないようにコピー
  const userCopy = { ...user };
  userCopy.age = 30;
  return userCopy;
}

const original = { name: "Alice", age: 25 };
const modified = processUser(original);

console.log(original.age); // 25（変更されない）
console.log(modified.age); // 30
```

**まとめ**:

- JavaScript にはポインタの概念はない
- プリミティブ型は値渡し、オブジェクト型は参照渡し
- オブジェクトの変更には注意
- スプレッド構文や `Object.assign()` で浅いコピー
- `structuredClone()` で深いコピー
- `Object.freeze()` でイミュータブルなオブジェクト

</div>
