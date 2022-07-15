<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    >
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loding">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="artives.art_id">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ artives.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="artives.aut_photo"
          />
          <div slot="title" class="user-name">{{ artives.aut_name }}</div>
          <div slot="label" class="publish-date">{{ artives.pubdate }}</div>
          <!-- <van-button
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            v-if="!artives.is_followed"
            @click="followed"
            >关注</van-button
          >
          <van-button
            class="follow-btn"
            round
            size="small"
            @click="followed"
            v-else
            >已关注</van-button
          > -->
          <followUser
            :autId="artives.aut_id"
            v-model="artives.is_followed"
          ></followUser>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          ref="content"
          v-html="artives.content"
        ></div>
        <van-divider>正文结束</van-divider>

        <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
        <commentList
          :source="artives.art_id"
          :list="list"
          @reply-click="onReplyClick"
        ></commentList>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="isNotFound">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn">点击重试</van-button>
      </div>
    </div>
    <!-- 评论组件 -->
    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isPopupShow = true"
        >写评论</van-button
      >
      <van-icon name="comment-o" :badge="artives.comm_count" color="#777">
      </van-icon>
      <CollectArticle
        v-model="artives.is_collected"
        :artId="artives.art_id"
      ></CollectArticle>
      <LikeArticle
        v-model="artives.attitude"
        :artId="artives.art_id"
      ></LikeArticle>
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
    <van-popup v-model="isPopupShow" position="bottom"
      ><PostComment
        :target="artives.art_id"
        @postSuccess="postSuccess"
      ></PostComment
    ></van-popup>
    <!-- 评论回复 -->
    <van-popup v-model="isReplyShow" position="bottom" style="height: 100%">
      <CommentReply
        :currentComment="currentComment"
        v-if="isReplyShow"
        @colse="isReplyShow = false"
      ></CommentReply>
    </van-popup>
  </div>
</template>

<script>
import { getArticleById } from '@/api/active'
import 'github-markdown-css'
import { ImagePreview } from 'vant'
import followUser from '@/components/follow-user/index.vue'
import CollectArticle from '@/components/collectArticle/index.vue'
import commentList from '@/views/article/components/comment-list'
import LikeArticle from '@/components/likeArticle/index.vue'
import PostComment from '@/views/article/components/post-comment'
import CommentReply from '@/views/article/components/comment-reply'
export default {
  name: 'ArticleIndex',
  components: {
    followUser,
    CollectArticle,
    commentList,
    LikeArticle,
    PostComment,
    CommentReply
  },
  provide() {
    return {
      articleId: this.articleId
    }
  },
  props: {
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      artives: {},
      loding: false,
      isNotFound: false,
      isPopupShow: false,
      list: [],
      isReplyShow: false,
      currentComment: {}
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getArticleById()
  },
  mounted() {},
  methods: {
    onReplyClick(data) {
      this.isReplyShow = true
      this.currentComment = data
      console.log(this.currentComment)
    },
    postSuccess(data) {
      console.log(data)
      this.isPopupShow = false
      this.list.unshift(data)
    },
    previewImg() {
      console.log(this.$refs.content)
      const imgs = this.$refs.content.querySelectorAll('img')
      console.log(imgs)
      const imges = []
      imgs.forEach((item, index) => {
        imges.push(item.src)
        item.addEventListener('click', function () {
          ImagePreview({
            images: imges,
            startPosition: index
          })
        })
      })
    },
    async getArticleById() {
      this.loding = true
      try {
        const res = await getArticleById(this.articleId)
        this.artives = res.data.data
        console.log(this.artives)
        this.loding = false
        this.$nextTick(() => {
          this.previewImg()
        })
      } catch (e) {
        this.loding = false
        console.log(e)
        this.isNotFound = e?.response?.status === 404
      }
    }
  }
}
</script>

<style scoped lang="less">
.article-container {
  /deep/.van-icon-arrow-left:before {
    color: #fff;
  }
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
      .follow-btn1 {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
