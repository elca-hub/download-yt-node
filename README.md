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