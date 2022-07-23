import { computed, defineComponent, ref } from 'vue';
import type { SetupContext } from 'vue';
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@components/base';
import { selectProps } from '@components/select/types';
import { Popper } from '@components/popper';
import FixedSizeList from './fixed-size-list';
import SelectOption from './option';
import { ClickOutside } from '@directives';
import { useInput } from '@hooks/useInput';
import { useSelect } from './use-select';
import type { SelectProps } from '@components/select/types';
import { isObject } from '@utils/helper';

export default defineComponent({
  name: 'YSelect',
  props: selectProps,
  directives: {
    ClickOutside
  },
  setup(props: SelectProps, { emit }: SetupContext) {
    const prefixCls = 'yoga-select';
    const {
      state,
      inputRef,
      popperRef,
      selectorRef,
      popperVisible,
      currentPlaceholder,
      togglePopper,
      handleFocus,
      handleInput,
      handleClose,
    } = useSelect(props);
    
    const selectorWrapperClass = computed(() => {
      return {
        [`${prefixCls}__selector`]: true,
        [`${prefixCls}__selector--disabled`]: props.disabled,
        [`${prefixCls}__selector--filterable`]: props.filterable,
        [`${prefixCls}__selector--focused`]: state.isFocus,
      };
    });

    const renderSingleSelector = () => {
      const { name, autocomplete, disabled, filterable } = props;
      return (
        <div class={`${prefixCls}__input-wrapper`}>
          <input
            type="text"
            role="combobox"
            spellcheck="false"
            autocapitalize="off"
            class={`${prefixCls}__input`}
            name={name}
            ref={inputRef}
            disabled={disabled}
            readonly={!filterable}
            autocomplete={autocomplete}
            // value={state.displayInputValue}
            onInput={handleInput}
            onFocus={handleFocus}/>
          <span class={[`${prefixCls}__input-placeholder`]}>
            { currentPlaceholder.value }
          </span>
        </div>
      );
    };
    const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
    const options = Array.from({ length: 1000 }).map((_, idx) => ({
      value: `Option ${idx + 1}`,
      label: `${initials[idx % 10]}${idx}`,
    }));

    const handleItemHover = (index: number) => {
      state.hoveringIndex = index;
    };

    const handleItemSelect = (item: any, index: number) => {
      update(getValue(item));
      state.selectedLabel = getLabel(item);
    };

    const update = (value: any) => {
      emit(UPDATE_MODEL_EVENT, value);
      if (props.modelValue !== value) {
        emit(CHANGE_EVENT, value);
      }
    };

    const isItemSelected = (value: any) => {
      const { modelValue } = props;
      if (!isObject(value)) {
        return value === modelValue;
      }

      return getValue(modelValue) === getValue(value);
    }
    const getLabel = (item: unknown) => isObject(item) ? item.label : item;
    const getValue = (item: any) => isObject(item) ? item[props.valueKey] : item;

    return () => {
      return (
        <div
          class={prefixCls}
          onClick={togglePopper}
          v-click-outside={[handleClose, 'popperRef']}>
          <Popper
            ref={popperRef}
            placement="bottom"
            popperStyle={{padding: 0}}
            visible={popperVisible.value}
            v-slots={{
              trigger: () => (
                <div ref={selectorRef} class={selectorWrapperClass.value}>
                  {renderSingleSelector()}
                </div>
              ),
              default: () => (
                <FixedSizeList
                  data={options}
                  itemSize={34}
                  width={state.popperSize}
                  total={options.length}
                  v-slots={{
                    default: ({ data, index, style }: any) => {
                      const item = data[index];
                      return (
                        <SelectOption
                          item={item}
                          index={index}
                          style={style}
                          selected={isItemSelected(item)}
                          hovering={state.hoveringIndex === index}
                          onHover={handleItemHover}
                          onSelect={handleItemSelect} />
                      )
                    }
                  }} />
              )
            }} />
        </div>
      );
    };
  }
});
