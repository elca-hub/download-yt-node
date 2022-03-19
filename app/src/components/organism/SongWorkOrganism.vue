<template>
  <div class="song-work-organism">
    <sub-content-header-molecule>
      Now Play<i class="bi bi-play" />
    </sub-content-header-molecule>
    <transition name="song-work-fade">
      <div class="song-work" v-if="isFade">
        <div class="now-play-song-box">
          <div class="now-play-song">
            <div class="now-play-song-image">
              <img :src="thumbnailSrc" />
              <div
                class="now-play-song-time-bar"
                :style="songTimeBarStleObj"
              >
              </div>
            </div>
            <div class="now-play-song-info">
              <p class="now-play-song-title" v-if="getNowPlayingSongInfoObj.title.length">{{ getNowPlayingSongInfoObj.title }}</p>
              <p class="now-play-song-author" v-if="getNowPlayingSongInfoObj.author.length">{{ getNowPlayingSongInfoObj.author }}</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import  SubContentHeaderMolecule  from "@/components/molecule/SubContentHeaderMolecule.vue";

@Component({
  components: {
    SubContentHeaderMolecule
  }
})
export default class SongWorkOrganism extends Vue {
  beforeId = '';
  isFade = false;
  songTimeBarStleObj = {
    width: '0',
    transition: 'none'
  }

  @Watch('$store.getters.getNowPlayingVideoItem')
  public fadeAnimation () {
    const nowPlayingSongItem = this.$store.getters.getNowPlayingVideoItem;
    if (nowPlayingSongItem === null) {
      this.isFade = false
    } else if (nowPlayingSongItem.id === this.$store.state.videoId || this.beforeId !== nowPlayingSongItem.id) {
      this.isFade = false
      if (nowPlayingSongItem !== null) {
        this.$store.state.audioObj.addEventListener('loadeddata', () => {
          if (this.$store.state.videoList.length !== 0) this.isFade = true;
        });
      }
    }
    if (nowPlayingSongItem !== null) this.beforeId = nowPlayingSongItem.id;
  }

  @Watch('$store.state.audioNowTime')
  public updateSongTimeBar () {
    const audioObj = this.$store.state.audioObj;
    const audioDuration = audioObj.duration;
    const audioNowTime = audioObj.currentTime;
    const audioTimeBarWidth = (audioNowTime / audioDuration) * 100;
    this.songTimeBarStleObj = {
      width: `${audioTimeBarWidth}%`,
      transition: 'width .5s linear'
    }
  }

  get thumbnailSrc () {
    const nowPlayingSongItem = this.$store.getters.getNowPlayingVideoItem;
    if (nowPlayingSongItem === null) return '#';
    else return nowPlayingSongItem.thumbnailUrl;
  }
  get getNowPlayingSongInfoObj () {
    const nowPlayingSongItem = this.$store.getters.getNowPlayingVideoItem;
    if (nowPlayingSongItem === null) return {title: '', author: ''};
    else return nowPlayingSongItem;
  }
}
</script>

<style lang="scss" scoped>
.song-work-fade-enter-active, .song-work-fade-leave-active {
  transition: all .5s;
}
.song-work-fade-enter, .song-work-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(-100%);
}

.song-work {
  div {
    .now-play-song {
      width: 100%;
      .now-play-song-image {
        position: relative;
        img {
          border: solid 1px #ddd;
          border-radius: 5px;
          width: 100%;
          object-fit: cover;
        }
        .now-play-song-time-bar {
          position: absolute;
          border-radius: 5px;
          bottom: 5px;
          left: 0;
          height: 5px;
          background-color: #c4302b;
        }
      }
      .now-play-song-info {
        .now-play-song-title {
          font-size: 1.4rem;
          color: #333;
          margin: 0;
        }
        .now-play-song-author {
          margin: 0;
          font-size: 1.1rem;
          color: #555;
        }
      }
    }
  }
}
</style>
