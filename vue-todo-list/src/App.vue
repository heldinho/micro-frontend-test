<template>
  <div id="app">
    <Content>
      <Todo pageTitle="Vue Tasks" />
      <Tabs />
      <button class="ant-btn ant-btn-primary">Teste de css atlas</button>
      <a-button type="primary">Teste de css</a-button>
      <button class="ant-btn">Teste</button>
    </Content>
  </div>
</template>

<script>
import Content from './views/Client';
import Todo from './views/Todo';
import Tabs from './components/Tabs';
export default {
  name: 'App',
  components: { Todo, Tabs, Content }
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
