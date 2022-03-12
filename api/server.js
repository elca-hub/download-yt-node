const http = require('http');
const youtubeUrl = '';
const ytdl = require('ytdl-core');
const fs = require('fs');

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
  console.log(paramsArray);
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
    }
  }
});

server.listen(3030, () => {
  console.log('Server is running');
});