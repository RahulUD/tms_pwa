<template>
  <div>
    <b-nav-item-dropdown right v-if="auth_user.isAuthSuccessful">
      <template #button-content>
        <svg
          class="bd-placeholder-img mr-2 rounded"
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
          role="img"
          aria-label="Placeholder: 32x32"
        >
          <title>Placeholder</title>
          <rect width="100%" height="100%" fill="#e83e8c" />
          <text x="50%" y="50%" fill="#e83e8c" dy=".3em">32x32</text>
        </svg>
        <em>{{ auth_user.user.name }}</em>
      </template>
      <b-dropdown-item href="#">Profile</b-dropdown-item>
      <b-dropdown-item to="/dashboard">Dashboard</b-dropdown-item>
      <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
    </b-nav-item-dropdown>
    <b-nav-item href="#" v-else v-b-modal.login-model>{{ text.LOGIN }}</b-nav-item>
    <loginmodel />
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Loginmodel from '../../components/navbar/Loginmodel.vue';
import { mapActions, mapGetters } from 'vuex';
import { LOGIN } from '../../utility/Constants';
export default Vue.extend({
  data() {
    return {
      text: {
        LOGIN: LOGIN
      }
    };
  },
  methods: {
    ...mapActions(['logout'])
  },
  computed: {
    ...mapGetters({
      auth_user: 'getAuth'
    })
  },
  components: {
    Loginmodel
  }
});
</script>
<style></style>
