<template>
  <div class="add-play-list-footer-buttons-molecule">
    <div class="close-button">
      <i class="bi bi-x" @click="$emit('close', true)" />
    </div>
    <div class="done-button">
      <i class="bi bi-check" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AddPlayListFooterButtonsMolecule extends Vue {}
</script>

<style lang="scss" scoped>
.add-play-list-footer-buttons-molecule {
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 1.8rem;
}
</style>
