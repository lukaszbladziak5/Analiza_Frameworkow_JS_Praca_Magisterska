<template>
  <div>
    <div id="server-container" class="server-container">
      <img alt="Logo" src="../assets/logo.png">
      <div class="framework">
        <h1>Vue Server Test</h1>
      </div>

      <div class="buttons-container">
        <button class="Btn" @click="onCreateOneThousandRows(1000)">Create 1 000 rows</button>
        <button class="Btn" @click="onCreateTenThousandsRows(10000)">Create 10 000 rows</button>
        <button class="Btn" @click="onGetOneThousandRows()">Read 1 000 rows collection</button>
        <button class="Btn" @click="onGetTenThousandsRows()">Read 10 000 rows collection</button>
        <button class="Btn" @click="onUpdateOneThousandRows(1000)">Update 1 000 rows collection</button>
        <button class="Btn" @click="onUpdateTenThousandsRows(10000)">Update 10 000 rows collection</button>
        <button class="Btn" @click="onRemove()">Clear page</button>
        <button class="Btn" @click="clearDatabase()">Delete data from database</button>
      </div>
    </div>

    <div id="app">
      <table class="data-table">
        <tbody>
          <tr v-for="row in data" :key="row.id">
            <td>{{ row.id }}</td>
            <td>{{ row.label }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
import buildData from '../dummyData.js';

export default {
name: 'ServerComponent',
data() {
  return {
    numberOfRows: 0,
    data: [],
    databaseLink: 'https://analiza-frameworkow-js-default-rtdb.firebaseio.com/data'
  };
},
methods: {
  buildData(count) {
    return buildData(count);
  },
  async onCreateOneThousandRows(num) {
    this.numberOfRows = num;
    const newData = this.buildData(num);

    const startTime = performance.now();
    try {
      const response = await axios.post(`${this.databaseLink}/api/oneThousandRowsCollections.json`, newData);
      const endTime = performance.now();
      console.log(`POST 1 000 rows time: ${endTime - startTime} ms`);
      console.log('Data added to Firebase', response);
    } catch (error) {
      console.error(error);
    }
  },
  async onCreateTenThousandsRows(num) {
    this.numberOfRows = num;
    const newData = this.buildData(num);

    const startTime = performance.now();
    try {
      const response = await axios.post(`${this.databaseLink}/api/tenThousandsRowsCollections.json`, newData);
      const endTime = performance.now();
      console.log(`POST 10 000 rows: ${endTime - startTime} ms`);
      console.log('Data added to Firebase', response);
    } catch (error) {
      console.error(error);
    }
  },
  async onUpdateOneThousandRows(num) {
    this.numberOfRows = num;
    try {
      const response = await axios.get(`${this.databaseLink}/api/oneThousandRowsCollections.json`);
      if (response.data && typeof response.data === 'object') {
        const keys = Object.keys(response.data);
        keys.forEach(async key => {
          const newData = this.buildData(this.numberOfRows);
          const startTime = performance.now();
          const updateResponse = await axios.put(`${this.databaseLink}/api/oneThousandRowsCollections/${key}.json`, newData);
          const endTime = performance.now();
          console.log(`PUT 1 000 rows time: ${endTime - startTime} ms`);
          console.log(`Data updated in Firebase for key ${key}`, updateResponse);
        });
      }
    } catch (error) {
      console.error(error);
    }
  },
  async onUpdateTenThousandsRows(num) {
    this.numberOfRows = num;

    try {
      const response = await axios.get(`${this.databaseLink}/api/tenThousandsRowsCollections.json`);
      if (response.data && typeof response.data === 'object') {
        const keys = Object.keys(response.data);
        keys.forEach(async key => {
          const newData = this.buildData(this.numberOfRows);
          const startTime = performance.now();
          const updateResponse = await axios.put(`${this.databaseLink}/api/tenThousandsRowsCollections/${key}.json`, newData);
          const endTime = performance.now();
          console.log(`PUT 10 000 rows time: ${endTime - startTime} ms`);
          console.log(`Data updated in Firebase for key ${key}`, updateResponse);
        });
      }
    } catch (error) {
      console.error(error);
    }
  },
  async onGetOneThousandRows() {
    this.data = []; // Resetuj dane przed pobraniem nowych
    try {
      const response = await axios.get(`${this.databaseLink}/api/oneThousandRowsCollections.json`);
      if (response.data && typeof response.data === 'object') {
        const keys = Object.keys(response.data);
        keys.forEach(async key => {
          const startTime = performance.now();
          const dataResponse = await axios.get(`${this.databaseLink}/api/oneThousandRowsCollections/${key}.json`);
          if (dataResponse.data && typeof dataResponse.data === 'object') {
            const dataArray = Object.values(dataResponse.data);
            const newData = dataArray.map((item, index) => ({
              id: item.id !== undefined ? item.id : index,
              label: item.label !== undefined ? item.label : `Label ${index}`
            }));
            this.data = [...this.data, ...newData];
          }
          const endTime = performance.now();
          console.log(`GET 1 000 rows time: ${endTime - startTime} ms`);
          console.log('Data fetched from Firebase', this.data);
        });
      }
    } catch (error) {
      console.error('Error fetching keys:', error);
    }
  },
  async onGetTenThousandsRows() {
    this.data = []; // Resetuj dane przed pobraniem nowych
    try {
      const response = await axios.get(`${this.databaseLink}/api/tenThousandsRowsCollections.json`);
      if (response.data && typeof response.data === 'object') {
        const keys = Object.keys(response.data);
        keys.forEach(async key => {
          const startTime = performance.now();
          const dataResponse = await axios.get(`${this.databaseLink}/api/tenThousandsRowsCollections/${key}.json`);
          if (dataResponse.data && typeof dataResponse.data === 'object') {
            const dataArray = Object.values(dataResponse.data);
            const newData = dataArray.map((item, index) => ({
              id: item.id !== undefined ? item.id : index,
              label: item.label !== undefined ? item.label : `Label ${index}`
            }));
            this.data = [...this.data, ...newData];
          }
          const endTime = performance.now();
          console.log(`GET 10 000 rows time: ${endTime - startTime} ms`);
          console.log('Data fetched from Firebase', this.data);
        });
      }
    } catch (error) {
      console.error(error);
    }
  },
  onRemove() {
    this.numberOfRows = 0;
    this.data = [];
  },
  async clearDatabase() {
    const startTime = performance.now();
    try {
      const response = await axios.delete(`${this.databaseLink}.json`);
      const endTime = performance.now();
      console.log(`DELETE all rows in database time: ${endTime - startTime} ms`);
      console.log('Database cleared', response);
    } catch (error) {
      console.error(error);
    }
  }
}
};
</script>

<style scoped>
.server-container {
  position: fixed;
  background-color: rgb(222, 222, 222);
  width: 1200px;
  height: 300px;
  border: solid 1px;
  left: 0;
  right: 0;
  margin-right: auto;
  margin-left: auto;
  margin-top: 1px;
}

img {
  height: 298px;
  float: left;
}

.framework {
  float: left;
  font-size: 19px;
  margin-left: 10px;
  color: black;
}

.buttons-container {
  width: 600px;
  height: 300px;
  float: right;
}

.Btn {
  width: 250px;
  margin: 10px;
  color: white;
  padding: 10px 24px;
  background-color: #65d848;
  border-radius: 7px;
  border: none;
  font-size: 21px;
}

.Btn:hover {
  cursor: pointer;
}

.data-table {
  width: 1200px;
  padding-top: 310px;
  margin-left: auto;
  margin-right: auto;
  border-spacing: 2px;
}
</style>