<template>
    <div class="login-wrap">
      <!-- 公共组件 -->
      <NavBar title="登录" />
      <!-- 验证码登录表单 -->
      <van-form
      ref="loginForm"
      @submit="onSubmitCode"  v-show="isCode">
        <van-cell-group inset>
          <van-field
            v-model="user.mobile"
            name="userName"
            placeholder="请输入手机号"
            :rules="userRules.phone"
            type="number"
          >
          <!-- 通过具名插槽传递自定义icon -->
          <i slot="left-icon" class="iconfont icon-shouji"></i>
          </van-field>
          <van-field
            v-model="user.code"
            center
            clearable
            name="code"
            placeholder="请输入短信验证码"
            :rules="userRules.code"
            class="pwd-wrap"
          >
          <!-- 通过具名插槽传递自定义icon -->
          <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
            <template #button>
              <div
              v-show="iscountDown"
              class="send-code"
              >
              {{count}}s
              </div>
              <van-button
              class="send-code"
              size="small"
              type="primary"
              native-type="button"
              v-show="!iscountDown"
              @click="sendCode">发送验证码</van-button>
            </template>
          </van-field>
        </van-cell-group>
        <div class="login-btn-wrap">
          <van-button block type="primary" native-type="submit" class="login-btn">
            登录
          </van-button>
        </div>
      </van-form>
            <!-- 密码登录表单 -->
      <van-form
      ref="loginForm"
      @submit="onSubmitCode"  v-show="!isCode">
        <van-cell-group inset>
          <van-field
            v-model="user.mobile"
            name="userName"
            placeholder="请输入手机号"
            :rules="userRules.phone"
            type="number"
          >
          <!-- 通过具名插槽传递自定义icon -->
          <i slot="left-icon" class="iconfont icon-shouji"></i>
          </van-field>
          <van-field
            v-model="user.code"
            center
            clearable
            name="pwd"
            :type="inputType"
            placeholder="请输入密码"
            :rules="userRules.pwd"
            class="pwd-wrap"
            v-show="!isCode"
          >
          <!-- 通过具名插槽传递自定义icon -->
          <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
          <!-- 显示与隐藏密码 -->
          <i slot="right-icon" class="iconfont icon-wode" @click="showPwd"></i>
          </van-field>
          <div class="verify-code">
            <van-field
              v-model="user.verifyCode"
              center
              clearable
              name="code"
              placeholder="请输入验证码"
              class="code-wrap"
            >
            <!-- 通过具名插槽传递自定义icon -->
            <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
              <!-- <!-以插槽形式注入验证码 -> -->
            </van-field>
            <van-image :src="imgCode" width="120" @click="getVerifyCode" class="svg-code"/>
          </div>
        </van-cell-group>
        <div class="login-btn-wrap">
          <van-button block type="primary" native-type="submit" class="login-btn">
            登录
          </van-button>
        </div>
      </van-form>
      <div @click="changeLogin">
        <van-divider
          :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
        >
          切换登录方式
        </van-divider>
      </div>
    </div>
</template>

<script type="text/javascript">
import NavBar from '../../component/navbar'
import { mapMutations } from 'vuex'
import * as request from './api'
import * as types from '../../utils/types'
// import axios from 'axios'

