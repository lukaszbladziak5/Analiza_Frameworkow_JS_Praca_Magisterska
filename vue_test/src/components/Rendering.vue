<template>
  <div>
    <div id="rendering" class="rendering-container">
      <img alt="Logo" src="../assets/logo.png">
      <div class="framework">
        <h1> Vue Rendering Test </h1>
      </div>
      <div class="buttons-container">
        <button class="Btn" @click="createRows(1000)"> Create 1 000 rows </button>
        <button class="Btn" @click="createRows(10000)"> Create 10 000 rows </button>
        <button class="Btn" @click="removeRows()"> Clear </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    createRows: Function,
    removeRows: Function,
  },
}
</script>

<style scoped>

.rendering-container {
  position: fixed;
  background-color: rgb(222, 222, 222);
  width: 1200px;
  height: 130px;
  border: solid 1px;
  left: 0;
  right: 0;
  margin-right: auto;
  margin-left: auto;
  margin-top: 1px;
}

img {
  height: 118px;
  float: left;
}

.framework {
  float: left;
  font-size: 25px;
  margin-left: 10px;
  color: black;
}

.buttons-container {
  width: 600px;
  height: 200px;
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
  padding-top: 140px;
  margin-left: auto;
  margin-right: auto;
  border-spacing: 2px;
}

</style>
