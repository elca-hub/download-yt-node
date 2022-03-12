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
  document.getElementById('nowPlaySongTitle').innerText = playList[nowPlaySongIndex].title;
  document.getElementById('nowPlaySongAuthor').innerText = playList[nowPlaySongIndex].author;
  document.getElementById('nowPlaySongBox').classList.add('now-play-song-box-fade');
}

async function setSongInfo (youtubeId) {
  const resData = await getSongInfo(youtubeId);
  const item = {
    id: youtubeId,
    title: resData.title,
    author: resData.author
  };
  playList.push(item);
  appendSongListDom(item);
}

function playSong (type = 'after') {
  isPlaying = true;
  if (type === 'after') nowPlaySongIndex++;
  else if (type === 'before') nowPlaySongIndex--;
  const youtubeId = playList[nowPlaySongIndex].id;
  initView(youtubeId);
  setAudio(youtubeId);
  playAudio.play();
  moveNowSongList();
}

function moveNowSongList () {
  for (let i = 0; i < playList.length; i++) {
    if (playList[i].id === playList[nowPlaySongIndex].id) {
      document.getElementById(`songListItem-${playList[nowPlaySongIndex].id}`).classList.add('song-list-item-active');
    } else {
      if (document.getElementById(`songListItem-${playList[i].id}`).classList.contains('song-list-item-active')) {
        document.getElementById(`songListItem-${playList[i].id}`).classList.remove('song-list-item-active');
      }
    }
  }
}

function appendSongListDom (item) {
  const songListItem = document.createElement('div');
  songListItem.classList.add('song-list-item');
  songListItem.id = `songListItem-${item.id}`;
  songListItem.innerHTML = `
    <div class="song-list-item-box">
      <h3>${item.title}</h3>
      <h4>${item.author}</h4>
    </div>
  `;
  songListItem.addEventListener('click', () => {
    nowPlaySongIndex = playList.findIndex((playItem) => {
      return playItem.id ===  item.id;
    })
    playAudio.pause();
    playAudio.currentTime = 0;
    playSong('no-action');
  })
  document.getElementById('songList').appendChild(songListItem);
  setTimeout(() => {
    document.getElementById(`songListItem-${item.id}`).classList.add('song-list-item-fade');
  }, 500);
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

document.getElementById('BeforeSongText').addEventListener('click', () => {
  if (nowPlaySongIndex > 0) {
    playAudio.pause();
    playAudio.currentTime = 0;
    playSong('before');
  }
})

playAudio.onended = () => {
  isPlaying = false;
  playAudio.currentTime = 0;
}