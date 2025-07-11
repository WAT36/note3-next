---
title: "CesiumJSを使ってみる"
excerpt: ""
coverImage: ""
date: "2025-07-11T22:40:12.000Z"
updatedAt: "2025-07-11T22:40:12.000Z"
tag: ["地理情報", "Javascript"]
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

以前より地理情報を扱うシステムに興味があり、それに関するフレームワークやライブラリを扱ってみようと思い始めました。

その一環として今回は、CesiumJS を利用して簡単な実践をしてみようと思います。この記事では、CesiumJS の基本的な使い方から実際のハンズオンまでを記載します。

# CesiumJS とは？

CesiumJS[^1]は、WebGL 技術を使用してブラウザ上で 3D 地球儀や地理空間データを表示するためのオープンソース JavaScript ライブラリです。NASA、Google、Microsoft など多くの企業で採用されており、高品質な 3D ビジュアライゼーションを手軽に実現できます。

## 主な特徴

- **高性能な 3D 描画**: WebGL を活用した滑らかな 3D 描画
- **豊富な地図データ**: 衛星画像、地形データ、建物の 3D モデルなど
- **時系列データ対応**: 時間軸に沿ったアニメーション表示
- **カスタマイズ性**: エンティティ、プリミティブ、マテリアルなど豊富な API
- **モバイル対応**: タッチ操作にも対応

# 環境構築

## 1. プロジェクトの初期化

```bash
# 新しいプロジェクトディレクトリを作成
mkdir cesium-tutorial
cd cesium-tutorial

# package.jsonを作成
npm init -y
```

## 2. 必要なパッケージのインストール

```bash
# CesiumJSをインストール
npm install cesium

# TypeScript関連をインストール
npm install -D typescript @types/cesium

# 開発用サーバーをインストール
npm install -D vite
```

## 3. TypeScript 設定ファイルの作成

プロジェクトルートに tsconfig.json を作成します。

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

## 4. Vite 設定ファイルの作成

プロジェクトルートに `vite.config.ts` を作成します。

```typescript
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import path from "path";

export default defineConfig({
  server: { port: 3000 },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: path.resolve(
            __dirname,
            "node_modules/cesium/Build/Cesium/Workers"
          ),
          dest: "cesium",
        },
        {
          src: path.resolve(
            __dirname,
            "node_modules/cesium/Build/Cesium/Assets"
          ),
          dest: "cesium",
        },
        {
          src: path.resolve(
            __dirname,
            "node_modules/cesium/Build/Cesium/Widgets"
          ),
          dest: "cesium",
        },
        {
          src: path.resolve(
            __dirname,
            "node_modules/cesium/Build/Cesium/ThirdParty"
          ),
          dest: "cesium",
        },
        {
          src: path.resolve(
            __dirname,
            "node_modules/cesium/Build/Cesium/Cesium.js"
          ),
          dest: "cesium",
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      // `import "cesium"` などがここを参照できるように
      cesium: path.resolve(__dirname, "node_modules/cesium/Build/Cesium"),
    },
  },
  define: {
    // これで Cesium ランタイム中の window.CESIUM_BASE_URL を "/cesium/" に置き換え
    "window.CESIUM_BASE_URL": JSON.stringify("/cesium/"),
  },
});
```

# ハンズオン 1: 基本的な地球儀の表示

## 1. HTML ファイルの作成

プロジェクトルートに index.html を作成します。

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CesiumJS Tutorial</title>
    <link
      href="https://cesium.com/downloads/cesiumjs/releases/1.108/Build/Cesium/Widgets/widgets.css"
      rel="stylesheet"
    />
    <style>
      html,
      body,
      #cesiumContainer {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        overflow: hidden;
        font-family: sans-serif;
      }
    </style>
  </head>
  <body>
    <div id="cesiumContainer"></div>
    <script type="module" src="./src/main.ts"></script>
  </body>
</html>
```

## 2. TypeScript ファイルの作成

src/main.ts を作成します。

```typescript
import { Viewer, Ion, createWorldTerrainAsync, Cartesian3, Math } from "cesium";

// import.meta.env で読み取る
const token = import.meta.env.VITE_CESIUM_ION_ACCESS_TOKEN;
if (!token) {
  throw new Error("VITE_CESIUM_ION_ACCESS_TOKEN is not defined");
}

