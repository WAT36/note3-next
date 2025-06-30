---
title: "クロージャ"
excerpt: ""
coverImage: ""
date: "2024-08-04T22:30:23.000Z"
updatedAt: "2024-08-04T22:30:23.000Z"
tag: ["Javascript", "Go"]
programming: ["Javascript", "Go"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
mode: programming
---

ここでは **クロージャ**についてを述べる。

<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
function 関数名(引数) {
  var 変数名;

  return function () {
    return 変数名;
  };
}
```

Javascript におけるクロージャとは、関数と変数が一体となったデータ構造である。この構造により、変数の値を保持する処理を簡潔に記述することができる。

関数内の変数は関数の処理が終わると破棄されるが、クロージャではガベージコレクションの対象とならず、変数への参照が残ったままになる。

クロージャの例としては以下の通り。

```javascript
//クロージャ
function closure() {
  var a = 1;

  return function () {
    return a++;
  };
}

var c = closure();

//c()を呼び出すごとにカウントアップ。クロージャなので値が残る
console.log(c());
console.log(c());
console.log(c());
```

実行結果

```
1
2
3
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
func closure() func() int {
	a := 0

	return func() int {
		a++
		return a
	}
}

func main()  {
  c := closure()

  //c()を呼ぶごとにカウントアップ
  fmt.Println(c()) // 1
  fmt.Println(c()) // 2
  fmt.Println(c()) // 3
}
```

Go では無名関数をうまく使うことで、クロージャを実現できる。

上記で関数 Closure は、"返り値に数値を返す関数" を返す関数である。その関数を実行するたびに、計算後（１足した値）が返ってくるようになっている。

main の中で変数 c に入るのは、関数 closure()が返した関数になるが、この実行結果から見るに、この関数が前回の計算結果を保持している、と見れる。

関数 closure()の中にある変数 a は、ローカル変数で、この関数が実行完了した後に破棄されるのが普通だが、関数の中で返される関数(クロージャ)がその変数を参照すると、それはローカル変数とは別にクロージャと結びついた変数として処理される。

結果として変数 a は、見かけ上は関数内のローカル変数だが、内部的にはクロージャに属する変数として機能し、クロージャが何らかの形で参照される限り、破棄されることはなくなる。

しかし、関数に変数が複数宣言されていても、全部がクロージャに属する変数として扱われることではなく、あくまでクロージャから参照される変数だけが扱われるので注意する。

</div>
