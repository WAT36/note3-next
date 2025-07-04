---
title: "パッケージ"
date: "2025-03-30T10:51:30+09:00"
excerpt: ""
tag: ["Go"]
programming: ["Go"]
updatedAt: "2025-03-30T10:51:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

パッケージについて記載する。

<div class="note_content_by_programming_language" id="note_content_Go">

```go
package main
```

Go のコードは必ず package 宣言 から始まります。

- package キーワードでパッケージ名を指定します。
- main パッケージは特別で、Go プログラムのエントリポイントとして動作します。

package の役割としては以下があります。

1. コードの再利用
   - 関数・型・変数などを複数のファイル間で共有できる。
   - 別のパッケージでインポート (import) して利用する。
2. モジュール化と管理
   - 大規模なアプリケーションのコードを論理的に分割。
   - モジュールごとに責務を分離し、保守性を向上。
3. 名前の衝突を防ぐ
   - 別のパッケージに同じ名前の関数があっても、パッケージ名で区別できる。

Go では主に 2 種類のパッケージが存在します。

1. main パッケージ

   - エントリポイント となる特別なパッケージ。
   - main パッケージ内には必ず func main() を含める必要がある。

2. ライブラリパッケージ
   - 再利用可能な関数や型を定義するパッケージ。
   - main パッケージ以外 で定義され、他のパッケージからインポートされる。

# パッケージの規則

- パッケージ名は 小文字 で指定するのが慣例。
- パッケージ名は ディレクトリ名と一致させるのが一般的。
- 同一ディレクトリ内にある .go ファイルは すべて同じパッケージ名 を使う必要がある。
- main パッケージは 1 つのアプリケーションにつき 1 つだけ存在できる。
- １つのファイルに記述できるのは単一のパッケージのみ
- 関数変数名が大文字で始まる場合、パッケージ外部からアクセス可能
- 関数変数名が小文字で始まる場合、パッケージ内でのみアクセス可能

# init 関数

Go のパッケージには、特殊な関数**init**を定義することができます。

init 関数を定義すると、main 関数よりも前に実行されます。何らかの初期処理をさせたいときに有用です。

init 関数は、引数・戻り値なしで定義します。（追加するとエラーになります。）

また、init 関数は複数定義しても OK です。その場合は定義した順番に実行されます。

```go
func init() {
	fmt.Println("Starting myapp...")
}

func init() {
	fmt.Println("Starting myapp2...")
}

func init() {
	fmt.Println("Starting myapp3...")
}

// go run main.go
func main() {
	fmt.Println("main")
}
```

実行結果

```
Starting myapp...
Starting myapp2...
Starting myapp3...
main
```

</div>
