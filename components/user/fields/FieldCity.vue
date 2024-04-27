<template>
  <field
    :label="$t('City')"
    :error="'city_id' in errors"
    :feedback="errors.city_id"
    inline
    required
  >
    <search-city
      :presearch="attrs.city ? attrs.city.name : ''"
      :value="attrs.city_id"
      :error="'city_id' in errors"
      :disabled="saving"
      @input="updateAttrs({ key: 'city_id', value: $event })"
    />
  </field>
</template>

<script lang="ts">
import Vue from 'vue'
import mixin from './mixin'
import SearchCity from '~/components/city/SearchCity.vue'

export default Vue.extend({
  components: { SearchCity },
  mixins: [mixin],
})
</script>
