---
title: "辞書(Map)のループ"
date: "2019-10-28T09:36:30+09:00"
excerpt: "辞書(Map)のループの方法について"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-28T09:36:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

辞書(Map)のループを行う方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
for (Map.Entry<K, V> entry : map.entrySet())
```

Java では`Map`をループするには、`entrySet()`でキーと値のペアを取得し、for-each 文でイテレートする。

**基本的な使い方（entrySet() を使う方法）**:

```java
import java.util.Map;
import java.util.HashMap;

Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 85);
scores.put("Bob", 90);
scores.put("Charlie", 78);

// entrySet() でキーと値を両方取得
for (Map.Entry<String, Integer> entry : scores.entrySet()) {
    String key = entry.getKey();
    Integer value = entry.getValue();
    System.out.println(key + ": " + value);
}
// 出力:
// Alice: 85
// Bob: 90
// Charlie: 78
```

**keySet() を使う方法**:

キーだけをイテレートして、値は`get()`で取得する。

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 85);
scores.put("Bob", 90);
scores.put("Charlie", 78);

// keySet() でキーのみを取得
for (String key : scores.keySet()) {
    Integer value = scores.get(key);
    System.out.println(key + ": " + value);
}
// 出力:
// Alice: 85
// Bob: 90
// Charlie: 78
```

**values() を使う方法**:

値だけをイテレートする（キーは不要な場合）。

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 85);
scores.put("Bob", 90);
scores.put("Charlie", 78);

// values() で値のみを取得
for (Integer value : scores.values()) {
    System.out.println("スコア: " + value);
}
// 出力:
// スコア: 85
// スコア: 90
// スコア: 78
```

**forEach() を使う方法（Java 8+）**:

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 85);
scores.put("Bob", 90);
scores.put("Charlie", 78);

// forEach() メソッドを使用
scores.forEach((key, value) -> {
    System.out.println(key + ": " + value);
});
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

// Stream API でフィルタリングしながらループ
scores.entrySet().stream()
    .filter(entry -> entry.getValue() >= 80)
    .forEach(entry -> System.out.println(entry.getKey() + ": " + entry.getValue()));
// 出力:
// Alice: 85
// Bob: 90
```

**実用例（条件付き処理）**:

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 85);
scores.put("Bob", 90);
scores.put("Charlie", 78);

// 条件に応じた処理
for (Map.Entry<String, Integer> entry : scores.entrySet()) {
    String name = entry.getKey();
    Integer score = entry.getValue();
    String result = score >= 80 ? "合格" : "不合格";
    System.out.println(name + ": " + score + "点 (" + result + ")");
}
// 出力:
// Alice: 85点 (合格)
// Bob: 90点 (合格)
// Charlie: 78点 (不合格)
```

**実用例（値の更新）**:

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 85);
scores.put("Bob", 90);
scores.put("Charlie", 78);

// ループ中に値を更新（10点ボーナス）
for (Map.Entry<String, Integer> entry : scores.entrySet()) {
    entry.setValue(entry.getValue() + 10);
}

System.out.println(scores);
// 出力: {Alice=95, Bob=100, Charlie=88}
```

**実用例（合計と平均）**:

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 85);
scores.put("Bob", 90);
scores.put("Charlie", 78);

// 合計を計算
int total = 0;
for (Integer score : scores.values()) {
    total += score;
}

double average = (double) total / scores.size();
System.out.println("合計: " + total);      // 合計: 253
System.out.println("平均: " + average);    // 平均: 84.33...
```

**LinkedHashMap で順序を保持**:

```java
import java.util.LinkedHashMap;

Map<String, Integer> scores = new LinkedHashMap<>();
scores.put("Alice", 85);
scores.put("Bob", 90);
scores.put("Charlie", 78);

// 挿入順序でループされる
for (Map.Entry<String, Integer> entry : scores.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}
// 出力:
// Alice: 85
// Bob: 90
// Charlie: 78
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
for key, value in d.items():
```

Python では辞書をループするには、`items()`でキーと値のペアを取得し、for 文でイテレートする。

**基本的な使い方（items() を使う方法）**:

```python
scores = {"Alice": 85, "Bob": 90, "Charlie": 78}

