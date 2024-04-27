<template>
  <field
    :label="
      $t(
        'Facilitation activities you have participated in that are organized by other agencies (Ministries and Agencies)'
      )
    "
    :error="'attended_other_institution_programs' in errors"
    :feedback="errors.attended_other_institution_programs"
    required
  >
    <text-input
      :value="attrs.attended_other_institution_programs"
      type="text"
      :placeholder="$t('Specify activities and institutions')"
      :error="'attended_other_institution_programs' in errors"
      :disabled="saving"
      @input="
        updateAttrs({
          key: 'attended_other_institution_programs',
          value: $event,
        })
      "
    />
  </field>
</template>

<script lang="ts">
import Vue from 'vue'
import mixin from './mixin'
import TextInput from '~/components/form/TextInput.vue'

export default Vue.extend({
  components: { TextInput },
  mixins: [mixin],
})
</script>
