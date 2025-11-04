---
title: "辞書(Map)"
date: "2019-10-28T00:36:30+09:00"
excerpt: "辞書(Map)について"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-28T00:36:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

辞書(Map)とは **"キー"** と **"値"** の 2 つの要素からなるデータ構造で、キーを指定した時、辞書(Map)内でそのキーに対応づけられている値が返ってくるというデータ構造である。

またこの定義上、キーは辞書(Map)内では一意でないといけない（キーが重複してはならない）。ただし、値の方は一意になってなくても良い（重複しても良い）。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
Map<K, V> map = new HashMap<>();
```

Java では`Map`インターフェースを使って辞書（連想配列）を扱う。

**基本的な使い方**:

`Map`はインターフェースなので、具体的な実装クラス（`HashMap`、`LinkedHashMap`、`TreeMap`など）を使う。

```java
import java.util.Map;
import java.util.HashMap;

// Mapの作成
Map<String, Integer> scores = new HashMap<>();

// 要素の追加
scores.put("Alice", 85);
scores.put("Bob", 90);
scores.put("Charlie", 78);

// 要素の取得
int aliceScore = scores.get("Alice");
System.out.println("Alice: " + aliceScore);
// 出力: Alice: 85

// 存在しないキーの取得（nullが返る）
Integer davidScore = scores.get("David");
System.out.println("David: " + davidScore);
// 出力: David: null
```

**初期化（Java 9+）**:

```java
// Map.of() で不変のMapを作成
Map<String, Integer> scores = Map.of(
    "Alice", 85,
    "Bob", 90,
    "Charlie", 78
);

// 10個以上の要素の場合は Map.ofEntries()
Map<String, Integer> manyScores = Map.ofEntries(
    Map.entry("Alice", 85),
    Map.entry("Bob", 90)
);
```

**基本操作**:

```java
Map<String, Integer> map = new HashMap<>();

// 追加
map.put("key1", 100);
map.put("key2", 200);

// 取得
Integer value = map.get("key1");  // 100

// デフォルト値付き取得
Integer value2 = map.getOrDefault("key3", 0);  // 0

// 存在チェック
boolean hasKey = map.containsKey("key1");  // true
boolean hasValue = map.containsValue(100);  // true

// 削除
map.remove("key1");

// サイズ
int size = map.size();

// 空かどうか
boolean isEmpty = map.isEmpty();

// すべてクリア
map.clear();
```

**キーが存在しない場合の処理**:

```java
Map<String, Integer> map = new HashMap<>();

// 存在しない場合のみ追加
map.putIfAbsent("key1", 100);

// 存在する場合のみ処理
map.computeIfPresent("key1", (k, v) -> v + 10);

// 存在しない場合のみ処理
map.computeIfAbsent("key2", k -> 200);
```

**反復処理**:

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 85);
scores.put("Bob", 90);

// キーでの反復
for (String name : scores.keySet()) {
    System.out.println(name);
}

// 値での反復
for (Integer score : scores.values()) {
    System.out.println(score);
}

// キーと値での反復
for (Map.Entry<String, Integer> entry : scores.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}

// forEach（Java 8+）
scores.forEach((name, score) -> {
    System.out.println(name + ": " + score);
});
```

**HashMap vs LinkedHashMap vs TreeMap**:

```java
// HashMap: 順序なし（最も高速）
Map<String, Integer> hashMap = new HashMap<>();
hashMap.put("c", 3);
hashMap.put("a", 1);
hashMap.put("b", 2);
// 出力順序: 不定

// LinkedHashMap: 挿入順序を保持
Map<String, Integer> linkedMap = new LinkedHashMap<>();
linkedMap.put("c", 3);
linkedMap.put("a", 1);
linkedMap.put("b", 2);
// 出力順序: c, a, b

// TreeMap: キーでソート
Map<String, Integer> treeMap = new TreeMap<>();
treeMap.put("c", 3);
treeMap.put("a", 1);
treeMap.put("b", 2);
// 出力順序: a, b, c
```

