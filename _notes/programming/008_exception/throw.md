---
title: "例外・エラーの送出"
date: "2019-10-30T02:37:30+09:00"
excerpt: "例外を明示的に発生する方法について"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-30T02:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

例外やエラーは実行時に自動的に発生するだけでなく、コード中で意図的に発生させることができる。これにより、異常な状態を呼び出し元に通知できる。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
throw new ExceptionType("message");
```

Java では`throw`文を使って例外を発生させる。

**基本的な throw**:

```java
public class Main {
    public static void main(String[] args) {
        try {
            throw new Exception("例外が発生しました");
        } catch (Exception e) {
            System.out.println("エラー: " + e.getMessage());
        }
    }
}

// 出力:
// エラー: 例外が発生しました
```

**throws 宣言**:

チェック例外を throw する場合、メソッドに`throws`宣言が必要。

```java
public class Main {
    public static void validateAge(int age) throws Exception {
        if (age < 0) {
            throw new Exception("年齢は0以上である必要があります");
        }
        System.out.println("年齢: " + age);
    }

    public static void main(String[] args) {
        try {
            validateAge(-5);
        } catch (Exception e) {
            System.out.println("エラー: " + e.getMessage());
        }
    }
}

// 出力:
// エラー: 年齢は0以上である必要があります
```

**RuntimeException（非チェック例外）**:

`RuntimeException`は`throws`宣言が不要。

```java
public class Main {
    public static void divide(int a, int b) {
        if (b == 0) {
            throw new IllegalArgumentException("ゼロで割れません");
        }
        System.out.println("結果: " + (a / b));
    }

    public static void main(String[] args) {
        try {
            divide(10, 0);
        } catch (IllegalArgumentException e) {
            System.out.println("エラー: " + e.getMessage());
        }
    }
}

// 出力:
// エラー: ゼロで割れません
```

**カスタム例外の送出**:

```java
class ValidationException extends Exception {
    public ValidationException(String message) {
        super(message);
    }
}

public class Main {
    public static void validate(String email) throws ValidationException {
        if (!email.contains("@")) {
            throw new ValidationException("無効なメールアドレス: " + email);
        }
    }

    public static void main(String[] args) {
        try {
            validate("invalid-email");
        } catch (ValidationException e) {
            System.out.println("エラー: " + e.getMessage());
        }
    }
}

// 出力:
// エラー: 無効なメールアドレス: invalid-email
```

**例外の再送出**:

```java
public class Main {
    public static void processData() throws Exception {
        try {
            throw new Exception("データエラー");
        } catch (Exception e) {
            System.out.println("ログ記録: " + e.getMessage());
            throw e;  // 例外を再送出
        }
    }

    public static void main(String[] args) {
        try {
            processData();
        } catch (Exception e) {
            System.out.println("上位でキャッチ: " + e.getMessage());
        }
    }
}

// 出力:
// ログ記録: データエラー
// 上位でキャッチ: データエラー
```

**別の例外に変換して送出**:

```java
import java.io.*;

public class Main {
    public static void readConfig() throws IllegalStateException {
        try {
            BufferedReader reader = new BufferedReader(new FileReader("config.txt"));
        } catch (IOException e) {
            // IOException を IllegalStateException に変換
            throw new IllegalStateException("設定ファイルの読み込みに失敗", e);
        }
    }

    public static void main(String[] args) {
        try {
            readConfig();
        } catch (IllegalStateException e) {
            System.out.println("エラー: " + e.getMessage());
            System.out.println("原因: " + e.getCause());
        }
    }
}
```

**実用例（バリデーション）**:

```java
public class Main {
    public static void validateUser(String name, int age, String email)
            throws IllegalArgumentException {
        if (name == null || name.isEmpty()) {
            throw new IllegalArgumentException("名前は必須です");
        }
        if (age < 0 || age > 150) {
            throw new IllegalArgumentException("年齢は0〜150の範囲である必要があります");
        }
        if (!email.contains("@")) {
            throw new IllegalArgumentException("無効なメールアドレスです");
        }
    }

