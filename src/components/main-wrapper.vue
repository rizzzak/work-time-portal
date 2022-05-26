<template>
  <div>
    <Navbar></Navbar>
  </div>
</template>

<script>
import Navbar from "/src/components/Navbar"
export default {
  name: "main-wrapper",
  components: { Navbar },
}
</script>

<style>
.manager_el{
  padding:15px;
  text-align: center;

}
table{
  border-spacing:10px;
  margin:auto;
}
td{
  vertical-align: center;
}
.inner_el{
  text-align:center;
  padding-left:13px;
  max-width:80px;
}
.table_el{
  padding-top: 50px;
}
</style>