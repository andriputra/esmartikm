<template>
  <field
    :label="$t('Owner NPWP')"
    :error="'owner_npwp' in errors"
    :feedback="errors.owner_npwp"
    inline
  >
    <text-input
      :value="attrs.owner_npwp"
      type="text"
      :placeholder="$t('Owner NPWP')"
      :error="'owner_npwp' in errors"
      :disabled="saving"
      @input="updateAttrs({ key: 'owner_npwp', value: $event })"
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
