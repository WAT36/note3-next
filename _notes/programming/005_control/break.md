---
title: "break文"
date: "2019-10-27T18:36:30+09:00"
excerpt: "break文について"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-27T18:36:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

ループを抜け出す際に用いる break 文についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
break;
```

Java では`break`文を使ってループを途中で中断し、抜け出すことができる。

**基本的な使い方**:

`for`文、`while`文などのループ内で`break`を実行すると、そのループを即座に終了する。

```java
for (int i = 0; i < 10; i++) {
    if (i > 3) {
        break; // i が 3 より大きくなったらループを抜ける
    }
    System.out.println(i);
}
// 出力: 0 1 2 3
```

**ネストしたループでの break**:

ネストしたループの場合、`break`は**最も内側のループ**のみを抜ける。

```java
for (int i = 0; i < 3; i++) {
    System.out.println("i = " + i);

    for (int j = 0; j < 3; j++) {
        if (j > 1) {
            break; // 内側のループのみ抜ける
        }
        System.out.println("  j = " + j);
    }
}
// 出力:
// i = 0
//   j = 0
//   j = 1
// i = 1
//   j = 0
//   j = 1
// i = 2
//   j = 0
//   j = 1
```

**ラベル付き break**:

外側のループを抜けたい場合は、**ラベル付き break**を使う。

```java
outer:
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        System.out.println("i=" + i + ", j=" + j);
        if (i == 1 && j == 1) {
            break outer; // 外側のループを抜ける
        }
    }
}
System.out.println("終了");
// 出力:
// i=0, j=0
// i=0, j=1
// i=0, j=2
// i=1, j=0
// i=1, j=1
// 終了
```

**switch 文での break**:

従来の`switch`文では、`break`を書かないとフォールスルー（次の case も実行される）が発生する。

```java
int k = 1;
switch (k) {
    case 1:
        System.out.println(1);
        // break がないので次のcaseも実行される
    case 2:
        System.out.println(2);
    default:
        System.out.println("default");
}
// 出力: 1 2 default
```

`break`を付けると、該当する case のみ実行される。

```java
int k = 1;
switch (k) {
    case 1:
        System.out.println(1);
        break; // ここで switch を抜ける
    case 2:
        System.out.println(2);
        break;
    default:
        System.out.println("default");
}
// 出力: 1
```

**switch 式（Java 12+）**:

Java 12 以降では、`switch`式を使うと`break`が不要になる。

```java
int k = 1;
String result = switch (k) {
    case 1 -> "one";
    case 2 -> "two";
    default -> "other";
};
System.out.println(result);
// 出力: one
```

**while 文での break**:

```java
int count = 0;
while (true) { // 無限ループ
    System.out.println(count);
    count++;
    if (count >= 5) {
        break; // 条件を満たしたら抜ける
    }
}
// 出力: 0 1 2 3 4
```

**実用例（検索処理）**:

```java
int[] numbers = {3, 7, 2, 9, 5};
int target = 9;
boolean found = false;

for (int num : numbers) {
    if (num == target) {
        found = true;
        break; // 見つかったら探索終了
    }
}

System.out.println(found ? "見つかりました" : "見つかりませんでした");
// 出力: 見つかりました
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
break
```

Python では`break`文を使ってループを途中で中断し、抜け出すことができる。

**基本的な使い方**:

`for`文、`while`文などのループ内で`break`を実行すると、そのループを即座に終了する。

```python
for i in range(10):
    if i > 3:
        break  # i が 3 より大きくなったらループを抜ける
    print(i)
# 出力: 0 1 2 3
```

**ネストしたループでの break**:

ネストしたループの場合、`break`は**最も内側のループ**のみを抜ける。

```python
for i in range(3):
    print(f"i = {i}")
    for j in range(3):
        if j > 1:
            break  # 内側のループのみ抜ける
        print(f"  j = {j}")
# 出力:
# i = 0
#   j = 0
#   j = 1
# i = 1
#   j = 0
#   j = 1
# i = 2
#   j = 0
#   j = 1
```

**注意: Python にはラベル付き break は存在しない**

外側のループを抜けたい場合は、フラグ変数を使うか、関数に切り出して`return`を使う。

```python
# フラグ変数を使う方法
found = False
for i in range(3):
    for j in range(3):
        print(f"i={i}, j={j}")
        if i == 1 and j == 1:
            found = True
            break
    if found:
        break
print("終了")

# 関数に切り出してreturnを使う方法
def search():
    for i in range(3):
        for j in range(3):
            print(f"i={i}, j={j}")
            if i == 1 and j == 1:
                return  # 関数を抜ける
    print("終了")

search()
```

**else 節と break**:

Python の`for`/`while`文には`else`節があり、`break`で抜けなかった場合のみ実行される。

```python
# breakで抜けた場合
for i in range(5):
    if i == 3:
        break
    print(i)
else:
    print("正常終了")  # 実行されない
# 出力: 0 1 2

# 正常終了した場合
for i in range(3):
    print(i)
else:
    print("正常終了")  # 実行される
