---
title: "アニメーション"
date: "2019-11-05T23:41:30.000Z"
excerpt: 'CSSでのアニメーションの設定について'
tag: ["CSS"]
updatedAt: '2023-03-09T22:56:41.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: '/assets/blog/authors/WAT.jpg'
---


CSSで行えるアニメーションについてを述べる。

# 回転・拡大縮小・移動

ボックスを回転・拡大縮小・移動などさせるプロパティについてを述べる。


## transformプロパティ

transformプロパティは、ボックスを回転・拡大縮小・移動・変形を行うプロパティである。

|値|意味|
|:---|:---|
|none|変形しない|
|rotate(角度)|指定した数値分、時計回りに回転させる|
|scale(数値,数値)|指定した数値分、横方向、縦方向の順に拡大縮小する|
|scaleX(数値)|指定した数値分、横方向に拡大縮小する|
|scaleY(数値)|指定した数値分、縱方向に拡大縮小する|
|translate(単位付きの数値,単位付きの数値)|指定した数値分、右方向、下方向の順に移動する|
|translateX(単位付きの数値)|指定した数値分、右方向の順に移動する|
|translateY(単位付きの数値)|指定した数値分、下方向の順に移動する|
|skew(角度)|指定した数値分、x軸に沿った角度、y軸に沿った角度分、傾斜させる|
|skewX(角度)|指定した数値分、x軸に沿った分傾斜させる|
|skewY(角度)|指定した数値分、y軸に沿った分傾斜させる|

ここで、角度とは数値に以下の単位をつけたものである。

|値|意味|
|:---|:---|
|deg|度|
|grad|グラード(円周の1/400を1とする単位)|
|rad|ラジアン|
|turn|ターン(円周を1とする単位)|

使用例

```
<p style="background-color:red; width:200px; height:200px;">０度</p>
<p style="background-color:red; width:200px; height:200px; transform:rotate(30deg)">３０度</p>
<p style="background-color:red; width:200px; height:200px; transform:rotate(45deg)">４５度</p>
<p style="background-color:red; width:200px; height:200px; transform:rotate(90deg)">９０度</p>

<p style="background-color:green; width:200px; height:200px;">０度</p>
<p style="background-color:green; width:200px; height:200px; transform:skewX(30deg);">３０度</p>
<p style="background-color:green; width:200px; height:200px; transform:skewX(45deg);">４５度</p>
<p style="background-color:green; width:200px; height:200px; transform:skewX(60deg);">６０度</p>
```


表示例

<p style="background-color:red; width:200px; height:200px;">０度</p>
<p style="background-color:red; width:200px; height:200px; transform:rotate(30deg)">３０度</p>
<p style="background-color:red; width:200px; height:200px; transform:rotate(45deg)">４５度</p>
<p style="background-color:red; width:200px; height:200px; transform:rotate(90deg)">９０度</p>

<p style="background-color:green; width:200px; height:200px;">０度</p>
<p style="background-color:green; width:200px; height:200px; transform:skewX(30deg);">３０度</p>
<p style="background-color:green; width:200px; height:200px; transform:skewX(45deg);">４５度</p>
<p style="background-color:green; width:200px; height:200px; transform:skewX(60deg);">６０度</p>
<hr>


## transform-originプロパティ

transform-originプロパティは、transformプロパティでボックスを回転・移動・変形させる時に、原点とする位置を設定するプロパティである。

指定する値と意味は以下の通り。なお、値は1~3つまで指定出来る。1つ目は横方向の左からの位置、2つ目は縦方向の上からの位置、3つ目は3D用のz方向の位置を示す。

|値|意味|
|:---|:---|
|単位付きの数値|ボックスの左上からの距離|
|パーセンテージ|ボックスの大きさに対するパーセンテージ|
|top|縦方向の0%|
|bottom|縦方向の100%|
|center|縦方向の50%/横方向の50%|
|left|横方向の0%|
|right|横方向の100%|

使用例

