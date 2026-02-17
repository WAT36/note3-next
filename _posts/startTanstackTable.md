---
title: "TanStack Tableを使ったテーブルUI構築について"
excerpt: "TanStack Tableを使ったテーブルUI構築のハンズオン。ソート、フィルタリング、ページネーション、行選択などの機能を実装しながら、ヘッドレスUIライブラリの使い方を学びます。"
coverImage: "/assets/posts/startTanstacktable/tanstack-logo.png"
date: "2026-02-17T10:49:23.000Z"
updatedAt: "2026-02-17T10:49:23.000Z"
tag: ["フロントエンド"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

今回はモダンな Web 開発におけるライブラリ「TanStack」について、

そしてその中の一つである複雑なテーブル UI を構築するための強力なライブラリ「TanStack Table」について記載していきます。

TanStack Table は、ソート、フィルタリング、ページネーション、行選択など、テーブルに必要な機能を簡単に実装できる「ヘッドレス UI」ライブラリです。UI を持たないため、デザインは完全に自由にカスタマイズできます。

この記事では、基本的な概念から実際に動くテーブルの構築まで記していきます。

# TanStack とは

その前に TanStack[^1] とは何かというと、**Web 開発における様々な課題を解決するためのライブラリ群**です。元々は「React Query」という名前で React のデータフェッチライブラリとして知られていましたが、現在はフレームワーク非依存の汎用的なツール群として進化しています。

**重要なポイント**

- TanStack は**単一のライブラリではなく、複数のライブラリの総称**です
- もともとは React 専用でしたが、現在は Vue、Solid、Svelte など様々なフレームワークに対応しています
- 開発者は Tanner Linsley 氏で、彼の名前から「TanStack」と名付けられました

# TanStack Table とは

TanStack Table[^2] はその中の一つで、**テーブル UI のロジックを提供するヘッドレス UI ライブラリ**です。React、Vue、Solid、Svelte など、様々なフレームワークに対応しています。

ここでいう「ヘッドレス」とは、**UI を持たず、ロジックだけを提供する**という意味です。

```plaintext
従来のUIライブラリ:
┌─────────────────────────────┐
│  ロジック + スタイル（固定）  │
└─────────────────────────────┘
↓ カスタマイズが難しい

ヘッドレスUIライブラリ:
┌─────────────────────────────┐
│  ロジックのみ                │
└─────────────────────────────┘
        +
┌─────────────────────────────┐
│  スタイル（自由にカスタマイズ）│
└─────────────────────────────┘
↓ 完全な自由度
```

特徴としては、主に以下があります。

- **完全なカスタマイズ性**: TailwindCSS、Material-UI、独自 CSS など、好きなスタイルを適用可能
- **豊富な機能**: ソート、フィルタリング、ページネーション、行選択、列のリサイズなど
- **型安全**: TypeScript との親和性が高い
- **軽量**: 必要な機能だけをインポートできる
- **フレームワーク非依存**: React、Vue、Solid、Svelte に対応

## なぜ TanStack Table が必要なのか

従来の方法では、ソート・フィルタリング・ページネーションなどを毎回自前で実装する必要がありました。

```tsx
// 従来の方法（すべて自分で実装）
function UserTable({ users }) {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // ソート、フィルタリング、ページネーションのロジックを
  // すべて自分で実装する必要がある...
}
```

TanStack Table を使えば、これらの機能を宣言的に追加できます

```tsx
// TanStack Tableを使った方法
function UserTable({ users }) {
  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  // あとはテーブルをレンダリングするだけ
}
```

## TanStack Table の主要概念

Tanstack Table で利用する概念としては以下があります。

| 概念              | 説明                                                                               |
| ----------------- | ---------------------------------------------------------------------------------- |
| Column Definition | テーブルの各列を定義。ヘッダー、セルの表示方法、ソート可能かどうかなどを指定       |
| Row Model         | テーブルの行データを管理。ソート、フィルタリング、ページネーションなどの処理を行う |
| Table Instance    | テーブル全体の状態と操作を管理するオブジェクト                                     |
| Cell              | テーブルの各セルを表す。値の取得やレンダリングを行う                               |
| Header            | テーブルのヘッダー行を表す。ソートボタンやフィルター入力などを配置                 |

# 実践ハンズオン - ユーザー管理テーブルを作ろう

それでは、実際に TanStack Table を使って、ソート、フィルタリング、ページネーション、行選択機能を持つユーザー管理テーブルを構築してみましょう。

## 前提条件

- Node.js（v18 以上）がインストールされていること
- React の基本的な知識があること
- TypeScript の基礎知識があること

## プロジェクトのセットアップ

以下で今回利用するプロジェクトを作成します。

```bash
# Viteを使ってReact + TypeScriptプロジェクトを作成
npm create vite@latest tanstack-table-demo -- --template react-ts
cd tanstack-table-demo
npm install

# TanStack Tableをインストール
npm install @tanstack/react-table
```

## 型定義とサンプルデータの作成

`src/data/users.ts`を作成します。

```typescript
// ユーザーの型定義
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  status: "active" | "inactive" | "pending";
  role: "admin" | "user" | "guest";
  createdAt: string;
}

// サンプルデータ
export const users: User[] = [
  {
    id: 1,
    firstName: "太郎",
    lastName: "山田",
    email: "taro.yamada@example.com",
    age: 28,
    status: "active",
    role: "admin",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    firstName: "花子",
    lastName: "鈴木",
    email: "hanako.suzuki@example.com",
    age: 34,
    status: "active",
    role: "user",
    createdAt: "2024-02-20",
  },
  {
    id: 3,
    firstName: "一郎",
    lastName: "佐藤",
    email: "ichiro.sato@example.com",
    age: 45,
    status: "inactive",
    role: "user",
    createdAt: "2023-11-10",
  },
  {
    id: 4,
    firstName: "美咲",
    lastName: "田中",
    email: "misaki.tanaka@example.com",
    age: 23,
    status: "pending",
    role: "guest",
    createdAt: "2024-03-05",
  },
  {
    id: 5,
    firstName: "健太",
    lastName: "高橋",
    email: "kenta.takahashi@example.com",
    age: 31,
    status: "active",
    role: "user",
    createdAt: "2024-01-28",
  },
  {
    id: 6,
    firstName: "由美",
    lastName: "伊藤",
    email: "yumi.ito@example.com",
    age: 29,
    status: "active",
    role: "admin",
    createdAt: "2023-12-15",
  },
  {
    id: 7,
    firstName: "大輔",
    lastName: "渡辺",
    email: "daisuke.watanabe@example.com",
    age: 38,
    status: "inactive",
    role: "user",
    createdAt: "2023-10-20",
  },
  {
    id: 8,
    firstName: "愛",
    lastName: "小林",
    email: "ai.kobayashi@example.com",
    age: 26,
    status: "active",
    role: "user",
    createdAt: "2024-02-10",
  },
  {
    id: 9,
    firstName: "翔太",
    lastName: "加藤",
    email: "shota.kato@example.com",
    age: 33,
    status: "pending",
    role: "guest",
    createdAt: "2024-03-01",
  },
  {
    id: 10,
    firstName: "真由",
    lastName: "吉田",
    email: "mayu.yoshida@example.com",
    age: 27,
    status: "active",
    role: "user",
    createdAt: "2024-01-05",
  },
  {
    id: 11,
    firstName: "隆",
    lastName: "山本",
    email: "takashi.yamamoto@example.com",
    age: 42,
    status: "active",
    role: "admin",
    createdAt: "2023-09-15",
  },
  {
    id: 12,
    firstName: "恵",
    lastName: "中村",
    email: "megumi.nakamura@example.com",
    age: 35,
    status: "inactive",
    role: "user",
    createdAt: "2023-08-20",
  },
];
```

## 基本的なテーブルコンポーネントの作成

まずは最小限の構成でテーブルを表示してみましょう。`src/components/BasicTable.tsx`を作成します。

```tsx
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import type { User } from "../data/users";

interface BasicTableProps {
  data: User[];
}

// 列ヘルパーを作成（型安全な列定義のため）
const columnHelper = createColumnHelper<User>();

// 列定義
const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((row) => `${row.lastName} ${row.firstName}`, {
    id: "fullName",
    header: "氏名",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    header: "メールアドレス",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("age", {
    header: "年齢",
    cell: (info) => `${info.getValue()}歳`,
  }),
  columnHelper.accessor("status", {
    header: "ステータス",
    cell: (info) => {
      const status = info.getValue();
      const statusMap = {
        active: "有効",
        inactive: "無効",
        pending: "保留中",
      };
      return statusMap[status];
    },
  }),
  columnHelper.accessor("role", {
    header: "権限",
    cell: (info) => {
      const role = info.getValue();
      const roleMap = {
        admin: "管理者",
        user: "ユーザー",
        guest: "ゲスト",
      };
      return roleMap[role];
    },
  }),
  columnHelper.accessor("createdAt", {
    header: "登録日",
    cell: (info) => info.getValue(),
  }),
];

function BasicTable({ data }: BasicTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="table-container">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BasicTable;
```

**ポイント解説**

- `createColumnHelper<User>()`: 型安全な列定義を作成するためのヘルパー
- `columnHelper.accessor()`: データのプロパティにアクセスする列を定義
- `useReactTable()`: テーブルインスタンスを作成
- `getCoreRowModel()`: 基本的な行モデルを取得（必須）
- `flexRender()`: ヘッダーやセルをレンダリングするユーティリティ

## スタイリング

`src/App.css`を以下のように編集します。

<details><summary>（長いので折りたたみを開いて表示して下さい）</summary>

```css
.App {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: #333;
  margin-bottom: 1.5rem;
}

.table-container {
  overflow-x: auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

th,
td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

th {
  background: #f8f9fa;
  font-weight: 600;
  color: #333;
  white-space: nowrap;
}

tbody tr:hover {
  background: #f8f9fa;
}

tbody tr:last-child td {
  border-bottom: none;
}

/* ステータスバッジ */
.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.status-active {
  background: #d4edda;
  color: #155724;
}

.status-inactive {
  background: #f8d7da;
  color: #721c24;
}

.status-pending {
  background: #fff3cd;
  color: #856404;
}

/* 権限バッジ */
.role-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
}

.role-admin {
  background: #cce5ff;
  color: #004085;
}

.role-user {
  background: #e2e3e5;
  color: #383d41;
}

.role-guest {
  background: #f5f5f5;
  color: #6c757d;
}

/* ソートボタン */
.sortable {
  cursor: pointer;
  user-select: none;
}

.sortable:hover {
  background: #e9ecef;
}

.sort-indicator {
  margin-left: 0.5rem;
}

/* グローバルフィルター */
.global-filter {
  margin-bottom: 1rem;
}

.global-filter input {
  padding: 0.75rem 1rem;
  width: 100%;
  max-width: 400px;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  font-size: 1rem;
}

.global-filter input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
}

/* ページネーション */
.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.pagination-buttons {
  display: flex;
  gap: 0.5rem;
}

.pagination button {
  padding: 0.5rem 1rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
}

.pagination button:hover:not(:disabled) {
  background: #0056b3;
}

.pagination button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.pagination-info {
  color: #666;
  font-size: 0.875rem;
}

.page-size-select {
  padding: 0.5rem;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  font-size: 0.875rem;
}

/* 行選択 */
.row-selected {
  background: #e7f1ff !important;
}

.checkbox {
  width: 1rem;
  height: 1rem;
  cursor: pointer;
}

/* アクションボタン */
.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.btn {
  padding: 0.25rem 0.75rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 500;
}

.btn-edit {
  background: #ffc107;
  color: #212529;
}

.btn-edit:hover {
  background: #e0a800;
}

.btn-delete {
  background: #dc3545;
  color: white;
}

.btn-delete:hover {
  background: #c82333;
}

/* 選択されたアイテムの操作バー */
.selection-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  margin-bottom: 1rem;
  background: #e7f1ff;
  border-radius: 8px;
  border: 1px solid #b6d4fe;
}

.selection-bar span {
  color: #004085;
  font-weight: 500;
}

.selection-bar button {
  padding: 0.5rem 1rem;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.selection-bar button:hover {
  background: #c82333;
}
```

</details>

`src/index.css`も更新します。

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #f5f5f5;
}
```

## App.tsx の作成と動作確認

`src/App.tsx`を以下のように編集します。

```tsx
import "./App.css";
import BasicTable from "./components/BasicTable";
import { users } from "./data/users";

