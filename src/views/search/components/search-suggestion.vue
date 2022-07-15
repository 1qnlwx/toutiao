<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(item, index) in list"
      :key="index"
      icon="search"
      @click="cellClick(item)"
    >
      <template #title>
        <div v-html="higthLight(item)"></div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  components: {},
  props: { searchText: String },
  data() {
    return {
      list: []
    }
  },
  computed: {},
  watch: {
    searchText: {
      handler: debounce(function (value) {
        this.getSearch(value)
      }, 500),
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    higthLight(item) {
      const reg = new RegExp(this.searchText, 'gi')
      return item.replace(
        reg,
        `<span style="color:red">${this.searchText}</span>`
      )
    },
    async getSearch(q) {
      const res = await getSearchSuggestion(q)
      console.log(res)
      this.list = res.data.data.options
    },
    cellClick(item) {
      console.log(item)
      this.$emit('onSearch', item)
    }
  }
}
</script>

<style scoped lang="less"></style>
