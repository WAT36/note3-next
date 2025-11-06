---
title: "辞書(Map)からキーのリストを取得"
date: "2019-10-28T08:36:30+09:00"
excerpt: "辞書(Map)からキーのリストを取得する方法について"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-28T08:36:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

辞書(Map)からキーのリストを取得する方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
map.keySet()
```

Java では`Map`からキーのリストを取得するには、`keySet()`で`Set`を取得し、必要に応じて`List`に変換する。

**基本的な使い方（Set として取得）**:

```java
import java.util.Map;
import java.util.HashMap;
import java.util.Set;

Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 85);
scores.put("Bob", 90);
scores.put("Charlie", 78);

// キーの Set を取得
Set<String> keys = scores.keySet();
System.out.println(keys);
// 出力: [Alice, Bob, Charlie]（順序は不定）
```

**List に変換**:

```java
import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;

Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 85);
scores.put("Bob", 90);
scores.put("Charlie", 78);

// Set から List に変換
List<String> keyList = new ArrayList<>(scores.keySet());
System.out.println(keyList);
// 出力: [Alice, Bob, Charlie]（順序は不定）
```

**keySet() の特徴**:

`keySet()`は元のマップのビューを返すため、マップの変更が反映される。

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 85);
scores.put("Bob", 90);

Set<String> keys = scores.keySet();
System.out.println(keys);  // [Alice, Bob]

// マップに要素を追加
scores.put("Charlie", 78);
System.out.println(keys);  // [Alice, Bob, Charlie]（変更が反映される）
```

**for-each でイテレート**:

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 85);
scores.put("Bob", 90);
scores.put("Charlie", 78);

// キーをイテレート
for (String key : scores.keySet()) {
    System.out.println(key + ": " + scores.get(key));
}
// 出力:
// Alice: 85
// Bob: 90
// Charlie: 78
```

**Stream API を使う方法**:

```java
import java.util.stream.Collectors;

Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 85);
scores.put("Bob", 90);
scores.put("Charlie", 78);

// Stream で List に変換
List<String> keyList = scores.keySet().stream()
    .collect(Collectors.toList());
System.out.println(keyList);

// ソートして取得
List<String> sortedKeys = scores.keySet().stream()
    .sorted()
    .collect(Collectors.toList());
System.out.println(sortedKeys);  // [Alice, Bob, Charlie]
```

**LinkedHashMap で順序を保持**:

```java
import java.util.LinkedHashMap;

Map<String, Integer> scores = new LinkedHashMap<>();
scores.put("Alice", 85);
scores.put("Bob", 90);
scores.put("Charlie", 78);

// 挿入順序が保持される
Set<String> keys = scores.keySet();
System.out.println(keys);  // [Alice, Bob, Charlie]（挿入順）
```

**TreeMap で自動ソート**:

```java
import java.util.TreeMap;

Map<String, Integer> scores = new TreeMap<>();
scores.put("Charlie", 78);
scores.put("Alice", 85);
scores.put("Bob", 90);

// キーがソートされる
Set<String> keys = scores.keySet();
System.out.println(keys);  // [Alice, Bob, Charlie]（自動ソート）
```

**実用例（キーのフィルタリング）**:

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 85);
scores.put("Bob", 90);
scores.put("Charlie", 78);
scores.put("David", 92);

// スコアが 80 点以上の人の名前を取得
List<String> highScorers = scores.entrySet().stream()
    .filter(entry -> entry.getValue() >= 80)
    .map(Map.Entry::getKey)
    .collect(Collectors.toList());
System.out.println(highScorers);
// 出力: [Alice, Bob, David]
```

**実用例（キーの数）**:

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 85);
scores.put("Bob", 90);

int keyCount = scores.keySet().size();
System.out.println("キーの数: " + keyCount);
// 出力: キーの数: 2
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
d.keys()
```

Python では辞書からキーのリストを取得するには、`keys()`で`dict_keys`ビューを取得し、必要に応じてリストに変換する。

**基本的な使い方（dict_keys として取得）**:

```python
scores = {"Alice": 85, "Bob": 90, "Charlie": 78}

# キーのビューを取得
keys = scores.keys()
print(keys)
# 出力: dict_keys(['Alice', 'Bob', 'Charlie'])

print(type(keys))
# 出力: <class 'dict_keys'>
```

**リストに変換**:

```python
scores = {"Alice": 85, "Bob": 90, "Charlie": 78}

# リストに変換
key_list = list(scores.keys())
print(key_list)
# 出力: ['Alice', 'Bob', 'Charlie']
```

**keys() の特徴**:

`keys()`は元の辞書のビューを返すため、辞書の変更が反映される。

```python
scores = {"Alice": 85, "Bob": 90}

