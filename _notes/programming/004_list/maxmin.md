---
title: "リスト内の要素の最大値・最小値を取得する"
date: "2019-10-27T09:35:30+09:00"
excerpt: "リスト内の要素の最大値・最小値を取得する方法"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-27T09:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

リスト内の要素のうち一番大きい値を取得する方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
int max = Collections.max(list);
int min = Collections.min(list);
```

Java では**Collections.max()**と**Collections.min()**でリスト内の最大値・最小値を取得できる。

数値の場合は数値の大小、文字列の場合は辞書順で比較される。

```java
import java.util.*;

// 数値のリスト
List<Integer> numbers = Arrays.asList(1, 3, -2, 100, 5);
System.out.println(numbers); // [1, 3, -2, 100, 5]

int max = Collections.max(numbers);
int min = Collections.min(numbers);
System.out.println("最大値: " + max); // 100
System.out.println("最小値: " + min); // -2

// 文字列のリスト
List<String> words = Arrays.asList("apple", "banana", "cherry");
System.out.println(words); // [apple, banana, cherry]

String maxStr = Collections.max(words);
String minStr = Collections.min(words);
System.out.println("最大値: " + maxStr); // cherry（辞書順で最後）
System.out.println("最小値: " + minStr); // apple（辞書順で最初）
```

**Stream API を使う方法**:

```java
List<Integer> numbers = Arrays.asList(1, 3, -2, 100, 5);

// OptionalIntを返す
int max = numbers.stream().mapToInt(Integer::intValue).max().getAsInt();
int min = numbers.stream().mapToInt(Integer::intValue).min().getAsInt();
System.out.println("最大値: " + max); // 100
System.out.println("最小値: " + min); // -2
```

**空リストの処理**:

```java
List<Integer> emptyList = new ArrayList<>();

// NoSuchElementExceptionが発生する
try {
    int max = Collections.max(emptyList);
} catch (NoSuchElementException e) {
    System.out.println("リストが空です");
}
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
max_value = max(my_list)
min_value = min(my_list)
```

Python では組み込み関数**max()**と**min()**でリスト内の最大値・最小値を取得できる。

数値の場合は数値の大小、文字列の場合は辞書順で比較される。

```python
# 数値のリスト
numbers = [1, 3, -2, 100, 5]
print(numbers)  # [1, 3, -2, 100, 5]

max_value = max(numbers)
min_value = min(numbers)
print("最大値:", max_value)  # 100
print("最小値:", min_value)  # -2

# 文字列のリスト
words = ["apple", "banana", "cherry"]
print(words)  # ['apple', 'banana', 'cherry']

max_str = max(words)
min_str = min(words)
print("最大値:", max_str)  # cherry（辞書順で最後）
print("最小値:", min_str)  # apple（辞書順で最初）
```

**空リストの処理**:

```python
empty_list = []

try:
    max_value = max(empty_list)
except ValueError as e:
    print("リストが空です")
# リストが空です
```

**キー関数を使った比較**:

文字列の長さで最大・最小を取得する例。

```python
words = ["a", "banana", "cherry"]

# 文字列の長さで比較
max_word = max(words, key=len)
min_word = min(words, key=len)
print("最長:", max_word)  # banana
print("最短:", min_word)  # a
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
let max = Math.max(...arr);
let min = Math.min(...arr);
```

JavaScript では**Math.max()**と**Math.min()**に**スプレッド構文**（`...`）で配列を展開して、最大値・最小値を取得できる。

```javascript
// 数値の配列
let numbers = [1, 3, -2, 100, 5];
console.log(numbers); // [1, 3, -2, 100, 5]

let max = Math.max(...numbers);
let min = Math.min(...numbers);
console.log("最大値:", max); // 100
console.log("最小値:", min); // -2
```

**reduce()を使う方法**:

```javascript
let numbers = [1, 3, -2, 100, 5];

// 最大値
let max = numbers.reduce((a, b) => Math.max(a, b));
console.log("最大値:", max); // 100

// 最小値
let min = numbers.reduce((a, b) => Math.min(a, b));
console.log("最小値:", min); // -2

// または、比較演算子を使う
let max2 = numbers.reduce((a, b) => (a > b ? a : b));
let min2 = numbers.reduce((a, b) => (a < b ? a : b));
console.log("最大値:", max2); // 100
console.log("最小値:", min2); // -2
```

**文字列の配列の場合**:

```javascript
let words = ["apple", "banana", "cherry"];

