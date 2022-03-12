let playAudio = new Audio();
let playList = [];
let isPlaying = false;

let viewPlayTime = null;

function makeReqPath (videoId) {
  return `http://localhost:3000/get/${videoId}`;
}

function setAudio (videoId) {
  reqPath = `${makeReqPath(videoId)}/audio`;
  playAudio = new Audio(reqPath);
  viewPlayTime = setInterval(() => {
    document.getElementById('songTime').innerText = playAudio.currentTime;
  }, 500);
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

async function initView (youtubeId) {
  document.getElementById('nowPlaySongBox').style.animation = 'fadeSongWorkAnime 1s';
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
    isPlaying = true;
    setSongInfo(youtubeId).then(() => {
      initView(youtubeId);
    });
  }
})

document.getElementById('songPlay').addEventListener('click', () => {
  isPlaying = !isPlaying;
  if (playAudio.src === '') {
    isPlaying = false;
  }
  if (isPlaying) {
    playAudio.play();
    viewPlayTime = setInterval(() => {
      document.getElementById('songTime').innerText = playAudio.currentTime;
    }, 500);
  } else if (!isPlaying && playAudio.src !== '') {
    playAudio.pause();
    clearInterval(viewPlayTime);
  }
})