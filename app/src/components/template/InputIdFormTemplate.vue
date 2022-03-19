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
import IDatabaseData from "@/interfaces/IDatabaseData";

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
      author: data.data.author,
      thumbnailUrl: data.data.thumbnailUrl
    };
    this.$store.commit('pushVideoList', yd);
    this.$store.commit('setVideoId', videoId);
    if (this.$store.getters.isFirstPlay) {
      this.$store.dispatch('setAudioObj', videoId);
    }
    const insertData: IDatabaseData = {
      youtubeId: videoId,
      title: data.data.title,
      author: data.data.author,
      listId: this.$store.state.listId,
      thumbnailUrl: data.data.thumbnailUrl
    }
    await YoutubeApiService.insertSong(insertData);
  }
}
</script>
