---
title: "指定した要素がリスト内にあるか調べる"
date: "2019-10-27T03:35:30+09:00"
excerpt: "指定した要素がリスト内にあるか調べる方法。"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-27T03:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

ある要素がリスト内に存在するかを調べる方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
List<Integer> list = Arrays.asList(1, 2, 3, 4, 5);
boolean exists = list.contains(3);  // true
```

Java では**contains()**で指定した要素がリスト内に存在するか調べる。

要素が存在すれば`true`、存在しなければ`false`を返す。

```java
List<Integer> list = Arrays.asList(1, 2, 3, 4, 5);
System.out.println(list);  // [1, 2, 3, 4, 5]

boolean exists1 = list.contains(3);
System.out.println(exists1);  // true

boolean exists2 = list.contains(10);
System.out.println(exists2);  // false

// 文字列のリストの場合
List<String> strList = Arrays.asList("a", "b", "c");
boolean exists3 = strList.contains("b");
System.out.println(exists3);  // true
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
my_list = [1, 2, 3, 4, 5]
exists = 3 in my_list  # True
```

Python では**in**演算子で指定した要素がリスト内に存在するか調べる。

要素が存在すれば`True`、存在しなければ`False`を返す。

```python
my_list = [1, 2, 3, 4, 5]
print(my_list)  # [1, 2, 3, 4, 5]

exists1 = 3 in my_list
print(exists1)  # True

exists2 = 10 in my_list
print(exists2)  # False

# not inで存在しないことを確認
not_exists = 10 not in my_list
print(not_exists)  # True
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
let arr = [1, 2, 3, 4, 5];
let exists = arr.includes(3); // true
```

JavaScript では**includes()**で指定した要素が配列内に存在するか調べる。

要素が存在すれば`true`、存在しなければ`false`を返す。

```javascript
let arr = [1, 2, 3, 4, 5];
console.log(arr); // [1, 2, 3, 4, 5]

let exists1 = arr.includes(3);
console.log(exists1); // true

let exists2 = arr.includes(10);
console.log(exists2); // false

// 文字列の配列の場合
let strArr = ["a", "b", "c"];
let exists3 = strArr.includes("b");
console.log(exists3); // true

// indexOf()を使う方法（古い方法）
let exists4 = arr.indexOf(3) !== -1;
console.log(exists4); // true
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
slice := []int{1, 2, 3, 4, 5}
exists := false
for _, v := range slice {
    if v == 3 {
        exists = true
        break
    }
}
```

Go では**for range**ループで要素を調べるか、**slices.Contains()**（Go 1.21+）を使う。

標準ライブラリの`slices`パッケージ（Go 1.21 以降）に便利な関数がある。

```go
import (
    "fmt"
    "slices"  // Go 1.21+
)

slice := []int{1, 2, 3, 4, 5}
fmt.Println(slice)  // [1 2 3 4 5]

// slices.Contains()を使う方法（Go 1.21+）
exists1 := slices.Contains(slice, 3)
fmt.Println(exists1)  // true

exists2 := slices.Contains(slice, 10)
fmt.Println(exists2)  // false

// for rangeを使う方法（すべてのバージョン）
exists3 := false
for _, v := range slice {
    if v == 3 {
        exists3 = true
        break
    }
}
fmt.Println(exists3)  // true

// 汎用関数として定義する場合
func contains[T comparable](slice []T, target T) bool {
    for _, v := range slice {
        if v == target {
            return true
        }
    }
    return false
}

exists4 := contains(slice, 3)
fmt.Println(exists4)  // true
```

</div>
