---
title: "日付/時刻型"
excerpt: "日付/時刻データを扱いたい時"
coverImage: ""
date: '2025-11-25T00:12:01.000Z'
updatedAt: '2025-11-25T00:12:01.000Z'
tag: ["Javascript", "Java", "Python", "Go"]
programming: ["Javascript", "Java", "Python", "Go"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
mode: programming
---

日付/時刻型について説明する。

日付や時刻を扱うためのデータ型。各言語で日付/時刻の表現方法や操作方法が異なる。

**主な用途**:

- 現在の日時の取得
- 日付の計算（加算・減算）
- 日付のフォーマット（文字列への変換）
- 日付の比較
- タイムゾーンの変換

<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
const now = new Date();
```

JavaScript では組み込みオブジェクト **Date** で日付/時刻を扱う。

**Date オブジェクトの生成**:

```javascript
// 現在の日時
const now = new Date();
console.log(now); // 2024-07-13T12:00:00.000Z

// 特定の日時を指定
const date1 = new Date("2022-12-01T12:23:34");
const date2 = new Date("2022/12/01 12:23:34"); // スラッシュ区切りも可
const date3 = new Date(2022, 11, 1, 12, 23, 34); // 年, 月(0-11), 日, 時, 分, 秒

// Unix タイムスタンプから生成（ミリ秒）
const date4 = new Date(1669865014000);

// ISO 8601 形式（推奨）
const date5 = new Date("2022-12-01T12:23:34.000Z");
```

**重要**: `getMonth()` と `new Date()` の月は **0 始まり**（0=1 月、11=12 月）。

**日付の取得メソッド**:

| メソッド            | 説明                          | 例            |
| ------------------- | ----------------------------- | ------------- |
| `getFullYear()`     | 年を取得                      | 2022          |
| `getMonth()`        | 月を取得（0-11、0=1 月）      | 11（12 月）   |
| `getDate()`         | 日を取得（1-31）              | 1             |
| `getDay()`          | 曜日を取得（0-6、0=日曜）     | 4（木曜）     |
| `getHours()`        | 時を取得（0-23）              | 12            |
| `getMinutes()`      | 分を取得（0-59）              | 23            |
| `getSeconds()`      | 秒を取得（0-59）              | 34            |
| `getMilliseconds()` | ミリ秒を取得（0-999）         | 0             |
| `getTime()`         | Unix タイムスタンプ（ミリ秒） | 1669865014000 |

**日付の設定メソッド**:

| メソッド              | 説明             |
| --------------------- | ---------------- |
| `setFullYear(year)`   | 年を設定         |
| `setMonth(month)`     | 月を設定（0-11） |
| `setDate(date)`       | 日を設定         |
| `setHours(hours)`     | 時を設定         |
| `setMinutes(minutes)` | 分を設定         |
| `setSeconds(seconds)` | 秒を設定         |

**静的メソッド**:

```javascript
// 現在のタイムスタンプを取得
const timestamp = Date.now();
console.log(timestamp); // 1720870255912
```

**文字列変換メソッド**:

```javascript
const date = new Date("2022-12-01T12:23:34");

console.log(date.toString()); // "Thu Dec 01 2022 12:23:34 GMT+0900 (日本標準時)"
console.log(date.toDateString()); // "Thu Dec 01 2022"
console.log(date.toTimeString()); // "12:23:34 GMT+0900 (日本標準時)"
console.log(date.toISOString()); // "2022-12-01T03:23:34.000Z"（UTC）
console.log(date.toLocaleString()); // "2022/12/1 12:23:34"（ロケールに応じた形式）
console.log(date.toLocaleDateString()); // "2022/12/1"
console.log(date.toLocaleTimeString()); // "12:23:34"
```

**実用例**:

### **現在の日時を取得**

```javascript
const now = new Date();
console.log(`年：${now.getFullYear()}`);
console.log(`月：${now.getMonth() + 1}`); // +1 で1-12月にする
console.log(`日：${now.getDate()}`);
console.log(`時：${now.getHours()}`);
console.log(`分：${now.getMinutes()}`);
console.log(`秒：${now.getSeconds()}`);
```

### **日付のフォーマット**

```javascript
const date = new Date("2022-12-01T12:23:34");

// YYYY-MM-DD 形式
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, "0");
const day = String(date.getDate()).padStart(2, "0");
console.log(`${year}-${month}-${day}`); // "2022-12-01"

