<template>
  <div id="app">
    <input v-model="text" @keypress.enter="fnSubmit" />
    <button>
      <div @click.self="fnSubmit">ADD</div>
      <div @click.self="fnGoogle">Acessar Google</div>
    </button>
    <ul>
      <li v-for="item in list" :key="item">{{ item }}</li>
    </ul>
    <input
      v-for="field in fields"
      :key="field.key"
      :type="field.type"
      :required="field.required"
      :readonly="field.readonly"
      :disabled="field.disabled"
      v-model="values[field.data]"
    />
    {{ values }}
  </div>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    text: "",
    list: [],
    values: {},
    fields: [
      {
        key: 1,
        data: "name",
        type: "text",
        required: true,
        readonly: false,
        disabled: false,
      },
      {
        key: 2,
        data: "age",
        type: "number",
        required: false,
        readonly: false,
        disabled: false,
      },
      {
        key: 3,
        data: "avatar",
        type: "file",
        required: true,
        readonly: false,
        disabled: false,
      },
    ],
  }),
  methods: {
    fnSubmit() {
      this.list.push({ text: this.text });
      localStorage.setItem("@atlas/vue-todo-list", JSON.stringify(this.list));
      this.text = "";
      console.log(typeof list);
    },
    fnGoogle() {
      window.location.href = "www.google.com";
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
