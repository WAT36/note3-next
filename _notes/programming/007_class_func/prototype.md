---
title: "プロトタイプ(JavaScript)"
excerpt: "プロトタイプとprototypeプロパティ(JavaScript)について"
coverImage: ""
date: "2024-08-20T22:10:14.000Z"
updatedAt: '2025-11-25T00:12:04.000Z'
tag: ["Javascript"]
programming: ["Javascript"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
mode: programming
---

JavaScript はプロトタイプベースのオブジェクト指向言語。プロトタイプを使ってオブジェクトの継承やメソッドの共有を実現する。

<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
function Constructor() {}
Constructor.prototype.method = function () {};
```

JavaScript では、すべてのオブジェクトがプロトタイプ（元となるオブジェクト）を持つ。プロトタイプを使って、メソッドの共有や継承を実現できる。

**基本的なプロトタイプ**:

```javascript
// コンストラクタ関数
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// prototype にメソッドを追加
Person.prototype.greet = function () {
  return `Hello, I'm ${this.name}`;
};

Person.prototype.getAge = function () {
  return this.age;
};

// インスタンス作成
const john = new Person("John", 30);
const jane = new Person("Jane", 25);

console.log(john.greet()); // Hello, I'm John
console.log(jane.greet()); // Hello, I'm Jane

// メソッドは共有される（メモリ効率的）
console.log(john.greet === jane.greet); // true
```

**プロトタイプの利点**:

コンストラクタ内でメソッドを定義すると、インスタンスごとにメソッドが作成される。`prototype`にメソッドを定義すると、すべてのインスタンスが同じメソッドを共有する。

```javascript
// 悪い例：メソッドがインスタンスごとに作成される
function BadPerson(name) {
  this.name = name;
  this.greet = function () {
    // インスタンスごとに新しい関数が作成される
    return `Hello, ${this.name}`;
  };
}

const p1 = new BadPerson("Alice");
const p2 = new BadPerson("Bob");
console.log(p1.greet === p2.greet); // false（別の関数）

// 良い例：メソッドが共有される
function GoodPerson(name) {
  this.name = name;
}

GoodPerson.prototype.greet = function () {
  // すべてのインスタンスで共有
  return `Hello, ${this.name}`;
};

const p3 = new GoodPerson("Charlie");
const p4 = new GoodPerson("David");
console.log(p3.greet === p4.greet); // true（同じ関数）
```

**プロトタイプチェーン**:

オブジェクトのプロパティやメソッドにアクセスすると、JavaScript はプロトタイプチェーンを辿って探す。

```javascript
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function () {
  return `${this.name} makes a sound`;
};

const dog = new Animal("Dog");

// プロトタイプチェーン
// dog → Animal.prototype → Object.prototype → null

console.log(dog.name); // "Dog" (dog 自身のプロパティ)
console.log(dog.speak()); // "Dog makes a sound" (Animal.prototype のメソッド)
console.log(dog.toString()); // "[object Object]" (Object.prototype のメソッド)
console.log(dog.hasOwnProperty("name")); // true
```

**`__proto__` と `prototype` の違い**:

- `prototype`: コンストラクタ関数が持つプロパティ。新しいインスタンスのプロトタイプとして使われる
- `__proto__`: オブジェクトが持つプロパティ。そのオブジェクトのプロトタイプを指す

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  return `Hello, ${this.name}`;
};

const john = new Person("John");

// Person.prototype と john.__proto__ は同じオブジェクト
console.log(john.__proto__ === Person.prototype); // true

// Object.getPrototypeOf() を使う方が推奨
console.log(Object.getPrototypeOf(john) === Person.prototype); // true
```

**プロトタイプによる継承**:

```javascript
// 親クラス
function Animal(name) {
  this.name = name;
}

Animal.prototype.eat = function () {
  return `${this.name} is eating`;
};

// 子クラス
function Dog(name, breed) {
  Animal.call(this, name); // 親のコンストラクタを呼び出し
  this.breed = breed;
}

// プロトタイプチェーンを設定
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// 子クラスのメソッドを追加
Dog.prototype.bark = function () {
  return `${this.name} is barking`;
};

const myDog = new Dog("Buddy", "Golden Retriever");

console.log(myDog.name); // "Buddy"
console.log(myDog.breed); // "Golden Retriever"
console.log(myDog.eat()); // "Buddy is eating" (親のメソッド)
console.log(myDog.bark()); // "Buddy is barking" (子のメソッド)

// プロトタイプチェーン
console.log(myDog instanceof Dog); // true
console.log(myDog instanceof Animal); // true
```

**ES6 class 構文との比較**:

ES6 以降は`class`構文が使えるが、内部的にはプロトタイプを使っている。

```javascript
// プロトタイプベース（従来の方法）
function PersonProto(name) {
  this.name = name;
}

PersonProto.prototype.greet = function () {
  return `Hello, ${this.name}`;
};

// クラスベース（ES6+）
class PersonClass {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello, ${this.name}`;
  }
}

