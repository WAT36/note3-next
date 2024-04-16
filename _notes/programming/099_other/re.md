---
title: "正規表現"
date: "2019-11-01T07:37:30+09:00"
excerpt: "正規表現について"
tag: ["Python"]
programming: ["Python"]
updatedAt: "2019-11-01T07:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

文字列に正規表現を適用してある文字列パターンを抽出・検索したいという場合があると思う。

その場合に利用する方法を示す。

ちなみに正規表現の文法についてはここでは割愛する。

<div class="note_content_by_programming_language" id="note_content_Python">

```python
import re

pattern = re.compile(r'正規表現', flags=0)

match = re.search(pattern,"文字列")     #文字列で正規表現に最初にマッチした部分を返す
match = re.match(pattern,"文字列")      #文字列の先頭が正規表現にマッチしていたらそれを返す
match = re.fullmatch(pattern,"文字列")  #文字列全体が正規表現にマッチしていたらそれを返す
match = re.findall(pattern,"文字列")    #文字列中で正規表現にマッチしているものをリストにして全て返す

match.start() # マッチした文字列の文字列中での最初のインデックスを返す
match.end()   # マッチした文字列の文字列中での最後のインデックスを返す
match.span()  # マッチした文字列が文字列中でどこからどこまでのインデックスなのかを返す
match.group() # マッチした文字列を返す

re.sub(r'正規表現','置換後文字列',"文字列") #文字列中で正規表現にマッチしているものを置換後文字列に置き換えて返す

```

Python では正規表現を扱う**re**モジュールがある。
この中には色々関数があり、これらを利用して文字列パターンの抽出や検索を行う。

また、re を使う時、条件として使う正規表現も文字列として入力するが、正規表現で使う文字は特殊文字が多く、そのまま入力すると正規表現として認識してくれない時がある。
それを防ぐため、python の**raw 文字列**を使って正規表現を書く。raw 文字列を使うと、特殊文字を無視して一文字として扱ってくれるのでこの場合便利。使用法は文字列のクォーテーション(')の前に r を付ける。

(例)

```python
>>> print('C:\Users\Downloads')
  File "<stdin>", line 1
SyntaxError: (unicode error) 'unicodeescape' codec can't decode bytes in position 2-3: truncated \UXXXXXXXX escape
>>> # \u はUnicode文字列として認識されてエラーになる
>>>
>>> print(r'C:\Users\Downloads')
C:\Users\Downloads
>>> # \Uも\Dも特殊文字とは認識せずそのまま出力する
>>>
```

この raw 文字列を使い、以下に正規表現の関数の例を示す。

## 正規表現の文字列を正規表現オブジェクトに変換する

python の re で正規表現を使うには、文字列で表した正規表現をそのまま使う方法と、正規表現オブジェクトに変換して使う方法の 2 つがある。  
どちらでもよいが、正規表現の動作を何回も行わせるときは最初に文字列を正規表現オブジェクトに変換させてそれを繰り返し使わせた方が効率良く利用できる。

文字列を正規表現オブジェクトに変換するには、re モジュールの**compile**関数を使う。

```
re.compile(pattern, flags=0)
```

引数 pattern に文字列で表した正規表現を入れると、それに対応した正規表現オブジェクトを返してくれる。

## 正規表現を使って文字列を検索・抽出する

実際に正規表現を使って文字列から該当する部分を検索・抽出するにはどうすればよいのか？
それには re モジュールの以下諸関数を利用する。

|                                               |                                                                         |
| :-------------------------------------------- | :---------------------------------------------------------------------- |
| re.<b>search</b>(pattern, string, flags=0)    | #string で正規表現 pattern に最初にマッチした部分を返す                 |
| re.<b>match</b>(pattern, string, flags=0)     | #string の先頭が正規表現 pattern にマッチしていたらそれを返す           |
| re.<b>fullmatch</b>(pattern, string, flags=0) | #string 全体が正規表現 pattern にマッチしていたらそれを返す             |
| re.<b>findall</b>(pattern, string, flags=0)   | #string 中で正規表現 pattern にマッチしているものをリストにして全て返す |

いずれの関数も、もし該当する部分がない場合は None が返される。
また、これら諸関数の返り値は文字列ではなく、マッチオブジェクトと呼ばれる型のデータを返す(findall はリストを返す)。
マッチオブジェクトから結果を取得したい場合は、以下の諸関数をさらに利用する。

|                      |                                                                         |
| :------------------- | :---------------------------------------------------------------------- |
| Match.<b>start</b>() | #マッチした文字列の文字列中での最初のインデックスを返す                 |
| Match.<b>end</b>()   | #マッチした文字列の文字列中での最後のインデックスを返す                 |
| Match.<b>span</b>()  | #マッチした文字列が文字列中でどこからどこまでのインデックスなのかを返す |
| Match.<b>group</b>() | #マッチした文字列を返す                                                 |

```python
>>> import re
>>>
>>> s = "aaabbbcccdddeeefffggghhhiiijjjkkklllmmmnnnoooppp"
>>>
>>> pattern=re.compile(r'd+')
>>> m = re.search(pattern,s)
>>> m.group()
'ddd'
>>> m.start()
9
>>> m.end()
12
>>> m.span()
(9, 12)
>>>
>>> m = re.match(pattern,s)
>>> print(m)  #先頭(aaa...)に一致しないのでNone
None
>>>
>>> pattern=re.compile(r'a+')
>>> m = re.match(pattern,s)
>>> m.group()
'aaa'
>>>
>>> s = "aaa"
>>> pattern=re.compile(r'a+')
>>> m = re.fullmatch(pattern,s)
>>> m.group()
'aaa'
>>>
>>> pattern=re.compile(r'a')
>>> m = re.findall(pattern,s)
>>> print(m)
['a', 'a', 'a']
>>>
```

## 正規表現を使って文字列を置換する

文字列中の正規表現に該当する箇所を別の文字列に置換するには re モジュールの関数**sub**を使う。

`re.sub(pattern, repl, string, count=0, flags=0)`

この関数を使うと文字列 string の中で正規表現 pattern に該当する最も左の箇所を repl に置換した文字列を出力する。
引数の count には置換を行う最大回数(非負整数)を入力する。デフォルトは 0 だが、0 の場合は回数制限なしに全てを置換する。

```python
>>> import re
>>> s="aaabbbcccdddeeefff"
>>>
>>> re.sub(r'a+','A',s)
'Abbbcccdddeeefff'
>>>
>>> re.sub(r'a','A',s)
'AAAbbbcccdddeeefff'
>>>
>>> re.sub(r'aa','A',s)
'Aabbbcccdddeeefff'
>>>
```

</div>
