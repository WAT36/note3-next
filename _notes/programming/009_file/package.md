---
title: "パッケージ"
date: "2025-03-30T10:51:30+09:00"
excerpt: ""
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2025-03-30T10:51:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

パッケージ（またはモジュール）は、コードを論理的に整理し、再利用可能にするための仕組み。各言語で異なる方法でパッケージを宣言・管理する。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
package com.example.myapp;
```

Java では`package`文を使ってクラスが属するパッケージを宣言する。パッケージはクラスを論理的にグループ化し、名前空間を提供する。

**基本的なパッケージ宣言**:

ファイルの先頭（コメントを除く）に`package`文を記述する。

```java
package com.example.myapp;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello from myapp package");
    }
}
```

**パッケージの役割**:

1. **名前空間の提供**: 同名のクラスの衝突を防ぐ
2. **アクセス制御**: パッケージスコープでのアクセス制限
3. **コードの整理**: 関連するクラスをグループ化

**パッケージの命名規則**:

- すべて小文字で記述する
- ドメイン名を逆順にするのが慣例（例: `com.example.myapp`）
- 各部分をドット(`.`)で区切る
- Java の予約語は使用できない

**ディレクトリ構造**:

パッケージ名はディレクトリ構造と一致させる必要がある。

```
src/
  com/
    example/
      myapp/
        Main.java         // package com.example.myapp;
        util/
          Helper.java     // package com.example.myapp.util;
```

**アクセス修飾子とパッケージ**:

| 修飾子      | 同じクラス | 同じパッケージ | サブクラス | すべて |
| ----------- | ---------- | -------------- | ---------- | ------ |
| `public`    | ○          | ○              | ○          | ○      |
| `protected` | ○          | ○              | ○          | ×      |
| (なし)      | ○          | ○              | ×          | ×      |
| `private`   | ○          | ×              | ×          | ×      |

**パッケージスコープ（デフォルトアクセス）**:

修飾子を付けないと、同じパッケージ内からのみアクセス可能。

```java
package com.example.myapp;

// パッケージスコープ（修飾子なし）
class Helper {
    void doSomething() {
        System.out.println("Package-private method");
    }
}
```

```java
package com.example.myapp;

public class Main {
    public static void main(String[] args) {
        Helper helper = new Helper();  // OK: 同じパッケージ
        helper.doSomething();
    }
}
```

**サブパッケージ**:

サブパッケージは親パッケージとは独立している（継承関係はない）。

```java
// com.example.myapp
package com.example.myapp;
class Parent { }  // パッケージスコープ

// com.example.myapp.util
package com.example.myapp.util;
// Parent クラスは見えない（別パッケージ扱い）
```

**パッケージのない（デフォルトパッケージ）**:

`package`文がない場合、デフォルトパッケージに属する（非推奨）。

```java
// package 文なし（デフォルトパッケージ）
public class Main {
    public static void main(String[] args) {
        System.out.println("Default package");
    }
}
```

**実用例**:

```
src/
  com/
    example/
      myapp/
        Main.java
        model/
          User.java
          Product.java
        service/
          UserService.java
          ProductService.java
        repository/
          UserRepository.java
          ProductRepository.java
        util/
          DateUtil.java
          StringUtil.java
```

```java
// Main.java
package com.example.myapp;

import com.example.myapp.service.UserService;
import com.example.myapp.model.User;

public class Main {
    public static void main(String[] args) {
        UserService userService = new UserService();
        User user = userService.findById(1);
        System.out.println(user.getName());
    }
}
```

```java
// model/User.java
package com.example.myapp.model;

public class User {
    private int id;
    private String name;

    public User(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public int getId() { return id; }
    public String getName() { return name; }
}
```

```java
// service/UserService.java
package com.example.myapp.service;

import com.example.myapp.model.User;
import com.example.myapp.repository.UserRepository;

public class UserService {
    private UserRepository repository = new UserRepository();