// どちらも同じように動作
const p1 = new PersonProto("Alice");
const p2 = new PersonClass("Bob");

console.log(p1.greet()); // Hello, Alice
console.log(p2.greet()); // Hello, Bob

// 内部的にはどちらもプロトタイプを使っている
console.log(typeof PersonProto); // "function"
console.log(typeof PersonClass); // "function"
console.log(PersonClass.prototype.greet); // [Function: greet]
```

**プロトタイプの動的な変更**:

プロトタイプは動的に変更できる。

```javascript
function Person(name) {
  this.name = name;
}

const john = new Person("John");

// プロトタイプにメソッドを追加
Person.prototype.greet = function () {
  return `Hello, ${this.name}`;
};

// 既存のインスタンスでも使える
console.log(john.greet()); // Hello, John

// プロトタイプのメソッドを変更
Person.prototype.greet = function () {
  return `Hi, ${this.name}!`;
};

console.log(john.greet()); // Hi, John!
```

**Object.create() を使ったプロトタイプ**:

```javascript
const personProto = {
  greet() {
    return `Hello, ${this.name}`;
  },
  introduce() {
    return `I'm ${this.name}, ${this.age} years old`;
  },
};

// personProto をプロトタイプとするオブジェクトを作成
const john = Object.create(personProto);
john.name = "John";
john.age = 30;

console.log(john.greet()); // Hello, John
console.log(john.introduce()); // I'm John, 30 years old

// プロトタイプチェーンを確認
console.log(Object.getPrototypeOf(john) === personProto); // true
```

**プロトタイプのプロパティ確認**:

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  return `Hello, ${this.name}`;
};

const john = new Person("John");

// hasOwnProperty: 自身のプロパティかどうか
console.log(john.hasOwnProperty("name")); // true
console.log(john.hasOwnProperty("greet")); // false

// in: プロトタイプチェーンを含めて探す
console.log("name" in john); // true
console.log("greet" in john); // true

// プロトタイプのプロパティを列挙
console.log(Object.keys(john)); // ["name"]
console.log(Object.getOwnPropertyNames(john)); // ["name"]
console.log(Object.keys(Person.prototype)); // ["greet"]
```

**実用例（Polyfill）**:

古いブラウザで新しいメソッドを使えるようにする。

```javascript
// Array.prototype.includes の Polyfill
if (!Array.prototype.includes) {
  Array.prototype.includes = function (searchElement, fromIndex) {
    if (this == null) {
      throw new TypeError('"this" is null or not defined');
    }

    const O = Object(this);
    const len = parseInt(O.length) || 0;

    if (len === 0) {
      return false;
    }

    const n = parseInt(fromIndex) || 0;
    let k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

    while (k < len) {
      if (O[k] === searchElement) {
        return true;
      }
      k++;
    }

    return false;
  };
}

const arr = [1, 2, 3, 4, 5];
console.log(arr.includes(3)); // true
```

**注意点**:

- `prototype`を完全に置き換えると、`constructor`プロパティが失われる
- プロトタイプの変更は既存のインスタンスにも影響する
- ES6 以降は`class`構文の使用が推奨される
- `__proto__`の直接使用は非推奨（`Object.getPrototypeOf()`を使う）

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  return `Hello, ${this.name}`;
};

const john = new Person("John");
console.log(john.constructor === Person); // true

// 悪い例：prototype を完全に置き換える
Person.prototype = {
  greet() {
    return `Hi, ${this.name}`;
  },
};

const jane = new Person("Jane");
console.log(jane.constructor === Person); // false（Object になる）

// 良い例：constructor を復元
Person.prototype = {
  constructor: Person,
  greet() {
    return `Hi, ${this.name}`;
  },
};

const bob = new Person("Bob");
console.log(bob.constructor === Person); // true
```

**まとめ**:

- プロトタイプは JavaScript のオブジェクト指向の基礎
- メソッドを`prototype`に定義すると、インスタンス間で共有される（メモリ効率的）
- プロトタイプチェーンで継承を実現
- `class`構文は内部的にプロトタイプを使っている
- 現代の JavaScript では`class`構文が推奨されるが、プロトタイプの理解は重要

</div>
