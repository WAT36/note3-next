---
title: "continue文"
date: "2019-10-27T19:36:30+09:00"
excerpt: "continue文について"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-27T19:36:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

continue 文は for 文、while 文のループ処理において、そのループ 1 回分の処理をそこで終了し、 条件式の判定（for 文の場合は変化式を行ってから）に移らせる文である。  
continue 文についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
continue;
```

Java で continue 文を設定したい時は、設定したい for 文、while 文のループ処理内に設定する。  
実行例を以下に示す。

```java
class Main{
  public static void main(String args[]){

    for(int i=0;i<5;i++){
      if(i<3){
        //i<3のときは処理終了 -> i++へ
        continue;
      }
      System.out.println(i);
    }

    System.out.println();

    for(int i=0;i<3;i++){
      System.out.println(i);
      for(int j=0;j<3;j++){
        if(j<1){
          //j<1のときは処理終了 -> j++へ
          continue;
        }
        System.out.println(i+" "+j);
      }
    }
  }
}
```

実行結果

```
> java Main
3
4

0
0 1
0 2
1
1 1
1 2
2
2 1
2 2
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
continue
```

Python にも continue 文があり、使い方は java と同じ。  
for,while ループの中で設定する。

```python
>>> for i in range(5):
...     if(i<3):
...             continue
...     print(i)
...
3
4
>>>
>>> for i in range(3):
...     for j in range(3):
...             if(j<1):
...                     continue
...             print(i,j)
...
0 1
0 2
1 1
1 2
2 1
2 2
>>>
>>>
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
continue
```

Javascript においても continue 文の使い方は同じである。  
設定したい for,while ループの中に設定する。

使用例

```javascript
for (var i = 0; i < 10; i++) {
  if (i >= 5) {
    continue;
  }
  console.log(i);
}
```

結果

```
0
1
2
3
4
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
continue
```

Go においても continue 文の使い方は同じである。  
設定したい for,while ループの中に設定する。

(使用例は他と同じなので略)

</div>
