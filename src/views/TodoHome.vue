<template>
  <v-layout row wrap>
    <v-flex text-xs-center>
      <h1 class="primary--text display-4 font-weight-regular h1">todos</h1>
      <v-card>
        <v-list-tile>
          <v-list-tile-action>
            <v-checkbox
              v-if="todos.length > 0"
              @change="toggleAll" 
              color="primary"
            ></v-checkbox>
            <v-icon
              color="primary"
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
        <v-card-actions>
          <span>Remaining: {{remaining}}</span>
          <v-spacer></v-spacer>
          <v-btn-toggle 
            mandatory 
            class="elevation-0" 
            flat
          >
            <v-btn :disabled="todos.length === 0" small flat @click="updateFilter('all')">all</v-btn>
            <v-btn :disabled="todos.length === 0" small flat @click="updateFilter('done')">done</v-btn>
            <v-btn :disabled="todos.length === 0" small flat @click="updateFilter('active')">active</v-btn>
          </v-btn-toggle>
          <v-spacer></v-spacer>
          <v-btn 
            small
            color="red" 
            flat 
            :disabled="todos.length === remaining"
            @click="clearCompleted"
          >Clear completed</v-btn>
        </v-card-actions>
        <v-list>
          <template v-for="todo in todosFilter">
            <v-divider :key="`${todo.id}-divider`"></v-divider>
            <TodoItem 
              :todo="todo" 
              :key="todo.id" 
              :toggleAll="!anyRemaining"
            />
          </template>
        </v-list>
      </v-card>
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
    idNewTodo: 3
  }),

  computed: {
    ...mapGetters(['todos', 'remaining', 'anyRemaining', 'todosFilter'])
  },

  methods: {
    addTodo() {
      if (this.newTodo.trim().length === 0) {
        return
      }

      this.$store.dispatch('addTodo', {
        id: this.idNewTodo,
        title: this.newTodo
      });

      this.newTodo = ""
      this.idNewTodo++
      console.log(this.remaining)
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

<style>
h1 {
  opacity: .7;
}
</style>

