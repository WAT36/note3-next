---
title: "Strictモード(Javascript)"
date: "2019-11-01T09:37:30+09:00"
excerpt: "Strictモード(Javascript)について"
tag: ["Javascript"]
programming: ["Javascript"]
updatedAt: "2019-11-01T09:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

Javascript の Strict モードについて。

Javascript の仕様には様々な理由で曖昧さが存在しており、それが時にエラーの原因になりうることもある。

これらの問題の原因に対して、厳格な(Strict)チェックをするための機能が**Strict モード**になる。

この Strict モードを指定することにより、エラーの発見が容易になったり、適切な最適化が行え処理を高速化することができる。

Strict モードにするには、以下の宣言を記述する。

```javascript
"use strict";
```

記述した箇所によって適用されるスコープが変わるので注意。ソースコードの先頭に記述した場合はソースコード全体に、関数内の先頭に記述した場合はその関数全体に適用される。

# 曖昧さとは

曖昧さとは、例えば Javascript の予約語を変数名として利用してもエラーにならないなどといったようなものである。

例えば、以下の javascript を実行してみると

```javascript
var package = 1;
console.log(package);
```

ログには以下のように出力される。

```
1
```

通常、package は javascript の予約語の一つであり、変数名として利用することはできない。

ここで、Strict モードを適用してみると

```javascript
"use strict";

var package = 1;
console.log(package);
```

結果は以下のようになる。

```
SyntaxError: Cannot use the reserved word 'package' as a variable name in strict mode.
```

このように、Strict モードを使うことによって、曖昧な仕様に対する厳格なエラーチェックを行ってくれる。
