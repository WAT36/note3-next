---
title: "ジェネリクス"
date: "2019-11-01T08:37:30+09:00"
excerpt: "ジェネリクスについて"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-11-01T08:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

ジェネリクス（総称型）について説明する。

**ジェネリクスとは**:

ジェネリクスは、特定の型に依存しない汎用的なコード（クラス、関数、メソッド）を記述するための機能。型をパラメータ化することで、型安全性を保ちながらコードの再利用性を高める。

**利点**:

1. **型安全性**: コンパイル時に型チェックが行われる
2. **コードの再利用**: 同じコードを異なる型で使える
3. **キャストが不要**: 明示的な型変換が不要になる

各言語でジェネリクスのサポート状況と実装方法が異なる。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
class ClassName<T> { }
List<String> list = new ArrayList<>();
```

Java では型パラメータ（`<T>`）を使ってジェネリクスを定義する。

**基本的なジェネリッククラス**:

```java
// ジェネリッククラスの定義
public class Box<T> {
    private T value;

    public void setValue(T value) {
        this.value = value;
    }

    public T getValue() {
        return value;
    }
}

// 使用例
Box<String> stringBox = new Box<>();
stringBox.setValue("Hello");
String value = stringBox.getValue();  // キャスト不要

Box<Integer> intBox = new Box<>();
intBox.setValue(100);
Integer number = intBox.getValue();
```

**複数の型パラメータ**:

```java
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
Pair<String, Integer> pair = new Pair<>("age", 25);
System.out.println(pair.getKey() + ": " + pair.getValue());  // age: 25
```

**ジェネリックメソッド**:

```java
public class Utils {
    // ジェネリックメソッド
    public static <T> void printArray(T[] array) {
        for (T element : array) {
            System.out.print(element + " ");
        }
        System.out.println();
    }
}

// 使用例
Integer[] intArray = {1, 2, 3, 4, 5};
String[] strArray = {"A", "B", "C"};

Utils.printArray(intArray);  // 1 2 3 4 5
Utils.printArray(strArray);  // A B C
```

**境界型パラメータ（extends）**:

型パラメータに制約を設ける。

```java
// Number またはそのサブクラスのみ受け付ける
public class NumberBox<T extends Number> {
    private T value;

    public void setValue(T value) {
        this.value = value;
    }

    public double doubleValue() {
        return value.doubleValue();  // Number のメソッドを使える
    }
}

// 使用例
NumberBox<Integer> intBox = new NumberBox<>();
NumberBox<Double> doubleBox = new NumberBox<>();
// NumberBox<String> stringBox = new NumberBox<>();  // エラー: String は Number でない
```

**ワイルドカード（?）**:

不特定の型を表す。

```java
// 任意の型のリスト
public void printList(List<?> list) {
    for (Object item : list) {
        System.out.println(item);
    }
}

// 上限境界ワイルドカード（? extends Type）
public double sumNumbers(List<? extends Number> list) {
    double sum = 0;
    for (Number num : list) {
        sum += num.doubleValue();
    }
    return sum;
}

// 下限境界ワイルドカード（? super Type）
public void addIntegers(List<? super Integer> list) {
    list.add(1);
    list.add(2);
    list.add(3);
}
```

**コレクションでの使用**:

```java
// List
List<String> stringList = new ArrayList<>();
stringList.add("item1");
stringList.add("item2");

// Map
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 90);
scores.put("Bob", 85);

// Set
Set<Integer> numbers = new HashSet<>();
numbers.add(1);
numbers.add(2);
```

**ダイヤモンド演算子（<>、Java 7+）**:

右辺の型パラメータを省略できる。

```java
// Java 7 以前
List<String> list = new ArrayList<String>();

// Java 7 以降（推奨）
List<String> list = new ArrayList<>();
```

**実用例（ジェネリッククラス）**:

```java
public class Repository<T> {
    private List<T> items = new ArrayList<>();

