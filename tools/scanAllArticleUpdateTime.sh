#!/bin/bash

# 関数定義
# OSに応じたstatコマンドのフォーマットを選択
if stat --version &>/dev/null; then
    # GNU coreutils (Linux)
    get_mod_time() {
        stat --format='%y' "$1" | awk '{print $1"T"$2".000Z"}'
    }
else
    # BSD stat (macOS)
    get_mod_time() {
        stat -f "%Sm" -t "%Y-%m-%dT%H:%M:%S.000Z" "$1"
    }
fi

# 実行した場所のパスを記憶
PWD_DIR=${PWD}

# このシェルのあるパスへ移動
APP_DIR=$(dirname $0)
cd ${APP_DIR}

# まず_notesへ移動
cd ../_notes

# 次に_postsへ移動
cd ../_posts

# 現在のディレクトリ以下の全ての `.md` ファイルを検索して処理
find . -type f -name "*.md" | while read -r file; do
    # 更新時刻を取得（フォーマット: YYYY-MM-DD HH:MM:SS）
    mod_time=$(get_mod_time "$file")

    # ファイルの末尾に追加
    echo -e "\n--- Updated at: $mod_time --- $file"
    # echo -e "\n--- Updated at: $mod_time ---" >> "$file"

    # echo "Updated timestamp added to: $file"
done

cd $PWD
