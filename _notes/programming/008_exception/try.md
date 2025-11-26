---
title: "例外処理(try文)"
date: "2019-10-30T00:37:30+09:00"
excerpt: "例外処理(try文)について"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-30T00:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

例外処理は、プログラム実行時に発生するエラーを適切に処理する仕組み。各言語で構文が異なるが、基本的な考え方は共通している。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
try { } catch (ExceptionType e) { }
```

Java では try-catch-finally 文で例外処理を行う。

**基本的な try-catch**:

```java
public class Main {
    public static void main(String[] args) {
        try {
            int result = 10 / 0;  // ArithmeticException が発生
            System.out.println(result);
        } catch (ArithmeticException e) {
            System.out.println("ゼロ除算エラー: " + e.getMessage());
        }

        System.out.println("プログラム継続");
    }
}

// 出力:
// ゼロ除算エラー: / by zero
// プログラム継続
```

**複数の catch**:

```java
public class Main {
    public static void main(String[] args) {
        String[] array = {"0", "1", "abc"};

        try {
            int index = 5;
            String value = array[index];  // ArrayIndexOutOfBoundsException
            int number = Integer.parseInt(value);  // NumberFormatException
            System.out.println(number);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("配列の範囲外: " + e.getMessage());
        } catch (NumberFormatException e) {
            System.out.println("数値変換エラー: " + e.getMessage());
        }
    }
}
```

**複数の例外を同時にキャッチ（Java 7+）**:

```java
try {
    // 処理
} catch (IOException | SQLException e) {
    System.out.println("エラー: " + e.getMessage());
}
```

**finally 句**:

例外の有無にかかわらず必ず実行される。

```java
import java.io.*;

