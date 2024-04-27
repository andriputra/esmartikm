<template>
  <field
    :label="$t('Active')"
    :error="'active' in errors"
    :feedback="errors.active"
    inline
  >
    <checkbox
      :model-value="attrs.active"
      :error="'active' in errors"
      :disabled="saving"
      :true-value="1"
      :false-value="0"
      class="my-4"
      @input="updateAttrs({ key: 'active', value: $event })"
    />
  </field>
</template>

<script lang="ts">
import Vue from 'vue'
import mixin from './mixin'
import Checkbox from '~/components/form/Checkbox.vue'

export default Vue.extend({
  components: { Checkbox },
  mixins: [mixin],
})
</script>
