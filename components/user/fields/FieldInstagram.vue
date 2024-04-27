<template>
  <field
    :label="$t('Instagram')"
    :error="'instagram' in errors"
    :feedback="errors.instagram"
    inline
  >
    <text-input
      :value="attrs.instagram"
      type="text"
      :placeholder="$t('Instagram URL')"
      :error="'instagram' in errors"
      :disabled="saving"
      @input="updateAttrs({ key: 'instagram', value: $event })"
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
