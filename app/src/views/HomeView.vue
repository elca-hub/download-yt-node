<template>
  <div class="home">
    <header-template>
      <span>Y</span>ou<span>T</span>ube <span>S</span>peaker
    </header-template>
    <div class="main">
      <input-id-form-template />
      <song-info-template />
      <song-controller-template @height="bodyMargin($event)" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HeaderTemplate from '@/components/template/HeaderTemplate.vue';
import InputIdFormTemplate from '@/components/template/InputIdFormTemplate.vue';
import SongInfoTemplate from '@/components/template/SongInfoTemplate.vue';
import SongControllerTemplate from '@/components/template/SongControllerTemplate.vue';
import YoutubeApiService from "@/services/YoutubeApiService";
import IYoutubeData from "@/interfaces/IYoutubeData";

@Component({
  components: {
    HeaderTemplate,
    InputIdFormTemplate,
    SongInfoTemplate,
    SongControllerTemplate
  },
})
export default class HomeView extends Vue {
  public bodyMargin(height: number) {
    const dom = document.querySelector('body') as HTMLElement;
    const rect = dom.getBoundingClientRect();
    dom.style.height = `${rect.height + height}px`;
  }

  public async created () {
    const songData = await YoutubeApiService.getSongs();
    const videoList = [];
    for (const song of songData) {
      const appendData: IYoutubeData = {
        id: song.youtubeId,
        title: song.title,
        author: song.author
      };
      videoList.push(appendData);
    }
    this.$store.commit('setVideoList', videoList);
  }
}
</script>
