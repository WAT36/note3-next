---
title: "配列・リストの一部分を切り出す"
excerpt: "配列・リストのある位置からある位置までの部分を切り出す"
coverImage: ""
date: "2024-06-30T12:48:23.000Z"
updatedAt: '2025-11-24T22:13:44.000Z'
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
mode: programming
---

配列（リスト）の一部分（ある位置からある位置まで）を切り出す方法を示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
list.subList(start, end);
```

Java では配列とリストで切り出し方法が異なる。

**リストの切り出し（subList）**:

`List`の`subList()`メソッドを使うと、指定した範囲の部分リストを取得できる。

```java
import java.util.*;

List<Integer> list = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

// インデックス2から6まで（6は含まない）
List<Integer> subList = list.subList(2, 6);
System.out.println(subList); // [3, 4, 5, 6]

// インデックス5から最後まで
List<Integer> fromIndex = list.subList(5, list.size());
System.out.println(fromIndex); // [6, 7, 8, 9, 10]

// 先頭から3つ
List<Integer> first3 = list.subList(0, 3);
System.out.println(first3); // [1, 2, 3]
```

**注意点（subList はビュー）**:

`subList()`は元のリストのビュー（参照）を返すため、元のリストを変更すると`subList`も影響を受ける。

```java
List<Integer> list = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));
List<Integer> subList = list.subList(1, 4);
System.out.println(subList); // [2, 3, 4]

// 元のリストを変更
list.set(2, 99);
System.out.println(subList); // [2, 99, 4] (影響を受ける)

// 独立したリストを作成する場合
List<Integer> independent = new ArrayList<>(list.subList(1, 4));
```

**配列の切り出し（Arrays.copyOfRange）**:

配列の場合は`Arrays.copyOfRange()`を使用する。

```java
int[] array = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

// インデックス2から6まで（6は含まない）
int[] subArray = Arrays.copyOfRange(array, 2, 6);
System.out.println(Arrays.toString(subArray)); // [3, 4, 5, 6]

// インデックス5から最後まで
int[] fromIndex = Arrays.copyOfRange(array, 5, array.length);
System.out.println(Arrays.toString(fromIndex)); // [6, 7, 8, 9, 10]

// 先頭から3つ
int[] first3 = Arrays.copyOfRange(array, 0, 3);
System.out.println(Arrays.toString(first3)); // [1, 2, 3]
```

**Stream API を使った方法**:

```java
List<Integer> list = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

// skip()とlimit()を使用
List<Integer> sliced = list.stream()
    .skip(2)  // 最初の2要素をスキップ
    .limit(4) // 4要素を取得
    .collect(Collectors.toList());
System.out.println(sliced); // [3, 4, 5, 6]
```

**負のインデックス（末尾から）**:

Java には負のインデックスはないが、計算で実現できる。

```java
List<Integer> list = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

// 最後の3要素
List<Integer> last3 = list.subList(list.size() - 3, list.size());
System.out.println(last3); // [8, 9, 10]

// 最後から5番目から最後から2番目まで
List<Integer> fromEnd = list.subList(list.size() - 5, list.size() - 1);
System.out.println(fromEnd); // [6, 7, 8, 9]
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
list[start:end]
```

Python では**スライス記法**を使って配列（リスト）の一部を簡潔に切り出せる。

**基本的なスライス**:

```python
arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# インデックス2から6まで（6は含まない）
sliced = arr[2:6]
print(sliced)  # [3, 4, 5, 6]

# インデックス5から最後まで
from_index = arr[5:]
print(from_index)  # [6, 7, 8, 9, 10]

# 先頭から3つ
first3 = arr[:3]
print(first3)  # [1, 2, 3]

# 全体をコピー
copied = arr[:]
print(copied)  # [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

**負のインデックス（末尾から）**:

```python
arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# 最後の3要素
last3 = arr[-3:]
print(last3)  # [8, 9, 10]

# 最後から5番目から最後から2番目まで
from_end = arr[-5:-1]
print(from_end)  # [6, 7, 8, 9]

# 最後の1要素を除く全て
without_last = arr[:-1]
print(without_last)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]

# 最初の1要素を除く全て
without_first = arr[1:]
print(without_first)  # [2, 3, 4, 5, 6, 7, 8, 9, 10]
```

**ステップ付きスライス**:

3 つ目の引数でステップ（間隔）を指定できる。

```python
arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# 2つずつ飛ばして取得
every_other = arr[::2]
print(every_other)  # [1, 3, 5, 7, 9]

# インデックス1から8まで、2つずつ
stepped = arr[1:8:2]
print(stepped)  # [2, 4, 6, 8]

# 逆順
reversed_arr = arr[::-1]
print(reversed_arr)  # [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

# インデックス7から2まで、逆順
reverse_slice = arr[7:2:-1]
print(reverse_slice)  # [8, 7, 6, 5, 4]
```