    public void add(T item) {
        items.add(item);
    }

    public T findById(int index) {
        if (index >= 0 && index < items.size()) {
            return items.get(index);
        }
        return null;
    }

    public List<T> findAll() {
        return new ArrayList<>(items);
    }
}

// 使用例
Repository<User> userRepo = new Repository<>();
userRepo.add(new User(1, "John"));
userRepo.add(new User(2, "Alice"));

User user = userRepo.findById(0);
List<User> allUsers = userRepo.findAll();
```

**実用例（ジェネリックメソッド）**:

```java
public class CollectionUtils {
    // リストの最初の要素を取得
    public static <T> T getFirst(List<T> list) {
        if (list.isEmpty()) {
            return null;
        }
        return list.get(0);
    }

    // 2つのリストを結合
    public static <T> List<T> merge(List<T> list1, List<T> list2) {
        List<T> result = new ArrayList<>(list1);
        result.addAll(list2);
        return result;
    }
}

// 使用例
List<String> names = Arrays.asList("Alice", "Bob");
String first = CollectionUtils.getFirst(names);  // "Alice"

List<Integer> merged = CollectionUtils.merge(
    Arrays.asList(1, 2),
    Arrays.asList(3, 4)
);  // [1, 2, 3, 4]
```

**型消去（Type Erasure）**:

Java のジェネリクスはコンパイル時のみ存在し、実行時には型情報が消去される。

```java
List<String> stringList = new ArrayList<>();
List<Integer> intList = new ArrayList<>();

// 実行時は両方とも同じ型
System.out.println(stringList.getClass() == intList.getClass());  // true
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
from typing import Generic, TypeVar
T = TypeVar('T')
class ClassName(Generic[T]): pass
```

Python では型ヒント（Type Hints）でジェネリクスをサポートする（Python 3.5+）。実行時には型チェックは行われない。

**基本的なジェネリッククラス（typing.Generic）**:

```python
from typing import Generic, TypeVar

T = TypeVar('T')

class Box(Generic[T]):
    def __init__(self, value: T):
        self.value: T = value

    def get_value(self) -> T:
        return self.value

    def set_value(self, value: T) -> None:
        self.value = value

# 使用例
string_box: Box[str] = Box("Hello")
print(string_box.get_value())  # Hello

int_box: Box[int] = Box(100)
print(int_box.get_value())  # 100
```

**複数の型パラメータ**:

```python
from typing import Generic, TypeVar

K = TypeVar('K')
V = TypeVar('V')

class Pair(Generic[K, V]):
    def __init__(self, key: K, value: V):
        self.key = key
        self.value = value

    def get_key(self) -> K:
        return self.key

    def get_value(self) -> V:
        return self.value

# 使用例
pair: Pair[str, int] = Pair("age", 25)
print(f"{pair.get_key()}: {pair.get_value()}")  # age: 25
```

**ジェネリック関数**:

```python
from typing import TypeVar, List

T = TypeVar('T')

def get_first(items: List[T]) -> T | None:
    if not items:
        return None
    return items[0]

def merge(list1: List[T], list2: List[T]) -> List[T]:
    return list1 + list2

# 使用例
names = ["Alice", "Bob", "Charlie"]
first = get_first(names)  # "Alice"

merged = merge([1, 2], [3, 4])  # [1, 2, 3, 4]
```

**境界型パラメータ（bound）**:

型パラメータに制約を設ける。

```python
from typing import TypeVar

# Number のサブクラスのみ受け付ける
NumberT = TypeVar('NumberT', int, float)

def double_value(value: NumberT) -> NumberT:
    return value * 2

print(double_value(10))    # 20
print(double_value(3.14))  # 6.28
# double_value("text")  # 型チェッカーがエラーを出す（実行時はエラーにならない）
```

**コレクションでの使用**:

```python
from typing import List, Dict, Set, Tuple

# List
names: List[str] = ["Alice", "Bob"]
numbers: List[int] = [1, 2, 3]

