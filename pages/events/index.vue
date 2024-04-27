<template>
  <div class="container">
    <header class="header">
      <h1>{{ $t('Events') }}</h1>
    </header>
    <div class="content">
      <div class="border py-4 px-6">
        <div class="p-5">
          <div class="flex justify-between items-center">
            <div>
              {{ $t('Showing {n} results', { n: paginator.total }) }}
            </div>
            <div>
              <btn tag-name="nuxt-link" to="/events/create">
                <svg-icon name="add" />
                {{ $t('Create New') }}
              </btn>
            </div>
          </div>
          <form
            class="mt-5 grid md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-y-0"
            @submit.prevent=""
          >
            <filter-search class="md:col-span-2" />
            <filter-date attr="date_start" :placeholder="$t('Starting Date')" />
            <filter-date attr="date_end" :placeholder="$t('Ending Date')" />
            <input type="submit" class="hidden" />
          </form>
          <hr class="my-5" />
          <div v-if="loading" class="flex justify-center">
            <loading />
          </div>
          <template v-else-if="paginator.total">
            <div class="space-y-3">
              <row-event
                v-for="event in paginator.data"
                :key="event.id"
                :event="event"
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
          <div
            v-else-if="Object.keys($route.query).length"
            class="flex flex-col items-center"
          >
            <svg-icon name="find_in_page" class="w-20 h-20 mb-5" />
            <div class="text-lg font-bold">{{ 'No results found' }}</div>
            <div>{{ $t('Consider changing search criteria') }}</div>
          </div>
          <div v-else class="flex flex-col items-center">
            <svg-icon name="find_in_page" class="w-20 h-20 mb-5" />
            <div class="text-lg font-bold">
              {{ $t('No events at the moment') }}
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
import Btn from '~/components/Btn.vue'
import FilterSearch from '~/components/filters/FilterSearch.vue'
import FilterDate from '~/components/filters/FilterDate.vue'
import Pagination from '~/components/Pagination.vue'
import RowEvent from '~/components/event/RowEvent.vue'
import Loading from '~/components/Loading.vue'
import appendToQuery from '~/assets/js/utils/append-to-query.js'

export default Vue.extend({
  components: {
    Btn,
    FilterSearch,
    FilterDate,
    Pagination,
    RowEvent,
    Loading,
  },
  middleware: 'admin',
  async asyncData({ query, store }) {
    await store.dispatch('events/GET', { perPage: 20, ...query })
  },
  computed: {
    ...mapState('events', ['loading', 'paginator']),
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
