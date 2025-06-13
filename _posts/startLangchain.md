---
title: "LangChainを使って簡単なチャットシステムを作ってみた"
excerpt: "PythonでLangChain・OpenAI APIを利用してチャットシステムを作るハンズオン"
coverImage: "/assets/posts/startLangchain/langchain.png"
date: '2025-06-14T00:26:35.000Z'
updatedAt: '2025-06-14T00:26:35.000Z'
tag: ["生成AI", "Python"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

会社が AI の知識をつけろと従業員に言っているのもあり、AI エージェントの作成やら LLM など AI に関して何か始めてみようかと思っていた。

最近聞いたのが LangChain というもので、これについて学んでみたいと思っていたが何なのかすらもわかってない状況であったため調査してみた。

今回は Langchain が何なのかという概要や紹介、また Langchain を利用して簡単な個人用のチャットシステムを作ってみたのでここに記載する。

# LangChain とは？

LangChain[^1]は、大規模言語モデル（LLM）を活用したアプリケーション開発を効率的に実装するためのフレームワークである。OpenAI の GPT や Anthropic の Claude など様々な LLM を統一的なインターフェースで扱えるように設計されており、複雑な AI アプリケーションを効率的に構築できる。

従来、LLM を使ったアプリケーションを作るには、各モデルの API の仕様を個別に学習し、プロンプトの管理やデータの前処理、外部システムとの連携などを一から実装する必要があったが、LangChain はこれらの煩雑な作業を抽象化し、開発者がビジネスロジックに集中できる環境を提供できるようになった。

# Langchain の機能

主な機能を以下に記載する。

## 1. モデル統合（Model I/O）

異なる LLM プロバイダーを統一インターフェースで利用可能。OpenAI から Claude、オープンソースモデルまで、コードを大きく変更することなく切り替え可能となる。

## 2. プロンプトテンプレート

動的なプロンプト生成を支援する。変数を含むテンプレートを作成し、実行時に値を注入してプロンプトを生成できる。

## 3. チェーン機能

複数の処理を連結して複雑なワークフローを構築できる。例えば「文書を要約 → 翻訳 → 感情分析」といった一連の処理を簡潔に記述できる。

## 4. エージェント機能

LLM が自律的に判断し、外部ツールを使いながら問題解決するエージェントを構築できる。

## 5. メモリ機能

会話履歴や前回の処理結果を記憶し、文脈を保持した対話が可能となる。

# 開発環境の準備

今回は、Langchain を使って個人用のチャットシステムを作成してみたので、それについてを記載してみた。

まずは、利用するための環境を準備する。

なお、今回の開発言語は最もドキュメント・サンプル[^2]が充実している python で行った。

## バージョン情報

今回使用した各モジュールのバージョンは以下となる。

```plaintext
Python:3.8.20

langchain==0.2.17
langchain-community==0.2.19
langchain-core==0.2.43
langchain-openai==0.1.25
openai==1.82.1
```

## python 仮想環境作成

まずは、Langchain 用のプロジェクトを作成し、移動する。

（以下の langchain-test は各自好きな名前に置き換えること）

```bash
mkdir langchain-test
cd langchain-test
```

次に、python の仮想環境を作成する。

```bash
python3 -m venv venv
```

- これで `venv/`ディレクトリが作成され、ここにパッケージがインストールされるようになる。
- Node.js で言えば、`node_modules`に相当。

次に、仮想環境を有効化する。

```bash
source venv/bin/activate
```

次にパッケージをインストールする。

今回は OpenAI API を利用するので openai をインストールするが、他のモデルを利用したい場合はそちらを利用すること。

```bash
pip install langchain langchain-community python-dotenv langchain-openai openai
```

そして、requirements.txt に依存パッケージを記録する。

```bash
pip freeze > requirements.txt
```

これにより、後から他の環境で同じ依存を再現できる。

## OpenAI での API キー設定

言語モデルは複数あり、どれを選択しても良いが、今回は`openai`を利用する。

OpenAI API を使うためには「API キー」と呼ばれる秘密の文字列（トークン）が必要になる。これは OpenAI のサービスを認証・利用するためのパスワードのようなものである。以下で順を追って説明する。

### OpenAI API キーとは

OpenAPI API キーとは、 OpenAI のサーバーに「誰がリクエスト（問い合わせ）を送ってきているか」を証明するためのトークンである。

API キーがないと、OpenAI のモデル（GPT-4 など）を呼び出せないので注意。

API キーは “sk-…” のような文字列で、漏れると第三者があなたのアカウント枠を使って課金されるリスクがあります。

API キーは、OpenAI の公式サイト（[https://platform.openai.com/）](https://platform.openai.com/%EF%BC%89)  にサインアップ（またはログイン）して、ダッシュボードから発行します。

### OpenAI のアカウント作成／ログイン

ブラウザで https://platform.openai.com/ にアクセス。

まだアカウントを持っていなければ「Sign up」→ メールアドレス・パスワードを登録する。

すでにアカウントを持っていれば「Log in」してログイン。

![](/assets/posts/startLangchain/openai01.png)

**ダッシュボードの「API Keys」ページへ移動する。**

ログイン後、画面左のサイドバーに「API keys」という項目があるのでクリック。（見つからない場合は、Search から探す）

「Create new secret key」ボタン（または同等のリンク）をクリック。

![](/assets/posts/startLangchain/openai02.png)

**新しい API キーを発行**

表示されたダイアログで適当な名前を付け（例： `langchain-project`）、キーを作成。

![](/assets/posts/startLangchain/openai03.png)

すると画面に文字列が表示される（`sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` のような長い文字列）ので、それをコピー。

（一度しか表示されないので、このとき必ずどこか安全な場所（パスワード管理ツールやテキストファイルなど）に控えてください。）

# チャットシステム作成

では、実際にチャットシステムのスクリプトを作成していきましょう。

## .env ファイルの作成

まずはスクリプトで利用する環境変数を設定するファイルを、ルートディレクトリに作成します。

そこに、先ほど作成・設定した OpenAI の API キーを設定します。

```bash
# .env
OPENAI_API_KEY=sk-XXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

なお git を利用している場合はこの`.env`ファイルは上げないこと。（API キーなど秘密情報を書くことが多いため）

そのため、以下を .gitignore に追加する。

```plaintext
.env
```

## チャットボット用スクリプトの作成

以下にチャットボット本体のスクリプトを記載する。（app.py）

```python
import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.schema import HumanMessage, AIMessage
from langchain.schema.runnable import RunnableLambda
from langchain.memory import ConversationBufferMemory
from typing import Dict, Any

# 環境変数の読み込み
load_dotenv()

class SimpleChatSystem:
    def __init__(self):
        # OpenAI APIキーの設定（ChatOpenAIを使用）
        self.llm = ChatOpenAI(
            model="gpt-3.5-turbo",
            temperature=0.7,  # 創造性のレベル（0-1）
            openai_api_key=os.getenv("OPENAI_API_KEY")
        )

        # チャットプロンプトテンプレートの定義
        self.prompt_template = ChatPromptTemplate.from_messages([
            ("system", "あなたは親切なAIアシスタントです。質問に日本語で丁寧に答えてください。"),
            ("human", """
            質問: {question}

            追加情報: {context}

            以下の会話履歴も考慮してください:
            {chat_history}
            """)
        ])

        # メモリの設定（会話履歴を保持）
        self.memory = ConversationBufferMemory(
            memory_key="chat_history",
            return_messages=True
        )

        # RunnableSequence（LCEL）でチェーンを作成
        self.qa_chain = self._create_chain()

    def _create_chain(self):
        """RunnableSequenceでチェーンを作成"""
        def format_chat_history(messages):
            """メッセージ履歴を文字列に変換"""
            if not messages:
                return "会話履歴はありません。"

            formatted_history = []
            for msg in messages[-6:]:  # 直近6件のメッセージのみ
                if hasattr(msg, 'type'):
                    role = "ユーザー" if msg.type == "human" else "アシスタント"
                    formatted_history.append(f"{role}: {msg.content}")
            return "\n".join(formatted_history)

        def get_memory_variables(inputs: Dict[str, Any]) -> Dict[str, Any]:
            """メモリから会話履歴を取得"""
            chat_history = self.memory.chat_memory.messages
            inputs["chat_history"] = format_chat_history(chat_history)
            return inputs

        # RunnableSequenceの構築
        chain = (
            RunnableLambda(get_memory_variables)  # メモリから履歴を取得
            | self.prompt_template  # プロンプトテンプレートを適用
            | self.llm  # LLMで処理
            | RunnableLambda(self._save_to_memory)  # メモリに保存
        )

        return chain

    def _save_to_memory(self, ai_message):
        """AIの回答をメモリに保存"""
        # 直前の入力（質問）もメモリに保存する必要がある場合はここで処理
        return ai_message.content

    def ask_question(self, question: str, context: str = "特になし") -> str:
        """質問を処理して回答を返す"""
        try:
            # 人間の質問をメモリに保存
            self.memory.chat_memory.add_message(HumanMessage(content=question))

            # チェーンを実行
            response = self.qa_chain.invoke({
                "question": question,
                "context": context
            })

            # AIの回答をメモリに保存
            self.memory.chat_memory.add_message(AIMessage(content=response))

            return response.strip()
        except Exception as e:
            return f"エラーが発生しました: {str(e)}"

    def get_conversation_history(self):
        """会話履歴を取得"""
        return self.memory.chat_memory.messages

# 使用例
def main():
    # .envファイルにOPENAI_API_KEY=your_api_keyを設定してください
    if os.environ.get("OPENAI_API_KEY") is None:
        raise RuntimeError("環境変数 OPENAI_API_KEY が設定されていません。")

    qa_system = SimpleChatSystem()

    print("=== LangChain QAシステム ===")
    print("質問を入力してください（'quit'で終了）")

    while True:
        question = input("\n質問: ")
        if question.lower() == 'quit':
            break

        # 追加のコンテキストがあれば指定
        context = input("追加情報（なければEnter）: ")
        if not context:
            context = "特になし"

        # 質問を処理
        answer = qa_system.ask_question(question, context)
        print(f"\n回答: {answer}")

        # 会話履歴の表示（オプション）
        show_history = input("\n会話履歴を表示しますか？ (y/n): ")
        if show_history.lower() == 'y':
            history = qa_system.get_conversation_history()
            print("\n=== 会話履歴 ===")
            for i, message in enumerate(history):
                print(f"{i+1}. {message.content}")

if __name__ == "__main__":
    main()
```

※OpenAI API は無料枠が限られており、一定のリクエスト回数を超えると有料での利用が必要になるので注意。

スクリプト中で利用しているプロンプトを変えたい場合は適宜調整してください。

## 実行

実行した例を以下に示す。

なお、追加情報には、質問する際に補足する情報などがある場合入力します。

```bash
$ python app.py
=== LangChain QAシステム ===
質問を入力してください（'quit'で終了）

質問: 日本の首都はどこですか
追加情報（なければEnter）:

回答: 日本の首都は東京です。

会話履歴を表示しますか？ (y/n): n

質問: 首都を移転するとしたらどこがいいですか
追加情報（なければEnter）: 日本国内でお願いします。

回答: 日本の首都を移転する場合、地理的に中央に位置する名古屋や大阪などが考えられるかもしれませんが、現在の日本の首都である東京は政治、経済、文化の中心地として機能しており、首都を移転することには様々な課題が伴う可能性があります。そのため、首都を移転する必要性やメリットをよく検討する必要があるでしょう。

会話履歴を表示しますか？ (y/n): y

=== 会話履歴 ===
1. 日本の首都はどこですか
2. 日本の首都は東京です。
3. 首都を移転するとしたらどこがいいですか
4. 日本の首都を移転する場合、地理的に中央に位置する名古屋や大阪などが考えられるかもしれませんが、現在の日本の首都である東京は政治、経済、文化の中心地として機能しており、首都を移転することには様々な課題が伴う可能性があります。そのため、首都を移転する必要性やメリットをよく検討する必要があるでしょう。


質問: quit
(venv) (3.8.20) $
```

この通りで、Langchain を使い個人用のチャットシステムを作ることができました。

ただし前述の通りで、OpenAI API の利用には無料枠による制限、有料時は利用するごとに課金がされるので、利用量を考慮の上実行してください。

と言うような感じで今回は Langchain によるチャットシステムの作成を行ってみましたが、ここで使用したもの以外にも他のモデルを利用したりするなどといった機能も満載なので、今後も何か試していきたい。

---

[^1]: [LangChain 公式サイト](https://langchain.com/)
[^2]: [LangChain Python API Reference](https://python.langchain.com/api_reference/)
