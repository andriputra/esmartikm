<template>
  <search-city
    :presearch="$route.query.city"
    :value="Number($route.query.city_id)"
    allow-empty
    :province-id="provinceId"
    @input="cityInputHandler"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import SearchCity from '~/components/city/SearchCity.vue'
import appendToQuery from '~/assets/js/utils/append-to-query.js'

export default Vue.extend({
  components: { SearchCity },
  props: {
    provinceId: { type: Number, default: null },
  },
  computed: mapState('city', ['cities']),
  methods: {
    cityInputHandler(cityId: string): void {
      const city = this.cities.find((opt: any) => opt.id === cityId)

      if (city) {
        appendToQuery(this, { city_id: cityId, city: city.name })
      } else {
        appendToQuery(this, { city_id: '', city: '' })
      }
    },
  },
})
</script>