```
<div style="border-style: double; height: 100px; width: 100px; padding: 0px; margin:0px">
<p style="background-color:red; width:95px; height:95px; padding:0px; margin:0px; transform:rotate(45deg);">center center(デフォルト)を中心に45度回転</p>
</div>
<br>
<br>
<div style="border-style: double; height: 100px; width: 100px; padding: 0px; margin:0px">
<p style="background-color:red; width:95px; height:95px; padding:0px; margin:0px; transform:rotate(45deg); transform-origin:right bottom;">right bottom(右下)を中心に45度回転</p>
</div>
```

表示例

<div style="border-style: double; height: 100px; width: 100px; padding: 0px; margin:0px">
<p style="background-color:red; width:95px; height:95px; padding:0px; margin:0px; transform:rotate(45deg);">center center(デフォルト)を中心に45度回転</p>
</div>
<br>
<br>
<div style="border-style: double; height: 100px; width: 100px; padding: 0px; margin:0px">
<p style="background-color:red; width:95px; height:95px; padding:0px; margin:0px; transform:rotate(45deg); transform-origin:right bottom;">right bottom(右下)を中心に45度回転</p>
</div>
<hr>


# トランジション

例えばセレクタの:hoverを使うとカーソルが上に来た時に、:activeを使うとクリックした時に、そこの表示が別の状態に切り替わる。その切り替わりを滑らかに変化させるのがCSSで言う**トランジション**である。

トランジションは、ある状態から別のある状態へと移る二状態の変化を表現できる。このセクションでは、トランジションに関するプロパティについてを述べる。


## transition-property プロパティ

transition-propertyは、トランジションを適用するプロパティ名を指定するプロパティである<sub style="color:gray">(ややこしい・・)</sub>

|値|意味|
|:---|:---|
|プロパティ名|アクション時にトランジションを適用したいプロパティ名。空白区切りで複数入力可|
|all|トランジション適用可能な全てのプロパティに適用する|
|none|適用しない|

(使用例は次にまとめる)

## transition-duration プロパティ

transition-durationプロパティは、トランジションをどれほどの時間をかけて実行するかを設定するプロパティである。

値は単位付きの数値で、単位はs（秒）,ms（ミリ秒）のいずれかで指定する。


使用例(css)


```html
<style type="text/css">
div.duration {
    border-style: double; height: 100px; width: 100px; 
    padding: 0px; margin:0px
}

p.duration-sample1 {
    background-color:red; width:100px; height:100px; 
    padding:0px; margin:0px; 
    transition-property: transform;
    transition-duration: 5s;
}

p.duration-sample1:hover{
    transform:rotate(360deg);
}

p.duration-sample2 {
    background-color:red; width:100px; height:100px; 
    padding:0px; margin:0px; 
    transition-property: background-color;
    transition-duration: 5s;
}

p.duration-sample2:active{
    background-color:yellow;
}
</style>
<div class="duration">
<p class="duration-sample1">カーソル乗せると一回転！</p>
</div>
<br>
<div class="duration">
    <p class="duration-sample2">クリックしたままで色変化！</p>
</div>
```

表示例

<style type="text/css">
div.duration {
    border-style: double; height: 100px; width: 100px; 
    padding: 0px; margin:0px
}

p.duration-sample1 {
    background-color:red; width:100px; height:100px; 
    padding:0px; margin:0px; 
    transition-property: transform;
    transition-duration: 5s;
}

p.duration-sample1:hover{
    transform:rotate(360deg);
}

p.duration-sample2 {
    background-color:red; width:100px; height:100px; 
    padding:0px; margin:0px; 
    transition-property: background-color;
    transition-duration: 5s;
}

p.duration-sample2:active{
    background-color:yellow;
}
</style>
<div class="duration">
<p class="duration-sample1">カーソル乗せると一回転！</p>
</div>
<br>
<div class="duration">
    <p class="duration-sample2">クリックしたままで色変化！</p>
</div>
<hr>


## transition-timing-function プロパティ

transition-timing-functionプロパティは、トランジションの速度を一定にしたり、変化をつけた速度に設定するプロパティである。

指定する値と意味は以下の通り。

