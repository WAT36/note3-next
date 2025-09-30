---
title: "(小ネタ)SRフリップフロップ回路をWebで図示してみた"
excerpt: ""
coverImage: "/assets/posts/srFlipFlop/srFlipFlop.png"
date: "2025-05-17T00:08:06.000Z"
updatedAt: "2025-05-17T00:08:06.000Z"
tag: ["その他"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

情報系学生であった時に講義で出たがイメージがイマイチよくつかなかった「フリップフロップ回路」。

今は Web の知識があり回路図を再現できたので、ここに載せてみた。

（下図の"S:"、"R:"をクリックすると切り替えられます）

<p class="codepen" data-height="550" data-default-tab="result" data-slug-hash="myywpEZ" data-pen-title="Flip-Flop" data-user="wat36" style="height: 550px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/myywpEZ">
  Flip-Flop</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

ちなみに真理値表は以下の通り。

| S   | R   | Q⁽ⁿ⁾ | Q⁽ⁿ⁺¹⁾ | 説明              |
| --- | --- | ---- | ------ | ----------------- |
| 0   | 0   | \*   | 保持   | Q⁽ⁿ⁾ の値を保持   |
| 0   | 1   | \*   | 0      | Reset 動作（Q=0） |
| 1   | 0   | \*   | 1      | Set 動作（Q=1）   |
| 1   | 1   | \*   | 不定   | 禁止状態（不定）  |

上表での記号は以下の通り。

- S: Set 入力
- R: Reset 入力
- Q: 出力
- Q⁽ⁿ⁺¹⁾: 次の状態（今回の出力）
- Q⁽ⁿ⁾: 現在の状態（前の出力）
- \*: ドントケア（0 と 1 どちらでも同じ）
- 不定: 両方 0 や 1 などで定義できない矛盾状態（ゲート種類により異なる）

当時こんなのあれば良かったなあと、作った後で思った
