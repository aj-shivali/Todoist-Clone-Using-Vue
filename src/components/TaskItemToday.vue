<template>
  <div>
    <div>
      <ul id="tasks">
        <li class="task-item">
          <button role="checkbox" checked="checked" class="today-btn">
            <div
              @mouseover="mousehover"
              @mouseleave="mousehover"
              class="complete-task-btn"
              :class="{ hover: over }"
              @click="markComplete"
            ></div>
          </button>
          <router-link :to="'/' + this.tasks.id">
            <div class="task-content">
              <div class="item-data">{{ this.tasks.content }}</div>
              <div class="item-due">
                <img src="../assets/smallcalender.svg" />
                {{ this.tasks.due.string }}
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    isCollapsed: Boolean,
    tasks: Object,
  },
  data() {
    return {
      over: false,
    };
  },
  methods: {
    mousehover() {
      this.over = !this.over;
    },
    markComplete() {
      this.$store.dispatch("closeTask", this.tasks.id);
    },
  },
};
</script>

<style>
.main-active {
  margin-left: 0 !important;
}
#tasks {
  list-style-type: none;
  margin-top: 25px;
}
.task-item {
  display: flex;
  padding: 10px 0 10px 0;
  border-bottom: 1px solid var(--tasks-border);
}
.task-content {
  margin-left: 15px;
}
.today-btn {
  text-decoration: none;
  border: none;
  background-color: transparent;
  padding: 0;
}
.complete-task-btn {
  margin-top: -15px;
  height: 15px;
  width: 15px;
  border: 1px solid #dcdcdc;
  border-radius: 50%;
  border-color: grey;
  color: grey;
  padding: 1px;
  background-color: transparent;
}
.task-item > button:checked {
  border-color: red;
}

.hover {
  border-color: var(--sidebar-hover);
  background-color: red;
  cursor: pointer;
}
.hover::after {
  content: "\2713";
  display: inline-block;
  padding: 0 2px 0 0;
  color: var(--bg-color);
  font-size: medium;
}
.item-due {
  color: #f86d63;
  font-size: 12px;
  font-weight: 400;
  margin: 2px;
  display: flex;
  align-items: center;
  align-content: center;
}
.item-due img {
  margin-right: 3px;
}
.task-item > a {
  margin: 0;
  display: block;
  text-align: unset;
}

@media (max-width: 700px) {
  #today-task {
    margin-left: none;
  }
}
</style>
