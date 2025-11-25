---
title: "辞書(Map)から最大・最小のキーを取得"
date: "2019-10-28T04:36:30+09:00"
excerpt: "辞書(Map)から最大・最小のキーを取得する方法ついて"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-28T04:36:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

辞書(Map)から最大・最小のキーを取得する方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
Collections.max(map.keySet())
```

Java では`Map`から最大・最小のキーを取得するには、`keySet()`でキーの`Set`を取得し、`Collections.max()`/`Collections.min()`を使う。

**基本的な使い方（キーによる最大・最小）**:

```java
import java.util.Map;
import java.util.HashMap;
import java.util.Collections;

Map<Integer, String> scores = new HashMap<>();
scores.put(85, "Alice");
scores.put(90, "Bob");
scores.put(78, "Charlie");

// 最大のキーを取得
Integer maxKey = Collections.max(scores.keySet());
System.out.println("最大のキー: " + maxKey);
// 出力: 最大のキー: 90

// 最小のキーを取得
Integer minKey = Collections.min(scores.keySet());
System.out.println("最小のキー: " + minKey);
// 出力: 最小のキー: 78
```

**文字列のキー**:

```java
Map<String, Integer> map = new HashMap<>();
map.put("apple", 100);
map.put("banana", 200);
map.put("cherry", 150);

// 辞書順で最大・最小のキー
String maxKey = Collections.max(map.keySet());
String minKey = Collections.min(map.keySet());

System.out.println("最大のキー: " + maxKey);  // cherry
System.out.println("最小のキー: " + minKey);  // apple
```

**値による最大・最小のキーを取得**:

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 85);
scores.put("Bob", 90);
scores.put("Charlie", 78);

// 値が最大のエントリを取得
Map.Entry<String, Integer> maxEntry = Collections.max(
    scores.entrySet(),
    Map.Entry.comparingByValue()
);
System.out.println("最高スコアの人: " + maxEntry.getKey());
// 出力: 最高スコアの人: Bob

// 値が最小のエントリを取得
Map.Entry<String, Integer> minEntry = Collections.min(
    scores.entrySet(),
    Map.Entry.comparingByValue()
);
System.out.println("最低スコアの人: " + minEntry.getKey());
// 出力: 最低スコアの人: Charlie
```

**Stream API を使う方法**:

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 85);
scores.put("Bob", 90);
scores.put("Charlie", 78);

// 最大のキー
String maxKey = scores.keySet().stream()
    .max(String::compareTo)
    .orElse(null);
System.out.println("最大のキー: " + maxKey);

// 値が最大のキー
String maxScorePerson = scores.entrySet().stream()
    .max(Map.Entry.comparingByValue())
    .map(Map.Entry::getKey)
    .orElse(null);
System.out.println("最高スコアの人: " + maxScorePerson);
// 出力: 最高スコアの人: Bob
```

**TreeMap を使う方法**:

`TreeMap`はキーが自動的にソートされるため、最大・最小のキーを簡単に取得できる。

```java
import java.util.TreeMap;

TreeMap<Integer, String> scores = new TreeMap<>();
scores.put(85, "Alice");
scores.put(90, "Bob");
scores.put(78, "Charlie");

// 最大のキー
Integer maxKey = scores.lastKey();
System.out.println("最大のキー: " + maxKey);  // 90

// 最小のキー
Integer minKey = scores.firstKey();
System.out.println("最小のキー: " + minKey);  // 78

// 最大のエントリ
Map.Entry<Integer, String> maxEntry = scores.lastEntry();
System.out.println("最大のエントリ: " + maxEntry);  // 90=Bob

// 最小のエントリ
Map.Entry<Integer, String> minEntry = scores.firstEntry();
System.out.println("最小のエントリ: " + minEntry);  // 78=Charlie
```

**空の Map の処理**:

```java
Map<Integer, String> emptyMap = new HashMap<>();

// 空の場合、NoSuchElementException が発生
try {
    Integer maxKey = Collections.max(emptyMap.keySet());
} catch (NoSuchElementException e) {
    System.out.println("Map が空です");
}

// Stream API でnullチェック
Integer maxKey = emptyMap.keySet().stream()
    .max(Integer::compareTo)
    .orElse(null);
System.out.println(maxKey);  // null
```

**実用例（スコアのランキング）**:

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 85);
scores.put("Bob", 90);
scores.put("Charlie", 78);
scores.put("David", 92);

// トップスコアの人を取得
Map.Entry<String, Integer> topScore = Collections.max(
    scores.entrySet(),
    Map.Entry.comparingByValue()
);
System.out.println(topScore.getKey() + ": " + topScore.getValue() + "点");
// 出力: David: 92点
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
max(d)  # 最大のキー
```

