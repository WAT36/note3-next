---
title: "可変長引数の関数"
date: "2019-10-29T06:37:30+09:00"
excerpt: "可変長引数の関数について"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-29T06:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

可変長引数を使うと、関数やメソッドを任意の個数の引数で呼び出せる。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
void methodName(Type... args) { }
```

Java では型の後に`...`を付けて可変長引数を定義する。可変長引数は配列として扱われる。

**基本的な可変長引数**:

```java
public class Main {
    // 可変長引数（配列として扱われる）
    public static int sum(int... numbers) {
        int total = 0;
        for (int num : numbers) {
            total += num;
        }
        return total;
    }

    public static void main(String[] args) {
        System.out.println(sum());              // 0
        System.out.println(sum(1));             // 1
        System.out.println(sum(1, 2, 3));       // 6
        System.out.println(sum(1, 2, 3, 4, 5)); // 15
    }
}
```

**通常の引数と可変長引数の組み合わせ**:

可変長引数は最後に配置する必要がある。

```java
public class Main {
    // 第1引数は通常の引数、第2引数以降は可変長引数
    public static String join(String separator, String... elements) {
        return String.join(separator, elements);
    }

    public static void main(String[] args) {
        System.out.println(join("/", "2020", "7", "19"));  // 2020/7/19
        System.out.println(join("-", "apple"));            // apple
        System.out.println(join(", ", "a", "b", "c"));     // a, b, c
    }
}
```

**配列を渡す**:

可変長引数には配列を直接渡すこともできる。

```java
public class Main {
    public static int max(int... numbers) {
        if (numbers.length == 0) {
            throw new IllegalArgumentException("引数が必要です");
        }

        int maxValue = numbers[0];
        for (int num : numbers) {
            if (num > maxValue) {
                maxValue = num;
            }
        }
        return maxValue;
    }

    public static void main(String[] args) {
        // 個別の引数として渡す
        System.out.println(max(1, 5, 3, 9, 2));  // 9

        // 配列として渡す
        int[] arr = {10, 20, 5, 15};
        System.out.println(max(arr));  // 20
    }
}
```

**制約事項**:

- 可変長引数は 1 つのメソッドに 1 つだけ定義できる
- 可変長引数は引数リストの最後に配置する必要がある
- 可変長引数の後に他の引数を定義できない

```java
// 正しい
public void method1(int x, String... args) { }

// 間違い（可変長引数が最後でない）
// public void method2(String... args, int x) { }

