let playAudio = new Audio();
let playList = [];

function makeReqPath (videoId) {
  return `http://localhost:3000/get/${videoId}`;
}

function setAudio (videoId) {
  reqPath = `${makeReqPath(videoId)}/audio`;
  playAudio = new Audio(reqPath);
}

function getThumbnail (videoId) {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

async function getSongInfo (videoId) {
  reqPath = `${makeReqPath(videoId)}/info`;
  const res = await fetch(reqPath);
  const resData = await res.json();
  return resData;
}

function initView (youtubeId) {
  document.getElementById('songWork').style.animation = 'fadeSongWorkAnime 1s';
  document.getElementById('nowPlaySongImg').src = getThumbnail(youtubeId);
}

async function setSongInfo (youtubeId) {
  const resData = await getSongInfo(youtubeId);
  document.getElementById('nowPlaySongTitle').innerText = resData.title;
  document.getElementById('nowPlaySongAuthor').innerText = resData.author;
}

document.getElementById('playButton').addEventListener('click', function() {
  const youtubeId = document.getElementById('inputYoutubeId').value;
  if (!playList.length) {
    setAudio(youtubeId);
    playAudio.play();
    setSongInfo(youtubeId).then(() => {
      initView(youtubeId);
    });
  }
})