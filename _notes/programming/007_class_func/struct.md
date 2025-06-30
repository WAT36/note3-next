---
title: '構造体'
excerpt: ''
tag: ["Go"]
programming: ["Go"]
date: '2025-06-30T20:44:30.000Z'
updatedAt: '2025-06-30T20:44:30.000Z'
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: '/assets/blog/authors/WAT.jpg'
ogImage:
  url: ''
---

構造体についてを記載する。

<div class="note_content_by_programming_language" id="note_content_Go">

```go
type 構造体名 struct {
  X int // フィールドの定義。左は例
  // ...
}

// フィールドの参照
構造体型変数.フィールド名
```

Go では構造体を定義するには一般的に type と組み合わせて新しい型を定義します。

`struct { [フィールドの定義] }` という形で書きます。

フィールドは何個でも定義する事ができます。

```go
type Point struct {
  X int
  Y int
}
```

構造体内のフィールドを参照したり値を代入したいときは、`構造体型変数.フィールド名`で参照できます。

```go
var pt Point
pt.X // == 0
pt.Y // == 0

/*フィールドへの代入*/
pt.X = 10
pt.Y = 8
```

## 複合リテラル

構造体では各フィールドの初期値を指定しつつ構造体を生成できる**複合リテラル**といった機能があります。

`{}`で囲んだ中に各フィールドの初期値を列挙する事ができ、それぞれの値は構造体のフィールドが定義された順序に対応しています。

```go
pt := Point{1,2}
pt.X // == 1
pt.Y // == 2
```

## 無名フィールド

高度な仕様ではあるが、Go の構造体には「無名フィールド」を定義する事ができる。

フィールド名に「\_」を与えると、そのフィールドは無名フィールドになる。

この無名フィールドにはフィールド名が存在しないので、参照や代入といった操作は不可能になる。同時に複合リテラルでの初期化も行えない。

```go
type T struct {
  N uint
  _ int16 // 無名フィールド
  S string
}
```

## 無名の構造体型

構造体型の定義は主に type と組み合わせて利用するが、`struct { [フィールド定義] }` という構造体型そのものを型として利用する事も可能である。

例えば以下のような関数の引数で定義する型などがある。

```go
func printStruct(s struct{X,Y int}){
  fmt.Println(s)
}
```

## 構造体とポインタ

構造体は**値型**として扱われる。関数で構造体を引数として直接渡すとき、関数内でその構造体の値を変更しても、元の構造体と関数内での構造体は全く別物として扱われるので変更はされない。

そのため、構造体を関数へ参照渡しするために必要になるのが「構造体型へのポインタ」である。以下に利用例を示す。

```go
type Point struct {
  X,Y int
}
p := Point{X:1,Y:2}

func swap(p Point){
  // X,Yの入れ替え、しかし値渡しなので元の構造体の値は変更されない
  x,y := p.Y,p.X
  p.X = x
  p.Y = y
}
swap(p)

func swapP(p *Point){
  // X,Yの入れ替え、ポインタを渡すことで参照先の値を変更、反映される
  x,y := p.Y,p.X
  p.X = x
  p.Y = y
}
swapP(&p)　　　
```

このように、構造他愛は主にポインタ型を経由して使用することがほとんどである。

## 構造体(型)のコンストラクタ

Go には Java などオブジェクト指向プログラミング言語に見られる「コンストラクタ」機能はないが、慣例的に「型のコンストラクタ」と言うパターンを利用する。

次の例では、構造体 Point 型とその初期化のための関数 NewPoint が定義されている。ここでもそうだが、型のコンストラクタを表す関数は「New」から始まる名前にするのが一般的であり、対象の型のポインタ型を返すのが望ましい。

```go
type Point struct {
  X,Y int
}

func NewPoint(x int, y int) *Point {
  p := new(Point)
  p.X = x
  p.Y = y
  return p
}
```

# タグ

構造体には**タグ**という、フィールドにメタ情報を付与する機能がある。以下に例を示す。

```go
import (
	"fmt"
	"reflect"
)

type Point struct {
	X int "X座標"
	Y int "Y座標"
}

func Tag() {
	p := Point{X: 1, Y: 2}

	t := reflect.TypeOf(p)
	for i := 0; i < t.NumField(); i++ {
		f := t.Field(i)
		fmt.Println(f.Name, f.Tag)
	}
}
```

実行結果

```
X X座標
Y Y座標
```

reflect パッケージの機能を使い、Point 型のフィールド名とタグ名を取り出せています。このように、タグはコード中で定義された構造体のフィールドに、メタ情報を付与します。

</div>
