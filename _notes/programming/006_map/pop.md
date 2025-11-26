---
title: "辞書(Map)から要素削除"
date: "2019-10-28T03:36:30+09:00"
excerpt: "辞書(Map)から要素削除する方法ついて"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-28T03:36:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

辞書(Map)から要素を削除する方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
map.remove(key)
```

Java では`Map`から要素を削除するには`remove()`メソッドを使う。

**基本的な使い方**:

```java
import java.util.Map;
import java.util.HashMap;

Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 85);
scores.put("Bob", 90);
scores.put("Charlie", 78);

System.out.println(scores);
// {Alice=85, Bob=90, Charlie=78}

// 要素の削除（削除された値が返る）
Integer removed = scores.remove("Bob");
System.out.println("削除された値: " + removed);
// 削除された値: 90

System.out.println(scores);
// {Alice=85, Charlie=78}
```

**存在しないキーの削除**:

存在しないキーを削除しようとしても、エラーにならず`null`が返る。

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 85);

// 存在しないキーの削除（nullが返る）
Integer removed = scores.remove("David");
System.out.println(removed);  // null

// マップは変更されない
System.out.println(scores);  // {Alice=85}
```

**remove(key, value)（条件付き削除）**:

キーと値の両方が一致する場合のみ削除する。

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 85);
scores.put("Bob", 90);

// キーと値が一致する場合のみ削除
boolean removed1 = scores.remove("Alice", 85);
System.out.println(removed1);  // true

// 値が一致しない場合は削除されない
boolean removed2 = scores.remove("Bob", 80);
System.out.println(removed2);  // false

System.out.println(scores);  // {Bob=90}
```

**clear()（全要素削除）**:

すべての要素を削除する。

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 85);
scores.put("Bob", 90);
scores.put("Charlie", 78);

System.out.println(scores.size());  // 3

// 全要素削除
scores.clear();

System.out.println(scores.size());  // 0
System.out.println(scores);  // {}
```

**存在チェックしてから削除**:

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 85);

if (scores.containsKey("Alice")) {
    scores.remove("Alice");
    System.out.println("Alice を削除しました");
} else {
    System.out.println("Alice は存在しません");
}
// 出力: Alice を削除しました
```

**computeIfPresent（削除または更新）**:

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 85);
scores.put("Bob", 60);

// Bobのスコアが70未満なら削除
scores.computeIfPresent("Bob", (k, v) -> v < 70 ? null : v);

System.out.println(scores);  // {Alice=85}
```

**実用例（複数要素の削除）**:

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 85);
scores.put("Bob", 60);
scores.put("Charlie", 95);
scores.put("David", 55);

// 70点未満の要素を削除
scores.entrySet().removeIf(entry -> entry.getValue() < 70);

System.out.println(scores);
// {Alice=85, Charlie=95}
```

**実用例（キーのリストで削除）**:

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 85);
scores.put("Bob", 90);
scores.put("Charlie", 78);

List<String> toRemove = Arrays.asList("Bob", "Charlie");

// 複数のキーを削除
toRemove.forEach(scores::remove);

System.out.println(scores);  // {Alice=85}
```

**実用例（削除と同時に処理）**:

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 85);
scores.put("Bob", 90);

// 削除された値を使って処理
Integer removed = scores.remove("Bob");
if (removed != null) {
    System.out.println("Bob のスコア " + removed + " を削除しました");
}
// 出力: Bob のスコア 90 を削除しました
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
del d[key]  # または d.pop(key)
```

Python では辞書から要素を削除するには、主に 2 つの方法がある。

**方法 1: `del`文**:

```python
scores = {"Alice": 85, "Bob": 90, "Charlie": 78}

print(scores)
# {'Alice': 85, 'Bob': 90, 'Charlie': 78}

# 要素の削除（戻り値なし）
del scores["Bob"]

print(scores)
# {'Alice': 85, 'Charlie': 78}
```

**方法 2: `pop()`メソッド**:

削除した値が返される。

```python
scores = {"Alice": 85, "Bob": 90, "Charlie": 78}

# 要素の削除（削除された値が返る）
removed = scores.pop("Bob")
print(f"削除された値: {removed}")
# 削除された値: 90

print(scores)
# {'Alice': 85, 'Charlie': 78}
```

**del と pop() の違い**:

```python
d = {"key1": 100, "key2": 200}

# del: 戻り値なし
del d["key1"]

