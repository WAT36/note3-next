---
title: "フォーム"
date: "2019-11-04T23:36:30.000Z"
excerpt: 'HTMLでのフォームについて'
tag: ["HTML"]
updatedAt: '2023-02-20T23:08:21.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: '/assets/blog/authors/WAT.jpg'
---

HTMLにおける**フォーム**とは、Webサーバーに情報を送信するための文書の区間のことで、
```<form>```タグを用いて表す。

フォームを作成するための要素についてをここで述べる。

# form要素

form要素はフォームを構成する要素である。

使用する主な属性は以下の通り。

|属性|意味|
|:---|:---|
|action|フォームの送信先のURL。＜button＞、＜input type="submit"＞、＜input type="image"＞、formaction属性を指定した場合、上書きされる。|
|autocomplete|フォーム内のオートコンプリート機能の指定。<br>off・・・オートコンプリートなし<br>on・・・オートコンプリートあり|
|method|フォームのデータを送信する際のHTTPメソッドを指定。get,postが指定可能|
|name|フォームの名前|
|novalidate|入力(選択)内容のチェックを問わない|
|target|フォームの送信結果を表示させるウィンドウやタブなどの名前|

実際の使用例は以下の要素のところで述べる。

# input要素

input要素はform要素内で使われる要素で、フォームの入力を示すための要素である。

フォームの入力にはいくつか種類があり、input要素で**type**属性の値を利用することで使い分ける。

type属性に指定できる値と意味は以下の通り。

|値|意味|
|:---|:---|
|text|テキスト入力フィールド(デフォルト)|
|password|パスワード入力用のテキスト入力フィールド|
|search|検索用入力フィールド|
|email|メールアドレス用入力フィールド|
|url|URL入力フィールド|
|tel|電話番号入力フィールド|
|number|数値入力フィールド|
|range|スライダー|
|checkbox|チェックボックス|
|radio|ラジオボタン|
|submit|送信ボタン|
|reset|リセットボタン|
|button|汎用ボタン|
|image|画像の送信ボタン|
|file|送信するファイルを選択する|
|color|色の入力|
|date|日付の入力|
|month|年と月の入力|
|week|年と週の入力|
|time|時刻の入力|
|datetime-local|日付と時刻の入力|
|hidden|表示させずに送信するテキスト|

また、type属性の他に指定できる属性と意味は以下の通り。

|属性|意味|
|:---|:---|
|accept|type="file"の時に入力できるファイルの種類|
|autocomplete|オートコンプリート機能のオンオフ|
|autofocus|ページを読み込んだらこの要素にフォーカスする|
|checked|チェックボックス・ラジオボタンが選択済みになっていることを示す|
|formaction|フォームの送信先のURL|
|formmethod|フォームを送信する際に使うHTTPメソッド|
|formvalidate|入力内容のチェックを行わない|
|width|幅|
|height|高さ|
|max|最大値(type属性により異なる)|
|maxlength|最大文字数|
|min|最小値(type属性により異なる)|
|minlength|最小文字数|
|mutiple|複数の入力を許可する|
|placeholder|プレースホルダー|
|required|入力を必須にする|

使用例

```
<form>
    <table style="border:none;">
    <tr>
        <td style="border:none;">text:</td>
        <td style="border:none;"><input type="text"></td>
    </tr>
    <tr>
        <td style="border:none;">password</td>
        <td style="border:none;"><input type="password"></td>
    </tr>
    <tr>
        <td style="border:none;">search</td>
        <td style="border:none;"><input type="search"></td>
    </tr>
        <tr>
        <td style="border:none;">email</td>
        <td style="border:none;"><input type="email"></td>
    </tr>
    <tr>
        <td style="border:none;">url</td>
        <td style="border:none;"><input type="url"></td>
    </tr>
    <tr>
        <td style="border:none;">tel</td>
        <td style="border:none;"><input type="tel"></td>
    </tr>
    <tr>
        <td style="border:none;">number</td>
        <td style="border:none;"><input type="number"></td>
    </tr>
    <tr>
        <td style="border:none;">range</td>
        <td style="border:none;"><input type="range"></td>
    </tr>
    <tr>
        <td style="border:none;">checkbox</td>
        <td style="border:none;"><input type="checkbox"></td>
    </tr>
    <tr>
        <td style="border:none;">radio</td>
        <td style="border:none;"><input type="radio"></td>
    </tr>
    <tr>
        <td style="border:none;">reset</td>
        <td style="border:none;"><input type="reset"></td>
    </tr>
    <tr>
        <td style="border:none;">button</td>
        <td style="border:none;"><input type="button"></td>
    </tr>
    <tr>
        <td style="border:none;">image</td>
        <td style="border:none;"><input type="image" src="/front-end/img.jpg" width=25% height=25%></td>
    </tr>
    <tr>
        <td style="border:none;">color</td>
        <td style="border:none;"><input type="color"></td>
    </tr>
    <tr>
        <td style="border:none;">date</td>
        <td style="border:none;"><input type="date"></td>
    </tr>
    <tr>
        <td style="border:none;">month</td>
        <td style="border:none;"><input type="month"></td>
    </tr>
    <tr>
        <td style="border:none;">week</td>
        <td style="border:none;"><input type="week"></td>
    </tr>
    <tr>
        <td style="border:none;">time</td>
        <td style="border:none;"><input type="time"></td>
    </tr>
    <tr>
        <td style="border:none;">datetime-local</td>
        <td style="border:none;"><input type="datetime-local"></td>
    </tr>
    <tr>
        <td style="border:none;">hidden</td>
        <td style="border:none;"><input type="hidden"></td>
    </tr>
</table>
</form>
```

