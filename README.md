# YouTube Speaker

## What's YouTube Speacker?
このアプリはYouTube上の動画をmp3再生するwebアプリケーションです。

音楽などを広告なしでバックグラウンド再生したい際に便利です！

## 使い方

```bash
# githubの「code」>「HTTPS」のURLからclone
git clone https://github.com/m0k1moki/download-yt-node.git
# フォルダへ移動
cd download-yt-node
# コンテナ起動
docker-compose up app
# 権限付与
chmod 0775 ./init-mysql.sh
# mysqlの初期化
./init-mysql.sh
```

## URLについて

| URL | 内容 |
| :---: | :---: |
| 8080 | webサーバ |
| 3306 | mysql |
| 3000 | APIサーバ |
| 5050 | phpmyadmin |

## phpmyadminの起動
```bash
docker-compose up phpmyadmin
```

## 解説
### docker
**コンテナ**という単位でアプリケーションを制御。主にサーバ構築に使用

### docker-compose
dockerの亜種。こいつがないと生きていけない。コンテナを同時に起動することができる。

`docker-compose build`でイメージの作成、`dokcer-compose up`で起動

### node.js
サーバサイド版JavaScript。今回はAPIとして活躍

### express
APIの基本的な使い方として、`localhost:3000/sql/songs`のように**URLで指定**するものがある。この際、`localhost:3000/sql/insert`とか、色々分かれるので、それに合わせて処理を変えることを**ルーティング**という。タブン。

そのルーティングを簡単に行うためのフレームワーク。多分。

### mysql
DBMSの一種。実は「my」は、共同設立者の娘の名前から引っ張ったとか。よくPostgreSqlと競い合っている

### phpmyadmin
mysqlは通常web上でのGUIが構築されておらず、コード上で命令をすることが多い。そこで、DBのデータ可視化等を図るためにphpmyadminが登場というわけ

### Vue.js
**SPA**という、「URLは複数あるんだけど見かけ上は一つのページに見せる」という技術をめちゃくちゃ簡単に作れるフレームワーク(早い話、とどまりを見てもらえるとわかる。ログイン画面とトップ画面とでURLが違うのに気づくだろう)。また、コンポーネント化により、パーツの再利用や細分化が行える。これにより、可読性や保守性も高まる

### typescript
vue.jsに用いているAltJS(コンパイルしてjavascriptのコードにする言語)。正直javascriptより書き方に癖があって嫌なのだが、インタフェースが使えたりデータ型が使えたりするのは強みなので我慢してる

## 課題点
- サーバサイドはjavascript、フロントサイドはtypescriptと言語が統一されていない
- サーバサイド、フロントサイドのパッケージ管理ツールも統一されていない
- 結構ゴリ押しで作ってる部分とかもあったりする