function App() {
  return (
    <div className="App">
      <h1>ユーザー管理テーブル</h1>
      <BasicTable data={users} />
    </div>
  );
}

export default App;
```

```bash
npm run dev
```

ブラウザで `http://localhost:5173` を開くと、基本的なテーブルが表示されます。

![](/assets/posts/startTanstacktable/demo.png)

## 全機能統合版テーブルの作成

基本が理解できたところで、ソート・フィルタリング・ページネーション・行選択・列表示切替をすべて備えた完成版を作成しましょう。

`src/components/FullFeaturedTable.tsx`を作成します

```tsx
import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
  type ColumnFiltersState,
  type PaginationState,
  type RowSelectionState,
  type VisibilityState,
  type HeaderContext,
  type CellContext,
} from "@tanstack/react-table";
import type { User } from "../data/users";

interface FullFeaturedTableProps {
  data: User[];
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
}

const columnHelper = createColumnHelper<User>();

function FullFeaturedTable({ data, onEdit, onDelete }: FullFeaturedTableProps) {
  // 状態管理
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [showColumnMenu, setShowColumnMenu] = useState(false);

  // 列定義
  const columns = useMemo(
    () => [
      // 選択チェックボックス列
      {
        id: "select",
        header: ({ table }: HeaderContext<User, unknown>) => (
          <input
            type="checkbox"
            className="checkbox"
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }: CellContext<User, unknown>) => (
          <input
            type="checkbox"
            className="checkbox"
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      columnHelper.accessor("id", {
        header: "ID",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor((row) => `${row.lastName} ${row.firstName}`, {
        id: "fullName",
        header: "氏名",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("email", {
        header: "メールアドレス",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("age", {
        header: "年齢",
        cell: (info) => `${info.getValue()}歳`,
      }),
      columnHelper.accessor("status", {
        header: "ステータス",
        cell: (info) => {
          const status = info.getValue();
          const statusMap = {
            active: "有効",
            inactive: "無効",
            pending: "保留中",
          };
          const statusClass = `status-badge status-${status}`;
          return <span className={statusClass}>{statusMap[status]}</span>;
        },
        filterFn: "equals",
      }),
      columnHelper.accessor("role", {
        header: "権限",
        cell: (info) => {
          const role = info.getValue();
          const roleMap = {
            admin: "管理者",
            user: "ユーザー",
            guest: "ゲスト",
          };
          const roleClass = `role-badge role-${role}`;
          return <span className={roleClass}>{roleMap[role]}</span>;
        },
        filterFn: "equals",
      }),
      columnHelper.accessor("createdAt", {
        header: "登録日",
        cell: (info) => info.getValue(),
      }),
      // アクション列
      {
        id: "actions",
        header: "操作",
        cell: ({ row }: CellContext<User, unknown>) => (
          <div className="action-buttons">
            <button
              className="btn btn-edit"
              onClick={() => onEdit?.(row.original)}
            >
              編集
            </button>
            <button
              className="btn btn-delete"
              onClick={() => onDelete?.(row.original)}
            >
              削除
            </button>
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
      },
    ],
    [onEdit, onDelete]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      pagination,
      rowSelection,
      columnVisibility,
    },
    enableRowSelection: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const selectedRows = table.getFilteredSelectedRowModel().rows;

  const handleBulkDelete = () => {
    const selectedIds = selectedRows.map((row) => row.original.id);
    if (window.confirm(`${selectedIds.length}件のユーザーを削除しますか？`)) {
      alert(`削除対象ID: ${selectedIds.join(", ")}`);
      setRowSelection({});
    }
  };

  return (
    <div>
      {/* コントロールバー */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "1rem",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {/* グローバル検索 */}
        <input
          type="text"
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="検索..."
          style={{
            padding: "0.5rem 1rem",
            border: "1px solid #dee2e6",
            borderRadius: "4px",
            fontSize: "1rem",
            minWidth: "200px",
          }}
        />

        {/* ステータスフィルター */}
        <select
          value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table
              .getColumn("status")
              ?.setFilterValue(e.target.value || undefined)
          }
          className="page-size-select"
        >
          <option value="">すべてのステータス</option>
          <option value="active">有効</option>
          <option value="inactive">無効</option>
          <option value="pending">保留中</option>
        </select>

        {/* 権限フィルター */}
        <select
          value={(table.getColumn("role")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("role")?.setFilterValue(e.target.value || undefined)
          }
          className="page-size-select"
        >
          <option value="">すべての権限</option>
          <option value="admin">管理者</option>
          <option value="user">ユーザー</option>
          <option value="guest">ゲスト</option>
        </select>

        {/* フィルタークリア */}
        <button
          onClick={() => {
            setGlobalFilter("");
            setColumnFilters([]);
          }}
          className="btn"
          style={{ background: "#6c757d", color: "white" }}
        >
          クリア
        </button>

        {/* 列表示設定 */}
        <div style={{ position: "relative", marginLeft: "auto" }}>
          <button
            onClick={() => setShowColumnMenu(!showColumnMenu)}
            className="btn"
            style={{ background: "#007bff", color: "white" }}
          >
            列の表示 ▼
          </button>

          {showColumnMenu && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                right: 0,
                marginTop: "0.5rem",
                padding: "1rem",
                background: "white",
                border: "1px solid #dee2e6",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                zIndex: 100,
                minWidth: "180px",
              }}
            >
              {table
                .getAllLeafColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <label
                    key={column.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginBottom: "0.25rem",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={column.getIsVisible()}
                      onChange={column.getToggleVisibilityHandler()}
                    />
                    {typeof column.columnDef.header === "string"
                      ? column.columnDef.header
                      : column.id}
                  </label>
                ))}
              <button
                onClick={() => setShowColumnMenu(false)}
                className="btn"
                style={{
                  marginTop: "0.5rem",
                  background: "#6c757d",
                  color: "white",
                  width: "100%",
                }}
              >
                閉じる
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 選択時の一括操作バー */}
      {selectedRows.length > 0 && (
        <div className="selection-bar">
          <span>{selectedRows.length} 件選択中</span>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button onClick={handleBulkDelete}>一括削除</button>
            <button
              onClick={() => setRowSelection({})}
              style={{ background: "#6c757d" }}
            >
              選択解除
            </button>
          </div>
        </div>
      )}

      {/* テーブル */}
      <div className="table-container">
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={header.column.getCanSort() ? "sortable" : ""}
                    onClick={
                      header.column.getCanSort()
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {header.column.getCanSort() && (
                        <span className="sort-indicator">
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted() as string] ?? " ↕️"}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={table.getVisibleLeafColumns().length}
                  style={{ textAlign: "center", padding: "2rem" }}
                >
                  該当するデータがありません
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={row.getIsSelected() ? "row-selected" : ""}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ページネーション */}
      <div className="pagination">
        <div className="pagination-buttons">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
        </div>

        <div className="pagination-info">
          ページ {table.getState().pagination.pageIndex + 1} /{" "}
          {table.getPageCount() || 1}
          （全 {table.getFilteredRowModel().rows.length} 件）
        </div>

        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
          className="page-size-select"
        >
          {[5, 10, 20, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}件表示
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default FullFeaturedTable;
```

