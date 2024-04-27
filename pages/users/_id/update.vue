<template>
  <div class="container max-w-2xl">
    <header class="header">
      <nuxt-link to="/users" class="content__link font-bold text-lg -ml-4">
        <span class="inline-flex items-center">
          <svg-icon name="arrow_back" class="mr-1 w-4 h-4" />{{ $t('Back') }}
        </span>
      </nuxt-link>
      <h2>{{ $t('Update User Data') }}</h2>
    </header>
    <div class="content">
      <form class="py-4 px-6" @submit.prevent="submitHandler">
        <div class="p-5">
          <form-user />
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
import FormUser from '~/components/user/FormUser.vue'

export default Vue.extend({
  components: {
    FormUser,
    Btn,
    Field,
  },
  computed: {
    ...mapState('users/model', ['errors', 'saving']),
  },
  methods: {
    ...mapActions('users/model', {
      reload: 'RELOAD',
      save: 'SUBMIT',
    }),
    async submitHandler(): Promise<any> {
      const { error, response } = await this.save()

      if (error) {
        return this.$toast('error', { text: response.data.message }).show()
      }

      this.$toast('success', {
        text: this.$t('Data updated!'),
      }).show()

      this.reload()
      this.$router.push(`/users/${this.$route.params.id}`)
    },
  },
})
</script>
