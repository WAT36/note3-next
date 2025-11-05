---
title: "辞書(Map)からキーを指定して値を取得"
date: "2019-10-28T02:36:30+09:00"
excerpt: "辞書(Map)からキーを指定して値を取得する方法ついて"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-28T02:36:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

辞書(Map)からキーを指定して値を取得する方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
map.get(key)
```

Java では`Map`から値を取得するには`get()`メソッドを使う。

**基本的な使い方**:

```java
import java.util.Map;
import java.util.HashMap;

Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 85);
scores.put("Bob", 90);
scores.put("Charlie", 78);

// 値の取得
Integer aliceScore = scores.get("Alice");
System.out.println("Alice: " + aliceScore);
// 出力: Alice: 85

// 存在しないキーの取得（nullが返る）
Integer davidScore = scores.get("David");
System.out.println("David: " + davidScore);
// 出力: David: null
```

**getOrDefault（デフォルト値付き取得）**:

存在しないキーに対してデフォルト値を指定できる。

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 85);

// 存在するキー
Integer score1 = scores.getOrDefault("Alice", 0);
System.out.println(score1);  // 85

// 存在しないキー（デフォルト値が返る）
Integer score2 = scores.getOrDefault("David", 0);
System.out.println(score2);  // 0
```

**null チェック**:

```java
Map<String, Integer> map = new HashMap<>();
map.put("key1", 100);

Integer value = map.get("key1");
if (value != null) {
    System.out.println("値: " + value);
} else {
    System.out.println("キーが存在しません");
}
// 出力: 値: 100
```

**containsKey（存在チェック）**:

キーの存在を確認してから値を取得する。

```java
Map<String, Integer> map = new HashMap<>();
map.put("key1", 100);

if (map.containsKey("key1")) {
    Integer value = map.get("key1");
    System.out.println("値: " + value);
} else {
    System.out.println("キーが存在しません");
}
// 出力: 値: 100
```

**注意: null を値として格納できる**:

```java
Map<String, Integer> map = new HashMap<>();
map.put("key1", null);

// get() は null を返すが、キーは存在する
Integer value = map.get("key1");  // null
boolean exists = map.containsKey("key1");  // true

System.out.println("値: " + value);  // 値: null
System.out.println("存在: " + exists);  // 存在: true
```

**compute 系メソッド**:

```java
Map<String, Integer> map = new HashMap<>();
map.put("key1", 100);

// computeIfPresent: キーが存在する場合のみ処理
Integer result = map.computeIfPresent("key1", (k, v) -> v + 50);
System.out.println(result);  // 150

// computeIfAbsent: キーが存在しない場合のみ処理
Integer result2 = map.computeIfAbsent("key2", k -> 200);
System.out.println(result2);  // 200
```

**実用例（スコアの取得と判定）**:

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 85);
scores.put("Bob", 60);
scores.put("Charlie", 95);

for (String name : scores.keySet()) {
    int score = scores.get(name);
    String result = score >= 70 ? "合格" : "不合格";
    System.out.println(name + ": " + score + "点 (" + result + ")");
}
// 出力:
// Alice: 85点 (合格)
// Bob: 60点 (不合格)
// Charlie: 95点 (合格)
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
d[key]  # または d.get(key)
```

Python では辞書から値を取得するには、2 つの方法がある。

**方法 1: `辞書[キー]`**:

```python
scores = {"Alice": 85, "Bob": 90, "Charlie": 78}

# 値の取得
alice_score = scores["Alice"]
print(f"Alice: {alice_score}")
# 出力: Alice: 85

# 存在しないキーの取得（KeyErrorが発生）
# david_score = scores["David"]  # KeyError: 'David'
```

**方法 2: `get()`メソッド**:

```python
scores = {"Alice": 85, "Bob": 90, "Charlie": 78}

# 値の取得
alice_score = scores.get("Alice")
print(f"Alice: {alice_score}")
# 出力: Alice: 85

