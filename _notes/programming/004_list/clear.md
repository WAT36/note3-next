---
title: "リストを空にする"
date: "2019-10-27T12:35:30+09:00"
excerpt: "リストを空にする方法"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-27T12:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

リストから全ての要素を削除する方法についてを述べる。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
list.clear();
```

Java では**clear()**でリストの全要素を削除できる。

このメソッドは破壊的で、元のリストを空にする。

```java
import java.util.*;

List<Integer> numbers = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));
System.out.println("clear前: " + numbers); // [1, 2, 3, 4, 5]

numbers.clear();
System.out.println("clear後: " + numbers); // []
System.out.println("要素数: " + numbers.size()); // 0
```

**参照の扱い**:

`clear()`は同じリストオブジェクトを保持したまま要素を削除する。

```java
List<Integer> original = new ArrayList<>(Arrays.asList(1, 2, 3));
List<Integer> reference = original; // 同じリストを参照

original.clear();

System.out.println("original: " + original);   // []
System.out.println("reference: " + reference); // []（同じリストなので空）
```

**新しい空リストを作成する方法**:

```java
List<Integer> numbers = new ArrayList<>(Arrays.asList(1, 2, 3));
numbers = new ArrayList<>(); // 新しい空のリストを作成

// または
numbers = Collections.emptyList(); // 不変の空リスト
```

この場合、元のリストへの参照は保持されるが、変数は新しいリストを参照する。

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
my_list.clear()
```

Python では**clear()**でリストの全要素を削除できる。

このメソッドは破壊的で、元のリストを空にする。

```python
numbers = [1, 2, 3, 4, 5]
print("clear前:", numbers)  # [1, 2, 3, 4, 5]

numbers.clear()
print("clear後:", numbers)  # []
print("要素数:", len(numbers))  # 0
```

**スライス代入を使う方法**:

```python
numbers = [1, 2, 3, 4, 5]
numbers[:] = []  # スライス代入で全要素を削除
print(numbers)  # []
```

**参照の扱い**:

`clear()`やスライス代入は同じリストオブジェクトを保持したまま要素を削除する。

```python
original = [1, 2, 3]
reference = original  # 同じリストを参照

original.clear()

print("original:", original)    # []
print("reference:", reference)  # []（同じリストなので空）

# スライス代入も同じ
original = [1, 2, 3]
reference = original
original[:] = []

print("original:", original)    # []
print("reference:", reference)  # []
```

**新しい空リストを作成する方法**:

```python
numbers = [1, 2, 3, 4, 5]
numbers = []  # 新しい空のリストを作成
print(numbers)  # []
```

この場合、参照先が変わるため、元のリストへの他の参照には影響しない。

```python
original = [1, 2, 3]
reference = original

original = []  # 新しいリストを作成

print("original:", original)    # []
print("reference:", reference)  # [1, 2, 3]（元のリストを保持）
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
arr.length = 0;
```

JavaScript では配列を空にする専用メソッドはないが、いくつかの方法がある。

**方法 1: length を 0 に設定（推奨）**:

```javascript
let numbers = [1, 2, 3, 4, 5];
console.log("clear前:", numbers); // [1, 2, 3, 4, 5]

numbers.length = 0;
console.log("clear後:", numbers); // []
console.log("要素数:", numbers.length); // 0
```

この方法は破壊的で、同じ配列オブジェクトを保持したまま空にする。

**方法 2: splice()を使う**:

```javascript
let numbers = [1, 2, 3, 4, 5];
numbers.splice(0, numbers.length);
console.log(numbers); // []
```

または、より簡潔に：

```javascript
let numbers = [1, 2, 3, 4, 5];
numbers.splice(0);
console.log(numbers); // []
```

**方法 3: 新しい空配列を代入**:

```javascript
let numbers = [1, 2, 3, 4, 5];
numbers = [];
console.log(numbers); // []
```

**参照の扱いの違い**:

`length = 0`や`splice()`は元の配列を変更するため、参照している他の変数にも影響する。

```javascript
let original = [1, 2, 3];
let reference = original; // 同じ配列を参照

original.length = 0;

console.log("original:", original); // []
console.log("reference:", reference); // []（同じ配列なので空）
```

