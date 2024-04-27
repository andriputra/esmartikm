<template>
  <div class="container">
    <header class="header">
      <h1>{{ $t('E-Catalogues') }}</h1>
      <div class="text-2xl">
        {{ $t('Showing {n} results', { n: paginator.total }) }}
      </div>
    </header>
    <div class="content">
      <div class="py-4 px-6">
        <div class="p-5">
          <form
            class="mt-5 grid md:grid-cols-3 lg:grid-cols-6 gap-5 lg:gap-y-0"
            @submit.prevent=""
          >
            <filter-search class="md:col-span-2 lg:col-span-2" />
            <filter-subcategory />
            <filter-province />
            <filter-city
              :province-id="
                $route.query.province_id ? $route.query.province_id : null
              "
            />
            <sort :options="sortOptions" />
            <input type="submit" class="hidden" />
          </form>
          <hr class="my-5" />
          <div v-if="loading" class="flex justify-center">
            <loading />
          </div>
          <template v-else-if="paginator.total">
            <div
              class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <row-catalog
                v-for="catalog in paginator.data"
                :key="catalog.id"
                :catalog="catalog"
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
              {{ $t('No catalogs at the moment') }}
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
import FilterSearch from '~/components/filters/FilterSearch.vue'
import FilterSubcategory from '~/components/category/FilterSubcategory.vue'
import FilterProvince from '~/components/province/FilterProvince.vue'
import FilterCity from '~/components/city/FilterCity.vue'
import Sort from '~/components/Sort.vue'
import Pagination from '~/components/Pagination.vue'
import RowCatalog from '~/components/catalog/RowCatalog.vue'
import Loading from '~/components/Loading.vue'
import appendToQuery from '~/assets/js/utils/append-to-query.js'

export default Vue.extend({
  components: {
    FilterSearch,
    Pagination,
    FilterSubcategory,
    FilterProvince,
    FilterCity,
    Sort,
    RowCatalog,
    Loading,
  },
  auth: false,
  async asyncData({ query, store }) {
    await store.dispatch('catalogs/GET', query)
  },
  data() {
    return {
      sortOptions: [
        { value: '+', text: this.$t('Latest First') },
        { value: 'id+asc', text: this.$t('Oldest First') },
        { value: 'viewed+desc', text: this.$t('Most Viewed') },
        { value: 'name+asc', text: this.$t('Name') + ' A-Z' },
        { value: 'name+desc', text: this.$t('Name') + ' Z-A' },
      ],
    }
  },
  computed: {
    ...mapState('catalogs', ['loading', 'paginator']),
  },
  watchQuery: true,
  methods: {
    pageClickHandler(page: any): void {
      appendToQuery(this, { page })
    },
  },
})
</script>