# 存在しないキーの取得（Noneが返る）
david_score = scores.get("David")
print(f"David: {david_score}")
# 出力: David: None
```

**get() のデフォルト値**:

`get()`の第 2 引数でデフォルト値を指定できる。

```python
scores = {"Alice": 85}

# 存在するキー
score1 = scores.get("Alice", 0)
print(score1)  # 85

# 存在しないキー（デフォルト値が返る）
score2 = scores.get("David", 0)
print(score2)  # 0

# デフォルト値に文字列
message = scores.get("David", "見つかりません")
print(message)  # 見つかりません
```

**[] と get() の使い分け**:

```python
d = {"key1": 100}

# キーが存在することが確実な場合: [] を使う
value = d["key1"]

# キーが存在しない可能性がある場合: get() を使う
value = d.get("key2", 0)

# エラーハンドリングする場合: [] と try-except
try:
    value = d["key3"]
except KeyError:
    print("キーが存在しません")
    value = 0
```

**in 演算子での存在チェック**:

```python
scores = {"Alice": 85, "Bob": 90}

if "Alice" in scores:
    score = scores["Alice"]
    print(f"Alice: {score}")
else:
    print("Alice は存在しません")
# 出力: Alice: 85
```

**setdefault（取得と追加）**:

キーが存在すれば値を返し、存在しなければ指定した値を追加して返す。

```python
d = {"key1": 100}

# key1は存在するのでその値を返す
value1 = d.setdefault("key1", 200)
print(value1)  # 100

# key2は存在しないので200を追加して返す
value2 = d.setdefault("key2", 200)
print(value2)  # 200
print(d)  # {'key1': 100, 'key2': 200}
```

**defaultdict での自動デフォルト値**:

```python
from collections import defaultdict

# デフォルト値が0の辞書
counter = defaultdict(int)
counter["apple"] = 5

# 存在しないキーにアクセスすると0が返る（自動で追加される）
value = counter["banana"]
print(value)  # 0
print(counter)  # defaultdict(<class 'int'>, {'apple': 5, 'banana': 0})
```

**実用例（スコアの取得と判定）**:

```python
scores = {"Alice": 85, "Bob": 60, "Charlie": 95}

for name, score in scores.items():
    result = "合格" if score >= 70 else "不合格"
    print(f"{name}: {score}点 ({result})")
# 出力:
# Alice: 85点 (合格)
# Bob: 60点 (不合格)
# Charlie: 95点 (合格)
```

**実用例（デフォルト値を使った安全な取得）**:

```python
# 設定の取得
config = {"timeout": 30, "retry": 3}

timeout = config.get("timeout", 60)  # 30
max_size = config.get("max_size", 1024)  # 1024（デフォルト）

print(f"Timeout: {timeout}, Max Size: {max_size}")
# 出力: Timeout: 30, Max Size: 1024
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
map.get(key);
```

JavaScript では`Map`から値を取得するには`get()`メソッドを使う。

**基本的な使い方**:

```javascript
const scores = new Map([
  ["Alice", 85],
  ["Bob", 90],
  ["Charlie", 78],
]);

// 値の取得
const aliceScore = scores.get("Alice");
console.log(`Alice: ${aliceScore}`);
// 出力: Alice: 85

// 存在しないキーの取得（undefinedが返る）
const davidScore = scores.get("David");
console.log(`David: ${davidScore}`);
// 出力: David: undefined
```

**has（存在チェック）**:

キーの存在を確認してから値を取得する。

```javascript
const scores = new Map([["Alice", 85]]);

if (scores.has("Alice")) {
  const score = scores.get("Alice");
  console.log(`Alice: ${score}`);
} else {
  console.log("Alice は存在しません");
}
// 出力: Alice: 85
```

**デフォルト値の指定**:

`get()`は存在しないキーに対して`undefined`を返すので、デフォルト値を使う場合は`||`や`??`を使う。

```javascript
const scores = new Map([["Alice", 85]]);

// 存在するキー
const score1 = scores.get("Alice") || 0;
console.log(score1); // 85

