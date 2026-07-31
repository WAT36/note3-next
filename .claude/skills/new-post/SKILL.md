---
name: new-post
description: 新しいブログ記事のMarkdownテンプレートを作成します。tools/note_template/makeNotesTemplate.sh を実行し、Front Matter付きの.mdファイルを_posts/ディレクトリに配置します。新しい記事を書き始めるときに使用します。
argument-hint: "[記事のファイル名（拡張子不要。省略時はタイトルを尋ねます）]"
disable-model-invocation: true
allowed-tools:
- Bash
- Read
---

# New Post

新しいブログ記事用のテンプレートファイルを作成します。

## ファイル名の決定

`$ARGUMENTS` にファイル名が渡されている場合はそれを使用してください。

渡されていない場合は、ユーザーに記事のファイル名（拡張子は不要、キャメルケース推奨。例: `useEffectDeepDive`）を尋ねてから進めてください。

## 事前確認

`_posts/<ファイル名>.md` が既に存在する場合、テンプレート作成スクリプトは中身を上書きしてしまいます。実行前に以下で存在確認をしてください。

```bash
ls _posts/<ファイル名>.md
```

既に存在する場合は上書きしてよいかユーザーに確認し、承諾が得られない限り実行しないでください。

## テンプレートの作成

リポジトリのルートから、以下のコマンドを実行してください（`--post` オプションにより作成後に自動で `_posts/` へ移動されます）。

```bash
tools/note_template/makeNotesTemplate.sh "<ファイル名>" --post
```

## 完了報告

実行後、`_posts/<ファイル名>.md` が作成されたことを確認し、Front Matterの各項目（`title`, `excerpt`, `coverImage`, `tag`, `ogImage.url` など）がまだ空欄であることをユーザーに伝えてください。あわせて、次にユーザーが行うべきこと（タイトルや概要の記入など）を簡潔に案内してください。
