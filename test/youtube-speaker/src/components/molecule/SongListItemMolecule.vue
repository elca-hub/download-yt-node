<template>
  <div class="song-list-item-molecule" @click="changePlaySong(item.id)">
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
}
</script>

<style lang="scss" scoped>
.song-list-item-molecule {
  cursor: pointer;
  &:hover {
    opacity: .8;
    transform: scale(0.96);
  }
  h2 {
    font-size: 1.7em;
    margin: 0;
    margin-bottom: 10px;
    color: #333;
  }
  p {
    color: #777;
    margin: 0;
  }
}
</style>
