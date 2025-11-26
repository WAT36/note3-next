---
title: "リストaまたはbに入っている要素を表示（和集合）"
date: "2019-10-26T21:35:30+09:00"
excerpt: "リスト2つの和集合をとる方法。"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-26T21:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

2 つのリストの少なくとも一つに入っている要素のみを表示する方法についてを示す。  
なお、リスト内の要素に重複している要素はないことを前提とする。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
Set<Integer> union = new HashSet<>(listA);
union.addAll(listB);
List<Integer> result = new ArrayList<>(union);
```

Java では**HashSet**を使用して 2 つのリストの和集合を取る。

1. リスト A を Set に変換（重複排除）
2. `addAll()`でリスト B の要素を追加
3. Set を再び List に変換

```java
List<Integer> listA = Arrays.asList(1, 2, 3, 4, 5);
List<Integer> listB = Arrays.asList(4, 5, 6, 7, 8);

Set<Integer> union = new HashSet<>(listA);
union.addAll(listB);
List<Integer> result = new ArrayList<>(union);

System.out.println(result);  // [1, 2, 3, 4, 5, 6, 7, 8]
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
list_a = [1, 2, 3, 4, 5]
list_b = [4, 5, 6, 7, 8]
result = list(set(list_a) | set(list_b))
```

Python では set 型に変換して**|**演算子で和集合を取る。

1. 各リストを set に変換
2. `|`演算子で和集合を計算
3. `list()`でリストに戻す

```python
list_a = [1, 2, 3, 4, 5]
list_b = [4, 5, 6, 7, 8]

# 和集合を取る
union = set(list_a) | set(list_b)
result = list(union)
print(result)  # [1, 2, 3, 4, 5, 6, 7, 8]

# 1行で書く場合
result = list(set(list_a) | set(list_b))
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
let arrA = [1, 2, 3, 4, 5];
let arrB = [4, 5, 6, 7, 8];
let union = [...new Set([...arrA, ...arrB])];
```

JavaScript では**Set**オブジェクトと**スプレッド構文(...)**を使用して和集合を取る。

1. スプレッド構文で 2 つの配列を結合
2. `Set`で重複を排除
3. スプレッド構文で配列に戻す

```javascript
let arrA = [1, 2, 3, 4, 5];
let arrB = [4, 5, 6, 7, 8];

// 和集合を取る
let union = [...new Set([...arrA, ...arrB])];
console.log(union); // [1, 2, 3, 4, 5, 6, 7, 8]
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
sliceA := []int{1, 2, 3, 4, 5}
sliceB := []int{4, 5, 6, 7, 8}

unionMap := make(map[int]bool)
for _, v := range sliceA {
    unionMap[v] = true
}
for _, v := range sliceB {
    unionMap[v] = true
}

result := make([]int, 0, len(unionMap))
for k := range unionMap {
    result = append(result, k)
}
```

Go では map を使用して 2 つのスライスの和集合を取る。

1. map に両方のスライスの要素を追加（重複は自動排除）
2. map のキーを新しいスライスに格納

```go
sliceA := []int{1, 2, 3, 4, 5}
sliceB := []int{4, 5, 6, 7, 8}

// mapを使って重複を排除
unionMap := make(map[int]bool)
for _, v := range sliceA {
    unionMap[v] = true
}
for _, v := range sliceB {
    unionMap[v] = true
}

// mapのキーからスライスを作成
result := make([]int, 0, len(unionMap))
for k := range unionMap {
    result = append(result, k)
}

fmt.Println(result)  // [1 2 3 4 5 6 7 8]（順序は保証されない）

// ソートが必要な場合
sort.Ints(result)
fmt.Println(result)  // [1 2 3 4 5 6 7 8]
```

</div>
