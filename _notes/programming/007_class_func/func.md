---
title: "関数(メソッド)の定義"
date: "2019-10-29T04:37:30+09:00"
excerpt: "関数(メソッド)の定義について"
tag: ["Java", "Python", "Javascript"]
programming: ["Java", "Python", "Javascript"]
updatedAt: "2019-10-29T04:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

関数・メソッドを定義する方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

Java では**メソッド**と言う名で呼ばれる。定義するための記法は以下の通り。クラス内で記述する。

```
[アクセス修飾子] [static] [返り値の型] メソッド名 {
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

Python では**関数**と言う名で呼ばれる。定義方法は以下の通り。

```
def 関数名(引数):
    #処理文
    return 返り値   #関数に返り値を設ける場合はreturnを記載する。無い場合は記載しなくて良い。
```

関数の処理文は def の次の行から、インデントを一つずらして書く。このインデントの段階にある文が関数の処理文として扱われる。

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

Javascript では**関数**と**メソッド**で意味合いが微妙に異なるので注意。

## 関数

関数について、Javascript では**function**キーワードを用いる方法と、**Function**コンストラクタを用いて定義する方法がある。

```
function 関数名(引数) {
    //関数内の処理
}

//または

var オブジェクト名 = new Function([引数1[,引数2]],"処理")
```

引数は 0 個でも、複数個でも設定できる。

戻り値を設定したい場合は、**return**文を使って戻したい値を記載する。

また、Javascript では**無名関数**という使用があり、変数に直接関数を代入することができる。

```
var 変数名 = function(引数){
    //処理
};
```

呼び出すときは、`変数名(引数);`という形で利用できる。

## メソッド

Javascript では、オブジェクト型データのプロパティに定義した関数のことをメソッドと呼んでいる。

```
var 変数名 = {
    (key名) : function(){
        //メソッド
    },

    ・・・
}
```

メソッドを使用するには、オブジェクト型の変数のメソッドが指定されているキーを呼び出せば良い。

</div>
