---
title: "リスト内の指定した２要素を入れ替える"
date: "2019-10-27T04:35:30+09:00"
excerpt: "リスト内の指定した２要素を入れ替える方法。"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-27T04:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

リストの指定した２つの位置の要素を入れ替える方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
List<Integer> list = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));
Collections.swap(list, 0, 2);  // インデックス0と2を入れ替え
```

Java では**Collections.swap()**で指定した 2 つのインデックスの要素を入れ替える（破壊的）。

`Collections.swap(list, i, j)`でインデックス`i`と`j`の要素を交換する。

```java
List<Integer> list = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));
System.out.println(list);  // [1, 2, 3, 4, 5]

Collections.swap(list, 0, 2);  // インデックス0と2を入れ替え
System.out.println(list);      // [3, 2, 1, 4, 5]

Collections.swap(list, 1, 4);  // インデックス1と4を入れ替え
System.out.println(list);      // [3, 5, 1, 4, 2]
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
my_list = [1, 2, 3, 4, 5]
my_list[0], my_list[2] = my_list[2], my_list[0]  # インデックス0と2を入れ替え
```

Python では**多重代入**で指定した 2 つのインデックスの要素を入れ替える（破壊的）。

`list[i], list[j] = list[j], list[i]`でインデックス`i`と`j`の要素を交換する。

```python
my_list = [1, 2, 3, 4, 5]
print(my_list)  # [1, 2, 3, 4, 5]

my_list[0], my_list[2] = my_list[2], my_list[0]  # インデックス0と2を入れ替え
print(my_list)  # [3, 2, 1, 4, 5]

my_list[1], my_list[4] = my_list[4], my_list[1]  # インデックス1と4を入れ替え
print(my_list)  # [3, 5, 1, 4, 2]
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
let arr = [1, 2, 3, 4, 5];
[arr[0], arr[2]] = [arr[2], arr[0]]; // インデックス0と2を入れ替え
```

JavaScript では**分割代入**で指定した 2 つのインデックスの要素を入れ替える（破壊的）。

`[arr[i], arr[j]] = [arr[j], arr[i]]`でインデックス`i`と`j`の要素を交換する。

```javascript
let arr = [1, 2, 3, 4, 5];
console.log(arr); // [1, 2, 3, 4, 5]

[arr[0], arr[2]] = [arr[2], arr[0]]; // インデックス0と2を入れ替え
console.log(arr); // [3, 2, 1, 4, 5]

[arr[1], arr[4]] = [arr[4], arr[1]]; // インデックス1と4を入れ替え
console.log(arr); // [3, 5, 1, 4, 2]

// 従来の方法（一時変数を使う）
let arr2 = [1, 2, 3, 4, 5];
let temp = arr2[0];
arr2[0] = arr2[2];
arr2[2] = temp;
console.log(arr2); // [3, 2, 1, 4, 5]
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
slice := []int{1, 2, 3, 4, 5}
slice[0], slice[2] = slice[2], slice[0]  // インデックス0と2を入れ替え
```

Go では**多重代入**で指定した 2 つのインデックスの要素を入れ替える（破壊的）。

`slice[i], slice[j] = slice[j], slice[i]`でインデックス`i`と`j`の要素を交換する。

```go
slice := []int{1, 2, 3, 4, 5}
fmt.Println(slice)  // [1 2 3 4 5]

slice[0], slice[2] = slice[2], slice[0]  // インデックス0と2を入れ替え
fmt.Println(slice)  // [3 2 1 4 5]

slice[1], slice[4] = slice[4], slice[1]  // インデックス1と4を入れ替え
fmt.Println(slice)  // [3 5 1 4 2]

// 配列でも同様
arr := [5]int{1, 2, 3, 4, 5}
arr[0], arr[2] = arr[2], arr[0]
fmt.Println(arr)  // [3 2 1 4 5]
```

</div>
