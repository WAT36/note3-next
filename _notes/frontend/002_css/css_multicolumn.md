---
title: "マルチカラム"
date: "2019-11-05T23:40:30.000Z"
excerpt: "CSSでのマルチカラムの設定について"
tag: ["CSS"]
updatedAt: "2023-03-08T22:23:47.000Z"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
---

マルチカラムとは、ボックスの内部を複数の段に分割してできるレイアウトである。

ここでは、マルチカラムについてを述べる。

# column-count プロパティ

column-count プロパティは、何段組みするかを設定するプロパティである。

値は 1 以上の整数または auto で指定する。

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="WbNGXyx" data-pen-title="css-column-count" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/WbNGXyx">
  css-column-count</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# column-width プロパティ

column-width プロパティは、段の幅を指定するプロパティである。値は単位付きの数値または auto で指定する。

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="raNMEoY" data-pen-title="css-column-width" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/raNMEoY">
  css-column-width</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# columns プロパティ

columns プロパティは、前述の column-count,column-width をまとめて指定できるプロパティである。

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="WbNGqPx" data-pen-title="css-columns" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/WbNGqPx">
  css-columns</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# column-gap プロパティ

column-gap プロパティは、段の間隔を設定するプロパティである。値は単位付きの数値を指定する。

使用例

```
<p style="background-color: #66ff99; width:700px; height:100px; overflow:hidden; column-count:2; column-gap:100px">
祇園精舍の鐘の声、諸行無常の響きあり。
娑羅双樹の花の色、盛者必衰の理をあらはす。
おごれる人も久しからず、ただ春の夜の夢のごとし。
猛き者もつひには滅びぬ、ひとへに風の前の塵に同じ。
</p>
```

表示例

<p style="background-color: #66ff99; width:700px; height:100px; overflow:hidden; column-count:2; column-gap:100px">
祇園精舍の鐘の声、諸行無常の響きあり。
娑羅双樹の花の色、盛者必衰の理をあらはす。
おごれる人も久しからず、ただ春の夜の夢のごとし。
猛き者もつひには滅びぬ、ひとへに風の前の塵に同じ。
</p>
<hr>

# column-rule プロパティ

段と段の間にはボーダーと同様の線を引くことができる。その線を設定するプロパティが column-rule 系のプロパティである。

このプロパティにはいくつか種類があり、以下の通りである。

| プロパティ名      | 意味                                           |
| :---------------- | :--------------------------------------------- |
| column-rule-style | 線の線種                                       |
| column-rule-color | 線の色                                         |
| column-rule-width | 線の太さ                                       |
| column-rule       | 上記のプロパティの値を空白区切りでまとめて指定 |

使用例

```
<p style="background-color: #66ff99; width:700px; height:300px; column-count: 3; column-rule: 3px double red;">
祇園精舍の鐘の声、諸行無常の響きあり。
娑羅双樹の花の色、盛者必衰の理をあらはす。
おごれる人も久しからず、ただ春の夜の夢のごとし。
猛き者もつひには滅びぬ、ひとへに風の前の塵に同じ。
遠く異朝をとぶらへば、秦の趙高、漢の王莽、梁の朱忌、唐の祿山、これらは皆旧主先皇の政にも従はず、樂しみをきはめ、諌めをも思ひ入れず、天下の乱れん事を悟らずして、民間の愁ふるところを知らざつしかば、久しからずして、亡じにし者どもなり。
近く本朝をうかがふに、承平の将門、天慶の純友、康和の義親、平治の信頼、これらはおごれる心も猛き事も、皆とりどりにこそありしかども、ま近くは、六波羅の入道前太政大臣平朝臣清盛公と申しし人のありさま、伝えへ承るこそ、心もことばも及ばれね。
</p>
```

表示例

