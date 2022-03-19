# YouTube Speaker(仮)

## distフォルダの生成
```bash
$ docker-compose up vue -d

$ docker-compose exec app yarn dev-build
```

## サーバ構築
```bash
$ docker-compose up app
```

localhost:8080 -> webサーバ(nginx)

localhost:3000 -> APIサーバ(node.js)
