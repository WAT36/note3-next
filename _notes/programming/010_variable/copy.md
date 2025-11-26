---
title: "浅いコピー・深いコピー"
excerpt: "変数の浅いコピー（シャローコピー）と深いコピー（ディープコピー）について"
coverImage: ""
date: '2025-11-25T00:12:01.000Z'
updatedAt: '2025-11-25T00:12:01.000Z'
tag: ["Go", "Java", "Python", "Javascript"]
programming: ["Go", "Java", "Python", "Javascript"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
mode: programming
---

変数の浅いコピー（シャローコピー）と深いコピー（ディープコピー）について説明する。

**浅いコピー（シャローコピー）とは**:

オブジェクトや配列のトップレベルのみをコピーし、内部のネストされたオブジェクトや配列は参照をコピーする。元のデータと新しいデータが内部のオブジェクトを共有する。

**深いコピー（ディープコピー）とは**:

オブジェクトや配列の全階層を再帰的にコピーし、完全に独立した新しいデータを作成する。元のデータと新しいデータは完全に分離される。

**浅いコピーと深いコピーの違い**:

| 項目                         | 浅いコピー           | 深いコピー       |
| ---------------------------- | -------------------- | ---------------- |
| **コピー範囲**               | トップレベルのみ     | 全階層を再帰的に |
| **ネストされたオブジェクト** | 参照を共有           | 完全に独立       |
| **パフォーマンス**           | 高速                 | 低速             |
| **メモリ使用量**             | 少ない               | 多い             |
| **使用場面**                 | シンプルなデータ構造 | 複雑なデータ構造 |

**浅いコピーの問題点**:

```javascript
// 浅いコピーの例（JavaScript）
const original = { a: 1, b: { c: 2 } };
const copy = { ...original };

copy.a = 10; // トップレベルは独立
console.log(original.a); // 1（変更されない）

copy.b.c = 20; // ネストされたオブジェクトは共有
console.log(original.b.c); // 20（変更される！）
```

**いつ深いコピーが必要か**:

1. **ネストされたデータ構造**: 配列やオブジェクトが入れ子になっている場合
2. **完全な独立性が必要**: 元のデータに影響を与えずに変更したい場合
3. **不変性の維持**: 関数型プログラミングで元のデータを保持したい場合

各言語で浅いコピーと深いコピーの方法が異なる。

<div class="note_content_by_programming_language" id="note_content_Go">

```go
// 浅いコピー
copy := original
// 深いコピー（手動またはライブラリ）
```

Go では浅いコピーと深いコピーの方法がデータ構造によって異なる。

**1. 配列（Array）のコピー**:

Go の配列は値型なので、代入するだけで深いコピーになる。

```go
package main

import "fmt"

func main() {
    // 配列は値型なので代入で深いコピー
    original := [3]int{1, 2, 3}
    copy := original

    copy[0] = 10
    fmt.Println(original[0])  // 1（変更されない）
    fmt.Println(copy[0])      // 10
}
```

**2. スライス（Slice）のコピー**:

**浅いコピー**:

```go
// 浅いコピー（参照をコピー）
original := []int{1, 2, 3}
copy := original

copy[0] = 10
fmt.Println(original[0])  // 10（変更される！）
```

**深いコピー（方法 1: make + copy）**:

```go
// 深いコピー
original := []int{1, 2, 3}
copy := make([]int, len(original))
copy(copy, original)

copy[0] = 10
fmt.Println(original[0])  // 1（変更されない）
```

**深いコピー（方法 2: append）**:

```go
// 深いコピー
original := []int{1, 2, 3}
copy := append([]int{}, original...)

copy[0] = 10
fmt.Println(original[0])  // 1（変更されない）
```

**3. マップ（Map）のコピー**:

**浅いコピー**:

```go
// 浅いコピー（参照をコピー）
original := map[string]int{"a": 1, "b": 2}
copy := original

copy["a"] = 10
fmt.Println(original["a"])  // 10（変更される！）
```

**深いコピー（手動）**:

```go
// 深いコピー（手動でコピー）
original := map[string]int{"a": 1, "b": 2}
copy := make(map[string]int)
for k, v := range original {
    copy[k] = v
}

copy["a"] = 10
fmt.Println(original["a"])  // 1（変更されない）
```

**4. 構造体（Struct）のコピー**:

**浅いコピー**:

構造体自体は値型だが、フィールドにスライスやマップがある場合は参照が共有される。

```go
type Person struct {
    Name    string
    Hobbies []string
}

// 浅いコピー
original := Person{Name: "Alice", Hobbies: []string{"Reading", "Gaming"}}
copy := original

copy.Name = "Bob"
fmt.Println(original.Name)  // Alice（フィールドは独立）

copy.Hobbies[0] = "Cooking"
fmt.Println(original.Hobbies[0])  // Cooking（スライスは共有される！）
```

**深いコピー（手動）**:

```go
// 深いコピー（手動でスライスをコピー）
original := Person{Name: "Alice", Hobbies: []string{"Reading", "Gaming"}}
copy := Person{
    Name:    original.Name,
    Hobbies: append([]string{}, original.Hobbies...),
}

copy.Hobbies[0] = "Cooking"
fmt.Println(original.Hobbies[0])  // Reading（変更されない）
```

**5. ネストされた構造体の深いコピー**:

**ライブラリを使用（推奨）**:

```bash
go get github.com/jinzhu/copier
# または
go get github.com/mohae/deepcopy
```

**copier の使用例**:

```go
package main

import (
    "fmt"
    "github.com/jinzhu/copier"
)

type Address struct {
    City    string
    Country string
}

type Person struct {
    Name    string
    Age     int
    Address Address
    Hobbies []string
}

func main() {
    original := Person{
        Name: "Alice",
        Age:  30,
        Address: Address{
            City:    "Tokyo",
            Country: "Japan",
        },
        Hobbies: []string{"Reading", "Gaming"},
    }

    var copy Person
    copier.Copy(&copy, &original)

    copy.Address.City = "Osaka"
    copy.Hobbies[0] = "Cooking"

    fmt.Println(original.Address.City)  // Tokyo（変更されない）
    fmt.Println(original.Hobbies[0])    // Reading（変更されない）
}
```

**deepcopy の使用例**:

```go
package main

import (
    "fmt"
    "github.com/mohae/deepcopy"
)

func main() {
    original := map[string]interface{}{
        "name": "Alice",
        "age":  30,
        "address": map[string]string{
            "city": "Tokyo",
        },
        "hobbies": []string{"Reading", "Gaming"},
    }

    copy := deepcopy.Copy(original).(map[string]interface{})

    copy["age"] = 40
    copy["address"].(map[string]string)["city"] = "Osaka"
    copy["hobbies"].([]string)[0] = "Cooking"

    fmt.Println(original["age"])  // 30（変更されない）
    fmt.Println(original["address"].(map[string]string)["city"])  // Tokyo（変更されない）
    fmt.Println(original["hobbies"].([]string)[0])  // Reading（変更されない）
}
```

**6. JSON を使った深いコピー（汎用的だが低速）**:

```go
package main

import (
    "encoding/json"
    "fmt"
)

type Person struct {
    Name    string
    Age     int
    Address struct {
        City string
    }
}

func deepCopyJSON(src, dst interface{}) error {
    data, err := json.Marshal(src)
    if err != nil {
        return err
    }
    return json.Unmarshal(data, dst)
}

func main() {
    original := Person{Name: "Alice", Age: 30}
    original.Address.City = "Tokyo"

    var copy Person
    deepCopyJSON(&original, &copy)

    copy.Address.City = "Osaka"
    fmt.Println(original.Address.City)  // Tokyo（変更されない）
}
```

**実用例**:

```go
package main

import "fmt"

// スライスの深いコピー関数
func deepCopySlice(src []int) []int {
    dst := make([]int, len(src))
    copy(dst, src)
    return dst
}

// マップの深いコピー関数
func deepCopyMap(src map[string]int) map[string]int {
    dst := make(map[string]int)
    for k, v := range src {
        dst[k] = v
    }
    return dst
}

func main() {
    // スライスの深いコピー
    originalSlice := []int{1, 2, 3}
    copySlice := deepCopySlice(originalSlice)
    copySlice[0] = 10
    fmt.Println(originalSlice[0])  // 1

    // マップの深いコピー
    originalMap := map[string]int{"a": 1, "b": 2}
    copyMap := deepCopyMap(originalMap)
    copyMap["a"] = 10
    fmt.Println(originalMap["a"])  // 1
}
```

**まとめ**:

- **配列**: 値型なので代入で深いコピー
- **スライス**: `make` + `copy` または `append` で深いコピー
- **マップ**: 手動でループしてコピー
- **構造体**: フィールドごとにコピー（スライス/マップは再帰的に）
- **複雑なデータ**: ライブラリ（`copier`、`deepcopy`）または JSON を使用
- スライスとマップは参照型なので浅いコピーに注意

</div>
<div class="note_content_by_programming_language" id="note_content_Java">

```java
// 浅いコピー
clone()
// 深いコピー
new ClassName(original)
```

Java では浅いコピーと深いコピーの方法がいくつかある。

**1. プリミティブ型と String のコピー**:

プリミティブ型と String は値型（または不変）なので、代入で深いコピーになる。

```java
// プリミティブ型
int original = 10;
int copy = original;
copy = 20;
System.out.println(original);  // 10（変更されない）

// String（不変）
String originalStr = "Hello";
String copyStr = originalStr;
copyStr = "World";
System.out.println(originalStr);  // Hello（変更されない）
```

**2. 配列のコピー**:

**浅いコピー（代入）**:

```java
// 浅いコピー（参照をコピー）
int[] original = {1, 2, 3};
int[] copy = original;

copy[0] = 10;
System.out.println(original[0]);  // 10（変更される！）
```

**深いコピー（方法 1: clone）**:

```java
// 深いコピー
int[] original = {1, 2, 3};
int[] copy = original.clone();

copy[0] = 10;
System.out.println(original[0]);  // 1（変更されない）
```

**深いコピー（方法 2: Arrays.copyOf）**:

```java
import java.util.Arrays;

// 深いコピー
int[] original = {1, 2, 3};
int[] copy = Arrays.copyOf(original, original.length);

copy[0] = 10;
System.out.println(original[0]);  // 1（変更されない）
```

**深いコピー（方法 3: System.arraycopy）**:

```java
// 深いコピー
int[] original = {1, 2, 3};
int[] copy = new int[original.length];
System.arraycopy(original, 0, copy, 0, original.length);

copy[0] = 10;
System.out.println(original[0]);  // 1（変更されない）
```

**3. リスト（List）のコピー**:

**浅いコピー（方法 1: コンストラクタ）**:

```java
import java.util.ArrayList;
import java.util.List;

// 浅いコピー（リスト自体は別だが、要素は共有）
List<Person> original = new ArrayList<>();
original.add(new Person("Alice", 30));

List<Person> copy = new ArrayList<>(original);

copy.get(0).setAge(40);
System.out.println(original.get(0).getAge());  // 40（変更される！）
```

**浅いコピー（方法 2: addAll）**:

```java
// 浅いコピー
List<Person> copy = new ArrayList<>();
copy.addAll(original);
```

**浅いコピー（方法 3: Java 10+ - List.copyOf）**:

```java
// 浅いコピー（不変リスト）
List<Person> copy = List.copyOf(original);
```

**深いコピー（手動）**:

```java
// 深いコピー（手動で各要素をコピー）
List<Person> original = new ArrayList<>();
original.add(new Person("Alice", 30));

List<Person> copy = new ArrayList<>();
for (Person person : original) {
    copy.add(new Person(person));  // コピーコンストラクタ
}

copy.get(0).setAge(40);
System.out.println(original.get(0).getAge());  // 30（変更されない）
```

**深いコピー（Stream）**:

```java
import java.util.stream.Collectors;

// 深いコピー（Stream を使用）
List<Person> copy = original.stream()
    .map(Person::new)  // コピーコンストラクタ
    .collect(Collectors.toList());
```

**4. オブジェクトのコピー**:

**浅いコピー（clone メソッド）**:

```java
public class Person implements Cloneable {
    private String name;
    private int age;
    private List<String> hobbies;

    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();  // 浅いコピー
    }
}

// 使用例
Person original = new Person("Alice", 30);
original.setHobbies(Arrays.asList("Reading", "Gaming"));

Person copy = (Person) original.clone();

copy.setAge(40);
System.out.println(original.getAge());  // 30（フィールドは独立）

copy.getHobbies().set(0, "Cooking");
System.out.println(original.getHobbies().get(0));  // Cooking（リストは共有される！）
```

**深いコピー（clone メソッドをオーバーライド）**:

```java
public class Person implements Cloneable {
    private String name;
    private int age;
    private List<String> hobbies;

    @Override
    protected Object clone() throws CloneNotSupportedException {
        Person cloned = (Person) super.clone();
        // リストを深いコピー
        cloned.hobbies = new ArrayList<>(this.hobbies);
        return cloned;
    }
}

// 使用例
Person original = new Person("Alice", 30);
original.setHobbies(Arrays.asList("Reading", "Gaming"));

Person copy = (Person) original.clone();

copy.getHobbies().set(0, "Cooking");
System.out.println(original.getHobbies().get(0));  // Reading（変更されない）
```

**深いコピー（コピーコンストラクタ、推奨）**:

```java
public class Person {
    private String name;
    private int age;
    private Address address;
    private List<String> hobbies;

    // コピーコンストラクタ
    public Person(Person other) {
        this.name = other.name;
        this.age = other.age;
        this.address = new Address(other.address);  // Address もコピー
        this.hobbies = new ArrayList<>(other.hobbies);
    }
}

// 使用例
Person original = new Person("Alice", 30);
Person copy = new Person(original);

copy.setAge(40);
copy.getHobbies().set(0, "Cooking");

System.out.println(original.getAge());  // 30（変更されない）
System.out.println(original.getHobbies().get(0));  // Reading（変更されない）
```

**5. シリアライゼーションを使った深いコピー（汎用的だが低速）**:

```java
import java.io.*;

public class DeepCopyUtil {
    public static <T extends Serializable> T deepCopy(T object) {
        try {
            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            ObjectOutputStream oos = new ObjectOutputStream(bos);
            oos.writeObject(object);
            oos.flush();

            ByteArrayInputStream bis = new ByteArrayInputStream(bos.toByteArray());
            ObjectInputStream ois = new ObjectInputStream(bis);
            return (T) ois.readObject();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}

// 使用例
Person original = new Person("Alice", 30);
Person copy = DeepCopyUtil.deepCopy(original);

copy.setAge(40);
System.out.println(original.getAge());  // 30（変更されない）
```

**6. Apache Commons Lang を使った深いコピー**:

```xml
<!-- Maven -->
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-lang3</artifactId>
    <version>3.13.0</version>
</dependency>
```

```java
import org.apache.commons.lang3.SerializationUtils;

// 使用例（クラスは Serializable を実装する必要がある）
Person original = new Person("Alice", 30);
Person copy = SerializationUtils.clone(original);

copy.setAge(40);
System.out.println(original.getAge());  // 30（変更されない）
```

**7. JSON を使った深いコピー（Jackson、Gson）**:

**Jackson**:

```xml
<!-- Maven -->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.15.3</version>
</dependency>
```

```java
import com.fasterxml.jackson.databind.ObjectMapper;

public class DeepCopyUtil {
    private static final ObjectMapper mapper = new ObjectMapper();

    public static <T> T deepCopy(T object, Class<T> clazz) {
        try {
            String json = mapper.writeValueAsString(object);
            return mapper.readValue(json, clazz);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}

// 使用例
Person original = new Person("Alice", 30);
Person copy = DeepCopyUtil.deepCopy(original, Person.class);

copy.setAge(40);
System.out.println(original.getAge());  // 30（変更されない）
```

**実用例**:

```java
import java.util.*;

public class Person {
    private String name;
    private int age;
    private Address address;
    private List<String> hobbies;

    // コンストラクタ
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
        this.hobbies = new ArrayList<>();
    }

    // コピーコンストラクタ（深いコピー）
    public Person(Person other) {
        this.name = other.name;
        this.age = other.age;
        this.address = (other.address != null) ? new Address(other.address) : null;
        this.hobbies = new ArrayList<>(other.hobbies);
    }

    // Getter/Setter
    public void setAge(int age) { this.age = age; }
    public int getAge() { return age; }
    public List<String> getHobbies() { return hobbies; }
}

public class Main {
    public static void main(String[] args) {
        Person original = new Person("Alice", 30);
        original.getHobbies().add("Reading");

        // 深いコピー
        Person copy = new Person(original);

        copy.setAge(40);
        copy.getHobbies().set(0, "Cooking");

        System.out.println(original.getAge());  // 30
        System.out.println(original.getHobbies().get(0));  // Reading
    }
}
```

**まとめ**:

- **プリミティブ型・String**: 代入で深いコピー
- **配列**: `clone()`、`Arrays.copyOf()`、`System.arraycopy()`
- **リスト**: コンストラクタや `addAll()` は浅いコピー、手動または Stream で深いコピー
- **オブジェクト**: コピーコンストラクタ（推奨）、`clone()` メソッド
- **複雑なオブジェクト**: シリアライゼーション、JSON（Jackson/Gson）、Apache Commons Lang
- コピーコンストラクタが最も安全で推奨される方法

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
# 浅いコピー
copy.copy(original)
# 深いコピー
copy.deepcopy(original)
```

Python では `copy` モジュールで浅いコピーと深いコピーを簡単に実現できる。

**1. 不変オブジェクトのコピー**:

不変オブジェクト（int、float、str、tuple）は代入で問題ない。

```python
# 不変オブジェクト
original = 10
copy = original
copy = 20
print(original)  # 10（変更されない）

# 文字列（不変）
original_str = "Hello"
copy_str = original_str
copy_str = "World"
print(original_str)  # Hello（変更されない）
```

**2. リスト（List）のコピー**:

**浅いコピー（方法 1: スライス）**:

```python
# 浅いコピー
original = [1, 2, [3, 4]]
copy = original[:]

copy[0] = 10
print(original[0])  # 1（トップレベルは独立）

copy[2][0] = 30
print(original[2][0])  # 30（ネストされたリストは共有される！）
```

**浅いコピー（方法 2: list() コンストラクタ）**:

```python
# 浅いコピー
original = [1, 2, [3, 4]]
copy = list(original)
```

**浅いコピー（方法 3: copy.copy）**:

```python
import copy

# 浅いコピー
original = [1, 2, [3, 4]]
copy = copy.copy(original)
```

**深いコピー（copy.deepcopy）**:

```python
import copy

# 深いコピー
original = [1, 2, [3, 4]]
copy = copy.deepcopy(original)

copy[2][0] = 30
print(original[2][0])  # 3（変更されない）
```

**3. 辞書（Dictionary）のコピー**:

**浅いコピー（方法 1: copy メソッド）**:

```python
# 浅いコピー
original = {"a": 1, "b": {"c": 2}}
copy = original.copy()

copy["a"] = 10
print(original["a"])  # 1（トップレベルは独立）

copy["b"]["c"] = 20
print(original["b"]["c"])  # 20（ネストされた辞書は共有される！）
```

**浅いコピー（方法 2: dict() コンストラクタ）**:

```python
# 浅いコピー
original = {"a": 1, "b": {"c": 2}}
copy = dict(original)
```

**浅いコピー（方法 3: copy.copy）**:

```python
import copy

# 浅いコピー
original = {"a": 1, "b": {"c": 2}}
copy = copy.copy(original)
```

**深いコピー（copy.deepcopy）**:

```python
import copy

# 深いコピー
original = {"a": 1, "b": {"c": 2}}
copy = copy.deepcopy(original)

copy["b"]["c"] = 20
print(original["b"]["c"])  # 2（変更されない）
```

**4. セット（Set）のコピー**:

```python
import copy

# 浅いコピー
original = {1, 2, 3}
copy1 = original.copy()
copy2 = set(original)
copy3 = copy.copy(original)

# 深いコピー
copy4 = copy.deepcopy(original)
```

**5. カスタムオブジェクトのコピー**:

**浅いコピー**:

```python
import copy

class Person:
    def __init__(self, name, age, hobbies):
        self.name = name
        self.age = age
        self.hobbies = hobbies

# 浅いコピー
original = Person("Alice", 30, ["Reading", "Gaming"])
copy = copy.copy(original)

copy.age = 40
print(original.age)  # 30（フィールドは独立）

copy.hobbies[0] = "Cooking"
print(original.hobbies[0])  # Cooking（リストは共有される！）
```

**深いコピー**:

```python
import copy

# 深いコピー
original = Person("Alice", 30, ["Reading", "Gaming"])
copy = copy.deepcopy(original)

copy.hobbies[0] = "Cooking"
print(original.hobbies[0])  # Reading（変更されない）
```

**6. ネストされたデータ構造の深いコピー**:

```python
import copy

# 複雑なネストされたデータ構造
original = {
    "name": "Alice",
    "age": 30,
    "address": {
        "city": "Tokyo",
        "country": "Japan"
    },
    "hobbies": ["Reading", "Gaming"],
    "friends": [
        {"name": "Bob", "age": 25},
        {"name": "Charlie", "age": 35}
    ]
}

# 深いコピー
copy = copy.deepcopy(original)

copy["address"]["city"] = "Osaka"
copy["hobbies"][0] = "Cooking"
copy["friends"][0]["age"] = 26

print(original["address"]["city"])  # Tokyo（変更されない）
print(original["hobbies"][0])       # Reading（変更されない）
print(original["friends"][0]["age"])  # 25（変更されない）
```

**7. データクラス（dataclasses）のコピー**:

```python
from dataclasses import dataclass, field
import copy

@dataclass
class Address:
    city: str
    country: str

@dataclass
class Person:
    name: str
    age: int
    address: Address
    hobbies: list = field(default_factory=list)

# 浅いコピー
original = Person("Alice", 30, Address("Tokyo", "Japan"), ["Reading"])
copy1 = copy.copy(original)

# 深いコピー
copy2 = copy.deepcopy(original)

copy2.address.city = "Osaka"
copy2.hobbies[0] = "Cooking"

print(original.address.city)  # Tokyo（変更されない）
print(original.hobbies[0])    # Reading（変更されない）
```

**8. JSON を使った深いコピー（汎用的だが低速）**:

```python
import json

# 深いコピー（JSON をサポートする型のみ）
original = {
    "name": "Alice",
    "age": 30,
    "address": {"city": "Tokyo"},
    "hobbies": ["Reading", "Gaming"]
}

copy = json.loads(json.dumps(original))

copy["address"]["city"] = "Osaka"
print(original["address"]["city"])  # Tokyo（変更されない）
```

**9. カスタムコピーメソッド（**copy** と **deepcopy**）**:

```python
import copy

class Person:
    def __init__(self, name, age, hobbies):
        self.name = name
        self.age = age
        self.hobbies = hobbies

    def __copy__(self):
        # 浅いコピーのカスタマイズ
        return Person(self.name, self.age, self.hobbies)

    def __deepcopy__(self, memo):
        # 深いコピーのカスタマイズ
        return Person(
            copy.deepcopy(self.name, memo),
            copy.deepcopy(self.age, memo),
            copy.deepcopy(self.hobbies, memo)
        )

# 使用例
original = Person("Alice", 30, ["Reading", "Gaming"])
shallow = copy.copy(original)
deep = copy.deepcopy(original)
```

**実用例**:

```python
import copy

class Person:
    def __init__(self, name, age, hobbies):
        self.name = name
        self.age = age
        self.hobbies = hobbies

def main():
    # 元のデータ
    original = {
        "person": Person("Alice", 30, ["Reading", "Gaming"]),
        "scores": [100, 90, [80, 70]],
        "metadata": {"created": "2025-01-01"}
    }

    # 浅いコピー
    shallow = copy.copy(original)
    shallow["scores"][0] = 95
    print(original["scores"][0])  # 100（独立）

    shallow["scores"][2][0] = 85
    print(original["scores"][2][0])  # 85（共有される！）

    # 深いコピー
    deep = copy.deepcopy(original)
    deep["person"].age = 40
    deep["scores"][2][0] = 75
    deep["metadata"]["created"] = "2025-02-01"

    print(original["person"].age)  # 30（変更されない）
    print(original["scores"][2][0])  # 85（変更されない）
    print(original["metadata"]["created"])  # 2025-01-01（変更されない）

if __name__ == "__main__":
    main()
```

**まとめ**:

- **浅いコピー**: `copy.copy()`、リストのスライス `[:]`、`dict.copy()`
- **深いコピー**: `copy.deepcopy()`
- 不変オブジェクト（int、str、tuple）は代入で問題ない
- ネストされたデータ構造では `copy.deepcopy()` を使用
- `__copy__` と `__deepcopy__` でカスタムコピー動作を定義できる
- JSON を使った方法は簡単だが、JSON にシリアライズできる型のみ対応

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
// 浅いコピー
const copy = { ...original };
// 深いコピー
const copy = structuredClone(original);
```

JavaScript では浅いコピーと深いコピーの方法がいくつかある。

**1. プリミティブ型のコピー**:

プリミティブ型（number、string、boolean、null、undefined、symbol、bigint）は値型なので代入で問題ない。

```javascript
// プリミティブ型
let original = 10;
let copy = original;
copy = 20;
console.log(original); // 10（変更されない）

// 文字列（不変）
let originalStr = "Hello";
let copyStr = originalStr;
copyStr = "World";
console.log(originalStr); // Hello（変更されない）
```

**2. 配列のコピー**:

**浅いコピー（方法 1: スプレッド構文）**:

```javascript
// 浅いコピー
const original = [1, 2, [3, 4]];
const copy = [...original];

copy[0] = 10;
console.log(original[0]); // 1（トップレベルは独立）

copy[2][0] = 30;
console.log(original[2][0]); // 30（ネストされた配列は共有される！）
```

**浅いコピー（方法 2: Array.slice）**:

```javascript
// 浅いコピー
const original = [1, 2, [3, 4]];
const copy = original.slice();
```

**浅いコピー（方法 3: Array.from）**:

```javascript
// 浅いコピー
const original = [1, 2, [3, 4]];
const copy = Array.from(original);
```

**浅いコピー（方法 4: Array.concat）**:

```javascript
// 浅いコピー
const original = [1, 2, [3, 4]];
const copy = [].concat(original);
```

**深いコピー（方法 1: structuredClone、推奨、Node.js 17+/モダンブラウザ）**:

```javascript
// 深いコピー（最も簡単で推奨）
const original = [1, 2, [3, 4]];
const copy = structuredClone(original);

copy[2][0] = 30;
console.log(original[2][0]); // 3（変更されない）
```

**深いコピー（方法 2: JSON、制限あり）**:

```javascript
// 深いコピー（JSON をサポートする型のみ、関数・undefined・Date は失われる）
const original = [1, 2, [3, 4]];
const copy = JSON.parse(JSON.stringify(original));

copy[2][0] = 30;
console.log(original[2][0]); // 3（変更されない）
```

**深いコピー（方法 3: 再帰的な手動コピー）**:

```javascript
// 深いコピー（手動で再帰的にコピー）
function deepCopy(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(deepCopy);
  }

  const copy = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepCopy(obj[key]);
    }
  }
  return copy;
}

const original = [1, 2, [3, 4]];
const copy = deepCopy(original);

copy[2][0] = 30;
console.log(original[2][0]); // 3（変更されない）
```

**3. オブジェクトのコピー**:

**浅いコピー（方法 1: スプレッド構文）**:

```javascript
// 浅いコピー
const original = { a: 1, b: { c: 2 } };
const copy = { ...original };

copy.a = 10;
console.log(original.a); // 1（トップレベルは独立）

copy.b.c = 20;
console.log(original.b.c); // 20（ネストされたオブジェクトは共有される！）
```

**浅いコピー（方法 2: Object.assign）**:

```javascript
// 浅いコピー
const original = { a: 1, b: { c: 2 } };
const copy = Object.assign({}, original);
```

**深いコピー（structuredClone、推奨）**:

```javascript
// 深いコピー
const original = { a: 1, b: { c: 2 } };
const copy = structuredClone(original);

copy.b.c = 20;
console.log(original.b.c); // 2（変更されない）
```

**深いコピー（JSON）**:

```javascript
// 深いコピー（関数・undefined・Date は失われる）
const original = { a: 1, b: { c: 2 } };
const copy = JSON.parse(JSON.stringify(original));

copy.b.c = 20;
console.log(original.b.c); // 2（変更されない）
```

**4. 複雑なオブジェクトのコピー**:

```javascript
// 複雑なネストされたデータ構造
const original = {
  name: "Alice",
  age: 30,
  address: {
    city: "Tokyo",
    country: "Japan",
  },
  hobbies: ["Reading", "Gaming"],
  friends: [
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 },
  ],
};

// 深いコピー
const copy = structuredClone(original);

copy.address.city = "Osaka";
copy.hobbies[0] = "Cooking";
copy.friends[0].age = 26;

console.log(original.address.city); // Tokyo（変更されない）
console.log(original.hobbies[0]); // Reading（変更されない）
console.log(original.friends[0].age); // 25（変更されない）
```

**5. Date オブジェクトのコピー**:

```javascript
// Date オブジェクト
const originalDate = new Date("2025-01-01");

// 浅いコピー（参照をコピー）
const copy1 = originalDate;
copy1.setFullYear(2026);
console.log(originalDate.getFullYear()); // 2026（変更される！）

// 深いコピー（新しい Date を作成）
const originalDate2 = new Date("2025-01-01");
const copy2 = new Date(originalDate2);
copy2.setFullYear(2026);
console.log(originalDate2.getFullYear()); // 2025（変更されない）

// structuredClone を使用
const copy3 = structuredClone(originalDate2);
```

**6. Map と Set のコピー**:

**浅いコピー**:

```javascript
// Map の浅いコピー
const originalMap = new Map([
  ["a", 1],
  ["b", { c: 2 }],
]);
const copyMap = new Map(originalMap);

copyMap.get("b").c = 20;
console.log(originalMap.get("b").c); // 20（共有される！）

// Set の浅いコピー
const originalSet = new Set([1, 2, { a: 3 }]);
const copySet = new Set(originalSet);
```

**深いコピー（structuredClone）**:

```javascript
// Map の深いコピー
const originalMap = new Map([
  ["a", 1],
  ["b", { c: 2 }],
]);
const copyMap = structuredClone(originalMap);

copyMap.get("b").c = 20;
console.log(originalMap.get("b").c); // 2（変更されない）

// Set の深いコピー
const originalSet = new Set([1, 2, { a: 3 }]);
const copySet = structuredClone(originalSet);
```

**7. クラスインスタンスのコピー**:

```javascript
class Person {
  constructor(name, age, hobbies) {
    this.name = name;
    this.age = age;
    this.hobbies = hobbies;
  }

  greet() {
    console.log(`Hello, I'm ${this.name}`);
  }
}

