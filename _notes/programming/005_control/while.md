---
title: "while文"
date: "2019-10-27T17:36:30+09:00"
excerpt: "while文について"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-27T17:36:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

繰り返し処理を行う制御構文の一つ、while 文について各言語での利用法を示す。

また、言語にもよるが**do-while 文**についてもここで示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
while (条件式) { }
```

Java では`while`文を使って条件が真である限り繰り返し処理を行う。

**基本構文**:

```java
while (条件式) {
    // 処理
}
```

実行フロー:

1. 条件式を評価（`false`なら終了）
2. ループ本体を実行
3. 1 に戻る

**基本的な例**:

```java
int i = 0;
while (i < 5) {
      System.out.println(i);
    i++;
}
// 出力: 0 1 2 3 4
```

**無限ループ**:

```java
// 無限ループ
while (true) {
    // 処理
    break; // 抜けるにはbreakが必要
}

// 実用例
int count = 0;
while (true) {
    System.out.println(count);
    count++;
    if (count >= 5) {
        break;
    }
}
// 出力: 0 1 2 3 4
```

**break と continue**:

```java
// break: ループを抜ける
int i = 0;
while (i < 10) {
    if (i == 5) {
        break;
    }
    System.out.println(i);
    i++;
}
// 出力: 0 1 2 3 4

// continue: 次の反復へ
int j = 0;
while (j < 5) {
    j++;
    if (j == 3) {
        continue; // j が 3 の時はスキップ
    }
    System.out.println(j);
}
// 出力: 1 2 4 5
```

**do-while 文**:

`do-while`文は、**処理を先に実行してから条件を評価**する。条件が最初から偽でも、処理は少なくとも 1 回実行される。

```java
do {
    // 処理
} while (条件式);
```

**do-while の例**:

```java
int i = 0;
do {
  System.out.println(i);
    i++;
} while (i < 5);
// 出力: 0 1 2 3 4

// 条件が最初から偽でも1回実行される
int j = 10;
do {
    System.out.println("実行されます");
} while (j < 5);
// 出力: 実行されます
```

**while vs do-while の違い**:

```java
// while: 条件が最初から偽なら実行されない
int x = 10;
while (x < 5) {
    System.out.println("実行されない");
}
// 出力: なし

// do-while: 条件が最初から偽でも1回実行される
int y = 10;
do {
    System.out.println("1回実行される");
} while (y < 5);
// 出力: 1回実行される
```

**実用例（入力の検証）**:

```java
import java.util.Scanner;

Scanner scanner = new Scanner(System.in);
int input;

// 正の数が入力されるまで繰り返す
do {
    System.out.print("正の数を入力してください: ");
    input = scanner.nextInt();
} while (input <= 0);

System.out.println("入力された値: " + input);
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
while 条件式: ...
```

Python では`while`文を使って条件が真である限り繰り返し処理を行う。

**基本構文**:

```python
while 条件式:
    # 処理
```

条件式の後には**コロン（`:`）**が必要。インデントで処理のブロックを表す。

**基本的な例**:

```python
i = 0
while i < 5:
    print(i)
    i += 1
# 出力: 0 1 2 3 4
```

**無限ループ**:

```python
# 無限ループ
while True:
    # 処理
    break  # 抜けるにはbreakが必要

# 実用例
count = 0
while True:
    print(count)
    count += 1
    if count >= 5:
        break
# 出力: 0 1 2 3 4
```

**break と continue**:

```python
# break: ループを抜ける
i = 0
while i < 10:
    if i == 5:
        break
    print(i)
    i += 1
# 出力: 0 1 2 3 4

# continue: 次の反復へ
j = 0
while j < 5:
    j += 1
    if j == 3:
        continue  # j が 3 の時はスキップ
    print(j)
# 出力: 1 2 4 5
```

**else 節**:

`while`文には`else`節を付けることができ、ループが正常終了した時（`break`で抜けなかった時）に実行される。

```python
i = 0
while i < 5:
    print(i)
    i += 1
