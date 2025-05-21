---
title: "辞書(Map)"
date: "2019-10-28T00:36:30+09:00"
excerpt: "辞書(Map)について"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-28T00:36:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

辞書(Map)とは何か？

辞書(Map)とは **"キー"** と **"値"** の２つの要素からなるデータ構造で、キーを指定した時、辞書(Map)内でそのキーに対応づけられている値が返ってくるというデータ構造である。  
またこの定義上、キーは辞書(Map)内では一意でないといけない（キーが重複してはならない）。ただし、値の方は一意になってなくても良い（重複しても良い）

定義の方法をそれぞれの言語で示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
import java.util.Map;
import java.util.HashMap;
Map<String,String> m = new HashMap<>();
```

Java では**java.util.Map**をインポートして利用する。  
ただし、この Map クラスはインタフェースなので、利用するには具体的な実装がある別の Map のクラスをインポートして利用する。  
特に指定無い場合は**java.util.HashMap**を使う。

```java
import java.util.Map;
import java.util.HashMap;
class Main{
  public static void main(String args[]){

      Map<String,String> m = new HashMap<>();

  }
}
```

実際にこの Map 内にキー・要素を入れる方法については別項に記載する。

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
m = {キー: 値}
```

Python では辞書という名前で呼ばれ、**{}** のカッコ内で囲まれたものが辞書となる。

```python
>>> a={}
>>>
>>> a
{}
>>>
```

実際にこの辞書内にキー・要素を入れる方法については別項に記載する。

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
let m = new Map();
```

Javascript では**Map オブジェクト**と呼ばれるものが該当する。

宣言するには、`new Map();`と言う形で行う。これで Map オブジェクトが作成される。

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
m := make(map[キー型名]値型名)
```

Go では参照型の１つで**マップ**というものがある。これが Go での Map のようなデータ構造である。

Go のマップを表す型は、**map[キー型名]値型名**で表す。生成には make 関数を使って行う。

```go
m := make(map[int]string)

m[1] = "one"
m[10] = "ten"
```

</div>
