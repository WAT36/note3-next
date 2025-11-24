---
title: "REST APIサーバーを作成する"
excerpt: "各言語でREST APIサーバーを作成する方法"
tag: ["Java", "Python", "Javascript", "Go"]
programming: ["Java", "Python", "Javascript", "Go"]
coverImage: ""
date: '2025-11-24T22:13:44.000Z'
updatedAt: '2025-11-24T22:13:44.000Z'
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
mode: programming
---

各言語で REST API サーバーを作成する方法について説明する。

ここでは基本的な RESTful API サーバー（GET/POST、JSON レスポンス）の作成方法を示す。

<div class="note_content_by_programming_language" id="note_content_Java">

```java
@RestController
@RequestMapping("/api")
public class ApiController {
    @GetMapping("/hello")
    public String hello() {
        return "Hello World";
    }
}
```

Java では **Spring Boot** フレームワークで API サーバーを作成する。

**@RestController** でコントローラー、**@GetMapping** で GET エンドポイントを定義。

実行例

```java
@RestController
@RequestMapping("/api")
public class ApiController {
    @GetMapping("/hello")
    public ResponseEntity<String> hello() {
        return ResponseEntity.ok("Hello World");
    }

    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return ResponseEntity.ok(user);
    }
}
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

```python
from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/api/hello', methods=['GET'])
def hello():
    return jsonify({'message': 'Hello World'})
```

Python では **Flask** フレームワークで API サーバーを作成する。

**@app.route()** デコレーターでエンドポイントを定義。

実行例

```python
from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/api/hello', methods=['GET'])
def hello():
    return jsonify({'message': 'Hello World'})

@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.get_json()
    return jsonify({'user': data}), 201

if __name__ == '__main__':
    app.run(debug=True, port=5000)
```

</div>
<div class="note_content_by_programming_language" id="note_content_Javascript">

```javascript
const express = require("express");
const app = express();

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello World" });
});
```

JavaScript では **Express** フレームワークで API サーバーを作成する。

**app.get()** で GET エンドポイント、**app.post()** で POST エンドポイントを定義。

実行例

```javascript
const express = require("express");
const app = express();

app.use(express.json());

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello World" });
});

app.post("/api/users", (req, res) => {
  const user = req.body;
  res.status(201).json({ user });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

</div>
<div class="note_content_by_programming_language" id="note_content_Go">

```go
package main
import (
    "net/http"
    "github.com/gin-gonic/gin"
)

func main() {
    r := gin.Default()
    r.GET("/api/hello", func(c *gin.Context) {
        c.JSON(200, gin.H{"message": "Hello World"})
    })
    r.Run(":8080")
}
```

Go 言語では **Gin** フレームワークで API サーバーを作成する。

**r.GET()** で GET エンドポイント、**r.POST()** で POST エンドポイントを定義。

実行例

```go
package main
import (
    "net/http"
    "github.com/gin-gonic/gin"
)

type User struct {
    Name  string `json:"name"`
    Email string `json:"email"`
}

func main() {
    r := gin.Default()

    r.GET("/api/hello", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{"message": "Hello World"})
    })

    r.POST("/api/users", func(c *gin.Context) {
        var user User
        if err := c.ShouldBindJSON(&user); err != nil {
            c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
            return
        }
        c.JSON(http.StatusCreated, gin.H{"user": user})
    })

    r.Run(":8080")
}
```

</div>