新しい配列を代入する場合は、参照先が変わるため他の参照には影響しない。

```javascript
let original = [1, 2, 3];
let reference = original;

original = []; // 新しい配列を作成

console.log("original:", original); // []
console.log("reference:", reference); // [1, 2, 3]（元の配列を保持）
```

**どの方法を使うべきか**:

- 元の配列を変更したい場合: `arr.length = 0`（最も高速）
- 配列の参照を共有している場合: `arr.length = 0`または`arr.splice(0)`
- 新しい配列を作りたい場合: `arr = []`

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
slice = slice[:0]
```

Go ではスライスを空にする専用の関数はないが、いくつかの方法がある。

**方法 1: スライス式を使う（推奨）**:

```go
import "fmt"

numbers := []int{1, 2, 3, 4, 5}
fmt.Println("clear前:", numbers) // [1 2 3 4 5]

numbers = numbers[:0]
fmt.Println("clear後:", numbers) // []
fmt.Println("要素数:", len(numbers)) // 0
fmt.Println("容量:", cap(numbers))   // 5（容量は保持される）
```

この方法は元のスライスの容量を保持したまま長さを 0 にする。

**方法 2: 新しい空のスライスを作成**:

```go
numbers := []int{1, 2, 3, 4, 5}
numbers = []int{}
fmt.Println(numbers) // []

// または
numbers = make([]int, 0)
fmt.Println(numbers) // []
```

**方法 3: nil スライスを代入**:

```go
numbers := []int{1, 2, 3, 4, 5}
numbers = nil
fmt.Println(numbers)           // []
fmt.Println(numbers == nil)    // true
fmt.Println(len(numbers))      // 0
```

**容量の扱いの違い**:

`slice[:0]`は容量を保持するため、メモリを解放しない。

```go
numbers := []int{1, 2, 3, 4, 5}
fmt.Println("元の容量:", cap(numbers)) // 5

numbers = numbers[:0]
fmt.Println("clear後の容量:", cap(numbers)) // 5（容量は保持される）
fmt.Println("clear後の長さ:", len(numbers)) // 0

// 新しいスライスを作成すると容量もリセット
numbers = []int{1, 2, 3, 4, 5}
numbers = []int{}
fmt.Println("新規作成後の容量:", cap(numbers)) // 0
```

**参照の扱い**:

Go のスライスは参照型だが、スライス自体を再代入すると参照先が変わる。

```go
original := []int{1, 2, 3}
reference := original // スライスヘッダーのコピー（同じ配列を参照）

// スライス式を使う場合
original = original[:0]
fmt.Println("original:", original)   // []
fmt.Println("reference:", reference) // [1 2 3]（別のスライスヘッダー）

// 新しいスライスを代入する場合も同様
original = []int{1, 2, 3}
reference = original
original = []int{}
fmt.Println("original:", original)   // []
fmt.Println("reference:", reference) // [1 2 3]
```

注意：Go のスライスは配列へのポインタを含むスライスヘッダーであり、代入は新しいヘッダーを作成する。

**clear()関数を使う方法（Go 1.21+）**:

Go 1.21 以降では、組み込みの`clear()`関数が使える。

```go
numbers := []int{1, 2, 3, 4, 5}
clear(numbers)
fmt.Println(numbers) // [0 0 0 0 0]（ゼロ値で埋められる）
fmt.Println(len(numbers)) // 5（長さは変わらない）

// 長さも0にするには
numbers = numbers[:0]
fmt.Println(numbers) // []
```

注意：`clear()`は要素をゼロ値にするだけで、長さは変えない。

**どの方法を使うべきか**:

- 容量を保持して再利用したい場合: `slice = slice[:0]`
- メモリを解放したい場合: `slice = nil`または`slice = []T{}`
- 既存の要素をゼロクリアしたい場合: `clear(slice)`（Go 1.21+）

**実用例**:

```go
func processData(data []string) {
    // データ処理用のバッファ
    buffer := make([]string, 0, 100)

    for _, item := range data {
        buffer = append(buffer, item)

        if len(buffer) >= 10 {
            // 処理
            fmt.Println("処理:", buffer)

            // バッファをクリア（容量は保持）
            buffer = buffer[:0]
        }
    }
}
```

</div>
