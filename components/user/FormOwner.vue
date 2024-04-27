<template>
  <div>
    <field-owner-name />
    <field-owner-phone />
    <field-owner-birthdate />
    <field-ktp />
    <field-ktp-image />
    <field-owner-npwp />
    <field-owner-npwp-image />
    <field-education />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import FieldOwnerName from '~/components/user/fields/FieldOwnerName.vue'
import FieldOwnerPhone from '~/components/user/fields/FieldOwnerPhone.vue'
import FieldOwnerBirthdate from '~/components/user/fields/FieldOwnerBirthdate.vue'
import FieldKtp from '~/components/user/fields/FieldKtp.vue'
import FieldKtpImage from '~/components/user/fields/FieldKtpImage.vue'
import FieldOwnerNpwp from '~/components/user/fields/FieldOwnerNpwp.vue'
import FieldOwnerNpwpImage from '~/components/user/fields/FieldOwnerNpwpImage.vue'
import FieldEducation from '~/components/user/fields/FieldEducation.vue'

export default Vue.extend({
  components: {
    FieldOwnerName,
    FieldOwnerPhone,
    FieldOwnerBirthdate,
    FieldKtp,
    FieldKtpImage,
    FieldOwnerNpwp,
    FieldOwnerNpwpImage,
    FieldEducation,
  },
})
</script>
