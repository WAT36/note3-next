---
title: "パッケージマネージャ"
excerpt: "パッケージマネージャについて"
coverImage: ""
date: "2025-11-02T23:59:02.000Z"
updatedAt: "2025-11-02T23:59:02.000Z"
tag: ["Go", "Java", "Python", "Javascript"]
programming: ["Go", "Java", "Python", "Javascript"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
mode: programming
---

パッケージマネージャについて説明する。

**パッケージマネージャとは**:

外部ライブラリ（パッケージ、依存関係）のインストール、更新、削除、バージョン管理を行うツール。プロジェクトの依存関係を一元管理し、チーム開発や本番環境での再現性を確保する。

**パッケージマネージャの主な機能**:

1. **パッケージのインストール**: 外部ライブラリをダウンロードしてプロジェクトに追加
2. **依存関係の解決**: 必要なパッケージとそのバージョンを自動的に管理
3. **バージョン管理**: 特定のバージョンを指定して互換性を保つ
4. **パッケージの更新**: 最新版や指定バージョンに更新
5. **パッケージの削除**: 不要なパッケージを削除
6. **ロックファイル**: 依存関係の正確なバージョンを記録して再現性を確保

**パッケージマネージャの利点**:

1. **依存関係の自動管理**: 手動でライブラリを管理する必要がない
2. **再現性**: 同じ環境を別の場所で簡単に再現できる
3. **バージョン競合の解決**: 複数のパッケージ間の依存関係を自動的に解決
4. **セキュリティ**: 脆弱性のあるパッケージを検出・更新できる
5. **共有の容易さ**: 設定ファイルを共有するだけでチーム全体が同じ環境を構築できる

各言語で代表的なパッケージマネージャが異なる。

<div class="note_content_by_programming_language" id="note_content_Go">

```bash
go get github.com/gin-gonic/gin
```

Go では **Go Modules（go mod）** が標準のパッケージマネージャ（Go 1.11 以降）。`go.mod` ファイルで依存関係を管理する。

**Go Modules（標準）**:

**基本的な使い方**:

**1. モジュールの初期化**:

```bash
# 新規プロジェクトでモジュールを初期化
go mod init example.com/myproject

# go.mod ファイルが作成される
```

**go.mod ファイルの例**:

```go
module example.com/myproject

go 1.21

require (
    github.com/gin-gonic/gin v1.9.1
    github.com/lib/pq v1.10.9
)
```

**2. パッケージのインストール**:

```bash
# パッケージをインストール（go.mod に自動追加）
go get github.com/gin-gonic/gin

# 特定のバージョンをインストール
go get github.com/gin-gonic/gin@v1.9.1

# 最新版をインストール
go get -u github.com/gin-gonic/gin

# すべての依存関係を最新版に更新
go get -u ./...
```

**3. パッケージの使用**:

```go
package main

import (
    "github.com/gin-gonic/gin"
)

func main() {
    r := gin.Default()
    r.GET("/", func(c *gin.Context) {
        c.JSON(200, gin.H{"message": "Hello World"})
    })
    r.Run()
}
```

**4. 依存関係の整理**:

```bash
# 使用していない依存関係を削除
go mod tidy

# すべての依存関係をダウンロード
go mod download

# vendor ディレクトリに依存関係をコピー
go mod vendor
```

**5. go.sum ファイル（ロックファイル）**:

```
github.com/gin-gonic/gin v1.9.1 h1:4idEAncQnU5cB7BeOkPtxjfCSye0AAm1R0RVIqJ+Jmg=
github.com/gin-gonic/gin v1.9.1/go.mod h1:hPrL7YrpYKXt5YId3A/Tnip5kqbEAP+KLuI3SUcPTeU=
```

- チェックサムを記録して、ダウンロードしたパッケージが改ざんされていないことを確認

**6. パッケージの削除**:

```bash
# コードから import を削除して go mod tidy を実行
go mod tidy
```

**7. バージョンの指定**:

```bash
# セマンティックバージョン
go get github.com/gin-gonic/gin@v1.9.1

# 特定のコミット
go get github.com/gin-gonic/gin@abc1234

# 特定のブランチ
go get github.com/gin-gonic/gin@main
```

**8. プライベートリポジトリの使用**:

```bash
# GOPRIVATE 環境変数を設定
export GOPRIVATE=github.com/mycompany/*

# または
go env -w GOPRIVATE=github.com/mycompany/*
```

**9. 依存関係の確認**:

```bash
# 依存関係のツリーを表示
go mod graph

# 特定のパッケージの依存関係を表示
go mod why github.com/gin-gonic/gin

# 利用可能なバージョンを表示
go list -m -versions github.com/gin-gonic/gin
```

**10. replace ディレクティブ（ローカル開発）**:

```go
module example.com/myproject

go 1.21

require github.com/mycompany/mylib v1.0.0

// ローカルのパッケージに置き換え
replace github.com/mycompany/mylib => ../mylib
```

**実用例**:

```bash
# 1. プロジェクトを初期化
mkdir myproject && cd myproject
go mod init example.com/myproject

# 2. パッケージをインストール
go get github.com/gin-gonic/gin
go get gorm.io/gorm
go get gorm.io/driver/postgres

# 3. コードを書く（main.go）

# 4. 不要な依存関係を削除
go mod tidy

# 5. 実行
go run main.go

# 6. ビルド
go build -o myapp
```

**その他のツール**:

- **Go Workspace（Go 1.18+）**: 複数のモジュールを同時に開発する
  ```bash
  go work init ./module1 ./module2
  ```

**まとめ**:

- Go Modules（`go mod`）が標準のパッケージマネージャ
- `go.mod` で依存関係を管理
- `go.sum` でチェックサムを記録
- `go get` でパッケージをインストール
- `go mod tidy` で依存関係を整理
- セマンティックバージョニングをサポート
- プライベートリポジトリにも対応

</div>
<div class="note_content_by_programming_language" id="note_content_Java">

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

Java では **Maven**、**Gradle** が代表的なパッケージマネージャ（ビルドツール）。

**1. Maven（最も普及）**:

**基本的な使い方**:

**pom.xml（設定ファイル）**:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.example</groupId>
    <artifactId>myproject</artifactId>
    <version>1.0.0</version>
    <packaging>jar</packaging>

    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <dependencies>
        <!-- Spring Boot Web -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
            <version>3.2.0</version>
        </dependency>

        <!-- PostgreSQL Driver -->
        <dependency>
            <groupId>org.postgresql</groupId>
            <artifactId>postgresql</artifactId>
            <version>42.6.0</version>
        </dependency>

        <!-- JUnit（テスト用） -->
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter</artifactId>
            <version>5.10.0</version>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```

**主要なコマンド**:

```bash
# 依存関係をインストール
mvn install

# プロジェクトをクリーン
mvn clean

# プロジェクトをコンパイル
mvn compile

# テストを実行
mvn test

# パッケージ化（JAR/WAR）
mvn package

# 依存関係のツリーを表示
mvn dependency:tree

# 依存関係を更新
mvn versions:use-latest-versions

# 特定のゴールを実行
mvn clean install
```

**依存関係のスコープ**:

```xml
<dependencies>
    <!-- compile（デフォルト）: コンパイル時と実行時に必要 -->
    <dependency>
        <groupId>com.google.guava</groupId>
        <artifactId>guava</artifactId>
        <version>32.1.3-jre</version>
        <scope>compile</scope>
    </dependency>

    <!-- test: テスト時のみ必要 -->
    <dependency>
        <groupId>org.junit.jupiter</groupId>
        <artifactId>junit-jupiter</artifactId>
        <version>5.10.0</version>
        <scope>test</scope>
    </dependency>

    <!-- provided: コンパイル時のみ必要（実行時は提供される） -->
    <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>javax.servlet-api</artifactId>
        <version>4.0.1</version>
        <scope>provided</scope>
    </dependency>

    <!-- runtime: 実行時のみ必要 -->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.33</version>
        <scope>runtime</scope>
    </dependency>
</dependencies>
```

**バージョンの管理**:

```xml
<properties>
    <!-- バージョンを一元管理 -->
    <spring.version>3.2.0</spring.version>
</properties>

<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
        <version>${spring.version}</version>
    </dependency>
</dependencies>
```

**親 POM（Spring Boot の場合）**:

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.2.0</version>
</parent>

<dependencies>
    <!-- バージョンを省略できる -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
</dependencies>
```

**2. Gradle（現代的、Android 開発で標準）**:

**build.gradle（Groovy）**:

```groovy
plugins {
    id 'java'
    id 'org.springframework.boot' version '3.2.0'
}

group = 'com.example'
version = '1.0.0'
sourceCompatibility = '17'

repositories {
    mavenCentral()
}

dependencies {
    // Spring Boot Web
    implementation 'org.springframework.boot:spring-boot-starter-web'

    // PostgreSQL Driver
    runtimeOnly 'org.postgresql:postgresql:42.6.0'

    // JUnit（テスト用）
    testImplementation 'org.junit.jupiter:junit-jupiter:5.10.0'
}

test {
    useJUnitPlatform()
}
```

**build.gradle.kts（Kotlin DSL、推奨）**:

```kotlin
plugins {
    java
    id("org.springframework.boot") version "3.2.0"
}

group = "com.example"
version = "1.0.0"
java.sourceCompatibility = JavaVersion.VERSION_17

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    runtimeOnly("org.postgresql:postgresql:42.6.0")
    testImplementation("org.junit.jupiter:junit-jupiter:5.10.0")
}

tasks.test {
    useJUnitPlatform()
}
```

**主要なコマンド**:

```bash
# プロジェクトをビルド
./gradlew build

# プロジェクトをクリーン
./gradlew clean

# 依存関係を表示
./gradlew dependencies

# テストを実行
./gradlew test

# アプリケーションを実行
./gradlew bootRun

# 依存関係を更新
./gradlew --refresh-dependencies
```

**依存関係の設定**:

```groovy
dependencies {
    // implementation: コンパイル時と実行時に必要
    implementation 'com.google.guava:guava:32.1.3-jre'

    // testImplementation: テスト時のみ必要
    testImplementation 'org.junit.jupiter:junit-jupiter:5.10.0'

    // compileOnly: コンパイル時のみ必要
    compileOnly 'org.projectlombok:lombok:1.18.30'

    // runtimeOnly: 実行時のみ必要
    runtimeOnly 'mysql:mysql-connector-java:8.0.33'

    // annotationProcessor: アノテーション処理
    annotationProcessor 'org.projectlombok:lombok:1.18.30'
}
```

**バージョンカタログ（Gradle 7.0+）**:

**gradle/libs.versions.toml**:

```toml
[versions]
spring = "3.2.0"
postgresql = "42.6.0"

[libraries]
spring-boot-web = { module = "org.springframework.boot:spring-boot-starter-web", version.ref = "spring" }
postgresql = { module = "org.postgresql:postgresql", version.ref = "postgresql" }

[plugins]
spring-boot = { id = "org.springframework.boot", version.ref = "spring" }
```

**build.gradle.kts**:

```kotlin
dependencies {
    implementation(libs.spring.boot.web)
    runtimeOnly(libs.postgresql)
}
```

**実用例（Maven）**:

```bash
# 1. プロジェクトを作成（Spring Initializr を使用）
curl https://start.spring.io/starter.zip \
  -d dependencies=web,data-jpa,postgresql \
  -d type=maven-project \
  -d javaVersion=17 \
  -o myproject.zip

# または手動で pom.xml を作成

# 2. 依存関係をインストール
mvn install

# 3. コードを書く

# 4. テスト
mvn test

# 5. パッケージ化
mvn package

# 6. 実行
java -jar target/myproject-1.0.0.jar
```

**まとめ**:

- Maven が最も普及（`pom.xml` で管理）
- Gradle が現代的（`build.gradle` で管理、Android 開発で標準）
- 依存関係をセントラルリポジトリ（Maven Central）からダウンロード
- スコープ（compile、test、provided など）で依存関係を分類
- 親 POM や Version Catalog でバージョンを一元管理

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```bash
pip install requests
```

Python では **pip**、**Poetry**、**pipenv** が代表的なパッケージマネージャ。**pip** が標準で最も普及している。

**1. pip（標準、最も普及）**:

**基本的な使い方**:

**パッケージのインストール**:

```bash
# パッケージをインストール
pip install requests

# 特定のバージョンをインストール
pip install requests==2.31.0

# 最小バージョンを指定
pip install requests>=2.30.0

# バージョン範囲を指定
pip install "requests>=2.30.0,<3.0.0"

# 複数のパッケージをインストール
pip install requests flask django
```

**requirements.txt（依存関係ファイル）**:

```txt
requests==2.31.0
flask==3.0.0
django>=4.2.0,<5.0.0
psycopg2-binary==2.9.9
```

**requirements.txt を使ったインストール**:

```bash
# requirements.txt からインストール
pip install -r requirements.txt

# 現在の環境の依存関係を出力
pip freeze > requirements.txt
```

**パッケージの更新**:

```bash
# パッケージを最新版に更新
pip install --upgrade requests

# または
pip install -U requests

# pip 自体を更新
pip install --upgrade pip
```

**パッケージの削除**:

```bash
# パッケージを削除
pip uninstall requests

# 確認なしで削除
pip uninstall -y requests
```

**パッケージの確認**:

```bash
# インストール済みパッケージを表示
pip list

# 特定のパッケージの情報を表示
pip show requests

# 古いパッケージを表示
pip list --outdated

# 依存関係のツリーを表示（pip-tools が必要）
pip install pipdeptree
pipdeptree
```

**仮想環境（venv）との併用**:

```bash
# 仮想環境を作成
python -m venv venv

# 仮想環境を有効化（Linux/Mac）
source venv/bin/activate

# 仮想環境を有効化（Windows）
venv\Scripts\activate

# パッケージをインストール
pip install requests

# 仮想環境を無効化
deactivate
```

**2. Poetry（現代的、推奨）**:

**インストール**:

```bash
# Poetry をインストール
curl -sSL https://install.python-poetry.org | python3 -

# または
pip install poetry
```

**基本的な使い方**:

```bash
# 新規プロジェクトを作成
poetry new myproject

# 既存プロジェクトで初期化
poetry init
```

**pyproject.toml（設定ファイル）**:

```toml
[tool.poetry]
name = "myproject"
version = "0.1.0"
description = "My project"
authors = ["Your Name <you@example.com>"]

[tool.poetry.dependencies]
python = "^3.9"
requests = "^2.31.0"
flask = "^3.0.0"

[tool.poetry.dev-dependencies]
pytest = "^7.4.0"
black = "^23.10.0"

[build-system]
requires = ["poetry-core"]
build-backend = "poetry.core.masonry.api"
```

**パッケージの管理**:

```bash
# パッケージをインストール
poetry add requests

# 開発用パッケージをインストール
poetry add --dev pytest

# 特定のバージョンをインストール
poetry add requests@^2.31.0

# すべての依存関係をインストール
poetry install

# パッケージを更新
poetry update

# パッケージを削除
poetry remove requests

# 依存関係を表示
poetry show

# 仮想環境を有効化
poetry shell

# 仮想環境でコマンドを実行
poetry run python main.py
```

**poetry.lock（ロックファイル）**:

- 依存関係の正確なバージョンを記録
- `poetry install` で同じ環境を再現

**3. pipenv（仮想環境統合）**:

**インストール**:

```bash
pip install pipenv
```

**基本的な使い方**:

```bash
# パッケージをインストール（自動的に仮想環境を作成）
pipenv install requests

# 開発用パッケージをインストール
pipenv install --dev pytest

# Pipfile からインストール
pipenv install

# パッケージを削除
pipenv uninstall requests

# 仮想環境を有効化
pipenv shell

# 仮想環境でコマンドを実行
pipenv run python main.py
```

**Pipfile（設定ファイル）**:

```toml
[[source]]
url = "https://pypi.org/simple"
verify_ssl = true
name = "pypi"

[packages]
requests = "==2.31.0"
flask = "*"

[dev-packages]
pytest = "*"

[requires]
python_version = "3.9"
```

**Pipfile.lock（ロックファイル）**:

- 依存関係の正確なバージョンを記録
- `pipenv install` で同じ環境を再現

**実用例（pip + venv）**:

```bash
# 1. プロジェクトディレクトリを作成
mkdir myproject && cd myproject

# 2. 仮想環境を作成
python -m venv venv

# 3. 仮想環境を有効化
source venv/bin/activate  # Linux/Mac
# または
venv\Scripts\activate  # Windows

# 4. パッケージをインストール
pip install requests flask

# 5. requirements.txt を作成
pip freeze > requirements.txt

# 6. コードを書く（main.py）

# 7. 実行
python main.py

# 8. 仮想環境を無効化
deactivate
```

**実用例（Poetry）**:

```bash
# 1. プロジェクトを作成
poetry new myproject && cd myproject

# 2. パッケージをインストール
poetry add requests flask

# 3. コードを書く

# 4. 実行
poetry run python main.py

# 5. 本番環境で再現
poetry install --no-dev
```

**requirements.txt の詳細な記法**:

```txt
# 特定のバージョン
requests==2.31.0

# 最小バージョン
requests>=2.30.0

# バージョン範囲
requests>=2.30.0,<3.0.0

# Git リポジトリから
git+https://github.com/user/repo.git@v1.0.0

# ローカルパッケージ
./path/to/package

# コメント
# これはコメント

# 別の requirements.txt を読み込む
-r requirements-dev.txt
```

**まとめ**:

- pip が標準で最も普及（`requirements.txt` で管理）
- Poetry が現代的（`pyproject.toml` で管理、ロックファイルあり）
- pipenv は仮想環境統合（`Pipfile` で管理）
- 仮想環境（venv）との併用が推奨
- `requirements.txt` または `pyproject.toml` で依存関係を管理

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```bash
npm install express
```

JavaScript（Node.js）では **npm**、**Yarn**、**pnpm** が代表的なパッケージマネージャ。**npm** が標準で最も普及している。

**1. npm（標準、最も普及）**:

**基本的な使い方**:

**package.json の初期化**:

```bash
# 対話的に package.json を作成
npm init

# デフォルト値で package.json を作成
npm init -y
```

**package.json（設定ファイル）**:

```json
{
  "name": "myproject",
  "version": "1.0.0",
  "description": "My project",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2",
    "pg": "^8.11.3"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "jest": "^29.7.0"
  }
}
```

**パッケージのインストール**:

```bash
# パッケージをインストール（dependencies に追加）
npm install express

# または
npm i express

# 複数のパッケージをインストール
npm install express pg

# 開発用パッケージをインストール（devDependencies に追加）
npm install --save-dev nodemon

# または
npm i -D nodemon

# グローバルにインストール
npm install -g typescript

# package.json からすべての依存関係をインストール
npm install
```

**バージョンの指定**:

```bash
# 特定のバージョンをインストール
npm install express@4.18.2

# 最新版をインストール
npm install express@latest

# タグを指定
npm install express@next
```

**パッケージの更新**:

```bash
# パッケージを更新
npm update express

# すべてのパッケージを更新
npm update

# 古いパッケージを確認
npm outdated
```

**パッケージの削除**:

```bash
# パッケージを削除
npm uninstall express

# または
npm un express

# devDependencies から削除
npm uninstall -D nodemon
```

**パッケージの確認**:

```bash
# インストール済みパッケージを表示
npm list

# トップレベルのみ表示
npm list --depth=0

# 特定のパッケージの情報を表示
npm show express

# 依存関係のツリーを表示
npm list
```

**npm scripts の実行**:

```bash
# scripts に定義したコマンドを実行
npm run start

# start、test、stop などは run を省略可能
npm start
npm test
```

**package-lock.json（ロックファイル）**:

```json
{
  "name": "myproject",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "node_modules/express": {
      "version": "4.18.2",
      "resolved": "https://registry.npmjs.org/express/-/express-4.18.2.tgz",
      "integrity": "sha512-...",
      "dependencies": {
        "body-parser": "1.20.1"
      }
    }
  }
}
```

- 依存関係の正確なバージョンを記録
- `npm install` で同じ環境を再現

**セマンティックバージョニング**:

```json
{
  "dependencies": {
    "express": "4.18.2", // 完全一致（4.18.2 のみ）
    "express": "^4.18.2", // マイナーバージョンまで許可（4.x.x）
    "express": "~4.18.2", // パッチバージョンのみ許可（4.18.x）
    "express": "*", // 任意のバージョン
    "express": ">=4.18.0", // 4.18.0 以上
    "express": "latest" // 最新版
  }
}
```

**2. Yarn（高速、Facebook 製）**:

**インストール**:

```bash
npm install -g yarn
```

**基本的な使い方**:

```bash
# プロジェクトを初期化
yarn init

# パッケージをインストール
yarn add express

# 開発用パッケージをインストール
yarn add --dev nodemon

# グローバルにインストール
yarn global add typescript

# package.json からすべての依存関係をインストール
yarn install

# または
yarn

# パッケージを更新
yarn upgrade express

# パッケージを削除
yarn remove express

# パッケージの確認
yarn list

# scripts を実行
yarn start
```

**yarn.lock（ロックファイル）**:

- 依存関係の正確なバージョンを記録
- `yarn install` で同じ環境を再現

**Yarn 2/3（Berry）**:

```bash
# Yarn 2/3 に更新
yarn set version berry

# Plug'n'Play（PnP）を有効化
yarn config set nodeLinker pnp
```

**3. pnpm（ディスク効率的）**:

**インストール**:

```bash
npm install -g pnpm
```

**基本的な使い方**:

```bash
# パッケージをインストール
pnpm add express

# 開発用パッケージをインストール
pnpm add -D nodemon

# すべての依存関係をインストール
pnpm install

# パッケージを更新
pnpm update express

# パッケージを削除
pnpm remove express

# scripts を実行
pnpm start
```

**pnpm-lock.yaml（ロックファイル）**:

- 依存関係の正確なバージョンを記録

**pnpm の利点**:

- **ディスク効率**: パッケージをグローバルストアに保存してシンボリックリンクで共有
- **高速**: 並列インストールと効率的なキャッシュ
- **厳格**: フラットな node_modules を作らず、依存関係を厳密に管理

**実用例（npm）**:

```bash
# 1. プロジェクトを初期化
mkdir myproject && cd myproject
npm init -y

# 2. パッケージをインストール
npm install express pg

# 3. 開発用パッケージをインストール
npm install --save-dev nodemon

# 4. package.json にスクリプトを追加
# "scripts": {
#   "start": "node index.js",
#   "dev": "nodemon index.js"
# }

# 5. コードを書く（index.js）

# 6. 開発サーバーを起動
npm run dev

# 7. 本番用にビルド
npm start
```

**npx（パッケージの一時実行）**:

```bash
# パッケージをインストールせずに実行
npx create-react-app my-app

# ローカルの node_modules/.bin のコマンドを実行
npx jest

# 特定のバージョンを実行
npx typescript@4.9.0
```

**モノレポ管理（Workspaces）**:

**package.json**:

```json
{
  "name": "myproject",
  "private": true,
  "workspaces": ["packages/*"]
}
```

```bash
# すべてのワークスペースの依存関係をインストール
npm install

# 特定のワークスペースにパッケージをインストール
npm install express -w packages/api
```

**まとめ**:

- npm が標準で最も普及（`package.json` と `package-lock.json` で管理）
- Yarn が高速で使いやすい（`yarn.lock` で管理）
- pnpm がディスク効率的（`pnpm-lock.yaml` で管理）
- セマンティックバージョニング（`^`、`~`）でバージョンを管理
- ロックファイルで依存関係の再現性を確保
- npx でパッケージを一時実行

</div>
