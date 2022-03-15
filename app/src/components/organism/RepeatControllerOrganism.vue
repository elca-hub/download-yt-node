<template>
  <div style="text-align: center;">
    <div class="repeat-controller-organism" :class="{ 'active': nowRepeatType !== 'none' }">
      <i class="bi bi-arrow-repeat" @click="changeRepeatType()" />
      <p v-if="nowRepeatType === 'one'">1</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class RepeatController extends Vue {
  public changeRepeatType() {
    this.$store.dispatch('changeRepeatType');
  }

  get nowRepeatType () {
    console.log(this.$store.getters.getNowRepeatType);
    return this.$store.getters.getNowRepeatType;
  }
}
</script>

<style lang="scss" scoped>
.repeat-controller-organism {
  display: inline;
  text-align: center;
  position: relative;
  color: #888;
  font-size: 1.6rem;
  cursor: pointer;
  transition: opacity .5s;
  &:hover {
    opacity: .8;
  }
  p {
    margin: 0;
    position: absolute;
    font-size: .8rem;
    bottom: 0;
    right: -5px;
    color: #333;
  }
}

.active {
  color: #333;
}
</style>
