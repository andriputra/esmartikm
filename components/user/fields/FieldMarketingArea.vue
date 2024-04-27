<template>
  <field
    :label="$t('Marketing Area')"
    :error="'marketing_area' in errors"
    :feedback="errors.marketing_area"
    inline
    required
  >
    <div class="space-y-2">
      <checkbox
        v-for="option in options"
        :key="option"
        :value="option"
        :model-value="attrs.marketing_area"
        :error="'marketing_area' in errors"
        :disabled="saving"
        @change="updateAttrs({ key: 'marketing_area', value: $event })"
      >
        {{ option }}
      </checkbox>
    </div>
  </field>
</template>

<script lang="ts">
import Vue from 'vue'
import mixin from './mixin'
import Checkbox from '~/components/form/Checkbox.vue'

export default Vue.extend({
  components: { Checkbox },
  mixins: [mixin],
  data() {
    return {
      options: [
        'Dalam 1 Kabupaten / Kota',
        'Dalam 1 (satu) Provinsi',
        'Nasional',
        'Ekspor',
      ],
    }
  },
})
</script>
