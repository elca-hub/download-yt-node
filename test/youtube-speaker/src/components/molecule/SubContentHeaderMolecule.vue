<template>
  <div class="now-play-song-header-molecule">
    <h2>
      <slot />
    </h2>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class NowPlaySongHeaderMolecule extends Vue {}
</script>

<style lang="scss">
.now-play-song-header-molecule {
  h2 {
    margin: 0;
    margin-bottom: 8px;
    font-size: 2rem;
    color: #333;
  }
}
</style>
