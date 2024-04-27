<template>
  <field
    :label="$t('Type')"
    :error="'form_type' in errors"
    :feedback="errors.form_type"
    inline
    required
  >
    <select-industry-type
      :value="attrs.form_type"
      :error="'form_type' in errors"
      :disabled="saving"
      @input="updateAttrs({ key: 'form_type', value: $event })"
    />
  </field>
</template>

<script lang="ts">
import Vue from 'vue'
import mixin from './mixin'
import SelectIndustryType from '~/components/user/SelectIndustryType.vue'

export default Vue.extend({
  components: { SelectIndustryType },
  mixins: [mixin],
})
</script>
