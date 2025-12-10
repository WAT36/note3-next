---
title: "コードのビルドと実行方法"
excerpt: "コードのビルドと実行方法について"
coverImage: ""
date: "2025-06-30T20:44:30.000Z"
updatedAt: "2025-11-25T00:12:05.000Z"
tag: ["Go", "Java", "Python", "Javascript"]
programming: ["Go", "Java", "Python", "Javascript"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
mode: programming
---

プログラミングで書いたコードのビルドと実行方法について説明する。

**コンパイル言語とインタープリタ言語**:

- **コンパイル言語**: ソースコードを機械語に変換（コンパイル）してから実行（Java、Go、C/C++ など）
- **インタープリタ言語**: ソースコードを直接実行（Python、JavaScript など）

各言語でビルドと実行の方法が異なる。

<div class="note_content_by_programming_language" id="note_content_Go">

```bash
go run main.go
```

Go では **go run** で直接実行、**go build** でビルド、**go install** でインストールできる。

**1. go run（直接実行）**:

ソースコードを直接実行する（コンパイルと実行を一度に行う）。

```bash
# 単一ファイルを実行
go run main.go

# 複数ファイルを実行
go run main.go utils.go

# パッケージ全体を実行
go run .

# サブディレクトリのパッケージを実行
go run ./cmd/myapp
```

**開発時に便利**:

- コンパイル不要で即座に実行できる
- 一時的な実行ファイルが作成される（自動的に削除される）

**2. go build（ビルド）**:

実行ファイルを生成する。

```bash
# カレントディレクトリにビルド（デフォルト名）
go build

# 出力ファイル名を指定
go build -o myapp

# 特定のファイルをビルド
go build main.go

# サブディレクトリのパッケージをビルド
go build ./cmd/myapp

# 実行
./myapp
```

**ビルドオプション**:

```bash
# リリースビルド（デバッグ情報を削除、サイズを小さく）
go build -ldflags="-s -w" -o myapp

# 静的リンク
go build -ldflags="-extldflags -static" -o myapp

# バージョン情報を埋め込む
go build -ldflags="-X main.version=1.0.0" -o myapp
```

**3. go install（インストール）**:

実行ファイルを `$GOPATH/bin` または `$GOBIN` にインストールする。

```bash
# カレントディレクトリのパッケージをインストール
go install

# 特定のパッケージをインストール
go install github.com/user/project@latest

# $GOPATH/bin に実行ファイルが作成される
```

**4. クロスコンパイル**:

異なる OS やアーキテクチャ向けにビルドできる。

```bash
# Windows 向けにビルド（64bit）
GOOS=windows GOARCH=amd64 go build -o myapp.exe

# Linux 向けにビルド（64bit）
GOOS=linux GOARCH=amd64 go build -o myapp

# macOS 向けにビルド（64bit）
GOOS=darwin GOARCH=amd64 go build -o myapp

# macOS 向けにビルド（Apple Silicon）
GOOS=darwin GOARCH=arm64 go build -o myapp

# 利用可能な OS とアーキテクチャの一覧
go tool dist list
```

**5. go mod（モジュール管理）**:

依存関係を管理する。

```bash
# モジュールを初期化
go mod init github.com/user/project

# 依存関係を追加（import すると自動的に追加される）
go get github.com/pkg/errors

# 依存関係を更新
go get -u

# 不要な依存関係を削除
go mod tidy

# 依存関係をダウンロード
go mod download

# vendor ディレクトリに依存関係をコピー
go mod vendor
```

**6. go test（テスト）**:

テストを実行する。

```bash
# すべてのテストを実行
go test ./...

# カバレッジを表示
go test -cover ./...

# カバレッジレポートを生成
go test -coverprofile=coverage.out ./...
go tool cover -html=coverage.out

# ベンチマークを実行
go test -bench=. ./...
```

**7. その他の便利なコマンド**:

```bash
# コードをフォーマット
go fmt ./...

# 静的解析
go vet ./...

# ドキュメントを表示
go doc fmt.Println

# ローカルでドキュメントサーバーを起動
godoc -http=:6060
```

**実用例**:

### **シンプルなプロジェクト**

```bash
# ディレクトリ構造
myapp/
├── main.go
└── go.mod

# 実行
go run main.go

# ビルド
go build -o myapp
./myapp
```

### **複数ファイルのプロジェクト**

```bash
# ディレクトリ構造
myapp/
├── main.go
├── handler.go
├── utils.go
└── go.mod

# パッケージ全体を実行
go run .

# ビルド
go build -o myapp
```

### **サブパッケージを含むプロジェクト**

```bash
# ディレクトリ構造
myapp/
├── cmd/
│   └── myapp/
│       └── main.go
├── internal/
│   ├── handler/
│   │   └── handler.go
│   └── model/
│       └── user.go
└── go.mod

# 実行
go run ./cmd/myapp

# ビルド
go build -o myapp ./cmd/myapp
```

**Makefile での自動化**:

```makefile
.PHONY: build run test clean

build:
	go build -o bin/myapp ./cmd/myapp

run:
	go run ./cmd/myapp

test:
	go test -v ./...

clean:
	rm -rf bin/
```

```bash
# 使用例
make build
make run
make test
```

**まとめ**:

- `go run` で直接実行（開発時）
- `go build` でビルド（本番用）
- `go install` でインストール
- クロスコンパイル可能（GOOS、GOARCH）
- `go mod` で依存関係を管理

</div>
<div class="note_content_by_programming_language" id="note_content_Java">

```bash
javac Main.java
java Main
```

Java では **javac** でコンパイル、**java** で実行する。

**1. javac（コンパイル）**:

ソースコード（`.java`）をバイトコード（`.class`）にコンパイルする。

```bash
# 単一ファイルをコンパイル
javac Main.java

# 複数ファイルをコンパイル
javac Main.java Utils.java

# すべての Java ファイルをコンパイル
javac *.java

# 出力ディレクトリを指定
javac -d bin Main.java

# クラスパスを指定
javac -cp lib/library.jar Main.java

# エンコーディングを指定
javac -encoding UTF-8 Main.java
```

**2. java（実行）**:

コンパイルされたバイトコード（`.class`）を実行する。

```bash
# クラスを実行（.class は不要）
java Main

# クラスパスを指定
java -cp bin Main

# 外部ライブラリを含む
java -cp "bin:lib/*" Main

# JVM オプション
java -Xmx512m Main  # 最大ヒープサイズ
```

**3. JAR ファイル（Java Archive）**:

複数のクラスファイルを 1 つのファイルにパッケージ化する。

**JAR ファイルの作成**:

```bash
# JAR ファイルを作成
jar cvf myapp.jar *.class

# マニフェストファイル付きで作成
jar cvfm myapp.jar manifest.txt *.class

# ディレクトリ構造を保持
jar cvf myapp.jar -C bin .
```

**manifest.txt の例**:

```plaintext
Manifest-Version: 1.0
Main-Class: Main
```

**JAR ファイルの実行**:

```bash
# JAR ファイルを実行
java -jar myapp.jar

# クラスパスに追加して実行
java -cp myapp.jar Main
```

**4. Maven（ビルドツール）**:

```bash
# プロジェクトをビルド
mvn compile

# テストを実行
mvn test

# パッケージを作成（JAR ファイル）
mvn package

# 依存関係を解決してビルド
mvn clean install

# 実行
java -jar target/myapp-1.0.0.jar
```

**5. Gradle（ビルドツール）**:

```bash
# プロジェクトをビルド
gradle build

# テストを実行
gradle test

# 実行
gradle run

# JAR ファイルを作成
gradle jar

# 実行
java -jar build/libs/myapp-1.0.0.jar
```

**実用例**:

### **シンプルなプロジェクト**

```bash
# ディレクトリ構造
myapp/
├── Main.java
└── Utils.java

# コンパイル
javac *.java

# 実行
java Main
```

### **パッケージを使ったプロジェクト**

```bash
# ディレクトリ構造
myapp/
├── src/
│   └── com/
│       └── example/
│           ├── Main.java
│           └── Utils.java
└── bin/

# コンパイル（パッケージ構造を保持）
javac -d bin src/com/example/*.java

# 実行（完全修飾クラス名）
java -cp bin com.example.Main
```

### **外部ライブラリを使う**

```bash
# ディレクトリ構造
myapp/
├── src/
│   └── Main.java
├── lib/
│   └── library.jar
└── bin/

# コンパイル（クラスパスに lib を追加）
javac -cp "lib/*" -d bin src/Main.java

# 実行
java -cp "bin:lib/*" Main
```

**Java 11+ での直接実行**:

Java 11+ では、単一ファイルを直接実行できる。

```bash
# コンパイル不要で実行（Java 11+）
java Main.java
```

**まとめ**:

- `javac` でコンパイル（`.java` → `.class`）
- `java` で実行
- JAR ファイルでパッケージ化
- Maven/Gradle でビルド自動化
- Java 11+ では単一ファイルを直接実行可能

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```bash
python script.py
```

Python は**インタープリタ言語**なので、コンパイル不要で直接実行できる。

**1. 直接実行**:

Python インタープリタでスクリプトを実行する。

```bash
# Python 3 で実行
python3 script.py

# python コマンド（Python 3 がデフォルトの場合）
python script.py

# 引数を渡す
python script.py arg1 arg2

# モジュールとして実行
python -m mymodule

# ワンライナー
python -c "print('Hello, World!')"
```

**2. シバン（Shebang）で実行可能にする**:

スクリプトファイルの先頭にシバンを追加し、実行権限を付与する。

```python
#!/usr/bin/env python3

print("Hello, World!")
```

```bash
# 実行権限を付与
chmod +x script.py

# 直接実行
./script.py
```

**3. バイトコードコンパイル（.pyc）**:

Python は実行時に自動的にバイトコード（`.pyc`）を生成する。

```bash
# 自動生成される場所
__pycache__/
├── module.cpython-39.pyc
└── utils.cpython-39.pyc

# 手動でバイトコードを生成
python -m py_compile script.py

# 最適化されたバイトコードを生成
python -O -m py_compile script.py
```

**4. 仮想環境（venv）**:

プロジェクトごとに独立した Python 環境を作成する。

```bash
# 仮想環境を作成
python3 -m venv venv

# 仮想環境を有効化
# macOS/Linux
source venv/bin/activate

# Windows
venv\Scripts\activate

# パッケージをインストール
pip install requests

# 実行
python script.py

# 仮想環境を無効化
deactivate
```

**5. requirements.txt（依存関係管理）**:

```bash
# 依存関係を記録
pip freeze > requirements.txt

# 依存関係をインストール
pip install -r requirements.txt
```

**6. パッケージとして実行**:

```bash
# ディレクトリ構造
myapp/
├── myapp/
│   ├── __init__.py
│   ├── main.py
│   └── utils.py
└── setup.py

# モジュールとして実行
python -m myapp.main

# __main__.py を作成すると
myapp/
├── __init__.py
├── __main__.py
└── main.py

# パッケージ名だけで実行可能
python -m myapp
```

**7. PyInstaller（実行ファイル化）**:

Python スクリプトを実行ファイルに変換する。

```bash
# PyInstaller をインストール
pip install pyinstaller

# 実行ファイルを作成
pyinstaller script.py

# 1ファイルにまとめる
pyinstaller --onefile script.py

# dist ディレクトリに実行ファイルが作成される
./dist/script
```

**8. スクリプトのデバッグ**:

```bash
# デバッグモード
python -m pdb script.py

# 詳細な実行情報を表示
python -v script.py

# 警告を表示
python -W all script.py
```

**実用例**:

### **シンプルなスクリプト**

```bash
# script.py を実行
python script.py
```

### **パッケージプロジェクト**

```bash
# ディレクトリ構造
myapp/
├── myapp/
│   ├── __init__.py
│   ├── __main__.py
│   └── main.py
└── requirements.txt

# 依存関係をインストール
pip install -r requirements.txt

# 実行
python -m myapp
```

### **仮想環境を使った開発**

```bash
# 仮想環境を作成
python3 -m venv venv

# 有効化
source venv/bin/activate

# 依存関係をインストール
pip install -r requirements.txt

# 実行
python script.py

# 無効化
deactivate
```

**まとめ**:

- `python` で直接実行（コンパイル不要）
- シバン（`#!/usr/bin/env python3`）で実行可能にする
- `venv` で仮想環境を作成
- `pip` で依存関係を管理
- `pyinstaller` で実行ファイル化

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```bash
node script.js
```

JavaScript は**インタープリタ言語**なので、コンパイル不要で直接実行できる（ブラウザまたは Node.js）。

**1. Node.js での実行**:

Node.js で JavaScript を実行する。

```bash
# スクリプトを実行
node script.js

# 引数を渡す
node script.js arg1 arg2

# REPL（対話モード）
node

# ワンライナー
node -e "console.log('Hello, World!')"

# デバッグモード
node --inspect script.js
```

**2. npm scripts での実行**:

`package.json` にスクリプトを定義する。

**package.json**:

```json
{
  "name": "myapp",
  "version": "1.0.0",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "build": "tsc",
    "test": "jest"
  }
}
```

```bash
# npm scripts を実行
npm start
npm run dev
npm run build
npm test
```

**3. TypeScript のコンパイル**:

TypeScript（`.ts`）を JavaScript（`.js`）にトランスパイルする。

```bash
# TypeScript をインストール
npm install -g typescript

# TypeScript をコンパイル
tsc script.ts

# 生成された JavaScript を実行
node script.js

# watch モード（ファイル変更を監視）
tsc --watch

# プロジェクト全体をコンパイル
tsc
```

**tsconfig.json**:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true
  }
}
```

```bash
# ビルド
tsc