keys = scores.keys()
print(keys)  # dict_keys(['Alice', 'Bob'])

# 辞書に要素を追加
scores["Charlie"] = 78
print(keys)  # dict_keys(['Alice', 'Bob', 'Charlie'])（変更が反映される）
```

**辞書を直接イテレート**:

辞書を直接イテレートすると、自動的にキーがイテレートされる（`keys()`は省略可能）。

```python
scores = {"Alice": 85, "Bob": 90, "Charlie": 78}

# keys() を使う方法
for key in scores.keys():
    print(f"{key}: {scores[key]}")

# keys() を省略した方法（推奨）
for key in scores:
    print(f"{key}: {scores[key]}")
# 出力:
# Alice: 85
# Bob: 90
# Charlie: 78
```

**ソートして取得**:

```python
scores = {"Charlie": 78, "Alice": 85, "Bob": 90}

# キーをソートしてリストに変換
sorted_keys = sorted(scores.keys())
print(sorted_keys)
# 出力: ['Alice', 'Bob', 'Charlie']
```

**リスト内包表記**:

```python
scores = {"Alice": 85, "Bob": 90, "Charlie": 78}

# リスト内包表記でキーを取得
keys = [k for k in scores.keys()]
print(keys)  # ['Alice', 'Bob', 'Charlie']

# 大文字に変換
upper_keys = [k.upper() for k in scores.keys()]
print(upper_keys)  # ['ALICE', 'BOB', 'CHARLIE']
```

**実用例（キーのフィルタリング）**:

```python
scores = {"Alice": 85, "Bob": 90, "Charlie": 78, "David": 92}

# スコアが 80 点以上の人の名前を取得
high_scorers = [name for name in scores.keys() if scores[name] >= 80]
print(high_scorers)
# 出力: ['Alice', 'Bob', 'David']
```

**実用例（キーの数）**:

```python
scores = {"Alice": 85, "Bob": 90}

key_count = len(scores.keys())
print(f"キーの数: {key_count}")
# 出力: キーの数: 2

# len() は辞書に直接適用できる
key_count2 = len(scores)
print(f"キーの数: {key_count2}")
# 出力: キーの数: 2
```

**実用例（キーの存在チェック）**:

```python
scores = {"Alice": 85, "Bob": 90}

# in 演算子でキーの存在チェック
if "Alice" in scores.keys():
    print("Alice は存在します")

# keys() を省略できる（推奨）
if "Alice" in scores:
    print("Alice は存在します")
# 出力: Alice は存在します
```

**Python 3.7+ での順序保持**:

Python 3.7+ では、辞書は挿入順序を保持する。

```python
scores = {}
scores["Charlie"] = 78
scores["Alice"] = 85
scores["Bob"] = 90

keys = list(scores.keys())
print(keys)
# 出力: ['Charlie', 'Alice', 'Bob']（挿入順）
```

**set に変換**:

```python
scores = {"Alice": 85, "Bob": 90, "Charlie": 78}

# set に変換
key_set = set(scores.keys())
print(key_set)
# 出力: {'Alice', 'Bob', 'Charlie'}
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
map.keys();
```

JavaScript では`Map`からキーのリストを取得するには、`keys()`でイテレータを取得し、必要に応じて配列に変換する。

**基本的な使い方（イテレータとして取得）**:

```javascript
const scores = new Map([
  ["Alice", 85],
  ["Bob", 90],
  ["Charlie", 78],
]);

// キーのイテレータを取得
const keys = scores.keys();
console.log(keys);
// 出力: MapIterator { 'Alice', 'Bob', 'Charlie' }
```

**配列に変換**:

```javascript
const scores = new Map([
  ["Alice", 85],
  ["Bob", 90],
  ["Charlie", 78],
]);

// Array.from() で配列に変換
const keyArray = Array.from(scores.keys());
console.log(keyArray);
// 出力: ['Alice', 'Bob', 'Charlie']

// スプレッド構文で配列に変換
const keyArray2 = [...scores.keys()];
console.log(keyArray2);
// 出力: ['Alice', 'Bob', 'Charlie']
```

**for...of でイテレート**:

```javascript
const scores = new Map([
  ["Alice", 85],
  ["Bob", 90],
  ["Charlie", 78],
]);

// キーをイテレート
for (const key of scores.keys()) {
  console.log(`${key}: ${scores.get(key)}`);
}
// 出力:
// Alice: 85
// Bob: 90
// Charlie: 78
```

**Map の順序保持**:

`Map`は挿入順序を保持する。

```javascript
const scores = new Map();
scores.set("Charlie", 78);
scores.set("Alice", 85);
scores.set("Bob", 90);

