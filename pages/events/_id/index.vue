<template>
  <div class="container max-w-2xl">
    <header class="header">
      <nuxt-link to="/events" class="content__link font-bold text-lg -ml-4">
        <span class="inline-flex items-center">
          <svg-icon name="arrow_back" class="mr-1 w-4 h-4" />{{ $t('Back') }}
        </span>
      </nuxt-link>
      <h2>{{ $t('Event Detail') }}</h2>
    </header>
    <div class="content">
      <div class="py-4 px-6 relative">
        <btn
          tag-name="nuxt-link"
          :to="`/events/${attrs.id}/update`"
          variant="gradient"
          class="rounded-full border-8 border-white absolute right-5 -top-8 text-sm"
        >
          <svg-icon name="edit" />{{ $t('Update') }}
        </btn>
        <h2 class="text-3xl font-bold mb-5 text-center mt-10">
          {{ attrs.name }}
        </h2>
        <div class="flex flex-col space-y-3">
          <div class="card">
            <div class="card__body flex items-center space-x-5">
              <svg-icon name="people_alt" class="w-12 h-12 text-gray-500" />
              <div>
                <div class="text-lg font-bold">
                  {{ attrs.users.length }} {{ $t('participants') }}
                </div>
                <nuxt-link
                  :to="`/events/${attrs.id}/participants`"
                  class="text-red-700"
                  >{{
                    $t(attrs.users.length ? 'View All' : 'Register Participant')
                  }}</nuxt-link
                >
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card__body flex space-x-5">
              <svg-icon name="info" class="w-12 h-12 text-gray-500" />
              <div class="flex-1">
                <div class="text-lg font-bold py-2">
                  {{ $t('Other Information') }}
                </div>
                <ul class="attrs">
                  <li>
                    <span class="attrs__key">{{ $t('Description') }}</span>
                    <span class="attrs__val">{{
                      attrs.description ? attrs.description : '-'
                    }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center my-10">
          <btn class="red-700" @click="deleteClickHandler">
            <svg-icon name="delete" />
            {{ $t('Delete') }}
          </btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import Btn from '~/components/Btn.vue'

export default Vue.extend({
  components: { Btn },
  computed: {
    ...mapState('events/model', ['attrs']),
  },
  methods: {
    ...mapActions('events/model', {
      delete: 'DELETE',
    }),
    async deleteClickHandler() {
      const confirmText: any = this.$t('Delete?')
      if (!window.confirm(confirmText)) {
        return
      }

      const { error } = await this.delete()

      if (error) {
        this.$toast('error', {
          text: this.$t('Sorry, something went wrong'),
        }).show()
      } else {
        this.$toast('success', {
          text: this.$t('Event deleted!'),
        }).show()

        this.$router.replace('/events')
      }
    },
  },
})
</script>