# 出力: 0 1 2 正常終了
```

**while 文での break**:

```python
count = 0
while True:  # 無限ループ
    print(count)
    count += 1
    if count >= 5:
        break  # 条件を満たしたら抜ける
# 出力: 0 1 2 3 4
```

**実用例（検索処理）**:

```python
numbers = [3, 7, 2, 9, 5]
target = 9
found = False

for num in numbers:
    if num == target:
        found = True
        break  # 見つかったら探索終了

print("見つかりました" if found else "見つかりませんでした")
# 出力: 見つかりました
```

**else 節を使った検索処理**:

```python
numbers = [3, 7, 2, 9, 5]
target = 9

for num in numbers:
    if num == target:
        print("見つかりました")
        break
else:
    print("見つかりませんでした")
# 出力: 見つかりました
```

**match 文（Python 3.10+）での break**:

`match`文自体はループではないが、ループ内で使用される。`match`文内で`break`を使うとループを抜ける。

```python
for i in range(10):
    match i:
        case 0:
            print("ゼロ")
        case 1 | 2 | 3:
            print("1〜3")
        case 5:
            print("5に到達")
            break  # ループを抜ける
        case _:
            print(f"その他: {i}")
# 出力:
# ゼロ
# 1〜3
# 1〜3
# 1〜3
# その他: 4
# 5に到達
```

**リスト内包表記では break は使えない**:

リスト内包表記内で`break`を使うことはできない。代わりに条件でフィルタリングする。

```python
# これはエラー
# result = [i for i in range(10) if i < 5 else break]

# 正しい方法: 条件でフィルタリング
result = [i for i in range(10) if i < 5]
print(result)
# 出力: [0, 1, 2, 3, 4]
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
break;
```

JavaScript では`break`文を使ってループを途中で中断し、抜け出すことができる。

**基本的な使い方**:

`for`文、`while`文などのループ内で`break`を実行すると、そのループを即座に終了する。

```javascript
for (let i = 0; i < 10; i++) {
  if (i > 3) {
    break; // i が 3 より大きくなったらループを抜ける
  }
  console.log(i);
}
// 出力: 0 1 2 3
```

**ネストしたループでの break**:

ネストしたループの場合、`break`は**最も内側のループ**のみを抜ける。

```javascript
for (let i = 0; i < 3; i++) {
  console.log(`i = ${i}`);

  for (let j = 0; j < 3; j++) {
    if (j > 1) {
      break; // 内側のループのみ抜ける
    }
    console.log(`  j = ${j}`);
  }
}
// 出力:
// i = 0
//   j = 0
//   j = 1
// i = 1
//   j = 0
//   j = 1
// i = 2
//   j = 0
//   j = 1
```

**ラベル付き break**:

外側のループを抜けたい場合は、**ラベル付き break**を使う。

```javascript
outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    console.log(`i=${i}, j=${j}`);
    if (i === 1 && j === 1) {
      break outer; // 外側のループを抜ける
    }
  }
}
console.log("終了");
// 出力:
// i=0, j=0
// i=0, j=1
// i=0, j=2
// i=1, j=0
// i=1, j=1
// 終了
```

**switch 文での break**:

`switch`文では、`break`を書かないとフォールスルー（次の case も実行される）が発生する。

```javascript
let k = 1;
switch (k) {
  case 1:
    console.log(1);
  // break がないので次のcaseも実行される
  case 2:
    console.log(2);
  default:
    console.log("default");
}
// 出力: 1 2 default
```

`break`を付けると、該当する case のみ実行される。

```javascript
let k = 1;
switch (k) {
  case 1:
    console.log(1);
    break; // ここで switch を抜ける
  case 2:
    console.log(2);
    break;
  default:
    console.log("default");
}
// 出力: 1
```

**while 文での break**:

```javascript
let count = 0;
while (true) {
  // 無限ループ
  console.log(count);
  count++;
  if (count >= 5) {
    break; // 条件を満たしたら抜ける
  }
}
// 出力: 0 1 2 3 4
```

**for...of での break**:

```javascript
const fruits = ["apple", "banana", "orange"];

for (const fruit of fruits) {
  if (fruit === "banana") {
    break; // banana で終了
  }
  console.log(fruit);
}
// 出力: apple
```

**実用例（検索処理）**:

```javascript
const numbers = [3, 7, 2, 9, 5];
const target = 9;
let found = false;

for (const num of numbers) {
  if (num === target) {
    found = true;
    break; // 見つかったら探索終了
  }
}

console.log(found ? "見つかりました" : "見つかりませんでした");
// 出力: 見つかりました
```

**配列メソッドでは break は使えない**:

`forEach`や`map`などの配列メソッド内では`break`を使えない。代わりに`some`や`every`を使う。

```javascript
// これはエラー
// [1, 2, 3, 4, 5].forEach(num => {
//   if (num === 3) break;  // エラー
//   console.log(num);
// });

// 正しい方法1: some を使う（trueを返すと終了）
[1, 2, 3, 4, 5].some((num) => {
  if (num === 3) return true; // ループ終了
  console.log(num);
  return false; // 継続
});
// 出力: 1 2

