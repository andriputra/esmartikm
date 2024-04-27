<template>
  <field
    :label="$t('Event')"
    :error="'event_id' in errors"
    :feedback="errors.event_id"
    inline
    required
  >
    <select-event
      :presearch="attrs.event ? attrs.event.name : ''"
      :value="Number(attrs.event_id)"
      :error="'event_id' in errors"
      :disabled="saving"
      @input="updateAttrs({ key: 'event_id', value: $event })"
    />
  </field>
</template>

<script lang="ts">
import Vue from 'vue'
import mixin from './mixin'
import SelectEvent from '~/components/event/SelectEvent.vue'

export default Vue.extend({
  components: { SelectEvent },
  mixins: [mixin],
})
</script>
