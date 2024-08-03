<template>
  <div>
    <div id="menu" class="menu-container" >

      <img alt="Logo" src="../assets/logo.png">
      <div class="framework" >
        <h1> Vue Test </h1>
      </div>

      <div class="buttons-container">
        <button class="Btn" @click="createRows(1000)"> Create 1000 rows </button>
        <button class="Btn" @click="addRows(1000)"> Add 1000 rows </button>
        <button class="Btn" @click="createRows(10000)"> Create 10 000 rows </button>
        <button class="Btn" @click="addRows(10000)"> Add 10 000 rows </button>
        <button class="Btn" @click="removeRows()"> Clear </button>
      </div>
    </div>
  </div>
</template>

<script>
  export default  {
    props: ['createRows', 'addRows', 'removeRows'],
  }
</script>
