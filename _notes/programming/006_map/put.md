---
title: "辞書(Map)に要素を追加する"
date: "2019-10-28T01:36:30+09:00"
excerpt: "辞書(Map)に要素を追加するついて"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-28T01:36:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

辞書(Map)に要素(キー・値)を追加する方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
map.put(key, value);
```

Java では`Map`に要素を追加するには`put()`メソッドを使う。

**基本的な使い方**:

```java
import java.util.Map;
import java.util.HashMap;

Map<String, Integer> scores = new HashMap<>();

// 要素の追加
scores.put("Alice", 85);
scores.put("Bob", 90);
scores.put("Charlie", 78);

System.out.println(scores);
// 出力: {Alice=85, Bob=90, Charlie=78}
```

**上書き**:

既に同じキーが存在する場合は、値が上書きされる。

```java
Map<String, Integer> map = new HashMap<>();

map.put("key", 100);
System.out.println(map);  // {key=100}

map.put("key", 200);  // 上書き
System.out.println(map);  // {key=200}
```

**putIfAbsent（存在しない場合のみ追加）**:

```java
Map<String, Integer> map = new HashMap<>();

map.put("key1", 100);
map.putIfAbsent("key1", 200);  // key1は既に存在するので追加されない
map.putIfAbsent("key2", 300);  // key2は存在しないので追加される

System.out.println(map);
// 出力: {key1=100, key2=300}
```

**putAll（別の Map を追加）**:

```java
Map<String, Integer> map1 = new HashMap<>();
map1.put("a", 1);
map1.put("b", 2);

Map<String, Integer> map2 = new HashMap<>();
map2.put("c", 3);
map2.put("d", 4);

map1.putAll(map2);  // map2の全要素をmap1に追加
System.out.println(map1);
// 出力: {a=1, b=2, c=3, d=4}
```

**戻り値**:

`put()`は、以前にそのキーに関連付けられていた値を返す。キーが存在しなかった場合は`null`を返す。

```java
Map<String, Integer> map = new HashMap<>();

Integer oldValue1 = map.put("key", 100);  // null
Integer oldValue2 = map.put("key", 200);  // 100

System.out.println("古い値: " + oldValue2);  // 古い値: 100
```

**複数の要素を一度に追加（Java 9+）**:

```java
// Map.of() で作成したMapを追加
Map<String, Integer> existing = new HashMap<>();
existing.putAll(Map.of("a", 1, "b", 2, "c", 3));

System.out.println(existing);
// 出力: {a=1, b=2, c=3}
```

**compute 系メソッド**:

```java
Map<String, Integer> map = new HashMap<>();

// computeIfAbsent: キーが存在しない場合のみ計算して追加
map.computeIfAbsent("key1", k -> 100);
System.out.println(map);  // {key1=100}

// computeIfPresent: キーが存在する場合のみ計算して更新
map.computeIfPresent("key1", (k, v) -> v + 50);
System.out.println(map);  // {key1=150}

// compute: キーの有無に関わらず計算
map.compute("key2", (k, v) -> v == null ? 1 : v + 1);
System.out.println(map);  // {key1=150, key2=1}
```

**merge（値の結合）**:

```java
Map<String, Integer> map = new HashMap<>();

map.merge("key", 1, Integer::sum);  // keyが存在しない: 1を追加
map.merge("key", 2, Integer::sum);  // keyが存在する: 1 + 2 = 3

System.out.println(map);  // {key=3}
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
d[key] = value
```

Python では辞書に要素を追加するには、`辞書[キー] = 値`の形式を使う。

**基本的な使い方**:

```python
scores = {}

# 要素の追加
scores["Alice"] = 85
scores["Bob"] = 90
scores["Charlie"] = 78

print(scores)
# 出力: {'Alice': 85, 'Bob': 90, 'Charlie': 78}
```

**上書き**:

既に同じキーが存在する場合は、値が上書きされる。

```python
d = {}

d["key"] = 100
print(d)  # {'key': 100}

d["key"] = 200  # 上書き
print(d)  # {'key': 200}
```

**update（辞書を追加）**:

`update()`メソッドを使うと、別の辞書の要素をまとめて追加できる。

```python
d1 = {"a": 1, "b": 2}
d2 = {"c": 3, "d": 4}

d1.update(d2)
print(d1)
# 出力: {'a': 1, 'b': 2, 'c': 3, 'd': 4}
```

**update（キーワード引数）**:

```python
d = {}
d.update(key1=100, key2=200, key3=300)
print(d)
# 出力: {'key1': 100, 'key2': 200, 'key3': 300}
```

**update（リストから）**:

```python
d = {}
d.update([("a", 1), ("b", 2), ("c", 3)])
print(d)
# 出力: {'a': 1, 'b': 2, 'c': 3}
```

**setdefault（存在しない場合のみ追加）**:

```python
d = {"key1": 100}