else:
    print("ループが正常に終了しました")
# 出力: 0 1 2 3 4
#      ループが正常に終了しました

# breakで抜けた場合はelse節は実行されない
j = 0
while j < 10:
    if j == 5:
        break
    print(j)
    j += 1
else:
    print("ループが正常に終了しました")  # 実行されない
# 出力: 0 1 2 3 4
```

**条件の動的な変更**:

```python
# リストから要素を取り出す
items = [1, 2, 3, 4, 5]
while items:  # リストが空でない限り
    item = items.pop()
    print(item)
# 出力: 5 4 3 2 1

# 文字列の処理
text = "hello"
index = 0
while index < len(text):
    print(text[index])
    index += 1
# 出力: h e l l o
```

**実用例（入力の検証）**:

```python
# 正の数が入力されるまで繰り返す
while True:
    try:
        num = int(input("正の数を入力してください: "))
        if num > 0:
            break
        print("正の数を入力してください")
    except ValueError:
        print("数値を入力してください")

print(f"入力された値: {num}")
```

**while vs for の使い分け**:

```python
# 回数が決まっている場合: for文を使う
for i in range(5):
    print(i)

# 条件が満たされるまで繰り返す場合: while文を使う
import random
attempts = 0
while random.randint(1, 10) != 5:
    attempts += 1
print(f"{attempts}回目で5が出ました")
```

**注意: Python には do-while 文は存在しない**

do-while と同じ動作を実現するには工夫が必要。

```python
# do-while風の実装（最初に1回実行）
i = 10
while True:
    print(i)
    i += 1
    if not (i < 5):  # 条件が偽なら終了
        break
# 出力: 10
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
while (条件式) {}
```

JavaScript では`while`文を使って条件が真である限り繰り返し処理を行う。

**基本構文**:

```javascript
while (条件式) {
  // 処理
}
```

**基本的な例**:

```javascript
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}
// 出力: 0 1 2 3 4
```

**無限ループ**:

```javascript
// 無限ループ
while (true) {
  // 処理
  break; // 抜けるにはbreakが必要
}

// 実用例
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

**break と continue**:

```javascript
// break: ループを抜ける
let i = 0;
while (i < 10) {
  if (i === 5) {
    break;
  }
  console.log(i);
  i++;
}
// 出力: 0 1 2 3 4

// continue: 次の反復へ
let j = 0;
while (j < 5) {
  j++;
  if (j === 3) {
    continue; // j が 3 の時はスキップ
  }
  console.log(j);
}
// 出力: 1 2 4 5
```

**条件の動的な変更**:

```javascript
// 配列から要素を取り出す
let items = [1, 2, 3, 4, 5];
while (items.length > 0) {
  let item = items.pop();
  console.log(item);
}
// 出力: 5 4 3 2 1

// 文字列の処理
let text = "hello";
let index = 0;
while (index < text.length) {
  console.log(text[index]);
  index++;
}
// 出力: h e l l o
```

**do-while 文**:

`do-while`文は、**処理を先に実行してから条件を評価**する。条件が最初から偽でも、処理は少なくとも 1 回実行される。

```javascript
do {
  // 処理
} while (条件式);
```

**do-while の例**:

```javascript
let i = 0;
do {
  console.log(i);
  i++;
} while (i < 5);
// 出力: 0 1 2 3 4

// 条件が最初から偽でも1回実行される
let j = 10;
do {
  console.log("実行されます");
} while (j < 5);
// 出力: 実行されます
```

**while vs do-while の違い**:

```javascript
// while: 条件が最初から偽なら実行されない
let x = 10;
while (x < 5) {
  console.log("実行されない");
}
// 出力: なし

// do-while: 条件が最初から偽でも1回実行される
let y = 10;
do {
  console.log("1回実行される");
} while (y < 5);
// 出力: 1回実行される
```

**実用例（入力の検証）**:

```javascript
let input;
do {
  input = prompt("正の数を入力してください:");
  input = parseInt(input);
} while (isNaN(input) || input <= 0);

console.log("入力された値: " + input);
```

