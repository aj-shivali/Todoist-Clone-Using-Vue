<template>
  <div class="add-comment-container">
    <textarea
      type="text"
      placeholder="Write a comment"
      style="resize:none"
      @change="
        (e) => {
          this.commentBody.content = e.target.value;
          e.target.value = '';
        }
      "
    ></textarea>
    <div class="add-comment-icons-button">
      <div class="icons">
        <i class="fal fa-paperclip"></i>
        <i class="fal fa-microphone"></i>
        <i class="far fa-grin"></i>
      </div>
      <button @click="addNewComment">Add Comment</button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    id: Number,
  },
  data() {
    return {
      commentBody: {
        task_id: Number,
        content: "",
      },
    };
  },
  methods: {
    addNewComment() {
      this.commentBody.task_id = parseInt(this.id);
      this.$store.dispatch("createComment", this.commentBody);
    },
  },
};
</script>

<style>
.add-comment-container {
  height: 13vh;
  width: 88%;
  padding: 1%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  border-radius: 5px;
  border: 1px solid var(--add-tasks-border);
}
.add-comment-container:focus {
  border: 1px solid black;
}
.add-comment-container > textarea {
  height: 60px;
  width: 100%;
  border: none;
  background-color: var(--sidebar-color);
  border-bottom: 1px solid var(--add-tasks-border);
}
.add-comment-container > textarea:focus {
  outline: none;
}
.add-comment-icons-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.add-comment-icons-button > button {
  padding: 10px;
  background-color: var(--nav-color);
  border: none;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
}
.add-comment-icons-button > .icons > i {
  font-size: 16px;
  color: grey;
}

@media (max-width: 700px) {
  .add-comment-container {
    height: 13vh;
    width: 95%;
    padding: 1%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    border-radius: 5px;
    border: 1px solid var(--add-tasks-border);
  }
}
</style>
