<template>
  <div class="song-basic-controller-organism">
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
export default class SongBasicControllerOrganism extends Vue {
}
</script>

<style lang="scss" scoped>
.song-basic-controller-organism {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 1.6rem;
  cursor: pointer;
  transition: opacity .5s;
  &:hover {
    opacity: .8;
  }
}
</style>
