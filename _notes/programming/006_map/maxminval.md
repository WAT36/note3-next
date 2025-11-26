---
title: "辞書(Map)から最大・最小の値を取得"
date: "2019-10-28T06:36:30+09:00"
excerpt: "辞書(Map)から最大・最小の値を取得する方法ついて"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-28T06:36:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

辞書(Map)から最大・最小の値を取得する方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
Collections.max(map.values())
```

Java では`Map`から最大・最小の値を取得するには、`values()`で値の`Collection`を取得し、`Collections.max()`/`Collections.min()`を使う。

**基本的な使い方**:

```java
import java.util.Map;
import java.util.HashMap;
import java.util.Collections;

Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 85);
scores.put("Bob", 90);
scores.put("Charlie", 78);

// 最大の値を取得
Integer maxValue = Collections.max(scores.values());
System.out.println("最大の値: " + maxValue);
// 出力: 最大の値: 90

// 最小の値を取得
Integer minValue = Collections.min(scores.values());
System.out.println("最小の値: " + minValue);
// 出力: 最小の値: 78
```

**values() の戻り値**:

`values()`は`Collection<V>`を返すので、`List`に変換する必要はない。

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 85);
scores.put("Bob", 90);

// values() は Collection を返す
Collection<Integer> values = scores.values();

// Collection に直接 Collections.max() を適用できる
Integer maxValue = Collections.max(values);
System.out.println(maxValue);  // 90
```

**Stream API を使う方法**:

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 85);
scores.put("Bob", 90);
scores.put("Charlie", 78);

// 最大の値
Integer maxValue = scores.values().stream()
    .max(Integer::compareTo)
    .orElse(null);
System.out.println("最大の値: " + maxValue);  // 90

// 最小の値
Integer minValue = scores.values().stream()
    .min(Integer::compareTo)
    .orElse(null);
System.out.println("最小の値: " + minValue);  // 78
```

**最大・最小の値を持つエントリを取得**:

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 85);
scores.put("Bob", 90);
scores.put("Charlie", 78);

// 最大の値を持つエントリ
Map.Entry<String, Integer> maxEntry = Collections.max(
    scores.entrySet(),
    Map.Entry.comparingByValue()
);
System.out.println("最高スコア: " + maxEntry.getKey() + " = " + maxEntry.getValue());
// 出力: 最高スコア: Bob = 90

// 最小の値を持つエントリ
Map.Entry<String, Integer> minEntry = Collections.min(
    scores.entrySet(),
    Map.Entry.comparingByValue()
);
System.out.println("最低スコア: " + minEntry.getKey() + " = " + minEntry.getValue());
// 出力: 最低スコア: Charlie = 78
```

**空の Map の処理**:

```java
Map<Integer, String> emptyMap = new HashMap<>();

// 空の場合、NoSuchElementException が発生
try {
    Integer maxValue = Collections.max(emptyMap.values());
} catch (NoSuchElementException e) {
    System.out.println("Map が空です");
}

// Stream API で null チェック
Integer maxValue = emptyMap.values().stream()
    .max(Integer::compareTo)
    .orElse(null);
System.out.println(maxValue);  // null
```

**実用例（スコアの統計）**:

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 85);
scores.put("Bob", 90);
scores.put("Charlie", 78);
scores.put("David", 92);

// 最高スコアと最低スコア
Integer maxScore = Collections.max(scores.values());
Integer minScore = Collections.min(scores.values());

System.out.println("最高スコア: " + maxScore + "点");
System.out.println("最低スコア: " + minScore + "点");
System.out.println("スコア差: " + (maxScore - minScore) + "点");
// 出力:
// 最高スコア: 92点
// 最低スコア: 78点
// スコア差: 14点
```

**実用例（平均との比較）**:

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 85);
scores.put("Bob", 90);
scores.put("Charlie", 78);

// 平均値
double average = scores.values().stream()
    .mapToInt(Integer::intValue)
    .average()
    .orElse(0.0);

// 最大値・最小値
Integer maxScore = Collections.max(scores.values());
Integer minScore = Collections.min(scores.values());

System.out.println("平均: " + average);
System.out.println("最大: " + maxScore);
System.out.println("最小: " + minScore);
// 出力:
// 平均: 84.33333333333333
// 最大: 90
// 最小: 78
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
max(d.values())
```

Python では辞書から最大・最小の値を取得するには、`values()`で値のビューオブジェクトを取得し、`max()`/`min()`を使う。

**基本的な使い方**:

```python
scores = {"Alice": 85, "Bob": 90, "Charlie": 78}

# 最大の値を取得
max_value = max(scores.values())
print(f"最大の値: {max_value}")
# 出力: 最大の値: 90

# 最小の値を取得
min_value = min(scores.values())
print(f"最小の値: {min_value}")
# 出力: 最小の値: 78
```

