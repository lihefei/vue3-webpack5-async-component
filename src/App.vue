<template>
  <div>
    <fieldset>
      <legend>
        <h3>父组件</h3>
      </legend>
      <el-button @click="setUrl('a')">加载componentA</el-button>
      <el-button @click="setUrl('b')">加载componentB</el-button>
      <fieldset>
        <legend>
          <h4>远程组件</h4>
        </legend>
        <AsynComponent :url="url" />
      </fieldset>
    </fieldset>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AsynComponent from '@/components/async-component2.vue';
let url = ref('');

const setUrl = (val) => {
  url.value = `http://127.0.0.1:5500/static/component-${val}.min.js`;
};
</script>

<style>
#app {
  height: 100%;
}
</style>
