<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isShowResult = false"
      />
    </form>
    <SearchResult v-if="isShowResult" :searchText="searchText"></SearchResult>
    <SearchSuggestion
      v-else-if="searchText"
      :searchText="searchText"
      @onSearch="onSearch"
    ></SearchSuggestion>
    <searchHistory
      v-else
      :searchHistories="searchHistories"
      @onSearch="onSearch"
      @deleteAll="searchHistories = []"
    ></searchHistory>
  </div>
</template>

<script>
import searchHistory from '@/views/search/components/search-history.vue'
import SearchSuggestion from '@/views/search/components/search-suggestion.vue'
import SearchResult from '@/views/search/components/search-result'
import { HISTORYKEY } from '@/utils/consttion'
import { getLocal, setLocal } from '@/store/store'
export default {
  name: 'SearchPage',
  components: {
    searchHistory,
    SearchSuggestion,
    SearchResult
  },
  props: {},
  data() {
    return {
      searchText: '',
      isShowResult: false,
      searchHistories: getLocal(HISTORYKEY) || []
    }
  },
  computed: {},
  watch: {
    searchHistories(val) {
      setLocal(HISTORYKEY, val)
    }
  },
  created() {},
  methods: {
    onSearch(item) {
      this.searchText = item
      this.isShowResult = true
      const index = this.searchHistories.indexOf(item)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(item)
    },
    onCancel() {
      this.$router.push('/home')
    }
  }
}
</script>

<style scoped></style>