**values() の戻り値**:

`values()`は`dict_values`というビューオブジェクトを返す。これはイテラブルなので、直接`max()`/`min()`に渡せる。

```python
scores = {"Alice": 85, "Bob": 90}

# values() はビューオブジェクトを返す
values = scores.values()
print(type(values))  # <class 'dict_values'>

# イテラブルなので直接 max() に渡せる
max_value = max(values)
print(max_value)  # 90
```

**最大・最小の値を持つキーを取得**:

```python
scores = {"Alice": 85, "Bob": 90, "Charlie": 78}

# 最大の値を持つキー
max_key = max(scores, key=scores.get)
max_value = scores[max_key]
print(f"最高スコア: {max_key} = {max_value}")
# 出力: 最高スコア: Bob = 90

# 最小の値を持つキー
min_key = min(scores, key=scores.get)
min_value = scores[min_key]
print(f"最低スコア: {min_key} = {min_value}")
# 出力: 最低スコア: Charlie = 78
```

**items() を使う方法**:

```python
scores = {"Alice": 85, "Bob": 90, "Charlie": 78}

# 値が最大のエントリを取得
max_item = max(scores.items(), key=lambda x: x[1])
print(f"最高スコア: {max_item[0]} = {max_item[1]}")
# 出力: 最高スコア: Bob = 90

# 値が最小のエントリを取得
min_item = min(scores.items(), key=lambda x: x[1])
print(f"最低スコア: {min_item[0]} = {min_item[1]}")
# 出力: 最低スコア: Charlie = 78
```

**空の辞書の処理**:

```python
empty_dict = {}

# 空の場合、ValueError が発生
try:
    max_value = max(empty_dict.values())
except ValueError:
    print("辞書が空です")

# デフォルト値を指定
max_value = max(empty_dict.values(), default=None)
print(max_value)  # None
```

**実用例（スコアの統計）**:

```python
scores = {"Alice": 85, "Bob": 90, "Charlie": 78, "David": 92}

# 最高スコアと最低スコア
max_score = max(scores.values())
min_score = min(scores.values())

print(f"最高スコア: {max_score}点")
print(f"最低スコア: {min_score}点")
print(f"スコア差: {max_score - min_score}点")
# 出力:
# 最高スコア: 92点
# 最低スコア: 78点
# スコア差: 14点
```

**実用例（平均との比較）**:

```python
scores = {"Alice": 85, "Bob": 90, "Charlie": 78}

# 平均値
average = sum(scores.values()) / len(scores)

# 最大値・最小値
max_score = max(scores.values())
min_score = min(scores.values())

print(f"平均: {average}")
print(f"最大: {max_score}")
print(f"最小: {min_score}")
# 出力:
# 平均: 84.33333333333333
# 最大: 90
# 最小: 78
```

**実用例（値の範囲チェック）**:

```python
scores = {"Alice": 85, "Bob": 90, "Charlie": 78}

max_score = max(scores.values())
min_score = min(scores.values())

# すべてのスコアが範囲内かチェック
if min_score >= 0 and max_score <= 100:
    print("すべてのスコアが有効範囲内です")
else:
    print("無効なスコアがあります")
# 出力: すべてのスコアが有効範囲内です
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
Math.max(...map.values());
```

JavaScript では`Map`から最大・最小の値を取得するには、`values()`で値のイテレータを取得し、配列に変換してから`Math.max()`/`Math.min()`を使う。

**基本的な使い方**:

```javascript
const scores = new Map([
  ["Alice", 85],
  ["Bob", 90],
  ["Charlie", 78],
]);

// 最大の値を取得
const maxValue = Math.max(...scores.values());
console.log(`最大の値: ${maxValue}`);
// 出力: 最大の値: 90

// 最小の値を取得
const minValue = Math.min(...scores.values());
console.log(`最小の値: ${minValue}`);
// 出力: 最小の値: 78
```

**Array.from() を使う方法**:

```javascript
const scores = new Map([
  ["Alice", 85],
  ["Bob", 90],
  ["Charlie", 78],
]);

// 値を配列に変換
const values = Array.from(scores.values());

// 最大・最小の値
const maxValue = Math.max(...values);
const minValue = Math.min(...values);

console.log(`最大の値: ${maxValue}`); // 90
console.log(`最小の値: ${minValue}`); // 78
```

**スプレッド構文を使う方法**:

```javascript
const scores = new Map([
  ["Alice", 85],
  ["Bob", 90],
  ["Charlie", 78],
]);

// スプレッド構文で値を展開
const maxValue = Math.max(...[...scores.values()]);
const minValue = Math.min(...[...scores.values()]);

console.log(`最大の値: ${maxValue}`); // 90
console.log(`最小の値: ${minValue}`); // 78
```

