<template>
  <div class="container">
    <header class="header">
      <h1>{{ $t('Manage Gallery') }}</h1>
    </header>
    <div class="content">
      <div class="border py-4 px-6">
        <div class="p-5">
          <div class="flex flex-wrap justify-between items-center gap-5">
            <div>
              {{ $t('Showing {n} results', { n: paginator.total }) }}
            </div>
            <div>
              <btn tag-name="nuxt-link" to="/gallery/create">
                <svg-icon name="add" />
                {{ $t('Upload New Media') }}
              </btn>
            </div>
          </div>
          <hr class="my-5" />
          <form
            class="mt-5 grid md:grid-cols-3 gap-5 lg:gap-y-0"
            @submit.prevent=""
          >
            <filter-search attr="title" placeholder="Title" />
            <filter-event />
            <sort :options="sortOptions" />
            <input type="submit" class="hidden" />
          </form>
          <hr class="my-5" />
          <div v-if="loading" class="flex justify-center">
            <loading />
          </div>
          <template v-else-if="paginator.total">
            <div class="space-y-3">
              <row-gallery
                v-for="gallery in paginator.data"
                :key="gallery.id"
                :gallery="gallery"
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
              {{ $t('No gallery at the moment') }}
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
import FilterEvent from '~/components/event/FilterEvent.vue'
import Sort from '~/components/Sort.vue'
import Pagination from '~/components/Pagination.vue'
import RowGallery from '~/components/gallery/RowGallery.vue'
import Loading from '~/components/Loading.vue'
import appendToQuery from '~/assets/js/utils/append-to-query.js'

export default Vue.extend({
  components: {
    Btn,
    FilterSearch,
    FilterEvent,
    Sort,
    Pagination,
    RowGallery,
    Loading,
  },
  middleware: 'admin',
  async asyncData({ query, store }) {
    await store.dispatch('gallery/GET', { perPage: 20, ...query })
  },
  data() {
    return {
      sortOptions: [
        { value: '+', text: this.$t('Latest First') },
        { value: 'id+asc', text: this.$t('Oldest First') },
      ],
    }
  },
  computed: {
    ...mapState('gallery', ['loading', 'paginator']),
  },
  watchQuery: true,
  methods: {
    pageClickHandler(page: any): void {
      appendToQuery(this, { page })
    },
  },
})
</script>
