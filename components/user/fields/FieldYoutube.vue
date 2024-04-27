<template>
  <field
    :label="$t('Youtube')"
    :error="'youtube' in errors"
    :feedback="errors.youtube"
    inline
  >
    <text-input
      :value="attrs.youtube"
      type="text"
      :placeholder="$t('Youtube URL')"
      :error="'youtube' in errors"
      :disabled="saving"
      @input="updateAttrs({ key: 'youtube', value: $event })"
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
