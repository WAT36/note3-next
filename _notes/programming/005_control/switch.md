---
title: "switch文"
date: "2019-10-27T20:36:30+09:00"
excerpt: "switch文について"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-27T20:36:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

switch 文は一つの式の結果から多くの処理に分岐させたいときに用いる。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
switch (式) { case 値: ... break; }
```

Java では`switch`文を使って、式の値に応じて処理を分岐させることができる。

**基本構文**:

```java
switch (式) {
    case 値1:
        // 処理
        break;
    case 値2:
        // 処理
        break;
    default:
        // どのcaseにも一致しなかった場合
        break;
}
```

各`case`の最後には**break**が必要。`break`がないと次の`case`も実行される（フォールスルー）。

**基本的な例**:

```java
int day = 2;
switch (day) {
    case 1:
        System.out.println("月曜日");
        break;
      case 2:
        System.out.println("火曜日");
        break;
    case 3:
        System.out.println("水曜日");
        break;
      default:
        System.out.println("その他");
        break;
}
// 出力: 火曜日
```

**複数の値を 1 つの case で処理**:

```java
int month = 12;
switch (month) {
    case 12:
    case 1:
    case 2:
        System.out.println("冬");
        break;
    case 3:
    case 4:
    case 5:
        System.out.println("春");
        break;
    case 6:
    case 7:
    case 8:
        System.out.println("夏");
        break;
    case 9:
    case 10:
    case 11:
        System.out.println("秋");
        break;
    }
// 出力: 冬
```

**文字列での switch**:

Java 7 以降、文字列でも`switch`が使える。

```java
String fruit = "apple";
switch (fruit) {
    case "apple":
        System.out.println("りんご");
        break;
    case "banana":
        System.out.println("バナナ");
        break;
    case "orange":
        System.out.println("オレンジ");
        break;
    default:
        System.out.println("不明な果物");
}
// 出力: りんご
```

**enum での switch**:

```java
enum Day {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
}

Day today = Day.FRIDAY;
switch (today) {
    case MONDAY:
    case TUESDAY:
    case WEDNESDAY:
    case THURSDAY:
    case FRIDAY:
        System.out.println("平日");
        break;
    case SATURDAY:
    case SUNDAY:
        System.out.println("週末");
        break;
}
// 出力: 平日
```

**switch 式（Java 12+）**:

Java 12 以降では、`switch`式を使うと`break`が不要で、値を返すことができる。

```java
int day = 2;
String dayName = switch (day) {
    case 1 -> "月曜日";
    case 2 -> "火曜日";
    case 3 -> "水曜日";
    default -> "その他";
};
System.out.println(dayName);
// 出力: 火曜日
```

**switch 式で複数の値**:

```java
int month = 12;
String season = switch (month) {
    case 12, 1, 2 -> "冬";
    case 3, 4, 5 -> "春";
    case 6, 7, 8 -> "夏";
    case 9, 10, 11 -> "秋";
    default -> "不明";
};
System.out.println(season);
// 出力: 冬
```

**switch 式で複数行処理**:

```java
int score = 85;
String grade = switch (score / 10) {
    case 10, 9 -> "A";
    case 8 -> "B";
    case 7 -> "C";
    case 6 -> "D";
    default -> {
        System.out.println("不合格");
        yield "F";
    }
};
System.out.println("評価: " + grade);
// 出力: 評価: B
```

**フォールスルー（意図的）**:

`break`を省略すると、次の`case`も実行される。

```java
int num = 2;
switch (num) {
    case 1:
        System.out.println("1");
    case 2:
        System.out.println("2");
    case 3:
        System.out.println("3");
        break;
    default:
        System.out.println("その他");
}
// 出力: 2 3
```

**実用例（コマンド処理）**:

```java
String command = "start";
switch (command) {
    case "start":
        System.out.println("プログラムを開始します");
        break;
    case "stop":
        System.out.println("プログラムを停止します");
        break;
    case "restart":
        System.out.println("プログラムを再起動します");
        break;
    default:
        System.out.println("不明なコマンド: " + command);
}
// 出力: プログラムを開始します
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
match 式: case 値: ...
```

Python 3.9 以前には**switch 文が存在しない**。Python 3.10 以降では**match 文**（構造化パターンマッチング）が使える。

**match 文（Python 3.10+）**:

```python
day = 2
match day:
    case 1:
        print("月曜日")
    case 2:
        print("火曜日")
    case 3:
        print("水曜日")
    case _:
        print("その他")
