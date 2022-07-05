<template>
  <div class="login-container">
    <van-nav-bar title="登录" />
    <van-form @submit="onSubmit" ref="from">
      <van-field
        v-model="use.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="rules.mobile"
        required
        :maxlength="11"
      >
        <template #left-icon>
          <ToutiaoIcon icon="shouji"></ToutiaoIcon>
        </template>
      </van-field>
      <van-field
        v-model="use.code"
        type="number"
        name="code"
        placeholder="请输入验证码"
        :rules="rules.code"
        required
        :maxlength="6"
      >
        <template #left-icon>
          <ToutiaoIcon icon="yanzhengma"></ToutiaoIcon>
        </template>
        <template #button>
          <van-count-down
            @finish="isCountDown = false"
            :time="5000"
            v-if="isCountDown"
            format="ss s"
          />
          <van-button
            v-else
            class="send-sms-btn"
            native-type="button"
            size="mini"
            @click="sendSmsCode"
            :disabled="isDisabled"
            >发送验证码</van-button
          >
        </template></van-field
      >
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, getSmsCode } from '@/api/use.js'
import { Toast } from 'vant'
export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data() {
    return {
      // username: '',
      // password: ''
      isDisabled: false,
      use: {
        mobile: '',
        code: ''
      },
      rules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      },
      isCountDown: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // async onSubmit(value) {
    //   const res = await login(value)
    //   console.log(res)
    // }
    async onSubmit() {
      try {
        const res = await login(this.use)
        console.log(res)
        Toast.success('登录成功')
      } catch (e) {
        console.log(e)
        Toast.fail(e?.response?.data?.message || '登录失败')
      }
    },
    async sendSmsCode() {
      try {
        await this.$refs.from.validate('mobile')
      } catch (e) {
        console.log(e)
        return
      }
      try {
        console.log('发送验证码')
        this.isDisabled = true
        await getSmsCode(this.use.mobile)
        this.isCountDown = true
        Toast.success('获取验证码成功')
      } catch (e) {
        Toast.fail(e?.response?.data?.message || '出错了')
        // this.isCountDown = false
      } finally {
        this.isDisabled = false
      }
    }
  }
}
</script>
<style scoped lang="less">
.login-container {
  font-size: 20px;
  /deep/.toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 2px;
    color: #666;
  }
}
</style>
