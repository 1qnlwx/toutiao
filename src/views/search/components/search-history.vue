<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <template #default>
        <template v-if="isDeleteShow">
          <van-tag type="danger" class="btn" @click="deleteAll"
            >全部删除</van-tag
          >
          <van-tag @click="isDeleteShow = false" type="success" class="btn"
            >完成</van-tag
          >
        </template>
        <van-icon @click="isDeleteShow = true" v-else name="delete" />
      </template>
    </van-cell>
    <van-cell
      v-for="(item, index) in searchHistories"
      :key="index"
      :title="item"
      @click="onHistoryClick(item, index)"
    >
      <template #default>
        <van-icon v-show="isDeleteShow" name="close" />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data() {
    return { isDeleteShow: false }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    deleteAll() {
      this.$emit('deleteAll')
    },
    onHistoryClick(item, index) {
      if (this.isDeleteShow) {
        this.searchHistories.splice(index, 1)
      } else {
        this.$emit('onSearch', item)
      }
    }
  }
}
</script>

<style scoped lang="less">
.btn {
  margin-right: 10px;
}
</style>
