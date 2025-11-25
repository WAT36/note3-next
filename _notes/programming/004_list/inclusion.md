---
title: "リストから条件に合う要素のみを取得した新しいリストを作成する"
date: "2019-10-27T06:35:30+09:00"
excerpt: "リストから条件に合う要素のみを取得した新しいリストを作成する"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-27T06:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

リストから条件に合う要素のみを取得した新しいリストを作成する方法を示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
List<String> result = list.stream()
    .filter(s -> s.length() >= 3)
    .collect(Collectors.toList());
```

Java では**Stream API**の**filter()**を使って条件に合う要素のみを取得できる。

`filter()`にラムダ式で条件を指定し、`collect()`で新しいリストに変換する。

```java
import java.util.*;
import java.util.stream.*;

List<String> list = Arrays.asList("a", "bb", "ccc", "dddd");
System.out.println(list);  // [a, bb, ccc, dddd]

// 3文字以上の要素のみを取得
List<String> result = list.stream()
    .filter(s -> s.length() >= 3)
    .collect(Collectors.toList());
System.out.println(result);  // [ccc, dddd]
```

**従来の方法（ループを使う）**:

```java
List<String> list = Arrays.asList("a", "bb", "ccc", "dddd");
List<String> result = new ArrayList<>();
for (String s : list) {
    if (s.length() >= 3) {
        result.add(s);
    }
}
System.out.println(result);  // [ccc, dddd]
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
result = [s for s in my_list if len(s) >= 3]
```

Python では**リスト内包表記**で条件に合う要素のみを取得できる。

`[要素 for 要素 in リスト if 条件]`の形式で記述する。

```python
my_list = ["a", "bb", "ccc", "dddd"]
print(my_list)  # ['a', 'bb', 'ccc', 'dddd']

# 3文字以上の要素のみを取得
result = [s for s in my_list if len(s) >= 3]
print(result)  # ['ccc', 'dddd']

# 数値の例：奇数のみを取得
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
odds = [n for n in numbers if n % 2 == 1]
print(odds)  # [1, 3, 5, 7, 9]
```

**filter()を使う方法**:

```python
my_list = ["a", "bb", "ccc", "dddd"]
result = list(filter(lambda s: len(s) >= 3, my_list))
print(result)  # ['ccc', 'dddd']
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
let result = arr.filter((s) => s.length >= 3);
```

JavaScript では**filter()**で条件に合う要素のみを取得できる。

`filter()`にコールバック関数を渡し、条件を満たす要素が`true`を返すようにする。

```javascript
let arr = ["a", "bb", "ccc", "dddd"];
console.log(arr); // ['a', 'bb', 'ccc', 'dddd']

// 3文字以上の要素のみを取得
let result = arr.filter((s) => s.length >= 3);
console.log(result); // ['ccc', 'dddd']

// 数値の例：奇数のみを取得
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let odds = numbers.filter((n) => n % 2 !== 0);
console.log(odds); // [1, 3, 5, 7, 9]
```

コールバック関数は`(要素, インデックス, 配列)`の 3 つの引数を受け取れるが、使用しない引数は省略できる。

```javascript
// インデックスも使う例：偶数インデックスの要素のみ取得
let arr = ["a", "b", "c", "d", "e"];
let result = arr.filter((value, index) => index % 2 === 0);
console.log(result); // ['a', 'c', 'e']
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
result := []string{}
for _, s := range slice {
    if len(s) >= 3 {
        result = append(result, s)
    }
}
```

Go では**for range**ループで条件に合う要素のみを新しいスライスに追加する。

条件を満たす要素を`append()`で新しいスライスに追加していく。

```go
slice := []string{"a", "bb", "ccc", "dddd"}
fmt.Println(slice)  // [a bb ccc dddd]

// 3文字以上の要素のみを取得
result := []string{}
for _, s := range slice {
    if len(s) >= 3 {
        result = append(result, s)
    }
}
fmt.Println(result)  // [ccc dddd]

// 数値の例：奇数のみを取得
numbers := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
odds := []int{}
for _, n := range numbers {
    if n%2 != 0 {
        odds = append(odds, n)
    }
}
fmt.Println(odds)  // [1 3 5 7 9]
```

**slices.DeleteFunc()を使う方法（Go 1.21+）**:

元のスライスを破壊的に変更するが、より簡潔に書ける。

```go
import "slices"

slice := []string{"a", "bb", "ccc", "dddd"}
// 3文字未満の要素を削除（3文字以上を残す）
result := slices.DeleteFunc(slice, func(s string) bool {
    return len(s) < 3
})
fmt.Println(result)  // [ccc dddd]
```

注意：`slices.DeleteFunc()`は元のスライスを変更するため、元のスライスを保持したい場合は事前にコピーする必要がある。

</div>
