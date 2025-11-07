---
title: "辞書(Map)から値のリストを取得"
date: "2019-10-28T09:36:30+09:00"
excerpt: "辞書(Map)から値のリストを取得する方法について"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-28T09:36:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

辞書(Map)から値のリストを取得する方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
map.values()
```

Java では`Map`から値のリストを取得するには、`values()`で`Collection`を取得し、必要に応じて`List`に変換する。

**基本的な使い方（Collection として取得）**:

```java
import java.util.Map;
import java.util.HashMap;
import java.util.Collection;

Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 85);
scores.put("Bob", 90);
scores.put("Charlie", 78);

// 値の Collection を取得
Collection<Integer> values = scores.values();
System.out.println(values);
// 出力: [85, 90, 78]（順序は不定）
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

// Collection から List に変換
List<Integer> valueList = new ArrayList<>(scores.values());
System.out.println(valueList);
// 出力: [85, 90, 78]（順序は不定）
```

**values() の特徴**:

`values()`は元のマップのビューを返すため、マップの変更が反映される。

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 85);
scores.put("Bob", 90);

Collection<Integer> values = scores.values();
System.out.println(values);  // [85, 90]

// マップの値を変更
scores.put("Alice", 95);
System.out.println(values);  // [95, 90]（変更が反映される）
```

**for-each でイテレート**:

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 85);
scores.put("Bob", 90);
scores.put("Charlie", 78);

// 値をイテレート
for (Integer value : scores.values()) {
    System.out.println(value);
}
// 出力:
// 85
// 90
// 78
```

**Stream API を使う方法**:

```java
import java.util.stream.Collectors;

Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 85);
scores.put("Bob", 90);
scores.put("Charlie", 78);

// Stream で List に変換
List<Integer> valueList = scores.values().stream()
    .collect(Collectors.toList());
System.out.println(valueList);

// ソートして取得
List<Integer> sortedValues = scores.values().stream()
    .sorted()
    .collect(Collectors.toList());
System.out.println(sortedValues);  // [78, 85, 90]
```

**実用例（値の統計）**:

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 85);
scores.put("Bob", 90);
scores.put("Charlie", 78);

// 合計
int sum = scores.values().stream()
    .mapToInt(Integer::intValue)
    .sum();
System.out.println("合計: " + sum);  // 253

// 平均
double average = scores.values().stream()
    .mapToInt(Integer::intValue)
    .average()
    .orElse(0.0);
System.out.println("平均: " + average);  // 84.33...
```

**実用例（値のフィルタリング）**:

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 85);
scores.put("Bob", 90);
scores.put("Charlie", 78);
scores.put("David", 92);

// 80 点以上のスコアを取得
List<Integer> highScores = scores.values().stream()
    .filter(score -> score >= 80)
    .collect(Collectors.toList());
System.out.println(highScores);
// 出力: [85, 90, 92]
```

**実用例（値の重複除去）**:

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 85);
scores.put("Bob", 90);
scores.put("Charlie", 85);

// 重複を除去してセットに変換
Set<Integer> uniqueScores = new HashSet<>(scores.values());
System.out.println(uniqueScores);  // [85, 90]
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
d.values()
```

Python では辞書から値のリストを取得するには、`values()`で`dict_values`ビューを取得し、必要に応じてリストに変換する。

**基本的な使い方（dict_values として取得）**:

```python
scores = {"Alice": 85, "Bob": 90, "Charlie": 78}

# 値のビューを取得
values = scores.values()
print(values)
# 出力: dict_values([85, 90, 78])

print(type(values))
# 出力: <class 'dict_values'>
```

**リストに変換**:

```python
scores = {"Alice": 85, "Bob": 90, "Charlie": 78}

# リストに変換
value_list = list(scores.values())
print(value_list)
# 出力: [85, 90, 78]
```

**values() の特徴**:

`values()`は元の辞書のビューを返すため、辞書の変更が反映される。

```python
scores = {"Alice": 85, "Bob": 90}

values = scores.values()
print(values)  # dict_values([85, 90])

# 辞書の値を変更
scores["Alice"] = 95
print(values)  # dict_values([95, 90])（変更が反映される）
```

**for ループでイテレート**:

