<template>
  <div>
    <van-button
      class="follow-btn"
      type="info"
      color="#3296fa"
      round
      size="small"
      icon="plus"
      v-if="!value"
      @click="followed"
      >关注</van-button
    >
    <van-button class="follow-btn" round size="small" @click="followed" v-else
      >已关注</van-button
    >
  </div>
</template>

<script>
import { addFollow, deleteFollow } from '@/api/use'
export default {
  name: 'followUser',
  //   model: {
  //     prop: 'isFollowedUser',//自定义value名称
  //     event: 'changeFollowed'//自定义input名称
  //   },
  props: {
    // isFollowed: {
    //   type: Boolean,
    //   required: true
    // },
    autId: {
      type: [String, Number],
      required: true
    },
    value: {
      type: [Boolean]
    }
  },

  data() {
    return {}
  },
  methods: {
    async followed() {
      try {
        if (this.value) {
          const res = await deleteFollow(this.autId)
          console.log(res)
        } else {
          const res = await addFollow(this.autId)
          console.log(res)
        }
        this.$emit('input', !this.value)
        this.$notify({
          type: 'success',
          message: this.value ? '关注成功' : '取消关注'
        })
      } catch (e) {
        this.$notify({
          type: 'danger',
          mseeage: '操作失败'
        })
      }
    }
  }
}
</script>

<style></style>
