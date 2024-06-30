---
title: "Observerパターン"
excerpt: ""
coverImage: ""
date: "2024-06-15T23:32:11.000Z"
updatedAt: "2024-06-15T23:32:11.000Z"
tag: []
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
ogImage:
  url: ""
---

Observer（観察者）パターンは、ソフトウェアデザインパターンの一つで、オブジェクト間の一対多の依存関係を定義する。
このパターンでは、あるオブジェクト（Subject）の状態が変化した場合に、そのオブジェクトに依存する複数のオブジェクト（Observers）に自動的に通知が送られる。
これにより、Subject と Observers 間の結合度が低くなり、柔軟性と拡張性が向上する。

# **主な要素**

1. **Subject（被験者）**: 状態の変化を監視するオブジェクト。Subject は、状態が変化したときに登録されている Observers に通知を送る。
2. **Observer（観察者）**: Subject の状態の変化を監視し、通知を受け取るオブジェクト。Observer は、Subject からの通知を受け取る update メソッドを実装する。

# **Observer パターンの実装例**

以下は、Java 言語を使用した Observer パターンの実装例である。例として、天気情報を表示するクライアントと、天気情報を提供する Subject を考えよう。

```java
javaCopy code
import java.util.ArrayList;
import java.util.List;

// Subject インターフェース
interface Subject {
    void registerObserver(Observer observer);
    void removeObserver(Observer observer);
    void notifyObservers();
}

// ConcreteSubject クラス
class WeatherStation implements Subject {
    private int temperature;
    private List<Observer> observers;

    public WeatherStation() {
        this.observers = new ArrayList<>();
    }

    public void setTemperature(int temperature) {
        this.temperature = temperature;
        notifyObservers();
    }

    @Override
    public void registerObserver(Observer observer) {
        observers.add(observer);
    }

    @Override
    public void removeObserver(Observer observer) {
        observers.remove(observer);
    }

    @Override
    public void notifyObservers() {
        for (Observer observer : observers) {
            observer.update(temperature);
        }
    }
}

// Observer インターフェース
interface Observer {
    void update(int temperature);
}

// ConcreteObserver クラス
class WeatherDisplay implements Observer {
    @Override
    public void update(int temperature) {
        System.out.println("Current temperature: " + temperature);
    }
}

// クライアント
public class Client {
    public static void main(String[] args) {
        WeatherStation weatherStation = new WeatherStation();
        WeatherDisplay weatherDisplay = new WeatherDisplay();

        // Observerを登録
        weatherStation.registerObserver(weatherDisplay);

        // 天気情報が更新された際にObserverに通知
        weatherStation.setTemperature(25);
        weatherStation.setTemperature(30);

        // Observerの登録解除
        weatherStation.removeObserver(weatherDisplay);

        // 天気情報が更新されてもObserverに通知されない
        weatherStation.setTemperature(20);
    }
}

```

# **利用例**

Observer パターンは、以下のような場面で利用される：

1. **オブジェクト間の疎結合を実現したい場合**: Subject と Observer 間の結合度を低くし、Subject と Observer 間の相互作用を簡素化したい場合に、Observer パターンを使用する。
2. **オブジェクトの状態変化に対するリアクションを実装したい場合**: オブジェクトの状態変化に対するリアクションを複数のオブジェクトで共有し、その変化を監視したい場合、Observer パターンを使用する。
3. **イベントドリブンなプログラムを実装したい場合**: イベントドリブンなプログラムでは、あるオブジェクトの状態変化に応じて他のオブジェクトがリアクションを起こす必要がある。Observer パターンは、このようなシナリオに適している。

Observer パターンは、特にオブジェクト間の疎結合を実現し、柔軟性と拡張性を向上させたい場合に有用である。それにより、オブジェクト間の依存関係が低減し、コードの保守性が向上する。