// 間違い（可変長引数が2つ）
// public void method3(String... args1, int... args2) { }
```

**実用例（ログ出力）**:

```java
public class Logger {
    public static void log(String level, String... messages) {
        System.out.print("[" + level + "] ");
        for (String message : messages) {
            System.out.print(message + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        log("INFO", "Application", "started");
        // [INFO] Application started

        log("ERROR", "Failed", "to", "connect", "to", "database");
        // [ERROR] Failed to connect to database
    }
}
```

**Stream API との組み合わせ**:

```java
import java.util.Arrays;

public class Main {
    public static int sum(int... numbers) {
        return Arrays.stream(numbers).sum();
    }

    public static double average(int... numbers) {
        return Arrays.stream(numbers).average().orElse(0.0);
    }

    public static void main(String[] args) {
        System.out.println(sum(1, 2, 3, 4, 5));        // 15
        System.out.println(average(1, 2, 3, 4, 5));    // 3.0
    }
}
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
def function_name(*args):
```

Python では引数の前に`*`を付けると可変長引数になる。引数はタプルとして扱われる。

**基本的な可変長引数 (\*args)**:

```python
def sum_numbers(*numbers):
    total = 0
    for num in numbers:
        total += num
    return total

print(sum_numbers())              # 0
print(sum_numbers(1))             # 1
print(sum_numbers(1, 2, 3))       # 6
print(sum_numbers(1, 2, 3, 4, 5)) # 15
```

**通常の引数と可変長引数の組み合わせ**:

```python
def join(separator, *elements):
    return separator.join(elements)

print(join("/", "2020", "7", "19"))  # 2020/7/19
print(join("-", "apple"))            # apple
print(join(", ", "a", "b", "c"))     # a, b, c
```

**キーワード可変長引数 (**kwargs)\*\*:

`**`を付けると、キーワード引数を辞書として受け取れる。

```python
def create_person(**info):
    return info

person1 = create_person(name="Alice", age=25)
print(person1)  # {'name': 'Alice', 'age': 25}

person2 = create_person(name="Bob", age=30, email="bob@example.com")
print(person2)  # {'name': 'Bob', 'age': 30, 'email': 'bob@example.com'}
```

**\*args と **kwargs の組み合わせ\*\*:

```python
def print_info(title, *args, **kwargs):
    print(f"タイトル: {title}")
    print(f"引数: {args}")
    print(f"キーワード引数: {kwargs}")

print_info("情報", "arg1", "arg2", name="Alice", age=25)
# タイトル: 情報
# 引数: ('arg1', 'arg2')
# キーワード引数: {'name': 'Alice', 'age': 25}
```

**リストやタプルを展開して渡す**:

```python
def sum_numbers(*numbers):
    return sum(numbers)

# 個別の引数として渡す
print(sum_numbers(1, 2, 3, 4, 5))  # 15

# リストを展開して渡す
numbers_list = [10, 20, 30]
print(sum_numbers(*numbers_list))  # 60

# タプルを展開して渡す
numbers_tuple = (5, 10, 15)
print(sum_numbers(*numbers_tuple))  # 30
```

**辞書を展開して渡す**:

```python
def create_person(name, age, email):
    return {"name": name, "age": age, "email": email}

person_data = {"name": "Alice", "age": 25, "email": "alice@example.com"}
person = create_person(**person_data)
print(person)
# {'name': 'Alice', 'age': 25, 'email': 'alice@example.com'}
```

**引数の順序**:

引数の順序は以下のようにする必要がある。

1. 通常の位置引数
2. `*args`（可変長位置引数）
3. キーワード専用引数
4. `**kwargs`（可変長キーワード引数）

```python
# 正しい
def func1(a, b, *args, **kwargs):
    pass

# 正しい（キーワード専用引数を含む）
def func2(a, *args, key_only, **kwargs):
    pass

# 間違い（*args の後に位置引数）
# def func3(a, *args, b, **kwargs):
#     pass  # b はキーワード専用引数になる
```

**実用例（ログ出力）**:

```python
def log(level, *messages, **options):
    separator = options.get("separator", " ")
    timestamp = options.get("timestamp", False)

    if timestamp:
        from datetime import datetime
        print(f"[{datetime.now()}]", end=" ")

    print(f"[{level}]", separator.join(messages))

log("INFO", "Application", "started")
# [INFO] Application started

log("ERROR", "Failed", "to", "connect", separator=" - ", timestamp=True)
# [2025-10-27 12:34:56.789] [ERROR] Failed - to - connect
```

**実用例（関数のラッパー）**:

```python
def retry(func, *args, max_attempts=3, **kwargs):
    """関数を最大 max_attempts 回試行する"""
    for attempt in range(max_attempts):
        try:
            return func(*args, **kwargs)
        except Exception as e:
            if attempt == max_attempts - 1:
                raise
            print(f"試行 {attempt + 1} 失敗: {e}")

def divide(a, b):
    return a / b

# result = retry(divide, 10, 2)  # 5.0
# result = retry(divide, 10, 0, max_attempts=2)  # 2回試行してエラー
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
function functionName(...args) {}
```

JavaScript では引数の前に`...`を付けると可変長引数（Rest Parameters）になる。引数は配列として扱われる。

**基本的な可変長引数**:

```javascript
function sumNumbers(...numbers) {
  let total = 0;
  for (const num of numbers) {
    total += num;
  }
  return total;
}

console.log(sumNumbers()); // 0
console.log(sumNumbers(1)); // 1
console.log(sumNumbers(1, 2, 3)); // 6
console.log(sumNumbers(1, 2, 3, 4, 5)); // 15
```

**通常の引数と可変長引数の組み合わせ**:

可変長引数は最後に配置する必要がある。

```javascript
function join(separator, ...elements) {
  return elements.join(separator);
}

console.log(join("/", "2020", "7", "19")); // 2020/7/19
console.log(join("-", "apple")); // apple
console.log(join(", ", "a", "b", "c")); // a, b, c
```

**配列を展開して渡す（Spread Operator）**:

```javascript
function sumNumbers(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

// 個別の引数として渡す
console.log(sumNumbers(1, 2, 3, 4, 5)); // 15

// 配列を展開して渡す
const numberArray = [10, 20, 30];
console.log(sumNumbers(...numberArray)); // 60
```

**配列メソッドとの組み合わせ**:

```javascript
function max(...numbers) {
  if (numbers.length === 0) {
    return -Infinity;
  }
  return Math.max(...numbers);
}

console.log(max(1, 5, 3, 9, 2)); // 9
console.log(max()); // -Infinity

const arr = [10, 20, 5, 15];
console.log(max(...arr)); // 20
```

**アロー関数での可変長引数**:

```javascript
const sum = (...numbers) => numbers.reduce((total, num) => total + num, 0);

console.log(sum(1, 2, 3, 4, 5)); // 15
```

**オブジェクトの Rest/Spread**:

オブジェクトでも`...`を使える（ES2018+）。

```javascript
function createPerson({ name, age, ...otherInfo }) {
  return {
    name,
    age,
    details: otherInfo,
  };
}

const person = createPerson({
  name: "Alice",
  age: 25,
  email: "alice@example.com",
  phone: "123-456-7890",
});

console.log(person);
// { name: 'Alice', age: 25, details: { email: 'alice@example.com', phone: '123-456-7890' } }
```

**制約事項**:

- 可変長引数は引数リストの最後に配置する必要がある
- 1 つの関数に 1 つだけ定義できる

```javascript
// 正しい
function func1(a, b, ...rest) {}

// 間違い（可変長引数が最後でない）
// function func2(...rest, a) { }

// 間違い（可変長引数が2つ）
// function func3(...rest1, ...rest2) { }
```

**実用例（ログ出力）**:

```javascript
function log(level, ...messages) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${level}]`, ...messages);
}

log("INFO", "Application", "started");
// [2025-10-27T12:34:56.789Z] [INFO] Application started

log("ERROR", "Failed", "to", "connect", "to", "database");
// [2025-10-27T12:34:56.789Z] [ERROR] Failed to connect to database
```

**実用例（配列の結合）**:

```javascript
function mergeArrays(...arrays) {
  return arrays.flat();
}

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arr3 = [7, 8, 9];

console.log(mergeArrays(arr1, arr2, arr3));
// [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

**実用例（オプションのマージ）**:

```javascript
function createConfig(defaults, ...overrides) {
  return Object.assign({}, defaults, ...overrides);
}

const defaultConfig = { host: "localhost", port: 3000 };
const userConfig = { port: 8080 };
const envConfig = { debug: true };

const config = createConfig(defaultConfig, userConfig, envConfig);
console.log(config);
// { host: 'localhost', port: 8080, debug: true }
```

**arguments オブジェクトとの違い**:

古い JavaScript では`arguments`オブジェクトを使っていたが、Rest Parameters の方が推奨される。

```javascript
// 古い方法（非推奨）
function oldSum() {
  let total = 0;
  for (let i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}

// 新しい方法（推奨）
function newSum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(oldSum(1, 2, 3)); // 6
console.log(newSum(1, 2, 3)); // 6
```

Rest Parameters の利点:

- 配列のメソッドが使える（`map`、`filter`、`reduce`など）
- アロー関数でも使える
- 通常の引数と組み合わせやすい

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
func functionName(args ...Type) ReturnType { }
```

Go では型の前に`...`を付けて可変長引数を定義する。可変長引数はスライスとして扱われる。

**基本的な可変長引数**:

```go
package main

import "fmt"

func sumNumbers(numbers ...int) int {
    total := 0
    for _, num := range numbers {
        total += num
    }
    return total
}

func main() {
    fmt.Println(sumNumbers())              // 0
    fmt.Println(sumNumbers(1))             // 1
    fmt.Println(sumNumbers(1, 2, 3))       // 6
    fmt.Println(sumNumbers(1, 2, 3, 4, 5)) // 15
}
```

**通常の引数と可変長引数の組み合わせ**:

可変長引数は最後に配置する必要がある。

```go
package main

import (
    "fmt"
    "strings"
)

func join(separator string, elements ...string) string {
    return strings.Join(elements, separator)
}

func main() {
    fmt.Println(join("/", "2020", "7", "19")) // 2020/7/19
    fmt.Println(join("-", "apple"))           // apple
    fmt.Println(join(", ", "a", "b", "c"))    // a, b, c
}
```

**スライスを展開して渡す**:

```go
package main

import "fmt"

func sumNumbers(numbers ...int) int {
    total := 0
    for _, num := range numbers {
        total += num
    }
    return total
}

func main() {
    // 個別の引数として渡す
    fmt.Println(sumNumbers(1, 2, 3, 4, 5)) // 15

    // スライスを展開して渡す
    numberSlice := []int{10, 20, 30}
    fmt.Println(sumNumbers(numberSlice...)) // 60
}
```

**型の指定**:

可変長引数は特定の型を指定する必要がある。

```go
package main

import "fmt"

// int 型の可変長引数
func sumInts(numbers ...int) int {
    total := 0
    for _, num := range numbers {
        total += num
    }
    return total
}

// string 型の可変長引数
func concatenate(separator string, strs ...string) string {
    result := ""
    for i, s := range strs {
        if i > 0 {
            result += separator
        }
        result += s
    }
    return result
}

func main() {
    fmt.Println(sumInts(1, 2, 3, 4, 5))
    fmt.Println(concatenate(" ", "Hello", "World"))
}
```

**ジェネリクスを使った可変長引数（Go 1.18+）**:

```go
package main

import "fmt"

// ジェネリクスを使った可変長引数
func Max[T int | float64](values ...T) T {
    if len(values) == 0 {
        var zero T
        return zero
    }

    max := values[0]
    for _, v := range values[1:] {
        if v > max {
            max = v
        }
    }
    return max
}

func main() {
    fmt.Println(Max(1, 5, 3, 9, 2))       // 9
    fmt.Println(Max(1.5, 3.2, 2.8, 4.1))  // 4.1
}
```

**空のインターフェース（any）を使った可変長引数**:

```go
package main

import "fmt"

// 任意の型の引数を受け取る
func printAll(values ...any) {
    for i, v := range values {
        fmt.Printf("[%d]: %v (type: %T)\n", i, v, v)
    }
}

func main() {
    printAll(1, "hello", 3.14, true)
    // [0]: 1 (type: int)
    // [1]: hello (type: string)
    // [2]: 3.14 (type: float64)
    // [3]: true (type: bool)
}
```

**制約事項**:

- 可変長引数は引数リストの最後に配置する必要がある
- 1 つの関数に 1 つだけ定義できる

```go
// 正しい
func func1(a int, b string, rest ...int) { }

// 間違い（可変長引数が最後でない）
// func func2(rest ...int, a int) { }

// 間違い（可変長引数が2つ）
// func func3(rest1 ...int, rest2 ...string) { }
```

**実用例（ログ出力）**:

```go
package main

import (
    "fmt"
    "strings"
    "time"
)

func log(level string, messages ...string) {
    timestamp := time.Now().Format("2006-01-02 15:04:05")
    message := strings.Join(messages, " ")
    fmt.Printf("[%s] [%s] %s\n", timestamp, level, message)
}

func main() {
    log("INFO", "Application", "started")
    // [2025-10-27 12:34:56] [INFO] Application started

    log("ERROR", "Failed", "to", "connect", "to", "database")
    // [2025-10-27 12:34:56] [ERROR] Failed to connect to database
}
```

**実用例（最大値・最小値）**:

```go
package main

import (
    "fmt"
    "math"
)

func max(first int, rest ...int) int {
    maxValue := first
    for _, v := range rest {
        if v > maxValue {
            maxValue = v
        }
    }
    return maxValue
}

func min(first int, rest ...int) int {
    minValue := first
    for _, v := range rest {
        if v < minValue {
            minValue = v
        }
    }
    return minValue
}

func main() {
    fmt.Println(max(1, 5, 3, 9, 2))  // 9
    fmt.Println(min(1, 5, 3, 9, 2))  // 1
}
```

**実用例（フォーマット関数）**:

```go
package main

import (
    "fmt"
    "strings"
)

type Config struct {
    Options []string
}

func NewConfig(options ...string) *Config {
    return &Config{
        Options: options,
    }
}

func (c *Config) String() string {
    return fmt.Sprintf("Config{Options: [%s]}", strings.Join(c.Options, ", "))
}

func main() {
    config := NewConfig("debug", "verbose", "color")
    fmt.Println(config)
    // Config{Options: [debug, verbose, color]}
}
```

**実用例（エラーのラップ）**:

```go
package main

import (
    "fmt"
    "strings"
)

type MultiError struct {
    Errors []error
}

func (m *MultiError) Error() string {
    messages := make([]string, len(m.Errors))
    for i, err := range m.Errors {
        messages[i] = err.Error()
    }
    return strings.Join(messages, "; ")
}

func CombineErrors(errors ...error) error {
    var validErrors []error
    for _, err := range errors {
        if err != nil {
            validErrors = append(validErrors, err)
        }
    }

    if len(validErrors) == 0 {
        return nil
    }

    return &MultiError{Errors: validErrors}
}

func main() {
    err1 := fmt.Errorf("error 1")
    err2 := fmt.Errorf("error 2")

    combined := CombineErrors(err1, nil, err2)
    fmt.Println(combined)
    // error 1; error 2
}
```

</div>