```python
scores = {"Alice": 85, "Bob": 90, "Charlie": 78}

# 値をイテレート
for value in scores.values():
    print(value)
# 出力:
# 85
# 90
# 78
```

**ソートして取得**:

```python
scores = {"Charlie": 78, "Alice": 85, "Bob": 90}

# 値をソートしてリストに変換
sorted_values = sorted(scores.values())
print(sorted_values)
# 出力: [78, 85, 90]
```

**リスト内包表記**:

```python
scores = {"Alice": 85, "Bob": 90, "Charlie": 78}

# リスト内包表記で値を取得
values = [v for v in scores.values()]
print(values)  # [85, 90, 78]

# 10 点ボーナスを追加
bonus_values = [v + 10 for v in scores.values()]
print(bonus_values)  # [95, 100, 88]
```

**実用例（値の統計）**:

```python
scores = {"Alice": 85, "Bob": 90, "Charlie": 78}

# 合計
total = sum(scores.values())
print(f"合計: {total}")  # 合計: 253

# 平均
average = sum(scores.values()) / len(scores)
print(f"平均: {average}")  # 平均: 84.33...

# 最大・最小
max_score = max(scores.values())
min_score = min(scores.values())
print(f"最高: {max_score}, 最低: {min_score}")  # 最高: 90, 最低: 78
```

**実用例（値のフィルタリング）**:

```python
scores = {"Alice": 85, "Bob": 90, "Charlie": 78, "David": 92}

# 80 点以上のスコアを取得
high_scores = [v for v in scores.values() if v >= 80]
print(high_scores)
# 出力: [85, 90, 92]
```

**実用例（値の重複除去）**:

```python
scores = {"Alice": 85, "Bob": 90, "Charlie": 85}

# 重複を除去してセットに変換
unique_scores = set(scores.values())
print(unique_scores)  # {85, 90}

# ソートしてリストに変換
unique_sorted = sorted(unique_scores)
print(unique_sorted)  # [85, 90]
```

**実用例（値の出現回数）**:

```python
from collections import Counter

scores = {"Alice": 85, "Bob": 90, "Charlie": 85, "David": 90, "Eve": 78}

# 値の出現回数を数える
value_counts = Counter(scores.values())
print(value_counts)
# 出力: Counter({85: 2, 90: 2, 78: 1})

# 最も多いスコア
most_common = value_counts.most_common(1)
print(f"最も多いスコア: {most_common[0][0]} ({most_common[0][1]}人)")
# 出力: 最も多いスコア: 85 (2人)
```

**set に変換**:

```python
scores = {"Alice": 85, "Bob": 90, "Charlie": 78}

# set に変換
value_set = set(scores.values())
print(value_set)
# 出力: {85, 90, 78}
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
map.values();
```

JavaScript では`Map`から値のリストを取得するには、`values()`でイテレータを取得し、必要に応じて配列に変換する。

**基本的な使い方（イテレータとして取得）**:

```javascript
const scores = new Map([
  ["Alice", 85],
  ["Bob", 90],
  ["Charlie", 78],
]);

// 値のイテレータを取得
const values = scores.values();
console.log(values);
// 出力: MapIterator { 85, 90, 78 }
```

**配列に変換**:

```javascript
const scores = new Map([
  ["Alice", 85],
  ["Bob", 90],
  ["Charlie", 78],
]);

// Array.from() で配列に変換
const valueArray = Array.from(scores.values());
console.log(valueArray);
// 出力: [85, 90, 78]

// スプレッド構文で配列に変換
const valueArray2 = [...scores.values()];
console.log(valueArray2);
// 出力: [85, 90, 78]
```

**for...of でイテレート**:

```javascript
const scores = new Map([
  ["Alice", 85],
  ["Bob", 90],
  ["Charlie", 78],
]);

// 値をイテレート
for (const value of scores.values()) {
  console.log(value);
}
// 出力:
// 85
// 90
// 78
```

**ソートして取得**:

```javascript
const scores = new Map([
  ["Charlie", 78],
  ["Alice", 85],
  ["Bob", 90],
]);

// 値をソートして配列に変換
const sortedValues = Array.from(scores.values()).sort((a, b) => a - b);
console.log(sortedValues);
// 出力: [78, 85, 90]
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
  console.log(value);
});
// 出力:
// 85
// 90
// 78
```

