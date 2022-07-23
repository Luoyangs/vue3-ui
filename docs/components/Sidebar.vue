<template>
  <div class="sidebar-inner">
    <div class="sidebar-scroll">
      <div
        v-for="(links, group) in routeMaps"
        :key="group"
        class="sidebar-item">
        <div class="group-name">{{group}}</div>
        <router-link
          v-for="item in links"
          :key="item.path"
          :class="{'active': onActive(item.path)}"
          :to="{path: activePath(item.path)}">
          {{item.meta?.subtitle}}
          <span>{{item.meta?.title || item.path}}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue';
import { useRoute } from 'vue-router';
import demoRoutes from '../router/demoRoutes';
import referenceRoutes from '../router/referenceRoutes';

interface RouterItem {
  path: string;
  meta: Record<string, string>;
  component: any;
}
type RouterMapItem = Record<string, RouterItem[]>

const routeMap: Record<string, RouterItem[]> = {
  references: referenceRoutes,
  utils: [],
  components: demoRoutes,
};

export default defineComponent({
  setup() {
    const routeMaps = ref<RouterMapItem>();
    const route = useRoute();
    
    watch(() => route.path, () => {
      const routes: RouterItem[] = routeMap[route.path.split('/')[1]] || [];
      routeMaps.value = routes.reduce((acc, obj) => {
        const key = obj.meta.type || '通用';
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
      }, {} as any);
    }, { immediate: true });
    
    const activePath = (path: string) =>  `/${route.path.split('/')[1]}/${path}`;
    const onActive = (path: string) => {
      return new RegExp(`${path}$`).test(route.path);
    };

    return {
      routeMaps,
      onActive,
      activePath,
    };
  },
});
</script>

<style lang="scss" scoped>
.sidebar-inner {
  position: fixed;
  top: 64px;
  right: 0;
  bottom: 0;
  left: 0;
  width: 220px;
  overflow: hidden;
}
.sidebar-scroll {
  width: 235px;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
.sidebar-item {
  margin-top: 16px;
  .group-name {
    padding: 4px 8px 4px 12px;
    font-size: 12px;
    font-weight: 500;
    text-decoration: none;
    color: #333;
  }
}
a {
  position: relative;
  display: block;
  padding: 8px 24px 8px 24px;
  font-size: 14px;
  text-decoration: none;
  color: #555;
  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: -10px;
    margin-top: -2.5px;
    display: none;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    visibility: hidden;
    opacity: 0;
  }
  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    right: 15px;
    display: none;
    width: 3px;
    visibility: hidden;
    opacity: 0;
    transition: background-color .3s;
    border-radius: 1px;
  }
  &.active, 
  &:hover {
    color: #ee4d2d;
  }
  &.active {
    color: #ee4d2d;
    background: linear-gradient(200deg,#ffe9e8,rgba(248,250,255,0));
    transition: background .45s ease-in-out;
    &::before {
      opacity: 1;
      transform: scale(1) translate(0);
      background-color: #ee4d2d;
    }
    &::after {
      display: block;
      opacity: 1;
      visibility: visible;
      background-color: #ee4d2d;
    }
  }
}
</style>