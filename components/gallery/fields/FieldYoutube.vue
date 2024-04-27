<template>
  <field
    :label="$t('Youtube')"
    :error="'media' in errors"
    :feedback="errors.media"
    inline
    required
  >
    https://www.youtube.com/watch?v=<strong>ID</strong>
    <text-input
      :value="attrs.media"
      type="text"
      :placeholder="$t('Youtube ID')"
      :error="'media' in errors"
      :disabled="saving"
      @input="updateAttrs({ key: 'media', value: $event })"
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