# key1は既に存在するので変更されない
d.setdefault("key1", 200)

# key2は存在しないので追加される
d.setdefault("key2", 300)

print(d)
# 出力: {'key1': 100, 'key2': 300}
```

**辞書の結合（Python 3.9+）**:

```python
d1 = {"a": 1, "b": 2}
d2 = {"c": 3, "d": 4}

# | 演算子で結合（新しい辞書を作成）
d3 = d1 | d2
print(d3)  # {'a': 1, 'b': 2, 'c': 3, 'd': 4}

# |= 演算子で結合（d1を更新）
d1 |= d2
print(d1)  # {'a': 1, 'b': 2, 'c': 3, 'd': 4}
```

**複数の要素を一度に追加（** 演算子）\*\*:

```python
d = {"a": 1}
new_items = {"b": 2, "c": 3}

# ** で展開して結合
d = {**d, **new_items}
print(d)
# 出力: {'a': 1, 'b': 2, 'c': 3}
```

**defaultdict（存在しない場合の自動追加）**:

```python
from collections import defaultdict

# デフォルト値を0にする
counter = defaultdict(int)

# 存在しないキーにアクセスすると自動的に0が追加される
counter["apple"] += 1
counter["banana"] += 1
counter["apple"] += 1

print(dict(counter))
# 出力: {'apple': 2, 'banana': 1}
```

**実用例（リストを値に持つ辞書）**:

```python
# 通常の方法
groups = {}
groups.setdefault("fruits", []).append("apple")
groups.setdefault("fruits", []).append("banana")
groups.setdefault("vegetables", []).append("carrot")

print(groups)
# 出力: {'fruits': ['apple', 'banana'], 'vegetables': ['carrot']}

# defaultdictを使った方法
from collections import defaultdict
groups = defaultdict(list)
groups["fruits"].append("apple")
groups["fruits"].append("banana")
groups["vegetables"].append("carrot")

print(dict(groups))
# 出力: {'fruits': ['apple', 'banana'], 'vegetables': ['carrot']}
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
map.set(key, value);
```

JavaScript では`Map`に要素を追加するには`set()`メソッドを使う。

**基本的な使い方**:

```javascript
const scores = new Map();

// 要素の追加
scores.set("Alice", 85);
scores.set("Bob", 90);
scores.set("Charlie", 78);

console.log(scores);
// 出力: Map(3) { 'Alice' => 85, 'Bob' => 90, 'Charlie' => 78 }
```

**上書き**:

既に同じキーが存在する場合は、値が上書きされる。

```javascript
const map = new Map();

map.set("key", 100);
console.log(map); // Map(1) { 'key' => 100 }

map.set("key", 200); // 上書き
console.log(map); // Map(1) { 'key' => 200 }
```

**メソッドチェーン**:

`set()`は`Map`自身を返すので、メソッドチェーンが可能。

```javascript
const map = new Map();

map.set("a", 1).set("b", 2).set("c", 3).set("d", 4);

console.log(map);
// 出力: Map(4) { 'a' => 1, 'b' => 2, 'c' => 3, 'd' => 4 }
```

**配列から作成**:

```javascript
// 初期化時に配列から作成
const map = new Map([
  ["Tokyo", 20],
  ["Sapporo", 15],
  ["Naha", 25],
]);

console.log(map);
// 出力: Map(3) { 'Tokyo' => 20, 'Sapporo' => 15, 'Naha' => 25 }
```

**別の Map から追加**:

```javascript
const map1 = new Map([
  ["a", 1],
  ["b", 2],
]);

const map2 = new Map([
  ["c", 3],
  ["d", 4],
]);

// map2の全要素をmap1に追加
for (const [key, value] of map2) {
  map1.set(key, value);
}

console.log(map1);
// 出力: Map(4) { 'a' => 1, 'b' => 2, 'c' => 3, 'd' => 4 }
```

**Object との違い**:

```javascript
// Mapを使った方法
const map = new Map();
map.set("key1", 100);
map.set("key2", 200);

// Objectを使った方法
const obj = {};
obj.key1 = 100;
obj.key2 = 200;

// または
obj["key1"] = 100;
obj["key2"] = 200;
```

**任意の型をキーにできる**:

`Map`では、オブジェクトや関数もキーとして使える。

```javascript
const map = new Map();

// オブジェクトをキーにする
const keyObj = { id: 1 };
map.set(keyObj, "value1");

// 関数をキーにする
const keyFunc = function () {};
map.set(keyFunc, "value2");

// 数値をキーにする
map.set(1, "number key");
map.set("1", "string key");

console.log(map.get(1)); // "number key"
console.log(map.get("1")); // "string key"
```

**実用例（カウンター）**:

```javascript
const text = "hello world";
const charCount = new Map();

for (const char of text) {
  const count = charCount.get(char) || 0;
  charCount.set(char, count + 1);
}