# items() でキーと値を両方取得
for key, value in scores.items():
    print(f"{key}: {value}")
# 出力:
# Alice: 85
# Bob: 90
# Charlie: 78
```

**キーだけをループ**:

辞書を直接イテレートするか、`keys()`を使う。

```python
scores = {"Alice": 85, "Bob": 90, "Charlie": 78}

# 辞書を直接イテレート（推奨）
for key in scores:
    value = scores[key]
    print(f"{key}: {value}")

# または keys() を明示的に使う
for key in scores.keys():
    value = scores[key]
    print(f"{key}: {value}")
# 出力:
# Alice: 85
# Bob: 90
# Charlie: 78
```

**値だけをループ**:

```python
scores = {"Alice": 85, "Bob": 90, "Charlie": 78}

# values() で値のみを取得
for value in scores.values():
    print(f"スコア: {value}")
# 出力:
# スコア: 85
# スコア: 90
# スコア: 78
```

**実用例（条件付き処理）**:

```python
scores = {"Alice": 85, "Bob": 90, "Charlie": 78}

# 条件に応じた処理
for name, score in scores.items():
    result = "合格" if score >= 80 else "不合格"
    print(f"{name}: {score}点 ({result})")
# 出力:
# Alice: 85点 (合格)
# Bob: 90点 (合格)
# Charlie: 78点 (不合格)
```

**実用例（値の更新）**:

```python
scores = {"Alice": 85, "Bob": 90, "Charlie": 78}

# ループ中に値を更新（10点ボーナス）
for key in scores:
    scores[key] += 10

print(scores)
# 出力: {'Alice': 95, 'Bob': 100, 'Charlie': 88}
```

**実用例（合計と平均）**:

```python
scores = {"Alice": 85, "Bob": 90, "Charlie": 78}

# 合計を計算
total = 0
for score in scores.values():
    total += score

average = total / len(scores)
print(f"合計: {total}")      # 合計: 253
print(f"平均: {average}")    # 平均: 84.33...

# または sum() を使う
total = sum(scores.values())
print(f"合計: {total}")      # 合計: 253
```

**enumerate() でインデックス付きループ**:

```python
scores = {"Alice": 85, "Bob": 90, "Charlie": 78}

# インデックス付きでループ
for i, (name, score) in enumerate(scores.items(), 1):
    print(f"{i}. {name}: {score}点")
# 出力:
# 1. Alice: 85点
# 2. Bob: 90点
# 3. Charlie: 78点
```

**辞書内包表記でフィルタリング**:

```python
scores = {"Alice": 85, "Bob": 90, "Charlie": 78}

# 80点以上の人だけを新しい辞書に
high_scorers = {name: score for name, score in scores.items() if score >= 80}
print(high_scorers)
# 出力: {'Alice': 85, 'Bob': 90}
```

**sorted() でソート**:

```python
scores = {"Charlie": 78, "Alice": 85, "Bob": 90}

# キーでソートしてループ
for name in sorted(scores.keys()):
    print(f"{name}: {scores[name]}")
# 出力:
# Alice: 85
# Bob: 90
# Charlie: 78

# 値でソートしてループ
for name, score in sorted(scores.items(), key=lambda x: x[1], reverse=True):
    print(f"{name}: {score}")
# 出力:
# Bob: 90
# Alice: 85
# Charlie: 78
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
for (const [key, value] of map.entries())
```

JavaScript では`Map`をループするには、`entries()`でキーと値のペアを取得し、for...of 文でイテレートする。

**基本的な使い方（entries() を使う方法）**:

```javascript
const scores = new Map([
  ["Alice", 85],
  ["Bob", 90],
  ["Charlie", 78],
]);

// entries() でキーと値を両方取得
for (const [key, value] of scores.entries()) {
  console.log(`${key}: ${value}`);
}
// 出力:
// Alice: 85
// Bob: 90
// Charlie: 78
```

**Map を直接イテレート**:

`Map`を直接イテレートすると、自動的に`entries()`が使われる。

```javascript
const scores = new Map([
  ["Alice", 85],
  ["Bob", 90],
  ["Charlie", 78],
]);

