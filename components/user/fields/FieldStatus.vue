<template>
  <field
    :label="$t('Status')"
    :error="'status' in errors"
    :feedback="errors.status"
    inline
  >
    <select-status
      :value="attrs.status"
      :error="'status' in errors"
      :disabled="saving"
      @input="updateAttrs({ key: 'status', value: $event })"
    />
  </field>
</template>

<script lang="ts">
import Vue from 'vue'
import mixin from './mixin'
import SelectStatus from '~/components/user/SelectStatus.vue'

export default Vue.extend({
  components: { SelectStatus },
  mixins: [mixin],
})
</script>
