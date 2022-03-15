<template>
  <div class="home">
    <header-template>
      <span>Y</span>ou<span>T</span>ube <span>S</span>peaker
    </header-template>
    <div class="main">
      <input-id-form-template />
      <song-info-template />
      <song-controller-template />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HeaderTemplate from '@/components/template/HeaderTemplate.vue';
import InputIdFormTemplate from '@/components/template/InputIdFormTemplate.vue';
import SongInfoTemplate from '@/components/template/SongInfoTemplate.vue';
import SongControllerTemplate from '@/components/template/SongControllerTemplate.vue';

@Component({
  components: {
    HeaderTemplate,
    InputIdFormTemplate,
    SongInfoTemplate,
    SongControllerTemplate
  },
})
export default class HomeView extends Vue {}
</script>
