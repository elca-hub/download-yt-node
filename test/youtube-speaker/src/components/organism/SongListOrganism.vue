<template>
  <div class="song-list-organism">
    <!-- TODO: 曲リストのヘッダ -->
    <transition-group name="song-list" tag="div">
      <span v-for="item in songList" :key="item.id" class="song-list-item">
        {{ item.title }}
      </span>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SongListOrganism extends Vue {
  get songList () {
    return this.$store.state.videoList;
  }
}
</script>

<style lang="scss" scoped>
.song-list-enter-active, .song-list-leave-active {
  transition: all .5s;
}

.song-list-enter, .song-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.song-list-move {
  transition: transform .5s;
}
</style>