**最大・最小の値を持つエントリを取得**:

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
console.log(`最高スコア: ${maxEntry[0]} = ${maxEntry[1]}`);
// 出力: 最高スコア: Bob = 90

// 値が最小のエントリを取得
const minEntry = Array.from(scores.entries()).reduce((min, entry) =>
  entry[1] < min[1] ? entry : min
);
console.log(`最低スコア: ${minEntry[0]} = ${minEntry[1]}`);
// 出力: 最低スコア: Charlie = 78
```

**空の Map の処理**:

```javascript
const emptyMap = new Map();

// 空の場合、-Infinity が返る
const maxValue = Math.max(...emptyMap.values());
console.log(maxValue); // -Infinity

// 空チェック
if (emptyMap.size === 0) {
  console.log("Map が空です");
} else {
  const maxValue = Math.max(...emptyMap.values());
  console.log(`最大の値: ${maxValue}`);
}
```

**ヘルパー関数**:

```javascript
function getMaxValue(map) {
  if (map.size === 0) return null;
  return Math.max(...map.values());
}

function getMinValue(map) {
  if (map.size === 0) return null;
  return Math.min(...map.values());
}

const scores = new Map([
  ["Alice", 85],
  ["Bob", 90],
]);

console.log(getMaxValue(scores)); // 90
console.log(getMinValue(scores)); // 85
```

**reduce を使う方法**:

```javascript
const scores = new Map([
  ["Alice", 85],
  ["Bob", 90],
  ["Charlie", 78],
]);

// reduce で最大値を求める
const maxValue = Array.from(scores.values()).reduce(
  (max, value) => (value > max ? value : max),
  -Infinity
);
console.log(`最大の値: ${maxValue}`); // 90

// reduce で最小値を求める
const minValue = Array.from(scores.values()).reduce(
  (min, value) => (value < min ? value : min),
  Infinity
);
console.log(`最小の値: ${minValue}`); // 78
```

**実用例（スコアの統計）**:

```javascript
const scores = new Map([
  ["Alice", 85],
  ["Bob", 90],
  ["Charlie", 78],
  ["David", 92],
]);

// 最高スコアと最低スコア
const maxScore = Math.max(...scores.values());
const minScore = Math.min(...scores.values());

console.log(`最高スコア: ${maxScore}点`);
console.log(`最低スコア: ${minScore}点`);
console.log(`スコア差: ${maxScore - minScore}点`);
// 出力:
// 最高スコア: 92点
// 最低スコア: 78点
// スコア差: 14点
```

**実用例（平均との比較）**:

```javascript
const scores = new Map([
  ["Alice", 85],
  ["Bob", 90],
  ["Charlie", 78],
]);

// 平均値
const values = Array.from(scores.values());
const average = values.reduce((sum, v) => sum + v, 0) / values.length;

// 最大値・最小値
const maxScore = Math.max(...values);
const minScore = Math.min(...values);

console.log(`平均: ${average}`);
console.log(`最大: ${maxScore}`);
console.log(`最小: ${minScore}`);
// 出力:
// 平均: 84.33333333333333
// 最大: 90
// 最小: 78
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
  ["key1", 100],
  ["key2", 200],
  ["key3", 150],
]);
const maxValue = Math.max(...map.values()); // 200

// Object を使った方法
const obj = { key1: 100, key2: 200, key3: 150 };
const maxValue2 = Math.max(...Object.values(obj)); // 200
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
// 値のスライスを作成して最大・最小を探す
```

Go ではマップから最大・最小の値を取得するには、値をスライスに格納してから最大・最小を探す必要がある。

**基本的な使い方**:

```go
import "fmt"

scores := map[string]int{
    "Alice":   85,
    "Bob":     90,
    "Charlie": 78,
}

// 値をスライスに格納
values := make([]int, 0, len(scores))
for _, value := range scores {
    values = append(values, value)
}

// 最大・最小の値を探す
maxValue := values[0]
minValue := values[0]
for _, value := range values[1:] {
    if value > maxValue {
        maxValue = value
    }
    if value < minValue {
        minValue = value
    }
}

fmt.Printf("最大の値: %d\n", maxValue)
// 出力: 最大の値: 90

fmt.Printf("最小の値: %d\n", minValue)
// 出力: 最小の値: 78
```

**ループで直接探す方法**:

スライスに格納せずに、直接ループで探す方が効率的。

```go
scores := map[string]int{
    "Alice":   85,
    "Bob":     90,
    "Charlie": 78,
}

// 最初の値で初期化
first := true
var maxValue, minValue int

for _, value := range scores {
    if first {
        maxValue = value
        minValue = value
        first = false
    } else {
        if value > maxValue {
            maxValue = value
        }
        if value < minValue {
            minValue = value
        }
    }
}