**実用例（文字数カウント）**:

```java
String text = "hello world";
Map<Character, Integer> charCount = new HashMap<>();

for (char c : text.toCharArray()) {
    charCount.put(c, charCount.getOrDefault(c, 0) + 1);
}

System.out.println(charCount);
// 出力: {d=1, e=1, h=1, l=3, o=2, r=1, w=1,  =1}
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
d = {key: value}
```

Python では辞書（dict）という名前で呼ばれ、`{}`で囲まれたものが辞書となる。

**基本的な使い方**:

```python
# 辞書の作成
scores = {
    "Alice": 85,
    "Bob": 90,
    "Charlie": 78
}

# 要素の取得
alice_score = scores["Alice"]
print(f"Alice: {alice_score}")
# 出力: Alice: 85

# 存在しないキーの取得（KeyErrorが発生）
# david_score = scores["David"]  # KeyError
```

**空の辞書の作成**:

```python
# 空の辞書
empty_dict = {}

# dict()を使った作成
another_dict = dict()

# dict()で初期化
scores = dict(Alice=85, Bob=90, Charlie=78)
```

**基本操作**:

```python
d = {}

# 追加・更新
d["key1"] = 100
d["key2"] = 200

# 取得
value = d["key1"]  # 100

# デフォルト値付き取得（存在しない場合）
value2 = d.get("key3")  # None
value3 = d.get("key3", 0)  # 0

# 存在チェック
has_key = "key1" in d  # True
has_key2 = "key3" in d  # False

# 削除
del d["key1"]

# pop（削除して値を取得）
value = d.pop("key2")  # 200
value_default = d.pop("key3", 0)  # 0（存在しない場合）

# サイズ
size = len(d)

# 空かどうか
is_empty = len(d) == 0
# または
is_empty = not d

# すべてクリア
d.clear()
```

**キーが存在しない場合の処理**:

```python
d = {}

# setdefault: キーが存在しない場合のみ追加
d.setdefault("key1", 100)  # 100（追加される）
d.setdefault("key1", 200)  # 100（既に存在するので変更されない）
```

**反復処理**:

```python
scores = {"Alice": 85, "Bob": 90, "Charlie": 78}

# キーでの反復
for name in scores:
    print(name)

# キーでの反復（明示的）
for name in scores.keys():
    print(name)

# 値での反復
for score in scores.values():
    print(score)

# キーと値での反復
for name, score in scores.items():
    print(f"{name}: {score}")
```

**辞書の結合**:

```python
dict1 = {"a": 1, "b": 2}
dict2 = {"c": 3, "d": 4}

# update() で結合（dict1が変更される）
dict1.update(dict2)
print(dict1)  # {'a': 1, 'b': 2, 'c': 3, 'd': 4}

# ** で結合（新しい辞書を作成）
dict3 = {**dict1, **dict2}

# | 演算子で結合（Python 3.9+）
dict4 = dict1 | dict2
```

**辞書内包表記**:

```python
# 通常の辞書内包表記
squares = {x: x**2 for x in range(5)}
print(squares)  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# 条件付き
even_squares = {x: x**2 for x in range(10) if x % 2 == 0}
print(even_squares)  # {0: 0, 2: 4, 4: 16, 6: 36, 8: 64}

# キーと値を入れ替え
original = {"a": 1, "b": 2, "c": 3}
swapped = {v: k for k, v in original.items()}
print(swapped)  # {1: 'a', 2: 'b', 3: 'c'}
```

**defaultdict（collections）**:

```python
from collections import defaultdict

# 存在しないキーにアクセスしてもエラーにならない
counts = defaultdict(int)  # デフォルト値: 0
counts["apple"] += 1
counts["banana"] += 1
counts["apple"] += 1
print(dict(counts))  # {'apple': 2, 'banana': 1}

# リストをデフォルト値に
groups = defaultdict(list)
groups["fruits"].append("apple")
groups["fruits"].append("banana")
groups["vegetables"].append("carrot")
print(dict(groups))
# {'fruits': ['apple', 'banana'], 'vegetables': ['carrot']}
```

