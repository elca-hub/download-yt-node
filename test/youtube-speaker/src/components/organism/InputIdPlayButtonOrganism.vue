<template>
  <div class="input-id-play-button-organism">
    <button type="button" @click="onClick">
      <span>▶</span>
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class HomeView extends Vue {
  public choiceText () {
    if (this.$store.state.videoList.length === 0) {
      return '音楽を再生';
    } else {
      return 'リストへ追加';
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
