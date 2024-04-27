<template>
  <div>
    <field-business-license-owned />
    <field-business-license-numbers />
    <field-kbli-number />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import FieldBusinessLicenseOwned from '~/components/user/fields/FieldBusinessLicenseOwned.vue'
import FieldBusinessLicenseNumbers from '~/components/user/fields/FieldBusinessLicenseNumbers.vue'
import FieldKbliNumber from '~/components/user/fields/FieldKbliNumber.vue'

export default Vue.extend({
  components: {
    FieldBusinessLicenseOwned,
    FieldBusinessLicenseNumbers,
    FieldKbliNumber,
  },
})
</script>
