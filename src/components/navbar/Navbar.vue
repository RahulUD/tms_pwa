<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand>{{ text.HOST }}</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">
            sdsd
          </b-nav-item>
        </b-navbar-nav>

        <!-- <input
          class="form-control form-control-dark w-50 ml-auto"
          type="text"
          placeholder="Search"
          aria-label="Search"
        /> -->

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <!-- <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown> -->
          <Medialogin />
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div class="nav-scroller navbar-dark bg-dark shadow-sm">
      <nav class="nav nav-underline">
        <router-link class="nav-link active" to="/">All</router-link>
        <a class="nav-link" href="#">School</a>
        <a class="nav-link" href="#">Coaching</a>
        <a class="nav-link" href="#">Individual</a>
      </nav>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Medialogin from './Medialogin.vue';
import { mapActions, mapGetters } from 'vuex';
import { showToast } from '../../utility/commonMethod';
import { HOST } from '../../utility/Constants';

export default Vue.extend({
  name: 'Home',
  data() {
    return {
      text: {
        HOST: HOST
      }
    };
  },
  components: {
    Medialogin
  },
  computed: {
    ...mapGetters({
      toast: 'getToast'
    })
  },

  watch: {
    toast: {
      deep: true,
      handler() {
        showToast(this, this.toast.code, this.toast.title, this.toast.message);
      }
    }
  },

  created() {
    if (localStorage.getItem('auth')) {
      this.user();
    }
  },
  methods: {
    ...mapActions(['user'])
  }
});
</script>
