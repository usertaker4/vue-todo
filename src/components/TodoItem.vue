<template>
  <v-list-tile class="px-0">
    <v-list-tile-action>
      <v-checkbox
        v-model="done"
        color="blue lighten-2"
        @change="doneEdit"
      ></v-checkbox>
    </v-list-tile-action>
    <template v-if="!editing">
      <v-list-tile-content
        :class="{'blue--text text--lighten-2': done}"
        @dblclick="editTodo(todo)"
      >
        <v-list-tile-title>{{title}}</v-list-tile-title>
      </v-list-tile-content>

      <v-list-tile-action>
        <v-btn
          flat
          icon
          color="red lighten-2"
          @click="removeTodo(todo.id)"
        >
          <v-icon>close</v-icon>
        </v-btn>
      </v-list-tile-action>
    </template>
    <v-text-field
      v-model="title"
      v-else
      flat
      solo
      hide-details
      @blur="doneEdit"
      @keydown.enter="doneEdit"
      @keydown.esc="cancelEdit"
      autofocus
    ></v-text-field>
  </v-list-tile>
</template>

<script>
export default {
  name: 'TodoItem',

  props: {
    todo: {
      type: Object,
      required: true
    },
    toggleAll: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      id: this.todo.id,
      title: this.todo.title,
      done: this.todo.done,
      editing: this.todo.editing,
      beforeEditValue: ''
    }
  },

  watch: {
    toggleAll() {
      this.done = this.toggleAll ? true : this.todo.done
    }
  },

  methods: {
    removeTodo(id) {
      this.$store.dispatch('removeTodo', id)
    },
    editTodo() {
      this.beforeEditValue = this.title
      this.editing = true
    },
    doneEdit() {
      if (this.title.trim() === '') {
        this.title = this.beforeEditValue
      }
      this.editing = false
      this.$store.dispatch('updateTodo', {
        id: this.id,
        title: this.title,
        done: this.done,
        editing: this.editing
      })
    },
    cancelEdit() {
      this.title = this.beforeEditValue
      this.editing = false
    }
  }
}
</script>

<style>
.v-text-field .v-input__slot{
  padding: 0 !important;
}
</style>
