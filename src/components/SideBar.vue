<template>
  <div
    id="Sidebar"
    class="sidebar"
    @mousemove="addPlus"
    @mouseleave="removePlus"
  >
    <ul>
      <li>
        <router-link to="/inbox">
          <span
            ><svg width="24" height="24" viewBox="0 0 24 24">
              <g fill="#5297FF" fill-rule="nonzero">
                <path
                  d="M10 14.5a2 2 0 104 0h5.5V18a1.5 1.5 0 01-1.5 1.5H6A1.5 1.5 0 014.5 18v-3.5H10z"
                  opacity="0.1"
                ></path>
                <path
                  d="M8.062 4h7.876a2 2 0 011.94 1.515l2.062 8.246a2 2 0 01.06.485V18a2 2 0 01-2 2H6a2 2 0 01-2-2v-3.754a2 2 0 01.06-.485l2.06-8.246A2 2 0 018.061 4zm0 1a1 1 0 00-.97.757L5.03 14.004a1 1 0 00-.03.242V18a1 1 0 001 1h12a1 1 0 001-1v-3.754a1 1 0 00-.03-.242l-2.06-8.247A1 1 0 0015.94 5H8.061zM12 17.25A2.75 2.75 0 019.295 15H7a.5.5 0 110-1h2.75a.5.5 0 01.5.5 1.75 1.75 0 003.5 0 .5.5 0 01.5-.5H17a.5.5 0 110 1h-2.295A2.75 2.75 0 0112 17.25z"
                ></path>
              </g></svg
          ></span>
          <a class="anchor" id="inbox" href="#">Inbox</a>
        </router-link>
      </li>
      <li>
        <router-link to="/Today">
          <span
            ><svg width="24" height="24" viewBox="0 0 24 24">
              <g fill="#25B84C" fill-rule="evenodd">
                <path
                  fill-rule="nonzero"
                  d="M6 4.5h12A1.5 1.5 0 0 1 19.5 6v2.5h-15V6A1.5 1.5 0 0 1 6 4.5z"
                  opacity=".1"
                ></path>
                <path
                  fill-rule="nonzero"
                  d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6zm1 3h10a.5.5 0 1 1 0 1H7a.5.5 0 0 1 0-1z"
                ></path>
                <text
                  font-family="-apple-system, system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"
                  font-size="9"
                  transform="translate(4 2)"
                  font-weight="500"
                >
                  <tspan x="8" y="15" text-anchor="middle">01</tspan>
                </text>
              </g>
            </svg></span
          >

          <a id="today" href="#">Today</a>
        </router-link>
      </li>
      <li>
        <router-link to="/">
          <span
            ><svg width="24" height="24" viewBox="0 0 24 24">
              <g fill="#A970FF" fill-rule="nonzero">
                <path
                  d="M6 4.5h12A1.5 1.5 0 0119.5 6v2.5h-15V6A1.5 1.5 0 016 4.5z"
                  opacity="0.1"
                ></path>
                <path
                  d="M6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2zm0 1a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V6a1 1 0 00-1-1H6zm10 12a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zm8-4a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zM7 8h10a.5.5 0 110 1H7a.5.5 0 010-1z"
                ></path>
              </g></svg></span
          ><a href="#">Upcoming</a>
        </router-link>
      </li>
    </ul>
    <div class="accordion">
      <div
        class="item-accordion"
        @click="showProject"
        :class="{ activeAdd: plus, activeAcc: isProject }"
      >
        <div class="label">Project</div>
        <div class="content">
          <ul>
            <li>
              Welcome
                  <img
                    class="emoji"
                    draggable="false"
                    alt="👋"
                    src="https://twemoji.maxcdn.com/v/13.1.0/72x72/1f44b.png"/>
            </li>
            <li>Try Boards</li>
          </ul>
        </div>
      </div>
      <div
        class="item-accordion"
        @click="showLabel"
        :class="{ activeAdd: plus, activeAcc: isLabel }"
      >
        <div class="label">Labels</div>
        <div class="content">
          <span>Your list of labels will show up here.</span>
        </div>
      </div>
      <div
        class="item-accordion"
        @click="showFilters"
        :class="{ activeAdd: plus, activeAcc: isFilters }"
      >
        <div class="label">Filters</div>
        <div class="content">
          <ul>
            <li>Assigned to me</li>
            <li>Priority</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isCollapse: Boolean,
    showToday: Boolean,
    showInbox: Boolean,
  },
  data() {
    return {
      plus: false,
      isLabel: false,
      isProject: false,
      isFilters: false,
    };
  },
  methods: {
    addPlus() {
      this.plus = true;
    },
    removePlus() {
      this.plus = false;
    },
    showProject: function(e) {
      //   openAccordion = !openAccordion;
      this.isProject = !this.isProject;
      e.target.parentNode.classList.toggle("activeAcc");
    },
    showLabel: function(e) {
      this.isLabel = !this.isLabel;
      //   openAccordion = !openAccordion;
      e.target.parentNode.classList.toggle("activeAcc");
    },
    showFilters: function(e) {
      this.isFilters = !this.isFilters;
      //   openAccordion = !openAccordion;
      e.target.parentNode.classList.toggle("activeAcc");
    },
  },
  watch: {
    isCollapse: function() {
      const sidebar = document.getElementById("Sidebar");
      sidebar.classList.toggle("active");
    },
  },
};
</script>

