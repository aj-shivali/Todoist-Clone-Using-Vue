<template>
  <div class="add-task-group">
    <div
      class="add-task-btn"
      :class="[isOpen ? 'none' : '']"
      @click="openDialogue"
    >
      Add Task
    </div>
    <div class=" add-task" :class="[isOpen ? 'block' : 'none']">
      <input
        class="box-heading"
        id="content"
        type="text"
        placeholder="e.g., Family lunch on Sunday at 11am #Personal"
        @change="
          (e) => {
            this.value.content = e.target.value;
          }
        "
      />
      <input
        class="box-description"
        id="description"
        type="text"
        placeholder="Description"
        @change="
          (e) => {
            this.value.description = e.target.value;
          }
        "
      />
      <div class="btn-group">
        <button class="add-today-btn" id="today-add" @click="dateModal">
          <img src="../assets/sm_cal_green.svg" /> Today
        </button>
        <button class="add-inbox-btn">
          <img src="../assets/sm-inb.svg" /> Inbox
        </button>
      </div>
    </div>
    <div class="cancel-btn-group" :class="[isOpen ? 'flex' : 'none']">
      <button class="add-task-btn-1" @click="addTask()">Add Task</button>
      <button class="cancel-task-btn" @click="closeDialogue">Cancel</button>
    </div>
    <div id="datepicker-modal" class="date-modal">
      <div class="date-modal-content">
        <input
          id="date-input"
          type="date"
          max="2080-12-31"
          :class="{ none: !isOpen }"
          @click="storeDate"
          @change="storeDate"
        />
        <!-- <button id="save-date">Add</button> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
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
      isOpen: false,
      value: {
        content: "",
        due_string: "",
        due_lang: "en",
      },
      dueDate: "",
    };
  },
  methods: {
    ...mapActions(["setNewTask"]),
    openDialogue() {
      this.isOpen = true;
    },
    closeDialogue() {
      this.isOpen = false;
    },
    dateModal() {
      let datePickToday = document.getElementById("today-add");
      let todayModal = document.getElementById("datepicker-modal");
      todayModal.style.display = "none";

      var date = new Date();
      var month = this.pad2(date.getMonth() + 1); //months (0-11)
      var day = this.pad2(date.getDate()); //day (1-31)
      var year = date.getFullYear();

      var formattedDate = year + "-" + month + "-" + day;
      this.dueDate = formattedDate;
      console.log(this.dueDate);
      var dateInput = document.querySelector("#date-input");
      dateInput.setAttribute("min", formattedDate);
      dateInput.setAttribute("value", formattedDate);

      if (todayModal.style.display == "none") {
        todayModal.style.display = "block";
        document
          .querySelector("#date-input")
          .addEventListener("change", (e) => {
            if (e.target.value.length > 9) {
              datePickToday.innerHTML = `<img src='/img/sm_cal_green.aa630bd6.svg'> ${"  "}${this.dateToString(
                document.querySelector("#date-input").value
              )}`;

              todayModal.style.display = "none";
            }
          });
      } else {
        todayModal.style.display = "none";
      }
    },
    dateToString(DATE) {
      let day = DATE.split("-")[2];
      let m = DATE.split("-")[1];
      return day + " " + this.months[m - 1];
    },
    pad2(n) {
      return (n < 10 ? "0" : "") + n;
    },
    addTask() {
      this.$store.state.todayDate = this.dateToString(this.dueDate);
      this.$store.dispatch("setNewTask", this.value);
    },
    storeDate: function(e) {
      this.value.due_string = this.dateToString(e.target.value);
      console.log(this.value.due_string);
    },
  },
};
</script>

<style>
.add-task-group {
  margin-top: 2%;
}
.add-task-btn {
  color: var(--sidebar-text);
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
}
.add-task-btn:hover {
  color: red;
}
.add-task-btn::before {
  content: "    +    ";
  text-align: center;
  height: 20px;
  width: 20px;
  color: var(--sidebar-text);
  line-height: 15px;
  border-radius: 50%;
  padding: 3.5px 1.5px 0px 1.5px;
  text-align: center;
  font-size: 25px;
  margin-right: 1%;
}
.add-task-btn:hover::before {
  background-color: red;
  color: #fff;
}
.add-task {
  margin-top: -10px;
  /* margin-left: 32px; */
  height: 130px;
  width: 100%;
  border: 1px solid var(--add-tasks-border);
  position: relative;
  background-color: var(--bg-color);
  border-radius: 5px;
  display: none;
}
.btn-group {
  position: absolute;
  bottom: 10%;
  left: 2%;
}
.add-today-btn,
.add-inbox-btn {
  background-color: transparent;
  margin-right: 10px;
  padding: 2px 8px;
  font-size: 14px;
  color: var(--sidebar-text);
  border: 0.5px solid var(--add-tasks-border);
  border-radius: 5px;
  cursor: pointer;
}
.add-today-btn {
  color: #25b84c;
}
.box-heading,
.box-description {
  font-size: 14px;
  padding: 1%;
  background-color: transparent;
  width: 100%;
  border: none;
  color: #a0a0a0;
}
.box-heading:focus,
.box-description:focus {
  outline: none;
}

.cancel-btn-group {
  padding-top: 1%;
  /* display: flex; */
  display: none;
  /* margin-left: 32px; */
}

.add-task-btn-1 {
  color: var(--tasks-border) !important;
}

.add-task-btn-1,
.cancel-task-btn {
  /* background-color: transparent; */
  margin-right: 10px;
  padding: 6px 10px;
  font-size: 14px;
  white-space: nowrap;
  line-height: 18px;
  color: var(--sidebar-text);
  font-weight: 500;
  border: 0.5px solid #fff;
  border-radius: 5px;
  cursor: pointer;
}
.add-task-btn-1 {
  background-color: red;
  /* border: none; */
  border-color: #de4c4a;
}
.cancel-task-btn {
  background-color: transparent;
  border-color: #525252;

  transition: all 0.3s ease;
}
.cancel-task-btn:hover {
  background-color: var(--sidebar-hover);
  border: 1px solid #525252;
}
.date-modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  /* left: 480px; */
  /* top: 55%; */
  padding: 10px 0px 0px 0px;
  width: 25%; /* Full width */
  height: 40%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: var(--bg-color);
  border: none;
  /* background-color: rgba(0, 0, 0, 0.4); Black w/ opacity */
}

.date-modal-content {
  width: 90%;
}

input[type="date"] {
  background-color: #de4c4a;
  color: white;
  border-radius: 6px;
  border: none;
}
::-webkit-calendar-picker-indicator {
  background-color: #f86d63;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
}
#save-date {
  border-radius: 5px;
  background-color: #de4c4a;
  border: none;
}
.flex {
  display: flex;
}
.block {
  display: block;
}
.none {
  display: none;
}

@media (max-width: 700px) {
  .box-heading,
  .box-description {
    font-size: 12px;
  }
}
</style>