# pop(): 削除された値が返る
value = d.pop("key2")
print(value)  # 200
```

**存在しないキーの削除**:

どちらの方法も、存在しないキーを指定すると`KeyError`が発生する。

```python
scores = {"Alice": 85}

# 存在しないキーの削除（KeyErrorが発生）
try:
    del scores["David"]
except KeyError:
    print("David は存在しません")
# 出力: David は存在しません

try:
    scores.pop("David")
except KeyError:
    print("David は存在しません")
# 出力: David は存在しません
```

**pop() のデフォルト値**:

`pop()`の第 2 引数でデフォルト値を指定すると、キーが存在しない場合でもエラーにならない。

```python
scores = {"Alice": 85}

# 存在するキー
value1 = scores.pop("Alice", 0)
print(value1)  # 85

# 存在しないキー（デフォルト値が返る、エラーにならない）
value2 = scores.pop("David", 0)
print(value2)  # 0

print(scores)  # {}
```

**clear()（全要素削除）**:

すべての要素を削除する。

```python
scores = {"Alice": 85, "Bob": 90, "Charlie": 78}

print(len(scores))  # 3

# 全要素削除
scores.clear()

print(len(scores))  # 0
print(scores)  # {}
```

**popitem()（任意の要素を削除）**:

Python 3.7+ では、辞書は挿入順序を保持するため、`popitem()`は最後に追加された要素を削除する。

```python
scores = {"Alice": 85, "Bob": 90, "Charlie": 78}

# 最後の要素を削除（キーと値のタプルが返る）
removed = scores.popitem()
print(removed)  # ('Charlie', 78)

print(scores)  # {'Alice': 85, 'Bob': 90}
```

**存在チェックしてから削除**:

```python
scores = {"Alice": 85, "Bob": 90}

if "Alice" in scores:
    del scores["Alice"]
    print("Alice を削除しました")
else:
    print("Alice は存在しません")
# 出力: Alice を削除しました
```

**実用例（条件付き削除）**:

```python
scores = {"Alice": 85, "Bob": 60, "Charlie": 95, "David": 55}

# 70点未満の要素を削除
to_remove = [name for name, score in scores.items() if score < 70]
for name in to_remove:
    del scores[name]

print(scores)
# {'Alice': 85, 'Charlie': 95}
```

**実用例（辞書内包表記で再作成）**:

削除するより、条件に合う要素だけで新しい辞書を作る方が簡潔な場合もある。

```python
scores = {"Alice": 85, "Bob": 60, "Charlie": 95, "David": 55}

# 70点以上の要素だけを残す
scores = {name: score for name, score in scores.items() if score >= 70}

print(scores)
# {'Alice': 85, 'Charlie': 95}
```

**実用例（複数のキーを削除）**:

```python
scores = {"Alice": 85, "Bob": 90, "Charlie": 78}
to_remove = ["Bob", "Charlie"]

# 複数のキーを削除
for key in to_remove:
    scores.pop(key, None)  # デフォルト値を指定してエラーを防ぐ

print(scores)  # {'Alice': 85}
```

**実用例（削除と同時に処理）**:

```python
cache = {"user1": "data1", "user2": "data2"}

# 削除された値を使って処理
removed = cache.pop("user1", None)
if removed:
    print(f"キャッシュから削除: {removed}")
# 出力: キャッシュから削除: data1
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
map.delete(key);
```

JavaScript では`Map`から要素を削除するには`delete()`メソッドを使う。

**基本的な使い方**:

```javascript
const scores = new Map([
  ["Alice", 85],
  ["Bob", 90],
  ["Charlie", 78],
]);

console.log(scores);
// Map(3) { 'Alice' => 85, 'Bob' => 90, 'Charlie' => 78 }

// 要素の削除（成功したらtrueが返る）
const result = scores.delete("Bob");
console.log(result); // true

console.log(scores);
// Map(2) { 'Alice' => 85, 'Charlie' => 78 }
```

**存在しないキーの削除**:

存在しないキーを削除しようとしても、エラーにならず`false`が返る。

```javascript
const scores = new Map([["Alice", 85]]);

// 存在しないキーの削除（falseが返る）
const result = scores.delete("David");
console.log(result); // false

// マップは変更されない
console.log(scores); // Map(1) { 'Alice' => 85 }
```

**削除成功の確認**:

```javascript
const scores = new Map([
  ["Alice", 85],
  ["Bob", 90],
]);

if (scores.delete("Alice")) {
  console.log("Alice を削除しました");
} else {
  console.log("Alice は存在しません");
}
// 出力: Alice を削除しました
```

**clear()（全要素削除）**:

すべての要素を削除する。

```javascript
const scores = new Map([
  ["Alice", 85],
  ["Bob", 90],
  ["Charlie", 78],
]);

