#!/bin/bash

# 引数確認（第１引数：タイトル名）
if [ $# != 1 ];
then
    echo "Usage: $0 filePath(.md)"
    exit 1
fi

# 指定したファイルのパスを取得
MD_PATH=$1

# 存在チェック
if [ ! -e ${MD_PATH} ]; 
then
    echo "Error: ファイル「$MD_PATH」は存在しません"
    exit 1
fi

# 実行した場所のパスを記憶
PWD_DIR=${PWD}

# まず.mdファイルのある絶対パスを記憶し移動
MD_FILE_DIR=`dirname ${MD_PATH}`
MD_FILE_NAME=`basename ${MD_PATH}`
cd ${MD_FILE_DIR}
rc=$?
if [ $rc != 0 ];
then
    echo "Error: cd"
    cd $PWD
    exit 1
fi

# .mdファイルを更新
NOW_DATE=`date "+%Y-%m-%dT%H:%M:%S.000Z"`
sed -i '' "s/updatedAt:.*/updatedAt: '${NOW_DATE}'/g" ${MD_FILE_NAME}
rc=$?
if [ $rc != 0 ];
then
    echo "Error: sed update date"
    cd $PWD
    exit 1
fi

# 実行元のパスへ戻る
cd ${PWD}
echo "${MD_PATH} updated!! (${NOW_DATE})"

# 終
exit 0
