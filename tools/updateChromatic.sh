#!/bin/bash

# .stories.ts* ファイルのうち、追加 (A)、変更 (M)、削除 (D) を検出
CHANGED_FILES=$(git diff --name-status origin/main...HEAD -- '*.stories.ts*' | grep -E '^[AMD]' || true)

if [ -n "$CHANGED_FILES" ]; then
    echo "✅ 追加・変更・削除された .stories.ts* ファイルがあります:"
    echo "$CHANGED_FILES"
    npm run chromatic
    exit 1
else
    echo "✅ .stories.ts* ファイルに変更はありません。"
    exit 0
fi
