---
title: "リスト内包表記"
date: "2019-10-27T13:35:30+09:00"
excerpt: "リスト内包表記とそれに相当する機能について"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-27T13:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

リスト内包表記（List Comprehension）とそれに相当する機能についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
List<Integer> result = IntStream.range(0, 5)
    .boxed()
    .collect(Collectors.toList());
```

Java には**リスト内包表記は存在しない**が、**Stream API**を使って同様の処理を実現できる。

Stream API は関数型プログラミングのスタイルで、データの変換やフィルタリングを簡潔に記述できる。

```java
import java.util.*;
import java.util.stream.*;

// 0~4の値のリスト
List<Integer> range = IntStream.range(0, 5)
    .boxed()
    .collect(Collectors.toList());
System.out.println(range);  // [0, 1, 2, 3, 4]

// 0~40, 公差3の等差数列
List<Integer> arithmetic = IntStream.iterate(0, i -> i + 3)
    .limit(14)
    .boxed()
    .collect(Collectors.toList());
System.out.println(arithmetic);  // [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39]

// 0~100のうち11の倍数
List<Integer> multiples = IntStream.range(0, 100)
    .filter(i -> i % 11 == 0)
    .boxed()
    .collect(Collectors.toList());
System.out.println(multiples);  // [0, 11, 22, 33, 44, 55, 66, 77, 88, 99]

// リストの各要素を2倍にする
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
List<Integer> doubled = numbers.stream()
    .map(i -> i * 2)
    .collect(Collectors.toList());
System.out.println(doubled);  // [2, 4, 6, 8, 10]

// 偶数のみを抽出して2乗
List<Integer> evenSquares = numbers.stream()
    .filter(i -> i % 2 == 0)
    .map(i -> i * i)
    .collect(Collectors.toList());
System.out.println(evenSquares);  // [4, 16]
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
result = [i for i in range(5)]
```

Python では**リスト内包表記**を使って、簡潔にリストを生成できる。

`[式 for 変数 in イテラブル]`または`[式 for 変数 in イテラブル if 条件]`の形式で記述する。

```python
# 0~4の値のリスト
range_list = [i for i in range(5)]
print(range_list)  # [0, 1, 2, 3, 4]

# 0~40, 公差3の等差数列
arithmetic = [i for i in range(0, 40, 3)]
print(arithmetic)  # [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39]

# 0~100のうち11の倍数
multiples = [i for i in range(100) if i % 11 == 0]
print(multiples)  # [0, 11, 22, 33, 44, 55, 66, 77, 88, 99]

# リストの各要素を2倍にする
numbers = [1, 2, 3, 4, 5]
doubled = [i * 2 for i in numbers]
print(doubled)  # [2, 4, 6, 8, 10]

# 偶数のみを抽出して2乗
even_squares = [i * i for i in numbers if i % 2 == 0]
print(even_squares)  # [4, 16]

# ネストしたリスト内包表記（2次元リスト）
matrix = [[i * j for j in range(1, 4)] for i in range(1, 4)]
print(matrix)  # [[1, 2, 3], [2, 4, 6], [3, 6, 9]]

# 複数のリストから組み合わせを作成
colors = ["red", "blue"]
sizes = ["S", "M"]
combinations = [f"{color}-{size}" for color in colors for size in sizes]
print(combinations)  # ['red-S', 'red-M', 'blue-S', 'blue-M']
```

**辞書内包表記とセット内包表記**:

```python
# 辞書内包表記
squares_dict = {i: i * i for i in range(5)}
print(squares_dict)  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# セット内包表記
even_set = {i for i in range(10) if i % 2 == 0}
print(even_set)  # {0, 2, 4, 6, 8}
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
let result = Array.from({ length: 5 }, (_, i) => i);
```

JavaScript には**リスト内包表記は存在しない**が、**配列メソッド**（`map()`, `filter()`など）や**Array.from()**を使って同様の処理を実現できる。

```javascript
// 0~4の値のリスト
let range = Array.from({ length: 5 }, (_, i) => i);
console.log(range); // [0, 1, 2, 3, 4]

// または [...Array(5).keys()]
let range2 = [...Array(5).keys()];
console.log(range2); // [0, 1, 2, 3, 4]

