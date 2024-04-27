<template>
  <field
    :label="
      $t(
        'Mention the facilitation activities of the Directorate General of IKMA of the Indonesian Ministry of Industry that have been attended (training, workshops, exhibition participation, etc.)'
      )
    "
    :error="'attended_ikma_programs' in errors"
    :feedback="errors.attended_ikma_programs"
    field-class="ml-40 pl-3 my-3"
    required
  >
    <div class="space-y-2">
      <checkbox
        v-for="option in options"
        :key="option"
        :value="option"
        :model-value="attrs.attended_ikma_programs"
        :error="'attended_ikma_programs' in errors"
        :disabled="saving"
        @change="updateAttrs({ key: 'attended_ikma_programs', value: $event })"
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
        'Belum Pernah',
      ],
    }
  },
})
</script>
