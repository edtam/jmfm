// 是否可做日期分类
export function isDateSortList(list = []) {
  const firstTitle = list?.[0]?.title
  if (firstTitle && !isNaN(firstTitle.slice(0, 6))) {
    return true
  }
  return false
}

// 分类出年份
export function classifyYear(list = []) {
  const years = new Set()
  list.forEach((item) => {
    years.add(item.title.slice(0, 4))
  })
  return [...years]
}

// 根据年份过滤
export function filterListYear(list = [], year = 0) {
  return list.filter((item) => {
    return item.title.slice(0, 4) === year
  })
}

// 分类出月份
export function classifyMonth(list = []) {
  const months = new Set()
  list.forEach((item) => {
    months.add(item.title.slice(4, 6))
  })
  return [...months]
}

// 根据月份过滤
export function filterListYearMonth(list = [], ym = 0) {
  return list.filter((item) => {
    return item.title.slice(0, 6) === ym
  })
}
