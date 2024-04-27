<template>
  <div class="card flex flex-col">
    <div class="relative" style="padding-top: 100%">
      <img
        v-if="catalog.product_thumbnail_url"
        :src="catalog.product_thumbnail_url"
        class="absolute top-0 left-0 w-full h-full object-cover rounded-t"
      />
      <div v-else class="absolute inset-0 bg-gray rounded-t" />
    </div>
    <div class="px-4 py-3 flex-1 flex flex-col justify-between">
      <h3 class="font-bold line-clamp-2 leading-tight mb-2">
        {{ catalog.name }}
      </h3>
      <div class="leading-snug">
        <small
          :title="catalog.sub_category.name"
          class="text-gray-400 line-clamp-2"
          >{{ catalog.sub_category.name }}</small
        >
        <div>
          {{ catalog.category.name }}
        </div>
      </div>
      <div class="flex items-center text-sm mt-3 border-t">
        <div v-if="catalog.city" class="leading-snug line-clamp-2 my-2 flex-1">
          {{ catalog.city.name }}
        </div>
        <dropdown
          v-if="catalog.instagram || catalog.facebook || catalog.indotrading"
          menu
        >
          <btn
            slot="toggle"
            class="button--icon button--flat ml-auto rounded-t-none"
          >
            <svg-icon name="email" class="w-5 h-5" />
          </btn>
          <div class="text-gray-400 text-sm mx-3 mb-1">
            {{ $t('More Information') }}
          </div>
          <dropdown-menu-item v-if="catalog.instagram">
            <a
              :href="catalog.instagram"
              target="_blank"
              class="flex items-center"
            >
              <img src="~/assets/img/instagram.png" class="mr-2 rounded" />
              Instagram
            </a>
          </dropdown-menu-item>
          <dropdown-menu-item v-if="catalog.facebook">
            <a
              :href="catalog.facebook"
              target="_blank"
              class="flex items-center"
            >
              <img src="~/assets/img/facebook.png" class="mr-2 rounded" />
              Facebook
            </a>
          </dropdown-menu-item>
          <dropdown-menu-item v-if="catalog.youtube">
            <a
              :href="catalog.youtube"
              target="_blank"
              class="flex items-center"
            >
              <img src="~/assets/img/youtube.png" class="mr-2 rounded" />
              YouTube
            </a>
          </dropdown-menu-item>
          <dropdown-menu-item v-if="catalog.tiktok">
            <a :href="catalog.tiktok" target="_blank" class="flex items-center">
              <img src="~/assets/img/tiktok.png" class="mr-2 rounded" />
              TikTok
            </a>
          </dropdown-menu-item>
          <dropdown-menu-item v-if="catalog.linkedin">
            <a
              :href="catalog.linkedin"
              target="_blank"
              class="flex items-center"
            >
              <img src="~/assets/img/linkedin.png" class="mr-2 rounded" />
              LinkedIn
            </a>
          </dropdown-menu-item>
          <dropdown-menu-item v-if="catalog.whatsapp">
            <a
              :href="`https://wa.me/${catalog.whatsapp.replace(/\D/g, '')}`"
              target="_blank"
              class="flex items-center"
            >
              <img src="~/assets/img/whatsapp.png" class="mr-2 rounded" />
              Whatsapp
            </a>
          </dropdown-menu-item>
          <dropdown-menu-item v-if="catalog.indotrading">
            <a
              :href="catalog.indotrading"
              target="_blank"
              class="flex items-center"
            >
              <img src="~/assets/img/indotrading.png" class="mr-2 rounded" />
              Indotrading
            </a>
          </dropdown-menu-item>
          <dropdown-menu-item v-if="catalog.website">
            <a
              :href="catalog.website"
              target="_blank"
              class="flex items-center"
            >
              <img src="~/assets/img/website.png" class="mr-2 rounded" />
              Website
            </a>
          </dropdown-menu-item>
        </dropdown>
        <dropdown
          v-if="
            catalog.tokopedia ||
            catalog.bukalapak ||
            catalog.bliblicom ||
            catalog.shopee
          "
          menu
        >
          <btn slot="toggle" class="button--icon button--flat rounded-t-none">
            <svg-icon name="storefront" class="w-5 h-5" />
          </btn>
          <div class="text-gray-400 text-sm mx-3 mb-1">
            {{ $t('Buy') }}
          </div>
          <dropdown-menu-item v-if="catalog.tokopedia">
            <a
              :href="catalog.tokopedia"
              target="_blank"
              class="flex items-center"
            >
              <img src="~/assets/img/tokopedia.png" class="mr-2 rounded" />
              Tokopedia
            </a>
          </dropdown-menu-item>
          <dropdown-menu-item v-if="catalog.bukalapak">
            <a
              :href="catalog.bukalapak"
              target="_blank"
              class="flex items-center"
            >
              <img src="~/assets/img/bukalapak.png" class="mr-2 rounded" />
              Bukalapak
            </a>
          </dropdown-menu-item>
          <dropdown-menu-item v-if="catalog.bliblicom">
            <a
              :href="catalog.bliblicom"
              target="_blank"
              class="flex items-center"
            >
              <img src="~/assets/img/blibli.png" class="mr-2 rounded" />
              Blibli
            </a>
          </dropdown-menu-item>
          <dropdown-menu-item v-if="catalog.shopee">
            <a :href="catalog.shopee" target="_blank" class="flex items-center">
              <img src="~/assets/img/shopee.png" class="mr-2 rounded" />
              Shopee
            </a>
          </dropdown-menu-item>
        </dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Btn from '~/components/Btn.vue'
import Dropdown from '~/components/Dropdown.vue'
import DropdownMenuItem from '~/components/DropdownMenuItem.vue'

export default Vue.extend({
  components: { Btn, Dropdown, DropdownMenuItem },
  props: {
    catalog: {
      type: Object,
      default() {
        return {}
      },
    },
  },
})
</script>
