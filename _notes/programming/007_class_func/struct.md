---
title: "構造体"
excerpt: ""
tag: ["Go"]
programming: ["Go"]
date: "2025-06-30T20:44:30.000Z"
updatedAt: '2025-11-24T22:13:44.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
mode: programming
---

構造体は、関連するデータをまとめて扱うためのデータ型。複数のフィールド（変数）を持ち、それらを 1 つの単位として扱える。

<div class="note_content_by_programming_language" id="note_content_Go">

```go
type StructName struct {
    FieldName Type
}
```

Go では`struct`キーワードで構造体を定義する。複数のフィールドをまとめて扱える。

**基本的な構造体**:

```go
package main

import "fmt"

type Point struct {
    X int
    Y int
}

func main() {
    // ゼロ値で初期化
    var p1 Point
    fmt.Println(p1)  // {0 0}

    // フィールドへのアクセス
    p1.X = 10
    p1.Y = 20
    fmt.Println(p1.X, p1.Y)  // 10 20
}
```

**構造体リテラル**:

フィールドの初期値を指定して構造体を生成できる。

```go
package main

import "fmt"

type Point struct {
    X int
    Y int
}

func main() {
    // フィールド名を指定
    p1 := Point{X: 10, Y: 20}
    fmt.Println(p1)  // {10 20}

    // 順序で指定（非推奨：フィールドの順序に依存）
    p2 := Point{30, 40}
    fmt.Println(p2)  // {30 40}

    // 一部のフィールドのみ指定（残りはゼロ値）
    p3 := Point{X: 50}
    fmt.Println(p3)  // {50 0}
}
```

**構造体のポインタ**:

構造体は値型なので、関数に渡すとコピーされる。参照を渡すにはポインタを使う。

```go
package main

import "fmt"

type Point struct {
    X int
    Y int
}

// 値渡し（コピーが作られる）
func swapValue(p Point) {
    p.X, p.Y = p.Y, p.X
    fmt.Println("関数内:", p)  // {20 10}
}

// ポインタ渡し（元の構造体を変更）
func swapPointer(p *Point) {
    p.X, p.Y = p.Y, p.X
}

func main() {
    p := Point{X: 10, Y: 20}

    swapValue(p)
    fmt.Println("値渡し後:", p)  // {10 20}（変更されていない）

    swapPointer(&p)
    fmt.Println("ポインタ渡し後:", p)  // {20 10}（変更された）
}
```

**コンストラクタ関数**:

Go にはコンストラクタがないが、`New`で始まる関数を使う慣例がある。

```go
package main

import "fmt"

type Point struct {
    X int
    Y int
}

func NewPoint(x, y int) *Point {
    return &Point{
        X: x,
        Y: y,
    }
}

func main() {
    p := NewPoint(10, 20)
    fmt.Printf("%+v\n", p)  // &{X:10 Y:20}
}
```

**メソッド**:

構造体にメソッドを定義できる（レシーバー）。

```go
package main

import (
    "fmt"
    "math"
)

type Point struct {
    X int
    Y int
}

// 値レシーバー（読み取り専用）
func (p Point) Distance() float64 {
    return math.Sqrt(float64(p.X*p.X + p.Y*p.Y))
}

// ポインタレシーバー（変更可能）
func (p *Point) Move(dx, dy int) {
    p.X += dx
    p.Y += dy
}

func main() {
    p := Point{X: 3, Y: 4}

    fmt.Println(p.Distance())  // 5

    p.Move(1, 1)
    fmt.Println(p)  // {4 5}
}
```

**構造体の埋め込み（Embedding）**:

他の構造体を埋め込んで、フィールドやメソッドを継承できる。

```go
package main

import "fmt"

type Person struct {
    Name string
    Age  int
}

func (p Person) Introduce() string {
    return fmt.Sprintf("I'm %s, %d years old", p.Name, p.Age)
}

type Employee struct {
    Person      // Person を埋め込み
    EmployeeID  int
    Department  string
}

func main() {
    emp := Employee{
        Person: Person{
            Name: "Alice",
            Age:  25,
        },
        EmployeeID: 1001,
        Department: "Engineering",
    }

    // 埋め込まれた構造体のフィールドに直接アクセス
    fmt.Println(emp.Name)        // Alice
    fmt.Println(emp.Age)         // 25
    fmt.Println(emp.EmployeeID)  // 1001

    // 埋め込まれた構造体のメソッドも使える
    fmt.Println(emp.Introduce())  // I'm Alice, 25 years old
}
```

**匿名構造体**:

一時的なデータ構造には匿名構造体を使える。

```go
package main

import "fmt"

func main() {
    // 匿名構造体
    point := struct {
        X int
        Y int
    }{
        X: 10,
        Y: 20,
    }

    fmt.Println(point)  // {10 20}

    // 関数の引数でも使える
    printPoint := func(p struct{ X, Y int }) {
        fmt.Printf("Point(%d, %d)\n", p.X, p.Y)
    }

    printPoint(point)  // Point(10, 20)
}
```

