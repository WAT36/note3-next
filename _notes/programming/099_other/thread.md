---
title: "並行処理・マルチスレッド"
excerpt: "並行処理・マルチスレッドについて"
tag: ["Go", "Java", "Python", "Javascript"]
programming: ["Go", "Java", "Python", "Javascript"]
date: "2025-06-30T20:44:30.000Z"
updatedAt: '2025-11-25T00:12:05.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

並行処理・マルチスレッドについて説明する。

**並行処理とは**:

複数の処理を同時に実行する仕組み。1 つのプログラムで複数のタスクを並行して処理することで、CPU リソースを効率的に活用できる。

**並行処理と非同期処理の違い**:

- **並行処理（Concurrency）**: 複数の処理を同時に実行する（マルチスレッド、マルチプロセス）
- **非同期処理（Asynchronous）**: 処理の完了を待たずに次の処理を実行する（I/O 待ち時間の有効活用）

非同期処理については非同期処理の章を参照。

**主な用途**:

- CPU バウンドな処理の並列化（計算処理）
- I/O バウンドな処理の並行化（ファイル I/O、ネットワーク）
- バックグラウンドタスクの実行
- リアルタイム処理

各言語で並行処理の実装方法が異なる。

<div class="note_content_by_programming_language" id="note_content_Go">

```go
go func() { }()
```

Go では **goroutine**（軽量スレッド）と **channel**（データの受け渡し）で並行処理を実現する。

**1. goroutine（ゴルーチン）**:

`go` キーワードで関数を並行に実行する。

**基本的な使い方**:

```go
package main

import (
    "fmt"
    "time"
)

func say(message string) {
    for i := 0; i < 3; i++ {
        fmt.Println(message)
        time.Sleep(100 * time.Millisecond)
    }
}

func main() {
    go say("こんにちは")  // 並行処理（goroutine）
    say("Hello")         // メインスレッド
}

// 実行結果（一例、順序は実行ごとに異なる）
// Hello
// こんにちは
// Hello
// こんにちは
// Hello
// こんにちは
```

**goroutine の特徴**:

- **軽量**: スレッドよりも小さい処理単位（数 KB のメモリ）
- **多数実行可能**: 数千〜数万の goroutine を同時実行可能
- **スケジューリング**: Go ランタイムが自動的にスケジューリング

**匿名関数での使用**:

```go
func main() {
    // 匿名関数を goroutine として実行
    go func() {
        fmt.Println("goroutine で実行")
    }()

    // 引数を渡す
    message := "Hello"
    go func(msg string) {
        fmt.Println(msg)
    }(message)

    time.Sleep(1 * time.Second)  // goroutine の完了を待つ
}
```

**2. channel（チャネル）**:

goroutine 間でデータを受け渡しするための専用のデータ構造。

**基本的な使い方**:

```go
package main

import "fmt"

func main() {
    // チャネルを作成
    ch := make(chan int)

    // goroutine でデータを送信
    go func() {
        ch <- 42  // チャネルに送信
    }()

    // チャネルから受信（ブロッキング）
    value := <-ch
    fmt.Println("受信:", value)  // 42
}
```

**チャネルの型**:

| 型         | 説明                 |
| ---------- | -------------------- |
| `chan T`   | 送受信可能なチャネル |
| `<-chan T` | 受信専用チャネル     |
| `chan<- T` | 送信専用チャネル     |

```go
func send(ch chan<- int) {
    ch <- 10  // 送信のみ可能
}

func receive(ch <-chan int) {
    value := <-ch  // 受信のみ可能
    fmt.Println(value)
}

func main() {
    ch := make(chan int)
    go send(ch)
    receive(ch)
}
```

**バッファ付きチャネル**:

```go
// バッファサイズ3のチャネル
ch := make(chan int, 3)

// バッファの容量までブロックせずに送信できる
ch <- 1
ch <- 2
ch <- 3

// 受信
fmt.Println(<-ch)  // 1
fmt.Println(<-ch)  // 2
fmt.Println(<-ch)  // 3
```

バッファなしチャネル（`make(chan T)`）は、送信と受信が同期される。