表示例（ブラウザによっては正しく表示されない場合もあります）

<form>
    <table style="border:none;">
    <tr>
        <td style="border:none;">text:</td>
        <td style="border:none;"><input type="text"></td>
    </tr>
    <tr>
        <td style="border:none;">password</td>
        <td style="border:none;"><input type="password"></td>
    </tr>
    <tr>
        <td style="border:none;">search</td>
        <td style="border:none;"><input type="search"></td>
    </tr>
        <tr>
        <td style="border:none;">email</td>
        <td style="border:none;"><input type="email"></td>
    </tr>
    <tr>
        <td style="border:none;">url</td>
        <td style="border:none;"><input type="url"></td>
    </tr>
    <tr>
        <td style="border:none;">tel</td>
        <td style="border:none;"><input type="tel"></td>
    </tr>
    <tr>
        <td style="border:none;">number</td>
        <td style="border:none;"><input type="number"></td>
    </tr>
    <tr>
        <td style="border:none;">range</td>
        <td style="border:none;"><input type="range"></td>
    </tr>
    <tr>
        <td style="border:none;">checkbox</td>
        <td style="border:none;"><input type="checkbox"></td>
    </tr>
    <tr>
        <td style="border:none;">radio</td>
        <td style="border:none;"><input type="radio"></td>
    </tr>
    <tr>
        <td style="border:none;">reset</td>
        <td style="border:none;"><input type="reset"></td>
    </tr>
    <tr>
        <td style="border:none;">button</td>
        <td style="border:none;"><input type="button"></td>
    </tr>
    <tr>
        <td style="border:none;">image</td>
        <td style="border:none;"><input type="image" src="/front-end/img.jpg" width=25% height=25%></td>
    </tr>
    <tr>
        <td style="border:none;">color</td>
        <td style="border:none;"><input type="color"></td>
    </tr>
    <tr>
        <td style="border:none;">date</td>
        <td style="border:none;"><input type="date"></td>
    </tr>
    <tr>
        <td style="border:none;">month</td>
        <td style="border:none;"><input type="month"></td>
    </tr>
    <tr>
        <td style="border:none;">week</td>
        <td style="border:none;"><input type="week"></td>
    </tr>
    <tr>
        <td style="border:none;">time</td>
        <td style="border:none;"><input type="time"></td>
    </tr>
    <tr>
        <td style="border:none;">datetime-local</td>
        <td style="border:none;"><input type="datetime-local"></td>
    </tr>
    <tr>
        <td style="border:none;">hidden</td>
        <td style="border:none;"><input type="hidden"></td>
    </tr>
</table>
</form>
<hr>


# textarea要素

textarea要素は、複数行のテキスト入力フィールドとなる要素である。

使用する主な属性は以下の通り。

|属性|意味|
|:---|:---|
|cols|１行で入力できる文字数|
|rows|入力できる行数|
|autocomplete|オートコンプリート機能のオン|
|form|特定のform要素と結びつける(form要素のid属性の値を指定)|
|maxlength|最大文字数|
|placeholder|プレースホルダー|

使用例

```
入力：<textarea cols="20" rows="5" autocomplete="on" maxlength="80" placeholder="20文字/行 5列まで、最大80文字"></textarea>
```

表示例

入力：<textarea cols="20" rows="5" autocomplete="on" maxlength="80" placeholder="20文字/行 5列まで、最大80文字"></textarea>
<hr>

# button要素

button要素は、ボタンを表示させる要素である。要素内の内容はラベルとして、ボタンに表示される。

使用する主な属性は以下の通り。

|属性|意味|
|:---|:---|
|type|ボタンの種類(submit,reset,menu,buttonのいずれか)|
|menu|表示させるメニュー|
|form|特定のform要素と結びつける(form要素のid属性の値を指定)|
|formaction|フォームの送信先のURL|
|formmethod|フォームのデータを送信する際のHTTPメソッド|
|name|フォーム部品の名前|
|value|フォームのデータを送信する際に使用される値|

