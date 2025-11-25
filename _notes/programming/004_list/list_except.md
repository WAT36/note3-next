---
title: "リストaにありリストbに入ってない要素のみを表示（差集合）"
date: "2019-10-26T22:35:30+09:00"
excerpt: "リスト2つの差集合をとる方法。"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-26T22:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

リスト a にありリスト b に入ってない要素のみを表示する方法についてを示す。  
なお、リスト内の要素に重複している要素はないことを前提とする。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
List<Integer> listA = Arrays.asList(1, 2, 3, 4, 5);
List<Integer> listB = Arrays.asList(4, 5, 6, 7, 8);
listA.removeAll(listB);  // [1, 2, 3]
```

Java では**removeAll()**メソッドで 2 つのリストの差集合を取る（破壊的）。

呼び出し元のリストから、引数に指定したリストに含まれる要素を削除する。

```java
List<Integer> listA = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));
List<Integer> listB = Arrays.asList(4, 5, 6, 7, 8);

listA.removeAll(listB);
System.out.println(listA);  // [1, 2, 3]

// 非破壊的に差集合を取る場合（Stream API使用）
List<Integer> original = Arrays.asList(1, 2, 3, 4, 5);
List<Integer> other = Arrays.asList(4, 5, 6, 7, 8);
List<Integer> difference = original.stream()
    .filter(e -> !other.contains(e))
    .collect(Collectors.toList());
System.out.println(difference);  // [1, 2, 3]
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
list_a = [1, 2, 3, 4, 5]
list_b = [4, 5, 6, 7, 8]
result = list(set(list_a) - set(list_b))
```

Python では set 型に変換して**-**演算子で差集合を取る。

1. 各リストを set に変換
2. `-`演算子で差集合を計算
3. `list()`でリストに戻す

```python
list_a = [1, 2, 3, 4, 5]
list_b = [4, 5, 6, 7, 8]

# 差集合を取る
difference = set(list_a) - set(list_b)
result = list(difference)
print(result)  # [1, 2, 3]

# 1行で書く場合
result = list(set(list_a) - set(list_b))
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
let arrA = [1, 2, 3, 4, 5];
let arrB = [4, 5, 6, 7, 8];
let difference = arrA.filter((v) => !arrB.includes(v));
```

JavaScript では**filter()**と**includes()**を使用して差集合を取る。

`filter()`で配列 A の要素をフィルタリングし、配列 B に含まれない要素のみを残す。

```javascript
let arrA = [1, 2, 3, 4, 5];
let arrB = [4, 5, 6, 7, 8];

// 差集合を取る
let difference = arrA.filter((value) => !arrB.includes(value));
console.log(difference); // [1, 2, 3]

// Setを使った方法
let setA = new Set(arrA);
let setB = new Set(arrB);
let differenceSet = [...setA].filter((v) => !setB.has(v));
console.log(differenceSet); // [1, 2, 3]
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
    if !mapB[v] {
        result = append(result, v)
    }
}
```

Go では map を使用して 2 つのスライスの差集合を取る。

1. スライス B の要素を map に格納
2. スライス A の要素をループし、map に存在しないものだけを結果に追加

```go
sliceA := []int{1, 2, 3, 4, 5}
sliceB := []int{4, 5, 6, 7, 8}

// スライスBの要素をmapに格納
mapB := make(map[int]bool)
for _, v := range sliceB {
    mapB[v] = true
}

// スライスAの要素のうち、mapに存在しないものを取得
result := []int{}
for _, v := range sliceA {
    if !mapB[v] {
        result = append(result, v)
    }
}

fmt.Println(result)  // [1 2 3]
```

</div>
