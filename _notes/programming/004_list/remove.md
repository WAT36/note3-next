---
title: "リストの指定した要素を削除する"
date: "2019-10-27T01:35:30+09:00"
excerpt: "リストの指定した要素を削除する方法。"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-27T01:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

リストの指定した要素を削除する方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
List<String> list = new ArrayList<>(Arrays.asList("a", "b", "c", "b"));
list.remove("b");  // 最初の"b"を削除 → ["a", "c", "b"]
```

Java では**remove(Object o)**で指定した値を持つ要素を削除する（破壊的）。

複数ある場合は最初のもののみを削除する。

```java
List<String> list = new ArrayList<>(Arrays.asList("a", "b", "c", "b"));
System.out.println(list);  // [a, b, c, b]

boolean removed = list.remove("b");  // 最初の"b"を削除
System.out.println(removed);         // true（削除成功）
System.out.println(list);            // [a, c, b]

// Integer型のリストの場合の注意点
List<Integer> nums = new ArrayList<>(Arrays.asList(1, 2, 3, 2));
nums.remove(Integer.valueOf(2));  // 値"2"を削除（Integer.valueOf()が必要）
System.out.println(nums);         // [1, 3, 2]

// remove(2)だとインデックス2を削除してしまう
List<Integer> nums2 = new ArrayList<>(Arrays.asList(1, 2, 3, 2));
nums2.remove(2);  // インデックス2を削除
System.out.println(nums2);  // [1, 2, 2]
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
my_list = ["a", "b", "c", "b"]
my_list.remove("b")  # 最初の"b"を削除 → ["a", "c", "b"]
```

Python では**remove()**で指定した値を持つ要素を削除する（破壊的）。

複数ある場合は最初のもののみを削除する。存在しない値を指定すると`ValueError`が発生する。

```python
my_list = ["a", "b", "c", "b"]
print(my_list)  # ['a', 'b', 'c', 'b']

my_list.remove("b")  # 最初の"b"を削除
print(my_list)       # ['a', 'c', 'b']

# 複数の同じ値がある場合
nums = [1, 2, 3, 2, 4]
nums.remove(2)  # 最初の2を削除
print(nums)     # [1, 3, 2, 4]

# 存在しない値を削除しようとするとエラー
try:
    my_list.remove("x")
except ValueError as e:
    print(e)  # list.remove(x): x not in list
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
let arr = ["a", "b", "c", "b"];
let newArr = arr.filter((v) => v !== "b"); // 非破壊的
// または破壊的に削除
let index = arr.indexOf("b");
if (index !== -1) arr.splice(index, 1);
```

JavaScript では**filter()**で指定した値以外の要素を抽出（非破壊的）、または**indexOf()**と**splice()**を組み合わせて破壊的に削除する。

- **filter()**: 新しい配列を返す（非破壊的）
- **indexOf() + splice()**: 元の配列を変更（破壊的）

```javascript
let arr = ["a", "b", "c", "b"];
console.log(arr); // ['a', 'b', 'c', 'b']

// 非破壊的：filter()で指定値以外を抽出
let filtered = arr.filter((v) => v !== "b");
console.log(filtered); // ['a', 'c']（すべての"b"が除外される）
console.log(arr); // ['a', 'b', 'c', 'b']（元の配列は不変）

// 破壊的：最初の"b"のみを削除
let arr2 = ["a", "b", "c", "b"];
let index = arr2.indexOf("b");
if (index !== -1) {
  arr2.splice(index, 1);
}
console.log(arr2); // ['a', 'c', 'b']

// すべての"b"を破壊的に削除する場合
let arr3 = ["a", "b", "c", "b"];
while ((index = arr3.indexOf("b")) !== -1) {
  arr3.splice(index, 1);
}
console.log(arr3); // ['a', 'c']
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
slice := []string{"a", "b", "c", "b"}
// 最初の"b"を削除
for i, v := range slice {
    if v == "b" {
        slice = append(slice[:i], slice[i+1:]...)
        break
    }
}
```

Go では**for range**で要素を探し、**append()**とスライス式で削除する。

標準ライブラリには専用の関数がないため、ループで検索して削除する。

```go
slice := []string{"a", "b", "c", "b"}
fmt.Println(slice)  // [a b c b]

// 最初の"b"を削除
for i, v := range slice {
    if v == "b" {
        slice = append(slice[:i], slice[i+1:]...)
        break  // 最初の1つだけ削除
    }
}
fmt.Println(slice)  // [a c b]

// すべての"b"を削除する場合
slice2 := []string{"a", "b", "c", "b", "d"}
result := []string{}
for _, v := range slice2 {
    if v != "b" {
        result = append(result, v)
    }
}
fmt.Println(result)  // [a c d]

// または、slices.Delete()を使う方法（Go 1.21+）
// import "slices"
slice3 := []string{"a", "b", "c", "b"}
index := -1
for i, v := range slice3 {
    if v == "b" {
        index = i
        break
    }
}
if index != -1 {
    slice3 = slices.Delete(slice3, index, index+1)
}
fmt.Println(slice3)  // [a c b]
```

</div>
