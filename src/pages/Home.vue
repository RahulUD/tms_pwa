<template>
  <div class="home mt-1">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <Joblist />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Joblist from '../components/Joblist.vue';

export default Vue.extend({
  name: 'Home',
  components: {
    Joblist
  }
});
</script>