async function initCesium() {
  //  トークン＆ベースURL
  Ion.defaultAccessToken = token || "";
  (window as any).CESIUM_BASE_URL = "./cesium";

  //  非同期で World Terrain プロバイダーを取得
  const terrainProvider = await createWorldTerrainAsync({
    requestVertexNormals: true, // 必要に応じてオプション指定可
  });

  // Cesiumビューワーを作成
  const viewer = new Viewer("cesiumContainer", {
    terrainProvider,
    baseLayerPicker: false,
    geocoder: false,
    homeButton: false,
    sceneModePicker: false,
    navigationHelpButton: false,
    animation: false,
    timeline: false,
    fullscreenButton: false,
    vrButton: false,
  });

  // 初期位置を東京に設定
  viewer.camera.setView({
    destination: Cartesian3.fromDegrees(139.6917, 35.6895, 10000),
    orientation: {
      heading: Math.toRadians(0),
      pitch: Math.toRadians(-90),
      roll: 0,
    },
  });
}

// 起動
initCesium();
```

## 3. package.json にスクリプトを追加

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

## 4. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで http://localhost:3000 にアクセスすると、3D 地球儀が表示されます。

![](/assets/posts/startCesiumJS/initCesiumJS.png)

# ハンズオン 2: マーカーとポリゴンの追加

地球儀にマーカーやポリゴンを追加してみましょう。

main.ts を以下のように変えてみます。

```typescript
import {
  Viewer,
  Ion,
  createWorldTerrainAsync,
  Cartesian3,
  Color,
  LabelStyle,
  VerticalOrigin,
  Cartesian2,
} from "cesium";

// import.meta.env で読み取る
const token = import.meta.env.VITE_CESIUM_ION_ACCESS_TOKEN;
if (!token) {
  throw new Error("VITE_CESIUM_ION_ACCESS_TOKEN is not defined");
}

async function markCesium() {
  // 1. トークン＆ベースURL
  Ion.defaultAccessToken = token || "";
  (window as any).CESIUM_BASE_URL = "./cesium";

  // 2. 非同期で World Terrain プロバイダーを取得
  const terrainProvider = await createWorldTerrainAsync({
    requestVertexNormals: true, // 必要に応じてオプション指定可
  });

  const viewer = new Viewer("cesiumContainer", {
    terrainProvider,
  });

  // 東京の位置にマーカーを追加
  viewer.entities.add({
    position: Cartesian3.fromDegrees(139.6917, 35.6895),
    point: {
      pixelSize: 10,
      color: Color.YELLOW,
      outlineColor: Color.BLACK,
      outlineWidth: 2,
    },
    label: {
      text: "東京",
      font: "14pt monospace",
      style: LabelStyle.FILL_AND_OUTLINE,
      outlineWidth: 2,
      verticalOrigin: VerticalOrigin.BOTTOM,
      pixelOffset: new Cartesian2(0, -9),
    },
  });

  // 横浜の位置にビルボードを追加
  viewer.entities.add({
    position: Cartesian3.fromDegrees(139.6226, 35.466),
    billboard: {
      image:
        "https://com/downloads/cesiumjs/releases/1.108/Build/Cesium/Widgets/Images/NavigationHelp/TouchHold.svg",
      width: 50,
      height: 50,
    },
    point: {
      pixelSize: 10,
      color: Color.YELLOW,
      outlineColor: Color.BLACK,
      outlineWidth: 2,
    },
    label: {
      text: "横浜",
      font: "14pt monospace",
      pixelOffset: new Cartesian2(0, -50),
    },
  });

  // 東京-横浜間にポリラインを追加
  viewer.entities.add({
    polyline: {
      positions: Cartesian3.fromDegreesArray([
        139.6917, 35.6895, 139.6226, 35.466,
      ]),
      width: 5,
      clampToGround: true,
      material: Color.RED,
    },
  });

  // 関東地方にポリゴンを追加
  viewer.entities.add({
    polygon: {
      hierarchy: Cartesian3.fromDegreesArray([
        139.0, 35.0, 140.0, 35.0, 140.0, 36.0, 139.0, 36.0,
      ]),
      material: Color.BLUE.withAlpha(0.3),
      outline: true,
      outlineColor: Color.BLUE,
    },
  });

  // カメラを東京に向ける
  viewer.camera.setView({
    destination: Cartesian3.fromDegrees(139.6917, 35.6895, 50000),
  });
}

// 起動
markCesium();
```

同様に実行して表示すると、東京と横浜が結ばれた状態で表示されます。

![](/assets/posts/startCesiumJS/markCesiumJS.png)

## ハンズオン 3: 3D モデルの表示

次は、3D 表示を行ってみます。

main.ts を以下のように変えてみてください。

```typescript
import {
  Viewer,
  Ion,
  createWorldTerrainAsync,
  Cartesian3,
  Math,
  HeadingPitchRoll,
  Transforms,
} from "cesium";

// import.meta.env で読み取る
const token = import.meta.env.VITE_CESIUM_ION_ACCESS_TOKEN;
if (!token) {
  throw new Error("VITE_CESIUM_ION_ACCESS_TOKEN is not defined");
}

