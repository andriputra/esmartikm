<template>
  <div class="login-area">
    <div class="container max-w-md">
      <header class="header auth">
        <h2>{{ $t('Login') }}</h2>
      </header>
      <div class="content auth">
        <form class="auth-box" @submit.prevent="login">
          <div class="p-5">
            <field :label="$t('Username')" :error="error !== ''">
              <text-input
                v-model="credentials.email"
                type="text"
                :placeholder="$t('Username / email')"
                :error="error !== ''"
                :disabled="$store.state.auth.busy"
              />
            </field>
            <field
              :label="$t('Password')"
              :feedback="$t(error)"
              :error="error !== ''"
            >
              <text-input
                v-model="credentials.password"
                type="password"
                placeholder="******************"
                :error="error !== ''"
                :disabled="$store.state.auth.busy"
              />
            </field>
            <div class="flex items-center justify-between">
              <btn class="submit-form" type="submit" :disabled="$store.state.auth.busy">
                {{ $t('Sign In') }}
              </btn>
              <nuxt-link class="forgot" to="/password/forgot"
                >{{ $t('Forgot Password') }}?</nuxt-link
              >
            </div>
            <template v-if="settings.registration.value">
              <hr class="my-5" />
              <p class="mb-5 forgot">{{ $t('Do you have an IKM unregistered?') }}</p>
              <btn
                tag-name="nuxt-link"
                to="/register"
                class="w-full submit-form"
              >
                {{ $t('Register Now') }}!
              </btn>
            </template>
          </div>
        </form>
      </div>
    </div>
    <div class="footer-login-area"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import Btn from '~/components/Btn.vue'
import Field from '~/components/form/Field.vue'
import TextInput from '~/components/form/TextInput.vue'

export default Vue.extend({
  components: { Field, TextInput, Btn },
  auth: 'guest',
  layout: 'public',
  data() {
    return {
      credentials: {
        email: '',
        password: '',
      },
      error: '',
    }
  },
  computed: {
    ...mapState('settings/model', { settings: 'attrs' }),
  },
  methods: {
    async login() {
      this.error = ''

      try {
        await this.$auth.loginWith('laravelPassport', {
          data: {
            username: this.credentials.email,
            password: this.credentials.password,
          },
        })

        this.$router.push('/')
      } catch (error: any) {
        if (error.response?.data?.message) {
          this.error = error.response.data.message
          this.$toast('error', {
            text: this.$t(this.error),
          }).show()
        }

        if (error.response?.data?.error?.message) {
          this.error = error.response.data.error.message
          this.$toast('error', {
            text: this.$t(this.error),
          }).show()
        }
      }
    },
  },
})
</script>
