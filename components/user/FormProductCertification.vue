<template>
  <div>
    <field-product-certification />
    <field-product-certification-file />
    <template
      v-if="
        attrs.form_type === 'Industri Logam Mesin Elektronika dan Alat Angkut'
      "
    >
      <hr class="my-5" />
      <field-tkdn-certification />
      <field-tkdn-certification-file />
    </template>
    <template
      v-if="attrs.form_type === 'Industri Pangan, Furnitur dan Bahan Bangunan'"
    >
      <hr class="my-5" />
      <field-halal-certification />
      <field-halal-certification-file />
    </template>
    <hr class="my-5" />
    <field-sni-certification />
    <field-sni-certification-file />
    <template
      v-if="attrs.form_type === 'Industri Pangan, Furnitur dan Bahan Bangunan'"
    >
      <hr class="my-5" />
      <field-distribution-permit />
      <field-distribution-permit-file />
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import FieldProductCertification from '~/components/user/fields/FieldProductCertification.vue'
import FieldProductCertificationFile from '~/components/user/fields/FieldProductCertificationFile.vue'
import FieldTkdnCertification from '~/components/user/fields/FieldTkdnCertification.vue'
import FieldTkdnCertificationFile from '~/components/user/fields/FieldTkdnCertificationFile.vue'
import FieldHalalCertification from '~/components/user/fields/FieldHalalCertification.vue'
import FieldHalalCertificationFile from '~/components/user/fields/FieldHalalCertificationFile.vue'
import FieldSniCertification from '~/components/user/fields/FieldSniCertification.vue'
import FieldSniCertificationFile from '~/components/user/fields/FieldSniCertificationFile.vue'
import FieldDistributionPermit from '~/components/user/fields/FieldDistributionPermit.vue'
import FieldDistributionPermitFile from '~/components/user/fields/FieldDistributionPermitFile.vue'

export default Vue.extend({
  components: {
    FieldProductCertification,
    FieldProductCertificationFile,
    FieldTkdnCertification,
    FieldTkdnCertificationFile,
    FieldHalalCertification,
    FieldHalalCertificationFile,
    FieldSniCertification,
    FieldSniCertificationFile,
    FieldDistributionPermit,
    FieldDistributionPermitFile,
  },
  computed: mapState('users/model', ['attrs', 'errors', 'saving']),
})
</script>
