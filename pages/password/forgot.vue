<template>
  <div class="container max-w-md">
    <header class="header">
      <h2>{{ $t('Forgot Password') }}</h2>
    </header>
    <div class="content">
      <form class="py-4 px-6" @submit.prevent="submit">
        <div class="p-5">
          <field :label="$t('Email')" :error="error !== ''">
            <text-input
              v-model="credentials.email"
              type="text"
              :placeholder="$t('Email')"
              :error="error !== ''"
              :disabled="busy"
            />
          </field>
          <div class="flex items-center justify-between">
            <btn type="submit" :disabled="busy">
              {{ $t('Submit') }}
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
  auth: 'guest',
  layout: 'public',
  data() {
    return {
      credentials: {
        email: '',
      },
      busy: false,
      error: '',
    }
  },
  methods: {
    async submit() {
      this.error = ''

      try {
        await this.$api.passwordForgot.post(this.credentials)
        this.$toast('success', {
          text: this.$t('Reset password link has been sent to your email'),
        }).show()

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