# 出力: 火曜日
```

`case _:`は`default`に相当する（すべてにマッチ）。

**複数の値を 1 つの case で処理**:

```python
month = 12
match month:
    case 12 | 1 | 2:
        print("冬")
    case 3 | 4 | 5:
        print("春")
    case 6 | 7 | 8:
        print("夏")
    case 9 | 10 | 11:
        print("秋")
    case _:
        print("不明")
# 出力: 冬
```

**文字列での match**:

```python
fruit = "apple"
match fruit:
    case "apple":
        print("りんご")
    case "banana":
        print("バナナ")
    case "orange":
        print("オレンジ")
    case _:
        print("不明な果物")
# 出力: りんご
```

**ガード条件**:

`if`を付けて条件を追加できる。

```python
score = 85
match score:
    case s if s >= 90:
        print("A")
    case s if s >= 80:
        print("B")
    case s if s >= 70:
        print("C")
    case s if s >= 60:
        print("D")
    case _:
        print("F")
# 出力: B
```

**構造化パターンマッチング**:

リストやタプルの構造でマッチできる。

```python
point = (0, 5)
match point:
    case (0, 0):
        print("原点")
    case (0, y):
        print(f"Y軸上: y={y}")
    case (x, 0):
        print(f"X軸上: x={x}")
    case (x, y):
        print(f"座標: ({x}, {y})")
# 出力: Y軸上: y=5
```

**辞書を使った代替（Python 3.9 以前）**:

Python 3.9 以前では、辞書や`if-elif-else`で代替する。

```python
# 辞書を使った方法
day = 2
day_names = {
    1: "月曜日",
    2: "火曜日",
    3: "水曜日",
}
print(day_names.get(day, "その他"))
# 出力: 火曜日

# 関数を値に持つ辞書
def start():
    print("開始")

def stop():
    print("停止")

def restart():
    print("再起動")

command = "start"
commands = {
    "start": start,
    "stop": stop,
    "restart": restart,
}
action = commands.get(command)
if action:
    action()
else:
    print("不明なコマンド")
# 出力: 開始
```

**if-elif-else を使った方法**:

```python
day = 2
if day == 1:
    print("月曜日")
elif day == 2:
    print("火曜日")
elif day == 3:
    print("水曜日")
else:
    print("その他")
# 出力: 火曜日
```

**match 文での値の取得**:

```python
command = ("move", 10, 20)
match command:
    case ("move", x, y):
        print(f"({x}, {y})に移動")
    case ("draw", x, y):
        print(f"({x}, {y})に描画")
    case ("clear",):
        print("クリア")
    case _:
        print("不明なコマンド")
# 出力: (10, 20)に移動
```

**クラスのパターンマッチング**:

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

point = Point(0, 5)
match point:
    case Point(x=0, y=0):
        print("原点")
    case Point(x=0, y=y):
        print(f"Y軸上: y={y}")
    case Point(x=x, y=0):
        print(f"X軸上: x={x}")
    case Point(x=x, y=y):
        print(f"座標: ({x}, {y})")
# 出力: Y軸上: y=5
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
switch (式) { case 値: ... break; }
```

JavaScript では`switch`文を使って、式の値に応じて処理を分岐させることができる。

**基本構文**:

```javascript
switch (式) {
  case 値1:
    // 処理
    break;
  case 値2:
    // 処理
    break;
  default:
    // どのcaseにも一致しなかった場合
    break;
}
```

各`case`の最後には**break**が必要。`break`がないと次の`case`も実行される（フォールスルー）。

**基本的な例**:

```javascript
let day = 2;
switch (day) {
  case 1:
    console.log("月曜日");
    break;
  case 2:
    console.log("火曜日");
    break;
  case 3:
    console.log("水曜日");
    break;
  default:
    console.log("その他");
    break;
}
// 出力: 火曜日
```

**厳密等価性（===）**:

`switch`文は**厳密等価性（===）**で比較する。型も一致する必要がある。

```javascript
let value = "2";
switch (value) {
  case 2: // 数値の2
    console.log("数値の2");
    break;
  case "2": // 文字列の"2"
    console.log("文字列の2");
    break;
}
// 出力: 文字列の2
```

**複数の値を 1 つの case で処理**:

