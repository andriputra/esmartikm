<template>
  <field
    :label="$t('Tiktok')"
    :error="'tiktok' in errors"
    :feedback="errors.tiktok"
    inline
  >
    <text-input
      :value="attrs.tiktok"
      type="text"
      :placeholder="$t('Tiktok URL')"
      :error="'tiktok' in errors"
      :disabled="saving"
      @input="updateAttrs({ key: 'tiktok', value: $event })"
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
