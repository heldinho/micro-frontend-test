<template>
  <div id="app">
    <Todo pageTitle="Vue Tasks" />
    <Tabs />
    <button class="ant-btn ant-btn-primary">Teste de css atlas</button>
    <a-button type="primary">Teste de css</a-button>
    <button>Teste</button>
  </div>
</template>

<script>
import Todo from './views/Todo';
import Tabs from './components/Tabs';
export default {
  name: 'App',
  components: { Todo, Tabs }
};
</script>

<style lang="scss">
*,
html,
body {
  user-select: none;
  outline: none;
}
</style>