<p style="background-color: #66ff99; width:700px; height:300px; column-count: 3; column-rule: 3px double red;">
祇園精舍の鐘の声、諸行無常の響きあり。
娑羅双樹の花の色、盛者必衰の理をあらはす。
おごれる人も久しからず、ただ春の夜の夢のごとし。
猛き者もつひには滅びぬ、ひとへに風の前の塵に同じ。
遠く異朝をとぶらへば、秦の趙高、漢の王莽、梁の朱忌、唐の祿山、これらは皆旧主先皇の政にも従はず、樂しみをきはめ、諌めをも思ひ入れず、天下の乱れん事を悟らずして、民間の愁ふるところを知らざつしかば、久しからずして、亡じにし者どもなり。
近く本朝をうかがふに、承平の将門、天慶の純友、康和の義親、平治の信頼、これらはおごれる心も猛き事も、皆とりどりにこそありしかども、ま近くは、六波羅の入道前太政大臣平朝臣清盛公と申しし人のありさま、伝えへ承るこそ、心もことばも及ばれね。
</p>
<hr>

# column-span プロパティ

column-span プロパティは、ボックスが段組みされている時に、指定した要素を段の中に収めず、ボックスの幅いっぱい（全ての段を跨いで）に表示させるプロパティである。

値は all(全ての段に跨いで表示)、none（段を跨いで表示させない）が指定できる。

使用例

```
<div style="background-color: #66ff99; width:800px; height:300px; overflow:hidden; column-count:3">
<p>
祇園精舍の鐘の声、諸行無常の響きあり。
娑羅双樹の花の色、盛者必衰の理をあらはす。
おごれる人も久しからず、ただ春の夜の夢のごとし。
猛き者もつひには滅びぬ、ひとへに風の前の塵に同じ。
</p>
<p style="background-color: red; column-span: all;">〜〜中略〜〜</p>
<p>
遠く異朝をとぶらへば、秦の趙高、漢の王莽、梁の朱忌、唐の祿山、これらは皆旧主先皇の政にも従はず、樂しみをきはめ、諌めをも思ひ入れず、天下の乱れん事を悟らずして、民間の愁ふるところを知らざつしかば、久しからずして、亡じにし者どもなり。
近く本朝をうかがふに、承平の将門、天慶の純友、康和の義親、平治の信頼、これらはおごれる心も猛き事も、皆とりどりにこそありしかども、ま近くは、六波羅の入道前太政大臣平朝臣清盛公と申しし人のありさま、伝えへ承るこそ、心もことばも及ばれね。
</p>
</div>
```

表示例

<div style="background-color: #66ff99; width:800px; height:300px; overflow:hidden; column-count:3">
<p>
祇園精舍の鐘の声、諸行無常の響きあり。
娑羅双樹の花の色、盛者必衰の理をあらはす。
おごれる人も久しからず、ただ春の夜の夢のごとし。
猛き者もつひには滅びぬ、ひとへに風の前の塵に同じ。
</p>
<p style="background-color: red; column-span: all;">〜〜中略〜〜</p>
<p>
遠く異朝をとぶらへば、秦の趙高、漢の王莽、梁の朱忌、唐の祿山、これらは皆旧主先皇の政にも従はず、樂しみをきはめ、諌めをも思ひ入れず、天下の乱れん事を悟らずして、民間の愁ふるところを知らざつしかば、久しからずして、亡じにし者どもなり。
近く本朝をうかがふに、承平の将門、天慶の純友、康和の義親、平治の信頼、これらはおごれる心も猛き事も、皆とりどりにこそありしかども、ま近くは、六波羅の入道前太政大臣平朝臣清盛公と申しし人のありさま、伝えへ承るこそ、心もことばも及ばれね。
</p>
</div>
<hr>

# フレキシブルボックスレイアウト

display プロパティにおいて、値を flex と指定すると、その内部の子要素を縦、横、逆順などの順番で配置することができる。このような配置をフレキシブルボックスレイアウトという。

順番の指定は、**flex-direction**プロパティで指定できる。指定する値と意味は以下の通り。デフォルトでは row である。

| プロパティ名   | 意味           |
| :------------- | :------------- |
| row            | 横（左から右） |
| row-reverse    | 横（右から左） |
| column         | 縦（上から下） |
| column-reverse | 縦（下から上） |

使用例

```
<div style="display:flex; flex-direction:row">
<p style="background-color:red">p 1個目</p>
<p style="background-color:yellow">p 2個目</p>
<p style="background-color:green">p 3個目</p>
</div>
```

表示例

<div style="display:flex; flex-direction:row">
<p style="background-color:red">p 1個目</p>
<p style="background-color:yellow">p 2個目</p>
<p style="background-color:green">p 3個目</p>
</div>
<hr>
