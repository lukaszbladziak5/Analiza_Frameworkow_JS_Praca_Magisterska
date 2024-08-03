<template>
  <div id="app">
    <Menu v-bind="{createRows, addRows, removeRows}" />
    <table class="data-table">
      <tbody>
        <Row v-for="item in data"
        :rowId="item.id"
        :rowLabel="item.label"
        class="data-row" />
      </tbody>
    </table>
  </div>
</template>

<script>
import Menu from './components/Menu.vue'
import Row from './components/Row.vue'
import buildData from './dummyData'

export default {
  name: 'app',
  data() {
    return {
      numberOfRows: 0,
      data: [],
    }
  },
  components: {
    Menu,
    Row
  },
  methods: {
    addRows( amount) {
      this.numberOfRows = this.numberOfRows + amount;
      let data = this.data;
      this.data = data.concat(buildData(amount))
    },
    createRows( amount) {
      this.numberOfRows = amount;
      this.data = buildData(this.numberOfRows);
    },
    removeRows() {
      this.numberOfRows = 0;
      this.data = [];
    },
  },
}
</script>
