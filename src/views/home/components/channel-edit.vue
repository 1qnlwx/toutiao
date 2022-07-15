<template>
  <div class="channel-edit">
    <van-cell title="我的频道" :border="false">
      <van-button
        size="mini"
        round
        type="danger"
        plain
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item
        class="channel-item"
        v-for="(item, index) in myChannels"
        :key="index"
        :text="item.name"
        @click="onMyChannelClick(item, index)"
        ><span class="text" :class="{ active: active === index }" slot="text">{{
          item.name
        }}</span
        ><van-icon v-show="isEdit && index !== 0" slot="icon" name="close"
      /></van-grid-item>
    </van-grid>
    <van-cell title="频道推荐" :border="false"></van-cell>
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item
        class="channel-item"
        v-for="channel in recommendChannels"
        :key="channel.id"
        :text="channel.name"
        @click="onAddChannel(channel)"
        icon="plus"
      />
    </van-grid>
  </div>
</template>

<script>
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel
} from '@/api/edit.js'
import _ from 'lodash'
import { setLocal } from '@/store/store'
import { mapState } from 'vuex'
import { CHANNELKEY } from '@/utils/consttion'
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      allChannels: [],
      isEdit: false
    }
  },
  computed: {
    recommendChannels() {
      return _.differenceBy(this.allChannels, this.myChannels, 'id')
    },
    ...mapState(['user'])
  },
  watch: {},
  created() {
    this.loadAllChannels()
  },
  mounted() {},
  methods: {
    async loadAllChannels() {
      try {
        const { data } = await getAllChannels()
        console.log(data)
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toast('获取频道列表数据失败')
      }
    },
    async onAddChannel(channel) {
      this.myChannels.push(channel)
      if (this.user) {
        try {
          await addUserChannel({
            id: channel.id,
            seq: this.myChannels.length
          })
          this.$toast('添加成功')
        } catch (error) {
          this.$toast('添加失败')
        }
      } else {
        setLocal(CHANNELKEY, this.myChannels)
      }
    },
    onMyChannelClick(item, index) {
      if (this.isEdit) {
        if (index === 0) return this.$toast('该频道不允许删除')
        if (index <= this.active) {
          this.$emit('update-active', this.active - 1, true)
        }
        this.myChannels.splice(index, 1)
        this.deleteChannel(item)
      } else {
        // 执行跳转操作
        this.$emit('update-active', index, false)
      }
    },
    async deleteChannel(channel) {
      try {
        if (this.user) {
          await deleteUserChannel(channel.id)
        } else {
          setLocal(CHANNELKEY, this.myChannels)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  /deep/.recommend-grid {
    .channel-item {
      height: 86px;
      .van-grid-item__content {
        background-color: #f5f5f6;
        flex-direction: row;
        color: #222;
        .van-grid-item__text,
        .text {
          color: #222;
          font-size: 20px;
          white-space: nowrap;
          margin-top: 0;
        }

        .active {
          color: red;
        }
        .van-icon {
          font-size: 24px;
        }
      }
    }
  }
  /deep/ .van-icon-close {
    position: absolute;
    right: -10px;
    top: -10px;
    font-size: 36px;
    color: #ccc;
  }
  /deep/ .van-grid-item__icon-wrapper {
    position: unset;
  }
}
</style>