public class Main {
    public static void main(String[] args) {
        BufferedReader reader = null;

        try {
            reader = new BufferedReader(new FileReader("file.txt"));
            String line = reader.readLine();
            System.out.println(line);
        } catch (IOException e) {
            System.out.println("ファイル読み込みエラー: " + e.getMessage());
        } finally {
            // 必ず実行される
            if (reader != null) {
                try {
                    reader.close();
                    System.out.println("ファイルを閉じました");
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
    }
  }
}
```

**try-with-resources（Java 7+）**:

リソースの自動クローズ（推奨）。

```java
import java.io.*;

public class Main {
    public static void main(String[] args) {
        try (BufferedReader reader = new BufferedReader(new FileReader("file.txt"))) {
            String line = reader.readLine();
            System.out.println(line);
        } catch (IOException e) {
            System.out.println("エラー: " + e.getMessage());
        }
        // reader.close() が自動的に呼ばれる
    }
}
```

**例外の再送出**:

```java
public class Main {
    public static void processData() throws IOException {
        try {
            // 処理
            throw new IOException("データエラー");
        } catch (IOException e) {
            System.out.println("ログ記録: " + e.getMessage());
            throw e;  // 例外を再送出
        }
    }

    public static void main(String[] args) {
        try {
            processData();
        } catch (IOException e) {
            System.out.println("上位でキャッチ: " + e.getMessage());
        }
    }
}

// 出力:
// ログ記録: データエラー
// 上位でキャッチ: データエラー
```

**カスタム例外**:

```java
class CustomException extends Exception {
    public CustomException(String message) {
        super(message);
    }
}

public class Main {
    public static void validate(int value) throws CustomException {
        if (value < 0) {
            throw new CustomException("値は0以上である必要があります");
        }
    }

    public static void main(String[] args) {
        try {
            validate(-5);
        } catch (CustomException e) {
            System.out.println("カスタムエラー: " + e.getMessage());
        }
    }
}
```

**チェック例外と非チェック例外**:

- **チェック例外**: メソッドシグネチャで宣言が必要（`IOException`など）
- **非チェック例外**: 宣言不要（`RuntimeException`のサブクラス）

```java
// チェック例外（throws 宣言が必要）
public void readFile() throws IOException {
    throw new IOException("ファイルエラー");
}

// 非チェック例外（throws 宣言不要）
public void divide(int a, int b) {
    if (b == 0) {
        throw new IllegalArgumentException("ゼロで割れません");
    }
}
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
try:
    pass
except ExceptionType:
    pass
```

Python では try-except-finally 文で例外処理を行う。

**基本的な try-except**:

```python
try:
    result = 10 / 0  # ZeroDivisionError が発生
    print(result)
except ZeroDivisionError:
    print("ゼロ除算エラー")

print("プログラム継続")

# 出力:
# ゼロ除算エラー
# プログラム継続
```

**例外オブジェクトの取得**:

```python
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"エラー: {e}")
    print(f"型: {type(e).__name__}")

# 出力:
# エラー: division by zero
# 型: ZeroDivisionError
```

**複数の except**:

```python
array = [0, 1, 2]

try:
    index = 5
    value = array[index]  # IndexError
    number = int("abc")   # ValueError
    print(number)
except IndexError as e:
    print(f"インデックスエラー: {e}")
except ValueError as e:
    print(f"値エラー: {e}")

# 出力:
# インデックスエラー: list index out of range
```

**複数の例外を同時にキャッチ**:

```python
try:
    # 処理
    pass
except (ValueError, TypeError) as e:
    print(f"エラー: {e}")
```

**finally 句**:

例外の有無にかかわらず必ず実行される。

```python
try:
    file = open("file.txt", "r")
    content = file.read()
    print(content)
except FileNotFoundError as e:
    print(f"ファイルが見つかりません: {e}")
finally:
    # 必ず実行される
    if 'file' in locals() and file:
        file.close()
        print("ファイルを閉じました")
```

**else 句**:

例外が発生しなかった場合のみ実行される。

```python
try:
    result = 10 / 2
except ZeroDivisionError:
    print("ゼロ除算エラー")
else:
    # 例外が発生しなかった場合のみ実行
    print(f"結果: {result}")
finally:
    print("終了")

# 出力:
# 結果: 5.0
# 終了
```

**例外の再送出**:

```python
def process_data():
    try:
        raise ValueError("データエラー")
    except ValueError as e:
        print(f"ログ記録: {e}")
        raise  # 例外を再送出

try:
    process_data()
except ValueError as e:
    print(f"上位でキャッチ: {e}")

# 出力:
# ログ記録: データエラー
# 上位でキャッチ: データエラー
```

**カスタム例外**:

```python
class CustomError(Exception):
    """カスタム例外クラス"""
    pass

def validate(value):
    if value < 0:
        raise CustomError("値は0以上である必要があります")

try:
    validate(-5)
except CustomError as e:
    print(f"カスタムエラー: {e}")

# 出力:
# カスタムエラー: 値は0以上である必要があります
```

**すべての例外をキャッチ**:

```python
try:
    # 何らかの処理
    raise RuntimeError("予期しないエラー")
except Exception as e:
    # すべての例外をキャッチ（BaseException を除く）
    print(f"エラーが発生: {e}")
```

**主な組み込み例外**:

- `ValueError`: 不適切な値
- `TypeError`: 型が不適切
- `KeyError`: 辞書のキーが存在しない
- `IndexError`: インデックスが範囲外
- `FileNotFoundError`: ファイルが見つからない
- `ZeroDivisionError`: ゼロ除算
- `AttributeError`: 属性が存在しない

**実用例（ファイル処理）**:

```python
def read_file(filename):
    try:
        with open(filename, "r") as file:
            return file.read()
    except FileNotFoundError:
        print(f"ファイル {filename} が見つかりません")
        return None
    except PermissionError:
        print(f"ファイル {filename} の読み込み権限がありません")
        return None
    except Exception as e:
        print(f"予期しないエラー: {e}")
        return None

content = read_file("data.txt")
if content:
    print(content)
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
try {
} catch (error) {}
```

JavaScript では try-catch-finally 文で例外処理を行う。

**基本的な try-catch**:

```javascript
try {
  const result = 10 / 0; // JavaScript では Infinity（例外にならない）
  JSON.parse("invalid json"); // SyntaxError が発生
  console.log(result);
} catch (error) {
  console.log("エラー:", error.message);
}

console.log("プログラム継続");

// 出力:
// エラー: Unexpected token i in JSON at position 0
// プログラム継続
```

**Error オブジェクト**:

catch で受け取るのは Error オブジェクト。

```javascript
try {
  throw new Error("カスタムエラー");
} catch (error) {
  console.log("メッセージ:", error.message);
  console.log("名前:", error.name);
  console.log("スタックトレース:", error.stack);
}

// 出力:
// メッセージ: カスタムエラー
// 名前: Error
// スタックトレース: Error: カスタムエラー at ...
```

**特定のエラー型をチェック**:

JavaScript では catch は 1 つだけだが、instanceof でエラー型を判定できる。

```javascript
try {
  JSON.parse("invalid");
} catch (error) {
  if (error instanceof SyntaxError) {
    console.log("構文エラー:", error.message);
  } else if (error instanceof TypeError) {
    console.log("型エラー:", error.message);
  } else {
    console.log("その他のエラー:", error.message);
  }
}
```

**finally 句**:

例外の有無にかかわらず必ず実行される。

```javascript
let file = null;

try {
  file = openFile("data.txt");
  console.log("ファイル処理中");
  throw new Error("処理エラー");
} catch (error) {
  console.log("エラー:", error.message);
} finally {
  // 必ず実行される
  if (file) {
    file.close();
    console.log("ファイルを閉じました");
  }
}

// 出力:
// ファイル処理中
// エラー: 処理エラー
// ファイルを閉じました
```

**async/await での例外処理**:

```javascript
async function fetchData() {
  try {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("取得エラー:", error.message);
    throw error; // 例外を再送出
  }
}

// 使用例
fetchData()
  .then((data) => console.log(data))
  .catch((error) => console.error("最終エラー:", error.message));
```

**Promise での例外処理**:

```javascript
fetch("https://api.example.com/data")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("エラー:", error.message);
  })
  .finally(() => {
    console.log("処理完了");
  });
