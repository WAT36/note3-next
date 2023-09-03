---
title: "リスト内包表記"
date: "2019-10-27T13:35:30+09:00"
excerpt: "リスト内包表記(Python)について"
tag: ["Python"]
programming: ["Python"]
updatedAt: "2019-10-27T13:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

リスト内包表記についてを示す。

<div class="note_content_by_programming_language" id="note_content_Python">

リスト内包とは大かっこ **\[ \]** の中に式と for 文（・if 文）を書くことにより、その式によって評価された値のリストを得られるというものである。

実行例を以下に示す。

```python
>>>
>>> # 0~4の値のリスト
>>> [i for i in range(5)]
[0, 1, 2, 3, 4]
>>>
>>> # 0~40,公差3の等差数列
>>> [i for i in range(0,40,3)]
[0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39]
>>>
>>> # 0~100のうち11の倍数
>>> [i for i in range(100) if i%11==0]
[0, 11, 22, 33, 44, 55, 66, 77, 88, 99]
>>>
>>>
```

</div>