**Counter（collections）**:

```python
from collections import Counter

# 要素のカウント
text = "hello world"
char_count = Counter(text)
print(char_count)
# Counter({'l': 3, 'o': 2, 'h': 1, 'e': 1, ' ': 1, 'w': 1, 'r': 1, 'd': 1})

# 最も多い要素
print(char_count.most_common(2))  # [('l', 3), ('o', 2)]
```

**実用例（単語数カウント）**:

```python
text = "hello world hello python"
word_count = {}

for word in text.split():
    word_count[word] = word_count.get(word, 0) + 1

print(word_count)
# {'hello': 2, 'world': 1, 'python': 1}

# defaultdictを使った方法
from collections import defaultdict
word_count = defaultdict(int)
for word in text.split():
    word_count[word] += 1
print(dict(word_count))
```

**実用例（グループ化）**:

```python
students = [
    {"name": "Alice", "grade": "A"},
    {"name": "Bob", "grade": "B"},
    {"name": "Charlie", "grade": "A"},
]

# gradeでグループ化
from collections import defaultdict
grouped = defaultdict(list)
for student in students:
    grouped[student["grade"]].append(student["name"])

print(dict(grouped))
# {'A': ['Alice', 'Charlie'], 'B': ['Bob']}
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
const map = new Map();
```

JavaScript では`Map`オブジェクトを使って辞書（連想配列）を扱う。

**基本的な使い方**:

```javascript
// Mapの作成
const scores = new Map();

// 要素の追加
scores.set("Alice", 85);
scores.set("Bob", 90);
scores.set("Charlie", 78);

// 要素の取得
const aliceScore = scores.get("Alice");
console.log(`Alice: ${aliceScore}`);
// 出力: Alice: 85

// 存在しないキーの取得（undefinedが返る）
const davidScore = scores.get("David");
console.log(`David: ${davidScore}`);
// 出力: David: undefined
```

**初期化**:

```javascript
// 配列から作成
const scores = new Map([
  ["Alice", 85],
  ["Bob", 90],
  ["Charlie", 78],
]);

// または
const entries = [
  ["Alice", 85],
  ["Bob", 90],
];
const map = new Map(entries);
```

**基本操作**:

```javascript
const map = new Map();

// 追加・更新
map.set("key1", 100);
map.set("key2", 200);

// 取得
const value = map.get("key1"); // 100

// 存在チェック
const hasKey = map.has("key1"); // true

// 削除
map.delete("key1");

// サイズ
const size = map.size;

// すべてクリア
map.clear();
```

**反復処理**:

```javascript
const scores = new Map([
  ["Alice", 85],
  ["Bob", 90],
  ["Charlie", 78],
]);

// キーでの反復
for (const name of scores.keys()) {
  console.log(name);
}

// 値での反復
for (const score of scores.values()) {
  console.log(score);
}

// キーと値での反復
for (const [name, score] of scores.entries()) {
  console.log(`${name}: ${score}`);
}

// forEach
scores.forEach((score, name) => {
  console.log(`${name}: ${score}`);
});
```

**Map vs Object**:

JavaScript では、`Map`の他に通常の`Object`も辞書として使える。

```javascript
// Object を使った方法
const obj = {
  Alice: 85,
  Bob: 90,
  Charlie: 78,
};

console.log(obj.Alice); // 85
console.log(obj["Bob"]); // 90

// Map を使った方法
const map = new Map([
  ["Alice", 85],
  ["Bob", 90],
  ["Charlie", 78],
]);

console.log(map.get("Alice")); // 85
console.log(map.get("Bob")); // 90
```

**Map と Object の違い**:

