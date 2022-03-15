<template>
  <div class="song-info-main-box">
    <song-work-organism class="song-work" />
    <song-list-organism class="song-list" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SongWorkOrganism from '@/components/organism/SongWorkOrganism.vue';
import SongListOrganism from '@/components/organism/SongListOrganism.vue';
@Component({
  components: {
    SongWorkOrganism,
    SongListOrganism
  }
})
export default class SongInfoTemplate extends Vue {}
</script>

<style lang="scss" scoped>
.song-info-main-box {
  width: 100%;
  display: flex;
  gap: 0 1.2rem;
}

.song-work {
  width: 50%;
}
.song-list {
  width: 50%;
}
</style>
