<template>
  <div id="app">
    <ToutiaoIcon icon="wode"></ToutiaoIcon>
    <ToutiaoIcon icon="wuwangluo"></ToutiaoIcon>
    <van-button type="default">默认按钮</van-button>
<van-button type="primary">主要按钮</van-button>
<van-button type="info">信息按钮</van-button>
<van-button type="warning">警告按钮</van-button>
<van-button type="danger">危险按钮</van-button>
<div class="aaa">3333</div>
    <router-view> </router-view>
  </div>
</template>

<style lang="less">
.aaa{
  width: 100px;
  height: 100px;
  background-color: rgb(108, 200, 27);
}
</style>
