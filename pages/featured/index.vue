<template>
  <div>
    <div class="container">
      <header class="header">
        <h1>#LAGAWIFEST</h1>
        <p>Lampung Bangga Wirausaha Industri<br />Satu Bumi, Juta Karya</p>
      </header>
      <div
        class="p-10 flex flex-col gap-y-5 max-w-2xl bg-white rounded-md bg-opacity-50"
      >
        <p>
          Lagawi adalah nama yang menjadi simbol representatif untuk sebuah
          festival dengan misi untuk menyebarkan semangat dan mendongkrak
          pergerakan industri lokal di provinsi Lampung yang di gagas oleh
          Kementrian Perindustrian Indonesia. Nama Lagawi lahir dari beberapa
          gabungan unsur kata yaitu “Lampung Bangga Wirausaha Industri”.
        </p>
        <p>
          Dengan keragaman dan potensi produsen lokal yang ada di Lampung,
          Lagawi Festival berkomitmen untuk menciptakan wadah yang layak untuk
          para pelaku industri di Lampung berinovasi dan berkembang menjadi
          industri yang lebih maju.
        </p>
      </div>
    </div>
    <div
      class="bg-gradient-to-b from-transparent via-[#fdfff4] to-[#dbb79f] py-10"
    >
      <div class="container px-10 pt-12 pb-16">
        <h4 class="lg:w-96 text-4xl font-bold">
          {{ $t('Gallery') }}
        </h4>
      </div>
      <swiper
        v-if="gallery.length"
        :breakpoints="{
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 5,
          },
        }"
        :slides-per-view="1"
        :space-between="30"
        :loop="false"
        :navigation="true"
        class="featured-gallery"
      >
        <swiper-slide
          v-for="(
            { id, type, title, event, media, media_thumbnail_url }, key
          ) in gallery"
          :key="id"
        >
          <div class="img-wrapper">
            <img
              v-if="type === 'image'"
              :src="media_thumbnail_url"
              class="object-cover cursor-pointer"
            />
            <img
              v-else-if="type === 'video'"
              :src="`https://img.youtube.com/vi/${media}/maxresdefault.jpg`"
              blank="true"
            />
          </div>
          <div
            class="block pt-3 px-1.5 leading-tight cursor-pointer"
            @click="$refs.lightbox.showImage(key)"
          >
            <span class="text-lg line-clamp-1">{{ event.name }}</span>
            <span class="block text-2xl font-bold text-gray-800 line-clamp-2">{{
              title
            }}</span>
          </div>
        </swiper-slide>
      </swiper>
      <no-ssr>
        <light-box
          ref="lightbox"
          :show-light-box="false"
          :media="lightboxMedia"
          show-caption
        />
      </no-ssr>
    </div>
    <div class="container mt-10">
      <div class="content">
        <div class="py-4 px-6">
          <div class="p-5">
            <div class="flex justify-between items-center">
              <h4 class="text-2xl font-semibold">
                {{ $t('E-Catalogues') }} {{ activeEvents[0].name }}
              </h4>
              <filter-subcategory :event-id="activeEvents[0].id" />
            </div>
            <hr class="my-5" />
            <div v-if="loading" class="flex justify-center">
              <loading />
            </div>
            <template v-else-if="catalogs.length">
              <div
                class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                <row-catalog
                  v-for="catalog in catalogs"
                  :key="catalog.id"
                  :catalog="catalog"
                />
              </div>
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Navigation } from 'swiper'
import { SwiperCore, Swiper, SwiperSlide } from 'swiper-vue2'
import { mapState } from 'vuex'
import FilterSubcategory from '~/components/category/FilterSubcategory.vue'
import RowCatalog from '~/components/catalog/RowCatalog.vue'

import 'swiper/swiper-bundle.css'

SwiperCore.use([Navigation])

export default Vue.extend({
  auth: false,
  components: { Swiper, SwiperSlide, RowCatalog, FilterSubcategory },
  middleware({ store, redirect }) {
    if (!store.state.events.active.events.length) {
      return redirect('/')
    }
  },
  async asyncData({ query, store }) {
    await Promise.all([
      store.dispatch('events/active/LOAD_GALLERY'),
      store.dispatch('events/active/LOAD_CATALOGS', query),
    ])
  },
  data() {
    return {
      page: 1,
    }
  },
  computed: {
    ...mapState('events/active', {
      activeEvents: 'events',
      gallery: 'gallery',
      loading: 'loading',
      catalogs: 'catalogs',
    }),
    lightboxMedia(): any {
      return this.gallery.map(
        (gallery: {
          type: string
          media: string
          // eslint-disable-next-line camelcase
          media_thumbnail_url: string
          // eslint-disable-next-line camelcase
          media_url: string
          title: string
          // eslint-disable-next-line camelcase
          event_name: string
          description: string
        }) => {
          const caption = `<h4>${gallery.event_name}</h4><p>${gallery.title}</p>`

          if (gallery.type === 'video') {
            return {
              type: 'youtube',
              thumb: `https://img.youtube.com/vi/${gallery.media}/hqdefault.jpg`,
              id: gallery.media,
              caption,
            }
          }

          return {
            thumb: gallery.media_thumbnail_url,
            src: gallery.media_url,
            caption,
          }
        }
      )
    },
  },
  watchQuery: true,
})
</script>

<style lang="postcss">
.featured-gallery {
  @apply !mx-10;

  & .swiper-slide {
    @apply text-center md:text-left;

    & .img-wrapper {
      padding-top: 140%;
      @apply relative;
    }

    & img {
      @apply absolute top-0 left-0 w-full h-full object-cover;
    }

    &:nth-child(odd) {
      @apply mt-16;
    }
  }

  & .swiper-button-prev,
  & .swiper-button-next {
    width: 104px;
    height: 80px;
    top: 55%;
    @apply bg-no-repeat;

    &::after {
      @apply hidden;
    }
  }

  & .swiper-button-prev {
    left: 16px;
    background-image: url('~assets/img/carousel-prev.png');
  }

  & .swiper-button-next {
    right: 16px;
    background-image: url('~assets/img/carousel-next.png');
  }
}
</style>
