---
title: "ジェネレータ関数"
date: "2019-10-29T07:37:30+09:00"
excerpt: "ジェネレータ関数について"
tag: ["Python", "Javascript", "Go"]
programming: ["Python", "Javascript", "Go"]
updatedAt: "2019-10-29T07:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

ジェネレータ関数は、イテレータを生成する特殊な関数。通常の関数は`return`で値を返して終了するが、ジェネレータ関数は`yield`で値を返した後も状態を保持し、次の呼び出しで続きから処理を再開できる。

これにより、大量のデータを一度にメモリに展開せず、必要な時に必要な分だけ生成する遅延評価が可能になる。

<div class="note_content_by_programming_language" id="note_content_Python">

```python
def generator_name():
    yield value
```

Python では`yield`を使ってジェネレータ関数を定義する。ジェネレータ関数を呼び出すとジェネレータオブジェクトが返され、`next()`で値を取得できる。

**基本的なジェネレータ**:

```python
def count_up(start, end):
    current = start
    while current <= end:
        yield current
        current += 1

# ジェネレータオブジェクトを生成
gen = count_up(1, 5)

# next() で値を取得
print(next(gen))  # 1
print(next(gen))  # 2
print(next(gen))  # 3

# for ループで反復
for num in count_up(1, 3):
    print(num)
# 1
# 2
# 3
```

**ジェネレータの状態保持**:

```python
def counter():
    count = 0
    while True:
        yield count
        count += 1

gen = counter()
print(next(gen))  # 0
print(next(gen))  # 1
print(next(gen))  # 2
# 状態が保持される
```

**ジェネレータ式**:

リスト内包表記と同じ構文で、`[]`の代わりに`()`を使う。

```python
# リスト内包表記（全ての値をメモリに展開）
squares_list = [x**2 for x in range(10)]

# ジェネレータ式（遅延評価）
squares_gen = (x**2 for x in range(10))

for square in squares_gen:
    print(square)
```

**yield from（Python 3.3+）**:

他のイテラブルから値を委譲する。

```python
def flatten(nested_list):
    for item in nested_list:
        if isinstance(item, list):
            yield from flatten(item)  # 再帰的に展開
        else:
            yield item

nested = [1, [2, 3, [4, 5]], 6]
print(list(flatten(nested)))  # [1, 2, 3, 4, 5, 6]
```

**send() でジェネレータに値を送る**:

```python
def echo():
    while True:
        value = yield
        if value is not None:
            print(f"受信: {value}")

gen = echo()
next(gen)  # ジェネレータを開始
gen.send("Hello")   # 受信: Hello
gen.send("World")   # 受信: World
```

**ジェネレータの終了**:

```python
def limited_counter(max_count):
    count = 0
    while count < max_count:
        yield count
        count += 1
    return "終了"  # StopIteration 例外に値を含める

gen = limited_counter(3)
print(next(gen))  # 0
print(next(gen))  # 1
print(next(gen))  # 2

try:
    next(gen)
except StopIteration as e:
    print(e.value)  # 終了
```

**実用例（フィボナッチ数列）**:

```python
def fibonacci(n):
    a, b = 0, 1
    count = 0
    while count < n:
        yield a
        a, b = b, a + b
        count += 1

# 最初の10個のフィボナッチ数
for num in fibonacci(10):
    print(num, end=" ")
# 0 1 1 2 3 5 8 13 21 34
```

**実用例（ファイルの行を読む）**:

```python
def read_large_file(file_path):
    """大きなファイルを行ごとに読む（メモリ効率的）"""
    with open(file_path, 'r') as file:
        for line in file:
            yield line.strip()

# 使用例
# for line in read_large_file('large_file.txt'):
#     process(line)
```

**実用例（無限シーケンス）**:

```python
def infinite_sequence():
    num = 0
    while True:
        yield num
        num += 1

# itertools.islice で制限
from itertools import islice

gen = infinite_sequence()
first_10 = list(islice(gen, 10))
print(first_10)  # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

**実用例（データのバッチ処理）**:

```python
def batch(iterable, batch_size):
    """イテラブルをバッチに分割"""
    batch = []
    for item in iterable:
        batch.append(item)
        if len(batch) == batch_size:
            yield batch
            batch = []
    if batch:  # 残りを返す
        yield batch

data = range(10)
for b in batch(data, 3):
    print(b)
