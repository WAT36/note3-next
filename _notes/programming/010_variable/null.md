---
title: "Null"
date: "2019-11-01T05:37:30+09:00"
excerpt: "Nullについて"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-11-01T05:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

プログラミングでよく見る Null について説明する。

**Null とは何か**:

Null は「何もない」「値が存在しない」状態を示す特殊な値。変数が何も参照していない、または値が設定されていないことを表す。

**注意**: Null は 0（ゼロ）とは異なる。0 は「値が 0 である」ことを意味し、Null は「値が存在しない」ことを意味する。

言語により仕様が異なるため、各言語での Null（または類似の概念）について説明する。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
null
```

Java では参照型において「何も参照していない」状態を`null`で表す。

**null の基本**:

参照型の変数に`null`を代入できる。

```java
String text = null;
Integer number = null;
List<String> list = null;

System.out.println(text);    // null
System.out.println(number);  // null
System.out.println(list);    // null
```

**プリミティブ型には使えない**:

`int`、`char`などの基本データ型には`null`を代入できない。

```java
// int x = null;  // エラー: プリミティブ型には null を代入できない

int x;  // 初期値は 0（フィールドの場合）
// ローカル変数は初期化が必須
```

**NullPointerException**:

`null`の変数に対してメソッド呼び出しやフィールドアクセスを行うと例外が発生する。

```java
String text = null;
System.out.println(text);  // null（問題なし）

// System.out.println(text.length());  // NullPointerException
```

**null チェック**:

`==`または`!=`で`null`かどうかを確認する。

```java
String text = null;

if (text == null) {
    System.out.println("text is null");
}

if (text != null) {
    System.out.println("text の長さ: " + text.length());
}
```

**Objects.requireNonNull（Java 7+）**:

`null`でないことを保証する。

```java
import java.util.Objects;

public void processText(String text) {
    // null の場合は NullPointerException を投げる
    Objects.requireNonNull(text, "text は null であってはなりません");

    System.out.println(text.length());
}
```

**Optional（Java 8+、推奨）**:

`null`を安全に扱うためのクラス。

```java
import java.util.Optional;

// Optional で値をラップする
Optional<String> optionalText = Optional.ofNullable(getText());

// 値が存在する場合のみ処理
optionalText.ifPresent(text -> {
    System.out.println(text.length());
});

// 値が存在しない場合はデフォルト値を返す
String text = optionalText.orElse("default");

// 値が存在しない場合は例外を投げる
String text2 = optionalText.orElseThrow(() ->
    new IllegalArgumentException("text が存在しません"));
```

**null 安全な演算（三項演算子）**:

```java
String text = null;
int length = (text != null) ? text.length() : 0;
System.out.println(length);  // 0
```

**実用例（null チェック）**:

```java
public class UserService {
    public User findById(Integer id) {
        if (id == null) {
            throw new IllegalArgumentException("IDはnullであってはなりません");
        }

        User user = database.findUser(id);

        if (user == null) {
            return null;  // または例外を投げる
        }

        return user;
    }

    // Optional を使った方法
    public Optional<User> findByIdOptional(Integer id) {
        Objects.requireNonNull(id, "IDはnullであってはなりません");

        User user = database.findUser(id);
        return Optional.ofNullable(user);
    }
}

// 使用例
UserService service = new UserService();

// 従来の方法
User user = service.findById(1);
if (user != null) {
    System.out.println(user.getName());
}

// Optional を使った方法
service.findByIdOptional(1)
    .ifPresent(u -> System.out.println(u.getName()));
```

**null の比較**:

```java
String a = null;
String b = null;

System.out.println(a == b);        // true（両方とも null）
System.out.println(a == null);     // true
// System.out.println(a.equals(b)); // NullPointerException
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
None
```

Python では`None`が「値が存在しない」状態を示す。`None`は Python の唯一の Null 値。

**None の基本**:

変数に`None`を代入できる。

```python
text = None
number = None
my_list = None

