---
title: "非同期処理"
excerpt: "非同期処理を行う方法について"
coverImage: ""
date: "2024-06-19T22:36:20.000Z"
updatedAt: '2025-11-24T22:13:44.000Z'
tag: ["Javascript", "Java", "Python", "Go"]
programming: ["Javascript", "Java", "Python", "Go"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
mode: programming
---

非同期処理について説明する。

**非同期処理とは**:

特定の操作の完了を待たずに、プログラムの他の部分を実行できる処理方法。同期処理では、ある処理が完了するまで次の処理がブロックされるが、非同期処理では並行して複数のタスクを効率的に実行できる。

**非同期処理の用途**:

- ネットワーク通信（API リクエスト、ファイルダウンロード）
- ファイル I/O（ファイルの読み書き）
- データベースクエリ
- タイマー処理
- ユーザー入力の待機

各言語で非同期処理の実装方法が異なる。

<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
async function fetchData() {
  const result = await promise;
}
```

JavaScript では、**Promise**、**async/await**、コールバック関数などで非同期処理を実現する。現代的なアプローチは `async/await`（ES2017+）。

**1. Promise（基本）**:

Promise は非同期処理の状態を表すオブジェクト。3 つの状態がある:

- **Pending（待機中）**: 初期状態、まだ完了していない
- **Fulfilled（成功）**: 処理が成功した（`resolve` が呼ばれた）
- **Rejected（失敗）**: 処理が失敗した（`reject` が呼ばれた）

**Promise の作成**:

```javascript
const promise = new Promise((resolve, reject) => {
  // 非同期処理
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve("成功！"); // 成功時
    } else {
      reject("失敗"); // 失敗時
    }
  }, 1000);
});
```

**Promise の使用（then/catch/finally）**:

```javascript
promise
  .then((result) => {
    console.log(result); // 成功時の処理
    return "次の処理へ";
  })
  .catch((error) => {
    console.error(error); // エラー時の処理
  })
  .finally(() => {
    console.log("完了"); // 成功・失敗に関わらず実行
  });
```

**実用例（API リクエスト）**:

```javascript
function fetchUser(userId) {
  return new Promise((resolve, reject) => {
    fetch(`https://api.example.com/users/${userId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(`HTTP error: ${response.status}`);
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

fetchUser(1)
  .then((user) => {
    console.log("ユーザー:", user);
  })
  .catch((error) => {
    console.error("エラー:", error);
  });
```

**2. async/await（推奨、ES2017+）**:

`async/await` は Promise をより読みやすく書くための構文糖衣。

**基本的な使い方**:

```javascript
async function fetchData() {
  try {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("エラー:", error);
    throw error;
  }
}

// 使用例
fetchData();
```

`async` 関数は常に Promise を返す。

```javascript
async function getData() {
  return "data"; // Promise.resolve("data") と同じ
}

getData().then((result) => console.log(result)); // "data"
```

**実用例（複数の API を順次呼び出し）**:

```javascript
async function getUserWithPosts(userId) {
  try {
    // ユーザー情報を取得
    const userResponse = await fetch(`https://api.example.com/users/${userId}`);
    const user = await userResponse.json();

    // ユーザーの投稿を取得
    const postsResponse = await fetch(
      `https://api.example.com/users/${userId}/posts`
    );
    const posts = await postsResponse.json();

    return { user, posts };
  } catch (error) {
    console.error("エラー:", error);
    throw error;
  }
}

// 使用例
getUserWithPosts(1)
  .then((data) => {
    console.log("ユーザー:", data.user);
    console.log("投稿:", data.posts);
  })
  .catch((error) => {
    console.error("取得失敗:", error);
  });
```

**3. Promise.all（並列実行）**:

複数の Promise を並列に実行し、すべてが成功したら結果を返す。

```javascript
const promise1 = fetch("https://api.example.com/users/1");
const promise2 = fetch("https://api.example.com/users/2");
const promise3 = fetch("https://api.example.com/users/3");

Promise.all([promise1, promise2, promise3])
  .then((responses) => {
    // すべての Promise が成功
    console.log("すべて成功:", responses);
    return Promise.all(responses.map((r) => r.json()));
  })
  .then((data) => {
    console.log("データ:", data);
  })
  .catch((error) => {
    // いずれか1つでも失敗したらここに来る
    console.error("失敗:", error);
  });
```

**async/await での使用**:

```javascript
async function fetchMultipleUsers() {
  try {
    const [user1, user2, user3] = await Promise.all([
      fetch("https://api.example.com/users/1").then((r) => r.json()),
      fetch("https://api.example.com/users/2").then((r) => r.json()),
      fetch("https://api.example.com/users/3").then((r) => r.json()),
    ]);

    console.log("ユーザー1:", user1);
    console.log("ユーザー2:", user2);
    console.log("ユーザー3:", user3);
  } catch (error) {
    console.error("エラー:", error);
  }
}
```

**4. Promise.race（最初の完了を待つ）**:

複数の Promise のうち、最初に完了したものの結果を返す。

```javascript
const promise1 = new Promise((resolve) =>
  setTimeout(() => resolve("1秒"), 1000)
);
const promise2 = new Promise((resolve) =>
  setTimeout(() => resolve("2秒"), 2000)
);

Promise.race([promise1, promise2]).then((result) => {
  console.log("最初に完了:", result); // "1秒"
});
```

**タイムアウトの実装**:

```javascript
function timeout(ms) {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error("タイムアウト")), ms)
  );
}

