import Modal, { destroyFns } from '@components/modal/src/modal';
import renderInstance, { withAlert, withConfirm } from '@components/modal/src/instance';
import './styles/modal.scss';

Modal.alert = (props: any) => renderInstance(withAlert(props));
Modal.confirm = (props: any) => renderInstance(withConfirm(props));
Modal.modal = (props: any) => renderInstance(props);
Modal.destroyAll = function destroyAllFn() {
  while (destroyFns.length) {
    const close = destroyFns.pop();
    if (close) {
      close();
    }
  }
};

export { Modal };