|値|意味|
|:---|:---|
|ease|加速をつけて、ゆっくり始まり、ゆっくり終わる（デフォルト）|
|ease-in|ゆっくり始まり、一定速度で終わる|
|ease-out|一定速度で始まり、ゆっくり終わる|
|ease-in-out|ゆっくり始まり、ゆっくり終わる|
|linear|最初から最後まで一定速度|

使用例

```html
<style type="text/css">
div.timing {
    border-style: double; height: 100px; width: 100px; 
    padding: 0px; margin:0px
}

p.timing1 {
    background-color:red; width:100px; height:100px; 
    padding:0px; margin:0px; 
    transition-property: transform;
    transition-duration: 5s;
    transition-timing-function: ease;
}

p.timing2 {
    background-color:red; width:100px; height:100px; 
    padding:0px; margin:0px; 
    transition-property: transform;
    transition-duration: 5s;
    transition-timing-function: linear;
}

p[class^="timing"]:hover{
    transform:rotate(360deg);
}
</style>
<div class="timing">
<p class="timing1">カーソル乗せると一回転！(ease)</p>
</div>
<br>
<div class="timing">
<p class="timing2">カーソル乗せると一回転！(linear)</p>
</div>
```

表示例

<style type="text/css">
div.timing {
    border-style: double; height: 100px; width: 100px; 
    padding: 0px; margin:0px
}

p.timing1 {
    background-color:red; width:100px; height:100px; 
    padding:0px; margin:0px; 
    transition-property: transform;
    transition-duration: 5s;
    transition-timing-function: ease;
}

p.timing2 {
    background-color:red; width:100px; height:100px; 
    padding:0px; margin:0px; 
    transition-property: transform;
    transition-duration: 5s;
    transition-timing-function: linear;
}

p[class^="timing"]:hover{
    transform:rotate(360deg);
}
</style>
<div class="timing">
<p class="timing1">カーソル乗せると一回転！(ease)</p>
</div>
<br>
<div class="timing">
<p class="timing2">カーソル乗せると一回転！(linear)</p>
</div>
<hr>


## transition-delay プロパティ

transition-delayプロパティは、トランジションの開始を遅らせるプロパティである。

値には、時間の単位をつけた数値を指定する。


使用例

```html
<style type="text/css">
div.delay {
    border-style: double; height: 100px; width: 100px; 
    padding: 0px; margin:0px
}

p.delay1 {
    background-color:red; width:100px; height:100px; 
    padding:0px; margin:0px; 
    transition-property: transform;
    transition-duration: 5s;
}

p.delay2 {
    background-color:red; width:100px; height:100px; 
    padding:0px; margin:0px; 
    transition-property: transform;
    transition-duration: 5s;
    transition-delay: 3s;
}

p[class^="delay"]:hover{
    transform:rotate(360deg);
}
</style>
<div class="delay">
<p class="delay1">カーソル乗せると一回転！</p>
</div>
<br>
<div class="delay">
    <p class="delay2">カーソル乗せると３秒後に一回転！</p>
</div>
```

表示例

<style type="text/css">
div.delay {
    border-style: double; height: 100px; width: 100px; 
    padding: 0px; margin:0px
}

p.delay1 {
    background-color:red; width:100px; height:100px; 
    padding:0px; margin:0px; 
    transition-property: transform;
    transition-duration: 5s;
}

p.delay2 {
    background-color:red; width:100px; height:100px; 
    padding:0px; margin:0px; 
    transition-property: transform;
    transition-duration: 5s;
    transition-delay: 3s;
}

p[class^="delay"]:hover{
    transform:rotate(360deg);
}
</style>
<div class="delay">
<p class="delay1">カーソル乗せると一回転！</p>
</div>
<br>
<div class="delay">
    <p class="delay2">カーソル乗せると３秒後に一回転！</p>
</div>
<hr>


## transition プロパティ

transitionプロパティは、これまでのtransition関連のプロパティの値をまとめて指定出来るプロパティである。

値は空白で区切って複数指定可能である。


使用例

