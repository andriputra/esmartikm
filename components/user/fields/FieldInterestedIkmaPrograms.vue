<template>
  <field
    :label="
      $t(
        'What types of activities do you expect the Directorate General of IKMA of the Ministry of Industry to participate in?'
      )
    "
    :error="'interested_ikma_programs' in errors"
    :feedback="errors.interested_ikma_programs"
    required
  >
    <div class="space-y-2">
      <rich-select
        :value="attrs.interested_ikma_programs"
        multiple
        :close-on-select="false"
        :show-labels="false"
        :options="options"
        :placeholder="$t('Select one or more programs')"
        @input="
          updateAttrs({
            key: 'interested_ikma_programs',
            value: $event,
          })
        "
      />
    </div>
  </field>
</template>

<script lang="ts">
import Vue from 'vue'
import mixin from './mixin'
import RichSelect from '~/components/form/RichSelect.vue'

export default Vue.extend({
  components: { RichSelect },
  mixins: [mixin],
  data() {
    return {
      options: [
        'Bimbingan Teknis / Pelatihan',
        'Workshop',
        'Sosialisasi',
        'Sertifikasi Produk',
        'Sertifikasi Kompetensi',
        'Sertifikasi Manajemen Mutu',
        'Restrukturisasi mesin/peralatan',
        'Bantuan mesin/ peralatan',
        'Pameran dalam negeri',
        'Pameran Luar Negeri',
        'Magang',
        'Fasilitasi Fasilitasi Desain Merek dan Kemasan',
        'Fasilitasi Kekayaan Intelektual (KI)',
        'Business Matching/Temu Bisnis',
      ],
    }
  },
})
</script>