# [0, 1, 2]
# [3, 4, 5]
# [6, 7, 8]
# [9]
```

**ジェネレータのメリット**:

- メモリ効率が良い（遅延評価）
- 大きなデータセットを扱える
- 無限シーケンスを表現できる
- パイプライン処理が書きやすい

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
function* generatorName() {
  yield value;
}
```

JavaScript では`function*`構文と`yield`を使ってジェネレータ関数を定義する（ES6+）。ジェネレータ関数を呼び出すとジェネレータオブジェクトが返され、`next()`で値を取得できる。

**基本的なジェネレータ**:

```javascript
function* countUp(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

// ジェネレータオブジェクトを生成
const gen = countUp(1, 5);

// next() で値を取得
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }

// for...of で反復
for (const num of countUp(1, 3)) {
  console.log(num);
}
// 1
// 2
// 3
```

**ジェネレータの状態保持**:

```javascript
function* counter() {
  let count = 0;
  while (true) {
    yield count;
    count++;
  }
}

const gen = counter();
console.log(gen.next().value); // 0
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
// 状態が保持される
```

**yield で値を返す**:

`yield`は式なので、値を返すことができる。

```javascript
function* echo() {
  while (true) {
    const value = yield;
    console.log(`受信: ${value}`);
  }
}

const gen = echo();
gen.next(); // ジェネレータを開始
gen.next("Hello"); // 受信: Hello
gen.next("World"); // 受信: World
```

**yield\* で委譲**:

他のジェネレータやイテラブルから値を委譲する。

```javascript
function* gen1() {
  yield 1;
  yield 2;
}

function* gen2() {
  yield* gen1(); // gen1 の値を委譲
  yield 3;
}

console.log([...gen2()]); // [1, 2, 3]
```

**return で終了**:

`return`で値を返すと、ジェネレータが終了する。

```javascript
function* limitedCounter(maxCount) {
  let count = 0;
  while (count < maxCount) {
    yield count;
    count++;
  }
  return "終了";
}

const gen = limitedCounter(3);
console.log(gen.next()); // { value: 0, done: false }
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: '終了', done: true }
```

**実用例（フィボナッチ数列）**:

```javascript
function* fibonacci(n) {
  let [a, b] = [0, 1];
  let count = 0;
  while (count < n) {
    yield a;
    [a, b] = [b, a + b];
    count++;
  }
}

// 最初の10個のフィボナッチ数
console.log([...fibonacci(10)]);
// [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

**実用例（無限シーケンス）**:

```javascript
function* infiniteSequence() {
  let num = 0;
  while (true) {
    yield num;
    num++;
  }
}

// take 関数で制限
function* take(iterable, n) {
  let count = 0;
  for (const value of iterable) {
    if (count >= n) break;
    yield value;
    count++;
  }
}

const gen = infiniteSequence();
console.log([...take(gen, 10)]);
// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

**実用例（ID ジェネレータ）**:

```javascript
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id;
    id++;
  }
}

const ids = idGenerator();
console.log(ids.next().value); // 1
console.log(ids.next().value); // 2
console.log(ids.next().value); // 3
```

**実用例（配列のチャンク）**:

```javascript
function* chunk(array, size) {
  for (let i = 0; i < array.length; i += size) {
    yield array.slice(i, i + size);
  }
}

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
for (const batch of chunk(data, 3)) {
  console.log(batch);
}
// [1, 2, 3]
// [4, 5, 6]
// [7, 8, 9]
```

**async ジェネレータ（ES2018+）**:

非同期処理を扱うジェネレータ。

```javascript
async function* asyncGenerator() {
  yield await Promise.resolve(1);
  yield await Promise.resolve(2);
  yield await Promise.resolve(3);
}

(async () => {
  for await (const value of asyncGenerator()) {
    console.log(value);
  }
  // 1
  // 2
  // 3
})();
```

**ジェネレータのメリット**:

- メモリ効率が良い（遅延評価）
- 無限シーケンスを表現できる
- イテレータプロトコルに準拠
- `for...of`で簡単に反復できる

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
// クロージャやチャネルで代用
```

Go にはジェネレータの機能は組み込まれていないが、クロージャやチャネルを使って同等の機能を実現できる。

**クロージャを使ったジェネレータ**:

クロージャで状態を保持し、関数を呼び出すたびに次の値を返す。

```go
package main

