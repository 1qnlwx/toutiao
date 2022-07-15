<template>
  <div class="article-item">
    <van-cell :title="article.title" :to="`/article/${article.art_id}`">
      <template #default v-if="article.cover.type === 1">
        <van-image class="img" :src="article.cover.images[0]" />
      </template>
      <template #label>
        <div class="laber-article" v-if="article.cover.type === 3">
          <van-image
            v-for="(item, index) in article.cover.images"
            :key="index"
            class="img-laber"
            :src="item"
          />
        </div>
        <div class="laber-conintainer">
          <span>{{article.aut_name}}</span>
          <span>{{article.comm_count}}条评论</span>
          <span>{{article.pubdate}}</span>
        </div></template
      >
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  components: {},
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {},
  methods: {
  }
}
</script>

<style scoped lang="less">
.article-item {
  .img {
    height: 200px;
  }
  .laber-article {
    display: flex;
    justify-content: space-between;
    .img-laber {
      width: 200px;
      height: 200px;
    }
  }
  .laber-conintainer span{
margin-right: 25px;
  }
}
</style>
