---
title: "テキスト"
date: "2019-11-04T21:34:30.000Z"
excerpt: "HTMLでのテキストについて"
tag: ["HTML"]
updatedAt: '2025-03-25T23:16:20.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
---

HTML 文書にテキストを記載、装飾、補足するための要素についてをここでは述べる。

(一部表示例も記載するが、ブラウザ等により表示が異なる場合もあるので注意。)

# p 要素

p 要素は、一つの段落を表す要素である。

```
<p>段落１</p>
<p>段落２</p>
```

# a 要素

a 要素は別 URL へのリンクを示す時に使う要素であり、通常は**href**属性を指定して利用する。

href 属性で遷移先の URL を指定する。

```
<p><a href="/">ホーム</a></p>
```

# em 要素

em 要素は強調(emphasize)する部分を示すための要素である。入れ子にすることもでき、それにより強調の度合いを強くすることもできる。

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="raNwNjb" data-pen-title="Untitled" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/raNwNjb">
  Untitled</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

表示例

<p>ここが<em><em>超</em>タイヘン</em>な箇所だ</p>
<hr>

# strong 要素

strong 要素は重要性、重大性、緊急性が高いテキストを示す時に利用する。

この要素も入れ子にして利用することができ、重要性の度合いを強くすることもできる。

ブラウザにもよるが strong 要素で囲まれた部分は通常太字になって表示される。しかし、ただ太字にするためにこの要素を使うのはやめた方が良い。

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="gbOROWR" data-pen-title="html-strong" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/gbOROWR">
  html-strong</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# blockquote 要素

blockquote 要素は、その部分が引用してきた要素であることを示す要素である。

引用を示す要素は他にもあるが、blockquote 要素はブロックレベル要素(段落や表などをひとかたまりとする要素)であり、例えば複数行に対して適用したい場合などに利用する。

引用元を示したいときは cite 属性(及び cite 要素)を利用して示す。

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="wBvevey" data-pen-title="html-blockquote" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/wBvevey">
  html-blockquote</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# q 要素

q 要素も blockquote 要素と同じく、引用してきたことを示す要素である。

q 要素はインラインレベル要素として引用文を示す時に使用する。

blockquote 要素と同じく、引用元を示したいときは cite 属性(及び cite 要素)を利用して示す。

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="XJWgEwW" data-pen-title="html-q" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/XJWgEwW">
  html-q</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# cite 要素

cite 要素は、引用元や参照先を示すための要素である。

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="azbwYed" data-pen-title="html-cite" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/azbwYed">
  html-cite</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# mark 要素

mark 要素はある部分を目立たせたいときに使用する要素である。マーカーで線を引くようなもの。

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="raNwvBN" data-pen-title="html-mark" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/raNwvBN">
  html-mark</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# small 要素

small 要素は注釈・注記のような、欄外に示すような細かい情報を示すときに使用する要素である。

例としては著作権(Copyright)や免責事項など。

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="vEYZjYe" data-pen-title="html-small" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/vEYZjYe">
  html-small</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# data 要素

data 要素は、要素内のテキスト等に対して、「機械可読データ」を追加したい時に利用する要素である。

要は、プログラムにテキストを読み込ませるとき、実際に表示されるテキストの内容ではなく、別の内容として読み込ませたいときに使用する。

data 要素を使うときは**value**属性を必須とする。value 属性の値に、機械に使わせる値を入力する。

ただし、日時など時刻に関するデータを扱うときは、data 要素ではなく次の time 要素を使った方が良い。

```
<p>
    私の所持金は<data value="30000">三万円</data>です。
</p>
```

この場合ブラウザには"三万円"と表示されるが、プログラムがこのページを読み込むときこの箇所は"30000"となる。

# time 要素

time 要素は、日時など時刻に関する data 要素である。時刻に関する機械可読データを適用させたい時に使用する。

値に関する属性は value 属性ではなく、time 要素の場合**datetime 属性**である。こちらを利用する。

```
<p>
    締め切りは<time datetime="2020-05-01T17:30Z">明日の午後5時30分</time>です。
</p>
```

# abbr 要素

abbr 要素は、それが略語であることを示す要素である。略してない、正式名も示したいときは title 属性を使用する。

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="Pwojeqe" data-pen-title="html-abbr" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/Pwojeqe">
  html-abbr</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# dfn 要素

dfn 要素は、それが定義の対象となっていることを示す要素である。他の文中に何かの定義についての説明がされている時、どれをその定義の説明の対象としているかを示すために用いる。

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="azbwxEp" data-pen-title="html-dfn" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/azbwxEp">
  html-dfn</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# b 要素