**チャネルのクローズ**:

```go
ch := make(chan int, 3)

// データを送信
ch <- 1
ch <- 2
ch <- 3

// チャネルをクローズ
close(ch)

// クローズ済みチャネルから受信（OK）
for value := range ch {
    fmt.Println(value)
}
// 1
// 2
// 3

// クローズ済みチャネルに送信（panic）
// ch <- 4  // panic: send on closed channel
```

**チャネルの状態確認**:

```go
ch := make(chan int, 2)
ch <- 1
close(ch)

// 受信時にクローズ状態も取得
value, ok := <-ch
if ok {
    fmt.Println("受信:", value)  // 受信: 1
} else {
    fmt.Println("チャネルはクローズ済み")
}

value2, ok2 := <-ch
if ok2 {
    fmt.Println("受信:", value2)
} else {
    fmt.Println("チャネルはクローズ済み")  // チャネルはクローズ済み
}
```

**3. select 文**:

複数のチャネルを同時に待つ。

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

**select の特徴**:

- 複数の case のうち、いずれか 1 つが準備できたら実行
- 複数の case が準備できている場合はランダムに選ばれる
- `default` 節があると、どの case も準備できていない場合に実行（ノンブロッキング）

**default 節の使用例**:

```go
select {
case val := <-ch1:
    fmt.Println("ch1 から受信:", val)
case ch2 <- 123:
    fmt.Println("ch2 に送信")
default:
    fmt.Println("どのチャネルも準備できていない")
}
```

**4. sync.WaitGroup（複数の goroutine の完了を待つ）**:

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

**5. sync.Mutex（排他制御）**:

複数の goroutine から共有データへのアクセスを制御する。

```go
package main

import (
    "fmt"
    "sync"
)

type Counter struct {
    mu    sync.Mutex
    value int
}

func (c *Counter) Increment() {
    c.mu.Lock()    // ロック
    defer c.mu.Unlock()  // アンロック

    c.value++
}

func (c *Counter) Value() int {
    c.mu.Lock()
    defer c.mu.Unlock()

    return c.value
}

func main() {
    counter := &Counter{}
    var wg sync.WaitGroup

    // 100個の goroutine で同時にインクリメント
    for i := 0; i < 100; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            counter.Increment()
        }()
    }

    wg.Wait()
    fmt.Println("カウンター:", counter.Value())  // 100
}
```

**sync.RWMutex（読み書きロック）**:

読み取りは複数の goroutine が同時に可能、書き込みは排他的。

```go
type Cache struct {
    mu   sync.RWMutex
    data map[string]string
}

func (c *Cache) Get(key string) (string, bool) {
    c.mu.RLock()  // 読み取りロック
    defer c.mu.RUnlock()

    value, ok := c.data[key]
    return value, ok
}

func (c *Cache) Set(key, value string) {
    c.mu.Lock()   // 書き込みロック
    defer c.mu.Unlock()

    c.data[key] = value
}
```

**6. context（キャンセル処理）**:

goroutine のキャンセルやタイムアウトを管理する。

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

**context のタイムアウト**:

```go
package main

import (
    "context"
    "fmt"
    "time"
)

func task(ctx context.Context) error {
    select {
    case <-time.After(3 * time.Second):
        return fmt.Errorf("処理完了")
    case <-ctx.Done():
        return ctx.Err()  // context.DeadlineExceeded
    }
}

func main() {
    // 2秒でタイムアウト
    ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
    defer cancel()

    err := task(ctx)
    if err != nil {
        fmt.Println("エラー:", err)  // エラー: context deadline exceeded
    }
}
```

**実用例**:

### **ワーカープール**

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

### **並列 HTTP リクエスト**

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

### **生産者・消費者パターン**

```go
package main

import (
    "fmt"
    "time"
)

func producer(ch chan<- int) {
    for i := 1; i <= 5; i++ {
        fmt.Println("生産:", i)
        ch <- i
        time.Sleep(500 * time.Millisecond)
    }
    close(ch)
}

func consumer(ch <-chan int) {
    for value := range ch {
        fmt.Println("消費:", value)
        time.Sleep(1 * time.Second)
    }
}

func main() {
    ch := make(chan int, 2)  // バッファサイズ2

    go producer(ch)
    consumer(ch)

    fmt.Println("完了")
}
```

