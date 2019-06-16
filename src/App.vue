<template>
  <v-app>
    <v-content>
      <v-container style="max-width: 600px">
        <TodoHome />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import TodoHome from './views/TodoHome.vue'

export default {
  name: 'App',
  components: {
    TodoHome
  }
}
</script>