// YYYY/MM/DD HH:MM:SS 形式
const hours = String(date.getHours()).padStart(2, "0");
const minutes = String(date.getMinutes()).padStart(2, "0");
const seconds = String(date.getSeconds()).padStart(2, "0");
console.log(`${year}/${month}/${day} ${hours}:${minutes}:${seconds}`);
// "2022/12/01 12:23:34"
```

### **日付の計算**

```javascript
const now = new Date();

// 1日後
const tomorrow = new Date(now);
tomorrow.setDate(tomorrow.getDate() + 1);

// 1週間後
const nextWeek = new Date(now);
nextWeek.setDate(nextWeek.getDate() + 7);

// 1ヶ月後
const nextMonth = new Date(now);
nextMonth.setMonth(nextMonth.getMonth() + 1);

// 1年後
const nextYear = new Date(now);
nextYear.setFullYear(nextYear.getFullYear() + 1);

// 日数の差を計算
const date1 = new Date("2022-12-01");
const date2 = new Date("2022-12-10");
const diffTime = Math.abs(date2 - date1);
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
console.log(`${diffDays} 日の差`); // 9 日の差
```

### **日付の比較**

```javascript
const date1 = new Date("2022-12-01");
const date2 = new Date("2022-12-10");

if (date1 < date2) {
  console.log("date1 の方が古い");
}

if (date1.getTime() === date2.getTime()) {
  console.log("同じ日時");
}
```

### **タイムゾーン**

```javascript
const date = new Date();

// ローカルタイムゾーンのオフセット（分）
const offset = date.getTimezoneOffset();
console.log(`オフセット: ${offset} 分`); // -540（日本は UTC+9）

// UTC で取得
console.log(date.getUTCFullYear()); // UTC の年
console.log(date.getUTCMonth()); // UTC の月
console.log(date.getUTCDate()); // UTC の日
console.log(date.getUTCHours()); // UTC の時
```

### **経過時間の計測**

```javascript
const start = Date.now();

// 処理を実行
for (let i = 0; i < 1000000; i++) {
  // 何か処理
}

const end = Date.now();
console.log(`実行時間: ${end - start} ミリ秒`);
```

### **曜日の取得**

```javascript
const date = new Date("2022-12-01");
const dayOfWeek = date.getDay();

const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
console.log(`曜日: ${weekdays[dayOfWeek]}曜日`); // "木曜日"
```

**Date オブジェクトの問題点**:

JavaScript の Date オブジェクトには以下の問題がある:

1. **月が 0 始まり**: `getMonth()` が 0-11 を返す（混乱しやすい）
2. **タイムゾーンの扱いが難しい**: ローカルと UTC の変換が煩雑
3. **日付の計算が面倒**: 月をまたぐ計算などが複雑
4. **不変性がない**: Date オブジェクトは可変（意図しない変更が起こりうる）

**現代的なライブラリ（推奨）**:

より使いやすいライブラリを使うことを推奨:

### **Day.js（軽量、推奨）**

```javascript
// npm install dayjs

import dayjs from "dayjs";

// 現在の日時
const now = dayjs();

// 特定の日時
const date = dayjs("2022-12-01");

// フォーマット
console.log(date.format("YYYY-MM-DD")); // "2022-12-01"
console.log(date.format("YYYY年MM月DD日")); // "2022年12月01日"

// 日付の計算
const tomorrow = date.add(1, "day");
const nextWeek = date.add(7, "day");
const nextMonth = date.add(1, "month");

// 日付の比較
if (date.isBefore(tomorrow)) {
  console.log("date の方が古い");
}

// 相対時間
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
console.log(date.fromNow()); // "2 years ago"
```

### **date-fns（関数型、推奨）**

```javascript
// npm install date-fns

import { format, addDays, addMonths, differenceInDays } from "date-fns";

const date = new Date("2022-12-01");

// フォーマット
console.log(format(date, "yyyy-MM-dd")); // "2022-12-01"
console.log(format(date, "yyyy年MM月dd日")); // "2022年12月01日"

// 日付の計算
const tomorrow = addDays(date, 1);
const nextMonth = addMonths(date, 1);

