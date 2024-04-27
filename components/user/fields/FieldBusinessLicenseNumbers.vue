<template>
  <div>
    <field
      v-for="license in licenses"
      :key="license"
      :label="license"
      :error="`bussines_license_number.${license}` in errors"
      :feedback="errors[`bussines_license_number.${license}`]"
      inline
    >
      <text-input
        :value="attrs.bussines_license_number[license]"
        type="number"
        :placeholder="$t('Number')"
        :error="`bussines_license_number.${license}` in errors"
        :disabled="saving"
        @input="inputHandler(license, $event)"
      />
    </field>
  </div>
</template>

<script lang="ts">
import mixin from './mixin'
import { BELUM_MEMILIKI } from './FieldBusinessLicenseOwned.vue'
import TextInput from '~/components/form/TextInput.vue'

export default mixin.extend({
  components: { TextInput },
  computed: {
    licenses() {
      return this.attrs.bussines_license_owned.filter(
        (e: string) => e !== BELUM_MEMILIKI
      )
    },
  },
  methods: {
    inputHandler(key: string, val: string) {
      const value = { ...this.attrs.bussines_license_number }
      value[key] = val
      this.updateAttrs({ key: 'bussines_license_number', value })
    },
  },
})
</script>
