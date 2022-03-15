<template>
  <div class="song-list-item-molecule" @click="changePlaySong(item.id)" :class="{'active': isPlaying}">
    <h2>{{ item.title }}</h2>
    <p>{{ item.author }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import IYoutubeData from '@/interfaces/IYoutubeData';

@Component
export default class SongListItemMolecule extends Vue {
  @Prop()
  public item!: IYoutubeData;
  
  public changePlaySong (id: string) {
    this.$store.dispatch('setAudioObj', id);
  }

  get isPlaying () {
    const nowPlayingSongItem = this.$store.getters.getNowPlayingVideoItem;
    if (nowPlayingSongItem !== null) {
      return nowPlayingSongItem.id === this.item.id;
    } else {
      return false;
    }
  }
}
</script>

<style lang="scss" scoped>
.song-list-item-molecule {
  cursor: pointer;
  transition: all .5s ease-in-out;
  &:hover {
    opacity: .8;
    transform: scale(0.97);
  }
  h2 {
    font-size: 1.2em;
    margin: 0;
    color: #333;
  }
  p {
    color: #777;
    margin: 0;
    text-align: right;
  }
}

.active {
  border-bottom: solid 1px #777;
}
</style>
