<template>
  <main role="main" class="text-left">
    <div v-for="item in getAllPosts.data" :key="item.id">
      <div
        class="mt-1 p-3"
        :class="{
          organisation: item.postable_type == 'App\\Models\\Organisation',
          individual: item.postable_type == 'App\\Models\\User'
        }"
      >
        <p>
          <strong class=" text-gray-dark"
            ><a href="#" class="badge badge-primary px-3 mr-2" style="font-size:18px">{{
              item.postable.name
            }}</a></strong
          >
          <a href=""
            ><b>{{ item.title }}</b></a
          >
        </p>
        <p v-if="item.description.length < 350">{{ item.description }}</p>
        <p>{{ item.description.substring(0, 350) }} <a href="#" style="color:blue">...read more</a></p>
        <div>
          <span style="float: left">{{ item.readable_created_date }}</span>
          <b-badge class="ml-2" pill>Apply({{ item.applies.length }})</b-badge>
          <b-badge class="ml-2" pill variant="light">View({{ item.views.length }})</b-badge>
          <b-badge class="ml-2" pill variant="success">Interested({{ item.interesteds.length }})</b-badge>

          <a href="#" style="float: right" class="mx-1" v-for="tag in item.tags" :key="tag.id">
            {{ tag.name }}
          </a>
          <span style="float: right"> Tags</span>
        </div>
      </div>
    </div>
    <pagination
      align="left"
      :data="getAllPosts"
      :limit="5"
      @pagination-change-page="getResults"
      :show-disabled="true"
      class="mt-3"
    >
      <span slot="prev-nav">&lt; Previous</span>
      <span slot="next-nav">Next &gt;</span>
    </pagination>
  </main>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
Vue.component('pagination', require('laravel-vue-pagination'));

export default Vue.extend({
  name: 'Joblist',
  data() {
    return {
      loadMore: true,
      page: 1
    };
  },
  created() {
    this.getResults();
  },
  methods: {
    ...mapActions(['getPosts']),
    getResults(page = 1) {
      this.getPosts(page);
    }
  },
  computed: {
    ...mapGetters(['getAllPosts'])
  }
});
</script>
<style scoped>
p {
  font-size: 16px;
}
.organisation {
  border-left: 4px solid green;
  background-color: #e6ffe6;
}
.individual {
  border-left: 4px solid red;
  background-color: #ffe6e6;
}
</style>