| 特徴           | Map                           | Object                    |
| -------------- | ----------------------------- | ------------------------- |
| キーの型       | 任意の型（オブジェクトも OK） | 文字列またはシンボル      |
| 順序           | 挿入順序を保持                | 挿入順序を保持（ES2015+） |
| サイズ取得     | `map.size`                    | `Object.keys(obj).length` |
| 反復           | 直接反復可能                  | `Object.keys()`等が必要   |
| パフォーマンス | 頻繁な追加・削除に最適        | 小さいデータに最適        |
| デフォルトキー | なし                          | プロトタイプチェーン      |

**キーに任意の型を使える**:

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

**配列との変換**:

```javascript
// Map から配列へ
const map = new Map([
  ["a", 1],
  ["b", 2],
]);
const entries = Array.from(map); // [['a', 1], ['b', 2]]
const entries2 = [...map]; // [['a', 1], ['b', 2]]

// 配列から Map へ
const arr = [
  ["a", 1],
  ["b", 2],
];
const newMap = new Map(arr);
```

**実用例（文字数カウント）**:

```javascript
const text = "hello world";
const charCount = new Map();

for (const char of text) {
  charCount.set(char, (charCount.get(char) || 0) + 1);
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

// gradeでグループ化
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

**WeakMap**:

`WeakMap`はキーが弱参照される Map。キーはオブジェクトのみ。

```javascript
const wm = new WeakMap();
let obj = { id: 1 };

wm.set(obj, "value");
console.log(wm.get(obj)); // "value"

// objへの参照がなくなると、自動的にWeakMapからも削除される
obj = null;
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
m := make(map[KeyType]ValueType)
```

Go では**map**（マップ）を使って辞書（連想配列）を扱う。

**基本的な使い方**:

マップの型は`map[KeyType]ValueType`で表す。`make`関数で生成する。

```go
import "fmt"

// マップの作成
scores := make(map[string]int)

// 要素の追加
scores["Alice"] = 85
scores["Bob"] = 90
scores["Charlie"] = 78

// 要素の取得
aliceScore := scores["Alice"]
fmt.Printf("Alice: %d\n", aliceScore)
// 出力: Alice: 85

// 存在しないキーの取得（ゼロ値が返る）
davidScore := scores["David"]
fmt.Printf("David: %d\n", davidScore)
// 出力: David: 0
```

**初期化**:

```go
// リテラルで初期化
scores := map[string]int{
    "Alice":   85,
    "Bob":     90,
    "Charlie": 78,
}

// 空のマップ
empty := map[string]int{}

// makeで容量を指定
large := make(map[string]int, 100)
```

**基本操作**:

```go
m := make(map[string]int)

// 追加・更新
m["key1"] = 100
m["key2"] = 200

// 取得
value := m["key1"]  // 100

// 存在チェック（2値受け取り）
value, ok := m["key1"]
if ok {
    fmt.Println("存在します:", value)
}

// 存在チェックのみ
if _, ok := m["key3"]; ok {
    fmt.Println("存在します")
} else {
    fmt.Println("存在しません")
}

// 削除
delete(m, "key1")

// サイズ
size := len(m)

// すべてクリア（方法1: 新しいマップを作る）
m = make(map[string]int)

// すべてクリア（方法2: すべて削除）
for key := range m {
    delete(m, key)
}
```

**存在チェックの重要性**:

```go
m := make(map[string]int)
m["exists"] = 0

// 値だけ取得（ゼロ値と区別できない）
value1 := m["exists"]     // 0
value2 := m["not_exists"] // 0（ゼロ値）

// 存在チェック付き（推奨）
value, ok := m["exists"]
if ok {
    fmt.Println("存在します:", value)  // 0
}

value, ok = m["not_exists"]
if !ok {
    fmt.Println("存在しません")
}
```

**反復処理**:

```go
scores := map[string]int{
    "Alice":   85,
    "Bob":     90,
    "Charlie": 78,
}

// キーと値での反復
for name, score := range scores {
    fmt.Printf("%s: %d\n", name, score)
}

// キーのみの反復
for name := range scores {
    fmt.Println(name)
}

