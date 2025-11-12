---
title: "関数、メソッドのヘルプを見る"
date: "2019-11-01T03:37:30+09:00"
excerpt: "関数、メソッドのヘルプを見る方法について"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-11-01T03:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

関数やメソッドの使い方がわからないとき、ヘルプやドキュメントを見る方法がある。各言語で異なる方法が提供されている。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
// Javadoc
javadoc ClassName.java
```

Java では Javadoc コメントでドキュメントを生成したり、IDE でヘルプを確認したりできる。

**Javadoc コメント**:

クラス、メソッド、フィールドにドキュメントを記述する。

```java
/**
 * ユーザーを表すクラス。
 *
 * @author Your Name
 * @version 1.0
 */
public class User {
    /**
     * ユーザーID
     */
    private int id;

    /**
     * 2つの数値を加算する。
     *
     * @param a 第1の数値
     * @param b 第2の数値
     * @return a と b の合計
     */
    public int add(int a, int b) {
        return a + b;
    }

    /**
     * ユーザーの年齢を更新する。
     *
     * @param newAge 新しい年齢
     * @throws IllegalArgumentException 年齢が負の値の場合
     */
    public void updateAge(int newAge) {
        if (newAge < 0) {
            throw new IllegalArgumentException("年齢は0以上でなければなりません");
        }
        this.age = newAge;
    }
}
```

**Javadoc の生成**:

コマンドラインで HTML ドキュメントを生成する。

```bash
javadoc -d doc User.java
```

生成されたドキュメントは`doc`ディレクトリに保存される。

**主な Javadoc タグ**:

| タグ          | 説明                   |
| ------------- | ---------------------- |
| `@param`      | パラメータの説明       |
| `@return`     | 戻り値の説明           |
| `@throws`     | 例外の説明             |
| `@see`        | 関連する項目への参照   |
| `@since`      | 追加されたバージョン   |
| `@deprecated` | 非推奨であることを示す |
| `@author`     | 作成者                 |
| `@version`    | バージョン             |

**IDE でのヘルプ確認**:

IntelliJ IDEA、Eclipse、VS Code などの IDE では:

- メソッド名の上で`Ctrl + Q`（IntelliJ）または`F2`（Eclipse）
- メソッド入力時にパラメータヒントが表示される
- `Ctrl + Space`で自動補完とドキュメント

**jshell（Java 9+）**:

対話型シェルでヘルプを確認する。

```java
$ jshell
|  Welcome to JShell -- Version 17.0.1

jshell> /help
jshell> String text = "Hello"
text ==> "Hello"

jshell> text.
length()      charAt()      substring()   // Tab で補完候補

jshell> /methods String
// String クラスのメソッド一覧が表示される
```

**JavaDoc のオンラインドキュメント**:

公式の Java API ドキュメント（https://docs.oracle.com/javase/）で詳細な情報を確認できる。

**実用例**:

```java
/**
 * ユーザーサービスクラス。
 * ユーザーの CRUD 操作を提供する。
 */
public class UserService {

    /**
     * ID でユーザーを検索する。
     *
     * @param id ユーザーID
     * @return 見つかったユーザー、存在しない場合は null
     * @throws IllegalArgumentException id が負の値の場合
     * @see User
     */
    public User findById(int id) {
        if (id < 0) {
            throw new IllegalArgumentException("IDは0以上でなければなりません");
        }
        // データベースから検索...
        return null;
    }

    /**
     * 新しいユーザーを作成する。
     *
     * @param name ユーザー名（必須）
     * @param age 年齢（0以上）
     * @return 作成されたユーザー
     * @throws NullPointerException name が null の場合
     * @throws IllegalArgumentException age が負の値の場合
     */
    public User create(String name, int age) {
        if (name == null) {
            throw new NullPointerException("名前は必須です");
        }
        if (age < 0) {
            throw new IllegalArgumentException("年齢は0以上でなければなりません");
        }
        // ユーザーを作成...
        return new User(name, age);
    }
}
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
help(function)
```

Python では`help()`関数を使って、関数やクラスのドキュメントを確認できる。

**help() 関数**:

関数やクラスのドキュメントを表示する。

```python
# 組み込み関数のヘルプ
help(max)
help(print)
help(len)

# モジュールのヘルプ
import math
help(math)
help(math.sqrt)

# クラスのヘルプ
help(list)
help(dict)
```

**help() の実行例**:

```python
help(max)
```

実行結果:

```
Help on built-in function max in module builtins:

max(...)
    max(iterable, *[, default=obj, key=func]) -> value
    max(arg1, arg2, *args, *[, key=func]) -> value

    With a single iterable argument, return its biggest item.
    The default keyword-only argument specifies an object to
    return if the provided iterable is empty.
    With two or more arguments, return the largest argument.
```

**dir() 関数**:

オブジェクトの属性とメソッドの一覧を取得する。

```python
# リストのメソッド一覧
print(dir([]))

# 文字列のメソッド一覧
print(dir(""))

# カスタムクラスの属性一覧
class User:
    def __init__(self, name):
        self.name = name

print(dir(User))
```

\***\*doc** 属性\*\*:

ドキュメント文字列（docstring）を直接取得する。

```python
def add(a, b):
    """2つの数値を加算する。

    Args:
        a: 第1の数値
        b: 第2の数値

    Returns:
        a と b の合計
    """
    return a + b

print(add.__doc__)
# 2つの数値を加算する。
#
# Args:
#     a: 第1の数値
#     b: 第2の数値
#
# Returns:
#     a と b の合計
```

**docstring の書き方**:

関数やクラスの直下に三重引用符で記述する。

```python
def calculate_area(width, height):
    """
    長方形の面積を計算する。

    Parameters:
        width (float): 幅
        height (float): 高さ

    Returns:
        float: 長方形の面積

    Examples:
        >>> calculate_area(5, 10)
        50
    """
    return width * height

class Rectangle:
    """
    長方形を表すクラス。

    Attributes:
        width (float): 幅
        height (float): 高さ
    """

    def __init__(self, width, height):
        """
        長方形を初期化する。

        Args:
            width (float): 幅
            height (float): 高さ
        """
        self.width = width
        self.height = height

    def area(self):
        """
        面積を計算する。

        Returns:
            float: 長方形の面積
        """
        return self.width * self.height
```

**docstring のスタイル**:

| スタイル         | 説明                      |
| ---------------- | ------------------------- |
| Google Style     | Google が推奨するスタイル |
| NumPy Style      | NumPy で使われるスタイル  |
| reStructuredText | Sphinx で使われるスタイル |

**Google Style の例**:

```python
def divide(a, b):
    """2つの数値を除算する。

    Args:
        a (float): 分子
        b (float): 分母

    Returns:
        float: a を b で割った結果

    Raises:
        ZeroDivisionError: b が 0 の場合

    Examples:
        >>> divide(10, 2)
        5.0
    """
    if b == 0:
        raise ZeroDivisionError("0で割ることはできません")
    return a / b
```

**inspect モジュール**:

関数やクラスの詳細情報を取得する。

```python
import inspect

def example(a, b, c=10):
    """サンプル関数"""
    return a + b + c

# シグネチャを取得
sig = inspect.signature(example)
print(sig)  # (a, b, c=10)

# パラメータ情報を取得
for param in sig.parameters.values():
    print(f"{param.name}: default={param.default}")

# ソースコードを取得
print(inspect.getsource(example))

# docstring を取得
print(inspect.getdoc(example))
```

**実用例（カスタムクラスのドキュメント）**:

```python
class UserService:
    """
    ユーザーサービスクラス。
    ユーザーの CRUD 操作を提供する。
    """

    def find_by_id(self, user_id):
        """
        ID でユーザーを検索する。

        Args:
            user_id (int): ユーザーID

        Returns:
            User: 見つかったユーザー、存在しない場合は None

        Raises:
            ValueError: user_id が負の値の場合
        """
        if user_id < 0:
            raise ValueError("IDは0以上でなければなりません")
        # データベースから検索...
        return None

# ヘルプを確認
help(UserService)
help(UserService.find_by_id)

# docstring を確認
print(UserService.__doc__)
print(UserService.find_by_id.__doc__)
```

**IPython での強化されたヘルプ**:

IPython では`?`や`??`でヘルプを確認できる。

```python
# IPython
In [1]: max?
# ヘルプが表示される

In [2]: max??
# ソースコードも表示される（可能な場合）
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
// ブラウザ開発者ツール
console.dir(object);
```

JavaScript では主にブラウザの開発者ツールやコメント、JSDoc でドキュメントを確認する。

**console.dir()**:

オブジェクトのプロパティとメソッドを確認する。

```javascript
// 配列のメソッドを確認
console.dir([]);

// オブジェクトのプロパティを確認
const obj = { name: "John", age: 25 };
console.dir(obj);

// 関数の情報を確認
console.dir(Math.max);
```

**console.log() での確認**:

```javascript
const arr = [1, 2, 3];

// 配列の内容を表示
console.log(arr);

