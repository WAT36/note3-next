---
title: "リストが空であるか判別する"
date: "2019-10-27T11:35:30+09:00"
excerpt: "リストが空であるか判別する方法"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-27T11:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

リストが空（＝要素が何も入っていない状態）であるか判別する方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
boolean isEmpty = list.isEmpty();
```

Java では**isEmpty()**でリストが空かどうかを判別できる。

空の場合は`true`、要素がある場合は`false`を返す。

```java
import java.util.*;

// 空のリスト
List<Integer> emptyList = new ArrayList<>();
System.out.println(emptyList.isEmpty()); // true
System.out.println("要素数: " + emptyList.size()); // 0

// 要素があるリスト
List<Integer> numbers = Arrays.asList(1, 2, 3);
System.out.println(numbers.isEmpty()); // false
System.out.println("要素数: " + numbers.size()); // 3

// 条件分岐での使用
if (emptyList.isEmpty()) {
    System.out.println("リストは空です");
} else {
    System.out.println("リストに要素があります");
}
// リストは空です
```

**size()を使った判別**:

```java
List<Integer> list = new ArrayList<>();
boolean isEmpty = list.size() == 0;
System.out.println(isEmpty); // true
```

ただし、`isEmpty()`の方が意図が明確なため推奨される。

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
if not my_list:
    # 空の場合の処理
```

Python では**リストを直接 bool 値として評価**することで空かどうかを判別できる。

空のリストは`False`、要素があるリストは`True`と評価される。

```python
# 空のリスト
empty_list = []
print(bool(empty_list))  # False
print(not empty_list)    # True

# 要素があるリスト
numbers = [1, 2, 3]
print(bool(numbers))     # True
print(not numbers)       # False

# Pythonicな書き方（推奨）
if not empty_list:
    print("リストは空です")
# リストは空です

if numbers:
    print("リストに要素があります")
# リストに要素があります
```

**len()を使った判別**:

```python
empty_list = []
numbers = [1, 2, 3]

print(len(empty_list) == 0)  # True
print(len(numbers) == 0)     # False

# 条件分岐での使用
if len(empty_list) == 0:
    print("リストは空です")
# リストは空です
```

ただし、Python では`if not list:`の方が簡潔で慣用的とされる。

**明示的な比較**:

```python
empty_list = []

# 空リストとの比較（非推奨）
if empty_list == []:
    print("リストは空です")

# not を使う方法（推奨）
if not empty_list:
    print("リストは空です")
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
let isEmpty = arr.length === 0;
```

JavaScript では**length**プロパティで配列の長さを取得し、`0`と比較することで空かどうかを判別できる。

```javascript
// 空の配列
let emptyArr = [];
console.log(emptyArr.length === 0); // true
console.log(emptyArr.length); // 0

// 要素がある配列
let numbers = [1, 2, 3];
console.log(numbers.length === 0); // false
console.log(numbers.length); // 3

// 条件分岐での使用
if (emptyArr.length === 0) {
  console.log("配列は空です");
}
// 配列は空です

if (numbers.length > 0) {
  console.log("配列に要素があります");
}
// 配列に要素があります
```

**真偽値として評価する方法**:

JavaScript では配列の`length`を真偽値として評価できる。

```javascript
let emptyArr = [];
let numbers = [1, 2, 3];

// lengthを真偽値として評価
if (!emptyArr.length) {
  console.log("配列は空です");
}
// 配列は空です

if (numbers.length) {
  console.log("配列に要素があります");
}
// 配列に要素があります
```

**三項演算子での使用**:

```javascript
let arr = [];
let message = arr.length === 0 ? "空です" : "要素があります";
console.log(`配列は${message}`); // 配列は空です
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
isEmpty := len(slice) == 0
```

Go では**len()**でスライスの長さを取得し、`0`と比較することで空かどうかを判別できる。

```go
import "fmt"

// 空のスライス
emptySlice := []int{}
fmt.Println(len(emptySlice) == 0) // true
fmt.Println(len(emptySlice))      // 0

// 要素があるスライス
numbers := []int{1, 2, 3}
fmt.Println(len(numbers) == 0)    // false
fmt.Println(len(numbers))         // 3

// 条件分岐での使用
if len(emptySlice) == 0 {
    fmt.Println("スライスは空です")
}
// スライスは空です

if len(numbers) > 0 {
    fmt.Println("スライスに要素があります")
}
// スライスに要素があります
```

**nil スライスとの違い**:

Go では空のスライスと`nil`スライスは異なるが、`len()`はどちらも`0`を返す。

```go
// nilスライス
var nilSlice []int
fmt.Println(nilSlice == nil)    // true
fmt.Println(len(nilSlice) == 0) // true

// 空のスライス（初期化済み）
emptySlice := []int{}
fmt.Println(emptySlice == nil)  // false
fmt.Println(len(emptySlice) == 0) // true

// makeで作成した空のスライス
madeSlice := make([]int, 0)
fmt.Println(madeSlice == nil)   // false
fmt.Println(len(madeSlice) == 0) // true
```

**nil チェックが必要な場合**:

スライスが`nil`かどうかも確認したい場合。

```go
var slice []int

if slice == nil {
    fmt.Println("スライスはnilです")
}
// スライスはnilです

// nilでも長さは0
fmt.Println(len(slice)) // 0

// 空かどうかだけを判定する場合は len() で十分
if len(slice) == 0 {
    fmt.Println("スライスは空です（nilまたは要素なし）")
}
// スライスは空です（nilまたは要素なし）
```

**真偽値として評価**:

Go ではスライス自体を真偽値として評価できないため、`len()`を使う。

```go
slice := []int{}

// これはできない（コンパイルエラー）
// if slice { ... }

// len()を使う必要がある
if len(slice) == 0 {
    fmt.Println("スライスは空です")
}
```

**実用的な例**:

```go
func processSlice(data []string) {
    if len(data) == 0 {
        fmt.Println("データがありません")
        return
    }

    fmt.Printf("%d個の要素を処理します\n", len(data))
    for _, item := range data {
        fmt.Println(item)
    }
}

emptyData := []string{}
processSlice(emptyData) // データがありません

data := []string{"a", "b", "c"}
processSlice(data)
// 3個の要素を処理します
// a
// b
// c
```

</div>