<style>
.sidebar {
  height: 100%;
  width: 270px;
  position: fixed;
  z-index: 1;
  top: 62px;
  left: 0;
  background-color: var(--sidebar-color);
  overflow-x: hidden;
  transition: 0.2s;
  padding-top: 2%;
  color: var(--sidebar-text);
  transition: 0.2s;
}
.sidebar ul {
  padding-left: 0;
  /* margin-right: 4%; */
  /* margin-bottom: 0; */
}
.sidebar li {
  text-decoration: none;
  padding: 5px 0px 10px 32px;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 400;
  width: 100%;
  align-items: center;
  display: flex;
  transition: 0.3s;
  border-radius: 5px;
  margin: 2% 5% 2% 9%;
}

a {
  display: flex;
  text-align: center;
  text-decoration: none;
  color: var(--sidebar-text);
  margin-top: 5px;
  margin-left: 10px;
}
.sidebar li span {
  height: 14px;
  width: 14px;
  text-align: center;
  margin-right: 3%;
}
.sidebar li span > img {
  padding-bottom: 3px;
  height: 17px;
  width: 17px;
  text-align: center;
  /* margin-right: 3%; */
}
.sidebar li:hover {
  background-color: var(--sidebar-hover);
}

.accordion {
  height: auto;
  width: 90%;
  font-size: 0.9rem;
  margin-top: 7%;
}
.item-accordion {
  margin: 0;
}

.label {
  margin-left: 26%;
  height: 50px;
  cursor: pointer;
  font-weight: 700;
}
.label::before {
  content: "\203A";
  font-size: 25px;
  color: #686868;
  display: inline-block;
  position: relative;

  left: 0;
  margin-right: 10%;
  transition: 0.3s;
}
.label::after {
  font-size: 25px;
  position: relative;
  right: 0;
  color: #a0a0a0;
  font-weight: 50;

  margin-left: 40%;
  transition: 0.5s;
}
.activeAdd > .label::after {
  content: "+";
}

.content {
  color:var(--sidebar-text);
  height: 0;
  overflow: hidden;
  margin-left: 35px;
}
.activeAcc > .content {
  height: 100%;
}
.activeAcc > .label::before {
  transform: rotate(90deg);
  /* color: aqua; */
  /* background-color: aquamarine; */
}
.active {
  width: 0;
  transition-property: width;
  transition: 0.2s;
  right: 500px;
}
.emoji{
    height: 15px;
    margin-left:3px;
}
li{
  cursor: pointer;
}

@media (max-width: 700px) {
  .sidebar {
    z-index: 1;
    top: 42px;
  }
}
</style>
