const ytdl = require('ytdl-core');
const sql = require('./modules/sql/sql');
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');

const port = 3030;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const changeToCamelCase = (str) => {
  return str.replace(/[-_]([a-z])/g, (g) => {
    return g[1].toUpperCase();
  });
}

app.get('/api/song/:youtubeId/audio', function (req, res) {
  const youtubeId = req.params.youtubeId;
  const path = `https://www.youtube.com/watch?v=${youtubeId}`;
  res.setHeader('Content-Type', 'audio/mpeg');
  const audio = ytdl(path, {
    filter: 'audioonly',
    quality: 'highestaudio',
    format: 'mp3',
  });
  audio.pipe(res);
})

app.get('/api/song/:youtubeId/info', function (req, res) {
  const youtubeId = req.params.youtubeId;
  const path = `https://www.youtube.com/watch?v=${youtubeId}`;
  ytdl.getInfo(path).then((info) => {
    res.setHeader('Content-Type', 'application/json');
    const resData = {
      title: info.player_response.videoDetails.title,
      author: info.player_response.videoDetails.author
    };
    res.send(JSON.stringify(resData));
  });
})

app.get('/api/sql/songs', async function (req, res) {
  const db = new sql.Sql();
  db.connect();
  const result = await db.getSongsData();
  db.end();
  // resultの命名をcamelCaseに変換する
  const resData = result.map((item) => {
    const resItem = {};
    Object.keys(item).forEach((key) => {
      resItem[changeToCamelCase(key)] = item[key];
    });
    return resItem;
  });
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(resData));
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))