---
title: "ORM（O/Rマッパー）でデータベース操作"
excerpt: "ORM（O/Rマッパー）でデータベース操作について"
coverImage: ""
date: "2025-11-01T17:41:13.000Z"
updatedAt: "2025-11-01T17:41:13.000Z"
tag: ["Go", "Java", "Python", "Javascript"]
programming: ["Go", "Java", "Python", "Javascript"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
mode: programming
---

ORM（O/R マッパー、Object-Relational Mapper）について説明する。

**ORM とは**:

データベースのテーブルとプログラムのオブジェクトを対応付け（マッピング）し、SQL を直接書かずにオブジェクト指向的な方法でデータベースを操作できる仕組み。

**ORM の利点**:

1. **SQL を書かなくて良い**: メソッド呼び出しでデータベース操作ができる
2. **型安全**: コンパイル時または実行前に型チェックができる
3. **生産性の向上**: ボイラープレートコードが減る
4. **データベース非依存**: データベースを変更してもコードの変更が少ない
5. **メンテナンス性**: オブジェクト指向的な設計でコードが読みやすい

**ORM の欠点**:

1. **パフォーマンス**: 複雑なクエリでは生 SQL より遅い場合がある
2. **学習コスト**: ORM ライブラリの使い方を学ぶ必要がある
3. **抽象化の限界**: 複雑な SQL は書きにくい

各言語で代表的な ORM ライブラリが異なる。

<div class="note_content_by_programming_language" id="note_content_Go">

```go
db.First(&user, "id = ?", 1)
```

Go では **GORM**、**ent**、**sqlx** などの ORM ライブラリが使われる。最も人気があるのは **GORM**。

**GORM（最も人気）**:

**インストール**:

```bash
go get -u gorm.io/gorm
go get -u gorm.io/driver/mysql
go get -u gorm.io/driver/postgres
go get -u gorm.io/driver/sqlite
```

**基本的な使い方**:

**1. データベース接続**:

```go
package main

import (
    "gorm.io/driver/mysql"
    "gorm.io/gorm"
)

func main() {
    // MySQL に接続
    dsn := "user:password@tcp(127.0.0.1:3306)/dbname?charset=utf8mb4&parseTime=True&loc=Local"
    db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
    if err != nil {
        panic("データベース接続に失敗しました")
    }

    // PostgreSQL の場合
    // dsn := "host=localhost user=gorm password=gorm dbname=gorm port=9920 sslmode=disable"
    // db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

    // SQLite の場合
    // db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
}
```

**2. モデル定義**:

```go
type User struct {
    ID        uint           `gorm:"primaryKey"`
    Name      string         `gorm:"size:100;not null"`
    Email     string         `gorm:"uniqueIndex;size:255"`
    Age       int            `gorm:"default:0"`
    CreatedAt time.Time
    UpdatedAt time.Time
}

type Post struct {
    ID        uint `gorm:"primaryKey"`
    Title     string
    Content   string
    UserID    uint
    User      User  // 外部キー（リレーション）
    CreatedAt time.Time
}
```

**3. マイグレーション**:

```go
// テーブルを自動作成
db.AutoMigrate(&User{}, &Post{})
```

**4. データの取得**:

```go
// 1件取得（主キー）
var user User
db.First(&user, 1)  // ID = 1
fmt.Println(user.Name)

// 1件取得（条件指定）
db.First(&user, "name = ?", "Alice")

// 複数件取得
var users []User
db.Find(&users)

// 条件付き取得
db.Where("age > ?", 20).Find(&users)

// 複数条件
db.Where("age > ? AND name LIKE ?", 20, "%A%").Find(&users)

// LIMIT と OFFSET
db.Limit(10).Offset(5).Find(&users)

// ORDER BY
db.Order("age desc").Find(&users)

// SELECT 特定のカラム
db.Select("name", "email").Find(&users)

// 件数取得
var count int64
db.Model(&User{}).Count(&count)
```

**5. データの作成**:

```go
// 1件作成
user := User{Name: "Alice", Email: "alice@example.com", Age: 25}
result := db.Create(&user)
fmt.Println(user.ID)  // 自動採番されたID

// 複数件作成
users := []User{
    {Name: "Bob", Email: "bob@example.com"},
    {Name: "Charlie", Email: "charlie@example.com"},
}
db.Create(&users)
```

**6. データの更新**:

```go
// 1件更新（特定のフィールド）
db.Model(&user).Update("age", 30)

// 複数フィールド更新
db.Model(&user).Updates(User{Name: "Alice Updated", Age: 30})

// マップで更新
db.Model(&user).Updates(map[string]interface{}{"name": "Alice", "age": 30})

// 条件付き更新
db.Model(&User{}).Where("age < ?", 20).Update("age", 20)
```

**7. データの削除**:

```go
// 1件削除
db.Delete(&user, 1)  // ID = 1

// 条件付き削除
db.Where("age < ?", 18).Delete(&User{})

// 物理削除（ソフトデリート無効）
db.Unscoped().Delete(&user)
```

**8. リレーション（JOIN）**:

```go
// Preload（事前ロード）
var posts []Post
db.Preload("User").Find(&posts)
for _, post := range posts {
    fmt.Println(post.Title, "-", post.User.Name)
}

// Joins
db.Joins("User").Where("users.age > ?", 20).Find(&posts)
```

**9. トランザクション**:

```go
// トランザクション
db.Transaction(func(tx *gorm.DB) error {
    // ユーザーを作成
    if err := tx.Create(&user).Error; err != nil {
        return err
    }

    // 投稿を作成
    post := Post{Title: "My Post", UserID: user.ID}
    if err := tx.Create(&post).Error; err != nil {
        return err
    }

    return nil  // コミット
})
```

**実用例**:

```go
package main

import (
    "fmt"
    "gorm.io/driver/sqlite"
    "gorm.io/gorm"
)

type User struct {
    ID    uint   `gorm:"primaryKey"`
    Name  string
    Email string
    Age   int
}

func main() {
    // データベース接続
    db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
    if err != nil {
        panic("データベース接続に失敗しました")
    }

    // マイグレーション
    db.AutoMigrate(&User{})

    // データ作成
    user := User{Name: "Alice", Email: "alice@example.com", Age: 25}
    db.Create(&user)

    // データ取得
    var users []User
    db.Where("age > ?", 20).Find(&users)

    for _, u := range users {
        fmt.Printf("ID: %d, Name: %s, Age: %d\n", u.ID, u.Name, u.Age)
    }

    // データ更新
    db.Model(&user).Update("age", 26)

    // データ削除
    db.Delete(&user, user.ID)
}
```

**その他の ORM ライブラリ**:

- **ent**: Facebook 製、タイプセーフな ORM フレームワーク
- **sqlx**: 標準ライブラリの拡張、軽量
- **sqlc**: SQL から Go コードを自動生成

**まとめ**:

- GORM が最も人気（高機能、使いやすい）
- `AutoMigrate` でテーブル自動作成
- メソッドチェーンでクエリを構築
- Preload/Joins でリレーション
- トランザクション対応

</div>
<div class="note_content_by_programming_language" id="note_content_Java">

```java
User user = entityManager.find(User.class, 1);
```

Java では **JPA（Java Persistence API）** が標準的な ORM 仕様。実装として **Hibernate**、**EclipseLink** などがある。

**Hibernate（最も人気）**:

**依存関係（Maven）**:

```xml
<dependencies>
    <dependency>
        <groupId>org.hibernate</groupId>
        <artifactId>hibernate-core</artifactId>
        <version>6.2.0.Final</version>
    </dependency>
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.33</version>
    </dependency>
</dependencies>
```

**基本的な使い方**:

**1. persistence.xml（設定ファイル）**:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<persistence xmlns="http://xmlns.jcp.org/xml/ns/persistence" version="2.2">
    <persistence-unit name="myPU">
        <properties>
            <property name="javax.persistence.jdbc.url" value="jdbc:mysql://localhost:3306/mydb"/>
            <property name="javax.persistence.jdbc.user" value="root"/>
            <property name="javax.persistence.jdbc.password" value="password"/>
            <property name="javax.persistence.jdbc.driver" value="com.mysql.cj.jdbc.Driver"/>
            <property name="hibernate.dialect" value="org.hibernate.dialect.MySQL8Dialect"/>
            <property name="hibernate.hbm2ddl.auto" value="update"/>
        </properties>
    </persistence-unit>
</persistence>
```

**2. エンティティクラス**:

```java
import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(unique = true, length = 255)
    private String email;

    private Integer age;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Post> posts;

    // Getter/Setter
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    // ...
}

