<template>
  <div class="container max-w-2xl">
    <header class="header">
      <nuxt-link
        :to="`/events/${attrs.id}`"
        class="content__link font-bold text-lg -ml-4"
      >
        <span class="inline-flex items-center">
          <svg-icon name="arrow_back" class="mr-1 w-4 h-4" />{{ $t('Back') }}
        </span>
      </nuxt-link>
      <h2>{{ $t('Participants') }}</h2>
    </header>
    <div class="content">
      <div class="py-4 px-6">
        <h2 class="text-3xl font-bold text-center my-10">
          <nuxt-link :to="`/events/${attrs.id}`" class="text-red-700">{{
            attrs.name
          }}</nuxt-link>
        </h2>
        <div class="space-y-3">
          <search-user
            v-model="userId"
            :placeholder="$t('Search user to add')"
          />
          <row-participant
            v-for="user in attrs.users"
            :key="user.id"
            :user="user"
            @delete="deleteHandler"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import RowParticipant from '~/components/event/RowParticipant.vue'
import SearchUser from '~/components/user/SearchUser.vue'

export default Vue.extend({
  components: { RowParticipant, SearchUser },
  data() {
    return {
      userId: '',
    }
  },
  computed: {
    ...mapState('events/model', ['attrs']),
  },
  watch: {
    async userId(val) {
      if (val) {
        await this.register(val)
        this.userId = ''
        await this.reload()
      }
    },
  },
  methods: {
    ...mapActions('events/model', {
      register: 'REGISTER',
      unregister: 'UNREGISTER',
      reload: 'RELOAD',
    }),
    deleteHandler(userId: number) {
      this.unregister(userId)
      this.reload()
    },
  },
})
</script>
