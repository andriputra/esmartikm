<template>
  <div class="container max-w-2xl">
    <header class="header">
      <nuxt-link
        to="/user/account"
        class="content__link font-bold text-lg -ml-4"
      >
        <span class="inline-flex items-center">
          <svg-icon name="arrow_back" class="mr-1 w-4 h-4" />{{ $t('Back') }}
        </span>
      </nuxt-link>
      <h2>{{ $t('Change Password') }}</h2>
    </header>
    <div class="content">
      <form class="py-4 px-6" @submit.prevent="submitHandler">
        <div class="p-5">
          <field-old-password />
          <field-password />
          <field-password-confirmation />
          <field inline>
            <btn :disabled="saving">
              {{ $t('Save') }}
            </btn>
          </field>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import Btn from '~/components/Btn.vue'
import Field from '~/components/form/Field.vue'
import FieldOldPassword from '~/components/user/fields/FieldOldPassword.vue'
import FieldPassword from '~/components/user/fields/FieldPassword.vue'
import FieldPasswordConfirmation from '~/components/user/fields/FieldPasswordConfirmation.vue'

export default Vue.extend({
  components: {
    FieldOldPassword,
    FieldPassword,
    FieldPasswordConfirmation,
    Btn,
    Field,
  },
  layout: 'public',
  data() {
    return { oldPassword: '' }
  },
  computed: {
    ...mapState('users/model', ['errors', 'saving']),
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions('users/password', {
      init: 'INIT',
      save: 'SUBMIT',
    }),
    async submitHandler(): Promise<any> {
      const { error, response } = await this.save()

      if (error) {
        return this.$toast('error', { text: response.data.message }).show()
      }

      this.$toast('success', {
        text: this.$t('Password changed!'),
      }).show()

      this.$router.push('/user/account')
    },
  },
})
</script>
