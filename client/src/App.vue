<template>
  <Main />
</template>

<script>
import Main from './components/Main.vue'

export default {
  name: 'App',
  components: {
    Main
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

html,body, #app {
  margin:0;
  padding:0;
  width: 100%;
  height: 100%;
  background: #000;
  color: #fff;
  overflow:hidden;
  font-family: 'Roboto', sans-serif;
}
p {
  margin: 0;
  padding:0;
}
</style>
