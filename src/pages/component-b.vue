<template>
  <div class="component">
    <p>{{ txt }}</p>
    <el-button type="danger" @click="buttonClick">修改数据</el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const txt = ref('我是componentB');
const buttonClick = () => {
  txt.value = 'hello componentB';
};
</script>

<style>
.component {
  padding: 20px;
  background-color: #eee;
}
p {
  color: red;
}
</style>
