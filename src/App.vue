<template>
  <el-config-provider>
    <template v-if="isInQiankun">
      <router-view v-slot="{ Component }">
        <transition name="fade-transform" mode="out-in">
          <keep-alive :include="cachedViews">
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
    </template>
    <template v-else>
      <router-view></router-view>
    </template>
  </el-config-provider>
</template>

<style lang="scss">
@import url("//at.alicdn.com/t/font_2195165_mqi032xswu.css");
@import url("//at.alicdn.com/t/font_2344249_bvrnascbhvi.css");
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script>
import keepAlive from 'szd-client-web/client/common/mixins/keepAlive';
export default {
  name: "App",
  mixins: [keepAlive],
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>