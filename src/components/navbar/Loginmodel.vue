<template>
  <div>
    <b-modal id="login-model" centered title="BootstrapVue" hide-footer hide-header>
      <div class="form-signin">
        <div class="text-center mb-4">
          <!-- <img class="mb-4" src="../../assets/logo.png" alt="" width="72" height="72" /> -->
          <h3 class="h4 mb-3 font-weight-normal text-left">
            {{ text.HEADER_TEXT }}
          </h3>
        </div>

        <b-alert :show="auth_user.hasError" dismissible fade variant="danger">
          {{ auth_user.message }}
        </b-alert>

        <div class="form-label-group">
          <input
            type="email"
            id="email"
            v-model="form.email"
            class="form-control"
            v-bind:class="{ formFieldDanger: $v.form.email.$invalid && triggerValidation }"
            placeholder="Email"
          />
          <label for="inputEmail">{{ text.EMAIL_PLACEHOLDER }}</label>
        </div>

        <div class="form-label-group">
          <input
            v-bind:class="{ formFieldDanger: $v.form.password.$invalid && triggerValidation }"
            type="password"
            id="password"
            v-model="form.password"
            class="form-control"
            placeholder="Password"
          />
          <label for="inputPassword">{{ text.PASSWORD_PLACEHOLDER }}</label>
        </div>

        <div class="checkbox mb-3">
          <router-link to="/register">{{ text.REGISTER_TEXT }}</router-link>
        </div>
        <button class="btn btn-primary m-1" @click="submit">
          {{ text.BUTTON }}
        </button>
        <button class="btn btn-danger right m-1" @click="hide">
          {{ text.CANCEL_BUTTON }}
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { required, email } from 'vuelidate/lib/validators';

import { mapGetters } from 'vuex';
import {
  LOGIN_HEADER_TEXT,
  LOGIN_EMAIL_PLACEHOLDER,
  LOGIN_PASSWORD_PLACEHOLDER,
  LOGIN_REMEMBER_ME_TEXT,
  LOGIN_REGISTER_TEXT,
  LOGIN_BUTTON,
  LOGIN_CANCEL_BUTTON
} from '../../utility/Constants';
import { formInvalidityToast } from '../../utility/commonMethod';
export default Vue.extend({
  created() {
    this.form.device_name = window.navigator.platform;
  },
  data() {
    return {
      text: {
        HEADER_TEXT: LOGIN_HEADER_TEXT,
        EMAIL_PLACEHOLDER: LOGIN_EMAIL_PLACEHOLDER,
        PASSWORD_PLACEHOLDER: LOGIN_PASSWORD_PLACEHOLDER,
        REMEMBER_ME_TEXT: LOGIN_REMEMBER_ME_TEXT,
        REGISTER_TEXT: LOGIN_REGISTER_TEXT,
        BUTTON: LOGIN_BUTTON,
        CANCEL_BUTTON: LOGIN_CANCEL_BUTTON
      },
      form: {
        email: '',
        password: '',
        device_name: ''
      },
      errors: {},
      triggerValidation: false
    };
  },
  validations: {
    form: {
      email: {
        required,
        email
      },
      password: {
        required
      }
    }
  },
  components: {},
  computed: {
    ...mapGetters({
      auth_user: 'getAuth'
    }),
    isAuth: function() {
      return this.auth_user.isAuthSuccessful;
    },
    loginError: function() {
      return this.auth_user.hasError;
    }
  },

  watch: {
    loginError: function() {
      this.clearForm();
    },
    isAuth: function() {
      this.hide();
      this.clearForm();
    }
  },

  methods: {
    hide() {
      this.$bvModal.hide('login-model');
    },
    submit() {
      this.triggerValidation = true;
      if (!this.$v.$invalid) {
        this.$store.dispatch('login', this.form);
      } else {
        formInvalidityToast(this, this.$v.form.$params, this.$v.form);
      }
    },
    clearForm() {
      this.form.password = '';
    }
  }
});
</script>

<style scoped>
.form-signin {
  width: 100%;
  max-width: 420px;
  padding: 15px;
  margin: auto;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group input,
.form-label-group label {
  height: 3.125rem;
  padding: 0.75rem;
}

.form-label-group label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  margin-bottom: 0; /* Override default `<label>` margin */
  line-height: 1.5;
  color: #495057;
  pointer-events: none;
  cursor: text; /* Match the input under the label */
  border: 1px solid transparent;
  border-radius: 0.25rem;
  transition: all 0.1s ease-in-out;
}

.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group input:not(:-moz-placeholder-shown) {
  padding-top: 1.25rem;
  padding-bottom: 0.25rem;
}

.form-label-group input:not(:-ms-input-placeholder) {
  padding-top: 1.25rem;
  padding-bottom: 0.25rem;
}

.form-label-group input:not(:placeholder-shown) {
  padding-top: 1.25rem;
  padding-bottom: 0.25rem;
}

.form-label-group input:not(:-moz-placeholder-shown) ~ label {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  font-size: 12px;
  color: #777;
}

.form-label-group input:not(:-ms-input-placeholder) ~ label {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  font-size: 12px;
  color: #777;
}

.form-label-group input:not(:placeholder-shown) ~ label {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  font-size: 12px;
  color: #777;
}
.formFieldDanger {
  border-color: red !important;
  outline: 0;
  color: red !important;
  box-shadow: 0 0 0 0.2rem rgba(255, 0, 0, 0.25) !important;
}

/* Fallback for Edge
-------------------------------------------------- */
@supports (-ms-ime-align: auto) {
  .form-label-group {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column-reverse;
    flex-direction: column-reverse;
  }

  .form-label-group label {
    position: static;
  }

  .form-label-group input::-ms-input-placeholder {
    color: #777;
  }
}
</style>