**まとめ**:

- `go` キーワードで goroutine を起動
- `channel` で goroutine 間のデータ受け渡し
- `sync.WaitGroup` で複数の goroutine の完了を待つ
- `sync.Mutex` で排他制御
- `select` で複数の channel を待つ
- `context` でキャンセル処理
- 軽量で効率的な並行処理が可能

</div>
<div class="note_content_by_programming_language" id="note_content_Java">

```java
Thread thread = new Thread(() -> { });
thread.start();
```

Java では **Thread**、**ExecutorService**、**CompletableFuture** などで並行処理を実現する。

**1. Thread（基本）**:

`Thread` クラスでスレッドを作成する。

**基本的な使い方**:

```java
package main;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        // Runnable インターフェースを実装
        Thread thread = new Thread(() -> {
            for (int i = 0; i < 3; i++) {
                System.out.println("スレッド: " + i);
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });

        thread.start();  // スレッドを開始

        // メインスレッドの処理
        for (int i = 0; i < 3; i++) {
            System.out.println("メイン: " + i);
            Thread.sleep(100);
        }

        thread.join();  // スレッドの完了を待つ
    }
}
```

**Thread クラスを継承する方法**:

```java
class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("スレッド実行中");
    }
}

// 使用例
MyThread thread = new MyThread();
thread.start();
```

**2. ExecutorService（スレッドプール、推奨）**:

スレッドプールで効率的にスレッドを管理する。

```java
import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // 固定サイズのスレッドプール
        ExecutorService executor = Executors.newFixedThreadPool(3);

        // タスクを送信
        for (int i = 1; i <= 5; i++) {
            final int taskId = i;
            executor.submit(() -> {
                System.out.println("タスク" + taskId + " 開始");
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                System.out.println("タスク" + taskId + " 完了");
            });
        }

        // シャットダウン
        executor.shutdown();
        executor.awaitTermination(10, TimeUnit.SECONDS);

        System.out.println("すべて完了");
    }
}
```

**ExecutorService の種類**:

```java
// 固定サイズのスレッドプール
ExecutorService fixedPool = Executors.newFixedThreadPool(5);

// キャッシュされたスレッドプール（動的にサイズが変わる）
ExecutorService cachedPool = Executors.newCachedThreadPool();

// 単一スレッドのエグゼキューター
ExecutorService singleThread = Executors.newSingleThreadExecutor();

// スケジュールされたスレッドプール
ScheduledExecutorService scheduledPool = Executors.newScheduledThreadPool(3);
```

**Future で結果を取得**:

```java
ExecutorService executor = Executors.newFixedThreadPool(3);

// タスクを送信して Future を取得
Future<Integer> future = executor.submit(() -> {
    Thread.sleep(1000);
    return 42;
});

// 結果を取得（ブロッキング）
Integer result = future.get();
System.out.println("結果: " + result);  // 42

executor.shutdown();
```

**3. 排他制御（synchronized）**:

複数のスレッドから共有データへのアクセスを制御する。

```java
public class Counter {
    private int count = 0;

    // メソッド全体を synchronized
    public synchronized void increment() {
        count++;
    }

    public synchronized int getCount() {
        return count;
    }
}

// 使用例
public class Main {
    public static void main(String[] args) throws InterruptedException {
        Counter counter = new Counter();

        // 100個のスレッドで同時にインクリメント
        Thread[] threads = new Thread[100];
        for (int i = 0; i < 100; i++) {
            threads[i] = new Thread(() -> counter.increment());
            threads[i].start();
        }

        // すべてのスレッドの完了を待つ
        for (Thread thread : threads) {
            thread.join();
        }

        System.out.println("カウンター: " + counter.getCount());  // 100
    }
}
```

**synchronized ブロック**:

