---
title: "関数(メソッド)の定義"
date: "2019-10-29T04:37:30+09:00"
excerpt: "関数(メソッド)の定義について"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-29T04:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

関数・メソッドを定義する方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

Java では**メソッド**と言う名で呼ばれる。定義するための記法は以下の通り。クラス内で記述する。

```java
[アクセス修飾子] [static] [返り値の型] メソッド名(引数) {
    //処理文
    return 返り値;  //返り値がvoidなら不要
}
```

アクセス修飾子は public,private,protected など。public の場合は他のクラスからも利用できる。private にすると自身のクラスからしか利用することができない。
static を書くとそのメソッドは静的メソッドとなり、外部のクラスから `クラス名.メソッド名` の形で利用することができる。static がないとインスタンスメソッドとなり、インスタンスを生成してそのインスタンス名.メソッド名　の形でしか利用することができない。（通常はインスタンスメソッドで利用する）  
また、メソッドには返り値が必要である。メソッドの最後に**return**文を利用して、メソッドの出力としての返り値を指定してやる必要がある。この返り値の型は、メソッド宣言時に指定した型と同じでないといけない。  
ただし、返り値の型に void とした場合は返り値がないと言う意味なので、return は不要である。

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
def 関数名(引数):
    #処理文
    return 返り値   #関数に返り値を設ける場合はreturnを記載する。無い場合は記載しなくて良い。
```

Python では**関数**と言う名で呼ばれる。定義方法は上記の通り。

関数の処理文は def の次の行から、インデントを一つずらして書く。このインデントの段階にある文が関数の処理文として扱われる。

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
// 関数
function 関数名(引数) {
    //関数内の処理
    return 戻り値; // 値を返す時はreturnを使う
}
//または
var オブジェクト名 = new Function([引数1[,引数2]],"処理")
// オブジェクト名(引数)　で呼び出す

// メソッド
var 変数名 = {
    (key名) : function(){
        //メソッド内の処理
    },
}
```

Javascript では**関数**と**メソッド**で意味合いが微妙に異なるので注意。

関数について、Javascript では**function**キーワードを用いる方法と、**Function**コンストラクタを用いて定義する方法がある。

引数は 0 個でも、複数個でも設定できる。

戻り値を設定したい場合は、**return**文を使って戻したい値を記載する。

この他にも、**無名関数** と呼ばれる方法で関数を定義する方法もあり、その方法でも利用することができるので、そちらのページも参照のこと。

実行例を以下に示す。

```javascript
function Add(a, b) {
  return a + b;
}
console.log(Add(1, 2));

var Sub = new Function("a", "b", "return a-b");
console.log(Sub(4, 3));

var Mul = function (a, b) {
  return a * b;
};
console.log(Mul(5, 6));
```

実行結果

```
3
1
30
```

一方メソッドに関して、Javascript では、オブジェクト型データのプロパティに定義した関数のことをメソッドと呼んでいる。

メソッドを使用するには、オブジェクト型の変数のメソッドが指定されているキーを呼び出せば良い。

# (応用)call/apply メソッド

関数オブジェクトには**call**メソッドと**apply**メソッドと呼ばれるものがある。これは、関数オブジェクト内のプロパティを引数に指定したオブジェクトのプロパティに置き換えるというものである。

call,apply メソッドの違いは、関数に渡す引数の指定方法だけである。call は１個ずつだが、apply は配列形式で指定する。

以下に例を示す。

```javascript
function hello(arg1, arg2) {
  console.log(`${this.data},${arg1},${arg2}`);
}

var obj = { data: "obj." };

hello.call(obj, "xxx", "yyy");
hello.apply(obj, ["xxx", "yyy"]);
```

実行例

```
obj.,xxx,yyy
obj.,xxx,yyy
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
func 関数名(引数) 返り値の型 {
  // 処理文
  return 返り値
}
```

Go では**関数**と言う名で呼ばれる。定義方法は上記の通り。

java と同じく、関数には返り値の型が必要で、return で返される値もそれと同じ型である必要があるので注意する。

引数にも型を書いてやる必要があるので注意する。引数の型が連続して同じ場合は省略することもできるが、なるべく明示的に書いた方が良い。

```go
func plus(x int,y int) int {
  return x + y
}

// 引数の型は連続して同じ場合省略可
func minus(x,y int) int {
  return x - y
}
```

</div>
