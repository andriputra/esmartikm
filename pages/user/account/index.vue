<template>
  <div class="container max-w-2xl">
    <header class="header">
      <h2>{{ $t('Account Settings') }}</h2>
    </header>
    <div class="content">
      <form class="py-4 px-6" @submit.prevent="submitHandler">
        <div class="p-5">
          <field-username />
          <field-email />
          <field :label="$t('Password')" inline>
            ******
            <btn
              variant="flat"
              tag-name="nuxt-link"
              to="/user/account/password"
              class="text-sm ml-2"
              >{{ $t('Change') }}</btn
            >
          </field>
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
import FieldUsername from '~/components/user/fields/FieldUsername.vue'
import FieldEmail from '~/components/user/fields/FieldEmail.vue'

export default Vue.extend({
  components: { FieldUsername, FieldEmail, Btn, Field },
  layout: 'public',
  computed: {
    ...mapState('users/model', ['errors', 'saving']),
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions('users/account', {
      init: 'INIT',
      save: 'SUBMIT',
    }),
    async submitHandler(): Promise<any> {
      const { error, response } = await this.save()

      if (error) {
        return this.$toast('error', { text: response.data.message }).show()
      }

      this.$auth.fetchUser()

      this.$toast('success', {
        text: this.$t('Settings saved!'),
      }).show()
    },
  },
})
</script>
