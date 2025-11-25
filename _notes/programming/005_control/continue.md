---
title: "continue文"
date: "2019-10-27T19:36:30+09:00"
excerpt: "continue文について"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-27T19:36:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

continue 文は for 文、while 文のループ処理において、そのループ 1 回分の処理をそこで終了し、条件式の判定（for 文の場合は変化式を行ってから）に移らせる文である。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
continue;
```

Java では`continue`文を使って、現在の反復の残りをスキップし、次の反復に進むことができる。

**基本的な使い方**:

`for`文、`while`文などのループ内で`continue`を実行すると、それ以降の処理をスキップして次の反復に進む。

```java
for (int i = 0; i < 5; i++) {
    if (i < 3) {
        continue; // i が 3 未満の時はスキップ
      }
      System.out.println(i);
    }
// 出力: 3 4
```

**ネストしたループでの continue**:

ネストしたループの場合、`continue`は**最も内側のループ**の次の反復に進む。

```java
for (int i = 0; i < 3; i++) {
    System.out.println("i = " + i);

    for (int j = 0; j < 3; j++) {
        if (j < 1) {
            continue; // 内側のループの次の反復へ
        }
        System.out.println("  j = " + j);
    }
}
// 出力:
// i = 0
//   j = 1
//   j = 2
// i = 1
//   j = 1
//   j = 2
// i = 2
//   j = 1
//   j = 2
```

**ラベル付き continue**:

外側のループの次の反復に進みたい場合は、**ラベル付き continue**を使う。

```java
outer:
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        if (j == 1) {
            continue outer; // 外側のループの次の反復へ
        }
        System.out.println("i=" + i + ", j=" + j);
    }
}
// 出力:
// i=0, j=0
// i=1, j=0
// i=2, j=0
```

**while 文での continue**:

```java
int i = 0;
while (i < 5) {
    i++;
    if (i < 3) {
        continue; // i が 3 未満の時はスキップ
    }
    System.out.println(i);
}
// 出力: 3 4 5
```

**実用例（偶数のみ処理）**:

```java
for (int i = 1; i <= 10; i++) {
    if (i % 2 != 0) {
        continue; // 奇数はスキップ
    }
    System.out.println(i + " は偶数");
}
// 出力: 2 は偶数 4 は偶数 6 は偶数 8 は偶数 10 は偶数
```

**実用例（null チェック）**:

```java
String[] names = {"Alice", null, "Bob", null, "Charlie"};

for (String name : names) {
    if (name == null) {
        continue; // null の場合はスキップ
    }
    System.out.println(name);
}
// 出力: Alice Bob Charlie
```

**continue と break の違い**:

```java
// continue: 次の反復へ
for (int i = 0; i < 5; i++) {
    if (i == 2) {
        continue;
    }
    System.out.print(i + " ");
}
// 出力: 0 1 3 4

System.out.println();

// break: ループを抜ける
for (int i = 0; i < 5; i++) {
    if (i == 2) {
        break;
    }
    System.out.print(i + " ");
}
// 出力: 0 1
```

**Stream API との比較**:

`continue`の代わりに Stream API の`filter`を使うこともできる。

```java
// continueを使った方法
for (int i = 1; i <= 5; i++) {
    if (i % 2 != 0) {
        continue;
    }
    System.out.println(i);
}

// Stream APIを使った方法
java.util.stream.IntStream.rangeClosed(1, 5)
    .filter(i -> i % 2 == 0)
    .forEach(System.out::println);
// どちらも出力: 2 4
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
continue
```

Python では`continue`文を使って、現在の反復の残りをスキップし、次の反復に進むことができる。

**基本的な使い方**:

`for`文、`while`文などのループ内で`continue`を実行すると、それ以降の処理をスキップして次の反復に進む。

```python
for i in range(5):
    if i < 3:
        continue  # i が 3 未満の時はスキップ
    print(i)
# 出力: 3 4
```

**ネストしたループでの continue**:

ネストしたループの場合、`continue`は**最も内側のループ**の次の反復に進む。

```python
for i in range(3):
    print(f"i = {i}")
    for j in range(3):
        if j < 1:
            continue  # 内側のループの次の反復へ
        print(f"  j = {j}")
