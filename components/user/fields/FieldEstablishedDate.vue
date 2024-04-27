<template>
  <field
    :label="$t('Established Date')"
    :error="'established_date' in errors"
    :feedback="errors.established_date"
    inline
    required
  >
    <date-picker
      :value="attrs.established_date"
      :options="{ format: 'yyyy-MM-dd' }"
      :placeholder="$t('Established Date')"
      :error="'established_date' in errors"
      :disabled="saving"
      @input="updateAttrs({ key: 'established_date', value: $event })"
    />
  </field>
</template>

<script lang="ts">
import Vue from 'vue'
import mixin from './mixin'
import DatePicker from '~/components/form/DatePicker.vue'

export default Vue.extend({
  components: { DatePicker },
  mixins: [mixin],
})
</script>