# Dict
scores: Dict[str, int] = {"Alice": 90, "Bob": 85}

# Set
unique_numbers: Set[int] = {1, 2, 3}

# Tuple
point: Tuple[int, int] = (10, 20)
```

**組み込みジェネリクス（Python 3.9+）**:

Python 3.9+ では`typing`モジュールなしで組み込み型を使える。

```python
# Python 3.9+
def get_first(items: list[str]) -> str | None:
    if not items:
        return None
    return items[0]

scores: dict[str, int] = {"Alice": 90}
numbers: set[int] = {1, 2, 3}
```

**実用例（ジェネリッククラス）**:

```python
from typing import Generic, TypeVar, List, Optional

T = TypeVar('T')

class Repository(Generic[T]):
    def __init__(self):
        self.items: List[T] = []

    def add(self, item: T) -> None:
        self.items.append(item)

    def find_by_id(self, index: int) -> Optional[T]:
        if 0 <= index < len(self.items):
            return self.items[index]
        return None

    def find_all(self) -> List[T]:
        return self.items.copy()

# 使用例
class User:
    def __init__(self, id: int, name: str):
        self.id = id
        self.name = name

user_repo: Repository[User] = Repository()
user_repo.add(User(1, "John"))
user_repo.add(User(2, "Alice"))

user = user_repo.find_by_id(0)
all_users = user_repo.find_all()
```

**Protocol（構造的部分型）**:

インターフェースのような振る舞いを定義する（Python 3.8+）。

```python
from typing import Protocol

class Comparable(Protocol):
    def __lt__(self, other) -> bool:
        ...

def find_min(items: List[Comparable]) -> Comparable:
    return min(items)
```

**注意**: Python のジェネリクスは主に型チェッカー（mypy など）のためのもので、実行時には型チェックは行われない。

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
// TypeScript
class ClassName<T> {}
function functionName<T>(arg: T): T {}
```

JavaScript 自体はジェネリクスをサポートしていないが、TypeScript（JavaScript のスーパーセット）でジェネリクスを使用できる。

**基本的なジェネリッククラス（TypeScript）**:

```typescript
// ジェネリッククラスの定義
class Box<T> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }

  setValue(value: T): void {
    this.value = value;
  }
}

// 使用例
const stringBox = new Box<string>("Hello");
console.log(stringBox.getValue()); // "Hello"

const numberBox = new Box<number>(100);
console.log(numberBox.getValue()); // 100
```

**複数の型パラメータ**:

```typescript
class Pair<K, V> {
  constructor(private key: K, private value: V) {}

  getKey(): K {
    return this.key;
  }

  getValue(): V {
    return this.value;
  }
}

// 使用例
const pair = new Pair<string, number>("age", 25);
console.log(`${pair.getKey()}: ${pair.getValue()}`); // age: 25
```

**ジェネリック関数**:

```typescript
function getFirst<T>(items: T[]): T | undefined {
  if (items.length === 0) {
    return undefined;
  }
  return items[0];
}

function merge<T>(list1: T[], list2: T[]): T[] {
  return [...list1, ...list2];
}

// 使用例
const names = ["Alice", "Bob", "Charlie"];
const first = getFirst(names); // "Alice"

const merged = merge([1, 2], [3, 4]); // [1, 2, 3, 4]
```

**制約（extends）**:

型パラメータに制約を設ける。

```typescript
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(item: T): void {
  console.log(item.length);
}

logLength("text"); // 4
logLength([1, 2, 3]); // 3
// logLength(42);       // エラー: number には length がない
```

**組み込み型での使用**:

```typescript
// Array
const numbers: Array<number> = [1, 2, 3];
const names: string[] = ["Alice", "Bob"]; // より一般的な書き方

// Map
const scores: Map<string, number> = new Map();
scores.set("Alice", 90);
scores.set("Bob", 85);

// Set
const uniqueNumbers: Set<number> = new Set([1, 2, 3]);

// Promise
async function fetchUser(id: number): Promise<User> {
  // ...
}
```

