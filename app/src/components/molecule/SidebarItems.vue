<template>
  <div class="song-list-sidebar-items">
    <transition-group name="sidebar-item" tag="div">
      <div class="song-list-sidebar-item" v-for="item in $store.state.songListsList" :key="item.listId">
        <p @click="choiceSongList(item.listId)">{{item.name}}</p>
        <i class="bi bi-x" v-if="item.listId !== -1" @click="removeSongList(item.listId)" />
      </div>
    </transition-group>
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

<style lang="scss" scoped>
.sidebar-item-enter-active, .sidebar-item-leave-active {
  transition: all .5s;
}

.sidebar-item-enter, .sidebar-item-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.song-list-sidebar-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.4rem;
  margin-top: 0.4rem;
  p {
    margin: 0;
    font-size: 1.4rem;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      transform: scale(0.98);
    }
  }
  i {
    font-size: 1.4rem;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      opacity: .8;
    }
  }
}
</style>
