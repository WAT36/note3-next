---
title: "リストの指定したインデックスの要素を削除する"
date: "2019-10-27T00:35:30+09:00"
excerpt: "リストの指定したインデックスの要素を削除する方法。"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-27T00:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

リストの指定した位置の要素を削除する方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
List<Integer> list = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));
list.remove(2);  // インデックス2を削除 → [1, 2, 4, 5]
```

Java では**remove()**メソッドで指定したインデックスの要素を削除する（破壊的）。

削除された要素を返し、後続の要素は左に移動する。

```java
List<Integer> list = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));
System.out.println(list);  // [1, 2, 3, 4, 5]

int removed = list.remove(2);  // インデックス2を削除
System.out.println(removed);   // 3（削除された要素）
System.out.println(list);      // [1, 2, 4, 5]
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
my_list = [1, 2, 3, 4, 5]
my_list.pop(2)  # または del my_list[2]
```

Python では**pop()**または**del**で指定したインデックスの要素を削除する（破壊的）。

- **pop()**: 削除された要素を返す
- **del**: 返り値なし

```python
my_list = [1, 2, 3, 4, 5]
print(my_list)  # [1, 2, 3, 4, 5]

removed = my_list.pop(2)  # インデックス2を削除
print(removed)            # 3（削除された要素）
print(my_list)            # [1, 2, 4, 5]

# del文を使う場合（返り値なし）
my_list2 = [1, 2, 3, 4, 5]
del my_list2[2]
print(my_list2)  # [1, 2, 4, 5]
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
let arr = [1, 2, 3, 4, 5];
arr.splice(2, 1); // インデックス2を削除 → [1, 2, 4, 5]
```

JavaScript では**splice()**で指定したインデックスの要素を削除する（破壊的）。

先頭・末尾の削除には**shift()**、**pop()**も使える。

```javascript
let arr = [1, 2, 3, 4, 5];
console.log(arr); // [1, 2, 3, 4, 5]

// 指定したインデックスの要素を削除
let removed = arr.splice(2, 1); // インデックス2から1個削除
console.log(removed); // [3]（削除された要素の配列）
console.log(arr); // [1, 2, 4, 5]

// 先頭の要素を削除
let arr2 = [1, 2, 3, 4, 5];
let first = arr2.shift();
console.log(first); // 1
console.log(arr2); // [2, 3, 4, 5]

// 末尾の要素を削除
let arr3 = [1, 2, 3, 4, 5];
let last = arr3.pop();
console.log(last); // 5
console.log(arr3); // [1, 2, 3, 4]
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
slice := []int{1, 2, 3, 4, 5}
slice = append(slice[:2], slice[3:]...)  // インデックス2を削除
```

Go では**append()**と**スライス式**を組み合わせて指定したインデックスの要素を削除する。

削除前のインデックスより前の部分と後の部分を結合する。

```go
slice := []int{1, 2, 3, 4, 5}
fmt.Println(slice)  // [1 2 3 4 5]

// インデックス2の要素を削除
index := 2
slice = append(slice[:index], slice[index+1:]...)
fmt.Println(slice)  // [1 2 4 5]

// 削除する要素を保存する場合
slice2 := []int{1, 2, 3, 4, 5}
removed := slice2[2]
slice2 = append(slice2[:2], slice2[3:]...)
fmt.Println(removed)  // 3
fmt.Println(slice2)   // [1 2 4 5]

// 順序を保たなくて良い場合（高速）
slice3 := []int{1, 2, 3, 4, 5}
slice3[2] = slice3[len(slice3)-1]  // 最後の要素を削除位置にコピー
slice3 = slice3[:len(slice3)-1]    // 末尾を削除
fmt.Println(slice3)  // [1 2 5 4]
```

</div>
