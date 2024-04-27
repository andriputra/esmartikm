<template>
  <field
    :label="$t('Owner Birthdate')"
    :error="'owner_birthdate' in errors"
    :feedback="errors.owner_birthdate"
    inline
    required
  >
    <date-picker
      :value="attrs.owner_birthdate"
      :options="{ yearRange: [1950, 2010] }"
      :placeholder="$t('Select Date')"
      :error="'owner_birthdate' in errors"
      :disabled="saving"
      @input="updateAttrs({ key: 'owner_birthdate', value: $event })"
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
