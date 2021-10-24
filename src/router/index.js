import { createRouter, createWebHashHistory } from "vue-router";
import AllTasksToday from "../components/AllTasksToday.vue";
import AllTaskInbox from "../components/AllTaskInbox.vue";
import SubtaskInbox from "../components/SubtaskInbox.vue";
import SubTaskToday from "../components/SubTaskToday.vue";
const routes = [
  {
    path: "/",
    name: "today",
    component: AllTasksToday,
  },
  {
    path: "/inbox",
    name: "inbox",
    component: AllTaskInbox,
    children: [
      {
        path: "/subtask/:id",
        name: "Subtask",
        component: SubtaskInbox,
      },
    ],
  },
  {
    path: "/Today",
    name: "Today",
    component: AllTasksToday,
    children: [
      {
        path: "/:id",
        name: "subTask",
        component: SubTaskToday,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
