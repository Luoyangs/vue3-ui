import {
  computed,
  defineComponent,
  ref,
  watch,
  onMounted,
  reactive,
  toRefs,
  onBeforeUnmount,
  inject,
  provide,
  renderSlot
} from 'vue';
import mitt from 'mitt';
import { formItemProps, FormKey, FormItemKey } from '@components/form/types';
import { getModelByPath, getRulesByPath } from '@components/form/src/util';
import { debounce, isArray, isFunction, isPlainObject, NOOP, toTypeString } from '@utils/helper';
import type { SetupContext } from 'vue';
import type { Emitter } from 'mitt';
import type {
  AsyncValidatorFn,
  FormContext,
  FormItemEvent,
  FormItemProps,
  FormRule,
  ValidatorFn
} from '@components/form/types';
import type { Noop } from '@components/form/src/util';

export default defineComponent({
  name: 'YFormItem',
  props: formItemProps,
  setup(props: FormItemProps, { slots }: SetupContext) {
    const error = ref<boolean>(false);
    const errorMessage = ref<string>('');
    const validateTrigger = ref<string>('');
    const formItemMitt: Emitter<FormItemEvent> = mitt();
    const formEl = inject(FormKey, {} as FormContext);

    /************** computed attr *************/
    const formItemClass = computed(() => {
      return [
        'yoga-form-item',
        sizeClass.value ? `yoga-form-item--${sizeClass.value}` : '',
        error.value ? 'yoga-form-item--error' : ''
      ];
    });
    const formItemLabelClass = computed(() => {
      return ['yoga-form-item__label', (props.label || slots.label?.()) ?? 'empty'];
    });
    const labelFor = computed(() => props.for || props.prop);
    const sizeClass = computed(() => props.size || formEl.size);
    const fieldValue = computed(() => {
      const { value, parent } = getModelByPath(formEl.model, props.prop!);
      return {
        $model: value,
        $parent: parent
      };
    });
    const filedRules = computed(() => props.rules || getRulesByPath(formEl.rules, props.prop!));
    const activeRules = computed(() => {
      let rules = filedRules.value as FormRule[];
      rules = isArray(rules) ? rules : [rules];
      return rules.filter((rule) => {
        // remove $each rule
        if (rule.$each) {
          return false;
        }

        if (rule.trigger === undefined) {
          rule.trigger = formEl.validateTrigger || '';
        }

        return triggerFilter(rule, validateTrigger.value);
      });
    });
    const validators = computed(() => {
      return activeRules.value
        .map((rule) => {
          const validator = Object.values(rule).find((n) => isFunction(n)) as ValidatorFn;
          if (!validator) {
            console.warn(
              `[YogaUI warn][Form]: should define a validate function in rules for form item: ${props.prop}`
            );
            return false;
          }
          console.log('validator', validator);

          return genAsyncValidator(validator, rule.message as string);
        })
        .filter(Boolean) as AsyncValidatorFn[];
    });
    const showError = computed(() => {
      return error.value && props.showMessage && formEl.showMessage;
    });

    /************** methods *************/
    const triggerFilter = (rule: FormRule, trigger: string) => {
      if (!rule.trigger || !trigger) {
        return true;
      }
      console.log('triggerFilter', rule.trigger);

      if (isArray(rule.trigger)) {
        return rule.trigger.indexOf(trigger) > -1;
      }
      return rule.trigger === trigger;
    };
    const genAsyncValidator = (validator: ValidatorFn, message: string) => {
      /* eslint-disable-line */
      return async (...args: [/** value */ any, /** model */ any]) => {
        const res = await validator(...args);
        const error = !res || toTypeString(res) === '[object Error]';

        return {
          error,
          errorMessage: error ? (res as Error).message || message : ''
        };
      };
    };
    const updateError = (err: boolean, errorMsg?: string) => {
      const debounceFn = debounce((n) => n(), 50);
      debounceFn(() => {
        error.value = err;
        if (errorMsg !== undefined) {
          errorMessage.value = errorMsg;
        }
      });
    };
    const handleValidate = async (validators: AsyncValidatorFn[]) => {
      for (let i = 0, length = validators.length; i < length; i++) {
        const validator = validators[i];
        const { $model, $parent } = fieldValue.value;

        const { error, errorMessage } = await validator($model, $parent, formEl.model);
        if (error || i === length - 1) {
          return {
            error,
            errorMessage
          };
        }
      }

      return {
        error: false,
        errorMessage: ''
      };
    };
    const validate = (trigger?: string | Noop, callback?: Noop): boolean | Promise<boolean> => {
      if (isFunction(trigger)) {
        callback = trigger;
        trigger = '';
      } else if (isPlainObject(trigger)) {
        callback = NOOP;
        trigger = '';
      }

      validateTrigger.value = trigger!;

      const validatorList = validators.value;
      if (!validatorList || validatorList.length === 0) {
        callback?.(true);
        return true;
      }

      updateError(false);

      return new Promise((resolve) => {
        handleValidate(validatorList).then(({ error, errorMessage }) => {
          updateError(error, errorMessage);

          formEl.emit('validate', props.prop!, !error, fieldValue.value.$model);
          // TODO: error handle: scroll to error

          resolve(!error);
          if (isFunction(callback)) {
            callback(!error);
          }
        });
      });
    };
    const reset = () => {
      updateError(false, '');
    };
    const clearValidate = () => {
      reset();
    };
    const onFieldFocus = () => {
      reset();
    };
    const onFieldBlur = () => {
      validate('blur');
    };
    const onFieldChange = () => {
      validate('change');
    };

    /************** computed attr *************/
    watch(
      () => filedRules,
      (value, oldValue) => {
        if (formEl.validateOnRuleChange && value !== oldValue && oldValue !== undefined) {
          validate();
        }
      }
    );

    const formItem = reactive({
      ...toRefs(props),
      formItemMitt,
      reset,
      validate
    });
    provide(FormItemKey, formItem);
    onMounted(() => {
      formEl.formMitt.emit('addField', formItem);

      if (filedRules.value) {
        formItemMitt.on('fieldFocus', onFieldFocus);
        formItemMitt.on('fieldBlur', onFieldBlur);
        formItemMitt.on('fieldChange', onFieldChange);
      }
    });
    onBeforeUnmount(() => {
      formEl.formMitt.emit('removeField', formItem);
    });

    return {
      formItemClass,
      labelFor,
      formItemLabelClass,
      error,
      errorMessage,
      showError,
      reset,
      validate,
      onFieldFocus,
      onFieldBlur,
      onFieldChange,
      clearValidate
    };
  },
  render() {
    const { error, errorMessage, showError, required, label, labelFor, formItemClass, formItemLabelClass } = this;
    return (
      <div class={formItemClass}>
        <label for={labelFor} class={formItemLabelClass}>
          {required && <span class="yoga-form-item__required">*</span>}
          {renderSlot(this.$slots, 'label', undefined, () => [label])}
        </label>
        <div class="yoga-form-item__control">
          <div class="yoga-form-item__content">{this.$slots.default?.()}</div>
          {renderSlot(this.$slots, 'error', { error, errorMessage }, () => [
            showError && (
              <transition name="slide-fast">
                <div class="yoga-form-item__error">{errorMessage}</div>
              </transition>
            )
          ])}
          {this.$slots.extra && <div class="yoga-form-item__extra">{this.$slots.extra()}</div>}
        </div>
      </div>
    );
  }
});