```

**カスタムエラー**:

```javascript
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

function validate(value) {
  if (value < 0) {
    throw new ValidationError("値は0以上である必要があります");
  }
}

try {
  validate(-5);
} catch (error) {
  if (error instanceof ValidationError) {
    console.log("バリデーションエラー:", error.message);
  } else {
    console.log("その他のエラー:", error.message);
  }
}

// 出力:
// バリデーションエラー: 値は0以上である必要があります
```

**主な Error 型**:

- `Error`: 基本的なエラー
- `SyntaxError`: 構文エラー
- `TypeError`: 型エラー
- `ReferenceError`: 未定義の変数参照
- `RangeError`: 範囲外の値
- `URIError`: URI 処理エラー

**実用例（API 呼び出し）**:

```javascript
async function getUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("ユーザーデータ取得エラー:", error.message);
    return null;
  }
}

const user = await getUserData(123);
if (user) {
  console.log(user);
}
```

**実用例（リトライ処理）**:

```javascript
async function fetchWithRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.log(`試行 ${i + 1} 失敗:`, error.message);

      if (i === maxRetries - 1) {
        throw error; // 最後の試行で失敗したら例外を投げる
      }

      // 少し待ってから再試行
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
if err != nil { }
```

Go には try-catch はなく、エラーを値として返し、呼び出し側でチェックする。パニック（panic）には defer と recover を使う。

**基本的なエラー処理**:

Go では関数がエラーを返り値として返す。

```go
package main

import (
    "errors"
    "fmt"
)

func divide(a, b int) (int, error) {
    if b == 0 {
        return 0, errors.New("ゼロで割れません")
    }
    return a / b, nil
}

func main() {
    result, err := divide(10, 0)
    if err != nil {
        fmt.Println("エラー:", err)
        return
    }

    fmt.Println("結果:", result)
}

// 出力:
// エラー: ゼロで割れません
```

**複数の戻り値でのエラー処理**:

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    file, err := os.Open("file.txt")
    if err != nil {
        fmt.Println("ファイルオープンエラー:", err)
        return
    }
    defer file.Close()

    // ファイルを読む処理
    data := make([]byte, 100)
    n, err := file.Read(data)
    if err != nil {
        fmt.Println("ファイル読み込みエラー:", err)
        return
    }

    fmt.Printf("読み込んだバイト数: %d\n", n)
}
```

**errors.New と fmt.Errorf**:

```go
package main

import (
    "errors"
    "fmt"
)

func main() {
    // シンプルなエラー
    err1 := errors.New("シンプルなエラー")
    fmt.Println(err1)

    // フォーマットされたエラー
    value := 42
    err2 := fmt.Errorf("値 %d は無効です", value)
    fmt.Println(err2)
}
```