// 存在しないキー（デフォルト値が使われる）
const score2 = scores.get("David") || 0;
console.log(score2); // 0

// Nullish Coalescing Operator (??)
const score3 = scores.get("David") ?? 0;
console.log(score3); // 0
```

**注意: 0 や空文字列が値の場合**:

`||`を使うと、0 や空文字列が`false`として扱われるので、`??`を使うべき。

```javascript
const map = new Map([
  ["count", 0],
  ["name", ""],
]);

// || を使った場合（問題あり）
const count1 = map.get("count") || 10;
console.log(count1); // 10（0がfalseとして扱われる）

// ?? を使った場合（正しい）
const count2 = map.get("count") ?? 10;
console.log(count2); // 0（正しく取得）

const name1 = map.get("name") || "名無し";
console.log(name1); // "名無し"（空文字列がfalseとして扱われる）

const name2 = map.get("name") ?? "名無し";
console.log(name2); // ""（正しく取得）
```

**Object との違い**:

```javascript
// Map を使った方法
const map = new Map([
  ["key1", 100],
  ["key2", 200],
]);
const value = map.get("key1"); // 100

// Object を使った方法
const obj = { key1: 100, key2: 200 };
const value2 = obj.key1; // 100
const value3 = obj["key1"]; // 100
```

**実用例（スコアの取得と判定）**:

```javascript
const scores = new Map([
  ["Alice", 85],
  ["Bob", 60],
  ["Charlie", 95],
]);

for (const [name, score] of scores) {
  const result = score >= 70 ? "合格" : "不合格";
  console.log(`${name}: ${score}点 (${result})`);
}
// 出力:
// Alice: 85点 (合格)
// Bob: 60点 (不合格)
// Charlie: 95点 (合格)
```

**実用例（デフォルト値を使った安全な取得）**:

```javascript
// 設定の取得
const config = new Map([
  ["timeout", 30],
  ["retry", 3],
]);

const timeout = config.get("timeout") ?? 60; // 30
const maxSize = config.get("maxSize") ?? 1024; // 1024（デフォルト）

console.log(`Timeout: ${timeout}, Max Size: ${maxSize}`);
// 出力: Timeout: 30, Max Size: 1024
```

**すべてのキーを取得**:

```javascript
const scores = new Map([
  ["Alice", 85],
  ["Bob", 90],
]);

// キーの配列を取得
const names = Array.from(scores.keys());
console.log(names); // ['Alice', 'Bob']

// または
const names2 = [...scores.keys()];
console.log(names2); // ['Alice', 'Bob']
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
m[key]  // または value, ok := m[key]
```

Go ではマップから値を取得するには、`マップ[キー]`の形式を使う。

**基本的な使い方**:

```go
import "fmt"

scores := map[string]int{
    "Alice":   85,
    "Bob":     90,
    "Charlie": 78,
}

// 値の取得
aliceScore := scores["Alice"]
fmt.Printf("Alice: %d\n", aliceScore)
// 出力: Alice: 85

// 存在しないキーの取得（ゼロ値が返る）
davidScore := scores["David"]
fmt.Printf("David: %d\n", davidScore)
// 出力: David: 0
```

**2 値受け取り（存在チェック）**:

Go では、値とともに存在を示すブール値を受け取ることができる。

```go
scores := map[string]int{"Alice": 85}

// 2値受け取り
value, ok := scores["Alice"]
if ok {
    fmt.Printf("Alice: %d\n", value)
} else {
    fmt.Println("Alice は存在しません")
}
// 出力: Alice: 85

// 存在しないキー
value2, ok2 := scores["David"]
if ok2 {
    fmt.Printf("David: %d\n", value2)
} else {
    fmt.Println("David は存在しません")
}
// 出力: David は存在しません
```

**存在チェックのみ**:

値が不要な場合は、空白識別子`_`を使う。

```go
scores := map[string]int{"Alice": 85}