## App.tsx を更新して完成版を表示

`src/App.tsx`を更新します

```tsx
import "./App.css";
import FullFeaturedTable from "./components/FullFeaturedTable";
import { users, type User } from "./data/users";

function App() {
  const handleEdit = (user: User) => {
    alert(`編集: ${user.lastName} ${user.firstName} (ID: ${user.id})`);
  };

  const handleDelete = (user: User) => {
    if (window.confirm(`${user.lastName} ${user.firstName} を削除しますか？`)) {
      alert(`削除: ID ${user.id}`);
    }
  };

  return (
    <div className="App">
      <h1>ユーザー管理テーブル</h1>
      <FullFeaturedTable
        data={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
```

これで、以下の機能を持つテーブルが完成しました。

- ソート（列ヘッダークリック）
- グローバル検索
- 列フィルター（ステータス・権限）
- ページネーション
- 行選択と一括操作
- 列の表示/非表示切替
- 編集・削除アクション

実際に起動した画面は以下の通りです。

![](/assets/posts/startTanstacktable/demo2.png)

# 機能追加のポイント解説

各機能を追加する際の重要なポイントをまとめます。

- ソート機能

```tsx
import { getSortedRowModel, SortingState } from "@tanstack/react-table";

const [sorting, setSorting] = useState<SortingState>([]);

const table = useReactTable({
  // ...
  state: { sorting },
  onSortingChange: setSorting,
  getSortedRowModel: getSortedRowModel(), // これを追加
});
```

