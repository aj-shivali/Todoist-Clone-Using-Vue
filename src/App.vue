<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view/> -->
  <div>
    <nav-bar @toggleTheme="switchTheme" @collapse="collapseSidebar" />
    <side-bar
      :isCollapse="isCollapsed"
      :showToday="showToday"
      :showInbox="showInbox"
    />
    <div></div>
    <div class="today-task">
      <router-view />
    </div>
    <!-- <div class="today-task" v-if="showInbox">
      <all-tasks-inbox />
    </div> -->
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import SideBar from "./components/SideBar.vue";
// import AllTasksToday from "./components/AllTasksToday.vue";
// import AllTasksInbox from "./components/AllTasksInbox.vue";
export default {
  name: "app",
  components: {
    NavBar,
    SideBar,
    // AllTasksToday,
    // AllTasksInbox,
  },
  data() {
    return {
      isActiveLight: true,
      isCollapsed: false,
      showToday: true,
      showInbox: false,
    };
  },

  watch: {
    isCollapsed: function() {
      const today = document.querySelector(".today-task");
      today.classList.toggle("main-active");
    },
  },
  methods: {
    switchTheme() {
      if (this.isActiveLight) {
        this.isActiveLight = !this.isActiveLight;
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        this.isActiveLight = !this.isActiveLight;
        document.documentElement.setAttribute("data-theme", "light");
      }
    },
    collapseSidebar() {
      this.isCollapsed = !this.isCollapsed;
    },
    showTodayComponent() {
      this.showToday = true;
      this.showInbox = false;
    },
    showInboxComponent() {
      this.showInbox = true;
      this.showToday = false;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background-color: var(--bg-color);
  font-family: "Roboto", sans-serif;
  overflow: hidden;
}
:root {
  --bg-color: #fff;
  --nav-color: #db4c3f;
  --nav-text: #fff;
  --search-bg: #e27065;
  --search-bg: #e27065;
  --sidebar-color: #fafafa;
  --sidebar-text: #4b3f33;
  --sidebar-hover: #ececec;
  --tasks-border: #f0f0f0;
  --add-tasks-border: rgb(206, 203, 203);
}
[data-theme="light"] {
  --bg-color: #fff;
  --nav-color: #db4c3f;
  --nav-text: #fff;
  --search-bg: #e27065;
  --sidebar-color: #fafafa;
  --sidebar-text: #4b3f33;
  --tasks-border: #f0f0f0;
  --add-tasks-border: rgb(206, 203, 203);
}

[data-theme="dark"] {
  --bg-color: #1f1f1f;
  --nav-color: #282828;
  --search-bg: #363636;
  --sidebar-color: #282828;
  --sidebar-text: #fff;
  --sidebar-hover: #363636;
  --tasks-border: #363636;
  --add-tasks-border: #535353;
}
.today-task {
  transition: margin-left 0.5s;
  margin-left: 270px;
  padding: 2% 15% 15% 15%;
  margin-top: 50px;
  color: var(--sidebar-text);
}

@media (max-width: 700px) {
  .today-task {
    margin-left: 0;
  }
}
</style>
