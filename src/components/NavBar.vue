<template>
  <div class="navbar">
    <div class="icons">
      <i class="fal fa-bars" @click="collapse"></i>
      <i class="fal fa-home-alt"></i>
      <div class="search">
        <i class="fal fa-search"></i>
        <input
          type="text"
          placeholder="search"
          @keyup="
            (e) => {
              if (e.keyCode === 13) {
                this.search = e.target.value;
                e.target.value = '';
                this.filterItems();
              }
            }
          "
        />
      </div>
    </div>
    <div class="icons">
      <i v-if="isActiveLight" @click="toggleTheme" class="fad fa-sun"></i>
      <i v-else @click="toggleTheme" class="fal fa-moon"></i>
      <i class="fal fa-plus"></i>
      <i class="fal fa-question-circle"></i>
      <i class="fal fa-bell"></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActiveLight: true,
      search: "",
    };
  },
  methods: {
    toggleTheme() {
      this.isActiveLight = !this.isActiveLight;
      this.$emit("toggleTheme");
    },
    collapse() {
      this.$emit("collapse");
    },
    filterItems() {
      if (this.$route.fullPath === "/Today") {
        const filterItem = this.$store.state.tasksForToday.filter(
          (e) => e.content.toLowerCase() === this.search.toLowerCase()
        );
        this.$store.state.tasksForToday = filterItem;
      } else if (this.$route.fullPath === "/inbox") {
        const filterItem = this.$store.state.allActiveTask.filter(
          (e) => e.content.toLowerCase() === this.search.toLowerCase()
        );
        this.$store.state.allActiveTask = filterItem;
      }
    },
  },
};
</script>
<style>
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  background-color: var(--nav-color);
  /* height: 50px; */
  z-index: 2;
  color: var(--nav-text);
  align-content: space-between;
  justify-content: space-between;
}
.icons {
  display: flex;
  padding: 15px;
}
.search {
  background-color: var(--search-bg);
  height: 25px;
  border-radius: 3px;
  margin-left: 9px;
  margin-bottom: 4px;
  width: auto;
}
.search > i {
  font-size: unset;
}
.search > input {
  border: none;
  height: 20px;
  /* padding: 5px 5px 9px 5px; */
  margin-top: 5px;
  background-color: transparent;
  color: var(--nav-text);
}
:focus-visible {
  outline: none;
  outline-offset: 0;
  border: none;
}
.search > input::placeholder {
  color: var(--text-color);
}
i {
  margin: 0 9px;
  font-size: x-large;
  font-weight: 400;
}

@media (max-width: 700px) {
  .navbar {
    height: 40px;
  }
  i {
    margin: 0 5px;
    font-size: medium;
    font-weight: 400;
  }
  .search {
    margin-top: -5px;
  }
  .search > input {
    border: none;
    width: 90px;
    height: 13px;
    /* padding: 5px 5px 9px 5px; */
  }
  .search > i {
    font-size: smaller;
  }
}
</style>