使用例

```
<form id="button">
<textarea cols="20" rows="4" placeholder="何か書いてresetボタンを押すと？" form="button"></textarea>

<button type="button" name="test" form="button">
buttonテスト
</button>

<button type="reset" name="resettest" form="button">
resetテスト
</button>
</form>
```

表示例

<form id="button">
<textarea cols="20" rows="4" placeholder="何か書いてresetボタンを押すと？" form="button"></textarea>

<button type="button" name="test" form="button">
buttonテスト
</button>

<button type="reset" name="resettest" form="button">
resetテスト
</button>
</form>
<hr>

## select要素

select要素は、選択肢の中から選ぶ形式のフォーム部品を示す要素である。

フォーム部品自体はselect要素で示し、中身の選択肢は後述するoption要素・optgroup要素で示す。

select要素で使用する主な属性は以下の通り。

|属性|意味|
|:---|:---|
|multiple|複数の入力・選択を許可する|
|size|表示させる項目数|
|autocomplete|オートコンプリート機能のオン|
|form|特定のform要素と結びつける(form要素のid属性の値を指定)|
|name|フォーム部品の名前|
|required|入力・選択が必須であることを示す|

使用例は下記、option要素の所で示す。

## option要素

option要素は、前述のselect要素またはdatalist要素の選択肢となる要素である。

要素の内容には、表示させたい内容を入力する。

使用する主な属性は以下の通り。

|属性|意味|
|:---|:---|
|selected|デフォルトで選択済みの状態にする|
|label|ブラウザに表示させる選択肢名(要素内容よりも優先する)|
|value|submit等でサーバーに送信する値(要素内容よりも優先する)|

前述のselect要素を使って、例を示す。

```
<select>
    <option selected >選択肢その１</option>
    <option label="ラベルに書いた選択肢その２">選択肢その２</option>
    <option>選択肢その３</option>
</select>
```

表示例

<select>
    <option selected >選択肢その１</option>
    <option label="ラベルに書いた選択肢その２">選択肢その２</option>
    <option>選択肢その３</option>
</select>
<hr>


## optgroup要素

optgroup要素は、select要素内のoption要素をグループ化して、そこにグループの名前（ラベル）をつける要素である。

グループに名前をつけるにはlabel属性を利用する。

使用例

```
<select>
    <optgroup label="選択肢">
        <option selected >選択肢その１</option>
        <option label="ラベルに書いた選択肢その２">選択肢その２</option>
        <option>選択肢その３</option>
</select>
```

表示例

<select>
    <optgroup label="選択肢">
        <option selected >選択肢その１</option>
        <option label="ラベルに書いた選択肢その２">選択肢その２</option>
        <option>選択肢その３</option>
</select>
<hr>


## datalist要素

datalist要素は、input要素にサジェストを追加するための要素である。

実際のサジェストの内容は、前述の **option要素・optgroup要素** を利用して表現する。

datalist要素とinput要素を関連付けるには、datalist要素のid属性の値をinput要素のlist属性に指定する。

使用例

```
<p>行きたい場所は?
<input type="text" list="place">
    <datalist id="place">
        <option>東京</option>
        <option>横浜</option>
        <option>京都</option>
    </datalist>
</p>
```

表示例

<p>行きたい場所は?
<input type="text" list="place">
    <datalist id="place">
        <option>東京</option>
        <option>横浜</option>
        <option>京都</option>
    </datalist>
</p>
<hr>


## meter要素

meter要素は、メーター（ゲージ)を示すための要素である。

具体的には、特定の範囲内で指定した位置を示すときに利用する。

使用する主な属性は以下の通り。

|属性|意味|
|:---|:---|
|value|要素の現在値|
|min|メーターの範囲の下限|
|max|メーターの範囲の上限|


使用例

```
<p>使用量状況：
<meter min="0" max="100" value="45">
</meter>
</p>
```

表示例

<p>使用量状況：
<meter min="0" max="100" value="45">
</meter>
</p>
<hr>


## progress要素

progress要素は、タスクの進み具合を示すゲージを示すための要素である。

使用する属性は以下の通り。

|属性|意味|
|:---|:---|
|value|要素の現在値|
|max|全体量|

使用例

```
Now loading...:
<progress value="45" max="100"></progress>
```

表示例

Now loading...:
<progress value="45" max="100"></progress>
<hr>


## output要素

output要素は、計算式の計算結果、またはユーザーの操作結果を示すための要素である。

使用する属性は以下の通り。

|属性|意味|
|:---|:---|
|for|計算の元となったフォームの部品|
|name|フォーム部品の名前|

