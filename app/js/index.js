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

function initView (youtubeId) {
  document.getElementById('songWork').style.animation = 'fadeSongWorkAnime 1s';
  document.getElementById('nowPlaySongImg').src = getThumbnail(youtubeId);
}

document.getElementById('playButton').addEventListener('click', function() {
  const youtubeId = document.getElementById('inputYoutubeId').value;
  if (!playList.length) {
    setAudio(youtubeId);
    playAudio.play();
    initView(youtubeId);
  }
})