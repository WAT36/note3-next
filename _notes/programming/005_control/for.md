---
title: "for文"
date: "2019-10-27T16:36:30+09:00"
excerpt: "for文について"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-27T16:36:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

繰り返し処理を行う制御構文の一つ、for 文について各言語での利用法を示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
for (int i = 0; i < n; i++) { }
```

Java では`for`文を使って繰り返し処理を行う。

**基本構文**:

```java
for (初期化式; 条件式; 変化式) {
    // 処理
}
```

実行フロー:

1. 初期化式を実行
2. 条件式を評価（`false`なら終了）
3. ループ本体を実行
4. 変化式を実行
5. 2 に戻る

**基本的な例**:

```java
// 0から4まで
for (int i = 0; i < 5; i++) {
    System.out.println(i);
}
// 出力: 0 1 2 3 4

// 10から1まで（降順）
for (int i = 10; i > 0; i--) {
    System.out.println(i);
}
// 出力: 10 9 8 7 6 5 4 3 2 1

// 2ずつ増加
for (int i = 0; i < 10; i += 2) {
      System.out.println(i);
}
// 出力: 0 2 4 6 8
```

**拡張 for 文（for-each）**:

配列やコレクションの全要素を反復処理する場合に便利。

```java
int[] numbers = {1, 2, 3, 4, 5};

// 拡張for文
for (int num : numbers) {
    System.out.println(num);
}
// 出力: 1 2 3 4 5

// リストの場合
List<String> fruits = Arrays.asList("apple", "banana", "cherry");
for (String fruit : fruits) {
    System.out.println(fruit);
}
// 出力: apple banana cherry
```

**ネストした for 文**:

```java
// 九九の表
for (int i = 1; i <= 9; i++) {
    for (int j = 1; j <= 9; j++) {
        System.out.print(i * j + "\t");
    }
    System.out.println();
}
```

**break と continue**:

```java
// break: ループを抜ける
for (int i = 0; i < 10; i++) {
    if (i == 5) {
        break; // i が 5 でループ終了
    }
    System.out.println(i);
}
// 出力: 0 1 2 3 4

// continue: 次の反復へ
for (int i = 0; i < 5; i++) {
    if (i == 2) {
        continue; // i が 2 の時はスキップ
    }
    System.out.println(i);
}
// 出力: 0 1 3 4
```

**ラベル付き break/continue**:

ネストしたループで外側のループを制御できる。

```java
outer:
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        if (i == 1 && j == 1) {
            break outer; // 外側のループを抜ける
        }
        System.out.println("i=" + i + ", j=" + j);
  }
}
```

**初期化式・変化式の省略**:

```java
// 初期化式を省略
int i = 0;
for (; i < 5; i++) {
    System.out.println(i);
}

// 変化式を省略
for (int j = 0; j < 5; ) {
    System.out.println(j);
    j++;
}

// 無限ループ（すべて省略）
for (;;) {
    // 無限ループ
    break; // 抜けるにはbreakが必要
}
```

**複数の変数**:

```java
for (int i = 0, j = 10; i < j; i++, j--) {
    System.out.println("i=" + i + ", j=" + j);
}
// 出力: i=0, j=10
//      i=1, j=9
//      ...
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
for i in range(n): ...
```

Python では`for`文を使ってイテラブルオブジェクトの要素を反復処理する。

**基本構文**:

```python
for 変数 in イテラブル:
    # 処理
```

イテラブルには`range()`、リスト、タプル、文字列などを指定できる。

**range()を使った基本的な例**:

```python
# 0から4まで
for i in range(5):
    print(i)
# 出力: 0 1 2 3 4

# 1から5まで
for i in range(1, 6):
    print(i)
# 出力: 1 2 3 4 5

# 0から10まで2ずつ
for i in range(0, 11, 2):
    print(i)
# 出力: 0 2 4 6 8 10

# 10から1まで（降順）
for i in range(10, 0, -1):
    print(i)
# 出力: 10 9 8 7 6 5 4 3 2 1
```

**リストやタプルの反復**:

```python
# リストの反復
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)
# 出力: apple banana cherry

# タプルの反復
numbers = (1, 2, 3, 4, 5)
for num in numbers:
    print(num)
# 出力: 1 2 3 4 5
```

**文字列の反復**:

```python
text = "Python"
for char in text:
    print(char)
