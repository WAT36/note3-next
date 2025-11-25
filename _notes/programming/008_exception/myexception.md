---
title: "カスタム例外・エラーの定義"
date: "2019-10-30T01:37:30+09:00"
excerpt: "自分で例外クラスを定義する方法について"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-30T01:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

標準の例外クラスでは表現できない独自のエラー情報を扱いたい場合、カスタム例外・エラーを定義できる。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
class CustomException extends Exception { }
```

Java では`Exception`または`RuntimeException`を継承してカスタム例外を定義する。

**基本的なカスタム例外**:

```java
public class ValidationException extends Exception {
    public ValidationException(String message) {
        super(message);
    }
}

public class Main {
    public static void validate(int age) throws ValidationException {
        if (age < 0) {
            throw new ValidationException("年齢は0以上である必要があります");
        }
    }

    public static void main(String[] args) {
        try {
            validate(-5);
        } catch (ValidationException e) {
            System.out.println("エラー: " + e.getMessage());
        }
    }
}

// 出力:
// エラー: 年齢は0以上である必要があります
```

**Exception vs RuntimeException**:

- **Exception**: チェック例外（throws 宣言が必要）
- **RuntimeException**: 非チェック例外（throws 宣言不要）

```java
// チェック例外（throws 宣言が必要）
public class CheckedException extends Exception {
    public CheckedException(String message) {
        super(message);
    }
}

// 非チェック例外（throws 宣言不要）
public class UncheckedException extends RuntimeException {
    public UncheckedException(String message) {
        super(message);
    }
}

// 使用例
public void method1() throws CheckedException {
    throw new CheckedException("チェック例外");
}

public void method2() {
    throw new UncheckedException("非チェック例外");  // throws 不要
}
```

**フィールドとメソッドを持つカスタム例外**:

```java
public class ValidationException extends Exception {
    private String fieldName;
    private Object invalidValue;

    public ValidationException(String message, String fieldName, Object invalidValue) {
        super(message);
        this.fieldName = fieldName;
        this.invalidValue = invalidValue;
    }

    public String getFieldName() {
        return fieldName;
    }

    public Object getInvalidValue() {
        return invalidValue;
    }

    @Override
    public String toString() {
        return String.format("%s [フィールド: %s, 値: %s]",
            getMessage(), fieldName, invalidValue);
    }
}

public class Main {
    public static void main(String[] args) {
        try {
            throw new ValidationException("無効な値", "age", -5);
        } catch (ValidationException e) {
            System.out.println(e);
            System.out.println("フィールド: " + e.getFieldName());
            System.out.println("無効な値: " + e.getInvalidValue());
        }
    }
}

// 出力:
// 無効な値 [フィールド: age, 値: -5]
// フィールド: age
// 無効な値: -5
```

**例外階層**:

```java
// 基底の例外クラス
public class AppException extends Exception {
    public AppException(String message) {
        super(message);
    }
}

// 具体的な例外クラス
public class DatabaseException extends AppException {
    public DatabaseException(String message) {
        super(message);
    }
}

public class NetworkException extends AppException {
    public NetworkException(String message) {
        super(message);
    }
}

// 使用例
try {
    throw new DatabaseException("接続エラー");
} catch (DatabaseException e) {
    System.out.println("データベースエラー: " + e.getMessage());
} catch (AppException e) {
    System.out.println("アプリケーションエラー: " + e.getMessage());
}
```

**実用例（ビジネスロジックエラー）**:

```java
public class InsufficientBalanceException extends RuntimeException {
    private double balance;
    private double amount;

    public InsufficientBalanceException(double balance, double amount) {
        super(String.format("残高不足: 残高=%,.0f円, 要求額=%,.0f円", balance, amount));
        this.balance = balance;
        this.amount = amount;
    }

    public double getShortfall() {
        return amount - balance;
    }
}

public class BankAccount {
    private double balance;

    public void withdraw(double amount) {
        if (balance < amount) {
            throw new InsufficientBalanceException(balance, amount);
        }
        balance -= amount;
    }
}
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
class CustomError(Exception):
    pass
```

Python では`Exception`を継承してカスタム例外を定義する。

**基本的なカスタム例外**:

```python
class ValidationError(Exception):
    """バリデーションエラー"""
    pass

def validate(age):
    if age < 0:
        raise ValidationError("年齢は0以上である必要があります")