import "fmt"

// カウンタジェネレータ
func counter() func() int {
    count := 0
    return func() int {
        count++
        return count
    }
}

func main() {
    gen := counter()
    fmt.Println(gen()) // 1
    fmt.Println(gen()) // 2
    fmt.Println(gen()) // 3
}
```

**範囲を生成するジェネレータ**:

```go
package main

import "fmt"

func rangeGenerator(start, end int) func() (int, bool) {
    current := start
    return func() (int, bool) {
        if current > end {
            return 0, false // 終了
        }
        value := current
        current++
        return value, true
    }
}

func main() {
    gen := rangeGenerator(1, 5)

    for {
        value, ok := gen()
        if !ok {
            break
        }
        fmt.Println(value)
    }
    // 1
    // 2
    // 3
    // 4
    // 5
}
```

**チャネルを使ったジェネレータ**:

ゴルーチンとチャネルを使って、より自然なジェネレータを実現できる。

```go
package main

import "fmt"

func countUp(start, end int) <-chan int {
    ch := make(chan int)
    go func() {
        defer close(ch)
        for i := start; i <= end; i++ {
            ch <- i
        }
    }()
    return ch
}

func main() {
    for num := range countUp(1, 5) {
        fmt.Println(num)
    }
    // 1
    // 2
    // 3
    // 4
    // 5
}
```

**実用例（フィボナッチ数列）**:

クロージャ版:

```go
package main

import "fmt"

func fibonacci() func() int {
    a, b := 0, 1
    return func() int {
        result := a
        a, b = b, a+b
        return result
    }
}

func main() {
    fib := fibonacci()
    for i := 0; i < 10; i++ {
        fmt.Print(fib(), " ")
    }
    // 0 1 1 2 3 5 8 13 21 34
}
```

チャネル版:

```go
package main

import "fmt"

func fibonacci(n int) <-chan int {
    ch := make(chan int)
    go func() {
        defer close(ch)
        a, b := 0, 1
        for i := 0; i < n; i++ {
            ch <- a
            a, b = b, a+b
        }
    }()
    return ch
}

func main() {
    for num := range fibonacci(10) {
        fmt.Print(num, " ")
    }
    // 0 1 1 2 3 5 8 13 21 34
}
```

**実用例（無限シーケンス）**:

```go
package main

import "fmt"

func infiniteSequence() <-chan int {
    ch := make(chan int)
    go func() {
        num := 0
        for {
            ch <- num
            num++
        }
    }()
    return ch
}

func main() {
    gen := infiniteSequence()

    // 最初の10個を取得
    for i := 0; i < 10; i++ {
        fmt.Print(<-gen, " ")
    }
    // 0 1 2 3 4 5 6 7 8 9
}
```

**実用例（バッチ処理）**:

```go
package main

import "fmt"

func batch(data []int, size int) <-chan []int {
    ch := make(chan []int)
    go func() {
        defer close(ch)
        for i := 0; i < len(data); i += size {
            end := i + size
            if end > len(data) {
                end = len(data)
            }
            ch <- data[i:end]
        }
    }()
    return ch
}

func main() {
    data := []int{1, 2, 3, 4, 5, 6, 7, 8, 9}
    for b := range batch(data, 3) {
        fmt.Println(b)
    }
    // [1 2 3]
    // [4 5 6]
    // [7 8 9]
}
```

**ジェネリクスを使ったジェネレータ（Go 1.18+）**:

```go
package main

import "fmt"

func Generate[T any](values ...T) <-chan T {
    ch := make(chan T)
    go func() {
        defer close(ch)
        for _, v := range values {
            ch <- v
        }
    }()
    return ch
}

func main() {
    // int のジェネレータ
    for num := range Generate(1, 2, 3, 4, 5) {
        fmt.Println(num)
    }

    // string のジェネレータ
    for str := range Generate("a", "b", "c") {
        fmt.Println(str)
    }
}
```

**クロージャ vs チャネル**:

| 方式       | メリット                         | デメリット           |
| ---------- | -------------------------------- | -------------------- |
| クロージャ | シンプル、軽量                   | 並行処理に不向き     |
| チャネル   | 並行処理に適している、読みやすい | オーバーヘッドがある |

通常はクロージャで十分だが、並行処理が必要な場合はチャネルを使う。

</div>