async function fetchWithTimeout(url, ms) {
  try {
    const response = await Promise.race([fetch(url), timeout(ms)]);
    return await response.json();
  } catch (error) {
    console.error("エラー:", error.message);
    throw error;
  }
}

// 5秒でタイムアウト
fetchWithTimeout("https://api.example.com/data", 5000)
  .then((data) => console.log("データ:", data))
  .catch((error) => console.error("失敗:", error));
```

**5. Promise.allSettled（すべての結果を待つ、ES2020+）**:

すべての Promise が完了するまで待ち、成功・失敗に関わらずすべての結果を返す。

```javascript
const promises = [
  Promise.resolve("成功1"),
  Promise.reject("失敗"),
  Promise.resolve("成功2"),
];

Promise.allSettled(promises).then((results) => {
  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      console.log(`${index}: 成功 -`, result.value);
    } else {
      console.log(`${index}: 失敗 -`, result.reason);
    }
  });
});

// 出力:
// 0: 成功 - 成功1
// 1: 失敗 - 失敗
// 2: 成功 - 成功2
```

**6. Promise.any（最初の成功を待つ、ES2021+）**:

複数の Promise のうち、最初に成功したものの結果を返す。

```javascript
const promises = [
  Promise.reject("失敗1"),
  Promise.resolve("成功"),
  Promise.reject("失敗2"),
];

Promise.any(promises)
  .then((result) => {
    console.log("最初の成功:", result); // "成功"
  })
  .catch((error) => {
    console.error("すべて失敗:", error);
  });
```

**7. コールバック関数（古いアプローチ）**:

Promise 以前の非同期処理の方法。

```javascript
function fetchData(callback) {
  setTimeout(() => {
    const data = { id: 1, name: "John" };
    callback(null, data); // エラー, データ
  }, 1000);
}

fetchData((error, data) => {
  if (error) {
    console.error("エラー:", error);
  } else {
    console.log("データ:", data);
  }
});
```

**コールバック地獄の問題**:

```javascript
// 悪い例（コールバック地獄）
getData1((error1, data1) => {
  if (error1) return console.error(error1);
  getData2(data1, (error2, data2) => {
    if (error2) return console.error(error2);
    getData3(data2, (error3, data3) => {
      if (error3) return console.error(error3);
      console.log(data3);
    });
  });
});

// 良い例（async/await）
async function getData() {
  try {
    const data1 = await getData1();
    const data2 = await getData2(data1);
    const data3 = await getData3(data2);
    console.log(data3);
  } catch (error) {
    console.error(error);
  }
}
```

**実用例（リトライ機能付き API 呼び出し）**:

```javascript
async function fetchWithRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return await response.json();
      }
      throw new Error(`HTTP error: ${response.status}`);
    } catch (error) {
      console.log(`試行 ${i + 1} 失敗:`, error.message);
      if (i === maxRetries - 1) {
        throw error; // 最後の試行で失敗したら throw
      }
      // 1秒待ってリトライ
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}