**実用例（ジェネリッククラス）**:

```typescript
class Repository<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  findById(index: number): T | undefined {
    if (index >= 0 && index < this.items.length) {
      return this.items[index];
    }
    return undefined;
  }

  findAll(): T[] {
    return [...this.items];
  }
}

// 使用例
interface User {
  id: number;
  name: string;
}

const userRepo = new Repository<User>();
userRepo.add({ id: 1, name: "John" });
userRepo.add({ id: 2, name: "Alice" });

const user = userRepo.findById(0);
const allUsers = userRepo.findAll();
```

**ユーティリティ型**:

TypeScript にはジェネリクスを使った便利なユーティリティ型がある。

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

// Partial: すべてのプロパティをオプションにする
type PartialUser = Partial<User>;

// Pick: 特定のプロパティのみを選択
type UserPreview = Pick<User, "id" | "name">;

// Omit: 特定のプロパティを除外
type UserWithoutEmail = Omit<User, "email">;

// Required: すべてのプロパティを必須にする
type RequiredUser = Required<PartialUser>;

// Readonly: すべてのプロパティを読み取り専用にする
type ReadonlyUser = Readonly<User>;
```

**JavaScript（純粋）での代替**:

純粋な JavaScript ではジェネリクスはないが、動的型付けにより似たような柔軟性がある。

```javascript
// ジェネリクスなしで汎用的なクラス
class Box {
  constructor(value) {
    this.value = value;
  }

  getValue() {
    return this.value;
  }
}

// どんな型でも使える（型安全性はない）
const stringBox = new Box("Hello");
const numberBox = new Box(100);
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
func FunctionName[T any](arg T) T { }
type StructName[T any] struct { }
```

Go では Go 1.18+ でジェネリクスがサポートされた。型パラメータ（`[T any]`）を使って定義する。

**基本的なジェネリック関数**:

```go
package main

import "fmt"

// ジェネリック関数
func Print[T any](value T) {
    fmt.Println(value)
}

func GetFirst[T any](items []T) T {
    if len(items) == 0 {
        var zero T
        return zero  // ゼロ値を返す
    }
    return items[0]
}

func main() {
    Print[string]("Hello")  // Hello
    Print[int](100)         // 100

    // 型推論も可能
    Print("World")  // World
    Print(200)      // 200

    first := GetFirst([]string{"Alice", "Bob"})
    fmt.Println(first)  // Alice
}
```

**ジェネリック型（構造体）**:

```go
package main

import "fmt"

// ジェネリック構造体
type Box[T any] struct {
    value T
}

func (b *Box[T]) SetValue(value T) {
    b.value = value
}

func (b *Box[T]) GetValue() T {
    return b.value
}

func main() {
    stringBox := Box[string]{value: "Hello"}
    fmt.Println(stringBox.GetValue())  // Hello

    intBox := Box[int]{value: 100}
    fmt.Println(intBox.GetValue())  // 100
}
```

**複数の型パラメータ**:

```go
package main

import "fmt"

type Pair[K any, V any] struct {
    key   K
    value V
}

func NewPair[K any, V any](key K, value V) Pair[K, V] {
    return Pair[K, V]{key: key, value: value}
}

func main() {
    pair := NewPair("age", 25)
    fmt.Printf("%s: %d\n", pair.key, pair.value)  // age: 25
}
```

**型制約（Constraints）**:

型パラメータに制約を設ける。

```go
package main

import "fmt"

// comparable: 比較可能な型
func Contains[T comparable](slice []T, target T) bool {
    for _, item := range slice {
        if item == target {
            return true
        }
    }
    return false
}

// カスタム制約
type Number interface {
    int | int64 | float64
}

func Sum[T Number](numbers []T) T {
    var sum T
    for _, num := range numbers {
        sum += num
    }
    return sum
}

