let playAudio = new Audio();
let playList = [];
let isPlaying = false;
let nowPlaySongIndex = -1;

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
  if (nowPlaySongIndex !== -1) {
    document.getElementById('nowPlaySongBox').classList.remove('now-play-song-box-fade');
    await new Promise((resolve) => { setTimeout(resolve, 1 * 1000); });
  }
  document.getElementById('nowPlaySongImg').src = getThumbnail(youtubeId);
  document.getElementById('nowPlaySongBox').classList.add('now-play-song-box-fade');
}

async function setSongInfo (youtubeId) {
  const resData = await getSongInfo(youtubeId);
  document.getElementById('nowPlaySongTitle').innerText = resData.title;
  document.getElementById('nowPlaySongAuthor').innerText = resData.author;
  playList.push({
    id: youtubeId,
    title: resData.title,
    author: resData.author
  });
}

function playSong () {
  isPlaying = true;
  nowPlaySongIndex++;
  const youtubeId = playList[nowPlaySongIndex].id;
  initView(youtubeId);
  setAudio(youtubeId);
  playAudio.play();
}

document.getElementById('playButton').addEventListener('click', function() {
  const youtubeId = document.getElementById('inputYoutubeId').value;
  setSongInfo(youtubeId).then(() => {
    if (!isPlaying) playSong();
  });
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

document.getElementById('nextSongText').addEventListener('click', () => {
  if (nowPlaySongIndex < playList.length - 1) {
    playAudio.pause();
    playAudio.currentTime = 0;
    playSong();
  }
})

playAudio.onended = () => {
  isPlaying = false;
  playAudio.currentTime = 0;
}