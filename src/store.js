import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const STORAGE_KEY = 'todos-vuetify'
const todoStorage = {
  fetch: function () {
    const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')

    return todos
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

export default new Vuex.Store({
  state: {
    todos: todoStorage.fetch(),
    filter: 'all'
  },

  getters: {
    todos: state => state.todos,
    remaining: state => state.todos.filter(item => !item.done).length,
    anyRemaining: (state, getters) => getters.remaining !== 0,
    todosFilter: (state) => {
      if (state.filter == 'all') {
        return state.todos
      } else if (state.filter == 'done') {
        return state.todos.filter(item => item.done)
      } else if (state.filter == 'active') {
        return state.todos.filter(item => !item.done)
      }
    }
  },

  mutations: {
    addTodo: (state, todo) => {
      state.todos.push({
        id: todo.id,
        title: todo.title,
        done: false,
        editing: false
      })
    },
    removeTodo: (state, id) => {
      const index = state.todos.findIndex(item => item.id === id)
      state.todos.splice(index, 1)
    },
    updateTodo: (state, todo) => {
      const index = state.todos.findIndex(item => item.id === todo.id)
      state.todos.splice(index, 1, {
        id: todo.id,
        title: todo.title,
        done: todo.done,
        editing: todo.editing
      })
    },
    toggleAll: (state, value) => {
      state.todos.forEach(item => (item.done = value))
    },
    updateFilter: (state, filter) => {
      state.filter = filter
    },
    clearCompleted: state => state.todos = state.todos.filter(item => !item.done)
  },

  actions: {
    addTodo({commit}, todo) {
      commit('addTodo', todo)
    },
    removeTodo({commit}, id) {
      commit('removeTodo', id)
    },
    updateTodo({commit}, todo) {
      commit('updateTodo', todo)
    },
    toggleAll({commit}, value) {
      commit('toggleAll', value)
    },
    updateFilter({commit}, filter) {
      commit('updateFilter', filter)
    },
    clearCompleted({commit}) {
      commit('clearCompleted')
    }
  },

  plugins: [store => {
    store.subscribe((mutation, {todos}) => {
      todoStorage.save(todos)
    })
  }]
})
