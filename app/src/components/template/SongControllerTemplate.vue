<template>
  <div class="song-controller-template" ref="songController">
    <song-basic-controller-organism />
    <repeat-controller-organism />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SongBasicControllerOrganism from '@/components/organism/SongBasicControllerOrganism.vue';
import RepeatControllerOrganism from '@/components/organism/RepeatControllerOrganism.vue';

@Component({
  components: {
    SongBasicControllerOrganism,
    RepeatControllerOrganism
  }
})
export default class SongControllerTemplate extends Vue {
  public mounted () {
    const dom = this.$refs.songController as HTMLElement;
    const rect = dom.getBoundingClientRect();
    this.$emit('height', rect.height);
  }
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
}
</style>
