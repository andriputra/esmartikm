<template>
  <div class="container max-w-2xl">
    <header class="header">
      <nuxt-link
        :to="`/gallery/${$route.params.id}`"
        class="content__link font-bold text-lg -ml-4"
      >
        <span class="inline-flex items-center">
          <svg-icon name="arrow_back" class="mr-1 w-4 h-4" />{{ $t('Back') }}
        </span>
      </nuxt-link>
      <h2>{{ $t('Update Gallery Data') }}</h2>
    </header>
    <div class="content">
      <form class="border py-4 px-6" @submit.prevent="submitHandler">
        <div class="p-5">
          <form-gallery />
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
import FormGallery from '~/components/gallery/FormGallery.vue'

export default Vue.extend({
  components: {
    FormGallery,
    Btn,
    Field,
  },
  computed: {
    ...mapState('gallery/model', ['errors', 'saving']),
  },
  methods: {
    ...mapActions('gallery/model', {
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
      this.$router.push(`/gallery/${this.$route.params.id}`)
    },
  },
})
</script>
