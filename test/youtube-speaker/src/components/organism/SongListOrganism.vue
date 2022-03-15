<template>
  <div class="song-list-organism">
    <sub-content-header-molecule>
      Song List<i class="bi bi-music-note-list" style="margin-left: 10px" />
    </sub-content-header-molecule>
    <transition-group name="song-list" tag="div">
      <song-list-item-molecule v-for="item in songList" :key="item.id" class="song-list-item" :item="item" />
    </transition-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SongListItemMolecule from '@/components/molecule/SongListItemMolecule.vue';
import SubContentHeaderMolecule from '@/components/molecule/SubContentHeaderMolecule.vue';

@Component({
  components: {
    SongListItemMolecule,
    SubContentHeaderMolecule
  }
})
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
