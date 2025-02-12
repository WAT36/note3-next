---
title: "コマンドライン引数"
date: "2019-10-12T16:42:45.000Z"
excerpt: ""
tag: ["Java", "Python", "Node.js"]
programming: ["Java", "Python", "Node.js"]
updatedAt: "2019-10-12T16:42:45.000Z"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

プログラム(実行ファイル)をターミナルやコマンドプロンプト等から実行する時、同時に値を入力した上で実行することができる。この入力する値を**コマンドライン引数**という。

```
$ (実行ファイル名) 値1 値2..
//↑この値1,2,, がコマンドライン引数
```

ここでは、プログラム中でコマンドライン引数を受け取る方法を示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
public static void main(String args[]){
    // args[] にコマンドライン引数が入る
}
```

クラスはここでは Main.java とする。
Java ではコマンドライン引数はクラス内で宣言する main メソッドの引数である String 型の配列(上記コード中の"args")に入る。  
コマンドライン引数をスペースで区切って何個かに分けて入力した場合、初めから順に args の 0 番目から順に入る。

実行例

```
$ javac Main.java
$ java Main aa 10
[aa, 10]
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
import sys          # sysモジュールをインポート
print(sys.argv)
```

Python は sys モジュールの argv 属性にコマンドライン引数がリストとして入る。

コマンドライン引数を取得するには、sys モジュールをインポートして argv を参照する。

ただし Python では、コマンドライン引数の最初には"実行ファイル名"が入るので順序に注意すること。

実行例

```
$ python cli.py aa 10
['cli.py', 'aa', '10']
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
console.log(process.argv);
```

Javascript(Node.js)では、process オブジェクトの**argv**プロパティにコマンドライン引数が配列形式で入る。
（process オブジェクトとは、Node.js で利用されているグローバルオブジェクトである）
指定した引数のみを取り出したい場合は、process.argv で得られる配列の指定したインデックスを参照して取り出す。

実行例（上のファイルを main.js とする）

```
$ node main.js AA 10
[
  '（nodeがあるディレクトリ、略）/node/v14.15.4/bin/node',
  '（main.jsがあるディレクトリ、略）/main.js',
  'AA',
  '10'
]
```

</div>
