<template>
  <div class="tab-bar-wrap">
    <van-tabbar v-model="active">
      <van-tabbar-item icon="search" to="/">
        <i slot="icon" class="iconfont icon-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item icon="search" to="/news">
        <i slot="icon" class="iconfont icon-wenda"></i>
        <span class="text">新闻</span>
      </van-tabbar-item>
      <van-tabbar-item icon="search" to="/workbench">
        <i slot="icon" class="iconfont icon-zuopin"></i>
        <span class="text">工作台</span>
      </van-tabbar-item>
       <van-tabbar-item icon="search" to="/app-market">
        <i slot="icon" class="iconfont icon-yuedu"></i>
        <span class="text">应用</span>
      </van-tabbar-item>
       <van-tabbar-item icon="search" to="/edu-resource">
        <i slot="icon" class="iconfont icon-dianzan"></i>
        <span class="text">资源</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script type="text/javascript">
export default {
  data () {
    return {
      active: 0
    }
  },
  components: {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.tab-bar-wrap {
  i {
    font-size: 40px;
  }
}
</style>
