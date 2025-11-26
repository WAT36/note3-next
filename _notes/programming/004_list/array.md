---
title: "配列・リスト"
date: "2019-10-18T19:35:30+09:00"
excerpt: "配列及びリストを定義する方法。"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-18T19:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

ここでは、配列とリストを宣言する方法について述べる。

配列もリストも、値の集合を示すデータ構造であるが、用途や特性に微妙な違いがある。

配列は、一般的に固定長だが、リストは可変長である。その分、配列はメモリ上に連続してデータを格納するため、メモリ効率が高い利点がある。

プログラミング言語により、配列、リストがあったりなかったりするので、片方のみがある言語についてはそちらのみを、両方ある言語については両方を書き記す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
// 配列
int[] arr = new int[5];
int[] arr2 = {1, 2, 3};

// リスト
List<Integer> list = new ArrayList<>();
```

Java では**配列**（固定長）と**リスト**（可変長）の両方が利用できる。

**配列**は宣言時に要素数を指定し、そのサイズは変更できない。型安全で高速アクセスが可能。

**リスト**は `java.util.List` インターフェースを実装した `ArrayList` を使用。要素の追加・削除が可能で、サイズが動的に変化する。

配列・リストへの値の代入・取得はインデックスで行う：

```java
arr[0] = 10;        // 代入
int value = arr[0]; // 取得

list.add(10);       // リストに追加
int val = list.get(0); // リストから取得
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
# リスト（配列的な役割も担う）
arr = []
arr = [1, 2, 3]
arr = list(range(5))
```

Python では**リスト**のみが利用でき、配列の概念はない。リストが配列とリストの両方の役割を担う。

リストは可変長で、異なる型の要素を混在させることができる。

```python
# リストの操作
arr = [1, 2, 3]
arr.append(4)      # 末尾に追加
arr.insert(0, 0)   # 指定位置に挿入
arr[0] = 10        # 要素の変更
print(arr[0])      # 要素の取得
print(len(arr))    # 長さの取得
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
// 配列（JavaScriptでは可変長）
let arr = [];
let arr2 = [1, 2, 3];
```

JavaScript では**Array**オブジェクトが配列・リストの両方の役割を担う。

Array は可変長で、異なる型の要素を混在させることができる。

```javascript
// 配列の操作
let arr = [1, 2, 3];
arr.push(4); // 末尾に追加
arr.pop(); // 末尾から削除
arr.unshift(0); // 先頭に追加
arr.shift(); // 先頭から削除
arr[0] = 10; // 要素の変更
console.log(arr[0]); // 要素の取得
console.log(arr.length); // 長さの取得
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
// 配列（固定長）
var arr [5]int
arr2 := [3]int{1, 2, 3}

// スライス（可変長）
slice := make([]int, 5)
slice2 := []int{1, 2, 3}
```

Go では**配列**（固定長）と**スライス**（可変長）の両方が利用できる。

**配列**は宣言時に要素数を指定し、サイズは変更できない。型は `[要素数]型名`。

**スライス**は参照型で、Go で最も頻繁に使用される。`make()` 関数またはリテラルで作成する。

```go
// 配列・スライスの操作
var arr [3]int = [3]int{1, 2, 3}
slice := make([]int, 3)
slice2 := []int{1, 2, 3}

arr[0] = 10        // 配列の要素変更
slice[0] = 10      // スライスの要素変更
slice = append(slice, 4) // スライスに追加

// スライス式（部分切り出し）
sub := slice[1:3]  // インデックス1から2まで
```

</div>