**実用例（値の統計）**:

```javascript
const scores = new Map([
  ["Alice", 85],
  ["Bob", 90],
  ["Charlie", 78],
]);

const values = Array.from(scores.values());

// 合計
const total = values.reduce((sum, v) => sum + v, 0);
console.log(`合計: ${total}`); // 合計: 253

// 平均
const average = total / values.length;
console.log(`平均: ${average}`); // 平均: 84.33...

// 最大・最小
const maxScore = Math.max(...values);
const minScore = Math.min(...values);
console.log(`最高: ${maxScore}, 最低: ${minScore}`); // 最高: 90, 最低: 78
```

**実用例（値のフィルタリング）**:

```javascript
const scores = new Map([
  ["Alice", 85],
  ["Bob", 90],
  ["Charlie", 78],
  ["David", 92],
]);

// 80 点以上のスコアを取得
const highScores = Array.from(scores.values()).filter((score) => score >= 80);
console.log(highScores);
// 出力: [85, 90, 92]
```

**実用例（値の重複除去）**:

```javascript
const scores = new Map([
  ["Alice", 85],
  ["Bob", 90],
  ["Charlie", 85],
]);

// 重複を除去してセットに変換
const uniqueScores = new Set(scores.values());
console.log(uniqueScores); // Set { 85, 90 }

// ソートして配列に変換
const uniqueSorted = Array.from(uniqueScores).sort((a, b) => a - b);
console.log(uniqueSorted); // [85, 90]
```

**実用例（値の出現回数）**:

```javascript
const scores = new Map([
  ["Alice", 85],
  ["Bob", 90],
  ["Charlie", 85],
  ["David", 90],
  ["Eve", 78],
]);

// 値の出現回数を数える
const valueCounts = {};
for (const value of scores.values()) {
  valueCounts[value] = (valueCounts[value] || 0) + 1;
}

console.log(valueCounts);
// 出力: { '78': 1, '85': 2, '90': 2 }

// 最も多いスコア
const mostCommon = Object.entries(valueCounts).reduce((max, entry) =>
  entry[1] > max[1] ? entry : max
);
console.log(`最も多いスコア: ${mostCommon[0]} (${mostCommon[1]}人)`);
// 出力: 最も多いスコア: 85 (2人)
```

**実用例（値の変換）**:

```javascript
const scores = new Map([
  ["Alice", 85],
  ["Bob", 90],
  ["Charlie", 78],
]);

// 10 点ボーナスを追加
const bonusValues = Array.from(scores.values()).map((v) => v + 10);
console.log(bonusValues);
// 出力: [95, 100, 88]
```

**Object との違い**:

```javascript
// Map を使った方法
const map = new Map([
  ["key1", 100],
  ["key2", 200],
  ["key3", 150],
]);
const values1 = Array.from(map.values());
console.log(values1); // [100, 200, 150]

// Object を使った方法
const obj = { key1: 100, key2: 200, key3: 150 };
const values2 = Object.values(obj);
console.log(values2); // [100, 200, 150]
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
// 値のスライスを作成
```

Go ではマップから値のリストを取得するには、値をスライスに格納する必要がある。

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

fmt.Println(values)
// 出力: [85 90 78]（順序は不定）
```

**range で値をイテレート**:

```go
scores := map[string]int{
    "Alice":   85,
    "Bob":     90,
    "Charlie": 78,
}

// 値をイテレート
for _, value := range scores {
    fmt.Println(value)
}
// 出力:
// 85
// 90
// 78
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

// 値をスライスに格納してソート
values := make([]int, 0, len(scores))
for _, value := range scores {
    values = append(values, value)
}
sort.Ints(values)

fmt.Println(values)
// 出力: [78 85 90]
```

**汎用的な関数（ジェネリクス）**:

Go 1.18+ では、ジェネリクスを使って汎用的な関数を作成できる。

```go
import (
    "fmt"
    "golang.org/x/exp/constraints"
)

func getValues[K comparable, V any](m map[K]V) []V {
    values := make([]V, 0, len(m))
    for _, value := range m {
        values = append(values, value)
    }
    return values
}

scores := map[string]int{
    "Alice":   85,
    "Bob":     90,
    "Charlie": 78,
}