使用例

```
<form oninput="result.value=a.valueAsNumber+b.valueAsNumber">
	<input name="a" value="20" type="number"> +
	<input name="b" value="30" type="number"> =
	<output for="a b" name="result"></output>	
</form>
```

表示例

<form oninput="result.value=a.valueAsNumber+b.valueAsNumber">
	<input name="a" value="20" type="number"> +
	<input name="b" value="30" type="number"> =
	<output for="a b" name="result"></output>	
</form>
<hr>

## keygen要素

keygen要素は、公開鍵・秘密鍵のペアを生成するための要素である。

実行すると、秘密鍵はローカルに保存され、公開鍵はサーバー側に送られる。

|属性|意味|
|:---|:---|
|keytype|生成する暗号鍵の種類(rsaなど)|
|challenge|生成された公開鍵とともに送られる文字列|
|name|form要素と関連づけるための値|

(実行例略)

## label要素

label要素は、その要素内容をフォームの部品と紐づけるための要素である。

紐づけられたラベルは、フォームの部品と一体化してユーザの操作に一緒に反応されるようになる。

紐づけるための方法は

- label要素の中に、要素内容と一緒に関連づけたいフォームの部品の要素を入れる
- フォーム部品の要素にid属性を指定し、label要素のfor属性にもそのid属性と同じ値を指定する

である。

使用例

```
<form>
<label for="yes"><input type="radio" name="ans" id="yes">はい</label>
<label for="no"><input type="radio" name="ans" id="no">いいえ</label>
</form>
```

表示例

<form>
<label for="yes"><input type="radio" name="ans" id="yes">はい</label>
<label for="no"><input type="radio" name="ans" id="no">いいえ</label>
</form>
<hr>


## fieldset要素

fieldset要素は、formに関する要素をグループ化するための要素である。

使用する属性は以下の通り。

|属性|意味|
|:---|:---|
|form|関連づけるform要素のid属性の値|
|name|form要素と関連づけるための値|

使用例

```
<form id="ticket">
<fieldset form="ticket">
<p>
乗車駅→降車駅<br>
<input type="text" width="10">
→
<input type="text" width="10">
</p>
大人：
<label><input type="radio" name="adult" id="zero">０人</label>
<label><input type="radio" name="adult" id="one">１人</label>
<label><input type="radio" name="adult" id="two">２人</label>
<br>
小人：
<label><input type="radio" name="child" id="zero">０人</label>
<label><input type="radio" name="child" id="one">１人</label>
<label><input type="radio" name="child" id="two">２人</label>
</fieldset>
</form>
```

表示例

<hr>
<form id="ticket">
<fieldset form="ticket">
<p>
乗車駅→降車駅<br>
<input type="text" width="10">
→
<input type="text" width="10">
</p>
大人：
<label><input type="radio" name="adult" id="zero">０人</label>
<label><input type="radio" name="adult" id="one">１人</label>
<label><input type="radio" name="adult" id="two">２人</label>
<br>
小人：
<label><input type="radio" name="child" id="zero">０人</label>
<label><input type="radio" name="child" id="one">１人</label>
<label><input type="radio" name="child" id="two">２人</label>
</fieldset>
</form>
<hr>

## legend要素

legend要素は、fieldset要素でグループ化されたフォーム部品にキャプションをつけて表示させるための要素である。

legend要素を使用する場合は、必ずfieldset要素の中で使用し、かつその先頭に指定する必要がある。


使用例

```
<form id="ticket">
<fieldset form="ticket">
<legend>乗車券</legend>
<p>
乗車駅→降車駅<br>
<input type="text" width="10">
→
<input type="text" width="10">
</p>
大人：
<label><input type="radio" name="adult" id="zero">０人</label>
<label><input type="radio" name="adult" id="one">１人</label>
<label><input type="radio" name="adult" id="two">２人</label>
<br>
小人：
<label><input type="radio" name="child" id="zero">０人</label>
<label><input type="radio" name="child" id="one">１人</label>
<label><input type="radio" name="child" id="two">２人</label>
</fieldset>
</form>
```

表示例

<hr>
<form id="ticket">
<fieldset form="ticket">
<legend>乗車券</legend>
<p>
乗車駅→降車駅<br>
<input type="text" width="10">
→
<input type="text" width="10">
</p>
大人：
<label><input type="radio" name="adult" id="zero">０人</label>
<label><input type="radio" name="adult" id="one">１人</label>
<label><input type="radio" name="adult" id="two">２人</label>
<br>
小人：
<label><input type="radio" name="child" id="zero">０人</label>
<label><input type="radio" name="child" id="one">１人</label>
<label><input type="radio" name="child" id="two">２人</label>
</fieldset>
</form>
<hr>
