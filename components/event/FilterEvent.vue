<template>
  <search-event
    :presearch="$route.query.event"
    :value="Number($route.query.event_id)"
    allow-empty
    @input="eventInputHandler"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import SearchEvent from '~/components/event/SelectEvent.vue'
import appendToQuery from '~/assets/js/utils/append-to-query.js'

export default Vue.extend({
  components: { SearchEvent },
  computed: mapState('events', ['events']),
  methods: {
    eventInputHandler(eventId: string): void {
      const event = this.events.find((opt: any) => opt.id === eventId)

      if (event) {
        appendToQuery(this, { event_id: eventId, event: event.name })
      } else {
        appendToQuery(this, { event_id: '', event: '' })
      }
    },
  },
})
</script>
