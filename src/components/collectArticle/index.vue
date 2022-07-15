<template>
  <van-icon
    :color="isCollected ? 'red' : ''"
    :name="isCollected ? 'star' : 'star-o'"
    @click="onCollect"
    :loading="loading"
  />
</template>

<script>
import { addCollect, deleteCollect } from '@/api/active'
export default {
  name: 'collectArticle',
  model: {
    prop: 'isCollected',
    event: 'changeCollect'
  },
  props: {
    isCollected: {
      type: Boolean
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
    async onCollect() {
      this.loading = true
      try {
        if (this.isCollected) {
          const res = await deleteCollect(this.artId)
          console.log(res)
        } else {
          const res1 = await addCollect(this.artId)
          console.log(res1)
        }
        this.$toast(this.isCollected ? '取消收藏' : '收藏成功')
        this.$emit('changeCollect', !this.isCollected)
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
