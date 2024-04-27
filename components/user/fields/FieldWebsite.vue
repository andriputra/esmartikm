<template>
  <field
    :label="$t('Website')"
    :error="'website' in errors"
    :feedback="errors.website"
    inline
  >
    <text-input
      :value="attrs.website"
      type="text"
      :placeholder="$t('Website URL')"
      :error="'website' in errors"
      :disabled="saving"
      @input="updateAttrs({ key: 'website', value: $event })"
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
