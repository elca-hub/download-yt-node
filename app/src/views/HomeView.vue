<template>
  <div class="home">
    <header-template>
      <span>Y</span>ou<span>T</span>ube <span>S</span>peaker
    </header-template>
    <div class="main">
      <input-id-form-template />
      <song-info-template />
      <song-controller-template @height="bodyMargin($event)" />
      <song-list-choice-sidebar-template title="Play Lists">
        <sidebar-items />
        <template #footer>
          <p style="margin: 0;" @click="isShowModal = true">
            新規プレイリスト <i class="bi bi-plus-circle" />
          </p>
        </template>
      </song-list-choice-sidebar-template>
      <modal-template title="新規プレイリスト" :isShow="isShowModal">
        <add-play-list-modal-input-organism />
        <template #footer>
          <add-play-list-footer-buttons-molecule @close="isShowModal = false" />
        </template>
      </modal-template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HeaderTemplate from '@/components/template/HeaderTemplate.vue';
import InputIdFormTemplate from '@/components/template/InputIdFormTemplate.vue';
import SongInfoTemplate from '@/components/template/SongInfoTemplate.vue';
import SongControllerTemplate from '@/components/template/SongControllerTemplate.vue';
import SongListChoiceSidebarTemplate from '@/components/template/SongListChoiceSidebarTemplate.vue';
import ModalTemplate from '@/components/template/ModalTemplate.vue';
import SidebarItems from '@/components/molecule/SidebarItems.vue';
import AddPlayListFooterButtonsMolecule from '@/components/molecule/AddPlayListFooterButtonsMolecule.vue';
import AddPlayListModalInputOrganism from '@/components/organism/AddPlayListModalInputOrganism.vue';
import YoutubeApiService from "@/services/YoutubeApiService";
import IYoutubeData from "@/interfaces/IYoutubeData";

@Component({
  components: {
    HeaderTemplate,
    InputIdFormTemplate,
    SongInfoTemplate,
    SongControllerTemplate,
    SongListChoiceSidebarTemplate,
    SidebarItems,
    ModalTemplate,
    AddPlayListFooterButtonsMolecule,
    AddPlayListModalInputOrganism
  },
})
export default class HomeView extends Vue {
  public isShowModal = false;

  public bodyMargin(height: number) {
    const dom = document.querySelector('body') as HTMLElement;
    const rect = dom.getBoundingClientRect();
    dom.style.height = `${rect.height + height}px`;
  }

  public async getYoutubeData() {
    const songData = await YoutubeApiService.getSongs().then(res => res.data);
    const videoList = [];
    for (const song of songData) {
      const appendData: IYoutubeData = {
        id: song.youtubeId,
        title: song.title,
        author: song.author,
        thumbnailUrl: song.thumbnailUrl
      };
      videoList.push(appendData);
    }
    this.$store.commit('setVideoList', videoList);
  }

  public async getSongListData () {
    const data = await YoutubeApiService.getSongLists().then(res => res.data);
    this.$store.commit('setSongListsList', data);
  }

  public created () {
    this.getYoutubeData();
    this.getSongListData();
  }
}
</script>