    public static void main(String[] args) {
        try {
            validateUser("", 25, "test@example.com");
        } catch (IllegalArgumentException e) {
            System.out.println("バリデーションエラー: " + e.getMessage());
        }
    }
}

// 出力:
// バリデーションエラー: 名前は必須です
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
raise ExceptionType("message")
```

Python では`raise`文を使って例外を発生させる。

**基本的な raise**:

```python
try:
    raise Exception("例外が発生しました")
except Exception as e:
    print(f"エラー: {e}")

# 出力:
# エラー: 例外が発生しました
```

**特定の例外を raise**:

```python
def validate_age(age):
    if age < 0:
        raise ValueError("年齢は0以上である必要があります")
    print(f"年齢: {age}")

try:
    validate_age(-5)
except ValueError as e:
    print(f"エラー: {e}")

# 出力:
# エラー: 年齢は0以上である必要があります
```

**カスタム例外の送出**:

```python
class ValidationError(Exception):
    pass

def validate(email):
    if "@" not in email:
        raise ValidationError(f"無効なメールアドレス: {email}")

try:
    validate("invalid-email")
except ValidationError as e:
    print(f"エラー: {e}")

# 出力:
# エラー: 無効なメールアドレス: invalid-email
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

**別の例外に変換して送出（raise from）**:

```python
def read_config():
    try:
        with open("config.txt", "r") as file:
            return file.read()
    except FileNotFoundError as e:
        # FileNotFoundError を RuntimeError に変換
        raise RuntimeError("設定ファイルの読み込みに失敗") from e

try:
    read_config()
except RuntimeError as e:
    print(f"エラー: {e}")
    print(f"原因: {e.__cause__}")

# 出力:
# エラー: 設定ファイルの読み込みに失敗
# 原因: [Errno 2] No such file or directory: 'config.txt'
```

**例外を発生させずに再送出（raise）**:

except ブロック内で引数なしの`raise`を使うと、キャッチした例外をそのまま再送出できる。

```python
def dangerous_operation():
    try:
        result = 10 / 0
    except ZeroDivisionError:
        print("エラーをログに記録")
        raise  # キャッチした例外をそのまま再送出

try:
    dangerous_operation()
except ZeroDivisionError as e:
    print(f"上位でキャッチ: {e}")

# 出力:
# エラーをログに記録
# 上位でキャッチ: division by zero
```

**実用例（バリデーション）**:

```python
def validate_user(name, age, email):
    if not name:
        raise ValueError("名前は必須です")
    if age < 0 or age > 150:
        raise ValueError("年齢は0〜150の範囲である必要があります")
    if "@" not in email:
        raise ValueError("無効なメールアドレスです")

try:
    validate_user("", 25, "test@example.com")
except ValueError as e:
    print(f"バリデーションエラー: {e}")

# 出力:
# バリデーションエラー: 名前は必須です
```

**実用例（assert の代わりに raise）**:

```python
def divide(a, b):
    if not isinstance(a, (int, float)):
        raise TypeError("a は数値である必要があります")
    if not isinstance(b, (int, float)):
        raise TypeError("b は数値である必要があります")
    if b == 0:
        raise ZeroDivisionError("ゼロで割れません")

    return a / b

try:
    result = divide(10, "2")
except TypeError as e:
    print(f"型エラー: {e}")

# 出力:
# 型エラー: b は数値である必要があります
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
throw new Error("message");
```

JavaScript では`throw`文を使ってエラーを発生させる。任意の値を throw できるが、通常は Error オブジェクトを使う。

**基本的な throw**:

```javascript
try {
  throw new Error("エラーが発生しました");
} catch (error) {
  console.log("エラー:", error.message);
}

// 出力:
// エラー: エラーが発生しました
```

**特定のエラー型を throw**:

