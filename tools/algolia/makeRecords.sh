#!/bin/bash

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

##############

FILELIST="filelist.txt"

# .mdリスト作成
find ../../_notes -name *.md > ${FILELIST}
find ../../_posts -name *.md >> ${FILELIST}

##############

# 実行元のパスへ戻る
cd ${PWD}

# 終
exit 0