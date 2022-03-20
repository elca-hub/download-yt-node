<template>
  <div class="song-list-sidebar-items">
    <div class="song-list-sidebar-item" v-for="item in $store.state.songListsList" :key="item.listId" @click="choiceSongList(item.listId)">
      <p>{{item.name}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SidebarItems extends Vue {
  public choiceSongList (listId: number) {
    this.$store.dispatch('initSongAudio');
    this.$store.commit('setListId', listId);
  }
}
</script>
