---
title: "多次元リスト(配列)である列をキーにしてソートする"
date: "2019-10-27T07:35:30+09:00"
excerpt: "多次元リスト(配列)である列をキーにしてソートする方法"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-27T07:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

リストの中に更にリストが入っているようなリストをソートした時どうなるか？
各要素(リスト)の 0 番目の項、1 番目の...でソートしたいということは無いだろうか？
ここではその方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
list.sort((x, y) -> Integer.compare(x.get(1), y.get(1)));
```

Java では**list.sort()**または**Collections.sort()**に**Comparator**を渡して、ソートのキーとなる列を指定する。

Comparator にはラムダ式`(x, y) -> Integer.compare(x.get(インデックス), y.get(インデックス))`を使用する。

```java
import java.util.*;

// [[名前, 年齢], ...]の形式のリスト
List<List<Object>> people = Arrays.asList(
    Arrays.asList("Alice", 30),
    Arrays.asList("Bob", 25),
    Arrays.asList("Charlie", 35)
);
System.out.println("ソート前: " + people);
// [[Alice, 30], [Bob, 25], [Charlie, 35]]

// 1番目の要素（年齢）でソート
people.sort((x, y) -> Integer.compare((Integer)x.get(1), (Integer)y.get(1)));
System.out.println("ソート後: " + people);
// [[Bob, 25], [Alice, 30], [Charlie, 35]]
```

**数値のみの 2 次元リストの場合**:

```java
List<List<Integer>> matrix = Arrays.asList(
    Arrays.asList(3, 1),
    Arrays.asList(1, 2),
    Arrays.asList(2, 3)
);
System.out.println("ソート前: " + matrix);
// [[3, 1], [1, 2], [2, 3]]

// 1番目の要素でソート
matrix.sort((x, y) -> Integer.compare(x.get(1), y.get(1)));
System.out.println("ソート後: " + matrix);
// [[3, 1], [1, 2], [2, 3]]

// 0番目の要素でソート
matrix.sort((x, y) -> Integer.compare(x.get(0), y.get(0)));
System.out.println("0番目でソート: " + matrix);
// [[1, 2], [2, 3], [3, 1]]
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
my_list.sort(key=lambda x: x[1])
```

Python では**sort()**または**sorted()**に**key**引数を指定して、ソートのキーとなる列を指定する。

`key=lambda x: x[インデックス]`の形式でソートキーを指定する。

```python
# [["名前", 年齢], ...]の形式のリスト
people = [["Alice", 30], ["Bob", 25], ["Charlie", 35]]
print("ソート前:", people)
# [['Alice', 30], ['Bob', 25], ['Charlie', 35]]

# 1番目の要素（年齢）でソート（破壊的）
people.sort(key=lambda x: x[1])
print("ソート後:", people)
# [['Bob', 25], ['Alice', 30], ['Charlie', 35]]

# sorted()を使う非破壊的な方法
people = [["Alice", 30], ["Bob", 25], ["Charlie", 35]]
sorted_people = sorted(people, key=lambda x: x[1])
print("元のリスト:", people)  # [['Alice', 30], ['Bob', 25], ['Charlie', 35]]
print("ソート済み:", sorted_people)  # [['Bob', 25], ['Alice', 30], ['Charlie', 35]]
```

**数値のみの 2 次元リストの場合**:

```python
matrix = [[3, 1], [1, 2], [2, 3]]
print("ソート前:", matrix)  # [[3, 1], [1, 2], [2, 3]]

# 1番目の要素でソート
matrix.sort(key=lambda x: x[1])
print("ソート後:", matrix)  # [[3, 1], [1, 2], [2, 3]]

# 0番目の要素でソート
matrix.sort(key=lambda x: x[0])
print("0番目でソート:", matrix)  # [[1, 2], [2, 3], [3, 1]]
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
arr.sort((a, b) => a[1] - b[1]);
```

JavaScript では**sort()**に比較関数を渡して、ソートのキーとなる列を指定する。

比較関数は`(a, b) => a[インデックス] - b[インデックス]`の形式で記述する。

```javascript
// [["名前", 年齢], ...]の形式の配列
let people = [
  ["Alice", 30],
  ["Bob", 25],
  ["Charlie", 35],
];
console.log("ソート前:", people);
// [['Alice', 30], ['Bob', 25], ['Charlie', 35]]

