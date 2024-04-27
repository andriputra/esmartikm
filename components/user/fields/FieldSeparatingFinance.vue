<template>
  <field
    :label="
      $t('Have you separated your personal / family finances from the company?')
    "
    :error="'separating_finance' in errors"
    :feedback="errors.separating_finance"
    field-class="ml-40 pl-3 my-3"
    required
  >
    <div class="space-y-2">
      <radiobox
        value="1"
        :model-value="attrs.separating_finance"
        :error="'separating_finance' in errors"
        :disabled="saving"
        @change="updateAttrs({ key: 'separating_finance', value: $event })"
      >
        {{ $t('Yes') }}
      </radiobox>
      <radiobox
        value="0"
        :model-value="attrs.separating_finance"
        :error="'separating_finance' in errors"
        :disabled="saving"
        @change="updateAttrs({ key: 'separating_finance', value: $event })"
      >
        {{ $t('No') }}
      </radiobox>
    </div>
  </field>
</template>

<script lang="ts">
import Vue from 'vue'
import mixin from './mixin'
import Radiobox from '~/components/form/Radiobox.vue'

export default Vue.extend({
  components: { Radiobox },
  mixins: [mixin],
})
</script>