# 出力:
# i = 0
#   j = 1
#   j = 2
# i = 1
#   j = 1
#   j = 2
# i = 2
#   j = 1
#   j = 2
```

**注意: Python にはラベル付き continue は存在しない**

外側のループの次の反復に進みたい場合は、フラグ変数を使うか、関数に切り出す。

```python
# フラグ変数を使う方法
for i in range(3):
    skip_outer = False
    for j in range(3):
        if j == 1:
            skip_outer = True
            break
    if skip_outer:
        continue
    print(f"i={i}, j={j}")

# 関数に切り出す方法
def process():
    for i in range(3):
        for j in range(3):
            if j == 1:
                return  # 外側のループも終了
            print(f"i={i}, j={j}")

process()
```

**while 文での continue**:

```python
i = 0
while i < 5:
    i += 1
    if i < 3:
        continue  # i が 3 未満の時はスキップ
    print(i)
# 出力: 3 4 5
```

**else 節と continue**:

Python の`for`/`while`文には`else`節があり、`break`で抜けなかった場合のみ実行される。`continue`では`else`節は影響を受けない。

```python
# continueを使っても else 節は実行される
for i in range(5):
    if i < 3:
        continue
    print(i)
else:
    print("正常終了")
# 出力: 3 4 正常終了

# breakを使うと else 節は実行されない
for i in range(5):
    if i == 3:
        break
    print(i)
else:
    print("正常終了")  # 実行されない
# 出力: 0 1 2
```

**実用例（偶数のみ処理）**:

```python
for i in range(1, 11):
    if i % 2 != 0:
        continue  # 奇数はスキップ
    print(f"{i} は偶数")
# 出力: 2 は偶数 4 は偶数 6 は偶数 8 は偶数 10 は偶数
```

**実用例（None チェック）**:

```python
names = ["Alice", None, "Bob", None, "Charlie"]

for name in names:
    if name is None:
        continue  # None の場合はスキップ
    print(name)
# 出力: Alice Bob Charlie
```

**continue と break の違い**:

```python
# continue: 次の反復へ
for i in range(5):
    if i == 2:
        continue
    print(i, end=" ")
# 出力: 0 1 3 4

print()

# break: ループを抜ける
for i in range(5):
    if i == 2:
        break
    print(i, end=" ")
# 出力: 0 1
```

**リスト内包表記での代替**:

`continue`の代わりにリスト内包表記の`if`条件を使うこともできる。

```python
# continueを使った方法
result = []
for i in range(1, 6):
    if i % 2 != 0:
        continue
    result.append(i)
print(result)

# リスト内包表記を使った方法
result = [i for i in range(1, 6) if i % 2 == 0]
print(result)
# どちらも出力: [2, 4]
```

**match 文（Python 3.10+）での continue**:

`match`文内で`continue`を使うことができる。

```python
for i in range(10):
    match i:
        case 0 | 1 | 2:
            continue  # 0, 1, 2 はスキップ
        case 5:
            print("5に到達")
        case _:
            print(f"その他: {i}")
# 出力:
# その他: 3
# その他: 4
# 5に到達
# その他: 6
# その他: 7
# その他: 8
# その他: 9
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
continue;
```

JavaScript では`continue`文を使って、現在の反復の残りをスキップし、次の反復に進むことができる。

**基本的な使い方**:

`for`文、`while`文などのループ内で`continue`を実行すると、それ以降の処理をスキップして次の反復に進む。

```javascript
for (let i = 0; i < 5; i++) {
  if (i < 3) {
    continue; // i が 3 未満の時はスキップ
  }
  console.log(i);
}
// 出力: 3 4
```

**ネストしたループでの continue**:

ネストしたループの場合、`continue`は**最も内側のループ**の次の反復に進む。

```javascript
for (let i = 0; i < 3; i++) {
  console.log(`i = ${i}`);

  for (let j = 0; j < 3; j++) {
    if (j < 1) {
      continue; // 内側のループの次の反復へ
    }
    console.log(`  j = ${j}`);
  }
}
// 出力:
// i = 0
//   j = 1
//   j = 2
// i = 1
//   j = 1
//   j = 2
// i = 2
//   j = 1
//   j = 2
```

**ラベル付き continue**:

外側のループの次の反復に進みたい場合は、**ラベル付き continue**を使う。

```javascript
outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (j === 1) {
      continue outer; // 外側のループの次の反復へ
    }
    console.log(`i=${i}, j=${j}`);
  }
}
// 出力:
// i=0, j=0
// i=1, j=0
// i=2, j=0
```

**while 文での continue**:

```javascript
let i = 0;
while (i < 5) {
  i++;
  if (i < 3) {
    continue; // i が 3 未満の時はスキップ
  }
  console.log(i);
}
// 出力: 3 4 5
```

**for...of での continue**:

```javascript
const fruits = ["apple", "banana", "orange", "grape"];