```html
<style type="text/css">
p.transition {
    background-color:red; width:100px; height:100px; 
    padding:0px; margin:0px; 
    transition: transform 5s linear;
}

p.transition:hover{
    transform:rotate(360deg);
}
</style>
<p class="transition">カーソル乗せると一回転！(linear)</p>
```


表示例

<style type="text/css">
p.transition {
    background-color:red; width:100px; height:100px; 
    padding:0px; margin:0px; 
    transition: transform 5s linear;
}

p.transition:hover{
    transform:rotate(360deg);
}
</style>
<p class="transition">カーソル乗せると一回転！(linear)</p>
<hr>


# アニメーション

CSSで言うアニメーションとは、トランジションを連続して行わせたような動きのことを言う。

それを実現するために、CSSではキーフレームという書式を使って表現する。


## @keyframes (キーフレーム)

CSSのアニメーションでは、いつのタイミングでどのような動作をさせるかの指定を、**キーフレーム**と呼ばれる書式で記述する。

書式としては、まず最初に@keyframesと書き、その後にキーフレームの名前を書く。

その後は中括弧{}で囲み、その中に動作させるタイミングを開始時を0%としたパーセンテージで指定して記載する。

その後にまた中括弧{}を書いて囲み、その中に動作させる内容を記載させる、と言う書式である。

```
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

animation-nameプロパティは、キーフレーム名を指定して実行させるためのプロパティである。

（使用例は次節でまとめて記載）


## animation-duration プロパティ

animation-durationプロパティは、アニメーションの再生時間を設定するプロパティである。

値は単位付きの数値で、単位はs（秒）,ms（ミリ秒）のいずれかで指定する。


使用例

```html

<style type="text/css">
@keyframes key1 {
    0%{
        background-color:red; 
    }

    20%{
        background-color:yellow; 
    }

    40%{
        background-color:green; 
    }

    60%{
        background-color:blue; 
    }

    80%{
        background-color:purple; 
    }

    100%{
        background-color:red; 
    }
}

p.animation-duration {
    width:100px; height:100px; 
    padding:0px; margin:0px; 
    animation-name: key1; 
    animation-duration: 30s; 
}
</style>
<p class="animation-duration">色変化！（一回のみ）</p>

```

表示例

<style type="text/css">
@keyframes key1 {
    0%{
        background-color:red; 
    }

    20%{
        background-color:yellow; 
    }

    40%{
        background-color:green; 
    }

    60%{
        background-color:blue; 
    }

    80%{
        background-color:purple; 
    }

    100%{
        background-color:red; 
    }
}

p.animation-duration {
    width:100px; height:100px; 
    padding:0px; margin:0px; 
    animation-name: key1; 
    animation-duration: 30s; 
}
</style>
<p class="animation-duration">色変化！（一回のみ）</p>
<p class="after-animation-space"></p>
<hr>


## animation-timing-function プロパティ

animation-timing-functionプロパティは、トランジションの時と同様に、アニメーションにおける速度を一定にしたり、変化をつけた速度に設定するプロパティである。

指定する値と意味は以下の通り。

|値|意味|
|:---|:---|
|ease|加速をつけて、ゆっくり始まり、ゆっくり終わる（デフォルト）|
|ease-in|ゆっくり始まり、一定速度で終わる|
|ease-out|一定速度で始まり、ゆっくり終わる|
|ease-in-out|ゆっくり始まり、ゆっくり終わる|
|linear|最初から最後まで一定速度|

使用例

```html
<style type="text/css">
@keyframes key1 {
    0%{
        transform: translate(0px,0px);
    }

    25%{
        transform: translate(200px,0px) rotate(90deg);
    }

    50%{
        transform: translate(200px,200px) rotate(180deg);
    }

    75%{
        transform: translate(0px,200px) rotate(270deg);
    }

    100%{
        transform: translate(0px,0px) rotate(360deg);
    }
}

p.timing-function {
    width:100px; height:100px; 
    padding:0px; margin:0px; 
    background-color:red; 
    animation-name: key1; 
    animation-duration: 30s; 
    animation-timing-function: linear;
}

