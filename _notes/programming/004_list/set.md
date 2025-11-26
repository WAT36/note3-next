---
title: "Set型"
date: "2019-10-27T14:35:30+09:00"
excerpt: "Set型について"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-27T14:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

Set 型変数とはリストと似たデータ構造で、リストから要素の重複を除いたものを順不同で集めたデータ構造である。しかし、インデックスを指定して要素を取り出すことは一般的にはできない。  
Set 型変数についてを述べる。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
Set<String> s = new HashSet<>();
s.add("a");
```

Java では**Set**インターフェースと**HashSet**クラスを使って Set を利用する。

Set はインターフェースであるため、具体的な実装クラス（`HashSet`, `TreeSet`, `LinkedHashSet`など）を使用する必要がある。一般的には**HashSet**が最もよく使われる。

**主な操作メソッド**:

| メソッド             | 説明                 |
| :------------------- | :------------------- |
| `add(E e)`           | 要素を追加           |
| `remove(Object o)`   | 要素を削除           |
| `contains(Object o)` | 要素が存在するか確認 |
| `size()`             | 要素数を取得         |
| `isEmpty()`          | 空かどうか確認       |
| `clear()`            | 全要素を削除         |

```java
import java.util.*;

Set<String> s = new HashSet<>();

// 要素を追加
s.add("a");
s.add("b");
s.add("c");
s.add("a"); // 重複は追加されない

System.out.println(s); // [a, b, c] (順序は保証されない)
System.out.println(s.size()); // 3

// 要素の存在確認
System.out.println(s.contains("a")); // true
System.out.println(s.contains("d")); // false

// 要素を削除
s.remove("b");
System.out.println(s); // [a, c]

// リストからSetを作成（重複除去）
List<Integer> numbers = Arrays.asList(1, 2, 3, 2, 1, 4, 5, 4);
Set<Integer> uniqueNumbers = new HashSet<>(numbers);
System.out.println(uniqueNumbers); // [1, 2, 3, 4, 5]

// Set同士の演算
Set<Integer> set1 = new HashSet<>(Arrays.asList(1, 2, 3, 4, 5));
Set<Integer> set2 = new HashSet<>(Arrays.asList(4, 5, 6, 7, 8));

// 和集合（union）
Set<Integer> union = new HashSet<>(set1);
union.addAll(set2);
System.out.println(union); // [1, 2, 3, 4, 5, 6, 7, 8]

// 積集合（intersection）
Set<Integer> intersection = new HashSet<>(set1);
intersection.retainAll(set2);
System.out.println(intersection); // [4, 5]

// 差集合（difference）
Set<Integer> difference = new HashSet<>(set1);
difference.removeAll(set2);
System.out.println(difference); // [1, 2, 3]
```

**順序を保持したい場合**:

```java
// LinkedHashSet: 挿入順序を保持
Set<String> linkedSet = new LinkedHashSet<>();
linkedSet.add("c");
linkedSet.add("a");
linkedSet.add("b");
System.out.println(linkedSet); // [c, a, b] (挿入順)

// TreeSet: ソート順を保持
Set<String> treeSet = new TreeSet<>();
treeSet.add("c");
treeSet.add("a");
treeSet.add("b");
System.out.println(treeSet); // [a, b, c] (自然順序)
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
s = {1, 2, 3}
s.add(4)
```

Python では**中括弧 `{}`** または**`set()`関数**を使って Set を作成する。

空の Set を作る場合は`set()`を使う（`{}`は空の辞書になるため注意）。

**主な操作メソッド**:

| メソッド/演算子            | 説明                                         |
| :------------------------- | :------------------------------------------- |
| `add(elem)`                | 要素を追加                                   |
| `remove(elem)`             | 要素を削除（存在しない場合エラー）           |
| `discard(elem)`            | 要素を削除（存在しなくてもエラーにならない） |
| `in`                       | 要素が存在するか確認                         |
| `len()`                    | 要素数を取得                                 |
| `clear()`                  | 全要素を削除                                 |
| `\|` (union)               | 和集合                                       |
| `&` (intersection)         | 積集合                                       |
| `-` (difference)           | 差集合                                       |
| `^` (symmetric_difference) | 対称差集合                                   |

```python
# Setの作成
s = {1, 2, 3}
print(s)  # {1, 2, 3}

# 空のSet
empty_set = set()
print(empty_set)  # set()

# リストからSetを作成（重複除去）
numbers = [1, 2, 3, 2, 1, 4, 5, 4]
unique_numbers = set(numbers)
print(unique_numbers)  # {1, 2, 3, 4, 5}

