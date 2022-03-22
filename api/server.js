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

app.get('/song/:youtubeId/audio', (req, res) => {
  const youtubeId = req.params.youtubeId;
  const urlPath = `https://www.youtube.com/watch?v=${youtubeId}`;
  res.setHeader('Content-Type', 'audio/mpeg');
  const audio = ytdl(urlPath, {
    filter: 'audioonly',
    quality: 'highestaudio',
    format: 'mp3',
  });
  audio.pipe(res);
})

app.get('/song/:youtubeId/info', (req, res) => {
  const youtubeId = req.params.youtubeId;
  const urlPath = `https://www.youtube.com/watch?v=${youtubeId}`;
  ytdl.getInfo(urlPath).then((info) => {
    const choiceThumbnail = info.player_response.videoDetails.thumbnail.thumbnails[info.player_response.videoDetails.thumbnail.thumbnails.length - 1];
    res.setHeader('Content-Type', 'application/json');
    const resData = {
      title: info.player_response.videoDetails.title,
      author: info.player_response.videoDetails.author,
      thumbnailUrl: choiceThumbnail.url
    };
    res.send(JSON.stringify(resData));
  });
})

app.get('/sql/songs/:listId', async (req, res) => {
  const listId = req.params.listId;
  const db = new sql.Sql();
  db.connect();
  const result = await db.getSongsData(listId);
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

app.post('/sql/insert', async (req, res) => {
  const postData = req.body;
  const db = new sql.Sql();
  db.connect();
  await db.insertSongData(postData.youtubeId, postData.listId, postData.title, postData.author, postData.thumbnailUrl);
  db.end();
  res.send('success');
})

app.delete('/sql/delete/:youtubeId', async (req, res) => {
  const youtubeId = req.params.youtubeId;
  const db = new sql.Sql();
  db.connect();
  await db.deleteSongData(youtubeId);
  db.end();
  res.send('success');
})

app.get('/sql/songlists', async (req, res) => {
  const db = new sql.Sql();
  db.connect();
  const result = await db.getSongLists();
  db.end();
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

app.post('/sql/songlist/insert', async (req, res) => {
  const db = new sql.Sql();
  db.connect();
  const postData = req.body;
  await db.insertSongList(postData.name);
  const newId = await db.getMaxSongListId();
  db.end();
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ id: newId }));
})

app.delete('/sql/songlist/delete/:listId', async (req, res) => {
  const listId = req.params.listId;
  if (listId === '-1') {
    console.error('listId is -1');
    res.send('error');
  } else {
    const db = new sql.Sql();
    db.connect();
    await db.deleteSongList(listId);
    db.end();
    res.send('success');
  }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))