    public User findById(int id) {
        return repository.findById(id);
    }
}
```

**静的インポートとパッケージ**:

```java
package com.example.myapp;

import static java.lang.Math.*;

public class Calculator {
    public double calculate() {
        return sqrt(16) + PI;  // Math. が不要
    }
}
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
# mypackage/__init__.py
```

Python ではディレクトリ構造でパッケージを定義する。`__init__.py`ファイルがあるディレクトリがパッケージとして認識される。

**基本的なパッケージ構造**:

```
mypackage/
    __init__.py      # パッケージの初期化ファイル
    module1.py
    module2.py
    subpackage/
        __init__.py
        module3.py
```

**`__init__.py`の役割**:

- ディレクトリをパッケージとして認識させる
- パッケージの初期化処理を記述
- パッケージレベルの変数や関数を定義
- インポートされたときに実行される

**空の`__init__.py`**:

最もシンプルな形（Python 3.3+ では省略可能だが、明示的に作成するのが推奨）。

```python
# mypackage/__init__.py
# 空でも OK
```

**`__init__.py`で初期化処理**:

```python
# mypackage/__init__.py
print("mypackage を初期化中...")

# パッケージレベルの変数
VERSION = "1.0.0"

# パッケージレベルの関数
def get_version():
    return VERSION
```

**`__all__`で公開 API を制御**:

`from package import *`したときにインポートされるものを制限する。

```python
# mypackage/__init__.py
from .module1 import func1
from .module2 import func2

__all__ = ["func1", "func2"]  # これらのみが * でインポートされる
```

**サブパッケージ**:

```
mypackage/
    __init__.py
    module1.py
    subpackage/
        __init__.py
        module2.py
```

```python
# mypackage/subpackage/__init__.py
print("subpackage を初期化中...")
```

```python
# 使用例
import mypackage.subpackage.module2
from mypackage.subpackage import module2
```

**相対インポート**:

パッケージ内でモジュールを相対的にインポートする。

```python
# mypackage/module1.py
from . import module2           # 同じパッケージの module2
from .subpackage import module3 # サブパッケージの module3
from .. import parent_module    # 親パッケージの parent_module
```

**実用例**:

```
myapp/
    __init__.py
    main.py
    models/
        __init__.py
        user.py
        product.py
    services/
        __init__.py
        user_service.py
        product_service.py
    utils/
        __init__.py
        date_util.py
        string_util.py
```

```python
# myapp/__init__.py
__version__ = "1.0.0"
__author__ = "Your Name"

from .models import User, Product
from .services import UserService, ProductService

__all__ = ["User", "Product", "UserService", "ProductService"]
```

```python
# myapp/models/__init__.py
from .user import User
from .product import Product

__all__ = ["User", "Product"]
```

```python
# myapp/models/user.py
class User:
    def __init__(self, id, name):
        self.id = id
        self.name = name

    def __str__(self):
        return f"User(id={self.id}, name={self.name})"
```

```python
# myapp/services/user_service.py
from ..models import User

class UserService:
    def find_by_id(self, user_id):
        # データベースから取得する処理
        return User(user_id, "John Doe")
```

```python
# main.py
from myapp import UserService

service = UserService()
user = service.find_by_id(1)
print(user)  # User(id=1, name=John Doe)
```

**名前空間パッケージ（Python 3.3+）**:

`__init__.py`なしでもパッケージとして認識される（複数の場所に分散したパッケージを統合できる）。

```
# __init__.py なし
mypackage/
    module1.py
    module2.py
```

**パッケージのバージョン管理**:

```python
# mypackage/__init__.py
__version__ = "1.0.0"
__author__ = "Your Name"
__license__ = "MIT"

# バージョン情報を取得
import mypackage
print(mypackage.__version__)  # "1.0.0"
```

**`__name__`と`__package__`**:

```python
# mypackage/module1.py
print(f"__name__: {__name__}")        # mypackage.module1
print(f"__package__: {__package__}")  # mypackage

if __name__ == "__main__":
    print("このモジュールが直接実行されました")
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
// ES6 Modules (推奨)
export function myFunction() {}
```

JavaScript では ES6 Modules と CommonJS の 2 つの方式でモジュールを管理する。パッケージの概念は Node.js の`package.json`で管理される。

**ES6 Modules（モダン、推奨）**:

**名前付きエクスポート**:

```javascript
// math.js
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export const PI = 3.14159;
```

**デフォルトエクスポート**:

```javascript
// calculator.js
export default class Calculator {
  add(a, b) {
    return a + b;
  }
}
```

**CommonJS（Node.js の従来の方式）**:

**module.exports**:

```javascript
// math.js
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

module.exports = { add, subtract };
```

**package.json によるパッケージ管理**:

Node.js では`package.json`でプロジェクトとパッケージを管理する。

```json
{
  "name": "myapp",
  "version": "1.0.0",
  "description": "My Application",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "node index.js"
  },
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.0"
  }
}
```

**`"type": "module"`の指定**:

ES6 Modules を使用するには`package.json`に追加する。

```json
{
  "type": "module"
}
```

または、ファイル拡張子を`.mjs`にする。

**ディレクトリ構造（実用例）**:

```
myapp/
    package.json
    index.js
    src/
        models/
            user.js
            product.js
        services/
            userService.js
            productService.js
        utils/
            dateUtil.js
            stringUtil.js