@Entity
@Table(name = "posts")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // Getter/Setter
}
```

**3. EntityManager（データ操作）**:

```java
import javax.persistence.*;

public class Main {
    public static void main(String[] args) {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("myPU");
        EntityManager em = emf.createEntityManager();

        // データ取得
        User user = em.find(User.class, 1L);  // ID = 1
        System.out.println(user.getName());

        em.close();
        emf.close();
    }
}
```

**4. データの取得（JPQL）**:

```java
// 1件取得
TypedQuery<User> query = em.createQuery(
    "SELECT u FROM User u WHERE u.name = :name", User.class);
query.setParameter("name", "Alice");
User user = query.getSingleResult();

// 複数件取得
TypedQuery<User> query2 = em.createQuery(
    "SELECT u FROM User u WHERE u.age > :age", User.class);
query2.setParameter("age", 20);
List<User> users = query2.getResultList();

// JOIN
TypedQuery<Post> query3 = em.createQuery(
    "SELECT p FROM Post p JOIN FETCH p.user WHERE p.user.age > :age", Post.class);
query3.setParameter("age", 20);
List<Post> posts = query3.getResultList();

// ページング
query.setFirstResult(10);  // OFFSET
query.setMaxResults(20);   // LIMIT
```

**5. データの作成**:

```java
EntityTransaction tx = em.getTransaction();
tx.begin();

