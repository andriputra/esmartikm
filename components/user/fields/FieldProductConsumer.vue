<template>
  <field
    v-if="attrs.form_type === 'Industri Pangan, Furnitur dan Bahan Bangunan'"
    :label="$t('Who are the consumers of your product?')"
    :error="'product_consumer' in errors"
    :feedback="errors.product_consumer"
    field-class="ml-40 pl-3 my-3"
  >
    <div class="space-y-2">
      <template v-for="(option, key) in options">
        <checkbox
          :key="key"
          :value="option"
          :model-value="attrs.product_consumer"
          :error="'product_consumer' in errors"
          :disabled="saving"
          @change="updateAttrs({ key: 'product_consumer', value: $event })"
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

  <field
    v-else
    :label="$t('Who are the consumers of your product?')"
    :error="'product_consumer' in errors"
    :feedback="errors.product_consumer"
    field-class="ml-40 pl-3 my-3"
    required
  >
    <div class="space-y-2">
      <template v-for="(option, key) in options">
        <checkbox
          :key="key"
          :value="option"
          :model-value="attrs.product_consumer"
          :error="'product_consumer' in errors"
          :disabled="saving"
          @change="updateAttrs({ key: 'product_consumer', value: $event })"
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
        'Personal / orang per orang',
        'Perusahaan / bisnis lainnya',
        'Pemerintah Pusat / Daerah',
        'BUMN / BUMD',
        '',
      ],
    }
  },
  methods: {
    otherInputHandler(value: string): void {
      const _this: any = this
      const selectedIndex = _this.attrs.product_consumer.indexOf(
        this.options[this.options.length - 1]
      )

      if (selectedIndex > -1) {
        const newValue: any = [].concat(_this.attrs.product_consumer)
        newValue[selectedIndex] = value
        _this.updateAttrs({ key: 'product_consumer', value: newValue })
      }

      this.$set(this.options, this.options.length - 1, value)
    },
  },
})
</script>
