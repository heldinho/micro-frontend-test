<template>
  <div id="app">
    <input class="inputs" v-model="text" @keypress.enter="fnSubmit" />
    <ul>
      <li v-for="item in list" :key="item">{{ item }}</li>
    </ul>
    <div v-for="field in fields" :key="field.key">
      <label>{{ field.label }}</label>
      <input
        class="inputs"
        :type="field.type"
        :required="field.required"
        :readonly="field.readonly"
        :disabled="field.disabled"
        v-model="values[field.data]"
      />
    </div>
    <pre>{{ values }}</pre>
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
        label: "Nome: ",
        data: "name",
        type: "text",
        required: true,
        readonly: false,
        disabled: false,
      },
      {
        key: 2,
        label: "Idade: ",
        data: "age",
        type: "number",
        required: false,
        readonly: false,
        disabled: false,
      },
    ],
  }),

  updated() {
    console.log(typeof this.list);
    dispatchEvent(
      new CustomEvent("@atlas/vue-todo-list", {
        list: this.list,
      })
    );
  },

  methods: {
    fnSubmit() {
      this.list.push({ text: this.text });
      localStorage.setItem("@atlas/vue-todo-list", JSON.stringify(this.list));
      this.text = "";
      console.log(typeof this.list);
      dispatchEvent(
        new CustomEvent("@atlas/vue-todo-list", {
          list: this.list,
        })
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.inputs {
  padding: 10px;
  background-color: #eee;
  outline: none;
  border: 1px solid #ccc;
  &:focus {
    border-color: #999;
  }
}
</style>