User user = new User();
user.setName("Alice");
user.setEmail("alice@example.com");
user.setAge(25);

em.persist(user);  // INSERT

tx.commit();
System.out.println("作成されたID: " + user.getId());
```

**6. データの更新**:

```java
EntityTransaction tx = em.getTransaction();
tx.begin();

User user = em.find(User.class, 1L);
user.setAge(30);

// em.merge(user); は不要（管理されているエンティティは自動的に更新される）

tx.commit();
```

**7. データの削除**:

```java
EntityTransaction tx = em.getTransaction();
tx.begin();

User user = em.find(User.class, 1L);
em.remove(user);  // DELETE

tx.commit();
```

**Spring Data JPA（より高レベル、推奨）**:

Spring Framework を使っている場合、Spring Data JPA がより便利。

**依存関係**:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
```

**リポジトリインターフェース**:

```java
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    // メソッド名からクエリを自動生成
    List<User> findByName(String name);
    List<User> findByAgeGreaterThan(int age);
    List<User> findByNameAndAge(String name, int age);

    // @Query でカスタムクエリ
    @Query("SELECT u FROM User u WHERE u.email LIKE %:domain%")
    List<User> findByEmailDomain(String domain);
}
```

**使用例**:

```java
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public void demo() {
        // 全件取得
        List<User> users = userRepository.findAll();

        // ID で取得
        Optional<User> user = userRepository.findById(1L);

        // 条件付き取得
        List<User> adults = userRepository.findByAgeGreaterThan(20);

        // 作成
        User newUser = new User();
        newUser.setName("Alice");
        userRepository.save(newUser);

        // 更新
        user.ifPresent(u -> {
            u.setAge(30);
            userRepository.save(u);
        });

        // 削除
        userRepository.deleteById(1L);
    }
}
```

**まとめ**:

- JPA/Hibernate が標準的な ORM
- `@Entity` でエンティティクラスを定義
- `EntityManager` でデータ操作
- Spring Data JPA でより簡潔に記述
- JPQL でオブジェクト指向的なクエリ

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
user = session.query(User).filter_by(id=1).first()
```

Python では **SQLAlchemy**、**Django ORM**、**Peewee** などの ORM ライブラリが使われる。最も人気があるのは **SQLAlchemy**。

**SQLAlchemy（最も人気）**:

**インストール**:

```bash
pip install sqlalchemy
pip install pymysql  # MySQL
# または
pip install psycopg2-binary  # PostgreSQL
```

**基本的な使い方**:

**1. データベース接続**:

```python
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# MySQL
engine = create_engine('mysql+pymysql://user:password@localhost/dbname')

# PostgreSQL
# engine = create_engine('postgresql://user:password@localhost/dbname')

# SQLite
# engine = create_engine('sqlite:///test.db')

# セッションを作成
Session = sessionmaker(bind=engine)
session = Session()
```

**2. モデル定義**:

```python
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import declarative_base, relationship
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True)
    age = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.now)

    # リレーション
    posts = relationship("Post", back_populates="user")

class Post(Base):
    __tablename__ = 'posts'

    id = Column(Integer, primary_key=True)
    title = Column(String(200))
    content = Column(String)
    user_id = Column(Integer, ForeignKey('users.id'))
    created_at = Column(DateTime, default=datetime.now)

    # リレーション
    user = relationship("User", back_populates="posts")
```

**3. マイグレーション**:

```python
# テーブルを自動作成
Base.metadata.create_all(engine)
```

**4. データの取得**:

```python
# 1件取得（主キー）
user = session.query(User).get(1)  # ID = 1
print(user.name)

# 1件取得（条件指定）
user = session.query(User).filter_by(name="Alice").first()

# 複数件取得
users = session.query(User).all()

# 条件付き取得
users = session.query(User).filter(User.age > 20).all()

