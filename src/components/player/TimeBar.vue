<script setup>
import { computed } from 'vue'
import { secondToTime, toPercent } from '../../js/util'

const props = defineProps({
  current: Number,
  load: Number,
  sum: Number,
})
const emit = defineEmits(['change'])

const playStyle = computed(() => ({
  width: toPercent(props.current / props.sum),
}))
const loadStyle = computed(() => ({
  width: toPercent(props.load / props.sum),
}))

function clickBar(event) {
  const { offsetX, target } = event
  const percentage = offsetX / target.offsetWidth
  emit('change', percentage)
}
</script>

<template>
  <div class="time-bar">
    <div class="time">{{ secondToTime(current) }}</div>
    <div class="bar">
      <div class="bar-base bar-sub" :style="loadStyle"></div>
      <div class="bar-base bar-active" :style="playStyle"></div>
      <div class="bar-base bar-full" @click="clickBar"></div>
    </div>
    <div class="time">{{ secondToTime(sum) }}</div>
  </div>
</template>

<style lang="scss">
.time-bar {
  display: flex;
  align-items: center;
}
.bar {
  position: relative;
  flex: 1;
  height: 8px;
  margin: 0 12px;
  background-color: #333;
  cursor: pointer;
  &-base {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 0;
  }
  &-sub {
    background-color: #555;
  }
  &-active {
    background-color: #e11;
  }
  &-full {
    width: 100%;
  }
}
</style>
