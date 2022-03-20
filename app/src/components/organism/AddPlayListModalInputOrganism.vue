<template>
  <div class="add-play-list-modal-content">
    <input type="text" placeholder="プレイリスト名" v-model="inputPlayListName">
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component
export default class AddPlayListModalContent extends Vue {
  public inputPlayListName?: string = '';

  @Watch('inputPlayListName')
  public onInputPlayListNameChange (newVal: string) {
    this.$store.commit('setPlayListName', newVal);
  }
}
</script>

<style lang="scss" scoped>
.add-play-list-modal-content {
  input {
    border: none;
    border-radius: 0;
    border-bottom: 1px solid #ddd;
    width: 100%;
    font-size: 1.6rem;
    font-family: 'Zen Maru Gothic', sans-serif;
    transition: all 0.3s ease-in-out;
    outline: 0;
    &:focus {
      border-color: #c4302b;
    }
  }
}
</style>
