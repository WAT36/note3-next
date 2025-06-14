#!/bin/bash

# 現在のブランチ名を取得
current_branch=$(git rev-parse --abbrev-ref HEAD)

# 現在のブランチが develop 以外なら更新は行わない（終了）
if [[ "$current_branch" != "develop" ]]; then
    echo "現在のブランチは '$current_branch' です。'develop' ブランチでないため処理を終了します。"
    exit 1 # スクリプト終了（エラーコード 0）
fi

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

# 更新mdファイルがある場合は最終更新日時コンポーネントを更新する
if [[ -n "$(git log --diff-filter=ACMRT --name-status --pretty=format: $(git rev-parse @{push})..HEAD | awk '$1 != "D" {print $NF}' | grep -E '.md$')" ]]; then
    # 変更があるときだけ処理する
    # 現在日時を YYYY/MM/DD 形式で取得
    today=$(date "+%Y-%m-%d")
    # LastUpdatedDate.tsx の該当部分を書き換え（直接上書き）
    sed -i "" "s/Last Updated: [0-9]\{4\}\-[0-9]\{2\}\-[0-9]\{2\}/Last Updated: $today/" src/components/ui-elements/lastUpdatedDate/LastUpdatedDate.tsx
    # git add
    git add src/components/ui-elements/lastUpdatedDate/LastUpdatedDate.tsx
fi

# 前回のgit pushから変更のあった全ての `.md` ファイルを検索して処理
# 追加した.mdファイルに対し date,updatedAtを更新
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
        git add $file
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
        git add $file
    fi
done

# git status でワーキングツリーの変更を取得
status=$(git status --porcelain)

# 変更があるかチェック（ステージされていないファイルがあるかどうか）
if [[ -n "$status" ]]; then
    git commit -m "Update updatedAt files.(更新ファイルの日付を更新しました。再プッシュしてください。)"
    cd $PWD
    exit 1
else
    echo "変更はありません。"
fi

cd $PWD
exit 0
