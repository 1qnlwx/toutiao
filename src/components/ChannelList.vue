<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :success-text="successText"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="加载出错了"
      >
        <ArticleItem
          :article="item"
          v-for="(item, index) in list"
          :key="index"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getChannelList } from '@/api/channel'
import ArticleItem from './artiveList.vue'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      isLoading: false,
      successText: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      //   setTimeout(() => {
      //     for (let i = 0; i < 10; i++) {
      //       this.list.push(this.list.length + 1)
      //     }
      try {
        const res = await getChannelList({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })
        //   console.log(res)
        this.list = [...this.list, ...res.data.data.results]
        // 加载状态结束
        this.loading = false
        if (res.data.data.results.length === 0) {
          this.finished = true
        } else {
          this.timestamp = res.data.data.pre_timestamp
        }
      } catch (e) {
        this.error = true
        this.loading = false
      }
      // 数据全部加载完成
      //   }, 1000)
    },
    async onRefresh() {
      const res = await getChannelList({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1
      })
      //   console.log(res)
      this.list = [...res.data.data.results, ...this.list]
      // 加载状态结束
      this.isLoading = false
      this.successText = `更新了${res.data.data.results.length}条数据`
    }
  }
}
</script>

<style scoped lang="less">
.artcile-list {
  height: 79vh;
  overflow: auto;
}
</style>