// 日数の差
const date2 = new Date("2022-12-10");
const diff = differenceInDays(date2, date);
console.log(`${diff} 日の差`); // 9 日の差
```

**まとめ**:

- Date オブジェクトで日付/時刻を扱う
- `getMonth()` は 0 始まり（注意）
- 日付の計算には `setDate()` などを使う
- 現代的なプロジェクトでは Day.js や date-fns を推奨

</div>
<div class="note_content_by_programming_language" id="note_content_Java">

```java
LocalDateTime now = LocalDateTime.now();
```

Java では **java.time** パッケージ（Java 8+）で日付/時刻を扱う。古い `Date` や `Calendar` クラスよりも `LocalDateTime`、`LocalDate`、`LocalTime` を推奨。

**主要なクラス**:

| クラス          | 説明                       |
| --------------- | -------------------------- |
| `LocalDate`     | 日付のみ（年月日）         |
| `LocalTime`     | 時刻のみ（時分秒）         |
| `LocalDateTime` | 日付と時刻                 |
| `ZonedDateTime` | タイムゾーン付き日付時刻   |
| `Instant`       | Unix タイムスタンプ（UTC） |
| `Duration`      | 時間の長さ（時分秒）       |
| `Period`        | 期間の長さ（年月日）       |

**LocalDateTime（日付と時刻）**:

```java
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

// 現在の日時
LocalDateTime now = LocalDateTime.now();
System.out.println(now);  // 2024-07-13T12:23:34.567

// 特定の日時
LocalDateTime date = LocalDateTime.of(2022, 12, 1, 12, 23, 34);
System.out.println(date);  // 2022-12-01T12:23:34

// 文字列から生成
LocalDateTime parsed = LocalDateTime.parse("2022-12-01T12:23:34");

// 各要素を取得
int year = date.getYear();           // 2022
int month = date.getMonthValue();    // 12（1-12）
int day = date.getDayOfMonth();      // 1
int hour = date.getHour();           // 12
int minute = date.getMinute();       // 23
int second = date.getSecond();       // 34
```

**LocalDate（日付のみ）**:

```java
import java.time.LocalDate;

// 現在の日付
LocalDate today = LocalDate.now();
System.out.println(today);  // 2024-07-13

// 特定の日付
LocalDate date = LocalDate.of(2022, 12, 1);

// 各要素を取得
int year = date.getYear();          // 2022
int month = date.getMonthValue();   // 12
int day = date.getDayOfMonth();     // 1
```

**LocalTime（時刻のみ）**:

```java
import java.time.LocalTime;

// 現在の時刻
LocalTime now = LocalTime.now();
System.out.println(now);  // 12:23:34.567

// 特定の時刻
LocalTime time = LocalTime.of(12, 23, 34);

// 各要素を取得
int hour = time.getHour();       // 12
int minute = time.getMinute();   // 23
int second = time.getSecond();   // 34
```

**日付のフォーマット**:

```java
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

LocalDateTime date = LocalDateTime.of(2022, 12, 1, 12, 23, 34);

// 定義済みフォーマット
String iso = date.format(DateTimeFormatter.ISO_DATE_TIME);
System.out.println(iso);  // "2022-12-01T12:23:34"

// カスタムフォーマット
DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
String formatted = date.format(formatter);
System.out.println(formatted);  // "2022-12-01 12:23:34"

// 日本語フォーマット
DateTimeFormatter jpFormatter = DateTimeFormatter.ofPattern("yyyy年MM月dd日 HH時mm分ss秒");
String jpFormatted = date.format(jpFormatter);
System.out.println(jpFormatted);  // "2022年12月01日 12時23分34秒"
```

**文字列から日付へのパース**:

```java
// ISO 8601 形式
LocalDateTime date1 = LocalDateTime.parse("2022-12-01T12:23:34");

// カスタム形式
DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
LocalDateTime date2 = LocalDateTime.parse("2022/12/01 12:23:34", formatter);
```

**日付の計算**:

```java
import java.time.LocalDate;

LocalDate today = LocalDate.now();

// 加算
LocalDate tomorrow = today.plusDays(1);
LocalDate nextWeek = today.plusWeeks(1);
LocalDate nextMonth = today.plusMonths(1);
LocalDate nextYear = today.plusYears(1);

// 減算
LocalDate yesterday = today.minusDays(1);
LocalDate lastWeek = today.minusWeeks(1);
LocalDate lastMonth = today.minusMonths(1);
LocalDate lastYear = today.minusYears(1);
```

**日付の比較**:

```java
LocalDate date1 = LocalDate.of(2022, 12, 1);
LocalDate date2 = LocalDate.of(2022, 12, 10);

if (date1.isBefore(date2)) {
    System.out.println("date1 の方が古い");
}

