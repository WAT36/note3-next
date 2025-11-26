---
title: "リストa,bに共通して入っている要素のみを表示（積集合）"
date: "2019-10-26T21:35:30+09:00"
excerpt: "リスト2つの積集合(共通する要素)をとる方法。"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-26T21:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

2 つのリストに共通して入っている要素のみを表示する方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
List<Integer> listA = Arrays.asList(1, 2, 3, 4, 5);
List<Integer> listB = Arrays.asList(4, 5, 6, 7, 8);
listA.retainAll(listB);  // [4, 5]
```

Java では**retainAll()**メソッドで 2 つのリストの積集合を取る（破壊的）。

呼び出し元のリストから、引数に指定したリストにも含まれる要素のみを残す。

```java
List<Integer> listA = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));
List<Integer> listB = Arrays.asList(4, 5, 6, 7, 8);

listA.retainAll(listB);
System.out.println(listA);  // [4, 5]

// 非破壊的に積集合を取る場合（Stream API使用）
List<Integer> original = Arrays.asList(1, 2, 3, 4, 5);
List<Integer> other = Arrays.asList(4, 5, 6, 7, 8);
List<Integer> intersection = original.stream()
    .filter(other::contains)
    .collect(Collectors.toList());
System.out.println(intersection);  // [4, 5]
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
list_a = [1, 2, 3, 4, 5]
list_b = [4, 5, 6, 7, 8]
result = list(set(list_a) & set(list_b))
```

Python では set 型に変換して**&**演算子で積集合を取る。

1. 各リストを set に変換
2. `&`演算子で積集合を計算
3. `list()`でリストに戻す

```python
list_a = [1, 2, 3, 4, 5]
list_b = [4, 5, 6, 7, 8]

# 積集合を取る
intersection = set(list_a) & set(list_b)
result = list(intersection)
print(result)  # [4, 5]

# 1行で書く場合
result = list(set(list_a) & set(list_b))
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
let arrA = [1, 2, 3, 4, 5];
let arrB = [4, 5, 6, 7, 8];
let intersection = arrA.filter((v) => arrB.includes(v));
```

JavaScript では**filter()**と**includes()**を使用して積集合を取る。

`filter()`で配列 A の要素をフィルタリングし、配列 B に含まれる要素のみを残す。

```javascript
let arrA = [1, 2, 3, 4, 5];
let arrB = [4, 5, 6, 7, 8];

// 積集合を取る
let intersection = arrA.filter((value) => arrB.includes(value));
console.log(intersection); // [4, 5]

// Setを使った方法（重複も排除）
let setA = new Set(arrA);
let setB = new Set(arrB);
let intersectionSet = [...setA].filter((v) => setB.has(v));
console.log(intersectionSet); // [4, 5]
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
sliceA := []int{1, 2, 3, 4, 5}
sliceB := []int{4, 5, 6, 7, 8}

mapB := make(map[int]bool)
for _, v := range sliceB {
    mapB[v] = true
}

result := []int{}
for _, v := range sliceA {
    if mapB[v] {
        result = append(result, v)
    }
}
```

Go では map を使用して 2 つのスライスの積集合を取る。

1. スライス B の要素を map に格納
2. スライス A の要素をループし、map に存在するものだけを結果に追加

```go
sliceA := []int{1, 2, 3, 4, 5}
sliceB := []int{4, 5, 6, 7, 8}

// スライスBの要素をmapに格納
mapB := make(map[int]bool)
for _, v := range sliceB {
    mapB[v] = true
}

// スライスAの要素のうち、mapに存在するものを取得
result := []int{}
for _, v := range sliceA {
    if mapB[v] {
        result = append(result, v)
    }
}

fmt.Println(result)  // [4 5]
```

</div>