// 0~40, 公差3の等差数列
let arithmetic = Array.from({ length: 14 }, (_, i) => i * 3);
console.log(arithmetic); // [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39]

// 0~100のうち11の倍数
let multiples = Array.from({ length: 100 }, (_, i) => i).filter(
  (i) => i % 11 === 0
);
console.log(multiples); // [0, 11, 22, 33, 44, 55, 66, 77, 88, 99]

// リストの各要素を2倍にする
let numbers = [1, 2, 3, 4, 5];
let doubled = numbers.map((i) => i * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// 偶数のみを抽出して2乗
let evenSquares = numbers.filter((i) => i % 2 === 0).map((i) => i * i);
console.log(evenSquares); // [4, 16]

// メソッドチェーンで複雑な処理
let result = Array.from({ length: 10 }, (_, i) => i)
  .filter((i) => i > 2)
  .map((i) => i * i)
  .filter((i) => i < 50);
console.log(result); // [9, 16, 25, 36, 49]
```

**flatMap()を使ったネスト処理**:

```javascript
let colors = ["red", "blue"];
let sizes = ["S", "M"];
let combinations = colors.flatMap((color) =>
  sizes.map((size) => `${color}-${size}`)
);
console.log(combinations); // ['red-S', 'red-M', 'blue-S', 'blue-M']
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
// リスト内包表記は存在しない
result := []int{0, 1, 2, 3, 4}
```

Go には**リスト内包表記は存在しない**。明示的な`for`ループを使う必要がある。

ただし、ループで簡潔に記述できる。

```go
import "fmt"

// 0~4の値のスライス
func makeRange(n int) []int {
    result := make([]int, n)
    for i := 0; i < n; i++ {
        result[i] = i
    }
    return result
}
rangeSlice := makeRange(5)
fmt.Println(rangeSlice)  // [0 1 2 3 4]

// 0~40, 公差3の等差数列
arithmetic := []int{}
for i := 0; i < 40; i += 3 {
    arithmetic = append(arithmetic, i)
}
fmt.Println(arithmetic)  // [0 3 6 9 12 15 18 21 24 27 30 33 36 39]

// 0~100のうち11の倍数
multiples := []int{}
for i := 0; i < 100; i++ {
    if i%11 == 0 {
        multiples = append(multiples, i)
    }
}
fmt.Println(multiples)  // [0 11 22 33 44 55 66 77 88 99]

// スライスの各要素を2倍にする
numbers := []int{1, 2, 3, 4, 5}
doubled := make([]int, len(numbers))
for i, v := range numbers {
    doubled[i] = v * 2
}
fmt.Println(doubled)  // [2 4 6 8 10]

// 偶数のみを抽出して2乗
evenSquares := []int{}
for _, v := range numbers {
    if v%2 == 0 {
        evenSquares = append(evenSquares, v*v)
    }
}
fmt.Println(evenSquares)  // [4 16]
```

**ヘルパー関数を定義する方法**:

汎用的な`Map`や`Filter`関数を定義することで、より関数型プログラミングに近い書き方ができる（Go 1.18+のジェネリクスを使用）。

```go
// Map関数
func Map[T, U any](slice []T, fn func(T) U) []U {
    result := make([]U, len(slice))
    for i, v := range slice {
        result[i] = fn(v)
    }
    return result
}

// Filter関数
func Filter[T any](slice []T, fn func(T) bool) []T {
    result := []T{}
    for _, v := range slice {
        if fn(v) {
            result = append(result, v)
        }
    }
    return result
}

// 使用例
numbers := []int{1, 2, 3, 4, 5}

// 各要素を2倍にする
doubled := Map(numbers, func(i int) int { return i * 2 })
fmt.Println(doubled)  // [2 4 6 8 10]

// 偶数のみを抽出
evens := Filter(numbers, func(i int) bool { return i%2 == 0 })
fmt.Println(evens)  // [2 4]

// 偶数を抽出して2乗
evenSquares := Map(
    Filter(numbers, func(i int) bool { return i%2 == 0 }),
    func(i int) int { return i * i },
)
fmt.Println(evenSquares)  // [4 16]
```

</div>