console.log(charCount);
// Map(8) { 'h' => 1, 'e' => 1, 'l' => 3, 'o' => 2, ' ' => 1, 'w' => 1, 'r' => 1, 'd' => 1 }
```

**実用例（グループ化）**:

```javascript
const students = [
  { name: "Alice", grade: "A" },
  { name: "Bob", grade: "B" },
  { name: "Charlie", grade: "A" },
];

const grouped = new Map();

for (const student of students) {
  if (!grouped.has(student.grade)) {
    grouped.set(student.grade, []);
  }
  grouped.get(student.grade).push(student.name);
}

console.log(grouped);
// Map(2) { 'A' => [ 'Alice', 'Charlie' ], 'B' => [ 'Bob' ] }
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
m[key] = value
```

Go ではマップに要素を追加するには、`マップ[キー] = 値`の形式を使う。

**基本的な使い方**:

```go
import "fmt"

scores := make(map[string]int)

// 要素の追加
scores["Alice"] = 85
scores["Bob"] = 90
scores["Charlie"] = 78

fmt.Println(scores)
// 出力: map[Alice:85 Bob:90 Charlie:78]
```

**上書き**:

既に同じキーが存在する場合は、値が上書きされる。

```go
m := make(map[string]int)

m["key"] = 100
fmt.Println(m)  // map[key:100]

m["key"] = 200  // 上書き
fmt.Println(m)  // map[key:200]
```

**複数の要素を一度に追加**:

初期化時にリテラルで複数の要素を指定できる。

```go
scores := map[string]int{
    "Alice":   85,
    "Bob":     90,
    "Charlie": 78,
}

fmt.Println(scores)
// 出力: map[Alice:85 Bob:90 Charlie:78]
```

**別のマップから追加**:

```go
m1 := map[string]int{"a": 1, "b": 2}
m2 := map[string]int{"c": 3, "d": 4}

// m2の全要素をm1に追加
for key, value := range m2 {
    m1[key] = value
}

fmt.Println(m1)
// 出力: map[a:1 b:2 c:3 d:4]
```

**存在チェックしてから追加**:

```go
m := map[string]int{"key1": 100}

// key1が存在しない場合のみ追加
if _, ok := m["key1"]; !ok {
    m["key1"] = 200  // 既に存在するので実行されない
}

// key2が存在しない場合のみ追加
if _, ok := m["key2"]; !ok {
    m["key2"] = 300  // 存在しないので追加される
}

fmt.Println(m)
// 出力: map[key1:100 key2:300]
```

**カウンターの実装**:

```go
text := "hello world"
charCount := make(map[rune]int)

for _, char := range text {
    charCount[char]++  // 存在しない場合は0から始まる
}

fmt.Println(charCount)
// 出力: map[ :1 d:1 e:1 h:1 l:3 o:2 r:1 w:1]
```

**リストを値に持つマップ**:

```go
groups := make(map[string][]string)

// appendで要素を追加
groups["fruits"] = append(groups["fruits"], "apple")
groups["fruits"] = append(groups["fruits"], "banana")
groups["vegetables"] = append(groups["vegetables"], "carrot")

fmt.Println(groups)
// 出力: map[fruits:[apple banana] vegetables:[carrot]]
```

**ネストしたマップ**:

```go
// マップのマップ
nested := make(map[string]map[string]int)

// 内側のマップを初期化してから追加
nested["group1"] = make(map[string]int)
nested["group1"]["Alice"] = 85
nested["group1"]["Bob"] = 90

nested["group2"] = make(map[string]int)
nested["group2"]["Charlie"] = 78

fmt.Println(nested)
// 出力: map[group1:map[Alice:85 Bob:90] group2:map[Charlie:78]]
```

**構造体を値に持つマップ**:

```go
type Student struct {
    Name  string
    Score int
}

students := make(map[int]Student)

students[1] = Student{"Alice", 85}
students[2] = Student{"Bob", 90}
students[3] = Student{"Charlie", 78}

fmt.Println(students)
// 出力: map[1:{Alice 85} 2:{Bob 90} 3:{Charlie 78}]
```

**実用例（グループ化）**:

```go
type Person struct {
    Name  string
    Grade string
}

people := []Person{
    {"Alice", "A"},
    {"Bob", "B"},
    {"Charlie", "A"},
}

// Gradeでグループ化
grouped := make(map[string][]string)
for _, person := range people {
    grouped[person.Grade] = append(grouped[person.Grade], person.Name)
}

fmt.Println(grouped)
// 出力: map[A:[Alice Charlie] B:[Bob]]
```

**注意: nil マップへの追加はパニック**:

```go
var m map[string]int  // nil

// nil マップへの代入はパニック
// m["key"] = 100  // panic: assignment to entry in nil map

// make で初期化が必要
m = make(map[string]int)
m["key"] = 100  // OK
```

</div>