- フィルタリング機能

```tsx
import { getFilteredRowModel, ColumnFiltersState } from "@tanstack/react-table";

const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
const [globalFilter, setGlobalFilter] = useState("");

const table = useReactTable({
  // ...
  state: { columnFilters, globalFilter },
  onColumnFiltersChange: setColumnFilters,
  onGlobalFilterChange: setGlobalFilter,
  getFilteredRowModel: getFilteredRowModel(), // これを追加
});
```

- ページネーション機能

```tsx
import { getPaginationRowModel, PaginationState } from "@tanstack/react-table";

const [pagination, setPagination] = useState<PaginationState>({
  pageIndex: 0,
  pageSize: 10,
});

const table = useReactTable({
  // ...
  state: { pagination },
  onPaginationChange: setPagination,
  getPaginationRowModel: getPaginationRowModel(), // これを追加
});
```

- 行選択機能

```tsx
import { RowSelectionState } from "@tanstack/react-table";

const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

const table = useReactTable({
  // ...
  state: { rowSelection },
  enableRowSelection: true, // これを追加
  onRowSelectionChange: setRowSelection,
});
```

# まとめ

TanStack Table は、モダンな Web アプリケーションで複雑なテーブル UI を構築するための強力なライブラリです。

TanStack Table を使うメリットとしては、主に以下があります。

| メリット             | 説明                                                 |
| -------------------- | ---------------------------------------------------- |
| 完全なカスタマイズ性 | ヘッドレスなので、どんなデザインにも対応可能         |
| 豊富な機能           | ソート、フィルタリング、ページネーション、行選択など |
| 型安全性             | TypeScript との親和性が高い                          |
| パフォーマンス       | 必要な機能だけをインポート                           |
| フレームワーク非依存 | React、Vue、Solid、Svelte で使用可能                 |

こんな場合におすすめです。

- 複雑なテーブル UI が必要なアプリケーション
- デザインの自由度が求められるプロジェクト
- TypeScript で型安全に開発したい場合
- 大量のデータを効率的に表示したい場合

ぜひ実際に手を動かして、TanStack Table の便利さを体感してください。

---

# 完成したプロジェクト構造

```
tanstack-table-demo/
├── src/
│   ├── components/
│   │   ├── BasicTable.tsx
│   │   └── FullFeaturedTable.tsx
│   ├── data/
│   │   └── users.ts
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   └── index.css
├── package.json
└── vite.config.ts
```

---

[^1]: [Tanstack](https://tanstack.com/)
[^2]: [TanStack Table 公式ドキュメント](https://tanstack.com/table/latest)
