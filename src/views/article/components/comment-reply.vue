<template>
  <div class="comment-reply">
    <van-nav-bar title="回复" @click-left="$emit('colse')">
      <template #title>
        <span>条回复</span>
      </template>
      <template #left>
        <van-icon color="white" name="cross" />
      </template>
    </van-nav-bar>
    <CommentItem :comment="currentComment"></CommentItem>
    <van-cell title="评论回复" :border="false"></van-cell>
    <CommentList
      :list="list"
      type="c"
      :source="currentComment.com_id"
    ></CommentList>
    <div class="reply-bottom">
      <van-button
        class="write-btn"
        size="small"
        round
        @click="isPostShow = true"
        >写评论</van-button
      >
    </div>
    <!-- /底部区域 -->

    <!-- 发布评论 -->
    <van-popup v-model="isPostShow" position="bottom">
      <PostComment
        :target="currentComment.com_id"
        type="c"
        @postSuccess="postSuccess"
      ></PostComment>
    </van-popup>
  </div>
</template>

<script>
import CommentItem from '@/views/article/components/comment-item'
import CommentList from '@/views/article/components/comment-list'
import PostComment from '@/views/article/components/post-comment'
export default {
  name: 'CommentReply',
  components: { CommentItem, CommentList, PostComment },
  props: {
    currentComment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      list: [],
      isPostShow: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    postSuccess(data) {
      this.isPostShow = false
      this.list.unshift(data)
      this.currentComment.reply_count++
    }
  }
}
</script>
<style scoped lang="less">
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}

.reply-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .write-btn {
    width: 60%;
  }
}
</style>
