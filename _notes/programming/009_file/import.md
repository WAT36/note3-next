---
title: "外部ファイルのインポート"
date: "2019-10-31T02:37:30+09:00"
excerpt: "外部ファイルのインポートについて"
tag: ["Java", "Python", "Go"]
programming: ["Java", "Python", "Go"]
updatedAt: "2019-10-31T02:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

プログラムの中で、別のプログラムにある変数や関数を利用したい場合もある。その時はファイルをインポートしてくるのが手っ取り早いことが多い。その方法を示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
import パッケージ名;
```

Java では**import**文があり、これを利用することで他のプログラムを利用することができる。  
利用するには、import の後に利用したいクラス名をパッケージ名を含めて記載する。  
ただし、自分と同じパッケージに属している他クラスは import 文無しでも利用できるので、import 文は主に外部パッケージにあるクラスに対し利用する。

前述のリストや Map の所では、これらのクラスを利用するために List クラスや Map クラスを import していた。これも import を利用している例になる。

指定したパッケージ以下のクラスを全てインポートしたい時は、「\*」を利用することで指定したパッケージに属する全てのクラスを利用できる。

しかし、どのクラスを利用しているかを判別するために、大体は「\*」は使わずクラスを明示してインポートする。

例 1(クラスを指定してインポートしたい時。大体はこっちを使用)

```java
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

class Main{
  public static void main(String args[]){
    List<Integer> l = new ArrayList<Integer>();
    l.add(1);
    l.add(3);
    l.add(1,100);

    for(int i=0;i<l.size();i++){
        System.out.println(l.get(i));
    }

    Map<String,String> m = new HashMap<>();

    m.put("key","value");
    m.put("key2","value");
    m.put("key","value3");

    System.out.println(m);
  }
}
```

例 2（「\*」を指定してインポートしたい時）

```java
import java.util.*;

class Main{
  public static void main(String args[]){
    List<Integer> l = new ArrayList<Integer>();
    l.add(1);
    l.add(3);
    l.add(1,100);

    for(int i=0;i<l.size();i++){
        System.out.println(l.get(i));
    }

    Map<String,String> m = new HashMap<>();

    m.put("key","value");
    m.put("key2","value");
    m.put("key","value3");

    System.out.println(m);
  }
}
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
import モジュール名
# 及び
from モジュール名 import 変数(関数)名
```

Python にも**import**文があり、これを利用することで他のプログラム(モジュール)を利用することができる。

`import (pythonファイル(モジュール)名)`

これにより、指定したモジュールがインポートされ、利用できるようになる。利用するには、このモジュール名を使う。  
また、別モジュールが持つ変数や関数のみをインポートしたい時は以下のような構文を利用する。

`from (モジュール名) import (変数、関数名)`

実行例を以下に示す。

```python
$ ls
add.py
$ cat add.py
#add.py。同じディレクトリに作成しておく
a=1
b=2
c=3
d=4

def adder(a,b):
    return a+b
$ python
Python 3.7.3 (v3.7.3:ef4ec6ed12, Mar 25 2019, 22:22:05) [MSC v.1916 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>> #add.pyをインポート
>>> import add
>>>
>>> #addのa
>>> add.a
1
>>> #addのb
>>> add.b
2
>>> #addのadder
>>> add.adder(1,2)
3
>>> add.adder(2,3)
5
>>> quit()
$
$ python
Python 3.7.3 (v3.7.3:ef4ec6ed12, Mar 25 2019, 22:22:05) [MSC v.1916 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>> #add.pyのaだけインポート
>>> from add import a
>>> a
1
>>> #addはインポートしてないので以下はエラー
>>> add.a
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: name 'add' is not defined
>>> #bもインポートしてないのでエラー
>>> b
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: name 'b' is not defined
>>>
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
import "パッケージ名"

// 複数の場合
import (
    "パッケージ名1"
    "パッケージ名2"
)

// エイリアス(別名)をつけたい場合
import (
    f "fmt"  // fmt を f で使用
    . "math" // math を 省略形で利用(math内の関数をmath.なしで利用できる)
)
```

`import` は、他のパッケージの機能（関数・型・変数）を利用するために読み込む構文 です。

利用法は上記のとおりで、複数指定するときはかっこ()を使います。

注意としては、

- import で 相対パス（../ や ./）は使用できない
- import したパッケージを使用しないとコンパイルエラー になる
- 同一パッケージを複数回 import するとエラーになる

があるので気をつけましょう。

特に必要なパッケージがない場合は import は省略することも可能です。

また、import するパッケージ名に別の名前を与えたり、省略することもできます。

これにより長すぎるパッケージ名を短縮名で利用できたり、関数を利用するときにパッケージ名の指定が不要になります。以下に例を示します。

```go
import (
  f "fmt"
  . "math"
)

f.Println(Pi) // fmtをfで利用、math.Piをmath.の指定なく利用
```

</div>
