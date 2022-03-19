const http = require('http');
const ytdl = require('ytdl-core');
const mysql = require('mysql');

const getUrlParametrs = (url) => {
  const urlParams = url.split('/');
  urlParams.shift(); // /ex の時、['', 'ex']となるので先頭の空文字を削除
  urlParams[urlParams.length - 1] = urlParams[urlParams.length - 1].split('?')[0]; // ?以降を削除

  // urlの中に?があれば
  let params = {};
  if (url.includes('?')) {
    const queryParam = url.split('?')[1];
    const queryParams = queryParam.split('&');
    queryParams.forEach((param) => {
      const [key, value] = param.split('=');
      params[key] = value;
    });
  } else {
    params = {};
  }
  return { urlParams: urlParams, queryParams: params };
}

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');
  paramsArray = getUrlParametrs(req.url);
  youtubeId = paramsArray.urlParams[1];
  const path = `https://www.youtube.com/watch?v=${youtubeId}`;
  if (req.url && paramsArray.urlParams[0] === 'get') { /// youtubeの情報をゲットするuri
    if (paramsArray.urlParams[2] === 'audio') { // audioを取得するuri
      res.setHeader('Content-Type', 'audio/mpeg');
      const audio = ytdl(path, {
        filter: 'audioonly',
        quality: 'highestaudio',
        format: 'mp3',
      });
      audio.pipe(res);
    } else if (paramsArray.urlParams[2] === 'info') {
      ytdl.getInfo(path).then((info) => {
        res.setHeader('Content-Type', 'application/json');
        const resData = {
          title: info.player_response.videoDetails.title,
          author: info.player_response.videoDetails.author
        };
        res.end(JSON.stringify(resData));
      });
    }
  } else if (req.url && paramsArray.urlParams[0] === 'sql') {
    const connection = mysql.createConnection({
     host: 'db',
     user: 'root',
     password: 'root',
     database: 'yt_song'
    });
    connection.connect((err) => {
      if (err) {
       res.end('error connecting: ' + err.stack);
       return;
      }
    });
  }
});

server.listen(3030, () => {
  console.log('Server is running');
});