</style>
<p class="timing-function">一回転！（一回のみ）</p>
```

表示例

<style type="text/css">
@keyframes key1 {
    0%{
        transform: translate(0px,0px);
    }

    25%{
        transform: translate(200px,0px) rotate(90deg);
    }

    50%{
        transform: translate(200px,200px) rotate(180deg);
    }

    75%{
        transform: translate(0px,200px) rotate(270deg);
    }

    100%{
        transform: translate(0px,0px) rotate(360deg);
    }
}

p.timing-function {
    width:100px; height:100px; 
    padding:0px; margin:0px; 
    background-color:red; 
    animation-name: key1; 
    animation-duration: 30s; 
    animation-timing-function: linear;
}

</style>
<p class="timing-function">一回転！（一回のみ）</p>

<style type="text/css">
    p.after-animation-space {
        height:200px;
    }
</style>
<p class="after-animation-space"></p>
<hr>


## animation-delayプロパティ

animation-delayプロパティは、アニメーションの開始を遅らせるプロパティである。

値は単位付きの数値で、単位はs（秒）,ms（ミリ秒）のいずれかで指定する。

使用例

```html
<style type="text/css">

@keyframes key1 {
    0%{
        transform: translate(0px,0px);
    }

    25%{
        transform: translate(200px,0px) rotate(90deg);
    }

    50%{
        transform: translate(200px,200px) rotate(180deg);
    }

    75%{
        transform: translate(0px,200px) rotate(270deg);
    }

    100%{
        transform: translate(0px,0px) rotate(360deg);
    }
}

p.animation-delay {
    width:100px; height:100px; 
    padding:0px; margin:0px; 
    background-color:red; 
    animation-name: key1; 
    animation-duration: 30s; 
    animation-timing-function: linear;
    animation-delay: 5s;
}
</style>
<p class="animation-delay">5秒後に一回転！（一回のみ）</p>

```

表示例

<style type="text/css">

@keyframes key1 {
    0%{
        transform: translate(0px,0px);
    }

    25%{
        transform: translate(200px,0px) rotate(90deg);
    }

    50%{
        transform: translate(200px,200px) rotate(180deg);
    }

    75%{
        transform: translate(0px,200px) rotate(270deg);
    }

    100%{
        transform: translate(0px,0px) rotate(360deg);
    }
}

p.animation-delay {
    width:100px; height:100px; 
    padding:0px; margin:0px; 
    background-color:red; 
    animation-name: key1; 
    animation-duration: 30s; 
    animation-timing-function: linear;
    animation-delay: 5s;
}
</style>
<p class="animation-delay">5秒後に一回転！（一回のみ）</p>
<p class="after-animation-space"></p>
<hr>

## animation-iteration-countプロパティ

animation-iteration-countプロパティは、アニメーションを何回繰り返して再生させるかを設定するプロパティである。

|値|意味|
|:---|:---|
|数値|再生する回数|
|infinite|無限に繰り返す|

使用例

```html
<style type="text/css">

@keyframes key1 {
    0%{
        transform: translate(0px,0px);
    }

    25%{
        transform: translate(200px,0px) rotate(90deg);
    }

    50%{
        transform: translate(200px,200px) rotate(180deg);
    }

    75%{
        transform: translate(0px,200px) rotate(270deg);
    }

    100%{
        transform: translate(0px,0px) rotate(360deg);
    }
}

p.iteration-count {
    width:100px; height:100px; 
    padding:0px; margin:0px; 
    background-color:red; 
    animation-name: key1; 
    animation-duration: 10s; 
    animation-timing-function: linear;
    animation-iteration-count: infinite;
}
</style>
<p class="iteration-count">無限に一回転！</p>
```

表示例

<style type="text/css">

@keyframes key1 {
    0%{
        transform: translate(0px,0px);
    }

    25%{
        transform: translate(200px,0px) rotate(90deg);
    }

    50%{
        transform: translate(200px,200px) rotate(180deg);
    }

    75%{
        transform: translate(0px,200px) rotate(270deg);
    }

    100%{
        transform: translate(0px,0px) rotate(360deg);
    }
}

p.iteration-count {
    width:100px; height:100px; 
    padding:0px; margin:0px; 
    background-color:red; 
    animation-name: key1; 
    animation-duration: 10s; 
    animation-timing-function: linear;
    animation-iteration-count: infinite;
}
</style>
<p class="iteration-count">無限に一回転！</p>
<p class="after-animation-space"></p>
<hr>


## animation-direction プロパティ

animation-directionプロパティは、再生・逆再生の指定を行えるプロパティである。

指定する値と意味は以下の通り。

|値|意味|
|:---|:---|
|normal|キーフレーム通りに再生|
|reverse|キーフレームの逆順に再生する|
|alternate|再生と逆再生を繰り返して行う|
|alternate-reverse|逆再生と再生を繰り返して行う|

使用例

```html
<style type="text/css">

