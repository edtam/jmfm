<script setup>
import { ref, provide } from 'vue'
import dayjs from 'dayjs'
import Player from '../components/player/Player.vue'
import useRequest from '../composables/useRequest'

const playInfo = ref()
const setPlayInfo = (obj) => (playInfo.value = obj)
provide('playInfo', playInfo)
provide('setPlayInfo', setPlayInfo)

const appDataVersion = ref(Date.now())
provide('version', appDataVersion)

const listVersion = dayjs().format('YYYYMMDD')
const listUrl = `/list.json?v=${listVersion}`
const { data, onFetchResponse } = useRequest(listUrl).json()
onFetchResponse(() => {
  appDataVersion.value = data.value.time
})
</script>

<template>
  <el-container class="page">
    <el-aside width="200px">
      <h1 class="title">JMFM<br />节目点播</h1>
      <el-menu router>
        <el-menu-item
          v-for="item in data?.list"
          :key="item.id"
          :index="`/detail/${item.id}`"
        >
          <h2>{{ item.title }}</h2>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-main>
        <router-view :key="$route.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
  <Player />
</template>

<style lang="scss" scoped>
.page {
  height: 100vh;
}
.title {
  text-align: center;
}
</style>
