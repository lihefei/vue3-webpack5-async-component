<template>
  <div>
    <fieldset>
      <legend>
        <h3>父组件</h3>
      </legend>
      <el-button @click="loadComponent('a')">加载componentA</el-button>
      <el-button @click="loadComponent('b')">加载componentB</el-button>
      <fieldset>
        <legend>
          <h4>远程组件</h4>
        </legend>
        <component :is="mode" v-bind="$attrs"></component>
      </fieldset>
    </fieldset>
  </div>
</template>

<script setup>
import { ref, markRaw } from 'vue';
let mode = ref('');

const loadComponent = (val) => {
  let component = require(`/static/component-${val}.min.js`);
  console.log(component.default);
  mode.value = markRaw(component.default);
};
</script>

<style>
#app {
  height: 100%;
}
</style>