```javascript
function validateAge(age) {
  if (age < 0) {
    throw new RangeError("年齢は0以上である必要があります");
  }
  console.log("年齢:", age);
}

try {
  validateAge(-5);
} catch (error) {
  console.log("エラー:", error.message);
  console.log("型:", error.name);
}

// 出力:
// エラー: 年齢は0以上である必要があります
// 型: RangeError
```

**カスタムエラーの送出**:

```javascript
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

function validate(email) {
  if (!email.includes("@")) {
    throw new ValidationError(`無効なメールアドレス: ${email}`);
  }
}

try {
  validate("invalid-email");
} catch (error) {
  if (error instanceof ValidationError) {
    console.log("エラー:", error.message);
  }
}

// 出力:
// エラー: 無効なメールアドレス: invalid-email
```

**任意の値を throw**:

Error オブジェクト以外も throw できるが、推奨されない。

```javascript
try {
  throw "エラー文字列"; // 非推奨
} catch (error) {
  console.log(error); // "エラー文字列"
}

try {
  throw { code: 404, message: "Not Found" }; // 非推奨
} catch (error) {
  console.log(error.code, error.message);
}

// 推奨: Error オブジェクトを使う
try {
  throw new Error("推奨される方法");
} catch (error) {
  console.log(error.message);
  console.log(error.stack); // スタックトレースが利用できる
}
```

**例外の再送出**:

```javascript
async function processData() {
  try {
    throw new Error("データエラー");
  } catch (error) {
    console.log("ログ記録:", error.message);
    throw error; // 例外を再送出
  }
}

try {
  await processData();
} catch (error) {
  console.log("上位でキャッチ:", error.message);
}

// 出力:
// ログ記録: データエラー
// 上位でキャッチ: データエラー
```

**別のエラーに変換して送出**:

```javascript
async function readConfig() {
  try {
    const response = await fetch("config.json");
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    // 元のエラーを含めて新しいエラーを送出
    throw new Error(`設定ファイルの読み込みに失敗: ${error.message}`);
  }
}

try {
  await readConfig();
} catch (error) {
  console.log("エラー:", error.message);
}
```

**実用例（バリデーション）**:

```javascript
function validateUser(name, age, email) {
  if (!name) {
    throw new Error("名前は必須です");
  }
  if (age < 0 || age > 150) {
    throw new RangeError("年齢は0〜150の範囲である必要があります");
  }
  if (!email.includes("@")) {
    throw new Error("無効なメールアドレスです");
  }
}

try {
  validateUser("", 25, "test@example.com");
} catch (error) {
  console.log("バリデーションエラー:", error.message);
}

// 出力:
// バリデーションエラー: 名前は必須です
```

**実用例（async 関数でのエラー送出）**:

```javascript
async function fetchUser(userId) {
  const response = await fetch(`/api/users/${userId}`);

  if (response.status === 404) {
    throw new Error("ユーザーが見つかりません");
  }
  if (response.status === 401) {
    throw new Error("認証が必要です");
  }
  if (!response.ok) {
    throw new Error(`HTTP エラー: ${response.status}`);
  }

  return await response.json();
}

try {
  const user = await fetchUser(999);
  console.log(user);
} catch (error) {
  console.log("エラー:", error.message);
}
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
return errors.New("message")
```

Go では通常、エラーを値として返す。回復不可能なエラーには`panic`を使う。

**基本的なエラーの返却**:

```go
package main

import (
    "errors"
    "fmt"
)

func validate(age int) error {
    if age < 0 {
        return errors.New("年齢は0以上である必要があります")
    }
    return nil
}

func main() {
    err := validate(-5)
    if err != nil {
        fmt.Println("エラー:", err)
    }
}

// 出力:
// エラー: 年齢は0以上である必要があります
```

**fmt.Errorf でフォーマット**:

```go
package main

import "fmt"

func divide(a, b int) (int, error) {
    if b == 0 {
        return 0, fmt.Errorf("ゼロで割れません: %d / %d", a, b)
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
// エラー: ゼロで割れません: 10 / 0
```

**カスタムエラーの返却**:

