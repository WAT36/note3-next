---
title: "リストの全要素の合計値"
date: "2019-10-25T19:35:30+09:00"
excerpt: "リストの全要素の合計値を取得する方法。"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-25T19:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

リスト中の全要素を合計した値を取得する方法についてを示す。  
またここで扱うリスト内の要素は全て数値であることを前提とする。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
List<Integer> list = Arrays.asList(1, 2, 3, 4, 5);
int sum = list.stream().mapToInt(Integer::intValue).sum();  // 15
```

Java 8 以降では**Stream API**を使用してリストの要素を合計できる。

- `stream()`: リストを Stream に変換
- `mapToInt()`: 各要素を int 型に変換
- `sum()`: 合計値を計算

```java
List<Integer> list = Arrays.asList(1, 2, 3, 4, 5);
int sum = list.stream()
              .mapToInt(Integer::intValue)
              .sum();
System.out.println(sum);  // 15

// ラムダ式を使った方法
int sum2 = list.stream()
               .reduce(0, Integer::sum);
System.out.println(sum2); // 15
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
arr = [1, 2, 3, 4, 5]
total = sum(arr)  # 15
```

Python では組み込み関数**sum()**でリストの全要素の合計値を計算できる。

```python
arr = [1, 2, 3, 4, 5]
total = sum(arr)
print(total)  # 15

# 初期値を指定することもできる
total_with_initial = sum(arr, 10)
print(total_with_initial)  # 25 (15 + 10)
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
let arr = [1, 2, 3, 4, 5];
let sum = arr.reduce((a, b) => a + b, 0); // 15
```

JavaScript では**reduce()**メソッドで配列の全要素の合計値を計算できる。

`reduce()`は配列の各要素に対して関数を適用し、単一の値にまとめる。

```javascript
let arr = [1, 2, 3, 4, 5];
let sum = arr.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 0);
console.log(sum); // 15

// より簡潔な書き方
let sum2 = arr.reduce((a, b) => a + b, 0);
console.log(sum2); // 15
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
slice := []int{1, 2, 3, 4, 5}
sum := 0
for _, v := range slice {
    sum += v
}
// sum = 15
```

Go ではループを使用してスライスの全要素の合計値を計算する。

標準ライブラリには合計を計算する関数がないため、`for range`ループで各要素を加算する。

```go
slice := []int{1, 2, 3, 4, 5}
sum := 0
for _, v := range slice {
    sum += v
}
fmt.Println(sum)  // 15

// 関数として定義する場合
func sumSlice(nums []int) int {
    total := 0
    for _, num := range nums {
        total += num
    }
    return total
}

result := sumSlice([]int{1, 2, 3, 4, 5})
fmt.Println(result)  // 15
```

</div>
