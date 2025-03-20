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
# 追加した.mdファイルに対し date,updatedAtを更新
count=0
git log --diff-filter=A --name-status --pretty=format: $(git rev-parse @{push})..HEAD | awk '$1 != "D" {print $NF}' | grep -E '.md$' | sort | uniq | while read -r file; do
    # 更新時刻を取得（フォーマット: YYYY-MM-DD HH:MM:SS）
    mod_time=$(get_mod_time "$file")

    # ファイルからupdatedAtを取得
    file_time=$(grep 'updatedAt:' "$file" | grep -oE '[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.000Z')

    # YYYY-MM-DD の部分だけを抽出
    mod_day=$(echo "$mod_time" | cut -d 'T' -f 1)
    file_day=$(echo "$file_time" | cut -d 'T' -f 1)

    # .mdファイルの更新時刻更新
    if [[ "$file_time" = "" ]]; then
        # たまにあるが updatedAtないファイルは更新しない
        echo -e "updatedAt none. $file"
    elif [[ "$mod_day" != "$file_day" ]]; then
        # 作成時刻、更新時刻を更新
        sed -i '' "s/date:.*/date: '${mod_time}'/g" $file
        sed -i '' "s/updatedAt:.*/updatedAt: '${mod_time}'/g" $file
        ((count++))
    fi
done

# 更新した.mdファイルに対し updatedAtを更新
git log --diff-filter=CMRT --name-status --pretty=format: $(git rev-parse @{push})..HEAD | awk '$1 != "D" {print $NF}' | grep -E '.md$' | sort | uniq | while read -r file; do
    # 更新時刻を取得（フォーマット: YYYY-MM-DD HH:MM:SS）
    mod_time=$(get_mod_time "$file")

    # ファイルからupdatedAtを取得
    file_time=$(grep 'updatedAt:' "$file" | grep -oE '[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.000Z')

    # YYYY-MM-DD の部分だけを抽出
    mod_day=$(echo "$mod_time" | cut -d 'T' -f 1)
    file_day=$(echo "$file_time" | cut -d 'T' -f 1)

    # .mdファイルの更新時刻更新
    if [[ "$file_time" = "" ]]; then
        # たまにあるが updatedAtないファイルは更新しない
        echo -e "updatedAt none. $file"
    elif [[ "$mod_day" != "$file_day" ]]; then
        sed -i '' "s/updatedAt:.*/updatedAt: '${mod_time}'/g" $file
        ((count++))
    fi
done

# git status でワーキングツリーの変更を取得
status=$(git status --porcelain)

# 変更があるかチェック（ステージされていないファイルがあるかどうか）
if [[ -n "$status" ]]; then
    git add *.md
    git commit -m "Update updatedAt files.(更新ファイルの日付を更新しました。再プッシュしてください。)"
    cd $PWD
    exit 1
else
    echo "変更はありません。"
fi

cd $PWD
exit 0
