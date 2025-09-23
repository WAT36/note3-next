---
title: "QGISで地図を可視化する"
excerpt: "QGISを使って地理情報データを扱う簡単なハンズオン"
coverImage: "/assets/posts/startQGIS/qgis-icon.png"
date: "2025-09-21T13:22:27.000Z"
updatedAt: "2025-09-21T13:22:27.000Z"
tag: ["地理情報"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

地理情報を扱えるソフトウェアとして、今回は QGIS を初めて使い、基本的な地図表示や分析を試してみたので、その手順を紹介します。

# QGIS とは

QGIS（Quantum GIS）[^1] は、以下のような特徴を持つ GIS ソフトウェアです。

- **完全無料**のオープンソースソフトウェア
- **クロスプラットフォーム**対応（Windows、Mac、Linux）
- **豊富な機能**：地図作成、データ分析、空間解析など
- **多様なデータ形式**に対応
- **プラグイン**による機能拡張が可能
- **多言語対応**（日本語も完全サポート）

# QGIS のインストール

## インストール手順

QGIS のインストールは公式ページ[^1]から行います。

以下は macOS の手順ですが、Windows も同ページにインストーラがあります。

1. QGIS 公式ページ[^1] から「Download for macOS」を選択

2. dmg ファイルをダウンロード

![](/assets/posts/startQGIS/download.png)

3. dmg をマウントし、アプリケーションフォルダにドラッグ＆ドロップ

## 初回起動

インストール後、QGIS を起動すると日本語インターフェースで表示されます。もし英語表記の場合は、「Settings」→「Options」→「General」から言語を「日本語」に変更してください。

# サンプルデータの準備

ハンズオンに使用するデータを準備しましょう。今回は **Natural Earth**[^2] と **国土数値情報**[^3] を利用します。

## Natural Earth データの取得

1.  Natural Earth 公式サイト[^2] にアクセスします。

![](/assets/posts/startQGIS/naturalEarthTop.png)

2.  「Downloads」→「Cultural」→「Admin 0 - Countries」を選択（Cultural は縮尺ごとに分かれているので、任意のものを利用可能）

![](/assets/posts/startQGIS/naturalEarthCultural.png)

3.  「Download countries」をクリックして shape ファイルをダウンロードする

## 日本の行政界データ

1.  国土数値情報ダウンロードサイト[^3]にアクセス

2.  「行政区域データ」→「国土数値情報ダウンロードサービスデータのダウンロード」を選択してダウンロード（種類はどれでも良いですが、ここでは全国データを扱います。）

![](/assets/posts/startQGIS/nlTop.png)

![](/assets/posts/startQGIS/nlDownload.png)

# 基本的なハンズオン

QGIS の基本操作をいくつか試してみます。

## ハンズオン 1: 世界地図の表示

### データの読み込み・地図の表示

1. QGIS を起動

2. 「レイヤー」メニュー →「データソースマネージャ」→「ベクタ」

3. ダウンロードした Natural Earth の shape ファイル（.shp）を選択

4. 「追加」をクリック

![](/assets/posts/startQGIS/worldshp.png)

すると、地図キャンバスに世界地図が表示されます。

![](/assets/posts/startQGIS/worldMap.png)

### データの確認

「レイヤ」メニューから「属性テーブルを開く」を選択すると、各国の名前や人口などの属性データを確認できます。

![](/assets/posts/startQGIS/countryData.png)

## ハンズオン 2: 日本地図の作成と色分け

### 日本の行政界データ読み込み

前回と同様にベクタレイヤーでダウンロードした日本の都道府県データを読み込みます。

![](/assets/posts/startQGIS/japanshp.png)

すると、日本列島が表示されます。

![](/assets/posts/startQGIS/japanMap.png)

次に、こちらを色分け表示してみましょう。

都道府県レイヤーを右クリック →「プロパティ」

![](/assets/posts/startQGIS/japanProperty.png)

「シンボロジー」タブを選択

「カテゴリ値による定義」に設定し、「値」を「N03_001」などに変更

「分類」ボタンをクリック

カラーランプを選択して「OK」

![](/assets/posts/startQGIS/japanColorConfig.png)

すると色分けされて表示されます。

![](/assets/posts/startQGIS/japanColored.png)

次に、地図上にラベルを表示してみましょう。

同じプロパティ画面で「ラベル」タブを選択

ラベルの表示を「単一定義」に変更

「ラベルに使用する値」で N03_004(市町村名)を選択

フォントサイズや色を調整して「OK」

![](/assets/posts/startQGIS/labelConfig.png)

すると、地図上に市町村名のラベルが表示されます。

![](/assets/posts/startQGIS/municipalLabel.png)

## ハンズオン 3: 距離・面積の計測

次は距離の計測をしてみます。

「ビュー」 →「計測」→「線の長さを測る」

地図上で開始点をクリック

測定したい経路に沿ってクリックを続ける

右クリックで測定終了

すると結果がキロメートル単位で表示されます。

![](/assets/posts/startQGIS/distance.png)

面積の計測は以下のとおりです。

「ビュー」 →「計測」→「面積を測る」

測定したいエリアの境界をクリックしていく

開始点に戻って右クリック

すると面積が平方キロメートル単位で表示されます。

![](/assets/posts/startQGIS/area.png)

## ハンズオン 4: 地図のエクスポート

画像として保存してみます。

「プロジェクト」→「インポート/エクスポート」→「地図を画像にエクスポート」

各設定をし、出力先、ファイル名、解像度、形式（PNG、JPEG など）を選択して、「保存」をクリック

するとエクスポートされます。

![](/assets/posts/startQGIS/qgisExport.png)

---

今回は QGIS を使って、以下の基本操作を試しました。

- 外部データの読み込みと表示
- 行政界データの色分け・ラベル付与
- 距離・面積の計測
- 地図のエクスポート

簡単な例ではありますが、QGIS で「地理情報を可視化・加工する流れ」を体験できました。

次回は空間解析やプラグインを利用したより高度な分析にも挑戦してみたいと思います。

---

[^1]: [QGIS](https://qgis.org/)
[^2]: [Natural Earth](https://www.naturalearthdata.com/)
[^3]: [国土数値情報ダウンロードサイト](https://nlftp.mlit.go.jp/)