```

**ES6 Modules の実用例**:

```javascript
// src/models/user.js
export class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  toString() {
    return `User(id=${this.id}, name=${this.name})`;
  }
}
```

```javascript
// src/services/userService.js
import { User } from "../models/user.js";

export class UserService {
  findById(userId) {
    // データベースから取得する処理
    return new User(userId, "John Doe");
  }
}
```

```javascript
// index.js
import { UserService } from "./src/services/userService.js";

const service = new UserService();
const user = service.findById(1);
console.log(user.toString()); // User(id=1, name=John Doe)
```

**CommonJS の実用例**:

```javascript
// src/models/user.js
class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  toString() {
    return `User(id=${this.id}, name=${this.name})`;
  }
}

module.exports = { User };
```

```javascript
// src/services/userService.js
const { User } = require("../models/user.js");

class UserService {
  findById(userId) {
    return new User(userId, "John Doe");
  }
}

module.exports = { UserService };
```

```javascript
// index.js
const { UserService } = require("./src/services/userService.js");

const service = new UserService();
const user = service.findById(1);
console.log(user.toString()); // User(id=1, name=John Doe)
```

**パッケージのエントリポイント**:

`package.json`の`main`フィールドで指定する。

```json
{
  "name": "mylib",
  "version": "1.0.0",
  "main": "dist/index.js"
}
```

```javascript
// dist/index.js
export { User } from "./models/user.js";
export { UserService } from "./services/userService.js";
```

```javascript
// 使用例
import { User, UserService } from "mylib";
```

**スコープ付きパッケージ（npm）**:

組織やユーザー単位でパッケージを管理する。

```json
{
  "name": "@myorg/myapp",
  "version": "1.0.0"
}
```

```bash
npm install @myorg/myapp
```

```javascript
import { something } from "@myorg/myapp";
```

**プライベート vs パブリック**:

```json
{
  "name": "myapp",
  "version": "1.0.0",
  "private": true // npm に公開しない
}
```

**ブラウザでの ES6 Modules**:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>ES6 Modules</title>
  </head>
  <body>
    <script type="module">
      import { add } from "./math.js";
      console.log(add(10, 20));
    </script>
  </body>
</html>
```

**モジュール解決の優先順位（Node.js）**:

1. コアモジュール（`fs`, `path`など）
2. `node_modules`内のパッケージ
3. 相対パス（`./`, `../`）
4. 絶対パス

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
package main
```

Go では必ず`package`宣言から始まる。パッケージはコードを論理的に整理し、再利用可能にするための仕組み。

**基本的なパッケージ宣言**:

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

**パッケージの役割**:

1. **コードの再利用**: 関数・型・変数などを複数のファイル間で共有
2. **モジュール化と管理**: 大規模なアプリケーションのコードを論理的に分割
3. **名前の衝突を防ぐ**: 別のパッケージに同じ名前の関数があってもパッケージ名で区別

**パッケージの種類**:

1. **main パッケージ**:

   - エントリポイントとなる特別なパッケージ
   - 必ず`func main()`を含める必要がある
   - 実行可能なバイナリを生成する

2. **ライブラリパッケージ**:
   - 再利用可能な関数や型を定義するパッケージ
   - `main`以外のパッケージ名で定義
   - 他のパッケージからインポートされる

**パッケージの命名規則**:

- パッケージ名は小文字で指定する
- パッケージ名はディレクトリ名と一致させる
- 同一ディレクトリ内の`.go`ファイルはすべて同じパッケージ名を使う
- `main`パッケージは 1 つのアプリケーションにつき 1 つだけ
- 1 つのファイルに記述できるのは単一のパッケージのみ

**可視性（Public/Private）**:

Go では大文字・小文字で可視性を制御する。

- **大文字で始まる**: パッケージ外部からアクセス可能（Public）
- **小文字で始まる**: パッケージ内でのみアクセス可能（Private）

```go
package mathutil

// Add は外部からアクセス可能（Public）
func Add(a, b int) int {
    return a + b
}

// subtract は内部でのみアクセス可能（Private）
func subtract(a, b int) int {
    return a - b
}