**文字列のスライス**:

文字列も同じようにスライスできる。

```python
text = "Hello, World!"

# 最初の5文字
print(text[:5])  # Hello

# 7文字目から最後まで
print(text[7:])  # World!

# 逆順
print(text[::-1])  # !dlroW ,olleH
```

**スライスは新しいオブジェクトを作成**:

スライスは常に新しいリストを作成する（元のリストは変更されない）。

```python
original = [1, 2, 3, 4, 5]
sliced = original[1:4]
print(sliced)  # [2, 3, 4]

# slicedを変更してもoriginalは影響を受けない
sliced[0] = 99
print(sliced)    # [99, 3, 4]
print(original)  # [1, 2, 3, 4, 5] (変更されない)
```

**範囲外のインデックス**:

スライスは範囲外のインデックスでもエラーにならない。

```python
arr = [1, 2, 3, 4, 5]

# 範囲外のインデックス（エラーにならない）
print(arr[2:100])  # [3, 4, 5]
print(arr[-100:3]) # [1, 2, 3]
```

**スライスオブジェクト**:

`slice()`関数でスライスオブジェクトを作成できる。

```python
arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# スライスオブジェクトを作成
s = slice(2, 6)
print(arr[s])  # [3, 4, 5, 6]

# ステップ付き
s2 = slice(1, 8, 2)
print(arr[s2])  # [2, 4, 6, 8]
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
arr.slice(start, end);
```

JavaScript では配列の`slice()`メソッドを使って一部を切り出せる。

**基本的な使い方**:

`slice(start, end)`は`start`から`end - 1`までの要素を含む新しい配列を返す。

```javascript
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// インデックス2から6まで（6は含まない）
let sliced = arr.slice(2, 6);
console.log(sliced); // [3, 4, 5, 6]

// インデックス5から最後まで
let fromIndex = arr.slice(5);
console.log(fromIndex); // [6, 7, 8, 9, 10]

// 先頭から3つ
let first3 = arr.slice(0, 3);
console.log(first3); // [1, 2, 3]

// 配列全体をコピー
let copied = arr.slice();
console.log(copied); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

**負のインデックス（末尾から）**:

```javascript
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 最後の3要素
let last3 = arr.slice(-3);
console.log(last3); // [8, 9, 10]

// 最後から5番目から最後から2番目まで
let fromEnd = arr.slice(-5, -1);
console.log(fromEnd); // [6, 7, 8, 9]

// 最後の1要素を除く全て
let withoutLast = arr.slice(0, -1);
console.log(withoutLast); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

// 最初の1要素を除く全て
let withoutFirst = arr.slice(1);
console.log(withoutFirst); // [2, 3, 4, 5, 6, 7, 8, 9, 10]
```

**非破壊的操作**:

`slice()`は元の配列を変更せず、新しい配列を返す。

```javascript
let original = [1, 2, 3, 4, 5];
let sliced = original.slice(1, 4);
console.log(sliced); // [2, 3, 4]

// slicedを変更してもoriginalは影響を受けない
sliced[0] = 99;
console.log(sliced); // [99, 3, 4]
console.log(original); // [1, 2, 3, 4, 5] (変更されない)
```

**文字列のスライス**:

文字列も`slice()`メソッドを持っている。

```javascript
let text = "Hello, World!";

// 最初の5文字
console.log(text.slice(0, 5)); // Hello

// 7文字目から最後まで
console.log(text.slice(7)); // World!

// 最後の6文字
console.log(text.slice(-6)); // World!
```

**範囲外のインデックス**:

範囲外のインデックスを指定しても空の配列やエラーにはならない。

```javascript
let arr = [1, 2, 3, 4, 5];

// 範囲外のインデックス（空の配列）
console.log(arr.slice(10)); // []
console.log(arr.slice(2, 100)); // [3, 4, 5]
console.log(arr.slice(-100, 3)); // [1, 2, 3]
```

**スプレッド構文との組み合わせ**:

```javascript
let arr = [1, 2, 3, 4, 5];

// スプレッド構文で配列をコピー（slice()と同じ）
let copied = [...arr];
console.log(copied); // [1, 2, 3, 4, 5]

// 部分的に切り出してから連結
let result = [...arr.slice(0, 2), 99, ...arr.slice(3)];
console.log(result); // [1, 2, 99, 4, 5]
```

**splice()との違い**:

`splice()`は破壊的、`slice()`は非破壊的。

```javascript
let arr1 = [1, 2, 3, 4, 5];
let arr2 = [1, 2, 3, 4, 5];

