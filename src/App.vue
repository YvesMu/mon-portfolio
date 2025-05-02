<template>
  <div id="app">
    <Header /> <!-- Ceci reste fixe sur toutes les pages -->
    <router-view /> <!-- Ceci change selon la route -->
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  name: 'App',
  components: {
    Header,
  },
};
</script>

<style>
body{
  margin: 0 !important;
}
</style>
