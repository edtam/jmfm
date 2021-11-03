<script setup>
import { computed } from 'vue'
import { toPercent } from '../../js/util'

const props = defineProps({
  isMuted: Boolean,
  volume: Number,
})
const emit = defineEmits(['update:isMuted', 'update:volume'])

const icon = computed(() => {
  if (props.isMuted || props.volume === 0) {
    return 'bi-volume-mute'
  }
  return 'bi-volume-down'
})
function changeMuted() {
  emit('update:isMuted', !props.isMuted)
}

const barStyle = computed(() => ({
  width: toPercent(props.volume),
}))
const barClass = computed(() => (props.isMuted ? 'bar-sub' : 'bar-active'))
function changeVolume(event) {
  const { offsetX, target } = event
  const percentage = Number((offsetX / target.offsetWidth).toFixed(2))
  emit('update:volume', percentage)
}
</script>

<template>
  <div class="volume-bar">
    <i class="bi icon" :class="icon" @click="changeMuted"></i>
    <div class="bar">
      <div class="bar-base" :class="barClass" :style="barStyle"></div>
      <div class="bar-base bar-full" @click="changeVolume"></div>
    </div>
  </div>
</template>

<style lang="scss">
.volume-bar {
  width: 100px;
  text-align: center;
}
.icon {
  font-size: 30px;
  cursor: pointer;
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
