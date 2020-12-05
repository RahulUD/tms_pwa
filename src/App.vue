<template>
  <div id="app">
    <div id="overlay" v-if="loading" style="display : block; z-index : 1051">
      <div id="text"><img src="loader.gif" /></div>
    </div>
    <Navbar />
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Navbar from '@/components/navbar/Navbar.vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
  name: 'App',
  components: {
    Navbar
  },
  computed: {
    ...mapGetters({
      loading: 'getLoading'
    })
  }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#overlay {
  position: fixed;
  display: none;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  cursor: pointer;
}

#text {
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 50px;
  color: white;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}

a {
  &.router-link-exact-active {
    text-decoration: underline;
  }
}
</style>
