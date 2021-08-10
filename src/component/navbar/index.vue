<template>
    <van-nav-bar :title="title" safe-area-inset-top class="nav-bar"/>
</template>

<script type="text/javascript">
export default {
  props: {
    title: {
      type: String,
      default: 'navbar'
    }
  },
  data () {
    return {
    }
  },
  components: {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  background-color: #3296fa;
}
</style>
