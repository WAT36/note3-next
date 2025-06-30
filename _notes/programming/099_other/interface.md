---
title: 'インターフェース'
excerpt: ''
tag: ["Go"]
programming: ["Go"]
date: '2025-06-11T20:39:58.000Z'
updatedAt: '2025-06-11T20:39:58.000Z'
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: '/assets/blog/authors/WAT.jpg'
mode: programming
---

インターフェースについてを記載する。

<div class="note_content_by_programming_language" id="note_content_Go">

```go
type 型名 interface {
  // 定義。抽象メソッドなどをかく
}

type 構造体名 struct {}

func (引数 構造体名) 抽象メソッド名 {
  // 処理などの定義
}
// これにより構造体がinterfaceを実装することになる
```

Go の「インターフェース（interface）」とは、複数の型に共通するメソッドの集合を抽象的に定義するものになる。

オブジェクト指向言語における「インターフェース型」や「抽象クラス」に近い概念です。

例として以下を示します。

```go
type Animal interface {
    Speak()
}

type Dog struct{}

func (d Dog) Speak() {
    fmt.Println("Woof!")
}

// 使い方
func MakeItSpeak(a Animal) {
    a.Speak()
}

func main() {
    var a Animal = Dog{} // OK！
    a.Speak()            // → Woof!
}
```

使い方としては以下のような形になります。

- Dog に「Animal を実装します」とは書いていない

- Speak() メソッドがある＝自動的に Animal を満たす！

- interface 型に代入して使う

Go での例として、代表的なインターフェース「error」を見てみます。

```go
type error interface {
  Error() string
}
```

Go では、エラーが発生する可能性がある関数やメソッドの戻り値として、この error 型がよく使われます。

この error 型では、文字列を返すメソッド Error のみが定義されています。

error インターフェースを実装した型を定義してみましょう。ここでは構造体 MyError 型を定義して error インターフェースが要求する Error() string をメソッドのシグネチャ通りに定義します。

これだけでインターフェースの実装は完了になります。

```go
/*独自のエラーを定義*/
type MyError struct {
  Message string
  ErrCode int
}

/*errorインターフェースのメソッドを実装*/
func (e *MyError) Error() string {
  return e.Message
}

func RaiseError() error {
  return &MyError{Message: "エラーが発生しました", ErrCode: 1234}
}

err := RaiseError()
err.Error() // === "エラーが発生しました"
```

これでできることとしては、異なる型に共通の性質を付与できることです。

以下に例を出します。ここでは、Person 型と Car 型の２つの型でそれぞれに Stringify インターフェースで定義されたメソッドを定義しています。

```go
// インターフェース
type Stringify interface {
  ToString() string
}

type Person struct {
  Name string
  Age int
}

func (p *Person) ToString() string {
  return fmt.Sprintf("%s(%d)",p.Name,p.Age)
}

type Car struct {
  Number string
  Model string
}

func (c *Car) ToString() string {
  return fmt.Sprintf("[%s] %s",c.Number,c.Model)
}

person := &Person{Name: "Taro", Age: 21}
fmt.Println(person.ToString())
car := &Car{Number: "08-10", Model: "AX-32"}
fmt.Println(car.ToString())
```

実行結果

```
Taro(21)
[08-10] AX-32
```

</div>