if (date1.isAfter(date2)) {
    System.out.println("date1 の方が新しい");
}

if (date1.isEqual(date2)) {
    System.out.println("同じ日付");
}
```

**日数の差を計算**:

```java
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

LocalDate date1 = LocalDate.of(2022, 12, 1);
LocalDate date2 = LocalDate.of(2022, 12, 10);

long days = ChronoUnit.DAYS.between(date1, date2);
System.out.println(days + " 日の差");  // 9 日の差
```

**Period（期間）**:

```java
import java.time.Period;
import java.time.LocalDate;

LocalDate date1 = LocalDate.of(2022, 12, 1);
LocalDate date2 = LocalDate.of(2023, 3, 15);

Period period = Period.between(date1, date2);
System.out.println(period.getYears() + " 年");     // 0 年
System.out.println(period.getMonths() + " ヶ月");  // 3 ヶ月
System.out.println(period.getDays() + " 日");      // 14 日
```

**Duration（時間の長さ）**:

```java
import java.time.Duration;
import java.time.LocalTime;

LocalTime time1 = LocalTime.of(10, 0, 0);
LocalTime time2 = LocalTime.of(12, 30, 45);

Duration duration = Duration.between(time1, time2);
System.out.println(duration.toHours() + " 時間");      // 2 時間
System.out.println(duration.toMinutes() + " 分");      // 150 分
System.out.println(duration.getSeconds() + " 秒");     // 9045 秒
```

**ZonedDateTime（タイムゾーン付き）**:

```java
import java.time.ZonedDateTime;
import java.time.ZoneId;

// 現在の日時（タイムゾーン付き）
ZonedDateTime now = ZonedDateTime.now();
System.out.println(now);  // 2024-07-13T12:23:34.567+09:00[Asia/Tokyo]

// 特定のタイムゾーン
ZonedDateTime tokyo = ZonedDateTime.now(ZoneId.of("Asia/Tokyo"));
ZonedDateTime newYork = ZonedDateTime.now(ZoneId.of("America/New_York"));

// タイムゾーン変換
ZonedDateTime tokyoTime = ZonedDateTime.now(ZoneId.of("Asia/Tokyo"));
ZonedDateTime utcTime = tokyoTime.withZoneSameInstant(ZoneId.of("UTC"));
```

**Instant（Unix タイムスタンプ）**:

```java
import java.time.Instant;

// 現在のタイムスタンプ
Instant now = Instant.now();
System.out.println(now);  // 2024-07-13T03:23:34.567Z

// エポック秒から生成
Instant instant = Instant.ofEpochSecond(1669865014);

// エポック秒を取得
long epochSecond = now.getEpochSecond();
long epochMilli = now.toEpochMilli();
```

**古い Date クラス（非推奨）**:

```java
import java.util.Date;

// 非推奨（互換性のためのみ使用）
Date date = new Date();
System.out.println(date);

// LocalDateTime に変換
LocalDateTime ldt = LocalDateTime.ofInstant(date.toInstant(), ZoneId.systemDefault());

// LocalDateTime から Date に変換
Date convertedDate = Date.from(ldt.atZone(ZoneId.systemDefault()).toInstant());
```

**実用例**:

```java
import java.time.*;
import java.time.format.DateTimeFormatter;

public class DateExample {
    public static void main(String[] args) {
        // 現在の日時
        LocalDateTime now = LocalDateTime.now();
        System.out.println("現在: " + now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));

        // 3日後
        LocalDateTime future = now.plusDays(3);
        System.out.println("3日後: " + future.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));

        // 誕生日まであと何日？
        LocalDate birthday = LocalDate.of(2024, 12, 25);
        LocalDate today = LocalDate.now();
        long daysUntilBirthday = ChronoUnit.DAYS.between(today, birthday);
        System.out.println("誕生日まであと " + daysUntilBirthday + " 日");
    }
}
```

**まとめ**:

- `LocalDateTime`、`LocalDate`、`LocalTime` を使う（Java 8+）
- 月は 1 始まり（1-12）
- 不変オブジェクト（スレッドセーフ）
- タイムゾーンが必要な場合は `ZonedDateTime`

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
from datetime import datetime
now = datetime.now()
```

Python では **datetime** モジュールで日付/時刻を扱う。

**主要なクラス**:

| クラス      | 説明         |
| ----------- | ------------ |
| `datetime`  | 日付と時刻   |
| `date`      | 日付のみ     |
| `time`      | 時刻のみ     |
| `timedelta` | 時間の差     |
| `timezone`  | タイムゾーン |