# 複数条件
users = session.query(User).filter(
    User.age > 20,
    User.name.like('%A%')
).all()

# LIMIT と OFFSET
users = session.query(User).limit(10).offset(5).all()

# ORDER BY
users = session.query(User).order_by(User.age.desc()).all()

# SELECT 特定のカラム
results = session.query(User.name, User.email).all()

# 件数取得
count = session.query(User).count()
```

**5. データの作成**:

```python
# 1件作成
user = User(name="Alice", email="alice@example.com", age=25)
session.add(user)
session.commit()
print(f"作成されたID: {user.id}")

# 複数件作成
users = [
    User(name="Bob", email="bob@example.com"),
    User(name="Charlie", email="charlie@example.com")
]
session.add_all(users)
session.commit()
```

**6. データの更新**:

```python
# 1件更新
user = session.query(User).get(1)
user.age = 30
session.commit()

# 条件付き更新
session.query(User).filter(User.age < 20).update({"age": 20})
session.commit()
```

**7. データの削除**:

```python
# 1件削除
user = session.query(User).get(1)
session.delete(user)
session.commit()

# 条件付き削除
session.query(User).filter(User.age < 18).delete()
session.commit()
```

**8. リレーション（JOIN）**:

```python
# JOIN（自動的に関連データを取得）
posts = session.query(Post).join(User).filter(User.age > 20).all()

for post in posts:
    print(f"{post.title} - {post.user.name}")

# Eager Loading（N+1問題を回避）
from sqlalchemy.orm import joinedload

posts = session.query(Post).options(joinedload(Post.user)).all()
```

**9. トランザクション**:

```python
try:
    # ユーザーを作成
    user = User(name="Alice", email="alice@example.com")
    session.add(user)
    session.flush()  # ID を取得

    # 投稿を作成
    post = Post(title="My Post", user_id=user.id)
    session.add(post)

    session.commit()  # コミット
except Exception as e:
    session.rollback()  # ロールバック
    print(f"エラー: {e}")
```

**Django ORM**:

Django フレームワークを使っている場合、Django ORM が組み込まれている。

```python
from django.db import models

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    age = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

# 使用例
# 全件取得
users = User.objects.all()

# 条件付き取得
users = User.objects.filter(age__gt=20)

# 1件取得
user = User.objects.get(id=1)

# 作成
user = User.objects.create(name="Alice", email="alice@example.com", age=25)

# 更新
user.age = 30
user.save()

# 削除
user.delete()
```

**まとめ**:

- SQLAlchemy が最も人気（柔軟、高機能）
- Django ORM は Django 専用（シンプル）
- `session` でデータ操作
- `filter`/`filter_by` でクエリ
- `joinedload` で N+1 問題を回避

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
const user = await User.findByPk(1);
```

JavaScript（Node.js）では **Sequelize**、**TypeORM**、**Prisma** などの ORM ライブラリが使われる。

**1. Sequelize（最も人気）**:

**インストール**:

```bash
npm install sequelize
npm install mysql2  # MySQL
# または
npm install pg pg-hstore  # PostgreSQL
# または
npm install sqlite3  # SQLite
```

**基本的な使い方**:

**データベース接続**:

```javascript
const { Sequelize, DataTypes } = require("sequelize");

// MySQL
const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "mysql",
});

// PostgreSQL
// const sequelize = new Sequelize('database', 'username', 'password', {
//   host: 'localhost',
//   dialect: 'postgres'
// });

// SQLite
// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: 'database.sqlite'
// });
```

**モデル定義**:

```javascript
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true,
    },
    age: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "users",
    timestamps: true, // createdAt, updatedAt を自動追加
  }
);

const Post = sequelize.define("Post", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: DataTypes.STRING,
  content: DataTypes.TEXT,
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
});

// リレーション
User.hasMany(Post, { foreignKey: "userId" });
Post.belongsTo(User, { foreignKey: "userId" });
```

**マイグレーション**:

```javascript
// テーブルを自動作成
await sequelize.sync();

// 既存テーブルを削除して再作成（開発時のみ）
await sequelize.sync({ force: true });
```

**データの取得**:

