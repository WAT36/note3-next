---
title: "Objectオブジェクト"
excerpt: "全ての型・オブジェクトの大元"
coverImage: ""
date: "2024-07-16T23:59:06.000Z"
updatedAt: '2025-06-30T20:44:30.000Z'
tag: ["Javascript", "Go"]
programming: ["Javascript", "Go"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
mode: programming
---

<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
var obj = new Object();
```

Object オブジェクトは javascript におけるすべてのオブジェクトの大元となるオブジェクトであり、オブジェクトの共通的な性質・機能を提供するオブジェクトでもある。

Object オブジェクトには toString,valueOf などといったメソッドが用意されている。諸オブジェクトはこれらのメソッドを継承しており、それぞれのオブジェクトで利用できる。例えば String や Date オブジェクトにも toString メソッドはあると思うが、これの大元は Object 型にある toString メソッドを受け継いだものである。

Object オブジェクトにある主なメソッド類は以下の通り。

| メソッド                      | 意味                                                                          |
| :---------------------------- | :---------------------------------------------------------------------------- |
| Object.toString()             | オブジェクトの文字列表現を取得                                                |
| Object.valueOf()              | オブジェクトの基本型(大体は数値型)表現を取得                                  |
| Object.assign(target,src,...) | オブジェクト target にオブジェクト src のプロパティをコピーする(静的メソッド) |
| Object.create(proto [,props]) | オブジェクト proto を元に、新しいオブジェクトを生成する                       |

例をいくつか示す。

```javascript
var obj = new Object();
console.log(obj.toString()); // [object Object]
console.log(obj.valueOf()); // {}

var d = new Date("2000/01/01");
console.log(d.toString()); // Sat Jan 01 2000 00:00:00 GMT+0900 (日本標準時)
console.log(d.valueOf()); // 946652400000

const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };
Object.assign(target, source);
console.log(target); // { a: 1, b: 3, c: 4 }
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
var x interface{}
```

Go では **interface{}** 型が、あらゆる型の値を受け取ることができる特別な型としてある。

Go では「任意の型がこの interface{}を満たしている（=全型と互換性がある）」と見なされる。つまり、interface{} は全ての型のスーパータイプになる。

使用例としては以下の通り。

```go
var x interface{}
x = 42
fmt.Println(x)  // 出力: 42

x = "hello"
fmt.Println(x)  // 出力: hello

x = []int{1, 2, 3}
fmt.Println(x)  // 出力: [1 2 3]

func printAny(value interface{}) {
    fmt.Println("値:", value)
}

func main() {
    printAny("Go")
    printAny(123)
    printAny(true)
}
```

ただ、interface{}型では演算などが行えないので注意すること。これはあくまで全ての型の値を汎用的に表す手段であり、何らかの演算の対象としては利用できないので注意する。

```go
var x, y interface{}
x,y=1,2
z := x + y // 演算できないためエラー
```

</div>
