<template>
  <div class="song-info-main-box">
    <song-work-organism class="song-work" />
    <div></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SongWorkOrganism from '@/components/organism/SongWorkOrganism.vue';
@Component({
  components: {
    SongWorkOrganism
  }
})
export default class SongInfoTemplate extends Vue {}
</script>

<style lang="scss" scoped>
.song-info-main-box {
  width: 100%;
  display: flex;
}

.song-work {
  width: 50%;
}
</style>