// 配列のメソッドを確認（ブラウザの開発者ツールで展開）
console.log(arr.__proto__);
```

**JSDoc コメント**:

関数やクラスにドキュメントを記述する。

```javascript
/**
 * 2つの数値を加算する。
 *
 * @param {number} a - 第1の数値
 * @param {number} b - 第2の数値
 * @returns {number} a と b の合計
 *
 * @example
 * add(5, 10); // 15
 */
function add(a, b) {
  return a + b;
}

/**
 * ユーザーを表すクラス。
 *
 * @class
 */
class User {
  /**
   * ユーザーを作成する。
   *
   * @constructor
   * @param {string} name - ユーザー名
   * @param {number} age - 年齢
   */
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  /**
   * ユーザー情報を文字列で取得する。
   *
   * @returns {string} ユーザー情報
   */
  toString() {
    return `${this.name} (${this.age})`;
  }
}
```

**主な JSDoc タグ**:

| タグ           | 説明                           |
| -------------- | ------------------------------ |
| `@param`       | パラメータの説明               |
| `@returns`     | 戻り値の説明                   |
| `@throws`      | 例外の説明                     |
| `@example`     | 使用例                         |
| `@see`         | 関連する項目への参照           |
| `@deprecated`  | 非推奨であることを示す         |
| `@author`      | 作成者                         |
| `@version`     | バージョン                     |
| `@class`       | クラスであることを示す         |
| `@constructor` | コンストラクタであることを示す |

**TypeScript での型定義**:

TypeScript では型定義がドキュメントとして機能する。

```typescript
/**
 * ユーザーを検索する。
 */
function findUser(id: number): User | null {
  // ...
}
```

IDE（VS Code など）でホバーすると型情報とドキュメントが表示される。

**ブラウザ開発者ツール**:

- `F12`または`Ctrl + Shift + I`で開く
- Console タブで`console.dir()`を使用
- オブジェクトを展開してメソッドを確認

**Node.js REPL での確認**:

```bash
$ node
> Math.
# Tab キーを押すと補完候補が表示される
```

**Object.getOwnPropertyNames()**:

オブジェクトのプロパティ一覧を取得する。

```javascript
const obj = {
  name: "John",
  age: 25,
  greet() {
    return "Hello";
  },
};

console.log(Object.getOwnPropertyNames(obj));
// ['name', 'age', 'greet']

console.log(Object.getOwnPropertyNames(Math));
// ['abs', 'acos', 'acosh', 'asin', ...]
```

**実用例（JSDoc 付きのクラス）**:

```javascript
/**
 * ユーザーサービスクラス。
 * ユーザーの CRUD 操作を提供する。
 */
class UserService {
  /**
   * ID でユーザーを検索する。
   *
   * @param {number} userId - ユーザーID
   * @returns {User|null} 見つかったユーザー、存在しない場合は null
   * @throws {Error} userId が負の値の場合
   *
   * @example
   * const service = new UserService();
   * const user = service.findById(1);
   */
  findById(userId) {
    if (userId < 0) {
      throw new Error("IDは0以上でなければなりません");
    }
    // データベースから検索...
    return null;
  }

  /**
   * 新しいユーザーを作成する。
   *
   * @param {string} name - ユーザー名（必須）
   * @param {number} age - 年齢（0以上）
   * @returns {User} 作成されたユーザー
   * @throws {Error} name が空または age が負の値の場合
   */
  create(name, age) {
    if (!name) {
      throw new Error("名前は必須です");
    }
    if (age < 0) {
      throw new Error("年齢は0以上でなければなりません");
    }
    // ユーザーを作成...
    return new User(name, age);
  }
}
```

**MDN Web Docs**:

JavaScript の公式リファレンス（https://developer.mozilla.org/ja/）で詳細な情報を確認できる。

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
go doc package.Function
```

Go では`go doc`コマンドでドキュメントを確認できる。コメントがそのままドキュメントになる。

**go doc コマンド**:

パッケージ、関数、型のドキュメントを表示する。

```bash
# パッケージのドキュメント
go doc fmt

# 特定の関数のドキュメント
go doc fmt.Println

# 特定の型のドキュメント
go doc http.Server

# すべてのエクスポートされた項目を表示
go doc -all fmt
```

**ドキュメントコメントの書き方**:

パッケージ、関数、型の直前にコメントを書く。