// Map を直接イテレート（推奨）
for (const [key, value] of scores) {
  console.log(`${key}: ${value}`);
}
// 出力:
// Alice: 85
// Bob: 90
// Charlie: 78
```

**キーだけをループ**:

```javascript
const scores = new Map([
  ["Alice", 85],
  ["Bob", 90],
  ["Charlie", 78],
]);

// keys() でキーのみを取得
for (const key of scores.keys()) {
  const value = scores.get(key);
  console.log(`${key}: ${value}`);
}
// 出力:
// Alice: 85
// Bob: 90
// Charlie: 78
```

**値だけをループ**:

```javascript
const scores = new Map([
  ["Alice", 85],
  ["Bob", 90],
  ["Charlie", 78],
]);

// values() で値のみを取得
for (const value of scores.values()) {
  console.log(`スコア: ${value}`);
}
// 出力:
// スコア: 85
// スコア: 90
// スコア: 78
```

**forEach() を使う方法**:

```javascript
const scores = new Map([
  ["Alice", 85],
  ["Bob", 90],
  ["Charlie", 78],
]);

// forEach() メソッドを使用
scores.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});
// 出力:
// Alice: 85
// Bob: 90
// Charlie: 78
```

**実用例（条件付き処理）**:

```javascript
const scores = new Map([
  ["Alice", 85],
  ["Bob", 90],
  ["Charlie", 78],
]);

// 条件に応じた処理
for (const [name, score] of scores) {
  const result = score >= 80 ? "合格" : "不合格";
  console.log(`${name}: ${score}点 (${result})`);
}
// 出力:
// Alice: 85点 (合格)
// Bob: 90点 (合格)
// Charlie: 78点 (不合格)
```

**実用例（値の更新）**:

```javascript
const scores = new Map([
  ["Alice", 85],
  ["Bob", 90],
  ["Charlie", 78],
]);

// ループ中に値を更新（10点ボーナス）
for (const [key, value] of scores) {
  scores.set(key, value + 10);
}

console.log(scores);
// 出力: Map(3) { 'Alice' => 95, 'Bob' => 100, 'Charlie' => 88 }
```

**実用例（合計と平均）**:

```javascript
const scores = new Map([
  ["Alice", 85],
  ["Bob", 90],
  ["Charlie", 78],
]);

// 合計を計算
let total = 0;
for (const score of scores.values()) {
  total += score;
}

const average = total / scores.size;
console.log(`合計: ${total}`); // 合計: 253
console.log(`平均: ${average}`); // 平均: 84.33...
```

**Array.from() で配列に変換**:

```javascript
const scores = new Map([
  ["Alice", 85],
  ["Bob", 90],
  ["Charlie", 78],
]);

// 配列に変換してから処理
const entries = Array.from(scores.entries());
entries.forEach(([name, score], index) => {
  console.log(`${index + 1}. ${name}: ${score}点`);
});
// 出力:
// 1. Alice: 85点
// 2. Bob: 90点
// 3. Charlie: 78点
```

**filter と map**:

```javascript
const scores = new Map([
  ["Alice", 85],
  ["Bob", 90],
  ["Charlie", 78],
]);

// 80点以上の人をフィルタリング
const highScorers = new Map(
  Array.from(scores.entries()).filter(([name, score]) => score >= 80)
);
console.log(highScorers);
// 出力: Map(2) { 'Alice' => 85, 'Bob' => 90 }
```

**ソート**:

```javascript
const scores = new Map([
  ["Charlie", 78],
  ["Alice", 85],
  ["Bob", 90],
]);

// 値でソートしてループ
const sorted = Array.from(scores.entries()).sort((a, b) => b[1] - a[1]);
for (const [name, score] of sorted) {
  console.log(`${name}: ${score}`);
}
// 出力:
// Bob: 90
// Alice: 85
// Charlie: 78
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
for key, value := range m
```

Go ではマップをループするには、`range`を使ってキーと値のペアを取得し、for 文でイテレートする。

**基本的な使い方（range を使う方法）**:

```go
import "fmt"

scores := map[string]int{
    "Alice":   85,
    "Bob":     90,
    "Charlie": 78,
}

