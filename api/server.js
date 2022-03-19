const http = require('http');
const ytdl = require('ytdl-core');
const sql = require('./modules/sql/sql');

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

const server = http.createServer(async (req, res) => {
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
    } else if (paramsArray.urlParams[2] === 'info') { // 曲の情報を取得するuri
      ytdl.getInfo(path).then((info) => {
        res.setHeader('Content-Type', 'application/json');
        const resData = {
          title: info.player_response.videoDetails.title,
          author: info.player_response.videoDetails.author
        };
        res.end(JSON.stringify(resData));
      });
    }
  } else if (req.url && paramsArray.urlParams[0] === 'sql') { // sql関係を実行するuri
    const db = new sql.Sql();
    db.connect();
    if (paramsArray.urlParams[1] === 'insert') {
      const mock = {
        youtubeId: 'korehatestu',
        title: 'test',
        author: 'mockmock',
        listId: -1
      };
      await db.insertSongData(mock.youtubeId, mock.listId, mock.title, mock.author);
      res.end('inserted');
    }
  }
});

server.listen(3030, () => {
  console.log('Server is running');
});