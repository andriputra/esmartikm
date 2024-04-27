<template>
  <field
    v-if="attrs.form_type === 'Industri Pangan, Furnitur dan Bahan Bangunan'"
    :label="$t('Business License')"
    :error="'bussines_license_owned' in errors"
    :feedback="errors.bussines_license_owned"
    inline
    required
  >
    <div class="space-y-2">
      <checkbox
        v-for="option in options"
        :key="option"
        :value="option"
        :model-value="attrs.bussines_license_owned"
        :error="'bussines_license_owned' in errors"
        :disabled="saving"
        @change="changeHandler"
      >
        {{ option }}
      </checkbox>
    </div>
  </field>

  <field
    v-else
    :label="$t('Business License')"
    :error="'bussines_license_owned' in errors"
    :feedback="errors.bussines_license_owned"
    inline
  >
    <div class="space-y-2">
      <checkbox
        v-for="option in options"
        :key="option"
        :value="option"
        :model-value="attrs.bussines_license_owned"
        :error="'bussines_license_owned' in errors"
        :disabled="saving"
        @change="changeHandler"
      >
        {{ option }}
      </checkbox>
    </div>
  </field>
</template>

<script lang="ts">
import mixin from './mixin'
import Checkbox from '~/components/form/Checkbox.vue'

export const BELUM_MEMILIKI = 'Belum Memiliki'

export default mixin.extend({
  components: { Checkbox },
  data() {
    return {
      options: [
        'Nomor Induk Berusaha (NIB)',
        'Izin Usaha Industri (IUI)',
        'Izin Usaha Mikro Kecil (IUMK)',
        'Tanda Daftar Perusahaan (TDP)',
        'Surat Izin Usaha Perdagangan (SIUP)',
        BELUM_MEMILIKI,
      ],
    }
  },
  methods: {
    changeHandler(value: Array<string>): void {
      if (value.includes(BELUM_MEMILIKI)) {
        if (value[0] === BELUM_MEMILIKI) {
          this.updateAttrs({
            key: 'bussines_license_owned',
            value: value.filter((e) => e !== BELUM_MEMILIKI),
          })
        } else {
          this.updateAttrs({
            key: 'bussines_license_owned',
            value: [BELUM_MEMILIKI],
          })
        }
      } else {
        this.updateAttrs({ key: 'bussines_license_owned', value })
      }
    },
  },
})
</script>
