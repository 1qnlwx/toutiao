<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!-- <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
      /> -->
      <ArticleItem
        v-for="(item, index) in list"
        :key="index"
        :article="item"
      ></ArticleItem>
    </van-list>
  </div>
</template>

<script>
import { getSearch } from '@/api/search'
import ArticleItem from '@/components/artiveList'
export default {
  name: 'SearchResult',
  components: { ArticleItem },
  props: {
    searchText: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perpage: 10
    }
  },
  computed: {},
  watch: {},
  created() {
    this.onLoad()
  },
  mounted() {},
  methods: {
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      const res = await getSearch({
        page: this.page,
        perpage: this.perpage,
        q: this.searchText
      })
      this.list = [...this.list, ...res.data.data.results]
      this.loading = false
      if (res.data.data.results) {
        this.page++
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