```java
public class Counter {
    private int count = 0;
    private final Object lock = new Object();

    public void increment() {
        synchronized (lock) {
            count++;
        }
    }
}
```

**4. Lock インターフェース（より柔軟な排他制御）**:

```java
import java.util.concurrent.locks.*;

public class Counter {
    private int count = 0;
    private final Lock lock = new ReentrantLock();

    public void increment() {
        lock.lock();
        try {
            count++;
        } finally {
            lock.unlock();
        }
    }

    public int getCount() {
        lock.lock();
        try {
            return count;
        } finally {
            lock.unlock();
        }
    }
}
```

**ReadWriteLock（読み書きロック）**:

```java
import java.util.concurrent.locks.*;

public class Cache {
    private final Map<String, String> data = new HashMap<>();
    private final ReadWriteLock rwLock = new ReentrantReadWriteLock();

    public String get(String key) {
        rwLock.readLock().lock();  // 読み取りロック
        try {
            return data.get(key);
        } finally {
            rwLock.readLock().unlock();
        }
    }

    public void set(String key, String value) {
        rwLock.writeLock().lock();  // 書き込みロック
        try {
            data.put(key, value);
        } finally {
            rwLock.writeLock().unlock();
        }
    }
}
```

**実用例（並列処理）**:

```java
import java.util.concurrent.*;
import java.util.*;

public class ParallelSum {
    public static void main(String[] args) throws Exception {
        ExecutorService executor = Executors.newFixedThreadPool(4);

        // 1から100までの合計を並列計算
        List<Future<Integer>> futures = new ArrayList<>();

        for (int i = 0; i < 4; i++) {
            final int start = i * 25 + 1;
            final int end = (i + 1) * 25;

            Future<Integer> future = executor.submit(() -> {
                int sum = 0;
                for (int j = start; j <= end; j++) {
                    sum += j;
                }
                return sum;
            });

            futures.add(future);
        }

        // すべての結果を合計
        int total = 0;
        for (Future<Integer> future : futures) {
            total += future.get();
        }

        System.out.println("合計: " + total);  // 5050

        executor.shutdown();
    }
}
```

**まとめ**:

- `Thread` でスレッドを作成
- `ExecutorService` でスレッドプールを管理（推奨）
- `synchronized` で排他制御
- `Lock` インターフェースでより柔軟な排他制御
- `CompletableFuture` で非同期処理（[非同期処理](/notes/programming/099_other/async)を参照）

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
import threading
thread = threading.Thread(target=func)
thread.start()
```

Python では **threading**、**multiprocessing** モジュールで並行処理を実現する。

**1. threading（スレッド）**:

`threading` モジュールでスレッドを作成する。

**基本的な使い方**:

```python
import threading
import time

def say(message):
    for i in range(3):
        print(message)
        time.sleep(0.1)

# スレッドを作成
thread = threading.Thread(target=say, args=("こんにちは",))
thread.start()  # スレッドを開始

# メインスレッドの処理
say("Hello")

thread.join()  # スレッドの完了を待つ
```

**複数のスレッド**:

```python
import threading
import time

def worker(id):
    print(f"ワーカー{id} 開始")
    time.sleep(1)
    print(f"ワーカー{id} 完了")

threads = []
for i in range(3):
    thread = threading.Thread(target=worker, args=(i,))
    thread.start()
    threads.append(thread)

# すべてのスレッドの完了を待つ
for thread in threads:
    thread.join()

print("すべて完了")
```

**2. 排他制御（Lock）**:

複数のスレッドから共有データへのアクセスを制御する。

```python
import threading

class Counter:
    def __init__(self):
        self.count = 0
        self.lock = threading.Lock()

    def increment(self):
        with self.lock:  # ロックを取得
            self.count += 1

    def get_count(self):
        with self.lock:
            return self.count

# 使用例
counter = Counter()

def worker():
    for _ in range(1000):
        counter.increment()

threads = []
for _ in range(10):
    thread = threading.Thread(target=worker)
    thread.start()
    threads.append(thread)

for thread in threads:
    thread.join()

print(f"カウンター: {counter.get_count()}")  # 10000
```

**RLock（再入可能ロック）**:

```python
import threading

