import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'
import Field from '@/components/form/Field.vue'

export default Vue.extend({
  components: { Field },
  computed: {
    ...mapState('users/model', ['attrs', 'saving', 'errors']),
  },
  methods: mapMutations('users/model', {
    updateAttrs: 'UPDATE_ATTRS',
  }),
})
