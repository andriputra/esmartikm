<template>
  <field
    :label="$t('Facebook')"
    :error="'facebook' in errors"
    :feedback="errors.facebook"
    inline
  >
    <text-input
      :value="attrs.facebook"
      type="text"
      :placeholder="$t('Facebook URL')"
      :error="'facebook' in errors"
      :disabled="saving"
      @input="updateAttrs({ key: 'facebook', value: $event })"
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