b 要素は特に意味合いを持つことは無いが、表示として目立たせたい時に利用する要素である。

目立たせたい時の意味がしっかりある場合には、b 要素ではなくそれに応じた適切な要素を利用すること。例えば強調なら em 要素、緊急・重要性が高い内容なら strong 要素、一部分を目立たせたいなら mark 要素など。

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="raNwbJe" data-pen-title="html-b" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/raNwbJe">
  html-b</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# i 要素

i 要素も特に意味合いを持つことは無いが、表示として他と区別させたい時に利用する要素である。

他と区別させたい時の意味がしっかりある場合には、i 要素ではなくそれに応じた適切な要素を利用すること。例えば強調なら em 要素、定義に関することなら dfn 要素など。

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="gbORyvd" data-pen-title="html-i" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/gbORyvd">
  html-i</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# s 要素

s 要素は、既に使われていない、古い情報となった部分を表すための要素である。

例記載

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="mydwgxj" data-pen-title="html-s" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/mydwgxj">
  html-s</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# u 要素

u 要素はスペルミスなどの通知をする際に使用する。デフォルトでは下線が引かれる。

他の意味を持つ場合には、u 要素ではなくそれに応じた適切な要素を利用すること。

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="EaxXJLZ" data-pen-title="html-u" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/EaxXJLZ">
  html-u</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# bdo 要素

bdo 要素は、要素内の文字表記の方向を上書きする要素である。表記の方向は dir 属性を使って指定する。(必ず指定する)

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="pvoroja" data-pen-title="html-bdo" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/pvoroja">
  html-bdo</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# bdi 要素

bdi 要素は、要素内の文字表記のアルゴリズム(方向)を、ブラウザ全体で利用しているアルゴリズムとは別扱いにさせる要素である。

入力フォームなどから入力した文字を挿入するときなどに利用する。

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="VYwzwew" data-pen-title="html-bdi" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/VYwzwew">
  html-bdi</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# pre 要素

pre 要素はその内容の部分が既に整形済み(タブ・スペースなどで整えている)であることを示す要素である。この要素の内容は入力されている通りにそのまま表示される（タブ・スペースなどは弾かれない）

例記載

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="jEOLOWa" data-pen-title="html-pre" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/jEOLOWa">
  html-pre</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# code 要素

code 要素は、その部分はソースコードであることを示す要素である。

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="EaxvxgM" data-pen-title="html-code" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/EaxvxgM">
  html-code</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# kbd 要素

kbd 要素は、その部分がユーザーが入力する内容であることを示す要素である。具体的にはキー名を指定する。

例記載

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="raNzNWQ" data-pen-title="html-kbd" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/raNzNWQ">
  html-kbd</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# samp 要素

samp 要素は、それがプログラムから出力されたもの、またはそのサンプルであることを示す要素である。

例記載

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="EaxvNRL" data-pen-title="html-samp" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/EaxvNRL">
  html-samp</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# var 要素

var 要素は、それが数式やプログラム内などの変数であることを示す要素である。

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="xbxLRaa" data-pen-title="htlm-var" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/xbxLRaa">
  htlm-var</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# sup 要素

sup 要素は、上付き文字であることを示す要素である。

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="NPWvbOR" data-pen-title="html-sup" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/NPWvbOR">
  html-sup</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# sub 要素

sub 要素は、下付き文字であることを示す要素である。

例記載

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="azbyBRj" data-pen-title="html-sub" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/azbyBRj">
  html-sub</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# br 要素

br 要素は、改行を表す空要素である。１つ書くたびに１回改行されて表示される。

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="ogNeYQm" data-pen-title="html-br" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/ogNeYQm">
  html-br</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# wbr 要素

wbr 要素は、英文のテキストをその箇所で折り返して表示させるための空要素である。

通常、英文や URL などの半角英字で書かれた文は、途中で改行されないようにブラウザが調整して表示してくれるが、この wbr 要素を使うとその箇所で改行されて表示してくれる。

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="NPWvExp" data-pen-title="html-wbr" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/NPWvExp">
  html-wbr</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# ins 要素

ins 要素は、文章に追加された部分であることを示す要素である。

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="GgRvwZp" data-pen-title="html-ins" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/GgRvwZp">
  html-ins</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# del 要素

del 要素は、文章中で削除した部分を示すための要素である。

例記載

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="MYWvzyQ" data-pen-title="html-del" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/MYWvzyQ">
  html-del</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>
