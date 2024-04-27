<template>
  <div class="container max-w-md">
    <header class="header">
      <h2>{{ $t('Reset Password') }}</h2>
    </header>
    <div class="content">
      <form class="py-4 px-6" @submit.prevent="submit">
        <div class="p-5">
          <field
            :label="$t('Password')"
            :feedback="errors.password"
            :error="'password' in errors"
          >
            <text-input
              v-model="credentials.password"
              type="password"
              placeholder="******************"
              :error="'password' in errors"
              :disabled="busy"
            />
          </field>
          <field
            :label="$t('Password Confirmation')"
            :feedback="errors.password_confirmation"
            :error="'password_confirmation' in errors"
          >
            <text-input
              v-model="credentials.password_confirmation"
              type="password"
              placeholder="******************"
              :error="'password_confirmation' in errors"
              :disabled="busy"
            />
          </field>
          <div class="flex items-center justify-between">
            <btn type="submit" :disabled="busy">
              {{ $t('Reset') }}
            </btn>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Btn from '~/components/Btn.vue'
import Field from '~/components/form/Field.vue'
import TextInput from '~/components/form/TextInput.vue'

export default Vue.extend({
  components: { Field, TextInput, Btn },
  layout: 'public',
  middleware({ route, redirect }) {
    if (!route.query.token) {
      return redirect('/')
    }
  },
  auth: 'guest',
  data() {
    return {
      credentials: {
        reset_code: this.$route.query.token,
        password: '',
        password_confirmation: '',
      },
      busy: false,
      errors: {},
    }
  },
  methods: {
    async submit() {
      this.errors = {}

      try {
        await this.$api.passwordReset.post(this.credentials)
        this.$toast('success', {
          text: this.$t('Reset password success'),
        }).show()
        this.$router.push('/login')
      } catch (error: any) {
        if (error.response?.data?.message) {
          this.$toast('error', {
            text: error.response.data.message,
          }).show()
        }

        if (error.response?.data?.error?.message) {
          this.$toast('error', {
            text: error.response.data.error.message,
          }).show()
        }

        if (error.response?.status === 422) {
          this.errors = error.response.data.errors
        }
      }
    },
  },
})
</script>
