<template>
  <div class="input-id-organism">
    <p>聴きたい曲のYouTubeURLを入力</p>
    <input type="text" v-model="inputUrl" :placeholder="randomPlaceholderUrl" />
    <p v-show="isError">入力されたURLが正しくありません</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component
export default class HomeView extends Vue {
  public inputUrl = '';
  public isError = false;

  @Watch('inputUrl')
  public onInputUrl() {
    const url = this.inputUrl;
    const regex = /^https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)$/;
    const match = url.match(regex);
    if (match) {
      const videoId = match[1];
      this.$emit('input-videoId', videoId);
    }
    this.isError = !match;
  }

  get randomPlaceholderUrl () {
    /* ワイの好きな曲 */
    const list = [
      'https://www.youtube.com/watch?v=UnIhRpIT7nc',
      'https://www.youtube.com/watch?v=-KQAAeUTOQ4',
      'https://www.youtube.com/watch?v=EDjYDfRunUk',
      'https://www.youtube.com/watch?v=ajI7vhqiCAg',
      'https://www.youtube.com/watch?v=PjG0r-9HQBs'
    ];
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
  }
}
</script>

<style lang="scss" scoped>
.input-id-organism {
  padding-left: 10px;
  padding-right: 20px;
  input {
    padding: 4px;
    width: 100%;
    height: 2.3rem;
    border: solid 2px #c4302b;
    font-size: 1.2rem;
    font-family: 'Zen Maru Gothic', sans-serif;
  }
  p {
    color: #555;
    font-size: 1.2rem;
    margin: 0;
    margin-bottom: 4px;
    padding: 0;
  }
}
</style>
