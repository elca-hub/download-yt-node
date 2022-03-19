# YouTube Speaker(仮)

## 起動
```bash
$ docker-compose up app
```
[localhost:8080](http://localhost:8080)へアクセス

## 起動(vueをインストしている人)
vueがある人はbuildせずに、appフォルダ内へ移動し`yarn build`をして、`docker-compose up test`をすることで、nginxで起動することができる