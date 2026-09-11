#!/bin/bash

# pre-commit フック用
#
# _posts 配下の .md ファイル:
#   コミットごとに、origin/main に存在するかどうかで date/updatedAt を
#   「コミットを実行したその時刻」でスタンプする。
#     - origin/main に存在しない（未公開）-> date, updatedAt を両方更新
#     - origin/main に存在する（公開済み）  -> updatedAt のみ更新
#
# それ以外の .md ファイル:
#   実ファイルの更新日時（mtime）とフロントマターの updatedAt の値が
#   異なる場合のみ、updatedAt をmtimeで上書きする。新規追加ファイルは
#   date も同様に更新する。

# 実行した場所のパスを記憶
PWD_DIR=${PWD}

# このシェルのあるパスへ移動
APP_DIR=$(dirname $0)
cd ${APP_DIR}

# ルートディレクトリへ移動
cd ../

# コミットを実行した「その時刻」
NOW=$(date "+%Y-%m-%dT%H:%M:%S.000Z")

# origin/main が参照可能かどうか（未fetch環境等への保険）
has_origin_main=false
git rev-parse --verify -q origin/main >/dev/null 2>&1 && has_origin_main=true

# _posts 配下の .md ファイル（追加・変更・リネーム等。削除は対象外）
posts_files=$(git diff --cached --diff-filter=ACMRT --name-only -- '_posts/*.md')

if [[ -n "${posts_files}" ]]; then
    while IFS= read -r file; do
        [ -f "${file}" ] || continue
        grep -q '^updatedAt:' "${file}" || continue

        if [ "${has_origin_main}" = "true" ] && git cat-file -e "origin/main:${file}" 2>/dev/null; then
            # origin/main に既に存在する = 公開済み記事 -> updatedAt のみ更新
            sed -i '' "s/^updatedAt:.*/updatedAt: '${NOW}'/g" "${file}"
            echo "updatedAt updated (published): ${file} (${NOW})"
        else
            # origin/main にまだ存在しない = 未公開記事 -> date, updatedAt 両方更新
            sed -i '' "s/^date:.*/date: '${NOW}'/g" "${file}"
            sed -i '' "s/^updatedAt:.*/updatedAt: '${NOW}'/g" "${file}"
            echo "date/updatedAt updated (unpublished): ${file} (${NOW})"
        fi
        git add "${file}"
    done <<< "${posts_files}"
fi

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

# 対象ファイル1件を処理する（_posts 以外の .md 向け、mtimeベース）
# $1: ファイルパス, $2: dateフィールドも更新するか(true/false)
update_file_by_mtime() {
    local file="$1"
    local update_date_field="$2"

    [ -f "${file}" ] || return

    local mod_time
    mod_time=$(get_mod_time "${file}")

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

# 新規追加された .md ファイル（_posts以外、date, updatedAt 両方更新）
git diff --cached --diff-filter=A --name-only -- '*.md' ':(exclude)_posts/*.md' | while IFS= read -r file; do
    [ -n "${file}" ] && update_file_by_mtime "${file}" true
done

# 既存の .md ファイルの変更（_posts以外、updatedAt のみ更新）
git diff --cached --diff-filter=MCRT --name-only -- '*.md' ':(exclude)_posts/*.md' | while IFS= read -r file; do
    [ -n "${file}" ] && update_file_by_mtime "${file}" false
done

cd ${PWD_DIR}
exit 0
