<template>
  <field
    :label="$t('Investment Value')"
    :error="'investment_value' in errors"
    :feedback="errors.investment_value"
    inline
    required
  >
    <select-investment
      :value="attrs.investment_value"
      :error="'investment_value' in errors"
      :disabled="saving"
      @input="updateAttrs({ key: 'investment_value', value: $event })"
    />
  </field>
</template>

<script lang="ts">
import Vue from 'vue'
import mixin from './mixin'
import SelectInvestment from '~/components/user/SelectInvestment.vue'

export default Vue.extend({
  components: { SelectInvestment },
  mixins: [mixin],
})
</script>
