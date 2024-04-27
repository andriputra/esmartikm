<template>
  <div>
    <div class="container">
      <header class="header">
        <h1>{{ $t('Gallery') }}</h1>
        <p>Kegiatan eSmartIKM</p>
      </header>
    </div>
    <div
      class="content bg-gradient-to-b from-[#fdfff4] to-[#dbb79f] min-h-screen rounded-none"
    >
      <div class="py-4 px-6">
        <div class="p-5">
          <no-ssr>
            <light-box
              ref="lightbox"
              :show-light-box="false"
              :media="lightboxMedia"
              show-caption
            />
          </no-ssr>
          <div
            v-infinite-scroll="loadMore"
            :infinite-scroll-disabled="
              loading || paginator.current_page == paginator.last_page
            "
            infinite-scroll-distance="10"
            class="legawi-fest-gallery"
          >
            <div
              v-for="(gallery, key) in paginator.data"
              :key="gallery.id"
              @click="$refs.lightbox.showImage(key)"
            >
              <div class="img-wrapper">
                <img
                  v-if="gallery.type === 'image'"
                  :src="gallery.media_thumbnail_url"
                  blank="true"
                />
                <img
                  v-else-if="gallery.type === 'video'"
                  :src="`https://img.youtube.com/vi/${gallery.media}/maxresdefault.jpg`"
                  blank="true"
                />
              </div>
              <div class="pt-3 px-1.5 leading-tight">
                <span class="text-lg line-clamp-1">{{
                  gallery.event.name
                }}</span>
                <span
                  class="block text-2xl font-bold text-gray-800 line-clamp-2"
                  >{{ gallery.title }}</span
                >
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
import { mapState } from 'vuex'

export default Vue.extend({
  auth: false,
  async asyncData({ store }) {
    await store.dispatch('gallery/LOAD', {
      perPage: 20,
    })
  },
  data() {
    return {
      page: 1,
    }
  },
  computed: {
    ...mapState('gallery', ['loading', 'paginator']),
    lightboxMedia(): any {
      return this.paginator.data.map(
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
  methods: {
    async loadMore() {
      this.page++
      await this.$store.dispatch('gallery/LOAD', {
        page: this.page,
        perPage: 20,
      })
    },
  },
})
</script>

<style lang="postcss" scoped>
.legawi-fest-gallery {
  @apply grid md:grid-cols-3 xl:grid-cols-5 gap-10 items-center;

  & > div {
    @apply text-center md:text-left cursor-pointer;

    & .img-wrapper {
      padding-top: 140%;
      @apply relative;
    }

    & img {
      @apply absolute top-0 left-0 w-full h-full object-cover;
    }

    &:nth-child(odd) {
      @apply md:mt-16;
    }
  }
}
</style>