fmt.Printf("最大の値: %d\n", maxValue) // 90
fmt.Printf("最小の値: %d\n", minValue) // 78
```

**最大・最小の値を持つキーを取得**:

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

fmt.Printf("最高スコア: %s = %d\n", maxKey, maxValue)
// 出力: 最高スコア: Bob = 90

// 値が最小のキーを探す
var minKey string
minValue := 1<<31 - 1 // int の最大値
for key, value := range scores {
    if value < minValue {
        minValue = value
        minKey = key
    }
}

fmt.Printf("最低スコア: %s = %d\n", minKey, minValue)
// 出力: 最低スコア: Charlie = 78
```

**汎用的な関数（ジェネリクス）**:

Go 1.18+ では、ジェネリクスを使って汎用的な関数を作成できる。

```go
import (
    "fmt"
    "golang.org/x/exp/constraints"
)

func maxValue[K comparable, V constraints.Ordered](m map[K]V) (V, bool) {
    if len(m) == 0 {
        var zero V
        return zero, false
    }

    var max V
    first := true
    for _, value := range m {
        if first || value > max {
            max = value
            first = false
        }
    }
    return max, true
}

func minValue[K comparable, V constraints.Ordered](m map[K]V) (V, bool) {
    if len(m) == 0 {
        var zero V
        return zero, false
    }

    var min V
    first := true
    for _, value := range m {
        if first || value < min {
            min = value
            first = false
        }
    }
    return min, true
}

scores := map[string]int{
    "Alice":   85,
    "Bob":     90,
    "Charlie": 78,
}

if max, ok := maxValue(scores); ok {
    fmt.Printf("最大の値: %d\n", max)
}
// 出力: 最大の値: 90

if min, ok := minValue(scores); ok {
    fmt.Printf("最小の値: %d\n", min)
}
// 出力: 最小の値: 78
```

**空のマップの処理**:

```go
emptyMap := make(map[string]int)

if len(emptyMap) == 0 {
    fmt.Println("マップが空です")
} else {
    // 値の最大・最小を取得
}
```

**実用例（スコアの統計）**:

```go
scores := map[string]int{
    "Alice":   85,
    "Bob":     90,
    "Charlie": 78,
    "David":   92,
}

// 最高スコアと最低スコアを探す
first := true
var maxScore, minScore int

for _, score := range scores {
    if first {
        maxScore = score
        minScore = score
        first = false
    } else {
        if score > maxScore {
            maxScore = score
        }
        if score < minScore {
            minScore = score
        }
    }
}

fmt.Printf("最高スコア: %d点\n", maxScore)
fmt.Printf("最低スコア: %d点\n", minScore)
fmt.Printf("スコア差: %d点\n", maxScore-minScore)
// 出力:
// 最高スコア: 92点
// 最低スコア: 78点
// スコア差: 14点
```

**実用例（平均との比較）**:

```go
scores := map[string]int{
    "Alice":   85,
    "Bob":     90,
    "Charlie": 78,
}

// 平均値
sum := 0
for _, score := range scores {
    sum += score
}
average := float64(sum) / float64(len(scores))

// 最大値・最小値
first := true
var maxScore, minScore int
for _, score := range scores {
    if first {
        maxScore = score
        minScore = score
        first = false
    } else {
        if score > maxScore {
            maxScore = score
        }
        if score < minScore {
            minScore = score
        }
    }
}

fmt.Printf("平均: %f\n", average)
fmt.Printf("最大: %d\n", maxScore)
fmt.Printf("最小: %d\n", minScore)
// 出力:
// 平均: 84.333333
// 最大: 90
// 最小: 78
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

Go 1.21+ では、組み込みの`max()`/`min()`関数が使える。

```go
import "fmt"

scores := map[string]int{
    "Alice":   85,
    "Bob":     90,
    "Charlie": 78,
}

// 値をスライスに格納
values := make([]int, 0, len(scores))
for _, value := range scores {
    values = append(values, value)
}

// 最大・最小を探す
maxValue := values[0]
minValue := values[0]
for _, value := range values[1:] {
    maxValue = max(maxValue, value)
    minValue = min(minValue, value)
}

fmt.Printf("最大の値: %d\n", maxValue) // 90
fmt.Printf("最小の値: %d\n", minValue) // 78
```

**sort パッケージを使う方法**:

```go
import (
    "fmt"
    "sort"
)

scores := map[string]int{
    "Alice":   85,
    "Bob":     90,
    "Charlie": 78,
}

// 値をスライスに格納してソート
values := make([]int, 0, len(scores))
for _, value := range scores {
    values = append(values, value)
}
sort.Ints(values)

// 最大・最小の値
maxValue := values[len(values)-1]
minValue := values[0]

fmt.Printf("最大の値: %d\n", maxValue) // 90
fmt.Printf("最小の値: %d\n", minValue) // 78
```

</div>
