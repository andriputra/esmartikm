<template>
  <select-province
    :presearch="$route.query.province"
    :value="Number($route.query.province_id)"
    allow-empty
    @input="provinceInputHandler"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import SelectProvince from '~/components/province/SelectProvince.vue'
import appendToQuery from '~/assets/js/utils/append-to-query.js'

export default Vue.extend({
  components: { SelectProvince },
  computed: mapState('province', ['provinces']),
  methods: {
    provinceInputHandler(provinceId: string): void {
      const province = this.provinces.find((opt: any) => opt.id === provinceId)

      if (province) {
        appendToQuery(this, {
          province_id: provinceId,
          province: province.name,
          city_id: '',
          city: '',
        })
      } else {
        appendToQuery(this, {
          province_id: '',
          province: '',
          city_id: '',
          city: '',
        })
      }
    },
  },
})
</script>