```javascript
let month = 12;
switch (month) {
  case 12:
  case 1:
  case 2:
    console.log("冬");
    break;
  case 3:
  case 4:
  case 5:
    console.log("春");
    break;
  case 6:
  case 7:
  case 8:
    console.log("夏");
    break;
  case 9:
  case 10:
  case 11:
    console.log("秋");
    break;
}
// 出力: 冬
```

**文字列での switch**:

```javascript
let fruit = "apple";
switch (fruit) {
  case "apple":
    console.log("りんご");
    break;
  case "banana":
    console.log("バナナ");
    break;
  case "orange":
    console.log("オレンジ");
    break;
  default:
    console.log("不明な果物");
}
// 出力: りんご
```

**フォールスルー（意図的）**:

`break`を省略すると、次の`case`も実行される。

```javascript
let num = 2;
switch (num) {
  case 1:
    console.log("1");
  case 2:
    console.log("2");
  case 3:
    console.log("3");
    break;
  default:
    console.log("その他");
}
// 出力: 2 3
```

**式を使った case**:

`case`には式を書くこともできる。

```javascript
let score = 85;
let grade;
switch (true) {
  case score >= 90:
    grade = "A";
    break;
  case score >= 80:
    grade = "B";
    break;
  case score >= 70:
    grade = "C";
    break;
  case score >= 60:
    grade = "D";
    break;
  default:
    grade = "F";
}
console.log("評価: " + grade);
// 出力: 評価: B
```

**オブジェクトを使った代替**:

`switch`の代わりにオブジェクトを使うこともできる。

```javascript
// switchを使った方法
let day = 2;
let dayName;
switch (day) {
  case 1:
    dayName = "月曜日";
    break;
  case 2:
    dayName = "火曜日";
    break;
  case 3:
    dayName = "水曜日";
    break;
  default:
    dayName = "その他";
}
console.log(dayName);

// オブジェクトを使った方法
const dayNames = {
  1: "月曜日",
  2: "火曜日",
  3: "水曜日",
};
console.log(dayNames[day] || "その他");
// どちらも出力: 火曜日
```

**関数を値に持つオブジェクト**:

```javascript
const commands = {
  start: () => console.log("開始"),
  stop: () => console.log("停止"),
  restart: () => console.log("再起動"),
};

let command = "start";
if (commands[command]) {
  commands[command]();
} else {
  console.log("不明なコマンド");
}
// 出力: 開始
```

**実用例（HTTP ステータスコード）**:

```javascript
let statusCode = 404;
switch (statusCode) {
  case 200:
    console.log("成功");
    break;
  case 400:
    console.log("不正なリクエスト");
    break;
  case 401:
    console.log("認証が必要");
    break;
  case 404:
    console.log("見つかりません");
    break;
  case 500:
    console.log("サーバーエラー");
    break;
  default:
    console.log("不明なステータス");
}
// 出力: 見つかりません
```

**default の位置**:

`default`はどこに配置してもよいが、最後に書くのが一般的。

```javascript
let value = 5;
switch (value) {
  case 1:
    console.log("1");
    break;
  default:
    console.log("その他");
    break;
  case 2:
    console.log("2");
    break;
}
// 出力: その他
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
switch 式 { case 値: ... }
```

Go では`switch`文を使って、式の値に応じて処理を分岐させることができる。

**基本構文**:

```go
switch 式 {
case 値1:
    // 処理
case 値2:
    // 処理
default:
    // どのcaseにも一致しなかった場合
}
```

Go の`switch`は**自動的に break される**ため、`break`は不要。

**基本的な例**:

```go
import "fmt"

day := 2
switch day {
case 1:
    fmt.Println("月曜日")
case 2:
    fmt.Println("火曜日")
case 3:
    fmt.Println("水曜日")
default:
    fmt.Println("その他")
}
// 出力: 火曜日
```

**複数の値を 1 つの case で処理**:

```go
month := 12
switch month {
case 12, 1, 2:
    fmt.Println("冬")
case 3, 4, 5:
    fmt.Println("春")
case 6, 7, 8:
    fmt.Println("夏")
case 9, 10, 11:
    fmt.Println("秋")
}
// 出力: 冬
```

**簡易文付き switch**:

`switch`文の前に簡易文を書ける。変数のスコープを制限できる。

```go
switch day := time.Now().Weekday(); day {
case time.Saturday, time.Sunday:
    fmt.Println("週末")
default:
    fmt.Println("平日")
}
// day はここではスコープ外
```

