import { createVNode, render as vueRender } from 'vue';
import Modal, { destroyFns } from '@components/modal/src/modal';
import { getContainer } from '@utils/dom';
import type { ModalFuncCallbackFun, ModalFuncProps, ModalFuncRenderProps } from '@components/modal/types';

export type ModalFunc = (props: ModalFuncProps) => {
  destroy: () => void;
  update: (configUpdate: ModalFuncProps) => void;
};

function renderSomeContent(someContent: any) {
  if (typeof someContent === 'function') {
    return someContent();
  }
  return someContent;
}

export default function renderInstance(config: ModalFuncRenderProps) {
  const root = getContainer(true, '#yoga-modal-container');
  const container = document.createElement('div');
  (root as Element).appendChild(container)
  let currentConfig: ModalFuncRenderProps = {
    ...config,
    width: config.width || 420,
    onClose: async () => {
      await config.onClose?.();
      close();
      return true;
    },
    onCancel: async () => {
      await config.onCancel?.();
      close();
      return true;
    },
    onConfirm: async (e?: any) => {
      const res = await config.onConfirm?.(e);
      
      if (res === true) {
        close();
      } else {
        (res as ModalFuncCallbackFun)?.();
      }
      return true;
    },
    visible: true
  };
  let modalInstance: any = null;

  function destroy() {
    for(let i = 0; i < destroyFns.length; i++) {
      const fn = destroyFns[i];
      if (fn === close) {
        destroyFns.splice(i, 1);
        break;
      }
    }
  }

  function close() {
    currentConfig = {
      ...currentConfig,
      visible: false,
      afterClose: () => {
        config.afterClose?.();
        destroy.apply(null);
      }
    };

    update(currentConfig);
  }

  function update(params: Partial<ModalFuncProps>) {
    currentConfig = {
      ...currentConfig,
      ...params
    } as ModalFuncRenderProps;

    if (modalInstance) {
      Object.assign(modalInstance.component.props, currentConfig);
      modalInstance.component.update();
    }
  }

  const Wrapper = (p: ModalFuncRenderProps) => {
    const { type, content, ...props } = p;
    
    // const global = globalConfigForApi;
    // const rootPrefixCls = global.prefixCls;
    // const prefixCls = p.prefixCls || `${rootPrefixCls}-modal`;
    return (
      // <ConfigProvider {...(global as any)} notUpdateGlobalConfig={true} prefixCls={rootPrefixCls}>
        <Modal
          {...props}
          class={type}>
          {renderSomeContent(content)}
        </Modal>
      // </ConfigProvider>
    );
  };

  function render(props: ModalFuncRenderProps) {
    const vm = createVNode(Wrapper, { ...props });
    vm.appContext = vm.appContext;
    vueRender(vm, container as any);
    return vm;
  }

  modalInstance = render(currentConfig);
  destroyFns.push(close);

  return {
    destroy: close,
    update,
  };
}


export function withAlert(props: ModalFuncProps): ModalFuncRenderProps {
  return {
    ...props,
    title: props.title || 'Alert',
    type: 'alert',
    showCancel: false,
  } as ModalFuncRenderProps;
}

export function withConfirm(props: ModalFuncProps): ModalFuncRenderProps {
  return {
    ...props,
    title: props.title || 'Confirm',
    type: 'confirm'
  } as ModalFuncRenderProps;
}