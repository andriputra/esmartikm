<template>
  <div class="container max-w-2xl">
    <header class="header">
      <nuxt-link to="/gallery" class="content__link font-bold text-lg -ml-4">
        <span class="inline-flex items-center">
          <svg-icon name="arrow_back" class="mr-1 w-4 h-4" />{{ $t('Back') }}
        </span>
      </nuxt-link>
      <h2>{{ $t('View Gallery') }}</h2>
    </header>
    <div class="content">
      <div class="py-4 px-6 relative">
        <user-avatar
          v-if="attrs.type === 'image'"
          :src="attrs.media_thumbnail_url"
          :origin="attrs.media_url"
          :name="attrs.title"
          class="w-32 text-4xl absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 -mt-2.5"
          frame-class="border-8 border-white"
        />
        <avatar
          v-if="attrs.type === 'video'"
          :src="`https://img.youtube.com/vi/${attrs.media}/hqdefault.jpg`"
          :name="attrs.title"
          class="w-32 text-4xl absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 -mt-2.5 cursor-pointer"
          frame-class="border-8 border-white"
          @click="$refs.lightbox.showImage(0)"
        />
        <no-ssr>
          <light-box
            ref="lightbox"
            :show-light-box="false"
            :media="[
              {
                type: 'youtube',
                thumb: 'https://img.youtube.com/vi/WsptdUFthWI/hqdefault.jpg',
                id: 'WsptdUFthWI',
                caption: 'asdf',
              },
            ]"
          />
        </no-ssr>
        <btn
          tag-name="nuxt-link"
          :to="`/gallery/${attrs.id}/update`"
          variant="gradient"
          class="rounded-full border-8 border-white absolute left-1/2 -translate-x-1/2 top-8 text-sm"
        >
          <svg-icon name="edit" />{{ $t('Update') }}
        </btn>
        <h2 class="text-3xl font-bold mb-5 text-center mt-20">
          {{ attrs.title }}<br />
          <small v-if="attrs.event" class="text-base text-gray-500">
            {{ attrs.event.name }}
          </small>
        </h2>
        <div class="flex flex-col space-y-3">
          <div class="card">
            <div class="card__body flex space-x-5">
              <svg-icon name="info" class="w-12 h-12 text-gray-500" />
              <div class="flex-1">
                <div class="text-lg font-bold py-2">
                  {{ $t('Basic Information') }}
                </div>
                <ul class="attrs">
                  <li>
                    <span class="attrs__key">{{ $t('Media') }}</span>
                    <span class="attrs__val">{{ attrs.type }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card__body flex space-x-5">
              <svg-icon name="description" class="w-12 h-12 text-gray-500" />
              <div>
                <div class="text-lg font-bold py-2">
                  {{ $t('Description') }}
                </div>
                <p>{{ attrs.description }}</p>
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
import UserAvatar from '~/components/user/Avatar.vue'
import Avatar from '~/components/Avatar.vue'
import Btn from '~/components/Btn.vue'

export default Vue.extend({
  components: { UserAvatar, Avatar, Btn },
  computed: {
    ...mapState('gallery/model', ['attrs', 'loading']),
  },
  methods: {
    ...mapActions('gallery/model', {
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
          text: this.$t('Gallery deleted!'),
        }).show()

        this.$router.replace('/gallery')
      }
    },
  },
})
</script>