@keyframes key1 {
    0%{
        transform: translate(0px,0px);
    }

    25%{
        transform: translate(200px,0px) rotate(90deg);
    }

    50%{
        transform: translate(200px,200px) rotate(180deg);
    }

    75%{
        transform: translate(0px,200px) rotate(270deg);
    }

    100%{
        transform: translate(0px,0px) rotate(360deg);
    }
}

p.direction {
    width:100px; height:100px; 
    padding:0px; margin:0px; 
    background-color:red; 
    animation-name: key1; 
    animation-duration: 10s; 
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-direction: alternate;
}

</style>
<p class="direction">alternate:右回転と左回転順々</p>
```

表示例

<style type="text/css">

@keyframes key1 {
    0%{
        transform: translate(0px,0px);
    }

    25%{
        transform: translate(200px,0px) rotate(90deg);
    }

    50%{
        transform: translate(200px,200px) rotate(180deg);
    }

    75%{
        transform: translate(0px,200px) rotate(270deg);
    }

    100%{
        transform: translate(0px,0px) rotate(360deg);
    }
}

p.direction {
    width:100px; height:100px; 
    padding:0px; margin:0px; 
    background-color:red; 
    animation-name: key1; 
    animation-duration: 10s; 
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-direction: alternate;
}

</style>
<p class="direction">alternate:右回転と左回転順々</p>
<p class="after-animation-space"></p>
<hr>


## animation-play-state プロパティ

animation-play-stateプロパティは、アニメーションの再生を一時停止させる際に使用するプロパティである。

指定する値と意味は以下の通り。

|値|意味|
|:---|:---|
|running|アニメーションを再生する|
|paused|アニメーションを一時停止させる|

使用例

```html
<style type="text/css">

@keyframes key1 {
    0%{
        transform: translate(0px,0px);
    }

    25%{
        transform: translate(200px,0px) rotate(90deg);
    }

    50%{
        transform: translate(200px,200px) rotate(180deg);
    }

    75%{
        transform: translate(0px,200px) rotate(270deg);
    }

    100%{
        transform: translate(0px,0px) rotate(360deg);
    }
}

p.play-state {
    width:100px; height:100px; 
    padding:0px; margin:0px; 
    background-color:red; 
    animation-name: key1; 
    animation-duration: 10s; 
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-play-state: paused;
}

</style>
<p class="play-state">alternate:右回転と左回転順々せずにポーズ状態</p>
```

表示例

<style type="text/css">

@keyframes key1 {
    0%{
        transform: translate(0px,0px);
    }

    25%{
        transform: translate(200px,0px) rotate(90deg);
    }

    50%{
        transform: translate(200px,200px) rotate(180deg);
    }

    75%{
        transform: translate(0px,200px) rotate(270deg);
    }

    100%{
        transform: translate(0px,0px) rotate(360deg);
    }
}

p.play-state {
    width:100px; height:100px; 
    padding:0px; margin:0px; 
    background-color:red; 
    animation-name: key1; 
    animation-duration: 10s; 
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-play-state: paused;
}

</style>
<p class="play-state">alternate:右回転と左回転順々せずにポーズ状態</p>
<p class="after-animation-space"></p>
<hr>


## animation-fill-modeプロパティ

animation-fill-modeプロパティは、animation-delayプロパティによって再生が遅延されている間の表示、及び再生終了時の表示を設定するプロパティである。

|値|意味|
|:---|:---|
|forwards|再生終了後はキーフレームの100%の表示のままにする|
|backwards|遅延して再生されてない間はキーフレームの0%の表示にする|
|both|再生終了後はキーフレームの100%、遅延して再生されてない間はキーフレームの0%の表示にする|
|none|キーフレームとは無関係に表示する|

使用例

```html
<style type="text/css">

