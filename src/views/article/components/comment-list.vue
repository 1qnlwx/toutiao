<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
    >
      <!-- <van-cell
        :title="item.content"
        v-for="(item, index) in list"
        :key="index"
      /> -->
      <CommentItem
        v-for="(item, index) in list"
        :key="index"
        :comment="item"
        @reply-click="$emit('reply-click', $event)"
      ></CommentItem>
    </van-list>
    <!-- 评论列表 -->
  </div>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from '@/views/article/components/comment-item'
export default {
  name: 'ArticleComment',
  components: { CommentItem },
  props: {
    source: {
      type: [String, Number]
    },
    list: {
      type: Array
    },
    type: {
      type: String,
      default: 'a'
    }
  },
  data() {
    return {
      // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      error: false,
      limit: 10,
      offect: null
    }
  },

  methods: {
    async onLoad() {
      // 异步更新数据
      try {
        const res = await getComments({
          type: this.type,
          source: this.source,
          offect: this.offect,
          limit: this.limit
        })
        this.list.push(...res.data.data.results)
        this.loading = false
        if (res.data.data.last_id === res.data.data.end_id) {
          this.finished = true
        } else {
          this.offect = res.data.data.last_id
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.van-list {
  margin-bottom: 45px;
}
</style>
