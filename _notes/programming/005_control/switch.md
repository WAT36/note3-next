---
title: "switch文"
date: "2019-10-27T20:36:30+09:00"
excerpt: "switch文について"
tag: ["Java", "Python", "Javascript"]
programming: ["Java", "Python", "Javascript"]
updatedAt: "2019-10-27T20:36:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

switch 文は一つの式の結果から多くの処理に分岐させたいときに用いる。  
ここではその switch 文についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

Java での switch 文での記法は以下の通り。

```
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

Python には**switch 文が存在しない**。

そのため if-else などで条件分岐を実装する。

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

Javascript には**switch 文**が存在し、利用法は Java と同じである。

```
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

</div>
