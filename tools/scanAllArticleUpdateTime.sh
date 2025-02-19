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

# ルートディレクトリへ移動
cd ../

# 前回のgit pushから変更のあった全ての `.md` ファイルを検索して処理
count=0
git log --diff-filter=ACMRT --name-status --pretty=format: $(git rev-parse @{push})..HEAD | awk '$1 != "D" {print $NF}' | grep -E '.md$' | sort | uniq | while read -r file; do
    # 更新時刻を取得（フォーマット: YYYY-MM-DD HH:MM:SS）
    mod_time=$(get_mod_time "$file")

    # ファイルからupdatedAtを取得
    file_time=$(grep 'updatedAt:' "$file" | grep -oE '[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.000Z')

    # ファイルの末尾に追加
    if [[ "$file_time" = "" ]]; then
        # たまにあるが updatedAtないファイルは更新しない
        echo -e "updatedAt none. $file"
    elif [[ "$mod_time" != "$file_time" ]]; then
        sed -i '' "s/updatedAt:.*/updatedAt: '${mod_time}'/g" $file
        ((count++))
    fi
done

# Git に追加 & コミット & プッシュ
git add .
git commit -m "Update updatedAt: ${count} files."

cd $PWD
