<template>
  <transition name="song-lsit-sidebar-fade">
    <div class="song-list-choice-sidebar-template" v-if="$store.state.isSidebarView">
      <i class="bi bi-x close-icon" @click="clickClose()" />
      <div class="header">
        <h1>{{title}}</h1>
      </div>
      <div class="main">
        <slot />
      </div>
      <div class="footer">
        <slot name="footer" />
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class SongListSidebarTemplate extends Vue {
  @Prop({ default: '' })
  public title!: string;

  public clickClose () {
    this.$store.state.isSidebarView = false;
  }
}
</script>

<style lang="scss" scoped>
.song-lsit-sidebar-fade-enter-active, .song-lsit-sidebar-fade-leave-active {
  transition: all .5s;
}
.song-lsit-sidebar-fade-enter, .song-lsit-sidebar-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(-100%);
}

.song-list-choice-sidebar-template {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 36%;
  z-index: 5;
  background-color: #fff;
  border-right: solid 1px #ddd;
  .close-icon {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 1.6rem;
  }
  .header {
    h1 {
      font-size: 1.6rem;
      margin: 0;
      margin-top: 1rem;
      margin-left: 4px;
      color: #333;
    }
  }
  .main {
    padding: 8px;
  }
  .footer {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
  }
}
</style>
