<script setup>
import { computed, inject, reactive, watch } from 'vue'
import useRequest from '../composables/useRequest'
import {
  classifyMonth,
  classifyYear,
  filterListYear,
  filterListYearMonth,
  isDateSortList,
} from '../js/classify-list'

const setPlayInfo = inject('setPlayInfo')
const version = inject('version')
const props = defineProps({
  id: String,
})

// 年月筛选
const filters = reactive({
  years: [],
  year: '',
  months: [],
  month: '',
})

const url = `/pg-${props.id}.json?v=${version.value}`
const { data, isFetching, onFetchResponse } = useRequest(url).json()
const fullList = computed(() => data.value?.list ?? [])
const filterYearList = computed(() => {
  if (filters.year) {
    return filterListYear(fullList.value, filters.year)
  }
  return fullList.value
})
const filterMonthList = computed(() => {
  if (filters.month) {
    return filterListYearMonth(
      fullList.value,
      `${filters.year}${filters.month}`
    )
  }
  return filterYearList.value
})
onFetchResponse(() => {
  if (isDateSortList(fullList.value)) {
    filters.years = classifyYear(fullList.value)
    filters.year = filters.years[0]
  }
})
watch(
  () => filters.year,
  () => {
    filters.months = classifyMonth(filterYearList.value)
    filters.month = filters.months[0]
  }
)

function playItem(item) {
  window.open(item.videosrc)
}
</script>

<template>
  <p v-if="isFetching">加载中...</p>
  <el-form v-if="filters.year">
    <el-form-item label="年份">
      <el-radio-group v-model="filters.year">
        <el-radio-button v-for="y in filters.years" :key="y" :label="y">
          {{ y }}
        </el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="月份">
      <el-radio-group v-model="filters.month">
        <el-radio-button v-for="m in filters.months" :key="m" :label="m">
          {{ m }}
        </el-radio-button>
      </el-radio-group>
    </el-form-item>
  </el-form>
  <p v-for="item in filterMonthList" :key="item.globalid">
    <el-link @click="playItem(item)">{{ item.title }}</el-link>
  </p>
</template>

<style lang="scss" scoped>
.el-link {
  font-size: 20px;
}
</style>