class Counter:
    def __init__(self):
        self.count = 0
        self.lock = threading.RLock()  # 再入可能ロック

    def increment(self):
        with self.lock:
            self.count += 1
            self._update_log()  # 同じスレッドから再度ロックを取得できる

    def _update_log(self):
        with self.lock:
            print(f"更新: {self.count}")
```

**3. multiprocessing（プロセス）**:

GIL（Global Interpreter Lock）の制約を回避するため、プロセスベースの並列処理を使う。

```python
import multiprocessing
import time

def worker(id):
    print(f"ワーカー{id} 開始")
    time.sleep(1)
    print(f"ワーカー{id} 完了")

if __name__ == "__main__":
    processes = []
    for i in range(3):
        process = multiprocessing.Process(target=worker, args=(i,))
        process.start()
        processes.append(process)

    # すべてのプロセスの完了を待つ
    for process in processes:
        process.join()

    print("すべて完了")
```

**4. ThreadPoolExecutor（スレッドプール、推奨）**:

```python
from concurrent.futures import ThreadPoolExecutor
import time

def worker(id):
    print(f"ワーカー{id} 開始")
    time.sleep(1)
    return f"結果{id}"

# スレッドプールを作成
with ThreadPoolExecutor(max_workers=3) as executor:
    # タスクを送信
    futures = [executor.submit(worker, i) for i in range(5)]

    # 結果を取得
    for future in futures:
        result = future.result()
        print(result)
```

**5. ProcessPoolExecutor（プロセスプール）**:

CPU バウンドな処理に適している。

```python
from concurrent.futures import ProcessPoolExecutor

def cpu_bound_task(n):
    return sum(i * i for i in range(n))

with ProcessPoolExecutor(max_workers=4) as executor:
    # タスクを並列実行
    results = executor.map(cpu_bound_task, [1000000, 2000000, 3000000, 4000000])

    for result in results:
        print(f"結果: {result}")
```

**6. Queue（スレッド間のデータ受け渡し）**:

```python
import threading
import queue
import time

def producer(q):
    for i in range(5):
        print(f"生産: {i}")
        q.put(i)
        time.sleep(0.5)
    q.put(None)  # 終了シグナル

def consumer(q):
    while True:
        item = q.get()
        if item is None:
            break
        print(f"消費: {item}")
        time.sleep(1)
        q.task_done()

q = queue.Queue()

producer_thread = threading.Thread(target=producer, args=(q,))
consumer_thread = threading.Thread(target=consumer, args=(q,))

producer_thread.start()
consumer_thread.start()

producer_thread.join()
consumer_thread.join()

print("完了")
```

**実用例（並列 HTTP リクエスト）**:

```python
from concurrent.futures import ThreadPoolExecutor
import requests

def fetch_url(url):
    try:
        response = requests.get(url, timeout=5)
        return f"{url}: {response.status_code} ({len(response.content)} bytes)"
    except Exception as e:
        return f"{url}: エラー - {e}"

urls = [
    "https://www.google.com",
    "https://www.github.com",
    "https://www.stackoverflow.com"
]

with ThreadPoolExecutor(max_workers=3) as executor:
    results = executor.map(fetch_url, urls)

    for result in results:
        print(result)
```

**まとめ**:

- `threading.Thread` でスレッドを作成
- `ThreadPoolExecutor` でスレッドプールを管理（推奨）
- `multiprocessing` で GIL を回避（CPU バウンド）
- `Lock` で排他制御
- `Queue` でスレッド間のデータ受け渡し
- `asyncio` で非同期処理（[非同期処理](/notes/programming/099_other/async)を参照）

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
const worker = new Worker("worker.js");
```

JavaScript では **Web Workers** で並行処理を実現する（ブラウザ）。Node.js では **Worker Threads** を使う。

**注**: JavaScript の `async/await` は非同期処理であり、並行処理ではない。非同期処理については[非同期処理](/notes/programming/099_other/async)を参照。

**1. Web Workers（ブラウザ）**:

Web Workers でバックグラウンドスレッドを作成する。

