---
title: "プログラミングのネーミングのコツについてまとめる"
excerpt: ""
coverImage: "/assets/posts/programmingNaming/name.png"
date: "2024-12-26T21:36:41.000Z"
updatedAt: "2024-12-26T21:36:41.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

プログラミングにおいて、変数や関数の命名は非常に重要です。適切な名前付けは、コードの可読性を高め、保守性を向上させる一方で、不適切な名前付けは他の開発者（そして数ヶ月後の自分自身）にとって大きな混乱を招く原因となります。

プログラミングを長くやってはいるが、未だに変数名の命名に関しては得意とは思えないため、本記事で今一度、実践的なネーミングのテクニックをまとめてみる。

# 1. 明確な意図を示し、何が入っているかを表す名前にする

良い例と悪い例を比較してみましょう。

```javascript
// 悪い例
const d = new Date();
const n = ["Tokyo", "Osaka", "Fukuoka"];
const x = user.points * 1.1;

// 良い例
const currentDate = new Date();
const cityNames = ["Tokyo", "Osaka", "Fukuoka"];
const calculatedPoints = user.points * 1.1;
```

データの中身が一目で分かる名前を付けることで、後から見返したときに「これは何のデータだっけ？」と悩まなくて済みます。

抽象的すぎる名前は逆に分かりにくくなるため、避けた方が無難です。

# 2. 一貫性のある命名規則

各言語のコミュニティで一般的に使用される規則に従いましょう。以下に一例を記載します。

```javascript
// JavaScript/TypeScript
const userName = "John"; // キャメルケース（変数）
function calculateTotal() {} // キャメルケース（関数）
class UserProfile {} // パスカルケース（クラス）
```

```python
# Python
user_name = "John"     # スネークケース（変数）
def calculate_total(): # スネークケース（関数）
class UserProfile:     # パスカルケース（クラス）
```

# 3. 省略は慎重に

少し長くなっても、分かりやすい名前を付けることをおすすめします。

```javascript
// 良くない例（意味が分かりにくい）
let num = 42;
let str = "こんにちは";
let btn = document.getElementById("button");
const usrPrf = {};
const calcTtl = () => {};
const frmtStr = "";

// 良い例
let count = 42;
let message = "こんにちは";
let submitButton = document.getElementById("button");
const userProfile = {};
const calculateTotal = () => {};
const formattedString = "";
```

# 4. 関数名は「動詞 + 名詞」で付ける

関数は何らかの処理を行うので、「動詞 + 名詞」の形で名前を付けると分かりやすくなります。

```javascript
// 良くない例
function user() {}
function data() {}

// 良い例
function getUserData() {} // ユーザーデータを取得する
function calculateTotal() {} // 合計を計算する
function sendEmail() {} // メールを送信する
```

結果が true/false を返す関数は、is、has、can などで始めると分かりやすくなります。

```javascript
// 年齢が20歳以上かチェックする
function isAdult(age) {
  return age >= 20;
}

// メールアドレスを持っているかチェックする
function hasEmail(user) {
  return user.email !== undefined;
}

// 編集できる権限があるかチェックする
function canEdit(user) {
  return user.role === "editor";
}
```

# 実践のためのチェックリスト

命名時に以下の質問に「はい」と答えられるか確認しましょう：

- この名前は他の開発者が見ても理解できるか？
- 6 ヶ月後の自分が見ても理解できるか？
- チーム内の命名規則に従っているか？
- 略語を使用する場合、一般的に理解できるものか？
- その名前は正確に役割や目的を表しているか？

良いネーミングは、一朝一夕には身につきません。しかし、これらの原則を意識しながら継続的に実践することで、徐々に改善していくことができます。コードレビューでフィードバックをもらうことも、ネーミングスキル向上の良い機会となります。
