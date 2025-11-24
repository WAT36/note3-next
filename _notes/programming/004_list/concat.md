---
title: "配列・リストを別の配列・リストと連結する"
date: "2024-06-30T12:31:51.000Z"
excerpt: "配列・リストを別の配列・リストと連結する方法"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: '2025-11-25T00:12:03.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

配列（リスト）を別の配列（リスト）に連結する方法を示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
list1.addAll(list2);
```

Java では配列とリストで連結方法が異なる。

**リストの連結**:

`List`の`addAll()`メソッドを使うと、リストの末尾に別のリストの全要素を追加できる（破壊的操作）。

```java
import java.util.*;

List<Integer> list1 = new ArrayList<>(Arrays.asList(1, 2, 3));
List<Integer> list2 = Arrays.asList(4, 5, 6);

// 破壊的な連結
list1.addAll(list2);
System.out.println(list1); // [1, 2, 3, 4, 5, 6]
```

**非破壊的な連結（新しいリストを作成）**:

```java
List<Integer> list1 = Arrays.asList(1, 2, 3);
List<Integer> list2 = Arrays.asList(4, 5, 6);

// 新しいリストを作成して連結
List<Integer> combined = new ArrayList<>();
combined.addAll(list1);
combined.addAll(list2);
System.out.println(combined); // [1, 2, 3, 4, 5, 6]

// Stream APIを使った方法
List<Integer> result = Stream.concat(
    list1.stream(),
    list2.stream()
).collect(Collectors.toList());
System.out.println(result); // [1, 2, 3, 4, 5, 6]
```

**複数のリストを連結**:

```java
List<Integer> list1 = Arrays.asList(1, 2);
List<Integer> list2 = Arrays.asList(3, 4);
List<Integer> list3 = Arrays.asList(5, 6);

// 複数のリストを連結
List<Integer> combined = new ArrayList<>();
combined.addAll(list1);
combined.addAll(list2);
combined.addAll(list3);
System.out.println(combined); // [1, 2, 3, 4, 5, 6]

// Stream APIを使った方法
List<Integer> result = Stream.of(list1, list2, list3)
    .flatMap(List::stream)
    .collect(Collectors.toList());
System.out.println(result); // [1, 2, 3, 4, 5, 6]
```

**配列の連結**:

配列は固定サイズなので、新しい配列を作成する必要がある。

```java
int[] array1 = {1, 2, 3};
int[] array2 = {4, 5, 6};

// 新しい配列を作成して要素をコピー
int[] combined = new int[array1.length + array2.length];
System.arraycopy(array1, 0, combined, 0, array1.length);
System.arraycopy(array2, 0, combined, array1.length, array2.length);
System.out.println(Arrays.toString(combined)); // [1, 2, 3, 4, 5, 6]

// Apache Commons Langを使う方法
// int[] combined = ArrayUtils.addAll(array1, array2);
```

**配列をリストに変換してから連結**:

```java
int[] array1 = {1, 2, 3};
int[] array2 = {4, 5, 6};

List<Integer> list = new ArrayList<>();
for (int num : array1) list.add(num);
for (int num : array2) list.add(num);
System.out.println(list); // [1, 2, 3, 4, 5, 6]

// Stream APIを使った方法
List<Integer> result = IntStream.concat(
    Arrays.stream(array1),
    Arrays.stream(array2)
).boxed().collect(Collectors.toList());
System.out.println(result); // [1, 2, 3, 4, 5, 6]
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
list1 + list2
```

Python ではリストの連結に複数の方法がある。

**+ 演算子（非破壊的）**:

新しいリストを作成して連結する。元のリストは変更されない。

```python
list1 = [1, 2, 3]
list2 = [4, 5, 6]

# 新しいリストを作成
combined = list1 + list2
print(combined)  # [1, 2, 3, 4, 5, 6]
print(list1)     # [1, 2, 3] (元のリストは変更されない)
```

**extend()メソッド（破壊的）**:

リストの末尾に別のリストの全要素を追加する。元のリストが変更される。

```python
list1 = [1, 2, 3]
list2 = [4, 5, 6]

# list1に直接追加
list1.extend(list2)
print(list1)  # [1, 2, 3, 4, 5, 6]

# 複数のリストを連結
list1 = [1, 2]
list1.extend([3, 4])
list1.extend([5, 6])
print(list1)  # [1, 2, 3, 4, 5, 6]
```

**+= 演算子（破壊的）**:

`extend()`と同じ動作。

```python
list1 = [1, 2, 3]
list2 = [4, 5, 6]