Python では辞書から最大・最小のキーを取得するには、組み込み関数`max()`/`min()`を使う。

**基本的な使い方（キーによる最大・最小）**:

```python
scores = {85: "Alice", 90: "Bob", 78: "Charlie"}

# 最大のキーを取得
max_key = max(scores)
print(f"最大のキー: {max_key}")
# 出力: 最大のキー: 90

# 最小のキーを取得
min_key = min(scores)
print(f"最小のキー: {min_key}")
# 出力: 最小のキー: 78
```

**文字列のキー**:

```python
d = {"apple": 100, "banana": 200, "cherry": 150}

# 辞書順で最大・最小のキー
max_key = max(d)
min_key = min(d)

print(f"最大のキー: {max_key}")  # cherry
print(f"最小のキー: {min_key}")  # apple
```

**値による最大・最小のキーを取得**:

```python
scores = {"Alice": 85, "Bob": 90, "Charlie": 78}

# 値が最大のキーを取得
max_key = max(scores, key=scores.get)
print(f"最高スコアの人: {max_key}")
# 出力: 最高スコアの人: Bob

# 値が最小のキーを取得
min_key = min(scores, key=scores.get)
print(f"最低スコアの人: {min_key}")
# 出力: 最低スコアの人: Charlie
```

**キーと値の両方を取得**:

```python
scores = {"Alice": 85, "Bob": 90, "Charlie": 78}

# 値が最大のキーと値を取得
max_key = max(scores, key=scores.get)
max_value = scores[max_key]
print(f"{max_key}: {max_value}点")
# 出力: Bob: 90点

# または items() を使う
max_item = max(scores.items(), key=lambda x: x[1])
print(f"{max_item[0]}: {max_item[1]}点")
# 出力: Bob: 90点
```

**keys() を明示的に使う**:

```python
scores = {85: "Alice", 90: "Bob", 78: "Charlie"}

# keys() を使って明示的にキーを取得
max_key = max(scores.keys())
min_key = min(scores.keys())

print(f"最大のキー: {max_key}")  # 90
print(f"最小のキー: {min_key}")  # 78
```

**values() で値の最大・最小**:

```python
scores = {"Alice": 85, "Bob": 90, "Charlie": 78}

# 値の最大・最小を取得
max_score = max(scores.values())
min_score = min(scores.values())

print(f"最高スコア: {max_score}")  # 90
print(f"最低スコア: {min_score}")  # 78
```

**空の辞書の処理**:

```python
empty_dict = {}

# 空の場合、ValueErrorが発生
try:
    max_key = max(empty_dict)
except ValueError:
    print("辞書が空です")

# デフォルト値を指定
max_key = max(empty_dict, default=None)
print(max_key)  # None
```

**複数の条件での最大・最小**:

```python
students = {
    "Alice": {"score": 85, "age": 20},
    "Bob": {"score": 90, "age": 22},
    "Charlie": {"score": 78, "age": 21},
}

# スコアが最大の学生
max_student = max(students, key=lambda x: students[x]["score"])
print(f"最高スコアの学生: {max_student}")
# 出力: 最高スコアの学生: Bob

# 年齢が最小の学生
min_student = min(students, key=lambda x: students[x]["age"])
print(f"最年少の学生: {min_student}")
# 出力: 最年少の学生: Alice
```

**実用例（スコアのランキング）**:

```python
scores = {"Alice": 85, "Bob": 90, "Charlie": 78, "David": 92}

# トップスコアの人を取得
top_person = max(scores, key=scores.get)
print(f"{top_person}: {scores[top_person]}点")
# 出力: David: 92点

# トップ 3 を取得
top3 = sorted(scores.items(), key=lambda x: x[1], reverse=True)[:3]
for i, (name, score) in enumerate(top3, 1):
    print(f"{i}位: {name} ({score}点)")
# 出力:
# 1位: David (92点)
# 2位: Bob (90点)
# 3位: Alice (85点)
```

**実用例（複数の最大・最小）**:

```python
scores = {"Alice": 90, "Bob": 90, "Charlie": 78, "David": 90}

# 最大値
max_score = max(scores.values())

# 最大値を持つすべてのキー
max_keys = [k for k, v in scores.items() if v == max_score]
print(f"最高スコアの人たち: {max_keys}")
# 出力: 最高スコアの人たち: ['Alice', 'Bob', 'David']
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
Math.max(...map.keys());
```

