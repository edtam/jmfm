<script setup>
import { inject, ref, watch, nextTick } from 'vue'
import { useStorage, useToggle } from '@vueuse/core'
import TimeBar from './TimeBar.vue'
import VolumeBar from './VolumeBar.vue'

const playInfo = inject('playInfo')

const audio = ref(null)
const timeSum = ref(0)
const timeLoad = ref(0)
const timeCur = ref(0)
const isPlay = ref(false)
const volume = useStorage('player-volume', 0.6)
const [isMuted, toggleMute] = useToggle(false)

watch(
  () => playInfo.value?.videosrc,
  () => {
    timeSum.value = 0
    timeLoad.value = 0
    timeCur.value = 0
    isPlay.value = false
    nextTick(() => setAudio('volume', volume.value))
  }
)

const audioListener = {
  play() {
    isPlay.value = true
  },
  pause() {
    isPlay.value = false
  },
  updateBufferLoad() {
    const { buffered } = audio.value
    timeLoad.value = buffered.end(buffered.length - 1)
  },
  canplay() {
    audioListener.updateBufferLoad()
  },
  progress() {
    audioListener.updateBufferLoad()
  },
  durationchange() {
    timeSum.value = audio.value.duration
  },
  timeupdate() {
    timeCur.value = audio.value.currentTime
  },
}
function setAudio(attr, value) {
  audio.value[attr] = value
}

function clickPlay() {
  isPlay.value ? audio.value.pause() : audio.value.play()
}
function onTimeBarChange(percentage) {
  setAudio('currentTime', timeSum.value * percentage)
}

watch(isMuted, (val) => setAudio('muted', val))
watch(volume, (val) => {
  console.log('volume', val)
  setAudio('volume', val)
  toggleMute(false)
})
</script>

<template>
  <div v-if="playInfo" class="player">
    <VolumeBar v-model:isMuted="isMuted" v-model:volume="volume" />
    <div class="action">
      <i
        v-if="isPlay"
        class="bi bi-pause-circle action-icon"
        @click="clickPlay"
      ></i>
      <i v-else class="bi bi-play-circle action-icon" @click="clickPlay"></i>
    </div>
    <div class="main">
      <div class="title">{{ playInfo.title }}</div>
      <TimeBar
        :current="timeCur"
        :load="timeLoad"
        :sum="timeSum"
        @change="onTimeBarChange"
      />
    </div>
    <audio
      ref="audio"
      :src="playInfo.videosrc"
      autoplay
      @play="audioListener.play"
      @pause="audioListener.pause"
      @canplay="audioListener.canplay"
      @progress="audioListener.progress"
      @durationchange="audioListener.durationchange"
      @timeupdate="audioListener.timeupdate"
    ></audio>
  </div>
</template>

<style lang="scss">
.player {
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  padding: 20px;
  color: #fff;
  background-color: #000;
}
.action {
  margin-right: 12px;
}
.action-icon {
  font-size: 36px;
  cursor: pointer;
}
.main {
  width: 400px;
}
.title {
  margin-bottom: 12px;
}
</style>