// PI は外部からアクセス可能（Public）
const PI = 3.14159

// internalValue は内部でのみアクセス可能（Private）
const internalValue = 100
```

**ディレクトリ構造**:

```
myapp/
    go.mod              // module myapp
    main.go             // package main
    models/
        user.go         // package models
        product.go      // package models
    services/
        user_service.go // package services
    utils/
        math.go         // package utils
```

**同一パッケージの複数ファイル**:

同じディレクトリ内のファイルは同じパッケージ名を使う。

```go
// models/user.go
package models

type User struct {
    ID   int
    Name string
}
```

```go
// models/product.go
package models

type Product struct {
    ID    int
    Name  string
    Price float64
}
```

**init 関数**:

パッケージの初期化処理を行う特殊な関数。`main`関数より前に実行される。

```go
package main

import "fmt"

func init() {
    fmt.Println("init 1 を実行中...")
}

func init() {
    fmt.Println("init 2 を実行中...")
}

func main() {
    fmt.Println("main を実行中...")
}
```

実行結果:

```
init 1 を実行中...
init 2 を実行中...
main を実行中...
```

**init 関数の特徴**:

- 引数・戻り値なしで定義する
- 複数定義できる（定義した順番に実行される）
- パッケージがインポートされたときに自動実行される
- 初期化処理（設定読み込み、DB 接続など）に使用

**実用例**:

```
myapp/
    go.mod
    main.go
    models/
        user.go
    services/
        user_service.go
    repositories/
        user_repository.go
```

```go
// models/user.go
package models

type User struct {
    ID   int
    Name string
}

func NewUser(id int, name string) *User {
    return &User{ID: id, Name: name}
}
```

```go
// repositories/user_repository.go
package repositories

import "myapp/models"

type UserRepository struct{}

func NewUserRepository() *UserRepository {
    return &UserRepository{}
}

func (r *UserRepository) FindByID(id int) *models.User {
    // データベースから取得する処理
    return models.NewUser(id, "John Doe")
}
```

```go
// services/user_service.go
package services

import (
    "myapp/models"
    "myapp/repositories"
)

type UserService struct {
    repo *repositories.UserRepository
}

func NewUserService() *UserService {
    return &UserService{
        repo: repositories.NewUserRepository(),
    }
}

func (s *UserService) GetUser(id int) *models.User {
    return s.repo.FindByID(id)
}
```

```go
// main.go
package main

import (
    "fmt"
    "myapp/services"
)

func main() {
    service := services.NewUserService()
    user := service.GetUser(1)
    fmt.Printf("User: ID=%d, Name=%s\n", user.ID, user.Name)
}
```

**内部パッケージ（internal）**:

`internal`という名前のディレクトリ内のパッケージは、親パッケージからのみアクセス可能。

```
myapp/
    go.mod
    main.go
    internal/
        config/
            config.go   // myapp からのみアクセス可能
```

```go
// internal/config/config.go
package config

type Config struct {
    Host string
    Port int
}
```

```go
// main.go
package main

import "myapp/internal/config"  // OK

func main() {
    cfg := config.Config{Host: "localhost", Port: 8080}
}
```

**パッケージのテスト**:

テストファイルは同じパッケージまたは`_test`サフィックスを付ける。

```go
// mathutil/math.go
package mathutil

func Add(a, b int) int {
    return a + b
}
```

```go
// mathutil/math_test.go
package mathutil  // 同じパッケージ（内部テスト）

import "testing"

func TestAdd(t *testing.T) {
    result := Add(2, 3)
    if result != 5 {
        t.Errorf("Add(2, 3) = %d; want 5", result)
    }
}
```

```go
// mathutil/math_external_test.go
package mathutil_test  // 外部テスト

import (
    "testing"
    "myapp/mathutil"
)

func TestAddExternal(t *testing.T) {
    result := mathutil.Add(2, 3)
    if result != 5 {
        t.Errorf("Add(2, 3) = %d; want 5", result)
    }
}
```

**パッケージのドキュメント**:

パッケージの先頭にコメントを書くことで、`go doc`でドキュメントを生成できる。

```go
// Package mathutil provides basic mathematical utilities.
//
// This package includes functions for addition, subtraction,
// and other basic operations.
package mathutil

// Add returns the sum of a and b.
func Add(a, b int) int {
    return a + b
}
```

```bash
go doc myapp/mathutil
go doc myapp/mathutil.Add
```

</div>
