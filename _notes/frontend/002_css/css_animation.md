---
title: "アニメーション"
date: "2019-11-05T23:41:30.000Z"
excerpt: "CSSでのアニメーションの設定について"
tag: ["CSS"]
updatedAt: '2025-03-25T23:16:20.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
---

CSS で行えるアニメーションについてを述べる。

# 回転・拡大縮小・移動

ボックスを回転・拡大縮小・移動などさせるプロパティについてを述べる。

## transform プロパティ

transform プロパティは、ボックスを回転・拡大縮小・移動・変形を行うプロパティである。

| 値                                       | 意味                                                             |
| :--------------------------------------- | :--------------------------------------------------------------- |
| none                                     | 変形しない                                                       |
| rotate(角度)                             | 指定した数値分、時計回りに回転させる                             |
| scale(数値,数値)                         | 指定した数値分、横方向、縦方向の順に拡大縮小する                 |
| scaleX(数値)                             | 指定した数値分、横方向に拡大縮小する                             |
| scaleY(数値)                             | 指定した数値分、縱方向に拡大縮小する                             |
| translate(単位付きの数値,単位付きの数値) | 指定した数値分、右方向、下方向の順に移動する                     |
| translateX(単位付きの数値)               | 指定した数値分、右方向の順に移動する                             |
| translateY(単位付きの数値)               | 指定した数値分、下方向の順に移動する                             |
| skew(角度)                               | 指定した数値分、x 軸に沿った角度、y 軸に沿った角度分、傾斜させる |
| skewX(角度)                              | 指定した数値分、x 軸に沿った分傾斜させる                         |
| skewY(角度)                              | 指定した数値分、y 軸に沿った分傾斜させる                         |

ここで、角度とは数値に以下の単位をつけたものである。

| 値   | 意味                                   |
| :--- | :------------------------------------- |
| deg  | 度                                     |
| grad | グラード(円周の 1/400 を 1 とする単位) |
| rad  | ラジアン                               |
| turn | ターン(円周を 1 とする単位)            |

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="vEYyNNr" data-pen-title="css-transform" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/vEYyNNr">
  css-transform</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

## transform-origin プロパティ

transform-origin プロパティは、transform プロパティでボックスを回転・移動・変形させる時に、原点とする位置を設定するプロパティである。

指定する値と意味は以下の通り。なお、値は 1~3 つまで指定出来る。1 つ目は横方向の左からの位置、2 つ目は縦方向の上からの位置、3 つ目は 3D 用の z 方向の位置を示す。

| 値             | 意味                                   |
| :------------- | :------------------------------------- |
| 単位付きの数値 | ボックスの左上からの距離               |
| パーセンテージ | ボックスの大きさに対するパーセンテージ |
| top            | 縦方向の 0%                            |
| bottom         | 縦方向の 100%                          |
| center         | 縦方向の 50%/横方向の 50%              |
| left           | 横方向の 0%                            |
| right          | 横方向の 100%                          |

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="MYWbayy" data-pen-title="css-transform-origin" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/MYWbayy">
  css-transform-origin</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# トランジション

例えばセレクタの:hover を使うとカーソルが上に来た時に、:active を使うとクリックした時に、そこの表示が別の状態に切り替わる。その切り替わりを滑らかに変化させるのが CSS で言う**トランジション**である。

トランジションは、ある状態から別のある状態へと移る二状態の変化を表現できる。このセクションでは、トランジションに関するプロパティについてを述べる。

## transition-property プロパティ

transition-property は、トランジションを適用するプロパティ名を指定するプロパティである<sub style="color:gray">(ややこしい・・)</sub>

| 値           | 意味                                                                         |
| :----------- | :--------------------------------------------------------------------------- |
| プロパティ名 | アクション時にトランジションを適用したいプロパティ名。空白区切りで複数入力可 |
| all          | トランジション適用可能な全てのプロパティに適用する                           |
| none         | 適用しない                                                                   |

(使用例は次にまとめる)

## transition-duration プロパティ

transition-duration プロパティは、トランジションをどれほどの時間をかけて実行するかを設定するプロパティである。

値は単位付きの数値で、単位は s（秒）,ms（ミリ秒）のいずれかで指定する。

使用例(css)

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="PwobPbL" data-pen-title="css-transition-property-duration" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/PwobPbL">
  css-transition-property-duration</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

## transition-timing-function プロパティ

transition-timing-function プロパティは、トランジションの速度を一定にしたり、変化をつけた速度に設定するプロパティである。

指定する値と意味は以下の通り。

| 値          | 意味                                                       |
| :---------- | :--------------------------------------------------------- |
| ease        | 加速をつけて、ゆっくり始まり、ゆっくり終わる（デフォルト） |
| ease-in     | ゆっくり始まり、一定速度で終わる                           |
| ease-out    | 一定速度で始まり、ゆっくり終わる                           |
| ease-in-out | ゆっくり始まり、ゆっくり終わる                             |
| linear      | 最初から最後まで一定速度                                   |

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="YPzpyZj" data-pen-title="css-transition-timing-function" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/YPzpyZj">
  css-transition-timing-function</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

## transition-delay プロパティ

transition-delay プロパティは、トランジションの開始を遅らせるプロパティである。

値には、時間の単位をつけた数値を指定する。

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="PwobByr" data-pen-title="css-transition-delay" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/PwobByr">
  css-transition-delay</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