// slice()は元の配列を変更しない
let sliced = arr1.slice(1, 4);
console.log(arr1); // [1, 2, 3, 4, 5] (変更なし)
console.log(sliced); // [2, 3, 4]

// splice()は元の配列を変更する
let spliced = arr2.splice(1, 3);
console.log(arr2); // [1, 5] (変更された)
console.log(spliced); // [2, 3, 4]
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
slice[start:end]
```

Go では**スライス式**を使って配列やスライスの一部を切り出せる。

**基本的なスライス**:

```go
import "fmt"

arr := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}

// インデックス2から6まで（6は含まない）
sliced := arr[2:6]
fmt.Println(sliced) // [3 4 5 6]

// インデックス5から最後まで
fromIndex := arr[5:]
fmt.Println(fromIndex) // [6 7 8 9 10]

// 先頭から3つ
first3 := arr[:3]
fmt.Println(first3) // [1 2 3]

// 全体をコピー（実際は参照）
copied := arr[:]
fmt.Println(copied) // [1 2 3 4 5 6 7 8 9 10]
```

**配列のスライス**:

配列もスライスできる。

```go
array := [10]int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}

// 配列からスライスを作成
sliced := array[2:6]
fmt.Println(sliced) // [3 4 5 6]

// 型はスライス
fmt.Printf("%T\n", sliced) // []int
```

**スライスは参照（ビュー）**:

Go のスライス式は元の配列やスライスのビューを返すため、元のデータを変更すると影響を受ける。

```go
original := []int{1, 2, 3, 4, 5}
sliced := original[1:4]
fmt.Println(sliced) // [2 3 4]

// slicedを変更するとoriginalも変更される
sliced[0] = 99
fmt.Println(sliced)   // [99 3 4]
fmt.Println(original) // [1 99 3 4 5] (影響を受ける)
```

**独立したコピーを作成**:

`copy()`関数を使って独立したコピーを作成できる。

```go
original := []int{1, 2, 3, 4, 5}

// 新しいスライスを作成してコピー
sliced := make([]int, 3)
copy(sliced, original[1:4])
fmt.Println(sliced) // [2 3 4]

// slicedを変更してもoriginalは影響を受けない
sliced[0] = 99
fmt.Println(sliced)   // [99 3 4]
fmt.Println(original) // [1 2 3 4 5] (変更されない)

// または append を使う方法
independent := append([]int{}, original[1:4]...)
fmt.Println(independent) // [2 3 4]
```

**3 つのインデックス（容量制限）**:

`slice[low:high:max]`の形式で容量を制限できる。

```go
original := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}

// 通常のスライス
s1 := original[2:5]
fmt.Println(s1)       // [3 4 5]
fmt.Println(cap(s1))  // 8 (元のスライスの容量を継承)

// 容量を制限したスライス
s2 := original[2:5:5]
fmt.Println(s2)       // [3 4 5]
fmt.Println(cap(s2))  // 3 (容量が5-2=3に制限される)
```

**文字列のスライス**:

文字列もスライスできる（バイト単位）。

```go
text := "Hello, World!"

// 最初の5文字（バイト）
fmt.Println(text[:5]) // Hello

// 7文字目から最後まで
fmt.Println(text[7:]) // World!

// ルーン（Unicode文字）でスライスする場合
runes := []rune(text)
fmt.Println(string(runes[:5])) // Hello
```

**範囲外のインデックス**:

Go ではスライスの範囲外にアクセスするとパニックが発生する。

```go
arr := []int{1, 2, 3, 4, 5}

// 範囲外のインデックス（パニック）
// sliced := arr[10:] // panic: runtime error: slice bounds out of range

// 安全にスライスするには範囲チェック
if len(arr) >= 3 {
    sliced := arr[2:]
    fmt.Println(sliced) // [3 4 5]
}
```

**負のインデックスの代替**:

Go には負のインデックスはないが、`len()`で計算できる。

```go
arr := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}

// 最後の3要素
last3 := arr[len(arr)-3:]
fmt.Println(last3) // [8 9 10]

// 最後から5番目から最後から2番目まで
fromEnd := arr[len(arr)-5 : len(arr)-1]
fmt.Println(fromEnd) // [6 7 8 9]

// 最後の1要素を除く全て
withoutLast := arr[:len(arr)-1]
fmt.Println(withoutLast) // [1 2 3 4 5 6 7 8 9]
```

**バイトスライス**:

```go
bytes := []byte("Hello, World!")

// バイトスライスのスライス
sliced := bytes[7:12]
fmt.Println(string(sliced)) // World
```

</div>
