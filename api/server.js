const http = require('http');
const youtubeUrl = '';
const ytdl = require('ytdl-core');
const fs = require('fs');

const getUrlParametrs = (url) => {
  const urlParams = url.split('/');
  urlParams.shift() // /ex の時、['', 'ex']となるので先頭の空文字を削除

  const queryParam = url.split('?')[1];
  const queryParams = queryParam.split('&');
  const params = {};
  queryParams.forEach((param) => {
    const [key, value] = param.split('=');
    params[key] = value;
  });
  return { urlParams: urlParams, queryParams: params };
}

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');
  paramsArray = getUrlParametrs(req.url);
  if (req.url && paramsArray.urlParams[0] === 'download') { // セット用のAPIが呼ばれたら
    youtubeId = paramsArray.urlParams[1];
    const path = `https://www.youtube.com/watch?v=${youtubeId}`;
    if (paramsArray.queryParams.type === 'audio') {
      res.setHeader('Content-Type', 'audio/mpeg');
      const oudio = ytdl(path, {
        filter: 'audioonly'
      });
      oudio.pipe(res);
    } else if (paramsArray.queryParams.type === 'video') {
      res.setHeader('Content-Type', 'video/mp4');
      const video = ytdl(path, {
        filter: 'audioandvideo'
      });
      video.pipe(res);
    }
  }
});

server.listen(3030, () => {
  console.log('Server is running');
});