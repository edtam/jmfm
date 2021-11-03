import { createFetch } from '@vueuse/core'

const useRequest = createFetch({
  baseUrl: 'https://cdn.jsdelivr.net/gh/edtam/jmfm-api/data',
})

export default useRequest