for (const fruit of fruits) {
  if (fruit === "banana") {
    continue; // banana はスキップ
  }
  console.log(fruit);
}
// 出力: apple orange grape
```

**実用例（偶数のみ処理）**:

```javascript
for (let i = 1; i <= 10; i++) {
  if (i % 2 !== 0) {
    continue; // 奇数はスキップ
  }
  console.log(`${i} は偶数`);
}
// 出力: 2 は偶数 4 は偶数 6 は偶数 8 は偶数 10 は偶数
```

**実用例（null/undefined チェック）**:

```javascript
const names = ["Alice", null, "Bob", undefined, "Charlie"];

for (const name of names) {
  if (!name) {
    continue; // null/undefined の場合はスキップ
  }
  console.log(name);
}
// 出力: Alice Bob Charlie
```

**continue と break の違い**:

```javascript
// continue: 次の反復へ
for (let i = 0; i < 5; i++) {
  if (i === 2) {
    continue;
  }
  console.log(i);
}
// 出力: 0 1 3 4

// break: ループを抜ける
for (let i = 0; i < 5; i++) {
  if (i === 2) {
    break;
  }
  console.log(i);
}
// 出力: 0 1
```

**配列メソッドでは continue は使えない**:

`forEach`や`map`などの配列メソッド内では`continue`を使えない。代わりに`return`を使うか、`filter`で事前にフィルタリングする。

```javascript
// これはエラー
// [1, 2, 3, 4, 5].forEach(num => {
//   if (num % 2 !== 0) continue;  // エラー
//   console.log(num);
// });

// 正しい方法1: return を使う（次の要素へ）
[1, 2, 3, 4, 5].forEach((num) => {
  if (num % 2 !== 0) return; // 次の要素へ
  console.log(num);
});
// 出力: 2 4

// 正しい方法2: filter で事前にフィルタリング
[1, 2, 3, 4, 5]
  .filter((num) => num % 2 === 0)
  .forEach((num) => {
    console.log(num);
  });
// 出力: 2 4

// 正しい方法3: for...of を使う
for (const num of [1, 2, 3, 4, 5]) {
  if (num % 2 !== 0) continue;
  console.log(num);
}
// 出力: 2 4
```

**配列メソッドでの代替**:

```javascript
// continueを使った方法
const result = [];
for (let i = 1; i <= 5; i++) {
  if (i % 2 !== 0) {
    continue;
  }
  result.push(i);
}
console.log(result);

// filter を使った方法
const result2 = [1, 2, 3, 4, 5].filter((i) => i % 2 === 0);
console.log(result2);
// どちらも出力: [2, 4]
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
continue
```

Go では`continue`文を使って、現在の反復の残りをスキップし、次の反復に進むことができる。

**基本的な使い方**:

`for`文などのループ内で`continue`を実行すると、それ以降の処理をスキップして次の反復に進む。

```go
import "fmt"

for i := 0; i < 5; i++ {
    if i < 3 {
        continue // i が 3 未満の時はスキップ
    }
    fmt.Println(i)
}
// 出力: 3 4
```

**ネストしたループでの continue**:

ネストしたループの場合、`continue`は**最も内側のループ**の次の反復に進む。

```go
for i := 0; i < 3; i++ {
    fmt.Printf("i = %d\n", i)

    for j := 0; j < 3; j++ {
        if j < 1 {
            continue // 内側のループの次の反復へ
        }
        fmt.Printf("  j = %d\n", j)
    }
}
// 出力:
// i = 0
//   j = 1
//   j = 2
// i = 1
//   j = 1
//   j = 2
// i = 2
//   j = 1
//   j = 2
```

**ラベル付き continue**:

外側のループの次の反復に進みたい場合は、**ラベル付き continue**を使う。

```go
outer:
for i := 0; i < 3; i++ {
    for j := 0; j < 3; j++ {
        if j == 1 {
            continue outer // 外側のループの次の反復へ
        }
        fmt.Printf("i=%d, j=%d\n", i, j)
    }
}
// 出力:
// i=0, j=0
// i=1, j=0
// i=2, j=0
```

**while 風 for 文での continue**:

```go
i := 0
for i < 5 {
    i++
    if i < 3 {
        continue // i が 3 未満の時はスキップ
    }
    fmt.Println(i)
}
// 出力: 3 4 5
```

**range ループでの continue**:

```go
fruits := []string{"apple", "banana", "orange", "grape"}

