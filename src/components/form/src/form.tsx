import { computed, defineComponent, ref, toRefs, provide, reactive } from 'vue';
import { formProps, FormKey } from '@components/form/types';
import { getFieldsByPaths, noop } from '@components/form/src/util';
import mitt from 'mitt';
import { useNamespace } from '@hooks/useNamespace';
import { isFunction, isPlainObject } from '@utils/helper';
import type { SetupContext } from 'vue';
import type {
  FormEvent,
  FormItemContext,
  FormProps,
  ValidateCallback,
  ErrorHandlerConfig,
  ValidateCallbackType
} from '@components/form/types';

export default defineComponent({
  name: 'YForm',
  props: formProps,
  emits: ['validate'],
  setup(props: FormProps, { emit, slots, expose }: SetupContext) {
    const ns = useNamespace('form');
    const formMitt = mitt<FormEvent>();
    const fields = ref<FormItemContext[]>([]);

    const formClass = computed(() => {
      return {
        [ns.b()]: true,
        [ns.m('inline')]: props.inline,
        [ns.m('label-') + props.labelAlign]: props.labelAlign,
      };
    });

    /************************** methods start ***************************/
    // private
    const handleValidate = (
      fields: FormItemContext[],
      callback: ValidateCallbackType = noop,
      errorHandler: ErrorHandlerConfig
    ) => {
      // 这传入fields和errorHandler两个参数，则使用默认的noop作为callback
      if (isPlainObject(callback)) {
        errorHandler = callback as ErrorHandlerConfig;
        callback = noop;
      }

      return new Promise((resolve) => {
        const handleCallback = (result: ValidateCallback) => {
          resolve(result);

          if (isFunction(callback)) {
            callback(result);
          }
        };

        let valid = true;
        let invalidFields: FormItemContext[] = [];
        // 如果校验的规则为空，则直接返回true
        if (fields.length === 0) {
          handleCallback({ valid, invalidFields });
          return;
        }

        let count = 0;
        fields.forEach((field, index) => {
          field.validate('', (res) => {
            if (!res) {
              valid = false;
              invalidFields[index] = field;
            }

            // 全部校验完
            if (++count === fields.length) {
              invalidFields = invalidFields.filter(Boolean);

              // 如果校验失败，且传入errorHandler
              if (errorHandler && !valid) {
                // scrollToError(invalidFields, errorHandler);
              }

              handleCallback({ valid, invalidFields });
            }
          });
        });
      });
    };
    // private
    const handleClearValidate = (fields: FormItemContext[]) => {
      fields.forEach((field) => {
        field.reset();
      });
    };
    /************************** public methods start ***************************/
    const validate = (callback: (arg: ValidateCallback) => void = noop, errorHandler: ErrorHandlerConfig) => {
      return handleValidate(fields.value, callback, errorHandler);
    };
    const clearValidate = () => {
      handleClearValidate(fields.value);
    };
    const validateFields = (
      props: string | string[],
      callback: (arg: ValidateCallback) => void,
      errorHandler: ErrorHandlerConfig
    ) => {
      const mFields = getFieldsByPaths(fields.value, props);
      if (mFields.length === 0) {
        console.warn('[YogaUI warn][Form]: should call validateFields with valid prop string');
      }

      return handleValidate(fields.value, callback, errorHandler);
    };
    const clearValidateFields = (props: string | string[]) => {
      const mFields = getFieldsByPaths(fields.value, props);
      if (mFields.length === 0) {
        console.warn('[YogaUI warn][Form]: should call validateFields with valid prop string');
      }

      handleClearValidate(fields.value);
    };
    expose({
      validate,
      validateFields,
      clearValidate,
      clearValidateFields
    });
    /************************** methods ends ***************************/

    formMitt.on('addField', (field) => {
      if (field.prop) {
        fields.value.push(field);
      }
    });
    formMitt.on('removeField', (field) => {
      const index = fields.value.indexOf(field);
      if (index > -1) {
        fields.value.splice(index, 1);
      }
    });

    const form = reactive({
      ...toRefs(props),
      formMitt,
      emit
    });
    provide(FormKey, form);

    return () => (
      <form class={formClass} autocomplete={props.autocomplete}>
        {slots.default?.()}
      </form>
    );
  }
});