fetchWithRetry("https://api.example.com/data")
  .then((data) => console.log("データ:", data))
  .catch((error) => console.error("取得失敗:", error));
```

**まとめ**:

- Promise は非同期処理の基本
- `async/await` が現代的で読みやすい（推奨）
- `Promise.all` で並列実行
- `Promise.race` で最初の完了を待つ
- `Promise.allSettled` ですべての結果を待つ
- エラーハンドリングは `try/catch` または `.catch()`

</div>
<div class="note_content_by_programming_language" id="note_content_Java">

```java
CompletableFuture.supplyAsync(() -> {
    return result;
}).thenApply(result -> { });
```

Java では、**CompletableFuture**（Java 8+）、**ExecutorService**、**Thread** などで非同期処理を実現する。現代的なアプローチは `CompletableFuture`。

**1. CompletableFuture（推奨、Java 8+）**:

`CompletableFuture` は Promise に似た非同期処理のクラス。

**基本的な使い方**:

```java
import java.util.concurrent.CompletableFuture;

public class Main {
    public static void main(String[] args) {
        // 非同期タスクを実行
        CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
            try {
                Thread.sleep(1000);  // 1秒待機
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return "結果";
        });

        // 結果を取得（完了するまで待つ）
        future.thenAccept(result -> {
            System.out.println("結果: " + result);
        });

        // メインスレッドが終了しないように待つ
        future.join();
    }
}
```

**非同期処理のチェーン**:

```java
CompletableFuture.supplyAsync(() -> {
    System.out.println("タスク1実行");
    return 10;
})
.thenApply(result -> {
    System.out.println("タスク2実行: " + result);
    return result * 2;
})
.thenApply(result -> {
    System.out.println("タスク3実行: " + result);
    return result + 5;
})
.thenAccept(finalResult -> {
    System.out.println("最終結果: " + finalResult);  // 25
});
```

**エラーハンドリング**:

```java
CompletableFuture.supplyAsync(() -> {
    if (Math.random() > 0.5) {
        throw new RuntimeException("エラー発生");
    }
    return "成功";
})
.exceptionally(ex -> {
    System.out.println("エラー: " + ex.getMessage());
    return "デフォルト値";
})
.thenAccept(result -> {
    System.out.println("結果: " + result);
});
```

**複数の非同期処理を並列実行（allOf）**:

```java
CompletableFuture<String> future1 = CompletableFuture.supplyAsync(() -> {
    sleep(1000);
    return "結果1";
});

CompletableFuture<String> future2 = CompletableFuture.supplyAsync(() -> {
    sleep(1500);
    return "結果2";
});

CompletableFuture<String> future3 = CompletableFuture.supplyAsync(() -> {
    sleep(500);
    return "結果3";
});

// すべての完了を待つ
CompletableFuture<Void> allFutures = CompletableFuture.allOf(future1, future2, future3);

allFutures.thenRun(() -> {
    try {
        System.out.println(future1.get());  // "結果1"
        System.out.println(future2.get());  // "結果2"
        System.out.println(future3.get());  // "結果3"
    } catch (Exception e) {
        e.printStackTrace();
    }
});

allFutures.join();  // 完了を待つ

