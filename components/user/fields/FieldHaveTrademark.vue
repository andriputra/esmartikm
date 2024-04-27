<template>
  <field
    :label="$t('Does your product have a brand?')"
    :error="'have_trademark' in errors"
    :feedback="errors.have_trademark"
    field-class="ml-40 pl-3 my-3"
    required
  >
    <div class="space-y-2">
      <radiobox
        v-for="option in options"
        :key="option"
        :value="option"
        :model-value="attrs.have_trademark"
        :error="'have_trademark' in errors"
        :disabled="saving"
        @change="updateAttrs({ key: 'have_trademark', value: $event })"
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
        'Belum memiliki merk',
        'Produk tidak memerlukan merk',
        'Sudah memiliki merk namun belum didaftarkan di Kemenkumham',
        'Sedang dalam proses pendaftaran di Kemenkumham',
        'Sudah ada sertifikat merk dari Kemenkumham',
      ],
    }
  },
})
</script>