# 実行
node dist/index.js
```

**4. Babel（トランスパイル）**:

最新の JavaScript を古いブラウザでも動作する JavaScript に変換する。

```bash
# Babel をインストール
npm install --save-dev @babel/core @babel/cli @babel/preset-env

# トランスパイル
npx babel src --out-dir dist

# 実行
node dist/script.js
```

**5. バンドラー（Webpack、Vite など）**:

複数のファイルを 1 つにまとめる。

**Webpack**:

```bash
# Webpack をインストール
npm install --save-dev webpack webpack-cli

# ビルド
npx webpack

# dist ディレクトリにバンドルファイルが作成される
```

**Vite**:

```bash
# Vite でビルド
npm run build

# dist ディレクトリに最適化されたファイルが作成される
```

**6. ブラウザでの実行**:

HTML ファイルで JavaScript を読み込む。

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My App</title>
  </head>
  <body>
    <!-- スクリプトを読み込む -->
    <script src="script.js"></script>

    <!-- ES6 モジュール -->
    <script type="module" src="main.js"></script>

    <!-- インラインスクリプト -->
    <script>
      console.log("Hello, World!");
    </script>
  </body>
</html>
```

**7. シバン（Shebang）で実行可能にする（Node.js）**:

```javascript
#!/usr/bin/env node

console.log("Hello, World!");
```