print(text)    # None
print(number)  # None
print(my_list) # None
```

**None の型**:

`None`の型は`NoneType`。

```python
print(type(None))  # <class 'NoneType'>

x = None
print(type(x))     # <class 'NoneType'>
```

**AttributeError と TypeError**:

`None`の変数に対してメソッド呼び出しや属性アクセスを行うとエラーが発生する。

```python
text = None
print(text)  # None（問題なし）

# print(text.upper())  # AttributeError: 'NoneType' object has no attribute 'upper'

my_list = None
# print(my_list[0])  # TypeError: 'NoneType' object is not subscriptable
```

**None チェック（is None）**:

`is`または`is not`で`None`かどうかを確認する（`==`より推奨）。

```python
text = None

if text is None:
    print("text is None")

if text is not None:
    print(f"text の長さ: {len(text)}")
```

**is None vs == None**:

`is None`が推奨される（アイデンティティ比較）。

```python
# 推奨: is None
if value is None:
    print("None です")

# 非推奨: == None
if value == None:
    print("None です")
```

**None を返す関数**:

明示的に`return`しない関数は`None`を返す。

```python
def no_return():
    print("Hello")
    # return なし

result = no_return()  # Hello
print(result)         # None
```

**デフォルト引数で None を使う**:

ミュータブルなデフォルト引数の代わりに`None`を使う。

```python
# 良い例
def add_item(item, my_list=None):
    if my_list is None:
        my_list = []
    my_list.append(item)
    return my_list

# 悪い例（ミュータブルなデフォルト引数）
def add_item_bad(item, my_list=[]):
    my_list.append(item)
    return my_list  # 予期しない動作
```

**None と False の違い**:

`None`は`False`とは異なる。

```python
if None:
    print("実行されない")  # None は偽と評価される

if not None:
    print("実行される")    # None は偽と評価される

# しかし None と False は異なる
print(None == False)  # False
print(None is False)  # False
```

**実用例（None チェック）**:

```python
class UserService:
    def find_by_id(self, user_id):
        if user_id is None:
            raise ValueError("IDはNoneであってはなりません")

        user = self.database.find_user(user_id)

        if user is None:
            return None  # または例外を投げる

        return user

# 使用例
service = UserService()

user = service.find_by_id(1)
if user is not None:
    print(user.name)

# または
user = service.find_by_id(1)
name = user.name if user is not None else "Unknown"
print(name)
```

**None を含むコレクション**:

```python
# None を含むリスト
values = [1, None, 3, None, 5]

# None をフィルタリング
filtered = [v for v in values if v is not None]
print(filtered)  # [1, 3, 5]

# filter を使う方法
filtered2 = list(filter(None, values))  # None 以外を取得
print(filtered2)  # [1, 3, 5]
```

**Optional 型ヒント（Python 3.10+）**:

```python
from typing import Optional

def find_user(user_id: int) -> Optional[str]:
    if user_id == 1:
        return "John"
    return None  # None を返す可能性がある
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
null;
undefined;
```

JavaScript には`null`と`undefined`の 2 つの「値がない」状態がある。

**null**:

明示的に「値がない」ことを示す。

```javascript
let text = null;
let number = null;
let obj = null;

console.log(text); // null
console.log(number); // null
console.log(obj); // null
```

**undefined**:

変数が宣言されているが値が代入されていない状態。

```javascript
let x;
console.log(x); // undefined

let obj = {};
console.log(obj.name); // undefined（存在しないプロパティ）

function noReturn() {
  // return なし
}
console.log(noReturn()); // undefined
```

**null vs undefined**:

| 特徴   | null                 | undefined            |
| ------ | -------------------- | -------------------- |
| 意味   | 明示的に「値がない」 | 値が未定義           |
| 型     | `object`（バグ）     | `undefined`          |
| 使用例 | 意図的に値を空にする | 変数の初期状態       |
| 推奨   | 明示的に使う         | 避ける（初期化する） |

**null チェック**:

```javascript
let text = null;

