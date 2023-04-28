<template>
  <div>
    <component :is="mode" v-bind="$attrs"></component>
    <remote-js v-if="url" :src="url"></remote-js>
  </div>
</template>

<script>
import { defineComponent, ref, markRaw, h } from 'vue';
export default defineComponent({
  name: 'AsyncComponent',
  components: {
    RemoteJs: {
      render() {
        return h('script', {
          type: 'text/javascript',
          src: this.src,
          onload: 'document.dispatchEvent(scriptLoadedevent)'
        });
      },
      props: {
        src: { type: String, required: true }
      }
    }
  },
  props: {
    url: { type: String, required: true }
  },
  setup(props, ctx) {
    let mode = ref('');

    window.scriptLoadedevent = new CustomEvent('scriptLoaded'); // 自定义事件

    document.addEventListener('scriptLoaded', () => {
      debugger;
      mode.value = markRaw(window.MyComponent.default);
    });

    return {
      mode
    };
  },
  inheritAttrs: false
});
</script>

<style lang="scss" scoped></style>
