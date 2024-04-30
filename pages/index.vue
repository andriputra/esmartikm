<template>
  <div>
    <div class="home-section">
      <div class="container">
        <header class="header">
          <h1 class="text-center">Bangga Buatan Indonesia 2024</h1>
        </header>
        <div class="py-5 px-10 rounded-lg flex flex-col gap-5 text-lg mb-10 text-home">
          <p>
            Nusa Tenggara Barat, sebuah provinsi yang memikat di bagian barat Nusa Tenggara, menawarkan sejumlah kekayaan budaya, alam yang memesona, kerajinan tanganyang memikat, dan keunikan yang menarik
            bagi siapa saja yang menjelajahinya. Dikenal dengan keramahannya, masyarakat Nusa Tenggara Barat menghidupkan budaya tradisional yang kaya.
            Salah satu ciri khasnya adalah tarian tradisional Sasak yang memukau, seperti Tari Gendang Beleq yang diiringi oleh alunan musik khas Sasak.
          </p>
          <p>
            Provinsi ini juga dianugerahi dengan keindahan alam yang tiada tara. Pantai-pantai pasir putih, Gunung Rinjai yang megah serta Taman Nasional Lombok Barat, menyimpan pesona dan keanekaragaman hayati 
            yang luar biasa. Suku Sasak di Nusa Tenggara Barat terampil dalam membuat kain tenun tradisional, seperti kain songket dan ikat. Tenunan ini sering dihiasi dengan motif-motif indah yag melambangkan filosofi
            dan kepercayaan lokal. Selain itu, kerajinan anyaman dari ketak, bambu dan rotan juga merupakan kebanggan daerah ini, dengan produk-produk seperti keranjang, topi dan tas yang sangat diminati.
          </p>
          <p>
            Berbagai potensi wisata, budaya serta kearifan produk lokal tersebut menjadi daya tarik Gerakan Bangga Buatan Indonesia Tahun 2024 di Nusa Tenggara Barat. Perhelatan Gernas BBI di Nusa Tenggara Barat merupakan
            kegiatan yang sanagat potensial untuk mengangkat daya saing IKM dan artisan lokal untuk menjangkau pasar yang lebih luas.
            Kondisi ini tentunya juga membutuhkan dukungan semangat kerja sama yang baik antara pemerintah, perusahaan, pelaku industri, dan masarakat untuk berbelanja produk dalam negeri dan berwisata di Indonesia
          </p>
        </div>
      </div>
      <div class="section-home-end"></div>
    </div>
    <div class="content-home">
      <div class="container">
        <ul class="flex flex-wrap justify-center gap-5">
            <li>
              <a
                href="https://www.instagram.com/kemenperin_ri"
                target="_blank"
                rel="nofollow"
                class="text-primary-800 hover:text-primary-700"
              >
                <svg-icon name="instagram-alt" />
                @kemenperin_ri
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/@Kemenperin_RI"
                target="_blank"
                rel="nofollow"
                class="text-primary-800 hover:text-primary-700"
              >
                <svg-icon name="youtube" />
                Kemenperin_RI
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/ditjenikma"
                target="_blank"
                rel="nofollow"
                class="text-primary-800 hover:text-primary-700"
              >
                <svg-icon name="instagram-alt" />
                @ditjenikma
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/@ditjenikmakemenperinri7904"
                target="_blank"
                rel="nofollow"
                class="text-primary-800 hover:text-primary-700"
              >
                <svg-icon name="youtube" />
                ditjenikmakemenperinri7904
              </a>
            </li>
          </ul>
        <div v-if="false" class="bg-primary-500 lg:bg-transparent bg-opacity-10 px-10 lg:px-0 relative py-12 my-16">
          <div
            class="hidden lg:block absolute z-[-1] inset-0 bg-gradient-to-r from-primary-500 to-transparent opacity-30"
          ></div>
          <div class="container">
            <div class="lg:max-w-2xl flex flex-col lg:flex-row items-start gap-10">
              <img
                src="~/assets/img/lagawi-fest-magazine-cover.png"
                class="sm:w-1/3"
              />
              <div class="flex flex-col items-start">
                <div class="text-4xl text-primary-600">E-Katalog</div>
                <p class="text-2xl mt-4">Produk IKM Unggulan</p>
                <a
                  href="https://pubhtml5.com/xxgaa/ccei/"
                  target="_blank"
                  class="button mt-8"
                  rel="nofollow"
                  >Baca Sekarang</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container mt-10">
        <div class="content">
          <div class="py-4 px-6">
            <div class="p-5">
              <div class="flex justify-between items-center">
                <h4 class="text-2xl font-bold">
                  E-Katalog
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
      <div class="section-content-end"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import FilterSubcategory from '~/components/category/FilterSubcategory.vue'
import RowCatalog from '~/components/catalog/RowCatalog.vue'

export default Vue.extend({
  auth: false,
  components: { RowCatalog, FilterSubcategory },
  middleware({ store, redirect }) {
    if (!store.state.events.active.events.length) {
      return redirect('/')
    }
  },
  async asyncData({ query, store }) {
    await Promise.all([store.dispatch('events/active/LOAD_CATALOGS', query)])
  },
  data() {
    return {
      page: 1,
    }
  },
  computed: {
    ...mapState('events/active', {
      activeEvents: 'events',
      loading: 'loading',
      catalogs: 'catalogs',
    }),
  },
  watchQuery: true,
})
</script>
