<template>
  <transition name="song-work-fade">
    <div class="song-work" v-if="isFade">
      <div class="now-play-song-box">
        <now-playing-header-molecule />
        <div class="now-play-song">
          <div class="now-play-song-image">
            <img :src="thumbnailSrc" />
          </div>
          <div class="now-play-song-info">
            <p class="now-play-song-title" v-if="getNowPlayingSongInfoObj.title.length">{{ getNowPlayingSongInfoObj.title }}</p>
            <p class="now-play-song-author" v-if="getNowPlayingSongInfoObj.author.length">{{ getNowPlayingSongInfoObj.author }}</p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import YoutubeApiService from "@/services/YoutubeApiService";
import  NowPlayingHeaderMolecule  from "@/components/molecule/NowPlayingHeaderMolecule.vue";

@Component({
  components: {
    NowPlayingHeaderMolecule
  }
})
export default class SongWorkOrganism extends Vue {
  beforeId = '';
  isFade = false;

  @Watch('$store.getters.getNowPlayingVideoItem')
  public fadeAnimation () {
    const nowPlayingSongItem = this.$store.getters.getNowPlayingVideoItem;
    if (nowPlayingSongItem.id === this.$store.state.videoId) {
    this.isFade = false;
      setTimeout(() => {
        this.isFade = true;
      }, 250);
    }
    this.beforeId = nowPlayingSongItem.id;
  }

  get thumbnailSrc () {
    const nowPlayingSongItem = this.$store.getters.getNowPlayingVideoItem;
    if (nowPlayingSongItem === null) return '#';
    else return YoutubeApiService.getThumbnailUrl(nowPlayingSongItem.id);
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
        img {
          border: solid 1px #ddd;
          border-radius: 5px;
          object-fit: cover;
          width: 100%;
        }
      }
      .now-play-song-info {
        .now-play-song-title {
          font-size: 1.2rem;
          color: #333;
          margin: 0;
        }
        .now-play-song-author {
          margin: 0;
          font-size: 1rem;
          color: #555;
        }
      }
    }
  }
}
</style>