## transition プロパティ

transition プロパティは、これまでの transition 関連のプロパティの値をまとめて指定出来るプロパティである。

値は空白で区切って複数指定可能である。

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="dPyOjQq" data-pen-title="css-transition" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/dPyOjQq">
  css-transition</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

# アニメーション

CSS で言うアニメーションとは、トランジションを連続して行わせたような動きのことを言う。

それを実現するために、CSS ではキーフレームという書式を使って表現する。

## @keyframes (キーフレーム)

CSS のアニメーションでは、いつのタイミングでどのような動作をさせるかの指定を、**キーフレーム**と呼ばれる書式で記述する。

書式としては、まず最初に@keyframes と書き、その後にキーフレームの名前を書く。

その後は中括弧{}で囲み、その中に動作させるタイミングを開始時を 0%としたパーセンテージで指定して記載する。

その後にまた中括弧{}を書いて囲み、その中に動作させる内容を記載させる、と言う書式である。

```css
@keyframe (キーフレームの名前) {

    0% {
        プロパティ名: 値
        ・・・
    }

    30% {
        プロパティ名: 値
        ・・・
    }

    ・・・
}
```

## animation-name プロパティ

animation-name プロパティは、キーフレーム名を指定して実行させるためのプロパティである。

（使用例は次節でまとめて記載）

## animation-duration プロパティ

animation-duration プロパティは、アニメーションの再生時間を設定するプロパティである。

値は単位付きの数値で、単位は s（秒）,ms（ミリ秒）のいずれかで指定する。

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="WbNoKPQ" data-pen-title="css-animation-duration" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/WbNoKPQ">
  css-animation-duration</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

## animation-timing-function プロパティ

animation-timing-function プロパティは、トランジションの時と同様に、アニメーションにおける速度を一定にしたり、変化をつけた速度に設定するプロパティである。

指定する値と意味は以下の通り。

| 値          | 意味                                                       |
| :---------- | :--------------------------------------------------------- |
| ease        | 加速をつけて、ゆっくり始まり、ゆっくり終わる（デフォルト） |
| ease-in     | ゆっくり始まり、一定速度で終わる                           |
| ease-out    | 一定速度で始まり、ゆっくり終わる                           |
| ease-in-out | ゆっくり始まり、ゆっくり終わる                             |
| linear      | 最初から最後まで一定速度                                   |

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="xbxRJBW" data-pen-title="css-animation-timing-function" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/xbxRJBW">
  css-animation-timing-function</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

## animation-delay プロパティ

animation-delay プロパティは、アニメーションの開始を遅らせるプロパティである。

値は単位付きの数値で、単位は s（秒）,ms（ミリ秒）のいずれかで指定する。

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="LEYbBvB" data-pen-title="css-animation-delay" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/LEYbBvB">
  css-animation-delay</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

## animation-iteration-count プロパティ

animation-iteration-count プロパティは、アニメーションを何回繰り返して再生させるかを設定するプロパティである。

| 値       | 意味           |
| :------- | :------------- |
| 数値     | 再生する回数   |
| infinite | 無限に繰り返す |

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="pvoRXzY" data-pen-title="css-animation-iteration-count" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/pvoRXzY">
  css-animation-iteration-count</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

## animation-direction プロパティ

animation-direction プロパティは、再生・逆再生の指定を行えるプロパティである。

指定する値と意味は以下の通り。

| 値                | 意味                         |
| :---------------- | :--------------------------- |
| normal            | キーフレーム通りに再生       |
| reverse           | キーフレームの逆順に再生する |
| alternate         | 再生と逆再生を繰り返して行う |
| alternate-reverse | 逆再生と再生を繰り返して行う |

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="vEYgqEJ" data-pen-title="css-animation-direction" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/vEYgqEJ">
  css-animation-direction</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

## animation-play-state プロパティ

animation-play-state プロパティは、アニメーションの再生を一時停止させる際に使用するプロパティである。

指定する値と意味は以下の通り。

| 値      | 意味                           |
| :------ | :----------------------------- |
| running | アニメーションを再生する       |
| paused  | アニメーションを一時停止させる |

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="VYwPJeW" data-pen-title="animation-play-state" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/VYwPJeW">
  animation-play-state</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

## animation-fill-mode プロパティ

animation-fill-mode プロパティは、animation-delay プロパティによって再生が遅延されている間の表示、及び再生終了時の表示を設定するプロパティである。

| 値        | 意味                                                                                     |
| :-------- | :--------------------------------------------------------------------------------------- |
| forwards  | 再生終了後はキーフレームの 100%の表示のままにする                                        |
| backwards | 遅延して再生されてない間はキーフレームの 0%の表示にする                                  |
| both      | 再生終了後はキーフレームの 100%、遅延して再生されてない間はキーフレームの 0%の表示にする |
| none      | キーフレームとは無関係に表示する                                                         |

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="PwoWrWa" data-pen-title="animation-fill-mode" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/PwoWrWa">
  animation-fill-mode</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

## animation プロパティ

animation プロパティは、これまでのアニメーション関連のプロパティの値をまとめて指定出来るプロパティである。

時間を表す値については、1 つ目が animation-duration プロパティ、2 つ目が animation-delay プロパティの値を示す。

使用例

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="LEYxKWy" data-pen-title="css-animation" data-user="wat36" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/LEYxKWy">
  css-animation</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>
