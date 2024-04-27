<template>
  <field
    :label="$t('Upload Distribution Permit')"
    :error="'distribution_permit_file' in errors"
    :feedback="errors.distribution_permit_file"
    inline
  >
    <div class="flex items-center space-x-3">
      <a
        v-if="attrs.distribution_permit_file_url"
        :href="attrs.distribution_permit_file_url"
        target="_blank"
        ><svg-icon name="file_present"
      /></a>
      <file-input
        :error="'distribution_permit_file' in errors"
        :disabled="saving"
        class="flex-1"
        :label-placeholder="
          attrs.distribution_permit_file ? 'Browse to change...' : undefined
        "
        @input="updateAttrs({ key: 'distribution_permit_file', value: $event })"
      />
    </div>
  </field>
</template>

<script lang="ts">
import Vue from 'vue'
import mixin from './mixin'
import FileInput from '~/components/form/FileInput.vue'

export default Vue.extend({
  components: { FileInput },
  mixins: [mixin],
})
</script>