**datetime（日付と時刻）**:

```python
from datetime import datetime

# 現在の日時
now = datetime.now()
print(now)  # 2024-07-13 12:23:34.567890

# 特定の日時
dt = datetime(2022, 12, 1, 12, 23, 34)
print(dt)  # 2022-12-01 12:23:34

# 各要素を取得
year = dt.year          # 2022
month = dt.month        # 12（1-12）
day = dt.day            # 1
hour = dt.hour          # 12
minute = dt.minute      # 23
second = dt.second      # 34
microsecond = dt.microsecond  # 0
```

**date（日付のみ）**:

```python
from datetime import date

# 現在の日付
today = date.today()
print(today)  # 2024-07-13

# 特定の日付
d = date(2022, 12, 1)
print(d)  # 2022-12-01

# 各要素を取得
year = d.year    # 2022
month = d.month  # 12
day = d.day      # 1
```

**time（時刻のみ）**:

```python
from datetime import time

# 特定の時刻
t = time(12, 23, 34)
print(t)  # 12:23:34

# 各要素を取得
hour = t.hour       # 12
minute = t.minute   # 23
second = t.second   # 34
```

**日付のフォーマット**:

```python
from datetime import datetime

dt = datetime(2022, 12, 1, 12, 23, 34)

# strftime でフォーマット
formatted = dt.strftime("%Y-%m-%d %H:%M:%S")
print(formatted)  # "2022-12-01 12:23:34"

# 日本語フォーマット
jp_formatted = dt.strftime("%Y年%m月%d日 %H時%M分%S秒")
print(jp_formatted)  # "2022年12月01日 12時23分34秒"

# ISO 8601 形式
iso = dt.isoformat()
print(iso)  # "2022-12-01T12:23:34"
```

**フォーマット指定子**:

| 指定子 | 説明              | 例       |
| ------ | ----------------- | -------- |
| `%Y`   | 4 桁の年          | 2022     |
| `%m`   | 2 桁の月（01-12） | 12       |
| `%d`   | 2 桁の日（01-31） | 01       |
| `%H`   | 2 桁の時（00-23） | 12       |
| `%M`   | 2 桁の分（00-59） | 23       |
| `%S`   | 2 桁の秒（00-59） | 34       |
| `%A`   | 曜日（フル）      | Thursday |
| `%a`   | 曜日（短縮）      | Thu      |
| `%B`   | 月名（フル）      | December |
| `%b`   | 月名（短縮）      | Dec      |

**文字列から日付へのパース**:

```python
from datetime import datetime

# strptime でパース
dt1 = datetime.strptime("2022-12-01 12:23:34", "%Y-%m-%d %H:%M:%S")
print(dt1)  # 2022-12-01 12:23:34

# ISO 8601 形式
dt2 = datetime.fromisoformat("2022-12-01T12:23:34")
print(dt2)  # 2022-12-01 12:23:34
```

**日付の計算（timedelta）**:

```python
from datetime import datetime, timedelta

now = datetime.now()

# 加算
tomorrow = now + timedelta(days=1)
next_week = now + timedelta(weeks=1)
next_hour = now + timedelta(hours=1)

# 減算
yesterday = now - timedelta(days=1)
last_week = now - timedelta(weeks=1)

# 日数の差
dt1 = datetime(2022, 12, 1)
dt2 = datetime(2022, 12, 10)
diff = dt2 - dt1
print(f"{diff.days} 日の差")  # 9 日の差
print(f"{diff.total_seconds()} 秒の差")  # 777600.0 秒の差
```

**日付の比較**:

```python
from datetime import datetime

dt1 = datetime(2022, 12, 1)
dt2 = datetime(2022, 12, 10)

if dt1 < dt2:
    print("dt1 の方が古い")

if dt1 > dt2:
    print("dt1 の方が新しい")

if dt1 == dt2:
    print("同じ日時")
```

**タイムゾーン**:

```python
from datetime import datetime, timezone, timedelta

# UTC の日時
utc_now = datetime.now(timezone.utc)
print(utc_now)  # 2024-07-13 03:23:34.567890+00:00

# 日本時間（UTC+9）
jst = timezone(timedelta(hours=9))
jst_now = datetime.now(jst)
print(jst_now)  # 2024-07-13 12:23:34.567890+09:00

# タイムゾーン変換
utc_time = datetime.now(timezone.utc)
jst_time = utc_time.astimezone(jst)
```