// 正しい方法2: for...of を使う
for (const num of [1, 2, 3, 4, 5]) {
  if (num === 3) break;
  console.log(num);
}
// 出力: 1 2
```

**ブロック文では break は使えない**:

`break`はループと`switch`文でのみ使用可能。通常のブロック文では使えない。

```javascript
// これはエラー
// {
//   console.log("test");
//   break;  // エラー: Illegal break statement
// }
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
break
```

Go では`break`文を使ってループを途中で中断し、抜け出すことができる。

**基本的な使い方**:

`for`文などのループ内で`break`を実行すると、そのループを即座に終了する。

```go
import "fmt"

for i := 0; i < 10; i++ {
    if i > 3 {
        break // i が 3 より大きくなったらループを抜ける
    }
    fmt.Println(i)
}
// 出力: 0 1 2 3
```

**ネストしたループでの break**:

ネストしたループの場合、`break`は**最も内側のループ**のみを抜ける。

```go
for i := 0; i < 3; i++ {
    fmt.Printf("i = %d\n", i)

    for j := 0; j < 3; j++ {
        if j > 1 {
            break // 内側のループのみ抜ける
        }
        fmt.Printf("  j = %d\n", j)
    }
}
// 出力:
// i = 0
//   j = 0
//   j = 1
// i = 1
//   j = 0
//   j = 1
// i = 2
//   j = 0
//   j = 1
```

**ラベル付き break**:

外側のループを抜けたい場合は、**ラベル付き break**を使う。

```go
outer:
for i := 0; i < 3; i++ {
    for j := 0; j < 3; j++ {
        fmt.Printf("i=%d, j=%d\n", i, j)
        if i == 1 && j == 1 {
            break outer // 外側のループを抜ける
        }
    }
}
fmt.Println("終了")
// 出力:
// i=0, j=0
// i=0, j=1
// i=0, j=2
// i=1, j=0
// i=1, j=1
// 終了
```

**switch 文での break**:

Go の`switch`文は**自動的に break される**ため、明示的な`break`は不要。

```go
k := 1
switch k {
case 1:
    fmt.Println(1)
    // break 不要（自動的に終了）
case 2:
    fmt.Println(2)
default:
    fmt.Println("default")
}
// 出力: 1
```

次の case も実行したい場合は、`fallthrough`を使う。

```go
k := 1
switch k {
case 1:
    fmt.Println(1)
    fallthrough // 次のcaseも実行
case 2:
    fmt.Println(2)
default:
    fmt.Println("default")
}
// 出力: 1 2
```

`switch`文内で明示的に`break`を使うと、その時点で`switch`を抜ける。

```go
k := 1
switch k {
case 1:
    fmt.Println(1)
    if true {
        break // ここで switch を抜ける
    }
    fmt.Println("実行されない")
case 2:
    fmt.Println(2)
}
// 出力: 1
```

**無限ループでの break**:

```go
count := 0
for { // 無限ループ
    fmt.Println(count)
    count++
    if count >= 5 {
        break // 条件を満たしたら抜ける
    }
}
// 出力: 0 1 2 3 4
```

**range ループでの break**:

```go
fruits := []string{"apple", "banana", "orange"}

for _, fruit := range fruits {
    if fruit == "banana" {
        break // banana で終了
    }
    fmt.Println(fruit)
}
// 出力: apple
```

**select 文での break**:

`select`文で`break`を使うと、その`select`を抜ける。ループを抜けるわけではない。

```go
ch := make(chan int, 1)
ch <- 1

for {
    select {
    case val := <-ch:
        fmt.Println(val)
        break // selectを抜けるが、forループは継続
    default:
        fmt.Println("終了")
        goto end // ループを抜けるにはgotoかreturnを使う
    }
}
end:
```

`select`内のループを抜けるには、ラベル付き`break`を使う。

```go
ch := make(chan int, 1)
ch <- 1

loop:
for {
    select {
    case val := <-ch:
        fmt.Println(val)
        break loop // forループを抜ける
    default:
        fmt.Println("終了")
        break loop
    }
}
```

**実用例（検索処理）**:

```go
numbers := []int{3, 7, 2, 9, 5}
target := 9
found := false

for _, num := range numbers {
    if num == target {
        found = true
        break // 見つかったら探索終了
    }
}

if found {
    fmt.Println("見つかりました")
} else {
    fmt.Println("見つかりませんでした")
}
// 出力: 見つかりました
```

**型 switch での break**:

型`switch`でも`break`が使える。

```go
var x interface{} = 42

switch v := x.(type) {
case int:
    fmt.Println("int:", v)
    if v > 40 {
        break // switchを抜ける
    }
    fmt.Println("小さい値")
case string:
    fmt.Println("string:", v)
default:
    fmt.Println("unknown")
}
// 出力: int: 42
```

**defer との組み合わせ**:

`break`でループを抜けても、`defer`は実行される。

```go
func search() {
    defer fmt.Println("関数終了")

    for i := 0; i < 5; i++ {
        defer fmt.Println("ループ", i)
        if i == 2 {
            break
        }
    }
}

search()
// 出力:
// ループ 2
// ループ 1
// ループ 0
// 関数終了
```

</div>
