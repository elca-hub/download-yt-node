<template>
  <div class="song-list-sidebar-items">
    <div class="song-list-sidebar-item" v-for="item in $store.state.songListsList" :key="item.listId" @click="choiceSongList(item.listId)">
      <p>{{item.name}}</p>
      <i class="bi bi-x" v-if="item.listId !== -1" @click="removeSongList(item.listId)" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import YoutubeApiService from "@/services/YoutubeApiService";

@Component
export default class SidebarItems extends Vue {
  public choiceSongList (listId: number) {
    this.$store.dispatch('initSongAudio');
    this.$store.commit('setListId', listId);
  }
  public async removeSongList (listId: number) {
    if (this.$store.state.listId === listId) {
      this.$store.dispatch('initSongAudio');
      this.$store.commit('setListId', -1);
    }
    await YoutubeApiService.removeSongList(listId);
    const nowPlayListArr = this.$store.state.songListsList;
    const index = nowPlayListArr.findIndex((item: { listId: number; }) => item.listId === listId);
    nowPlayListArr.splice(index, 1);
    this.$store.commit('setSongListsList', nowPlayListArr);
    if (index >= nowPlayListArr.length) {
      this.$store.commit('setListId', nowPlayListArr[nowPlayListArr.length - 1].listId);
    } else if (this.$store.state.listId === listId) {
      let choiceIndex = index;
      if (choiceIndex >= nowPlayListArr.length) choiceIndex = nowPlayListArr.length - 1;
      this.$store.commit('setListId', nowPlayListArr[choiceIndex].listId);
    }
  }
}
</script>
