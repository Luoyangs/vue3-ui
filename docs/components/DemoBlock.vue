<script lang="tsx">
import { defineComponent, VNode } from 'vue'

export default defineComponent({
  name: 'DemoBlock',
  setup(_, { slots }) {
    const leftChildren: VNode[] = [];
    const rightChildren: VNode[] = [];
    const children = slots.default?.() || [];
    console.log('children', children, slots);
    children.forEach((demo, index) => {
      if (index % 2 === 0) {
        leftChildren.push(demo);
      } else {
        rightChildren.push(demo);
      }
    });

    return () => (
      <div class="demo-block">
        <div class="code-boxes-col-2-1">
          {leftChildren}
        </div>
        <div class="code-boxes-col-2-1">
          {rightChildren}
        </div>
      </div>
    );
  },
});
</script>
<style lang="scss" scoped>
.demo-block {
  display: flex;
  margin: 16px 0;
  margin-left: -8px;
  margin-right: -8px;
  row-gap: 0px;
  flex-flow: row wrap;
  overflow-x: hidden;
  .code-boxes-col-2-1 {
    flex: 0 0 50%;
    max-width: 50%;
    padding-left: 8px;
    padding-right: 8px;
  }
}
</style>