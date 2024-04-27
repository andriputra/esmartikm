<template>
  <div class="container">
    <header class="header">
      <nuxt-link to="/users" class="content__link font-bold text-lg -ml-4">
        <span class="inline-flex items-center">
          <svg-icon name="arrow_back" class="mr-1 w-4 h-4" />{{ $t('Back') }}
        </span>
      </nuxt-link>
      <h2>{{ $t('Request Update') }}</h2>
      <div class="text-2xl">
        {{ $t('Showing {n} results', { n: paginator.total }) }}
      </div>
    </header>
    <div class="content">
      <div class="py-4 px-6">
        <div class="p-5">
          <div v-if="loading" class="flex justify-center">
            <loading />
          </div>
          <template v-else-if="paginator.total">
            <div class="space-y-3">
              <row-approval
                v-for="approval in paginator.data"
                :key="approval.id"
                :approval="approval"
              />
            </div>
            <hr class="my-5" />
            <pagination
              :total="paginator.total"
              :current="paginator.current_page"
              :rows="paginator.per_page"
              class="mt-5"
              @change="pageClickHandler"
            />
          </template>
          <div v-else class="flex flex-col items-center">
            <svg-icon name="find_in_page" class="w-20 h-20 mb-5" />
            <div class="text-lg font-bold">
              {{ $t('No requests at the moment') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import Pagination from '~/components/Pagination.vue'
import RowApproval from '~/components/approval/RowApproval.vue'
import Loading from '~/components/Loading.vue'
import appendToQuery from '~/assets/js/utils/append-to-query.js'

export default Vue.extend({
  components: { Pagination, RowApproval, Loading },
  middleware: 'admin',
  async asyncData({ query, store }) {
    await store.dispatch('approvals/GET', query)
  },
  computed: {
    ...mapState('approvals', ['loading', 'paginator']),
  },
  watchQuery: true,
  methods: {
    pendingCheckHandler(val: boolean): void {
      if (val) {
        appendToQuery(this, { page: '', status: 'pending' })
      } else {
        appendToQuery(this, { page: '', status: '' })
      }
    },
    pageClickHandler(page: any): void {
      appendToQuery(this, { page })
    },
  },
})
</script>
