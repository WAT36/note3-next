#!/bin/bash

# ヘルプ表示関数
print_help() {
  echo "Usage: $0 title [--post] [--help]"
  echo
  echo "説明:"
  echo "  Next.js ブログのノート用テンプレート(.md)を作成します。"
  echo
  echo "引数:"
  echo "  title        作成するファイル名(拡張子は自動で .md が付きます)"
  echo
  echo "オプション:"
  echo "  --post       作成したファイルを '_posts' ディレクトリへ移動します"
  echo "  -h, --help   このヘルプを表示します"
}

# 引数確認（第１引数：タイトル名）
if [[ "$#" -lt 1 ]]; then
  echo "Usage: $0 title [--post] [--help]"
  exit 1
fi

# ヘルプ要求が最初の引数の場合
if [[ "$1" == "-h" || "$1" == "--help" ]]; then
  print_help
  exit 0
fi

filename=$1

# オプション確認、--postがあった場合は_postsへ移動する
post_option=false
while [[ "$#" -gt 0 ]]; do
  case "$1" in
  --post)
    post_option=true
    ;;
  -h|--help)
    print_help
    exit 0
    ;;
  *) ;;
  esac
  shift
done

# 実行した場所のパスを記憶
PWD_DIR=${PWD}

# このシェルのあるパスへ移動
APP_DIR=$(dirname $0)
cd ${APP_DIR}
rc=$?
if [ $rc != 0 ]; then
  echo "Error: cd"
  cd $PWD
  exit 1
fi

# .mdファイル作成
filename="${filename}.md"
nowDate=$(date "+%Y-%m-%dT%H:%M:%S.000Z")
touch ${filename}
rc=$?
if [ $rc != 0 ]; then
  echo "Error: touch"
  cd $PWD
  exit 1
fi

# ヘッダを書き込む
echo "---
title: ''
excerpt: ''
coverImage: ''
date: '${nowDate}'
updatedAt: '${nowDate}'
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: '/assets/blog/authors/WAT.jpg'
ogImage:
  url: ''
---" >${filename}
rc=$?
if [ $rc != 0 ]; then
  echo "Error: write header"
  cd $PWD
  exit 1
fi

# --postオプションある場合は/_postsへ移動
if $post_option; then
  mv ${filename} ../../_posts
  echo "/_posts に移動しました"
fi

# 実行元のパスへ戻る
cd ${PWD}

# 終
exit 0
