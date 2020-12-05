<template>
  <div class="home">
    <div class="container text-left">
      <div class="row">
        <!-- Post Content Column -->
        <div class="col-lg-8">
          <!-- Title -->
          <h2 class="mt-4">{{ getPostById.title }}</h2>

          <!-- Author -->
          <p class="lead">
            by <a href="#">{{ getPostById.postable.name }}</a>
          </p>

          <!-- Date/Time -->
          <p>Posted on {{ getPostById.wordable_created_date }}</p>

          <div class="alert alert-primary" role="alert">
            Last day to apply 5 august 2020
          </div>
          <!-- Post Content -->
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Description</h5>
              <p class="card-text">
                {{ getPostById.description }}
              </p>
            </div>
          </div>

          <div class="card mt-2">
            <div class="card-body">
              <h5 class="card-title">Venue</h5>
              <p class="card-text">
                {{
                  `${getPostById.addresses[0].address_line_1}, ${getPostById.addresses[0].address_line_2}, ${getPostById.addresses[0].city}, ${getPostById.addresses[0].distric}, ${getPostById.addresses[0].state}, ${getPostById.addresses[0].pin}`
                }}
              </p>
            </div>
          </div>

          <div class="card mt-2">
            <div class="card-body">
              <h5 class="card-title">Contacts</h5>
              <table class="table table-borderless">
                <tbody>
                  <tr v-for="contact in getPostById.contacts" :key="contact.id">
                    <td v-if="contact.contacttype_id == 1">Phone</td>
                    <td v-if="contact.contacttype_id == 2">Email</td>
                    <td v-if="contact.contacttype_id == 3">Website</td>
                    <td v-if="contact.contacttype_id == 4">Facebook</td>
                    <td v-else>Other</td>

                    <td>{{ contact.contact }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Comments Form -->
          <div class="card my-4">
            <h5 class="card-header bg-info text-light">Leave a Comment:</h5>
            <div class="card-body">
              <form>
                <div class="form-group">
                  <textarea class="form-control" rows="3"></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>

          <!-- Single Comment -->
          <div class="media mb-4">
            <img class="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt="" />
            <div class="media-body">
              <h5 class="mt-0">Commenter Name</h5>
              Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus
              odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate
              fringilla. Donec lacinia congue felis in faucibus.
            </div>
          </div>
        </div>

        <!-- Sidebar Widgets Column -->
        <div class="col-md-4">
          <!-- Search Widget -->
          <div class="card my-4">
            <div>
              <button type="button" class="btn btn-info btn-lg btn-block">Apply Here</button>
            </div>
          </div>

          <div class="card my-4">
            <div>
              <ul class="list-group">
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  View
                  <span class="badge badge-primary badge-pill">{{ getPostById.views.length }}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  Interested
                  <span class="badge badge-primary badge-pill">{{ getPostById.interesteds.length }}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  Apply
                  <span class="badge badge-primary badge-pill">{{ getPostById.applies.length }}</span>
                </li>
              </ul>
            </div>
          </div>

          <ul class="list-group">
            <li class="list-group-item" v-for="document in getPostById.documents" :key="document.id">
              <a href="#">{{ document.name }}</a>
            </li>
          </ul>

          <!-- Categories Widget -->
          <div class="card my-4">
            <h5 class="card-header bg-info text-light">Tags</h5>
            <div class="card-body">
              <div class="row">
                <div class="m-2" v-for="item in getPostById.tags" :key="item.id">
                  <b-badge variant="primary">{{ item.name }}</b-badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /.row -->
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default Vue.extend({
  name: 'Post',
  data() {
    return {};
  },
  created() {
    this.getPost(this.$route.params.id);
  },
  methods: {
    ...mapActions(['getPost'])
  },
  computed: {
    ...mapGetters(['getPostById'])
  }
});
</script>
