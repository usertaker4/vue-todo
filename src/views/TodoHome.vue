<template>
  <v-layout row wrap>
    <v-flex text-xs-center>
      <h1 class="blue--text text--lighten-1 display-4 font-weight-regular">todos</h1>
      <v-card>
        <v-list-tile>
          <v-list-tile-action>
            <v-checkbox
              v-if="todos.length > 0"
              @change="toggleAll" 
              color="blue lighten-1"
            ></v-checkbox>
            <v-icon
              color="blue lighten-1"
              v-else
            >check</v-icon>
          </v-list-tile-action>
          <v-text-field
            autofocus
            clearable
            v-model="newTodo"
            color="primary"
            flat
            hide-details
            placeholder="What needs to be done?"
            solo
            @keyup.enter="addTodo"
          ></v-text-field>
        </v-list-tile>
        <v-divider></v-divider>
        <v-card-actions v-if="todos.length > 0">
          <v-card-title class="pa-0 pl-2 blue--text text--lighten-1 body-2">
            {{remaining}} {{remaining | pluralize('item')}} left
          </v-card-title>
          <v-spacer></v-spacer>
          <v-btn-toggle 
            mandatory
            class="elevation-0"
            flat
          >
            <v-btn :disabled="todos.length === 0" color="blue lighten-1" small flat @click="updateFilter('all')">all</v-btn>
            <v-btn :disabled="todos.length === 0" color="blue lighten-1" small flat @click="updateFilter('done')">done</v-btn>
            <v-btn :disabled="todos.length === 0" color="blue lighten-1" small flat @click="updateFilter('active')">active</v-btn>
          </v-btn-toggle>
        </v-card-actions>
        <v-slide-y-transition
          group
        >
          <template v-for="todo in todosFilter">
            <v-divider :key="`${todo.id}-divider`"></v-divider>
            <TodoItem 
              :todo="todo" 
              :key="todo.id" 
              :toggleAll="!anyRemaining"
            />
          </template>
        </v-slide-y-transition>
      </v-card>
      <v-btn 
          block
          color="red lighten-2"
          dark
          class="body-2"
          :disabled="todos.length === remaining"
          @click="clearCompleted"
        >Clear completed</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import TodoItem from '@/components/TodoItem.vue'
import {mapGetters} from 'vuex'

export default {
  name: 'TodoHome',

  components: {
    TodoItem
  },

  data: () => ({
    newTodo: "",
  }),

  computed: {
    ...mapGetters(['todos', 'remaining', 'anyRemaining', 'todosFilter'])
  },

  filters: {
    pluralize: (number, word) => number === 1 ? word : (word + 's') 
  },

  methods: {
    addTodo() {
      if (this.newTodo.trim().length === 0) {
        return
      }

      this.$store.dispatch('addTodo', {
        id: Date.now(),
        title: this.newTodo
      })

      this.newTodo = ""
    },
    toggleAll() {
      this.$store.dispatch('toggleAll', this.anyRemaining)
    },
    updateFilter(filter) {
      this.$store.dispatch('updateFilter', filter)
    },
    clearCompleted() {
      this.$store.dispatch('clearCompleted')
    }
  }
}
</script>
