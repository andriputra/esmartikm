<template>
  <field
    :label="$t('Old Password')"
    :error="'old_password' in errors"
    :feedback="errors.old_password"
    inline
  >
    <text-input
      :value="attrs.old_password"
      type="password"
      :placeholder="$t('Old Password')"
      :error="'old_password' in errors"
      :disabled="saving"
      @input="updateAttrs({ key: 'old_password', value: $event })"
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