JavaScript では`Map`から最大・最小のキーを取得するには、`keys()`でキーのイテレータを取得し、配列に変換してから`Math.max()`/`Math.min()`を使う。

**基本的な使い方（キーによる最大・最小）**:

```javascript
const scores = new Map([
  [85, "Alice"],
  [90, "Bob"],
  [78, "Charlie"],
]);

// 最大のキーを取得
const maxKey = Math.max(...scores.keys());
console.log(`最大のキー: ${maxKey}`);
// 出力: 最大のキー: 90

// 最小のキーを取得
const minKey = Math.min(...scores.keys());
console.log(`最小のキー: ${minKey}`);
// 出力: 最小のキー: 78
```

**文字列のキー**:

文字列の場合は、配列に変換してから`sort()`を使う。

```javascript
const map = new Map([
  ["apple", 100],
  ["banana", 200],
  ["cherry", 150],
]);

// 辞書順で最大・最小のキー
const keys = Array.from(map.keys()).sort();
const maxKey = keys[keys.length - 1];
const minKey = keys[0];

console.log(`最大のキー: ${maxKey}`); // cherry
console.log(`最小のキー: ${minKey}`); // apple
```

**値による最大・最小のキーを取得**:

```javascript
const scores = new Map([
  ["Alice", 85],
  ["Bob", 90],
  ["Charlie", 78],
]);

// 値が最大のエントリを取得
const maxEntry = Array.from(scores.entries()).reduce((max, entry) =>
  entry[1] > max[1] ? entry : max
);
console.log(`最高スコアの人: ${maxEntry[0]}`);
// 出力: 最高スコアの人: Bob

// 値が最小のエントリを取得
const minEntry = Array.from(scores.entries()).reduce((min, entry) =>
  entry[1] < min[1] ? entry : min
);
console.log(`最低スコアの人: ${minEntry[0]}`);
// 出力: 最低スコアの人: Charlie
```

**Array.from() を使う方法**:

```javascript
const scores = new Map([
  [85, "Alice"],
  [90, "Bob"],
  [78, "Charlie"],
]);

// キーを配列に変換
const keys = Array.from(scores.keys());

// 最大・最小のキー
const maxKey = Math.max(...keys);
const minKey = Math.min(...keys);

console.log(`最大のキー: ${maxKey}`); // 90
console.log(`最小のキー: ${minKey}`); // 78
```

**スプレッド構文を使う方法**:

```javascript
const scores = new Map([
  [85, "Alice"],
  [90, "Bob"],
  [78, "Charlie"],
]);

// スプレッド構文でキーを展開
const maxKey = Math.max(...[...scores.keys()]);
const minKey = Math.min(...[...scores.keys()]);

console.log(`最大のキー: ${maxKey}`); // 90
console.log(`最小のキー: ${minKey}`); // 78
```

**値の最大・最小**:

```javascript
const scores = new Map([
  ["Alice", 85],
  ["Bob", 90],
  ["Charlie", 78],
]);

// 値の最大・最小を取得
const maxScore = Math.max(...scores.values());
const minScore = Math.min(...scores.values());

console.log(`最高スコア: ${maxScore}`); // 90
console.log(`最低スコア: ${minScore}`); // 78
```

**空の Map の処理**:

```javascript
const emptyMap = new Map();

// 空の場合、-Infinityが返る
const maxKey = Math.max(...emptyMap.keys());
console.log(maxKey); // -Infinity

// 空チェック
if (emptyMap.size === 0) {
  console.log("Map が空です");
} else {
  const maxKey = Math.max(...emptyMap.keys());
  console.log(`最大のキー: ${maxKey}`);
}
```

**ヘルパー関数**:

```javascript
function getMaxKey(map) {
  if (map.size === 0) return null;
  return Math.max(...map.keys());
}

function getMinKey(map) {
  if (map.size === 0) return null;
  return Math.min(...map.keys());
}

const scores = new Map([
  [85, "Alice"],
  [90, "Bob"],
]);

console.log(getMaxKey(scores)); // 90
console.log(getMinKey(scores)); // 85
```

**値による最大のキーを取得（汎用的な方法）**:

```javascript
function getKeyByMaxValue(map) {
  if (map.size === 0) return null;

  let maxKey = null;
  let maxValue = -Infinity;

  for (const [key, value] of map) {
    if (value > maxValue) {
      maxValue = value;
      maxKey = key;
    }
  }

  return maxKey;
}

const scores = new Map([
  ["Alice", 85],
  ["Bob", 90],
  ["Charlie", 78],
]);

const topPerson = getKeyByMaxValue(scores);
console.log(`最高スコアの人: ${topPerson}`);
// 出力: 最高スコアの人: Bob
```

