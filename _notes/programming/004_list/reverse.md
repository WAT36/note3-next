---
title: "リストを逆順にする"
date: "2019-10-26T21:35:30+09:00"
excerpt: "リスト内の要素を逆順にする方法。"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-26T21:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

リスト内の要素を逆順にする方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
List<Integer> list = Arrays.asList(1, 2, 3, 4, 5);
Collections.reverse(list);  // [5, 4, 3, 2, 1]
```

Java では**Collections.reverse()**でリストを逆順にする（破壊的）。

```java
List<Integer> list = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));
System.out.println(list);  // [1, 2, 3, 4, 5]

Collections.reverse(list);
System.out.println(list);  // [5, 4, 3, 2, 1]
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
arr = [1, 2, 3, 4, 5]
arr.reverse()              # 破壊的
reversed_arr = list(reversed(arr))  # 非破壊的
```

Python では**reverse()**（破壊的）と**reversed()**（非破壊的）の 2 つの方法がある。

- **破壊的**: `list.reverse()` - リスト自体を変更
- **非破壊的**: `list(reversed(list))` - 新しいリストを返す

```python
arr = [1, 2, 3, 4, 5]

# 破壊的（元のリストが変更される）
arr.reverse()
print(arr)  # [5, 4, 3, 2, 1]

# 非破壊的（元のリストは変更されない）
original = [1, 2, 3, 4, 5]
reversed_list = list(reversed(original))
print(reversed_list)  # [5, 4, 3, 2, 1]
print(original)       # [1, 2, 3, 4, 5]

# スライスを使った非破壊的な方法
reversed_slice = original[::-1]
print(reversed_slice)  # [5, 4, 3, 2, 1]
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
let arr = [1, 2, 3, 4, 5];
arr.reverse(); // [5, 4, 3, 2, 1]
```

JavaScript では**reverse()**メソッドで配列を逆順にする（破壊的）。

```javascript
let arr = [1, 2, 3, 4, 5];
console.log(arr); // [1, 2, 3, 4, 5]

arr.reverse();
console.log(arr); // [5, 4, 3, 2, 1]

// 非破壊的に逆順にする場合
let original = [1, 2, 3, 4, 5];
let reversed = [...original].reverse();
console.log(reversed); // [5, 4, 3, 2, 1]
console.log(original); // [1, 2, 3, 4, 5]
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
slice := []int{1, 2, 3, 4, 5}
for i, j := 0, len(slice)-1; i < j; i, j = i+1, j-1 {
    slice[i], slice[j] = slice[j], slice[i]
}
```

Go では標準ライブラリに逆順にする関数がないため、ループで要素を入れ替える。

```go
// スライスを逆順にする関数
func reverseSlice(slice []int) {
    for i, j := 0, len(slice)-1; i < j; i, j = i+1, j-1 {
        slice[i], slice[j] = slice[j], slice[i]
    }
}

slice := []int{1, 2, 3, 4, 5}
fmt.Println(slice)  // [1 2 3 4 5]

reverseSlice(slice)
fmt.Println(slice)  // [5 4 3 2 1]

// 非破壊的に逆順にする場合
func reversedSlice(original []int) []int {
    reversed := make([]int, len(original))
    for i, v := range original {
        reversed[len(original)-1-i] = v
    }
    return reversed
}

original := []int{1, 2, 3, 4, 5}
reversed := reversedSlice(original)
fmt.Println(reversed)  // [5 4 3 2 1]
fmt.Println(original)  // [1 2 3 4 5]
```

</div>