# 文字列からSetを作成
chars = set("hello")
print(chars)  # {'h', 'e', 'l', 'o'} (重複する'l'は1つ)

# 要素の追加
s.add(4)
print(s)  # {1, 2, 3, 4}

# 要素の存在確認
print(2 in s)  # True
print(10 in s)  # False

# 要素の削除
s.remove(2)
print(s)  # {1, 3, 4}

# discard()はエラーにならない
s.discard(10)  # エラーにならない
print(s)  # {1, 3, 4}

# Set同士の演算
set1 = {1, 2, 3, 4, 5}
set2 = {4, 5, 6, 7, 8}

# 和集合
union = set1 | set2
print(union)  # {1, 2, 3, 4, 5, 6, 7, 8}

# 積集合
intersection = set1 & set2
print(intersection)  # {4, 5}

# 差集合
difference = set1 - set2
print(difference)  # {1, 2, 3}

# 対称差集合（どちらか一方にのみ存在）
symmetric_diff = set1 ^ set2
print(symmetric_diff)  # {1, 2, 3, 6, 7, 8}

# メソッドでも実行可能
print(set1.union(set2))  # {1, 2, 3, 4, 5, 6, 7, 8}
print(set1.intersection(set2))  # {4, 5}
print(set1.difference(set2))  # {1, 2, 3}

# 部分集合の判定
set3 = {1, 2}
print(set3.issubset(set1))  # True (set3はset1の部分集合)
print(set1.issuperset(set3))  # True (set1はset3の上位集合)
```

**frozenset（不変な Set）**:

```python
# 変更不可能なSet
fs = frozenset([1, 2, 3])
# fs.add(4)  # エラー: frozensetは変更不可

# 辞書のキーとして使用可能
my_dict = {fs: "value"}
print(my_dict)  # {frozenset({1, 2, 3}): 'value'}
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
let s = new Set();
s.add("a");
```

JavaScript では**Set オブジェクト**を使って Set を利用する。

`new Set()`でインスタンスを生成する。配列やイテラブルを引数に渡すこともできる。

**主な操作メソッド/プロパティ**:

| メソッド/プロパティ | 説明                             |
| :------------------ | :------------------------------- |
| `add(value)`        | 要素を追加                       |
| `delete(value)`     | 要素を削除                       |
| `has(value)`        | 要素が存在するか確認             |
| `size`              | 要素数を取得                     |
| `clear()`           | 全要素を削除                     |
| `values()`          | 全要素のイテレータを返す         |
| `keys()`            | `values()`と同じ                 |
| `entries()`         | [value, value]のイテレータを返す |
| `forEach()`         | 各要素に対して関数を実行         |

```javascript
// Setの作成
let s = new Set();

// 要素を追加
s.add("a");
s.add("b");
s.add("c");
s.add("b"); // 重複は追加されない
s.add("a"); // 重複は追加されない

console.log(s); // Set(3) {'a', 'b', 'c'}
console.log(s.size); // 3

// 配列からSetを作成（重複除去）
let numbers = [1, 2, 3, 2, 1, 4, 5, 4];
let uniqueNumbers = new Set(numbers);
console.log(uniqueNumbers); // Set(5) {1, 2, 3, 4, 5}

// Setを配列に変換
let arr = [...uniqueNumbers];
console.log(arr); // [1, 2, 3, 4, 5]

// 要素の存在確認
console.log(s.has("b")); // true
console.log(s.has("d")); // false

// 要素を削除
s.delete("b");
console.log(s); // Set(2) {'a', 'c'}

// Set同士の演算
let set1 = new Set([1, 2, 3, 4, 5]);
let set2 = new Set([4, 5, 6, 7, 8]);

// 和集合
let union = new Set([...set1, ...set2]);
console.log(union); // Set(8) {1, 2, 3, 4, 5, 6, 7, 8}

// 積集合
let intersection = new Set([...set1].filter((x) => set2.has(x)));
console.log(intersection); // Set(2) {4, 5}

// 差集合
let difference = new Set([...set1].filter((x) => !set2.has(x)));
console.log(difference); // Set(3) {1, 2, 3}

// 対称差集合
let symmetricDiff = new Set([
  ...[...set1].filter((x) => !set2.has(x)),
  ...[...set2].filter((x) => !set1.has(x)),
]);
console.log(symmetricDiff); // Set(6) {1, 2, 3, 6, 7, 8}

// 反復処理
s.forEach((value) => {
  console.log(value);
});
// a
// c

// for...ofで反復
for (let value of s) {
  console.log(value);
}

// 全要素を削除
s.clear();
console.log(s); // Set(0) {}
console.log(s.size); // 0
```

**文字列の重複除去**:

```javascript
let str = "hello world";
let uniqueChars = new Set(str);
console.log(uniqueChars); // Set(8) {'h', 'e', 'l', 'o', ' ', 'w', 'r', 'd'}