console.log(scores.size); // 3

// 全要素削除
scores.clear();

console.log(scores.size); // 0
console.log(scores); // Map(0) {}
```

**has() で存在チェックしてから削除**:

```javascript
const scores = new Map([["Alice", 85]]);

if (scores.has("Alice")) {
  scores.delete("Alice");
  console.log("Alice を削除しました");
} else {
  console.log("Alice は存在しません");
}
// 出力: Alice を削除しました
```

**削除前に値を取得**:

`delete()`は削除された値を返さないので、先に`get()`で取得する必要がある。

```javascript
const scores = new Map([
  ["Alice", 85],
  ["Bob", 90],
]);

// 削除前に値を取得
const value = scores.get("Bob");
const deleted = scores.delete("Bob");

if (deleted) {
  console.log(`Bob のスコア ${value} を削除しました`);
}
// 出力: Bob のスコア 90 を削除しました
```

**実用例（条件付き削除）**:

```javascript
const scores = new Map([
  ["Alice", 85],
  ["Bob", 60],
  ["Charlie", 95],
  ["David", 55],
]);

// 70点未満の要素を削除
for (const [name, score] of scores) {
  if (score < 70) {
    scores.delete(name);
  }
}

console.log(scores);
// Map(2) { 'Alice' => 85, 'Charlie' => 95 }
```

**実用例（複数のキーを削除）**:

```javascript
const scores = new Map([
  ["Alice", 85],
  ["Bob", 90],
  ["Charlie", 78],
]);

const toRemove = ["Bob", "Charlie"];

// 複数のキーを削除
toRemove.forEach((key) => scores.delete(key));

console.log(scores);
// Map(1) { 'Alice' => 85 }
```

**実用例（削除と同時に処理）**:

```javascript
const cache = new Map([
  ["user1", "data1"],
  ["user2", "data2"],
]);

// 削除された値を使って処理
const key = "user1";
if (cache.has(key)) {
  const value = cache.get(key);
  cache.delete(key);
  console.log(`キャッシュから削除: ${value}`);
}
// 出力: キャッシュから削除: data1
```

**Object との違い**:

```javascript
// Map を使った方法
const map = new Map([
  ["key1", 100],
  ["key2", 200],
]);
map.delete("key1");
console.log(map); // Map(1) { 'key2' => 200 }

// Object を使った方法
const obj = { key1: 100, key2: 200 };
delete obj.key1;
console.log(obj); // { key2: 200 }
```

**実用例（古いエントリの削除）**:

```javascript
const cache = new Map();
const MAX_SIZE = 3;

function addToCache(key, value) {
  // キャッシュサイズが上限に達したら最も古いエントリを削除
  if (cache.size >= MAX_SIZE) {
    const firstKey = cache.keys().next().value;
    cache.delete(firstKey);
    console.log(`古いエントリを削除: ${firstKey}`);
  }
  cache.set(key, value);
}

addToCache("item1", "data1");
addToCache("item2", "data2");
addToCache("item3", "data3");
addToCache("item4", "data4"); // item1が削除される
// 出力: 古いエントリを削除: item1

console.log(cache);
// Map(3) { 'item2' => 'data2', 'item3' => 'data3', 'item4' => 'data4' }
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
delete(m, key)
```

Go ではマップから要素を削除するには組み込み関数`delete()`を使う。

**基本的な使い方**:

```go
import "fmt"

scores := map[string]int{
    "Alice":   85,
    "Bob":     90,
    "Charlie": 78,
}

fmt.Println(scores)
// map[Alice:85 Bob:90 Charlie:78]

// 要素の削除
delete(scores, "Bob")

fmt.Println(scores)
// map[Alice:85 Charlie:78]
```

**存在しないキーの削除**:

存在しないキーを削除しようとしても、エラーにならず何も起こらない。

```go
scores := map[string]int{"Alice": 85}

// 存在しないキーの削除（何も起こらない）
delete(scores, "David")

// マップは変更されない
fmt.Println(scores)  // map[Alice:85]
```

**削除前に値を取得**:

`delete()`は値を返さないので、削除前に値を取得する必要がある。

```go
scores := map[string]int{
    "Alice": 85,
    "Bob":   90,
}

