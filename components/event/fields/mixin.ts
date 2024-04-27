import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'
import Field from '@/components/form/Field.vue'

export default Vue.extend({
  components: { Field },
  computed: {
    ...mapState('events/model', ['attrs', 'saving', 'errors']),
  },
  methods: mapMutations('events/model', {
    updateAttrs: 'UPDATE_ATTRS',
  }),
})