func main() {
    fmt.Println(Contains([]int{1, 2, 3}, 2))     // true
    fmt.Println(Contains([]string{"a", "b"}, "c"))  // false

    fmt.Println(Sum([]int{1, 2, 3, 4, 5}))      // 15
    fmt.Println(Sum([]float64{1.5, 2.5, 3.5}))  // 7.5
}
```

**標準ライブラリの制約**:

```go
import "golang.org/x/exp/constraints"

func Max[T constraints.Ordered](a, b T) T {
    if a > b {
        return a
    }
    return b
}

func main() {
    fmt.Println(Max(10, 20))      // 20
    fmt.Println(Max(3.14, 2.71))  // 3.14
    fmt.Println(Max("abc", "xyz")) // "xyz"
}
```

**ジェネリックマップとスライス**:

Go 1.21+ では組み込みジェネリクス関数がある。

```go
import (
    "fmt"
    "slices"
    "maps"
)

func main() {
    // slices パッケージ
    numbers := []int{3, 1, 4, 1, 5}
    slices.Sort(numbers)
    fmt.Println(numbers)  // [1 1 3 4 5]

    contains := slices.Contains(numbers, 3)
    fmt.Println(contains)  // true

    // maps パッケージ
    m1 := map[string]int{"a": 1, "b": 2}
    m2 := map[string]int{"c": 3}
    maps.Copy(m1, m2)
    fmt.Println(m1)  // map[a:1 b:2 c:3]
}
```

**実用例（ジェネリック構造体）**:

```go
package main

import "fmt"

type Repository[T any] struct {
    items []T
}

func NewRepository[T any]() *Repository[T] {
    return &Repository[T]{
        items: make([]T, 0),
    }
}

func (r *Repository[T]) Add(item T) {
    r.items = append(r.items, item)
}

func (r *Repository[T]) FindByID(index int) *T {
    if index >= 0 && index < len(r.items) {
        return &r.items[index]
    }
    return nil
}

func (r *Repository[T]) FindAll() []T {
    return append([]T{}, r.items...)
}

type User struct {
    ID   int
    Name string
}

func main() {
    userRepo := NewRepository[User]()
    userRepo.Add(User{ID: 1, Name: "John"})
    userRepo.Add(User{ID: 2, Name: "Alice"})

    user := userRepo.FindByID(0)
    if user != nil {
        fmt.Printf("User: %+v\n", *user)
    }

    allUsers := userRepo.FindAll()
    fmt.Printf("All users: %+v\n", allUsers)
}
```

**実用例（ジェネリック関数）**:

```go
package main

import "fmt"

// Map: スライスの各要素を変換
func Map[T any, U any](items []T, fn func(T) U) []U {
    result := make([]U, len(items))
    for i, item := range items {
        result[i] = fn(item)
    }
    return result
}

// Filter: 条件に合う要素のみを抽出
func Filter[T any](items []T, fn func(T) bool) []T {
    result := []T{}
    for _, item := range items {
        if fn(item) {
            result = append(result, item)
        }
    }
    return result
}

func main() {
    numbers := []int{1, 2, 3, 4, 5}

    // 各要素を2倍にする
    doubled := Map(numbers, func(n int) int {
        return n * 2
    })
    fmt.Println(doubled)  // [2 4 6 8 10]

    // 偶数のみを抽出
    evens := Filter(numbers, func(n int) bool {
        return n%2 == 0
    })
    fmt.Println(evens)  // [2 4]
}
```

**any vs comparable vs カスタム制約**:

```go
// any: すべての型を受け付ける
func Print[T any](value T) {
    fmt.Println(value)
}

// comparable: == と != が使える型のみ
func Equal[T comparable](a, b T) bool {
    return a == b
}

// カスタム制約: 特定の型のみ
type Number interface {
    int | int64 | float64
}

func Add[T Number](a, b T) T {
    return a + b
}
```

</div>