// 削除前に値を取得
if value, ok := scores["Bob"]; ok {
    delete(scores, "Bob")
    fmt.Printf("Bob のスコア %d を削除しました\n", value)
}
// 出力: Bob のスコア 90 を削除しました
```

**存在チェックしてから削除**:

```go
scores := map[string]int{"Alice": 85}

key := "Alice"
if _, ok := scores[key]; ok {
    delete(scores, key)
    fmt.Println("Alice を削除しました")
} else {
    fmt.Println("Alice は存在しません")
}
// 出力: Alice を削除しました
```

**全要素削除**:

Go のマップには`clear()`メソッドがないため、ループで削除するか、新しいマップを作成する。

```go
scores := map[string]int{
    "Alice":   85,
    "Bob":     90,
    "Charlie": 78,
}

// 方法1: ループで全削除
for key := range scores {
    delete(scores, key)
}

fmt.Println(len(scores))  // 0
fmt.Println(scores)       // map[]

// 方法2: 新しいマップを作成（より効率的）
scores = make(map[string]int)
fmt.Println(len(scores))  // 0
```

**実用例（条件付き削除）**:

```go
scores := map[string]int{
    "Alice":   85,
    "Bob":     60,
    "Charlie": 95,
    "David":   55,
}

// 70点未満の要素を削除
for name, score := range scores {
    if score < 70 {
        delete(scores, name)
    }
}

fmt.Println(scores)
// map[Alice:85 Charlie:95]
```

**実用例（複数のキーを削除）**:

```go
scores := map[string]int{
    "Alice":   85,
    "Bob":     90,
    "Charlie": 78,
}

toRemove := []string{"Bob", "Charlie"}

// 複数のキーを削除
for _, key := range toRemove {
    delete(scores, key)
}

fmt.Println(scores)  // map[Alice:85]
```

**実用例（削除と同時に処理）**:

```go
cache := map[string]string{
    "user1": "data1",
    "user2": "data2",
}

// 削除された値を使って処理
key := "user1"
if value, ok := cache[key]; ok {
    delete(cache, key)
    fmt.Printf("キャッシュから削除: %s\n", value)
}
// 出力: キャッシュから削除: data1
```

**実用例（削除のヘルパー関数）**:

削除された値が欲しい場合は、独自の関数を作成できる。

```go
func removeAndGet(m map[string]int, key string) (int, bool) {
    value, ok := m[key]
    if ok {
        delete(m, key)
    }
    return value, ok
}

scores := map[string]int{
    "Alice": 85,
    "Bob":   90,
}

// 削除と同時に値を取得
if value, ok := removeAndGet(scores, "Bob"); ok {
    fmt.Printf("削除された値: %d\n", value)
}
// 出力: 削除された値: 90

fmt.Println(scores)  // map[Alice:85]
```

**実用例（古いエントリの管理）**:

Go のマップは順序を保持しないため、古いエントリを削除したい場合は別途管理が必要。

```go
type Cache struct {
    data  map[string]string
    keys  []string
    maxSize int
}

func (c *Cache) Add(key, value string) {
    // キャッシュサイズが上限に達したら最も古いエントリを削除
    if len(c.data) >= c.maxSize {
        oldestKey := c.keys[0]
        delete(c.data, oldestKey)
        c.keys = c.keys[1:]
        fmt.Printf("古いエントリを削除: %s\n", oldestKey)
    }
    c.data[key] = value
    c.keys = append(c.keys, key)
}

cache := Cache{
    data:    make(map[string]string),
    keys:    []string{},
    maxSize: 3,
}

cache.Add("item1", "data1")
cache.Add("item2", "data2")
cache.Add("item3", "data3")
cache.Add("item4", "data4")  // item1が削除される
// 出力: 古いエントリを削除: item1

fmt.Println(cache.data)
// map[item2:data2 item3:data3 item4:data4]
```

**nil マップへの delete**:

nil マップに対して`delete()`を呼んでもエラーにならない（何も起こらない）。

```go
var m map[string]int  // nil マップ

// nil マップに対する delete（エラーにならない）
delete(m, "key")

fmt.Println(m)  // map[]
```

**注意: 並行アクセス**:

複数の goroutine から同時にマップを操作する場合は、`sync.Mutex`または`sync.Map`を使う必要がある。

```go
import "sync"

type SafeMap struct {
    mu sync.Mutex
    data map[string]int
}

func (sm *SafeMap) Delete(key string) {
    sm.mu.Lock()
    defer sm.mu.Unlock()
    delete(sm.data, key)
}

sm := &SafeMap{
    data: make(map[string]int),
}

sm.data["key1"] = 100
sm.Delete("key1")
```

</div>