async function threeDCesium() {
  // 1. トークン＆ベースURL
  Ion.defaultAccessToken = token || "";
  (window as any).CESIUM_BASE_URL = "./cesium";

  // 2. 非同期で World Terrain プロバイダーを取得
  const terrainProvider = await createWorldTerrainAsync({
    requestVertexNormals: true, // 必要に応じてオプション指定可
  });

  const viewer = new Viewer("cesiumContainer", {
    terrainProvider,
  });

  // 3Dモデルを追加（東京スカイツリー付近）
  const position = Cartesian3.fromDegrees(139.8107, 35.7101, 200);
  const heading = Math.toRadians(135);
  const pitch = 0;
  const roll = 0;
  const hpr = new HeadingPitchRoll(heading, pitch, roll);
  const orientation = Transforms.headingPitchRollQuaternion(position, hpr);

  viewer.entities.add({
    name: "サンプル3Dモデル",
    position: position,
    orientation: orientation,
    model: {
      uri: "https://assets.com/models/CesiumAir/Cesium_Air.glb",
      minimumPixelSize: 128,
      maximumScale: 20000,
    },
  });

  // カメラを3Dモデルに向ける
  viewer.trackedEntity = viewer.entities.values[0];
}

// 起動
threeDCesium();
```

同様に実行して表示すると、3D で表示されます。

![](/assets/posts/startCesiumJS/threeDCesiumJS.png)

## ハンズオン 4: インタラクティブ機能の追加

画面へのクリック動作で、先ほどのマーカーを打ち込めるようにしてみます。

main.ts を以下のように変えてみてください。

```typescript
import {
  Viewer,
  Ion,
  Math,
  ScreenSpaceEventHandler,
  defined,
  Cartographic,
  Color,
  Cartesian2,
  ScreenSpaceEventType,
} from "cesium";

// import.meta.env で読み取る
const token = import.meta.env.VITE_CESIUM_ION_ACCESS_TOKEN;
if (!token) {
  throw new Error("VITE_CESIUM_ION_ACCESS_TOKEN is not defined");
}

async function interactiveCesium() {
  // 1. トークン＆ベースURL
  Ion.defaultAccessToken = token || "";
  (window as any).CESIUM_BASE_URL = "./cesium";

  const viewer = new Viewer("cesiumContainer");

  // クリックイベントハンドラー
  viewer.cesiumWidget.screenSpaceEventHandler.setInputAction(
    (event: ScreenSpaceEventHandler.PositionedEvent) => {
      const pickedObject = viewer.scene.pick(event.position);

      if (defined(pickedObject)) {
        console.log("オブジェクトがクリックされました:", pickedObject.id);
      } else {
        // 地面がクリックされた場合、その位置にマーカーを追加
        const cartesian = viewer.camera.pickEllipsoid(
          event.position,
          viewer.scene.globe.ellipsoid
        );
        if (cartesian) {
          const cartographic = Cartographic.fromCartesian(cartesian);
          const longitude = Math.toDegrees(cartographic.longitude);
          const latitude = Math.toDegrees(cartographic.latitude);

          viewer.entities.add({
            position: cartesian,
            point: {
              pixelSize: 10,
              color: Color.YELLOW,
              outlineColor: Color.BLACK,
              outlineWidth: 2,
            },
            label: {
              text: `${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°`,
              font: "12pt monospace",
              pixelOffset: new Cartesian2(0, -40),
            },
          });
        }
      }
    },
    ScreenSpaceEventType.LEFT_CLICK
  );

  // マウスオーバーイベント
  viewer.cesiumWidget.screenSpaceEventHandler.setInputAction(
    (event: ScreenSpaceEventHandler.MotionEvent) => {
      const pickedObject = viewer.scene.pick(event.endPosition);

      if (defined(pickedObject)) {
        document.body.style.cursor = "pointer";
      } else {
        document.body.style.cursor = "default";
      }
    },
    ScreenSpaceEventType.MOUSE_MOVE
  );
}

// 起動
interactiveCesium();
```

同様に実行すると、以下のように地球儀をクリックするとマーカーを打ち込めます。

![](/assets/posts/startCesiumJS/interactiveCesiumJS.gif)

---

今回は CesiumJS を使い、本格的な 3D 地球儀アプリケーションを操作する例を４つ出してみました。

これ以外にもまだ機能は満載なので、もう少し試してみたいですね。

---

[^1]: [CesiumJS（公式ページ）](https://cesium.com/platform/cesiumjs/)
[^2]: [Cesium ion](<[https://ion.cesium.com/](https://ion.cesium.com/signin)>)
