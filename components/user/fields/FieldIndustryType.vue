<template>
  <field
    :label="$t('Business Type')"
    :error="'bussines_type' in errors"
    :feedback="errors.bussines_type"
    inline
    required
  >
    <div class="space-y-2">
      <radiobox
        v-for="option in options"
        :key="option"
        :value="option"
        :model-value="attrs.bussines_type"
        :error="'bussines_type' in errors"
        :disabled="saving"
        @change="updateAttrs({ key: 'bussines_type', value: $event })"
      >
        {{ option }}
      </radiobox>
    </div>
  </field>
</template>

<script lang="ts">
import Vue from 'vue'
import mixin from './mixin'
import Radiobox from '~/components/form/Radiobox.vue'

export default Vue.extend({
  components: { Radiobox },
  mixins: [mixin],
  data() {
    return {
      options: [
        'Produksi Sendiri',
        'Produksi pesan di IKM / Kerjasama dengan IKM',
        'Beli produk untuk dijual kembali',
      ],
    }
  },
})
</script>
