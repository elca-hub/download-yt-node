<template>
  <div class="modal" v-if="isShow">
    <div class="modal-content">
      <div class="modal-header">
        <h2>{{title}}</h2>
      </div>
      <div class="modal-body">
        <slot />
      </div>
      <div class="modal-footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class ModalTemplate extends Vue {
  @Prop({ default: '' })
  public title!: string;
  @Prop({ default: false })
  public isShow!: boolean;
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  z-index: 10;
  .modal-content {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: .8rem;
    border: solid 1px #aaa;
    border-radius: 4px;
    .modal-header {
      text-align: center;
      h2 {
        margin: 0;
      }
    }
  }
}
</style>
