---
title: "リストに要素を加える"
date: "2019-10-23T19:35:30+09:00"
excerpt: "リストに要素を加える方法。"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
updatedAt: "2019-10-23T19:35:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

リストに要素を加える方法についてを示す。

(配列に関しては固定長のため、要素を加えるというのは基本ないため、ここでは述べない。)

<div class="note_content_by_programming_language" id="note_content_Java">

```java
List<Integer> list = new ArrayList<>();
list.add(1);           // 末尾に追加
list.add(0, 10);       // 指定位置に追加
```

Java では**add()**メソッドでリストに要素を追加する。

- **末尾に追加**: `list.add(element)`
- **指定位置に追加**: `list.add(index, element)`

```java
List<Integer> list = new ArrayList<>(Arrays.asList(1, 2, 3));
list.add(4);        // 末尾に追加 → [1, 2, 3, 4]
list.add(1, 10);    // インデックス1に追加 → [1, 10, 2, 3, 4]
System.out.println(list);
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
arr = [1, 2, 3]
arr.append(4)       # 末尾に追加
arr.insert(1, 10)   # 指定位置に追加
```

Python では**append()**と**insert()**でリストに要素を追加する。

- **末尾に追加**: `list.append(element)`
- **指定位置に追加**: `list.insert(index, element)`

```python
arr = [1, 2, 3]
arr.append(4)       # 末尾に追加 → [1, 2, 3, 4]
arr.insert(1, 10)   # インデックス1に追加 → [1, 10, 2, 3, 4]
print(arr)          # [1, 10, 2, 3, 4]

# リスト同士を結合する場合
arr.extend([5, 6])  # [1, 10, 2, 3, 4, 5, 6]
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
let arr = [1, 2, 3];
arr.push(4); // 末尾に追加
arr.unshift(0); // 先頭に追加
arr.splice(1, 0, 10); // 指定位置に追加
```

JavaScript では**push()**, **unshift()**, **splice()**で配列に要素を追加する。

- **末尾に追加**: `arr.push(element)`
- **先頭に追加**: `arr.unshift(element)`
- **指定位置に追加**: `arr.splice(index, 0, element)`

```javascript
let arr = [1, 2, 3];
arr.push(4); // 末尾に追加 → [1, 2, 3, 4]
arr.unshift(0); // 先頭に追加 → [0, 1, 2, 3, 4]
arr.splice(2, 0, 10); // インデックス2に追加 → [0, 1, 10, 2, 3, 4]
console.log(arr);

// 複数要素を追加
arr.push(5, 6); // [0, 1, 10, 2, 3, 4, 5, 6]
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
slice := []int{1, 2, 3}
slice = append(slice, 4)      // 末尾に追加
slice = append(slice, 5, 6)   // 複数追加
```

Go では組み込み関数**append()**でスライスに要素を追加する。

- **末尾に追加**: `slice = append(slice, element)`
- **複数追加**: `slice = append(slice, elem1, elem2, ...)`

**注意**: `append()`は新しいスライスを返すため、必ず代入が必要。

```go
slice := []int{1, 2, 3}
slice = append(slice, 4)        // 末尾に追加 → [1, 2, 3, 4]
slice = append(slice, 5, 6, 7)  // 複数追加 → [1, 2, 3, 4, 5, 6, 7]
fmt.Println(slice)

// スライス同士を結合する場合
other := []int{8, 9}
slice = append(slice, other...)  // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

</div>
