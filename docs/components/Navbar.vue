<template>
  <div class="nav">
    <div class="title">
      Vue3 ui
    </div>
    <div class="nav-links">
      <router-link
        v-for="item in navs"
        :key="item.path"
        :class="{'active': onActive(item.activeMatch)}"
        :to="{path: item.path}">
        {{item.text}}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  setup() {
    const navs = [
      { text: "Quick Start", path: "/getting-started", activeMatch: "^/getting-started$" },
      { text: "Components", path: "/components/index", activeMatch: "^/components" },
      { text: "Utils", path: "/utils/index", activeMatch: "^/utils" },
      {
        text: "Reference",
        path: "/references/index",
        activeMatch: "^/references",
      },
    ];
    const route = useRoute();
    const onActive = (pathReg: string) => route.path.match(pathReg);

    return {
      navs,
      onActive,
    };
  },
});
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  left: 0;
  top: 3px;
  width: 100%;
  height: 64px;
  padding: 0 24px;
  border-bottom: none;
  z-index: 800;
  background-color: #fff;
  box-shadow: 0 8px 24px -2px rgba(0,0,0,.05);
  .title {
    font-size: 1.3rem;
    font-weight: 600;
  }
  .nav-links a {
    display: inline-block;
    padding: 0 8px;
    font-size: 14px;
    color: #555;
    text-decoration: none;
    &.active, 
    &:hover {
      color: #ee4d2d;
    }
  }
}
</style>