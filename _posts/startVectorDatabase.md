---
title: "ベクトルデータベース（chroma）を利用してみる"
excerpt: ""
coverImage: "/assets/posts/startVectorDatabase/vectorDb.png"
date: '2025-11-30T00:56:53.000Z'
updatedAt: '2025-11-30T00:56:53.000Z'
tag: ["AI"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

生成 AI アプリケーションを開発する上で、必ず登場するのが「ベクトルデータベース」です。

RAG などの実装には必須の技術ですが、実際に触ってみないと理解しにくい部分もあります。

そこで今回は、ベクトルデータベースの基礎概念の解説から、Chroma を使った実践的な類似文書検索のハンズオンまでまとめて紹介します。

# ベクトルデータベースとは

ベクトルデータベースは、ベクトル(多次元の数値配列)を効率的に保存・検索するために最適化されたデータベースです。

通常のデータベース(MySQL や PostgreSQL など)が「完全一致」や「範囲検索」を得意とするのに対し、ベクトルデータベースは**「類似度検索」**に特化しています。

## なぜ生成 AI に必要なのか?

生成 AI の世界では、テキスト、画像、音声などのデータを「埋め込み(Embedding)」と呼ばれるベクトルに変換します。例えば、OpenAI の text-embedding-3-small モデルは、テキストを 1536 次元のベクトルに変換します。

```
"猫が好きです" → [0.023, -0.891, 0.445, ..., 0.123] (1536個の数値)
"犬が好きです" → [0.019, -0.876, 0.438, ..., 0.119] (1536個の数値)
```

この 2 つのベクトルは意味が似ているため、ベクトル空間上で近い位置に配置されます。ベクトルデータベースは、この「近さ」を高速に見つけ出すことができます。

## ベクトルデータベースの主な特徴

### 1. 類似度検索の高速化

数百万、数千万件のベクトルの中から、クエリベクトルに最も近いベクトルを瞬時に見つけ出します。これを実現するために、ANN(Approximate Nearest Neighbor)アルゴリズムが使われています。

### 2. RAG(Retrieval-Augmented Generation)の実現

生成 AI の代表的な応用パターンである RAG では、ベクトルデータベースが中核を担います。ユーザーの質問に関連する情報をベクトルデータベースから取得し、それをコンテキストとして LLM に渡すことで、より正確で具体的な回答を生成できます。

### 3. メタデータフィルタリング

ベクトル検索と同時に、日付、カテゴリ、タグなどのメタデータでフィルタリングできます。例えば「2024 年以降の記事で、AI に関連するもの」といった条件を組み合わせた検索が可能です。

### 4. スケーラビリティ

クラウドベースのベクトルデータベースは、データ量の増加に応じて自動的にスケールします。

## 主なベクトルデータベース製品

調べたところ、以下のような製品があるようです。

- **Pinecone**: フルマネージド型で使いやすい
- **Weaviate**: オープンソースでセマンティック検索に強い
- **Chroma**: 軽量でローカル開発に最適
- **Qdrant**: 高性能でフィルタリング機能が豊富
- **Milvus**: エンタープライズ向けのスケーラビリティ

今回のハンズオンでは、シンプルで使いやすい**Chroma**[^1]を使用してみます。

# ハンズオン:ベクトルデータベースを使った類似文書検索システムを作る

実際にベクトルデータベースを使って、文書の類似度検索システムを構築してみましょう。

今回のハンズオンでは

- Chroma 環境構築
- 文書登録
- 類似検索
- OpenAI Embedding を使った高精度検索

を行います。

## 実施環境

今回は以下の環境を利用します。

- **OS**:mac OS 10.15 以降
- **Python**: バージョン 3.10.19
- **OpenAI API キー**: OpenAI の Embedding API と GPT モデルを使用します
  - 事前に OpenAI アカウント[^2]と API キー[^3]を作成して下さい
  - 注意: API の使用には料金がかかります。

## 環境構築手順

まずは、今回のハンズオンを実施するための環境を作成しましょう。

### プロジェクトディレクトリの作成

今回のプロジェクトのディレクトリを作成し、移動します。

```bash
mkdir vector-db-tutorial
cd vector-db-tutorial
```

### 仮想環境の作成と有効化

今回のプロジェクト用の仮想環境を作成します。

```bash
python3 -m venv venv
source venv/bin/activate
```

仮想環境が有効化されると、プロンプトの先頭に`(venv)`が表示されます。

### 必要なライブラリのインストール

必要なライブラリをインストールします。

```bash
pip install --upgrade pip
pip install chromadb openai python-dotenv
```

各ライブラリのバージョン情報(2025 年 11 月時点):

- chromadb: 0.4.x 以降
- openai: 1.0.x 以降
- python-dotenv: 1.0.x 以降

実行したら、インストールされたか確認してみましょう。

```bash
pip list | grep -E "chromadb|openai|python-dotenv"
```

以下のような出力であればインストールはされています。

```plaintext
chromadb                                 0.5.23
openai                                   2.2.0
python-dotenv                            1.0.1
```

### 環境変数ファイルの作成

プロジェクトディレクトリに`.env`ファイルを作成し、OpenAI API キーを設定します。

**.env ファイルの内容:**

```yaml
OPENAI_API_KEY=your_api_key_here
```

**注意事項:**

- `your_api_key_here`を実際の API キーに置き換えてください
- `.env`ファイルは`.gitignore`に追加して、Git リポジトリにコミットしないようにしましょう

**.gitignore ファイルの内容例:**

```
venv/
.env
__pycache__/
*.pyc
```

### 動作確認用スクリプト

環境が正しくセットアップされているか確認するため、以下のスクリプトを`test_setup.py`として保存して実行してみましょう。

python

```python
import sys
print(f"Python version: {sys.version}")

try:
    import chromadb
    print(f"✓ chromadb: {chromadb.__version__}")
except ImportError as e:
    print(f"✗ chromadb: Not installed ({e})")

try:
    import openai
    print(f"✓ openai: {openai.__version__}")
except ImportError as e:
    print(f"✗ openai: Not installed ({e})")

try:
    import dotenv
    print(f"✓ python-dotenv: installed")
except ImportError as e:
    print(f"✗ python-dotenv: Not installed ({e})")

try:
    from dotenv import load_dotenv
    import os
    load_dotenv()
    api_key = os.getenv("OPENAI_API_KEY")
    if api_key:
        print(f"✓ OPENAI_API_KEY: Found (length: {len(api_key)})")
    else:
        print("✗ OPENAI_API_KEY: Not found in .env file")
except Exception as e:
    print(f"✗ Error loading .env: {e}")

print("\nSetup check complete!")
```

実行方法

```bash
python test_setup.py
```

すべての項目に ✓ が表示されれば、環境構築は完了です!

```plaintext
✓ chromadb: 1.3.5
✓ openai: 2.8.1
✓ python-dotenv: installed
✓ OPENAI_API_KEY: Found (length: 164)

Setup check complete!
```

---

### Chroma のセットアップと文書の登録

環境構築が完了したら、実際にベクトルデータベースを使ってみましょう。`main.py`というファイルを作成して、以下のコードを記述してください。

```python
import chromadb
from chromadb.config import Settings
import openai
import os
from dotenv import load_dotenv

# 環境変数の読み込み
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

# Chromaクライアントの初期化
client = chromadb.Client(Settings(
    anonymized_telemetry=False
))

# コレクションの作成
collection = client.create_collection(
    name="tech_articles",
    metadata={"description": "技術記事のコレクション"}
)

# サンプル文書データ
documents = [
    "Pythonは機械学習やデータ分析に広く使われるプログラミング言語です",
    "JavaScriptはWebブラウザ上で動作するスクリプト言語で、フロントエンド開発に不可欠です",
    "機械学習では、大量のデータからパターンを学習してモデルを構築します",
    "データベースは構造化されたデータを効率的に管理するためのシステムです",
    "ベクトルデータベースは類似度検索に特化したデータベースで、生成AIと相性が良いです"
]

# 文書IDとメタデータの準備
ids = [f"doc_{i}" for i in range(len(documents))]
metadatas = [
    {"category": "programming", "language": "Python"},
    {"category": "programming", "language": "JavaScript"},
    {"category": "AI", "topic": "machine_learning"},
    {"category": "database", "type": "general"},
    {"category": "database", "type": "vector"}
]

# 文書をコレクションに追加
collection.add(
    documents=documents,
    ids=ids,
    metadatas=metadatas
)

print("文書の登録が完了しました!")
```

実行方法

```bash
python main.py
```

実行結果

```plaintext
文書の登録が完了しました!
```

### 類似文書の検索

では、キーワードを入力して、検索をしてみましょう。

`main.py`に以下のコードを追加します。

ここでは、「AI や機械学習について知りたい」というキーワードで検索します。

通常の検索エンジンと違って、完全一致する単語を探すのではなく、意味が似ている文書を探します。

```python
# クエリ(検索したい内容)
query = "AIや機械学習について知りたい"

# 類似文書の検索(上位3件)
results = collection.query(
    query_texts=[query],
    n_results=3
)

print(f"\n検索クエリ: {query}\n")
print("検索結果:")
print("-" * 50)

for i, (doc, metadata, distance) in enumerate(zip(
    results['documents'][0],
    results['metadatas'][0],
    results['distances'][0]
), 1):
    print(f"\n{i}位 (類似度スコア: {1 - distance:.4f})")
    print(f"文書: {doc}")
    print(f"メタデータ: {metadata}")
```

実行結果（追加分のみ）

```plaintext
検索クエリ: AIや機械学習について知りたい

検索結果:
--------------------------------------------------

1位 (類似度スコア: 0.3100)
文書: 機械学習では、大量のデータからパターンを学習してモデルを構築します
メタデータ: {'topic': 'machine_learning', 'category': 'AI'}

2位 (類似度スコア: 0.2019)
文書: Pythonは機械学習やデータ分析に広く使われるプログラミング言語です
メタデータ: {'category': 'programming', 'language': 'Python'}

3位 (類似度スコア: -0.0539)
文書: データベースは構造化されたデータを効率的に管理するためのシステムです
メタデータ: {'category': 'database', 'type': 'general'}
```

ここでは、登録した 5 つの文書のベクトルと比較して、ベクトル空間上で「距離が近い」ものを上位 3 件取り出して表示しています。

### メタデータフィルタリング付き検索

さらに以下を追加します。

ここでは「プログラミング言語について」という検索をしますが、結果は"programming"カテゴリに絞り込む処理になります。

```python
# カテゴリを指定した検索
query = "プログラミング言語について"

results = collection.query(
    query_texts=[query],
    n_results=2,
    where={"category": "programming"}  # programmingカテゴリのみに絞り込み
)

print(f"\n検索クエリ: {query}")
print("フィルタ条件: category = 'programming'\n")
print("検索結果:")
print("-" * 50)

for i, (doc, metadata) in enumerate(zip(
    results['documents'][0],
    results['metadatas'][0]
), 1):
    print(f"\n{i}位")
    print(f"文書: {doc}")
    print(f"メタデータ: {metadata}")
```

実行結果（追加分のみ）

```plaintext
検索クエリ: プログラミング言語について
フィルタ条件: category = 'programming'

検索結果:
--------------------------------------------------

1位
文書: JavaScriptはWebブラウザ上で動作するスクリプト言語で、フロントエンド開発に不可欠です
メタデータ: {'category': 'programming', 'language': 'JavaScript'}

2位
文書: Pythonは機械学習やデータ分析に広く使われるプログラミング言語です
メタデータ: {'category': 'programming', 'language': 'Python'}
```

### OpenAI の Embedding によるベクトル化と高度な検索

先ほどまでは Chroma が自動的に文章をベクトルに変換していましたが、ここでは OpenAI の**Embedding**という高性能なモデルを使ってベクトル化してみましょう。これにより精度の高い検索ができるようになります。

Embedding は、テキストを数値の配列(ベクトル)に変換する技術です。

```python
# OpenAIのEmbedding関数を定義
def get_embedding(text):
    response = openai.embeddings.create(
        model="text-embedding-3-small",
        input=text
    )
    return response.data[0].embedding

# 新しいコレクションを作成(OpenAIのEmbeddingを使用)
collection_openai = client.create_collection(
    name="tech_articles_openai"
)

# Embeddingを生成して文書を追加
embeddings = [get_embedding(doc) for doc in documents]

collection_openai.add(
    documents=documents,
    embeddings=embeddings,
    ids=ids,
    metadatas=metadatas
)

# クエリのEmbeddingを生成して検索
query = "データを扱う技術について"
query_embedding = get_embedding(query)

results = collection_openai.query(
    query_embeddings=[query_embedding],
    n_results=3
)

print(f"\n検索クエリ: {query}\n")
print("OpenAI Embeddingを使った検索結果:")
print("-" * 50)

for i, (doc, metadata) in enumerate(zip(
    results['documents'][0],
    results['metadatas'][0]
), 1):
    print(f"\n{i}位")
    print(f"文書: {doc}")
    print(f"メタデータ: {metadata}")
```

実行結果（追加分のみ）

```plaintext
検索クエリ: データを扱う技術について

OpenAI Embeddingを使った検索結果:
--------------------------------------------------

1位
文書: データベースは構造化されたデータを効率的に管理するためのシステムです
メタデータ: {'type': 'general', 'category': 'database'}

2位
文書: Pythonは機械学習やデータ分析に広く使われるプログラミング言語です
メタデータ: {'language': 'Python', 'category': 'programming'}

3位
文書: 機械学習では、大量のデータからパターンを学習してモデルを構築します
メタデータ: {'topic': 'machine_learning', 'category': 'AI'}
```

プロトタイプや小規模な程度では Chroma デフォルトで十分ですが、本番環境や高精度が必要な場合は OpenAI Embedding がオススメです。

実際のアプリケーションでは、検索精度が直接ユーザー体験に影響するため、高品質な Embedding モデルを使うことが推奨されます。

---

ベクトルデータベースは、生成 AI システムを構築する上で非常に重要な技術です。

これからベクトルデータベースを使ったプロジェクトに取り組む方は、まず小規模なデータセットで試してみて、徐々にスケールアップしていくことをお勧めします。

Chroma でローカル開発に慣れたら、Pinecone や Weaviate などのクラウドサービスにも挑戦してみたいですね。

---

[^1]: [Chroma](https://www.trychroma.com/)
[^2]: [OpenAI アカウント](https://platform.openai.com/signup)
[^3]: [OpenAI API キーの作成](https://platform.openai.com/api-keys)
