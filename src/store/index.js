import { createStore } from "vuex";
import axios from "axios";

const token = "edd628ed7674144b0213266e5cf13ca5b57c3027";
export default createStore({
  state: {
    tasksForToday: [],
    allActiveTask: [],
    addNewTask: {},
    todayDate: "",
    task: {},
    allComment: [],
    singleId: "",
    date: "",
  },
  mutations: {
    setAllTasksForToday: (state, payload) => {
      state.tasksForToday = payload.tasksForToday;
    },
    setAllActiveTask: (state, payload) => {
      state.allActiveTask = payload.allActiveTask;
    },
    getTaskData: (state, payload) => {
      state.task = payload.task;
      state.date = payload.task.due.string;
    },
    setNewTasks: (state, payload) => {
      console.log(state.todayDate);
      if (payload.addNewTask.due.string === state.todayDate) {
        state.tasksForToday.push(payload.addNewTask);
      }
      state.allActiveTask.push(payload.addNewTask);
    },
    closeTasks: (state, id) => {
      console.log(state, id);
    },
    getComment: (state, data) => {
      console.log(data);
      state.allComment = data;
    },
    addNewComment: (state, payload) => {
      state.allComment.push(payload.addComment);
    },
  },
  actions: {
    async getTasksForToday({ commit }) {
      await axios
        .get("https://api.todoist.com/rest/v1/tasks?filter=today", {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          commit("setAllTasksForToday", {
            tasksForToday: res.data,
          });
          // console.log(res.data);
        });
    },
    async getAllTasks({ commit }) {
      await axios
        .get("https://api.todoist.com/rest/v1/tasks", {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          commit("setAllActiveTask", {
            allActiveTask: res.data,
          });
        });
    },
    async getTask({ commit }, id) {
      await axios
        .get(`https://api.todoist.com/rest/v1/tasks/${id}`, {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // console.log(res.data);
          commit("getTaskData", {
            task: res.data,
          });
        });
    },
    async setNewTask({ commit }, value) {
      // console.log(value);
      await axios
        .post("https://api.todoist.com/rest/v1/tasks", value, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        })
        .then((res) => {
          // console.log(res.data);
          commit("setNewTasks", { addNewTask: res.data });
        })
        .catch((err) => console.log(err));
    },
    async closeTask({ commit }, id) {
      await axios
        .post(`https://api.todoist.com/rest/v1/tasks/${id}/close`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          commit("closeTasks", { id });
        })
        .catch((err) => console.log(err));
    },
    async getAllComments({ commit }, task_id) {
      await axios
        .get(`https://api.todoist.com/rest/v1/comments`, {
          params: {
            task_id: `${task_id}`,
          },
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          commit("getComment", res.data);
        })
        .catch((err) => console.log(err));
    },
    async createComment({ commit }, comment) {
      console.log(comment);
      await axios
        .post("https://api.todoist.com/rest/v1/comments", comment, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        })
        .then((res) => {
          console.log(res.data);
          commit("addNewComment", { addComment: res.data });
        })
        .catch((err) => console.log(err));
    },
  },
  getters: {
    allTasksForToday: (state) => {
      return state.tasksForToday;
    },
    allActiveTasks: (state) => {
      return state.allActiveTask;
    },
    getTasks: (state) => {
      return state.task;
    },
    getAllComment: (state) => {
      return state.allComment;
    },
  },
});