// 厳密等価演算子（推奨）
if (text === null) {
  console.log("text is null");
}

// null または undefined をチェック
if (text == null) {
  console.log("text is null or undefined");
}

if (text !== null) {
  console.log("text の長さ:", text.length);
}
```

**undefined チェック**:

```javascript
let x;

if (x === undefined) {
  console.log("x is undefined");
}

if (typeof x === "undefined") {
  console.log("x is undefined");
}
```

**Nullish Coalescing（??、ES2020+）**:

`null`または`undefined`の場合にデフォルト値を返す。

```javascript
let text = null;
let result = text ?? "default";
console.log(result); // "default"

let count = 0;
let result2 = count ?? 10;
console.log(result2); // 0（0 は null でも undefined でもない）
```

**Optional Chaining（?.、ES2020+）**:

`null`または`undefined`の場合に安全にアクセスする。

```javascript
let user = null;

// 従来の方法
let name = user && user.profile && user.profile.name;

// Optional Chaining
let name2 = user?.profile?.name;
console.log(name2); // undefined

// メソッド呼び出し
let result = user?.getName?.();
console.log(result); // undefined
```

**typeof の挙動**:

```javascript
console.log(typeof null); // "object"（バグ）
console.log(typeof undefined); // "undefined"

// null チェックは === を使う
if (value === null) {
  console.log("null です");
}
```

**null と false の違い**:

```javascript
if (null) {
  console.log("実行されない"); // null は偽と評価される
}

if (!null) {
  console.log("実行される"); // null は偽と評価される
}

// しかし null と false は異なる
console.log(null == false); // false
console.log(null === false); // false
```

**実用例（null チェック）**:

```javascript
class UserService {
  findById(userId) {
    if (userId === null || userId === undefined) {
      throw new Error("IDはnullまたはundefinedであってはなりません");
    }

    const user = this.database.findUser(userId);

    if (user === null) {
      return null; // または例外を投げる
    }

    return user;
  }
}

// 使用例
const service = new UserService();

const user = service.findById(1);
if (user !== null) {
  console.log(user.name);
}

// Optional Chaining を使った方法
console.log(user?.name ?? "Unknown");
```

**null と undefined を統一的に扱う**:

```javascript
function processValue(value) {
  // null または undefined をチェック
  if (value == null) {
    console.log("値がありません");
    return;
  }

  console.log(value);
}

processValue(null); // 値がありません
processValue(undefined); // 値がありません
processValue(0); // 0
processValue(""); // （空文字列）
```

**配列のフィルタリング**:

```javascript
const values = [1, null, 3, undefined, 5];

// null と undefined を除外
const filtered = values.filter((v) => v != null);
console.log(filtered); // [1, 3, 5]
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
nil
```

Go では`nil`が「値がない」状態を示す。ポインタ、スライス、マップ、チャネル、インターフェース、関数に使用できる。

**nil の基本**:

特定の型に対して`nil`を代入できる。

```go
var ptr *int = nil
var slice []int = nil
var m map[string]int = nil
var ch chan int = nil
var fn func() = nil

fmt.Println(ptr)    // <nil>
fmt.Println(slice)  // []
fmt.Println(m)      // map[]
fmt.Println(ch)     // <nil>
fmt.Println(fn)     // <nil>
```

**nil が使える型**:

- ポインタ（`*Type`）
- スライス（`[]Type`）
- マップ（`map[K]V`）
- チャネル（`chan Type`）
- インターフェース（`interface{}`）
- 関数（`func()`）

**nil が使えない型**:

基本型（`int`、`string`、`bool`など）や構造体には`nil`を代入できない。

```go
// var x int = nil     // エラー: int に nil を代入できない
// var s string = nil  // エラー: string に nil を代入できない