```bash
# 実行権限を付与
chmod +x script.js

# 直接実行
./script.js
```

**実用例**:

### **シンプルなスクリプト（Node.js）**

```bash
# script.js を実行
node script.js
```

### **npm プロジェクト**

```bash
# ディレクトリ構造
myapp/
├── src/
│   ├── index.js
│   └── utils.js
├── package.json
└── node_modules/

# 依存関係をインストール
npm install

# 実行
npm start
```

### **TypeScript プロジェクト**

```bash
# ディレクトリ構造
myapp/
├── src/
│   ├── index.ts
│   └── utils.ts
├── dist/
├── tsconfig.json
└── package.json

# ビルド
npm run build

# 実行
node dist/index.js
```

### **フロントエンドプロジェクト（React、Vue など）**

```bash
# 開発サーバーを起動
npm run dev

# ビルド（本番用）
npm run build

# dist ディレクトリに最適化されたファイルが作成される
```

**まとめ**:

- Node.js で `node` コマンドで実行
- ブラウザで `<script>` タグで読み込む
- TypeScript は `tsc` でコンパイル
- Babel でトランスパイル
- Webpack/Vite でバンドル
- `npm scripts` でビルド自動化

</div>
<div class="note_content_by_programming_language" id="note_content_Node.js">

Node.js での実行については、[Javascript](#note_content_Javascript) セクションを参照してください。

</div>
