<template>
  <field
    :label="$t('Event Name')"
    :error="'event_name' in errors"
    :feedback="errors.event_name"
    inline
    required
  >
    <text-input
      :value="attrs.event_name"
      type="text"
      :placeholder="$t('Event Name')"
      :error="'event_name' in errors"
      :disabled="saving"
      @input="updateAttrs({ key: 'event_name', value: $event })"
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
