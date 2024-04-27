<template>
  <field
    :label="
      $t(
        'Are you willing to take part in the Technical Guidance and Digital Marketing Assistance program which will be implemented after the Program campaign period?'
      )
    "
    :error="'willing_digital_marketing_workshop_program' in errors"
    :feedback="errors.willing_digital_marketing_workshop_program"
    field-class="ml-40 pl-3 my-3"
    required
  >
    <div class="space-y-2">
      <radiobox
        value="1"
        :model-value="attrs.willing_digital_marketing_workshop_program"
        :error="'willing_digital_marketing_workshop_program' in errors"
        :disabled="saving"
        @change="
          updateAttrs({
            key: 'willing_digital_marketing_workshop_program',
            value: $event,
          })
        "
      >
        {{ $t('Yes') }}
      </radiobox>
      <radiobox
        value="0"
        :model-value="attrs.willing_digital_marketing_workshop_program"
        :error="'willing_digital_marketing_workshop_program' in errors"
        :disabled="saving"
        @change="
          updateAttrs({
            key: 'willing_digital_marketing_workshop_program',
            value: $event,
          })
        "
      >
        {{ $t('No') }}
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
})
</script>
