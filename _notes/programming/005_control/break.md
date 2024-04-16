---
title: "break文"
date: "2019-10-27T18:36:30+09:00"
excerpt: "break文について"
tag: ["Java", "Python", "Javascript"]
programming: ["Java", "Python", "Javascript"]
updatedAt: "2019-10-27T18:36:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

ループを抜け出す際に用いる break 文についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
break;
```

ループ処理の for 文、while 文において、処理の途中に break があった場合、ループを途中で中断し、ループから抜け出してくれる。  
ループを何重にも重ねていた場合は、その break がある一番内側のループに break が適用される。

```java
class Main{
  public static void main(String args[]){

    for(int i=0;i<5;i++){
      //i>3になったらループ中断して抜け出す
      if(i>3){
        break;
      }
      //0..3までprint  それより上はbreakで中断されるためここには来ない
      System.out.println(i);
    }

    System.out.println();

    for(int i=0;i<3;i++){
      System.out.println(i);

      for(int j=0;j<3;j++){
        //j>1になったらループ中断して抜け出す　が、抜け出せるのはjのループだけ
        //iのループを抜け出したい時は、その階層内でbreakを設ける
        if(j>1){
          break;
        }

        //j=0..1までprintされる
        System.out.println(i+" "+j);
      }
    }

  }
}
```

実行結果

```
> java Main
0
1
2
3

0
0 0
0 1
1
1 0
1 1
2
2 0
2 1
```

ちなみに、switch 文ではこの break 文は必須である。  
break 文がない場合、該当した case 文以下の case 文の処理が行われてしまうので注意。

実行例を以下に示す。

```java
class Main{
  public static void main(String args[]){
    int k=1;
    switch(k){
      case 1:
        System.out.println(1);
        //break;
      case 2:
        System.out.println(2);
        //break;
      default:
        System.out.println("default");
        //break;
    }

  }
}
```

実行結果

```
> java Main
1
2
default
```

この例の場合、本当は case 1 の所の処理だけ行わせたいのだが、break を置かない場合 case 1 の下、case 2 や default の処理も順に行ってしまう。switch 文で break を設けるのはこれが理由。

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
break
```

break 文の使い方は Python も java と同じ。  
途中で中断したい for,while ループの中に設定する。

```python
>>> for i in range(5):
...     if(i>3):
...             break
...     print(i)
...
0
1
2
3
>>>
>>> for i in range(3):
...     for j in range(3):
...             if(j>1):
...                     break
...             print(i,j)
...
0 0
0 1
1 0
1 1
2 0
2 1
>>>
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
break
```

Javascript においても break 文の使い方は同じである。  
途中で中断したい for,while ループの中に設定する。

使用例

```javascript
for (var i = 0; i < 10; i++) {
  console.log(i);
  if (i >= 5) {
    break;
  }
}
```

結果

```
0
1
2
3
4
5
```

</div>
