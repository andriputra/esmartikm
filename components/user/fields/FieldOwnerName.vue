<template>
  <field
    :label="$t('Owner Name')"
    :error="'owner_name' in errors"
    :feedback="errors.owner_name"
    inline
    required
  >
    <text-input
      :value="attrs.owner_name"
      type="text"
      :placeholder="$t('Owner Name')"
      :error="'owner_name' in errors"
      :disabled="saving"
      @input="updateAttrs({ key: 'owner_name', value: $event })"
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
