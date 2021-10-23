<template>
  <div class="container">
    <div class="subtask-container">
      <div class="header">
        <div style="display:flex;align-items:center">
          <img src="../assets/sm-inb.svg" />
          <span> &nbsp;Inbox</span>
        </div>
        <button @click="goBack">X</button>
      </div>
      <div class="get-task">
        <div class="heading">
          <div style="display:flex">
            <div class="complete-task-btn-comment"></div>
            <h3>{{ this.$store.state.task.content }}</h3>
          </div>
          <br />
          <p>{{ this.$store.state.task.description }}</p>
        </div>
      </div>
      <br />
      <div class="date-picker">
        <div class="item-due">
          <img src="../assets/smallcalender.svg" />
          {{ this.$store.state.date }}
        </div>
      </div>
      <div class="icon-group">
        <i @click="createComment" class="fal fa-tasks"></i>
        <i class="fal fa-tag"></i>
        <i class="far fa-flag-alt"></i>
        <i class="fal fa-alarm-clock"></i>
        <i class="fal fa-ellipsis-h"></i>
      </div>
      <br />
      <div class="comment-section">
        <ul>
          <li>Sub-task</li>
          <li class="li-active">
            Comment &nbsp; {{ this.getAllComment.length }}
          </li>
          <li>Activity</li>
        </ul>
      </div>
      <br />
      <div class="tab-container">
        <div class="tab-content" v-for="item in getAllComment" :key="item">
          <div class="comment-heading">
            <div class="user-icon">SP</div>
            <h3>
              Shivali P.<span>{{ item.posted }}</span>
            </h3>
          </div>
          <br />
          <div class="comment-body">
            <p>{{ item.content }}</p>
          </div>
          <br />
        </div>
      </div>
      <div class="add-comment">
        <add-comment :id="this.$store.state.singleId" />
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import AddComment from "./AddComment.vue";
export default {
  components: {
    AddComment,
  },
  data() {
    return {
      id: "",
      newcontent: this.$store.state.allComment,
    };
  },
  mounted() {
    const route = useRoute();
    this.id = route.params.id;
    this.$store.state.singleId = route.params.id;
    this.$store.dispatch("getTask", this.$store.state.singleId);
    this.$store.dispatch("getAllComments", this.$store.state.singleId);
    this.$store.state.allComment.map((e) => console.log("hello", e));
  },
  computed: {
    getTasks() {
      return this.$store.getters.getTasks;
    },
    getAllComment() {
      return this.$store.getters.getAllComment;
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    createComment() {
      console.log(this.$store.state.allComment[0]);
      console.log(this.newcontent);
      console.log(this.getAllComment[0]);
      // this.$store.dispatch("getAllComments", this.commentBody);
    },
  },
};
</script>

<style>
.container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.384);
  z-index: 1;
}
.subtask-container {
  width: 602px;
  padding: 2%;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background-color: var(--sidebar-color);
  box-sizing: border-box;
  height: 80vh;
  border-radius: 10px;
  box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.3);
}
.header > span {
  align-self: center;
}
.header {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.header > button {
  color: var(--sidebar-text);
  height: 30px;
  width: 30px;
  border: none;
  background: transparent;
  cursor: pointer;
  box-sizing: border-box;
  font-size: 20px;
}
.header > button:hover {
  background-color: var(--sidebar-hover);
}
.content {
  color: red;
}
.heading > p {
  font-size: 13px;
}
.icon-group {
  display: flex;
  justify-content: end;
}
.comment-section > ul {
  /* background-color: red; */
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid rgb(219, 219, 219);
}
.comment-section > ul > li {
  list-style: none;
  font-size: 13px;
  color: grey;

  padding: 1% 10% 1% 10%;
}
.li-active {
  font-weight: bold;
  color: var(--sidebar-text) !important;
  border-bottom: 1px solid black;
}
.tab-container {
  overflow-y: auto;
  max-height: 35vh;
  width: 100%;
}

.add-comment {
  box-sizing: border-box;
  width: 100%;
  position: absolute;
  bottom: 3%;
}
.icon-group > i {
  font-size: 16px;
  color: grey;
}
.user-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  border: 1px solid lightgreen;
  color: lightgreen;
}
.comment-heading {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 45%;
  align-items: center;
}
.comment-body {
  width: 100%;
  padding-left: 7%;
}
.comment-body > p {
  font-size: 14px;
}

.tab-container::-webkit-scrollbar {
  width: 5px;
}

.tab-container::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

.tab-container::-webkit-scrollbar-thumb {
  background-color: grey;
}
</style>
