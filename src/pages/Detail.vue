<script setup>
import { inject } from 'vue'
import useRequest from '../composables/useRequest'

const setPlayInfo = inject('setPlayInfo')
const version = inject('version')
const props = defineProps({
  id: String,
})

const url = `/pg-${props.id}.json?v=${version.value}`
const { data, isFetching } = useRequest(url).json()

function openItem(item) {
  window.open(item.videosrc)
}
</script>

<template>
  <p v-if="isFetching">加载中...</p>
  <h3 v-for="item in data?.list" :key="item.globalid">
    <a class="item" @click="openItem(item)">
      {{ item.title }}
    </a>
  </h3>
</template>

<style lang="scss">
.item {
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
</style>
