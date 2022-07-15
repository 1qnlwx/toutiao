<template>
  <div class="home-container">
    <van-nav-bar title="标题" fixed>
      <template #title>
        <van-button
          type="info"
          round
          size="small"
          class="search-btn"
          icon="search"
          to="/search"
          >搜索</van-button
        >
      </template></van-nav-bar
    >
    <van-tabs swipeable v-model="active" class="channel-tabs" animated>
      <van-tab v-for="item in userChannel" :key="item.id" :title="item.name">
        <ChannelList :channel="item"></ChannelList>
      </van-tab>
      <template #nav-right>
        <div @click="isEditChannelShow = true">
          <ToutiaoIcon icon="gengduo1" class="hamburger-btn"></ToutiaoIcon>
        </div>
      </template>
    </van-tabs>
    <van-popup
      class="edit-channel-popup"
      v-model="isEditChannelShow"
      position="bottom"
      :style="{ height: '80%' }"
      closeable
      close-icon-position="top-left"
      ><ChannelEdit
        :active="active"
        :myChannels="userChannel"
        @update-active="updateActive"
      ></ChannelEdit
    ></van-popup>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getChannel } from '@/api/channel'
import ChannelList from '@/components/ChannelList'
import ChannelEdit from './components/channel-edit'
import { getLocal } from '@/store/store'
import { CHANNELKEY } from '@/utils/consttion'

export default {
  components: { ChannelList, ChannelEdit },
  data() {
    return {
      active: 0,
      userChannel: [],
      isEditChannelShow: false
    }
  },
  created() {
    this.getUserChannels()
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async getUserChannels() {
      try {
        const token = this.$store?.state?.user?.token
        let channel = getLocal(CHANNELKEY)
        if (token || !channel) {
          const res = await getChannel()
          channel = res.data.data.channels
        }
        this.userChannel = channel
      } catch (e) {
        console.log(e)
        this.$toast.fail('获取频道数据失败')
      }
      // console.log(this.userChannel)
    },
    updateActive(index, isEditChannelShow) {
      this.active = index
      this.isEditChannelShow = isEditChannelShow
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  padding-top: 176px;
  padding-bottom: 100px;
  /deep/.van-nav-bar__title {
    max-width: unset;
    width: 100%;
    .search-btn {
      width: 80%;
      background-color: #5babfb;
      .van-icon {
        color: #fff;
      }
    }
  }
  /deep/ .channel-tabs {
    .van-tabs__nav--line.van-tabs__nav--complete {
      padding-right: 66px;
    }
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
    }
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      height: 80px;
      .van-tab__text {
        font-size: 27px;
        color: #777777;
      }
    }

    .van-tab--active .van-tab__text {
      color: #333 !important;
    }
    .van-tabs__line {
      width: 31px !important;
      height: 6px;
      background: rgba(50, 150, 250, 1);
      border-radius: 3px;
      bottom: 8px;
    }
    .van-tabs__nav {
      padding: 0;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
      i.toutiao {
        font-size: 33px;
      }
    }
  }
  .edit-channel-popup {
    padding-top: 100px;
    box-sizing: border-box;
  }
}
</style>
