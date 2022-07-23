import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Warning',
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
        <path d="M512 937c-41.9 0-75.9-34-75.9-75.9s34-75.9 75.9-75.9 75.9 34 75.9 75.9-34 75.9-75.9 75.9zm-30.2-270.5l-45.5-500.9c-.1-.9-.1-1.8-.1-2.7 0-41.9 34-75.9 75.9-75.9s75.9 34 75.9 75.9c0 .9 0 1.8-.1 2.7l-45.5 500.9c-3.5 36.8-57.3 36.8-60.6 0z"/>
      </svg>
    );
  }
});
