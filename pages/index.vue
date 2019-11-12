<template>
  <div>
    <logo/>
    <h1>这里是nuxt项目的首页</h1>
    <h2>欢迎来到 {{$store.state.uname}} 的主页</h2>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
export default {
  components: {
    Logo
  }
}
</script>

<style>

</style>