**while vs for の使い分け**:

```javascript
// 回数が決まっている場合: for文を使う
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// 条件が満たされるまで繰り返す場合: while文を使う
let result = 0;
while (result !== 5) {
  result = Math.floor(Math.random() * 10);
  console.log(result);
}
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
for 条件式 { }
```

Go には**while 文は存在しない**。`for`文で同じことを実現する。

**基本構文（while のような使い方）**:

```go
for 条件式 {
    // 処理
}
```

これは`while`文と同じ動作をする。

**基本的な例**:

```go
import "fmt"

i := 0
for i < 5 {
    fmt.Println(i)
    i++
}
// 出力: 0 1 2 3 4
```

**無限ループ**:

```go
// 無限ループ
for {
    // 処理
    break // 抜けるにはbreakが必要
}

// 実用例
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

**break と continue**:

```go
// break: ループを抜ける
i := 0
for i < 10 {
    if i == 5 {
        break
    }
    fmt.Println(i)
    i++
}
// 出力: 0 1 2 3 4

// continue: 次の反復へ
j := 0
for j < 5 {
    j++
    if j == 3 {
        continue // j が 3 の時はスキップ
    }
    fmt.Println(j)
}
// 出力: 1 2 4 5
```

**簡易文付き for（while のような使い方）**:

```go
// 簡易文でループ変数のスコープを制限
for i := 0; i < 5; {
    fmt.Println(i)
    i++
}
// i はここではスコープ外

// より一般的な書き方
for i := 0; i < 5; i++ {
    fmt.Println(i)
}
```

**条件の動的な変更**:

```go
// スライスから要素を取り出す
items := []int{1, 2, 3, 4, 5}
for len(items) > 0 {
    // 最後の要素を取り出す
    item := items[len(items)-1]
    items = items[:len(items)-1]
    fmt.Println(item)
}
// 出力: 5 4 3 2 1

// 文字列の処理
text := "hello"
index := 0
for index < len(text) {
    fmt.Printf("%c ", text[index])
    index++
}
// 出力: h e l l o
```

**実用例（入力の検証）**:

```go
import (
    "fmt"
    "strconv"
    "bufio"
    "os"
)

reader := bufio.NewReader(os.Stdin)
var num int
var err error

for {
    fmt.Print("正の数を入力してください: ")
    input, _ := reader.ReadString('\n')
    input = strings.TrimSpace(input)

    num, err = strconv.Atoi(input)
    if err == nil && num > 0 {
        break
    }
    fmt.Println("正の数を入力してください")
}

fmt.Printf("入力された値: %d\n", num)
```

**チャネルを使った条件待ち**:

```go
ch := make(chan int, 5)

// 別のgoroutineで送信
go func() {
    for i := 0; i < 5; i++ {
        ch <- i
    }
    close(ch)
}()

// チャネルから受信（rangeの代わりにwhileのような書き方）
for {
    value, ok := <-ch
    if !ok {
        break // チャネルが閉じられたら終了
    }
    fmt.Println(value)
}
// 出力: 0 1 2 3 4
```

**for vs while スタイルの使い分け**:

```go
// 回数が決まっている場合: 標準的なfor文を使う
for i := 0; i < 5; i++ {
    fmt.Println(i)
}

// 条件が満たされるまで繰り返す場合: while風のfor文を使う
import "math/rand"

attempts := 0
for rand.Intn(10) != 5 {
    attempts++
}
fmt.Printf("%d回目で5が出ました\n", attempts)
```

**注意: Go には do-while 文は存在しない**

do-while と同じ動作を実現するには工夫が必要。

```go
// do-while風の実装（最初に1回実行）
i := 10
for {
    fmt.Println(i)
    i++
    if !(i < 5) { // 条件が偽なら終了
        break
    }
}
// 出力: 10

// または
j := 10
for ok := true; ok; ok = j < 5 {
    fmt.Println(j)
    j++
}
// 出力: 10
```

</div>
