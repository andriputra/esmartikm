<template>
  <field
    :label="$t('Number of Employees')"
    :error="'number_of_employees' in errors"
    :feedback="errors.number_of_employees"
    inline
    required
  >
    <select-number-employee
      :value="attrs.number_of_employees"
      :error="'number_of_employees' in errors"
      :disabled="saving"
      @input="updateAttrs({ key: 'number_of_employees', value: $event })"
    />
  </field>
</template>

<script lang="ts">
import Vue from 'vue'
import mixin from './mixin'
import SelectNumberEmployee from '~/components/user/SelectNumberEmployee.vue'

export default Vue.extend({
  components: { SelectNumberEmployee },
  mixins: [mixin],
})
</script>