# 出力: P y t h o n
```

**enumerate()でインデックスと値を取得**:

```python
fruits = ["apple", "banana", "cherry"]

for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")
# 出力: 0: apple
#      1: banana
#      2: cherry

# 開始インデックスを指定
for index, fruit in enumerate(fruits, start=1):
    print(f"{index}: {fruit}")
# 出力: 1: apple
#      2: banana
#      3: cherry
```

**辞書の反復**:

```python
person = {"name": "Alice", "age": 30, "city": "Tokyo"}

# キーのみ
for key in person:
    print(key)
# 出力: name age city

# 値のみ
for value in person.values():
    print(value)
# 出力: Alice 30 Tokyo

# キーと値
for key, value in person.items():
    print(f"{key}: {value}")
# 出力: name: Alice
#      age: 30
#      city: Tokyo
```

**zip()で複数のイテラブルを同時に反復**:

```python
names = ["Alice", "Bob", "Charlie"]
ages = [30, 25, 35]
cities = ["Tokyo", "Osaka", "Kyoto"]

for name, age, city in zip(names, ages, cities):
    print(f"{name} ({age}) lives in {city}")
# 出力: Alice (30) lives in Tokyo
#      Bob (25) lives in Osaka
#      Charlie (35) lives in Kyoto
```

**ネストした for 文**:

```python
# 九九の表
for i in range(1, 10):
    for j in range(1, 10):
        print(f"{i * j:3}", end="")
    print()
```

**break と continue**:

```python
# break: ループを抜ける
for i in range(10):
    if i == 5:
        break
    print(i)
# 出力: 0 1 2 3 4

# continue: 次の反復へ
for i in range(5):
    if i == 2:
        continue
    print(i)
# 出力: 0 1 3 4
```

**else 節**:

`for`文には`else`節を付けることができ、ループが正常終了した時（`break`で抜けなかった時）に実行される。

```python
for i in range(5):
    if i == 10:  # 条件を満たさない
        break
    print(i)
else:
    print("ループが正常に終了しました")
# 出力: 0 1 2 3 4
#      ループが正常に終了しました

# breakで抜けた場合はelse節は実行されない
for i in range(10):
    if i == 5:
        break
    print(i)
else:
    print("ループが正常に終了しました")  # 実行されない
# 出力: 0 1 2 3 4
```

**リスト内包表記**:

`for`文の代わりにリスト内包表記を使うとより簡潔に書ける。

```python
# for文
squares = []
for i in range(5):
    squares.append(i ** 2)
print(squares)  # [0, 1, 4, 9, 16]

# リスト内包表記
squares = [i ** 2 for i in range(5)]
print(squares)  # [0, 1, 4, 9, 16]

# 条件付き
evens = [i for i in range(10) if i % 2 == 0]
print(evens)  # [0, 2, 4, 6, 8]
```

**無限ループ**:

Python の`for`文では無限ループを直接書けないが、`while True`を使う。

```python
# while Trueで無限ループ
count = 0
while True:
    print(count)
    count += 1
    if count >= 5:
        break
# 出力: 0 1 2 3 4
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
for (let i = 0; i < n; i++) {}
```

JavaScript では`for`文を使って繰り返し処理を行う。

**基本構文**:

```javascript
for (初期化式; 条件式; 変化式) {
  // 処理
}
```

実行フローは Java と同じ。

**基本的な例**:

```javascript
// 0から4まで
for (let i = 0; i < 5; i++) {
  console.log(i);
}
// 出力: 0 1 2 3 4

// 10から1まで（降順）
for (let i = 10; i > 0; i--) {
  console.log(i);
}
// 出力: 10 9 8 7 6 5 4 3 2 1

// 2ずつ増加
for (let i = 0; i < 10; i += 2) {
  console.log(i);
}
// 出力: 0 2 4 6 8
```

**for...of（配列の反復）**:

配列やイテラブルオブジェクトの値を反復処理する。

```javascript
let fruits = ["apple", "banana", "cherry"];

for (let fruit of fruits) {
  console.log(fruit);
}
// 出力: apple banana cherry

// 文字列の反復
for (let char of "Hello") {
  console.log(char);
}
// 出力: H e l l o
```

**for...in（オブジェクトのキーの反復）**:

オブジェクトのキーを反復処理する。

```javascript
let person = {
  name: "Alice",
  age: 30,
  city: "Tokyo",
};