private static void sleep(long ms) {
    try {
        Thread.sleep(ms);
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
}
```

**最初の完了を待つ（anyOf）**:

```java
CompletableFuture<String> future1 = CompletableFuture.supplyAsync(() -> {
    sleep(1000);
    return "結果1";
});

CompletableFuture<String> future2 = CompletableFuture.supplyAsync(() -> {
    sleep(500);
    return "結果2";
});

CompletableFuture<Object> anyFuture = CompletableFuture.anyOf(future1, future2);

anyFuture.thenAccept(result -> {
    System.out.println("最初の結果: " + result);  // "結果2"
});

anyFuture.join();
```

**2 つの非同期処理を組み合わせる（thenCombine）**:

```java
CompletableFuture<Integer> future1 = CompletableFuture.supplyAsync(() -> {
    sleep(1000);
    return 10;
});

CompletableFuture<Integer> future2 = CompletableFuture.supplyAsync(() -> {
    sleep(1500);
    return 20;
});

future1.thenCombine(future2, (result1, result2) -> {
    return result1 + result2;
})
.thenAccept(sum -> {
    System.out.println("合計: " + sum);  // 30
});
```

**実用例（API 呼び出し）**:

```java
import java.net.http.*;
import java.net.URI;
import java.util.concurrent.CompletableFuture;

public class ApiClient {
    private static final HttpClient httpClient = HttpClient.newHttpClient();

    public static CompletableFuture<String> fetchUser(int userId) {
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://api.example.com/users/" + userId))
            .GET()
            .build();

        return httpClient.sendAsync(request, HttpResponse.BodyHandlers.ofString())
            .thenApply(HttpResponse::body)
            .exceptionally(ex -> {
                System.err.println("エラー: " + ex.getMessage());
                return null;
            });
    }

    public static void main(String[] args) {
        fetchUser(1)
            .thenAccept(body -> {
                System.out.println("ユーザーデータ: " + body);
            })
            .join();  // 完了を待つ
    }
}
```

**2. ExecutorService（スレッドプール）**:

複数のタスクを効率的に実行するためのスレッドプール。

```java
import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) throws Exception {
        ExecutorService executor = Executors.newFixedThreadPool(3);

        // タスクを送信
        Future<String> future = executor.submit(() -> {
            Thread.sleep(1000);
            return "結果";
        });

        // 結果を取得（ブロッキング）
        String result = future.get();
        System.out.println("結果: " + result);

        // シャットダウン
        executor.shutdown();
    }
}
```

**複数のタスクを並列実行**:

```java
ExecutorService executor = Executors.newFixedThreadPool(3);

List<Callable<Integer>> tasks = Arrays.asList(
    () -> { Thread.sleep(1000); return 1; },
    () -> { Thread.sleep(1500); return 2; },
    () -> { Thread.sleep(500); return 3; }
);

// すべてのタスクを実行
List<Future<Integer>> results = executor.invokeAll(tasks);

for (Future<Integer> result : results) {
    System.out.println("結果: " + result.get());
}