**実用例（スコアのランキング）**:

```javascript
const scores = new Map([
  ["Alice", 85],
  ["Bob", 90],
  ["Charlie", 78],
  ["David", 92],
]);

// トップスコアの人を取得
const entries = Array.from(scores.entries());
const topEntry = entries.reduce((max, entry) =>
  entry[1] > max[1] ? entry : max
);
console.log(`${topEntry[0]}: ${topEntry[1]}点`);
// 出力: David: 92点

// トップ 3 を取得
const top3 = entries.sort((a, b) => b[1] - a[1]).slice(0, 3);
top3.forEach(([name, score], index) => {
  console.log(`${index + 1}位: ${name} (${score}点)`);
});
// 出力:
// 1位: David (92点)
// 2位: Bob (90点)
// 3位: Alice (85点)
```

**実用例（複数の最大・最小）**:

```javascript
const scores = new Map([
  ["Alice", 90],
  ["Bob", 90],
  ["Charlie", 78],
  ["David", 90],
]);

// 最大値
const maxScore = Math.max(...scores.values());

// 最大値を持つすべてのキー
const maxKeys = Array.from(scores.entries())
  .filter(([key, value]) => value === maxScore)
  .map(([key, value]) => key);

console.log(`最高スコアの人たち: ${maxKeys.join(", ")}`);
// 出力: 最高スコアの人たち: Alice, Bob, David
```

**Object との違い**:

```javascript
// Map を使った方法
const map = new Map([
  [1, "one"],
  [2, "two"],
  [3, "three"],
]);
const maxKey = Math.max(...map.keys()); // 3

// Object を使った方法
const obj = { 1: "one", 2: "two", 3: "three" };
const maxKey2 = Math.max(...Object.keys(obj).map(Number)); // 3
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
// キーのスライスを作成して最大・最小を探す
```

Go ではマップから最大・最小のキーを取得するには、キーをスライスに格納してから最大・最小を探す必要がある。

**基本的な使い方（キーによる最大・最小）**:

```go
import "fmt"

scores := map[int]string{
    85: "Alice",
    90: "Bob",
    78: "Charlie",
}

// キーをスライスに格納
keys := make([]int, 0, len(scores))
for key := range scores {
    keys = append(keys, key)
}

// 最大・最小のキーを探す
maxKey := keys[0]
minKey := keys[0]
for _, key := range keys[1:] {
    if key > maxKey {
        maxKey = key
    }
    if key < minKey {
        minKey = key
    }
}

fmt.Printf("最大のキー: %d\n", maxKey)
// 出力: 最大のキー: 90

fmt.Printf("最小のキー: %d\n", minKey)
// 出力: 最小のキー: 78
```

**文字列のキー**:

```go
import (
    "fmt"
    "sort"
)

m := map[string]int{
    "apple":  100,
    "banana": 200,
    "cherry": 150,
}

// キーをスライスに格納
keys := make([]string, 0, len(m))
for key := range m {
    keys = append(keys, key)
}

// ソートして最大・最小を取得
sort.Strings(keys)

maxKey := keys[len(keys)-1]
minKey := keys[0]

fmt.Printf("最大のキー: %s\n", maxKey) // cherry
fmt.Printf("最小のキー: %s\n", minKey) // apple
```

**値による最大・最小のキーを取得**:

```go
scores := map[string]int{
    "Alice":   85,
    "Bob":     90,
    "Charlie": 78,
}

// 値が最大のキーを探す
var maxKey string
maxValue := -1 << 31 // int の最小値
for key, value := range scores {
    if value > maxValue {
        maxValue = value
        maxKey = key
    }
}

fmt.Printf("最高スコアの人: %s\n", maxKey)
// 出力: 最高スコアの人: Bob

// 値が最小のキーを探す
var minKey string
minValue := 1<<31 - 1 // int の最大値
for key, value := range scores {
    if value < minValue {
        minValue = value
        minKey = key
    }
}

fmt.Printf("最低スコアの人: %s\n", minKey)
// 出力: 最低スコアの人: Charlie
```

**汎用的な関数（ジェネリクス）**:

Go 1.18+ では、ジェネリクスを使って汎用的な関数を作成できる。