// 辞書順で比較
let maxStr = words.reduce((a, b) => (a > b ? a : b));
let minStr = words.reduce((a, b) => (a < b ? a : b));
console.log("最大値:", maxStr); // cherry（辞書順で最後）
console.log("最小値:", minStr); // apple（辞書順で最初）

// 文字列の長さで比較
let longest = words.reduce((a, b) => (a.length > b.length ? a : b));
let shortest = words.reduce((a, b) => (a.length < b.length ? a : b));
console.log("最長:", longest); // banana
console.log("最短:", shortest); // apple
```

**空配列の処理**:

```javascript
let emptyArr = [];

// -Infinityを返す
let max = Math.max(...emptyArr);
console.log(max); // -Infinity

// Infinityを返す
let min = Math.min(...emptyArr);
console.log(min); // Infinity

// reduce()の場合はエラーになる
try {
  let max = emptyArr.reduce((a, b) => Math.max(a, b));
} catch (e) {
  console.log("配列が空です");
}
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
max := slices.Max(slice)
min := slices.Min(slice)
```

Go では**slices.Max()**と**slices.Min()**（Go 1.21+）でスライス内の最大値・最小値を取得できる。

```go
import (
    "fmt"
    "slices"
)

// 数値のスライス
numbers := []int{1, 3, -2, 100, 5}
fmt.Println(numbers) // [1 3 -2 100 5]

max := slices.Max(numbers)
min := slices.Min(numbers)
fmt.Println("最大値:", max) // 100
fmt.Println("最小値:", min) // -2

// 文字列のスライス
words := []string{"apple", "banana", "cherry"}
fmt.Println(words) // [apple banana cherry]

maxStr := slices.Max(words)
minStr := slices.Min(words)
fmt.Println("最大値:", maxStr) // cherry（辞書順で最後）
fmt.Println("最小値:", minStr) // apple（辞書順で最初）
```

**Go 1.21 未満の場合（ループで実装）**:

```go
func max(slice []int) int {
    if len(slice) == 0 {
        panic("スライスが空です")
    }
    maxVal := slice[0]
    for _, v := range slice {
        if v > maxVal {
            maxVal = v
        }
    }
    return maxVal
}

func min(slice []int) int {
    if len(slice) == 0 {
        panic("スライスが空です")
    }
    minVal := slice[0]
    for _, v := range slice {
        if v < minVal {
            minVal = v
        }
    }
    return minVal
}

numbers := []int{1, 3, -2, 100, 5}
fmt.Println("最大値:", max(numbers)) // 100
fmt.Println("最小値:", min(numbers)) // -2
```

**math パッケージの Max/Min を使う方法**:

`math.Max()`と`math.Min()`は float64 型の 2 つの値を比較するため、スライス全体の場合はループが必要。

```go
import (
    "fmt"
    "math"
)

numbers := []float64{1.5, 3.2, -2.1, 100.7, 5.3}
maxVal := numbers[0]
minVal := numbers[0]

for _, v := range numbers {
    maxVal = math.Max(maxVal, v)
    minVal = math.Min(minVal, v)
}

fmt.Println("最大値:", maxVal) // 100.7
fmt.Println("最小値:", minVal) // -2.1
```

**空スライスの処理**:

```go
emptySlice := []int{}

// slices.Max/Minはpanicを起こす
defer func() {
    if r := recover(); r != nil {
        fmt.Println("スライスが空です")
    }
}()

max := slices.Max(emptySlice) // panic: slices.Max: empty list
```

**比較関数を使ったカスタム比較（Go 1.21+）**:

```go
type Person struct {
    Name string
    Age  int
}

people := []Person{
    {"Alice", 30},
    {"Bob", 25},
    {"Charlie", 35},
}

// slices.MaxFunc/MinFuncを使ってカスタム比較
oldest := slices.MaxFunc(people, func(a, b Person) int {
    return a.Age - b.Age
})
youngest := slices.MinFunc(people, func(a, b Person) int {
    return a.Age - b.Age
})

fmt.Println("最年長:", oldest)   // {Charlie 35}
fmt.Println("最年少:", youngest) // {Bob 25}
```

</div>