try:
    validate(-5)
except ValidationError as e:
    print(f"エラー: {e}")

# 出力:
# エラー: 年齢は0以上である必要があります
```

**メッセージ付きカスタム例外**:

```python
class ValidationError(Exception):
    def __init__(self, message):
        super().__init__(message)
        self.message = message

try:
    raise ValidationError("カスタムメッセージ")
except ValidationError as e:
    print(f"エラー: {e.message}")
```

**フィールドを持つカスタム例外**:

```python
class ValidationError(Exception):
    def __init__(self, message, field_name, invalid_value):
        super().__init__(message)
        self.field_name = field_name
        self.invalid_value = invalid_value

    def __str__(self):
        return f"{self.args[0]} [フィールド: {self.field_name}, 値: {self.invalid_value}]"

try:
    raise ValidationError("無効な値", "age", -5)
except ValidationError as e:
    print(e)
    print(f"フィールド: {e.field_name}")
    print(f"無効な値: {e.invalid_value}")

# 出力:
# 無効な値 [フィールド: age, 値: -5]
# フィールド: age
# 無効な値: -5
```

**例外階層**:

```python
# 基底の例外クラス
class AppError(Exception):
    """アプリケーションエラーの基底クラス"""
    pass

# 具体的な例外クラス
class DatabaseError(AppError):
    """データベース関連のエラー"""
    pass

class NetworkError(AppError):
    """ネットワーク関連のエラー"""
    pass

# 使用例
try:
    raise DatabaseError("接続エラー")
except DatabaseError as e:
    print(f"データベースエラー: {e}")
except AppError as e:
    print(f"アプリケーションエラー: {e}")
```

**実用例（HTTP エラー）**:

```python
class HTTPError(Exception):
    def __init__(self, status_code, message):
        super().__init__(message)
        self.status_code = status_code

    def __str__(self):
        return f"HTTP {self.status_code}: {self.args[0]}"

class NotFoundError(HTTPError):
    def __init__(self, resource):
        super().__init__(404, f"{resource} が見つかりません")
        self.resource = resource

class UnauthorizedError(HTTPError):
    def __init__(self):
        super().__init__(401, "認証が必要です")

# 使用例
try:
    raise NotFoundError("ユーザー")
except NotFoundError as e:
    print(e)  # HTTP 404: ユーザー が見つかりません
    print(f"リソース: {e.resource}")
except HTTPError as e:
    print(f"HTTPエラー: {e}")
```

**実用例（ビジネスロジックエラー）**:

```python
class InsufficientBalanceError(Exception):
    def __init__(self, balance, amount):
        self.balance = balance
        self.amount = amount
        message = f"残高不足: 残高={balance}円, 要求額={amount}円"
        super().__init__(message)

    def get_shortfall(self):
        return self.amount - self.balance

class BankAccount:
    def __init__(self, balance=0):
        self.balance = balance

    def withdraw(self, amount):
        if self.balance < amount:
            raise InsufficientBalanceError(self.balance, amount)
        self.balance -= amount

# 使用例
account = BankAccount(1000)
try:
    account.withdraw(1500)
except InsufficientBalanceError as e:
    print(e)
    print(f"不足額: {e.get_shortfall()}円")

# 出力:
# 残高不足: 残高=1000円, 要求額=1500円
# 不足額: 500円
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
class CustomError extends Error {}
```

JavaScript では`Error`を継承してカスタムエラーを定義する。

**基本的なカスタムエラー**:

```javascript
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

function validate(age) {
  if (age < 0) {
    throw new ValidationError("年齢は0以上である必要があります");
  }
}

try {
  validate(-5);
} catch (error) {
  console.log("エラー:", error.message);
  console.log("タイプ:", error.name);
}

// 出力:
// エラー: 年齢は0以上である必要があります
// タイプ: ValidationError
```

**プロパティを持つカスタムエラー**:

```javascript
class ValidationError extends Error {
  constructor(message, fieldName, invalidValue) {
    super(message);
    this.name = "ValidationError";
    this.fieldName = fieldName;
    this.invalidValue = invalidValue;
  }

  toString() {
    return `${this.message} [フィールド: ${this.fieldName}, 値: ${this.invalidValue}]`;
  }
}

try {
  throw new ValidationError("無効な値", "age", -5);
} catch (error) {
  console.log(error.toString());
  console.log("フィールド:", error.fieldName);
  console.log("無効な値:", error.invalidValue);
}

