<template>
  <div class="input-form-template">
    <input-id-organism @input-videoId="inputVideoId($event)" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import InputIdOrganism from '@/components/organism/InputIdOrganism.vue';
import YoutubeApiService from "@/services/YoutubeApiService";
import IYoutubeData from "@/interfaces/IYoutubeData";

@Component({
  components: {
    InputIdOrganism
  }
})
export default class InputIdFormTemplate extends Vue {
  public async inputVideoId (videoId: string) {
    const data = await YoutubeApiService.getInfo(videoId); // youtubeのデータを取得
    const yd:IYoutubeData = {
      id: videoId,
      title: data.data.title,
      author: data.data.author
    };
    this.$store.commit('pushVideoList', yd);
    if (this.$store.state.isPlaying === false) {
      this.$store.dispatch('setAudioObj', videoId);
    }
  }
}
</script>