```go
import (
    "fmt"
    "golang.org/x/exp/constraints"
)

func maxKey[K constraints.Ordered, V any](m map[K]V) (K, bool) {
    if len(m) == 0 {
        var zero K
        return zero, false
    }

    var max K
    first := true
    for key := range m {
        if first || key > max {
            max = key
            first = false
        }
    }
    return max, true
}

func minKey[K constraints.Ordered, V any](m map[K]V) (K, bool) {
    if len(m) == 0 {
        var zero K
        return zero, false
    }

    var min K
    first := true
    for key := range m {
        if first || key < min {
            min = key
            first = false
        }
    }
    return min, true
}

scores := map[int]string{
    85: "Alice",
    90: "Bob",
    78: "Charlie",
}

if max, ok := maxKey(scores); ok {
    fmt.Printf("最大のキー: %d\n", max)
}
// 出力: 最大のキー: 90

if min, ok := minKey(scores); ok {
    fmt.Printf("最小のキー: %d\n", min)
}
// 出力: 最小のキー: 78
```

**sort パッケージを使う方法**:

```go
import (
    "fmt"
    "sort"
)

scores := map[int]string{
    85: "Alice",
    90: "Bob",
    78: "Charlie",
}

// キーをスライスに格納してソート
keys := make([]int, 0, len(scores))
for key := range scores {
    keys = append(keys, key)
}
sort.Ints(keys)

// 最大・最小のキー
maxKey := keys[len(keys)-1]
minKey := keys[0]

fmt.Printf("最大のキー: %d\n", maxKey) // 90
fmt.Printf("最小のキー: %d\n", minKey) // 78
```

**空のマップの処理**:

```go
emptyMap := make(map[int]string)

if len(emptyMap) == 0 {
    fmt.Println("マップが空です")
} else {
    // キーの最大・最小を取得
}
```

**値の最大・最小**:

```go
scores := map[string]int{
    "Alice":   85,
    "Bob":     90,
    "Charlie": 78,
}

// 値の最大・最小を探す
maxScore := -1 << 31
minScore := 1<<31 - 1

for _, score := range scores {
    if score > maxScore {
        maxScore = score
    }
    if score < minScore {
        minScore = score
    }
}

fmt.Printf("最高スコア: %d\n", maxScore) // 90
fmt.Printf("最低スコア: %d\n", minScore) // 78
```

**実用例（スコアのランキング）**:

```go
import (
    "fmt"
    "sort"
)

scores := map[string]int{
    "Alice":   85,
    "Bob":     90,
    "Charlie": 78,
    "David":   92,
}

// トップスコアの人を取得
var topPerson string
topScore := -1 << 31
for name, score := range scores {
    if score > topScore {
        topScore = score
        topPerson = name
    }
}

fmt.Printf("%s: %d点\n", topPerson, topScore)
// 出力: David: 92点

// トップ 3 を取得
type Entry struct {
    Name  string
    Score int
}

entries := make([]Entry, 0, len(scores))
for name, score := range scores {
    entries = append(entries, Entry{name, score})
}

sort.Slice(entries, func(i, j int) bool {
    return entries[i].Score > entries[j].Score
})

for i := 0; i < 3 && i < len(entries); i++ {
    fmt.Printf("%d位: %s (%d点)\n", i+1, entries[i].Name, entries[i].Score)
}
// 出力:
// 1位: David (92点)
// 2位: Bob (90点)
// 3位: Alice (85点)
```

**実用例（複数の最大・最小）**:

```go
scores := map[string]int{
    "Alice":   90,
    "Bob":     90,
    "Charlie": 78,
    "David":   90,
}

// 最大値を探す
maxScore := -1 << 31
for _, score := range scores {
    if score > maxScore {
        maxScore = score
    }
}

// 最大値を持つすべてのキー
maxKeys := make([]string, 0)
for name, score := range scores {
    if score == maxScore {
        maxKeys = append(maxKeys, name)
    }
}

fmt.Printf("最高スコアの人たち: %v\n", maxKeys)
// 出力: 最高スコアの人たち: [Alice Bob David]（順序は不定）
```

**math パッケージの Min/Max 関数**:

Go 1.21+ では、`math.Max()`/`math.Min()`がジェネリクスになった（`cmp.Ordered`を使用）。

```go
import (
    "fmt"
    "math"
)

scores := map[int]string{
    85: "Alice",
    90: "Bob",
    78: "Charlie",
}

// キーをスライスに格納
keys := make([]int, 0, len(scores))
for key := range scores {
    keys = append(keys, key)
}

// 最大・最小を探す
maxKey := keys[0]
minKey := keys[0]
for _, key := range keys[1:] {
    maxKey = max(maxKey, key)
    minKey = min(minKey, key)
}

fmt.Printf("最大のキー: %d\n", maxKey) // 90
fmt.Printf("最小のキー: %d\n", minKey) // 78
```

</div>