**構造体のタグ**:

フィールドにメタデータを付与できる。JSON や DB のマッピングに使われる。

```go
package main

import (
    "encoding/json"
    "fmt"
)

type Person struct {
    Name  string `json:"name"`
    Age   int    `json:"age"`
    Email string `json:"email,omitempty"`  // 空の場合は省略
}

func main() {
    person := Person{
        Name:  "Alice",
        Age:   25,
        Email: "alice@example.com",
    }

    // JSON にエンコード
    jsonData, _ := json.Marshal(person)
    fmt.Println(string(jsonData))
    // {"name":"Alice","age":25,"email":"alice@example.com"}

    // JSON からデコード
    jsonStr := `{"name":"Bob","age":30}`
    var p Person
    json.Unmarshal([]byte(jsonStr), &p)
    fmt.Printf("%+v\n", p)  // {Name:Bob Age:30 Email:}
}
```

**よく使われるタグ**:

```go
type User struct {
    ID        int    `json:"id" db:"id" validate:"required"`
    Name      string `json:"name" db:"name" validate:"required,min=1,max=100"`
    Email     string `json:"email" db:"email" validate:"required,email"`
    CreatedAt string `json:"created_at,omitempty" db:"created_at"`
}

// json: JSON のキー名
// db: データベースのカラム名
// validate: バリデーションルール
// omitempty: 空の場合は省略
```

**reflect パッケージでタグを取得**:

```go
package main

import (
    "fmt"
    "reflect"
)

type Point struct {
    X int `json:"x" description:"X座標"`
    Y int `json:"y" description:"Y座標"`
}

func main() {
    p := Point{X: 1, Y: 2}

    t := reflect.TypeOf(p)
    for i := 0; i < t.NumField(); i++ {
        field := t.Field(i)
        fmt.Printf("フィールド名: %s\n", field.Name)
        fmt.Printf("  json: %s\n", field.Tag.Get("json"))
        fmt.Printf("  description: %s\n", field.Tag.Get("description"))
    }
}

// 出力:
// フィールド名: X
//   json: x
//   description: X座標
// フィールド名: Y
//   json: y
//   description: Y座標
```

**構造体の比較**:

```go
package main

import "fmt"

type Point struct {
    X int
    Y int
}

func main() {
    p1 := Point{X: 10, Y: 20}
    p2 := Point{X: 10, Y: 20}
    p3 := Point{X: 30, Y: 40}

    // 構造体の比較（すべてのフィールドが等しい場合に true）
    fmt.Println(p1 == p2)  // true
    fmt.Println(p1 == p3)  // false
}
```

**注意点**:

- スライスやマップを含む構造体は比較できない
- ポインタを含む構造体は、ポインタのアドレスで比較される

```go
type Data struct {
    Values []int
}

d1 := Data{Values: []int{1, 2, 3}}
d2 := Data{Values: []int{1, 2, 3}}

// コンパイルエラー: スライスを含む構造体は比較できない
// fmt.Println(d1 == d2)
```

**ゼロ値**:

構造体のゼロ値は、すべてのフィールドがそれぞれのゼロ値になったもの。

```go
package main

import "fmt"

type Person struct {
    Name  string
    Age   int
    Email string
}

func main() {
    var p Person
    fmt.Printf("%+v\n", p)  // {Name: Age:0 Email:}

    // フィールドのゼロ値:
    // string: ""
    // int: 0
    // bool: false
    // ポインタ: nil
}
```

**実用例（設定の管理）**:

```go
package main

import "fmt"

type Config struct {
    Host     string
    Port     int
    Debug    bool
    MaxConns int
}

func NewConfig() *Config {
    return &Config{
        Host:     "localhost",
        Port:     8080,
        Debug:    false,
        MaxConns: 100,
    }
}

func main() {
    config := NewConfig()
    fmt.Printf("%+v\n", config)
    // &{Host:localhost Port:8080 Debug:false MaxConns:100}
}
```

**実用例（データベースのモデル）**:

```go
package main

import (
    "fmt"
    "time"
)

type User struct {
    ID        int       `json:"id" db:"id"`
    Name      string    `json:"name" db:"name"`
    Email     string    `json:"email" db:"email"`
    CreatedAt time.Time `json:"created_at" db:"created_at"`
    UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
}

func NewUser(name, email string) *User {
    now := time.Now()
    return &User{
        Name:      name,
        Email:     email,
        CreatedAt: now,
        UpdatedAt: now,
    }
}

func (u *User) UpdateName(name string) {
    u.Name = name
    u.UpdatedAt = time.Now()
}

func main() {
    user := NewUser("Alice", "alice@example.com")
    fmt.Printf("%+v\n", user)

    user.UpdateName("Alice Smith")
    fmt.Printf("%+v\n", user)
}
```

</div>
