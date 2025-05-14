---
title: "(小ネタ)SRフリップフロップ回路をWebで図示してみた"
excerpt: ""
coverImage: "/assets/posts/srFlipFlop/srFlipFlop.png"
date: "2025-05-11T18:58:49.000Z"
updatedAt: "2025-05-11T18:58:49.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

情報系学生であった時に講義で出たがイメージがイマイチよくつかなかった「フリップフロップ回路」。

HTML,CSS,Javascript 等を駆使し Web 上で図を作れたので、ここに載せてみた。

<p class="codepen" data-height="550" data-default-tab="result" data-slug-hash="myywpEZ" data-pen-title="Flip-Flop" data-user="wat36" style="height: 550px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/wat36/pen/myywpEZ">
  Flip-Flop</a> by WAT (<a href="https://codepen.io/wat36">@wat36</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

ちなみに真理値表は以下の通り。

| S   | R   | Q⁽ⁿ⁾ | Q⁽ⁿ⁺¹⁾ | 説明              |
| --- | --- | ---- | ------ | ----------------- |
| 0   | 0   | 0    | 保持   | Q の値を保持      |
| 0   | 0   | 1    | 保持   | Q の値を保持      |
| 0   | 1   | ×    | 0      | Reset 動作（Q=0） |
| 1   | 0   | ×    | 1      | Set 動作（Q=1）   |
| 1   | 1   | ×    | 不定   | 禁止状態（不定）  |

上表での記号は以下の通り。

- S: Set 入力
- R: Reset 入力
- Q: 出力
- Q⁽ⁿ⁺¹⁾: 次の状態（今回の出力）
- Q⁽ⁿ⁾: 現在の状態（前の出力）
- ×: 変化なし（保持）
- 不定: 両方 1 や 0 などで定義できない矛盾状態（ゲート種類により異なる）
