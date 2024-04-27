<template>
  <div>
    <field-have-online-admin />
    <hr class="my-5" />
    <field-financial-record />
    <hr class="my-5" />
    <field-separating-finance />
    <hr class="my-5" />
    <field-business-problem />
    <hr class="my-5" />
    <field-attended-ikma-programs />
    <field-attended-other-institution-programs />
    <hr class="my-5" />
    <field-willing-digital-marketing-workshop-program />
    <hr class="my-5" />
    <field-interested-ikma-programs />
    <field-interested-ikma-trainings />
    <hr class="my-5" />
    <field-get-info-from />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import FieldHaveOnlineAdmin from '~/components/user/fields/FieldHaveOnlineAdmin.vue'
import FieldFinancialRecord from '~/components/user/fields/FieldFinancialRecord.vue'
import FieldSeparatingFinance from '~/components/user/fields/FieldSeparatingFinance.vue'
import FieldBusinessProblem from '~/components/user/fields/FieldBusinessProblem.vue'
import FieldAttendedIkmaPrograms from '~/components/user/fields/FieldAttendedIkmaPrograms.vue'
import FieldAttendedOtherInstitutionPrograms from '~/components/user/fields/FieldAttendedOtherInstitutionPrograms.vue'
import FieldWillingDigitalMarketingWorkshopProgram from '~/components/user/fields/FieldWillingDigitalMarketingWorkshopProgram.vue'
import FieldInterestedIkmaPrograms from '~/components/user/fields/FieldInterestedIkmaPrograms.vue'
import FieldInterestedIkmaTrainings from '~/components/user/fields/FieldInterestedIkmaTrainings.vue'
import FieldGetInfoFrom from '~/components/user/fields/FieldGetInfoFrom.vue'

export default Vue.extend({
  components: {
    FieldHaveOnlineAdmin,
    FieldFinancialRecord,
    FieldSeparatingFinance,
    FieldBusinessProblem,
    FieldAttendedIkmaPrograms,
    FieldAttendedOtherInstitutionPrograms,
    FieldWillingDigitalMarketingWorkshopProgram,
    FieldInterestedIkmaPrograms,
    FieldInterestedIkmaTrainings,
    FieldGetInfoFrom,
  },
})
</script>