**タイムスタンプ**:

```python
from datetime import datetime

# 現在のタイムスタンプ
timestamp = datetime.now().timestamp()
print(timestamp)  # 1720870255.912345

# タイムスタンプから日時を生成
dt = datetime.fromtimestamp(timestamp)
print(dt)  # 2024-07-13 12:23:34.567890

# UTC タイムスタンプから日時を生成
dt_utc = datetime.utcfromtimestamp(timestamp)
print(dt_utc)  # 2024-07-13 03:23:34.567890
```

**曜日の取得**:

```python
from datetime import datetime

dt = datetime(2022, 12, 1)

# 曜日（0=月曜、6=日曜）
weekday = dt.weekday()
print(f"曜日: {weekday}")  # 3（木曜）

# 曜日（1=月曜、7=日曜）
isoweekday = dt.isoweekday()
print(f"ISO曜日: {isoweekday}")  # 4（木曜）

# 曜日名
weekdays = ["月", "火", "水", "木", "金", "土", "日"]
print(f"曜日: {weekdays[weekday]}曜日")  # "木曜日"
```

**実用例**:

### **年齢を計算**

```python
from datetime import date

def calculate_age(birthday):
    today = date.today()
    age = today.year - birthday.year
    if (today.month, today.day) < (birthday.month, birthday.day):
        age -= 1
    return age

birthday = date(1990, 5, 15)
age = calculate_age(birthday)
print(f"年齢: {age} 歳")
```

### **営業日の計算**

```python
from datetime import date, timedelta

def add_business_days(start_date, days):
    current_date = start_date
    added_days = 0

    while added_days < days:
        current_date += timedelta(days=1)
        # 土曜（5）、日曜（6）をスキップ
        if current_date.weekday() < 5:
            added_days += 1

    return current_date

today = date.today()
future = add_business_days(today, 10)
print(f"10営業日後: {future}")
```

### **経過時間の計測**

```python
from datetime import datetime
import time

start = datetime.now()

# 処理を実行
time.sleep(1)

end = datetime.now()
elapsed = end - start
print(f"実行時間: {elapsed.total_seconds()} 秒")
```

**外部ライブラリ（推奨）**:

### **python-dateutil（柔軟なパース）**

```python
# pip install python-dateutil

from dateutil import parser

# 柔軟なパース
dt1 = parser.parse("2022-12-01")
dt2 = parser.parse("Dec 1, 2022")
dt3 = parser.parse("01/12/2022")

print(dt1)  # 2022-12-01 00:00:00
```

### **pytz（タイムゾーン）**

```python
# pip install pytz

import pytz
from datetime import datetime

# タイムゾーンを指定
tokyo = pytz.timezone('Asia/Tokyo')
new_york = pytz.timezone('America/New_York')

# 日本時間
tokyo_time = datetime.now(tokyo)
print(tokyo_time)

# タイムゾーン変換
ny_time = tokyo_time.astimezone(new_york)
print(ny_time)
```

**まとめ**:

- `datetime` モジュールで日付/時刻を扱う
- 月は 1 始まり（1-12）
- `timedelta` で日付の計算
- タイムゾーンには `timezone` または `pytz`

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
import "time"
now := time.Now()
```

Go では **time** パッケージで日付/時刻を扱う。

**time.Time 型**:

Go の日付/時刻は `time.Time` 型で表現される。

```go
package main

import (
    "fmt"
    "time"
)

func main() {
    // 現在の日時
    now := time.Now()
    fmt.Println(now)  // 2024-07-13 12:23:34.567890123 +0900 JST

    // 特定の日時
    date := time.Date(2022, 12, 1, 12, 23, 34, 0, time.UTC)
    fmt.Println(date)  // 2022-12-01 12:23:34 +0000 UTC

    // 各要素を取得
    year := date.Year()          // 2022
    month := date.Month()        // December
    day := date.Day()            // 1
    hour := date.Hour()          // 12
    minute := date.Minute()      // 23
    second := date.Second()      // 34
    nanosecond := date.Nanosecond()  // 0
}
```

**月の取得**:

```go
date := time.Date(2022, 12, 1, 0, 0, 0, 0, time.UTC)

// time.Month 型（文字列表示可能）
month := date.Month()
fmt.Println(month)  // "December"

