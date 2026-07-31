#!/bin/bash

# 現在のブランチ名を取得
current_branch=$(git rev-parse --abbrev-ref HEAD)

# 現在のブランチが develop 以外なら更新は行わない（終了）
if [[ "$current_branch" != "develop" ]]; then
    echo "現在のブランチは '$current_branch' です。'develop' ブランチでないため処理を終了します。"
    exit 1 # スクリプト終了（エラーコード 0）
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

# _posts の date, updatedAt スタンプは tools/stampFirstPushArticleDate.sh が担当する

# インデックスとHEADに実際の差分があるかどうかで判定する
# （git status全体を見ると、このスクリプトと無関係な未コミット変更まで
#   拾ってしまい、ステージされていないのにcommitを試みてエラーになるため）
if ! git diff --cached --quiet; then
    git commit -m "Update updatedAt files.(更新ファイルの日付を更新しました。再プッシュしてください。)"
    cd $PWD_DIR
    exit 1
else
    echo "変更はありません。"
fi

cd $PWD_DIR
exit 0