for _, fruit := range fruits {
    if fruit == "banana" {
        continue // banana はスキップ
    }
    fmt.Println(fruit)
}
// 出力: apple orange grape
```

**実用例（偶数のみ処理）**:

```go
for i := 1; i <= 10; i++ {
    if i%2 != 0 {
        continue // 奇数はスキップ
    }
    fmt.Printf("%d は偶数\n", i)
}
// 出力: 2 は偶数 4 は偶数 6 は偶数 8 は偶数 10 は偶数
```

**実用例（空文字列チェック）**:

```go
names := []string{"Alice", "", "Bob", "", "Charlie"}

for _, name := range names {
    if name == "" {
        continue // 空文字列の場合はスキップ
    }
    fmt.Println(name)
}
// 出力: Alice Bob Charlie
```

**continue と break の違い**:

```go
// continue: 次の反復へ
for i := 0; i < 5; i++ {
    if i == 2 {
        continue
    }
    fmt.Print(i, " ")
}
// 出力: 0 1 3 4

fmt.Println()

// break: ループを抜ける
for i := 0; i < 5; i++ {
    if i == 2 {
        break
    }
    fmt.Print(i, " ")
}
// 出力: 0 1
```

**map の反復での continue**:

```go
scores := map[string]int{
    "Alice":   85,
    "Bob":     60,
    "Charlie": 90,
    "David":   55,
}

fmt.Println("合格者:")
for name, score := range scores {
    if score < 70 {
        continue // 70点未満はスキップ
    }
    fmt.Printf("%s: %d点\n", name, score)
}
// 出力:
// 合格者:
// Alice: 85点
// Charlie: 90点
```

**select 文での continue**:

`select`文内で`continue`を使うと、外側のループの次の反復に進む。

```go
ch := make(chan int, 3)
ch <- 1
ch <- 2
ch <- 3
close(ch)

for {
    select {
    case val, ok := <-ch:
        if !ok {
            goto end // チャネルが閉じられたら終了
        }
        if val == 2 {
            continue // 2 の時はスキップ
        }
        fmt.Println(val)
    }
}
end:
// 出力: 1 3
```

**チャネル反復での continue**:

```go
ch := make(chan int, 5)
go func() {
    for i := 0; i < 5; i++ {
        ch <- i
    }
    close(ch)
}()

for val := range ch {
    if val%2 != 0 {
        continue // 奇数はスキップ
    }
    fmt.Println(val)
}
// 出力: 0 2 4
```

**スライスのフィルタリングでの代替**:

```go
// continueを使った方法
numbers := []int{1, 2, 3, 4, 5}
var evens []int
for _, num := range numbers {
    if num%2 != 0 {
        continue
    }
    evens = append(evens, num)
}
fmt.Println(evens)

// 関数を使った方法
func filterEven(numbers []int) []int {
    var result []int
    for _, num := range numbers {
        if num%2 == 0 {
            result = append(result, num)
        }
    }
    return result
}

evens2 := filterEven([]int{1, 2, 3, 4, 5})
fmt.Println(evens2)
// どちらも出力: [2 4]
```

**defer との組み合わせ**:

`continue`で次の反復に進んでも、その反復内の`defer`は実行される。

```go
for i := 0; i < 3; i++ {
    defer fmt.Println("ループ終了後:", i)

    if i < 2 {
        continue
    }
    fmt.Println("処理:", i)
}
// 出力:
// 処理: 2
// ループ終了後: 2
// ループ終了後: 1
// ループ終了後: 0
```

</div>
