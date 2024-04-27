<template>
  <field
    :label="
      $t(
        'Do you have a team / personnel who will manage online marketing media?'
      )
    "
    :error="'have_online_admin' in errors"
    :feedback="errors.have_online_admin"
    field-class="ml-40 pl-3 my-3"
    required
  >
    <div class="space-y-2">
      <radiobox
        value="1"
        :model-value="attrs.have_online_admin"
        :error="'have_online_admin' in errors"
        :disabled="saving"
        @change="updateAttrs({ key: 'have_online_admin', value: $event })"
      >
        {{ $t('Yes') }}
      </radiobox>
      <radiobox
        value="0"
        :model-value="attrs.have_online_admin"
        :error="'have_online_admin' in errors"
        :disabled="saving"
        @change="updateAttrs({ key: 'have_online_admin', value: $event })"
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