list1 += list2
print(list1)  # [1, 2, 3, 4, 5, 6]
```

**\* 演算子（繰り返し連結）**:

同じリストを繰り返し連結する。

```python
list1 = [1, 2, 3]

# リストを3回繰り返す
repeated = list1 * 3
print(repeated)  # [1, 2, 3, 1, 2, 3, 1, 2, 3]

# 空のリストを作成
empty = [0] * 5
print(empty)  # [0, 0, 0, 0, 0]
```

**リスト内包表記やアンパック**:

```python
list1 = [1, 2, 3]
list2 = [4, 5, 6]
list3 = [7, 8, 9]

# アンパックを使った連結
combined = [*list1, *list2, *list3]
print(combined)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]

# リスト内包表記で連結
combined = [item for sublist in [list1, list2, list3] for item in sublist]
print(combined)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

**itertools.chain()を使う方法**:

```python
from itertools import chain

list1 = [1, 2, 3]
list2 = [4, 5, 6]
list3 = [7, 8, 9]

# イテレータとして連結
combined = list(chain(list1, list2, list3))
print(combined)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]

# メモリ効率が良い（イテレータとして使用する場合）
for item in chain(list1, list2, list3):
    print(item, end=' ')  # 1 2 3 4 5 6 7 8 9
```

**パフォーマンスの違い**:

```python
# 小さなリストの場合: + 演算子が簡潔
result = [1, 2] + [3, 4]

# 大きなリストや複数回の連結: extend()が効率的
result = []
result.extend(list1)
result.extend(list2)

# 複数のリストを一度に: アンパックまたはitertools.chain()
result = [*list1, *list2, *list3]
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
arr1.concat(arr2);
```

JavaScript では配列の連結に複数の方法がある。

**concat()メソッド（非破壊的）**:

新しい配列を作成して連結する。元の配列は変更されない。

```javascript
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];

// 新しい配列を作成
let combined = arr1.concat(arr2);
console.log(combined); // [1, 2, 3, 4, 5, 6]
console.log(arr1); // [1, 2, 3] (元の配列は変更されない)

// 複数の配列を連結
let arr3 = [7, 8, 9];
let result = arr1.concat(arr2, arr3);
console.log(result); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

// 個別の要素も追加可能
let mixed = arr1.concat(arr2, 10, 11);
console.log(mixed); // [1, 2, 3, 4, 5, 6, 10, 11]
```

**スプレッド構文（非破壊的）**:

ES6 以降の推奨される方法。より読みやすい。

```javascript
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];

// スプレッド構文で連結
let combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// 複数の配列を連結
let arr3 = [7, 8, 9];
let result = [...arr1, ...arr2, ...arr3];
console.log(result); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

// 途中に要素を挿入
let withExtra = [...arr1, 99, ...arr2];
console.log(withExtra); // [1, 2, 3, 99, 4, 5, 6]
```

**push()とスプレッド構文（破壊的）**:

元の配列に直接追加する。

```javascript
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];

// arr1の末尾にarr2の全要素を追加
arr1.push(...arr2);
console.log(arr1); // [1, 2, 3, 4, 5, 6]
```

**Array.prototype.push.apply()（破壊的、古い方法）**:

ES5 以前の方法。現在はスプレッド構文が推奨される。

```javascript
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];

// 古い方法（非推奨）
Array.prototype.push.apply(arr1, arr2);
console.log(arr1); // [1, 2, 3, 4, 5, 6]
```

**flat()を使った多次元配列の連結**:

```javascript
let arrays = [
  [1, 2],
  [3, 4],
  [5, 6],
];

// 1階層フラット化
let flattened = arrays.flat();
console.log(flattened); // [1, 2, 3, 4, 5, 6]

// より深い階層もフラット化可能
let nested = [
  [1, [2]],
  [3, [4, [5]]],
];
let deep = nested.flat(2);
console.log(deep); // [1, 2, 3, 4, 5]

// 無限階層のフラット化
let veryNested = [[1, [2, [3, [4]]]]];
let allFlat = veryNested.flat(Infinity);
console.log(allFlat); // [1, 2, 3, 4]
```

**reduce()を使った連結**:

```javascript
let arrays = [
  [1, 2],
  [3, 4],
  [5, 6],
];

// reduce()で連結
let combined = arrays.reduce((acc, arr) => acc.concat(arr), []);
console.log(combined); // [1, 2, 3, 4, 5, 6]

// または
let result = arrays.reduce((acc, arr) => [...acc, ...arr], []);
console.log(result); // [1, 2, 3, 4, 5, 6]
```

**パフォーマンスの比較**:

```javascript
// 小さな配列: どの方法でもOK、スプレッド構文が推奨（読みやすい）
let result = [...arr1, ...arr2];

// 大きな配列: concat()が高速
let result = arr1.concat(arr2);

// 破壊的操作でOKな場合: push(...arr2)が最速
arr1.push(...arr2);
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
append(slice1, slice2...)
```

Go ではスライスの連結に`append()`関数を使用する。

**基本的な連結**:

```go
import "fmt"

slice1 := []int{1, 2, 3}
slice2 := []int{4, 5, 6}

// スプレッド演算子 ... を使って連結
combined := append(slice1, slice2...)
fmt.Println(combined) // [1 2 3 4 5 6]
```

**元のスライスを変更しない方法**:

`append()`は元のスライスを変更する可能性があるため、新しいスライスを作成することを推奨。

```go
slice1 := []int{1, 2, 3}
slice2 := []int{4, 5, 6}

// 新しいスライスを作成してから連結
combined := make([]int, len(slice1))
copy(combined, slice1)
combined = append(combined, slice2...)

fmt.Println(combined) // [1 2 3 4 5 6]
fmt.Println(slice1)   // [1 2 3] (元のスライスは変更されない)
```

**複数のスライスを連結**:

```go
slice1 := []int{1, 2}
slice2 := []int{3, 4}
slice3 := []int{5, 6}

// 順次連結
combined := append(slice1, slice2...)
combined = append(combined, slice3...)
fmt.Println(combined) // [1 2 3 4 5 6]

// または一度に
combined := append([]int{}, slice1...)
combined = append(combined, slice2...)
combined = append(combined, slice3...)
fmt.Println(combined) // [1 2 3 4 5 6]
```

**容量を事前に確保する方法（効率的）**:

```go
slice1 := []int{1, 2, 3}
slice2 := []int{4, 5, 6}

// 必要な容量を事前に確保
combined := make([]int, 0, len(slice1)+len(slice2))
combined = append(combined, slice1...)
combined = append(combined, slice2...)
fmt.Println(combined) // [1 2 3 4 5 6]
```

**copy()を使った方法**:

```go
slice1 := []int{1, 2, 3}
slice2 := []int{4, 5, 6}

// 新しいスライスを作成してコピー
combined := make([]int, len(slice1)+len(slice2))
copy(combined, slice1)
copy(combined[len(slice1):], slice2)
fmt.Println(combined) // [1 2 3 4 5 6]
```

**異なる型の連結（interface{}を使用）**:

```go
// interface{}スライスで異なる型を連結
slice1 := []interface{}{1, 2, 3}
slice2 := []interface{}{"a", "b", "c"}

combined := append(slice1, slice2...)
fmt.Println(combined) // [1 2 3 a b c]
```

**文字列スライスの連結**:

```go
words1 := []string{"Hello", "World"}
words2 := []string{"from", "Go"}

combined := append(words1, words2...)
fmt.Println(combined) // [Hello World from Go]

// strings.Joinで文字列として連結
import "strings"
result := strings.Join(append(words1, words2...), " ")
fmt.Println(result) // Hello World from Go
```

**バイトスライスの連結**:

```go
bytes1 := []byte("Hello ")
bytes2 := []byte("World")

combined := append(bytes1, bytes2...)
fmt.Println(string(combined)) // Hello World

// bytes.Bufferを使う方法（大量の連結に効率的）
import "bytes"

var buffer bytes.Buffer
buffer.Write(bytes1)
buffer.Write(bytes2)
fmt.Println(buffer.String()) // Hello World
```

**パフォーマンスの考慮**:

```go
// 小さなスライス: append()で十分
result := append(slice1, slice2...)

// 大きなスライスや複数回の連結: 事前に容量を確保
capacity := len(slice1) + len(slice2) + len(slice3)
result := make([]int, 0, capacity)
result = append(result, slice1...)
result = append(result, slice2...)
result = append(result, slice3...)

// 固定サイズが分かっている場合: copy()が高速
result := make([]int, len(slice1)+len(slice2))
copy(result, slice1)
copy(result[len(slice1):], slice2)
```

</div>
