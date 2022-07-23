<docs>
---
title: 简单弹窗
---

提供 `Modal.alert`: 对用户进行信息知会，不需做决策的情况下均可使用；使用`Modal.confirm`: 用户触发某一个操作后，需用户做出继续进行的判断，常用于二次确认弹窗，使用`Modal.modal`可以快捷地弹出自定义框。
</docs>

<template>
  <y-button @click="showAlertModal">Alert</y-button>
  <y-button @click="showInsideModal">Inside Modal</y-button>
  <y-button @click="showConfirmModal">Confirm Modal</y-button>
  <y-button @click="showCustomModal">Custom Modal</y-button>
</template>
<script lang="tsx">
import { h, defineComponent } from 'vue';
import { Modal, Button, Input } from 'vue3-ui';
export default defineComponent({
  setup() {
    const showAlertModal = () => {
      Modal.alert({
        title: 'Alert Modal',
        content: 'Some descriptions',
        onConfirm() {
          console.log('OK');
          return true;
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    };
    const showInsideModal = () => {
      Modal.alert({
        title: 'Outer Modal',
        width: 500,
        content: 'This is outer modal',
        onConfirm: () => {
          return new Promise((resolve) => {
            resolve(showAlertModal);
          });
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    };
    const showConfirmModal = () => {
      Modal.confirm({
        title: 'Confirm Modal',
        width: 500,
        content: h(Button, { onClick: showAlertModal }, { default: () => 'Open Inner Modal'}),
        onConfirm: () => {
          return true;
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    };
    const showCustomModal = () => {
      Modal.modal({
        title: 'Custom Modal',
        width: 600,
        content: h(Input),
        onConfirm: () => {
          return true;
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    };
    
    return {
      showAlertModal,
      showInsideModal,
      showConfirmModal,
      showCustomModal,
    };
  },
});
</script>
