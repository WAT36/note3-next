---
title: "ファイル読み込み"
date: "2019-10-31T00:37:30+09:00"
excerpt: "ファイル読み込みについて"
tag: ["Java", "Python"]
programming: ["Java", "Python"]
updatedAt: "2019-10-31T00:37:30+09:00"
author:
  name: Tatsuroh Wakasugi
  picture: "/assets/blog/authors/WAT.jpg"
mode: programming
---

ファイルを読み込む方法についてを示す。

<div class="note_content_by_programming_language" id="note_content_Java">

Java ではプロパティファイル(.properties で終わるファイル)に関しては専用のライブラリがありそれを利用して読み込むが、ここではテキストファイルなど一般的なファイルに対する読み込み方法についてを示す。

Java でファイルを読み込むには以下の 2 つの方法がある。

- java.io.**FileInputStream**クラスを利用する
- java.io.**FileReader**クラスを利用する

それぞれについて示す。

## FileInputStream クラス

FileInputStream クラスはファイルから byte 単位で読み込みを行うストリームである。  
ストリームとはデータの送受信を連続的に行うプログラムのことで、データを読み込む時のストリームは入力ストリームという。  
このクラスは宣言時(コンストラクタ)に String 型でファイルのパスまたは File 型のオブジェクトを入力する。File クラスは宣言時(コンストラクタ)にファイルのパス(相対パス)を文字列型で入力してできるオブジェクトである。これにより、このファイルからの入力ストリームが得られる。

`FileInputStream(String name) throws FileNotFoundException`

`FileInputStream(File file) throws FileNotFoundException`

作成した入力ストリームからバイトデータを読み込むメソッドとして、**read()**というメソッドがある。

`int read() throws IOException`

このメソッドは入力ストリームからバイトデータを読み込み、ファイルの終わりに達すると-1 を返すメソッドである。
FileInputStream クラスではこのメソッドを利用してファイルを読み込む。

また、読み込みが終わったら入力ストリームを閉じる**close()**メソッドを忘れずに行う。

FileInputStream の java 実装例を示す。

```java
import java.io.FileInputStream;
import java.io.File;
import java.io.IOException;

class Main{
  public static void main(String args[]){
    FileInputStream fis = null;
    try{
      fis = new FileInputStream(new File("test.txt"));
      int data = 0;
      while((data = fis.read()) != -1){
        //ファイルから読み込んだバイトデータを表示
        System.out.println(data);
      }
    }catch (IOException e){
      System.err.println("IO Error");
    }finally{
      try{
        fis.close();
      }catch(IOException e){
      }
    }
  }
}
```

実行例は以下の通り。

```
$ ls
test.txt    Main.java
$ cat test.txt
aaa
bbb
ccc
ddd
$ javac Main.java
$ java Main
97
97
97
10
98
98
98
10
99
99
99
10
100
100
100
10
101
101
101
```

## FileReader クラス

FileReader クラスはファイルから char 単位で読み込みを行う入力ストリームである。  
このクラスも FileInputStream クラスと同様に、宣言時(コンストラクタ)に String 型でファイルパスまたは File 型のオブジェクトを入力する。これにより、このファイルからの入力ストリームが得られる。

`FileReader(File file) throws FileNotFoundException`

`FileReader(String name) throws FileNotFoundException`

作成した入力ストリームからバイトデータを読み込むメソッドとして、こちらも**read()**というメソッドがある。

`int read() throws IOException`

このメソッドは入力ストリームから１文字を読み込み、ファイルの終わりに達すると-1 を返すメソッドである。  
返すデータは int 型だが、このデータは Unicode(16bit データ)に対応しており、char 型に変換すれば対応する文字になって表示してくれる。  
FileReader クラスではこのメソッドを利用してファイルを読み込む。

また、読み込みが終わったらこちらも入力ストリームを閉じる**close()**メソッドを忘れずに行う。

FileReader の java 実装例を示す。

```java
import java.io.FileReader;
import java.io.File;
import java.io.IOException;

class Main{
  public static void main(String args[]){
    FileReader fr = null;
    try{
      fr = new FileReader(new File("test.txt"));
      int data = 0;
      while((data = fr.read()) != -1){
        //読み込んだデータをchar型で表示する
        System.out.print((char)data);
      }
    }catch (IOException e){
      System.err.println("IO Error");
    }finally{
      try{
        fr.close();
      }catch(IOException e){
      }
    }
  }
}
```

実行例は以下の通り。

```
$ ls
test.txt    Main.java
$ cat test.txt
aaa
bbb
ccc
ddd
$ javac Main.java
$ java Main
aaa
bbb
ccc
ddd
```

</div>
<div class="note_content_by_programming_language" id="note_content_Python">

Python では組み込み関数**open()**を利用してファイルを開き、読み込む。

`open(ファイル名,モード)`

モードとは読み込んだファイルに対する権限であり、読み込み専用なら **'r'** 、書き出し専用なら **'w'**、読み書き両方なら **'r+'** というように設定する。  
open 関数で開いたファイルは、ファイルオブジェクトとして返される。

読み込んだファイルの中身を表示したい場合はファイルオブジェクトの関数**read()**を利用する。

`read(サイズ)`

引数にはサイズを入力し、実行するとそのサイズ分を読み込んで返してくれる。サイズを省略した場合はファイルの中身を全て読み込んで返す。  
また、似たような関数として**readline()**という関数もあり、これはファイルオブジェクトから 1 行読み込んだ内容を返す。

また、open で開いたファイルでの作業が終わったら、最後にファイルオブジェクトの関数**close()**を利用してファイルをクローズする。これによりオープンしたファイルが占めていたシステムリソースを全て開放する。

一連の操作についてここまで述べたが、実はこれらの動作を行う際は**with**文を使うのが非常に便利である。  
その利点は、with 文から抜けるときに自動的にファイルクローズを実行してくれるからであり（途中に例外が発生しても行われる）、同様の処理を try-except 文で実装するよりも簡略化できる。  
使用法は以下の通り。

```python
with open('ファイル名','モード') as f:
    data = f.read()
```

実行例を以下に示す。

```python
$ ls
test.txt

$ cat test.txt
aaa
bbb
ccc
ddd

$ python
>>>
>>> f = open('test.txt','r')
>>> f
<_io.TextIOWrapper name='test.txt' mode='r' encoding='cp932'>
>>>
>>> #ファイルから1行読み込んで返す
>>> f.readline()
'aaa\n'
>>>
>>> #(前回の終了箇所から)4バイト読み込んで返す
>>> f.read(4)
'bbb\n'
>>>
>>> f.read(2)
'cc'
>>>
>>> #(前回の終了箇所から)全て読み込んで返す
>>> f.read()
'c\nddd\n'
>>>
>>> #ファイルをクローズする
>>> f.close()
>>>
>>>
>>>
>>> #with文を使ってファイルを読み込む
>>> with open('test.txt','r') as f:
...     print(f.read())
...
aaa
bbb
ccc
ddd
>>> #fがクローズされているか確認
>>> f.closed
True
>>>
```

</div>
