<template>
  <div class="content max-w-2xl">
    <div class="p-5">
      <h2 class="text-3xl font-bold mb-5">
        {{ $t('Settings') }}
      </h2>
      <field :label="$t('Open Registration')" inline required>
        <div class="py-3">
          <checkbox
            :model-value="attrs.registration.value"
            :true-value="1"
            :false-value="0"
            :disabled="saving"
            @change="
              updateAttrs({
                key: 'registration',
                value: { ...attrs.registration, ...{ value: $event } },
              })
            "
          >
            {{ $t('Yes') }}
          </checkbox>
        </div>
      </field>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapMutations, mapActions } from 'vuex'
import Checkbox from '~/components/form/Checkbox.vue'
import Field from '~/components/form/Field.vue'

export default Vue.extend({
  components: {
    Checkbox,
    Field,
  },
  middleware: 'admin',
  computed: {
    ...mapState('settings/model', ['attrs', 'saving']),
  },
  watch: {
    async 'attrs.registration.value'() {
      await this.update('registration')
    },
  },
  methods: {
    ...mapMutations('settings/model', {
      updateAttrs: 'UPDATE_ATTRS',
    }),
    ...mapActions('settings/model', {
      save: 'SAVE',
    }),
    async update(key: string): Promise<any> {
      const { error, response } = await this.save(key)

      if (error) {
        return this.$toast('error', { text: response.data.message }).show()
      }

      this.$toast('success', {
        text: this.$t('Settings saved!'),
      }).show()
    },
  },
})
</script>
