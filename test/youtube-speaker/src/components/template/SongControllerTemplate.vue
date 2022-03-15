<template>
  <div class="song-controller-template">
    <div class="skip-before" @click="$store.dispatch('skipSong', false)">
      <i class="bi bi-skip-backward" />
    </div>
    <div class="song-play" @click="$store.dispatch('songControll', !$store.state.isPlaying)">
      <i class="bi bi-play" /><i class="bi bi-slash-lg" /><i class="bi bi-pause" />
    </div>
    <div class="skip-after" @click="$store.dispatch('skipSong', true)">
      <i class="bi bi-skip-forward" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SongControllerTemplate extends Vue {
}
</script>

<style lang="scss" scoped>
.song-controller-template {
  position: fixed;
  width: 100vw;
  bottom: 0;
  left: 0;
  z-index: 2;
  border-top: solid 1px #999;
  background-color: #fff;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
</style>