const keys = Array.from(scores.keys());
console.log(keys);
// 出力: ['Charlie', 'Alice', 'Bob']（挿入順）
```

**ソートして取得**:

```javascript
const scores = new Map([
  ["Charlie", 78],
  ["Alice", 85],
  ["Bob", 90],
]);

// キーをソートして配列に変換
const sortedKeys = Array.from(scores.keys()).sort();
console.log(sortedKeys);
// 出力: ['Alice', 'Bob', 'Charlie']
```

**forEach でイテレート**:

```javascript
const scores = new Map([
  ["Alice", 85],
  ["Bob", 90],
  ["Charlie", 78],
]);

// forEach を使う方法
scores.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});
// 出力:
// Alice: 85
// Bob: 90
// Charlie: 78
```

**filter と map**:

```javascript
const scores = new Map([
  ["Alice", 85],
  ["Bob", 90],
  ["Charlie", 78],
  ["David", 92],
]);

// スコアが 80 点以上の人の名前を取得
const highScorers = Array.from(scores.entries())
  .filter(([name, score]) => score >= 80)
  .map(([name, score]) => name);
console.log(highScorers);
// 出力: ['Alice', 'Bob', 'David']
```

**実用例（キーの数）**:

```javascript
const scores = new Map([
  ["Alice", 85],
  ["Bob", 90],
]);

const keyCount = scores.size;
console.log(`キーの数: ${keyCount}`);
// 出力: キーの数: 2

// または keys() を配列に変換して length
const keyCount2 = Array.from(scores.keys()).length;
console.log(`キーの数: ${keyCount2}`);
// 出力: キーの数: 2
```

**実用例（キーの存在チェック）**:

```javascript
const scores = new Map([
  ["Alice", 85],
  ["Bob", 90],
]);

// has() メソッドでキーの存在チェック
if (scores.has("Alice")) {
  console.log("Alice は存在します");
}
// 出力: Alice は存在します

// キーの配列に含まれるかチェック
const keys = Array.from(scores.keys());
if (keys.includes("Alice")) {
  console.log("Alice は存在します");
}
// 出力: Alice は存在します
```

**Object との違い**:

```javascript
// Map を使った方法
const map = new Map([
  ["key1", "value1"],
  ["key2", "value2"],
]);
const keys1 = Array.from(map.keys());
console.log(keys1); // ['key1', 'key2']

// Object を使った方法
const obj = { key1: "value1", key2: "value2" };
const keys2 = Object.keys(obj);
console.log(keys2); // ['key1', 'key2']
```

**実用例（キーの変換）**:

```javascript
const scores = new Map([
  ["alice", 85],
  ["bob", 90],
  ["charlie", 78],
]);

// キーを大文字に変換
const upperKeys = Array.from(scores.keys()).map((key) => key.toUpperCase());
console.log(upperKeys);
// 出力: ['ALICE', 'BOB', 'CHARLIE']
```

**実用例（キーのフィルタリング）**:

```javascript
const scores = new Map([
  ["Alice", 85],
  ["Bob", 90],
  ["Charlie", 78],
]);

// 名前が 'A' で始まるキーを取得
const aKeys = Array.from(scores.keys()).filter((key) => key.startsWith("A"));
console.log(aKeys);
// 出力: ['Alice']
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
// キーのスライスを作成
```

Go ではマップからキーのリストを取得するには、キーをスライスに格納する必要がある。

**基本的な使い方**:

```go
import "fmt"

scores := map[string]int{
    "Alice":   85,
    "Bob":     90,
    "Charlie": 78,
}

// キーをスライスに格納
keys := make([]string, 0, len(scores))
for key := range scores {
    keys = append(keys, key)
}

fmt.Println(keys)
// 出力: [Alice Bob Charlie]（順序は不定）
```

**range でキーをイテレート**:

```go
scores := map[string]int{
    "Alice":   85,
    "Bob":     90,
    "Charlie": 78,
}

// キーをイテレート
for key := range scores {
    fmt.Printf("%s: %d\n", key, scores[key])
}
// 出力:
// Alice: 85
// Bob: 90
// Charlie: 78
// （順序は不定）
```

**ソートして取得**:

```go
import (
    "fmt"
    "sort"
)

scores := map[string]int{
    "Charlie": 78,
    "Alice":   85,
    "Bob":     90,
}

// キーをスライスに格納してソート
keys := make([]string, 0, len(scores))
for key := range scores {
    keys = append(keys, key)
}
sort.Strings(keys)

fmt.Println(keys)
// 出力: [Alice Bob Charlie]
```

**ソート済みのキーでイテレート**:

```go
import (
    "fmt"
    "sort"
)

