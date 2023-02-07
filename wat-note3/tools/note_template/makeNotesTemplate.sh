#!/bin/bash

# 引数確認（第１引数：タイトル名）
if [ $# != 1 ];
then
    echo "Usage: $0 title"
    exit 1
fi

# 実行した場所のパスを記憶
PWD_DIR=${PWD}

# このシェルのあるパスへ移動
APP_DIR=`dirname $0`
cd ${APP_DIR}
rc=$?
if [ $rc != 0 ];
then
    echo "Error: cd"
    cd $PWD
    exit 1
fi

# .mdファイル作成
filename="$1.md"
nowDate=`date "+%Y-%m-%dT%H:%M:%S.000Z"`
touch ${filename}
rc=$?
if [ $rc != 0 ];
then
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
---" > ${filename}
rc=$?
if [ $rc != 0 ];
then
    echo "Error: write header"
    cd $PWD
    exit 1
fi

# 実行元のパスへ戻る
cd ${PWD}

# 終
exit 0