export default {
  data () {
    return {
      // 验证码
      imgCode: `http://localhost:4444/api/getCodeImg?t=${new Date().getTime()}`,
      // 表单的值
      user: {
        mobile: '13911111111',
        code: '246810',
        verifyCode: ''
      },
      // 切换登录方式
      isCode: true,
      // 切换密码显示与隐藏
      isPwd: true,
      inputType: 'password',
      // 是否倒计时展示
      iscountDown: false,
      countDownTime: 60,
      count: 0,
      // 倒计时定时器
      countDownTimer: null,
      // 表单验证规则
      userRules: {
        phone: [
          { required: true, message: '手机号不能为空' },
          { trigger: 'onBlur' },
          { pattern: /^0{0,1}(13[0-9]|15[7-9]|153|156|166|18[7-9])[0-9]{8}$/, message: '请输入正确的手机号' }
        ],
        // 验证码规则
        code: [
          { required: true, message: '验证码不能为空' },
          { trigger: 'onBlur' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码' }
        ],
        // 密码规则
        pwd: [
          { required: true, message: '密码不能为空' },
          { trigger: 'onBlur' },
          { pattern: /^(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{6,20}$/, message: '请输入正确的密码' }
        ]
      }
    }
  },
  components: {
    NavBar
  },
  methods: {
    ...mapMutations(['setUser']),
    // 更新验证码
    updatePicCode () {
      this.imgCode = `http://localhost:4444/api/getCodeImg?t=${new Date().getTime()}`
    },
    /**
     * @desc 登录、提示
     */
    async onSubmitCode () {
      /**
       * 1.进行验证，
       * 2.验证通过之后，获取表单数据
       * 3.发起请求
       * 4.根据响应进行判断，进行登录或提示失败信息
       */
      const logInfo = this.user
      const toast = this.$toast
      toast.loading({
        message: '登录中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续时间 当登录成功或失败 会替换当前状态
      })
      try {
        const res = await request.logIn(logInfo)
        // console.log('res', res)
        if (res && res.status === 201) {
          toast.success('登录成功')
          // 存储token
          this.setUser(res.data.data)
          // 存储是否授权
          sessionStorage.setItem(types.IS_AUTHORIZED, true)
          // 是否需要重定向
          const path = sessionStorage.getItem(types.REDIRECT_URL) || '/'
          sessionStorage.removeItem(types.REDIRECT_URL)
          // console.log('path', path)
          this.$router.replace(path)
        }
      } catch (err) {
        // console.log(err.response.status)
        if (err.response.status === 400) {
          toast.fail('手机号或验证码错误')
        } else {
          toast.fail('登录失败，请稍后重试')
        }
      }
    },
    // 切换登录方式
    changeLogin () {
      this.isCode = !this.isCode
    },
    // 切换密码显示
    showPwd () {
      this.isPwd = !this.isPwd
      if (this.isPwd) {
        this.inputType = 'password'
      } else {
        this.inputType = 'text'
      }
    },
    // 发送验证码
    async sendCode () {
      // 1.校验手机号
      try {
        await this.$refs.loginForm.validate('userName')
      } catch (err) {
        return console.log(err)
      }
      // 2.验证通过显示倒计时 如何处理刷新重新计时的问题
      this.countDown()
      // 3.发起请求
      const res = await request.getCode(this.user.mobile)
      console.log(res)
      if (res && res.status === 200) {
        this.$toast.success('已发送')
      } else {
        this.$toast.fail(res.response.message)
      }
    },
    /**
     * 1.当没有倒计时定时器时开启定时器
     * 2.取得设定的倒计时时间、存入localStorage
     * 3.每次变化时更新localStorage的倒计时
     * 4.为0时隐藏倒计时，清除定时器，回复countDownTimer
     */
    countDown () {
      // 验证码倒计时
      if (!this.countDownTimer) {
        this.count = this.countDownTime
        localStorage.setItem('regtime', this.count)
        this.iscountDown = true
        this.countDownTimer = setInterval(() => {
          if (this.count > 0 && this.count <= this.countDownTime) {
            this.count--
            localStorage.regtime = this.count
          } else {
            this.iscountDown = false
            clearInterval(this.countDownTimer)
            this.countDownTimer = null
          }
        }, 1000)
      }
    },
    getVerifyCode () {
      this.imgCode = `http://localhost:4444/api/getCodeImg?t=${new Date().getTime()}`
      // this.imgCode = 'http://localhost:4444/api/getCodeImg'
    }
  },
  created () {
    // 进入检查到计时是否结束 继续倒计时
    if (localStorage.regtime > 0 && localStorage.regtime <= this.countDownTime) {
      this.count = localStorage.regtime
      this.iscountDown = true
      this.countDownTimer = setInterval(() => {
        if (this.count > 0 && this.count <= this.countDownTime) {
          this.count--
          localStorage.regtime = this.count
        } else {
          this.iscountDown = false
          clearInterval(this.countDownTimer)
          this.countDownTimer = null
        }
      }, 1000)
    }
    // 获取验证码
    // this.$nextTick(() => this.getVerifyCode())
  }
}
</script>

<style lang="less" scoped>
.login-wrap {
  .iconfont {
  font-size: 37px;
  }
  .send-code {
    width: 152px;
    height: 64px;
    line-height: 64px;
    background-color: #ededed;
    border: none;
    color: #666;
    text-align: center;
    border-radius: 40px;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
    background-color: #6db4fb;
    border: none;
    }
  }
  .pwd-wrap {
    height: 108px;
  }
  .code-wrap {
    width: 50vw;
  }
  .verify-code {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .svg-code {
      transform: translateX(-40px);
    }
  }
}
</style>