// 数値として取得（1-12）
monthInt := int(date.Month())
fmt.Println(monthInt)  // 12
```

**日付のフォーマット**:

Go では参照日時 `2006-01-02 15:04:05` を使ってフォーマットを指定する。

```go
package main

import (
    "fmt"
    "time"
)

func main() {
    date := time.Date(2022, 12, 1, 12, 23, 34, 0, time.UTC)

    // 基本的なフォーマット
    fmt.Println(date.Format("2006-01-02"))              // "2022-12-01"
    fmt.Println(date.Format("2006/01/02"))              // "2022/12/01"
    fmt.Println(date.Format("2006-01-02 15:04:05"))     // "2022-12-01 12:23:34"
    fmt.Println(date.Format("01/02/2006 03:04:05 PM"))  // "12/01/2022 12:23:34 PM"

    // RFC3339 形式（ISO 8601）
    fmt.Println(date.Format(time.RFC3339))  // "2022-12-01T12:23:34Z"

    // 日本語フォーマット
    fmt.Println(date.Format("2006年01月02日 15時04分05秒"))
    // "2022年12月01日 12時23分34秒"
}
```

**参照日時のパターン**:

| パターン  | 説明            | 例       |
| --------- | --------------- | -------- |
| `2006`    | 4 桁の年        | 2022     |
| `06`      | 2 桁の年        | 22       |
| `01`      | 2 桁の月        | 12       |
| `02`      | 2 桁の日        | 01       |
| `15`      | 2 桁の時（24h） | 12       |
| `03`      | 2 桁の時（12h） | 12       |
| `04`      | 2 桁の分        | 23       |
| `05`      | 2 桁の秒        | 34       |
| `PM`      | AM/PM           | PM       |
| `Monday`  | 曜日（フル）    | Thursday |
| `Mon`     | 曜日（短縮）    | Thu      |
| `January` | 月名（フル）    | December |
| `Jan`     | 月名（短縮）    | Dec      |

**文字列から日付へのパース**:

```go
// 基本的なパース
date1, err := time.Parse("2006-01-02", "2022-12-01")
if err != nil {
    fmt.Println("エラー:", err)
}

// 日時をパース
date2, err := time.Parse("2006-01-02 15:04:05", "2022-12-01 12:23:34")

// RFC3339 形式（ISO 8601）
date3, err := time.Parse(time.RFC3339, "2022-12-01T12:23:34Z")
```

**日付の計算（Duration）**:

```go
package main

import (
    "fmt"
    "time"
)

func main() {
    now := time.Now()

    // 加算
    tomorrow := now.Add(24 * time.Hour)
    nextWeek := now.Add(7 * 24 * time.Hour)
    nextHour := now.Add(1 * time.Hour)
    nextMinute := now.Add(1 * time.Minute)

    // 減算
    yesterday := now.Add(-24 * time.Hour)
    lastWeek := now.Add(-7 * 24 * time.Hour)

    // 月や年の加算（AddDate）
    nextMonth := now.AddDate(0, 1, 0)   // 年, 月, 日
    nextYear := now.AddDate(1, 0, 0)
    lastYear := now.AddDate(-1, 0, 0)
}
```

**時間の差（Duration）**:

```go
date1 := time.Date(2022, 12, 1, 0, 0, 0, 0, time.UTC)
date2 := time.Date(2022, 12, 10, 0, 0, 0, 0, time.UTC)

diff := date2.Sub(date1)
fmt.Println("差:", diff)                      // 216h0m0s
fmt.Println("時間:", diff.Hours())            // 216
fmt.Println("分:", diff.Minutes())            // 12960
fmt.Println("秒:", diff.Seconds())            // 777600
fmt.Println("日数:", diff.Hours()/24)         // 9
```

**日付の比較**:

```go
date1 := time.Date(2022, 12, 1, 0, 0, 0, 0, time.UTC)
date2 := time.Date(2022, 12, 10, 0, 0, 0, 0, time.UTC)

if date1.Before(date2) {
    fmt.Println("date1 の方が古い")
}

if date1.After(date2) {
    fmt.Println("date1 の方が新しい")
}

if date1.Equal(date2) {
    fmt.Println("同じ日時")
}
```

**タイムゾーン**:

```go
package main

import (
    "fmt"
    "time"
)

