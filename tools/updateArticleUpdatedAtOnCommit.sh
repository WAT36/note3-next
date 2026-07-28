#!/bin/bash

# pre-commit フック用
# ステージされた .md ファイルについて、実ファイルの更新日時（mtime）と
# フロントマターの updatedAt の値が異なる場合、updatedAt をmtimeで上書きし
# コミットに含める。新規追加ファイルは date も同様に更新する。

# 実行した場所のパスを記憶
PWD_DIR=${PWD}

# このシェルのあるパスへ移動
APP_DIR=$(dirname $0)
cd ${APP_DIR}

# ルートディレクトリへ移動
cd ../

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

# 対象ファイル1件を処理する
# $1: ファイルパス, $2: dateフィールドも更新するか(true/false)
update_file() {
    local file="$1"
    local update_date_field="$2"

    [ -f "${file}" ] || return

    # 実ファイルの更新日時を取得
    local mod_time
    mod_time=$(get_mod_time "${file}")

    # フロントマターの updatedAt を取得（先頭一致の行のみ対象）
    local file_time
    file_time=$(grep -m 1 '^updatedAt:' "${file}" | grep -oE '[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}Z')

    if [ -z "${file_time}" ]; then
        # updatedAt が無いファイル（README等）は対象外
        return
    fi

    if [ "${mod_time}" != "${file_time}" ]; then
        sed -i '' "s/^updatedAt:.*/updatedAt: '${mod_time}'/g" "${file}"
        if [ "${update_date_field}" = "true" ]; then
            sed -i '' "s/^date:.*/date: '${mod_time}'/g" "${file}"
        fi
        git add "${file}"
        echo "updatedAt updated: ${file} (${mod_time})"
    fi
}

# 新規追加された .md ファイル（date, updatedAt 両方更新）
git diff --cached --diff-filter=A --name-only -- '*.md' | while IFS= read -r file; do
    [ -n "${file}" ] && update_file "${file}" true
done

# 既存の .md ファイルの変更（updatedAt のみ更新）
git diff --cached --diff-filter=MCRT --name-only -- '*.md' | while IFS= read -r file; do
    [ -n "${file}" ] && update_file "${file}" false
done

cd ${PWD_DIR}
exit 0