// range でキーと値を両方取得
for key, value := range scores {
    fmt.Printf("%s: %d\n", key, value)
}
// 出力:
// Alice: 85
// Bob: 90
// Charlie: 78
// （順序は不定）
```

**キーだけをループ**:

```go
scores := map[string]int{
    "Alice":   85,
    "Bob":     90,
    "Charlie": 78,
}

// キーのみを取得（値は _ で無視）
for key := range scores {
    value := scores[key]
    fmt.Printf("%s: %d\n", key, value)
}
// 出力:
// Alice: 85
// Bob: 90
// Charlie: 78
// （順序は不定）
```

**値だけをループ**:

```go
scores := map[string]int{
    "Alice":   85,
    "Bob":     90,
    "Charlie": 78,
}

// 値のみを取得（キーは _ で無視）
for _, value := range scores {
    fmt.Printf("スコア: %d\n", value)
}
// 出力:
// スコア: 85
// スコア: 90
// スコア: 78
// （順序は不定）
```

**実用例（条件付き処理）**:

```go
scores := map[string]int{
    "Alice":   85,
    "Bob":     90,
    "Charlie": 78,
}

// 条件に応じた処理
for name, score := range scores {
    result := "合格"
    if score < 80 {
        result = "不合格"
    }
    fmt.Printf("%s: %d点 (%s)\n", name, score, result)
}
// 出力:
// Alice: 85点 (合格)
// Bob: 90点 (合格)
// Charlie: 78点 (不合格)
// （順序は不定）
```

**実用例（値の更新）**:

```go
scores := map[string]int{
    "Alice":   85,
    "Bob":     90,
    "Charlie": 78,
}

// ループ中に値を更新（10点ボーナス）
for key := range scores {
    scores[key] += 10
}

fmt.Println(scores)
// 出力: map[Alice:95 Bob:100 Charlie:88]
```

**実用例（合計と平均）**:

```go
scores := map[string]int{
    "Alice":   85,
    "Bob":     90,
    "Charlie": 78,
}

// 合計を計算
total := 0
for _, score := range scores {
    total += score
}

average := float64(total) / float64(len(scores))
fmt.Printf("合計: %d\n", total)        // 合計: 253
fmt.Printf("平均: %.2f\n", average)    // 平均: 84.33
```

**ソートしてループ**:

Go のマップは順序を保持しないため、ソートが必要な場合はキーをスライスに格納してソートする。

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

// ソート済みのキーでループ
for _, key := range keys {
    fmt.Printf("%s: %d\n", key, scores[key])
}
// 出力:
// Alice: 85
// Bob: 90
// Charlie: 78
```

**値でソート**:

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

// 構造体のスライスに変換
type Entry struct {
    Name  string
    Score int
}

entries := make([]Entry, 0, len(scores))
for name, score := range scores {
    entries = append(entries, Entry{name, score})
}

// 値でソート
sort.Slice(entries, func(i, j int) bool {
    return entries[i].Score > entries[j].Score
})

// ソート済みでループ
for _, entry := range entries {
    fmt.Printf("%s: %d\n", entry.Name, entry.Score)
}
// 出力:
// Bob: 90
// Alice: 85
// Charlie: 78
```

**実用例（フィルタリング）**:

```go
scores := map[string]int{
    "Alice":   85,
    "Bob":     90,
    "Charlie": 78,
}

// 80点以上の人をフィルタリング
highScorers := make(map[string]int)
for name, score := range scores {
    if score >= 80 {
        highScorers[name] = score
    }
}

fmt.Println(highScorers)
// 出力: map[Alice:85 Bob:90]
```

**マップの順序は不定**:

Go のマップは順序を保持しないため、毎回異なる順序でイテレートされる可能性がある。

```go
scores := map[string]int{
    "Alice":   85,
    "Bob":     90,
    "Charlie": 78,
}

fmt.Println("1回目:")
for key, value := range scores {
    fmt.Printf("%s: %d\n", key, value)
}

fmt.Println("2回目:")
for key, value := range scores {
    fmt.Printf("%s: %d\n", key, value)
}
// 出力: 順序が異なる可能性がある
```

</div>
