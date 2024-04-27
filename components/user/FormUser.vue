<template>
  <div>
    <field-status />
    <h2 class="text-xl font-bold mb-5">
      {{ $t('Account Information') }}
    </h2>
    <field-email />
    <field-username />
    <field-password />
    <field-password-confirmation />
    <h2 class="text-xl font-bold mb-5">{{ $t('Business Information') }}</h2>
    <form-business />
    <h2 class="text-xl font-bold mb-5">{{ $t('Business License') }}</h2>
    <form-license />
    <h2 class="text-xl font-bold mb-5">{{ $t('Business Owner') }}</h2>
    <form-owner />
    <h2 class="text-xl font-bold mb-5">{{ $t('Links') }}</h2>
    <form-links />
    <h2 class="text-xl font-bold mb-5">{{ $t('Product Information') }}</h2>
    <form-product />
    <h2 class="text-xl font-bold mb-5">
      {{ $t('Product Certification') }} ({{ $t('Optional') }})
    </h2>
    <form-product-certification />
    <h2 class="text-xl font-bold mb-5">{{ $t('Supporting Questions') }}</h2>
    <form-survey />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import FieldEmail from '~/components/user/fields/FieldEmail.vue'
import FieldUsername from '~/components/user/fields/FieldUsername.vue'
import FieldPassword from '~/components/user/fields/FieldPassword.vue'
import FieldPasswordConfirmation from '~/components/user/fields/FieldPasswordConfirmation.vue'
import FieldStatus from '~/components/user/fields/FieldStatus.vue'
import FormBusiness from '~/components/user/FormBusiness.vue'
import FormLicense from '~/components/user/FormLicense.vue'
import FormOwner from '~/components/user/FormOwner.vue'
import FormLinks from '~/components/user/FormLinks.vue'
import FormProduct from '~/components/user/FormProduct.vue'
import FormProductCertification from '~/components/user/FormProductCertification.vue'
import FormSurvey from '~/components/user/FormSurvey.vue'

export default Vue.extend({
  components: {
    FieldEmail,
    FieldUsername,
    FieldPassword,
    FieldPasswordConfirmation,
    FieldStatus,
    FormBusiness,
    FormLicense,
    FormOwner,
    FormLinks,
    FormProduct,
    FormProductCertification,
    FormSurvey,
  },
  computed: {
    ...mapState('users/model', ['errors', 'saving']),
  },
})
</script>
