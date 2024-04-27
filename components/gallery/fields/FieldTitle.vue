<template>
  <field
    :label="$t('Title')"
    :error="'title' in errors"
    :feedback="errors.title"
    inline
    required
  >
    <text-input
      :value="attrs.title"
      type="text"
      :placeholder="$t('Title')"
      :error="'title' in errors"
      :disabled="saving"
      @input="updateAttrs({ key: 'title', value: $event })"
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