func main() {
    // UTC
    utc := time.Now().UTC()
    fmt.Println("UTC:", utc)

    // ローカルタイムゾーン
    local := time.Now()
    fmt.Println("Local:", local)

    // 特定のタイムゾーン
    tokyo, _ := time.LoadLocation("Asia/Tokyo")
    tokyoTime := time.Now().In(tokyo)
    fmt.Println("Tokyo:", tokyoTime)

    newYork, _ := time.LoadLocation("America/New_York")
    nyTime := time.Now().In(newYork)
    fmt.Println("NewYork:", nyTime)

    // タイムゾーン変換
    jstTime := time.Now()
    utcTime := jstTime.UTC()
    fmt.Println("JST:", jstTime)
    fmt.Println("UTC:", utcTime)
}
```

**Unix タイムスタンプ**:

```go
// 現在のタイムスタンプ
timestamp := time.Now().Unix()          // 秒
timestampMilli := time.Now().UnixMilli()  // ミリ秒
timestampNano := time.Now().UnixNano()    // ナノ秒

fmt.Println("秒:", timestamp)          // 1720870255
fmt.Println("ミリ秒:", timestampMilli) // 1720870255912
fmt.Println("ナノ秒:", timestampNano)  // 1720870255912345678

// タイムスタンプから日時を生成
date := time.Unix(timestamp, 0)
fmt.Println(date)
```

**曜日の取得**:

```go
date := time.Date(2022, 12, 1, 0, 0, 0, 0, time.UTC)

// time.Weekday 型
weekday := date.Weekday()
fmt.Println(weekday)  // "Thursday"

// 数値として取得（0=Sunday, 6=Saturday）
weekdayInt := int(weekday)
fmt.Println(weekdayInt)  // 4

// 日本語の曜日
weekdays := []string{"日", "月", "火", "水", "木", "金", "土"}
fmt.Printf("曜日: %s曜日\n", weekdays[weekday])  // "木曜日"
```

**Sleep（待機）**:

```go
// 1秒待機
time.Sleep(1 * time.Second)

// 500ミリ秒待機
time.Sleep(500 * time.Millisecond)

// 100マイクロ秒待機
time.Sleep(100 * time.Microsecond)
```

**タイマー**:

```go
package main

import (
    "fmt"
    "time"
)

func main() {
    // 3秒後に実行
    timer := time.NewTimer(3 * time.Second)
    <-timer.C
    fmt.Println("3秒経過")

    // タイマーをキャンセル
    timer2 := time.NewTimer(5 * time.Second)
    go func() {
        <-timer2.C
        fmt.Println("5秒経過")
    }()
    timer2.Stop()  // キャンセル
}
```

**Ticker（定期実行）**:

```go
package main

import (
    "fmt"
    "time"
)

func main() {
    // 1秒ごとに実行
    ticker := time.NewTicker(1 * time.Second)
    defer ticker.Stop()

    count := 0
    for range ticker.C {
        count++
        fmt.Printf("%d秒経過\n", count)
        if count >= 5 {
            break
        }
    }
}
```

**実用例**:

### **経過時間の計測**

```go
start := time.Now()

// 処理を実行
time.Sleep(1 * time.Second)

elapsed := time.Since(start)
fmt.Printf("実行時間: %v\n", elapsed)  // 実行時間: 1.000123456s
```

### **年齢を計算**

```go
func calculateAge(birthday time.Time) int {
    now := time.Now()
    age := now.Year() - birthday.Year()

    if now.Month() < birthday.Month() ||
       (now.Month() == birthday.Month() && now.Day() < birthday.Day()) {
        age--
    }

    return age
}

birthday := time.Date(1990, 5, 15, 0, 0, 0, 0, time.UTC)
age := calculateAge(birthday)
fmt.Printf("年齢: %d 歳\n", age)
```

### **営業日の計算**

```go
func addBusinessDays(startDate time.Time, days int) time.Time {
    currentDate := startDate
    addedDays := 0

    for addedDays < days {
        currentDate = currentDate.Add(24 * time.Hour)
        // 土曜（6）、日曜（0）をスキップ
        weekday := currentDate.Weekday()
        if weekday != time.Saturday && weekday != time.Sunday {
            addedDays++
        }
    }

    return currentDate
}

today := time.Now()
future := addBusinessDays(today, 10)
fmt.Printf("10営業日後: %s\n", future.Format("2006-01-02"))
```

**まとめ**:

- `time.Time` 型で日付/時刻を扱う
- 月は 1 始まり（1-12）
- フォーマットは参照日時 `2006-01-02 15:04:05` を使う
- タイムゾーンは `time.LoadLocation` で指定
- 不変オブジェクト（スレッドセーフ）

</div>