values := getValues(scores)
fmt.Println(values)
// 出力: [85 90 78]（順序は不定）
```

**実用例（値の統計）**:

```go
scores := map[string]int{
    "Alice":   85,
    "Bob":     90,
    "Charlie": 78,
}

// 合計
total := 0
for _, score := range scores {
    total += score
}
fmt.Printf("合計: %d\n", total)  // 合計: 253

// 平均
average := float64(total) / float64(len(scores))
fmt.Printf("平均: %.2f\n", average)  // 平均: 84.33

// 最大・最小
values := make([]int, 0, len(scores))
for _, value := range scores {
    values = append(values, value)
}

maxScore := values[0]
minScore := values[0]
for _, score := range values[1:] {
    if score > maxScore {
        maxScore = score
    }
    if score < minScore {
        minScore = score
    }
}

fmt.Printf("最高: %d, 最低: %d\n", maxScore, minScore)  // 最高: 90, 最低: 78
```

**実用例（値のフィルタリング）**:

```go
scores := map[string]int{
    "Alice":   85,
    "Bob":     90,
    "Charlie": 78,
    "David":   92,
}

// 80 点以上のスコアを取得
highScores := make([]int, 0)
for _, score := range scores {
    if score >= 80 {
        highScores = append(highScores, score)
    }
}

fmt.Println(highScores)
// 出力: [85 90 92]（順序は不定）
```

**実用例（値の重複除去）**:

```go
scores := map[string]int{
    "Alice":   85,
    "Bob":     90,
    "Charlie": 85,
}

// 重複を除去するためにマップを使用
uniqueMap := make(map[int]bool)
for _, value := range scores {
    uniqueMap[value] = true
}

// ユニークな値をスライスに格納
uniqueScores := make([]int, 0, len(uniqueMap))
for value := range uniqueMap {
    uniqueScores = append(uniqueScores, value)
}

// ソート
sort.Ints(uniqueScores)
fmt.Println(uniqueScores)
// 出力: [85 90]
```

**実用例（値の出現回数）**:

```go
scores := map[string]int{
    "Alice":   85,
    "Bob":     90,
    "Charlie": 85,
    "David":   90,
    "Eve":     78,
}

// 値の出現回数を数える
valueCounts := make(map[int]int)
for _, value := range scores {
    valueCounts[value]++
}

fmt.Println(valueCounts)
// 出力: map[78:1 85:2 90:2]

// 最も多いスコア
maxCount := 0
mostCommonScore := 0
for value, count := range valueCounts {
    if count > maxCount {
        maxCount = count
        mostCommonScore = value
    }
}

fmt.Printf("最も多いスコア: %d (%d人)\n", mostCommonScore, maxCount)
// 出力: 最も多いスコア: 85 (2人) または 90 (2人)
```

**実用例（値の変換）**:

```go
scores := map[string]int{
    "Alice":   85,
    "Bob":     90,
    "Charlie": 78,
}

// 10 点ボーナスを追加
bonusValues := make([]int, 0, len(scores))
for _, value := range scores {
    bonusValues = append(bonusValues, value+10)
}

fmt.Println(bonusValues)
// 出力: [95 100 88]（順序は不定）
```

**マップの順序は不定**:

Go のマップは順序を保持しないため、値の順序も不定。

```go
scores := map[string]int{
    "Alice":   85,
    "Bob":     90,
    "Charlie": 78,
}

// 2回イテレートしてみる
fmt.Println("1回目:")
for _, value := range scores {
    fmt.Println(value)
}

fmt.Println("2回目:")
for _, value := range scores {
    fmt.Println(value)
}
// 出力: 順序が異なる可能性がある
```

**values のみを格納する構造体**:

キーが不要で値だけを保持したい場合は、スライスを使う。

```go
type ScoreList struct {
    scores []int
}

func NewScoreList() *ScoreList {
    return &ScoreList{
        scores: make([]int, 0),
    }
}

func (sl *ScoreList) Add(score int) {
    sl.scores = append(sl.scores, score)
}

func (sl *ScoreList) Values() []int {
    return sl.scores
}

sl := NewScoreList()
sl.Add(85)
sl.Add(90)
sl.Add(78)

fmt.Println(sl.Values())
// 出力: [85 90 78]（挿入順）
```

</div>
