<template>
  <div id="app">
    <div class="navigation">
      <button @click="$router.push('/rendering')">Rendering</button>
      <button @click="$router.push('/animation')">Animation</button>
    </div>
    <component :is="currentView" 
    v-bind="{ createRows, addRows, removeRows, data }"/>
    <table class="data-table">
      <tbody>
        <Row v-for="item in data"
             :key="item.id"
             :rowId="item.id"
             :rowLabel="item.label"
             class="data-row" />
      </tbody>
    </table>
  </div>
</template>

<script>
import Row from './components/Row.vue'
import Rendering from './components/Rendering.vue';
import Animation from './components/Animation.vue';
import buildData from './dummyData'

export default {
  name: 'app',
  components: {
    Rendering,
    Row,
    Animation
  },
  data() {
    return {
      currentView: 'Rendering',
      numberOfRows: 0,
      data: [],
    }
  },
  watch: {
    '$route'(to) {
      if (to.path === '/rendering') {
        this.currentView = 'Rendering';
      } else if (to.path === '/animation') {
        this.currentView = 'Animation';
      } else {
        this.currentView = null;
      }
    }
  },

  methods: {
    addRows(amount) {
      this.numberOfRows = this.numberOfRows + amount;
      let data = this.data;
      this.data = data.concat(buildData(amount))
    },
    createRows(amount) {
      this.numberOfRows = amount;
      this.data = buildData(this.numberOfRows);
    },
    removeRows() {
      this.numberOfRows = 0;
      this.data = [];
    },
  },
  created() {
    if (this.$route.path === '/rendering') {
      this.currentView = 'Rendering';
    } else if (this.$route.path === '/animation') {
      this.currentView = 'Animation';
    } else {
      this.currentView = null;
    }
  }
}
</script>

<style scoped>
/* Twoje style */
</style>