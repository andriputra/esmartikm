<template>
  <div class="container">
    <header class="header">
      <h1>{{ $t('Users') }}</h1>
    </header>
    <div class="content">
      <div class="py-4 px-6">
        <div class="p-5">
          <div class="mb-5">
            {{ $t('Showing {n} results', { n: paginator.total }) }}
          </div>
          <div class="flex flex-wrap justify-between items-center gap-y-5">
            <div>
              <btn
                v-if="paginator.total"
                href="javascript:;"
                @click.prevent="exportResult"
                ><svg-icon name="download" />{{ $t('Download Data') }}</btn
              >
            </div>
            <btn tag-name="nuxt-link" to="/users/create" class="red-800">
              <svg-icon name="add" />
              {{ $t('Create New') }}
            </btn>
          </div>
          <form
            class="mt-5 grid md:grid-cols-2 xl:grid-cols-6 gap-5 xl:gap-y-0"
            @submit.prevent=""
          >
            <filter-search />
            <filter-user-subcategory />
            <filter-city />
            <filter-date attr="date_start" :placeholder="$t('Starting Date')" />
            <filter-date attr="date_end" :placeholder="$t('Ending Date')" />
            <checkbox
              label="Pending"
              value="pending"
              :model-value="$route.query.status"
              true-value="pending"
              @change="pendingCheckHandler"
            />
            <input type="submit" class="hidden" />
          </form>
          <hr class="my-5" />
          <div v-if="loading" class="flex justify-center">
            <loading />
          </div>
          <template v-else-if="paginator.total">
            <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <row-user
                v-for="user in paginator.data"
                :key="user.id"
                :user="user"
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
              {{ $t('No users participated at the moment') }}
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
import Checkbox from '~/components/form/Checkbox.vue'
import FilterSearch from '~/components/filters/FilterSearch.vue'
import FilterUserSubcategory from '~/components/user/FilterUserSubcategory.vue'
import FilterCity from '~/components/city/FilterCity.vue'
import FilterDate from '~/components/filters/FilterDate.vue'
import Pagination from '~/components/Pagination.vue'
import RowUser from '~/components/user/RowUser.vue'
import Loading from '~/components/Loading.vue'
import appendToQuery from '~/assets/js/utils/append-to-query.js'

export default Vue.extend({
  components: {
    Btn,
    Checkbox,
    FilterSearch,
    FilterUserSubcategory,
    FilterCity,
    FilterDate,
    Pagination,
    RowUser,
    Loading,
  },
  middleware: 'admin',
  async asyncData({ query, store }) {
    await store.dispatch('users/GET', query)
  },
  computed: {
    ...mapState('users', ['loading', 'paginator']),
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
    async exportResult() {
      const query: any = { ...this.$route.query, ...{ export: 1 } }
      const sort = this.$route.query.sort
        ? String(this.$route.query.sort).split('+')
        : []
      if (sort[0]) {
        query.sortBy = sort[0]
      }

      if (sort[1]) {
        query.sortDir = sort[1]
      }

      const data = await this.$axios.$get('/api/users', {
        params: query,
        responseType: 'blob',
      })
      const url = window.URL.createObjectURL(new Blob([data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'users.xlsx')
      document.body.appendChild(link)
      link.click()
      link.remove()
    },
  },
})
</script>
