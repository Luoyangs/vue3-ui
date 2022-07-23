<script setup lang="ts">
import { watch, ref, nextTick, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Sidebar from './components/Sidebar.vue';
import Navbar from './components/Navbar.vue';

const route = useRoute();
const router = useRouter();
const hiddenSidebar = ref<boolean>(false);
const className = ref('content');
const styles = ref({});
const handleScroll = () => {
  const readProInner = document.querySelector('.read-pro__inner') as HTMLDivElement;
  // const toc = document.querySelector('.table-of-contents');
  // const tocLi = toc.querySelectorAll('li');
  // tocLi && tocLi[0] && tocLi[0].classList.add('active');

  let scrolling = false;
  window.addEventListener('scroll', () => {
    if(!scrolling && readProInner) {
		  scrolling = true;
      requestAnimationFrame(() => {
        // 处理顶部进度条
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        readProInner.style.width = + (scrollTop / (scrollHeight - clientHeight)).toFixed(2) * 100 + '%';

        // const hash = decodeURIComponent(window.location.hash).slice(1);
        // tocLi.forEach(li => {
        //   if (slugify(li.querySelector('a').innerText) === hash) {
        //     li.classList.add('active');
        //   } else {
        //     li.classList.remove('active');
        //   }
        // });
        scrolling = false;
      });
    }
  });
};
let oldPath = '';
watch(route, (value) => {
  hiddenSidebar.value = !!route.meta.hiddenSidebar;
  if (hiddenSidebar.value) {
    styles.value = {
      'flex-basis': '220px',
    };
  }
  className.value = `content ${route.path.split('/').slice(-1)[0]}-pages`;

  nextTick(() => {
    if (value.path !== oldPath) {
      oldPath = value.path;
      // 清除上一次的记录
      const readProInner = document.querySelector('.read-pro__inner') as HTMLDivElement;
      if (readProInner) {
        readProInner.style.width = '0%';
      }
      handleScroll();
    }
  });
});
onMounted(() => {
  handleScroll();
});
if (route.path === '/') {
  router.push('/components/select');
}
</script>

<template>
  <div class="main">
    <Navbar />
    <div class="container">
      <div v-if="!hiddenSidebar" class="sidebar">
        <Sidebar />
      </div>
      <div :class="className" :style="styles">
        <div class="read-pro">
          <div class="read-pro__inner"></div>
        </div>
        <div v-if="route.meta?.subtitle || route.meta?.title" class="title">
          {{route.meta.subtitle}}
          <span class="subtitle">{{route.meta.title}}</span>
        </div>
        <router-view />      
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  display: block;
  padding-top: 64px;
  .container {
    display: flex;
    .sidebar {
      position: relative;
      flex: 0 0 220px;
      max-width: 220px;
      border-right: 1px solid #e5e5e5;
    }
    .content {
      flex: 1;
      padding: 0 24px;

      .read-pro {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        z-index: 999;
        background-color: #ffffff;

        &__inner {
          content: '';
          position: absolute;
          left: 0;
          height: 100%;
          border-radius: 3px;
          background: linear-gradient(270deg,#ee4d2d,rgba(248,250,255,0));
        }
      }
      .title {
        padding: 32px 0 8px 0;
        font-size: 30px;
        font-weight: 500;
      }
      .subtitle {
        font-size: 18px;
        font-weight: 400;
      }
    }
  }
}
</style>
