<template>
  <div class="todo-list-container">
    <h3 v-if="pageTitle !== undefined">{{ pageTitle }}</h3>
    <a-row>
      <a-col>
        <a-row>
          <a-col :md="8" :xs="24" :sm="24">
            <a-input v-model="text" @keypress.enter="fnSubmit" />
          </a-col>
        </a-row>
        <a-row>
          <a-col :md="8" :xs="24" :sm="24">
            <a-list item-layout="horizontal" :data-source="list">
              <a-list-item slot="renderItem" slot-scope="item">
                <a slot="actions" @click="fnRemove(item)">remove</a>
                <a-list-item-meta :description="item.key">
                  <a slot="title" href="javascript:">{{ item.text }}</a>
                  <a-avatar
                    slot="avatar"
                    src="https://os.alipayobjects.com/rmsportal/UXamdIxYSkXfoVo.jpg"
                  />
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { v4 as uuid } from 'uuid';
export default {
  name: 'Todo',
  props: ['pageTitle'],
  data: () => ({
    text: '',
    list: []
  }),

  created() {
    window.addEventListener('@atlas/react-todo-list/add-task', this.fnAdd);
    if (localStorage.getItem('@atlas/vue-todo-list')) {
      this.list = JSON.parse(localStorage.getItem('@atlas/vue-todo-list'));
    }
  },

  destroyed() {
    window.removeEventListener('@atlas/react-todo-list/add-task', this.fnAdd);
  },

  methods: {
    fnStore(val) {
      localStorage.setItem('@atlas/vue-todo-list', JSON.stringify(val));
    },
    fnSubmit() {
      this.list.push({ key: uuid(), text: this.text });
      this.fnStore(this.list);
      this.text = '';
    },
    fnAdd(val) {
      this.list.push(Object.assign(val.detail, { key: uuid() }));
      this.fnStore(this.list);
    },
    fnRemove(val) {
      const newList = this.list.filter(item => item.key !== val.key);
      this.list = newList;
      localStorage.setItem('@atlas/vue-todo-list', JSON.stringify(newList));
    }
  }
};
</script>

<style lang="scss" scoped>
.todo-list-container {
  margin: 14px;
}
</style>