**式なし switch（条件分岐）**:

式を省略すると、各`case`で条件を評価できる。`if-else`の代わりに使える。

```go
score := 85
switch {
case score >= 90:
    fmt.Println("A")
case score >= 80:
    fmt.Println("B")
case score >= 70:
    fmt.Println("C")
case score >= 60:
    fmt.Println("D")
default:
    fmt.Println("F")
}
// 出力: B
```

**型 switch**:

インターフェースの型を判定できる。

```go
var x interface{} = 42

switch v := x.(type) {
case int:
    fmt.Printf("整数: %d\n", v)
case string:
    fmt.Printf("文字列: %s\n", v)
case bool:
    fmt.Printf("真偽値: %t\n", v)
default:
    fmt.Printf("不明な型: %T\n", v)
}
// 出力: 整数: 42
```

**型 switch での複数の型**:

```go
var x interface{} = 3.14

switch x.(type) {
case int, int64, int32:
    fmt.Println("整数型")
case float32, float64:
    fmt.Println("浮動小数点型")
case string:
    fmt.Println("文字列型")
default:
    fmt.Println("その他の型")
}
// 出力: 浮動小数点型
```

**fallthrough**:

次の`case`も実行したい場合は`fallthrough`を使う。

```go
num := 2
switch num {
case 1:
    fmt.Println("1")
case 2:
    fmt.Println("2")
    fallthrough // 次のcaseも実行
case 3:
    fmt.Println("3")
default:
    fmt.Println("その他")
}
// 出力: 2 3
```

**fallthrough の制限**:

`fallthrough`は次の`case`の条件を評価せず、無条件に実行する。最後の`case`や`default`では使えない。

```go
s := "A"
switch s {
case "A":
    s += "B"
    fallthrough
case "B":
    s += "C"
    fallthrough
default:
    s += "Z"
}
fmt.Println(s)
// 出力: ABCZ
```

**文字列での switch**:

```go
fruit := "apple"
switch fruit {
case "apple":
    fmt.Println("りんご")
case "banana":
    fmt.Println("バナナ")
case "orange":
    fmt.Println("オレンジ")
default:
    fmt.Println("不明な果物")
}
// 出力: りんご
```

**実用例（エラーハンドリング）**:

```go
import "errors"

err := someFunction()
switch {
case err == nil:
    fmt.Println("成功")
case errors.Is(err, io.EOF):
    fmt.Println("ファイル終端")
case errors.Is(err, os.ErrNotExist):
    fmt.Println("ファイルが存在しません")
default:
    fmt.Printf("エラー: %v\n", err)
}
```

**実用例（HTTP ステータスコード）**:

```go
statusCode := 404
switch statusCode {
case 200:
    fmt.Println("成功")
case 400:
    fmt.Println("不正なリクエスト")
case 401:
    fmt.Println("認証が必要")
case 404:
    fmt.Println("見つかりません")
case 500:
    fmt.Println("サーバーエラー")
default:
    fmt.Println("不明なステータス")
}
// 出力: 見つかりません
```

**map を使った代替**:

```go
// switchを使った方法
day := 2
var dayName string
switch day {
case 1:
    dayName = "月曜日"
case 2:
    dayName = "火曜日"
case 3:
    dayName = "水曜日"
default:
    dayName = "その他"
}
fmt.Println(dayName)

// mapを使った方法
dayNames := map[int]string{
    1: "月曜日",
    2: "火曜日",
    3: "水曜日",
}
if name, ok := dayNames[day]; ok {
    fmt.Println(name)
} else {
    fmt.Println("その他")
}
// どちらも出力: 火曜日
```

**break での早期終了**:

Go では通常`break`は不要だが、ループ内の switch で外側のループを抜けたい場合にラベル付き`break`を使う。

```go
loop:
for i := 0; i < 5; i++ {
    switch i {
    case 2:
        fmt.Println("2で終了")
        break loop // 外側のループを抜ける
    default:
        fmt.Println(i)
    }
}
// 出力: 0 1 2で終了
```

**default の位置**:

`default`はどこに配置してもよいが、最後に書くのが一般的。

```go
value := 5
switch value {
case 1:
    fmt.Println("1")
default:
    fmt.Println("その他")
case 2:
    fmt.Println("2")
}
// 出力: その他
```

</div>