// 値のみの反復
for _, score := range scores {
    fmt.Println(score)
}
```

**注意: マップの順序は不定**:

```go
m := map[string]int{
    "c": 3,
    "a": 1,
    "b": 2,
}

// 反復の順序は毎回異なる可能性がある
for k, v := range m {
    fmt.Printf("%s: %d\n", k, v)
}
```

**ソートして反復**:

```go
import "sort"

scores := map[string]int{
    "Charlie": 78,
    "Alice":   85,
    "Bob":     90,
}

// キーをソート
keys := make([]string, 0, len(scores))
for key := range scores {
    keys = append(keys, key)
}
sort.Strings(keys)

// ソートされた順序で反復
for _, key := range keys {
    fmt.Printf("%s: %d\n", key, scores[key])
}
// 出力:
// Alice: 85
// Bob: 90
// Charlie: 78
```

**ネストしたマップ**:

```go
// マップのマップ
nested := map[string]map[string]int{
    "group1": {
        "Alice": 85,
        "Bob":   90,
    },
    "group2": {
        "Charlie": 78,
    },
}

// アクセス
score := nested["group1"]["Alice"]
fmt.Println(score)  // 85

// 動的に作成
students := make(map[string]map[string]int)
students["group1"] = make(map[string]int)
students["group1"]["Alice"] = 85
```

**マップのゼロ値（nil）**:

```go
var m map[string]int  // nil

// nil マップへの代入はパニック
// m["key"] = 100  // panic: assignment to entry in nil map

// 読み取りは可能（ゼロ値が返る）
value := m["key"]  // 0

// 長さは0
fmt.Println(len(m))  // 0

// make で初期化が必要
m = make(map[string]int)
m["key"] = 100  // OK
```

**マップは参照型**:

```go
m1 := map[string]int{"a": 1}
m2 := m1  // 参照をコピー

m2["a"] = 2
fmt.Println(m1["a"])  // 2（m1も変更される）

// コピーするには新しいマップを作る
m3 := make(map[string]int)
for k, v := range m1 {
    m3[k] = v
}
```

**実用例（文字数カウント）**:

```go
text := "hello world"
charCount := make(map[rune]int)

for _, char := range text {
    charCount[char]++
}

for char, count := range charCount {
    fmt.Printf("%c: %d\n", char, count)
}
// 出力: h: 1, e: 1, l: 3, o: 2,  : 1, w: 1, r: 1, d: 1
```

**実用例（グループ化）**:

```go
type Student struct {
    Name  string
    Grade string
}

students := []Student{
    {"Alice", "A"},
    {"Bob", "B"},
    {"Charlie", "A"},
}

// gradeでグループ化
grouped := make(map[string][]string)
for _, student := range students {
    grouped[student.Grade] = append(grouped[student.Grade], student.Name)
}

fmt.Println(grouped)
// map[A:[Alice Charlie] B:[Bob]]
```

**実用例（単語数カウント）**:

```go
import "strings"

text := "hello world hello go"
wordCount := make(map[string]int)

for _, word := range strings.Fields(text) {
    wordCount[word]++
}

fmt.Println(wordCount)
// map[go:1 hello:2 world:1]
```

**sync.Map（並行アクセス）**:

通常のマップは並行アクセスに対して安全ではない。`sync.Map`を使うか、`sync.Mutex`でロックする。

```go
import "sync"

// sync.Mapを使った方法
var sm sync.Map

sm.Store("key", "value")
value, ok := sm.Load("key")
if ok {
    fmt.Println(value)
}

// Mutexを使った方法
type SafeMap struct {
    mu sync.Mutex
    m  map[string]int
}

func (sm *SafeMap) Set(key string, value int) {
    sm.mu.Lock()
    defer sm.mu.Unlock()
    sm.m[key] = value
}

func (sm *SafeMap) Get(key string) (int, bool) {
    sm.mu.Lock()
    defer sm.mu.Unlock()
    value, ok := sm.m[key]
    return value, ok
}
```

</div>
