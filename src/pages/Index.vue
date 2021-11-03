<script setup>
import { ref, provide, watch } from 'vue'
import Player from '../components/player/Player.vue'
import useRequest from '../composables/useRequest'

const playInfo = ref()
const setPlayInfo = (obj) => (playInfo.value = obj)
provide('playInfo', playInfo)
provide('setPlayInfo', setPlayInfo)

const version = ref(Date.now())
provide('version', version)

const date = new Date()
const dateArr = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
const listVersion = dateArr.map((v) => String(v).padStart(2, 0)).join('')
const url = `/list.json?v=${listVersion}`
const { data } = useRequest(url).json()
watch(
  () => data.value?.time,
  (val) => (version.value = val)
)
</script>

<template>
  <aside class="sidebar">
    <h1>JMFM<br />节目点播</h1>
    <h2 v-for="item in data?.list" :key="item.id">
      <router-link :to="`/detail/${item.id}`" replace>
        {{ item.title }}
      </router-link>
    </h2>
  </aside>
  <main class="view">
    <router-view :key="$route.path"></router-view>
  </main>
  <Player />
</template>

<style lang="scss">
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
  overflow-y: auto;
  width: 240px;
  border-right: 1px solid #ddd;
  padding: 0 20px;
}
.view {
  margin-left: 240px;
  padding: 20px 20px 100px;
}
</style>