// 出力:
// 無効な値 [フィールド: age, 値: -5]
// フィールド: age
// 無効な値: -5
```

**エラー階層**:

```javascript
// 基底のエラークラス
class AppError extends Error {
  constructor(message) {
    super(message);
    this.name = "AppError";
  }
}

// 具体的なエラークラス
class DatabaseError extends AppError {
  constructor(message) {
    super(message);
    this.name = "DatabaseError";
  }
}

class NetworkError extends AppError {
  constructor(message) {
    super(message);
    this.name = "NetworkError";
  }
}

// 使用例
try {
  throw new DatabaseError("接続エラー");
} catch (error) {
  if (error instanceof DatabaseError) {
    console.log("データベースエラー:", error.message);
  } else if (error instanceof AppError) {
    console.log("アプリケーションエラー:", error.message);
  }
}
```

**実用例（HTTP エラー）**:

```javascript
class HTTPError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.name = "HTTPError";
    this.statusCode = statusCode;
  }

  toString() {
    return `HTTP ${this.statusCode}: ${this.message}`;
  }
}

class NotFoundError extends HTTPError {
  constructor(resource) {
    super(404, `${resource} が見つかりません`);
    this.name = "NotFoundError";
    this.resource = resource;
  }
}

class UnauthorizedError extends HTTPError {
  constructor() {
    super(401, "認証が必要です");
    this.name = "UnauthorizedError";
  }
}

// 使用例
async function fetchUser(userId) {
  const response = await fetch(`/api/users/${userId}`);

  if (response.status === 404) {
    throw new NotFoundError("ユーザー");
  }
  if (response.status === 401) {
    throw new UnauthorizedError();
  }

  return await response.json();
}

try {
  await fetchUser(999);
} catch (error) {
  if (error instanceof NotFoundError) {
    console.log(error.toString());
    console.log("リソース:", error.resource);
  } else if (error instanceof HTTPError) {
    console.log("HTTPエラー:", error.toString());
  }
}
```

**実用例（ビジネスロジックエラー）**:

```javascript
class InsufficientBalanceError extends Error {
  constructor(balance, amount) {
    super(`残高不足: 残高=${balance}円, 要求額=${amount}円`);
    this.name = "InsufficientBalanceError";
    this.balance = balance;
    this.amount = amount;
  }

  getShortfall() {
    return this.amount - this.balance;
  }
}

class BankAccount {
  constructor(balance = 0) {
    this.balance = balance;
  }

  withdraw(amount) {
    if (this.balance < amount) {
      throw new InsufficientBalanceError(this.balance, amount);
    }
    this.balance -= amount;
  }
}

// 使用例
const account = new BankAccount(1000);
try {
  account.withdraw(1500);
} catch (error) {
  if (error instanceof InsufficientBalanceError) {
    console.log(error.message);
    console.log(`不足額: ${error.getShortfall()}円`);
  }
}

// 出力:
// 残高不足: 残高=1000円, 要求額=1500円
// 不足額: 500円
```

**スタックトレースの保持**:

```javascript
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = "CustomError";

    // スタックトレースをキャプチャ（V8エンジン）
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
  }
}

try {
  throw new CustomError("エラー発生");
} catch (error) {
  console.log(error.stack);
}
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
type CustomError struct { }
func (e *CustomError) Error() string { }
```

Go では`error`インターフェースを実装してカスタムエラー型を定義する。

**基本的なカスタムエラー**:

```go
package main

import "fmt"

type ValidationError struct {
    Message string
}

func (e *ValidationError) Error() string {
    return e.Message
}

