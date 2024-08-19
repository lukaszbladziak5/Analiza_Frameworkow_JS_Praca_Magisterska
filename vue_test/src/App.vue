<template>
  <div id="app">
    <div class="navigation">
      <button @click="$router.push('/rendering')">Rendering</button>
      <button @click="$router.push('/server')">Server</button>
      <button @click="$router.push('/animation')">Animation</button>
      <button @click="$router.push('/map')">Map</button>
    </div>
    <component :is="currentView" 
    v-bind="{ createRows, removeRows, data }"/>
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
import Map from './components/Map.vue';
import Server from './components/Server.vue';
import buildData from './dummyData'

export default {
  name: 'app',
  components: {
    Rendering,
    Row,
    Animation,
    Map,
    Server
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
      } else if (to.path === '/server') {
        this.currentView = 'Server';
      } else if (to.path === '/animation') {
        this.currentView = 'Animation';
      } else if (to.path === '/map') {
        this.currentView = 'Map';
      } else {
        this.currentView = null;
      }
    }
  },

  methods: {
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
    } else if (this.$route.path === '/server') {
      this.currentView = 'Server';
    } else if (this.$route.path === '/animation') {
      this.currentView = 'Animation';
    } else if (this.$route.path === '/map') {
      this.currentView = 'Map';
    } else {
      this.currentView = null;
    }
  }
}
</script>

<style scoped>
</style>