// 配列に変換
let uniqueArr = [...uniqueChars];
console.log(uniqueArr.join("")); // helo wrld
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
set := make(map[int]bool)
set[1] = true
```

Go には**ビルトインの Set 型は存在しない**。

一般的に**`map[T]bool`** を使って Set を実装する。キーが存在するかどうかで Set の要素を管理する。

**基本的な操作**:

| 操作           | 実装方法                                        |
| :------------- | :---------------------------------------------- |
| 要素を追加     | `set[elem] = true`                              |
| 要素を削除     | `delete(set, elem)`                             |
| 要素の存在確認 | `_, exists := set[elem]`                        |
| 要素数を取得   | `len(set)`                                      |
| 全要素を削除   | `clear(set)` (Go 1.21+) または新しい map を作成 |

```go
import "fmt"

// Setの作成
set := make(map[string]bool)

// 要素を追加
set["a"] = true
set["b"] = true
set["c"] = true
set["b"] = true // 重複は無視される（上書き）
set["a"] = true // 重複は無視される（上書き）

fmt.Println(set) // map[a:true b:true c:true]
fmt.Println(len(set)) // 3

// スライスからSetを作成（重複除去）
numbers := []int{1, 2, 3, 2, 1, 4, 5, 4}
uniqueNumbers := make(map[int]bool)
for _, num := range numbers {
    uniqueNumbers[num] = true
}
fmt.Println(uniqueNumbers) // map[1:true 2:true 3:true 4:true 5:true]

// Setをスライスに変換
uniqueSlice := make([]int, 0, len(uniqueNumbers))
for num := range uniqueNumbers {
    uniqueSlice = append(uniqueSlice, num)
}
fmt.Println(uniqueSlice) // [1 2 3 4 5] (順序は保証されない)

// 要素の存在確認
if set["b"] {
    fmt.Println("b exists")
}

// より明示的な確認方法
if _, exists := set["b"]; exists {
    fmt.Println("b exists") // b exists
}

if _, exists := set["d"]; !exists {
    fmt.Println("d does not exist") // d does not exist
}

// 要素を削除
delete(set, "b")
fmt.Println(set) // map[a:true c:true]

// Set同士の演算
set1 := map[int]bool{1: true, 2: true, 3: true, 4: true, 5: true}
set2 := map[int]bool{4: true, 5: true, 6: true, 7: true, 8: true}

// 和集合
union := make(map[int]bool)
for k := range set1 {
    union[k] = true
}
for k := range set2 {
    union[k] = true
}
fmt.Println(union) // map[1:true 2:true 3:true 4:true 5:true 6:true 7:true 8:true]

// 積集合
intersection := make(map[int]bool)
for k := range set1 {
    if set2[k] {
        intersection[k] = true
    }
}
fmt.Println(intersection) // map[4:true 5:true]

// 差集合
difference := make(map[int]bool)
for k := range set1 {
    if !set2[k] {
        difference[k] = true
    }
}
fmt.Println(difference) // map[1:true 2:true 3:true]

// 反復処理
for key := range set {
    fmt.Println(key)
}

// 全要素を削除 (Go 1.21+)
clear(set)
fmt.Println(set) // map[]
fmt.Println(len(set)) // 0
```

**ジェネリックな Set 型を定義する方法（Go 1.18+）**:

```go
// Set型の定義
type Set[T comparable] map[T]struct{}

// Setを作成
func NewSet[T comparable]() Set[T] {
    return make(Set[T])
}

// 要素を追加
func (s Set[T]) Add(value T) {
    s[value] = struct{}{}
}

// 要素を削除
func (s Set[T]) Remove(value T) {
    delete(s, value)
}

// 要素の存在確認
func (s Set[T]) Contains(value T) bool {
    _, exists := s[value]
    return exists
}

// 要素数
func (s Set[T]) Size() int {
    return len(s)
}

// 使用例
set := NewSet[string]()
set.Add("a")
set.Add("b")
set.Add("c")

fmt.Println(set.Contains("b")) // true
fmt.Println(set.Size()) // 3

set.Remove("b")
fmt.Println(set.Contains("b")) // false
fmt.Println(set.Size()) // 2
```

**メモリ効率を考慮した実装**:

```go
// 空の構造体はメモリを消費しない
type void struct{}
var member void

set := make(map[string]void)
set["a"] = member
set["b"] = member

// または直接
set2 := make(map[string]struct{})
set2["a"] = struct{}{}
set2["b"] = struct{}{}
```

</div>