```go
// Package mathutil provides basic mathematical utilities.
//
// This package includes functions for addition, subtraction,
// multiplication, and division.
package mathutil

// Add returns the sum of two integers.
//
// Example:
//
//	result := Add(5, 10)
//	fmt.Println(result) // 15
func Add(a, b int) int {
    return a + b
}

// User represents a user in the system.
type User struct {
    // ID is the unique identifier for the user.
    ID int

    // Name is the user's full name.
    Name string

    // Age is the user's age in years.
    Age int
}

// NewUser creates a new User instance.
//
// Parameters:
//   - id: The user ID
//   - name: The user's name
//   - age: The user's age
//
// Returns a pointer to the newly created User.
func NewUser(id int, name string, age int) *User {
    return &User{
        ID:   id,
        Name: name,
        Age:  age,
    }
}
```

**ドキュメントコメントの規則**:

1. パッケージ、関数、型の直前に記述する
2. コメントは名前で始める（例: "Add returns..."）
3. 完全な文章で記述する
4. インデントしたコードブロックは例として表示される

**godoc サーバー**:

ローカルでドキュメントサーバーを起動する（Go 1.12 以前）。

```bash
# Go 1.12 以前
godoc -http=:6060

# Go 1.13+（別途インストールが必要）
go install golang.org/x/tools/cmd/godoc@latest
godoc -http=:6060
```

ブラウザで`http://localhost:6060`にアクセスしてドキュメントを閲覧できる。

**go doc の使用例**:

```bash
# 自作パッケージのドキュメント
go doc myapp/mathutil
go doc myapp/mathutil.Add

# 構造体のフィールド情報
go doc myapp/models.User

# すべてのメソッドを表示
go doc -all myapp/models.User
```

**IDE でのヘルプ確認**:

GoLand、VS Code などの IDE では:

- 関数名の上でホバーするとドキュメントが表示される
- `Ctrl + Q`（GoLand）でクイックドキュメント
- `Ctrl + Space`で自動補完とドキュメント

**pkg.go.dev**:

公式の Go パッケージドキュメント（https://pkg.go.dev/）で標準ライブラリや外部パッケージのドキュメントを確認できる。

**実用例（ドキュメント付きのパッケージ）**:

```go
// Package userservice provides user management functionality.
//
// This package includes operations for creating, retrieving,
// updating, and deleting users.
package userservice

import (
    "errors"
    "myapp/models"
)

// ErrUserNotFound is returned when a user is not found.
var ErrUserNotFound = errors.New("user not found")

// UserService handles user-related operations.
type UserService struct {
    // repository is used to access user data.
    repository *UserRepository
}

// NewUserService creates a new UserService instance.
//
// Example:
//
//	service := NewUserService()
//	user, err := service.FindByID(1)
func NewUserService() *UserService {
    return &UserService{
        repository: NewUserRepository(),
    }
}

// FindByID finds a user by their ID.
//
// Parameters:
//   - id: The user ID to search for
//
// Returns the found user and nil error, or nil and an error if not found.
// Returns ErrUserNotFound if the user does not exist.
//
// Example:
//
//	user, err := service.FindByID(1)
//	if err != nil {
//	    log.Fatal(err)
//	}
//	fmt.Println(user.Name)
func (s *UserService) FindByID(id int) (*models.User, error) {
    if id < 0 {
        return nil, errors.New("IDは0以上でなければなりません")
    }

    user := s.repository.FindByID(id)
    if user == nil {
        return nil, ErrUserNotFound
    }

    return user, nil
}

// Create creates a new user.
//
// Parameters:
//   - name: The user's name (required)
//   - age: The user's age (must be non-negative)
//
// Returns the created user and nil error, or nil and an error if validation fails.
func (s *UserService) Create(name string, age int) (*models.User, error) {
    if name == "" {
        return nil, errors.New("名前は必須です")
    }
    if age < 0 {
        return nil, errors.New("年齢は0以上でなければなりません")
    }

    user := models.NewUser(0, name, age)
    return user, nil
}
```

**go doc の実行例**:

```bash
# パッケージのドキュメント
$ go doc myapp/userservice
package userservice // import "myapp/userservice"

Package userservice provides user management functionality.

This package includes operations for creating, retrieving, updating, and
deleting users.

# 特定の関数のドキュメント
$ go doc myapp/userservice.FindByID
package userservice // import "myapp/userservice"

func (s *UserService) FindByID(id int) (*models.User, error)
    FindByID finds a user by their ID.

    Parameters:
      - id: The user ID to search for
    ...
```

**コメントの推奨事項**:

1. エクスポートされた（大文字で始まる）すべての項目にコメントを書く
2. コメントは完全な文章で記述する
3. コメントは名前で始める（例: "Add returns..."）
4. 例を含める場合はインデントする

</div>
