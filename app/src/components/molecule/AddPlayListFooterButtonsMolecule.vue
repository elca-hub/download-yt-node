<template>
  <div class="add-play-list-footer-buttons-molecule">
    <div class="close-button">
      <i class="bi bi-x" @click="$emit('close', true)" />
    </div>
    <div class="done-button">
      <i class="bi bi-check" @click="addPlayList()" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import YoutubeApiService from "@/services/YoutubeApiService";

@Component
export default class AddPlayListFooterButtonsMolecule extends Vue {
  public addPlayList() {
    const playListName = this.$store.state.playListName;
    if (playListName.length) {
      YoutubeApiService.insertSongList(playListName).then(res => {
        console.log(res);
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.add-play-list-footer-buttons-molecule {
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 1.8rem;
}
</style>