**エラーのラップ（Go 1.13+）**:

```go
package main

import (
    "errors"
    "fmt"
)

func processFile(filename string) error {
    err := errors.New("ファイルが見つかりません")

    // エラーをラップ
    return fmt.Errorf("ファイル処理エラー (%s): %w", filename, err)
}

func main() {
    err := processFile("data.txt")
    if err != nil {
        fmt.Println("エラー:", err)

        // 元のエラーを取り出す
        if errors.Is(err, errors.New("ファイルが見つかりません")) {
            fmt.Println("ファイルエラーです")
        }
    }
}
```

**カスタムエラー型**:

```go
package main

import "fmt"

type ValidationError struct {
    Field string
    Value interface{}
    Message string
}

func (e *ValidationError) Error() string {
    return fmt.Sprintf("%s: %v - %s", e.Field, e.Value, e.Message)
}

func validate(age int) error {
    if age < 0 {
        return &ValidationError{
            Field: "age",
            Value: age,
            Message: "年齢は0以上である必要があります",
        }
    }
    return nil
}

func main() {
    err := validate(-5)
    if err != nil {
        fmt.Println("バリデーションエラー:", err)

        // 型アサーション
        if ve, ok := err.(*ValidationError); ok {
            fmt.Printf("フィールド: %s, 値: %v\n", ve.Field, ve.Value)
        }
    }
}
```

**panic と recover**:

回復不可能なエラーには panic を使う。recover() で捕捉できる。

```go
package main

import "fmt"

func mayPanic() {
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("Recovered from panic:", r)
        }
    }()

    fmt.Println("処理開始")
    panic("重大なエラー")
    fmt.Println("ここは実行されない")
}

func main() {
    mayPanic()
    fmt.Println("プログラム継続")
}

// 出力:
// 処理開始
// Recovered from panic: 重大なエラー
// プログラム継続
```

**エラー処理のパターン**:

```go
package main

import (
    "errors"
    "fmt"
)

func processData(data string) error {
    if data == "" {
        return errors.New("データが空です")
    }

    // 処理
    fmt.Println("データ処理:", data)
    return nil
}

func main() {
    // パターン1: エラーチェック
    if err := processData(""); err != nil {
        fmt.Println("エラー:", err)
    }

    // パターン2: 早期リターン
    err := processData("")
    if err != nil {
        fmt.Println("エラー:", err)
        return
    }

    fmt.Println("処理成功")
}
```

**errors.Is と errors.As（Go 1.13+）**:

```go
package main

import (
    "errors"
    "fmt"
    "os"
)

func main() {
    _, err := os.Open("nonexistent.txt")

    // errors.Is: エラーの種類を判定
    if errors.Is(err, os.ErrNotExist) {
        fmt.Println("ファイルが存在しません")
    }

    // errors.As: 特定の型にキャスト
    var pathErr *os.PathError
    if errors.As(err, &pathErr) {
        fmt.Printf("パスエラー: %s\n", pathErr.Path)
    }
}
```

**実用例（複数のエラーチェック）**:

```go
package main

import (
    "fmt"
    "os"
)

func readFile(filename string) error {
    file, err := os.Open(filename)
    if err != nil {
        return fmt.Errorf("ファイルオープンエラー: %w", err)
    }
    defer file.Close()

    data := make([]byte, 100)
    _, err = file.Read(data)
    if err != nil {
        return fmt.Errorf("ファイル読み込みエラー: %w", err)
    }

    fmt.Println(string(data))
    return nil
}

func main() {
    if err := readFile("data.txt"); err != nil {
        fmt.Println("エラー:", err)
        return
    }

    fmt.Println("処理成功")
}
```

**実用例（エラーハンドリング関数）**:

```go
package main

import (
    "fmt"
    "log"
)

func must(err error) {
    if err != nil {
        log.Fatal(err)
    }
}

func main() {
    file, err := os.Open("config.txt")
    must(err)  // エラーがあればプログラム終了
    defer file.Close()

    // 処理
}
```

**Go のエラー処理の特徴**:

- 例外ではなくエラー値を返す
- 明示的なエラーチェックが必要
- panic は回復不可能なエラーにのみ使う
- defer と recover でパニックを捕捉できる
- エラーのラップで文脈を追加できる

</div>