@keyframes key1 {
    0%{
        background-color: black;
        color: white;
        transform: translate(0px,0px);
    }

    25%{
        background-color: red;
        color: white;
        transform: translate(200px,0px) rotate(90deg);
    }

    50%{
        background-color: yellow;
        color: white;
        transform: translate(200px,200px) rotate(180deg);
    }

    75%{
        background-color: green;
        color: white;
        transform: translate(0px,200px) rotate(270deg);
    }

    100%{
        background-color: white;
        color: black;
        transform: translate(0px,0px) rotate(360deg);
    }
}

p.fill-mode {
    width:100px; height:100px; 
    padding:0px; margin:0px; 
    animation-name: key1; 
    animation-duration: 10s; 
    animation-timing-function: linear;
    animation-delay: 10s;
    animation-fill-mode: both;
}

</style>
<p class="fill-mode">10秒後に開始・最後は白ボックスのまま</p>
```

表示例


<style type="text/css">

@keyframes key1 {
    0%{
        background-color: black;
        color: white;
        transform: translate(0px,0px);
    }

    25%{
        background-color: red;
        color: white;
        transform: translate(200px,0px) rotate(90deg);
    }

    50%{
        background-color: yellow;
        color: white;
        transform: translate(200px,200px) rotate(180deg);
    }

    75%{
        background-color: green;
        color: white;
        transform: translate(0px,200px) rotate(270deg);
    }

    100%{
        background-color: white;
        color: black;
        transform: translate(0px,0px) rotate(360deg);
    }
}

p.fill-mode {
    width:100px; height:100px; 
    padding:0px; margin:0px; 
    animation-name: key1; 
    animation-duration: 10s; 
    animation-timing-function: linear;
    animation-delay: 10s;
    animation-fill-mode: both;
}

</style>
<p class="fill-mode">10秒後に開始・最後は白ボックスのまま</p>
<p class="after-animation-space"></p>
<hr>


## animationプロパティ

animationプロパティは、これまでのアニメーション関連のプロパティの値をまとめて指定出来るプロパティである。

時間を表す値については、1つ目がanimation-durationプロパティ、2つ目がanimation-delayプロパティの値を示す。

使用例

```html
<style type="text/css">

@keyframes key1 {
    0%{
        background-color: white;
        transform: translate(0px,0px);
    }

    25%{
        background-color: red;
        transform: translate(200px,0px) rotate(90deg);
    }

    50%{
        background-color: yellow;
        transform: translate(200px,200px) rotate(180deg);
    }

    75%{
        background-color: green;
        transform: translate(0px,200px) rotate(270deg);
    }

    100%{
        background-color: white;
        transform: translate(0px,0px) rotate(360deg);
    }
}

p.animation {
    width:100px; height:100px; 
    padding:0px; margin:0px; 
    animation: key1 10s linear 10s infinite;
}
</style>
<p class="animation">10秒後に開始して無限に一回転</p>
```


表示例

<style type="text/css">

@keyframes key1 {
    0%{
        background-color: white;
        transform: translate(0px,0px);
    }

    25%{
        background-color: red;
        transform: translate(200px,0px) rotate(90deg);
    }

    50%{
        background-color: yellow;
        transform: translate(200px,200px) rotate(180deg);
    }

    75%{
        background-color: green;
        transform: translate(0px,200px) rotate(270deg);
    }

    100%{
        background-color: white;
        transform: translate(0px,0px) rotate(360deg);
    }
}

p.animation {
    width:100px; height:100px; 
    padding:0px; margin:0px; 
    animation: key1 10s linear 10s infinite;
}
</style>
<p class="animation">10秒後に開始して無限に一回転</p>
<p class="after-animation-space"></p>
<hr>