executor.shutdown();
```

**3. Thread（低レベル）**:

直接スレッドを作成する方法（非推奨、低レベルすぎる）。

```java
Thread thread = new Thread(() -> {
    System.out.println("非同期処理実行中");
    try {
        Thread.sleep(1000);
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
    System.out.println("完了");
});

thread.start();  // スレッドを開始
thread.join();   // 完了を待つ
```

**まとめ**:

- `CompletableFuture` が推奨（Java 8+）
- `ExecutorService` でスレッドプールを管理
- `allOf` で並列実行
- `anyOf` で最初の完了を待つ
- エラーハンドリングは `exceptionally`

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
async def fetch_data():
    result = await async_function()
```

Python では、**async/await**、**asyncio** モジュールで非同期処理を実現する（Python 3.5+）。

**1. async/await（基本）**:

`async def` で非同期関数を定義し、`await` で非同期処理の完了を待つ。

**基本的な使い方**:

```python
import asyncio

async def fetch_data():
    print("データ取得開始")
    await asyncio.sleep(1)  # 1秒待機（非同期）
    print("データ取得完了")
    return "データ"

# 実行
asyncio.run(fetch_data())
```

**複数の非同期関数を順次実行**:

```python
import asyncio

async def task1():
    print("タスク1開始")
    await asyncio.sleep(1)
    print("タスク1完了")
    return "結果1"

async def task2():
    print("タスク2開始")
    await asyncio.sleep(1)
    print("タスク2完了")
    return "結果2"

async def main():
    result1 = await task1()  # タスク1が完了するまで待つ
    result2 = await task2()  # タスク2が完了するまで待つ
    print(f"結果: {result1}, {result2}")

asyncio.run(main())
```

**2. 複数の非同期処理を並列実行（asyncio.gather）**:

```python
import asyncio

async def fetch_user(user_id):
    print(f"ユーザー{user_id}取得開始")
    await asyncio.sleep(1)
    print(f"ユーザー{user_id}取得完了")
    return f"ユーザー{user_id}"

async def main():
    # 並列実行（すべて同時に開始）
    results = await asyncio.gather(
        fetch_user(1),
        fetch_user(2),
        fetch_user(3)
    )
    print("結果:", results)  # ['ユーザー1', 'ユーザー2', 'ユーザー3']

asyncio.run(main())
```

**エラーハンドリング**:

```python
import asyncio

async def risky_task():
    await asyncio.sleep(1)
    raise ValueError("エラー発生")

async def main():
    try:
        result = await risky_task()
    except ValueError as e:
        print(f"エラー: {e}")

asyncio.run(main())
```

**3. タイムアウトの設定（asyncio.wait_for）**:

```python
import asyncio

async def slow_task():
    await asyncio.sleep(5)
    return "完了"

async def main():
    try:
        # 2秒でタイムアウト
        result = await asyncio.wait_for(slow_task(), timeout=2.0)
        print("結果:", result)
    except asyncio.TimeoutError:
        print("タイムアウト")

asyncio.run(main())
```

**4. タスクの作成と管理（asyncio.create_task）**:

```python
import asyncio

async def task1():
    await asyncio.sleep(1)
    print("タスク1完了")
    return "結果1"

async def task2():
    await asyncio.sleep(2)
    print("タスク2完了")
    return "結果2"

async def main():
    # タスクを作成（すぐに実行開始）
    t1 = asyncio.create_task(task1())
    t2 = asyncio.create_task(task2())

    # 両方の完了を待つ
    result1 = await t1
    result2 = await t2

    print(f"結果: {result1}, {result2}")

asyncio.run(main())
```

**5. 実用例（HTTP リクエスト、aiohttp）**:

```python
import asyncio
import aiohttp

async def fetch_url(session, url):
    async with session.get(url) as response:
        return await response.text()

async def main():
    async with aiohttp.ClientSession() as session:
        # 複数の URL を並列取得
        urls = [
            "https://api.example.com/users/1",
            "https://api.example.com/users/2",
            "https://api.example.com/users/3"
        ]

        tasks = [fetch_url(session, url) for url in urls]
        results = await asyncio.gather(*tasks)

        for i, result in enumerate(results):
            print(f"結果{i + 1}: {result[:100]}...")  # 最初の100文字

asyncio.run(main())
```

**6. asyncio.wait（低レベル API）**:

```python
import asyncio

async def task(n):
    await asyncio.sleep(n)
    return f"タスク{n}完了"

async def main():
    tasks = [
        asyncio.create_task(task(1)),
        asyncio.create_task(task(2)),
        asyncio.create_task(task(3))
    ]

    # すべての完了を待つ
    done, pending = await asyncio.wait(tasks)

    for task in done:
        print(task.result())

asyncio.run(main())
```

**7. 最初の完了を待つ（asyncio.wait with FIRST_COMPLETED）**:

```python
import asyncio

async def task(n):
    await asyncio.sleep(n)
    return f"タスク{n}完了"

async def main():
    tasks = [
        asyncio.create_task(task(3)),
        asyncio.create_task(task(1)),
        asyncio.create_task(task(2))
    ]

    # 最初に完了したタスクを取得
    done, pending = await asyncio.wait(tasks, return_when=asyncio.FIRST_COMPLETED)

    for task in done:
        print("最初の完了:", task.result())  # "タスク1完了"

    # 残りのタスクをキャンセル
    for task in pending:
        task.cancel()

asyncio.run(main())
```

**8. 並行実行（ThreadPoolExecutor）**:

CPU バウンドな処理には `concurrent.futures` を使う。

```python
import asyncio
from concurrent.futures import ThreadPoolExecutor

def cpu_bound_task(n):
    # CPU を使う処理
    return sum(i * i for i in range(n))

async def main():
    loop = asyncio.get_event_loop()

    with ThreadPoolExecutor() as executor:
        # CPU バウンドな処理を別スレッドで実行
        result = await loop.run_in_executor(executor, cpu_bound_task, 1000000)
        print("結果:", result)

asyncio.run(main())
```

**実用例（リトライ機能付き API 呼び出し）**:

```python
import asyncio
import aiohttp

async def fetch_with_retry(url, max_retries=3):
    for i in range(max_retries):
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(url) as response:
                    if response.status == 200:
                        return await response.json()
                    raise Exception(f"HTTP error: {response.status}")
        except Exception as e:
            print(f"試行 {i + 1} 失敗: {e}")
            if i == max_retries - 1:
                raise
            await asyncio.sleep(1)  # 1秒待ってリトライ

async def main():
    try:
        data = await fetch_with_retry("https://api.example.com/data")
        print("データ:", data)
    except Exception as e:
        print("取得失敗:", e)

asyncio.run(main())
```

**まとめ**:

- `async def` で非同期関数を定義
- `await` で非同期処理の完了を待つ
- `asyncio.gather` で並列実行
- `asyncio.wait_for` でタイムアウト設定
- `aiohttp` で HTTP リクエスト
- エラーハンドリングは `try/except`

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
go func() {
    // 非同期処理
}()
```

Go では、**goroutine**（軽量スレッド）と **channel**（データの受け渡し）で非同期・並行処理を実現する。

**1. goroutine（基本）**:

`go` キーワードで関数を非同期に実行する。

**基本的な使い方**:

```go
package main

import (
    "fmt"
    "time"
)

func task(name string) {
    for i := 0; i < 3; i++ {
        fmt.Printf("%s: %d\n", name, i)
        time.Sleep(100 * time.Millisecond)
    }
}

func main() {
    // goroutine として実行
    go task("goroutine1")
    go task("goroutine2")

    // メインが終了しないように待つ
    time.Sleep(1 * time.Second)
    fmt.Println("完了")
}
```

**2. channel（goroutine 間のデータ受け渡し）**:

`channel` で goroutine 間でデータをやり取りする。

**基本的な使い方**:

```go
package main

import "fmt"

func sendData(ch chan string) {
    ch <- "データ"  // channel にデータを送信
}

func main() {
    ch := make(chan string)  // channel を作成

    go sendData(ch)

    data := <-ch  // channel からデータを受信（ブロッキング）
    fmt.Println("受信:", data)
}
```

**goroutine からの結果を取得**:

```go
package main

import (
    "fmt"
    "time"
)

func fetchData(ch chan string) {
    time.Sleep(1 * time.Second)
    ch <- "データ"
}

func main() {
    ch := make(chan string)

    go fetchData(ch)

    fmt.Println("待機中...")
    result := <-ch  // 結果を受信（完了まで待つ）
    fmt.Println("結果:", result)
}
```

**3. 複数の goroutine を並列実行（WaitGroup）**:

`sync.WaitGroup` ですべての goroutine の完了を待つ。

```go
package main

import (
    "fmt"
    "sync"
    "time"
)

func worker(id int, wg *sync.WaitGroup) {
    defer wg.Done()  // 完了時に Done を呼ぶ

    fmt.Printf("ワーカー%d 開始\n", id)
    time.Sleep(time.Second)
    fmt.Printf("ワーカー%d 完了\n", id)
}

func main() {
    var wg sync.WaitGroup

    for i := 1; i <= 3; i++ {
        wg.Add(1)  // カウンタを増やす
        go worker(i, &wg)
    }

    wg.Wait()  // すべての goroutine の完了を待つ
    fmt.Println("すべて完了")
}
```

**4. channel でエラーハンドリング**:

```go
package main

import (
    "errors"
    "fmt"
    "time"
)

type Result struct {
    Value string
    Error error
}

func fetchData(ch chan Result) {
    time.Sleep(1 * time.Second)

    // ランダムにエラーを発生させる
    if time.Now().Unix()%2 == 0 {
        ch <- Result{Error: errors.New("エラー発生")}
    } else {
        ch <- Result{Value: "データ"}
    }
}

func main() {
    ch := make(chan Result)

    go fetchData(ch)

    result := <-ch
    if result.Error != nil {
        fmt.Println("エラー:", result.Error)
    } else {
        fmt.Println("結果:", result.Value)
    }
}
```

**5. バッファ付き channel**:

バッファ付き channel は、容量まで送信がブロックされない。

```go
package main

import "fmt"

func main() {
    ch := make(chan int, 3)  // バッファサイズ3

    // ブロックせずに送信できる
    ch <- 1
    ch <- 2
    ch <- 3

    // 受信
    fmt.Println(<-ch)  // 1
    fmt.Println(<-ch)  // 2
    fmt.Println(<-ch)  // 3
}
```

**6. select（複数の channel を待つ）**:

`select` で複数の channel を同時に待つ。

```go
package main

import (
    "fmt"
    "time"
)

func main() {
    ch1 := make(chan string)
    ch2 := make(chan string)

    go func() {
        time.Sleep(1 * time.Second)
        ch1 <- "ch1 からのメッセージ"
    }()

    go func() {
        time.Sleep(2 * time.Second)
        ch2 <- "ch2 からのメッセージ"
    }()

    for i := 0; i < 2; i++ {
        select {
        case msg1 := <-ch1:
            fmt.Println("受信:", msg1)
        case msg2 := <-ch2:
            fmt.Println("受信:", msg2)
        }
    }
}
```

**7. タイムアウトの設定**:

```go
package main

import (
    "fmt"
    "time"
)

func fetchData(ch chan string) {
    time.Sleep(3 * time.Second)
    ch <- "データ"
}

func main() {
    ch := make(chan string)

    go fetchData(ch)

    select {
    case result := <-ch:
        fmt.Println("結果:", result)
    case <-time.After(2 * time.Second):
        fmt.Println("タイムアウト")
    }
}
```

**8. context によるキャンセル**:

```go
package main

import (
    "context"
    "fmt"
    "time"
)

func worker(ctx context.Context, id int) {
    for {
        select {
        case <-ctx.Done():
            fmt.Printf("ワーカー%d キャンセル\n", id)
            return
        default:
            fmt.Printf("ワーカー%d 実行中\n", id)
            time.Sleep(500 * time.Millisecond)
        }
    }
}

func main() {
    ctx, cancel := context.WithCancel(context.Background())

    go worker(ctx, 1)
    go worker(ctx, 2)

    time.Sleep(2 * time.Second)
    cancel()  // すべての goroutine をキャンセル

    time.Sleep(1 * time.Second)
    fmt.Println("完了")
}
```

**実用例（HTTP リクエスト並列実行）**:

```go
package main

import (
    "fmt"
    "io"
    "net/http"
    "sync"
)

func fetchURL(url string, wg *sync.WaitGroup, results chan<- string) {
    defer wg.Done()

    resp, err := http.Get(url)
    if err != nil {
        results <- fmt.Sprintf("エラー: %s", err)
        return
    }
    defer resp.Body.Close()

    body, err := io.ReadAll(resp.Body)
    if err != nil {
        results <- fmt.Sprintf("エラー: %s", err)
        return
    }

    results <- fmt.Sprintf("%s: %d bytes", url, len(body))
}

func main() {
    urls := []string{
        "https://www.google.com",
        "https://www.github.com",
        "https://www.stackoverflow.com",
    }

    var wg sync.WaitGroup
    results := make(chan string, len(urls))

    for _, url := range urls {
        wg.Add(1)
        go fetchURL(url, &wg, results)
    }

    wg.Wait()
    close(results)

    for result := range results {
        fmt.Println(result)
    }
}
```

**実用例（ワーカープール）**:

```go
package main

import (
    "fmt"
    "time"
)

func worker(id int, jobs <-chan int, results chan<- int) {
    for job := range jobs {
        fmt.Printf("ワーカー%d: ジョブ%d 処理中\n", id, job)
        time.Sleep(time.Second)
        results <- job * 2
    }
}

func main() {
    jobs := make(chan int, 10)
    results := make(chan int, 10)

    // 3つのワーカーを起動
    for w := 1; w <= 3; w++ {
        go worker(w, jobs, results)
    }

    // 5つのジョブを送信
    for j := 1; j <= 5; j++ {
        jobs <- j
    }
    close(jobs)

    // 結果を受信
    for a := 1; a <= 5; a++ {
        result := <-results
        fmt.Println("結果:", result)
    }
}
```

**まとめ**:

- `go` キーワードで goroutine を起動
- `channel` で goroutine 間のデータ受け渡し
- `sync.WaitGroup` で複数の goroutine の完了を待つ
- `select` で複数の channel を待つ
- `context` でキャンセル処理
- 軽量で効率的な並行処理が可能

</div>