for (let key in person) {
  console.log(`${key}: ${person[key]}`);
}
// 出力: name: Alice
//      age: 30
//      city: Tokyo

// 配列にも使えるがインデックスが文字列になるので注意
let arr = ["a", "b", "c"];
for (let index in arr) {
  console.log(typeof index, index); // string 0, string 1, string 2
}
```

**entries()でインデックスと値を取得**:

```javascript
let fruits = ["apple", "banana", "cherry"];

for (let [index, fruit] of fruits.entries()) {
  console.log(`${index}: ${fruit}`);
}
// 出力: 0: apple
//      1: banana
//      2: cherry
```

**Object.keys/values/entries の反復**:

```javascript
let person = {
  name: "Alice",
  age: 30,
  city: "Tokyo",
};

// キーのみ
for (let key of Object.keys(person)) {
  console.log(key);
}
// 出力: name age city

// 値のみ
for (let value of Object.values(person)) {
  console.log(value);
}
// 出力: Alice 30 Tokyo

// キーと値
for (let [key, value] of Object.entries(person)) {
  console.log(`${key}: ${value}`);
}
// 出力: name: Alice
//      age: 30
//      city: Tokyo
```

**ネストした for 文**:

```javascript
// 九九の表
for (let i = 1; i <= 9; i++) {
  let line = "";
  for (let j = 1; j <= 9; j++) {
    line += i * j + "\t";
  }
  console.log(line);
}
```

**break と continue**:

```javascript
// break: ループを抜ける
for (let i = 0; i < 10; i++) {
  if (i === 5) {
    break;
  }
  console.log(i);
}
// 出力: 0 1 2 3 4

// continue: 次の反復へ
for (let i = 0; i < 5; i++) {
  if (i === 2) {
    continue;
  }
  console.log(i);
}
// 出力: 0 1 3 4
```

**ラベル付き break/continue**:

```javascript
outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) {
      break outer; // 外側のループを抜ける
    }
    console.log(`i=${i}, j=${j}`);
  }
}
```

**配列メソッド（forEach, map, filter）**:

`for`文の代わりに配列メソッドを使うとより関数型プログラミング的に書ける。

```javascript
let numbers = [1, 2, 3, 4, 5];

// forEach: 各要素に対して処理を実行
numbers.forEach((num, index) => {
  console.log(`${index}: ${num}`);
});

// map: 各要素を変換して新しい配列を作成
let squares = numbers.map((num) => num ** 2);
console.log(squares); // [1, 4, 9, 16, 25]

// filter: 条件を満たす要素で新しい配列を作成
let evens = numbers.filter((num) => num % 2 === 0);
console.log(evens); // [2, 4]

// reduce: 配列を畳み込む
let sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum); // 15
```

**無限ループ**:

```javascript
// すべて省略
for (;;) {
  // 無限ループ
  break; // 抜けるにはbreakが必要
}

// while (true) も使える
let count = 0;
while (true) {
  console.log(count);
  count++;
  if (count >= 5) {
    break;
  }
}
// 出力: 0 1 2 3 4
```

**複数の変数**:

```javascript
for (let i = 0, j = 10; i < j; i++, j--) {
  console.log(`i=${i}, j=${j}`);
}
// 出力: i=0, j=10
//      i=1, j=9
//      ...
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
for i := 0; i < n; i++ { }
```

Go では`for`文のみがループ構文である（`while`文は存在しない）。

**基本構文**:

```go
for 初期化式; 条件式; 変化式 {
    // 処理
}
```

実行フローは Java と同じ。括弧は不要。

**基本的な例**:

```go
import "fmt"

// 0から4まで
for i := 0; i < 5; i++ {
    fmt.Println(i)
}
// 出力: 0 1 2 3 4

// 10から1まで（降順）
for i := 10; i > 0; i-- {
    fmt.Println(i)
}
// 出力: 10 9 8 7 6 5 4 3 2 1

// 2ずつ増加
for i := 0; i < 10; i += 2 {
    fmt.Println(i)
}
// 出力: 0 2 4 6 8
```

**range（配列・スライスの反復）**:

`range`を使うと、配列やスライスのインデックスと値を取得できる。

```go
fruits := []string{"apple", "banana", "cherry"}

// インデックスと値を両方取得
for index, fruit := range fruits {
    fmt.Printf("%d: %s\n", index, fruit)
}
// 出力: 0: apple
//      1: banana
//      2: cherry

