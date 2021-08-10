<template>
  <div class="app-wrap">
    <router-view></router-view>
    <TabBarCom v-if="showTabBar()"></TabBarCom>
  </div>
</template>

<script type="text/javascript">
import TabBarCom from './component/tabbar'
export default {
  data () {
    return {
    }
  },
  components: {
    TabBarCom
  },
  methods: {
    // 是否显示tabbar.
    showTabBar () {
      const names = ['Login']
      return !names.includes(this.$route.name)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
