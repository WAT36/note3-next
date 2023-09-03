---
title: "リストの定義"
date: "2019-10-20T19:35:30+09:00"
excerpt: "リストを定義する方法。"
tag: ["Java", "Python"]
programming: ["Java", "Python"]
updatedAt: "2019-10-20T19:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

リストについて。

<div class="note_content_by_programming_language" id="note_content_Java">

Java のリストは配列とは全く別のデータ型として定義されてあり、その定義は**java.util.List**クラスにある。  
配列との違いは、配列は宣言時に長さも指定し、基本指定した長さの分しかデータを格納できないのに対し、  
リストは長さを指定せずに宣言でき、かつ好きなだけデータを格納、取り出すことができ、長さは入っているデータにより変わるという、いわば可変長の配列といってもよい。

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

配列・リストに関して、Python には基本「リスト」という概念しかなく、配列は定義されていない。  
他言語でいう配列といったデータ構造は、python の場合この「リスト」にひっくるめられていると考えていい（はず・・・）
python の場合もリストは長さを指定せずに宣言でき、好きなだけデータを格納、取り出すことも可能、そして長さは入っているデータにより変わる。

</div>
