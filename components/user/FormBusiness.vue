<template>
  <div>
    <field-type />
    <field-name />
    <field-phone />
    <field-npwp />
    <field-npwp-image />
    <field-number-of-employees />
    <field-investment />
    <field-established-date />
    <field-city />
    <field-address />
    <field-industry-type />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import FieldType from '~/components/user/fields/FieldType.vue'
import FieldName from '~/components/user/fields/FieldName.vue'
import FieldPhone from '~/components/user/fields/FieldPhone.vue'
import FieldNpwp from '~/components/user/fields/FieldNpwp.vue'
import FieldNpwpImage from '~/components/user/fields/FieldNpwpImage.vue'
import FieldNumberOfEmployees from '~/components/user/fields/FieldNumberOfEmployees.vue'
import FieldIndustryType from '~/components/user/fields/FieldIndustryType.vue'
import FieldEstablishedDate from '~/components/user/fields/FieldEstablishedDate.vue'
import FieldCity from '~/components/user/fields/FieldCity.vue'
import FieldAddress from '~/components/user/fields/FieldAddress.vue'
import FieldInvestment from '~/components/user/fields/FieldInvestment.vue'

export default Vue.extend({
  components: {
    FieldType,
    FieldName,
    FieldPhone,
    FieldNpwp,
    FieldNpwpImage,
    FieldNumberOfEmployees,
    FieldIndustryType,
    FieldEstablishedDate,
    FieldCity,
    FieldAddress,
    FieldInvestment,
  },
})
</script>