```go
package main

import "fmt"

type ValidationError struct {
    Field   string
    Message string
}

func (e *ValidationError) Error() string {
    return fmt.Sprintf("%s: %s", e.Field, e.Message)
}

func validateEmail(email string) error {
    if email == "" {
        return &ValidationError{
            Field:   "email",
            Message: "メールアドレスは必須です",
        }
    }
    return nil
}

func main() {
    err := validateEmail("")
    if err != nil {
        fmt.Println("エラー:", err)
    }
}

// 出力:
// エラー: email: メールアドレスは必須です
```

**エラーのラップ（%w）**:

Go 1.13+ では`%w`でエラーをラップできる。

```go
package main

import (
    "errors"
    "fmt"
)

func readFile(filename string) error {
    err := errors.New("ファイルが見つかりません")
    return fmt.Errorf("ファイル読み込みエラー (%s): %w", filename, err)
}

func processConfig() error {
    err := readFile("config.txt")
    if err != nil {
        return fmt.Errorf("設定処理エラー: %w", err)
    }
    return nil
}

func main() {
    err := processConfig()
    if err != nil {
        fmt.Println("エラー:", err)
    }
}

// 出力:
// エラー: 設定処理エラー: ファイル読み込みエラー (config.txt): ファイルが見つかりません
```

**panic（回復不可能なエラー）**:

`panic`は回復不可能なエラーにのみ使う。

```go
package main

import "fmt"

func mustOpen(filename string) {
    // 設定ファイルが開けない場合はプログラムを続行できない
    // このような場合に panic を使う
    if filename == "" {
        panic("ファイル名が指定されていません")
    }

    // ファイルを開く処理
    fmt.Println("ファイルを開きました:", filename)
}

func main() {
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("Recovered from panic:", r)
        }
    }()

    fmt.Println("処理開始")
    mustOpen("")
    fmt.Println("ここは実行されません")
}

// 出力:
// 処理開始
// Recovered from panic: ファイル名が指定されていません
```

**panic と recover**:

```go
package main

import "fmt"

func dangerousOperation() {
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("パニックから回復:", r)
        }
    }()

    fmt.Println("処理中")
    panic("重大なエラー")
    fmt.Println("ここは実行されない")
}

func main() {
    dangerousOperation()
    fmt.Println("プログラム継続")
}

// 出力:
// 処理中
// パニックから回復: 重大なエラー
// プログラム継続
```

**実用例（バリデーション）**:

```go
package main

import (
    "errors"
    "fmt"
)

var (
    ErrNameRequired  = errors.New("名前は必須です")
    ErrInvalidAge    = errors.New("年齢は0〜150の範囲である必要があります")
    ErrInvalidEmail  = errors.New("無効なメールアドレスです")
)

func validateUser(name string, age int, email string) error {
    if name == "" {
        return ErrNameRequired
    }
    if age < 0 || age > 150 {
        return ErrInvalidAge
    }
    if email == "" || !contains(email, "@") {
        return ErrInvalidEmail
    }
    return nil
}

func main() {
    err := validateUser("", 25, "test@example.com")
    if err != nil {
        fmt.Println("バリデーションエラー:", err)
    }
}

// 出力:
// バリデーションエラー: 名前は必須です
```

**panic を使うべき場面**:

- プログラムのバグ（配列の範囲外アクセスなど）
- 回復不可能な状態（必須の設定ファイルが読めないなど）
- 初期化の失敗

**エラーを返すべき場面**:

- 通常のエラー処理（ファイルが見つからない、ネットワークエラーなど）
- ユーザー入力のバリデーション
- 予期されるエラー

```go
// 良い例：エラーを返す
func openFile(filename string) (*os.File, error) {
    file, err := os.Open(filename)
    if err != nil {
        return nil, fmt.Errorf("ファイルオープンエラー: %w", err)
    }
    return file, nil
}

// 悪い例：panic を使う（通常のエラーに panic は不適切）
func openFileBad(filename string) *os.File {
    file, err := os.Open(filename)
    if err != nil {
        panic(err)  // 非推奨
    }
    return file
}
```

</div>