if _, ok := scores["Alice"]; ok {
    fmt.Println("Alice は存在します")
} else {
    fmt.Println("Alice は存在しません")
}
// 出力: Alice は存在します
```

**ゼロ値との区別**:

存在しないキーは型のゼロ値を返すため、2 値受け取りでの存在チェックが重要。

```go
m := map[string]int{"exists": 0}

// 値だけ取得（ゼロ値と区別できない）
value1 := m["exists"]     // 0
value2 := m["not_exists"] // 0（ゼロ値）

fmt.Println(value1 == value2)  // true（区別できない！）

// 2値受け取り（推奨）
value, ok := m["exists"]
fmt.Printf("exists: value=%d, ok=%t\n", value, ok)
// 出力: exists: value=0, ok=true

value, ok = m["not_exists"]
fmt.Printf("not_exists: value=%d, ok=%t\n", value, ok)
// 出力: not_exists: value=0, ok=false
```

**デフォルト値の指定**:

```go
scores := map[string]int{"Alice": 85}

// 存在するキー
score1 := scores["Alice"]
if score1 == 0 {
    score1 = 60  // デフォルト値
}
fmt.Println(score1)  // 85

// より良い方法: 2値受け取り
score2, ok := scores["David"]
if !ok {
    score2 = 60  // デフォルト値
}
fmt.Println(score2)  // 60
```

**関数でのデフォルト値取得**:

```go
func getOrDefault(m map[string]int, key string, defaultValue int) int {
    if value, ok := m[key]; ok {
        return value
    }
    return defaultValue
}

scores := map[string]int{"Alice": 85}

score1 := getOrDefault(scores, "Alice", 0)
fmt.Println(score1)  // 85

score2 := getOrDefault(scores, "David", 0)
fmt.Println(score2)  // 0
```

**実用例（スコアの取得と判定）**:

```go
scores := map[string]int{
    "Alice":   85,
    "Bob":     60,
    "Charlie": 95,
}

for name, score := range scores {
    result := "合格"
    if score < 70 {
        result = "不合格"
    }
    fmt.Printf("%s: %d点 (%s)\n", name, score, result)
}
// 出力:
// Alice: 85点 (合格)
// Bob: 60点 (不合格)
// Charlie: 95点 (合格)
```

**実用例（設定の取得）**:

```go
config := map[string]int{
    "timeout": 30,
    "retry":   3,
}

// 存在するキー
timeout := config["timeout"]
fmt.Printf("Timeout: %d\n", timeout)  // Timeout: 30

// 存在しないキー（デフォルト値を使う）
maxSize, ok := config["maxSize"]
if !ok {
    maxSize = 1024  // デフォルト値
}
fmt.Printf("Max Size: %d\n", maxSize)  // Max Size: 1024
```

**実用例（ネストしたマップ）**:

```go
nested := map[string]map[string]int{
    "group1": {
        "Alice": 85,
        "Bob":   90,
    },
}

// 存在チェックしながら取得
if group, ok := nested["group1"]; ok {
    if score, ok := group["Alice"]; ok {
        fmt.Printf("Alice: %d\n", score)
    }
}
// 出力: Alice: 85

// 存在しないグループ
if group, ok := nested["group2"]; ok {
    fmt.Println(group)
} else {
    fmt.Println("group2 は存在しません")
}
// 出力: group2 は存在しません
```

**型アサーションとの組み合わせ**:

```go
// interface{}を値に持つマップ
m := map[string]interface{}{
    "name":  "Alice",
    "score": 85,
    "pass":  true,
}

// 型アサーション
if name, ok := m["name"].(string); ok {
    fmt.Println("名前:", name)
}

if score, ok := m["score"].(int); ok {
    fmt.Println("スコア:", score)
}
// 出力:
// 名前: Alice
// スコア: 85
```

**すべてのキーを取得**:

```go
scores := map[string]int{
    "Alice": 85,
    "Bob":   90,
}

// キーのスライスを作成
keys := make([]string, 0, len(scores))
for key := range scores {
    keys = append(keys, key)
}

fmt.Println(keys)  // [Alice Bob]（順序は不定）
```

</div>
