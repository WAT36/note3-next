---
title: "配列・リストの長さ"
date: "2019-10-22T19:35:30+09:00"
excerpt: "配列・リストの長さ(要素数)を調べる方法。"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-22T19:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

配列・リストの長さ（＝配列・リストに入っているデータの個数）を取得する方法を示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
int[] arr = {1, 2, 3};
List<Integer> list = Arrays.asList(1, 2, 3);

arr.length;    // 3
list.size();   // 3
```

Java では配列には**length**プロパティ、リストには**size()**メソッドがある。

- **配列**: `arr.length` で要素数を取得
- **リスト**: `list.size()` で要素数を取得

```java
int[] arr = {1, 2, 3, 4, 5};
System.out.println(arr.length);  // 5

List<Integer> list = new ArrayList<>(Arrays.asList(1, 2, 3));
System.out.println(list.size()); // 3
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
arr = [1, 2, 3]

len(arr)  # 3
```

Python では組み込み関数**len()**でリストの長さを取得する。

```python
arr = [1, 2, 3, 4, 5]
print(len(arr))  # 5

# 多次元リストの場合
matrix = [[1, 2], [3, 4], [5, 6]]
print(len(matrix))     # 3（行数）
print(len(matrix[0]))  # 2（列数）
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
let arr = [1, 2, 3];

arr.length; // 3
```

JavaScript では Array オブジェクトの**length**プロパティで配列の長さを取得する。

```javascript
let arr = [1, 2, 3, 4, 5];
console.log(arr.length); // 5

// 多次元配列の場合
let matrix = [
  [1, 2],
  [3, 4],
  [5, 6],
];
console.log(matrix.length); // 3（行数）
console.log(matrix[0].length); // 2（列数）
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
arr := []int{1, 2, 3}

len(arr)  // 3
```

Go では組み込み関数**len()**で配列・スライスの長さを取得する。

配列、スライスどちらにも利用できる。

```go
arr := [5]int{1, 2, 3, 4, 5}
fmt.Println(len(arr))  // 5

slice := []int{1, 2, 3}
fmt.Println(len(slice))  // 3

// 多次元スライスの場合
matrix := [][]int{{1, 2}, {3, 4}, {5, 6}}
fmt.Println(len(matrix))     // 3（行数）
fmt.Println(len(matrix[0]))  // 2（列数）
```

</div>
