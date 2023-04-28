<template>
  <div>
    <component :is="mode" v-bind="$attrs"></component>
  </div>
</template>

<script setup>
import { ref, watch, markRaw } from 'vue';
const props = defineProps(['url']);

let mode = ref('');

watch(
  () => props.url,
  (val, oldVal) => {
    if (val) {
      loadComponent(val);
    } else {
      mode.value = '';
    }
  },
  { immediate: true }
);

const loadComponent = (url) => {
  fetch(url).then((res) => {
    if (res.status === 200) {
      res.text().then((code) => {
        new Function(`${code}`)();
        mode.value = markRaw(window.MyComponent.default);
      });
    }
  });
};
</script>

<style lang="scss" scoped></style>
