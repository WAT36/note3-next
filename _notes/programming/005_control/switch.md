---
title: "switch文"
date: "2019-10-27T20:36:30+09:00"
excerpt: "switch文について"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-27T20:36:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

switch 文は一つの式の結果から多くの処理に分岐させたいときに用いる。  
ここではその switch 文についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
switch (式) {
    case 定数１:
        //式の結果が定数１に一致したときはここの処理が実行
        break;
    case 定数２：
        //式の結果が定数２に一致したときはここの処理が実行
        break;
    ・・・
    ・・・
    default:
        //どのcaseにも一致しなかった場合はこの処理が実行
        break;
}
```

Java での switch 文での記法は上記の通り。

case,default 後の処理の最後には必ず**break**を書く。書かないとその後ろの case 文の処理も実行してしまう。

```java
import java.util.Random;

class Main{
  public static void main(String args[]){

    Random random = new Random();
    int val = random.nextInt(3); //0~2でランダムに数値選出
    System.out.print(val + ": ");

    switch(val){
      case 2:
        System.out.println("大吉");
        break;
      case 1:
        System.out.println("中吉");
        break;
      default:
        System.out.println("吉");
        break;
    }

  }
}
```

実行結果

```
$ java Main
0: 吉
$ java Main
2: 大吉
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
# (なし)
```

Python には**switch 文が存在しない**。

そのため if-else などで条件分岐を実装する。

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
switch (式) {
    case 定数１:
        //式の結果が定数１に一致したときはここの処理が実行
        break;
    case 定数２：
        //式の結果が定数２に一致したときはここの処理が実行
        break;
    ・・・
    ・・・
    default:
        //どのcaseにも一致しなかった場合はこの処理が実行
        break;
}
```

Javascript には**switch 文**が存在し、利用法は Java と同じで、上記の通り。

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
switch [簡易文;] 式 {
case 定数１:
  //式の結果が定数１に一致したときはここの処理が実行
case 定数２:
  //式の結果が定数１に一致したときはここの処理が実行
  fallthrough  // フォールスルーさせたいときは記載
・・・
・・・
default:
  //どのcaseにも一致しなかった場合はこの処理が実行
}

// または

switch {
case 式１:
  //式１が真ならここの処理が実行
case 式２:
  //式２が真ならここの処理が実行
・・・
・・・
default:
  //どのcaseにも一致しなかった場合はこの処理が実行
}
```

Go での switch 文の記法は主に 2 通りあり、上記の通り。

なお、Go では他言語にはある case 文末の **break** は不要となる。

他言語では break 文がない場合次の case 文の処理に行ってしまう**フォールスルー(fall through)**という動作があったが、Go では通常このような動作は発生しない。

しかし、このフォールスルーを Go でさせたい場合は、case 文の末尾に**fallthrough**を記載する。すると、case 文が終わると次の case 文の処理に行くようになる。

```go
switch s := "A"; s {
case "A":
  s += "B"
  fallthrough
case "B":
  s += "C"
  fallthrough
default:
  s += "Z"
}
fmt.Println(s) // "ABCZ"
```

また、Go では case 文に式を書くこともできる。

その場合は switch 文の式は不要で、if 文のような処理が行える。

```go
n := 4
switch {
case n < 0:
  fmt.Println("0 < n")
case n >= 0 && n < 5:
  fmt.Println("0 <= n < 5")
}
// "0 <= n < 5"
```

</div>
