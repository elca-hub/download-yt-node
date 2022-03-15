<template>
  <div class="song-list-item-molecule">
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
}
</script>

<style lang="scss" scoped>
.song-list-item-molecule {
  h2 {
    font-size: 1.7em;
    margin: 0;
    margin-bottom: 10px;
    color: #333;
  }
  p {
    color: #555;
    margin: 0;
  }
}
</style>
