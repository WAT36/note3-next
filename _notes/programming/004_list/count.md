---
title: "指定した要素がリスト内にいくつあるか調べる"
date: "2019-10-27T02:35:30+09:00"
excerpt: "指定した要素がリスト内にいくつあるか調べる方法。"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-27T02:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

指定した要素がリスト内にいくつあるか調べる方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
List<String> list = Arrays.asList("a", "b", "a", "c", "a");
long count = list.stream().filter(x -> x.equals("a")).count();
```

Java では**Stream API**の`filter()`と`count()`で指定した要素の個数を数える。

Java 8 以降では Stream API を使うと簡潔に書ける。従来の for ループでも可能。

```java
List<String> list = Arrays.asList("a", "b", "a", "c", "a");
System.out.println(list);  // [a, b, a, c, a]

// Stream APIを使う方法（Java 8+）
long count = list.stream()
    .filter(x -> x.equals("a"))
    .count();
System.out.println(count);  // 3

// 従来のforループを使う方法
int count2 = 0;
for (String s : list) {
    if (s.equals("a")) {
        count2++;
    }
}
System.out.println(count2);  // 3

// Collections.frequency()を使う方法
int count3 = Collections.frequency(list, "a");
System.out.println(count3);  // 3
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
my_list = ["a", "b", "a", "c", "a"]
count = my_list.count("a")
```

Python では**count()**で指定した要素の個数を数える。

リストのメソッド`count()`を使うと指定した値の出現回数を返す。

```python
my_list = ["a", "b", "a", "c", "a"]
print(my_list)  # ['a', 'b', 'a', 'c', 'a']

count = my_list.count("a")
print(count)  # 3

# 数値のリストでも使える
nums = [1, 2, 1, 3, 1, 4]
count2 = nums.count(1)
print(count2)  # 3
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
let arr = ["a", "b", "a", "c", "a"];
let count = arr.filter((x) => x === "a").length;
```

JavaScript では**filter()**と`length`で指定した要素の個数を数える。

`filter()`で条件に一致する要素を抽出し、その配列の`length`を取得する。

```javascript
let arr = ["a", "b", "a", "c", "a"];
console.log(arr); // ['a', 'b', 'a', 'c', 'a']

// filter()とlengthを使う方法
let count = arr.filter((x) => x === "a").length;
console.log(count); // 3

// reduce()を使う方法
let count2 = arr.reduce((acc, x) => (x === "a" ? acc + 1 : acc), 0);
console.log(count2); // 3

// forループを使う方法
let count3 = 0;
for (let x of arr) {
  if (x === "a") count3++;
}
console.log(count3); // 3
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
slice := []string{"a", "b", "a", "c", "a"}
count := 0
for _, v := range slice {
    if v == "a" {
        count++
    }
}
```

Go では**for range**ループで要素を調べ、カウンタをインクリメントする。

標準ライブラリには専用の関数がないため、ループで数える。

```go
slice := []string{"a", "b", "a", "c", "a"}
fmt.Println(slice)  // [a b a c a]

// for rangeを使う方法
count := 0
for _, v := range slice {
    if v == "a" {
        count++
    }
}
fmt.Println(count)  // 3

// 関数として定義する場合
func countElement[T comparable](slice []T, target T) int {
    count := 0
    for _, v := range slice {
        if v == target {
            count++
        }
    }
    return count
}

nums := []int{1, 2, 1, 3, 1, 4}
count2 := countElement(nums, 1)
fmt.Println(count2)  // 3
```

</div>