func validate(age int) error {
    if age < 0 {
        return &ValidationError{Message: "年齢は0以上である必要があります"}
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

**フィールドを持つカスタムエラー**:

```go
package main

import "fmt"

type ValidationError struct {
    Field   string
    Value   interface{}
    Message string
}

func (e *ValidationError) Error() string {
    return fmt.Sprintf("%s [フィールド: %s, 値: %v]", e.Message, e.Field, e.Value)
}

func main() {
    err := &ValidationError{
        Message: "無効な値",
        Field:   "age",
        Value:   -5,
    }

    fmt.Println(err)

    // 型アサーションでフィールドにアクセス
    if ve, ok := err.(*ValidationError); ok {
        fmt.Printf("フィールド: %s\n", ve.Field)
        fmt.Printf("無効な値: %v\n", ve.Value)
    }
}

// 出力:
// 無効な値 [フィールド: age, 値: -5]
// フィールド: age
// 無効な値: -5
```

**エラーのラップ**:

```go
package main

import (
    "errors"
    "fmt"
)

type DatabaseError struct {
    Operation string
    Err       error
}

func (e *DatabaseError) Error() string {
    return fmt.Sprintf("データベースエラー (%s): %v", e.Operation, e.Err)
}

func (e *DatabaseError) Unwrap() error {
    return e.Err
}

func main() {
    originalErr := errors.New("接続タイムアウト")
    dbErr := &DatabaseError{
        Operation: "SELECT",
        Err:       originalErr,
    }

    fmt.Println(dbErr)

    // errors.Is で元のエラーを確認
    if errors.Is(dbErr, originalErr) {
        fmt.Println("元のエラーと一致")
    }
}
```

**複数のエラー型**:

```go
package main

import "fmt"

type AppError struct {
    Code    string
    Message string
}

func (e *AppError) Error() string {
    return fmt.Sprintf("[%s] %s", e.Code, e.Message)
}

type DatabaseError struct {
    *AppError
    Query string
}

type NetworkError struct {
    *AppError
    URL string
}

func main() {
    dbErr := &DatabaseError{
        AppError: &AppError{
            Code:    "DB001",
            Message: "接続エラー",
        },
        Query: "SELECT * FROM users",
    }

    fmt.Println(dbErr)
    fmt.Printf("クエリ: %s\n", dbErr.Query)
}
```

**errors.Is と errors.As での判定**:

```go
package main

import (
    "errors"
    "fmt"
)

var ErrNotFound = errors.New("見つかりません")

type ValidationError struct {
    Field string
    Value interface{}
}

func (e *ValidationError) Error() string {
    return fmt.Sprintf("無効な値: %s = %v", e.Field, e.Value)
}

func main() {
    err1 := fmt.Errorf("ユーザーエラー: %w", ErrNotFound)

    // errors.Is: 特定のエラーかチェック
    if errors.Is(err1, ErrNotFound) {
        fmt.Println("NotFound エラーです")
    }

    err2 := &ValidationError{Field: "age", Value: -5}

    // errors.As: 特定の型にキャスト
    var ve *ValidationError
    if errors.As(err2, &ve) {
        fmt.Printf("フィールド: %s, 値: %v\n", ve.Field, ve.Value)
    }
}
```

**実用例（ビジネスロジックエラー）**:

```go
package main

import "fmt"

type InsufficientBalanceError struct {
    Balance int
    Amount  int
}

func (e *InsufficientBalanceError) Error() string {
    return fmt.Sprintf("残高不足: 残高=%d円, 要求額=%d円", e.Balance, e.Amount)
}

func (e *InsufficientBalanceError) Shortfall() int {
    return e.Amount - e.Balance
}

type BankAccount struct {
    Balance int
}

func (b *BankAccount) Withdraw(amount int) error {
    if b.Balance < amount {
        return &InsufficientBalanceError{
            Balance: b.Balance,
            Amount:  amount,
        }
    }
    b.Balance -= amount
    return nil
}

func main() {
    account := &BankAccount{Balance: 1000}

    err := account.Withdraw(1500)
    if err != nil {
        if ibe, ok := err.(*InsufficientBalanceError); ok {
            fmt.Println(ibe)
            fmt.Printf("不足額: %d円\n", ibe.Shortfall())
        }
    }
}

// 出力:
// 残高不足: 残高=1000円, 要求額=1500円
// 不足額: 500円
```

**センチネルエラー**:

定義済みのエラー値を使う。

```go
package main

import (
    "errors"
    "fmt"
)

var (
    ErrNotFound      = errors.New("見つかりません")
    ErrAlreadyExists = errors.New("既に存在します")
    ErrInvalidInput  = errors.New("無効な入力")
)

func findUser(id int) error {
    if id < 0 {
        return ErrInvalidInput
    }
    // ユーザーが見つからない
    return ErrNotFound
}

func main() {
    err := findUser(999)

    if errors.Is(err, ErrNotFound) {
        fmt.Println("ユーザーが見つかりません")
    } else if errors.Is(err, ErrInvalidInput) {
        fmt.Println("無効なIDです")
    }
}
```

</div>
