<template>
  <div class="song-list-sidebar-items">
    <div class="song-list-sidebar-item" v-for="item in songLists" :key="item.listId">
      <p>{{item.name}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import YoutubeApiService from "@/services/YoutubeApiService";
import ISongListData from "@/interfaces/ISongListData";

@Component
export default class SidebarItems extends Vue {
  public songLists: ISongListData[] = [];
  public async created () {
    const data = await YoutubeApiService.getSongLists().then(res => res.data);
    this.songLists = data;
  }
}
</script>
