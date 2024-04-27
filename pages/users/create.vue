<template>
  <div class="container max-w-2xl">
    <header class="header">
      <nuxt-link to="/users" class="content__link font-bold text-lg -ml-4">
        <span class="inline-flex items-center">
          <svg-icon name="arrow_back" class="mr-1 w-4 h-4" />{{ $t('Back') }}
        </span>
      </nuxt-link>
      <h2>{{ $t('Create New User') }}</h2>
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
import { mapState, mapMutations, mapActions } from 'vuex'
import Btn from '~/components/Btn.vue'
import Field from '~/components/form/Field.vue'
import FormUser from '~/components/user/FormUser.vue'

export default Vue.extend({
  components: {
    FormUser,
    Btn,
    Field,
  },
  middleware: 'admin',
  computed: {
    ...mapState('users/model', ['errors', 'saving']),
  },
  created() {
    this.init()
  },
  methods: {
    ...mapMutations('users/model', {
      init: 'RESET_ATTRS',
    }),
    ...mapActions('users/model', {
      save: 'SUBMIT',
    }),
    async submitHandler(): Promise<any> {
      const { error, response } = await this.save()

      if (error) {
        return this.$toast('error', { text: response.data.message }).show()
      }

      this.$toast('success', {
        text: this.$t('Data created!'),
      }).show()

      this.$router.push(`/users/${response.id}`)
    },
  },
})
</script>
