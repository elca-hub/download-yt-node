<template>
  <div class="header-template">
    <h1>
      <slot />
    </h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class HeaderTemplate extends Vue {}
</script>

<style lang="scss" scoped>
.header-template {
  width: 100%;
  text-align: center;
  h1 {
    font-size: 2em;
    margin: 0;
    padding: 0;
    color: #333;
    span {
      color: #c4302b;
    }
  }
}
</style>
