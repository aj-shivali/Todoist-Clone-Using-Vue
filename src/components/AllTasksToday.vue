<template>
  <div>
    <h3 id="today-heading">
      Today <span id="currentDate">{{ currentDate() }} </span>
    </h3>
    <task-item-today
      v-for="(tasks, id) in allTasksToday"
      :key="id"
      :isCollapsed="isCollapsed"
      :tasks="tasks"
    />
    <add-task-button />
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import TaskItemToday from "./TaskItemToday.vue";
import AddTaskButton from "./AddTaskButton.vue";
export default {
  components: { TaskItemToday, AddTaskButton },
  data() {
    return {
      days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      months: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    };
  },
  computed: {
    allTasksToday() {
      return this.$store.getters.allTasksForToday;
    },
  },
  methods: {
    ...mapActions(["getTasksForToday"]),
    currentDate() {
      const current = new Date();
      const day = this.days[current.getDay()];
      const month = this.months[current.getMonth()];
      const date = `${day} ${current.getDate()} ${month}`;
      return date;
    },
  },
  created() {
    this.$store.dispatch("getTasksForToday");
  },
};
</script>

<style>
#today-heading {
  font-size: calc(0.8rem + 0.6vw);
}
span {
  color: grey;
  font-size: 12px;
  font-weight: 400;
}
</style>
