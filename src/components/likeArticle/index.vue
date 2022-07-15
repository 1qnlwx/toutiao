<template>
  <div>
    <van-icon
      :color="islikearticle === 1 ? 'red' : ''"
      :name="islikearticle === 1 ? 'good-job' : 'good-job-o'"
      @click="onLike"
      :loading="loading"
    />
  </div>
</template>

<script>
import { deleteLike, addLike } from '@/api/active'
export default {
  model: {
    prop: 'islikearticle',
    event: 'changeLike'
  },
  props: {
    islikearticle: {
      type: Number
    },
    artId: {
      type: [String, Number]
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async onLike() {
      this.loading = true
      try {
        if (this.islikearticle === 1) {
          await deleteLike(this.artId)
          this.$emit('changeLike', -1)

          this.$toast('取消点赞')
        } else {
          await addLike(this.artId)
          this.$emit('changeLike', 1)

          this.$toast('点赞成功')
        }
      } catch (error) {
        this.$toast('操作失败')
      }
      this.loading = false
    }
  }
}
</script>

<style></style>
