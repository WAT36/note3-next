---
title: "リストの全要素を連結して１つの文字列に変換する"
date: "2019-10-27T05:35:30+09:00"
excerpt: "リストの全要素を連結して１つの文字列に変換する方法。"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-27T05:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

リストの全要素を連結して 1 つの文字列にする方法についてを示す。
なお、前提としてここでいうリスト内にある要素は全て文字列型とする。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
List<String> list = Arrays.asList("a", "b", "c");
String result = String.join("", list);  // "abc"
```

Java では**String.join()**でリストの全要素を指定したデリミタで連結する。

第 1 引数にデリミタ（区切り文字）、第 2 引数にリストを指定する。

```java
List<String> list = Arrays.asList("a", "b", "c");
System.out.println(list);  // [a, b, c]

// デリミタなしで連結
String result1 = String.join("", list);
System.out.println(result1);  // abc

// カンマで連結
String result2 = String.join(",", list);
System.out.println(result2);  // a,b,c

// スペースで連結
String result3 = String.join(" ", list);
System.out.println(result3);  // a b c
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
my_list = ["a", "b", "c"]
result = "".join(my_list)  # "abc"
```

Python では**join()**でリストの全要素を指定したデリミタで連結する。

デリミタ文字列に対して`join()`メソッドを呼び出し、引数にリストを渡す。

```python
my_list = ["a", "b", "c"]
print(my_list)  # ['a', 'b', 'c']

# デリミタなしで連結
result1 = "".join(my_list)
print(result1)  # abc

# カンマで連結
result2 = ",".join(my_list)
print(result2)  # a,b,c

# スペースで連結
result3 = " ".join(my_list)
print(result3)  # a b c
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
let arr = ["a", "b", "c"];
let result = arr.join(""); // "abc"
```

JavaScript では**join()**で配列の全要素を指定したデリミタで連結する。

引数にデリミタ（区切り文字）を指定する。省略するとカンマで連結される。

```javascript
let arr = ["a", "b", "c"];
console.log(arr); // ['a', 'b', 'c']

// デリミタなしで連結
let result1 = arr.join("");
console.log(result1); // abc

// カンマで連結
let result2 = arr.join(",");
console.log(result2); // a,b,c

// スペースで連結
let result3 = arr.join(" ");
console.log(result3); // a b c

// 省略するとカンマで連結
let result4 = arr.join();
console.log(result4); // a,b,c

// toString()を使う方法（常にカンマで連結）
let result5 = arr.toString();
console.log(result5); // a,b,c
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
slice := []string{"a", "b", "c"}
result := strings.Join(slice, "")  // "abc"
```

Go では**strings.Join()**でスライスの全要素を指定したデリミタで連結する。

第 1 引数にスライス、第 2 引数にデリミタ（区切り文字）を指定する。

```go
import (
    "fmt"
    "strings"
)

slice := []string{"a", "b", "c"}
fmt.Println(slice)  // [a b c]

// デリミタなしで連結
result1 := strings.Join(slice, "")
fmt.Println(result1)  // abc

// カンマで連結
result2 := strings.Join(slice, ",")
fmt.Println(result2)  // a,b,c

// スペースで連結
result3 := strings.Join(slice, " ")
fmt.Println(result3)  // a b c

// 数値スライスの場合は文字列に変換が必要
nums := []int{1, 2, 3}
strs := make([]string, len(nums))
for i, n := range nums {
    strs[i] = strconv.Itoa(n)
}
result4 := strings.Join(strs, ",")
fmt.Println(result4)  // 1,2,3
```

</div>
