<template>
  <div id="app">
    <Todo pageTitle="Vue Tasks" />
  </div>
</template>

<script>
import Todo from './views/Todo';
export default {
  name: 'App',
  components: { Todo }
};
</script>