const original = new Person("Alice", 30, ["Reading", "Gaming"]);

// structuredClone（メソッドは失われる）
const copy1 = structuredClone(original);
console.log(copy1 instanceof Person); // false
// copy1.greet();  // エラー: greet is not a function

// 手動でコピー（メソッドを保持）
const copy2 = Object.assign(
  Object.create(Object.getPrototypeOf(original)),
  structuredClone(original)
);
console.log(copy2 instanceof Person); // true
copy2.greet(); // Hello, I'm Alice
```

**8. lodash を使った深いコピー（推奨ライブラリ）**:

```bash
npm install lodash
```

```javascript
const _ = require("lodash");

// 深いコピー
const original = { a: 1, b: { c: 2 }, d: [3, 4] };
const copy = _.cloneDeep(original);

copy.b.c = 20;
copy.d[0] = 30;

console.log(original.b.c); // 2（変更されない）
console.log(original.d[0]); // 3（変更されない）
```

**9. JSON.parse/stringify の制限**:

```javascript
const original = {
  number: 42,
  string: "hello",
  boolean: true,
  null: null,
  undefined: undefined, // 失われる
  date: '2025-11-25T00:12:01.000Z'
  regex: /test/, // 空オブジェクトになる
  func: () => {}, // 失われる
  symbol: Symbol("test"), // 失われる
  nan: NaN, // null になる
  infinity: Infinity, // null になる
};