**メインスレッド（main.js）**:

```javascript
// Worker を作成
const worker = new Worker("worker.js");

// Worker からのメッセージを受信
worker.onmessage = function (event) {
  console.log("Worker からのメッセージ:", event.data);
};

// Worker にメッセージを送信
worker.postMessage({ command: "start", value: 10 });

// Worker を終了
worker.terminate();
```

**Worker スレッド（worker.js）**:

```javascript
// メインスレッドからのメッセージを受信
self.onmessage = function (event) {
  console.log("メインからのメッセージ:", event.data);

  // 処理を実行
  const result = heavyCalculation(event.data.value);

  // メインスレッドに結果を送信
  self.postMessage({ result: result });
};

function heavyCalculation(n) {
  let sum = 0;
  for (let i = 0; i < n * 1000000; i++) {
    sum += i;
  }
  return sum;
}
```

**実用例（画像処理）**:

```javascript
// main.js
const worker = new Worker("image-worker.js");

worker.onmessage = function (event) {
  const processedImage = event.data;
  console.log("画像処理完了:", processedImage);
};

// 画像データを送信
const imageData = document
  .getElementById("myImage")
  .getContext("2d")
  .getImageData(0, 0, 100, 100);
worker.postMessage({ imageData: imageData });
```

```javascript
// image-worker.js
self.onmessage = function (event) {
  const imageData = event.data.imageData;

  // 画像処理（グレースケール化など）
  for (let i = 0; i < imageData.data.length; i += 4) {
    const avg =
      (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
    imageData.data[i] = avg; // R
    imageData.data[i + 1] = avg; // G
    imageData.data[i + 2] = avg; // B
  }

  self.postMessage(imageData);
};
```

**2. Worker Threads（Node.js）**:

```javascript
// main.js
const { Worker } = require("worker_threads");

// Worker を作成
const worker = new Worker("./worker.js");

// Worker からのメッセージを受信
worker.on("message", (result) => {
  console.log("結果:", result);
});

// Worker にメッセージを送信
worker.postMessage({ value: 10 });
```

```javascript
// worker.js
const { parentPort } = require("worker_threads");

parentPort.on("message", (data) => {
  const result = data.value * 2;
  parentPort.postMessage(result);
});
```

**複数の Worker を使う例**:

```javascript
const { Worker } = require("worker_threads");

function runWorker(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./worker.js", { workerData });
    worker.on("message", resolve);
    worker.on("error", reject);
  });
}

async function main() {
  const results = await Promise.all([
    runWorker({ value: 10 }),
    runWorker({ value: 20 }),
    runWorker({ value: 30 }),
  ]);

  console.log("結果:", results); // [20, 40, 60]
}

main();
```

**3. SharedArrayBuffer（共有メモリ）**:

Worker 間でメモリを共有する。

```javascript
// メインスレッド
const sharedBuffer = new SharedArrayBuffer(16);
const sharedArray = new Int32Array(sharedBuffer);

const worker = new Worker("worker.js");
worker.postMessage({ buffer: sharedBuffer });

// Worker で値が変更される
setTimeout(() => {
  console.log("共有配列:", sharedArray); // [1, 2, 3, 4]
}, 1000);
```

```javascript
// worker.js
self.onmessage = function (event) {
  const sharedArray = new Int32Array(event.data.buffer);

  // 共有配列に値を設定
  sharedArray[0] = 1;
  sharedArray[1] = 2;
  sharedArray[2] = 3;
  sharedArray[3] = 4;

  self.postMessage("完了");
};
```

**Web Workers の制限**:

- DOM にアクセスできない
- `window` オブジェクトにアクセスできない
- 一部の Web API のみ使用可能

**まとめ**:

- Web Workers でバックグラウンドスレッドを作成（ブラウザ）
- Worker Threads でマルチスレッド処理（Node.js）
- `postMessage()` でメッセージを送信
- `onmessage` でメッセージを受信
- SharedArrayBuffer で共有メモリ
- 非同期処理は `async/await`（[非同期処理](/notes/programming/099_other/async)を参照）

</div>