scores := map[string]int{
    "Charlie": 78,
    "Alice":   85,
    "Bob":     90,
}

// ソート済みのキーを取得
keys := make([]string, 0, len(scores))
for key := range scores {
    keys = append(keys, key)
}
sort.Strings(keys)

// ソート済みのキーでイテレート
for _, key := range keys {
    fmt.Printf("%s: %d\n", key, scores[key])
}
// 出力:
// Alice: 85
// Bob: 90
// Charlie: 78
```

**汎用的な関数（ジェネリクス）**:

Go 1.18+ では、ジェネリクスを使って汎用的な関数を作成できる。

```go
import (
    "fmt"
    "golang.org/x/exp/constraints"
)

func getKeys[K comparable, V any](m map[K]V) []K {
    keys := make([]K, 0, len(m))
    for key := range m {
        keys = append(keys, key)
    }
    return keys
}

scores := map[string]int{
    "Alice":   85,
    "Bob":     90,
    "Charlie": 78,
}

keys := getKeys(scores)
fmt.Println(keys)
// 出力: [Alice Bob Charlie]（順序は不定）
```

**実用例（キーのフィルタリング）**:

```go
scores := map[string]int{
    "Alice":   85,
    "Bob":     90,
    "Charlie": 78,
    "David":   92,
}

// スコアが 80 点以上の人の名前を取得
highScorers := make([]string, 0)
for name, score := range scores {
    if score >= 80 {
        highScorers = append(highScorers, name)
    }
}

fmt.Println(highScorers)
// 出力: [Alice Bob David]（順序は不定）
```

**実用例（キーの数）**:

```go
scores := map[string]int{
    "Alice": 85,
    "Bob":   90,
}

keyCount := len(scores)
fmt.Printf("キーの数: %d\n", keyCount)
// 出力: キーの数: 2
```

**実用例（キーの存在チェック）**:

```go
scores := map[string]int{
    "Alice": 85,
    "Bob":   90,
}

// 2 値受け取りでキーの存在チェック
if _, ok := scores["Alice"]; ok {
    fmt.Println("Alice は存在します")
}
// 出力: Alice は存在します

// キーのスライスに含まれるかチェック
keys := make([]string, 0, len(scores))
for key := range scores {
    keys = append(keys, key)
}

found := false
for _, key := range keys {
    if key == "Alice" {
        found = true
        break
    }
}
if found {
    fmt.Println("Alice は存在します")
}
// 出力: Alice は存在します
```

**実用例（キーの変換）**:

```go
import (
    "fmt"
    "strings"
)

scores := map[string]int{
    "alice":   85,
    "bob":     90,
    "charlie": 78,
}

// キーを大文字に変換
upperKeys := make([]string, 0, len(scores))
for key := range scores {
    upperKeys = append(upperKeys, strings.ToUpper(key))
}

fmt.Println(upperKeys)
// 出力: [ALICE BOB CHARLIE]（順序は不定）
```

**実用例（キーのフィルタリング - 条件付き）**:

```go
import (
    "fmt"
    "strings"
)

scores := map[string]int{
    "Alice":   85,
    "Bob":     90,
    "Charlie": 78,
}

// 名前が 'A' で始まるキーを取得
aKeys := make([]string, 0)
for key := range scores {
    if strings.HasPrefix(key, "A") {
        aKeys = append(aKeys, key)
    }
}

fmt.Println(aKeys)
// 出力: [Alice]
```

**マップの順序は不定**:

Go のマップは順序を保持しないため、毎回異なる順序でイテレートされる可能性がある。

```go
scores := map[string]int{
    "Alice":   85,
    "Bob":     90,
    "Charlie": 78,
}

// 2回イテレートしてみる
fmt.Println("1回目:")
for key := range scores {
    fmt.Println(key)
}

fmt.Println("2回目:")
for key := range scores {
    fmt.Println(key)
}
// 出力: 順序が異なる可能性がある
```

**順序を保持したい場合**:

順序を保持したい場合は、別途スライスで順序を管理する。

```go
type OrderedMap struct {
    keys   []string
    values map[string]int
}

func NewOrderedMap() *OrderedMap {
    return &OrderedMap{
        keys:   make([]string, 0),
        values: make(map[string]int),
    }
}

func (om *OrderedMap) Set(key string, value int) {
    if _, exists := om.values[key]; !exists {
        om.keys = append(om.keys, key)
    }
    om.values[key] = value
}

func (om *OrderedMap) Keys() []string {
    return om.keys
}

om := NewOrderedMap()
om.Set("Charlie", 78)
om.Set("Alice", 85)
om.Set("Bob", 90)

fmt.Println(om.Keys())
// 出力: [Charlie Alice Bob]（挿入順）
```

</div>