// 値のみ取得（インデックスを無視）
for _, fruit := range fruits {
    fmt.Println(fruit)
}
// 出力: apple banana cherry

// インデックスのみ取得
for index := range fruits {
    fmt.Println(index)
}
// 出力: 0 1 2
```

**map の反復**:

```go
person := map[string]interface{}{
    "name": "Alice",
    "age":  30,
    "city": "Tokyo",
}

// キーと値を取得
for key, value := range person {
    fmt.Printf("%s: %v\n", key, value)
}
// 出力: name: Alice
//      age: 30
//      city: Tokyo
// （順序は保証されない）

// キーのみ
for key := range person {
    fmt.Println(key)
}
```

**文字列の反復（rune）**:

```go
// 文字列をrangeで反復すると、rune（Unicode文字）を取得
text := "Hello, 世界"

for index, runeValue := range text {
    fmt.Printf("%d: %c (Unicode: %U)\n", index, runeValue, runeValue)
}
// 出力: 0: H (Unicode: U+0048)
//      1: e (Unicode: U+0065)
//      ...
//      7: 世 (Unicode: U+4E16)
//      10: 界 (Unicode: U+754C)
```

**条件のみの for（while のような使い方）**:

```go
// 条件式のみ（while文のような使い方）
i := 0
for i < 5 {
    fmt.Println(i)
    i++
}
// 出力: 0 1 2 3 4
```

**無限ループ**:

```go
// すべて省略で無限ループ
count := 0
for {
    fmt.Println(count)
    count++
    if count >= 5 {
        break
    }
}
// 出力: 0 1 2 3 4
```

**ネストした for 文**:

```go
// 九九の表
for i := 1; i <= 9; i++ {
    for j := 1; j <= 9; j++ {
        fmt.Printf("%3d", i*j)
    }
    fmt.Println()
}
```

**break と continue**:

```go
// break: ループを抜ける
for i := 0; i < 10; i++ {
    if i == 5 {
        break
    }
    fmt.Println(i)
}
// 出力: 0 1 2 3 4

// continue: 次の反復へ
for i := 0; i < 5; i++ {
    if i == 2 {
        continue
    }
    fmt.Println(i)
}
// 出力: 0 1 3 4
```

**ラベル付き break/continue**:

```go
outer:
for i := 0; i < 3; i++ {
    for j := 0; j < 3; j++ {
        if i == 1 && j == 1 {
            break outer // 外側のループを抜ける
        }
        fmt.Printf("i=%d, j=%d\n", i, j)
    }
}
```

**簡易文付き for**:

`for`文でも簡易文を使える。

```go
// 簡易文でループ変数のスコープを制限
for i, sum := 0, 0; i < 10; i++ {
    sum += i
    fmt.Println(sum)
}
// i と sum はここではスコープ外
```

**チャネルの反復**:

`range`をチャネルに使うと、チャネルが閉じるまで値を受信し続ける。

```go
ch := make(chan int, 3)

// チャネルに送信
ch <- 1
ch <- 2
ch <- 3
close(ch) // チャネルを閉じる（重要）

// チャネルから受信
for value := range ch {
    fmt.Println(value)
}
// 出力: 1 2 3

// closeしないとデッドロックが発生する
ch2 := make(chan int)
go func() {
    for i := 0; i < 3; i++ {
        ch2 <- i
    }
    close(ch2) // 必ず閉じる
}()

for value := range ch2 {
    fmt.Println(value)
}
// 出力: 0 1 2
```

**配列とスライスの違い**:

```go
// 配列
array := [3]int{1, 2, 3}
for i, v := range array {
    fmt.Printf("%d: %d\n", i, v)
}

// スライス
slice := []int{1, 2, 3}
for i, v := range slice {
    fmt.Printf("%d: %d\n", i, v)
}

// どちらも同じように使える
```

**range のコピー挙動**:

`range`は配列の場合はコピーを作成するが、スライスの場合は参照を使う。

```go
// スライスの場合（推奨）
slice := []int{1, 2, 3}
for i, v := range slice {
    slice[i] = v * 2 // スライス自体を変更できる
}
fmt.Println(slice) // [2 4 6]

// 配列の場合（コピーされる）
array := [3]int{1, 2, 3}
for i, v := range array {
    array[i] = v * 2 // これは動作するが注意が必要
}
fmt.Println(array) // [2 4 6]
```

</div>
