---
title: "多次元配列(リスト)"
date: "2019-10-19T19:35:30+09:00"
excerpt: "多次元配列(リスト)を定義する方法。"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-19T19:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

多次元配列とは、配列(リスト)の中にさらに配列(リスト)を含ませたデータ構造のことである。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
// 二次元配列
int[][] matrix = new int[3][4];
int[][] matrix2 = {{1,2}, {3,4}};

// 二次元リスト
List<List<Integer>> list = new ArrayList<>();
```

Java では**配列**（固定長）と**リスト**（可変長）の両方で多次元構造を作成できる。

配列は宣言時に各次元のサイズを指定し、リストは動的にサイズを変更可能。

```java
// 配列の操作
int[][] matrix = new int[3][4];
matrix[0][0] = 1;           // 値の代入
int value = matrix[0][0];   // 値の取得

// リストの操作
List<List<Integer>> list = new ArrayList<>();
list.add(Arrays.asList(1, 2, 3));
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
# 二次元リスト
matrix = [[0] * 4 for _ in range(3)]
matrix2 = [[1, 2], [3, 4]]
```

Python では**リストの入れ子**で多次元構造を作成する。各行の長さは異なっても構わない。

```python
# リストの操作
matrix = [[1, 2, 3], [4, 5, 6]]
matrix[0][0] = 10        # 値の代入
value = matrix[0][0]     # 値の取得

# 不規則な多次元リスト
irregular = [[1, 2], [3, 4, 5], [6]]
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

JavaScript では**配列の入れ子**で多次元構造を作成する。各行の長さは異なっても構わない。

```javascript
// 配列の操作
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
];
matrix[0][0] = 10; // 値の代入
let value = matrix[0][0]; // 値の取得

// 不規則な多次元配列
let irregular = [[1, 2], [3, 4, 5], [6]];
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
// 二次元配列
var matrix [3][4]int
matrix2 := [2][3]int{{1, 2, 3}, {4, 5, 6}}

// 二次元スライス
slice := make([][]int, 3)
for i := range slice {
    slice[i] = make([]int, 4)
}
```

Go では**配列**（固定長）と**スライス**（可変長）の両方で多次元構造を作成できる。

配列は宣言時に各次元のサイズを指定し、スライスは動的にサイズを変更可能。

```go
// 配列の操作
var matrix [3][4]int
matrix[0][0] = 1           // 値の代入
value := matrix[0][0]      // 値の取得

// スライスの操作
slice := [][]int{{1, 2}, {3, 4, 5}}
slice[0] = append(slice[0], 6) // 行に要素を追加
```

</div>