// 1番目の要素（年齢）でソート
people.sort((a, b) => a[1] - b[1]);
console.log("ソート後:", people);
// [['Bob', 25], ['Alice', 30], ['Charlie', 35]]
```

**数値のみの 2 次元配列の場合**:

```javascript
let matrix = [
  [3, 1],
  [1, 2],
  [2, 3],
];
console.log("ソート前:", matrix); // [[3, 1], [1, 2], [2, 3]]

// 1番目の要素でソート
matrix.sort((a, b) => a[1] - b[1]);
console.log("ソート後:", matrix); // [[3, 1], [1, 2], [2, 3]]

// 0番目の要素でソート
matrix.sort((a, b) => a[0] - b[0]);
console.log("0番目でソート:", matrix); // [[1, 2], [2, 3], [3, 1]]
```

**文字列でソートする場合**:

文字列の比較には`localeCompare()`を使用する。

```javascript
let people = [
  ["Alice", 30],
  ["Charlie", 25],
  ["Bob", 35],
];
// 0番目の要素（名前）でソート
people.sort((a, b) => a[0].localeCompare(b[0]));
console.log(people); // [['Alice', 30], ['Bob', 35], ['Charlie', 25]]
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
sort.Slice(slice, func(i, j int) bool {
    return slice[i][1] < slice[j][1]
})
```

Go では**sort.Slice()**に比較関数を渡して、ソートのキーとなる列を指定する。

比較関数で`slice[i][インデックス] < slice[j][インデックス]`を返すように記述する。

```go
import (
    "fmt"
    "sort"
)

// [][]interface{} の形式のスライス
type Person struct {
    Name string
    Age  int
}

people := []Person{
    {"Alice", 30},
    {"Bob", 25},
    {"Charlie", 35},
}
fmt.Println("ソート前:", people)
// [{Alice 30} {Bob 25} {Charlie 35}]

// Ageフィールドでソート
sort.Slice(people, func(i, j int) bool {
    return people[i].Age < people[j].Age
})
fmt.Println("ソート後:", people)
// [{Bob 25} {Alice 30} {Charlie 35}]
```

**数値のみの 2 次元スライスの場合**:

```go
matrix := [][]int{
    {3, 1},
    {1, 2},
    {2, 3},
}
fmt.Println("ソート前:", matrix) // [[3 1] [1 2] [2 3]]

// 1番目の要素でソート
sort.Slice(matrix, func(i, j int) bool {
    return matrix[i][1] < matrix[j][1]
})
fmt.Println("ソート後:", matrix) // [[3 1] [1 2] [2 3]]

// 0番目の要素でソート
sort.Slice(matrix, func(i, j int) bool {
    return matrix[i][0] < matrix[j][0]
})
fmt.Println("0番目でソート:", matrix) // [[1 2] [2 3] [3 1]]
```

**文字列でソートする場合**:

```go
type Person struct {
    Name string
    Age  int
}

people := []Person{
    {"Alice", 30},
    {"Charlie", 25},
    {"Bob", 35},
}

// Nameフィールドでソート
sort.Slice(people, func(i, j int) bool {
    return people[i].Name < people[j].Name
})
fmt.Println(people)
// [{Alice 30} {Bob 35} {Charlie 25}]
```

**降順でソートする場合**:

比較関数の不等号を逆にする（`<` → `>`）。

```go
matrix := [][]int{{3, 1}, {1, 2}, {2, 3}}

// 1番目の要素で降順ソート
sort.Slice(matrix, func(i, j int) bool {
    return matrix[i][1] > matrix[j][1]
})
fmt.Println(matrix) // [[2 3] [1 2] [3 1]]
```

</div>