const copy = JSON.parse(JSON.stringify(original));

console.log(copy.undefined); // undefined（プロパティ自体が失われる）
console.log(copy.date); // "2025-01-01T00:00:00.000Z"（文字列）
console.log(copy.regex); // {}（空オブジェクト）
console.log(copy.func); // undefined（失われる）
```

**実用例**:

```javascript
// 複雑なオブジェクトの深いコピー
function createPerson(name, age, hobbies) {
  return {
    name,
    age,
    address: {
      city: "Tokyo",
      country: "Japan",
    },
    hobbies,
    metadata: {
      created: new Date(),
    },
  };
}

const original = createPerson("Alice", 30, ["Reading", "Gaming"]);

// 深いコピー（structuredClone）
const copy = structuredClone(original);

copy.age = 40;
copy.address.city = "Osaka";
copy.hobbies[0] = "Cooking";
copy.metadata.created.setFullYear(2026);

console.log(original.age); // 30
console.log(original.address.city); // Tokyo
console.log(original.hobbies[0]); // Reading
console.log(original.metadata.created.getFullYear()); // 2025
```

**まとめ**:

- **浅いコピー**: スプレッド構文 `{...obj}`、`[...arr]`、`Object.assign()`、`slice()`
- **深いコピー**: `structuredClone()`（推奨、Node.js 17+/モダンブラウザ）
- **深いコピー（代替）**: `JSON.parse(JSON.stringify())`（制限あり）、lodash の `_.cloneDeep()`
- プリミティブ型は代入で問題ない
- `structuredClone()` が最も簡単で推奨（Date、Map、Set もサポート）
- JSON 方式は関数・undefined・Date（オブジェクトとして）が失われる
- クラスインスタンスをコピーする場合はメソッドの保持に注意

</div>
