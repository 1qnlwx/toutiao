<template>
  <div class="post-comment">
    <van-field
      class="post-field"
      v-model="inputComment"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="优质评论将会被优先展示"
      show-word-limit
    />
    <van-button
      class="post-btn"
      size="small"
      @click="onPost"
      :disabled="!inputComment.trim()"
      >发布</van-button
    >
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  name: 'PostComment',
  components: {},
  props: {
    target: {
      type: [String, Number],
      required: true
    },
    type: {
      type: String,
      default: 'a'
    }
  },
  data() {
    return {
      inputComment: ''
    }
  },
  computed: {},
  inject: ['articleId'],
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onPost() {
      this.$toast.loading({
        duration: 0,
        forbidClick: true
      })
      try {
        const res = await addComment({
          target: this.target,
          content: this.inputComment,
          art_id: this.type === 'c' ? this.articleId : null
        })
        console.log(res)
        this.$toast.success('发布成功')
        this.inputComment = ''
        this.$emit('postSuccess', res.data.data.new_obj)
      } catch (error) {
        this.$toast.fail('发布失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.post-comment {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
