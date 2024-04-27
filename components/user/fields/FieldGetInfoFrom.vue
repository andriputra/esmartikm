<template>
  <field
    :label="$t('Where did you get information about this program from?')"
    :error="'get_info_from' in errors"
    :feedback="errors.get_info_from"
    field-class="ml-40 pl-3 my-3"
    required
  >
    <div class="space-y-2">
      <template v-for="(option, key) in options">
        <checkbox
          :key="key"
          :value="option"
          :model-value="attrs.get_info_from"
          :error="'get_info_from' in errors"
          :disabled="saving"
          @change="updateAttrs({ key: 'get_info_from', value: $event })"
        >
          <text-input
            v-if="options.length - 1 === key"
            :value="option"
            type="text"
            :placeholder="$t('Other')"
            :disabled="saving"
            @input="otherInputHandler"
          />
          <template v-else>{{ option }}</template>
        </checkbox>
      </template>
    </div>
  </field>
</template>

<script lang="ts">
import Vue from 'vue'
import mixin from './mixin'
import Checkbox from '~/components/form/Checkbox.vue'
import TextInput from '~/components/form/TextInput.vue'

export default Vue.extend({
  components: { Checkbox, TextInput },
  mixins: [mixin],
  data() {
    return {
      options: [
        'Media Sosial',
        'Whatsapp',
        'Dinas Perindustrian Provinsi / Kab / Kota',
        '',
      ],
    }
  },
  methods: {
    otherInputHandler(value: string): void {
      const _this: any = this
      const selectedIndex = _this.attrs.get_info_from.indexOf(
        this.options[this.options.length - 1]
      )

      if (selectedIndex > -1) {
        const newValue: any = [].concat(_this.attrs.get_info_from)
        newValue[selectedIndex] = value
        _this.updateAttrs({ key: 'get_info_from', value: newValue })
      }

      this.$set(this.options, this.options.length - 1, value)
    },
  },
})
</script>
