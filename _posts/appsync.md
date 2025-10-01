---
title: "GraphQLについて(その２) ~AWS AppSyncによる実践~"
excerpt: "AWS AppSyncを利用してGraphQLを立てるハンズオン"
coverImage: "/assets/posts/appsync/appsync.png"
date: "2025-07-09T08:28:04.000Z"
updatedAt: '2025-09-30T23:07:40.000Z'
tag: ["API", "AWS"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

前回の記事では、 GraphQL の特徴等についてを記載しました。

今回は、GraphQL を実際に使うハンズオンを利用し、実践してみましょう。

GraphQL を使うために、今回は AWS AppSync を利用します。

# AWS AppSync とは

AWS AppSync[^1] は完全マネージドの GraphQL サービスで、インフラ管理が不要です。リクエスト量により課金はありますが、低トラフィックならほぼコストゼロで運用可能になります。

# Terraform で構築する

今回は一連のリソースを Terraform で立ててみます。

## プロジェクト構成

今回利用するファイル構成は以下の通りです。

```plaintext
graphql-appsync-tutorial/
├── terraform/
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   └── schema/
│       └── schema.graphql
└── queries/
    ├── queries.graphql
    └── mutations.graphql
```

## GraphQL スキーマ定義

まずは`terraform/schema/schema.graphql`を作成します。

このファイルは、今回の GraphQL で利用する型定義（スキーマ定義）になります。

```graphql
type User {
  id: ID!
  name: String!
  email: String!
  createdAt: String!
  posts: [Post]
}

type Post {
  id: ID!
  title: String!
  content: String!
  authorId: ID!
  createdAt: String!
  author: User
}

type Query {
  getUser(id: ID!): User
  listUsers: [User]
  getPost(id: ID!): Post
  listPosts: [Post]
  getPostsByUser(userId: ID!): [Post]
}

type Mutation {
  createUser(input: CreateUserInput!): User
  createPost(input: CreatePostInput!): Post
  updateUser(input: UpdateUserInput!): User
  deleteUser(id: ID!): User
}

input CreateUserInput {
  name: String!
  email: String!
}

input CreatePostInput {
  title: String!
  content: String!
  authorId: ID!
}

input UpdateUserInput {
  id: ID!
  name: String
  email: String
}

schema {
  query: Query
  mutation: Mutation
}
```

## Terraform 設定

次に`terraform/variables.tf`を作成し、リージョンやプロジェクト名などを設定します。

以下のようになりますが、リージョン名・プロジェクト名は適宜置き換えてください。

```hcl
variable "region" {
  description = "AWS region"
  type        = string
  default     = "ap-northeast-1"
}

variable "project_name" {
  description = "Project name for resource naming"
  type        = string
  default     = "graphql-tutorial"  # プロジェクト名。各自置き換えること
}

```

次に`terraform/main.tf`を作成します。

ここでは AppSync に加え、入力したデータを保持しておくための DynamoDB の作成を行います。

```hcl
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.region
}

# DynamoDB テーブル（ユーザー用）
resource "aws_dynamodb_table" "users" {
  name           = "${var.project_name}-users"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }

  tags = {
    Name = "${var.project_name}-users"
  }
}

# DynamoDB テーブル（投稿用）
resource "aws_dynamodb_table" "posts" {
  name           = "${var.project_name}-posts"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "authorId"
    type = "S"
  }

  global_secondary_index {
    name     = "AuthorIndex"
    hash_key = "authorId"
    projection_type    = "ALL"
  }

  tags = {
    Name = "${var.project_name}-posts"
  }
}

# AppSync GraphQL API
resource "aws_appsync_graphql_api" "main" {
  name                = "${var.project_name}-api"
  authentication_type = "API_KEY"
  schema              = file("${path.module}/schema/schema.graphql")

  tags = {
    Name = "${var.project_name}-api"
  }
}

# API Key
resource "aws_appsync_api_key" "main" {
  api_id  = aws_appsync_graphql_api.main.id
  expires = timeadd(timestamp(), "8760h")
}

# IAM Role for AppSync
resource "aws_iam_role" "appsync" {
  name = "${var.project_name}-appsync-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "appsync.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy" "appsync" {
  name = "${var.project_name}-appsync-policy"
  role = aws_iam_role.appsync.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "dynamodb:DeleteItem",
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:Query",
          "dynamodb:Scan",
          "dynamodb:UpdateItem"
        ]
        Resource = [
          aws_dynamodb_table.users.arn,
          aws_dynamodb_table.posts.arn,
          "${aws_dynamodb_table.posts.arn}/index/*"
        ]
      }
    ]
  })
}

# Data Sources
resource "aws_appsync_datasource" "users" {
  api_id           = aws_appsync_graphql_api.main.id
  name             = "UsersTable"
  service_role_arn = aws_iam_role.appsync.arn
  type             = "AMAZON_DYNAMODB"

  dynamodb_config {
    table_name = aws_dynamodb_table.users.name
  }
}

resource "aws_appsync_datasource" "posts" {
  api_id           = aws_appsync_graphql_api.main.id
  name             = "PostsTable"
  service_role_arn = aws_iam_role.appsync.arn
  type             = "AMAZON_DYNAMODB"

  dynamodb_config {
    table_name = aws_dynamodb_table.posts.name
  }
}

# Resolvers
resource "aws_appsync_resolver" "get_user" {
  api_id      = aws_appsync_graphql_api.main.id
  field       = "getUser"
  type        = "Query"
  data_source = aws_appsync_datasource.users.name

  request_template = jsonencode({
    version = "2018-05-29"
    operation = "GetItem"
    key = {
      id = { S = "$ctx.args.id" }
    }
  })

  response_template = "#if($ctx.error)$util.error($ctx.error.message, $ctx.error.type)#end$util.toJson($ctx.result)"
}

resource "aws_appsync_resolver" "list_users" {
  api_id      = aws_appsync_graphql_api.main.id
  field       = "listUsers"
  type        = "Query"
  data_source = aws_appsync_datasource.users.name

  request_template = jsonencode({
    version = "2018-05-29"
    operation = "Scan"
  })

  response_template = "#if($ctx.error)$util.error($ctx.error.message, $ctx.error.type)#end$util.toJson($ctx.result.items)"
}

resource "aws_appsync_resolver" "get_post" {
  api_id      = aws_appsync_graphql_api.main.id
  field       = "getPost"
  type        = "Query"
  data_source = aws_appsync_datasource.posts.name

  request_template = jsonencode({
    version = "2018-05-29"
    operation = "GetItem"
    key = {
      id = { S = "$ctx.args.id" }
    }
  })

  response_template = "#if($ctx.error)$util.error($ctx.error.message, $ctx.error.type)#end$util.toJson($ctx.result)"
}

resource "aws_appsync_resolver" "list_posts" {
  api_id      = aws_appsync_graphql_api.main.id
  field       = "listPosts"
  type        = "Query"
  data_source = aws_appsync_datasource.posts.name

  request_template = jsonencode({
    version = "2018-05-29"
    operation = "Scan"
  })

  response_template = "#if($ctx.error)$util.error($ctx.error.message, $ctx.error.type)#end$util.toJson($ctx.result.items)"
}

resource "aws_appsync_resolver" "get_posts_by_user" {
  api_id      = aws_appsync_graphql_api.main.id
  field       = "getPostsByUser"
  type        = "Query"
  data_source = aws_appsync_datasource.posts.name

  request_template = jsonencode({
    version = "2018-05-29"
    operation = "Query"
    index = "AuthorIndex"
    query = {
      expression = "authorId = :authorId"
      expressionValues = {
        ":authorId" = { S = "$ctx.args.userId" }
      }
    }
  })

  response_template = "#if($ctx.error)$util.error($ctx.error.message, $ctx.error.type)#end$util.toJson($ctx.result.items)"
}

resource "aws_appsync_resolver" "create_user" {
  api_id      = aws_appsync_graphql_api.main.id
  field       = "createUser"
  type        = "Mutation"
  data_source = aws_appsync_datasource.users.name

  request_template = jsonencode({
    version = "2018-05-29"
    operation = "PutItem"
    key = {
      id = { S = "$util.autoId()" }
    }
    attributeValues = {
      name = { S = "$ctx.args.input.name" }
      email = { S = "$ctx.args.input.email" }
      createdAt = { S = "$util.time.nowISO8601()" }
    }
  })

  response_template = "#if($ctx.error)$util.error($ctx.error.message, $ctx.error.type)#end$util.toJson($ctx.result)"
}

resource "aws_appsync_resolver" "update_user" {
  api_id      = aws_appsync_graphql_api.main.id
  field       = "updateUser"
  type        = "Mutation"
  data_source = aws_appsync_datasource.users.name

  request_template = jsonencode({
    version = "2018-05-29"
    operation = "UpdateItem"
    key = {
      id = { S = "$ctx.args.input.id" }
    }
    update = {
      expression = "SET #name = :name, #email = :email"
      expressionNames = {
        "#name" = "name"
        "#email" = "email"
      }
      expressionValues = {
        ":name" = { S = "$util.defaultIfNull($ctx.args.input.name, $ctx.source.name)" }
        ":email" = { S = "$util.defaultIfNull($ctx.args.input.email, $ctx.source.email)" }
      }
    }
  })

  response_template = "#if($ctx.error)$util.error($ctx.error.message, $ctx.error.type)#end$util.toJson($ctx.result)"
}

resource "aws_appsync_resolver" "delete_user" {
  api_id      = aws_appsync_graphql_api.main.id
  field       = "deleteUser"
  type        = "Mutation"
  data_source = aws_appsync_datasource.users.name

  request_template = jsonencode({
    version = "2018-05-29"
    operation = "DeleteItem"
    key = {
      id = { S = "$ctx.args.id" }
    }
  })

  response_template = "#if($ctx.error)$util.error($ctx.error.message, $ctx.error.type)#end$util.toJson($ctx.result)"
}

resource "aws_appsync_resolver" "create_post" {
  api_id      = aws_appsync_graphql_api.main.id
  field       = "createPost"
  type        = "Mutation"
  data_source = aws_appsync_datasource.posts.name

  request_template = jsonencode({
    version = "2018-05-29"
    operation = "PutItem"
    key = {
      id = { S = "$util.autoId()" }
    }
    attributeValues = {
      title = { S = "$ctx.args.input.title" }
      content = { S = "$ctx.args.input.content" }
      authorId = { S = "$ctx.args.input.authorId" }
      createdAt = { S = "$util.time.nowISO8601()" }
    }
  })

  response_template = "#if($ctx.error)$util.error($ctx.error.message, $ctx.error.type)#end$util.toJson($ctx.result)"
}

```

最後に`terraform/outputs.tf`を作成します。これにより先ほど作成した AppSync のエンドポイント、キー等を取り出します。

```hcl
output "graphql_endpoint" {
  description = "GraphQL API endpoint"
  value       = aws_appsync_graphql_api.main.uris["GRAPHQL"]
}

output "api_key" {
  description = "API Key for GraphQL API"
  value       = aws_appsync_api_key.main.key
  sensitive   = true
}

output "api_id" {
  description = "GraphQL API ID"
  value       = aws_appsync_graphql_api.main.id
}
```

## AWS リソースのデプロイ

一連のリソースを作成する terraform のコードを作成したところで、実際にこれらをデプロイします。

```bash
cd terraform
terraform init
terraform plan
terraform apply
```

デプロイ完了後、出力される値を確認します。後の通信に必要になるので出力値を書き留めてください。またこの値は外部に漏らさないようにしてください。

```bash
terraform output graphql_endpoint
terraform output api_key
```

## クエリとミューテーションの準備

まずはクエリ用のファイルとして、`queries/queries.graphql`を作成します。

```graphql
# ユーザー一覧取得
query ListUsers {
  listUsers {
    id
    name
    email
    createdAt
  }
}

# 特定ユーザー取得
query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    name
    email
    createdAt
  }
}

# 投稿一覧取得
query ListPosts {
  listPosts {
    id
    title
    content
    authorId
    createdAt
  }
}
```

次にミューテーション用のファイルとして、`queries/mutations.graphql`を作成します。

```graphql
# ユーザー作成
mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    name
    email
    createdAt
  }
}

# 投稿作成
mutation CreatePost($input: CreatePostInput!) {
  createPost(input: $input) {
    id
    title
    content
    authorId
    createdAt
  }
}
```

## API 動作確認

AWS コンソールから実行確認もできますが、今回は API ということで curl コマンドで確認してみます。

環境変数の値は各自の値に置き換えて実行してください。

送るデータには、先ほど作成したクエリ・ミューテーションファイルの型定義をコピーし、値を置き換えて利用してください。

```bash
# 環境変数設定（terraform outputの値を使用）
export GRAPHQL_ENDPOINT="your-graphql-endpoint"
export API_KEY="your-api-key"

# ユーザー作成
curl -X POST \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "query": "mutation CreateUser($input: CreateUserInput!) { createUser(input: $input) { id name email createdAt } }",
    "variables": {
      "input": {
        "name": "田中太郎",
        "email": "tanaka@example.com"
      }
    }
  }' \
  $GRAPHQL_ENDPOINT

# ユーザー一覧取得
curl -X POST \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "query": "query ListUsers { listUsers { id name email createdAt } }"
  }' \
  $GRAPHQL_ENDPOINT

```

## 実際に試してみる

1. ユーザーを作成

上記、送るデータの部分を以下に置き換えて実施してみてください。

```graphql
mutation {
  createUser(input: { name: "田中太郎", email: "tanaka@example.com" }) {
    id
    name
    email
    createdAt
  }
}
```

以下の値が返ってくるかと思います。

```json
{
  "data": {
    "createUser": {
      "id": "de7b8b56-5eeb-4aee-80dc-4fdfe82503aa",
      "name": "田中太郎",
      "email": "tanaka@example.com",
      "createdAt": "2025-07-09T14:12:18.683Z"
    }
  }
}
```

2. 作成されたユーザーの ID をコピーして投稿を作成

ユーザー作成を実施すると ID が返ってくるので、その値を使い投稿作成をやってみてください。

```graphql
mutation {
  createPost(
    input: {
      title: "GraphQL学習日記"
      content: "AWS AppSyncでGraphQLを学んでいます！"
      authorId: "(ここに上で作成したユーザーのIDを入力)"
    }
  ) {
    id
    title
    content
    authorId
    createdAt
  }
}
```

実行すると以下の値が返ってくるかと思います。

```json
{
  "data": {
    "createPost": {
      "id": "e14ed556-3d50-44eb-95a9-a9116cd6ecaa",
      "title": "GraphQL学習日記",
      "content": "AWS AppSyncでGraphQLを学んでいます！",
      "authorId": "de7b8b56-5eeb-4aee-80dc-4fdfe82503aa",
      "createdAt": "2025-07-09T14:27:02.905Z"
    }
  }
}
```

3. データを確認

以下のデータを送ると、これまで作成されたユーザーのデータが返ってきます。

```graphql
query {
  listUsers {
    id
    name
    email
    createdAt
  }
}
```

以下の値が返ってくるかと思います。

```json
{
  "data": {
    "listUsers": [
      {
        "id": "de7b8b56-5eeb-4aee-80dc-4fdfe82503aa",
        "name": "田中太郎",
        "email": "tanaka@example.com",
        "createdAt": "2025-07-09T14:12:18.683Z"
      }
    ]
  }
}
```

## リソースの削除

学習が終わったら、AWS の課金を避けるためにリソースを削除しましょう。

```bash
cd terraform
terraform destroy
```

---

今回は AppSync を使って GraphQL を実践してみました。

今後 API を選定する時があれば、候補に入れて考えてみたいですね。

---

[^1]: [AWS AppSync（公式ページ）](https://aws.amazon.com/jp/appsync/)
