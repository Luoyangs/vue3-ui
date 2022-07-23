<template>
  <div ref="root" class="code-box">
    <div class="code-box-demo">
      <slot />
    </div>
    <div class="code-box-source">
      <div class="preview-action">
        <y-tooltip content="在 CodeSandbox 中打开">
          <y-button
            type="link"
            :icon="SandboxIcon"
            @click="openCodeSandbox" />
        </y-tooltip>
        <y-tooltip content="复制代码">
          <y-button
            type="link"
            :icon="CopyIcon"
            class="copy-icon"
            @click="copyCode" />
          </y-tooltip>
        <y-tooltip :content="showSourceTip">
          <y-button
            type="link"
            class="code-icon"
            :icon="CodeIcon"
            @click="toggleDisplayCode" />
        </y-tooltip>
      </div>
      <slot v-if="showSource" name="htmlCode" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick } from 'vue';
import { getCodeSandboxParams } from './CodeSandbox';
import { CodeIcon, CopyIcon, SandboxIcon } from './icons';

export default defineComponent({
  name: "DemoBox",
  props: ['code'],
  setup() {
    const root = ref(null);
    const showSource = ref(false);
    const showSourceTip = ref('显示代码');
    const openCodeSandbox = () => {
      if (!showSource.value) {
        toggleDisplayCode();
      }
      nextTick(() => {
        const codeEle = document.querySelector('.language-vue') as HTMLDivElement;
        if (!codeEle) {
          return;
        }

        const code = codeEle.innerText;
        const div = document.createElement("div");
        const parameters = getCodeSandboxParams(code);
        div.style.display = "none";
        div.innerHTML = `<form action="https://codesandbox.io/api/v1/sandboxes/define" method="POST" target="_blank">
          <input type="hidden" name="parameters" value="${parameters}" />
          <input type="submit" value="Open in sandbox" />
        </form>`;
        document.body.appendChild(div);
        (div.firstElementChild as HTMLFormElement).submit();
        document.body.removeChild(div);
      });
    };

    const toggleDisplayCode = () => {
      showSource.value = !showSource.value;
      showSourceTip.value = showSource.value ? '隐藏代码' : '显示代码';
    };

    const copyCode = () => {
      if (!showSource.value) {
        toggleDisplayCode();
      }
      nextTick(() => {
        const codeEle = document.querySelector('.language-vue') as HTMLDivElement;
        if (!codeEle) {
          return;
        }

        const code = codeEle.innerText;
        navigator.clipboard.writeText(code).then(() => {
          console.log("copy!", code);
        });
      });
    };

    return {
      root,
      CodeIcon,
      CopyIcon,
      SandboxIcon,
      showSource,
      showSourceTip,

      copyCode,
      openCodeSandbox,
      toggleDisplayCode,
    };
  },
});
</script>

<style lang="scss" scoped>
.code-box {
  position: relative;
  margin-bottom: 24px;
  border-radius: 4px;
  border: 1px solid #e5e5e5;
  .preview-action {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 0;
    .yoga-button {
      margin-left: 3px;
      :deep(svg) {
        width: 18px;
        height: 18px;
        color: #333;
        transition: transform ease-in-out .2s;
      }

      &:hover :deep(svg) {
        transform: scale(1.2);
        color: #ee4d2d;
      }

      &.code-icon {
        :deep(svg) {
          width: 20px;
          height: 20px;
          fill: #333;
        }

        &:hover :deep(svg) {
          fill: #ee4d2d;
        }
      }
    }
  }

  .code-box-demo {
    background-color: #fff;
    padding: 24px 32px 24px;
    border-bottom: 1px dashed #f0f0f0;
  }

  .code-box-source {
    overflow-x: auto;
  }

  .line-numbers-mode {
    margin-top: 0;
  }
}
</style>
