<template>
  <div class="song-list-sidebar-items">
    <div class="song-list-sidebar-item" v-for="item in $store.state.songListsList" :key="item.listId">
      <p>{{item.name}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SidebarItems extends Vue {}
</script>
