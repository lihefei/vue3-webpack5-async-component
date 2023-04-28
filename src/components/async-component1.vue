<template>
  <div>
    <component :is="mode" v-bind="$attrs"></component>
  </div>
</template>

<script>
import { defineComponent, ref, watch, markRaw } from 'vue';
export default defineComponent({
  name: 'AsyncComponent',
  props: {
    url: { type: String, required: true }
  },
  setup(props, ctx) {
    let mode = ref('');

    watch(
      () => props.url,
      (val, oldVal) => {
        if (val) {
          loadScript(props.url).then(() => {
            mode.value = markRaw(window.MyComponent.default);
          });
        } else {
          mode.value = '';
        }
      },
      { immediate: true }
    );

    const loadScript = (url) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        const target =
          document.getElementsByTagName('script')[0] || document.head;
        script.type = 'text/javascript';
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        target.parentNode.insertBefore(script, target);
      });
    };

    return {
      mode
    };
  },
  inheritAttrs: false
});
</script>

<style lang="scss" scoped></style>
