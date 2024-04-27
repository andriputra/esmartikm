<template>
  <field
    :label="$t('Gallery Type')"
    :error="'type' in errors"
    :feedback="errors.type"
    inline
    required
  >
    <div class="space-y-2">
      <radiobox
        v-for="option in options"
        :key="option"
        :value="option"
        :model-value="attrs.type"
        :error="'type' in errors"
        :disabled="saving"
        @change="
          ($event) => {
            updateAttrs({ key: 'type', value: $event })
            $emit('change', $event)
          }
        "
      >
        {{ option }}
      </radiobox>
    </div>
  </field>
</template>

<script lang="ts">
import Vue from 'vue'
import mixin from './mixin'
import Radiobox from '~/components/form/Radiobox.vue'

export default Vue.extend({
  components: { Radiobox },
  mixins: [mixin],
  data() {
    return {
      options: ['image', 'video'],
    }
  },
})
</script>