```javascript
// 1件取得（主キー）
const user = await User.findByPk(1); // ID = 1
console.log(user.name);

// 1件取得（条件指定）
const user2 = await User.findOne({ where: { name: "Alice" } });

// 複数件取得
const users = await User.findAll();

// 条件付き取得
const users2 = await User.findAll({
  where: { age: { [Sequelize.Op.gt]: 20 } },
});

// 複数条件
const users3 = await User.findAll({
  where: {
    age: { [Sequelize.Op.gt]: 20 },
    name: { [Sequelize.Op.like]: "%A%" },
  },
});

// LIMIT と OFFSET
const users4 = await User.findAll({ limit: 10, offset: 5 });

// ORDER BY
const users5 = await User.findAll({ order: [["age", "DESC"]] });

// SELECT 特定のカラム
const users6 = await User.findAll({ attributes: ["name", "email"] });

// 件数取得
const count = await User.count();
```

**データの作成**:

```javascript
// 1件作成
const user = await User.create({
  name: "Alice",
  email: "alice@example.com",
  age: 25,
});
console.log("作成されたID:", user.id);

// 複数件作成
const users = await User.bulkCreate([
  { name: "Bob", email: "bob@example.com" },
  { name: "Charlie", email: "charlie@example.com" },
]);
```

**データの更新**:

```javascript
// 1件更新
const user = await User.findByPk(1);
user.age = 30;
await user.save();

// 条件付き更新
await User.update({ age: 20 }, { where: { age: { [Sequelize.Op.lt]: 20 } } });
```

**データの削除**:

```javascript
// 1件削除
const user = await User.findByPk(1);
await user.destroy();

// 条件付き削除
await User.destroy({ where: { age: { [Sequelize.Op.lt]: 18 } } });
```

**リレーション（JOIN）**:

```javascript
// include でリレーションを取得
const posts = await Post.findAll({
  include: [{ model: User, where: { age: { [Sequelize.Op.gt]: 20 } } }],
});

for (const post of posts) {
  console.log(`${post.title} - ${post.User.name}`);
}
```

**トランザクション**:

```javascript
const t = await sequelize.transaction();

try {
  // ユーザーを作成
  const user = await User.create(
    {
      name: "Alice",
      email: "alice@example.com",
    },
    { transaction: t }
  );

  // 投稿を作成
  const post = await Post.create(
    {
      title: "My Post",
      userId: user.id,
    },
    { transaction: t }
  );

  await t.commit(); // コミット
} catch (error) {
  await t.rollback(); // ロールバック
  console.error("エラー:", error);
}
```

**2. Prisma（現代的、TypeScript 推奨）**:

**インストール**:

```bash
npm install prisma --save-dev
npm install @prisma/client
npx prisma init
```

**schema.prisma**:

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        Int      @id @default(autoincrement())
  name      String   @db.VarChar(100)
  email     String   @unique @db.VarChar(255)
  age       Int      @default(0)
  createdAt DateTime @default(now()) @map("created_at")
  posts     Post[]

  @@map("users")
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String   @db.Text
  userId    Int      @map("user_id")
  user      User     @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now()) @map("created_at")

  @@map("posts")
}
```

**マイグレーション**:

```bash
# マイグレーションファイルを生成
npx prisma migrate dev --name init

# Prisma Client を生成
npx prisma generate
```

**使用例（TypeScript）**:

```typescript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 1件取得
  const user = await prisma.user.findUnique({ where: { id: 1 } });

  // 複数件取得
  const users = await prisma.user.findMany({
    where: { age: { gt: 20 } },
    orderBy: { age: "desc" },
    take: 10,
    skip: 5,
  });

  // 作成
  const newUser = await prisma.user.create({
    data: { name: "Alice", email: "alice@example.com", age: 25 },
  });

  // 更新
  await prisma.user.update({
    where: { id: 1 },
    data: { age: 30 },
  });

  // 削除
  await prisma.user.delete({ where: { id: 1 } });

  // リレーション
  const postsWithUser = await prisma.post.findMany({
    include: { user: true },
    where: { user: { age: { gt: 20 } } },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
```

**3. TypeORM（TypeScript 特化）**:

```typescript
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  createConnection,
} from "typeorm";

@Entity("users")
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: 0 })
  age: number;
}

// 使用例
const connection = await createConnection({
  type: "mysql",
  host: "localhost",
  username: "root",
  password: "password",
  database: "test",
});

const userRepository = connection.getRepository(User);

// 取得
const user = await userRepository.findOne({ where: { id: 1 } });
const users = await userRepository.find({ where: { age: { $gt: 20 } } });

// 作成
const newUser = await userRepository.save({
  name: "Alice",
  email: "alice@example.com",
});

// 更新
user.age = 30;
await userRepository.save(user);

// 削除
await userRepository.remove(user);
```

**まとめ**:

- Sequelize が最も人気（Node.js）
- Prisma が現代的（TypeScript 推奨、型安全）
- TypeORM は TypeScript 特化
- `async/await` で非同期処理
- リレーション、トランザクション対応

</div>