var x int     // ゼロ値: 0
var s string  // ゼロ値: ""（空文字列）
var b bool    // ゼロ値: false
```

**nil チェック**:

`==`または`!=`で`nil`かどうかを確認する。

```go
var ptr *int = nil

if ptr == nil {
    fmt.Println("ptr is nil")
}

if ptr != nil {
    fmt.Println("ptr の値:", *ptr)
}
```

**nil ポインタのデリファレンス**:

`nil`ポインタをデリファレンスするとパニックが発生する。

```go
var ptr *int = nil
fmt.Println(ptr)  // <nil>（問題なし）

// fmt.Println(*ptr)  // パニック: invalid memory address or nil pointer dereference
```

**nil スライスと空スライス**:

`nil`スライスと空スライスは異なる。

```go
var nilSlice []int        // nil スライス
emptySlice := []int{}     // 空スライス

fmt.Println(nilSlice == nil)   // true
fmt.Println(emptySlice == nil) // false

// ただし len() は両方とも 0
fmt.Println(len(nilSlice))    // 0
fmt.Println(len(emptySlice))  // 0

// nil スライスに append は可能
nilSlice = append(nilSlice, 1)
fmt.Println(nilSlice)  // [1]
```

**nil マップ**:

`nil`マップから読み込みは可能だが、書き込みはパニックが発生する。

```go
var m map[string]int = nil

// 読み込みは可能（ゼロ値を返す）
value := m["key"]
fmt.Println(value)  // 0

// m["key"] = 100  // パニック: assignment to entry in nil map

// make で初期化してから使用
m = make(map[string]int)
m["key"] = 100  // OK
```

**nil インターフェース**:

```go
var i interface{} = nil

if i == nil {
    fmt.Println("i is nil")
}

// 型アサーション
if i != nil {
    if s, ok := i.(string); ok {
        fmt.Println(s)
    }
}
```

**nil チェックの推奨方法**:

```go
// 良い例: 早期リターン（ガード句）
func processUser(user *User) error {
    if user == nil {
        return errors.New("user は nil であってはなりません")
    }

    // 通常の処理
    fmt.Println(user.Name)
    return nil
}

// ポインタレシーバーでの nil チェック
func (u *User) GetName() string {
    if u == nil {
        return ""  // または panic
    }
    return u.Name
}
```

**実用例（nil チェック）**:

```go
package main

import (
    "errors"
    "fmt"
)

type User struct {
    ID   int
    Name string
}

type UserService struct {
    database *Database
}

func (s *UserService) FindByID(id int) (*User, error) {
    if s == nil || s.database == nil {
        return nil, errors.New("サービスまたはデータベースが初期化されていません")
    }

    user := s.database.FindUser(id)

    if user == nil {
        return nil, errors.New("ユーザーが見つかりません")
    }

    return user, nil
}

func main() {
    service := &UserService{database: NewDatabase()}

    user, err := service.FindByID(1)
    if err != nil {
        fmt.Println("エラー:", err)
        return
    }

    if user != nil {
        fmt.Println("ユーザー名:", user.Name)
    }
}
```

**nil とゼロ値の違い**:

```go
// nil が使える型（参照型）
var ptr *int = nil          // nil
var slice []int = nil       // nil
var m map[string]int = nil  // nil

// ゼロ値（値型）
var i int = 0         // ゼロ値: 0
var s string = ""     // ゼロ値: ""（空文字列）
var b bool = false    // ゼロ値: false
```

**nil スライスの操作**:

```go
var slice []int  // nil スライス

// append は可能
slice = append(slice, 1, 2, 3)
fmt.Println(slice)  // [1 2 3]

// len, cap も可能
fmt.Println(len(slice))  // 3
fmt.Println(cap(slice))  // 3
```

**nil の比較**:

```go
var a *int = nil
var b *int = nil

fmt.Println(a == b)     // true（両方とも nil）
fmt.Println(a == nil)   // true
```

</div>
