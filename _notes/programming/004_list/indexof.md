---
title: "指定した要素のリスト内でのインデックスを調べる"
date: "2019-10-27T08:35:30+09:00"
excerpt: "指定した要素のリスト内でのインデックスを調べる方法"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-27T08:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

指定した要素がリスト内でどの位置にいるかを調べる方法を示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
int index = list.indexOf("要素");
```

Java では**indexOf()**で指定した要素の最初のインデックスを取得できる。

要素が複数ある場合は最初のインデックスを返す。見つからない場合は`-1`を返す。

```java
import java.util.*;

List<String> list = Arrays.asList("a", "b", "c", "b", "a");
System.out.println(list); // [a, b, c, b, a]

// 先頭から検索
int index1 = list.indexOf("b");
System.out.println(index1); // 1

// 要素が見つからない場合
int index2 = list.indexOf("z");
System.out.println(index2); // -1

// 末尾から検索
int index3 = list.lastIndexOf("b");
System.out.println(index3); // 3

int index4 = list.lastIndexOf("a");
System.out.println(index4); // 4
```

**見つからない場合のチェック**:

```java
List<String> list = Arrays.asList("a", "b", "c");
int index = list.indexOf("z");

if (index == -1) {
    System.out.println("要素が見つかりません");
} else {
    System.out.println("インデックス: " + index);
}
// 要素が見つかりません
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
index = my_list.index("要素")
```

Python では**index()**で指定した要素の最初のインデックスを取得できる。

要素が複数ある場合は最初のインデックスを返す。見つからない場合は`ValueError`が発生する。

```python
my_list = ["a", "b", "c", "b", "a"]
print(my_list)  # ['a', 'b', 'c', 'b', 'a']

# 先頭から検索
index1 = my_list.index("b")
print(index1)  # 1

# 指定位置から検索（第2引数: 開始位置）
index2 = my_list.index("b", 2)  # インデックス2以降で検索
print(index2)  # 3

# 範囲指定検索（第2引数: 開始位置、第3引数: 終了位置）
index3 = my_list.index("a", 0, 3)  # インデックス0〜3の範囲で検索
print(index3)  # 0
```

**見つからない場合のエラーハンドリング**:

```python
my_list = ["a", "b", "c"]

try:
    index = my_list.index("z")
    print("インデックス:", index)
except ValueError:
    print("要素が見つかりません")
# 要素が見つかりません
```

**末尾から検索する方法**:

Python には`lastIndexOf()`がないため、リストを逆順にして検索する。

```python
my_list = ["a", "b", "c", "b", "a"]

# 末尾からのインデックスを取得
reversed_index = my_list[::-1].index("b")
last_index = len(my_list) - 1 - reversed_index
print(last_index)  # 3

# または、inを使った方法
def last_index_of(lst, value):
    for i in range(len(lst) - 1, -1, -1):
        if lst[i] == value:
            return i
    raise ValueError(f"{value} is not in list")

print(last_index_of(my_list, "b"))  # 3
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
let index = arr.indexOf("要素");
```

JavaScript では**indexOf()**で指定した要素の最初のインデックスを取得できる。

要素が複数ある場合は最初のインデックスを返す。見つからない場合は`-1`を返す。

```javascript
let arr = ["a", "b", "c", "b", "a"];
console.log(arr); // ['a', 'b', 'c', 'b', 'a']

// 先頭から検索
let index1 = arr.indexOf("b");
console.log(index1); // 1

// 指定位置から検索（第2引数: 開始位置）
let index2 = arr.indexOf("b", 2); // インデックス2以降で検索
console.log(index2); // 3

// 要素が見つからない場合
let index3 = arr.indexOf("z");
console.log(index3); // -1

// 末尾から検索
let index4 = arr.lastIndexOf("b");
console.log(index4); // 3

let index5 = arr.lastIndexOf("a");
console.log(index5); // 4

// 末尾から検索（第2引数: 検索開始位置）
let index6 = arr.lastIndexOf("b", 2); // インデックス2から後ろ向きに検索
console.log(index6); // 1
```

**見つからない場合のチェック**:

```javascript
let arr = ["a", "b", "c"];
let index = arr.indexOf("z");

if (index === -1) {
  console.log("要素が見つかりません");
} else {
  console.log("インデックス:", index);
}
// 要素が見つかりません
```

**includes()を使った存在確認**:

インデックスが不要で、要素の存在のみを確認したい場合は`includes()`が便利。

```javascript
let arr = ["a", "b", "c"];
console.log(arr.includes("b")); // true
console.log(arr.includes("z")); // false
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
index := slices.Index(slice, "要素")
```

Go では**slices.Index()**（Go 1.21+）で指定した要素の最初のインデックスを取得できる。

要素が複数ある場合は最初のインデックスを返す。見つからない場合は`-1`を返す。

```go
import (
    "fmt"
    "slices"
)

slice := []string{"a", "b", "c", "b", "a"}
fmt.Println(slice) // [a b c b a]

// 先頭から検索
index1 := slices.Index(slice, "b")
fmt.Println(index1) // 1

// 要素が見つからない場合
index2 := slices.Index(slice, "z")
fmt.Println(index2) // -1
```

**Go 1.21 未満の場合（ループで実装）**:

```go
func indexOf(slice []string, target string) int {
    for i, v := range slice {
        if v == target {
            return i
        }
    }
    return -1
}

slice := []string{"a", "b", "c", "b", "a"}
index := indexOf(slice, "b")
fmt.Println(index) // 1
```

**末尾から検索する方法**:

```go
func lastIndexOf(slice []string, target string) int {
    for i := len(slice) - 1; i >= 0; i-- {
        if slice[i] == target {
            return i
        }
    }
    return -1
}

slice := []string{"a", "b", "c", "b", "a"}
lastIndex := lastIndexOf(slice, "b")
fmt.Println(lastIndex) // 3
```

**見つからない場合のチェック**:

```go
slice := []string{"a", "b", "c"}
index := slices.Index(slice, "z")

if index == -1 {
    fmt.Println("要素が見つかりません")
} else {
    fmt.Printf("インデックス: %d\n", index)
}
// 要素が見つかりません
```

**slices.Contains()を使った存在確認（Go 1.21+）**:

インデックスが不要で、要素の存在のみを確認したい場合は`slices.Contains()`が便利。

```go
slice := []string{"a", "b", "c"}
fmt.Println(slices.Contains(slice, "b")) // true
fmt.Println(slices.Contains(slice, "z")) // false
```

**数値スライスの例**:

```go
numbers := []int{1, 2, 3, 2, 1}
index := slices.Index(numbers, 2)
fmt.Println(index) // 1

lastIndex := func(slice []int, target int) int {
    for i := len(slice) - 1; i >= 0; i-- {
        if slice[i] == target {
            return i
        }
    }
    return -1
}(numbers, 2)
fmt.Println(lastIndex) // 3
```

</div>
