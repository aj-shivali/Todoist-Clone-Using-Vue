<template>
  <div>
    <h3 id="today-heading">Inbox</h3>
    <div>
      <task-item-inbox
        v-for="(tasks, id) in allActiveTasks"
        :key="id"
        :isCollapsed="isCollapsed"
        :tasks="tasks"
      />
    </div>
    <add-task-button />
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import TaskItemInbox from "./TaskItemInbox.vue";
import AddTaskButton from "./AddTaskButton.vue";
export default {
  components: { TaskItemInbox, AddTaskButton },
  data() {
    return {};
  },
  computed: {
    allActiveTasks() {
      return this.$store.getters.allActiveTasks;
    },
  },
  methods: {
    ...mapActions(["getAllTasks"]),
  },
  created() {
    this.$store.dispatch("getAllTasks");
  },
};
</script>

<style>
#today-heading {
  font-size: calc(1rem + 0.6vw);
}
span {
  color: grey;
  font-size: 12px;
  font-weight: 400;
}
</style>
