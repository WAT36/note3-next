---
title: "defer文とリソース管理"
excerpt: "関数終了時の処理を保証する仕組み"
date: "2025-06-30T20:44:30.000Z"
updatedAt: '2025-11-24T22:13:44.000Z'
tag: ["Go"]
programming: ["Go"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
mode: programming
---

<div class="note_content_by_programming_language" id="note_content_Go">

```go
defer statement
```

Go では`defer`文を使って、関数終了時に確実に実行される処理を登録できる。

**基本的な defer**:

`defer`で登録された処理は、関数が終了する直前に実行される。

```go
package main

import "fmt"

func main() {
    defer fmt.Println("最後に実行")

    fmt.Println("1番目")
    fmt.Println("2番目")
}

// 出力:
// 1番目
// 2番目
// 最後に実行
```

**複数の defer（LIFO 順）**:

複数の defer は、後から登録された順（LIFO: Last In First Out）に実行される。

```go
package main

import "fmt"

func main() {
    defer fmt.Println("1")
    defer fmt.Println("2")
    defer fmt.Println("3")

    fmt.Println("通常の処理")
}

// 出力:
// 通常の処理
// 3
// 2
// 1
```

**defer の引数評価**:

defer の引数は、defer が実行された時点で評価される（関数終了時ではない）。

```go
package main

import "fmt"

func main() {
    i := 0
    defer fmt.Println("defer:", i)  // i=0 で評価される

    i = 10
    fmt.Println("通常:", i)
}

// 出力:
// 通常: 10
// defer: 0
```

クロージャを使うと、関数終了時の値を使える。

```go
package main

import "fmt"

func main() {
    i := 0
    defer func() {
        fmt.Println("defer:", i)  // 関数終了時の i を参照
    }()

    i = 10
    fmt.Println("通常:", i)
}

// 出力:
// 通常: 10
// defer: 10
```

**実用例（ファイルのクローズ）**:

```go
package main

import (
    "fmt"
    "os"
)

func readFile(path string) error {
    file, err := os.Open(path)
    if err != nil {
        return err
    }
    defer file.Close()  // 関数終了時に必ずクローズ

    // ファイルを読む処理
    data := make([]byte, 100)
    _, err = file.Read(data)
    if err != nil {
        return err  // エラーでも Close が呼ばれる
    }

    fmt.Println(string(data))
    return nil
}
```

**実用例（ロックの解放）**:

```go
package main

import (
    "fmt"
    "sync"
)

var mu sync.Mutex
var count int

func increment() {
    mu.Lock()
    defer mu.Unlock()  // 関数終了時に必ずアンロック

    count++
    fmt.Println("Count:", count)
}

func main() {
    increment()
    increment()
}
```

**panic と recover**:

defer は panic が発生しても実行される。recover() で panic を捕捉できる。

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
    panic("何か問題が発生")
    fmt.Println("ここは実行されない")
}

func main() {
    mayPanic()
    fmt.Println("プログラム継続")
}

// 出力:
// 処理開始
// Recovered from panic: 何か問題が発生
// プログラム継続
```

**実用例（タイマー）**:

```go
package main

import (
    "fmt"
    "time"
)

func withTimer(name string, fn func()) {
    start := time.Now()
    defer func() {
        elapsed := time.Since(start)
        fmt.Printf("%s: %v\n", name, elapsed)
    }()

    fn()
}

func main() {
    withTimer("処理1", func() {
        time.Sleep(100 * time.Millisecond)
    })
    // 処理1: 100ms
}
```

**ループ内での defer の注意点**:

ループ内で defer を使うと、関数終了まで蓄積される。

```go
package main

import "fmt"

func badExample() {
    for i := 0; i < 5; i++ {
        defer fmt.Println(i)
    }
    // すべての defer が関数終了時に実行される
}

func main() {
    badExample()
}

// 出力（LIFO順）:
// 4
// 3
// 2
// 1
// 0
```

解決策：無名関数で囲む。

```go
package main

import "fmt"

func goodExample() {
    for i := 0; i < 5; i++ {
        func() {
            defer fmt.Println(i)
            // ここで defer が実行される
        }()
    }
}

func main() {
    goodExample()
}

// 出力（順番通り）:
// 0
// 1
// 2
// 3
// 4
```

**実用例（トランザクション）**:

```go
package main

import (
    "database/sql"
    "fmt"
)

func executeTransaction(db *sql.DB) error {
    tx, err := db.Begin()
    if err != nil {
        return err
    }

    defer func() {
        if p := recover(); p != nil {
            tx.Rollback()
            panic(p)  // 再panic
        } else if err != nil {
            tx.Rollback()
            fmt.Println("ロールバック")
        } else {
            err = tx.Commit()
            fmt.Println("コミット")
        }
    }()

    // トランザクション内の処理
    _, err = tx.Exec("INSERT INTO users ...")
    if err != nil {
        return err
    }

    return nil
}
```

**実用例（リソースのクリーンアップ）**:

```go
package main

import "fmt"

type Resource struct {
    Name string
}

func (r *Resource) Close() {
    fmt.Println(r.Name, "closed")
}

func processResources() {
    r1 := &Resource{Name: "Resource1"}
    defer r1.Close()

    r2 := &Resource{Name: "Resource2"}
    defer r2.Close()

    r3 := &Resource{Name: "Resource3"}
    defer r3.Close()

    fmt.Println("処理中")
}

func main() {
    processResources()
}

// 出力:
// 処理中
// Resource3 closed
// Resource2 closed
// Resource1 closed
```

**defer のパフォーマンス**:

defer には若干のオーバーヘッドがある。パフォーマンスが重要な場合は、明示的にクローズする。

```go
// defer を使う（推奨：読みやすい）
func withDefer() {
    file, _ := os.Open("file.txt")
    defer file.Close()
    // 処理
}

// 明示的にクローズ（パフォーマンス重視）
func withoutDefer() {
    file, _ := os.Open("file.txt")
    // 処理
    file.Close()
}
```

ただし、ほとんどの場合 defer のオーバーヘッドは無視できるため、可読性を優先して defer を使うことが推奨される。

</div>
