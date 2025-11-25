---
title: "リストのソート"
date: "2019-10-26T19:35:30+09:00"
excerpt: "リスト内の要素をソートする方法。"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-26T19:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

リスト内の要素をソートする方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
List<Integer> list = Arrays.asList(3, 1, 4, 1, 5);
Collections.sort(list);              // 昇順
Collections.sort(list, Collections.reverseOrder()); // 降順
```

Java では**Collections.sort()**でリストをソートする。

- **昇順ソート**: `Collections.sort(list)`
- **降順ソート**: `Collections.sort(list, Collections.reverseOrder())`

```java
List<Integer> list = new ArrayList<>(Arrays.asList(3, 1, 4, 1, 5, 9));

// 昇順ソート
Collections.sort(list);
System.out.println(list);  // [1, 1, 3, 4, 5, 9]

// 降順ソート
Collections.sort(list, Collections.reverseOrder());
System.out.println(list);  // [9, 5, 4, 3, 1, 1]

// Java 8以降はList.sort()も使用可能
list.sort(Comparator.naturalOrder());     // 昇順
list.sort(Comparator.reverseOrder());     // 降順
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
arr = [3, 1, 4, 1, 5]
arr.sort()              # 破壊的（昇順）
sorted_arr = sorted(arr)  # 非破壊的（昇順）
arr.sort(reverse=True)  # 降順
```

Python では**sort()**（破壊的）と**sorted()**（非破壊的）の 2 つの方法がある。

- **破壊的ソート**: `list.sort()` - リスト自体を変更
- **非破壊的ソート**: `sorted(list)` - 新しいリストを返す
- **降順**: `reverse=True` オプションを使用

```python
arr = [3, 1, 4, 1, 5, 9]

# 破壊的ソート（元のリストが変更される）
arr.sort()
print(arr)  # [1, 1, 3, 4, 5, 9]

arr.sort(reverse=True)
print(arr)  # [9, 5, 4, 3, 1, 1]

# 非破壊的ソート（元のリストは変更されない）
original = [3, 1, 4, 1, 5]
sorted_list = sorted(original)
print(sorted_list)  # [1, 1, 3, 4, 5]
print(original)     # [3, 1, 4, 1, 5]
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
let arr = [3, 1, 4, 1, 5];
arr.sort((a, b) => a - b); // 昇順
arr.sort((a, b) => b - a); // 降順
```

JavaScript では**sort()**メソッドで配列をソートする（破壊的）。

**重要**: デフォルトでは文字列としてソートされるため、数値のソートには比較関数が必須。

- **昇順ソート**: `arr.sort((a, b) => a - b)`
- **降順ソート**: `arr.sort((a, b) => b - a)`

```javascript
let arr = [3, 1, 4, 10, 5, 9];

// デフォルト（文字列としてソート）- 数値では不適切
arr.sort();
console.log(arr); // [1, 10, 3, 4, 5, 9] ← 10が3の前に来てしまう

// 数値として昇順ソート
arr.sort((a, b) => a - b);
console.log(arr); // [1, 3, 4, 5, 9, 10]

// 数値として降順ソート
arr.sort((a, b) => b - a);
console.log(arr); // [10, 9, 5, 4, 3, 1]
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
import "sort"

slice := []int{3, 1, 4, 1, 5}
sort.Ints(slice)              // 昇順
sort.Sort(sort.Reverse(sort.IntSlice(slice))) // 降順
```

Go では**sort パッケージ**を使用してスライスをソートする。

- **整数の昇順**: `sort.Ints(slice)`
- **整数の降順**: `sort.Sort(sort.Reverse(sort.IntSlice(slice)))`
- **文字列の昇順**: `sort.Strings(slice)`
- **浮動小数点の昇順**: `sort.Float64s(slice)`

```go
import (
    "fmt"
    "sort"
)

// 整数のソート
nums := []int{3, 1, 4, 10, 5, 9}
sort.Ints(nums)
fmt.Println(nums)  // [1 3 4 5 9 10]

// 降順ソート
sort.Sort(sort.Reverse(sort.IntSlice(nums)))
fmt.Println(nums)  // [10 9 5 4 3 1]

// 文字列のソート
strs := []string{"banana", "apple", "cherry"}
sort.Strings(strs)
fmt.Println(strs)  // [apple banana cherry]

// カスタムソート（独自の比較関数）
sort.Slice(nums, func(i, j int) bool {
    return nums[i] < nums[j]  // 昇順
})
```

</div>
